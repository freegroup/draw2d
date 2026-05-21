/**
 * Drop-in replacement for RaphaelJS using native browser SVG APIs.
 *
 * Implements the Raphael subset used by draw2d:
 *   Paper  — canvas factory (rect, circle, ellipse, path, text, image, set)
 *   Element — individual SVG node wrapper
 *   Set     — ordered group of Elements
 *   Matrix  — 2-D affine transform
 *
 * Raphael.fn   → Paper.prototype    (extended by SVGUtil.js etc.)
 * Raphael.el   → Element.prototype
 * Raphael.st   → Set.prototype
 */

const SVG_NS = "http://www.w3.org/2000/svg"

// CSS properties that must go through style, not setAttribute
const CSS_PROPS = new globalThis.Set(["cursor", "display", "visibility", "pointer-events"])

// SVG presentation attributes that map to a different attribute name
const ATTR_ALIAS = {
  "r":              (el, v) => {
    if (el.tagName === "circle") el.setAttribute("r", v)
    else { el.setAttribute("rx", v); el.setAttribute("ry", v) }
  },
  "path":           (el, v) => el.setAttribute("d", v),
  "dasharray":      (el, v) => el.setAttribute("stroke-dasharray", v),
  "font-size":      (el, v) => el.setAttribute("font-size", typeof v === "number" ? v + "px" : v),
}

// ---------------------------------------------------------------------------
// Matrix — 2-D affine transform  [a c e]
//                                [b d f]
//                                [0 0 1]
// ---------------------------------------------------------------------------
class Matrix {
  constructor(a, b, c, d, e, f) {
    this.a = a !== undefined ? a : 1
    this.b = b || 0
    this.c = c || 0
    this.d = d !== undefined ? d : 1
    this.e = e || 0
    this.f = f || 0
  }

  // multiply this = other * this
  add(a, b, c, d, e, f) {
    const o = a instanceof Matrix ? a : {a, b, c, d, e, f}
    const na = o.a * this.a + o.c * this.b
    const nb = o.b * this.a + o.d * this.b
    const nc = o.a * this.c + o.c * this.d
    const nd = o.b * this.c + o.d * this.d
    const ne = o.a * this.e + o.c * this.f + o.e
    const nf = o.b * this.e + o.d * this.f + o.f
    this.a = na; this.b = nb; this.c = nc
    this.d = nd; this.e = ne; this.f = nf
    return this
  }

  translate(x, y) { return this.add(1, 0, 0, 1, x, y) }

  scale(x, y, cx, cy) {
    y = y !== undefined ? y : x
    if (cx || cy) this.translate(cx, cy)
    this.add(x, 0, 0, y, 0, 0)
    if (cx || cy) this.translate(-cx, -cy)
    return this
  }

  rotate(deg, x, y) {
    const r = deg * Math.PI / 180
    const cos = Math.cos(r), sin = Math.sin(r)
    if (x || y) this.translate(x, y)
    this.add(cos, sin, -sin, cos, 0, 0)
    if (x || y) this.translate(-x, -y)
    return this
  }

  x(px, py) { return px * this.a + py * this.c + this.e }
  y(px, py) { return px * this.b + py * this.d + this.f }

  clone() { return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f) }
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
function resolveNode(ref) {
  if (!ref) return null
  if (ref.node) return ref.node
  // Set or array-like
  const items = ref.items || ref
  if (items && items.length > 0) return items[items.length - 1].node || null
  return null
}

function parseTString(tStr) {
  return typeof tStr === "string" ? tStr.match(/[a-zA-Z][^a-zA-Z]*/g) || [] : []
}

function parseArgs(str) {
  return str.substring(1).split(/[ ,]+/).filter(s => s !== "").map(Number)
}

// ---------------------------------------------------------------------------
// Element
// ---------------------------------------------------------------------------
class Element {
  constructor(type, paper) {
    this.paper  = paper
    this.node   = document.createElementNS(SVG_NS, type)
    this.attrs  = {}
    this.matrix = new Matrix()
    this._tString = ""
    this._animId  = null
    this.removed  = false

    if (["rect", "circle", "ellipse", "path", "polygon"].includes(type)) {
      this.node.setAttribute("fill", "none")
      this.node.setAttribute("stroke", "none")
      this.node.setAttribute("pointer-events", "visiblePainted")
    }
    if (type === "text") {
      this.node.setAttribute("dominant-baseline", "central")
    }
  }

  // ── attr ────────────────────────────────────────────────────────────────

  attr(name, value) {
    if (this.removed) return this
    if (typeof name === "string") {
      if (value === undefined) return this.attrs[name]
      this._applyAttr(name, value)
    } else if (name && typeof name === "object") {
      for (const key in name) this._applyAttr(key, name[key])
    }
    return this
  }

  _applyAttr(name, value) {
    this.attrs[name] = value

    if (name === "text") {
      this._renderText(value)
      return
    }

    // x/y on text: also update existing tspan x attributes
    if ((name === "x" || name === "y") && this.node.tagName === "text") {
      this.node.setAttribute(name, value)
      if (name === "x") {
        for (const tspan of this.node.children) {
          if (tspan.tagName === "tspan") tspan.setAttribute("x", value)
        }
      }
      return
    }

    if (ATTR_ALIAS[name]) { ATTR_ALIAS[name](this.node, value); return }

    if (CSS_PROPS.has(name)) {
      this.node.style[name] = value
      return
    }

    // fill:none keeps pointer-events working on unfilled shapes
    if (name === "fill" && value === "none") {
      this.node.setAttribute("fill", "none")
      this.node.setAttribute("pointer-events", "visiblePainted")
      return
    }

    this.node.setAttribute(name, value)
  }

  _renderText(value) {
    this.node.textContent = ""
    const x = this.attrs.x || 0
    String(value).split("\n").forEach((line, i) => {
      const tspan = document.createElementNS(SVG_NS, "tspan")
      tspan.textContent = line
      tspan.setAttribute("x", x)
      if (i > 0) tspan.setAttribute("dy", "1.2em")
      this.node.appendChild(tspan)
    })
  }

  // ── transform ───────────────────────────────────────────────────────────

  transform(tStr) {
    if (this.removed) return this
    if (tStr === undefined) return this._tString

    if (tStr === null || tStr === "" || (Array.isArray(tStr) && tStr.length === 0)) {
      this.node.removeAttribute("transform")
      this.matrix = new Matrix()
      this._tString = ""
      return this
    }

    const append   = typeof tStr === "string" && tStr.startsWith("...")
    const tStrWork = append ? tStr.substring(3) : tStr
    this._tString  = tStr

    const m = append ? this.matrix.clone() : new Matrix()

    for (const part of parseTString(tStrWork)) {
      const cmd  = part[0].toUpperCase()
      const args = parseArgs(part)
      if (args.length === 0 || isNaN(args[0])) continue

      switch (cmd) {
        case "T": {
          const [tx = 0, ty = 0] = args
          m.add(1, 0, 0, 1, tx, ty)
          break
        }
        case "R": {
          let [angle = 0, rx, ry] = args
          if (rx === undefined || isNaN(rx)) {
            const bb = this.getBBox(true)
            rx = bb.x + bb.width / 2
            ry = bb.y + bb.height / 2
          }
          m.add(new Matrix().translate(rx, ry).rotate(angle).translate(-rx, -ry))
          break
        }
        case "S": {
          const sx = args[0] || 1
          const sy = isNaN(args[1]) ? sx : args[1]
          let scx = args[2], scy = args[3]
          if (scx === undefined || isNaN(scx)) {
            const bb = this.getBBox(true)
            scx = bb.x + bb.width / 2
            scy = bb.y + bb.height / 2
          }
          m.add(new Matrix().translate(scx, scy).scale(sx, sy).translate(-scx, -scy))
          break
        }
      }
    }

    this.matrix = m
    // Use the computed matrix directly — individual SVG transform tokens would stack
    // in the wrong order due to pre-multiply semantics, giving wrong results when
    // scale != 1 (e.g. SetFigure scaling SVG content to fit the figure bounds).
    if (m.a === 1 && m.b === 0 && m.c === 0 && m.d === 1 && m.e === 0 && m.f === 0) {
      this.node.removeAttribute("transform")
    } else {
      this.node.setAttribute("transform", `matrix(${m.a},${m.b},${m.c},${m.d},${m.e},${m.f})`)
    }
    return this
  }

  // ── visibility / z-order ────────────────────────────────────────────────

  show()  { this.node.style.display = ""; return this }
  hide()  { this.node.style.display = "none"; return this }
  isVisible() { return this.node.style.display !== "none" }

  toFront() {
    if (this.node.parentNode) this.node.parentNode.appendChild(this.node)
    return this
  }

  toBack() {
    if (this.node.parentNode && this.node.parentNode.firstChild !== this.node)
      this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild)
    return this
  }

  insertAfter(other) {
    const ref = resolveNode(other)
    if (ref && ref.parentNode) ref.parentNode.insertBefore(this.node, ref.nextSibling)
    return this
  }

  insertBefore(other) {
    const ref = other && other.items ? resolveNode({items: other.items.slice(0, 1)}) : resolveNode(other)
    if (ref && ref.parentNode) ref.parentNode.insertBefore(this.node, ref)
    return this
  }

  // ── remove ──────────────────────────────────────────────────────────────

  remove() {
    this.stop()
    if (this.node.parentNode) this.node.parentNode.removeChild(this.node)
    this.removed = true
    return this
  }

  // ── bounding box ────────────────────────────────────────────────────────

  getBBox(withoutTransform) {
    if (this.removed) return {x: 0, y: 0, width: 0, height: 0}
    try {
      let savedTransform
      if (withoutTransform) {
        savedTransform = this.node.getAttribute("transform")
        this.node.removeAttribute("transform")
      }
      const raw = this.node.getBBox()
      if (withoutTransform && savedTransform) this.node.setAttribute("transform", savedTransform)

      let res = {x: raw.x, y: raw.y, width: raw.width, height: raw.height}

      // fallback for text not yet in DOM
      if (this.node.tagName === "text" && res.height === 0) {
        const fs = parseInt(this.attrs["font-size"]) || 12
        res = {x: this.attrs.x || 0, y: (this.attrs.y || 0) - fs / 2, width: 0, height: fs}
      }

      if (withoutTransform || !this.matrix) return res

      // transform all 4 corners and find enclosing AABB
      const corners = [
        {x: res.x,             y: res.y},
        {x: res.x + res.width, y: res.y},
        {x: res.x,             y: res.y + res.height},
        {x: res.x + res.width, y: res.y + res.height},
      ]
      const xs = corners.map(p => this.matrix.x(p.x, p.y))
      const ys = corners.map(p => this.matrix.y(p.x, p.y))
      const x0 = Math.min(...xs), y0 = Math.min(...ys)
      return {x: x0, y: y0, width: Math.max(...xs) - x0, height: Math.max(...ys) - y0}
    } catch (_) {
      return {x: 0, y: 0, width: 0, height: 0}
    }
  }

  // ── animation ───────────────────────────────────────────────────────────

  /**
   * Animates numeric SVG attributes (opacity, stroke-width, etc.) via
   * requestAnimationFrame with linear interpolation. Non-numeric attributes
   * and transforms are applied immediately.
   *
   * Accepts both inline form:
   *   el.animate({opacity: 0}, 500, "linear", callback)
   * and Raphael.animation() object form:
   *   el.animate(Raphael.animation({opacity: 0}, 500))
   */
  animate(params, ms, easing, callback) {
    if (params && params._isAnimation) {
      callback = params.callback || callback
      ms       = params.ms       || ms
      params   = params.params
    }

    if (!ms || ms <= 0 || typeof requestAnimationFrame === "undefined") {
      this.attr(params)
      if (typeof callback === "function") callback()
      return this
    }

    // separate animatable (numeric) from non-animatable attrs
    const from = {}, to = {}
    for (const key in params) {
      if (key === "transform") { this._applyAttr("transform", params[key]); continue }
      const cur = parseFloat(this.attrs[key])
      const tgt = parseFloat(params[key])
      if (!isNaN(cur) && !isNaN(tgt) && cur !== tgt) {
        from[key] = cur
        to[key]   = tgt
      } else {
        this._applyAttr(key, params[key])
      }
    }

    if (Object.keys(from).length === 0) {
      if (typeof callback === "function") callback()
      return this
    }

    this.stop()
    const startTime = performance.now()
    const tick = (now) => {
      const t = Math.min((now - startTime) / ms, 1)
      for (const key in from) this._applyAttr(key, from[key] + (to[key] - from[key]) * t)
      if (t < 1) {
        this._animId = requestAnimationFrame(tick)
      } else {
        this._animId = null
        if (typeof callback === "function") callback()
      }
    }
    this._animId = requestAnimationFrame(tick)
    return this
  }

  stop() {
    if (this._animId) { cancelAnimationFrame(this._animId); this._animId = null }
    return this
  }
}

// ---------------------------------------------------------------------------
// Set  — ordered collection that delegates operations to its items
// ---------------------------------------------------------------------------
class Set {
  constructor(paper) {
    this.paper  = paper
    this.items  = []
    this.length = 0
    this.removed = false
  }

  push(el) {
    const add = (item) => {
      this[this.items.length] = item
      this.items.push(item)
    }
    if (el instanceof Set) el.items.forEach(add)
    else if (Array.isArray(el)) el.forEach(add)
    else add(el)
    this.length = this.items.length
    return this
  }

  pop() {
    if (!this.length) return null
    const item = this.items.pop()
    delete this[this.items.length]
    this.length = this.items.length
    return item
  }

  forEach(cb) { this.items.forEach(cb); return this }

  // delegate Element methods
  attr(n, v)          { this.items.forEach(el => el.attr(n, v)); return this }
  transform(t)        { this.items.forEach(el => el.transform(t)); return this }
  show()              { this.items.forEach(el => el.show()); return this }
  hide()              { this.items.forEach(el => el.hide()); return this }
  isVisible()         { return this.items.some(el => el.isVisible()) }
  toFront()           { this.items.forEach(el => el.toFront()); return this }
  toBack()            { [...this.items].reverse().forEach(el => el.toBack()); return this }
  stop()              { this.items.forEach(el => el.stop && el.stop()); return this }
  insertAfter(other)  { this.items.forEach(el => el.insertAfter(other)); return this }
  insertBefore(other) { this.items.forEach(el => el.insertBefore(other)); return this }

  animate(params, ms, easing, callback) {
    this.items.forEach(el => el.animate(params, ms, easing, callback))
    return this
  }

  getBBox(withoutTransform) {
    if (!this.items.length) return {x: 0, y: 0, width: 0, height: 0}
    let left = Infinity, top = Infinity, right = -Infinity, bottom = -Infinity
    this.items.forEach(el => {
      const b = el.getBBox(withoutTransform)
      left   = Math.min(left,   b.x)
      top    = Math.min(top,    b.y)
      right  = Math.max(right,  b.x + b.width)
      bottom = Math.max(bottom, b.y + b.height)
    })
    return {x: left, y: top, width: right - left, height: bottom - top}
  }

  remove() {
    this.items.forEach(el => el.remove())
    for (let i = 0; i < this.length; i++) delete this[i]
    this.items  = []
    this.length = 0
    this.removed = true
    return this
  }
}

// ---------------------------------------------------------------------------
// Paper  — the SVG canvas
// ---------------------------------------------------------------------------
class Paper {
  constructor(containerId, width, height) {
    this.container = typeof containerId === "string"
      ? document.getElementById(containerId)
      : containerId
    this.canvas = document.createElementNS(SVG_NS, "svg")
    this.canvas.setAttribute("width",  width)
    this.canvas.setAttribute("height", height)
    this.canvas.style.cssText = "position:absolute;left:0;top:0;overflow:hidden;"
    this.container.appendChild(this.canvas)
  }

  _el(type, attrs) {
    const el = new Element(type, this)
    if (attrs) el.attr(attrs)
    this.canvas.appendChild(el.node)
    if (this._capture) this._capture.push(el)
    return el
  }

  // Raphael setStart/setFinish: collect all elements created between the two calls into a Set
  setStart() {
    this._capture = this.set()
  }

  setFinish() {
    const s = this._capture || this.set()
    this._capture = null
    return s
  }

  rect(x, y, w, h)          { return this._el("rect",    {x, y, width: w, height: h}) }
  circle(cx, cy, r)          { return this._el("circle",  {cx, cy, r}) }
  ellipse(cx, cy, rx, ry)    { return this._el("ellipse", {cx, cy, rx, ry}) }
  text(x, y, str)            { return this._el("text",    {x, y, text: str}) }
  image(src, x, y, w, h)     { return this._el("image",   {href: src, x, y, width: w, height: h}) }

  path(d) {
    if (Array.isArray(d)) d = d.flat().join(" ")
    return this._el("path", d ? {d} : {})
  }

  // pointString: "x1,y1 x2,y2 ..." — defined here so SVGUtil.js override is optional
  polygon(pointString) {
    return this._el("polygon", {points: pointString})
  }

  set(items) {
    const s = new Set(this)
    if (items) s.push(items)
    return s
  }

  setSize(w, h) {
    this.canvas.setAttribute("width",  w)
    this.canvas.setAttribute("height", h)
  }

  setViewBox(x, y, w, h) {
    this.canvas.setAttribute("viewBox", `${x} ${y} ${w} ${h}`)
  }

  remove() {
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas)
  }
}

// ---------------------------------------------------------------------------
// Raphael  — factory function + static helpers
// ---------------------------------------------------------------------------
const Raphael = function (containerId, width, height) {
  if (Array.isArray(containerId)) return new Paper(containerId[0], containerId[1], containerId[2])
  return new Paper(containerId, width, height)
}

Raphael.fn  = Paper.prototype
Raphael.el  = Element.prototype
Raphael.st  = Set.prototype

Raphael.matrix = (a, b, c, d, e, f) => new Matrix(a, b, c, d, e, f)

/**
 * Creates an animation descriptor used with element.animate().
 * Supports .repeat() for looping (draw2d uses repeat(Infinity) for
 * connection-creation indicator circles).
 */
Raphael.animation = function (params, ms, easing, callback) {
  const anim = {
    _isAnimation: true,
    params, ms, easing, callback,
    _repeat: 1,
    repeat(n) { this._repeat = n; return this },
  }
  return anim
}

if (typeof window !== "undefined") window.Raphael = Raphael

export default Raphael
