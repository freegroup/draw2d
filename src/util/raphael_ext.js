
// hacking RaphaelJS to support groups of elements
//
(function() {
    Raphael.fn.group = function(f, g) {
        var enabled = document.getElementsByTagName("svg").length > 0;
        if (!enabled) {
            // return a stub for VML compatibility
            return {
                add : function() {
                    // intentionally left blank
                }
            };
        }
        var i;
        this.svg = "http://www.w3.org/2000/svg";
        this.defs = document.getElementsByTagName("defs")[f];
        this.svgcanv = document.getElementsByTagName("svg")[f];
        this.group = document.createElementNS(this.svg, "g");
        for(i = 0;i < g.length;i++) {
            this.group.appendChild(g[i].node);
        }
        this.svgcanv.appendChild(this.group);
        this.group.translate = function(c, a) {
            this.setAttribute("transform", "translate(" + c + "," + a + ") scale(" + this.getAttr("scale").x + "," + this.getAttr("scale").y + ")");
        };
        this.group.rotate = function(c, a, e) {
            this.setAttribute("transform", "translate(" + this.getAttr("translate").x + "," + this.getAttr("translate").y + ") scale(" + this.getAttr("scale").x + "," + this.getAttr("scale").y + ") rotate(" + c + "," + a + "," + e + ")");
        };
        this.group.scale = function(c, a) {
            this.setAttribute("transform", "scale(" + c + "," + a + ") translate(" + this.getAttr("translate").x + "," + this.getAttr("translate").y + ")");
        };
        this.group.push = function(c) {
            this.appendChild(c.node);
        };
        this.group.getAttr = function(c) {
            this.previous = this.getAttribute("transform") ? this.getAttribute("transform") : "";
            var a = [], e, h, j;
            a = this.previous.split(" ");
            for(i = 0;i < a.length;i++) {
                if(a[i].substring(0, 1) == "t") {
                    var d = a[i], b = [];
                    b = d.split("(");
                    d = b[1].substring(0, b[1].length - 1);
                    b = [];
                    b = d.split(",");
                    e = b.length === 0 ? {x:0, y:0} : {x:b[0], y:b[1]};
                }else {
                    if(a[i].substring(0, 1) === "r") {
                        d = a[i];
                        b = d.split("(");
                        d = b[1].substring(0, b[1].length - 1);
                        b = d.split(",");
                        h = b.length === 0 ? {x:0, y:0, z:0} : {x:b[0], y:b[1], z:b[2]};
                    }else {
                        if(a[i].substring(0, 1) === "s") {
                            d = a[i];
                            b = d.split("(");
                            d = b[1].substring(0, b[1].length - 1);
                            b = d.split(",");
                            j = b.length === 0 ? {x:1, y:1} : {x:b[0], y:b[1]};
                        }
                    }
                }
            }
            if(typeof e === "undefined") {
                e = {x:0, y:0};
            }
            if(typeof h === "undefined") {
                h = {x:0, y:0, z:0};
            }
            if(typeof j === "undefined") {
                j = {x:1, y:1};
            }

            if(c == "translate") {
                var k = e;
            }else {
                if(c == "rotate") {
                    k = h;
                }else {
                    if(c == "scale") {
                        k = j;
                    }
                }
            }
            return k;
        };
        this.group.copy = function(el){
            this.copy = el.node.cloneNode(true);
            this.appendChild(this.copy);
        };
        return this.group;
    };
})();

/**
 * adding support method to check if the node is already visible
 **/
(function() {
    Raphael.el.isVisible = function() {
        return (this.node.style.display !== "none");
    }
})();
