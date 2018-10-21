function(a, b) {
    "function" == typeof define && define.amd ? define(["wavesurfer"], function(a) {
        return b(a)
    }) : "object" == typeof exports ? module.exports = b(require("wavesurfer.js")) : b(WaveSurfer)
}(this, function(a) {
    "use strict";
    a.Timeline = {
        init: function(a) {
            this.params = a;
            var b = this.wavesurfer = a.wavesurfer;
            if (!this.wavesurfer) throw Error("No WaveSurfer intance provided");
            var c = this.drawer = this.wavesurfer.drawer;
            if (this.container = "string" == typeof a.container ? document.querySelector(a.container) : a.container, !this.container) throw Error("No container for WaveSurfer timeline");
            this.width = c.width, this.pixelRatio = this.drawer.params.pixelRatio, this.maxCanvasWidth = c.maxCanvasWidth || this.width, this.maxCanvasElementWidth = c.maxCanvasElementWidth || Math.round(this.maxCanvasWidth / this.pixelRatio), this.height = this.params.height || 20, this.notchPercentHeight = this.params.notchPercentHeight || 90, this.primaryColor = this.params.primaryColor || "#000", this.secondaryColor = this.params.secondaryColor || "#c0c0c0", this.primaryFontColor = this.params.primaryFontColor || "#000", this.secondaryFontColor = this.params.secondaryFontColor || "#000", this.fontFamily = this.params.fontFamily || "Arial", this.fontSize = this.params.fontSize || 10, this.timeInterval = this.params.timeInterval, this.primaryLabelInterval = this.params.primaryLabelInterval, this.secondaryLabelInterval = this.params.secondaryLabelInterval, this.formatTimeCallback = this.params.formatTimeCallback, this.canvases = [], this.createWrapper(), this.render(), c.wrapper.addEventListener("scroll", function(a) {
                this.updateScroll(a)
            }.bind(this)), b.on("redraw", this.render.bind(this)), b.on("destroy", this.destroy.bind(this))
        },
        destroy: function() {
            this.unAll(), this.wrapper && this.wrapper.parentNode && (this.wrapper.parentNode.removeChild(this.wrapper), this.wrapper = null)
        },
        createWrapper: function() {
            var a = this.container.querySelector("timeline");
            a && this.container.removeChild(a);
            var b = this.wavesurfer.params;
            this.wrapper = this.container.appendChild(document.createElement("timeline")), this.drawer.style(this.wrapper, {
                display: "block",
                position: "relative",
                userSelect: "none",
                webkitUserSelect: "none",
                height: this.height + "px"
            }), (b.fillParent || b.scrollParent) && this.drawer.style(this.wrapper, {
                width: "100%",
                overflowX: "hidden",
                overflowY: "hidden"
            });
            var c = this;
            this.wrapper.addEventListener("click", function(a) {
                a.preventDefault();
                var b = "offsetX" in a ? a.offsetX : a.layerX;
                c.fireEvent("click", b / c.wrapper.scrollWidth || 0)
            })
        },
        removeOldCanvases: function() {
            for (; this.canvases.length > 0;) {
                var a = this.canvases.pop();
                a.parentElement.removeChild(a)
            }
        },
        createCanvases: function() {
            this.removeOldCanvases();
            for (var a, b = Math.round(this.drawer.wrapper.scrollWidth), c = Math.ceil(b / this.maxCanvasElementWidth), d = 0; d < c; d++) a = this.wrapper.appendChild(document.createElement("canvas")), this.canvases.push(a), this.drawer.style(a, {
                position: "absolute",
                zIndex: 4
            })
        },
        render: function() {
            this.createCanvases(), this.updateCanvasStyle(), this.drawTimeCanvases()
        },
        updateCanvasStyle: function() {
            for (var a = this.canvases.length, b = 0; b < a; b++) {
                var c = this.canvases[b],
                    d = this.maxCanvasElementWidth;
                b === a - 1 && (d = this.drawer.wrapper.scrollWidth - this.maxCanvasElementWidth * (a - 1)), c.width = d * this.pixelRatio, c.height = this.height * this.pixelRatio, c.style.width = d + "px", c.style.height = this.height + "px", c.style.left = b * this.maxCanvasElementWidth + "px"
            }
        },
        drawTimeCanvases: function() {
            var a = this.wavesurfer.backend,
                b = this.wavesurfer.params,
                c = a.getDuration(),
                d = this;
            if (b.fillParent && !b.scrollParent) var e = this.drawer.getWidth();
            else e = this.drawer.wrapper.scrollWidth * b.pixelRatio;
            var f = e / c;
            if (!(c <= 0)) {
                var g = 0,
                    h = 0,
                    i = parseInt(c, 10) + 1,
                    j = function(a) {
                        if ("function" == typeof d.formatTimeCallback) return d.formatTimeCallback(a);
                        if (a / 60 > 1) {
                            var b = parseInt(a / 60),
                                a = parseInt(a % 60);
                            return a = a < 10 ? "0" + a : a, "" + b + ":" + a
                        }
                        return a
                    };
                if (1 * f >= 25) var k = 1,
                    l = 10,
                    m = 5;
                else if (5 * f >= 25) var k = 5,
                    l = 6,
                    m = 2;
                else if (15 * f >= 25) var k = 15,
                    l = 4,
                    m = 2;
                else var k = 60,
                    l = 4,
                    m = 2;
                k = this.timeInterval || k, l = this.primaryLabelInterval || l, m = this.secondaryLabelInterval || m;
                for (var n = this.height - 4, o = this.height * (this.notchPercentHeight / 100) - 4, p = this.fontSize * b.pixelRatio, q = 0; q < i / k; q++) q % l == 0 ? (this.setFillStyles(this.primaryColor), this.fillRect(g, 0, 1, n), this.setFonts(p + "px " + this.fontFamily), this.setFillStyles(this.primaryFontColor), this.fillText(j(h), g + 5, n)) : q % m == 0 ? (this.setFillStyles(this.secondaryColor), this.fillRect(g, 0, 1, n), this.setFonts(p + "px " + this.fontFamily), this.setFillStyles(this.secondaryFontColor), this.fillText(j(h), g + 5, n)) : (this.setFillStyles(this.secondaryColor), this.fillRect(g, 0, 1, o)), h += k, g += f * k
            }
        },
        setFillStyles: function(a) {
            for (var b in this.canvases) this.canvases[b].getContext("2d").fillStyle = a
        },
        setFonts: function(a) {
            for (var b in this.canvases) this.canvases[b].getContext("2d").font = a
        },
        fillRect: function(a, b, c, d) {
            for (var e in this.canvases) {
                var f = this.canvases[e],
                    g = e * this.maxCanvasWidth,
                    h = {
                        x1: Math.max(a, e * this.maxCanvasWidth),
                        y1: b,
                        x2: Math.min(a + c, e * this.maxCanvasWidth + f.width),
                        y2: b + d
                    };
                h.x1 < h.x2 && f.getContext("2d").fillRect(h.x1 - g, h.y1, h.x2 - h.x1, h.y2 - h.y1)
            }
        },
        fillText: function(a, b, c) {
            var d, e = 0;
            for (var f in this.canvases) {
                var g = this.canvases[f].getContext("2d"),
                    h = g.canvas.width;
                if (e > b + d) break;
                e + h > b && (d = g.measureText(a).width, g.fillText(a, b - e, c)), e += h
            }
        },
        updateScroll: function() {
            this.wrapper.scrollLeft = this.drawer.wrapper.scrollLeft
        }
    }, a.util.extend(a.Timeline, a.Observer)
});