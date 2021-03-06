! function t(e, i, s) {
    function n(a, r) {
        if (!i[a]) {
            if (!e[a]) {
                var h = "function" == typeof require && require;
                if (!r && h) return h(a, !0);
                if (o) return o(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            var l = i[a] = {
                exports: {}
            };
            e[a][0].call(l.exports, function(t) {
                var i = e[a][1][t];
                return n(i ? i : t)
            }, l, l.exports, t, e, i, s)
        }
        return i[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < s.length; a++) n(s[a]);
    return n
}({
    1: [function(t, e, i) {
        "use strict";

        function s(t) {
            var e;
            this.getElement(t.element), this.x1 = 0, this.y1 = 0, this.name = t.name || !1, this.elToSetClassOn = t.elToSetClassOn || "body", this.direction = t.direction || "diagonal", this.isPausedWhenNotInView = t.isPausedWhenNotInView || !1, this.opacity = t.opacity, this.states = t.states, this.stateTransitionSpeed = t.stateTransitionSpeed || 1e3, this.previousTimeStamp = null, this.progress = 0, this.isPaused = !1, this.isCleared = !1, this.isPausedBecauseNotInView = !1, this.iscurrentColorsSet = !1, this.context = this.canvas.getContext("2d"), this.channels = {}, this.channelsIndex = 0, this.activeState = t.defaultStateName || "default-state", this.isChangingState = !1, this.activeColors = [], this.activeColorDiff = [], this.activetransitionSpeed = null, this.currentColors = [], this.eventPolyfill(), this.scrollDebounceThreshold = t.scrollDebounceThreshold || 300, this.scrollDebounceTimeout = null, this.isImgLoaded = !1, this.isCanvasInWindowView = !1, this.firstScrollInit = !0, this.animating = !1, t.image && t.image.source && (this.image = {
                source: t.image.source,
                position: t.image.position || ["center", "center"],
                stretchMode: t.image.stretchMode || !1,
                blendingMode: t.image.blendingMode || !1
            }), e = this.opacity.map(function(t) {
                return 1 !== t
            }).indexOf(!0) !== -1, this.shouldClearCanvasOnEachFrame = !!this.image || e, this.events = {
                start: new CustomEvent("granim:start"),
                end: new CustomEvent("granim:end"),
                gradientChange: function(t) {
                    return new CustomEvent("granim:gradientChange", {
                        detail: {
                            isLooping: t.isLooping,
                            colorsFrom: t.colorsFrom,
                            colorsTo: t.colorsTo,
                            activeState: t.activeState
                        },
                        bubbles: !1,
                        cancelable: !1
                    })
                }
            }, this.callbacks = {
                onStart: "function" == typeof t.onStart && t.onStart,
                onGradientChange: "function" == typeof t.onGradientChange && t.onGradientChange,
                onEnd: "function" == typeof t.onEnd && t.onEnd
            }, this.getDimensions(), this.canvas.setAttribute("width", this.x1), this.canvas.setAttribute("height", this.y1), this.setColors(), this.image && (this.validateInput("image"), this.prepareImage()), this.pauseWhenNotInViewNameSpace = this.pauseWhenNotInView.bind(this), this.setSizeAttributesNameSpace = this.setSizeAttributes.bind(this), this.onResize(), this.isPausedWhenNotInView ? this.onScroll() : this.image || (this.refreshColors(), this.animation = requestAnimationFrame(this.animateColors.bind(this)), this.animating = !0), this.callbacks.onStart && this.callbacks.onStart(), this.canvas.dispatchEvent(this.events.start)
        }
        s.prototype.onResize = t("./onResize.js"), s.prototype.onScroll = t("./onScroll.js"), s.prototype.validateInput = t("./validateInput.js"), s.prototype.triggerError = t("./triggerError.js"), s.prototype.prepareImage = t("./prepareImage.js"), s.prototype.eventPolyfill = t("./eventPolyfill.js"), s.prototype.colorDiff = t("./colorDiff.js"), s.prototype.hexToRgb = t("./hexToRgb.js"), s.prototype.setDirection = t("./setDirection.js"), s.prototype.setColors = t("./setColors.js"), s.prototype.getElement = t("./getElement.js"), s.prototype.getDimensions = t("./getDimensions.js"), s.prototype.getLightness = t("./getLightness.js"), s.prototype.getCurrentColors = t("./getCurrentColors.js"), s.prototype.animateColors = t("./animateColors.js"), s.prototype.refreshColors = t("./refreshColors.js"), s.prototype.makeGradient = t("./makeGradient.js"), s.prototype.pause = t("./pause.js"), s.prototype.play = t("./play.js"), s.prototype.clear = t("./clear.js"), s.prototype.destroy = t("./destroy.js"), s.prototype.pauseWhenNotInView = t("./pauseWhenNotInView.js"), s.prototype.setSizeAttributes = t("./setSizeAttributes.js"), s.prototype.changeDirection = t("./changeDirection.js"), s.prototype.changeBlendingMode = t("./changeBlendingMode.js"), s.prototype.changeState = t("./changeState.js"), e.exports = s
    }, {
        "./animateColors.js": 2,
        "./changeBlendingMode.js": 3,
        "./changeDirection.js": 4,
        "./changeState.js": 5,
        "./clear.js": 6,
        "./colorDiff.js": 7,
        "./destroy.js": 8,
        "./eventPolyfill.js": 9,
        "./getCurrentColors.js": 10,
        "./getDimensions.js": 11,
        "./getElement.js": 12,
        "./getLightness.js": 13,
        "./hexToRgb.js": 14,
        "./makeGradient.js": 15,
        "./onResize.js": 16,
        "./onScroll.js": 17,
        "./pause.js": 18,
        "./pauseWhenNotInView.js": 19,
        "./play.js": 20,
        "./prepareImage.js": 21,
        "./refreshColors.js": 22,
        "./setColors.js": 23,
        "./setDirection.js": 24,
        "./setSizeAttributes.js": 25,
        "./triggerError.js": 26,
        "./validateInput.js": 27
    }],
    2: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e, i, s, n = t - this.previousTimeStamp > 100,
                o = void 0 === this.states[this.activeState].loop || this.states[this.activeState].loop;
            (null === this.previousTimeStamp || n) && (this.previousTimeStamp = t), this.progress = this.progress + (t - this.previousTimeStamp), e = (this.progress / this.activetransitionSpeed * 100).toFixed(2), this.previousTimeStamp = t, this.refreshColors(e), e < 100 ? this.animation = requestAnimationFrame(this.animateColors.bind(this)) : this.channelsIndex < this.states[this.activeState].gradients.length - 2 || o ? (this.isChangingState && (this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5e3), this.previousTimeStamp = null, this.progress = 0, this.channelsIndex++, i = !1, this.channelsIndex === this.states[this.activeState].gradients.length - 1 ? i = !0 : this.channelsIndex === this.states[this.activeState].gradients.length && (this.channelsIndex = 0), s = void 0 === this.states[this.activeState].gradients[this.channelsIndex + 1] ? this.states[this.activeState].gradients[0] : this.states[this.activeState].gradients[this.channelsIndex + 1], this.setColors(), this.animation = requestAnimationFrame(this.animateColors.bind(this)), this.callbacks.onGradientChange && this.callbacks.onGradientChange({
                isLooping: i,
                colorsFrom: this.states[this.activeState].gradients[this.channelsIndex],
                colorsTo: s,
                activeState: this.activeState
            }), this.canvas.dispatchEvent(this.events.gradientChange({
                isLooping: i,
                colorsFrom: this.states[this.activeState].gradients[this.channelsIndex],
                colorsTo: s,
                activeState: this.activeState
            }))) : (cancelAnimationFrame(this.animation), this.callbacks.onEnd && this.callbacks.onEnd(), this.canvas.dispatchEvent(new CustomEvent("granim:end")))
        }
    }, {}],
    3: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            this.context.clearRect(0, 0, this.x1, this.y1), this.context.globalCompositeOperation = this.image.blendingMode = t, this.validateInput("blendingMode"), this.isPaused && this.refreshColors()
        }
    }, {}],
    4: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            this.context.clearRect(0, 0, this.x1, this.y1), this.direction = t, this.validateInput("direction"), this.isPaused && this.refreshColors()
        }
    }, {}],
    5: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e, i, s = this;
            this.activeState !== t && (this.isPaused || (this.isPaused = !0, this.pause()), this.channelsIndex = -1, this.activetransitionSpeed = this.stateTransitionSpeed, this.activeColorDiff = [], this.activeColors = this.getCurrentColors(), this.progress = 0, this.previousTimeStamp = null, this.isChangingState = !0, this.states[t].gradients[0].forEach(function(n, o, a) {
                e = s.hexToRgb(s.states[t].gradients[0][o]), i = s.colorDiff(s.activeColors[o], e), s.activeColorDiff.push(i)
            }), this.activeState = t, this.play())
        }
    }, {}],
    6: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            this.isPaused ? this.isPaused = !1 : cancelAnimationFrame(this.animation), this.isCleared = !0, this.context.clearRect(0, 0, this.x1, this.y1)
        }
    }, {}],
    7: [function(t, e, i) {
        "use strict";
        e.exports = function(t, e) {
            var i, s = [];
            for (i = 0; i < 3; i++) s.push(e[i] - t[i]);
            return s
        }
    }, {}],
    8: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            this.onResize("removeListeners"), this.onScroll("removeListeners"), this.clear()
        }
    }, {}],
    9: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            function t(t, e) {
                e = e || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var i = document.createEvent("CustomEvent");
                return i.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), i
            }
            "function" != typeof window.CustomEvent && (t.prototype = window.Event.prototype, window.CustomEvent = t)
        }
    }, {}],
    10: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t, e, i = [];
            for (t = 0; t < this.currentColors.length; t++)
                for (i.push([]), e = 0; e < 3; e++) i[t].push(this.currentColors[t][e]);
            return i
        }
    }, {}],
    11: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            this.x1 = this.canvas.offsetWidth, this.y1 = this.canvas.offsetHeight
        }
    }, {}],
    12: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            if (t instanceof HTMLCanvasElement) this.canvas = t;
            else {
                if ("string" != typeof t) throw new Error("The element you used is neither a String, nor a HTMLCanvasElement");
                this.canvas = document.querySelector(t)
            }
            if (!this.canvas) throw new Error("`" + t + "` could not be found in the DOM")
        }
    }, {}],
    13: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t, e, i = this.getCurrentColors(),
                s = null,
                n = i.map(function(t) {
                    return Math.max(t[0], t[1], t[2])
                });
            for (e = 0; e < n.length; e++) s = null === s ? n[e] : s + n[e], e === n.length - 1 && (t = Math.round(s / (e + 1)));
            return t >= 128 ? "light" : "dark"
        }
    }, {}],
    14: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            t = t.replace(e, function(t, e, i, s) {
                return e + e + i + i + s + s
            });
            var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            return i ? [parseInt(i[1], 16), parseInt(i[2], 16), parseInt(i[3], 16)] : null
        }
    }, {}],
    15: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t, e, i = this.setDirection(),
                s = document.querySelector(this.elToSetClassOn).classList;
            for (this.shouldClearCanvasOnEachFrame && this.context.clearRect(0, 0, this.x1, this.y1), this.image && this.context.drawImage(this.imageNode, this.imagePosition.x, this.imagePosition.y, this.imagePosition.width, this.imagePosition.height), t = 0; t < this.currentColors.length; t++) e = t ? (1 / (this.currentColors.length - 1) * t).toFixed(2) : 0, i.addColorStop(e, "rgba(" + this.currentColors[t][0] + ", " + this.currentColors[t][1] + ", " + this.currentColors[t][2] + ", " + this.opacity[t] + ")");
            this.name && ("light" === this.getLightness() ? (s.remove(this.name + "-dark"), s.add(this.name + "-light")) : (s.remove(this.name + "-light"), s.add(this.name + "-dark"))), this.context.fillStyle = i, this.context.fillRect(0, 0, this.x1, this.y1)
        }
    }, {}],
    16: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "removeListeners" === t ? void window.removeEventListener("resize", this.setSizeAttributesNameSpace) : void window.addEventListener("resize", this.setSizeAttributesNameSpace)
        }
    }, {}],
    17: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            return "removeListeners" === t ? void window.removeEventListener("scroll", this.pauseWhenNotInViewNameSpace) : (window.addEventListener("scroll", this.pauseWhenNotInViewNameSpace), void this.pauseWhenNotInViewNameSpace())
        }
    }, {}],
    18: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = "isPausedBecauseNotInView" === t;
            this.isCleared || (e || (this.isPaused = !0), cancelAnimationFrame(this.animation), this.animating = !1)
        }
    }, {}],
    19: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t = this;
            this.scrollDebounceTimeout && clearTimeout(this.scrollDebounceTimeout), this.scrollDebounceTimeout = setTimeout(function() {
                var e = t.canvas.getBoundingClientRect();
                if (t.isCanvasInWindowView = !(e.bottom < 0 || e.right < 0 || e.left > window.innerWidth || e.top > window.innerHeight), t.isCanvasInWindowView) {
                    if (!t.isPaused || t.firstScrollInit) {
                        if (t.image && !t.isImgLoaded) return;
                        t.isPausedBecauseNotInView = !1, t.play("isPlayedBecauseInView"), t.firstScrollInit = !1
                    }
                } else !t.image && t.firstScrollInit && (t.refreshColors(), t.firstScrollInit = !1), t.isPaused || t.isPausedBecauseNotInView || (t.isPausedBecauseNotInView = !0, t.pause("isPausedBecauseNotInView"))
            }, this.scrollDebounceThreshold)
        }
    }, {}],
    20: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = "isPlayedBecauseInView" === t;
            e || (this.isPaused = !1), this.isCleared = !1, this.animating || (this.animation = requestAnimationFrame(this.animateColors.bind(this)), this.animating = !0)
        }
    }, {}],
    21: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            function t() {
                function t(t) {
                    var i, s = e[t + "1"],
                        n = e["x" === t ? "imgOriginalWidth" : "imgOriginalHeight"],
                        o = "x" === t ? e.image.position[0] : e.image.position[1];
                    switch (o) {
                        case "center":
                            i = n > s ? -(n - s) / 2 : (s - n) / 2, e.imagePosition[t] = i, e.imagePosition["x" === t ? "width" : "height"] = n;
                            break;
                        case "top":
                            e.imagePosition.y = 0, e.imagePosition.height = n;
                            break;
                        case "bottom":
                            e.imagePosition.y = s - n, e.imagePosition.height = n;
                            break;
                        case "right":
                            e.imagePosition.x = s - n, e.imagePosition.width = n;
                            break;
                        case "left":
                            e.imagePosition.x = 0, e.imagePosition.width = n
                    }
                    if (e.image.stretchMode) switch (o = "x" === t ? e.image.stretchMode[0] : e.image.stretchMode[1]) {
                        case "stretch":
                            e.imagePosition[t] = 0, e.imagePosition["x" === t ? "width" : "height"] = s;
                            break;
                        case "stretch-if-bigger":
                            if (n < s) break;
                            e.imagePosition[t] = 0, e.imagePosition["x" === t ? "width" : "height"] = s;
                            break;
                        case "stretch-if-smaller":
                            if (n > s) break;
                            e.imagePosition[t] = 0, e.imagePosition["x" === t ? "width" : "height"] = s
                    }
                }
                var i, s;
                for (i = 0; i < 2; i++) s = i ? "y" : "x", t(s)
            }
            var e = this;
            return this.imagePosition || (this.imagePosition = {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }), this.image.blendingMode && (this.context.globalCompositeOperation = this.image.blendingMode), this.imageNode ? void t() : (this.imageNode = new Image, this.imageNode.onerror = function() {
                throw new Error("Granim: The image source is invalid.")
            }, this.imageNode.onload = function() {
                e.imgOriginalWidth = e.imageNode.width, e.imgOriginalHeight = e.imageNode.height, t(), e.refreshColors(), e.isPausedWhenNotInView && !e.isCanvasInWindowView || (e.animation = requestAnimationFrame(e.animateColors.bind(e))), e.isImgLoaded = !0
            }, void(this.imageNode.src = this.image.source))
        }
    }, {}],
    22: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e, i, s, n = this;
            for (i = 0; i < this.activeColors.length; i++)
                for (s = 0; s < 3; s++) e = n.activeColors[i][s] + Math.ceil(n.activeColorDiff[i][s] / 100 * t), e <= 255 && e >= 0 && (n.currentColors[i][s] = e);
            this.makeGradient()
        }
    }, {}],
    23: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t, e, i = this;
            return this.channels[this.activeState] || (this.channels[this.activeState] = []), void 0 !== this.channels[this.activeState][this.channelsIndex] ? (this.activeColors = this.channels[this.activeState][this.channelsIndex].colors, void(this.activeColorDiff = this.channels[this.activeState][this.channelsIndex].colorsDiff)) : (this.channels[this.activeState].push([{}]), this.channels[this.activeState][this.channelsIndex].colors = [], this.channels[this.activeState][this.channelsIndex].colorsDiff = [], this.activeColors = [], this.activeColorDiff = [], this.states[this.activeState].gradients[this.channelsIndex].forEach(function(s, n) {
                var o = i.hexToRgb(s),
                    a = i.channels[i.activeState];
                a[i.channelsIndex].colors.push(o), i.activeColors.push(o), i.iscurrentColorsSet || i.currentColors.push(i.hexToRgb(s)), i.channelsIndex === i.states[i.activeState].gradients.length - 1 ? t = i.colorDiff(a[i.channelsIndex].colors[n], a[0].colors[n]) : (e = i.hexToRgb(i.states[i.activeState].gradients[i.channelsIndex + 1][n]), t = i.colorDiff(a[i.channelsIndex].colors[n], e)), a[i.channelsIndex].colorsDiff.push(t), i.activeColorDiff.push(t)
            }), this.activetransitionSpeed = this.states[this.activeState].transitionSpeed || 5e3, void(this.iscurrentColorsSet = !0))
        }
    }, {}],
    24: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            var t = this.context;
            switch (this.direction) {
                default: this.triggerError("direction");
                break;
                case "diagonal":
                        return t.createLinearGradient(0, 0, this.x1, this.y1);
                case "left-right":
                        return t.createLinearGradient(0, 0, this.x1, 0);
                case "top-bottom":
                        return t.createLinearGradient(this.x1 / 2, 0, this.x1 / 2, this.y1);
                case "radial":
                        return t.createRadialGradient(this.x1 / 2, this.y1 / 2, this.x1 / 2, this.x1 / 2, this.y1 / 2, 0)
            }
        }
    }, {}],
    25: [function(t, e, i) {
        "use strict";
        e.exports = function() {
            this.getDimensions(), this.canvas.setAttribute("width", this.x1), this.canvas.setAttribute("height", this.y1), this.image && this.prepareImage(), this.refreshColors()
        }
    }, {}],
    26: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = "https://sarcadass.github.io/granim.js/api.html";
            throw new Error('Granim: Input error on "' + t + '" option.\nCheck the API ' + e + ".")
        }
    }, {}],
    27: [function(t, e, i) {
        "use strict";
        e.exports = function(t) {
            var e = ["left", "center", "right"],
                i = ["top", "center", "bottom"],
                s = ["stretch", "stretch-if-smaller", "stretch-if-bigger"],
                n = ["multiply", "screen", "normal", "overlay", "darken", "lighten", "lighter", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
            switch (t) {
                case "image":
                    Array.isArray(this.image.position) && 2 === this.image.position.length && e.indexOf(this.image.position[0]) !== -1 && i.indexOf(this.image.position[1]) !== -1 || this.triggerError("image.position"), this.image.stretchMode && (Array.isArray(this.image.stretchMode) && 2 === this.image.stretchMode.length && s.indexOf(this.image.stretchMode[0]) !== -1 && s.indexOf(this.image.stretchMode[1]) !== -1 || this.triggerError("image.stretchMode"));
                    break;
                case "blendingMode":
                    n.indexOf(this.image.blendingMode) === -1 && (this.clear(), this.triggerError("blendingMode"))
            }
        }
    }, {}],
    28: [function(t, e, i) {
        window.Granim = t("./lib/Granim.js")
    }, {
        "./lib/Granim.js": 1
    }]
}, {}, [28]);