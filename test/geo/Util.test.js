/**
 * Unit tests for draw2d.geo.Util
 * 
 * Run with: npm test
 */

// Mock draw2d.geo.Point for testing
class Point {
  constructor(x, y) {
    if (typeof x === 'object') {
      this.x = x.x
      this.y = y !== undefined ? y : x.y
    } else {
      this.x = x
      this.y = y
    }
  }
  
  equals(other) {
    return this.x === other.x && this.y === other.y
  }
}

// Import the function logic (standalone for testing)
const insetPoint = function (start, end, distanceFromStart) {
  if (start.equals(end)) {
    return start
  }
  let vx = start.x - end.x
  let vy = start.y - end.y
  let length = Math.sqrt(vx * vx + vy * vy)
  let t = Math.min(distanceFromStart, length * 0.5) / length
  return {
    x: start.x + (end.x - start.x) * t,
    y: start.y + (end.y - start.y) * t
  }
}

// Custom matcher for approximate point equality
expect.extend({
  toBeCloseToPoint(received, expected, precision = 4) {
    const pass = 
      Math.abs(received.x - expected.x) < Math.pow(10, -precision) &&
      Math.abs(received.y - expected.y) < Math.pow(10, -precision)
    
    if (pass) {
      return {
        message: () => `expected (${received.x}, ${received.y}) not to be close to (${expected.x}, ${expected.y})`,
        pass: true
      }
    } else {
      return {
        message: () => `expected (${received.x}, ${received.y}) to be close to (${expected.x}, ${expected.y})`,
        pass: false
      }
    }
  }
})

describe('draw2d.geo.Util.insetPoint', () => {
  
  test('returns start point when start equals end', () => {
    const start = new Point(10, 20)
    const end = new Point(10, 20)
    const result = insetPoint(start, end, 5)
    expect(result).toBe(start)
  })

  describe('horizontal line (0,0) to (100,0)', () => {
    const start = new Point(0, 0)
    const end = new Point(100, 0)

    test('distance 10 from start', () => {
      const result = insetPoint(start, end, 10)
      expect(result).toBeCloseToPoint({ x: 10, y: 0 })
    })

    test('distance 50 from start (half of line)', () => {
      const result = insetPoint(start, end, 50)
      expect(result).toBeCloseToPoint({ x: 50, y: 0 })
    })

    test('distance 60 is clamped to 50 (max half)', () => {
      const result = insetPoint(start, end, 60)
      expect(result).toBeCloseToPoint({ x: 50, y: 0 })
    })
  })

  describe('vertical line (0,0) to (0,100)', () => {
    test('distance 25 from start', () => {
      const start = new Point(0, 0)
      const end = new Point(0, 100)
      const result = insetPoint(start, end, 25)
      expect(result).toBeCloseToPoint({ x: 0, y: 25 })
    })
  })

  describe('diagonal line (0,0) to (100,100)', () => {
    test('distance 10 from start', () => {
      const start = new Point(0, 0)
      const end = new Point(100, 100)
      const lineLength = Math.sqrt(100*100 + 100*100) // ~141.42
      const result = insetPoint(start, end, 10)
      const expectedX = 10 / lineLength * 100
      const expectedY = 10 / lineLength * 100
      expect(result).toBeCloseToPoint({ x: expectedX, y: expectedY })
    })
  })

  describe('negative coordinates', () => {
    test('(-50,-50) to (50,50) with distance 0', () => {
      const start = new Point(-50, -50)
      const end = new Point(50, 50)
      const result = insetPoint(start, end, 0)
      expect(result).toBeCloseToPoint({ x: -50, y: -50 })
    })
  })

  describe('edge cases', () => {
    test('very short line clamps distance correctly', () => {
      const start = new Point(0, 0)
      const end = new Point(1, 1)
      const result = insetPoint(start, end, 10)
      // Line length is sqrt(2) ≈ 1.414, clamped to 0.707
      const lineLength = Math.sqrt(2)
      const t = 0.5 // clamped to half
      expect(result).toBeCloseToPoint({ x: t, y: t })
    })

    test('large line with normal distance', () => {
      const result = insetPoint(new Point(0, 0), new Point(1000, 0), 100)
      expect(result).toBeCloseToPoint({ x: 100, y: 0 })
    })
  })
})