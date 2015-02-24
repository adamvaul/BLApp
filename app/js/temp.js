"use strict";

function toRadians(a) {
    return Math.PI * a / 180
}

function toDegrees(a) {
    return a * (180 / Math.PI)
}

function randomRange(a, b) {
    return Math.random() * (b - a) + a
}

function constrain(a, b, c) {
    return Math.max(b, Math.min(a, c))
}

function EasedValue(a) {
    var b = 0,
        c = 0,
        d = a || .5;
    return {
        now: function (a) {
            c = b = a
        },
        set: function (a) {
            c = a
        },
        get: function () {
            return b
        },
        wrap: function () {
            for (; b > Math.PI;) b -= 2 * Math.PI;
            for (; b < -Math.PI;) b += 2 * Math.PI;
            b - c > Math.PI ? b -= 2 * Math.PI : b - c < -Math.PI && (b += 2 * Math.PI)
        },
        setEase: function (a) {
            d = a
        },
        update: function () {
            b += (c - b) * d
        },
        add: function (a) {
            c += a
        },
        clamp: function () {
            for (; b > Math.PI;) b -= 2 * Math.PI;
            for (; b < -Math.PI;) b += 2 * Math.PI
        },
        debug: function () {
            return "cur: " + b + ", target: " + c
        }
    }
}

function loadMapStyles() {
    for (var a in viewStyles) viewStyles[a].mapstyle = new google.maps.StyledMapType(viewStyles[a].style, {
        name: a
    })
}

function loadAssets() {
    assetManager.addModel("pegman", "game/viewport/models/pegman_w_backpack_01.obj"), assetManager.addModel("pegmanHUD", "game/viewport/models/expressions/full_model.obj"), assetManager.addJSONModel("pegmanFaces", "game/viewport/models/expressions/expressions.js"), assetManager.addModel("parachute", "game/viewport/models/pegman_parachute.obj"), assetManager.addModel("gate_0", "game/viewport/models/gates/gate_rhombus_checkered.obj"), assetManager.addModel("gate_1", "game/viewport/models/gates/gate_rhombus.obj"), assetManager.addModel("gate_2", "game/viewport/models/gates/gate_torus_concave.obj"), assetManager.addModel("gate_3", "game/viewport/models/gates/gate_torus_convex_checkered.obj"), assetManager.addModel("gate_4", "game/viewport/models/gates/gate_torus.obj"), assetManager.addModel("gate_5", "game/viewport/models/gates/gate_tube_fatty_two.obj"), assetManager.addModel("gate_6", "game/viewport/models/gates/gate_tube_fatty.obj"), assetManager.addModel("gate_7", "game/viewport/models/gates/gate_tunnel_one.obj"), assetManager.addModel("gate_8", "game/viewport/models/gates/gate_tunnel_two.obj"), assetManager.addModel("landmark_base", "game/viewport/models/landmarks/base.obj");
    for (var a = 0; a < mapdive.landmarks.length; a++) assetManager.addModel(mapdive.landmarks[a].name, mapdive.landmarks[a].model);
    assetManager.addTexture("base_default", "game/viewport/textures/landmarks/base_default.jpg"), assetManager.addTexture("dropzone_default", "game/viewport/textures/landmarks/dropzone_default.jpg"), assetManager.addTexture("star_default", "game/viewport/textures/stars/star_default.jpg"), assetManager.addTexture("gate_default", "game/viewport/textures/gates/gate_urban.png"), assetManager.addTexture("gate_start", "game/viewport/textures/gates/gate_start_end.png");
    for (var b in viewStyles) viewStyles[b].textures && (viewStyles[b].textures.base && assetManager.addTexture("base_" + b, "game/viewport/textures/" + viewStyles[b].textures.base), viewStyles[b].textures.dropzone && assetManager.addTexture("dropzone_" + b, "game/viewport/textures/" + viewStyles[b].textures.dropzone), viewStyles[b].textures.star && assetManager.addTexture("star_" + b, "game/viewport/textures/" + viewStyles[b].textures.star), viewStyles[b].textures.gate && assetManager.addTexture("gate_" + b, "game/viewport/textures/" + viewStyles[b].textures.gate));
    assetManager.addModel("star", "game/viewport/models/items/star.obj");
    for (var c = ["8bit", "burningman", "night", "raver", "revolutions", "scifi", "terminal", "volcano"], a = 0; a < c.length; a++) assetManager.addModel("bonus_" + c[a], "game/viewport/models/items/bonus_" + c[a] + ".obj"), assetManager.addTexture("bonus_" + c[a], "game/viewport/textures/bonus/bonus_" + c[a] + ".jpg"), assetManager.addTexture("head_" + c[a], "game/viewport/textures/pegman/pegman_" + c[a] + "_head.png"), assetManager.addTexture("helmet_" + c[a], "game/viewport/textures/pegman/pegman_" + c[a] + "_helmet.png"), assetManager.addTexture("body_" + c[a], "game/viewport/textures/pegman/pegman_" + c[a] + "_bodypart.png"), assetManager.addTexture("backpack_" + c[a], "game/viewport/textures/pegman/pegman_" + c[a] + "_backpack.png");
    assetManager.addTexture("head_default", "game/viewport/textures/pegman/pegman_default_head.png"), assetManager.addTexture("helmet_default", "game/viewport/textures/pegman/pegman_default_helmet.png"), assetManager.addTexture("body_default", "game/viewport/textures/pegman/pegman_default_bodypart.png"), assetManager.addTexture("backpack_default", "game/viewport/textures/pegman/pegman_default_backpack.png"), assetManager.addTexture("TEXTURE_MISSING", "game/viewport/textures/texture_missing.png"), assetManager.addTexture("cloud", "game/viewport/images/cloud.png"), assetManager.addTexture("particle", "game/viewport/textures/fireworks.jpg"), assetManager.addTexture("parachute", "game/viewport/textures/parachute.jpg"), assetManager.addTexture("helmetHUD", "game/viewport/textures/pegman_helmet_hud.png"), assetManager.loadAssets(mapdive.UI.loadingComplete, mapdive.UI.loadingProgress)
}

function onAssetsLoaded() {
    mapdive.viewport.initialize(), mapdive.control.initialize(), mapdive.control.loadLevel("statue of liberty"), $(window).on("resize", function () {
        mapdive.viewport.resize($(window).width(), $(window).height())
    }), mapdive.viewport.resize($(window).width(), $(window).height()), gameLoop()
}

function gameLoop() {
    mapdive.control.update(), mapdive.viewport.updateViewState(mapdive.control.getFrameState()), mapdive.viewport.render(), requestAnimationFrame(gameLoop)
}
var THREE = THREE || {
    REVISION: "58"
};
self.console = self.console || {
    info: function () {},
    log: function () {},
    debug: function () {},
    warn: function () {},
    error: function () {}
}, self.Int32Array = self.Int32Array || Array, self.Float32Array = self.Float32Array || Array, String.prototype.trim = String.prototype.trim || function () {
    return this.replace(/^\s+|\s+$/g, "")
}, THREE.extend = function (a, b) {
    if (Object.keys)
        for (var c = Object.keys(b), d = 0, e = c.length; e > d; d++) {
            var f = c[d];
            Object.defineProperty(a, f, Object.getOwnPropertyDescriptor(b, f))
        } else
            for (f in c = {}.hasOwnProperty, b) c.call(b, f) && (a[f] = b[f]);
    return a
},
function () {
    for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
    void 0 === window.requestAnimationFrame && (window.requestAnimationFrame = function (b) {
        var c = Date.now(),
            d = Math.max(0, 16 - (c - a)),
            e = window.setTimeout(function () {
                b(c + d)
            }, d);
        return a = c + d, e
    }), window.cancelAnimationFrame = window.cancelAnimationFrame || function (a) {
        window.clearTimeout(a)
    }
}(), THREE.CullFaceNone = 0, THREE.CullFaceBack = 1, THREE.CullFaceFront = 2, THREE.CullFaceFrontBack = 3, THREE.FrontFaceDirectionCW = 0, THREE.FrontFaceDirectionCCW = 1, THREE.BasicShadowMap = 0, THREE.PCFShadowMap = 1, THREE.PCFSoftShadowMap = 2, THREE.FrontSide = 0, THREE.BackSide = 1, THREE.DoubleSide = 2, THREE.NoShading = 0, THREE.FlatShading = 1, THREE.SmoothShading = 2, THREE.NoColors = 0, THREE.FaceColors = 1, THREE.VertexColors = 2, THREE.NoBlending = 0, THREE.NormalBlending = 1, THREE.AdditiveBlending = 2, THREE.SubtractiveBlending = 3, THREE.MultiplyBlending = 4, THREE.CustomBlending = 5, THREE.AddEquation = 100, THREE.SubtractEquation = 101, THREE.ReverseSubtractEquation = 102, THREE.ZeroFactor = 200, THREE.OneFactor = 201, THREE.SrcColorFactor = 202, THREE.OneMinusSrcColorFactor = 203, THREE.SrcAlphaFactor = 204, THREE.OneMinusSrcAlphaFactor = 205, THREE.DstAlphaFactor = 206, THREE.OneMinusDstAlphaFactor = 207, THREE.DstColorFactor = 208, THREE.OneMinusDstColorFactor = 209, THREE.SrcAlphaSaturateFactor = 210, THREE.MultiplyOperation = 0, THREE.MixOperation = 1, THREE.AddOperation = 2, THREE.UVMapping = function () {}, THREE.CubeReflectionMapping = function () {}, THREE.CubeRefractionMapping = function () {}, THREE.SphericalReflectionMapping = function () {}, THREE.SphericalRefractionMapping = function () {}, THREE.RepeatWrapping = 1e3, THREE.ClampToEdgeWrapping = 1001, THREE.MirroredRepeatWrapping = 1002, THREE.NearestFilter = 1003, THREE.NearestMipMapNearestFilter = 1004, THREE.NearestMipMapLinearFilter = 1005, THREE.LinearFilter = 1006, THREE.LinearMipMapNearestFilter = 1007, THREE.LinearMipMapLinearFilter = 1008, THREE.UnsignedByteType = 1009, THREE.ByteType = 1010, THREE.ShortType = 1011, THREE.UnsignedShortType = 1012, THREE.IntType = 1013, THREE.UnsignedIntType = 1014, THREE.FloatType = 1015, THREE.UnsignedShort4444Type = 1016, THREE.UnsignedShort5551Type = 1017, THREE.UnsignedShort565Type = 1018, THREE.AlphaFormat = 1019, THREE.RGBFormat = 1020, THREE.RGBAFormat = 1021, THREE.LuminanceFormat = 1022, THREE.LuminanceAlphaFormat = 1023, THREE.RGB_S3TC_DXT1_Format = 2001, THREE.RGBA_S3TC_DXT1_Format = 2002, THREE.RGBA_S3TC_DXT3_Format = 2003, THREE.RGBA_S3TC_DXT5_Format = 2004, THREE.Color = function (a) {
    return void 0 !== a && this.set(a), this
}, THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    set: function (a) {
        return a instanceof THREE.Color ? this.copy(a) : "number" == typeof a ? this.setHex(a) : "string" == typeof a && this.setStyle(a), this
    },
    setHex: function (a) {
        return a = Math.floor(a), this.r = (255 & a >> 16) / 255, this.g = (255 & a >> 8) / 255, this.b = (255 & a) / 255, this
    },
    setRGB: function (a, b, c) {
        return this.r = a, this.g = b, this.b = c, this
    },
    setHSL: function (a, b, c) {
        if (0 === b) this.r = this.g = this.b = c;
        else {
            var d = function (a, b, c) {
                    return 0 > c && (c += 1), c > 1 && (c -= 1), 1 / 6 > c ? a + 6 * (b - a) * c : .5 > c ? b : 2 / 3 > c ? a + 6 * (b - a) * (2 / 3 - c) : a
                },
                b = .5 >= c ? c * (1 + b) : c + b - c * b,
                c = 2 * c - b;
            this.r = d(c, b, a + 1 / 3), this.g = d(c, b, a), this.b = d(c, b, a - 1 / 3)
        }
        return this
    },
    setStyle: function (a) {
        return /^rgb\((\d+),(\d+),(\d+)\)$/i.test(a) ? (a = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a), this.r = Math.min(255, parseInt(a[1], 10)) / 255, this.g = Math.min(255, parseInt(a[2], 10)) / 255, this.b = Math.min(255, parseInt(a[3], 10)) / 255, this) : /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a) ? (a = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a), this.r = Math.min(100, parseInt(a[1], 10)) / 100, this.g = Math.min(100, parseInt(a[2], 10)) / 100, this.b = Math.min(100, parseInt(a[3], 10)) / 100, this) : /^\#([0-9a-f]{6})$/i.test(a) ? (a = /^\#([0-9a-f]{6})$/i.exec(a), this.setHex(parseInt(a[1], 16)), this) : /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a) ? (a = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a), this.setHex(parseInt(a[1] + a[1] + a[2] + a[2] + a[3] + a[3], 16)), this) : /^(\w+)$/i.test(a) ? (this.setHex(THREE.ColorKeywords[a]), this) : void 0
    },
    copy: function (a) {
        return this.r = a.r, this.g = a.g, this.b = a.b, this
    },
    copyGammaToLinear: function (a) {
        return this.r = a.r * a.r, this.g = a.g * a.g, this.b = a.b * a.b, this
    },
    copyLinearToGamma: function (a) {
        return this.r = Math.sqrt(a.r), this.g = Math.sqrt(a.g), this.b = Math.sqrt(a.b), this
    },
    convertGammaToLinear: function () {
        var a = this.r,
            b = this.g,
            c = this.b;
        return this.r = a * a, this.g = b * b, this.b = c * c, this
    },
    convertLinearToGamma: function () {
        return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), this
    },
    getHex: function () {
        return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
    },
    getHexString: function () {
        return ("000000" + this.getHex().toString(16)).slice(-6)
    },
    getHSL: function () {
        var a = {
            h: 0,
            s: 0,
            l: 0
        };
        return function () {
            var b, c = this.r,
                d = this.g,
                e = this.b,
                f = Math.max(c, d, e),
                g = Math.min(c, d, e),
                h = (g + f) / 2;
            if (g === f) g = b = 0;
            else {
                var i = f - g,
                    g = .5 >= h ? i / (f + g) : i / (2 - f - g);
                switch (f) {
                case c:
                    b = (d - e) / i + (e > d ? 6 : 0);
                    break;
                case d:
                    b = (e - c) / i + 2;
                    break;
                case e:
                    b = (c - d) / i + 4
                }
                b /= 6
            }
            return a.h = b, a.s = g, a.l = h, a
        }
    }(),
    getStyle: function () {
        return "rgb(" + (0 | 255 * this.r) + "," + (0 | 255 * this.g) + "," + (0 | 255 * this.b) + ")"
    },
    offsetHSL: function (a, b, c) {
        var d = this.getHSL();
        return d.h += a, d.s += b, d.l += c, this.setHSL(d.h, d.s, d.l), this
    },
    add: function (a) {
        return this.r += a.r, this.g += a.g, this.b += a.b, this
    },
    addColors: function (a, b) {
        return this.r = a.r + b.r, this.g = a.g + b.g, this.b = a.b + b.b, this
    },
    addScalar: function (a) {
        return this.r += a, this.g += a, this.b += a, this
    },
    multiply: function (a) {
        return this.r *= a.r, this.g *= a.g, this.b *= a.b, this
    },
    multiplyScalar: function (a) {
        return this.r *= a, this.g *= a, this.b *= a, this
    },
    lerp: function (a, b) {
        return this.r += (a.r - this.r) * b, this.g += (a.g - this.g) * b, this.b += (a.b - this.b) * b, this
    },
    equals: function (a) {
        return a.r === this.r && a.g === this.g && a.b === this.b
    },
    clone: function () {
        return (new THREE.Color).setRGB(this.r, this.g, this.b)
    }
}, THREE.ColorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
}, THREE.Quaternion = function (a, b, c, d) {
    this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = void 0 !== d ? d : 1
}, THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    set: function (a, b, c, d) {
        return this.x = a, this.y = b, this.z = c, this.w = d, this
    },
    copy: function (a) {
        return this.x = a.x, this.y = a.y, this.z = a.z, this.w = a.w, this
    },
    setFromEuler: function (a, b) {
        var c = Math.cos(a.x / 2),
            d = Math.cos(a.y / 2),
            e = Math.cos(a.z / 2),
            f = Math.sin(a.x / 2),
            g = Math.sin(a.y / 2),
            h = Math.sin(a.z / 2);
        return void 0 === b || "XYZ" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "YXZ" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e + f * g * h) : "ZXY" === b ? (this.x = f * d * e - c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "ZYX" === b ? (this.x = f * d * e - c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e + f * g * h) : "YZX" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e - f * g * h) : "XZY" === b && (this.x = f * d * e - c * g * h, this.y = c * g * e - f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e + f * g * h), this
    },
    setFromAxisAngle: function (a, b) {
        var c = b / 2,
            d = Math.sin(c);
        return this.x = a.x * d, this.y = a.y * d, this.z = a.z * d, this.w = Math.cos(c), this
    },
    setFromRotationMatrix: function (a) {
        var b = a.elements,
            c = b[0],
            a = b[4],
            d = b[8],
            e = b[1],
            f = b[5],
            g = b[9],
            h = b[2],
            i = b[6],
            b = b[10],
            j = c + f + b;
        return j > 0 ? (c = .5 / Math.sqrt(j + 1), this.w = .25 / c, this.x = (i - g) * c, this.y = (d - h) * c, this.z = (e - a) * c) : c > f && c > b ? (c = 2 * Math.sqrt(1 + c - f - b), this.w = (i - g) / c, this.x = .25 * c, this.y = (a + e) / c, this.z = (d + h) / c) : f > b ? (c = 2 * Math.sqrt(1 + f - c - b), this.w = (d - h) / c, this.x = (a + e) / c, this.y = .25 * c, this.z = (g + i) / c) : (c = 2 * Math.sqrt(1 + b - c - f), this.w = (e - a) / c, this.x = (d + h) / c, this.y = (g + i) / c, this.z = .25 * c), this
    },
    inverse: function () {
        return this.conjugate().normalize(), this
    },
    conjugate: function () {
        return this.x *= -1, this.y *= -1, this.z *= -1, this
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    normalize: function () {
        var a = this.length();
        return 0 === a ? (this.z = this.y = this.x = 0, this.w = 1) : (a = 1 / a, this.x *= a, this.y *= a, this.z *= a, this.w *= a), this
    },
    multiply: function (a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a)
    },
    multiplyQuaternions: function (a, b) {
        var c = a.x,
            d = a.y,
            e = a.z,
            f = a.w,
            g = b.x,
            h = b.y,
            i = b.z,
            j = b.w;
        return this.x = c * j + f * g + d * i - e * h, this.y = d * j + f * h + e * g - c * i, this.z = e * j + f * i + c * h - d * g, this.w = f * j - c * g - d * h - e * i, this
    },
    multiplyVector3: function (a) {
        return console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), a.applyQuaternion(this)
    },
    slerp: function (a, b) {
        var c = this.x,
            d = this.y,
            e = this.z,
            f = this.w,
            g = f * a.w + c * a.x + d * a.y + e * a.z;
        if (0 > g ? (this.w = -a.w, this.x = -a.x, this.y = -a.y, this.z = -a.z, g = -g) : this.copy(a), g >= 1) return this.w = f, this.x = c, this.y = d, this.z = e, this;
        var h = Math.acos(g),
            i = Math.sqrt(1 - g * g);
        return .001 > Math.abs(i) ? (this.w = .5 * (f + this.w), this.x = .5 * (c + this.x), this.y = .5 * (d + this.y), this.z = .5 * (e + this.z), this) : (g = Math.sin((1 - b) * h) / i, h = Math.sin(b * h) / i, this.w = f * g + this.w * h, this.x = c * g + this.x * h, this.y = d * g + this.y * h, this.z = e * g + this.z * h, this)
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
    },
    fromArray: function (a) {
        return this.x = a[0], this.y = a[1], this.z = a[2], this.w = a[3], this
    },
    toArray: function () {
        return [this.x, this.y, this.z, this.w]
    },
    clone: function () {
        return new THREE.Quaternion(this.x, this.y, this.z, this.w)
    }
}, THREE.Quaternion.slerp = function (a, b, c, d) {
    return c.copy(a).slerp(b, d)
}, THREE.Vector2 = function (a, b) {
    this.x = a || 0, this.y = b || 0
}, THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    set: function (a, b) {
        return this.x = a, this.y = b, this
    },
    setX: function (a) {
        return this.x = a, this
    },
    setY: function (a) {
        return this.y = a, this
    },
    setComponent: function (a, b) {
        switch (a) {
        case 0:
            this.x = b;
            break;
        case 1:
            this.y = b;
            break;
        default:
            throw Error("index is out of range: " + a)
        }
    },
    getComponent: function (a) {
        switch (a) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        default:
            throw Error("index is out of range: " + a)
        }
    },
    copy: function (a) {
        return this.x = a.x, this.y = a.y, this
    },
    add: function (a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b)) : (this.x += a.x, this.y += a.y, this)
    },
    addVectors: function (a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this
    },
    addScalar: function (a) {
        return this.x += a, this.y += a, this
    },
    sub: function (a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b)) : (this.x -= a.x, this.y -= a.y, this)
    },
    subVectors: function (a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this
    },
    multiplyScalar: function (a) {
        return this.x *= a, this.y *= a, this
    },
    divideScalar: function (a) {
        return 0 !== a ? (this.x /= a, this.y /= a) : this.set(0, 0), this
    },
    min: function (a) {
        return this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y), this
    },
    max: function (a) {
        return this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y), this
    },
    clamp: function (a, b) {
        return this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x), this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y), this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function (a) {
        var b = this.x - a.x,
            a = this.y - a.y;
        return b * b + a * a
    },
    setLength: function (a) {
        var b = this.length();
        return 0 !== b && a !== b && this.multiplyScalar(a / b), this
    },
    lerp: function (a, b) {
        return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y
    },
    fromArray: function (a) {
        return this.x = a[0], this.y = a[1], this
    },
    toArray: function () {
        return [this.x, this.y]
    },
    clone: function () {
        return new THREE.Vector2(this.x, this.y)
    }
}, THREE.Vector3 = function (a, b, c) {
    this.x = a || 0, this.y = b || 0, this.z = c || 0
}, THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function (a, b, c) {
        return this.x = a, this.y = b, this.z = c, this
    },
    setX: function (a) {
        return this.x = a, this
    },
    setY: function (a) {
        return this.y = a, this
    },
    setZ: function (a) {
        return this.z = a, this
    },
    setComponent: function (a, b) {
        switch (a) {
        case 0:
            this.x = b;
            break;
        case 1:
            this.y = b;
            break;
        case 2:
            this.z = b;
            break;
        default:
            throw Error("index is out of range: " + a)
        }
    },
    getComponent: function (a) {
        switch (a) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        default:
            throw Error("index is out of range: " + a)
        }
    },
    copy: function (a) {
        return this.x = a.x, this.y = a.y, this.z = a.z, this
    },
    add: function (a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b)) : (this.x += a.x, this.y += a.y, this.z += a.z, this)
    },
    addScalar: function (a) {
        return this.x += a, this.y += a, this.z += a, this
    },
    addVectors: function (a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this
    },
    sub: function (a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b)) : (this.x -= a.x, this.y -= a.y, this.z -= a.z, this)
    },
    subVectors: function (a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this
    },
    multiply: function (a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), this.multiplyVectors(a, b)) : (this.x *= a.x, this.y *= a.y, this.z *= a.z, this)
    },
    multiplyScalar: function (a) {
        return this.x *= a, this.y *= a, this.z *= a, this
    },
    multiplyVectors: function (a, b) {
        return this.x = a.x * b.x, this.y = a.y * b.y, this.z = a.z * b.z, this
    },
    applyMatrix3: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            a = a.elements;
        return this.x = a[0] * b + a[3] * c + a[6] * d, this.y = a[1] * b + a[4] * c + a[7] * d, this.z = a[2] * b + a[5] * c + a[8] * d, this
    },
    applyMatrix4: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            a = a.elements;
        return this.x = a[0] * b + a[4] * c + a[8] * d + a[12], this.y = a[1] * b + a[5] * c + a[9] * d + a[13], this.z = a[2] * b + a[6] * c + a[10] * d + a[14], this
    },
    applyProjection: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            a = a.elements,
            e = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15]);
        return this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * e, this.y = (a[1] * b + a[5] * c + a[9] * d + a[13]) * e, this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * e, this
    },
    applyQuaternion: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            e = a.x,
            f = a.y,
            g = a.z,
            a = a.w,
            h = a * b + f * d - g * c,
            i = a * c + g * b - e * d,
            j = a * d + e * c - f * b,
            b = -e * b - f * c - g * d;
        return this.x = h * a + b * -e + i * -g - j * -f, this.y = i * a + b * -f + j * -e - h * -g, this.z = j * a + b * -g + h * -f - i * -e, this
    },
    transformDirection: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            a = a.elements;
        return this.x = a[0] * b + a[4] * c + a[8] * d, this.y = a[1] * b + a[5] * c + a[9] * d, this.z = a[2] * b + a[6] * c + a[10] * d, this.normalize(), this
    },
    divide: function (a) {
        return this.x /= a.x, this.y /= a.y, this.z /= a.z, this
    },
    divideScalar: function (a) {
        return 0 !== a ? (this.x /= a, this.y /= a, this.z /= a) : this.z = this.y = this.x = 0, this
    },
    min: function (a) {
        return this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y), this.z > a.z && (this.z = a.z), this
    },
    max: function (a) {
        return this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y), this.z < a.z && (this.z = a.z), this
    },
    clamp: function (a, b) {
        return this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x), this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y), this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z), this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    },
    lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    setLength: function (a) {
        var b = this.length();
        return 0 !== b && a !== b && this.multiplyScalar(a / b), this
    },
    lerp: function (a, b) {
        return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this.z += (a.z - this.z) * b, this
    },
    cross: function (a, b) {
        if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), this.crossVectors(a, b);
        var c = this.x,
            d = this.y,
            e = this.z;
        return this.x = d * a.z - e * a.y, this.y = e * a.x - c * a.z, this.z = c * a.y - d * a.x, this
    },
    crossVectors: function (a, b) {
        return this.x = a.y * b.z - a.z * b.y, this.y = a.z * b.x - a.x * b.z, this.z = a.x * b.y - a.y * b.x, this
    },
    angleTo: function (a) {
        return a = this.dot(a) / (this.length() * a.length()), Math.acos(THREE.Math.clamp(a, -1, 1))
    },
    distanceTo: function (a) {
        return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function (a) {
        var b = this.x - a.x,
            c = this.y - a.y,
            a = this.z - a.z;
        return b * b + c * c + a * a
    },
    setEulerFromRotationMatrix: function (a, b) {
        function c(a) {
            return Math.min(Math.max(a, -1), 1)
        }
        var d = a.elements,
            e = d[0],
            f = d[4],
            g = d[8],
            h = d[1],
            i = d[5],
            j = d[9],
            k = d[2],
            l = d[6],
            d = d[10];
        return void 0 === b || "XYZ" === b ? (this.y = Math.asin(c(g)), .99999 > Math.abs(g) ? (this.x = Math.atan2(-j, d), this.z = Math.atan2(-f, e)) : (this.x = Math.atan2(l, i), this.z = 0)) : "YXZ" === b ? (this.x = Math.asin(-c(j)), .99999 > Math.abs(j) ? (this.y = Math.atan2(g, d), this.z = Math.atan2(h, i)) : (this.y = Math.atan2(-k, e), this.z = 0)) : "ZXY" === b ? (this.x = Math.asin(c(l)), .99999 > Math.abs(l) ? (this.y = Math.atan2(-k, d), this.z = Math.atan2(-f, i)) : (this.y = 0, this.z = Math.atan2(h, e))) : "ZYX" === b ? (this.y = Math.asin(-c(k)), .99999 > Math.abs(k) ? (this.x = Math.atan2(l, d), this.z = Math.atan2(h, e)) : (this.x = 0, this.z = Math.atan2(-f, i))) : "YZX" === b ? (this.z = Math.asin(c(h)), .99999 > Math.abs(h) ? (this.x = Math.atan2(-j, i), this.y = Math.atan2(-k, e)) : (this.x = 0, this.y = Math.atan2(g, d))) : "XZY" === b && (this.z = Math.asin(-c(f)), .99999 > Math.abs(f) ? (this.x = Math.atan2(l, i), this.y = Math.atan2(g, e)) : (this.x = Math.atan2(-j, d), this.y = 0)), this
    },
    setEulerFromQuaternion: function (a, b) {
        function c(a) {
            return Math.min(Math.max(a, -1), 1)
        }
        var d = a.x * a.x,
            e = a.y * a.y,
            f = a.z * a.z,
            g = a.w * a.w;
        return void 0 === b || "XYZ" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - e + f), this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w))), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - e - f)) : "YXZ" === b ? (this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z))), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - e + f), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + e - f)) : "ZXY" === b ? (this.x = Math.asin(c(2 * (a.x * a.w + a.y * a.z))), this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - e + f), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + e - f)) : "ZYX" === b ? (this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - e + f), this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z))), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - e - f)) : "YZX" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - d + e - f), this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - e - f), this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)))) : "XZY" === b && (this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + e - f), this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d - e - f), this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y)))), this
    },
    getPositionFromMatrix: function (a) {
        return this.x = a.elements[12], this.y = a.elements[13], this.z = a.elements[14], this
    },
    getScaleFromMatrix: function (a) {
        var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(),
            c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(),
            a = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
        return this.x = b, this.y = c, this.z = a, this
    },
    getColumnFromMatrix: function (a, b) {
        var c = 4 * a,
            d = b.elements;
        return this.x = d[c], this.y = d[c + 1], this.z = d[c + 2], this
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y && a.z === this.z
    },
    fromArray: function (a) {
        return this.x = a[0], this.y = a[1], this.z = a[2], this
    },
    toArray: function () {
        return [this.x, this.y, this.z]
    },
    clone: function () {
        return new THREE.Vector3(this.x, this.y, this.z)
    }
}, THREE.extend(THREE.Vector3.prototype, {
    applyEuler: function () {
        var a = new THREE.Quaternion;
        return function (b, c) {
            var d = a.setFromEuler(b, c);
            return this.applyQuaternion(d), this
        }
    }(),
    applyAxisAngle: function () {
        var a = new THREE.Quaternion;
        return function (b, c) {
            var d = a.setFromAxisAngle(b, c);
            return this.applyQuaternion(d), this
        }
    }(),
    projectOnVector: function () {
        var a = new THREE.Vector3;
        return function (b) {
            return a.copy(b).normalize(), b = this.dot(a), this.copy(a).multiplyScalar(b)
        }
    }(),
    projectOnPlane: function () {
        var a = new THREE.Vector3;
        return function (b) {
            return a.copy(this).projectOnVector(b), this.sub(a)
        }
    }(),
    reflect: function () {
        var a = new THREE.Vector3;
        return function (b) {
            return a.copy(this).projectOnVector(b).multiplyScalar(2), this.subVectors(a, this)
        }
    }()
}), THREE.Vector4 = function (a, b, c, d) {
    this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = void 0 !== d ? d : 1
}, THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function (a, b, c, d) {
        return this.x = a, this.y = b, this.z = c, this.w = d, this
    },
    setX: function (a) {
        return this.x = a, this
    },
    setY: function (a) {
        return this.y = a, this
    },
    setZ: function (a) {
        return this.z = a, this
    },
    setW: function (a) {
        return this.w = a, this
    },
    setComponent: function (a, b) {
        switch (a) {
        case 0:
            this.x = b;
            break;
        case 1:
            this.y = b;
            break;
        case 2:
            this.z = b;
            break;
        case 3:
            this.w = b;
            break;
        default:
            throw Error("index is out of range: " + a)
        }
    },
    getComponent: function (a) {
        switch (a) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        case 3:
            return this.w;
        default:
            throw Error("index is out of range: " + a)
        }
    },
    copy: function (a) {
        return this.x = a.x, this.y = a.y, this.z = a.z, this.w = void 0 !== a.w ? a.w : 1, this
    },
    add: function (a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), this.addVectors(a, b)) : (this.x += a.x, this.y += a.y, this.z += a.z, this.w += a.w, this)
    },
    addScalar: function (a) {
        return this.x += a, this.y += a, this.z += a, this.w += a, this
    },
    addVectors: function (a, b) {
        return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this.w = a.w + b.w, this
    },
    sub: function (a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), this.subVectors(a, b)) : (this.x -= a.x, this.y -= a.y, this.z -= a.z, this.w -= a.w, this)
    },
    subVectors: function (a, b) {
        return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this.w = a.w - b.w, this
    },
    multiplyScalar: function (a) {
        return this.x *= a, this.y *= a, this.z *= a, this.w *= a, this
    },
    applyMatrix4: function (a) {
        var b = this.x,
            c = this.y,
            d = this.z,
            e = this.w,
            a = a.elements;
        return this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * e, this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * e, this.z = a[2] * b + a[6] * c + a[10] * d + a[14] * e, this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * e, this
    },
    divideScalar: function (a) {
        return 0 !== a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.z = this.y = this.x = 0, this.w = 1), this
    },
    setAxisAngleFromQuaternion: function (a) {
        this.w = 2 * Math.acos(a.w);
        var b = Math.sqrt(1 - a.w * a.w);
        return 1e-4 > b ? (this.x = 1, this.z = this.y = 0) : (this.x = a.x / b, this.y = a.y / b, this.z = a.z / b), this
    },
    setAxisAngleFromRotationMatrix: function (a) {
        var b, c, d, a = a.elements,
            e = a[0];
        d = a[4];
        var f = a[8],
            g = a[1],
            h = a[5],
            i = a[9];
        c = a[2], b = a[6];
        var j = a[10];
        return .01 > Math.abs(d - g) && .01 > Math.abs(f - c) && .01 > Math.abs(i - b) ? .1 > Math.abs(d + g) && .1 > Math.abs(f + c) && .1 > Math.abs(i + b) && .1 > Math.abs(e + h + j - 3) ? (this.set(1, 0, 0, 0), this) : (a = Math.PI, e = (e + 1) / 2, h = (h + 1) / 2, j = (j + 1) / 2, d = (d + g) / 4, f = (f + c) / 4, i = (i + b) / 4, e > h && e > j ? .01 > e ? (b = 0, d = c = .707106781) : (b = Math.sqrt(e), c = d / b, d = f / b) : h > j ? .01 > h ? (b = .707106781, c = 0, d = .707106781) : (c = Math.sqrt(h), b = d / c, d = i / c) : .01 > j ? (c = b = .707106781, d = 0) : (d = Math.sqrt(j), b = f / d, c = i / d), this.set(b, c, d, a), this) : (a = Math.sqrt((b - i) * (b - i) + (f - c) * (f - c) + (g - d) * (g - d)), .001 > Math.abs(a) && (a = 1), this.x = (b - i) / a, this.y = (f - c) / a, this.z = (g - d) / a, this.w = Math.acos((e + h + j - 1) / 2), this)
    },
    min: function (a) {
        return this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y), this.z > a.z && (this.z = a.z), this.w > a.w && (this.w = a.w), this
    },
    max: function (a) {
        return this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y), this.z < a.z && (this.z = a.z), this.w < a.w && (this.w = a.w), this
    },
    clamp: function (a, b) {
        return this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x), this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y), this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z), this.w < a.w ? this.w = a.w : this.w > b.w && (this.w = b.w), this
    },
    negate: function () {
        return this.multiplyScalar(-1)
    },
    dot: function (a) {
        return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
    },
    lengthSq: function () {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    lengthManhattan: function () {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    },
    normalize: function () {
        return this.divideScalar(this.length())
    },
    setLength: function (a) {
        var b = this.length();
        return 0 !== b && a !== b && this.multiplyScalar(a / b), this
    },
    lerp: function (a, b) {
        return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this.z += (a.z - this.z) * b, this.w += (a.w - this.w) * b, this
    },
    equals: function (a) {
        return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
    },
    fromArray: function (a) {
        return this.x = a[0], this.y = a[1], this.z = a[2], this.w = a[3], this
    },
    toArray: function () {
        return [this.x, this.y, this.z, this.w]
    },
    clone: function () {
        return new THREE.Vector4(this.x, this.y, this.z, this.w)
    }
}, THREE.Line3 = function (a, b) {
    this.start = void 0 !== a ? a : new THREE.Vector3, this.end = void 0 !== b ? b : new THREE.Vector3
}, THREE.Line3.prototype = {
    constructor: THREE.Line3,
    set: function (a, b) {
        return this.start.copy(a), this.end.copy(b), this
    },
    copy: function (a) {
        return this.start.copy(a.start), this.end.copy(a.end), this
    },
    center: function (a) {
        return (a || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(.5)
    },
    delta: function (a) {
        return (a || new THREE.Vector3).subVectors(this.end, this.start)
    },
    distanceSq: function () {
        return this.start.distanceToSquared(this.end)
    },
    distance: function () {
        return this.start.distanceTo(this.end)
    },
    at: function (a, b) {
        var c = b || new THREE.Vector3;
        return this.delta(c).multiplyScalar(a).add(this.start)
    },
    closestPointToPointParameter: function () {
        var a = new THREE.Vector3,
            b = new THREE.Vector3;
        return function (c, d) {
            a.subVectors(c, this.start), b.subVectors(this.end, this.start);
            var e = b.dot(b),
                e = b.dot(a) / e;
            return d && (e = THREE.Math.clamp(e, 0, 1)), e
        }
    }(),
    closestPointToPoint: function (a, b, c) {
        return a = this.closestPointToPointParameter(a, b), c = c || new THREE.Vector3, this.delta(c).multiplyScalar(a).add(this.start)
    },
    applyMatrix4: function (a) {
        return this.start.applyMatrix4(a), this.end.applyMatrix4(a), this
    },
    equals: function (a) {
        return a.start.equals(this.start) && a.end.equals(this.end)
    },
    clone: function () {
        return (new THREE.Line3).copy(this)
    }
}, THREE.Box2 = function (a, b) {
    this.min = void 0 !== a ? a : new THREE.Vector2(1 / 0, 1 / 0), this.max = void 0 !== b ? b : new THREE.Vector2(-1 / 0, -1 / 0)
}, THREE.Box2.prototype = {
    constructor: THREE.Box2,
    set: function (a, b) {
        return this.min.copy(a), this.max.copy(b), this
    },
    setFromPoints: function (a) {
        if (0 < a.length) {
            var b = a[0];
            this.min.copy(b), this.max.copy(b);
            for (var c = 1, d = a.length; d > c; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y)
        } else this.makeEmpty();
        return this
    },
    setFromCenterAndSize: function () {
        var a = new THREE.Vector2;
        return function (b, c) {
            var d = a.copy(c).multiplyScalar(.5);
            return this.min.copy(b).sub(d), this.max.copy(b).add(d), this
        }
    }(),
    copy: function (a) {
        return this.min.copy(a.min), this.max.copy(a.max), this
    },
    makeEmpty: function () {
        return this.min.x = this.min.y = 1 / 0, this.max.x = this.max.y = -1 / 0, this
    },
    empty: function () {
        return this.max.x < this.min.x || this.max.y < this.min.y
    },
    center: function (a) {
        return (a || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(.5)
    },
    size: function (a) {
        return (a || new THREE.Vector2).subVectors(this.max, this.min)
    },
    expandByPoint: function (a) {
        return this.min.min(a), this.max.max(a), this
    },
    expandByVector: function (a) {
        return this.min.sub(a), this.max.add(a), this
    },
    expandByScalar: function (a) {
        return this.min.addScalar(-a), this.max.addScalar(a), this
    },
    containsPoint: function (a) {
        return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0
    },
    containsBox: function (a) {
        return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y ? !0 : !1
    },
    getParameter: function (a) {
        return new THREE.Vector2((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y))
    },
    isIntersectionBox: function (a) {
        return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0
    },
    clampPoint: function (a, b) {
        return (b || new THREE.Vector2).copy(a).clamp(this.min, this.max)
    },
    distanceToPoint: function () {
        var a = new THREE.Vector2;
        return function (b) {
            return a.copy(b).clamp(this.min, this.max).sub(b).length()
        }
    }(),
    intersect: function (a) {
        return this.min.max(a.min), this.max.min(a.max), this
    },
    union: function (a) {
        return this.min.min(a.min), this.max.max(a.max), this
    },
    translate: function (a) {
        return this.min.add(a), this.max.add(a), this
    },
    equals: function (a) {
        return a.min.equals(this.min) && a.max.equals(this.max)
    },
    clone: function () {
        return (new THREE.Box2).copy(this)
    }
}, THREE.Box3 = function (a, b) {
    this.min = void 0 !== a ? a : new THREE.Vector3(1 / 0, 1 / 0, 1 / 0), this.max = void 0 !== b ? b : new THREE.Vector3(-1 / 0, -1 / 0, -1 / 0)
}, THREE.Box3.prototype = {
    constructor: THREE.Box3,
    set: function (a, b) {
        return this.min.copy(a), this.max.copy(b), this
    },
    setFromPoints: function (a) {
        if (0 < a.length) {
            var b = a[0];
            this.min.copy(b), this.max.copy(b);
            for (var c = 1, d = a.length; d > c; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y), b.z < this.min.z ? this.min.z = b.z : b.z > this.max.z && (this.max.z = b.z)
        } else this.makeEmpty();
        return this
    },
    setFromCenterAndSize: function () {
        var a = new THREE.Vector3;
        return function (b, c) {
            var d = a.copy(c).multiplyScalar(.5);
            return this.min.copy(b).sub(d), this.max.copy(b).add(d), this
        }
    }(),
    copy: function (a) {
        return this.min.copy(a.min), this.max.copy(a.max), this
    },
    makeEmpty: function () {
        return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this
    },
    empty: function () {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    },
    center: function (a) {
        return (a || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(.5)
    },
    size: function (a) {
        return (a || new THREE.Vector3).subVectors(this.max, this.min)
    },
    expandByPoint: function (a) {
        return this.min.min(a), this.max.max(a), this
    },
    expandByVector: function (a) {
        return this.min.sub(a), this.max.add(a), this
    },
    expandByScalar: function (a) {
        return this.min.addScalar(-a), this.max.addScalar(a), this
    },
    containsPoint: function (a) {
        return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0
    },
    containsBox: function (a) {
        return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z ? !0 : !1
    },
    getParameter: function (a) {
        return new THREE.Vector3((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
    },
    isIntersectionBox: function (a) {
        return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0
    },
    clampPoint: function (a, b) {
        return (b || new THREE.Vector3).copy(a).clamp(this.min, this.max)
    },
    distanceToPoint: function () {
        var a = new THREE.Vector3;
        return function (b) {
            return a.copy(b).clamp(this.min, this.max).sub(b).length()
        }
    }(),
    getBoundingSphere: function () {
        var a = new THREE.Vector3;
        return function (b) {
            return b = b || new THREE.Sphere, b.center = this.center(), b.radius = .5 * this.size(a).length(), b
        }
    }(),
    intersect: function (a) {
        return this.min.max(a.min), this.max.min(a.max), this
    },
    union: function (a) {
        return this.min.min(a.min), this.max.max(a.max), this
    },
    applyMatrix4: function () {
        var a = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
        return function (b) {
            return a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b), a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b), a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b), a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b), a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b), a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b), a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b), a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b), this.makeEmpty(), this.setFromPoints(a), this
        }
    }(),
    translate: function (a) {
        return this.min.add(a), this.max.add(a), this
    },
    equals: function (a) {
        return a.min.equals(this.min) && a.max.equals(this.max)
    },
    clone: function () {
        return (new THREE.Box3).copy(this)
    }
}, THREE.Matrix3 = function (a, b, c, d, e, f, g, h, i) {
    this.elements = new Float32Array(9), this.set(void 0 !== a ? a : 1, b || 0, c || 0, d || 0, void 0 !== e ? e : 1, f || 0, g || 0, h || 0, void 0 !== i ? i : 1)
}, THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    set: function (a, b, c, d, e, f, g, h, i) {
        var j = this.elements;
        return j[0] = a, j[3] = b, j[6] = c, j[1] = d, j[4] = e, j[7] = f, j[2] = g, j[5] = h, j[8] = i, this
    },
    identity: function () {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
    },
    copy: function (a) {
        return a = a.elements, this.set(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]), this
    },
    multiplyVector3: function (a) {
        return console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), a.applyMatrix3(this)
    },
    multiplyVector3Array: function () {
        var a = new THREE.Vector3;
        return function (b) {
            for (var c = 0, d = b.length; d > c; c += 3) a.x = b[c], a.y = b[c + 1], a.z = b[c + 2], a.applyMatrix3(this), b[c] = a.x, b[c + 1] = a.y, b[c + 2] = a.z;
            return b
        }
    }(),
    multiplyScalar: function (a) {
        var b = this.elements;
        return b[0] *= a, b[3] *= a, b[6] *= a, b[1] *= a, b[4] *= a, b[7] *= a, b[2] *= a, b[5] *= a, b[8] *= a, this
    },
    determinant: function () {
        var a = this.elements,
            b = a[0],
            c = a[1],
            d = a[2],
            e = a[3],
            f = a[4],
            g = a[5],
            h = a[6],
            i = a[7],
            a = a[8];
        return b * f * a - b * g * i - c * e * a + c * g * h + d * e * i - d * f * h
    },
    getInverse: function (a, b) {
        var c = a.elements,
            d = this.elements;
        if (d[0] = c[10] * c[5] - c[6] * c[9], d[1] = -c[10] * c[1] + c[2] * c[9], d[2] = c[6] * c[1] - c[2] * c[5], d[3] = -c[10] * c[4] + c[6] * c[8], d[4] = c[10] * c[0] - c[2] * c[8], d[5] = -c[6] * c[0] + c[2] * c[4], d[6] = c[9] * c[4] - c[5] * c[8], d[7] = -c[9] * c[0] + c[1] * c[8], d[8] = c[5] * c[0] - c[1] * c[4], c = c[0] * d[0] + c[1] * d[3] + c[2] * d[6], 0 === c) {
            if (b) throw Error("Matrix3.getInverse(): can't invert matrix, determinant is 0");
            return console.warn("Matrix3.getInverse(): can't invert matrix, determinant is 0"), this.identity(), this
        }
        return this.multiplyScalar(1 / c), this
    },
    transpose: function () {
        var a, b = this.elements;
        return a = b[1], b[1] = b[3], b[3] = a, a = b[2], b[2] = b[6], b[6] = a, a = b[5], b[5] = b[7], b[7] = a, this
    },
    getNormalMatrix: function (a) {
        return this.getInverse(a).transpose(), this
    },
    transposeIntoArray: function (a) {
        var b = this.elements;
        return a[0] = b[0], a[1] = b[3], a[2] = b[6], a[3] = b[1], a[4] = b[4], a[5] = b[7], a[6] = b[2], a[7] = b[5], a[8] = b[8], this
    },
    clone: function () {
        var a = this.elements;
        return new THREE.Matrix3(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8])
    }
}, THREE.Matrix4 = function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    var q = this.elements = new Float32Array(16);
    q[0] = void 0 !== a ? a : 1, q[4] = b || 0, q[8] = c || 0, q[12] = d || 0, q[1] = e || 0, q[5] = void 0 !== f ? f : 1, q[9] = g || 0, q[13] = h || 0, q[2] = i || 0, q[6] = j || 0, q[10] = void 0 !== k ? k : 1, q[14] = l || 0, q[3] = m || 0, q[7] = n || 0, q[11] = o || 0, q[15] = void 0 !== p ? p : 1
}, THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        var q = this.elements;
        return q[0] = a, q[4] = b, q[8] = c, q[12] = d, q[1] = e, q[5] = f, q[9] = g, q[13] = h, q[2] = i, q[6] = j, q[10] = k, q[14] = l, q[3] = m, q[7] = n, q[11] = o, q[15] = p, this
    },
    identity: function () {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    },
    copy: function (a) {
        return a = a.elements, this.set(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]), this
    },
    extractPosition: function (a) {
        return console.warn("DEPRECATED: Matrix4's .extractPosition() has been renamed to .copyPosition()."), this.copyPosition(a)
    },
    copyPosition: function (a) {
        var b = this.elements,
            a = a.elements;
        return b[12] = a[12], b[13] = a[13], b[14] = a[14], this
    },
    extractRotation: function () {
        var a = new THREE.Vector3;
        return function (b) {
            var c = this.elements,
                b = b.elements,
                d = 1 / a.set(b[0], b[1], b[2]).length(),
                e = 1 / a.set(b[4], b[5], b[6]).length(),
                f = 1 / a.set(b[8], b[9], b[10]).length();
            return c[0] = b[0] * d, c[1] = b[1] * d, c[2] = b[2] * d, c[4] = b[4] * e, c[5] = b[5] * e, c[6] = b[6] * e, c[8] = b[8] * f, c[9] = b[9] * f, c[10] = b[10] * f, this
        }
    }(),
    setRotationFromEuler: function (a, b) {
        return console.warn("DEPRECATED: Matrix4's .setRotationFromEuler() has been deprecated in favor of makeRotationFromEuler.  Please update your code."), this.makeRotationFromEuler(a, b)
    },
    makeRotationFromEuler: function (a, b) {
        var c = this.elements,
            d = a.x,
            e = a.y,
            f = a.z,
            g = Math.cos(d),
            d = Math.sin(d),
            h = Math.cos(e),
            e = Math.sin(e),
            i = Math.cos(f),
            f = Math.sin(f);
        if (void 0 === b || "XYZ" === b) {
            var j = g * i,
                k = g * f,
                l = d * i,
                m = d * f;
            c[0] = h * i, c[4] = -h * f, c[8] = e, c[1] = k + l * e, c[5] = j - m * e, c[9] = -d * h, c[2] = m - j * e, c[6] = l + k * e, c[10] = g * h
        } else "YXZ" === b ? (j = h * i, k = h * f, l = e * i, m = e * f, c[0] = j + m * d, c[4] = l * d - k, c[8] = g * e, c[1] = g * f, c[5] = g * i, c[9] = -d, c[2] = k * d - l, c[6] = m + j * d, c[10] = g * h) : "ZXY" === b ? (j = h * i, k = h * f, l = e * i, m = e * f, c[0] = j - m * d, c[4] = -g * f, c[8] = l + k * d, c[1] = k + l * d, c[5] = g * i, c[9] = m - j * d, c[2] = -g * e, c[6] = d, c[10] = g * h) : "ZYX" === b ? (j = g * i, k = g * f, l = d * i, m = d * f, c[0] = h * i, c[4] = l * e - k, c[8] = j * e + m, c[1] = h * f, c[5] = m * e + j, c[9] = k * e - l, c[2] = -e, c[6] = d * h, c[10] = g * h) : "YZX" === b ? (j = g * h, k = g * e, l = d * h, m = d * e, c[0] = h * i, c[4] = m - j * f, c[8] = l * f + k, c[1] = f, c[5] = g * i, c[9] = -d * i, c[2] = -e * i, c[6] = k * f + l, c[10] = j - m * f) : "XZY" === b && (j = g * h, k = g * e, l = d * h, m = d * e, c[0] = h * i, c[4] = -f, c[8] = e * i, c[1] = j * f + m, c[5] = g * i, c[9] = k * f - l, c[2] = l * f - k, c[6] = d * i, c[10] = m * f + j);
        return c[3] = 0, c[7] = 0, c[11] = 0, c[12] = 0, c[13] = 0, c[14] = 0, c[15] = 1, this
    },
    setRotationFromQuaternion: function (a) {
        return console.warn("DEPRECATED: Matrix4's .setRotationFromQuaternion() has been deprecated in favor of makeRotationFromQuaternion.  Please update your code."), this.makeRotationFromQuaternion(a)
    },
    makeRotationFromQuaternion: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            e = a.z,
            f = a.w,
            g = c + c,
            h = d + d,
            i = e + e,
            a = c * g,
            j = c * h,
            c = c * i,
            k = d * h,
            d = d * i,
            e = e * i,
            g = f * g,
            h = f * h,
            f = f * i;
        return b[0] = 1 - (k + e), b[4] = j - f, b[8] = c + h, b[1] = j + f, b[5] = 1 - (a + e), b[9] = d - g, b[2] = c - h, b[6] = d + g, b[10] = 1 - (a + k), b[3] = 0, b[7] = 0, b[11] = 0, b[12] = 0, b[13] = 0, b[14] = 0, b[15] = 1, this
    },
    lookAt: function () {
        var a = new THREE.Vector3,
            b = new THREE.Vector3,
            c = new THREE.Vector3;
        return function (d, e, f) {
            var g = this.elements;
            return c.subVectors(d, e).normalize(), 0 === c.length() && (c.z = 1), a.crossVectors(f, c).normalize(), 0 === a.length() && (c.x += 1e-4, a.crossVectors(f, c).normalize()), b.crossVectors(c, a), g[0] = a.x, g[4] = b.x, g[8] = c.x, g[1] = a.y, g[5] = b.y, g[9] = c.y, g[2] = a.z, g[6] = b.z, g[10] = c.z, this
        }
    }(),
    multiply: function (a, b) {
        return void 0 !== b ? (console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a)
    },
    multiplyMatrices: function (a, b) {
        var c = a.elements,
            d = b.elements,
            e = this.elements,
            f = c[0],
            g = c[4],
            h = c[8],
            i = c[12],
            j = c[1],
            k = c[5],
            l = c[9],
            m = c[13],
            n = c[2],
            o = c[6],
            p = c[10],
            q = c[14],
            r = c[3],
            s = c[7],
            t = c[11],
            c = c[15],
            u = d[0],
            v = d[4],
            w = d[8],
            x = d[12],
            y = d[1],
            z = d[5],
            A = d[9],
            B = d[13],
            C = d[2],
            D = d[6],
            E = d[10],
            F = d[14],
            G = d[3],
            H = d[7],
            I = d[11],
            d = d[15];
        return e[0] = f * u + g * y + h * C + i * G, e[4] = f * v + g * z + h * D + i * H, e[8] = f * w + g * A + h * E + i * I, e[12] = f * x + g * B + h * F + i * d, e[1] = j * u + k * y + l * C + m * G, e[5] = j * v + k * z + l * D + m * H, e[9] = j * w + k * A + l * E + m * I, e[13] = j * x + k * B + l * F + m * d, e[2] = n * u + o * y + p * C + q * G, e[6] = n * v + o * z + p * D + q * H, e[10] = n * w + o * A + p * E + q * I, e[14] = n * x + o * B + p * F + q * d, e[3] = r * u + s * y + t * C + c * G, e[7] = r * v + s * z + t * D + c * H, e[11] = r * w + s * A + t * E + c * I, e[15] = r * x + s * B + t * F + c * d, this
    },
    multiplyToArray: function (a, b, c) {
        var d = this.elements;
        return this.multiplyMatrices(a, b), c[0] = d[0], c[1] = d[1], c[2] = d[2], c[3] = d[3], c[4] = d[4], c[5] = d[5], c[6] = d[6], c[7] = d[7], c[8] = d[8], c[9] = d[9], c[10] = d[10], c[11] = d[11], c[12] = d[12], c[13] = d[13], c[14] = d[14], c[15] = d[15], this
    },
    multiplyScalar: function (a) {
        var b = this.elements;
        return b[0] *= a, b[4] *= a, b[8] *= a, b[12] *= a, b[1] *= a, b[5] *= a, b[9] *= a, b[13] *= a, b[2] *= a, b[6] *= a, b[10] *= a, b[14] *= a, b[3] *= a, b[7] *= a, b[11] *= a, b[15] *= a, this
    },
    multiplyVector3: function (a) {
        return console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), a.applyProjection(this)
    },
    multiplyVector4: function (a) {
        return console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), a.applyMatrix4(this)
    },
    multiplyVector3Array: function () {
        var a = new THREE.Vector3;
        return function (b) {
            for (var c = 0, d = b.length; d > c; c += 3) a.x = b[c], a.y = b[c + 1], a.z = b[c + 2], a.applyProjection(this), b[c] = a.x, b[c + 1] = a.y, b[c + 2] = a.z;
            return b
        }
    }(),
    rotateAxis: function (a) {
        console.warn("DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), a.transformDirection(this)
    },
    crossVector: function (a) {
        return console.warn("DEPRECATED: Matrix4's .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), a.applyMatrix4(this)
    },
    determinant: function () {
        var a = this.elements,
            b = a[0],
            c = a[4],
            d = a[8],
            e = a[12],
            f = a[1],
            g = a[5],
            h = a[9],
            i = a[13],
            j = a[2],
            k = a[6],
            l = a[10],
            m = a[14];
        return a[3] * (+e * h * k - d * i * k - e * g * l + c * i * l + d * g * m - c * h * m) + a[7] * (+b * h * m - b * i * l + e * f * l - d * f * m + d * i * j - e * h * j) + a[11] * (+b * i * k - b * g * m - e * f * k + c * f * m + e * g * j - c * i * j) + a[15] * (-d * g * j - b * h * k + b * g * l + d * f * k - c * f * l + c * h * j)
    },
    transpose: function () {
        var a, b = this.elements;
        return a = b[1], b[1] = b[4], b[4] = a, a = b[2], b[2] = b[8], b[8] = a, a = b[6], b[6] = b[9], b[9] = a, a = b[3], b[3] = b[12], b[12] = a, a = b[7], b[7] = b[13], b[13] = a, a = b[11], b[11] = b[14], b[14] = a, this
    },
    flattenToArray: function (a) {
        var b = this.elements;
        return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], a[6] = b[6], a[7] = b[7], a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], a
    },
    flattenToArrayOffset: function (a, b) {
        var c = this.elements;
        return a[b] = c[0], a[b + 1] = c[1], a[b + 2] = c[2], a[b + 3] = c[3], a[b + 4] = c[4], a[b + 5] = c[5], a[b + 6] = c[6], a[b + 7] = c[7], a[b + 8] = c[8], a[b + 9] = c[9], a[b + 10] = c[10], a[b + 11] = c[11], a[b + 12] = c[12], a[b + 13] = c[13], a[b + 14] = c[14], a[b + 15] = c[15], a
    },
    getPosition: function () {
        var a = new THREE.Vector3;
        return function () {
            console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.");
            var b = this.elements;
            return a.set(b[12], b[13], b[14])
        }
    }(),
    setPosition: function (a) {
        var b = this.elements;
        return b[12] = a.x, b[13] = a.y, b[14] = a.z, this
    },
    getInverse: function (a, b) {
        var c = this.elements,
            d = a.elements,
            e = d[0],
            f = d[4],
            g = d[8],
            h = d[12],
            i = d[1],
            j = d[5],
            k = d[9],
            l = d[13],
            m = d[2],
            n = d[6],
            o = d[10],
            p = d[14],
            q = d[3],
            r = d[7],
            s = d[11],
            t = d[15];
        if (c[0] = k * p * r - l * o * r + l * n * s - j * p * s - k * n * t + j * o * t, c[4] = h * o * r - g * p * r - h * n * s + f * p * s + g * n * t - f * o * t, c[8] = g * l * r - h * k * r + h * j * s - f * l * s - g * j * t + f * k * t, c[12] = h * k * n - g * l * n - h * j * o + f * l * o + g * j * p - f * k * p, c[1] = l * o * q - k * p * q - l * m * s + i * p * s + k * m * t - i * o * t, c[5] = g * p * q - h * o * q + h * m * s - e * p * s - g * m * t + e * o * t, c[9] = h * k * q - g * l * q - h * i * s + e * l * s + g * i * t - e * k * t, c[13] = g * l * m - h * k * m + h * i * o - e * l * o - g * i * p + e * k * p, c[2] = j * p * q - l * n * q + l * m * r - i * p * r - j * m * t + i * n * t, c[6] = h * n * q - f * p * q - h * m * r + e * p * r + f * m * t - e * n * t, c[10] = f * l * q - h * j * q + h * i * r - e * l * r - f * i * t + e * j * t, c[14] = h * j * m - f * l * m - h * i * n + e * l * n + f * i * p - e * j * p, c[3] = k * n * q - j * o * q - k * m * r + i * o * r + j * m * s - i * n * s, c[7] = f * o * q - g * n * q + g * m * r - e * o * r - f * m * s + e * n * s, c[11] = g * j * q - f * k * q - g * i * r + e * k * r + f * i * s - e * j * s, c[15] = f * k * m - g * j * m + g * i * n - e * k * n - f * i * o + e * j * o, c = d[0] * c[0] + d[1] * c[4] + d[2] * c[8] + d[3] * c[12], 0 == c) {
            if (b) throw Error("Matrix4.getInverse(): can't invert matrix, determinant is 0");
            return console.warn("Matrix4.getInverse(): can't invert matrix, determinant is 0"), this.identity(), this
        }
        return this.multiplyScalar(1 / c), this
    },
    translate: function () {
        console.warn("DEPRECATED: Matrix4's .translate() has been removed.")
    },
    rotateX: function () {
        console.warn("DEPRECATED: Matrix4's .rotateX() has been removed.")
    },
    rotateY: function () {
        console.warn("DEPRECATED: Matrix4's .rotateY() has been removed.")
    },
    rotateZ: function () {
        console.warn("DEPRECATED: Matrix4's .rotateZ() has been removed.")
    },
    rotateByAxis: function () {
        console.warn("DEPRECATED: Matrix4's .rotateByAxis() has been removed.")
    },
    scale: function (a) {
        var b = this.elements,
            c = a.x,
            d = a.y,
            a = a.z;
        return b[0] *= c, b[4] *= d, b[8] *= a, b[1] *= c, b[5] *= d, b[9] *= a, b[2] *= c, b[6] *= d, b[10] *= a, b[3] *= c, b[7] *= d, b[11] *= a, this
    },
    getMaxScaleOnAxis: function () {
        var a = this.elements;
        return Math.sqrt(Math.max(a[0] * a[0] + a[1] * a[1] + a[2] * a[2], Math.max(a[4] * a[4] + a[5] * a[5] + a[6] * a[6], a[8] * a[8] + a[9] * a[9] + a[10] * a[10])))
    },
    makeTranslation: function (a, b, c) {
        return this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1), this
    },
    makeRotationX: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        return this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1), this
    },
    makeRotationY: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        return this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1), this
    },
    makeRotationZ: function (a) {
        var b = Math.cos(a),
            a = Math.sin(a);
        return this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
    },
    makeRotationAxis: function (a, b) {
        var c = Math.cos(b),
            d = Math.sin(b),
            e = 1 - c,
            f = a.x,
            g = a.y,
            h = a.z,
            i = e * f,
            j = e * g;
        return this.set(i * f + c, i * g - d * h, i * h + d * g, 0, i * g + d * h, j * g + c, j * h - d * f, 0, i * h - d * g, j * h + d * f, e * h * h + c, 0, 0, 0, 0, 1), this
    },
    makeScale: function (a, b, c) {
        return this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1), this
    },
    compose: function (a, b, c) {
        return console.warn("DEPRECATED: Matrix4's .compose() has been deprecated in favor of makeFromPositionQuaternionScale. Please update your code."), this.makeFromPositionQuaternionScale(a, b, c)
    },
    makeFromPositionQuaternionScale: function (a, b, c) {
        return this.makeRotationFromQuaternion(b), this.scale(c), this.setPosition(a), this
    },
    makeFromPositionEulerScale: function (a, b, c, d) {
        return this.makeRotationFromEuler(b, c), this.scale(d), this.setPosition(a), this
    },
    makeFrustum: function (a, b, c, d, e, f) {
        var g = this.elements;
        return g[0] = 2 * e / (b - a), g[4] = 0, g[8] = (b + a) / (b - a), g[12] = 0, g[1] = 0, g[5] = 2 * e / (d - c), g[9] = (d + c) / (d - c), g[13] = 0, g[2] = 0, g[6] = 0, g[10] = -(f + e) / (f - e), g[14] = -2 * f * e / (f - e), g[3] = 0, g[7] = 0, g[11] = -1, g[15] = 0, this
    },
    makePerspective: function (a, b, c, d) {
        var a = c * Math.tan(THREE.Math.degToRad(.5 * a)),
            e = -a;
        return this.makeFrustum(e * b, a * b, e, a, c, d)
    },
    makeOrthographic: function (a, b, c, d, e, f) {
        var g = this.elements,
            h = b - a,
            i = c - d,
            j = f - e;
        return g[0] = 2 / h, g[4] = 0, g[8] = 0, g[12] = -((b + a) / h), g[1] = 0, g[5] = 2 / i, g[9] = 0, g[13] = -((c + d) / i), g[2] = 0, g[6] = 0, g[10] = -2 / j, g[14] = -((f + e) / j), g[3] = 0, g[7] = 0, g[11] = 0, g[15] = 1, this
    },
    clone: function () {
        var a = this.elements;
        return new THREE.Matrix4(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15])
    }
}, THREE.extend(THREE.Matrix4.prototype, {
    decompose: function () {
        var a = new THREE.Vector3,
            b = new THREE.Vector3,
            c = new THREE.Vector3,
            d = new THREE.Matrix4;
        return function (e, f, g) {
            var h = this.elements;
            return a.set(h[0], h[1], h[2]), b.set(h[4], h[5], h[6]), c.set(h[8], h[9], h[10]), e = e instanceof THREE.Vector3 ? e : new THREE.Vector3, f = f instanceof THREE.Quaternion ? f : new THREE.Quaternion, g = g instanceof THREE.Vector3 ? g : new THREE.Vector3, g.x = a.length(), g.y = b.length(), g.z = c.length(), e.x = h[12], e.y = h[13], e.z = h[14], d.copy(this), d.elements[0] /= g.x, d.elements[1] /= g.x, d.elements[2] /= g.x, d.elements[4] /= g.y, d.elements[5] /= g.y, d.elements[6] /= g.y, d.elements[8] /= g.z, d.elements[9] /= g.z, d.elements[10] /= g.z, f.setFromRotationMatrix(d), [e, f, g]
        }
    }()
}), THREE.Ray = function (a, b) {
    this.origin = void 0 !== a ? a : new THREE.Vector3, this.direction = void 0 !== b ? b : new THREE.Vector3
}, THREE.Ray.prototype = {
    constructor: THREE.Ray,
    set: function (a, b) {
        return this.origin.copy(a), this.direction.copy(b), this
    },
    copy: function (a) {
        return this.origin.copy(a.origin), this.direction.copy(a.direction), this
    },
    at: function (a, b) {
        return (b || new THREE.Vector3).copy(this.direction).multiplyScalar(a).add(this.origin)
    },
    recast: function () {
        var a = new THREE.Vector3;
        return function (b) {
            return this.origin.copy(this.at(b, a)), this
        }
    }(),
    closestPointToPoint: function (a, b) {
        var c = b || new THREE.Vector3;
        c.subVectors(a, this.origin);
        var d = c.dot(this.direction);
        return c.copy(this.direction).multiplyScalar(d).add(this.origin)
    },
    distanceToPoint: function () {
        var a = new THREE.Vector3;
        return function (b) {
            var c = a.subVectors(b, this.origin).dot(this.direction);
            return a.copy(this.direction).multiplyScalar(c).add(this.origin), a.distanceTo(b)
        }
    }(),
    isIntersectionSphere: function (a) {
        return this.distanceToPoint(a.center) <= a.radius
    },
    isIntersectionPlane: function (a) {
        return 0 != a.normal.dot(this.direction) || 0 == a.distanceToPoint(this.origin) ? !0 : !1
    },
    distanceToPlane: function (a) {
        var b = a.normal.dot(this.direction);
        return 0 != b ? -(this.origin.dot(a.normal) + a.constant) / b : 0 == a.distanceToPoint(this.origin) ? 0 : void 0
    },
    intersectPlane: function (a, b) {
        var c = this.distanceToPlane(a);
        return void 0 === c ? void 0 : this.at(c, b)
    },
    applyMatrix4: function (a) {
        return this.direction.add(this.origin).applyMatrix4(a), this.origin.applyMatrix4(a), this.direction.sub(this.origin), this
    },
    equals: function (a) {
        return a.origin.equals(this.origin) && a.direction.equals(this.direction)
    },
    clone: function () {
        return (new THREE.Ray).copy(this)
    }
}, THREE.Sphere = function (a, b) {
    this.center = void 0 !== a ? a : new THREE.Vector3, this.radius = void 0 !== b ? b : 0
}, THREE.Sphere.prototype = {
    constructor: THREE.Sphere,
    set: function (a, b) {
        return this.center.copy(a), this.radius = b, this
    },
    setFromCenterAndPoints: function (a, b) {
        for (var c = 0, d = 0, e = b.length; e > d; d++) var f = a.distanceToSquared(b[d]),
            c = Math.max(c, f);
        return this.center = a, this.radius = Math.sqrt(c), this
    },
    copy: function (a) {
        return this.center.copy(a.center), this.radius = a.radius, this
    },
    empty: function () {
        return 0 >= this.radius
    },
    containsPoint: function (a) {
        return a.distanceToSquared(this.center) <= this.radius * this.radius
    },
    distanceToPoint: function (a) {
        return a.distanceTo(this.center) - this.radius
    },
    intersectsSphere: function (a) {
        var b = this.radius + a.radius;
        return a.center.distanceToSquared(this.center) <= b * b
    },
    clampPoint: function (a, b) {
        var c = this.center.distanceToSquared(a),
            d = b || new THREE.Vector3;
        return d.copy(a), c > this.radius * this.radius && (d.sub(this.center).normalize(), d.multiplyScalar(this.radius).add(this.center)), d
    },
    getBoundingBox: function (a) {
        return a = a || new THREE.Box3, a.set(this.center, this.center), a.expandByScalar(this.radius), a
    },
    applyMatrix4: function (a) {
        return this.center.applyMatrix4(a), this.radius *= a.getMaxScaleOnAxis(), this
    },
    translate: function (a) {
        return this.center.add(a), this
    },
    equals: function (a) {
        return a.center.equals(this.center) && a.radius === this.radius
    },
    clone: function () {
        return (new THREE.Sphere).copy(this)
    }
}, THREE.Frustum = function (a, b, c, d, e, f) {
    this.planes = [void 0 !== a ? a : new THREE.Plane, void 0 !== b ? b : new THREE.Plane, void 0 !== c ? c : new THREE.Plane, void 0 !== d ? d : new THREE.Plane, void 0 !== e ? e : new THREE.Plane, void 0 !== f ? f : new THREE.Plane]
}, THREE.Frustum.prototype = {
    constructor: THREE.Frustum,
    set: function (a, b, c, d, e, f) {
        var g = this.planes;
        return g[0].copy(a), g[1].copy(b), g[2].copy(c), g[3].copy(d), g[4].copy(e), g[5].copy(f), this
    },
    copy: function (a) {
        for (var b = this.planes, c = 0; 6 > c; c++) b[c].copy(a.planes[c]);
        return this
    },
    setFromMatrix: function (a) {
        var b = this.planes,
            c = a.elements,
            a = c[0],
            d = c[1],
            e = c[2],
            f = c[3],
            g = c[4],
            h = c[5],
            i = c[6],
            j = c[7],
            k = c[8],
            l = c[9],
            m = c[10],
            n = c[11],
            o = c[12],
            p = c[13],
            q = c[14],
            c = c[15];
        return b[0].setComponents(f - a, j - g, n - k, c - o).normalize(), b[1].setComponents(f + a, j + g, n + k, c + o).normalize(), b[2].setComponents(f + d, j + h, n + l, c + p).normalize(), b[3].setComponents(f - d, j - h, n - l, c - p).normalize(), b[4].setComponents(f - e, j - i, n - m, c - q).normalize(), b[5].setComponents(f + e, j + i, n + m, c + q).normalize(), this
    },
    intersectsObject: function () {
        var a = new THREE.Vector3;
        return function (b) {
            var c = b.matrixWorld,
                d = this.planes,
                b = -b.geometry.boundingSphere.radius * c.getMaxScaleOnAxis();
            for (a.getPositionFromMatrix(c), c = 0; 6 > c; c++)
                if (d[c].distanceToPoint(a) < b) return !1;
            return !0
        }
    }(),
    intersectsSphere: function (a) {
        for (var b = this.planes, c = a.center, a = -a.radius, d = 0; 6 > d; d++)
            if (b[d].distanceToPoint(c) < a) return !1;
        return !0
    },
    containsPoint: function (a) {
        for (var b = this.planes, c = 0; 6 > c; c++)
            if (0 > b[c].distanceToPoint(a)) return !1;
        return !0
    },
    clone: function () {
        return (new THREE.Frustum).copy(this)
    }
}, THREE.Plane = function (a, b) {
    this.normal = void 0 !== a ? a : new THREE.Vector3(1, 0, 0), this.constant = void 0 !== b ? b : 0
}, THREE.Plane.prototype = {
    constructor: THREE.Plane,
    set: function (a, b) {
        return this.normal.copy(a), this.constant = b, this
    },
    setComponents: function (a, b, c, d) {
        return this.normal.set(a, b, c), this.constant = d, this
    },
    setFromNormalAndCoplanarPoint: function (a, b) {
        return this.normal.copy(a), this.constant = -b.dot(this.normal), this
    },
    setFromCoplanarPoints: function () {
        var a = new THREE.Vector3,
            b = new THREE.Vector3;
        return function (c, d, e) {
            return d = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize(), this.setFromNormalAndCoplanarPoint(d, c), this
        }
    }(),
    copy: function (a) {
        return this.normal.copy(a.normal), this.constant = a.constant, this
    },
    normalize: function () {
        var a = 1 / this.normal.length();
        return this.normal.multiplyScalar(a), this.constant *= a, this
    },
    negate: function () {
        return this.constant *= -1, this.normal.negate(), this
    },
    distanceToPoint: function (a) {
        return this.normal.dot(a) + this.constant
    },
    distanceToSphere: function (a) {
        return this.distanceToPoint(a.center) - a.radius
    },
    projectPoint: function (a, b) {
        return this.orthoPoint(a, b).sub(a).negate()
    },
    orthoPoint: function (a, b) {
        var c = this.distanceToPoint(a);
        return (b || new THREE.Vector3).copy(this.normal).multiplyScalar(c)
    },
    isIntersectionLine: function (a) {
        var b = this.distanceToPoint(a.start),
            a = this.distanceToPoint(a.end);
        return 0 > b && a > 0 || 0 > a && b > 0
    },
    intersectLine: function () {
        var a = new THREE.Vector3;
        return function (b, c) {
            var d = c || new THREE.Vector3,
                e = b.delta(a),
                f = this.normal.dot(e);
            return 0 != f ? (f = -(b.start.dot(this.normal) + this.constant) / f, 0 > f || f > 1 ? void 0 : d.copy(e).multiplyScalar(f).add(b.start)) : 0 == this.distanceToPoint(b.start) ? d.copy(b.start) : void 0
        }
    }(),
    coplanarPoint: function (a) {
        return (a || new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)
    },
    applyMatrix4: function () {
        var a = new THREE.Vector3,
            b = new THREE.Vector3;
        return function (c, d) {
            var d = d || (new THREE.Matrix3).getNormalMatrix(c),
                e = a.copy(this.normal).applyMatrix3(d),
                f = this.coplanarPoint(b);
            return f.applyMatrix4(c), this.setFromNormalAndCoplanarPoint(e, f), this
        }
    }(),
    translate: function (a) {
        return this.constant -= a.dot(this.normal), this
    },
    equals: function (a) {
        return a.normal.equals(this.normal) && a.constant == this.constant
    },
    clone: function () {
        return (new THREE.Plane).copy(this)
    }
}, THREE.Math = {
    clamp: function (a, b, c) {
        return b > a ? b : a > c ? c : a
    },
    clampBottom: function (a, b) {
        return b > a ? b : a
    },
    mapLinear: function (a, b, c, d, e) {
        return d + (a - b) * (e - d) / (c - b)
    },
    smoothstep: function (a, b, c) {
        return b >= a ? 0 : a >= c ? 1 : (a = (a - b) / (c - b), a * a * (3 - 2 * a))
    },
    smootherstep: function (a, b, c) {
        return b >= a ? 0 : a >= c ? 1 : (a = (a - b) / (c - b), a * a * a * (a * (6 * a - 15) + 10))
    },
    random16: function () {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    },
    randInt: function (a, b) {
        return a + Math.floor(Math.random() * (b - a + 1))
    },
    randFloat: function (a, b) {
        return a + Math.random() * (b - a)
    },
    randFloatSpread: function (a) {
        return a * (.5 - Math.random())
    },
    sign: function (a) {
        return 0 > a ? -1 : a > 0 ? 1 : 0
    },
    degToRad: function () {
        var a = Math.PI / 180;
        return function (b) {
            return b * a
        }
    }(),
    radToDeg: function () {
        var a = 180 / Math.PI;
        return function (b) {
            return b * a
        }
    }()
}, THREE.Spline = function (a) {
    function b(a, b, c, d, e, f, g) {
        return a = .5 * (c - a), d = .5 * (d - b), (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b
    }
    this.points = a;
    var c, d, e, f, g, h, i, j, k, l = [],
        m = {
            x: 0,
            y: 0,
            z: 0
        };
    this.initFromArray = function (a) {
        this.points = [];
        for (var b = 0; b < a.length; b++) this.points[b] = {
            x: a[b][0],
            y: a[b][1],
            z: a[b][2]
        }
    }, this.getPoint = function (a) {
        return c = (this.points.length - 1) * a, d = Math.floor(c), e = c - d, l[0] = 0 === d ? d : d - 1, l[1] = d, l[2] = d > this.points.length - 2 ? this.points.length - 1 : d + 1, l[3] = d > this.points.length - 3 ? this.points.length - 1 : d + 2, h = this.points[l[0]], i = this.points[l[1]], j = this.points[l[2]], k = this.points[l[3]], f = e * e, g = e * f, m.x = b(h.x, i.x, j.x, k.x, e, f, g), m.y = b(h.y, i.y, j.y, k.y, e, f, g), m.z = b(h.z, i.z, j.z, k.z, e, f, g), m
    }, this.getControlPointsArray = function () {
        var a, b, c = this.points.length,
            d = [];
        for (a = 0; c > a; a++) b = this.points[a], d[a] = [b.x, b.y, b.z];
        return d
    }, this.getLength = function (a) {
        var b, c, d, e = b = b = 0,
            f = new THREE.Vector3,
            g = new THREE.Vector3,
            h = [],
            i = 0;
        for (h[0] = 0, a || (a = 100), c = this.points.length * a, f.copy(this.points[0]), a = 1; c > a; a++) b = a / c, d = this.getPoint(b), g.copy(d), i += g.distanceTo(f), f.copy(d), b *= this.points.length - 1, b = Math.floor(b), b != e && (h[b] = i, e = b);
        return h[h.length] = i, {
            chunks: h,
            total: i
        }
    }, this.reparametrizeByArcLength = function (a) {
        var b, c, d, e, f, g, h = [],
            i = new THREE.Vector3,
            j = this.getLength();
        for (h.push(i.copy(this.points[0]).clone()), b = 1; b < this.points.length; b++) {
            for (c = j.chunks[b] - j.chunks[b - 1], g = Math.ceil(a * c / j.total), e = (b - 1) / (this.points.length - 1), f = b / (this.points.length - 1), c = 1; g - 1 > c; c++) d = e + c * (1 / g) * (f - e), d = this.getPoint(d), h.push(i.copy(d).clone());
            h.push(i.copy(this.points[b]).clone())
        }
        this.points = h
    }
}, THREE.Triangle = function (a, b, c) {
    this.a = void 0 !== a ? a : new THREE.Vector3, this.b = void 0 !== b ? b : new THREE.Vector3, this.c = void 0 !== c ? c : new THREE.Vector3
}, THREE.Triangle.normal = function () {
    var a = new THREE.Vector3;
    return function (b, c, d, e) {
        return e = e || new THREE.Vector3, e.subVectors(d, c), a.subVectors(b, c), e.cross(a), b = e.lengthSq(), b > 0 ? e.multiplyScalar(1 / Math.sqrt(b)) : e.set(0, 0, 0)
    }
}(), THREE.Triangle.barycoordFromPoint = function () {
    var a = new THREE.Vector3,
        b = new THREE.Vector3,
        c = new THREE.Vector3;
    return function (d, e, f, g, h) {
        a.subVectors(g, e), b.subVectors(f, e), c.subVectors(d, e);
        var d = a.dot(a),
            e = a.dot(b),
            f = a.dot(c),
            i = b.dot(b),
            g = b.dot(c),
            j = d * i - e * e,
            h = h || new THREE.Vector3;
        return 0 == j ? h.set(-2, -1, -1) : (j = 1 / j, i = (i * f - e * g) * j, d = (d * g - e * f) * j, h.set(1 - i - d, d, i))
    }
}(), THREE.Triangle.containsPoint = function () {
    var a = new THREE.Vector3;
    return function (b, c, d, e) {
        return b = THREE.Triangle.barycoordFromPoint(b, c, d, e, a), 0 <= b.x && 0 <= b.y && 1 >= b.x + b.y
    }
}(), THREE.Triangle.prototype = {
    constructor: THREE.Triangle,
    set: function (a, b, c) {
        return this.a.copy(a), this.b.copy(b), this.c.copy(c), this
    },
    setFromPointsAndIndices: function (a, b, c, d) {
        return this.a.copy(a[b]), this.b.copy(a[c]), this.c.copy(a[d]), this
    },
    copy: function (a) {
        return this.a.copy(a.a), this.b.copy(a.b), this.c.copy(a.c), this
    },
    area: function () {
        var a = new THREE.Vector3,
            b = new THREE.Vector3;
        return function () {
            return a.subVectors(this.c, this.b), b.subVectors(this.a, this.b), .5 * a.cross(b).length()
        }
    }(),
    midpoint: function (a) {
        return (a || new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    },
    normal: function (a) {
        return THREE.Triangle.normal(this.a, this.b, this.c, a)
    },
    plane: function (a) {
        return (a || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
    },
    barycoordFromPoint: function (a, b) {
        return THREE.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b)
    },
    containsPoint: function (a) {
        return THREE.Triangle.containsPoint(a, this.a, this.b, this.c)
    },
    equals: function (a) {
        return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
    },
    clone: function () {
        return (new THREE.Triangle).copy(this)
    }
}, THREE.Vertex = function (a) {
    return console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead."), a
}, THREE.UV = function (a, b) {
    return console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead."), new THREE.Vector2(a, b)
}, THREE.Clock = function (a) {
    this.autoStart = void 0 !== a ? a : !0, this.elapsedTime = this.oldTime = this.startTime = 0, this.running = !1
}, THREE.Clock.prototype = {
    constructor: THREE.Clock,
    start: function () {
        this.oldTime = this.startTime = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(), this.running = !0
    },
    stop: function () {
        this.getElapsedTime(), this.running = !1
    },
    getElapsedTime: function () {
        return this.getDelta(), this.elapsedTime
    },
    getDelta: function () {
        var a = 0;
        if (this.autoStart && !this.running && this.start(), this.running) {
            var b = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(),
                a = .001 * (b - this.oldTime);
            this.oldTime = b, this.elapsedTime += a
        }
        return a
    }
}, THREE.EventDispatcher = function () {}, THREE.EventDispatcher.prototype = {
    constructor: THREE.EventDispatcher,
    addEventListener: function (a, b) {
        void 0 === this._listeners && (this._listeners = {});
        var c = this._listeners;
        void 0 === c[a] && (c[a] = []), -1 === c[a].indexOf(b) && c[a].push(b)
    },
    hasEventListener: function (a, b) {
        if (void 0 === this._listeners) return !1;
        var c = this._listeners;
        return void 0 !== c[a] && -1 !== c[a].indexOf(b) ? !0 : !1
    },
    removeEventListener: function (a, b) {
        if (void 0 !== this._listeners) {
            var c = this._listeners,
                d = c[a].indexOf(b); - 1 !== d && c[a].splice(d, 1)
        }
    },
    dispatchEvent: function (a) {
        if (void 0 !== this._listeners) {
            var b = this._listeners[a.type];
            if (void 0 !== b) {
                a.target = this;
                for (var c = 0, d = b.length; d > c; c++) b[c].call(this, a)
            }
        }
    }
},
function (a) {
    a.Raycaster = function (b, c, d, e) {
        this.ray = new a.Ray(b, c), 0 < this.ray.direction.lengthSq() && this.ray.direction.normalize(), this.near = d || 0, this.far = e || 1 / 0
    };
    var b = new a.Sphere,
        c = new a.Ray,
        d = new a.Plane,
        e = new a.Vector3,
        f = new a.Vector3,
        g = new a.Matrix4,
        h = function (a, b) {
            return a.distance - b.distance
        },
        i = function (h, j, k) {
            if (h instanceof a.Particle) {
                f.getPositionFromMatrix(h.matrixWorld);
                var l = j.ray.distanceToPoint(f);
                if (l > h.scale.x) return k;
                k.push({
                    distance: l,
                    point: h.position,
                    face: null,
                    object: h
                })
            } else if (h instanceof a.LOD) f.getPositionFromMatrix(h.matrixWorld), l = j.ray.origin.distanceTo(f), i(h.getObjectForDistance(l), j, k);
            else if (h instanceof a.Mesh) {
                if (f.getPositionFromMatrix(h.matrixWorld), b.set(f, h.geometry.boundingSphere.radius * h.matrixWorld.getMaxScaleOnAxis()), !j.ray.isIntersectionSphere(b)) return k;
                var m, n, o, l = h.geometry,
                    p = l.vertices,
                    q = h.material instanceof a.MeshFaceMaterial,
                    r = !0 === q ? h.material.materials : null,
                    s = h.material.side,
                    t = j.precision;
                g.getInverse(h.matrixWorld), c.copy(j.ray).applyMatrix4(g);
                for (var u = 0, v = l.faces.length; v > u; u++) {
                    var w = l.faces[u],
                        s = !0 === q ? r[w.materialIndex] : h.material;
                    if (void 0 !== s) {
                        d.setFromNormalAndCoplanarPoint(w.normal, p[w.a]);
                        var x = c.distanceToPlane(d);
                        if (!(Math.abs(x) < t || 0 > x)) {
                            if (s = s.side, s !== a.DoubleSide && (m = c.direction.dot(d.normal), !(s === a.FrontSide ? 0 > m : m > 0))) continue;
                            if (!(x < j.near || x > j.far)) {
                                if (e = c.at(x, e), w instanceof a.Face3) {
                                    if (s = p[w.a], m = p[w.b], n = p[w.c], !a.Triangle.containsPoint(e, s, m, n)) continue
                                } else {
                                    if (!(w instanceof a.Face4)) throw Error("face type not supported");
                                    if (s = p[w.a], m = p[w.b], n = p[w.c], o = p[w.d], !a.Triangle.containsPoint(e, s, m, o) && !a.Triangle.containsPoint(e, m, n, o)) continue
                                }
                                k.push({
                                    distance: x,
                                    point: j.ray.at(x),
                                    face: w,
                                    faceIndex: u,
                                    object: h
                                })
                            }
                        }
                    }
                }
            }
        },
        j = function (a, b, c) {
            for (var a = a.getDescendants(), d = 0, e = a.length; e > d; d++) i(a[d], b, c)
        };
    a.Raycaster.prototype.precision = 1e-4, a.Raycaster.prototype.set = function (a, b) {
        this.ray.set(a, b), 0 < this.ray.direction.length() && this.ray.direction.normalize()
    }, a.Raycaster.prototype.intersectObject = function (a, b) {
        var c = [];
        return !0 === b && j(a, this, c), i(a, this, c), c.sort(h), c
    }, a.Raycaster.prototype.intersectObjects = function (a, b) {
        for (var c = [], d = 0, e = a.length; e > d; d++) i(a[d], this, c), !0 === b && j(a[d], this, c);
        return c.sort(h), c
    }
}(THREE), THREE.Object3D = function () {
    this.id = THREE.Object3DIdCount++, this.name = "", this.parent = void 0, this.children = [], this.up = new THREE.Vector3(0, 1, 0), this.position = new THREE.Vector3, this.rotation = new THREE.Vector3, this.eulerOrder = THREE.Object3D.defaultEulerOrder, this.scale = new THREE.Vector3(1, 1, 1), this.renderDepth = null, this.rotationAutoUpdate = !0, this.matrix = new THREE.Matrix4, this.matrixWorld = new THREE.Matrix4, this.matrixWorldNeedsUpdate = this.matrixAutoUpdate = !0, this.quaternion = new THREE.Quaternion, this.useQuaternion = !1, this.visible = !0, this.receiveShadow = this.castShadow = !1, this.frustumCulled = !0, this.userData = {}
}, THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    applyMatrix: function () {
        var a = new THREE.Matrix4;
        return function (b) {
            this.matrix.multiplyMatrices(b, this.matrix), this.position.getPositionFromMatrix(this.matrix), this.scale.getScaleFromMatrix(this.matrix), a.extractRotation(this.matrix), !0 === this.useQuaternion ? this.quaternion.setFromRotationMatrix(a) : this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder)
        }
    }(),
    rotateOnAxis: function () {
        var a = new THREE.Quaternion,
            b = new THREE.Quaternion;
        return function (c, d) {
            return a.setFromAxisAngle(c, d), !0 === this.useQuaternion ? this.quaternion.multiply(a) : (b.setFromEuler(this.rotation, this.eulerOrder), b.multiply(a), this.rotation.setEulerFromQuaternion(b, this.eulerOrder)), this
        }
    }(),
    translateOnAxis: function () {
        var a = new THREE.Vector3;
        return function (b, c) {
            return a.copy(b), !0 === this.useQuaternion ? a.applyQuaternion(this.quaternion) : a.applyEuler(this.rotation, this.eulerOrder), this.position.add(a.multiplyScalar(c)), this
        }
    }(),
    translate: function (a, b) {
        return console.warn("DEPRECATED: Object3D's .translate() has been removed. Use .translateOnAxis( axis, distance ) instead. Note args have been changed."), this.translateOnAxis(b, a)
    },
    translateX: function () {
        var a = new THREE.Vector3(1, 0, 0);
        return function (b) {
            return this.translateOnAxis(a, b)
        }
    }(),
    translateY: function () {
        var a = new THREE.Vector3(0, 1, 0);
        return function (b) {
            return this.translateOnAxis(a, b)
        }
    }(),
    translateZ: function () {
        var a = new THREE.Vector3(0, 0, 1);
        return function (b) {
            return this.translateOnAxis(a, b)
        }
    }(),
    localToWorld: function (a) {
        return a.applyMatrix4(this.matrixWorld)
    },
    worldToLocal: function () {
        var a = new THREE.Matrix4;
        return function (b) {
            return b.applyMatrix4(a.getInverse(this.matrixWorld))
        }
    }(),
    lookAt: function () {
        var a = new THREE.Matrix4;
        return function (b) {
            a.lookAt(b, this.position, this.up), !0 === this.useQuaternion ? this.quaternion.setFromRotationMatrix(a) : this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder)
        }
    }(),
    add: function (a) {
        if (a === this) console.warn("THREE.Object3D.add: An object can't be added as a child of itself.");
        else if (a instanceof THREE.Object3D) {
            void 0 !== a.parent && a.parent.remove(a), a.parent = this, this.children.push(a);
            for (var b = this; void 0 !== b.parent;) b = b.parent;
            void 0 !== b && b instanceof THREE.Scene && b.__addObject(a)
        }
    },
    remove: function (a) {
        var b = this.children.indexOf(a);
        if (-1 !== b) {
            for (a.parent = void 0, this.children.splice(b, 1), b = this; void 0 !== b.parent;) b = b.parent;
            void 0 !== b && b instanceof THREE.Scene && b.__removeObject(a)
        }
    },
    traverse: function (a) {
        a(this);
        for (var b = 0, c = this.children.length; c > b; b++) this.children[b].traverse(a)
    },
    getObjectById: function (a, b) {
        for (var c = 0, d = this.children.length; d > c; c++) {
            var e = this.children[c];
            if (e.id === a || !0 === b && (e = e.getObjectById(a, b), void 0 !== e)) return e
        }
    },
    getObjectByName: function (a, b) {
        for (var c = 0, d = this.children.length; d > c; c++) {
            var e = this.children[c];
            if (e.name === a || !0 === b && (e = e.getObjectByName(a, b), void 0 !== e)) return e
        }
    },
    getChildByName: function (a, b) {
        return console.warn("DEPRECATED: Object3D's .getChildByName() has been renamed to .getObjectByName()."), this.getObjectByName(a, b)
    },
    getDescendants: function (a) {
        void 0 === a && (a = []), Array.prototype.push.apply(a, this.children);
        for (var b = 0, c = this.children.length; c > b; b++) this.children[b].getDescendants(a);
        return a
    },
    updateMatrix: function () {
        !1 === this.useQuaternion ? this.matrix.makeFromPositionEulerScale(this.position, this.rotation, this.eulerOrder, this.scale) : this.matrix.makeFromPositionQuaternionScale(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function (a) {
        !0 === this.matrixAutoUpdate && this.updateMatrix(), (!0 === this.matrixWorldNeedsUpdate || !0 === a) && (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0);
        for (var b = 0, c = this.children.length; c > b; b++) this.children[b].updateMatrixWorld(a)
    },
    clone: function (a) {
        void 0 === a && (a = new THREE.Object3D), a.name = this.name, a.up.copy(this.up), a.position.copy(this.position), a.rotation instanceof THREE.Vector3 && a.rotation.copy(this.rotation), a.eulerOrder = this.eulerOrder, a.scale.copy(this.scale), a.renderDepth = this.renderDepth, a.rotationAutoUpdate = this.rotationAutoUpdate, a.matrix.copy(this.matrix), a.matrixWorld.copy(this.matrixWorld), a.matrixAutoUpdate = this.matrixAutoUpdate, a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate, a.quaternion.copy(this.quaternion), a.useQuaternion = this.useQuaternion, a.visible = this.visible, a.castShadow = this.castShadow, a.receiveShadow = this.receiveShadow, a.frustumCulled = this.frustumCulled, a.userData = JSON.parse(JSON.stringify(this.userData));
        for (var b = 0; b < this.children.length; b++) a.add(this.children[b].clone());
        return a
    }
}, THREE.Object3D.defaultEulerOrder = "XYZ", THREE.Object3DIdCount = 0, THREE.Projector = function () {
    function a() {
        if (f === r) {
            var a = new THREE.RenderableObject;
            return q.push(a), r++, f++, a
        }
        return q[f++]
    }

    function b() {
        if (h === t) {
            var a = new THREE.RenderableVertex;
            return s.push(a), t++, h++, a
        }
        return s[h++]
    }

    function c(a, b) {
        return b.z - a.z
    }

    function d(a, b) {
        var c = 0,
            d = 1,
            e = a.z + a.w,
            f = b.z + b.w,
            g = -a.z + a.w,
            h = -b.z + b.w;
        return e >= 0 && f >= 0 && g >= 0 && h >= 0 ? !0 : 0 > e && 0 > f || 0 > g && 0 > h ? !1 : (0 > e ? c = Math.max(c, e / (e - f)) : 0 > f && (d = Math.min(d, e / (e - f))), 0 > g ? c = Math.max(c, g / (g - h)) : 0 > h && (d = Math.min(d, g / (g - h))), c > d ? !1 : (a.lerp(b, c), b.lerp(a, 1 - d), !0))
    }
    var e, f, g, h, i, j, k, l, m, n, o, p, q = [],
        r = 0,
        s = [],
        t = 0,
        u = [],
        v = 0,
        w = [],
        x = 0,
        y = [],
        z = 0,
        A = [],
        B = 0,
        C = {
            objects: [],
            sprites: [],
            lights: [],
            elements: []
        },
        D = new THREE.Vector3,
        E = new THREE.Vector4,
        F = new THREE.Box3(new THREE.Vector3(-1, -1, -1), new THREE.Vector3(1, 1, 1)),
        G = new THREE.Box3,
        H = Array(3),
        I = Array(4),
        J = new THREE.Matrix4,
        K = new THREE.Matrix4,
        L = new THREE.Matrix4,
        M = new THREE.Matrix3,
        N = new THREE.Matrix3,
        O = new THREE.Vector3,
        P = new THREE.Frustum,
        Q = new THREE.Vector4,
        R = new THREE.Vector4;
    this.projectVector = function (a, b) {
        return b.matrixWorldInverse.getInverse(b.matrixWorld), K.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse), a.applyProjection(K)
    }, this.unprojectVector = function (a, b) {
        return b.projectionMatrixInverse.getInverse(b.projectionMatrix), K.multiplyMatrices(b.matrixWorld, b.projectionMatrixInverse), a.applyProjection(K)
    }, this.pickingRay = function (a, b) {
        a.z = -1;
        var c = new THREE.Vector3(a.x, a.y, 1);
        return this.unprojectVector(a, b), this.unprojectVector(c, b), c.sub(a).normalize(), new THREE.Raycaster(a, c)
    }, this.projectScene = function (q, r, t, S) {
        var T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db, eb = !1;
        o = m = k = j = 0, C.elements.length = 0, !0 === q.autoUpdate && q.updateMatrixWorld(), void 0 === r.parent && r.updateMatrixWorld(), J.copy(r.matrixWorldInverse.getInverse(r.matrixWorld)), K.multiplyMatrices(r.projectionMatrix, J), N.getNormalMatrix(J), P.setFromMatrix(K), f = 0, C.objects.length = 0, C.sprites.length = 0, C.lights.length = 0;
        var fb = function (b) {
            for (var c = 0, d = b.children.length; d > c; c++) {
                var f = b.children[c];
                !1 !== f.visible && (f instanceof THREE.Light ? C.lights.push(f) : f instanceof THREE.Mesh || f instanceof THREE.Line ? (!1 === f.frustumCulled || !0 === P.intersectsObject(f)) && (e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth : (D.getPositionFromMatrix(f.matrixWorld), D.applyProjection(K), e.z = D.z), C.objects.push(e)) : f instanceof THREE.Sprite || f instanceof THREE.Particle ? (e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth : (D.getPositionFromMatrix(f.matrixWorld), D.applyProjection(K), e.z = D.z), C.sprites.push(e)) : (e = a(), e.object = f, null !== f.renderDepth ? e.z = f.renderDepth : (D.getPositionFromMatrix(f.matrixWorld), D.applyProjection(K), e.z = D.z), C.objects.push(e)), fb(f))
            }
        };
        for (fb(q), !0 === t && C.objects.sort(c), q = 0, t = C.objects.length; t > q; q++)
            if ($ = C.objects[q].object, p = $.matrixWorld, h = 0, $ instanceof THREE.Mesh) {
                for (_ = $.geometry, V = _.vertices, ab = _.faces, _ = _.faceVertexUvs, M.getNormalMatrix(p), cb = $.material instanceof THREE.MeshFaceMaterial, db = !0 === cb ? $.material : null, T = 0, U = V.length; U > T; T++) g = b(), g.positionWorld.copy(V[T]).applyMatrix4(p), g.positionScreen.copy(g.positionWorld).applyMatrix4(K), g.positionScreen.x /= g.positionScreen.w, g.positionScreen.y /= g.positionScreen.w, g.positionScreen.z /= g.positionScreen.w, g.visible = !(-1 > g.positionScreen.x || 1 < g.positionScreen.x || -1 > g.positionScreen.y || 1 < g.positionScreen.y || -1 > g.positionScreen.z || 1 < g.positionScreen.z);
                for (V = 0, T = ab.length; T > V; V++) {
                    U = ab[V];
                    var gb = !0 === cb ? db.materials[U.materialIndex] : $.material;
                    if (void 0 !== gb) {
                        if (Y = gb.side, U instanceof THREE.Face3) {
                            if (W = s[U.a], X = s[U.b], Z = s[U.c], H[0] = W.positionScreen, H[1] = X.positionScreen, H[2] = Z.positionScreen, !0 !== W.visible && !0 !== X.visible && !0 !== Z.visible && !F.isIntersectionBox(G.setFromPoints(H))) continue;
                            if (eb = 0 > (Z.positionScreen.x - W.positionScreen.x) * (X.positionScreen.y - W.positionScreen.y) - (Z.positionScreen.y - W.positionScreen.y) * (X.positionScreen.x - W.positionScreen.x), Y !== THREE.DoubleSide && eb !== (Y === THREE.FrontSide)) continue;
                            j === v ? (bb = new THREE.RenderableFace3, u.push(bb), v++, j++, i = bb) : i = u[j++], i.v1.copy(W), i.v2.copy(X), i.v3.copy(Z)
                        } else if (U instanceof THREE.Face4) {
                            if (W = s[U.a], X = s[U.b], Z = s[U.c], bb = s[U.d], I[0] = W.positionScreen, I[1] = X.positionScreen, I[2] = Z.positionScreen, I[3] = bb.positionScreen, !0 !== W.visible && !0 !== X.visible && !0 !== Z.visible && !0 !== bb.visible && !F.isIntersectionBox(G.setFromPoints(I))) continue;
                            if (eb = 0 > (bb.positionScreen.x - W.positionScreen.x) * (X.positionScreen.y - W.positionScreen.y) - (bb.positionScreen.y - W.positionScreen.y) * (X.positionScreen.x - W.positionScreen.x) || 0 > (X.positionScreen.x - Z.positionScreen.x) * (bb.positionScreen.y - Z.positionScreen.y) - (X.positionScreen.y - Z.positionScreen.y) * (bb.positionScreen.x - Z.positionScreen.x), Y !== THREE.DoubleSide && eb !== (Y === THREE.FrontSide)) continue;
                            if (k === x) {
                                var hb = new THREE.RenderableFace4;
                                w.push(hb), x++, k++, i = hb
                            } else i = w[k++];
                            i.v1.copy(W), i.v2.copy(X), i.v3.copy(Z), i.v4.copy(bb)
                        }
                        for (i.normalModel.copy(U.normal), !1 === eb && (Y === THREE.BackSide || Y === THREE.DoubleSide) && i.normalModel.negate(), i.normalModel.applyMatrix3(M).normalize(), i.normalModelView.copy(i.normalModel).applyMatrix3(N), i.centroidModel.copy(U.centroid).applyMatrix4(p), Z = U.vertexNormals, W = 0, X = Z.length; X > W; W++) bb = i.vertexNormalsModel[W], bb.copy(Z[W]), !1 === eb && (Y === THREE.BackSide || Y === THREE.DoubleSide) && bb.negate(), bb.applyMatrix3(M).normalize(), i.vertexNormalsModelView[W].copy(bb).applyMatrix3(N);
                        for (i.vertexNormalsLength = Z.length, W = 0, X = _.length; X > W; W++)
                            if (bb = _[W][V], void 0 !== bb)
                                for (Y = 0, Z = bb.length; Z > Y; Y++) i.uvs[W][Y] = bb[Y];
                        i.color = U.color, i.material = gb, O.copy(i.centroidModel).applyProjection(K), i.z = O.z, C.elements.push(i)
                    }
                }
            } else if ($ instanceof THREE.Line)
            for (L.multiplyMatrices(K, p), V = $.geometry.vertices, W = b(), W.positionScreen.copy(V[0]).applyMatrix4(L), ab = $.type === THREE.LinePieces ? 2 : 1, T = 1, U = V.length; U > T; T++) W = b(), W.positionScreen.copy(V[T]).applyMatrix4(L), (T + 1) % ab > 0 || (X = s[h - 2], Q.copy(W.positionScreen), R.copy(X.positionScreen), !0 === d(Q, R) && (Q.multiplyScalar(1 / Q.w), R.multiplyScalar(1 / R.w), m === z ? (_ = new THREE.RenderableLine, y.push(_), z++, m++, l = _) : l = y[m++], l.v1.positionScreen.copy(Q), l.v2.positionScreen.copy(R), l.z = Math.max(Q.z, R.z), l.material = $.material, $.material.vertexColors === THREE.VertexColors && (l.vertexColors[0].copy($.geometry.colors[T]), l.vertexColors[1].copy($.geometry.colors[T - 1])), C.elements.push(l)));
        for (q = 0, t = C.sprites.length; t > q; q++) $ = C.sprites[q].object, p = $.matrixWorld, $ instanceof THREE.Particle && (E.set(p.elements[12], p.elements[13], p.elements[14], 1), E.applyMatrix4(K), E.z /= E.w, 0 < E.z && 1 > E.z && (o === B ? (eb = new THREE.RenderableParticle, A.push(eb), B++, o++, n = eb) : n = A[o++], n.object = $, n.x = E.x / E.w, n.y = E.y / E.w, n.z = E.z, n.rotation = $.rotation.z, n.scale.x = $.scale.x * Math.abs(n.x - (E.x + r.projectionMatrix.elements[0]) / (E.w + r.projectionMatrix.elements[12])), n.scale.y = $.scale.y * Math.abs(n.y - (E.y + r.projectionMatrix.elements[5]) / (E.w + r.projectionMatrix.elements[13])), n.material = $.material, C.elements.push(n)));
        return !0 === S && C.elements.sort(c), C
    }
}, THREE.Face3 = function (a, b, c, d, e, f) {
    this.a = a, this.b = b, this.c = c, this.normal = d instanceof THREE.Vector3 ? d : new THREE.Vector3, this.vertexNormals = d instanceof Array ? d : [], this.color = e instanceof THREE.Color ? e : new THREE.Color, this.vertexColors = e instanceof Array ? e : [], this.vertexTangents = [], this.materialIndex = void 0 !== f ? f : 0, this.centroid = new THREE.Vector3
}, THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function () {
        var a = new THREE.Face3(this.a, this.b, this.c);
        a.normal.copy(this.normal), a.color.copy(this.color), a.centroid.copy(this.centroid), a.materialIndex = this.materialIndex;
        var b, c;
        for (b = 0, c = this.vertexNormals.length; c > b; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        for (b = 0, c = this.vertexColors.length; c > b; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        for (b = 0, c = this.vertexTangents.length; c > b; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
}, THREE.Face4 = function (a, b, c, d, e, f, g) {
    this.a = a, this.b = b, this.c = c, this.d = d, this.normal = e instanceof THREE.Vector3 ? e : new THREE.Vector3, this.vertexNormals = e instanceof Array ? e : [], this.color = f instanceof THREE.Color ? f : new THREE.Color, this.vertexColors = f instanceof Array ? f : [], this.vertexTangents = [], this.materialIndex = void 0 !== g ? g : 0, this.centroid = new THREE.Vector3
}, THREE.Face4.prototype = {
    constructor: THREE.Face4,
    clone: function () {
        var a = new THREE.Face4(this.a, this.b, this.c, this.d);
        a.normal.copy(this.normal), a.color.copy(this.color), a.centroid.copy(this.centroid), a.materialIndex = this.materialIndex;
        var b, c;
        for (b = 0, c = this.vertexNormals.length; c > b; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
        for (b = 0, c = this.vertexColors.length; c > b; b++) a.vertexColors[b] = this.vertexColors[b].clone();
        for (b = 0, c = this.vertexTangents.length; c > b; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
        return a
    }
}, THREE.Geometry = function () {
    this.id = THREE.GeometryIdCount++, this.name = "", this.vertices = [], this.colors = [], this.normals = [], this.faces = [], this.faceUvs = [[]], this.faceVertexUvs = [[]], this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], this.skinIndices = [], this.lineDistances = [], this.boundingSphere = this.boundingBox = null, this.hasTangents = !1, this.dynamic = !0, this.buffersNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.tangentsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.elementsNeedUpdate = this.verticesNeedUpdate = !1
}, THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    applyMatrix: function (a) {
        for (var b = (new THREE.Matrix3).getNormalMatrix(a), c = 0, d = this.vertices.length; d > c; c++) this.vertices[c].applyMatrix4(a);
        for (c = 0, d = this.faces.length; d > c; c++) {
            var e = this.faces[c];
            e.normal.applyMatrix3(b).normalize();
            for (var f = 0, g = e.vertexNormals.length; g > f; f++) e.vertexNormals[f].applyMatrix3(b).normalize();
            e.centroid.applyMatrix4(a)
        }
    },
    computeCentroids: function () {
        var a, b, c;
        for (a = 0, b = this.faces.length; b > a; a++) c = this.faces[a], c.centroid.set(0, 0, 0), c instanceof THREE.Face3 ? (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.divideScalar(3)) : c instanceof THREE.Face4 && (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.add(this.vertices[c.d]), c.centroid.divideScalar(4))
    },
    computeFaceNormals: function () {
        for (var a = new THREE.Vector3, b = new THREE.Vector3, c = 0, d = this.faces.length; d > c; c++) {
            var e = this.faces[c],
                f = this.vertices[e.a],
                g = this.vertices[e.b];
            a.subVectors(this.vertices[e.c], g), b.subVectors(f, g), a.cross(b), a.normalize(), e.normal.copy(a)
        }
    },
    computeVertexNormals: function (a) {
        var b, c, d, e;
        if (void 0 === this.__tmpVertices) {
            for (e = this.__tmpVertices = Array(this.vertices.length), b = 0, c = this.vertices.length; c > b; b++) e[b] = new THREE.Vector3;
            for (b = 0, c = this.faces.length; c > b; b++) d = this.faces[b], d instanceof THREE.Face3 ? d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3] : d instanceof THREE.Face4 && (d.vertexNormals = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3])
        } else
            for (e = this.__tmpVertices, b = 0, c = this.vertices.length; c > b; b++) e[b].set(0, 0, 0); if (a) {
            var f, g, h, i = new THREE.Vector3,
                j = new THREE.Vector3,
                k = new THREE.Vector3,
                l = new THREE.Vector3,
                m = new THREE.Vector3;
            for (b = 0, c = this.faces.length; c > b; b++) d = this.faces[b], d instanceof THREE.Face3 ? (a = this.vertices[d.a], f = this.vertices[d.b], g = this.vertices[d.c], i.subVectors(g, f), j.subVectors(a, f), i.cross(j), e[d.a].add(i), e[d.b].add(i), e[d.c].add(i)) : d instanceof THREE.Face4 && (a = this.vertices[d.a], f = this.vertices[d.b], g = this.vertices[d.c], h = this.vertices[d.d], k.subVectors(h, f), j.subVectors(a, f), k.cross(j), e[d.a].add(k), e[d.b].add(k), e[d.d].add(k), l.subVectors(h, g), m.subVectors(f, g), l.cross(m), e[d.b].add(l), e[d.c].add(l), e[d.d].add(l))
        } else
            for (b = 0, c = this.faces.length; c > b; b++) d = this.faces[b], d instanceof THREE.Face3 ? (e[d.a].add(d.normal), e[d.b].add(d.normal), e[d.c].add(d.normal)) : d instanceof THREE.Face4 && (e[d.a].add(d.normal), e[d.b].add(d.normal), e[d.c].add(d.normal), e[d.d].add(d.normal));
        for (b = 0, c = this.vertices.length; c > b; b++) e[b].normalize();
        for (b = 0, c = this.faces.length; c > b; b++) d = this.faces[b], d instanceof THREE.Face3 ? (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c])) : d instanceof THREE.Face4 && (d.vertexNormals[0].copy(e[d.a]), d.vertexNormals[1].copy(e[d.b]), d.vertexNormals[2].copy(e[d.c]), d.vertexNormals[3].copy(e[d.d]))
    },
    computeMorphNormals: function () {
        var a, b, c, d, e;
        for (c = 0, d = this.faces.length; d > c; c++)
            for (e = this.faces[c], e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone(), e.__originalVertexNormals || (e.__originalVertexNormals = []), a = 0, b = e.vertexNormals.length; b > a; a++) e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone();
        var f = new THREE.Geometry;
        for (f.faces = this.faces, a = 0, b = this.morphTargets.length; b > a; a++) {
            if (!this.morphNormals[a]) {
                this.morphNormals[a] = {}, this.morphNormals[a].faceNormals = [], this.morphNormals[a].vertexNormals = [];
                var g, h, i = this.morphNormals[a].faceNormals,
                    j = this.morphNormals[a].vertexNormals;
                for (c = 0, d = this.faces.length; d > c; c++) e = this.faces[c], g = new THREE.Vector3, h = e instanceof THREE.Face3 ? {
                    a: new THREE.Vector3,
                    b: new THREE.Vector3,
                    c: new THREE.Vector3
                } : {
                    a: new THREE.Vector3,
                    b: new THREE.Vector3,
                    c: new THREE.Vector3,
                    d: new THREE.Vector3
                }, i.push(g), j.push(h)
            }
            for (i = this.morphNormals[a], f.vertices = this.morphTargets[a].vertices, f.computeFaceNormals(), f.computeVertexNormals(), c = 0, d = this.faces.length; d > c; c++) e = this.faces[c], g = i.faceNormals[c], h = i.vertexNormals[c], g.copy(e.normal), e instanceof THREE.Face3 ? (h.a.copy(e.vertexNormals[0]), h.b.copy(e.vertexNormals[1]), h.c.copy(e.vertexNormals[2])) : (h.a.copy(e.vertexNormals[0]), h.b.copy(e.vertexNormals[1]), h.c.copy(e.vertexNormals[2]), h.d.copy(e.vertexNormals[3]))
        }
        for (c = 0, d = this.faces.length; d > c; c++) e = this.faces[c], e.normal = e.__originalFaceNormal, e.vertexNormals = e.__originalVertexNormals
    },
    computeTangents: function () {
        function a(a, b, c, d, e, f, y) {
            h = a.vertices[b], i = a.vertices[c], j = a.vertices[d], k = g[e], l = g[f], m = g[y], n = i.x - h.x, o = j.x - h.x, p = i.y - h.y, q = j.y - h.y, r = i.z - h.z, s = j.z - h.z, t = l.x - k.x, u = m.x - k.x, v = l.y - k.y, w = m.y - k.y, x = 1 / (t * w - u * v), B.set((w * n - v * o) * x, (w * p - v * q) * x, (w * r - v * s) * x), C.set((t * o - u * n) * x, (t * q - u * p) * x, (t * s - u * r) * x), z[b].add(B), z[c].add(B), z[d].add(B), A[b].add(C), A[c].add(C), A[d].add(C)
        }
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z = [],
            A = [],
            B = new THREE.Vector3,
            C = new THREE.Vector3,
            D = new THREE.Vector3,
            E = new THREE.Vector3,
            F = new THREE.Vector3;
        for (b = 0, c = this.vertices.length; c > b; b++) z[b] = new THREE.Vector3, A[b] = new THREE.Vector3;
        for (b = 0, c = this.faces.length; c > b; b++) f = this.faces[b], g = this.faceVertexUvs[0][b], f instanceof THREE.Face3 ? a(this, f.a, f.b, f.c, 0, 1, 2) : f instanceof THREE.Face4 && (a(this, f.a, f.b, f.d, 0, 1, 3), a(this, f.b, f.c, f.d, 1, 2, 3));
        var G = ["a", "b", "c", "d"];
        for (b = 0, c = this.faces.length; c > b; b++)
            for (f = this.faces[b], d = 0; d < f.vertexNormals.length; d++) F.copy(f.vertexNormals[d]), e = f[G[d]], y = z[e], D.copy(y), D.sub(F.multiplyScalar(F.dot(y))).normalize(), E.crossVectors(f.vertexNormals[d], y), e = E.dot(A[e]), e = 0 > e ? -1 : 1, f.vertexTangents[d] = new THREE.Vector4(D.x, D.y, D.z, e);
        this.hasTangents = !0
    },
    computeLineDistances: function () {
        for (var a = 0, b = this.vertices, c = 0, d = b.length; d > c; c++) c > 0 && (a += b[c].distanceTo(b[c - 1])), this.lineDistances[c] = a
    },
    computeBoundingBox: function () {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3), this.boundingBox.setFromPoints(this.vertices)
    },
    computeBoundingSphere: function () {
        null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere), this.boundingSphere.setFromCenterAndPoints(this.boundingSphere.center, this.vertices)
    },
    mergeVertices: function () {
        var a, b, c, d, e, f, g = {},
            h = [],
            i = [],
            j = Math.pow(10, 4);
        for (this.__tmpVertices = void 0, b = 0, c = this.vertices.length; c > b; b++) a = this.vertices[b], a = [Math.round(a.x * j), Math.round(a.y * j), Math.round(a.z * j)].join("_"), void 0 === g[a] ? (g[a] = b, h.push(this.vertices[b]), i[b] = h.length - 1) : i[b] = i[g[a]];
        for (j = [], b = 0, c = this.faces.length; c > b; b++)
            if (g = this.faces[b], g instanceof THREE.Face3) {
                for (g.a = i[g.a], g.b = i[g.b], g.c = i[g.c], d = [g.a, g.b, g.c], a = -1, e = 0; 3 > e; e++)
                    if (d[e] == d[(e + 1) % 3]) {
                        j.push(b);
                        break
                    }
            } else if (g instanceof THREE.Face4) {
            for (g.a = i[g.a], g.b = i[g.b], g.c = i[g.c], g.d = i[g.d], d = [g.a, g.b, g.c, g.d], a = -1, e = 0; 4 > e; e++) d[e] == d[(e + 1) % 4] && (a >= 0 && j.push(b), a = e);
            if (a >= 0) {
                d.splice(a, 1);
                var k = new THREE.Face3(d[0], d[1], d[2], g.normal, g.color, g.materialIndex);
                for (d = 0, e = this.faceVertexUvs.length; e > d; d++)(f = this.faceVertexUvs[d][b]) && f.splice(a, 1);
                g.vertexNormals && 0 < g.vertexNormals.length && (k.vertexNormals = g.vertexNormals, k.vertexNormals.splice(a, 1)), g.vertexColors && 0 < g.vertexColors.length && (k.vertexColors = g.vertexColors, k.vertexColors.splice(a, 1)), this.faces[b] = k
            }
        }
        for (b = j.length - 1; b >= 0; b--)
            for (this.faces.splice(b, 1), d = 0, e = this.faceVertexUvs.length; e > d; d++) this.faceVertexUvs[d].splice(b, 1);
        return i = this.vertices.length - h.length, this.vertices = h, i
    },
    clone: function () {
        for (var a = new THREE.Geometry, b = this.vertices, c = 0, d = b.length; d > c; c++) a.vertices.push(b[c].clone());
        for (b = this.faces, c = 0, d = b.length; d > c; c++) a.faces.push(b[c].clone());
        for (b = this.faceVertexUvs[0], c = 0, d = b.length; d > c; c++) {
            for (var e = b[c], f = [], g = 0, h = e.length; h > g; g++) f.push(new THREE.Vector2(e[g].x, e[g].y));
            a.faceVertexUvs[0].push(f)
        }
        return a
    },
    dispose: function () {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}, THREE.GeometryIdCount = 0, THREE.BufferGeometry = function () {
    this.id = THREE.GeometryIdCount++, this.attributes = {}, this.dynamic = !1, this.offsets = [], this.boundingSphere = this.boundingBox = null, this.hasTangents = !1, this.morphTargets = []
}, THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    applyMatrix: function (a) {
        var b, c;
        this.attributes.position && (b = this.attributes.position.array), this.attributes.normal && (c = this.attributes.normal.array), void 0 !== b && (a.multiplyVector3Array(b), this.verticesNeedUpdate = !0), void 0 !== c && ((new THREE.Matrix3).getNormalMatrix(a).multiplyVector3Array(c), this.normalizeNormals(), this.normalsNeedUpdate = !0)
    },
    computeBoundingBox: function () {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3);
        var a = this.attributes.position.array;
        if (a) {
            var b, c, d, e = this.boundingBox;
            3 <= a.length && (e.min.x = e.max.x = a[0], e.min.y = e.max.y = a[1], e.min.z = e.max.z = a[2]);
            for (var f = 3, g = a.length; g > f; f += 3) b = a[f], c = a[f + 1], d = a[f + 2], b < e.min.x ? e.min.x = b : b > e.max.x && (e.max.x = b), c < e.min.y ? e.min.y = c : c > e.max.y && (e.max.y = c), d < e.min.z ? e.min.z = d : d > e.max.z && (e.max.z = d)
        }(void 0 === a || 0 === a.length) && (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0))
    },
    computeBoundingSphere: function () {
        null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
        var a = this.attributes.position.array;
        if (a) {
            for (var b, c, d, e = 0, f = 0, g = a.length; g > f; f += 3) b = a[f], c = a[f + 1], d = a[f + 2], b = b * b + c * c + d * d, b > e && (e = b);
            this.boundingSphere.radius = Math.sqrt(e)
        }
    },
    computeVertexNormals: function () {
        if (this.attributes.position) {
            var a, b, c, d;
            if (a = this.attributes.position.array.length, void 0 === this.attributes.normal) this.attributes.normal = {
                itemSize: 3,
                array: new Float32Array(a),
                numItems: a
            };
            else
                for (a = 0, b = this.attributes.normal.array.length; b > a; a++) this.attributes.normal.array[a] = 0;
            var e, f, g, h, i, j, k = this.attributes.position.array,
                l = this.attributes.normal.array,
                m = new THREE.Vector3,
                n = new THREE.Vector3,
                o = new THREE.Vector3,
                p = new THREE.Vector3,
                q = new THREE.Vector3;
            if (this.attributes.index) {
                var r = this.attributes.index.array,
                    s = this.offsets;
                for (c = 0, d = s.length; d > c; ++c) {
                    b = s[c].start, e = s[c].count;
                    var t = s[c].index;
                    for (a = b, b += e; b > a; a += 3) e = t + r[a], f = t + r[a + 1], g = t + r[a + 2], h = k[3 * e], i = k[3 * e + 1], j = k[3 * e + 2], m.set(h, i, j), h = k[3 * f], i = k[3 * f + 1], j = k[3 * f + 2], n.set(h, i, j), h = k[3 * g], i = k[3 * g + 1], j = k[3 * g + 2], o.set(h, i, j), p.subVectors(o, n), q.subVectors(m, n), p.cross(q), l[3 * e] += p.x, l[3 * e + 1] += p.y, l[3 * e + 2] += p.z, l[3 * f] += p.x, l[3 * f + 1] += p.y, l[3 * f + 2] += p.z, l[3 * g] += p.x, l[3 * g + 1] += p.y, l[3 * g + 2] += p.z
                }
            } else
                for (a = 0, b = k.length; b > a; a += 9) h = k[a], i = k[a + 1], j = k[a + 2], m.set(h, i, j), h = k[a + 3], i = k[a + 4], j = k[a + 5], n.set(h, i, j), h = k[a + 6], i = k[a + 7], j = k[a + 8], o.set(h, i, j), p.subVectors(o, n), q.subVectors(m, n), p.cross(q), l[a] = p.x, l[a + 1] = p.y, l[a + 2] = p.z, l[a + 3] = p.x, l[a + 4] = p.y, l[a + 5] = p.z, l[a + 6] = p.x, l[a + 7] = p.y, l[a + 8] = p.z;
            this.normalizeNormals(), this.normalsNeedUpdate = !0
        }
    },
    normalizeNormals: function () {
        for (var a, b, c, d = this.attributes.normal.array, e = 0, f = d.length; f > e; e += 3) a = d[e], b = d[e + 1], c = d[e + 2], a = 1 / Math.sqrt(a * a + b * b + c * c), d[e] *= a, d[e + 1] *= a, d[e + 2] *= a
    },
    computeTangents: function () {
        function a(a) {
            N.x = d[3 * a], N.y = d[3 * a + 1], N.z = d[3 * a + 2], O.copy(N), J = i[a], L.copy(J), L.sub(N.multiplyScalar(N.dot(J))).normalize(), M.crossVectors(O, J), K = M.dot(j[a]), I = 0 > K ? -1 : 1, h[4 * a] = L.x, h[4 * a + 1] = L.y, h[4 * a + 2] = L.z, h[4 * a + 3] = I
        }
        if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
        else {
            var b = this.attributes.index.array,
                c = this.attributes.position.array,
                d = this.attributes.normal.array,
                e = this.attributes.uv.array,
                f = c.length / 3;
            if (void 0 === this.attributes.tangent) {
                var g = 4 * f;
                this.attributes.tangent = {
                    itemSize: 4,
                    array: new Float32Array(g),
                    numItems: g
                }
            }
            for (var h = this.attributes.tangent.array, i = [], j = [], g = 0; f > g; g++) i[g] = new THREE.Vector3, j[g] = new THREE.Vector3;
            var k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, f = new THREE.Vector3,
                g = new THREE.Vector3,
                G = this.offsets;
            for (B = 0, C = G.length; C > B; ++B) {
                A = G[B].start, D = G[B].count;
                var H = G[B].index;
                for (z = A, A += D; A > z; z += 3) D = H + b[z], E = H + b[z + 1], F = H + b[z + 2], k = c[3 * D], l = c[3 * D + 1], m = c[3 * D + 2], n = c[3 * E], o = c[3 * E + 1], p = c[3 * E + 2], q = c[3 * F], r = c[3 * F + 1], s = c[3 * F + 2], t = e[2 * D], u = e[2 * D + 1], v = e[2 * E], w = e[2 * E + 1], x = e[2 * F], y = e[2 * F + 1], n -= k, k = q - k, o -= l, l = r - l, p -= m, m = s - m, v -= t, t = x - t, w -= u, u = y - u, y = 1 / (v * u - t * w), f.set((u * n - w * k) * y, (u * o - w * l) * y, (u * p - w * m) * y), g.set((v * k - t * n) * y, (v * l - t * o) * y, (v * m - t * p) * y), i[D].add(f), i[E].add(f), i[F].add(f), j[D].add(g), j[E].add(g), j[F].add(g)
            }
            var I, J, K, L = new THREE.Vector3,
                M = new THREE.Vector3,
                N = new THREE.Vector3,
                O = new THREE.Vector3;
            for (B = 0, C = G.length; C > B; ++B)
                for (A = G[B].start, D = G[B].count, H = G[B].index, z = A, A += D; A > z; z += 3) D = H + b[z], E = H + b[z + 1], F = H + b[z + 2], a(D), a(E), a(F);
            this.tangentsNeedUpdate = this.hasTangents = !0
        }
    },
    dispose: function () {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}, THREE.Camera = function () {
    THREE.Object3D.call(this), this.matrixWorldInverse = new THREE.Matrix4, this.projectionMatrix = new THREE.Matrix4, this.projectionMatrixInverse = new THREE.Matrix4
}, THREE.Camera.prototype = Object.create(THREE.Object3D.prototype), THREE.Camera.prototype.lookAt = function () {
    var a = new THREE.Matrix4;
    return function (b) {
        a.lookAt(this.position, b, this.up), !0 === this.useQuaternion ? this.quaternion.setFromRotationMatrix(a) : this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder)
    }
}(), THREE.OrthographicCamera = function (a, b, c, d, e, f) {
    THREE.Camera.call(this), this.left = a, this.right = b, this.top = c, this.bottom = d, this.near = void 0 !== e ? e : .1, this.far = void 0 !== f ? f : 2e3, this.updateProjectionMatrix()
}, THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype), THREE.OrthographicCamera.prototype.updateProjectionMatrix = function () {
    this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far)
}, THREE.PerspectiveCamera = function (a, b, c, d) {
    THREE.Camera.call(this), this.fov = void 0 !== a ? a : 50, this.aspect = void 0 !== b ? b : 1, this.near = void 0 !== c ? c : .1, this.far = void 0 !== d ? d : 2e3, this.updateProjectionMatrix()
}, THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype), THREE.PerspectiveCamera.prototype.setLens = function (a, b) {
    void 0 === b && (b = 24), this.fov = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a))), this.updateProjectionMatrix()
}, THREE.PerspectiveCamera.prototype.setViewOffset = function (a, b, c, d, e, f) {
    this.fullWidth = a, this.fullHeight = b, this.x = c, this.y = d, this.width = e, this.height = f, this.updateProjectionMatrix()
}, THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function () {
    if (this.fullWidth) {
        var a = this.fullWidth / this.fullHeight,
            b = Math.tan(THREE.Math.degToRad(.5 * this.fov)) * this.near,
            c = -b,
            d = a * c,
            a = Math.abs(a * b - d),
            c = Math.abs(b - c);
        this.projectionMatrix.makeFrustum(d + this.x * a / this.fullWidth, d + (this.x + this.width) * a / this.fullWidth, b - (this.y + this.height) * c / this.fullHeight, b - this.y * c / this.fullHeight, this.near, this.far)
    } else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far)
}, THREE.Light = function (a) {
    THREE.Object3D.call(this), this.color = new THREE.Color(a)
}, THREE.Light.prototype = Object.create(THREE.Object3D.prototype), THREE.Light.prototype.clone = function (a) {
    return void 0 === a && (a = new THREE.Light), THREE.Object3D.prototype.clone.call(this, a), a.color.copy(this.color), a
}, THREE.AmbientLight = function (a) {
    THREE.Light.call(this, a)
}, THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype), THREE.AmbientLight.prototype.clone = function () {
    var a = new THREE.AmbientLight;
    return THREE.Light.prototype.clone.call(this, a), a
}, THREE.AreaLight = function (a, b) {
    THREE.Light.call(this, a), this.normal = new THREE.Vector3(0, -1, 0), this.right = new THREE.Vector3(1, 0, 0), this.intensity = void 0 !== b ? b : 1, this.height = this.width = 1, this.constantAttenuation = 1.5, this.linearAttenuation = .5, this.quadraticAttenuation = .1
}, THREE.AreaLight.prototype = Object.create(THREE.Light.prototype), THREE.DirectionalLight = function (a, b) {
    THREE.Light.call(this, a), this.position.set(0, 1, 0), this.target = new THREE.Object3D, this.intensity = void 0 !== b ? b : 1, this.onlyShadow = this.castShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraLeft = -500, this.shadowCameraTop = this.shadowCameraRight = 500, this.shadowCameraBottom = -500, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapHeight = this.shadowMapWidth = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new THREE.Vector3(0, 0, -1e3), this.shadowCascadeCount = 2, this.shadowCascadeBias = [0, 0, 0], this.shadowCascadeWidth = [512, 512, 512], this.shadowCascadeHeight = [512, 512, 512], this.shadowCascadeNearZ = [-1, .99, .998], this.shadowCascadeFarZ = [.99, .998, 1], this.shadowCascadeArray = [], this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
}, THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype), THREE.DirectionalLight.prototype.clone = function () {
    var a = new THREE.DirectionalLight;
    return THREE.Light.prototype.clone.call(this, a), a.target = this.target.clone(), a.intensity = this.intensity, a.castShadow = this.castShadow, a.onlyShadow = this.onlyShadow, a
}, THREE.HemisphereLight = function (a, b, c) {
    THREE.Light.call(this, a), this.position.set(0, 100, 0), this.groundColor = new THREE.Color(b), this.intensity = void 0 !== c ? c : 1
}, THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype), THREE.HemisphereLight.prototype.clone = function () {
    var a = new THREE.PointLight;
    return THREE.Light.prototype.clone.call(this, a), a.groundColor.copy(this.groundColor), a.intensity = this.intensity, a
}, THREE.PointLight = function (a, b, c) {
    THREE.Light.call(this, a), this.intensity = void 0 !== b ? b : 1, this.distance = void 0 !== c ? c : 0
}, THREE.PointLight.prototype = Object.create(THREE.Light.prototype), THREE.PointLight.prototype.clone = function () {
    var a = new THREE.PointLight;
    return THREE.Light.prototype.clone.call(this, a), a.intensity = this.intensity, a.distance = this.distance, a
}, THREE.SpotLight = function (a, b, c, d, e) {
    THREE.Light.call(this, a), this.position.set(0, 1, 0), this.target = new THREE.Object3D, this.intensity = void 0 !== b ? b : 1, this.distance = void 0 !== c ? c : 0, this.angle = void 0 !== d ? d : Math.PI / 3, this.exponent = void 0 !== e ? e : 10, this.onlyShadow = this.castShadow = !1, this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraFov = 50, this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapHeight = this.shadowMapWidth = 512, this.shadowMatrix = this.shadowCamera = this.shadowMapSize = this.shadowMap = null
}, THREE.SpotLight.prototype = Object.create(THREE.Light.prototype), THREE.SpotLight.prototype.clone = function () {
    var a = new THREE.SpotLight;
    return THREE.Light.prototype.clone.call(this, a), a.target = this.target.clone(), a.intensity = this.intensity, a.distance = this.distance, a.angle = this.angle, a.exponent = this.exponent, a.castShadow = this.castShadow, a.onlyShadow = this.onlyShadow, a
}, THREE.Loader = function (a) {
    this.statusDomElement = (this.showStatus = a) ? THREE.Loader.prototype.addStatusElement() : null, this.onLoadStart = function () {}, this.onLoadProgress = function () {}, this.onLoadComplete = function () {}
}, THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: "anonymous",
    addStatusElement: function () {
        var a = document.createElement("div");
        return a.style.position = "absolute", a.style.right = "0px", a.style.top = "0px", a.style.fontSize = "0.8em", a.style.textAlign = "left", a.style.background = "rgba(0,0,0,0.25)", a.style.color = "#fff", a.style.width = "120px", a.style.padding = "0.5em 0.5em 0.5em 0.5em", a.style.zIndex = 1e3, a.innerHTML = "Loading ...", a
    },
    updateProgress: function (a) {
        var b = "Loaded ",
            b = a.total ? b + ((100 * a.loaded / a.total).toFixed(0) + "%") : b + ((a.loaded / 1e3).toFixed(2) + " KB");
        this.statusDomElement.innerHTML = b
    },
    extractUrlBase: function (a) {
        return a = a.split("/"), a.pop(), (1 > a.length ? "." : a.join("/")) + "/"
    },
    initMaterials: function (a, b) {
        for (var c = [], d = 0; d < a.length; ++d) c[d] = THREE.Loader.prototype.createMaterial(a[d], b);
        return c
    },
    needsTangents: function (a) {
        for (var b = 0, c = a.length; c > b; b++)
            if (a[b] instanceof THREE.ShaderMaterial) return !0;
        return !1
    },
    createMaterial: function (a, b) {
        function c(a) {
            return a = Math.log(a) / Math.LN2, Math.floor(a) == a
        }

        function d(a) {
            return a = Math.log(a) / Math.LN2, Math.pow(2, Math.round(a))
        }

        function e(a, e, f, h, i, j, k) {
            var l = /\.dds$/i.test(f),
                m = b + "/" + f;
            if (l) {
                var n = THREE.ImageUtils.loadCompressedTexture(m);
                a[e] = n
            } else n = document.createElement("canvas"), a[e] = new THREE.Texture(n); if (a[e].sourceFile = f, h && (a[e].repeat.set(h[0], h[1]), 1 !== h[0] && (a[e].wrapS = THREE.RepeatWrapping), 1 !== h[1] && (a[e].wrapT = THREE.RepeatWrapping)), i && a[e].offset.set(i[0], i[1]), j && (f = {
                repeat: THREE.RepeatWrapping,
                mirror: THREE.MirroredRepeatWrapping
            }, void 0 !== f[j[0]] && (a[e].wrapS = f[j[0]]), void 0 !== f[j[1]] && (a[e].wrapT = f[j[1]])), k && (a[e].anisotropy = k), !l) {
                var o = a[e],
                    a = new Image;
                a.onload = function () {
                    if (c(this.width) && c(this.height)) o.image = this;
                    else {
                        var a = d(this.width),
                            b = d(this.height);
                        o.image.width = a, o.image.height = b, o.image.getContext("2d").drawImage(this, 0, 0, a, b)
                    }
                    o.needsUpdate = !0
                }, a.crossOrigin = g.crossOrigin, a.src = m
            }
        }

        function f(a) {
            return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
        }
        var g = this,
            h = "MeshLambertMaterial",
            i = {
                color: 15658734,
                opacity: 1,
                map: null,
                lightMap: null,
                normalMap: null,
                bumpMap: null,
                wireframe: !1
            };
        if (a.shading) {
            var j = a.shading.toLowerCase();
            "phong" === j ? h = "MeshPhongMaterial" : "basic" === j && (h = "MeshBasicMaterial")
        }
        return void 0 !== a.blending && void 0 !== THREE[a.blending] && (i.blending = THREE[a.blending]), (void 0 !== a.transparent || 1 > a.opacity) && (i.transparent = a.transparent), void 0 !== a.depthTest && (i.depthTest = a.depthTest), void 0 !== a.depthWrite && (i.depthWrite = a.depthWrite), void 0 !== a.visible && (i.visible = a.visible), void 0 !== a.flipSided && (i.side = THREE.BackSide), void 0 !== a.doubleSided && (i.side = THREE.DoubleSide), void 0 !== a.wireframe && (i.wireframe = a.wireframe), void 0 !== a.vertexColors && ("face" === a.vertexColors ? i.vertexColors = THREE.FaceColors : a.vertexColors && (i.vertexColors = THREE.VertexColors)), a.colorDiffuse ? i.color = f(a.colorDiffuse) : a.DbgColor && (i.color = a.DbgColor), a.colorSpecular && (i.specular = f(a.colorSpecular)), a.colorAmbient && (i.ambient = f(a.colorAmbient)), a.transparency && (i.opacity = a.transparency), a.specularCoef && (i.shininess = a.specularCoef), a.mapDiffuse && b && e(i, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap, a.mapDiffuseAnisotropy), a.mapLight && b && e(i, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap, a.mapLightAnisotropy), a.mapBump && b && e(i, "bumpMap", a.mapBump, a.mapBumpRepeat, a.mapBumpOffset, a.mapBumpWrap, a.mapBumpAnisotropy), a.mapNormal && b && e(i, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap, a.mapNormalAnisotropy), a.mapSpecular && b && e(i, "specularMap", a.mapSpecular, a.mapSpecularRepeat, a.mapSpecularOffset, a.mapSpecularWrap, a.mapSpecularAnisotropy), a.mapBumpScale && (i.bumpScale = a.mapBumpScale), a.mapNormal ? (h = THREE.ShaderLib.normalmap, j = THREE.UniformsUtils.clone(h.uniforms), j.tNormal.value = i.normalMap, a.mapNormalFactor && j.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor), i.map && (j.tDiffuse.value = i.map, j.enableDiffuse.value = !0), i.specularMap && (j.tSpecular.value = i.specularMap, j.enableSpecular.value = !0), i.lightMap && (j.tAO.value = i.lightMap, j.enableAO.value = !0), j.uDiffuseColor.value.setHex(i.color), j.uSpecularColor.value.setHex(i.specular), j.uAmbientColor.value.setHex(i.ambient), j.uShininess.value = i.shininess, void 0 !== i.opacity && (j.uOpacity.value = i.opacity), h = new THREE.ShaderMaterial({
            fragmentShader: h.fragmentShader,
            vertexShader: h.vertexShader,
            uniforms: j,
            lights: !0,
            fog: !0
        }), i.transparent && (h.transparent = !0)) : h = new THREE[h](i), void 0 !== a.DbgName && (h.name = a.DbgName), h
    }
}, THREE.ImageLoader = function () {
    this.crossOrigin = null
}, THREE.ImageLoader.prototype = {
    constructor: THREE.ImageLoader,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    load: function (a, b) {
        var c = this;
        void 0 === b && (b = new Image), b.addEventListener("load", function () {
            c.dispatchEvent({
                type: "load",
                content: b
            })
        }, !1), b.addEventListener("error", function () {
            c.dispatchEvent({
                type: "error",
                message: "Couldn't load URL [" + a + "]"
            })
        }, !1), c.crossOrigin && (b.crossOrigin = c.crossOrigin), b.src = a
    }
}, THREE.JSONLoader = function (a) {
    THREE.Loader.call(this, a), this.withCredentials = !1
}, THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype), THREE.JSONLoader.prototype.load = function (a, b, c) {
    c = c && "string" == typeof c ? c : this.extractUrlBase(a), this.onLoadStart(), this.loadAjaxJSON(this, a, b, c)
}, THREE.JSONLoader.prototype.loadAjaxJSON = function (a, b, c, d, e) {
    var f = new XMLHttpRequest,
        g = 0;
    f.onreadystatechange = function () {
        if (f.readyState === f.DONE)
            if (200 === f.status || 0 === f.status) {
                if (f.responseText) {
                    var h = JSON.parse(f.responseText),
                        h = a.parse(h, d);
                    c(h.geometry, h.materials)
                } else console.warn("THREE.JSONLoader: [" + b + "] seems to be unreachable or file there is empty");
                a.onLoadComplete()
            } else console.error("THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]");
        else f.readyState === f.LOADING ? e && (0 === g && (g = f.getResponseHeader("Content-Length")), e({
            total: g,
            loaded: f.responseText.length
        })) : f.readyState === f.HEADERS_RECEIVED && void 0 !== e && (g = f.getResponseHeader("Content-Length"))
    }, f.open("GET", b, !0), f.withCredentials = this.withCredentials, f.send(null)
}, THREE.JSONLoader.prototype.parse = function (a, b) {
    var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r = new THREE.Geometry,
        s = void 0 !== a.scale ? 1 / a.scale : 1,
        t = a.faces;
    l = a.vertices;
    var u = a.normals,
        v = a.colors,
        w = 0;
    for (c = 0; c < a.uvs.length; c++) a.uvs[c].length && w++;
    for (c = 0; w > c; c++) r.faceUvs[c] = [], r.faceVertexUvs[c] = [];
    for (f = 0, g = l.length; g > f;) h = new THREE.Vector3, h.x = l[f++] * s, h.y = l[f++] * s, h.z = l[f++] * s, r.vertices.push(h);
    for (f = 0, g = t.length; g > f;) {
        if (l = t[f++], h = 1 & l, e = 2 & l, c = 4 & l, d = 8 & l, j = 16 & l, i = 32 & l, m = 64 & l, l &= 128, h ? (n = new THREE.Face4, n.a = t[f++], n.b = t[f++], n.c = t[f++], n.d = t[f++], h = 4) : (n = new THREE.Face3, n.a = t[f++], n.b = t[f++], n.c = t[f++], h = 3), e && (e = t[f++], n.materialIndex = e), e = r.faces.length, c)
            for (c = 0; w > c; c++) o = a.uvs[c], k = t[f++], q = o[2 * k], k = o[2 * k + 1], r.faceUvs[c][e] = new THREE.Vector2(q, k);
        if (d)
            for (c = 0; w > c; c++) {
                for (o = a.uvs[c], p = [], d = 0; h > d; d++) k = t[f++], q = o[2 * k], k = o[2 * k + 1], p[d] = new THREE.Vector2(q, k);
                r.faceVertexUvs[c][e] = p
            }
        if (j && (j = 3 * t[f++], d = new THREE.Vector3, d.x = u[j++], d.y = u[j++], d.z = u[j], n.normal = d), i)
            for (c = 0; h > c; c++) j = 3 * t[f++], d = new THREE.Vector3, d.x = u[j++], d.y = u[j++], d.z = u[j], n.vertexNormals.push(d);
        if (m && (i = t[f++], i = new THREE.Color(v[i]), n.color = i), l)
            for (c = 0; h > c; c++) i = t[f++], i = new THREE.Color(v[i]), n.vertexColors.push(i);
        r.faces.push(n)
    }
    if (a.skinWeights)
        for (f = 0, g = a.skinWeights.length; g > f; f += 2) t = a.skinWeights[f], u = a.skinWeights[f + 1], r.skinWeights.push(new THREE.Vector4(t, u, 0, 0));
    if (a.skinIndices)
        for (f = 0, g = a.skinIndices.length; g > f; f += 2) t = a.skinIndices[f], u = a.skinIndices[f + 1], r.skinIndices.push(new THREE.Vector4(t, u, 0, 0));
    if (r.bones = a.bones, r.animation = a.animation, void 0 !== a.morphTargets)
        for (f = 0, g = a.morphTargets.length; g > f; f++)
            for (r.morphTargets[f] = {}, r.morphTargets[f].name = a.morphTargets[f].name, r.morphTargets[f].vertices = [], v = r.morphTargets[f].vertices, w = a.morphTargets[f].vertices, t = 0, u = w.length; u > t; t += 3) l = new THREE.Vector3, l.x = w[t] * s, l.y = w[t + 1] * s, l.z = w[t + 2] * s, v.push(l);
    if (void 0 !== a.morphColors)
        for (f = 0, g = a.morphColors.length; g > f; f++)
            for (r.morphColors[f] = {}, r.morphColors[f].name = a.morphColors[f].name, r.morphColors[f].colors = [], u = r.morphColors[f].colors, v = a.morphColors[f].colors, s = 0, t = v.length; t > s; s += 3) w = new THREE.Color(16755200), w.setRGB(v[s], v[s + 1], v[s + 2]), u.push(w);
    return r.computeCentroids(), r.computeFaceNormals(), void 0 === a.materials ? {
        geometry: r
    } : (s = this.initMaterials(a.materials, b), this.needsTangents(s) && r.computeTangents(), {
        geometry: r,
        materials: s
    })
}, THREE.LoadingMonitor = function () {
    var a = this,
        b = 0,
        c = 0,
        d = function () {
            b++, a.dispatchEvent({
                type: "progress",
                loaded: b,
                total: c
            }), b === c && a.dispatchEvent({
                type: "load"
            })
        };
    this.add = function (a) {
        c++, a.addEventListener("load", d, !1)
    }
}, THREE.LoadingMonitor.prototype = {
    constructor: THREE.LoadingMonitor,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent
}, THREE.GeometryLoader = function () {}, THREE.GeometryLoader.prototype = {
    constructor: THREE.GeometryLoader,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    load: function (a) {
        var b = this,
            c = new XMLHttpRequest;
        c.addEventListener("load", function (a) {
            a = b.parse(JSON.parse(a.target.responseText)), b.dispatchEvent({
                type: "load",
                content: a
            })
        }, !1), c.addEventListener("progress", function (a) {
            b.dispatchEvent({
                type: "progress",
                loaded: a.loaded,
                total: a.total
            })
        }, !1), c.addEventListener("error", function () {
            b.dispatchEvent({
                type: "error",
                message: "Couldn't load URL [" + a + "]"
            })
        }, !1), c.open("GET", a, !0), c.send(null)
    },
    parse: function () {}
}, THREE.MaterialLoader = function () {}, THREE.MaterialLoader.prototype = {
    constructor: THREE.MaterialLoader,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    load: function (a) {
        var b = this,
            c = new XMLHttpRequest;
        c.addEventListener("load", function (a) {
            a = b.parse(JSON.parse(a.target.responseText)), b.dispatchEvent({
                type: "load",
                content: a
            })
        }, !1), c.addEventListener("progress", function (a) {
            b.dispatchEvent({
                type: "progress",
                loaded: a.loaded,
                total: a.total
            })
        }, !1), c.addEventListener("error", function () {
            b.dispatchEvent({
                type: "error",
                message: "Couldn't load URL [" + a + "]"
            })
        }, !1), c.open("GET", a, !0), c.send(null)
    },
    parse: function (a) {
        var b;
        switch (a.type) {
        case "MeshBasicMaterial":
            b = new THREE.MeshBasicMaterial({
                color: a.color,
                opacity: a.opacity,
                transparent: a.transparent,
                wireframe: a.wireframe
            });
            break;
        case "MeshLambertMaterial":
            b = new THREE.MeshLambertMaterial({
                color: a.color,
                ambient: a.ambient,
                emissive: a.emissive,
                opacity: a.opacity,
                transparent: a.transparent,
                wireframe: a.wireframe
            });
            break;
        case "MeshPhongMaterial":
            b = new THREE.MeshPhongMaterial({
                color: a.color,
                ambient: a.ambient,
                emissive: a.emissive,
                specular: a.specular,
                shininess: a.shininess,
                opacity: a.opacity,
                transparent: a.transparent,
                wireframe: a.wireframe
            });
            break;
        case "MeshNormalMaterial":
            b = new THREE.MeshNormalMaterial({
                opacity: a.opacity,
                transparent: a.transparent,
                wireframe: a.wireframe
            });
            break;
        case "MeshDepthMaterial":
            b = new THREE.MeshDepthMaterial({
                opacity: a.opacity,
                transparent: a.transparent,
                wireframe: a.wireframe
            })
        }
        return b
    }
}, THREE.SceneLoader = function () {
    this.onLoadStart = function () {}, this.onLoadProgress = function () {}, this.onLoadComplete = function () {}, this.callbackSync = function () {}, this.callbackProgress = function () {}, this.geometryHandlerMap = {}, this.hierarchyHandlerMap = {}, this.addGeometryHandler("ascii", THREE.JSONLoader)
}, THREE.SceneLoader.prototype.constructor = THREE.SceneLoader, THREE.SceneLoader.prototype.load = function (a, b) {
    var c = this,
        d = new XMLHttpRequest;
    d.onreadystatechange = function () {
        if (4 === d.readyState)
            if (200 === d.status || 0 === d.status) {
                var e = JSON.parse(d.responseText);
                c.parse(e, b, a)
            } else console.error("THREE.SceneLoader: Couldn't load [" + a + "] [" + d.status + "]")
    }, d.open("GET", a, !0), d.send(null)
}, THREE.SceneLoader.prototype.addGeometryHandler = function (a, b) {
    this.geometryHandlerMap[a] = {
        loaderClass: b
    }
}, THREE.SceneLoader.prototype.addHierarchyHandler = function (a, b) {
    this.hierarchyHandlerMap[a] = {
        loaderClass: b
    }
}, THREE.SceneLoader.prototype.parse = function (a, b, c) {
    function d(a, b) {
        return "relativeToHTML" == b ? a : z + "/" + a
    }

    function e() {
        f(w.scene, B.objects)
    }

    function f(a, b) {
        var c, e, g, i, j, n, o;
        for (o in b)
            if (void 0 === w.objects[o]) {
                var s = b[o],
                    t = null;
                if (s.type && s.type in y.hierarchyHandlerMap) {
                    if (void 0 === s.loading) {
                        e = {
                            type: 1,
                            url: 1,
                            material: 1,
                            position: 1,
                            rotation: 1,
                            scale: 1,
                            visible: 1,
                            children: 1,
                            userData: 1,
                            skin: 1,
                            morph: 1,
                            mirroredLoop: 1,
                            duration: 1
                        }, g = {};
                        for (var u in s) u in e || (g[u] = s[u]);
                        l = w.materials[s.material], s.loading = !0, e = y.hierarchyHandlerMap[s.type].loaderObject, e.options ? e.load(d(s.url, B.urlBaseType), h(o, a, l, s)) : e.load(d(s.url, B.urlBaseType), h(o, a, l, s), g)
                    }
                } else if (void 0 !== s.geometry) {
                    if (k = w.geometries[s.geometry]) {
                        if (t = !1, l = w.materials[s.material], t = l instanceof THREE.ShaderMaterial, g = s.position, i = s.rotation, j = s.scale, c = s.matrix, n = s.quaternion, s.material || (l = new THREE.MeshFaceMaterial(w.face_materials[s.geometry])), l instanceof THREE.MeshFaceMaterial && 0 === l.materials.length && (l = new THREE.MeshFaceMaterial(w.face_materials[s.geometry])), l instanceof THREE.MeshFaceMaterial)
                            for (e = 0; e < l.materials.length; e++) t = t || l.materials[e] instanceof THREE.ShaderMaterial;
                        t && k.computeTangents(), s.skin ? t = new THREE.SkinnedMesh(k, l) : s.morph ? (t = new THREE.MorphAnimMesh(k, l), void 0 !== s.duration && (t.duration = s.duration), void 0 !== s.time && (t.time = s.time), void 0 !== s.mirroredLoop && (t.mirroredLoop = s.mirroredLoop), l.morphNormals && k.computeMorphNormals()) : t = new THREE.Mesh(k, l), t.name = o, c ? (t.matrixAutoUpdate = !1, t.matrix.set(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15])) : (t.position.set(g[0], g[1], g[2]), n ? (t.quaternion.set(n[0], n[1], n[2], n[3]), t.useQuaternion = !0) : t.rotation.set(i[0], i[1], i[2]), t.scale.set(j[0], j[1], j[2])), t.visible = s.visible, t.castShadow = s.castShadow, t.receiveShadow = s.receiveShadow, a.add(t), w.objects[o] = t
                    }
                } else "DirectionalLight" === s.type || "PointLight" === s.type || "AmbientLight" === s.type ? (q = void 0 !== s.color ? s.color : 16777215, r = void 0 !== s.intensity ? s.intensity : 1, "DirectionalLight" === s.type ? (g = s.direction, p = new THREE.DirectionalLight(q, r), p.position.set(g[0], g[1], g[2]), s.target && (A.push({
                    object: p,
                    targetName: s.target
                }), p.target = null)) : "PointLight" === s.type ? (g = s.position, e = s.distance, p = new THREE.PointLight(q, r, e), p.position.set(g[0], g[1], g[2])) : "AmbientLight" === s.type && (p = new THREE.AmbientLight(q)), a.add(p), p.name = o, w.lights[o] = p, w.objects[o] = p) : "PerspectiveCamera" === s.type || "OrthographicCamera" === s.type ? (g = s.position, i = s.rotation, n = s.quaternion, "PerspectiveCamera" === s.type ? m = new THREE.PerspectiveCamera(s.fov, s.aspect, s.near, s.far) : "OrthographicCamera" === s.type && (m = new THREE.OrthographicCamera(s.left, s.right, s.top, s.bottom, s.near, s.far)), m.name = o, m.position.set(g[0], g[1], g[2]), void 0 !== n ? (m.quaternion.set(n[0], n[1], n[2], n[3]), m.useQuaternion = !0) : void 0 !== i && m.rotation.set(i[0], i[1], i[2]), a.add(m), w.cameras[o] = m, w.objects[o] = m) : (g = s.position, i = s.rotation, j = s.scale, n = s.quaternion, t = new THREE.Object3D, t.name = o, t.position.set(g[0], g[1], g[2]), n ? (t.quaternion.set(n[0], n[1], n[2], n[3]), t.useQuaternion = !0) : t.rotation.set(i[0], i[1], i[2]), t.scale.set(j[0], j[1], j[2]), t.visible = void 0 !== s.visible ? s.visible : !1, a.add(t), w.objects[o] = t, w.empties[o] = t); if (t) {
                    if (void 0 !== s.userData)
                        for (var v in s.userData) t.userData[v] = s.userData[v];
                    if (void 0 !== s.groups)
                        for (e = 0; e < s.groups.length; e++) g = s.groups[e], void 0 === w.groups[g] && (w.groups[g] = []), w.groups[g].push(o);
                    void 0 !== s.children && f(t, s.children)
                }
            }
    }

    function g(a) {
        return function (b, c) {
            b.name = a, w.geometries[a] = b, w.face_materials[a] = c, e(), s -= 1, y.onLoadComplete(), j()
        }
    }

    function h(a, b, c, d) {
        return function (f) {
            var f = f.content ? f.content : f.dae ? f.scene : f,
                g = d.position,
                h = d.rotation,
                i = d.quaternion,
                k = d.scale;
            f.position.set(g[0], g[1], g[2]), i ? (f.quaternion.set(i[0], i[1], i[2], i[3]), f.useQuaternion = !0) : f.rotation.set(h[0], h[1], h[2]), f.scale.set(k[0], k[1], k[2]), c && f.traverse(function (a) {
                a.material = c
            });
            var l = void 0 !== d.visible ? d.visible : !0;
            f.traverse(function (a) {
                a.visible = l
            }), b.add(f), f.name = a, w.objects[a] = f, e(), s -= 1, y.onLoadComplete(), j()
        }
    }

    function i(a) {
        return function (b, c) {
            b.name = a, w.geometries[a] = b, w.face_materials[a] = c
        }
    }

    function j() {
        if (y.callbackProgress({
            totalModels: u,
            totalTextures: v,
            loadedModels: u - s,
            loadedTextures: v - t
        }, w), y.onLoadProgress(), 0 === s && 0 === t) {
            for (var a = 0; a < A.length; a++) {
                var c = A[a],
                    d = w.objects[c.targetName];
                d ? c.object.target = d : (c.object.target = new THREE.Object3D, w.scene.add(c.object.target)), c.object.target.userData.targetInverse = c.object
            }
            b(w)
        }
    }
    var k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = this,
        z = THREE.Loader.prototype.extractUrlBase(c),
        A = [],
        B = a;
    for (x in this.geometryHandlerMap) a = this.geometryHandlerMap[x].loaderClass, this.geometryHandlerMap[x].loaderObject = new a;
    for (x in this.hierarchyHandlerMap) a = this.hierarchyHandlerMap[x].loaderClass, this.hierarchyHandlerMap[x].loaderObject = new a;
    t = s = 0, w = {
        scene: new THREE.Scene,
        geometries: {},
        face_materials: {},
        materials: {},
        textures: {},
        objects: {},
        cameras: {},
        lights: {},
        fogs: {},
        empties: {},
        groups: {}
    }, B.transform && (x = B.transform.position, a = B.transform.rotation, c = B.transform.scale, x && w.scene.position.set(x[0], x[1], x[2]), a && w.scene.rotation.set(a[0], a[1], a[2]), c && w.scene.scale.set(c[0], c[1], c[2]), x || a || c) && (w.scene.updateMatrix(), w.scene.updateMatrixWorld()), x = function (a) {
        return function () {
            t -= a, j(), y.onLoadComplete()
        }
    };
    for (var C in B.fogs) a = B.fogs[C], "linear" === a.type ? n = new THREE.Fog(0, a.near, a.far) : "exp2" === a.type && (n = new THREE.FogExp2(0, a.density)), a = a.color, n.color.setRGB(a[0], a[1], a[2]), w.fogs[C] = n;
    for (var D in B.geometries) n = B.geometries[D], n.type in this.geometryHandlerMap && (s += 1, y.onLoadStart());
    for (var E in B.objects) n = B.objects[E], n.type && n.type in this.hierarchyHandlerMap && (s += 1, y.onLoadStart());
    u = s;
    for (D in B.geometries)
        if (n = B.geometries[D], "cube" === n.type) k = new THREE.CubeGeometry(n.width, n.height, n.depth, n.widthSegments, n.heightSegments, n.depthSegments), k.name = D, w.geometries[D] = k;
        else if ("plane" === n.type) k = new THREE.PlaneGeometry(n.width, n.height, n.widthSegments, n.heightSegments), k.name = D, w.geometries[D] = k;
    else if ("sphere" === n.type) k = new THREE.SphereGeometry(n.radius, n.widthSegments, n.heightSegments), k.name = D, w.geometries[D] = k;
    else if ("cylinder" === n.type) k = new THREE.CylinderGeometry(n.topRad, n.botRad, n.height, n.radSegs, n.heightSegs), k.name = D, w.geometries[D] = k;
    else if ("torus" === n.type) k = new THREE.TorusGeometry(n.radius, n.tube, n.segmentsR, n.segmentsT), k.name = D, w.geometries[D] = k;
    else if ("icosahedron" === n.type) k = new THREE.IcosahedronGeometry(n.radius, n.subdivisions), k.name = D, w.geometries[D] = k;
    else if (n.type in this.geometryHandlerMap) {
        E = {};
        for (o in n) "type" !== o && "url" !== o && (E[o] = n[o]);
        this.geometryHandlerMap[n.type].loaderObject.load(d(n.url, B.urlBaseType), g(D), E)
    } else "embedded" === n.type && (E = B.embeds[n.id], E.metadata = B.metadata, E && (E = this.geometryHandlerMap.ascii.loaderObject.parse(E, ""), i(D)(E.geometry, E.materials)));
    for (var F in B.textures)
        if (D = B.textures[F], D.url instanceof Array)
            for (t += D.url.length, o = 0; o < D.url.length; o++) y.onLoadStart();
        else t += 1, y.onLoadStart();
    v = t;
    for (F in B.textures) {
        if (D = B.textures[F], void 0 !== D.mapping && void 0 !== THREE[D.mapping] && (D.mapping = new THREE[D.mapping]), D.url instanceof Array) {
            for (E = D.url.length, n = [], o = 0; E > o; o++) n[o] = d(D.url[o], B.urlBaseType);
            o = (o = /\.dds$/i.test(n[0])) ? THREE.ImageUtils.loadCompressedTextureCube(n, D.mapping, x(E)) : THREE.ImageUtils.loadTextureCube(n, D.mapping, x(E))
        } else o = /\.dds$/i.test(D.url), E = d(D.url, B.urlBaseType), n = x(1), o = o ? THREE.ImageUtils.loadCompressedTexture(E, D.mapping, n) : THREE.ImageUtils.loadTexture(E, D.mapping, n), void 0 !== THREE[D.minFilter] && (o.minFilter = THREE[D.minFilter]), void 0 !== THREE[D.magFilter] && (o.magFilter = THREE[D.magFilter]), D.anisotropy && (o.anisotropy = D.anisotropy), D.repeat && (o.repeat.set(D.repeat[0], D.repeat[1]), 1 !== D.repeat[0] && (o.wrapS = THREE.RepeatWrapping), 1 !== D.repeat[1] && (o.wrapT = THREE.RepeatWrapping)), D.offset && o.offset.set(D.offset[0], D.offset[1]), D.wrap && (E = {
            repeat: THREE.RepeatWrapping,
            mirror: THREE.MirroredRepeatWrapping
        }, void 0 !== E[D.wrap[0]] && (o.wrapS = E[D.wrap[0]]), void 0 !== E[D.wrap[1]] && (o.wrapT = E[D.wrap[1]]));
        w.textures[F] = o
    }
    var G, H;
    for (G in B.materials) {
        F = B.materials[G];
        for (H in F.parameters) "envMap" === H || "map" === H || "lightMap" === H || "bumpMap" === H ? F.parameters[H] = w.textures[F.parameters[H]] : "shading" === H ? F.parameters[H] = "flat" === F.parameters[H] ? THREE.FlatShading : THREE.SmoothShading : "side" === H ? F.parameters[H] = "double" == F.parameters[H] ? THREE.DoubleSide : "back" == F.parameters[H] ? THREE.BackSide : THREE.FrontSide : "blending" === H ? F.parameters[H] = F.parameters[H] in THREE ? THREE[F.parameters[H]] : THREE.NormalBlending : "combine" === H ? F.parameters[H] = F.parameters[H] in THREE ? THREE[F.parameters[H]] : THREE.MultiplyOperation : "vertexColors" === H ? "face" == F.parameters[H] ? F.parameters[H] = THREE.FaceColors : F.parameters[H] && (F.parameters[H] = THREE.VertexColors) : "wrapRGB" === H && (x = F.parameters[H], F.parameters[H] = new THREE.Vector3(x[0], x[1], x[2]));
        void 0 !== F.parameters.opacity && 1 > F.parameters.opacity && (F.parameters.transparent = !0), F.parameters.normalMap ? (x = THREE.ShaderLib.normalmap, D = THREE.UniformsUtils.clone(x.uniforms), o = F.parameters.color, E = F.parameters.specular, n = F.parameters.ambient, C = F.parameters.shininess, D.tNormal.value = w.textures[F.parameters.normalMap], F.parameters.normalScale && D.uNormalScale.value.set(F.parameters.normalScale[0], F.parameters.normalScale[1]), F.parameters.map && (D.tDiffuse.value = F.parameters.map, D.enableDiffuse.value = !0), F.parameters.envMap && (D.tCube.value = F.parameters.envMap, D.enableReflection.value = !0, D.uReflectivity.value = F.parameters.reflectivity), F.parameters.lightMap && (D.tAO.value = F.parameters.lightMap, D.enableAO.value = !0), F.parameters.specularMap && (D.tSpecular.value = w.textures[F.parameters.specularMap], D.enableSpecular.value = !0), F.parameters.displacementMap && (D.tDisplacement.value = w.textures[F.parameters.displacementMap], D.enableDisplacement.value = !0, D.uDisplacementBias.value = F.parameters.displacementBias, D.uDisplacementScale.value = F.parameters.displacementScale), D.uDiffuseColor.value.setHex(o), D.uSpecularColor.value.setHex(E), D.uAmbientColor.value.setHex(n), D.uShininess.value = C, F.parameters.opacity && (D.uOpacity.value = F.parameters.opacity), l = new THREE.ShaderMaterial({
            fragmentShader: x.fragmentShader,
            vertexShader: x.vertexShader,
            uniforms: D,
            lights: !0,
            fog: !0
        })) : l = new THREE[F.type](F.parameters), l.name = G, w.materials[G] = l
    }
    for (G in B.materials)
        if (F = B.materials[G], F.parameters.materials) {
            for (H = [], o = 0; o < F.parameters.materials.length; o++) H.push(w.materials[F.parameters.materials[o]]);
            w.materials[G].materials = H
        }
    e(), w.cameras && B.defaults.camera && (w.currentCamera = w.cameras[B.defaults.camera]), w.fogs && B.defaults.fog && (w.scene.fog = w.fogs[B.defaults.fog]), y.callbackSync(w), j()
}, THREE.TextureLoader = function () {
    this.crossOrigin = null
}, THREE.TextureLoader.prototype = {
    constructor: THREE.TextureLoader,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    load: function (a) {
        var b = this,
            c = new Image;
        c.addEventListener("load", function () {
            var a = new THREE.Texture(c);
            a.needsUpdate = !0, b.dispatchEvent({
                type: "load",
                content: a
            })
        }, !1), c.addEventListener("error", function () {
            b.dispatchEvent({
                type: "error",
                message: "Couldn't load URL [" + a + "]"
            })
        }, !1), b.crossOrigin && (c.crossOrigin = b.crossOrigin), c.src = a
    }
}, THREE.Material = function () {
    this.id = THREE.MaterialIdCount++, this.name = "", this.side = THREE.FrontSide, this.opacity = 1, this.transparent = !1, this.blending = THREE.NormalBlending, this.blendSrc = THREE.SrcAlphaFactor, this.blendDst = THREE.OneMinusSrcAlphaFactor, this.blendEquation = THREE.AddEquation, this.depthWrite = this.depthTest = !0, this.polygonOffset = !1, this.alphaTest = this.polygonOffsetUnits = this.polygonOffsetFactor = 0, this.overdraw = !1, this.needsUpdate = this.visible = !0
}, THREE.Material.prototype = {
    constructor: THREE.Material,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    setValues: function (a) {
        if (void 0 !== a)
            for (var b in a) {
                var c = a[b];
                if (void 0 === c) console.warn("THREE.Material: '" + b + "' parameter is undefined.");
                else if (b in this) {
                    var d = this[b];
                    d instanceof THREE.Color ? d.set(c) : d instanceof THREE.Vector3 && c instanceof THREE.Vector3 ? d.copy(c) : this[b] = c
                }
            }
    },
    clone: function (a) {
        return void 0 === a && (a = new THREE.Material), a.name = this.name, a.side = this.side, a.opacity = this.opacity, a.transparent = this.transparent, a.blending = this.blending, a.blendSrc = this.blendSrc, a.blendDst = this.blendDst, a.blendEquation = this.blendEquation, a.depthTest = this.depthTest, a.depthWrite = this.depthWrite, a.polygonOffset = this.polygonOffset, a.polygonOffsetFactor = this.polygonOffsetFactor, a.polygonOffsetUnits = this.polygonOffsetUnits, a.alphaTest = this.alphaTest, a.overdraw = this.overdraw, a.visible = this.visible, a
    },
    dispose: function () {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}, THREE.MaterialIdCount = 0, THREE.LineBasicMaterial = function (a) {
    THREE.Material.call(this), this.color = new THREE.Color(16777215), this.linewidth = 1, this.linejoin = this.linecap = "round", this.vertexColors = !1, this.fog = !0, this.setValues(a)
}, THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype), THREE.LineBasicMaterial.prototype.clone = function () {
    var a = new THREE.LineBasicMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.linewidth = this.linewidth, a.linecap = this.linecap, a.linejoin = this.linejoin, a.vertexColors = this.vertexColors, a.fog = this.fog, a
}, THREE.LineDashedMaterial = function (a) {
    THREE.Material.call(this), this.color = new THREE.Color(16777215), this.scale = this.linewidth = 1, this.dashSize = 3, this.gapSize = 1, this.vertexColors = !1, this.fog = !0, this.setValues(a)
}, THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype), THREE.LineDashedMaterial.prototype.clone = function () {
    var a = new THREE.LineDashedMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.linewidth = this.linewidth, a.scale = this.scale, a.dashSize = this.dashSize, a.gapSize = this.gapSize, a.vertexColors = this.vertexColors, a.fog = this.fog, a
}, THREE.MeshBasicMaterial = function (a) {
    THREE.Material.call(this), this.color = new THREE.Color(16777215), this.envMap = this.specularMap = this.lightMap = this.map = null, this.combine = THREE.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = THREE.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinejoin = this.wireframeLinecap = "round", this.vertexColors = THREE.NoColors, this.morphTargets = this.skinning = !1, this.setValues(a)
}, THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshBasicMaterial.prototype.clone = function () {
    var a = new THREE.MeshBasicMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.map = this.map, a.lightMap = this.lightMap, a.specularMap = this.specularMap, a.envMap = this.envMap, a.combine = this.combine, a.reflectivity = this.reflectivity, a.refractionRatio = this.refractionRatio, a.fog = this.fog, a.shading = this.shading, a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, a.wireframeLinecap = this.wireframeLinecap, a.wireframeLinejoin = this.wireframeLinejoin, a.vertexColors = this.vertexColors, a.skinning = this.skinning, a.morphTargets = this.morphTargets, a
}, THREE.MeshLambertMaterial = function (a) {
    THREE.Material.call(this), this.color = new THREE.Color(16777215), this.ambient = new THREE.Color(16777215), this.emissive = new THREE.Color(0), this.wrapAround = !1, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.envMap = this.specularMap = this.lightMap = this.map = null, this.combine = THREE.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = THREE.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinejoin = this.wireframeLinecap = "round", this.vertexColors = THREE.NoColors, this.morphNormals = this.morphTargets = this.skinning = !1, this.setValues(a)
}, THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshLambertMaterial.prototype.clone = function () {
    var a = new THREE.MeshLambertMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.ambient.copy(this.ambient), a.emissive.copy(this.emissive), a.wrapAround = this.wrapAround, a.wrapRGB.copy(this.wrapRGB), a.map = this.map, a.lightMap = this.lightMap, a.specularMap = this.specularMap, a.envMap = this.envMap, a.combine = this.combine, a.reflectivity = this.reflectivity, a.refractionRatio = this.refractionRatio, a.fog = this.fog, a.shading = this.shading, a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, a.wireframeLinecap = this.wireframeLinecap, a.wireframeLinejoin = this.wireframeLinejoin, a.vertexColors = this.vertexColors, a.skinning = this.skinning, a.morphTargets = this.morphTargets, a.morphNormals = this.morphNormals, a
}, THREE.MeshPhongMaterial = function (a) {
    THREE.Material.call(this), this.color = new THREE.Color(16777215), this.ambient = new THREE.Color(16777215), this.emissive = new THREE.Color(0), this.specular = new THREE.Color(1118481), this.shininess = 30, this.metal = !1, this.perPixel = !0, this.wrapAround = !1, this.wrapRGB = new THREE.Vector3(1, 1, 1), this.bumpMap = this.lightMap = this.map = null, this.bumpScale = 1, this.normalMap = null, this.normalScale = new THREE.Vector2(1, 1), this.envMap = this.specularMap = null, this.combine = THREE.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = THREE.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinejoin = this.wireframeLinecap = "round", this.vertexColors = THREE.NoColors, this.morphNormals = this.morphTargets = this.skinning = !1, this.setValues(a)
}, THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshPhongMaterial.prototype.clone = function () {
    var a = new THREE.MeshPhongMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.ambient.copy(this.ambient), a.emissive.copy(this.emissive), a.specular.copy(this.specular), a.shininess = this.shininess, a.metal = this.metal, a.perPixel = this.perPixel, a.wrapAround = this.wrapAround, a.wrapRGB.copy(this.wrapRGB), a.map = this.map, a.lightMap = this.lightMap, a.bumpMap = this.bumpMap, a.bumpScale = this.bumpScale, a.normalMap = this.normalMap, a.normalScale.copy(this.normalScale), a.specularMap = this.specularMap, a.envMap = this.envMap, a.combine = this.combine, a.reflectivity = this.reflectivity, a.refractionRatio = this.refractionRatio, a.fog = this.fog, a.shading = this.shading, a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, a.wireframeLinecap = this.wireframeLinecap, a.wireframeLinejoin = this.wireframeLinejoin, a.vertexColors = this.vertexColors, a.skinning = this.skinning, a.morphTargets = this.morphTargets, a.morphNormals = this.morphNormals, a
}, THREE.MeshDepthMaterial = function (a) {
    THREE.Material.call(this), this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(a)
}, THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshDepthMaterial.prototype.clone = function () {
    var a = new THREE.MeshDepthMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, a
}, THREE.MeshNormalMaterial = function (a) {
    THREE.Material.call(this, a), this.shading = THREE.FlatShading, this.wireframe = !1, this.wireframeLinewidth = 1, this.morphTargets = !1, this.setValues(a)
}, THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype), THREE.MeshNormalMaterial.prototype.clone = function () {
    var a = new THREE.MeshNormalMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.shading = this.shading, a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, a
}, THREE.MeshFaceMaterial = function (a) {
    this.materials = a instanceof Array ? a : []
}, THREE.MeshFaceMaterial.prototype.clone = function () {
    return new THREE.MeshFaceMaterial(this.materials.slice(0))
}, THREE.ParticleBasicMaterial = function (a) {
    THREE.Material.call(this), this.color = new THREE.Color(16777215), this.map = null, this.size = 1, this.sizeAttenuation = !0, this.vertexColors = !1, this.fog = !0, this.setValues(a)
}, THREE.ParticleBasicMaterial.prototype = Object.create(THREE.Material.prototype), THREE.ParticleBasicMaterial.prototype.clone = function () {
    var a = new THREE.ParticleBasicMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.map = this.map, a.size = this.size, a.sizeAttenuation = this.sizeAttenuation, a.vertexColors = this.vertexColors, a.fog = this.fog, a
}, THREE.ParticleCanvasMaterial = function (a) {
    THREE.Material.call(this), this.color = new THREE.Color(16777215), this.program = function () {}, this.setValues(a)
}, THREE.ParticleCanvasMaterial.prototype = Object.create(THREE.Material.prototype), THREE.ParticleCanvasMaterial.prototype.clone = function () {
    var a = new THREE.ParticleCanvasMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.program = this.program, a
}, THREE.ShaderMaterial = function (a) {
    THREE.Material.call(this), this.vertexShader = this.fragmentShader = "void main() {}", this.uniforms = {}, this.defines = {}, this.attributes = null, this.shading = THREE.SmoothShading, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.lights = this.fog = !1, this.vertexColors = THREE.NoColors, this.morphNormals = this.morphTargets = this.skinning = !1, this.setValues(a)
}, THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype), THREE.ShaderMaterial.prototype.clone = function () {
    var a = new THREE.ShaderMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.fragmentShader = this.fragmentShader, a.vertexShader = this.vertexShader, a.uniforms = THREE.UniformsUtils.clone(this.uniforms), a.attributes = this.attributes, a.defines = this.defines, a.shading = this.shading, a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, a.fog = this.fog, a.lights = this.lights, a.vertexColors = this.vertexColors, a.skinning = this.skinning, a.morphTargets = this.morphTargets, a.morphNormals = this.morphNormals, a
}, THREE.SpriteMaterial = function (a) {
    THREE.Material.call(this), this.color = new THREE.Color(16777215), this.map = new THREE.Texture, this.useScreenCoordinates = !0, this.depthTest = !this.useScreenCoordinates, this.sizeAttenuation = !this.useScreenCoordinates, this.scaleByViewport = !this.sizeAttenuation, this.alignment = THREE.SpriteAlignment.center.clone(), this.fog = !1, this.uvOffset = new THREE.Vector2(0, 0), this.uvScale = new THREE.Vector2(1, 1), this.setValues(a), a = a || {}, void 0 === a.depthTest && (this.depthTest = !this.useScreenCoordinates), void 0 === a.sizeAttenuation && (this.sizeAttenuation = !this.useScreenCoordinates), void 0 === a.scaleByViewport && (this.scaleByViewport = !this.sizeAttenuation)
}, THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype), THREE.SpriteMaterial.prototype.clone = function () {
    var a = new THREE.SpriteMaterial;
    return THREE.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.map = this.map, a.useScreenCoordinates = this.useScreenCoordinates, a.sizeAttenuation = this.sizeAttenuation, a.scaleByViewport = this.scaleByViewport, a.alignment.copy(this.alignment), a.uvOffset.copy(this.uvOffset), a.uvScale.copy(this.uvScale), a.fog = this.fog, a
}, THREE.SpriteAlignment = {}, THREE.SpriteAlignment.topLeft = new THREE.Vector2(1, -1), THREE.SpriteAlignment.topCenter = new THREE.Vector2(0, -1), THREE.SpriteAlignment.topRight = new THREE.Vector2(-1, -1), THREE.SpriteAlignment.centerLeft = new THREE.Vector2(1, 0), THREE.SpriteAlignment.center = new THREE.Vector2(0, 0), THREE.SpriteAlignment.centerRight = new THREE.Vector2(-1, 0), THREE.SpriteAlignment.bottomLeft = new THREE.Vector2(1, 1), THREE.SpriteAlignment.bottomCenter = new THREE.Vector2(0, 1), THREE.SpriteAlignment.bottomRight = new THREE.Vector2(-1, 1), THREE.Texture = function (a, b, c, d, e, f, g, h, i) {
    this.id = THREE.TextureIdCount++, this.name = "", this.image = a, this.mipmaps = [], this.mapping = void 0 !== b ? b : new THREE.UVMapping, this.wrapS = void 0 !== c ? c : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== d ? d : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== e ? e : THREE.LinearFilter, this.minFilter = void 0 !== f ? f : THREE.LinearMipMapLinearFilter, this.anisotropy = void 0 !== i ? i : 1, this.format = void 0 !== g ? g : THREE.RGBAFormat, this.type = void 0 !== h ? h : THREE.UnsignedByteType, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.needsUpdate = !1, this.onUpdate = null
}, THREE.Texture.prototype = {
    constructor: THREE.Texture,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    clone: function (a) {
        return void 0 === a && (a = new THREE.Texture), a.image = this.image, a.mipmaps = this.mipmaps.slice(0), a.mapping = this.mapping, a.wrapS = this.wrapS, a.wrapT = this.wrapT, a.magFilter = this.magFilter, a.minFilter = this.minFilter, a.anisotropy = this.anisotropy, a.format = this.format, a.type = this.type, a.offset.copy(this.offset), a.repeat.copy(this.repeat), a.generateMipmaps = this.generateMipmaps, a.premultiplyAlpha = this.premultiplyAlpha, a.flipY = this.flipY, a.unpackAlignment = this.unpackAlignment, a
    },
    dispose: function () {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}, THREE.TextureIdCount = 0, THREE.CompressedTexture = function (a, b, c, d, e, f, g, h, i, j, k) {
    THREE.Texture.call(this, null, f, g, h, i, j, d, e, k), this.image = {
        width: b,
        height: c
    }, this.mipmaps = a, this.generateMipmaps = !1
}, THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype), THREE.CompressedTexture.prototype.clone = function () {
    var a = new THREE.CompressedTexture;
    return THREE.Texture.prototype.clone.call(this, a), a
}, THREE.DataTexture = function (a, b, c, d, e, f, g, h, i, j, k) {
    THREE.Texture.call(this, null, f, g, h, i, j, d, e, k), this.image = {
        data: a,
        width: b,
        height: c
    }
}, THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype), THREE.DataTexture.prototype.clone = function () {
    var a = new THREE.DataTexture;
    return THREE.Texture.prototype.clone.call(this, a), a
}, THREE.Particle = function (a) {
    THREE.Object3D.call(this), this.material = a
}, THREE.Particle.prototype = Object.create(THREE.Object3D.prototype), THREE.Particle.prototype.clone = function (a) {
    return void 0 === a && (a = new THREE.Particle(this.material)), THREE.Object3D.prototype.clone.call(this, a), a
}, THREE.ParticleSystem = function (a, b) {
    THREE.Object3D.call(this), this.geometry = a, this.material = void 0 !== b ? b : new THREE.ParticleBasicMaterial({
        color: 16777215 * Math.random()
    }), this.sortParticles = !1, this.geometry && null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere(), this.frustumCulled = !1
}, THREE.ParticleSystem.prototype = Object.create(THREE.Object3D.prototype), THREE.ParticleSystem.prototype.clone = function (a) {
    return void 0 === a && (a = new THREE.ParticleSystem(this.geometry, this.material)), a.sortParticles = this.sortParticles, THREE.Object3D.prototype.clone.call(this, a), a
}, THREE.Line = function (a, b, c) {
    THREE.Object3D.call(this), this.geometry = a, this.material = void 0 !== b ? b : new THREE.LineBasicMaterial({
        color: 16777215 * Math.random()
    }), this.type = void 0 !== c ? c : THREE.LineStrip, this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere())
}, THREE.LineStrip = 0, THREE.LinePieces = 1, THREE.Line.prototype = Object.create(THREE.Object3D.prototype), THREE.Line.prototype.clone = function (a) {
    return void 0 === a && (a = new THREE.Line(this.geometry, this.material, this.type)), THREE.Object3D.prototype.clone.call(this, a), a
}, THREE.Mesh = function (a, b) {
    THREE.Object3D.call(this), this.material = this.geometry = null, this.setGeometry(a), this.setMaterial(b)
}, THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype), THREE.Mesh.prototype.setGeometry = function (a) {
    void 0 !== a && (this.geometry = a, null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere(), this.updateMorphTargets())
}, THREE.Mesh.prototype.setMaterial = function (a) {
    this.material = void 0 !== a ? a : new THREE.MeshBasicMaterial({
        color: 16777215 * Math.random(),
        wireframe: !0
    })
}, THREE.Mesh.prototype.updateMorphTargets = function () {
    if (0 < this.geometry.morphTargets.length) {
        this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (var a = 0, b = this.geometry.morphTargets.length; b > a; a++) this.morphTargetInfluences.push(0), this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a
    }
}, THREE.Mesh.prototype.getMorphTargetIndexByName = function (a) {
    return void 0 !== this.morphTargetDictionary[a] ? this.morphTargetDictionary[a] : (console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0."), 0)
}, THREE.Mesh.prototype.clone = function (a) {
    return void 0 === a && (a = new THREE.Mesh(this.geometry, this.material)), THREE.Object3D.prototype.clone.call(this, a), a
}, THREE.Bone = function (a) {
    THREE.Object3D.call(this), this.skin = a, this.skinMatrix = new THREE.Matrix4
}, THREE.Bone.prototype = Object.create(THREE.Object3D.prototype), THREE.Bone.prototype.update = function (a, b) {
    this.matrixAutoUpdate && (b |= this.updateMatrix()), (b || this.matrixWorldNeedsUpdate) && (a ? this.skinMatrix.multiplyMatrices(a, this.matrix) : this.skinMatrix.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, b = !0);
    var c, d = this.children.length;
    for (c = 0; d > c; c++) this.children[c].update(this.skinMatrix, b)
}, THREE.SkinnedMesh = function (a, b, c) {
    THREE.Mesh.call(this, a, b), this.useVertexTexture = void 0 !== c ? c : !0, this.identityMatrix = new THREE.Matrix4, this.bones = [], this.boneMatrices = [];
    var d, e, f;
    if (this.geometry && void 0 !== this.geometry.bones) {
        for (a = 0; a < this.geometry.bones.length; a++) c = this.geometry.bones[a], d = c.pos, e = c.rotq, f = c.scl, b = this.addBone(), b.name = c.name, b.position.set(d[0], d[1], d[2]), b.quaternion.set(e[0], e[1], e[2], e[3]), b.useQuaternion = !0, void 0 !== f ? b.scale.set(f[0], f[1], f[2]) : b.scale.set(1, 1, 1);
        for (a = 0; a < this.bones.length; a++) c = this.geometry.bones[a], b = this.bones[a], -1 === c.parent ? this.add(b) : this.bones[c.parent].add(b);
        a = this.bones.length, this.useVertexTexture ? (this.boneTextureHeight = this.boneTextureWidth = a = a > 256 ? 64 : a > 64 ? 32 : a > 16 ? 16 : 8, this.boneMatrices = new Float32Array(4 * this.boneTextureWidth * this.boneTextureHeight), this.boneTexture = new THREE.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, THREE.RGBAFormat, THREE.FloatType), this.boneTexture.minFilter = THREE.NearestFilter, this.boneTexture.magFilter = THREE.NearestFilter, this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1) : this.boneMatrices = new Float32Array(16 * a), this.pose()
    }
}, THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype), THREE.SkinnedMesh.prototype.addBone = function (a) {
    return void 0 === a && (a = new THREE.Bone(this)), this.bones.push(a), a
}, THREE.SkinnedMesh.prototype.updateMatrixWorld = function (a) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || a) && (this.parent ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1);
    for (var a = 0, b = this.children.length; b > a; a++) {
        var c = this.children[a];
        c instanceof THREE.Bone ? c.update(this.identityMatrix, !1) : c.updateMatrixWorld(!0)
    }
    if (void 0 == this.boneInverses)
        for (this.boneInverses = [], a = 0, b = this.bones.length; b > a; a++) c = new THREE.Matrix4, c.getInverse(this.bones[a].skinMatrix), this.boneInverses.push(c);
    for (a = 0, b = this.bones.length; b > a; a++) THREE.SkinnedMesh.offsetMatrix.multiplyMatrices(this.bones[a].skinMatrix, this.boneInverses[a]), THREE.SkinnedMesh.offsetMatrix.flattenToArrayOffset(this.boneMatrices, 16 * a);
    this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
}, THREE.SkinnedMesh.prototype.pose = function () {
    this.updateMatrixWorld(!0);
    for (var a = 0; a < this.geometry.skinIndices.length; a++) {
        var b = this.geometry.skinWeights[a],
            c = 1 / b.lengthManhattan();
        1 / 0 !== c ? b.multiplyScalar(c) : b.set(1)
    }
}, THREE.SkinnedMesh.prototype.clone = function (a) {
    return void 0 === a && (a = new THREE.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)), THREE.Mesh.prototype.clone.call(this, a), a
}, THREE.SkinnedMesh.offsetMatrix = new THREE.Matrix4, THREE.MorphAnimMesh = function (a, b) {
    THREE.Mesh.call(this, a, b), this.duration = 1e3, this.mirroredLoop = !1, this.currentKeyframe = this.lastKeyframe = this.time = 0, this.direction = 1, this.directionBackwards = !1, this.setFrameRange(0, this.geometry.morphTargets.length - 1)
}, THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype), THREE.MorphAnimMesh.prototype.setFrameRange = function (a, b) {
    this.startKeyframe = a, this.endKeyframe = b, this.length = this.endKeyframe - this.startKeyframe + 1
}, THREE.MorphAnimMesh.prototype.setDirectionForward = function () {
    this.direction = 1, this.directionBackwards = !1
}, THREE.MorphAnimMesh.prototype.setDirectionBackward = function () {
    this.direction = -1, this.directionBackwards = !0
}, THREE.MorphAnimMesh.prototype.parseAnimations = function () {
    var a = this.geometry;
    a.animations || (a.animations = {});
    for (var b, c = a.animations, d = /([a-z]+)(\d+)/, e = 0, f = a.morphTargets.length; f > e; e++) {
        var g = a.morphTargets[e].name.match(d);
        if (g && 1 < g.length) {
            g = g[1], c[g] || (c[g] = {
                start: 1 / 0,
                end: -1 / 0
            });
            var h = c[g];
            e < h.start && (h.start = e), e > h.end && (h.end = e), b || (b = g)
        }
    }
    a.firstAnimation = b
}, THREE.MorphAnimMesh.prototype.setAnimationLabel = function (a, b, c) {
    this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[a] = {
        start: b,
        end: c
    }
}, THREE.MorphAnimMesh.prototype.playAnimation = function (a, b) {
    var c = this.geometry.animations[a];
    c ? (this.setFrameRange(c.start, c.end), this.duration = 1e3 * ((c.end - c.start) / b), this.time = 0) : console.warn("animation[" + a + "] undefined")
}, THREE.MorphAnimMesh.prototype.updateAnimation = function (a) {
    var b = this.duration / this.length;
    this.time += this.direction * a, this.mirroredLoop ? (this.time > this.duration || 0 > this.time) && (this.direction *= -1, this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), 0 > this.time && (this.time = 0, this.directionBackwards = !1)) : (this.time %= this.duration, 0 > this.time && (this.time += this.duration)), a = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / b), 0, this.length - 1), a !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[a] = 0, this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = a), b = this.time % b / b, this.directionBackwards && (b = 1 - b), this.morphTargetInfluences[this.currentKeyframe] = b, this.morphTargetInfluences[this.lastKeyframe] = 1 - b
}, THREE.MorphAnimMesh.prototype.clone = function (a) {
    return void 0 === a && (a = new THREE.MorphAnimMesh(this.geometry, this.material)), a.duration = this.duration, a.mirroredLoop = this.mirroredLoop, a.time = this.time, a.lastKeyframe = this.lastKeyframe, a.currentKeyframe = this.currentKeyframe, a.direction = this.direction, a.directionBackwards = this.directionBackwards, THREE.Mesh.prototype.clone.call(this, a), a
}, THREE.Ribbon = function (a, b) {
    THREE.Object3D.call(this), this.geometry = a, this.material = b
}, THREE.Ribbon.prototype = Object.create(THREE.Object3D.prototype), THREE.Ribbon.prototype.clone = function (a) {
    return void 0 === a && (a = new THREE.Ribbon(this.geometry, this.material)), THREE.Object3D.prototype.clone.call(this, a), a
}, THREE.LOD = function () {
    THREE.Object3D.call(this), this.objects = []
}, THREE.LOD.prototype = Object.create(THREE.Object3D.prototype), THREE.LOD.prototype.addLevel = function (a, b) {
    void 0 === b && (b = 0);
    for (var b = Math.abs(b), c = 0; c < this.objects.length && !(b < this.objects[c].distance); c++);
    this.objects.splice(c, 0, {
        distance: b,
        object: a
    }), this.add(a)
}, THREE.LOD.prototype.getObjectForDistance = function (a) {
    for (var b = 1, c = this.objects.length; c > b && !(a < this.objects[b].distance); b++);
    return this.objects[b - 1].object
}, THREE.LOD.prototype.update = function () {
    var a = new THREE.Vector3,
        b = new THREE.Vector3;
    return function (c) {
        if (1 < this.objects.length) {
            a.getPositionFromMatrix(c.matrixWorld), b.getPositionFromMatrix(this.matrixWorld), c = a.distanceTo(b), this.objects[0].object.visible = !0;
            for (var d = 1, e = this.objects.length; e > d && c >= this.objects[d].distance; d++) this.objects[d - 1].object.visible = !1, this.objects[d].object.visible = !0;
            for (; e > d; d++) this.objects[d].object.visible = !1
        }
    }
}(), THREE.LOD.prototype.clone = function () {}, THREE.Sprite = function (a) {
    THREE.Object3D.call(this), this.material = void 0 !== a ? a : new THREE.SpriteMaterial, this.rotation3d = this.rotation, this.rotation = 0
}, THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype), THREE.Sprite.prototype.updateMatrix = function () {
    this.rotation3d.set(0, 0, this.rotation), this.quaternion.setFromEuler(this.rotation3d, this.eulerOrder), this.matrix.makeFromPositionQuaternionScale(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
}, THREE.Sprite.prototype.clone = function (a) {
    return void 0 === a && (a = new THREE.Sprite(this.material)), THREE.Object3D.prototype.clone.call(this, a), a
}, THREE.Scene = function () {
    THREE.Object3D.call(this), this.overrideMaterial = this.fog = null, this.autoUpdate = !0, this.matrixAutoUpdate = !1, this.__objects = [], this.__lights = [], this.__objectsAdded = [], this.__objectsRemoved = []
}, THREE.Scene.prototype = Object.create(THREE.Object3D.prototype), THREE.Scene.prototype.__addObject = function (a) {
    if (a instanceof THREE.Light) - 1 === this.__lights.indexOf(a) && this.__lights.push(a), a.target && void 0 === a.target.parent && this.add(a.target);
    else if (!(a instanceof THREE.Camera || a instanceof THREE.Bone) && -1 === this.__objects.indexOf(a)) {
        this.__objects.push(a), this.__objectsAdded.push(a);
        var b = this.__objectsRemoved.indexOf(a); - 1 !== b && this.__objectsRemoved.splice(b, 1)
    }
    for (b = 0; b < a.children.length; b++) this.__addObject(a.children[b])
}, THREE.Scene.prototype.__removeObject = function (a) {
    if (a instanceof THREE.Light) {
        var b = this.__lights.indexOf(a); - 1 !== b && this.__lights.splice(b, 1)
    } else a instanceof THREE.Camera || (b = this.__objects.indexOf(a), -1 !== b && (this.__objects.splice(b, 1), this.__objectsRemoved.push(a), b = this.__objectsAdded.indexOf(a), -1 !== b && this.__objectsAdded.splice(b, 1)));
    for (b = 0; b < a.children.length; b++) this.__removeObject(a.children[b])
}, THREE.Fog = function (a, b, c) {
    this.name = "", this.color = new THREE.Color(a), this.near = void 0 !== b ? b : 1, this.far = void 0 !== c ? c : 1e3
}, THREE.Fog.prototype.clone = function () {
    return new THREE.Fog(this.color.getHex(), this.near, this.far)
}, THREE.FogExp2 = function (a, b) {
    this.name = "", this.color = new THREE.Color(a), this.density = void 0 !== b ? b : 25e-5
}, THREE.FogExp2.prototype.clone = function () {
    return new THREE.FogExp2(this.color.getHex(), this.density)
}, THREE.CanvasRenderer = function (a) {
    function b(a) {
        bb !== a && (bb = $.globalAlpha = a)
    }

    function c(a) {
        cb !== a && (a === THREE.NormalBlending ? $.globalCompositeOperation = "source-over" : a === THREE.AdditiveBlending ? $.globalCompositeOperation = "lighter" : a === THREE.SubtractiveBlending && ($.globalCompositeOperation = "darker"), cb = a)
    }

    function d(a) {
        fb !== a && (fb = $.lineWidth = a)
    }

    function e(a) {
        gb !== a && (gb = $.lineCap = a)
    }

    function f(a) {
        hb !== a && (hb = $.lineJoin = a)
    }

    function g(a) {
        db !== a && (db = $.strokeStyle = a)
    }

    function h(a) {
        eb !== a && (eb = $.fillStyle = a)
    }

    function i(a, b) {
        (ib !== a || jb !== b) && ($.setLineDash([a, b]), ib = a, jb = b)
    }
    console.log("THREE.CanvasRenderer", THREE.REVISION);
    var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W = THREE.Math.smoothstep,
        a = a || {},
        X = this,
        Y = new THREE.Projector,
        Z = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
        $ = Z.getContext("2d"),
        _ = new THREE.Color(0),
        ab = 0,
        bb = 1,
        cb = 0,
        db = null,
        eb = null,
        fb = null,
        gb = null,
        hb = null,
        ib = null,
        jb = 0,
        kb = new THREE.RenderableVertex,
        lb = new THREE.RenderableVertex,
        mb = new THREE.Color,
        nb = new THREE.Color,
        ob = new THREE.Color,
        pb = new THREE.Color,
        qb = new THREE.Color,
        rb = new THREE.Color,
        sb = new THREE.Color,
        tb = new THREE.Color,
        ub = {},
        vb = {},
        wb = new THREE.Box2,
        xb = new THREE.Box2,
        yb = new THREE.Box2,
        zb = new THREE.Color,
        Ab = new THREE.Color,
        Bb = new THREE.Color,
        Cb = new THREE.Vector3,
        Db = 16;
    Q = document.createElement("canvas"), Q.width = Q.height = 2, R = Q.getContext("2d"), R.fillStyle = "rgba(0,0,0,1)", R.fillRect(0, 0, 2, 2), S = R.getImageData(0, 0, 2, 2), T = S.data, U = document.createElement("canvas"), U.width = U.height = Db, V = U.getContext("2d"), V.translate(-Db / 2, -Db / 2), V.scale(Db, Db), Db--, void 0 === $.setLineDash && ($.setLineDash = void 0 !== $.mozDash ? function (a) {
        $.mozDash = null !== a[0] ? a : null
    } : function () {}), this.domElement = Z, this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio : void 0 !== window.devicePixelRatio ? window.devicePixelRatio : 1, this.sortElements = this.sortObjects = this.autoClear = !0, this.info = {
        render: {
            vertices: 0,
            faces: 0
        }
    }, this.supportsVertexTextures = function () {}, this.setFaceCulling = function () {}, this.setSize = function (a, b, c) {
        m = a * this.devicePixelRatio, n = b * this.devicePixelRatio, o = Math.floor(m / 2), p = Math.floor(n / 2), Z.width = m, Z.height = n, 1 !== this.devicePixelRatio && !1 !== c && (Z.style.width = a + "px", Z.style.height = b + "px"), wb.set(new THREE.Vector2(-o, -p), new THREE.Vector2(o, p)), xb.set(new THREE.Vector2(-o, -p), new THREE.Vector2(o, p)), bb = 1, cb = 0, hb = gb = fb = eb = db = null
    }, this.setClearColor = function (a, b) {
        _.set(a), ab = void 0 !== b ? b : 1, xb.set(new THREE.Vector2(-o, -p), new THREE.Vector2(o, p))
    }, this.setClearColorHex = function (a, b) {
        console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead."), this.setClearColor(a, b)
    }, this.getMaxAnisotropy = function () {
        return 0
    }, this.clear = function () {
        $.setTransform(1, 0, 0, -1, o, p), !1 === xb.empty() && (xb.intersect(wb), xb.expandByScalar(2), 1 > ab && $.clearRect(0 | xb.min.x, 0 | xb.min.y, 0 | xb.max.x - xb.min.x, 0 | xb.max.y - xb.min.y), ab > 0 && (c(THREE.NormalBlending), b(1), h("rgba(" + Math.floor(255 * _.r) + "," + Math.floor(255 * _.g) + "," + Math.floor(255 * _.b) + "," + ab + ")"), $.fillRect(0 | xb.min.x, 0 | xb.min.y, 0 | xb.max.x - xb.min.x, 0 | xb.max.y - xb.min.y)), xb.makeEmpty())
    }, this.render = function (a, m) {
        function n(a, b, c) {
            for (var d = 0, e = l.length; e > d; d++) {
                var f = l[d];
                if (tb.copy(f.color), f instanceof THREE.DirectionalLight) {
                    var g = Cb.getPositionFromMatrix(f.matrixWorld).normalize(),
                        h = b.dot(g);
                    0 >= h || (h *= f.intensity, c.add(tb.multiplyScalar(h)))
                } else f instanceof THREE.PointLight && (g = Cb.getPositionFromMatrix(f.matrixWorld), h = b.dot(Cb.subVectors(g, a).normalize()), 0 >= h || (h *= 0 == f.distance ? 1 : 1 - Math.min(a.distanceTo(g) / f.distance, 1), 0 != h && (h *= f.intensity, c.add(tb.multiplyScalar(h)))))
            }
        }

        function Z(a, d, e, f, g, h, i, j) {
            X.info.render.vertices += 3, X.info.render.faces++, b(j.opacity), c(j.blending), u = a.positionScreen.x, v = a.positionScreen.y, w = d.positionScreen.x, x = d.positionScreen.y, y = e.positionScreen.x, z = e.positionScreen.y, _(u, v, w, x, y, z), (j instanceof THREE.MeshLambertMaterial || j instanceof THREE.MeshPhongMaterial) && null === j.map ? (rb.copy(j.color), sb.copy(j.emissive), j.vertexColors === THREE.FaceColors && rb.multiply(i.color), !1 === j.wireframe && j.shading == THREE.SmoothShading && 3 == i.vertexNormalsLength ? (nb.copy(zb), ob.copy(zb), pb.copy(zb), n(i.v1.positionWorld, i.vertexNormalsModel[0], nb), n(i.v2.positionWorld, i.vertexNormalsModel[1], ob), n(i.v3.positionWorld, i.vertexNormalsModel[2], pb), nb.multiply(rb).add(sb), ob.multiply(rb).add(sb), pb.multiply(rb).add(sb), qb.addColors(ob, pb).multiplyScalar(.5), I = fb(nb, ob, pb, qb), eb(u, v, w, x, y, z, 0, 0, 1, 0, 0, 1, I)) : (mb.copy(zb), n(i.centroidModel, i.normalModel, mb), mb.multiply(rb).add(sb), !0 === j.wireframe ? bb(mb, j.wireframeLinewidth, j.wireframeLinecap, j.wireframeLinejoin) : cb(mb))) : j instanceof THREE.MeshBasicMaterial || j instanceof THREE.MeshLambertMaterial || j instanceof THREE.MeshPhongMaterial ? null !== j.map ? j.map.mapping instanceof THREE.UVMapping && (J = i.uvs[0], db(u, v, w, x, y, z, J[f].x, J[f].y, J[g].x, J[g].y, J[h].x, J[h].y, j.map)) : null !== j.envMap ? j.envMap.mapping instanceof THREE.SphericalReflectionMapping && (Cb.copy(i.vertexNormalsModelView[f]), K = .5 * Cb.x + .5, L = .5 * Cb.y + .5, Cb.copy(i.vertexNormalsModelView[g]), M = .5 * Cb.x + .5, N = .5 * Cb.y + .5, Cb.copy(i.vertexNormalsModelView[h]), O = .5 * Cb.x + .5, P = .5 * Cb.y + .5, db(u, v, w, x, y, z, K, L, M, N, O, P, j.envMap)) : (mb.copy(j.color), j.vertexColors === THREE.FaceColors && mb.multiply(i.color), !0 === j.wireframe ? bb(mb, j.wireframeLinewidth, j.wireframeLinecap, j.wireframeLinejoin) : cb(mb)) : j instanceof THREE.MeshDepthMaterial ? (G = m.near, H = m.far, nb.r = nb.g = nb.b = 1 - W(a.positionScreen.z * a.positionScreen.w, G, H), ob.r = ob.g = ob.b = 1 - W(d.positionScreen.z * d.positionScreen.w, G, H), pb.r = pb.g = pb.b = 1 - W(e.positionScreen.z * e.positionScreen.w, G, H), qb.addColors(ob, pb).multiplyScalar(.5), I = fb(nb, ob, pb, qb), eb(u, v, w, x, y, z, 0, 0, 1, 0, 0, 1, I)) : j instanceof THREE.MeshNormalMaterial && (j.shading == THREE.FlatShading ? (a = i.normalModelView, mb.setRGB(a.x, a.y, a.z).multiplyScalar(.5).addScalar(.5), !0 === j.wireframe ? bb(mb, j.wireframeLinewidth, j.wireframeLinecap, j.wireframeLinejoin) : cb(mb)) : j.shading == THREE.SmoothShading && (a = i.vertexNormalsModelView[f], nb.setRGB(a.x, a.y, a.z).multiplyScalar(.5).addScalar(.5), a = i.vertexNormalsModelView[g], ob.setRGB(a.x, a.y, a.z).multiplyScalar(.5).addScalar(.5), a = i.vertexNormalsModelView[h], pb.setRGB(a.x, a.y, a.z).multiplyScalar(.5).addScalar(.5), qb.addColors(ob, pb).multiplyScalar(.5), I = fb(nb, ob, pb, qb), eb(u, v, w, x, y, z, 0, 0, 1, 0, 0, 1, I)))
        }

        function _(a, b, c, d, e, f) {
            $.beginPath(), $.moveTo(a, b), $.lineTo(c, d), $.lineTo(e, f), $.closePath()
        }

        function ab(a, b, c, d, e, f, g, h) {
            $.beginPath(), $.moveTo(a, b), $.lineTo(c, d), $.lineTo(e, f), $.lineTo(g, h), $.closePath()
        }

        function bb(a, b, c, h) {
            d(b), e(c), f(h), g(a.getStyle()), $.stroke(), yb.expandByScalar(2 * b)
        }

        function cb(a) {
            h(a.getStyle()), $.fill()
        }

        function db(a, b, c, d, e, f, g, i, j, k, l, m, n) {
            if (!(n instanceof THREE.DataTexture || void 0 === n.image || 0 == n.image.width)) {
                if (!0 === n.needsUpdate) {
                    var o = n.wrapS == THREE.RepeatWrapping,
                        p = n.wrapT == THREE.RepeatWrapping;
                    ub[n.id] = $.createPattern(n.image, !0 === o && !0 === p ? "repeat" : !0 === o && !1 === p ? "repeat-x" : !1 === o && !0 === p ? "repeat-y" : "no-repeat"), n.needsUpdate = !1
                }
                void 0 === ub[n.id] ? h("rgba(0,0,0,1)") : h(ub[n.id]);
                var o = n.offset.x / n.repeat.x,
                    p = n.offset.y / n.repeat.y,
                    q = n.image.width * n.repeat.x,
                    r = n.image.height * n.repeat.y,
                    g = (g + o) * q,
                    i = (1 - i + p) * r,
                    c = c - a,
                    d = d - b,
                    e = e - a,
                    f = f - b,
                    j = (j + o) * q - g,
                    k = (1 - k + p) * r - i,
                    l = (l + o) * q - g,
                    m = (1 - m + p) * r - i,
                    o = j * m - l * k;
                0 === o ? (void 0 === vb[n.id] && (b = document.createElement("canvas"), b.width = n.image.width, b.height = n.image.height, b = b.getContext("2d"), b.drawImage(n.image, 0, 0), vb[n.id] = b.getImageData(0, 0, n.image.width, n.image.height).data), b = vb[n.id], g = 4 * (Math.floor(g) + Math.floor(i) * n.image.width), mb.setRGB(b[g] / 255, b[g + 1] / 255, b[g + 2] / 255), cb(mb)) : (o = 1 / o, n = (m * c - k * e) * o, k = (m * d - k * f) * o, c = (j * e - l * c) * o, d = (j * f - l * d) * o, a = a - n * g - c * i, g = b - k * g - d * i, $.save(), $.transform(n, k, c, d, a, g), $.fill(), $.restore())
            }
        }

        function eb(a, b, c, d, e, f, g, h, i, j, k, l, m) {
            var n, o;
            n = m.width - 1, o = m.height - 1, g *= n, h *= o, c -= a, d -= b, e -= a, f -= b, i = i * n - g, j = j * o - h, k = k * n - g, l = l * o - h, o = 1 / (i * l - k * j), n = (l * c - j * e) * o, j = (l * d - j * f) * o, c = (i * e - k * c) * o, d = (i * f - k * d) * o, a = a - n * g - c * h, b = b - j * g - d * h, $.save(), $.transform(n, j, c, d, a, b), $.clip(), $.drawImage(m, 0, 0), $.restore()
        }

        function fb(a, b, c, d) {
            return T[0] = 0 | 255 * a.r, T[1] = 0 | 255 * a.g, T[2] = 0 | 255 * a.b, T[4] = 0 | 255 * b.r, T[5] = 0 | 255 * b.g, T[6] = 0 | 255 * b.b, T[8] = 0 | 255 * c.r, T[9] = 0 | 255 * c.g, T[10] = 0 | 255 * c.b, T[12] = 0 | 255 * d.r, T[13] = 0 | 255 * d.g, T[14] = 0 | 255 * d.b, R.putImageData(S, 0, 0), V.drawImage(Q, 0, 0), U
        }

        function gb(a, b) {
            var c = b.x - a.x,
                d = b.y - a.y,
                e = c * c + d * d;
            0 !== e && (e = 1 / Math.sqrt(e), c *= e, d *= e, b.x += c, b.y += d, a.x -= c, a.y -= d)
        }
        if (!1 == m instanceof THREE.Camera) console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera.");
        else {
            !0 === this.autoClear && this.clear(), $.setTransform(1, 0, 0, -1, o, p), X.info.render.vertices = 0, X.info.render.faces = 0, j = Y.projectScene(a, m, this.sortObjects, this.sortElements), k = j.elements, l = j.lights, zb.setRGB(0, 0, 0), Ab.setRGB(0, 0, 0), Bb.setRGB(0, 0, 0);
            for (var hb = 0, ib = l.length; ib > hb; hb++) {
                var jb = l[hb],
                    Db = jb.color;
                jb instanceof THREE.AmbientLight ? zb.add(Db) : jb instanceof THREE.DirectionalLight ? Ab.add(Db) : jb instanceof THREE.PointLight && Bb.add(Db)
            }
            for (hb = 0, ib = k.length; ib > hb; hb++) {
                var Eb = k[hb],
                    jb = Eb.material;
                if (void 0 !== jb && !1 !== jb.visible) {
                    if (yb.makeEmpty(), Eb instanceof THREE.RenderableParticle) {
                        q = Eb, q.x *= o, q.y *= p, Db = q, b(jb.opacity), c(jb.blending);
                        var Fb = void 0,
                            Gb = void 0,
                            Hb = void 0,
                            Ib = void 0,
                            Jb = void 0,
                            Kb = void 0,
                            Lb = void 0;
                        jb instanceof THREE.ParticleBasicMaterial ? null === jb.map ? (Hb = Eb.object.scale.x, Ib = Eb.object.scale.y, Hb *= Eb.scale.x * o, Ib *= Eb.scale.y * p, yb.min.set(Db.x - Hb, Db.y - Ib), yb.max.set(Db.x + Hb, Db.y + Ib), !1 === wb.isIntersectionBox(yb) ? yb.makeEmpty() : (h(jb.color.getStyle()), $.save(), $.translate(Db.x, Db.y), $.rotate(-Eb.rotation), $.scale(Hb, Ib), $.fillRect(-1, -1, 2, 2), $.restore())) : (Jb = jb.map.image, Kb = Jb.width >> 1, Lb = Jb.height >> 1, Hb = Eb.scale.x * o, Ib = Eb.scale.y * p, Fb = Hb * Kb, Gb = Ib * Lb, yb.min.set(Db.x - Fb, Db.y - Gb), yb.max.set(Db.x + Fb, Db.y + Gb), !1 === wb.isIntersectionBox(yb) ? yb.makeEmpty() : ($.save(), $.translate(Db.x, Db.y), $.rotate(-Eb.rotation), $.scale(Hb, -Ib), $.translate(-Kb, -Lb), $.drawImage(Jb, 0, 0), $.restore())) : jb instanceof THREE.ParticleCanvasMaterial && (Fb = Eb.scale.x * o, Gb = Eb.scale.y * p, yb.min.set(Db.x - Fb, Db.y - Gb), yb.max.set(Db.x + Fb, Db.y + Gb), !1 === wb.isIntersectionBox(yb) ? yb.makeEmpty() : (g(jb.color.getStyle()), h(jb.color.getStyle()), $.save(), $.translate(Db.x, Db.y), $.rotate(-Eb.rotation), $.scale(Fb, Gb), jb.program($), $.restore()))
                    } else if (Eb instanceof THREE.RenderableLine) {
                        if (q = Eb.v1, r = Eb.v2, q.positionScreen.x *= o, q.positionScreen.y *= p, r.positionScreen.x *= o, r.positionScreen.y *= p, yb.setFromPoints([q.positionScreen, r.positionScreen]), !0 === wb.isIntersectionBox(yb))
                            if (Db = q, Fb = r, b(jb.opacity), c(jb.blending), $.beginPath(), $.moveTo(Db.positionScreen.x, Db.positionScreen.y), $.lineTo(Fb.positionScreen.x, Fb.positionScreen.y), jb instanceof THREE.LineBasicMaterial) {
                                if (d(jb.linewidth), e(jb.linecap), f(jb.linejoin), jb.vertexColors !== THREE.VertexColors) g(jb.color.getStyle());
                                else if (Gb = Eb.vertexColors[0].getStyle(), Eb = Eb.vertexColors[1].getStyle(), Gb === Eb) g(Gb);
                                else {
                                    try {
                                        var Mb = $.createLinearGradient(Db.positionScreen.x, Db.positionScreen.y, Fb.positionScreen.x, Fb.positionScreen.y);
                                        Mb.addColorStop(0, Gb), Mb.addColorStop(1, Eb)
                                    } catch (Nb) {
                                        Mb = Gb
                                    }
                                    g(Mb)
                                }
                                $.stroke(), yb.expandByScalar(2 * jb.linewidth)
                            } else jb instanceof THREE.LineDashedMaterial && (d(jb.linewidth), e(jb.linecap), f(jb.linejoin), g(jb.color.getStyle()), i(jb.dashSize, jb.gapSize), $.stroke(), yb.expandByScalar(2 * jb.linewidth), i(null, null))
                    } else if (Eb instanceof THREE.RenderableFace3) {
                        if (q = Eb.v1, r = Eb.v2, s = Eb.v3, -1 > q.positionScreen.z || 1 < q.positionScreen.z) continue;
                        if (-1 > r.positionScreen.z || 1 < r.positionScreen.z) continue;
                        if (-1 > s.positionScreen.z || 1 < s.positionScreen.z) continue;
                        q.positionScreen.x *= o, q.positionScreen.y *= p, r.positionScreen.x *= o, r.positionScreen.y *= p, s.positionScreen.x *= o, s.positionScreen.y *= p, !0 === jb.overdraw && (gb(q.positionScreen, r.positionScreen), gb(r.positionScreen, s.positionScreen), gb(s.positionScreen, q.positionScreen)), yb.setFromPoints([q.positionScreen, r.positionScreen, s.positionScreen]), !0 === wb.isIntersectionBox(yb) && Z(q, r, s, 0, 1, 2, Eb, jb)
                    } else if (Eb instanceof THREE.RenderableFace4) {
                        if (q = Eb.v1, r = Eb.v2, s = Eb.v3, t = Eb.v4, -1 > q.positionScreen.z || 1 < q.positionScreen.z) continue;
                        if (-1 > r.positionScreen.z || 1 < r.positionScreen.z) continue;
                        if (-1 > s.positionScreen.z || 1 < s.positionScreen.z) continue;
                        if (-1 > t.positionScreen.z || 1 < t.positionScreen.z) continue;
                        q.positionScreen.x *= o, q.positionScreen.y *= p, r.positionScreen.x *= o, r.positionScreen.y *= p, s.positionScreen.x *= o, s.positionScreen.y *= p, t.positionScreen.x *= o, t.positionScreen.y *= p, kb.positionScreen.copy(r.positionScreen), lb.positionScreen.copy(t.positionScreen), !0 === jb.overdraw && (gb(q.positionScreen, r.positionScreen), gb(r.positionScreen, t.positionScreen), gb(t.positionScreen, q.positionScreen), gb(s.positionScreen, kb.positionScreen), gb(s.positionScreen, lb.positionScreen)), yb.setFromPoints([q.positionScreen, r.positionScreen, s.positionScreen, t.positionScreen]), !0 === wb.isIntersectionBox(yb) && (Db = q, Fb = r, Gb = s, Hb = t, Ib = kb, Jb = lb, X.info.render.vertices += 4, X.info.render.faces++, b(jb.opacity), c(jb.blending), void 0 !== jb.map && null !== jb.map || void 0 !== jb.envMap && null !== jb.envMap ? (Z(Db, Fb, Hb, 0, 1, 3, Eb, jb), Z(Ib, Gb, Jb, 1, 2, 3, Eb, jb)) : (u = Db.positionScreen.x, v = Db.positionScreen.y, w = Fb.positionScreen.x, x = Fb.positionScreen.y, y = Gb.positionScreen.x, z = Gb.positionScreen.y, A = Hb.positionScreen.x, B = Hb.positionScreen.y, C = Ib.positionScreen.x, D = Ib.positionScreen.y, E = Jb.positionScreen.x, F = Jb.positionScreen.y, jb instanceof THREE.MeshLambertMaterial || jb instanceof THREE.MeshPhongMaterial ? (rb.copy(jb.color), sb.copy(jb.emissive), jb.vertexColors === THREE.FaceColors && rb.multiply(Eb.color), !1 === jb.wireframe && jb.shading == THREE.SmoothShading && 4 == Eb.vertexNormalsLength ? (nb.copy(zb), ob.copy(zb), pb.copy(zb), qb.copy(zb), n(Eb.v1.positionWorld, Eb.vertexNormalsModel[0], nb), n(Eb.v2.positionWorld, Eb.vertexNormalsModel[1], ob), n(Eb.v4.positionWorld, Eb.vertexNormalsModel[3], pb), n(Eb.v3.positionWorld, Eb.vertexNormalsModel[2], qb), nb.multiply(rb).add(sb), ob.multiply(rb).add(sb), pb.multiply(rb).add(sb), qb.multiply(rb).add(sb), I = fb(nb, ob, pb, qb), _(u, v, w, x, A, B), eb(u, v, w, x, A, B, 0, 0, 1, 0, 0, 1, I), _(C, D, y, z, E, F), eb(C, D, y, z, E, F, 1, 0, 1, 1, 0, 1, I)) : (mb.copy(zb), n(Eb.centroidModel, Eb.normalModel, mb), mb.multiply(rb).add(sb), ab(u, v, w, x, y, z, A, B), !0 === jb.wireframe ? bb(mb, jb.wireframeLinewidth, jb.wireframeLinecap, jb.wireframeLinejoin) : cb(mb))) : jb instanceof THREE.MeshBasicMaterial ? (mb.copy(jb.color), jb.vertexColors === THREE.FaceColors && mb.multiply(Eb.color), ab(u, v, w, x, y, z, A, B), !0 === jb.wireframe ? bb(mb, jb.wireframeLinewidth, jb.wireframeLinecap, jb.wireframeLinejoin) : cb(mb)) : jb instanceof THREE.MeshNormalMaterial ? (Db = void 0, jb.shading == THREE.FlatShading ? (Db = Eb.normalModelView, mb.setRGB(Db.x, Db.y, Db.z).multiplyScalar(.5).addScalar(.5), ab(u, v, w, x, y, z, A, B), !0 === jb.wireframe ? bb(mb, jb.wireframeLinewidth, jb.wireframeLinecap, jb.wireframeLinejoin) : cb(mb)) : jb.shading == THREE.SmoothShading && (Db = Eb.vertexNormalsModelView[0], nb.setRGB(Db.x, Db.y, Db.z).multiplyScalar(.5).addScalar(.5), Db = Eb.vertexNormalsModelView[1], ob.setRGB(Db.x, Db.y, Db.z).multiplyScalar(.5).addScalar(.5), Db = Eb.vertexNormalsModelView[3], pb.setRGB(Db.x, Db.y, Db.z).multiplyScalar(.5).addScalar(.5), Db = Eb.vertexNormalsModelView[2], qb.setRGB(Db.x, Db.y, Db.z).multiplyScalar(.5).addScalar(.5), I = fb(nb, ob, pb, qb), _(u, v, w, x, A, B), eb(u, v, w, x, A, B, 0, 0, 1, 0, 0, 1, I), _(C, D, y, z, E, F), eb(C, D, y, z, E, F, 1, 0, 1, 1, 0, 1, I))) : jb instanceof THREE.MeshDepthMaterial && (G = m.near, H = m.far, nb.r = nb.g = nb.b = 1 - W(Db.positionScreen.z * Db.positionScreen.w, G, H), ob.r = ob.g = ob.b = 1 - W(Fb.positionScreen.z * Fb.positionScreen.w, G, H), pb.r = pb.g = pb.b = 1 - W(Hb.positionScreen.z * Hb.positionScreen.w, G, H), qb.r = qb.g = qb.b = 1 - W(Gb.positionScreen.z * Gb.positionScreen.w, G, H), I = fb(nb, ob, pb, qb), _(u, v, w, x, A, B), eb(u, v, w, x, A, B, 0, 0, 1, 0, 0, 1, I), _(C, D, y, z, E, F), eb(C, D, y, z, E, F, 1, 0, 1, 1, 0, 1, I))))
                    }
                    xb.union(yb)
                }
            }
            $.setTransform(1, 0, 0, 1, 0, 0)
        }
    }
}, THREE.ShaderChunk = {
    fog_pars_fragment: "#ifdef USE_FOG\nuniform vec3 fogColor;\n#ifdef FOG_EXP2\nuniform float fogDensity;\n#else\nuniform float fogNear;\nuniform float fogFar;\n#endif\n#endif",
    fog_fragment: "#ifdef USE_FOG\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n#ifdef FOG_EXP2\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n#else\nfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n#endif\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n#endif",
    envmap_pars_fragment: "#ifdef USE_ENVMAP\nuniform float reflectivity;\nuniform samplerCube envMap;\nuniform float flipEnvMap;\nuniform int combine;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nuniform bool useRefract;\nuniform float refractionRatio;\n#else\nvarying vec3 vReflect;\n#endif\n#endif",
    envmap_fragment: "#ifdef USE_ENVMAP\nvec3 reflectVec;\n#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nreflectVec = refract( cameraToVertex, normal, refractionRatio );\n} else { \nreflectVec = reflect( cameraToVertex, normal );\n}\n#else\nreflectVec = vReflect;\n#endif\n#ifdef DOUBLE_SIDED\nfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\nvec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#else\nvec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n#endif\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\nif ( combine == 1 ) {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );\n} else if ( combine == 2 ) {\ngl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;\n} else {\ngl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );\n}\n#endif",
    envmap_pars_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvarying vec3 vReflect;\nuniform float refractionRatio;\nuniform bool useRefract;\n#endif",
    worldpos_vertex: "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n#ifdef USE_SKINNING\nvec4 worldPosition = modelMatrix * skinned;\n#endif\n#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n#endif\n#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n#endif\n#endif",
    envmap_vertex: "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )\nvec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;\nworldNormal = normalize( worldNormal );\nvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, worldNormal );\n}\n#endif",
    map_particle_pars_fragment: "#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_particle_fragment: "#ifdef USE_MAP\ngl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );\n#endif",
    map_pars_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\nuniform vec4 offsetRepeat;\n#endif",
    map_pars_fragment: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvarying vec2 vUv;\n#endif\n#ifdef USE_MAP\nuniform sampler2D map;\n#endif",
    map_vertex: "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )\nvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",
    map_fragment: "#ifdef USE_MAP\nvec4 texelColor = texture2D( map, vUv );\n#ifdef GAMMA_INPUT\ntexelColor.xyz *= texelColor.xyz;\n#endif\ngl_FragColor = gl_FragColor * texelColor;\n#endif",
    lightmap_pars_fragment: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\nuniform sampler2D lightMap;\n#endif",
    lightmap_pars_vertex: "#ifdef USE_LIGHTMAP\nvarying vec2 vUv2;\n#endif",
    lightmap_fragment: "#ifdef USE_LIGHTMAP\ngl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );\n#endif",
    lightmap_vertex: "#ifdef USE_LIGHTMAP\nvUv2 = uv2;\n#endif",
    bumpmap_pars_fragment: "#ifdef USE_BUMPMAP\nuniform sampler2D bumpMap;\nuniform float bumpScale;\nvec2 dHdxy_fwd() {\nvec2 dSTdx = dFdx( vUv );\nvec2 dSTdy = dFdy( vUv );\nfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\nfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\nfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\nreturn vec2( dBx, dBy );\n}\nvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\nvec3 vSigmaX = dFdx( surf_pos );\nvec3 vSigmaY = dFdy( surf_pos );\nvec3 vN = surf_norm;\nvec3 R1 = cross( vSigmaY, vN );\nvec3 R2 = cross( vN, vSigmaX );\nfloat fDet = dot( vSigmaX, R1 );\nvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\nreturn normalize( abs( fDet ) * surf_norm - vGrad );\n}\n#endif",
    normalmap_pars_fragment: "#ifdef USE_NORMALMAP\nuniform sampler2D normalMap;\nuniform vec2 normalScale;\nvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\nvec3 q0 = dFdx( eye_pos.xyz );\nvec3 q1 = dFdy( eye_pos.xyz );\nvec2 st0 = dFdx( vUv.st );\nvec2 st1 = dFdy( vUv.st );\nvec3 S = normalize(  q0 * st1.t - q1 * st0.t );\nvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\nvec3 N = normalize( surf_norm );\nvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\nmapN.xy = normalScale * mapN.xy;\nmat3 tsn = mat3( S, T, N );\nreturn normalize( tsn * mapN );\n}\n#endif",
    specularmap_pars_fragment: "#ifdef USE_SPECULARMAP\nuniform sampler2D specularMap;\n#endif",
    specularmap_fragment: "float specularStrength;\n#ifdef USE_SPECULARMAP\nvec4 texelSpecular = texture2D( specularMap, vUv );\nspecularStrength = texelSpecular.r;\n#else\nspecularStrength = 1.0;\n#endif",
    lights_lambert_pars_vertex: "uniform vec3 ambient;\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif",
    lights_lambert_vertex: "vLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\nvLightBack = vec3( 0.0 );\n#endif\ntransformedNormal = normalize( transformedNormal );\n#if MAX_DIR_LIGHTS > 0\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, dirVector );\nvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\ndirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\ndirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n#ifdef DOUBLE_SIDED\nvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n#endif\n}\n#endif\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\npointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\npointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;\n#ifdef DOUBLE_SIDED\nvLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\nfloat dotProduct = dot( transformedNormal, lVector );\nvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n#ifdef DOUBLE_SIDED\nvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n#endif\n#endif\n#ifdef WRAP_AROUND\nvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\nspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n#ifdef DOUBLE_SIDED\nspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n#endif\n#endif\nvLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;\n#ifdef DOUBLE_SIDED\nvLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( transformedNormal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\nvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n#ifdef DOUBLE_SIDED\nvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n#endif\n}\n#endif\nvLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;\n#ifdef DOUBLE_SIDED\nvLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;\n#endif",
    lights_phong_pars_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif",
    lights_phong_vertex: "#ifndef PHONG_PER_PIXEL\n#if MAX_POINT_LIGHTS > 0\nfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nvPointLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz - mvPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nvSpotLight[ i ] = vec4( lVector, lDistance );\n}\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvWorldPosition = worldPosition.xyz;\n#endif",
    lights_phong_pars_fragment: "uniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#else\nvarying vec4 vPointLight[ MAX_POINT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n#ifdef PHONG_PER_PIXEL\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#else\nvarying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];\n#endif\n#endif\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )\nvarying vec3 vWorldPosition;\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;",
    lights_phong_fragment: "vec3 normal = normalize( vNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#ifdef DOUBLE_SIDED\nnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n#endif\n#ifdef USE_NORMALMAP\nnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\nnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse  = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vPointLight[ i ].xyz );\nfloat lDistance = vPointLight[ i ].w;\n#endif\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n#endif\npointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;\nvec3 pointHalfVector = normalize( lVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;\n#else\npointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse  = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n#ifdef PHONG_PER_PIXEL\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 lVector = lPosition.xyz + vViewPosition.xyz;\nfloat lDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nlDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );\nlVector = normalize( lVector );\n#else\nvec3 lVector = normalize( vSpotLight[ i ].xyz );\nfloat lDistance = vSpotLight[ i ].w;\n#endif\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\nfloat dotProduct = dot( normal, lVector );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n#endif\nspotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;\nvec3 spotHalfVector = normalize( lVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse  = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, dirVector );\n#ifdef WRAP_AROUND\nfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\nfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n#endif\ndirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += diffuse * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( shininess + 2.0001 ) / 8.0;\nvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;\n#endif",
    color_pars_fragment: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_fragment: "#ifdef USE_COLOR\ngl_FragColor = gl_FragColor * vec4( vColor, opacity );\n#endif",
    color_pars_vertex: "#ifdef USE_COLOR\nvarying vec3 vColor;\n#endif",
    color_vertex: "#ifdef USE_COLOR\n#ifdef GAMMA_INPUT\nvColor = color * color;\n#else\nvColor = color;\n#endif\n#endif",
    skinning_pars_vertex: "#ifdef USE_SKINNING\n#ifdef BONE_TEXTURE\nuniform sampler2D boneTexture;\nmat4 getBoneMatrix( const in float i ) {\nfloat j = i * 4.0;\nfloat x = mod( j, N_BONE_PIXEL_X );\nfloat y = floor( j / N_BONE_PIXEL_X );\nconst float dx = 1.0 / N_BONE_PIXEL_X;\nconst float dy = 1.0 / N_BONE_PIXEL_Y;\ny = dy * ( y + 0.5 );\nvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\nvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\nvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\nvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\nmat4 bone = mat4( v1, v2, v3, v4 );\nreturn bone;\n}\n#else\nuniform mat4 boneGlobalMatrices[ MAX_BONES ];\nmat4 getBoneMatrix( const in float i ) {\nmat4 bone = boneGlobalMatrices[ int(i) ];\nreturn bone;\n}\n#endif\n#endif",
    skinbase_vertex: "#ifdef USE_SKINNING\nmat4 boneMatX = getBoneMatrix( skinIndex.x );\nmat4 boneMatY = getBoneMatrix( skinIndex.y );\n#endif",
    skinning_vertex: "#ifdef USE_SKINNING\n#ifdef USE_MORPHTARGETS\nvec4 skinVertex = vec4( morphed, 1.0 );\n#else\nvec4 skinVertex = vec4( position, 1.0 );\n#endif\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned 	  += boneMatY * skinVertex * skinWeight.y;\n#endif",
    morphtarget_pars_vertex: "#ifdef USE_MORPHTARGETS\n#ifndef USE_MORPHNORMALS\nuniform float morphTargetInfluences[ 8 ];\n#else\nuniform float morphTargetInfluences[ 4 ];\n#endif\n#endif",
    morphtarget_vertex: "#ifdef USE_MORPHTARGETS\nvec3 morphed = vec3( 0.0 );\nmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\nmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\nmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\nmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n#ifndef USE_MORPHNORMALS\nmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\nmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\nmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\nmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n#endif\nmorphed += position;\n#endif",
    default_vertex: "vec4 mvPosition;\n#ifdef USE_SKINNING\nmvPosition = modelViewMatrix * skinned;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )\nmvPosition = modelViewMatrix * vec4( position, 1.0 );\n#endif\ngl_Position = projectionMatrix * mvPosition;",
    morphnormal_vertex: "#ifdef USE_MORPHNORMALS\nvec3 morphedNormal = vec3( 0.0 );\nmorphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\nmorphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\nmorphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\nmorphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\nmorphedNormal += normal;\n#endif",
    skinnormal_vertex: "#ifdef USE_SKINNING\nmat4 skinMatrix = skinWeight.x * boneMatX;\nskinMatrix 	+= skinWeight.y * boneMatY;\n#ifdef USE_MORPHNORMALS\nvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n#else\nvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n#endif\n#endif",
    defaultnormal_vertex: "vec3 objectNormal;\n#ifdef USE_SKINNING\nobjectNormal = skinnedNormal.xyz;\n#endif\n#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )\nobjectNormal = morphedNormal;\n#endif\n#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )\nobjectNormal = normal;\n#endif\n#ifdef FLIP_SIDED\nobjectNormal = -objectNormal;\n#endif\nvec3 transformedNormal = normalMatrix * objectNormal;",
    shadowmap_pars_fragment: "#ifdef USE_SHADOWMAP\nuniform sampler2D shadowMap[ MAX_SHADOWS ];\nuniform vec2 shadowMapSize[ MAX_SHADOWS ];\nuniform float shadowDarkness[ MAX_SHADOWS ];\nuniform float shadowBias[ MAX_SHADOWS ];\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nfloat unpackDepth( const in vec4 rgba_depth ) {\nconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\nfloat depth = dot( rgba_depth, bit_shift );\nreturn depth;\n}\n#endif",
    shadowmap_fragment: "#ifdef USE_SHADOWMAP\n#ifdef SHADOWMAP_DEBUG\nvec3 frustumColors[3];\nfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\nfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\nfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n#endif\n#ifdef SHADOWMAP_CASCADE\nint inFrustumCount = 0;\n#endif\nfloat fDepth;\nvec3 shadowColor = vec3( 1.0 );\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\nbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\nbool inFrustum = all( inFrustumVec );\n#ifdef SHADOWMAP_CASCADE\ninFrustumCount += int( inFrustum );\nbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n#else\nbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n#endif\nbool frustumTest = all( frustumTestVec );\nif ( frustumTest ) {\nshadowCoord.z += shadowBias[ i ];\n#if defined( SHADOWMAP_TYPE_PCF )\nfloat shadow = 0.0;\nconst float shadowDelta = 1.0 / 9.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.25 * xPixelOffset;\nfloat dy0 = -1.25 * yPixelOffset;\nfloat dx1 = 1.25 * xPixelOffset;\nfloat dy1 = 1.25 * yPixelOffset;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\nfloat shadow = 0.0;\nfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\nfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\nfloat dx0 = -1.0 * xPixelOffset;\nfloat dy0 = -1.0 * yPixelOffset;\nfloat dx1 = 1.0 * xPixelOffset;\nfloat dy1 = 1.0 * yPixelOffset;\nmat3 shadowKernel;\nmat3 depthKernel;\ndepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\ndepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\ndepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\ndepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\ndepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\ndepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\ndepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\ndepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\ndepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\nvec3 shadowZ = vec3( shadowCoord.z );\nshadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\nshadowKernel[0] *= vec3(0.25);\nshadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\nshadowKernel[1] *= vec3(0.25);\nshadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\nshadowKernel[2] *= vec3(0.25);\nvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\nshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\nshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\nvec4 shadowValues;\nshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\nshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\nshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\nshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\nshadow = dot( shadowValues, vec4( 1.0 ) );\nshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n#else\nvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\nfloat fDepth = unpackDepth( rgbaDepth );\nif ( fDepth < shadowCoord.z )\nshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n#endif\n}\n#ifdef SHADOWMAP_DEBUG\n#ifdef SHADOWMAP_CASCADE\nif ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];\n#else\nif ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];\n#endif\n#endif\n}\n#ifdef GAMMA_OUTPUT\nshadowColor *= shadowColor;\n#endif\ngl_FragColor.xyz = gl_FragColor.xyz * shadowColor;\n#endif",
    shadowmap_pars_vertex: "#ifdef USE_SHADOWMAP\nvarying vec4 vShadowCoord[ MAX_SHADOWS ];\nuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n#endif",
    shadowmap_vertex: "#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif",
    alphatest_fragment: "#ifdef ALPHATEST\nif ( gl_FragColor.a < ALPHATEST ) discard;\n#endif",
    linear_to_gamma_fragment: "#ifdef GAMMA_OUTPUT\ngl_FragColor.xyz = sqrt( gl_FragColor.xyz );\n#endif"
}, THREE.UniformsUtils = {
    merge: function (a) {
        var b, c, d, e = {};
        for (b = 0; b < a.length; b++)
            for (c in d = this.clone(a[b])) e[c] = d[c];
        return e
    },
    clone: function (a) {
        var b, c, d, e = {};
        for (b in a)
            for (c in e[b] = {}, a[b]) d = a[b][c], e[b][c] = d instanceof THREE.Color || d instanceof THREE.Vector2 || d instanceof THREE.Vector3 || d instanceof THREE.Vector4 || d instanceof THREE.Matrix4 || d instanceof THREE.Texture ? d.clone() : d instanceof Array ? d.slice() : d;
        return e
    }
}, THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0, 0, 1, 1)
        },
        lightMap: {
            type: "t",
            value: null
        },
        specularMap: {
            type: "t",
            value: null
        },
        envMap: {
            type: "t",
            value: null
        },
        flipEnvMap: {
            type: "f",
            value: -1
        },
        useRefract: {
            type: "i",
            value: 0
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: .98
        },
        combine: {
            type: "i",
            value: 0
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    bump: {
        bumpMap: {
            type: "t",
            value: null
        },
        bumpScale: {
            type: "f",
            value: 1
        }
    },
    normalmap: {
        normalMap: {
            type: "t",
            value: null
        },
        normalScale: {
            type: "v2",
            value: new THREE.Vector2(1, 1)
        }
    },
    fog: {
        fogDensity: {
            type: "f",
            value: 25e-5
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2e3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLightDirection: {
            type: "fv",
            value: []
        },
        directionalLightColor: {
            type: "fv",
            value: []
        },
        hemisphereLightDirection: {
            type: "fv",
            value: []
        },
        hemisphereLightSkyColor: {
            type: "fv",
            value: []
        },
        hemisphereLightGroundColor: {
            type: "fv",
            value: []
        },
        pointLightColor: {
            type: "fv",
            value: []
        },
        pointLightPosition: {
            type: "fv",
            value: []
        },
        pointLightDistance: {
            type: "fv1",
            value: []
        },
        spotLightColor: {
            type: "fv",
            value: []
        },
        spotLightPosition: {
            type: "fv",
            value: []
        },
        spotLightDirection: {
            type: "fv",
            value: []
        },
        spotLightDistance: {
            type: "fv1",
            value: []
        },
        spotLightAngleCos: {
            type: "fv1",
            value: []
        },
        spotLightExponent: {
            type: "fv1",
            value: []
        }
    },
    particle: {
        psColor: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        fogDensity: {
            type: "f",
            value: 25e-5
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2e3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    shadowmap: {
        shadowMap: {
            type: "tv",
            value: []
        },
        shadowMapSize: {
            type: "v2v",
            value: []
        },
        shadowBias: {
            type: "fv1",
            value: []
        },
        shadowDarkness: {
            type: "fv1",
            value: []
        },
        shadowMatrix: {
            type: "m4v",
            value: []
        }
    }
}, THREE.ShaderLib = {
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
        vertexShader: [THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, "#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        vertexShader: ["#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\nvarying vec3 vLightBack;\n#endif", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "#ifdef DOUBLE_SIDED\nif ( gl_FrontFacing )\ngl_FragColor.xyz *= vLightFront;\nelse\ngl_FragColor.xyz *= vLightBack;\n#else\ngl_FragColor.xyz *= vLightFront;\n#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            ambient: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        vertexShader: ["#define PHONG\nvarying vec3 vViewPosition;\nvarying vec3 vNormal;", THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform vec3 ambient;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3 ( 1.0 ), opacity );", THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;\nuniform float scale;", THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n#ifdef USE_SIZEATTENUATION\ngl_PointSize = size * ( scale / length( mvPosition.xyz ) );\n#else\ngl_PointSize = size;\n#endif\ngl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 psColor;\nuniform float opacity;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, "void main() {\ngl_FragColor = vec4( psColor, opacity );", THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    dashed: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
            scale: {
                type: "f",
                value: 1
            },
            dashSize: {
                type: "f",
                value: 1
            },
            totalSize: {
                type: "f",
                value: 2
            }
        }]),
        vertexShader: ["uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "vLineDistance = scale * lineDistance;\nvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;", THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\nif ( mod( vLineDistance, totalSize ) > dashSize ) {\ndiscard;\n}\ngl_FragColor = vec4( diffuse, opacity );", THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n")
    },
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2e3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: "void main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform float mNear;\nuniform float mFar;\nuniform float opacity;\nvoid main() {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat color = 1.0 - smoothstep( mNear, mFar, depth );\ngl_FragColor = vec4( vec3( color ), opacity );\n}"
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: ["varying vec3 vNormal;", THREE.ShaderChunk.morphtarget_pars_vertex, "void main() {\nvNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
        fragmentShader: "uniform float opacity;\nvarying vec3 vNormal;\nvoid main() {\ngl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );\n}"
    },
    normalmap: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            enableAO: {
                type: "i",
                value: 0
            },
            enableDiffuse: {
                type: "i",
                value: 0
            },
            enableSpecular: {
                type: "i",
                value: 0
            },
            enableReflection: {
                type: "i",
                value: 0
            },
            enableDisplacement: {
                type: "i",
                value: 0
            },
            tDisplacement: {
                type: "t",
                value: null
            },
            tDiffuse: {
                type: "t",
                value: null
            },
            tCube: {
                type: "t",
                value: null
            },
            tNormal: {
                type: "t",
                value: null
            },
            tSpecular: {
                type: "t",
                value: null
            },
            tAO: {
                type: "t",
                value: null
            },
            uNormalScale: {
                type: "v2",
                value: new THREE.Vector2(1, 1)
            },
            uDisplacementBias: {
                type: "f",
                value: 0
            },
            uDisplacementScale: {
                type: "f",
                value: 1
            },
            uDiffuseColor: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            uSpecularColor: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            uAmbientColor: {
                type: "c",
                value: new THREE.Color(16777215)
            },
            uShininess: {
                type: "f",
                value: 30
            },
            uOpacity: {
                type: "f",
                value: 1
            },
            useRefract: {
                type: "i",
                value: 0
            },
            uRefractionRatio: {
                type: "f",
                value: .98
            },
            uReflectivity: {
                type: "f",
                value: .5
            },
            uOffset: {
                type: "v2",
                value: new THREE.Vector2(0, 0)
            },
            uRepeat: {
                type: "v2",
                value: new THREE.Vector2(1, 1)
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1, 1, 1)
            }
        }]),
        fragmentShader: ["uniform vec3 uAmbientColor;\nuniform vec3 uDiffuseColor;\nuniform vec3 uSpecularColor;\nuniform float uShininess;\nuniform float uOpacity;\nuniform bool enableDiffuse;\nuniform bool enableSpecular;\nuniform bool enableAO;\nuniform bool enableReflection;\nuniform sampler2D tDiffuse;\nuniform sampler2D tNormal;\nuniform sampler2D tSpecular;\nuniform sampler2D tAO;\nuniform samplerCube tCube;\nuniform vec2 uNormalScale;\nuniform bool useRefract;\nuniform float uRefractionRatio;\nuniform float uReflectivity;\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nuniform vec3 ambientLightColor;\n#if MAX_DIR_LIGHTS > 0\nuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\nuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n#if MAX_HEMI_LIGHTS > 0\nuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\nuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n#endif\n#if MAX_POINT_LIGHTS > 0\nuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\nuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\nuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n#endif\n#if MAX_SPOT_LIGHTS > 0\nuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\nuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\nuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\nuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\nuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n#endif\n#ifdef WRAP_AROUND\nuniform vec3 wrapRGB;\n#endif\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;", THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, "void main() {\ngl_FragColor = vec4( vec3( 1.0 ), uOpacity );\nvec3 specularTex = vec3( 1.0 );\nvec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;\nnormalTex.xy *= uNormalScale;\nnormalTex = normalize( normalTex );\nif( enableDiffuse ) {\n#ifdef GAMMA_INPUT\nvec4 texelColor = texture2D( tDiffuse, vUv );\ntexelColor.xyz *= texelColor.xyz;\ngl_FragColor = gl_FragColor * texelColor;\n#else\ngl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );\n#endif\n}\nif( enableAO ) {\n#ifdef GAMMA_INPUT\nvec4 aoColor = texture2D( tAO, vUv );\naoColor.xyz *= aoColor.xyz;\ngl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;\n#endif\n}\nif( enableSpecular )\nspecularTex = texture2D( tSpecular, vUv ).xyz;\nmat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );\nvec3 finalNormal = tsb * normalTex;\n#ifdef FLIP_SIDED\nfinalNormal = -finalNormal;\n#endif\nvec3 normal = normalize( finalNormal );\nvec3 viewPosition = normalize( vViewPosition );\n#if MAX_POINT_LIGHTS > 0\nvec3 pointDiffuse = vec3( 0.0 );\nvec3 pointSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\nvec3 pointVector = lPosition.xyz + vViewPosition.xyz;\nfloat pointDistance = 1.0;\nif ( pointLightDistance[ i ] > 0.0 )\npointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );\npointVector = normalize( pointVector );\n#ifdef WRAP_AROUND\nfloat pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );\nfloat pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );\nvec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n#else\nfloat pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );\n#endif\npointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;\nvec3 pointHalfVector = normalize( pointVector + viewPosition );\nfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\nfloat pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );\npointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;\n#else\npointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_SPOT_LIGHTS > 0\nvec3 spotDiffuse = vec3( 0.0 );\nvec3 spotSpecular = vec3( 0.0 );\nfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\nvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\nvec3 spotVector = lPosition.xyz + vViewPosition.xyz;\nfloat spotDistance = 1.0;\nif ( spotLightDistance[ i ] > 0.0 )\nspotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );\nspotVector = normalize( spotVector );\nfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\nif ( spotEffect > spotLightAngleCos[ i ] ) {\nspotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );\n#ifdef WRAP_AROUND\nfloat spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );\nfloat spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );\nvec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n#else\nfloat spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );\n#endif\nspotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;\nvec3 spotHalfVector = normalize( spotVector + viewPosition );\nfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\nfloat spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );\nspotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;\n#else\nspotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;\n#endif\n}\n}\n#endif\n#if MAX_DIR_LIGHTS > 0\nvec3 dirDiffuse = vec3( 0.0 );\nvec3 dirSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {\nvec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );\nvec3 dirVector = normalize( lDirection.xyz );\n#ifdef WRAP_AROUND\nfloat directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );\nfloat directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );\nvec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );\n#else\nfloat dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );\n#endif\ndirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;\nvec3 dirHalfVector = normalize( dirVector + viewPosition );\nfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\nfloat dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );\ndirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n#else\ndirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;\n#endif\n}\n#endif\n#if MAX_HEMI_LIGHTS > 0\nvec3 hemiDiffuse  = vec3( 0.0 );\nvec3 hemiSpecular = vec3( 0.0 );\nfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\nvec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );\nvec3 lVector = normalize( lDirection.xyz );\nfloat dotProduct = dot( normal, lVector );\nfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\nvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\nhemiDiffuse += uDiffuseColor * hemiColor;\nvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\nfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\nfloat hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );\nvec3 lVectorGround = -lVector;\nvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\nfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\nfloat hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );\n#ifdef PHYSICALLY_BASED_SHADING\nfloat dotProductGround = dot( normal, lVectorGround );\nfloat specularNormalization = ( uShininess + 2.0001 ) / 8.0;\nvec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );\nvec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );\nhemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n#else\nhemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;\n#endif\n}\n#endif\nvec3 totalDiffuse = vec3( 0.0 );\nvec3 totalSpecular = vec3( 0.0 );\n#if MAX_DIR_LIGHTS > 0\ntotalDiffuse += dirDiffuse;\ntotalSpecular += dirSpecular;\n#endif\n#if MAX_HEMI_LIGHTS > 0\ntotalDiffuse += hemiDiffuse;\ntotalSpecular += hemiSpecular;\n#endif\n#if MAX_POINT_LIGHTS > 0\ntotalDiffuse += pointDiffuse;\ntotalSpecular += pointSpecular;\n#endif\n#if MAX_SPOT_LIGHTS > 0\ntotalDiffuse += spotDiffuse;\ntotalSpecular += spotSpecular;\n#endif\n#ifdef METAL\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );\n#else\ngl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;\n#endif\nif ( enableReflection ) {\nvec3 vReflect;\nvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\nif ( useRefract ) {\nvReflect = refract( cameraToVertex, normal, uRefractionRatio );\n} else {\nvReflect = reflect( cameraToVertex, normal );\n}\nvec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );\n#ifdef GAMMA_INPUT\ncubeColor.xyz *= cubeColor.xyz;\n#endif\ngl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );\n}", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "}"].join("\n"),
        vertexShader: ["attribute vec4 tangent;\nuniform vec2 uOffset;\nuniform vec2 uRepeat;\nuniform bool enableDisplacement;\n#ifdef VERTEX_TEXTURES\nuniform sampler2D tDisplacement;\nuniform float uDisplacementScale;\nuniform float uDisplacementBias;\n#endif\nvarying vec3 vTangent;\nvarying vec3 vBinormal;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvarying vec3 vWorldPosition;\nvarying vec3 vViewPosition;", THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, "#ifdef USE_SKINNING\nvNormal = normalize( normalMatrix * skinnedNormal.xyz );\nvec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );\nvTangent = normalize( normalMatrix * skinnedTangent.xyz );\n#else\nvNormal = normalize( normalMatrix * normal );\nvTangent = normalize( normalMatrix * tangent.xyz );\n#endif\nvBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );\nvUv = uv * uRepeat + uOffset;\nvec3 displacedPosition;\n#ifdef VERTEX_TEXTURES\nif ( enableDisplacement ) {\nvec3 dv = texture2D( tDisplacement, uv ).xyz;\nfloat df = uDisplacementScale * dv.x + uDisplacementBias;\ndisplacedPosition = position + normalize( normal ) * df;\n} else {\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned 	  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n}\n#else\n#ifdef USE_SKINNING\nvec4 skinVertex = vec4( position, 1.0 );\nvec4 skinned  = boneMatX * skinVertex * skinWeight.x;\nskinned 	  += boneMatY * skinVertex * skinWeight.y;\ndisplacedPosition  = skinned.xyz;\n#else\ndisplacedPosition = position;\n#endif\n#endif\nvec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );\nvec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\nvWorldPosition = worldPosition.xyz;\nvViewPosition = -mvPosition.xyz;\n#ifdef USE_SHADOWMAP\nfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\nvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n}\n#endif\n}"].join("\n")
    },
    cube: {
        uniforms: {
            tCube: {
                type: "t",
                value: null
            },
            tFlip: {
                type: "f",
                value: -1
            }
        },
        vertexShader: "varying vec3 vWorldPosition;\nvoid main() {\nvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\nvWorldPosition = worldPosition.xyz;\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
        fragmentShader: "uniform samplerCube tCube;\nuniform float tFlip;\nvarying vec3 vWorldPosition;\nvoid main() {\ngl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n}"
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, "}"].join("\n"),
        fragmentShader: "vec4 pack_depth( const in float depth ) {\nconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );\nconst vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );\nvec4 res = fract( depth * bit_shift );\nres -= res.xxyz * bit_mask;\nreturn res;\n}\nvoid main() {\ngl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );\n}"
    }
}, THREE.WebGLRenderer = function (a) {
    function b(a) {
        if (a.__webglCustomAttributesList)
            for (var b in a.__webglCustomAttributesList) Q.deleteBuffer(a.__webglCustomAttributesList[b].buffer)
    }

    function c(a, b) {
        var c = a.vertices.length,
            d = b.material;
        if (d.attributes) {
            void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
            for (var e in d.attributes) {
                var f = d.attributes[e];
                if (!f.__webglInitialized || f.createUniqueBuffers) {
                    f.__webglInitialized = !0;
                    var g = 1;
                    "v2" === f.type ? g = 2 : "v3" === f.type ? g = 3 : "v4" === f.type ? g = 4 : "c" === f.type && (g = 3), f.size = g, f.array = new Float32Array(c * g), f.buffer = Q.createBuffer(), f.buffer.belongsToAttribute = e, f.needsUpdate = !0
                }
                a.__webglCustomAttributesList.push(f)
            }
        }
    }

    function d(a, b) {
        var c = b.geometry,
            d = a.faces3,
            h = a.faces4,
            i = 3 * d.length + 4 * h.length,
            j = 1 * d.length + 2 * h.length,
            h = 3 * d.length + 4 * h.length,
            d = e(b, a),
            k = g(d),
            l = f(d),
            m = d.vertexColors ? d.vertexColors : !1;
        if (a.__vertexArray = new Float32Array(3 * i), l && (a.__normalArray = new Float32Array(3 * i)), c.hasTangents && (a.__tangentArray = new Float32Array(4 * i)), m && (a.__colorArray = new Float32Array(3 * i)), k && ((0 < c.faceUvs.length || 0 < c.faceVertexUvs.length) && (a.__uvArray = new Float32Array(2 * i)), (1 < c.faceUvs.length || 1 < c.faceVertexUvs.length) && (a.__uv2Array = new Float32Array(2 * i))), b.geometry.skinWeights.length && b.geometry.skinIndices.length && (a.__skinIndexArray = new Float32Array(4 * i), a.__skinWeightArray = new Float32Array(4 * i)), a.__faceArray = new Uint16Array(3 * j), a.__lineArray = new Uint16Array(2 * h), a.numMorphTargets)
            for (a.__morphTargetsArrays = [], c = 0, k = a.numMorphTargets; k > c; c++) a.__morphTargetsArrays.push(new Float32Array(3 * i));
        if (a.numMorphNormals)
            for (a.__morphNormalsArrays = [], c = 0, k = a.numMorphNormals; k > c; c++) a.__morphNormalsArrays.push(new Float32Array(3 * i));
        if (a.__webglFaceCount = 3 * j, a.__webglLineCount = 2 * h, d.attributes) {
            void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
            for (var n in d.attributes) {
                var o, j = d.attributes[n],
                    c = {};
                for (o in j) c[o] = j[o];
                (!c.__webglInitialized || c.createUniqueBuffers) && (c.__webglInitialized = !0, h = 1, "v2" === c.type ? h = 2 : "v3" === c.type ? h = 3 : "v4" === c.type ? h = 4 : "c" === c.type && (h = 3), c.size = h, c.array = new Float32Array(i * h), c.buffer = Q.createBuffer(), c.buffer.belongsToAttribute = n, j.needsUpdate = !0, c.__original = j), a.__webglCustomAttributesList.push(c)
            }
        }
        a.__inittedArrays = !0
    }

    function e(a, b) {
        return a.material instanceof THREE.MeshFaceMaterial ? a.material.materials[b.materialIndex] : a.material
    }

    function f(a) {
        return a instanceof THREE.MeshBasicMaterial && !a.envMap || a instanceof THREE.MeshDepthMaterial ? !1 : a && void 0 !== a.shading && a.shading === THREE.SmoothShading ? THREE.SmoothShading : THREE.FlatShading
    }

    function g(a) {
        return a.map || a.lightMap || a.bumpMap || a.normalMap || a.specularMap || a instanceof THREE.ShaderMaterial ? !0 : !1
    }

    function h(a) {
        vb[a] || (Q.enableVertexAttribArray(a), vb[a] = !0)
    }

    function i() {
        for (var a in vb) vb[a] && (Q.disableVertexAttribArray(a), vb[a] = !1)
    }

    function j(a, b) {
        return a.z !== b.z ? b.z - a.z : a.id - b.id
    }

    function k(a, b) {
        return b[0] - a[0]
    }

    function l(a, b, c) {
        if (a.length)
            for (var d = 0, e = a.length; e > d; d++) ab = Y = null, $ = _ = eb = db = kb = jb = fb = -1, Bb = !0, a[d].render(b, c, tb, ub), ab = Y = null, $ = _ = eb = db = kb = jb = fb = -1, Bb = !0
    }

    function m(a, b, c, d, e, f, g, h) {
        var i, j, k, l;
        b ? (j = a.length - 1, l = b = -1) : (j = 0, b = a.length, l = 1);
        for (var m = j; m !== b; m += l)
            if (i = a[m], i.render) {
                if (j = i.object, k = i.buffer, h) i = h;
                else {
                    if (i = i[c], !i) continue;
                    g && V.setBlending(i.blending, i.blendEquation, i.blendSrc, i.blendDst), V.setDepthTest(i.depthTest), V.setDepthWrite(i.depthWrite), A(i.polygonOffset, i.polygonOffsetFactor, i.polygonOffsetUnits)
                }
                V.setMaterialFaces(i), k instanceof THREE.BufferGeometry ? V.renderBufferDirect(d, e, f, i, k, j) : V.renderBuffer(d, e, f, i, k, j)
            }
    }

    function n(a, b, c, d, e, f, g) {
        for (var h, i, j = 0, k = a.length; k > j; j++)
            if (h = a[j], i = h.object, i.visible) {
                if (g) h = g;
                else {
                    if (h = h[b], !h) continue;
                    f && V.setBlending(h.blending, h.blendEquation, h.blendSrc, h.blendDst), V.setDepthTest(h.depthTest), V.setDepthWrite(h.depthWrite), A(h.polygonOffset, h.polygonOffsetFactor, h.polygonOffsetUnits)
                }
                V.renderImmediateObject(c, d, e, h, i)
            }
    }

    function o(a, b) {
        var e, f, g, h;
        if (void 0 === a.__webglInit && (a.__webglInit = !0, a._modelViewMatrix = new THREE.Matrix4, a._normalMatrix = new THREE.Matrix3, void 0 !== a.geometry && void 0 === a.geometry.__webglInit && (a.geometry.__webglInit = !0, a.geometry.addEventListener("dispose", Qb)), f = a.geometry, void 0 !== f))
            if (f instanceof THREE.BufferGeometry) {
                var i, j;
                for (i in f.attributes) j = "index" === i ? Q.ELEMENT_ARRAY_BUFFER : Q.ARRAY_BUFFER, h = f.attributes[i], h.buffer = Q.createBuffer(), Q.bindBuffer(j, h.buffer), Q.bufferData(j, h.array, Q.STATIC_DRAW)
            } else if (a instanceof THREE.Mesh) {
            if (g = a.material, void 0 === f.geometryGroups) {
                i = f;
                var k, l, m, n, o;
                j = {};
                var q = i.morphTargets.length,
                    r = i.morphNormals.length,
                    s = g instanceof THREE.MeshFaceMaterial;
                for (i.geometryGroups = {}, g = 0, k = i.faces.length; k > g; g++) l = i.faces[g], m = s ? l.materialIndex : 0, void 0 === j[m] && (j[m] = {
                    hash: m,
                    counter: 0
                }), o = j[m].hash + "_" + j[m].counter, void 0 === i.geometryGroups[o] && (i.geometryGroups[o] = {
                    faces3: [],
                    faces4: [],
                    materialIndex: m,
                    vertices: 0,
                    numMorphTargets: q,
                    numMorphNormals: r
                }), n = l instanceof THREE.Face3 ? 3 : 4, 65535 < i.geometryGroups[o].vertices + n && (j[m].counter += 1, o = j[m].hash + "_" + j[m].counter, void 0 === i.geometryGroups[o] && (i.geometryGroups[o] = {
                    faces3: [],
                    faces4: [],
                    materialIndex: m,
                    vertices: 0,
                    numMorphTargets: q,
                    numMorphNormals: r
                })), l instanceof THREE.Face3 ? i.geometryGroups[o].faces3.push(g) : i.geometryGroups[o].faces4.push(g), i.geometryGroups[o].vertices += n;
                i.geometryGroupsList = [];
                for (h in i.geometryGroups) i.geometryGroups[h].id = bb++, i.geometryGroupsList.push(i.geometryGroups[h])
            }
            for (e in f.geometryGroups)
                if (h = f.geometryGroups[e], !h.__webglVertexBuffer) {
                    if (i = h, i.__webglVertexBuffer = Q.createBuffer(), i.__webglNormalBuffer = Q.createBuffer(), i.__webglTangentBuffer = Q.createBuffer(), i.__webglColorBuffer = Q.createBuffer(), i.__webglUVBuffer = Q.createBuffer(), i.__webglUV2Buffer = Q.createBuffer(), i.__webglSkinIndicesBuffer = Q.createBuffer(), i.__webglSkinWeightsBuffer = Q.createBuffer(), i.__webglFaceBuffer = Q.createBuffer(), i.__webglLineBuffer = Q.createBuffer(), q = j = void 0, i.numMorphTargets)
                        for (i.__webglMorphTargetsBuffers = [], j = 0, q = i.numMorphTargets; q > j; j++) i.__webglMorphTargetsBuffers.push(Q.createBuffer());
                    if (i.numMorphNormals)
                        for (i.__webglMorphNormalsBuffers = [], j = 0, q = i.numMorphNormals; q > j; j++) i.__webglMorphNormalsBuffers.push(Q.createBuffer());
                    V.info.memory.geometries++, d(h, a), f.verticesNeedUpdate = !0, f.morphTargetsNeedUpdate = !0, f.elementsNeedUpdate = !0, f.uvsNeedUpdate = !0, f.normalsNeedUpdate = !0, f.tangentsNeedUpdate = !0, f.colorsNeedUpdate = !0
                }
        } else a instanceof THREE.Ribbon ? f.__webglVertexBuffer || (h = f, h.__webglVertexBuffer = Q.createBuffer(), h.__webglColorBuffer = Q.createBuffer(), h.__webglNormalBuffer = Q.createBuffer(), V.info.memory.geometries++, h = f, i = h.vertices.length, h.__vertexArray = new Float32Array(3 * i), h.__colorArray = new Float32Array(3 * i), h.__normalArray = new Float32Array(3 * i), h.__webglVertexCount = i, c(h, a), f.verticesNeedUpdate = !0, f.colorsNeedUpdate = !0, f.normalsNeedUpdate = !0) : a instanceof THREE.Line ? f.__webglVertexBuffer || (h = f, h.__webglVertexBuffer = Q.createBuffer(), h.__webglColorBuffer = Q.createBuffer(), h.__webglLineDistanceBuffer = Q.createBuffer(), V.info.memory.geometries++, h = f, i = h.vertices.length, h.__vertexArray = new Float32Array(3 * i), h.__colorArray = new Float32Array(3 * i), h.__lineDistanceArray = new Float32Array(1 * i), h.__webglLineCount = i, c(h, a), f.verticesNeedUpdate = !0, f.colorsNeedUpdate = !0, f.lineDistancesNeedUpdate = !0) : a instanceof THREE.ParticleSystem && !f.__webglVertexBuffer && (h = f, h.__webglVertexBuffer = Q.createBuffer(), h.__webglColorBuffer = Q.createBuffer(), V.info.memory.geometries++, h = f, i = h.vertices.length, h.__vertexArray = new Float32Array(3 * i), h.__colorArray = new Float32Array(3 * i), h.__sortArray = [], h.__webglParticleCount = i, c(h, a), f.verticesNeedUpdate = !0, f.colorsNeedUpdate = !0); if (void 0 === a.__webglActive) {
            if (a instanceof THREE.Mesh) {
                if (f = a.geometry, f instanceof THREE.BufferGeometry) p(b.__webglObjects, f, a);
                else if (f instanceof THREE.Geometry)
                    for (e in f.geometryGroups) h = f.geometryGroups[e], p(b.__webglObjects, h, a)
            } else a instanceof THREE.Ribbon || a instanceof THREE.Line || a instanceof THREE.ParticleSystem ? (f = a.geometry, p(b.__webglObjects, f, a)) : a instanceof THREE.ImmediateRenderObject || a.immediateRenderCallback ? b.__webglObjectsImmediate.push({
                object: a,
                opaque: null,
                transparent: null
            }) : a instanceof THREE.Sprite ? b.__webglSprites.push(a) : a instanceof THREE.LensFlare && b.__webglFlares.push(a);
            a.__webglActive = !0
        }
    }

    function p(a, b, c) {
        a.push({
            buffer: b,
            object: c,
            opaque: null,
            transparent: null
        })
    }

    function q(a) {
        for (var b in a.attributes)
            if (a.attributes[b].needsUpdate) return !0;
        return !1
    }

    function r(a) {
        for (var b in a.attributes) a.attributes[b].needsUpdate = !1
    }

    function s(a, b) {
        a instanceof THREE.Mesh || a instanceof THREE.ParticleSystem || a instanceof THREE.Ribbon || a instanceof THREE.Line ? t(b.__webglObjects, a) : a instanceof THREE.Sprite ? u(b.__webglSprites, a) : a instanceof THREE.LensFlare ? u(b.__webglFlares, a) : (a instanceof THREE.ImmediateRenderObject || a.immediateRenderCallback) && t(b.__webglObjectsImmediate, a), delete a.__webglActive
    }

    function t(a, b) {
        for (var c = a.length - 1; c >= 0; c--) a[c].object === b && a.splice(c, 1)
    }

    function u(a, b) {
        for (var c = a.length - 1; c >= 0; c--) a[c] === b && a.splice(c, 1)
    }

    function v(a, b, c, d, e) {
        cb = 0, d.needsUpdate && (d.program && Ub(d), V.initMaterial(d, b, c, e), d.needsUpdate = !1), d.morphTargets && !e.__webglMorphTargetInfluences && (e.__webglMorphTargetInfluences = new Float32Array(V.maxMorphTargets));
        var f = !1,
            g = d.program,
            h = g.uniforms,
            i = d.uniforms;
        if (g !== Y && (Q.useProgram(g), Y = g, f = !0), d.id !== $ && ($ = d.id, f = !0), (f || a !== ab) && (Q.uniformMatrix4fv(h.projectionMatrix, !1, a.projectionMatrix.elements), a !== ab && (ab = a)), d.skinning)
            if (Jb && e.useVertexTexture) {
                if (null !== h.boneTexture) {
                    var j = w();
                    Q.uniform1i(h.boneTexture, j), V.setTexture(e.boneTexture, j)
                }
            } else null !== h.boneGlobalMatrices && Q.uniformMatrix4fv(h.boneGlobalMatrices, !1, e.boneMatrices);
        if (f) {
            if (c && d.fog && (i.fogColor.value = c.color, c instanceof THREE.Fog ? (i.fogNear.value = c.near, i.fogFar.value = c.far) : c instanceof THREE.FogExp2 && (i.fogDensity.value = c.density)), d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d.lights) {
                if (Bb) {
                    for (var k, l, m, n, o = j = 0, p = 0, q = Cb, r = q.directional.colors, s = q.directional.positions, t = q.point.colors, u = q.point.positions, v = q.point.distances, z = q.spot.colors, A = q.spot.positions, B = q.spot.distances, C = q.spot.directions, E = q.spot.anglesCos, F = q.spot.exponents, I = q.hemi.skyColors, J = q.hemi.groundColors, K = q.hemi.positions, L = 0, M = 0, N = 0, O = 0, P = 0, R = 0, S = 0, T = 0, U = k = 0, c = n = U = 0, f = b.length; f > c; c++) k = b[c], k.onlyShadow || (l = k.color, m = k.intensity, n = k.distance, k instanceof THREE.AmbientLight ? k.visible && (V.gammaInput ? (j += l.r * l.r, o += l.g * l.g, p += l.b * l.b) : (j += l.r, o += l.g, p += l.b)) : k instanceof THREE.DirectionalLight ? (P += 1, k.visible && (Ab.getPositionFromMatrix(k.matrixWorld), zb.getPositionFromMatrix(k.target.matrixWorld), Ab.sub(zb), Ab.normalize(), 0 === Ab.x && 0 === Ab.y && 0 === Ab.z || (k = 3 * L, s[k] = Ab.x, s[k + 1] = Ab.y, s[k + 2] = Ab.z, V.gammaInput ? x(r, k, l, m * m) : y(r, k, l, m), L += 1))) : k instanceof THREE.PointLight ? (R += 1, k.visible && (U = 3 * M, V.gammaInput ? x(t, U, l, m * m) : y(t, U, l, m), zb.getPositionFromMatrix(k.matrixWorld), u[U] = zb.x, u[U + 1] = zb.y, u[U + 2] = zb.z, v[M] = n, M += 1)) : k instanceof THREE.SpotLight ? (S += 1, k.visible && (U = 3 * N, V.gammaInput ? x(z, U, l, m * m) : y(z, U, l, m), zb.getPositionFromMatrix(k.matrixWorld), A[U] = zb.x, A[U + 1] = zb.y, A[U + 2] = zb.z, B[N] = n, Ab.copy(zb), zb.getPositionFromMatrix(k.target.matrixWorld), Ab.sub(zb), Ab.normalize(), C[U] = Ab.x, C[U + 1] = Ab.y, C[U + 2] = Ab.z, E[N] = Math.cos(k.angle), F[N] = k.exponent, N += 1)) : k instanceof THREE.HemisphereLight && (T += 1, k.visible && (Ab.getPositionFromMatrix(k.matrixWorld), Ab.normalize(), 0 === Ab.x && 0 === Ab.y && 0 === Ab.z || (n = 3 * O, K[n] = Ab.x, K[n + 1] = Ab.y, K[n + 2] = Ab.z, l = k.color, k = k.groundColor, V.gammaInput ? (m *= m, x(I, n, l, m), x(J, n, k, m)) : (y(I, n, l, m), y(J, n, k, m)), O += 1))));
                    for (c = 3 * L, f = Math.max(r.length, 3 * P); f > c; c++) r[c] = 0;
                    for (c = 3 * M, f = Math.max(t.length, 3 * R); f > c; c++) t[c] = 0;
                    for (c = 3 * N, f = Math.max(z.length, 3 * S); f > c; c++) z[c] = 0;
                    for (c = 3 * O, f = Math.max(I.length, 3 * T); f > c; c++) I[c] = 0;
                    for (c = 3 * O, f = Math.max(J.length, 3 * T); f > c; c++) J[c] = 0;
                    q.directional.length = L, q.point.length = M, q.spot.length = N, q.hemi.length = O, q.ambient[0] = j, q.ambient[1] = o, q.ambient[2] = p, Bb = !1
                }
                c = Cb, i.ambientLightColor.value = c.ambient, i.directionalLightColor.value = c.directional.colors, i.directionalLightDirection.value = c.directional.positions, i.pointLightColor.value = c.point.colors, i.pointLightPosition.value = c.point.positions, i.pointLightDistance.value = c.point.distances, i.spotLightColor.value = c.spot.colors, i.spotLightPosition.value = c.spot.positions, i.spotLightDistance.value = c.spot.distances, i.spotLightDirection.value = c.spot.directions, i.spotLightAngleCos.value = c.spot.anglesCos, i.spotLightExponent.value = c.spot.exponents, i.hemisphereLightSkyColor.value = c.hemi.skyColors, i.hemisphereLightGroundColor.value = c.hemi.groundColors, i.hemisphereLightDirection.value = c.hemi.positions
            }
            if (d instanceof THREE.MeshBasicMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.MeshPhongMaterial) {
                i.opacity.value = d.opacity, V.gammaInput ? i.diffuse.value.copyGammaToLinear(d.color) : i.diffuse.value = d.color, i.map.value = d.map, i.lightMap.value = d.lightMap, i.specularMap.value = d.specularMap, d.bumpMap && (i.bumpMap.value = d.bumpMap, i.bumpScale.value = d.bumpScale), d.normalMap && (i.normalMap.value = d.normalMap, i.normalScale.value.copy(d.normalScale));
                var W;
                d.map ? W = d.map : d.specularMap ? W = d.specularMap : d.normalMap ? W = d.normalMap : d.bumpMap && (W = d.bumpMap), void 0 !== W && (c = W.offset, W = W.repeat, i.offsetRepeat.value.set(c.x, c.y, W.x, W.y)), i.envMap.value = d.envMap, i.flipEnvMap.value = d.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1, i.reflectivity.value = d.reflectivity, i.refractionRatio.value = d.refractionRatio, i.combine.value = d.combine, i.useRefract.value = d.envMap && d.envMap.mapping instanceof THREE.CubeRefractionMapping
            }
            if (d instanceof THREE.LineBasicMaterial ? (i.diffuse.value = d.color, i.opacity.value = d.opacity) : d instanceof THREE.LineDashedMaterial ? (i.diffuse.value = d.color, i.opacity.value = d.opacity, i.dashSize.value = d.dashSize, i.totalSize.value = d.dashSize + d.gapSize, i.scale.value = d.scale) : d instanceof THREE.ParticleBasicMaterial ? (i.psColor.value = d.color, i.opacity.value = d.opacity, i.size.value = d.size, i.scale.value = H.height / 2, i.map.value = d.map) : d instanceof THREE.MeshPhongMaterial ? (i.shininess.value = d.shininess, V.gammaInput ? (i.ambient.value.copyGammaToLinear(d.ambient), i.emissive.value.copyGammaToLinear(d.emissive), i.specular.value.copyGammaToLinear(d.specular)) : (i.ambient.value = d.ambient, i.emissive.value = d.emissive, i.specular.value = d.specular), d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshLambertMaterial ? (V.gammaInput ? (i.ambient.value.copyGammaToLinear(d.ambient), i.emissive.value.copyGammaToLinear(d.emissive)) : (i.ambient.value = d.ambient, i.emissive.value = d.emissive), d.wrapAround && i.wrapRGB.value.copy(d.wrapRGB)) : d instanceof THREE.MeshDepthMaterial ? (i.mNear.value = a.near, i.mFar.value = a.far, i.opacity.value = d.opacity) : d instanceof THREE.MeshNormalMaterial && (i.opacity.value = d.opacity), e.receiveShadow && !d._shadowPass && i.shadowMatrix)
                for (c = W = 0, f = b.length; f > c; c++) j = b[c], j.castShadow && (j instanceof THREE.SpotLight || j instanceof THREE.DirectionalLight && !j.shadowCascade) && (i.shadowMap.value[W] = j.shadowMap, i.shadowMapSize.value[W] = j.shadowMapSize, i.shadowMatrix.value[W] = j.shadowMatrix, i.shadowDarkness.value[W] = j.shadowDarkness, i.shadowBias.value[W] = j.shadowBias, W++);
            for (b = d.uniformsList, i = 0, W = b.length; W > i; i++)
                if (f = g.uniforms[b[i][1]])
                    if (c = b[i][0], o = c.type, j = c.value, "i" === o) Q.uniform1i(f, j);
                    else if ("f" === o) Q.uniform1f(f, j);
            else if ("v2" === o) Q.uniform2f(f, j.x, j.y);
            else if ("v3" === o) Q.uniform3f(f, j.x, j.y, j.z);
            else if ("v4" === o) Q.uniform4f(f, j.x, j.y, j.z, j.w);
            else if ("c" === o) Q.uniform3f(f, j.r, j.g, j.b);
            else if ("iv1" === o) Q.uniform1iv(f, j);
            else if ("iv" === o) Q.uniform3iv(f, j);
            else if ("fv1" === o) Q.uniform1fv(f, j);
            else if ("fv" === o) Q.uniform3fv(f, j);
            else if ("v2v" === o) {
                for (void 0 === c._array && (c._array = new Float32Array(2 * j.length)), o = 0, p = j.length; p > o; o++) q = 2 * o, c._array[q] = j[o].x, c._array[q + 1] = j[o].y;
                Q.uniform2fv(f, c._array)
            } else if ("v3v" === o) {
                for (void 0 === c._array && (c._array = new Float32Array(3 * j.length)), o = 0, p = j.length; p > o; o++) q = 3 * o, c._array[q] = j[o].x, c._array[q + 1] = j[o].y, c._array[q + 2] = j[o].z;
                Q.uniform3fv(f, c._array)
            } else if ("v4v" === o) {
                for (void 0 === c._array && (c._array = new Float32Array(4 * j.length)), o = 0, p = j.length; p > o; o++) q = 4 * o, c._array[q] = j[o].x, c._array[q + 1] = j[o].y, c._array[q + 2] = j[o].z, c._array[q + 3] = j[o].w;
                Q.uniform4fv(f, c._array)
            } else if ("m4" === o) void 0 === c._array && (c._array = new Float32Array(16)), j.flattenToArray(c._array), Q.uniformMatrix4fv(f, !1, c._array);
            else if ("m4v" === o) {
                for (void 0 === c._array && (c._array = new Float32Array(16 * j.length)), o = 0, p = j.length; p > o; o++) j[o].flattenToArrayOffset(c._array, 16 * o);
                Q.uniformMatrix4fv(f, !1, c._array)
            } else if ("t" === o) {
                if (q = j, j = w(), Q.uniform1i(f, j), q)
                    if (q.image instanceof Array && 6 === q.image.length) {
                        if (c = q, f = j, 6 === c.image.length)
                            if (c.needsUpdate) {
                                for (c.image.__webglTextureCube || (c.image.__webglTextureCube = Q.createTexture(), V.info.memory.textures++), Q.activeTexture(Q.TEXTURE0 + f), Q.bindTexture(Q.TEXTURE_CUBE_MAP, c.image.__webglTextureCube), Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL, c.flipY), f = c instanceof THREE.CompressedTexture, j = [], o = 0; 6 > o; o++) V.autoScaleCubemaps && !f ? (p = j, q = o, r = c.image[o], t = Gb, r.width <= t && r.height <= t || (u = Math.max(r.width, r.height), s = Math.floor(r.width * t / u), t = Math.floor(r.height * t / u), u = document.createElement("canvas"), u.width = s, u.height = t, u.getContext("2d").drawImage(r, 0, 0, r.width, r.height, 0, 0, s, t), r = u), p[q] = r) : j[o] = c.image[o];
                                for (o = j[0], p = 0 === (o.width & o.width - 1) && 0 === (o.height & o.height - 1), q = G(c.format), r = G(c.type), D(Q.TEXTURE_CUBE_MAP, c, p), o = 0; 6 > o; o++)
                                    if (f)
                                        for (t = j[o].mipmaps, u = 0, v = t.length; v > u; u++) s = t[u], Q.compressedTexImage2D(Q.TEXTURE_CUBE_MAP_POSITIVE_X + o, u, q, s.width, s.height, 0, s.data);
                                    else Q.texImage2D(Q.TEXTURE_CUBE_MAP_POSITIVE_X + o, 0, q, q, r, j[o]);
                                c.generateMipmaps && p && Q.generateMipmap(Q.TEXTURE_CUBE_MAP), c.needsUpdate = !1, c.onUpdate && c.onUpdate()
                            } else Q.activeTexture(Q.TEXTURE0 + f), Q.bindTexture(Q.TEXTURE_CUBE_MAP, c.image.__webglTextureCube)
                    } else q instanceof THREE.WebGLRenderTargetCube ? (c = q, Q.activeTexture(Q.TEXTURE0 + j), Q.bindTexture(Q.TEXTURE_CUBE_MAP, c.__webglTexture)) : V.setTexture(q, j)
            } else if ("tv" === o) {
                for (void 0 === c._array && (c._array = []), o = 0, p = c.value.length; p > o; o++) c._array[o] = w();
                for (Q.uniform1iv(f, c._array), o = 0, p = c.value.length; p > o; o++) q = c.value[o], j = c._array[o], q && V.setTexture(q, j)
            }(d instanceof THREE.ShaderMaterial || d instanceof THREE.MeshPhongMaterial || d.envMap) && null !== h.cameraPosition && (zb.getPositionFromMatrix(a.matrixWorld), Q.uniform3f(h.cameraPosition, zb.x, zb.y, zb.z)), (d instanceof THREE.MeshPhongMaterial || d instanceof THREE.MeshLambertMaterial || d instanceof THREE.ShaderMaterial || d.skinning) && null !== h.viewMatrix && Q.uniformMatrix4fv(h.viewMatrix, !1, a.matrixWorldInverse.elements)
        }
        return Q.uniformMatrix4fv(h.modelViewMatrix, !1, e._modelViewMatrix.elements), h.normalMatrix && Q.uniformMatrix3fv(h.normalMatrix, !1, e._normalMatrix.elements), null !== h.modelMatrix && Q.uniformMatrix4fv(h.modelMatrix, !1, e.matrixWorld.elements), g
    }

    function w() {
        var a = cb;
        return a >= Eb && console.warn("WebGLRenderer: trying to use " + a + " texture units while this GPU supports only " + Eb), cb += 1, a
    }

    function x(a, b, c, d) {
        a[b] = c.r * c.r * d, a[b + 1] = c.g * c.g * d, a[b + 2] = c.b * c.b * d
    }

    function y(a, b, c, d) {
        a[b] = c.r * d, a[b + 1] = c.g * d, a[b + 2] = c.b * d
    }

    function z(a) {
        a !== ob && (Q.lineWidth(a), ob = a)
    }

    function A(a, b, c) {
        lb !== a && (a ? Q.enable(Q.POLYGON_OFFSET_FILL) : Q.disable(Q.POLYGON_OFFSET_FILL), lb = a), !a || mb === b && nb === c || (Q.polygonOffset(b, c), mb = b, nb = c)
    }

    function B(a) {
        for (var a = a.split("\n"), b = 0, c = a.length; c > b; b++) a[b] = b + 1 + ": " + a[b];
        return a.join("\n")
    }

    function C(a, b) {
        var c;
        return "fragment" === a ? c = Q.createShader(Q.FRAGMENT_SHADER) : "vertex" === a && (c = Q.createShader(Q.VERTEX_SHADER)), Q.shaderSource(c, b), Q.compileShader(c), Q.getShaderParameter(c, Q.COMPILE_STATUS) ? c : (console.error(Q.getShaderInfoLog(c)), console.error(B(b)), null)
    }

    function D(a, b, c) {
        c ? (Q.texParameteri(a, Q.TEXTURE_WRAP_S, G(b.wrapS)), Q.texParameteri(a, Q.TEXTURE_WRAP_T, G(b.wrapT)), Q.texParameteri(a, Q.TEXTURE_MAG_FILTER, G(b.magFilter)), Q.texParameteri(a, Q.TEXTURE_MIN_FILTER, G(b.minFilter))) : (Q.texParameteri(a, Q.TEXTURE_WRAP_S, Q.CLAMP_TO_EDGE), Q.texParameteri(a, Q.TEXTURE_WRAP_T, Q.CLAMP_TO_EDGE), Q.texParameteri(a, Q.TEXTURE_MAG_FILTER, F(b.magFilter)), Q.texParameteri(a, Q.TEXTURE_MIN_FILTER, F(b.minFilter))), T && b.type !== THREE.FloatType && (1 < b.anisotropy || b.__oldAnisotropy) && (Q.texParameterf(a, T.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, Hb)), b.__oldAnisotropy = b.anisotropy)
    }

    function E(a, b) {
        Q.bindRenderbuffer(Q.RENDERBUFFER, a), b.depthBuffer && !b.stencilBuffer ? (Q.renderbufferStorage(Q.RENDERBUFFER, Q.DEPTH_COMPONENT16, b.width, b.height), Q.framebufferRenderbuffer(Q.FRAMEBUFFER, Q.DEPTH_ATTACHMENT, Q.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (Q.renderbufferStorage(Q.RENDERBUFFER, Q.DEPTH_STENCIL, b.width, b.height), Q.framebufferRenderbuffer(Q.FRAMEBUFFER, Q.DEPTH_STENCIL_ATTACHMENT, Q.RENDERBUFFER, a)) : Q.renderbufferStorage(Q.RENDERBUFFER, Q.RGBA4, b.width, b.height)
    }

    function F(a) {
        return a === THREE.NearestFilter || a === THREE.NearestMipMapNearestFilter || a === THREE.NearestMipMapLinearFilter ? Q.NEAREST : Q.LINEAR
    }

    function G(a) {
        if (a === THREE.RepeatWrapping) return Q.REPEAT;
        if (a === THREE.ClampToEdgeWrapping) return Q.CLAMP_TO_EDGE;
        if (a === THREE.MirroredRepeatWrapping) return Q.MIRRORED_REPEAT;
        if (a === THREE.NearestFilter) return Q.NEAREST;
        if (a === THREE.NearestMipMapNearestFilter) return Q.NEAREST_MIPMAP_NEAREST;
        if (a === THREE.NearestMipMapLinearFilter) return Q.NEAREST_MIPMAP_LINEAR;
        if (a === THREE.LinearFilter) return Q.LINEAR;
        if (a === THREE.LinearMipMapNearestFilter) return Q.LINEAR_MIPMAP_NEAREST;
        if (a === THREE.LinearMipMapLinearFilter) return Q.LINEAR_MIPMAP_LINEAR;
        if (a === THREE.UnsignedByteType) return Q.UNSIGNED_BYTE;
        if (a === THREE.UnsignedShort4444Type) return Q.UNSIGNED_SHORT_4_4_4_4;
        if (a === THREE.UnsignedShort5551Type) return Q.UNSIGNED_SHORT_5_5_5_1;
        if (a === THREE.UnsignedShort565Type) return Q.UNSIGNED_SHORT_5_6_5;
        if (a === THREE.ByteType) return Q.BYTE;
        if (a === THREE.ShortType) return Q.SHORT;
        if (a === THREE.UnsignedShortType) return Q.UNSIGNED_SHORT;
        if (a === THREE.IntType) return Q.INT;
        if (a === THREE.UnsignedIntType) return Q.UNSIGNED_INT;
        if (a === THREE.FloatType) return Q.FLOAT;
        if (a === THREE.AlphaFormat) return Q.ALPHA;
        if (a === THREE.RGBFormat) return Q.RGB;
        if (a === THREE.RGBAFormat) return Q.RGBA;
        if (a === THREE.LuminanceFormat) return Q.LUMINANCE;
        if (a === THREE.LuminanceAlphaFormat) return Q.LUMINANCE_ALPHA;
        if (a === THREE.AddEquation) return Q.FUNC_ADD;
        if (a === THREE.SubtractEquation) return Q.FUNC_SUBTRACT;
        if (a === THREE.ReverseSubtractEquation) return Q.FUNC_REVERSE_SUBTRACT;
        if (a === THREE.ZeroFactor) return Q.ZERO;
        if (a === THREE.OneFactor) return Q.ONE;
        if (a === THREE.SrcColorFactor) return Q.SRC_COLOR;
        if (a === THREE.OneMinusSrcColorFactor) return Q.ONE_MINUS_SRC_COLOR;
        if (a === THREE.SrcAlphaFactor) return Q.SRC_ALPHA;
        if (a === THREE.OneMinusSrcAlphaFactor) return Q.ONE_MINUS_SRC_ALPHA;
        if (a === THREE.DstAlphaFactor) return Q.DST_ALPHA;
        if (a === THREE.OneMinusDstAlphaFactor) return Q.ONE_MINUS_DST_ALPHA;
        if (a === THREE.DstColorFactor) return Q.DST_COLOR;
        if (a === THREE.OneMinusDstColorFactor) return Q.ONE_MINUS_DST_COLOR;
        if (a === THREE.SrcAlphaSaturateFactor) return Q.SRC_ALPHA_SATURATE;
        if (void 0 !== U) {
            if (a === THREE.RGB_S3TC_DXT1_Format) return U.COMPRESSED_RGB_S3TC_DXT1_EXT;
            if (a === THREE.RGBA_S3TC_DXT1_Format) return U.COMPRESSED_RGBA_S3TC_DXT1_EXT;
            if (a === THREE.RGBA_S3TC_DXT3_Format) return U.COMPRESSED_RGBA_S3TC_DXT3_EXT;
            if (a === THREE.RGBA_S3TC_DXT5_Format) return U.COMPRESSED_RGBA_S3TC_DXT5_EXT
        }
        return 0
    }
    console.log("THREE.WebGLRenderer", THREE.REVISION);
    var a = a || {},
        H = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"),
        I = void 0 !== a.precision ? a.precision : "highp",
        J = void 0 !== a.alpha ? a.alpha : !0,
        K = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0,
        L = void 0 !== a.antialias ? a.antialias : !1,
        M = void 0 !== a.stencil ? a.stencil : !0,
        N = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1,
        O = new THREE.Color(0),
        P = 0;
    void 0 !== a.clearColor && (console.warn("DEPRECATED: clearColor in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."), O.setHex(a.clearColor)), void 0 !== a.clearAlpha && (console.warn("DEPRECATED: clearAlpha in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."), P = a.clearAlpha), this.domElement = H, this.context = null, this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio : void 0 !== window.devicePixelRatio ? window.devicePixelRatio : 1, this.autoUpdateObjects = this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0, this.shadowMapEnabled = this.physicallyBasedShading = this.gammaOutput = this.gammaInput = !1, this.shadowMapAutoUpdate = !0, this.shadowMapType = THREE.PCFShadowMap, this.shadowMapCullFace = THREE.CullFaceFront, this.shadowMapCascade = this.shadowMapDebug = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, this.autoScaleCubemaps = !0, this.renderPluginsPre = [], this.renderPluginsPost = [], this.info = {
        memory: {
            programs: 0,
            geometries: 0,
            textures: 0
        },
        render: {
            calls: 0,
            vertices: 0,
            faces: 0,
            points: 0
        }
    };
    var Q, R, S, T, U, V = this,
        W = [],
        X = 0,
        Y = null,
        Z = null,
        $ = -1,
        _ = null,
        ab = null,
        bb = 0,
        cb = 0,
        db = -1,
        eb = -1,
        fb = -1,
        gb = -1,
        hb = -1,
        ib = -1,
        jb = -1,
        kb = -1,
        lb = null,
        mb = null,
        nb = null,
        ob = null,
        pb = 0,
        qb = 0,
        rb = 0,
        sb = 0,
        tb = 0,
        ub = 0,
        vb = {},
        wb = new THREE.Frustum,
        xb = new THREE.Matrix4,
        yb = new THREE.Matrix4,
        zb = new THREE.Vector3,
        Ab = new THREE.Vector3,
        Bb = !0,
        Cb = {
            ambient: [0, 0, 0],
            directional: {
                length: 0,
                colors: [],
                positions: []
            },
            point: {
                length: 0,
                colors: [],
                positions: [],
                distances: []
            },
            spot: {
                length: 0,
                colors: [],
                positions: [],
                distances: [],
                directions: [],
                anglesCos: [],
                exponents: []
            },
            hemi: {
                length: 0,
                skyColors: [],
                groundColors: [],
                positions: []
            }
        };
    try {
        if (!(Q = H.getContext("experimental-webgl", {
            alpha: J,
            premultipliedAlpha: K,
            antialias: L,
            stencil: M,
            preserveDrawingBuffer: N
        }))) throw "Error creating WebGL context."
    } catch (Db) {
        console.error(Db)
    }
    R = Q.getExtension("OES_texture_float"), S = Q.getExtension("OES_standard_derivatives"), T = Q.getExtension("EXT_texture_filter_anisotropic") || Q.getExtension("MOZ_EXT_texture_filter_anisotropic") || Q.getExtension("WEBKIT_EXT_texture_filter_anisotropic"), U = Q.getExtension("WEBGL_compressed_texture_s3tc") || Q.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || Q.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"), R || console.log("THREE.WebGLRenderer: Float textures not supported."), S || console.log("THREE.WebGLRenderer: Standard derivatives not supported."), T || console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported."), U || console.log("THREE.WebGLRenderer: S3TC compressed textures not supported."), void 0 === Q.getShaderPrecisionFormat && (Q.getShaderPrecisionFormat = function () {
        return {
            rangeMin: 1,
            rangeMax: 1,
            precision: 1
        }
    }), Q.clearColor(0, 0, 0, 1), Q.clearDepth(1), Q.clearStencil(0), Q.enable(Q.DEPTH_TEST), Q.depthFunc(Q.LEQUAL), Q.frontFace(Q.CCW), Q.cullFace(Q.BACK), Q.enable(Q.CULL_FACE), Q.enable(Q.BLEND), Q.blendEquation(Q.FUNC_ADD), Q.blendFunc(Q.SRC_ALPHA, Q.ONE_MINUS_SRC_ALPHA), Q.clearColor(O.r, O.g, O.b, P), this.context = Q;
    var Eb = Q.getParameter(Q.MAX_TEXTURE_IMAGE_UNITS),
        Fb = Q.getParameter(Q.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
    Q.getParameter(Q.MAX_TEXTURE_SIZE);
    var Gb = Q.getParameter(Q.MAX_CUBE_MAP_TEXTURE_SIZE),
        Hb = T ? Q.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0,
        Ib = Fb > 0,
        Jb = Ib && R;
    U && Q.getParameter(Q.COMPRESSED_TEXTURE_FORMATS);
    var Kb = Q.getShaderPrecisionFormat(Q.VERTEX_SHADER, Q.HIGH_FLOAT),
        Lb = Q.getShaderPrecisionFormat(Q.VERTEX_SHADER, Q.MEDIUM_FLOAT);
    Q.getShaderPrecisionFormat(Q.VERTEX_SHADER, Q.LOW_FLOAT);
    var Mb = Q.getShaderPrecisionFormat(Q.FRAGMENT_SHADER, Q.HIGH_FLOAT),
        Nb = Q.getShaderPrecisionFormat(Q.FRAGMENT_SHADER, Q.MEDIUM_FLOAT);
    Q.getShaderPrecisionFormat(Q.FRAGMENT_SHADER, Q.LOW_FLOAT), Q.getShaderPrecisionFormat(Q.VERTEX_SHADER, Q.HIGH_INT), Q.getShaderPrecisionFormat(Q.VERTEX_SHADER, Q.MEDIUM_INT), Q.getShaderPrecisionFormat(Q.VERTEX_SHADER, Q.LOW_INT), Q.getShaderPrecisionFormat(Q.FRAGMENT_SHADER, Q.HIGH_INT), Q.getShaderPrecisionFormat(Q.FRAGMENT_SHADER, Q.MEDIUM_INT), Q.getShaderPrecisionFormat(Q.FRAGMENT_SHADER, Q.LOW_INT);
    var Ob = 0 < Kb.precision && 0 < Mb.precision,
        Pb = 0 < Lb.precision && 0 < Nb.precision;
    "highp" === I && !Ob && (Pb ? (I = "mediump", console.warn("WebGLRenderer: highp not supported, using mediump")) : (I = "lowp", console.warn("WebGLRenderer: highp and mediump not supported, using lowp"))), "mediump" === I && !Pb && (I = "lowp", console.warn("WebGLRenderer: mediump not supported, using lowp")), this.getContext = function () {
        return Q
    }, this.supportsVertexTextures = function () {
        return Ib
    }, this.supportsFloatTextures = function () {
        return R
    }, this.supportsStandardDerivatives = function () {
        return S
    }, this.supportsCompressedTextureS3TC = function () {
        return U
    }, this.getMaxAnisotropy = function () {
        return Hb
    }, this.getPrecision = function () {
        return I
    }, this.setSize = function (a, b, c) {
        H.width = a * this.devicePixelRatio, H.height = b * this.devicePixelRatio, 1 !== this.devicePixelRatio && !1 !== c && (H.style.width = a + "px", H.style.height = b + "px"), this.setViewport(0, 0, H.width, H.height)
    }, this.setViewport = function (a, b, c, d) {
        pb = void 0 !== a ? a : 0, qb = void 0 !== b ? b : 0, rb = void 0 !== c ? c : H.width, sb = void 0 !== d ? d : H.height, Q.viewport(pb, qb, rb, sb)
    }, this.setScissor = function (a, b, c, d) {
        Q.scissor(a, b, c, d)
    }, this.enableScissorTest = function (a) {
        a ? Q.enable(Q.SCISSOR_TEST) : Q.disable(Q.SCISSOR_TEST)
    }, this.setClearColor = function (a, b) {
        O.set(a), P = void 0 !== b ? b : 1, Q.clearColor(O.r, O.g, O.b, P)
    }, this.setClearColorHex = function (a, b) {
        console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead."), this.setClearColor(a, b)
    }, this.getClearColor = function () {
        return O
    }, this.getClearAlpha = function () {
        return P
    }, this.clear = function (a, b, c) {
        var d = 0;
        (void 0 === a || a) && (d |= Q.COLOR_BUFFER_BIT), (void 0 === b || b) && (d |= Q.DEPTH_BUFFER_BIT), (void 0 === c || c) && (d |= Q.STENCIL_BUFFER_BIT), Q.clear(d)
    }, this.clearTarget = function (a, b, c, d) {
        this.setRenderTarget(a), this.clear(b, c, d)
    }, this.addPostPlugin = function (a) {
        a.init(this), this.renderPluginsPost.push(a)
    }, this.addPrePlugin = function (a) {
        a.init(this), this.renderPluginsPre.push(a)
    }, this.updateShadowMap = function (a, b) {
        Y = null, $ = _ = kb = jb = fb = -1, Bb = !0, eb = db = -1, this.shadowMapPlugin.update(a, b)
    };
    var Qb = function (a) {
            if (a = a.target, a.removeEventListener("dispose", Qb), a.__webglInit = void 0, void 0 !== a.__webglVertexBuffer && Q.deleteBuffer(a.__webglVertexBuffer), void 0 !== a.__webglNormalBuffer && Q.deleteBuffer(a.__webglNormalBuffer), void 0 !== a.__webglTangentBuffer && Q.deleteBuffer(a.__webglTangentBuffer), void 0 !== a.__webglColorBuffer && Q.deleteBuffer(a.__webglColorBuffer), void 0 !== a.__webglUVBuffer && Q.deleteBuffer(a.__webglUVBuffer), void 0 !== a.__webglUV2Buffer && Q.deleteBuffer(a.__webglUV2Buffer), void 0 !== a.__webglSkinIndicesBuffer && Q.deleteBuffer(a.__webglSkinIndicesBuffer), void 0 !== a.__webglSkinWeightsBuffer && Q.deleteBuffer(a.__webglSkinWeightsBuffer), void 0 !== a.__webglFaceBuffer && Q.deleteBuffer(a.__webglFaceBuffer), void 0 !== a.__webglLineBuffer && Q.deleteBuffer(a.__webglLineBuffer), void 0 !== a.__webglLineDistanceBuffer && Q.deleteBuffer(a.__webglLineDistanceBuffer), void 0 !== a.geometryGroups)
                for (var c in a.geometryGroups) {
                    var d = a.geometryGroups[c];
                    if (void 0 !== d.numMorphTargets)
                        for (var e = 0, f = d.numMorphTargets; f > e; e++) Q.deleteBuffer(d.__webglMorphTargetsBuffers[e]);
                    if (void 0 !== d.numMorphNormals)
                        for (e = 0, f = d.numMorphNormals; f > e; e++) Q.deleteBuffer(d.__webglMorphNormalsBuffers[e]);
                    b(d)
                }
            b(a), V.info.memory.geometries--
        },
        Rb = function (a) {
            a = a.target, a.removeEventListener("dispose", Rb), a.image && a.image.__webglTextureCube ? Q.deleteTexture(a.image.__webglTextureCube) : a.__webglInit && (a.__webglInit = !1, Q.deleteTexture(a.__webglTexture)), V.info.memory.textures--
        },
        Sb = function (a) {
            if (a = a.target, a.removeEventListener("dispose", Sb), a && a.__webglTexture)
                if (Q.deleteTexture(a.__webglTexture), a instanceof THREE.WebGLRenderTargetCube)
                    for (var b = 0; 6 > b; b++) Q.deleteFramebuffer(a.__webglFramebuffer[b]), Q.deleteRenderbuffer(a.__webglRenderbuffer[b]);
                else Q.deleteFramebuffer(a.__webglFramebuffer), Q.deleteRenderbuffer(a.__webglRenderbuffer);
            V.info.memory.textures--
        },
        Tb = function (a) {
            a = a.target, a.removeEventListener("dispose", Tb), Ub(a)
        },
        Ub = function (a) {
            var b = a.program;
            if (void 0 !== b) {
                a.program = void 0;
                var c, d, e = !1,
                    a = 0;
                for (c = W.length; c > a; a++)
                    if (d = W[a], d.program === b) {
                        d.usedTimes--, 0 === d.usedTimes && (e = !0);
                        break
                    }
                if (!0 === e) {
                    for (e = [], a = 0, c = W.length; c > a; a++) d = W[a], d.program !== b && e.push(d);
                    W = e, Q.deleteProgram(b), V.info.memory.programs--
                }
            }
        };
    this.renderBufferImmediate = function (a, b, c) {
        if (a.hasPositions && !a.__webglVertexBuffer && (a.__webglVertexBuffer = Q.createBuffer()), a.hasNormals && !a.__webglNormalBuffer && (a.__webglNormalBuffer = Q.createBuffer()), a.hasUvs && !a.__webglUvBuffer && (a.__webglUvBuffer = Q.createBuffer()), a.hasColors && !a.__webglColorBuffer && (a.__webglColorBuffer = Q.createBuffer()), a.hasPositions && (Q.bindBuffer(Q.ARRAY_BUFFER, a.__webglVertexBuffer), Q.bufferData(Q.ARRAY_BUFFER, a.positionArray, Q.DYNAMIC_DRAW), Q.enableVertexAttribArray(b.attributes.position), Q.vertexAttribPointer(b.attributes.position, 3, Q.FLOAT, !1, 0, 0)), a.hasNormals) {
            if (Q.bindBuffer(Q.ARRAY_BUFFER, a.__webglNormalBuffer), c.shading === THREE.FlatShading) {
                var d, e, f, g, h, i, j, k, l, m, n, o = 3 * a.count;
                for (n = 0; o > n; n += 9) m = a.normalArray, d = m[n], e = m[n + 1], f = m[n + 2], g = m[n + 3], i = m[n + 4], k = m[n + 5], h = m[n + 6], j = m[n + 7], l = m[n + 8], d = (d + g + h) / 3, e = (e + i + j) / 3, f = (f + k + l) / 3, m[n] = d, m[n + 1] = e, m[n + 2] = f, m[n + 3] = d, m[n + 4] = e, m[n + 5] = f, m[n + 6] = d, m[n + 7] = e, m[n + 8] = f
            }
            Q.bufferData(Q.ARRAY_BUFFER, a.normalArray, Q.DYNAMIC_DRAW), Q.enableVertexAttribArray(b.attributes.normal), Q.vertexAttribPointer(b.attributes.normal, 3, Q.FLOAT, !1, 0, 0)
        }
        a.hasUvs && c.map && (Q.bindBuffer(Q.ARRAY_BUFFER, a.__webglUvBuffer), Q.bufferData(Q.ARRAY_BUFFER, a.uvArray, Q.DYNAMIC_DRAW), Q.enableVertexAttribArray(b.attributes.uv), Q.vertexAttribPointer(b.attributes.uv, 2, Q.FLOAT, !1, 0, 0)), a.hasColors && c.vertexColors !== THREE.NoColors && (Q.bindBuffer(Q.ARRAY_BUFFER, a.__webglColorBuffer), Q.bufferData(Q.ARRAY_BUFFER, a.colorArray, Q.DYNAMIC_DRAW), Q.enableVertexAttribArray(b.attributes.color), Q.vertexAttribPointer(b.attributes.color, 3, Q.FLOAT, !1, 0, 0)), Q.drawArrays(Q.TRIANGLES, 0, a.count), a.count = 0
    }, this.renderBufferDirect = function (a, b, c, d, e, f) {
        if (!1 !== d.visible) {
            var g, j, k;
            if (g = v(a, b, c, d, f), a = g.attributes, b = e.attributes, c = !1, g = 16777215 * e.id + 2 * g.id + (d.wireframe ? 1 : 0), g !== _ && (_ = g, c = !0), c && i(), f instanceof THREE.Mesh)
                if (d = b.index) {
                    e = e.offsets, 1 < e.length && (c = !0);
                    for (var l = 0, m = e.length; m > l; l++) {
                        var n = e[l].index;
                        if (c) {
                            for (j in b) "index" !== j && (g = a[j], f = b[j], k = f.itemSize, g >= 0 && (Q.bindBuffer(Q.ARRAY_BUFFER, f.buffer), h(g), Q.vertexAttribPointer(g, k, Q.FLOAT, !1, 0, 4 * n * k)));
                            Q.bindBuffer(Q.ELEMENT_ARRAY_BUFFER, d.buffer)
                        }
                        Q.drawElements(Q.TRIANGLES, e[l].count, Q.UNSIGNED_SHORT, 2 * e[l].start), V.info.render.calls++, V.info.render.vertices += e[l].count, V.info.render.faces += e[l].count / 3
                    }
                } else {
                    if (c)
                        for (j in b) "index" !== j && (g = a[j], f = b[j], k = f.itemSize, g >= 0 && (Q.bindBuffer(Q.ARRAY_BUFFER, f.buffer), h(g), Q.vertexAttribPointer(g, k, Q.FLOAT, !1, 0, 0)));
                    j = e.attributes.position, Q.drawArrays(Q.TRIANGLES, 0, j.numItems / 3), V.info.render.calls++, V.info.render.vertices += j.numItems / 3, V.info.render.faces += j.numItems / 3 / 3
                } else if (f instanceof THREE.ParticleSystem) {
                if (c) {
                    for (j in b) g = a[j], f = b[j], k = f.itemSize, g >= 0 && (Q.bindBuffer(Q.ARRAY_BUFFER, f.buffer), h(g), Q.vertexAttribPointer(g, k, Q.FLOAT, !1, 0, 0));
                    j = b.position, Q.drawArrays(Q.POINTS, 0, j.numItems / 3), V.info.render.calls++, V.info.render.points += j.numItems / 3
                }
            } else if (f instanceof THREE.Line && c) {
                for (j in b) g = a[j], f = b[j], k = f.itemSize, g >= 0 && (Q.bindBuffer(Q.ARRAY_BUFFER, f.buffer), h(g), Q.vertexAttribPointer(g, k, Q.FLOAT, !1, 0, 0));
                z(d.linewidth), j = b.position, Q.drawArrays(Q.LINE_STRIP, 0, j.numItems / 3), V.info.render.calls++, V.info.render.points += j.numItems
            }
        }
    }, this.renderBuffer = function (a, b, c, d, e, f) {
        if (!1 !== d.visible) {
            var g, j, c = v(a, b, c, d, f),
                a = c.attributes,
                b = !1,
                c = 16777215 * e.id + 2 * c.id + (d.wireframe ? 1 : 0);
            if (c !== _ && (_ = c, b = !0), b && i(), !d.morphTargets && 0 <= a.position) b && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglVertexBuffer), h(a.position), Q.vertexAttribPointer(a.position, 3, Q.FLOAT, !1, 0, 0));
            else if (f.morphTargetBase) {
                if (c = d.program.attributes, -1 !== f.morphTargetBase && 0 <= c.position ? (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[f.morphTargetBase]), h(c.position), Q.vertexAttribPointer(c.position, 3, Q.FLOAT, !1, 0, 0)) : 0 <= c.position && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglVertexBuffer), h(c.position), Q.vertexAttribPointer(c.position, 3, Q.FLOAT, !1, 0, 0)), f.morphTargetForcedOrder.length) {
                    var l = 0;
                    for (j = f.morphTargetForcedOrder, g = f.morphTargetInfluences; l < d.numSupportedMorphTargets && l < j.length;) 0 <= c["morphTarget" + l] && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[j[l]]), h(c["morphTarget" + l]), Q.vertexAttribPointer(c["morphTarget" + l], 3, Q.FLOAT, !1, 0, 0)), 0 <= c["morphNormal" + l] && d.morphNormals && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[j[l]]), h(c["morphNormal" + l]), Q.vertexAttribPointer(c["morphNormal" + l], 3, Q.FLOAT, !1, 0, 0)), f.__webglMorphTargetInfluences[l] = g[j[l]], l++
                } else {
                    j = [], g = f.morphTargetInfluences;
                    var m, n = g.length;
                    for (m = 0; n > m; m++) l = g[m], l > 0 && j.push([l, m]);
                    for (j.length > d.numSupportedMorphTargets ? (j.sort(k), j.length = d.numSupportedMorphTargets) : j.length > d.numSupportedMorphNormals ? j.sort(k) : 0 === j.length && j.push([0, 0]), l = 0; l < d.numSupportedMorphTargets;) j[l] ? (m = j[l][1], 0 <= c["morphTarget" + l] && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[m]), h(c["morphTarget" + l]), Q.vertexAttribPointer(c["morphTarget" + l], 3, Q.FLOAT, !1, 0, 0)), 0 <= c["morphNormal" + l] && d.morphNormals && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[m]), h(c["morphNormal" + l]), Q.vertexAttribPointer(c["morphNormal" + l], 3, Q.FLOAT, !1, 0, 0)), f.__webglMorphTargetInfluences[l] = g[m]) : f.__webglMorphTargetInfluences[l] = 0, l++
                }
                null !== d.program.uniforms.morphTargetInfluences && Q.uniform1fv(d.program.uniforms.morphTargetInfluences, f.__webglMorphTargetInfluences)
            }
            if (b) {
                if (e.__webglCustomAttributesList)
                    for (g = 0, j = e.__webglCustomAttributesList.length; j > g; g++) c = e.__webglCustomAttributesList[g], 0 <= a[c.buffer.belongsToAttribute] && (Q.bindBuffer(Q.ARRAY_BUFFER, c.buffer), h(a[c.buffer.belongsToAttribute]), Q.vertexAttribPointer(a[c.buffer.belongsToAttribute], c.size, Q.FLOAT, !1, 0, 0));
                0 <= a.color && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglColorBuffer), h(a.color), Q.vertexAttribPointer(a.color, 3, Q.FLOAT, !1, 0, 0)), 0 <= a.normal && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglNormalBuffer), h(a.normal), Q.vertexAttribPointer(a.normal, 3, Q.FLOAT, !1, 0, 0)), 0 <= a.tangent && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglTangentBuffer), h(a.tangent), Q.vertexAttribPointer(a.tangent, 4, Q.FLOAT, !1, 0, 0)), 0 <= a.uv && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglUVBuffer), h(a.uv), Q.vertexAttribPointer(a.uv, 2, Q.FLOAT, !1, 0, 0)), 0 <= a.uv2 && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglUV2Buffer), h(a.uv2), Q.vertexAttribPointer(a.uv2, 2, Q.FLOAT, !1, 0, 0)), d.skinning && 0 <= a.skinIndex && 0 <= a.skinWeight && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), h(a.skinIndex), Q.vertexAttribPointer(a.skinIndex, 4, Q.FLOAT, !1, 0, 0), Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), h(a.skinWeight), Q.vertexAttribPointer(a.skinWeight, 4, Q.FLOAT, !1, 0, 0)), 0 <= a.lineDistance && (Q.bindBuffer(Q.ARRAY_BUFFER, e.__webglLineDistanceBuffer), h(a.lineDistance), Q.vertexAttribPointer(a.lineDistance, 1, Q.FLOAT, !1, 0, 0))
            }
            f instanceof THREE.Mesh ? (d.wireframe ? (z(d.wireframeLinewidth), b && Q.bindBuffer(Q.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), Q.drawElements(Q.LINES, e.__webglLineCount, Q.UNSIGNED_SHORT, 0)) : (b && Q.bindBuffer(Q.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), Q.drawElements(Q.TRIANGLES, e.__webglFaceCount, Q.UNSIGNED_SHORT, 0)), V.info.render.calls++, V.info.render.vertices += e.__webglFaceCount, V.info.render.faces += e.__webglFaceCount / 3) : f instanceof THREE.Line ? (f = f.type === THREE.LineStrip ? Q.LINE_STRIP : Q.LINES, z(d.linewidth), Q.drawArrays(f, 0, e.__webglLineCount), V.info.render.calls++) : f instanceof THREE.ParticleSystem ? (Q.drawArrays(Q.POINTS, 0, e.__webglParticleCount), V.info.render.calls++, V.info.render.points += e.__webglParticleCount) : f instanceof THREE.Ribbon && (Q.drawArrays(Q.TRIANGLE_STRIP, 0, e.__webglVertexCount), V.info.render.calls++)
        }
    }, this.render = function (a, b, c, d) {
        if (!1 == b instanceof THREE.Camera) console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        else {
            var e, f, g, h, i = a.__lights,
                k = a.fog;
            for ($ = -1, Bb = !0, !0 === a.autoUpdate && a.updateMatrixWorld(), void 0 === b.parent && b.updateMatrixWorld(), b.matrixWorldInverse.getInverse(b.matrixWorld), xb.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse), wb.setFromMatrix(xb), this.autoUpdateObjects && this.initWebGLObjects(a), l(this.renderPluginsPre, a, b), V.info.render.calls = 0, V.info.render.vertices = 0, V.info.render.faces = 0, V.info.render.points = 0, this.setRenderTarget(c), (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), h = a.__webglObjects, d = 0, e = h.length; e > d; d++)
                if (f = h[d], g = f.object, f.id = d, f.render = !1, g.visible && (!(g instanceof THREE.Mesh || g instanceof THREE.ParticleSystem) || !g.frustumCulled || wb.intersectsObject(g))) {
                    var o = g;
                    o._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, o.matrixWorld), o._normalMatrix.getNormalMatrix(o._modelViewMatrix);
                    var o = f,
                        p = o.buffer,
                        q = void 0,
                        r = q = void 0,
                        r = o.object.material;
                    r instanceof THREE.MeshFaceMaterial ? (q = p.materialIndex, q = r.materials[q], q.transparent ? (o.transparent = q, o.opaque = null) : (o.opaque = q, o.transparent = null)) : (q = r) && (q.transparent ? (o.transparent = q, o.opaque = null) : (o.opaque = q, o.transparent = null)), f.render = !0, !0 === this.sortObjects && (null !== g.renderDepth ? f.z = g.renderDepth : (zb.getPositionFromMatrix(g.matrixWorld), zb.applyProjection(xb), f.z = zb.z))
                }
            for (this.sortObjects && h.sort(j), h = a.__webglObjectsImmediate, d = 0, e = h.length; e > d; d++) f = h[d], g = f.object, g.visible && (g._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, g.matrixWorld), g._normalMatrix.getNormalMatrix(g._modelViewMatrix), g = f.object.material, g.transparent ? (f.transparent = g, f.opaque = null) : (f.opaque = g, f.transparent = null));
            a.overrideMaterial ? (d = a.overrideMaterial, this.setBlending(d.blending, d.blendEquation, d.blendSrc, d.blendDst), this.setDepthTest(d.depthTest), this.setDepthWrite(d.depthWrite), A(d.polygonOffset, d.polygonOffsetFactor, d.polygonOffsetUnits), m(a.__webglObjects, !1, "", b, i, k, !0, d), n(a.__webglObjectsImmediate, "", b, i, k, !1, d)) : (d = null, this.setBlending(THREE.NoBlending), m(a.__webglObjects, !0, "opaque", b, i, k, !1, d), n(a.__webglObjectsImmediate, "opaque", b, i, k, !1, d), m(a.__webglObjects, !1, "transparent", b, i, k, !0, d), n(a.__webglObjectsImmediate, "transparent", b, i, k, !0, d)), l(this.renderPluginsPost, a, b), c && c.generateMipmaps && c.minFilter !== THREE.NearestFilter && c.minFilter !== THREE.LinearFilter && (c instanceof THREE.WebGLRenderTargetCube ? (Q.bindTexture(Q.TEXTURE_CUBE_MAP, c.__webglTexture), Q.generateMipmap(Q.TEXTURE_CUBE_MAP), Q.bindTexture(Q.TEXTURE_CUBE_MAP, null)) : (Q.bindTexture(Q.TEXTURE_2D, c.__webglTexture), Q.generateMipmap(Q.TEXTURE_2D), Q.bindTexture(Q.TEXTURE_2D, null))), this.setDepthTest(!0), this.setDepthWrite(!0)
        }
    }, this.renderImmediateObject = function (a, b, c, d, e) {
        var f = v(a, b, c, d, e);
        _ = -1, V.setMaterialFaces(d), e.immediateRenderCallback ? e.immediateRenderCallback(f, Q, wb) : e.render(function (a) {
            V.renderBufferImmediate(a, f, d)
        })
    }, this.initWebGLObjects = function (a) {
        for (a.__webglObjects || (a.__webglObjects = [], a.__webglObjectsImmediate = [], a.__webglSprites = [], a.__webglFlares = []); a.__objectsAdded.length;) o(a.__objectsAdded[0], a), a.__objectsAdded.splice(0, 1);
        for (; a.__objectsRemoved.length;) s(a.__objectsRemoved[0], a), a.__objectsRemoved.splice(0, 1);
        for (var b = 0, c = a.__webglObjects.length; c > b; b++) {
            var h = a.__webglObjects[b].object;
            void 0 === h.__webglInit && (void 0 !== h.__webglActive && s(h, a), o(h, a));
            var i = h,
                j = i.geometry,
                l = void 0,
                m = void 0,
                n = void 0;
            if (j instanceof THREE.BufferGeometry) {
                var p = Q.DYNAMIC_DRAW,
                    t = !j.dynamic,
                    u = j.attributes,
                    v = void 0,
                    w = void 0;
                for (v in u) w = u[v], w.needsUpdate && ("index" === v ? (Q.bindBuffer(Q.ELEMENT_ARRAY_BUFFER, w.buffer), Q.bufferData(Q.ELEMENT_ARRAY_BUFFER, w.array, p)) : (Q.bindBuffer(Q.ARRAY_BUFFER, w.buffer), Q.bufferData(Q.ARRAY_BUFFER, w.array, p)), w.needsUpdate = !1), t && !w.dynamic && delete w.array
            } else if (i instanceof THREE.Mesh) {
                for (var x = 0, y = j.geometryGroupsList.length; y > x; x++)
                    if (l = j.geometryGroupsList[x], n = e(i, l), j.buffersNeedUpdate && d(l, i), m = n.attributes && q(n), j.verticesNeedUpdate || j.morphTargetsNeedUpdate || j.elementsNeedUpdate || j.uvsNeedUpdate || j.normalsNeedUpdate || j.colorsNeedUpdate || j.tangentsNeedUpdate || m) {
                        var z = l,
                            A = i,
                            B = Q.DYNAMIC_DRAW,
                            C = !j.dynamic,
                            D = n;
                        if (z.__inittedArrays) {
                            var E = f(D),
                                F = D.vertexColors ? D.vertexColors : !1,
                                G = g(D),
                                H = E === THREE.SmoothShading,
                                I = void 0,
                                J = void 0,
                                K = void 0,
                                L = void 0,
                                M = void 0,
                                N = void 0,
                                O = void 0,
                                P = void 0,
                                R = void 0,
                                S = void 0,
                                T = void 0,
                                U = void 0,
                                V = void 0,
                                W = void 0,
                                X = void 0,
                                Y = void 0,
                                Z = void 0,
                                $ = void 0,
                                _ = void 0,
                                ab = void 0,
                                bb = void 0,
                                cb = void 0,
                                db = void 0,
                                eb = void 0,
                                fb = void 0,
                                gb = void 0,
                                hb = void 0,
                                ib = void 0,
                                jb = void 0,
                                kb = void 0,
                                lb = void 0,
                                mb = void 0,
                                nb = void 0,
                                ob = void 0,
                                pb = void 0,
                                qb = void 0,
                                rb = void 0,
                                sb = void 0,
                                tb = void 0,
                                ub = void 0,
                                vb = void 0,
                                wb = void 0,
                                Ab = void 0,
                                Bb = void 0,
                                Cb = void 0,
                                Db = void 0,
                                Eb = 0,
                                Fb = 0,
                                Gb = 0,
                                Hb = 0,
                                Ib = 0,
                                Jb = 0,
                                Kb = 0,
                                Lb = 0,
                                Mb = 0,
                                Nb = 0,
                                Ob = 0,
                                Pb = 0,
                                Qb = void 0,
                                Rb = z.__vertexArray,
                                Sb = z.__uvArray,
                                Tb = z.__uv2Array,
                                Ub = z.__normalArray,
                                Vb = z.__tangentArray,
                                Wb = z.__colorArray,
                                Xb = z.__skinIndexArray,
                                Yb = z.__skinWeightArray,
                                Zb = z.__morphTargetsArrays,
                                $b = z.__morphNormalsArrays,
                                _b = z.__webglCustomAttributesList,
                                ac = void 0,
                                bc = z.__faceArray,
                                cc = z.__lineArray,
                                dc = A.geometry,
                                ec = dc.elementsNeedUpdate,
                                fc = dc.uvsNeedUpdate,
                                gc = dc.normalsNeedUpdate,
                                hc = dc.tangentsNeedUpdate,
                                ic = dc.colorsNeedUpdate,
                                jc = dc.morphTargetsNeedUpdate,
                                kc = dc.vertices,
                                lc = z.faces3,
                                mc = z.faces4,
                                nc = dc.faces,
                                oc = dc.faceVertexUvs[0],
                                pc = dc.faceVertexUvs[1],
                                qc = dc.skinIndices,
                                rc = dc.skinWeights,
                                sc = dc.morphTargets,
                                tc = dc.morphNormals;
                            if (dc.verticesNeedUpdate) {
                                for (I = 0, J = lc.length; J > I; I++) L = nc[lc[I]], U = kc[L.a], V = kc[L.b], W = kc[L.c], Rb[Fb] = U.x, Rb[Fb + 1] = U.y, Rb[Fb + 2] = U.z, Rb[Fb + 3] = V.x, Rb[Fb + 4] = V.y, Rb[Fb + 5] = V.z, Rb[Fb + 6] = W.x, Rb[Fb + 7] = W.y, Rb[Fb + 8] = W.z, Fb += 9;
                                for (I = 0, J = mc.length; J > I; I++) L = nc[mc[I]], U = kc[L.a], V = kc[L.b], W = kc[L.c], X = kc[L.d], Rb[Fb] = U.x, Rb[Fb + 1] = U.y, Rb[Fb + 2] = U.z, Rb[Fb + 3] = V.x, Rb[Fb + 4] = V.y, Rb[Fb + 5] = V.z, Rb[Fb + 6] = W.x, Rb[Fb + 7] = W.y, Rb[Fb + 8] = W.z, Rb[Fb + 9] = X.x, Rb[Fb + 10] = X.y, Rb[Fb + 11] = X.z, Fb += 12;
                                Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglVertexBuffer), Q.bufferData(Q.ARRAY_BUFFER, Rb, B)
                            }
                            if (jc)
                                for (vb = 0, wb = sc.length; wb > vb; vb++) {
                                    for (I = Ob = 0, J = lc.length; J > I; I++) Cb = lc[I], L = nc[Cb], U = sc[vb].vertices[L.a], V = sc[vb].vertices[L.b], W = sc[vb].vertices[L.c], Ab = Zb[vb], Ab[Ob] = U.x, Ab[Ob + 1] = U.y, Ab[Ob + 2] = U.z, Ab[Ob + 3] = V.x, Ab[Ob + 4] = V.y, Ab[Ob + 5] = V.z, Ab[Ob + 6] = W.x, Ab[Ob + 7] = W.y, Ab[Ob + 8] = W.z, D.morphNormals && (H ? (Db = tc[vb].vertexNormals[Cb], ab = Db.a, bb = Db.b, cb = Db.c) : cb = bb = ab = tc[vb].faceNormals[Cb], Bb = $b[vb], Bb[Ob] = ab.x, Bb[Ob + 1] = ab.y, Bb[Ob + 2] = ab.z, Bb[Ob + 3] = bb.x, Bb[Ob + 4] = bb.y, Bb[Ob + 5] = bb.z, Bb[Ob + 6] = cb.x, Bb[Ob + 7] = cb.y, Bb[Ob + 8] = cb.z), Ob += 9;
                                    for (I = 0, J = mc.length; J > I; I++) Cb = mc[I], L = nc[Cb], U = sc[vb].vertices[L.a], V = sc[vb].vertices[L.b], W = sc[vb].vertices[L.c], X = sc[vb].vertices[L.d], Ab = Zb[vb], Ab[Ob] = U.x, Ab[Ob + 1] = U.y, Ab[Ob + 2] = U.z, Ab[Ob + 3] = V.x, Ab[Ob + 4] = V.y, Ab[Ob + 5] = V.z, Ab[Ob + 6] = W.x, Ab[Ob + 7] = W.y, Ab[Ob + 8] = W.z, Ab[Ob + 9] = X.x, Ab[Ob + 10] = X.y, Ab[Ob + 11] = X.z, D.morphNormals && (H ? (Db = tc[vb].vertexNormals[Cb], ab = Db.a, bb = Db.b, cb = Db.c, db = Db.d) : db = cb = bb = ab = tc[vb].faceNormals[Cb], Bb = $b[vb], Bb[Ob] = ab.x, Bb[Ob + 1] = ab.y, Bb[Ob + 2] = ab.z, Bb[Ob + 3] = bb.x, Bb[Ob + 4] = bb.y, Bb[Ob + 5] = bb.z, Bb[Ob + 6] = cb.x, Bb[Ob + 7] = cb.y, Bb[Ob + 8] = cb.z, Bb[Ob + 9] = db.x, Bb[Ob + 10] = db.y, Bb[Ob + 11] = db.z), Ob += 12;
                                    Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglMorphTargetsBuffers[vb]), Q.bufferData(Q.ARRAY_BUFFER, Zb[vb], B), D.morphNormals && (Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglMorphNormalsBuffers[vb]), Q.bufferData(Q.ARRAY_BUFFER, $b[vb], B))
                                }
                            if (rc.length) {
                                for (I = 0, J = lc.length; J > I; I++) L = nc[lc[I]], ib = rc[L.a], jb = rc[L.b], kb = rc[L.c], Yb[Nb] = ib.x, Yb[Nb + 1] = ib.y, Yb[Nb + 2] = ib.z, Yb[Nb + 3] = ib.w, Yb[Nb + 4] = jb.x, Yb[Nb + 5] = jb.y, Yb[Nb + 6] = jb.z, Yb[Nb + 7] = jb.w, Yb[Nb + 8] = kb.x, Yb[Nb + 9] = kb.y, Yb[Nb + 10] = kb.z, Yb[Nb + 11] = kb.w, mb = qc[L.a], nb = qc[L.b], ob = qc[L.c], Xb[Nb] = mb.x, Xb[Nb + 1] = mb.y, Xb[Nb + 2] = mb.z, Xb[Nb + 3] = mb.w, Xb[Nb + 4] = nb.x, Xb[Nb + 5] = nb.y, Xb[Nb + 6] = nb.z, Xb[Nb + 7] = nb.w, Xb[Nb + 8] = ob.x, Xb[Nb + 9] = ob.y, Xb[Nb + 10] = ob.z, Xb[Nb + 11] = ob.w, Nb += 12;
                                for (I = 0, J = mc.length; J > I; I++) L = nc[mc[I]], ib = rc[L.a], jb = rc[L.b], kb = rc[L.c], lb = rc[L.d], Yb[Nb] = ib.x, Yb[Nb + 1] = ib.y, Yb[Nb + 2] = ib.z, Yb[Nb + 3] = ib.w, Yb[Nb + 4] = jb.x, Yb[Nb + 5] = jb.y, Yb[Nb + 6] = jb.z, Yb[Nb + 7] = jb.w, Yb[Nb + 8] = kb.x, Yb[Nb + 9] = kb.y, Yb[Nb + 10] = kb.z, Yb[Nb + 11] = kb.w, Yb[Nb + 12] = lb.x, Yb[Nb + 13] = lb.y, Yb[Nb + 14] = lb.z, Yb[Nb + 15] = lb.w, mb = qc[L.a], nb = qc[L.b], ob = qc[L.c], pb = qc[L.d], Xb[Nb] = mb.x, Xb[Nb + 1] = mb.y, Xb[Nb + 2] = mb.z, Xb[Nb + 3] = mb.w, Xb[Nb + 4] = nb.x, Xb[Nb + 5] = nb.y, Xb[Nb + 6] = nb.z, Xb[Nb + 7] = nb.w, Xb[Nb + 8] = ob.x, Xb[Nb + 9] = ob.y, Xb[Nb + 10] = ob.z, Xb[Nb + 11] = ob.w, Xb[Nb + 12] = pb.x, Xb[Nb + 13] = pb.y, Xb[Nb + 14] = pb.z, Xb[Nb + 15] = pb.w, Nb += 16;
                                Nb > 0 && (Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglSkinIndicesBuffer), Q.bufferData(Q.ARRAY_BUFFER, Xb, B), Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglSkinWeightsBuffer), Q.bufferData(Q.ARRAY_BUFFER, Yb, B))
                            }
                            if (ic && F) {
                                for (I = 0, J = lc.length; J > I; I++) L = nc[lc[I]], O = L.vertexColors, P = L.color, 3 === O.length && F === THREE.VertexColors ? (eb = O[0], fb = O[1], gb = O[2]) : gb = fb = eb = P, Wb[Mb] = eb.r, Wb[Mb + 1] = eb.g, Wb[Mb + 2] = eb.b, Wb[Mb + 3] = fb.r, Wb[Mb + 4] = fb.g, Wb[Mb + 5] = fb.b, Wb[Mb + 6] = gb.r, Wb[Mb + 7] = gb.g, Wb[Mb + 8] = gb.b, Mb += 9;
                                for (I = 0, J = mc.length; J > I; I++) L = nc[mc[I]], O = L.vertexColors, P = L.color, 4 === O.length && F === THREE.VertexColors ? (eb = O[0], fb = O[1], gb = O[2], hb = O[3]) : hb = gb = fb = eb = P, Wb[Mb] = eb.r, Wb[Mb + 1] = eb.g, Wb[Mb + 2] = eb.b, Wb[Mb + 3] = fb.r, Wb[Mb + 4] = fb.g, Wb[Mb + 5] = fb.b, Wb[Mb + 6] = gb.r, Wb[Mb + 7] = gb.g, Wb[Mb + 8] = gb.b, Wb[Mb + 9] = hb.r, Wb[Mb + 10] = hb.g, Wb[Mb + 11] = hb.b, Mb += 12;
                                Mb > 0 && (Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglColorBuffer), Q.bufferData(Q.ARRAY_BUFFER, Wb, B))
                            }
                            if (hc && dc.hasTangents) {
                                for (I = 0, J = lc.length; J > I; I++) L = nc[lc[I]], R = L.vertexTangents, Y = R[0], Z = R[1], $ = R[2], Vb[Kb] = Y.x, Vb[Kb + 1] = Y.y, Vb[Kb + 2] = Y.z, Vb[Kb + 3] = Y.w, Vb[Kb + 4] = Z.x, Vb[Kb + 5] = Z.y, Vb[Kb + 6] = Z.z, Vb[Kb + 7] = Z.w, Vb[Kb + 8] = $.x, Vb[Kb + 9] = $.y, Vb[Kb + 10] = $.z, Vb[Kb + 11] = $.w, Kb += 12;
                                for (I = 0, J = mc.length; J > I; I++) L = nc[mc[I]], R = L.vertexTangents, Y = R[0], Z = R[1], $ = R[2], _ = R[3], Vb[Kb] = Y.x, Vb[Kb + 1] = Y.y, Vb[Kb + 2] = Y.z, Vb[Kb + 3] = Y.w, Vb[Kb + 4] = Z.x, Vb[Kb + 5] = Z.y, Vb[Kb + 6] = Z.z, Vb[Kb + 7] = Z.w, Vb[Kb + 8] = $.x, Vb[Kb + 9] = $.y, Vb[Kb + 10] = $.z, Vb[Kb + 11] = $.w, Vb[Kb + 12] = _.x, Vb[Kb + 13] = _.y, Vb[Kb + 14] = _.z, Vb[Kb + 15] = _.w, Kb += 16;
                                Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglTangentBuffer), Q.bufferData(Q.ARRAY_BUFFER, Vb, B)
                            }
                            if (gc && E) {
                                for (I = 0, J = lc.length; J > I; I++)
                                    if (L = nc[lc[I]], M = L.vertexNormals, N = L.normal, 3 === M.length && H)
                                        for (qb = 0; 3 > qb; qb++) sb = M[qb], Ub[Jb] = sb.x, Ub[Jb + 1] = sb.y, Ub[Jb + 2] = sb.z, Jb += 3;
                                    else
                                        for (qb = 0; 3 > qb; qb++) Ub[Jb] = N.x, Ub[Jb + 1] = N.y, Ub[Jb + 2] = N.z, Jb += 3;
                                for (I = 0, J = mc.length; J > I; I++)
                                    if (L = nc[mc[I]], M = L.vertexNormals, N = L.normal, 4 === M.length && H)
                                        for (qb = 0; 4 > qb; qb++) sb = M[qb], Ub[Jb] = sb.x, Ub[Jb + 1] = sb.y, Ub[Jb + 2] = sb.z, Jb += 3;
                                    else
                                        for (qb = 0; 4 > qb; qb++) Ub[Jb] = N.x, Ub[Jb + 1] = N.y, Ub[Jb + 2] = N.z, Jb += 3;
                                Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglNormalBuffer), Q.bufferData(Q.ARRAY_BUFFER, Ub, B)
                            }
                            if (fc && oc && G) {
                                for (I = 0, J = lc.length; J > I; I++)
                                    if (K = lc[I], S = oc[K], void 0 !== S)
                                        for (qb = 0; 3 > qb; qb++) tb = S[qb], Sb[Gb] = tb.x, Sb[Gb + 1] = tb.y, Gb += 2;
                                for (I = 0, J = mc.length; J > I; I++)
                                    if (K = mc[I], S = oc[K], void 0 !== S)
                                        for (qb = 0; 4 > qb; qb++) tb = S[qb], Sb[Gb] = tb.x, Sb[Gb + 1] = tb.y, Gb += 2;
                                Gb > 0 && (Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglUVBuffer), Q.bufferData(Q.ARRAY_BUFFER, Sb, B))
                            }
                            if (fc && pc && G) {
                                for (I = 0, J = lc.length; J > I; I++)
                                    if (K = lc[I], T = pc[K], void 0 !== T)
                                        for (qb = 0; 3 > qb; qb++) ub = T[qb], Tb[Hb] = ub.x, Tb[Hb + 1] = ub.y, Hb += 2;
                                for (I = 0, J = mc.length; J > I; I++)
                                    if (K = mc[I], T = pc[K], void 0 !== T)
                                        for (qb = 0; 4 > qb; qb++) ub = T[qb], Tb[Hb] = ub.x, Tb[Hb + 1] = ub.y, Hb += 2;
                                Hb > 0 && (Q.bindBuffer(Q.ARRAY_BUFFER, z.__webglUV2Buffer), Q.bufferData(Q.ARRAY_BUFFER, Tb, B))
                            }
                            if (ec) {
                                for (I = 0, J = lc.length; J > I; I++) bc[Ib] = Eb, bc[Ib + 1] = Eb + 1, bc[Ib + 2] = Eb + 2, Ib += 3, cc[Lb] = Eb, cc[Lb + 1] = Eb + 1, cc[Lb + 2] = Eb, cc[Lb + 3] = Eb + 2, cc[Lb + 4] = Eb + 1, cc[Lb + 5] = Eb + 2, Lb += 6, Eb += 3;
                                for (I = 0, J = mc.length; J > I; I++) bc[Ib] = Eb, bc[Ib + 1] = Eb + 1, bc[Ib + 2] = Eb + 3, bc[Ib + 3] = Eb + 1, bc[Ib + 4] = Eb + 2, bc[Ib + 5] = Eb + 3, Ib += 6, cc[Lb] = Eb, cc[Lb + 1] = Eb + 1, cc[Lb + 2] = Eb, cc[Lb + 3] = Eb + 3, cc[Lb + 4] = Eb + 1, cc[Lb + 5] = Eb + 2, cc[Lb + 6] = Eb + 2, cc[Lb + 7] = Eb + 3, Lb += 8, Eb += 4;
                                Q.bindBuffer(Q.ELEMENT_ARRAY_BUFFER, z.__webglFaceBuffer), Q.bufferData(Q.ELEMENT_ARRAY_BUFFER, bc, B), Q.bindBuffer(Q.ELEMENT_ARRAY_BUFFER, z.__webglLineBuffer), Q.bufferData(Q.ELEMENT_ARRAY_BUFFER, cc, B)
                            }
                            if (_b)
                                for (qb = 0, rb = _b.length; rb > qb; qb++)
                                    if (ac = _b[qb], ac.__original.needsUpdate) {
                                        if (Pb = 0, 1 === ac.size) {
                                            if (void 0 === ac.boundTo || "vertices" === ac.boundTo) {
                                                for (I = 0, J = lc.length; J > I; I++) L = nc[lc[I]], ac.array[Pb] = ac.value[L.a], ac.array[Pb + 1] = ac.value[L.b], ac.array[Pb + 2] = ac.value[L.c], Pb += 3;
                                                for (I = 0, J = mc.length; J > I; I++) L = nc[mc[I]], ac.array[Pb] = ac.value[L.a], ac.array[Pb + 1] = ac.value[L.b], ac.array[Pb + 2] = ac.value[L.c], ac.array[Pb + 3] = ac.value[L.d], Pb += 4
                                            } else if ("faces" === ac.boundTo) {
                                                for (I = 0, J = lc.length; J > I; I++) Qb = ac.value[lc[I]], ac.array[Pb] = Qb, ac.array[Pb + 1] = Qb, ac.array[Pb + 2] = Qb, Pb += 3;
                                                for (I = 0, J = mc.length; J > I; I++) Qb = ac.value[mc[I]], ac.array[Pb] = Qb, ac.array[Pb + 1] = Qb, ac.array[Pb + 2] = Qb, ac.array[Pb + 3] = Qb, Pb += 4
                                            }
                                        } else if (2 === ac.size) {
                                            if (void 0 === ac.boundTo || "vertices" === ac.boundTo) {
                                                for (I = 0, J = lc.length; J > I; I++) L = nc[lc[I]], U = ac.value[L.a], V = ac.value[L.b], W = ac.value[L.c], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = V.x, ac.array[Pb + 3] = V.y, ac.array[Pb + 4] = W.x, ac.array[Pb + 5] = W.y, Pb += 6;
                                                for (I = 0, J = mc.length; J > I; I++) L = nc[mc[I]], U = ac.value[L.a], V = ac.value[L.b], W = ac.value[L.c], X = ac.value[L.d], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = V.x, ac.array[Pb + 3] = V.y, ac.array[Pb + 4] = W.x, ac.array[Pb + 5] = W.y, ac.array[Pb + 6] = X.x, ac.array[Pb + 7] = X.y, Pb += 8
                                            } else if ("faces" === ac.boundTo) {
                                                for (I = 0, J = lc.length; J > I; I++) W = V = U = Qb = ac.value[lc[I]], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = V.x, ac.array[Pb + 3] = V.y, ac.array[Pb + 4] = W.x, ac.array[Pb + 5] = W.y, Pb += 6;
                                                for (I = 0, J = mc.length; J > I; I++) X = W = V = U = Qb = ac.value[mc[I]], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = V.x, ac.array[Pb + 3] = V.y, ac.array[Pb + 4] = W.x, ac.array[Pb + 5] = W.y, ac.array[Pb + 6] = X.x, ac.array[Pb + 7] = X.y, Pb += 8
                                            }
                                        } else if (3 === ac.size) {
                                            var uc;
                                            if (uc = "c" === ac.type ? ["r", "g", "b"] : ["x", "y", "z"], void 0 === ac.boundTo || "vertices" === ac.boundTo) {
                                                for (I = 0, J = lc.length; J > I; I++) L = nc[lc[I]], U = ac.value[L.a], V = ac.value[L.b], W = ac.value[L.c], ac.array[Pb] = U[uc[0]], ac.array[Pb + 1] = U[uc[1]], ac.array[Pb + 2] = U[uc[2]], ac.array[Pb + 3] = V[uc[0]], ac.array[Pb + 4] = V[uc[1]], ac.array[Pb + 5] = V[uc[2]], ac.array[Pb + 6] = W[uc[0]], ac.array[Pb + 7] = W[uc[1]], ac.array[Pb + 8] = W[uc[2]], Pb += 9;
                                                for (I = 0, J = mc.length; J > I; I++) L = nc[mc[I]], U = ac.value[L.a], V = ac.value[L.b], W = ac.value[L.c], X = ac.value[L.d], ac.array[Pb] = U[uc[0]], ac.array[Pb + 1] = U[uc[1]], ac.array[Pb + 2] = U[uc[2]], ac.array[Pb + 3] = V[uc[0]], ac.array[Pb + 4] = V[uc[1]], ac.array[Pb + 5] = V[uc[2]], ac.array[Pb + 6] = W[uc[0]], ac.array[Pb + 7] = W[uc[1]], ac.array[Pb + 8] = W[uc[2]], ac.array[Pb + 9] = X[uc[0]], ac.array[Pb + 10] = X[uc[1]], ac.array[Pb + 11] = X[uc[2]], Pb += 12
                                            } else if ("faces" === ac.boundTo) {
                                                for (I = 0, J = lc.length; J > I; I++) W = V = U = Qb = ac.value[lc[I]], ac.array[Pb] = U[uc[0]], ac.array[Pb + 1] = U[uc[1]], ac.array[Pb + 2] = U[uc[2]], ac.array[Pb + 3] = V[uc[0]], ac.array[Pb + 4] = V[uc[1]], ac.array[Pb + 5] = V[uc[2]], ac.array[Pb + 6] = W[uc[0]], ac.array[Pb + 7] = W[uc[1]], ac.array[Pb + 8] = W[uc[2]], Pb += 9;
                                                for (I = 0, J = mc.length; J > I; I++) X = W = V = U = Qb = ac.value[mc[I]], ac.array[Pb] = U[uc[0]], ac.array[Pb + 1] = U[uc[1]], ac.array[Pb + 2] = U[uc[2]], ac.array[Pb + 3] = V[uc[0]], ac.array[Pb + 4] = V[uc[1]], ac.array[Pb + 5] = V[uc[2]], ac.array[Pb + 6] = W[uc[0]], ac.array[Pb + 7] = W[uc[1]], ac.array[Pb + 8] = W[uc[2]], ac.array[Pb + 9] = X[uc[0]], ac.array[Pb + 10] = X[uc[1]], ac.array[Pb + 11] = X[uc[2]], Pb += 12
                                            } else if ("faceVertices" === ac.boundTo) {
                                                for (I = 0, J = lc.length; J > I; I++) Qb = ac.value[lc[I]], U = Qb[0], V = Qb[1], W = Qb[2], ac.array[Pb] = U[uc[0]], ac.array[Pb + 1] = U[uc[1]], ac.array[Pb + 2] = U[uc[2]], ac.array[Pb + 3] = V[uc[0]], ac.array[Pb + 4] = V[uc[1]], ac.array[Pb + 5] = V[uc[2]], ac.array[Pb + 6] = W[uc[0]], ac.array[Pb + 7] = W[uc[1]], ac.array[Pb + 8] = W[uc[2]], Pb += 9;
                                                for (I = 0, J = mc.length; J > I; I++) Qb = ac.value[mc[I]], U = Qb[0], V = Qb[1], W = Qb[2], X = Qb[3], ac.array[Pb] = U[uc[0]], ac.array[Pb + 1] = U[uc[1]], ac.array[Pb + 2] = U[uc[2]], ac.array[Pb + 3] = V[uc[0]], ac.array[Pb + 4] = V[uc[1]], ac.array[Pb + 5] = V[uc[2]], ac.array[Pb + 6] = W[uc[0]], ac.array[Pb + 7] = W[uc[1]], ac.array[Pb + 8] = W[uc[2]], ac.array[Pb + 9] = X[uc[0]], ac.array[Pb + 10] = X[uc[1]], ac.array[Pb + 11] = X[uc[2]], Pb += 12
                                            }
                                        } else if (4 === ac.size)
                                            if (void 0 === ac.boundTo || "vertices" === ac.boundTo) {
                                                for (I = 0, J = lc.length; J > I; I++) L = nc[lc[I]], U = ac.value[L.a], V = ac.value[L.b], W = ac.value[L.c], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = U.z, ac.array[Pb + 3] = U.w, ac.array[Pb + 4] = V.x, ac.array[Pb + 5] = V.y, ac.array[Pb + 6] = V.z, ac.array[Pb + 7] = V.w, ac.array[Pb + 8] = W.x, ac.array[Pb + 9] = W.y, ac.array[Pb + 10] = W.z, ac.array[Pb + 11] = W.w, Pb += 12;
                                                for (I = 0, J = mc.length; J > I; I++) L = nc[mc[I]], U = ac.value[L.a], V = ac.value[L.b], W = ac.value[L.c], X = ac.value[L.d], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = U.z, ac.array[Pb + 3] = U.w, ac.array[Pb + 4] = V.x, ac.array[Pb + 5] = V.y, ac.array[Pb + 6] = V.z, ac.array[Pb + 7] = V.w, ac.array[Pb + 8] = W.x, ac.array[Pb + 9] = W.y, ac.array[Pb + 10] = W.z, ac.array[Pb + 11] = W.w, ac.array[Pb + 12] = X.x, ac.array[Pb + 13] = X.y, ac.array[Pb + 14] = X.z, ac.array[Pb + 15] = X.w, Pb += 16
                                            } else if ("faces" === ac.boundTo) {
                                            for (I = 0, J = lc.length; J > I; I++) W = V = U = Qb = ac.value[lc[I]], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = U.z, ac.array[Pb + 3] = U.w, ac.array[Pb + 4] = V.x, ac.array[Pb + 5] = V.y, ac.array[Pb + 6] = V.z, ac.array[Pb + 7] = V.w, ac.array[Pb + 8] = W.x, ac.array[Pb + 9] = W.y, ac.array[Pb + 10] = W.z, ac.array[Pb + 11] = W.w, Pb += 12;
                                            for (I = 0, J = mc.length; J > I; I++) X = W = V = U = Qb = ac.value[mc[I]], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = U.z, ac.array[Pb + 3] = U.w, ac.array[Pb + 4] = V.x, ac.array[Pb + 5] = V.y, ac.array[Pb + 6] = V.z, ac.array[Pb + 7] = V.w, ac.array[Pb + 8] = W.x, ac.array[Pb + 9] = W.y, ac.array[Pb + 10] = W.z, ac.array[Pb + 11] = W.w, ac.array[Pb + 12] = X.x, ac.array[Pb + 13] = X.y, ac.array[Pb + 14] = X.z, ac.array[Pb + 15] = X.w, Pb += 16
                                        } else if ("faceVertices" === ac.boundTo) {
                                            for (I = 0, J = lc.length; J > I; I++) Qb = ac.value[lc[I]], U = Qb[0], V = Qb[1], W = Qb[2], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = U.z, ac.array[Pb + 3] = U.w, ac.array[Pb + 4] = V.x, ac.array[Pb + 5] = V.y, ac.array[Pb + 6] = V.z, ac.array[Pb + 7] = V.w, ac.array[Pb + 8] = W.x, ac.array[Pb + 9] = W.y, ac.array[Pb + 10] = W.z, ac.array[Pb + 11] = W.w, Pb += 12;
                                            for (I = 0, J = mc.length; J > I; I++) Qb = ac.value[mc[I]], U = Qb[0], V = Qb[1], W = Qb[2], X = Qb[3], ac.array[Pb] = U.x, ac.array[Pb + 1] = U.y, ac.array[Pb + 2] = U.z, ac.array[Pb + 3] = U.w, ac.array[Pb + 4] = V.x, ac.array[Pb + 5] = V.y, ac.array[Pb + 6] = V.z, ac.array[Pb + 7] = V.w, ac.array[Pb + 8] = W.x, ac.array[Pb + 9] = W.y, ac.array[Pb + 10] = W.z, ac.array[Pb + 11] = W.w, ac.array[Pb + 12] = X.x, ac.array[Pb + 13] = X.y, ac.array[Pb + 14] = X.z, ac.array[Pb + 15] = X.w, Pb += 16
                                        }
                                        Q.bindBuffer(Q.ARRAY_BUFFER, ac.buffer), Q.bufferData(Q.ARRAY_BUFFER, ac.array, B)
                                    }
                            C && (delete z.__inittedArrays, delete z.__colorArray, delete z.__normalArray, delete z.__tangentArray, delete z.__uvArray, delete z.__uv2Array, delete z.__faceArray, delete z.__vertexArray, delete z.__lineArray, delete z.__skinIndexArray, delete z.__skinWeightArray)
                        }
                    }
                j.verticesNeedUpdate = !1, j.morphTargetsNeedUpdate = !1, j.elementsNeedUpdate = !1, j.uvsNeedUpdate = !1, j.normalsNeedUpdate = !1, j.colorsNeedUpdate = !1, j.tangentsNeedUpdate = !1, j.buffersNeedUpdate = !1, n.attributes && r(n)
            } else if (i instanceof THREE.Ribbon) {
                if (n = e(i, j), m = n.attributes && q(n), j.verticesNeedUpdate || j.colorsNeedUpdate || j.normalsNeedUpdate || m) {
                    var vc = j,
                        wc = Q.DYNAMIC_DRAW,
                        xc = void 0,
                        yc = void 0,
                        zc = void 0,
                        Ac = void 0,
                        Bc = void 0,
                        Cc = void 0,
                        Dc = void 0,
                        Ec = void 0,
                        Fc = void 0,
                        Gc = void 0,
                        Hc = void 0,
                        Ic = void 0,
                        Jc = void 0,
                        Kc = vc.vertices,
                        Lc = vc.colors,
                        Mc = vc.normals,
                        Nc = Kc.length,
                        Oc = Lc.length,
                        Pc = Mc.length,
                        Qc = vc.__vertexArray,
                        Rc = vc.__colorArray,
                        Sc = vc.__normalArray,
                        Tc = vc.colorsNeedUpdate,
                        Uc = vc.normalsNeedUpdate,
                        Vc = vc.__webglCustomAttributesList;
                    if (vc.verticesNeedUpdate) {
                        for (xc = 0; Nc > xc; xc++) Ac = Kc[xc], Bc = 3 * xc, Qc[Bc] = Ac.x, Qc[Bc + 1] = Ac.y, Qc[Bc + 2] = Ac.z;
                        Q.bindBuffer(Q.ARRAY_BUFFER, vc.__webglVertexBuffer), Q.bufferData(Q.ARRAY_BUFFER, Qc, wc)
                    }
                    if (Tc) {
                        for (yc = 0; Oc > yc; yc++) Cc = Lc[yc], Bc = 3 * yc, Rc[Bc] = Cc.r, Rc[Bc + 1] = Cc.g, Rc[Bc + 2] = Cc.b;
                        Q.bindBuffer(Q.ARRAY_BUFFER, vc.__webglColorBuffer), Q.bufferData(Q.ARRAY_BUFFER, Rc, wc)
                    }
                    if (Uc) {
                        for (zc = 0; Pc > zc; zc++) Dc = Mc[zc], Bc = 3 * zc, Sc[Bc] = Dc.x, Sc[Bc + 1] = Dc.y, Sc[Bc + 2] = Dc.z;
                        Q.bindBuffer(Q.ARRAY_BUFFER, vc.__webglNormalBuffer), Q.bufferData(Q.ARRAY_BUFFER, Sc, wc)
                    }
                    if (Vc)
                        for (Ec = 0, Fc = Vc.length; Fc > Ec; Ec++)
                            if (Ic = Vc[Ec], Ic.needsUpdate && (void 0 === Ic.boundTo || "vertices" === Ic.boundTo)) {
                                if (Bc = 0, Hc = Ic.value.length, 1 === Ic.size)
                                    for (Gc = 0; Hc > Gc; Gc++) Ic.array[Gc] = Ic.value[Gc];
                                else if (2 === Ic.size)
                                    for (Gc = 0; Hc > Gc; Gc++) Jc = Ic.value[Gc], Ic.array[Bc] = Jc.x, Ic.array[Bc + 1] = Jc.y, Bc += 2;
                                else if (3 === Ic.size)
                                    if ("c" === Ic.type)
                                        for (Gc = 0; Hc > Gc; Gc++) Jc = Ic.value[Gc], Ic.array[Bc] = Jc.r, Ic.array[Bc + 1] = Jc.g, Ic.array[Bc + 2] = Jc.b, Bc += 3;
                                    else
                                        for (Gc = 0; Hc > Gc; Gc++) Jc = Ic.value[Gc], Ic.array[Bc] = Jc.x, Ic.array[Bc + 1] = Jc.y, Ic.array[Bc + 2] = Jc.z, Bc += 3;
                                else if (4 === Ic.size)
                                    for (Gc = 0; Hc > Gc; Gc++) Jc = Ic.value[Gc], Ic.array[Bc] = Jc.x, Ic.array[Bc + 1] = Jc.y, Ic.array[Bc + 2] = Jc.z, Ic.array[Bc + 3] = Jc.w, Bc += 4;
                                Q.bindBuffer(Q.ARRAY_BUFFER, Ic.buffer), Q.bufferData(Q.ARRAY_BUFFER, Ic.array, wc)
                            }
                }
                j.verticesNeedUpdate = !1, j.colorsNeedUpdate = !1, j.normalsNeedUpdate = !1, n.attributes && r(n)
            } else if (i instanceof THREE.Line) {
                if (n = e(i, j), m = n.attributes && q(n), j.verticesNeedUpdate || j.colorsNeedUpdate || j.lineDistancesNeedUpdate || m) {
                    var Wc = j,
                        Xc = Q.DYNAMIC_DRAW,
                        Yc = void 0,
                        Zc = void 0,
                        $c = void 0,
                        _c = void 0,
                        ad = void 0,
                        bd = void 0,
                        cd = Wc.vertices,
                        dd = Wc.colors,
                        ed = Wc.lineDistances,
                        fd = cd.length,
                        gd = dd.length,
                        hd = ed.length,
                        id = Wc.__vertexArray,
                        jd = Wc.__colorArray,
                        kd = Wc.__lineDistanceArray,
                        ld = Wc.colorsNeedUpdate,
                        md = Wc.lineDistancesNeedUpdate,
                        nd = Wc.__webglCustomAttributesList,
                        od = void 0,
                        pd = void 0,
                        qd = void 0,
                        rd = void 0,
                        sd = void 0,
                        td = void 0;
                    if (Wc.verticesNeedUpdate) {
                        for (Yc = 0; fd > Yc; Yc++) _c = cd[Yc], ad = 3 * Yc, id[ad] = _c.x, id[ad + 1] = _c.y, id[ad + 2] = _c.z;
                        Q.bindBuffer(Q.ARRAY_BUFFER, Wc.__webglVertexBuffer), Q.bufferData(Q.ARRAY_BUFFER, id, Xc)
                    }
                    if (ld) {
                        for (Zc = 0; gd > Zc; Zc++) bd = dd[Zc], ad = 3 * Zc, jd[ad] = bd.r, jd[ad + 1] = bd.g, jd[ad + 2] = bd.b;
                        Q.bindBuffer(Q.ARRAY_BUFFER, Wc.__webglColorBuffer), Q.bufferData(Q.ARRAY_BUFFER, jd, Xc)
                    }
                    if (md) {
                        for ($c = 0; hd > $c; $c++) kd[$c] = ed[$c];
                        Q.bindBuffer(Q.ARRAY_BUFFER, Wc.__webglLineDistanceBuffer), Q.bufferData(Q.ARRAY_BUFFER, kd, Xc)
                    }
                    if (nd)
                        for (od = 0, pd = nd.length; pd > od; od++)
                            if (td = nd[od], td.needsUpdate && (void 0 === td.boundTo || "vertices" === td.boundTo)) {
                                if (ad = 0, rd = td.value.length, 1 === td.size)
                                    for (qd = 0; rd > qd; qd++) td.array[qd] = td.value[qd];
                                else if (2 === td.size)
                                    for (qd = 0; rd > qd; qd++) sd = td.value[qd], td.array[ad] = sd.x, td.array[ad + 1] = sd.y, ad += 2;
                                else if (3 === td.size)
                                    if ("c" === td.type)
                                        for (qd = 0; rd > qd; qd++) sd = td.value[qd], td.array[ad] = sd.r, td.array[ad + 1] = sd.g, td.array[ad + 2] = sd.b, ad += 3;
                                    else
                                        for (qd = 0; rd > qd; qd++) sd = td.value[qd], td.array[ad] = sd.x, td.array[ad + 1] = sd.y, td.array[ad + 2] = sd.z, ad += 3;
                                else if (4 === td.size)
                                    for (qd = 0; rd > qd; qd++) sd = td.value[qd], td.array[ad] = sd.x, td.array[ad + 1] = sd.y, td.array[ad + 2] = sd.z, td.array[ad + 3] = sd.w, ad += 4;
                                Q.bindBuffer(Q.ARRAY_BUFFER, td.buffer), Q.bufferData(Q.ARRAY_BUFFER, td.array, Xc)
                            }
                }
                j.verticesNeedUpdate = !1, j.colorsNeedUpdate = !1, j.lineDistancesNeedUpdate = !1, n.attributes && r(n)
            } else if (i instanceof THREE.ParticleSystem) {
                if (n = e(i, j), m = n.attributes && q(n), j.verticesNeedUpdate || j.colorsNeedUpdate || i.sortParticles || m) {
                    var ud = j,
                        vd = Q.DYNAMIC_DRAW,
                        wd = i,
                        xd = void 0,
                        yd = void 0,
                        zd = void 0,
                        Ad = void 0,
                        Bd = void 0,
                        Cd = void 0,
                        Dd = ud.vertices,
                        Ed = Dd.length,
                        Fd = ud.colors,
                        Gd = Fd.length,
                        Hd = ud.__vertexArray,
                        Id = ud.__colorArray,
                        Jd = ud.__sortArray,
                        Kd = ud.verticesNeedUpdate,
                        Ld = ud.colorsNeedUpdate,
                        Md = ud.__webglCustomAttributesList,
                        Nd = void 0,
                        Od = void 0,
                        Pd = void 0,
                        Qd = void 0,
                        Rd = void 0,
                        Sd = void 0;
                    if (wd.sortParticles) {
                        for (yb.copy(xb), yb.multiply(wd.matrixWorld), xd = 0; Ed > xd; xd++) zd = Dd[xd], zb.copy(zd), zb.applyProjection(yb), Jd[xd] = [zb.z, xd];
                        for (Jd.sort(k), xd = 0; Ed > xd; xd++) zd = Dd[Jd[xd][1]], Ad = 3 * xd, Hd[Ad] = zd.x, Hd[Ad + 1] = zd.y, Hd[Ad + 2] = zd.z;
                        for (yd = 0; Gd > yd; yd++) Ad = 3 * yd, Cd = Fd[Jd[yd][1]], Id[Ad] = Cd.r, Id[Ad + 1] = Cd.g, Id[Ad + 2] = Cd.b;
                        if (Md)
                            for (Nd = 0, Od = Md.length; Od > Nd; Nd++)
                                if (Sd = Md[Nd], void 0 === Sd.boundTo || "vertices" === Sd.boundTo)
                                    if (Ad = 0, Qd = Sd.value.length, 1 === Sd.size)
                                        for (Pd = 0; Qd > Pd; Pd++) Bd = Jd[Pd][1], Sd.array[Pd] = Sd.value[Bd];
                                    else if (2 === Sd.size)
                            for (Pd = 0; Qd > Pd; Pd++) Bd = Jd[Pd][1], Rd = Sd.value[Bd], Sd.array[Ad] = Rd.x, Sd.array[Ad + 1] = Rd.y, Ad += 2;
                        else if (3 === Sd.size)
                            if ("c" === Sd.type)
                                for (Pd = 0; Qd > Pd; Pd++) Bd = Jd[Pd][1], Rd = Sd.value[Bd], Sd.array[Ad] = Rd.r, Sd.array[Ad + 1] = Rd.g, Sd.array[Ad + 2] = Rd.b, Ad += 3;
                            else
                                for (Pd = 0; Qd > Pd; Pd++) Bd = Jd[Pd][1], Rd = Sd.value[Bd], Sd.array[Ad] = Rd.x, Sd.array[Ad + 1] = Rd.y, Sd.array[Ad + 2] = Rd.z, Ad += 3;
                        else if (4 === Sd.size)
                            for (Pd = 0; Qd > Pd; Pd++) Bd = Jd[Pd][1], Rd = Sd.value[Bd], Sd.array[Ad] = Rd.x, Sd.array[Ad + 1] = Rd.y, Sd.array[Ad + 2] = Rd.z, Sd.array[Ad + 3] = Rd.w, Ad += 4
                    } else {
                        if (Kd)
                            for (xd = 0; Ed > xd; xd++) zd = Dd[xd], Ad = 3 * xd, Hd[Ad] = zd.x, Hd[Ad + 1] = zd.y, Hd[Ad + 2] = zd.z;
                        if (Ld)
                            for (yd = 0; Gd > yd; yd++) Cd = Fd[yd], Ad = 3 * yd, Id[Ad] = Cd.r, Id[Ad + 1] = Cd.g, Id[Ad + 2] = Cd.b;
                        if (Md)
                            for (Nd = 0, Od = Md.length; Od > Nd; Nd++)
                                if (Sd = Md[Nd], Sd.needsUpdate && (void 0 === Sd.boundTo || "vertices" === Sd.boundTo))
                                    if (Qd = Sd.value.length, Ad = 0, 1 === Sd.size)
                                        for (Pd = 0; Qd > Pd; Pd++) Sd.array[Pd] = Sd.value[Pd];
                                    else if (2 === Sd.size)
                            for (Pd = 0; Qd > Pd; Pd++) Rd = Sd.value[Pd], Sd.array[Ad] = Rd.x, Sd.array[Ad + 1] = Rd.y, Ad += 2;
                        else if (3 === Sd.size)
                            if ("c" === Sd.type)
                                for (Pd = 0; Qd > Pd; Pd++) Rd = Sd.value[Pd], Sd.array[Ad] = Rd.r, Sd.array[Ad + 1] = Rd.g, Sd.array[Ad + 2] = Rd.b, Ad += 3;
                            else
                                for (Pd = 0; Qd > Pd; Pd++) Rd = Sd.value[Pd], Sd.array[Ad] = Rd.x, Sd.array[Ad + 1] = Rd.y, Sd.array[Ad + 2] = Rd.z, Ad += 3;
                        else if (4 === Sd.size)
                            for (Pd = 0; Qd > Pd; Pd++) Rd = Sd.value[Pd], Sd.array[Ad] = Rd.x, Sd.array[Ad + 1] = Rd.y, Sd.array[Ad + 2] = Rd.z, Sd.array[Ad + 3] = Rd.w, Ad += 4
                    } if ((Kd || wd.sortParticles) && (Q.bindBuffer(Q.ARRAY_BUFFER, ud.__webglVertexBuffer), Q.bufferData(Q.ARRAY_BUFFER, Hd, vd)), (Ld || wd.sortParticles) && (Q.bindBuffer(Q.ARRAY_BUFFER, ud.__webglColorBuffer), Q.bufferData(Q.ARRAY_BUFFER, Id, vd)), Md)
                        for (Nd = 0, Od = Md.length; Od > Nd; Nd++) Sd = Md[Nd], (Sd.needsUpdate || wd.sortParticles) && (Q.bindBuffer(Q.ARRAY_BUFFER, Sd.buffer), Q.bufferData(Q.ARRAY_BUFFER, Sd.array, vd))
                }
                j.verticesNeedUpdate = !1, j.colorsNeedUpdate = !1, n.attributes && r(n)
            }
        }
    }, this.initMaterial = function (a, b, c, d) {
        var e, f, g, h;
        a.addEventListener("dispose", Tb);
        var i, j, k, l, m;
        if (a instanceof THREE.MeshDepthMaterial ? m = "depth" : a instanceof THREE.MeshNormalMaterial ? m = "normal" : a instanceof THREE.MeshBasicMaterial ? m = "basic" : a instanceof THREE.MeshLambertMaterial ? m = "lambert" : a instanceof THREE.MeshPhongMaterial ? m = "phong" : a instanceof THREE.LineBasicMaterial ? m = "basic" : a instanceof THREE.LineDashedMaterial ? m = "dashed" : a instanceof THREE.ParticleBasicMaterial && (m = "particle_basic"), m) {
            var n = THREE.ShaderLib[m];
            a.uniforms = THREE.UniformsUtils.clone(n.uniforms), a.vertexShader = n.vertexShader, a.fragmentShader = n.fragmentShader
        }
        var o, p, q;
        for (e = g = p = q = n = 0, f = b.length; f > e; e++) o = b[e], o.onlyShadow || (o instanceof THREE.DirectionalLight && g++, o instanceof THREE.PointLight && p++, o instanceof THREE.SpotLight && q++, o instanceof THREE.HemisphereLight && n++);
        for (e = g, f = p, g = q, h = n, n = o = 0, q = b.length; q > n; n++) p = b[n], p.castShadow && (p instanceof THREE.SpotLight && o++, p instanceof THREE.DirectionalLight && !p.shadowCascade && o++);
        l = o, Jb && d && d.useVertexTexture ? k = 1024 : (b = Q.getParameter(Q.MAX_VERTEX_UNIFORM_VECTORS), b = Math.floor((b - 20) / 4), void 0 !== d && d instanceof THREE.SkinnedMesh && (b = Math.min(d.bones.length, b), b < d.bones.length && console.warn("WebGLRenderer: too many bones - " + d.bones.length + ", this GPU supports just " + b + " (try OpenGL instead of ANGLE)")), k = b);
        a: {
            q = a.fragmentShader, p = a.vertexShader, n = a.uniforms, b = a.attributes, o = a.defines;
            var r, s, t, c = {
                    map: !!a.map,
                    envMap: !!a.envMap,
                    lightMap: !!a.lightMap,
                    bumpMap: !!a.bumpMap,
                    normalMap: !!a.normalMap,
                    specularMap: !!a.specularMap,
                    vertexColors: a.vertexColors,
                    fog: c,
                    useFog: a.fog,
                    fogExp: c instanceof THREE.FogExp2,
                    sizeAttenuation: a.sizeAttenuation,
                    skinning: a.skinning,
                    maxBones: k,
                    useVertexTexture: Jb && d && d.useVertexTexture,
                    boneTextureWidth: d && d.boneTextureWidth,
                    boneTextureHeight: d && d.boneTextureHeight,
                    morphTargets: a.morphTargets,
                    morphNormals: a.morphNormals,
                    maxMorphTargets: this.maxMorphTargets,
                    maxMorphNormals: this.maxMorphNormals,
                    maxDirLights: e,
                    maxPointLights: f,
                    maxSpotLights: g,
                    maxHemiLights: h,
                    maxShadows: l,
                    shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
                    shadowMapType: this.shadowMapType,
                    shadowMapDebug: this.shadowMapDebug,
                    shadowMapCascade: this.shadowMapCascade,
                    alphaTest: a.alphaTest,
                    metal: a.metal,
                    perPixel: a.perPixel,
                    wrapAround: a.wrapAround,
                    doubleSided: a.side === THREE.DoubleSide,
                    flipSided: a.side === THREE.BackSide
                },
                d = [];
            m ? d.push(m) : (d.push(q), d.push(p));
            for (s in o) d.push(s), d.push(o[s]);
            for (r in c) d.push(r), d.push(c[r]);
            for (m = d.join(), r = 0, s = W.length; s > r; r++)
                if (d = W[r], d.code === m) {
                    d.usedTimes++, j = d.program;
                    break a
                }
            r = "SHADOWMAP_TYPE_BASIC", c.shadowMapType === THREE.PCFShadowMap ? r = "SHADOWMAP_TYPE_PCF" : c.shadowMapType === THREE.PCFSoftShadowMap && (r = "SHADOWMAP_TYPE_PCF_SOFT"), s = [];
            for (t in o) d = o[t], !1 !== d && (d = "#define " + t + " " + d, s.push(d));
            d = s.join("\n"), t = Q.createProgram(), s = ["precision " + I + " float;", d, Ib ? "#define VERTEX_TEXTURES" : "", V.gammaInput ? "#define GAMMA_INPUT" : "", V.gammaOutput ? "#define GAMMA_OUTPUT" : "", V.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows, "#define MAX_BONES " + c.maxBones, c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.bumpMap ? "#define USE_BUMPMAP" : "", c.normalMap ? "#define USE_NORMALMAP" : "", c.specularMap ? "#define USE_SPECULARMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.skinning ? "#define USE_SKINNING" : "", c.useVertexTexture ? "#define BONE_TEXTURE" : "", c.boneTextureWidth ? "#define N_BONE_PIXEL_X " + c.boneTextureWidth.toFixed(1) : "", c.boneTextureHeight ? "#define N_BONE_PIXEL_Y " + c.boneTextureHeight.toFixed(1) : "", c.morphTargets ? "#define USE_MORPHTARGETS" : "", c.morphNormals ? "#define USE_MORPHNORMALS" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.flipSided ? "#define FLIP_SIDED" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapEnabled ? "#define " + r : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", c.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 modelMatrix;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;\nuniform vec3 cameraPosition;\nattribute vec3 position;\nattribute vec3 normal;\nattribute vec2 uv;\nattribute vec2 uv2;\n#ifdef USE_COLOR\nattribute vec3 color;\n#endif\n#ifdef USE_MORPHTARGETS\nattribute vec3 morphTarget0;\nattribute vec3 morphTarget1;\nattribute vec3 morphTarget2;\nattribute vec3 morphTarget3;\n#ifdef USE_MORPHNORMALS\nattribute vec3 morphNormal0;\nattribute vec3 morphNormal1;\nattribute vec3 morphNormal2;\nattribute vec3 morphNormal3;\n#else\nattribute vec3 morphTarget4;\nattribute vec3 morphTarget5;\nattribute vec3 morphTarget6;\nattribute vec3 morphTarget7;\n#endif\n#endif\n#ifdef USE_SKINNING\nattribute vec4 skinIndex;\nattribute vec4 skinWeight;\n#endif\n"].join("\n"), r = ["precision " + I + " float;", c.bumpMap || c.normalMap ? "#extension GL_OES_standard_derivatives : enable" : "", d, "#define MAX_DIR_LIGHTS " + c.maxDirLights, "#define MAX_POINT_LIGHTS " + c.maxPointLights, "#define MAX_SPOT_LIGHTS " + c.maxSpotLights, "#define MAX_HEMI_LIGHTS " + c.maxHemiLights, "#define MAX_SHADOWS " + c.maxShadows, c.alphaTest ? "#define ALPHATEST " + c.alphaTest : "", V.gammaInput ? "#define GAMMA_INPUT" : "", V.gammaOutput ? "#define GAMMA_OUTPUT" : "", V.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", c.useFog && c.fog ? "#define USE_FOG" : "", c.useFog && c.fogExp ? "#define FOG_EXP2" : "", c.map ? "#define USE_MAP" : "", c.envMap ? "#define USE_ENVMAP" : "", c.lightMap ? "#define USE_LIGHTMAP" : "", c.bumpMap ? "#define USE_BUMPMAP" : "", c.normalMap ? "#define USE_NORMALMAP" : "", c.specularMap ? "#define USE_SPECULARMAP" : "", c.vertexColors ? "#define USE_COLOR" : "", c.metal ? "#define METAL" : "", c.perPixel ? "#define PHONG_PER_PIXEL" : "", c.wrapAround ? "#define WRAP_AROUND" : "", c.doubleSided ? "#define DOUBLE_SIDED" : "", c.flipSided ? "#define FLIP_SIDED" : "", c.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", c.shadowMapEnabled ? "#define " + r : "", c.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", c.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", "uniform mat4 viewMatrix;\nuniform vec3 cameraPosition;\n"].join("\n"), s = C("vertex", s + p), r = C("fragment", r + q), Q.attachShader(t, s), Q.attachShader(t, r), Q.linkProgram(t), Q.getProgramParameter(t, Q.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + Q.getProgramParameter(t, Q.VALIDATE_STATUS) + ", gl error [" + Q.getError() + "]"), Q.deleteShader(r), Q.deleteShader(s), t.uniforms = {}, t.attributes = {};
            var u;
            r = "viewMatrix modelViewMatrix projectionMatrix normalMatrix modelMatrix cameraPosition morphTargetInfluences".split(" "), c.useVertexTexture ? r.push("boneTexture") : r.push("boneGlobalMatrices");
            for (u in n) r.push(u);
            for (u = r, r = 0, s = u.length; s > r; r++) n = u[r], t.uniforms[n] = Q.getUniformLocation(t, n);
            for (r = "position normal uv uv2 tangent color skinIndex skinWeight lineDistance".split(" "), u = 0; u < c.maxMorphTargets; u++) r.push("morphTarget" + u);
            for (u = 0; u < c.maxMorphNormals; u++) r.push("morphNormal" + u);
            for (j in b) r.push(j);
            for (j = r, u = 0, b = j.length; b > u; u++) r = j[u], t.attributes[r] = Q.getAttribLocation(t, r);
            t.id = X++, W.push({
                program: t,
                code: m,
                usedTimes: 1
            }), V.info.memory.programs = W.length, j = t
        }
        if (a.program = j, u = a.program.attributes, a.morphTargets)
            for (a.numSupportedMorphTargets = 0, b = "morphTarget", j = 0; j < this.maxMorphTargets; j++) t = b + j, 0 <= u[t] && a.numSupportedMorphTargets++;
        if (a.morphNormals)
            for (a.numSupportedMorphNormals = 0, b = "morphNormal", j = 0; j < this.maxMorphNormals; j++) t = b + j, 0 <= u[t] && a.numSupportedMorphNormals++;
        a.uniformsList = [];
        for (i in a.uniforms) a.uniformsList.push([a.uniforms[i], i])
    }, this.setFaceCulling = function (a, b) {
        a === THREE.CullFaceNone ? Q.disable(Q.CULL_FACE) : (b === THREE.FrontFaceDirectionCW ? Q.frontFace(Q.CW) : Q.frontFace(Q.CCW), a === THREE.CullFaceBack ? Q.cullFace(Q.BACK) : a === THREE.CullFaceFront ? Q.cullFace(Q.FRONT) : Q.cullFace(Q.FRONT_AND_BACK), Q.enable(Q.CULL_FACE))
    }, this.setMaterialFaces = function (a) {
        var b = a.side === THREE.DoubleSide,
            a = a.side === THREE.BackSide;
        db !== b && (b ? Q.disable(Q.CULL_FACE) : Q.enable(Q.CULL_FACE), db = b), eb !== a && (a ? Q.frontFace(Q.CW) : Q.frontFace(Q.CCW), eb = a)
    }, this.setDepthTest = function (a) {
        jb !== a && (a ? Q.enable(Q.DEPTH_TEST) : Q.disable(Q.DEPTH_TEST), jb = a)
    }, this.setDepthWrite = function (a) {
        kb !== a && (Q.depthMask(a), kb = a)
    }, this.setBlending = function (a, b, c, d) {
        a !== fb && (a === THREE.NoBlending ? Q.disable(Q.BLEND) : a === THREE.AdditiveBlending ? (Q.enable(Q.BLEND), Q.blendEquation(Q.FUNC_ADD), Q.blendFunc(Q.SRC_ALPHA, Q.ONE)) : a === THREE.SubtractiveBlending ? (Q.enable(Q.BLEND), Q.blendEquation(Q.FUNC_ADD), Q.blendFunc(Q.ZERO, Q.ONE_MINUS_SRC_COLOR)) : a === THREE.MultiplyBlending ? (Q.enable(Q.BLEND), Q.blendEquation(Q.FUNC_ADD), Q.blendFunc(Q.ZERO, Q.SRC_COLOR)) : a === THREE.CustomBlending ? Q.enable(Q.BLEND) : (Q.enable(Q.BLEND), Q.blendEquationSeparate(Q.FUNC_ADD, Q.FUNC_ADD), Q.blendFuncSeparate(Q.SRC_ALPHA, Q.ONE_MINUS_SRC_ALPHA, Q.ONE, Q.ONE_MINUS_SRC_ALPHA)), fb = a), a === THREE.CustomBlending ? (b !== gb && (Q.blendEquation(G(b)), gb = b), (c !== hb || d !== ib) && (Q.blendFunc(G(c), G(d)), hb = c, ib = d)) : ib = hb = gb = null
    }, this.setTexture = function (a, b) {
        if (a.needsUpdate) {
            a.__webglInit || (a.__webglInit = !0, a.addEventListener("dispose", Rb), a.__webglTexture = Q.createTexture(), V.info.memory.textures++), Q.activeTexture(Q.TEXTURE0 + b), Q.bindTexture(Q.TEXTURE_2D, a.__webglTexture), Q.pixelStorei(Q.UNPACK_FLIP_Y_WEBGL, a.flipY), Q.pixelStorei(Q.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha), Q.pixelStorei(Q.UNPACK_ALIGNMENT, a.unpackAlignment);
            var c = a.image,
                d = 0 === (c.width & c.width - 1) && 0 === (c.height & c.height - 1),
                e = G(a.format),
                f = G(a.type);
            D(Q.TEXTURE_2D, a, d);
            var g = a.mipmaps;
            if (a instanceof THREE.DataTexture)
                if (0 < g.length && d) {
                    for (var h = 0, i = g.length; i > h; h++) c = g[h], Q.texImage2D(Q.TEXTURE_2D, h, e, c.width, c.height, 0, e, f, c.data);
                    a.generateMipmaps = !1
                } else Q.texImage2D(Q.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data);
            else if (a instanceof THREE.CompressedTexture)
                for (h = 0, i = g.length; i > h; h++) c = g[h], Q.compressedTexImage2D(Q.TEXTURE_2D, h, e, c.width, c.height, 0, c.data);
            else if (0 < g.length && d) {
                for (h = 0, i = g.length; i > h; h++) c = g[h], Q.texImage2D(Q.TEXTURE_2D, h, e, e, f, c);
                a.generateMipmaps = !1
            } else Q.texImage2D(Q.TEXTURE_2D, 0, e, e, f, a.image);
            a.generateMipmaps && d && Q.generateMipmap(Q.TEXTURE_2D), a.needsUpdate = !1, a.onUpdate && a.onUpdate()
        } else Q.activeTexture(Q.TEXTURE0 + b), Q.bindTexture(Q.TEXTURE_2D, a.__webglTexture)
    }, this.setRenderTarget = function (a) {
        var b = a instanceof THREE.WebGLRenderTargetCube;
        if (a && !a.__webglFramebuffer) {
            void 0 === a.depthBuffer && (a.depthBuffer = !0), void 0 === a.stencilBuffer && (a.stencilBuffer = !0), a.addEventListener("dispose", Sb), a.__webglTexture = Q.createTexture(), V.info.memory.textures++;
            var c = 0 === (a.width & a.width - 1) && 0 === (a.height & a.height - 1),
                d = G(a.format),
                e = G(a.type);
            if (b) {
                a.__webglFramebuffer = [], a.__webglRenderbuffer = [], Q.bindTexture(Q.TEXTURE_CUBE_MAP, a.__webglTexture), D(Q.TEXTURE_CUBE_MAP, a, c);
                for (var f = 0; 6 > f; f++) {
                    a.__webglFramebuffer[f] = Q.createFramebuffer(), a.__webglRenderbuffer[f] = Q.createRenderbuffer(), Q.texImage2D(Q.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a.height, 0, d, e, null);
                    var g = a,
                        h = Q.TEXTURE_CUBE_MAP_POSITIVE_X + f;
                    Q.bindFramebuffer(Q.FRAMEBUFFER, a.__webglFramebuffer[f]), Q.framebufferTexture2D(Q.FRAMEBUFFER, Q.COLOR_ATTACHMENT0, h, g.__webglTexture, 0), E(a.__webglRenderbuffer[f], a)
                }
                c && Q.generateMipmap(Q.TEXTURE_CUBE_MAP)
            } else a.__webglFramebuffer = Q.createFramebuffer(), a.__webglRenderbuffer = a.shareDepthFrom ? a.shareDepthFrom.__webglRenderbuffer : Q.createRenderbuffer(), Q.bindTexture(Q.TEXTURE_2D, a.__webglTexture), D(Q.TEXTURE_2D, a, c), Q.texImage2D(Q.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null), d = Q.TEXTURE_2D, Q.bindFramebuffer(Q.FRAMEBUFFER, a.__webglFramebuffer), Q.framebufferTexture2D(Q.FRAMEBUFFER, Q.COLOR_ATTACHMENT0, d, a.__webglTexture, 0), a.shareDepthFrom ? a.depthBuffer && !a.stencilBuffer ? Q.framebufferRenderbuffer(Q.FRAMEBUFFER, Q.DEPTH_ATTACHMENT, Q.RENDERBUFFER, a.__webglRenderbuffer) : a.depthBuffer && a.stencilBuffer && Q.framebufferRenderbuffer(Q.FRAMEBUFFER, Q.DEPTH_STENCIL_ATTACHMENT, Q.RENDERBUFFER, a.__webglRenderbuffer) : E(a.__webglRenderbuffer, a), c && Q.generateMipmap(Q.TEXTURE_2D);
            b ? Q.bindTexture(Q.TEXTURE_CUBE_MAP, null) : Q.bindTexture(Q.TEXTURE_2D, null), Q.bindRenderbuffer(Q.RENDERBUFFER, null), Q.bindFramebuffer(Q.FRAMEBUFFER, null)
        }
        a ? (b = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer, c = a.width, a = a.height, e = d = 0) : (b = null, c = rb, a = sb, d = pb, e = qb), b !== Z && (Q.bindFramebuffer(Q.FRAMEBUFFER, b), Q.viewport(d, e, c, a), Z = b), tb = c, ub = a
    }, this.shadowMapPlugin = new THREE.ShadowMapPlugin, this.addPrePlugin(this.shadowMapPlugin), this.addPostPlugin(new THREE.SpritePlugin), this.addPostPlugin(new THREE.LensFlarePlugin)
}, THREE.WebGLRenderTarget = function (a, b, c) {
    this.width = a, this.height = b, c = c || {}, this.wrapS = void 0 !== c.wrapS ? c.wrapS : THREE.ClampToEdgeWrapping, this.wrapT = void 0 !== c.wrapT ? c.wrapT : THREE.ClampToEdgeWrapping, this.magFilter = void 0 !== c.magFilter ? c.magFilter : THREE.LinearFilter, this.minFilter = void 0 !== c.minFilter ? c.minFilter : THREE.LinearMipMapLinearFilter, this.anisotropy = void 0 !== c.anisotropy ? c.anisotropy : 1, this.offset = new THREE.Vector2(0, 0), this.repeat = new THREE.Vector2(1, 1), this.format = void 0 !== c.format ? c.format : THREE.RGBAFormat, this.type = void 0 !== c.type ? c.type : THREE.UnsignedByteType, this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0, this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0, this.generateMipmaps = !0, this.shareDepthFrom = null
}, THREE.WebGLRenderTarget.prototype = {
    constructor: THREE.WebGLRenderTarget,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    clone: function () {
        var a = new THREE.WebGLRenderTarget(this.width, this.height);
        return a.wrapS = this.wrapS, a.wrapT = this.wrapT, a.magFilter = this.magFilter, a.minFilter = this.minFilter, a.anisotropy = this.anisotropy, a.offset.copy(this.offset), a.repeat.copy(this.repeat), a.format = this.format, a.type = this.type, a.depthBuffer = this.depthBuffer, a.stencilBuffer = this.stencilBuffer, a.generateMipmaps = this.generateMipmaps, a.shareDepthFrom = this.shareDepthFrom, a
    },
    dispose: function () {
        this.dispatchEvent({
            type: "dispose"
        })
    }
}, THREE.WebGLRenderTargetCube = function (a, b, c) {
    THREE.WebGLRenderTarget.call(this, a, b, c), this.activeCubeFace = 0
}, THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype), THREE.RenderableVertex = function () {
    this.positionWorld = new THREE.Vector3, this.positionScreen = new THREE.Vector4, this.visible = !0
}, THREE.RenderableVertex.prototype.copy = function (a) {
    this.positionWorld.copy(a.positionWorld), this.positionScreen.copy(a.positionScreen)
}, THREE.RenderableFace3 = function () {
    this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.centroidModel = new THREE.Vector3, this.normalModel = new THREE.Vector3, this.normalModelView = new THREE.Vector3, this.vertexNormalsLength = 0, this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.material = this.color = null, this.uvs = [[]], this.z = null
}, THREE.RenderableFace4 = function () {
    this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.v3 = new THREE.RenderableVertex, this.v4 = new THREE.RenderableVertex, this.centroidModel = new THREE.Vector3, this.normalModel = new THREE.Vector3, this.normalModelView = new THREE.Vector3, this.vertexNormalsLength = 0, this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.vertexNormalsModelView = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3], this.material = this.color = null, this.uvs = [[]], this.z = null
}, THREE.RenderableObject = function () {
    this.z = this.object = null
}, THREE.RenderableParticle = function () {
    this.rotation = this.z = this.y = this.x = this.object = null, this.scale = new THREE.Vector2, this.material = null
}, THREE.RenderableLine = function () {
    this.z = null, this.v1 = new THREE.RenderableVertex, this.v2 = new THREE.RenderableVertex, this.vertexColors = [new THREE.Color, new THREE.Color], this.material = null
}, THREE.GeometryUtils = {
    merge: function (a, b, c) {
        var d, e, f = a.vertices.length,
            g = b instanceof THREE.Mesh ? b.geometry : b,
            h = a.vertices,
            i = g.vertices,
            j = a.faces,
            k = g.faces,
            a = a.faceVertexUvs[0],
            g = g.faceVertexUvs[0];
        void 0 === c && (c = 0), b instanceof THREE.Mesh && (b.matrixAutoUpdate && b.updateMatrix(), d = b.matrix, e = (new THREE.Matrix3).getNormalMatrix(d));
        for (var b = 0, l = i.length; l > b; b++) {
            var m = i[b].clone();
            d && m.applyMatrix4(d), h.push(m)
        }
        for (b = 0, l = k.length; l > b; b++) {
            var n, o, m = k[b],
                p = m.vertexNormals,
                q = m.vertexColors;
            for (m instanceof THREE.Face3 ? n = new THREE.Face3(m.a + f, m.b + f, m.c + f) : m instanceof THREE.Face4 && (n = new THREE.Face4(m.a + f, m.b + f, m.c + f, m.d + f)), n.normal.copy(m.normal), e && n.normal.applyMatrix3(e).normalize(), h = 0, i = p.length; i > h; h++) o = p[h].clone(), e && o.applyMatrix3(e).normalize(), n.vertexNormals.push(o);
            for (n.color.copy(m.color), h = 0, i = q.length; i > h; h++) o = q[h], n.vertexColors.push(o.clone());
            n.materialIndex = m.materialIndex + c, n.centroid.copy(m.centroid), d && n.centroid.applyMatrix4(d), j.push(n)
        }
        for (b = 0, l = g.length; l > b; b++) {
            for (c = g[b], d = [], h = 0, i = c.length; i > h; h++) d.push(new THREE.Vector2(c[h].x, c[h].y));
            a.push(d)
        }
    },
    removeMaterials: function (a, b) {
        for (var c = {}, d = 0, e = b.length; e > d; d++) c[b[d]] = !0;
        for (var f, g = [], d = 0, e = a.faces.length; e > d; d++) f = a.faces[d], f.materialIndex in c || g.push(f);
        a.faces = g
    },
    randomPointInTriangle: function (a, b, c) {
        var d, e, f, g = new THREE.Vector3,
            h = THREE.GeometryUtils.__v1;
        return d = THREE.GeometryUtils.random(), e = THREE.GeometryUtils.random(), d + e > 1 && (d = 1 - d, e = 1 - e), f = 1 - d - e, g.copy(a), g.multiplyScalar(d), h.copy(b), h.multiplyScalar(e), g.add(h), h.copy(c), h.multiplyScalar(f), g.add(h), g
    },
    randomPointInFace: function (a, b, c) {
        var d, e, f;
        if (a instanceof THREE.Face3) return d = b.vertices[a.a], e = b.vertices[a.b], f = b.vertices[a.c], THREE.GeometryUtils.randomPointInTriangle(d, e, f);
        if (a instanceof THREE.Face4) {
            d = b.vertices[a.a], e = b.vertices[a.b], f = b.vertices[a.c];
            var g, b = b.vertices[a.d];
            return c ? a._area1 && a._area2 ? (c = a._area1, g = a._area2) : (c = THREE.GeometryUtils.triangleArea(d, e, b), g = THREE.GeometryUtils.triangleArea(e, f, b), a._area1 = c, a._area2 = g) : (c = THREE.GeometryUtils.triangleArea(d, e, b), g = THREE.GeometryUtils.triangleArea(e, f, b)), THREE.GeometryUtils.random() * (c + g) < c ? THREE.GeometryUtils.randomPointInTriangle(d, e, b) : THREE.GeometryUtils.randomPointInTriangle(e, f, b)
        }
    },
    randomPointsInGeometry: function (a, b) {
        function c(a) {
            function b(c, d) {
                if (c > d) return c;
                var e = c + Math.floor((d - c) / 2);
                return n[e] > a ? b(c, e - 1) : n[e] < a ? b(e + 1, d) : e
            }
            return b(0, n.length - 1)
        }
        var d, e, f, g, h, i, j = a.faces,
            k = a.vertices,
            l = j.length,
            m = 0,
            n = [];
        for (e = 0; l > e; e++) d = j[e], d instanceof THREE.Face3 ? (f = k[d.a], g = k[d.b], h = k[d.c], d._area = THREE.GeometryUtils.triangleArea(f, g, h)) : d instanceof THREE.Face4 && (f = k[d.a], g = k[d.b], h = k[d.c], i = k[d.d], d._area1 = THREE.GeometryUtils.triangleArea(f, g, i), d._area2 = THREE.GeometryUtils.triangleArea(g, h, i), d._area = d._area1 + d._area2), m += d._area, n[e] = m;
        for (d = [], e = 0; b > e; e++) k = THREE.GeometryUtils.random() * m, k = c(k), d[e] = THREE.GeometryUtils.randomPointInFace(j[k], a, !0);
        return d
    },
    triangleArea: function (a, b, c) {
        var d = THREE.GeometryUtils.__v1,
            e = THREE.GeometryUtils.__v2;
        return d.subVectors(b, a), e.subVectors(c, a), d.cross(e), .5 * d.length()
    },
    center: function (a) {
        a.computeBoundingBox();
        var b = a.boundingBox,
            c = new THREE.Vector3;
        return c.addVectors(b.min, b.max), c.multiplyScalar(-.5), a.applyMatrix((new THREE.Matrix4).makeTranslation(c.x, c.y, c.z)), a.computeBoundingBox(), c
    },
    normalizeUVs: function (a) {
        for (var a = a.faceVertexUvs[0], b = 0, c = a.length; c > b; b++)
            for (var d = a[b], e = 0, f = d.length; f > e; e++) 1 !== d[e].x && (d[e].x -= Math.floor(d[e].x)), 1 !== d[e].y && (d[e].y -= Math.floor(d[e].y))
    },
    triangulateQuads: function (a) {
        var b, c, d, e, f = [],
            g = [],
            h = [];
        for (b = 0, c = a.faceUvs.length; c > b; b++) g[b] = [];
        for (b = 0, c = a.faceVertexUvs.length; c > b; b++) h[b] = [];
        for (b = 0, c = a.faces.length; c > b; b++)
            if (d = a.faces[b], d instanceof THREE.Face4) {
                e = d.a;
                var i = d.b,
                    j = d.c,
                    k = d.d,
                    l = new THREE.Face3,
                    m = new THREE.Face3;
                for (l.color.copy(d.color), m.color.copy(d.color), l.materialIndex = d.materialIndex, m.materialIndex = d.materialIndex, l.a = e, l.b = i, l.c = k, m.a = i, m.b = j, m.c = k, 4 === d.vertexColors.length && (l.vertexColors[0] = d.vertexColors[0].clone(), l.vertexColors[1] = d.vertexColors[1].clone(), l.vertexColors[2] = d.vertexColors[3].clone(), m.vertexColors[0] = d.vertexColors[1].clone(), m.vertexColors[1] = d.vertexColors[2].clone(), m.vertexColors[2] = d.vertexColors[3].clone()), f.push(l, m), d = 0, e = a.faceVertexUvs.length; e > d; d++) a.faceVertexUvs[d].length && (l = a.faceVertexUvs[d][b], i = l[1], j = l[2], k = l[3], l = [l[0].clone(), i.clone(), k.clone()], i = [i.clone(), j.clone(), k.clone()], h[d].push(l, i));
                for (d = 0, e = a.faceUvs.length; e > d; d++) a.faceUvs[d].length && (i = a.faceUvs[d][b], g[d].push(i, i))
            } else {
                for (f.push(d), d = 0, e = a.faceUvs.length; e > d; d++) g[d].push(a.faceUvs[d][b]);
                for (d = 0, e = a.faceVertexUvs.length; e > d; d++) h[d].push(a.faceVertexUvs[d][b])
            }
        a.faces = f, a.faceUvs = g, a.faceVertexUvs = h, a.computeCentroids(), a.computeFaceNormals(), a.computeVertexNormals(), a.hasTangents && a.computeTangents()
    },
    setMaterialIndex: function (a, b, c, d) {
        for (a = a.faces, d = d || a.length - 1, c = c || 0; d >= c; c++) a[c].materialIndex = b
    }
}, THREE.GeometryUtils.random = THREE.Math.random16, THREE.GeometryUtils.__v1 = new THREE.Vector3, THREE.GeometryUtils.__v2 = new THREE.Vector3, THREE.ImageUtils = {
    crossOrigin: "anonymous",
    loadTexture: function (a, b, c, d) {
        var e = new Image,
            f = new THREE.Texture(e, b),
            b = new THREE.ImageLoader;
        return b.addEventListener("load", function (a) {
            f.image = a.content, f.needsUpdate = !0, c && c(f)
        }), b.addEventListener("error", function (a) {
            d && d(a.message)
        }), b.crossOrigin = this.crossOrigin, b.load(a, e), f.sourceFile = a, f
    },
    loadCompressedTexture: function (a, b, c, d) {
        var e = new THREE.CompressedTexture;
        e.mapping = b;
        var f = new XMLHttpRequest;
        return f.onload = function () {
            var a = THREE.ImageUtils.parseDDS(f.response, !0);
            e.format = a.format, e.mipmaps = a.mipmaps, e.image.width = a.width, e.image.height = a.height, e.generateMipmaps = !1, e.needsUpdate = !0, c && c(e)
        }, f.onerror = d, f.open("GET", a, !0), f.responseType = "arraybuffer", f.send(null), e
    },
    loadTextureCube: function (a, b, c, d) {
        var e = [];
        e.loadCount = 0;
        var f = new THREE.Texture;
        f.image = e, void 0 !== b && (f.mapping = b), f.flipY = !1;
        for (var b = 0, g = a.length; g > b; ++b) {
            var h = new Image;
            e[b] = h, h.onload = function () {
                e.loadCount += 1, 6 === e.loadCount && (f.needsUpdate = !0, c && c(f))
            }, h.onerror = d, h.crossOrigin = this.crossOrigin, h.src = a[b]
        }
        return f
    },
    loadCompressedTextureCube: function (a, b, c, d) {
        var e = [];
        e.loadCount = 0;
        var f = new THREE.CompressedTexture;
        if (f.image = e, void 0 !== b && (f.mapping = b), f.flipY = !1, f.generateMipmaps = !1, b = function (a, b) {
            return function () {
                var d = THREE.ImageUtils.parseDDS(a.response, !0);
                b.format = d.format, b.mipmaps = d.mipmaps, b.width = d.width, b.height = d.height, e.loadCount += 1, 6 === e.loadCount && (f.format = d.format, f.needsUpdate = !0, c && c(f))
            }
        }, a instanceof Array)
            for (var g = 0, h = a.length; h > g; ++g) {
                var i = {};
                e[g] = i;
                var j = new XMLHttpRequest;
                j.onload = b(j, i), j.onerror = d, i = a[g], j.open("GET", i, !0), j.responseType = "arraybuffer", j.send(null)
            } else j = new XMLHttpRequest, j.onload = function () {
                var a = THREE.ImageUtils.parseDDS(j.response, !0);
                if (a.isCubemap) {
                    for (var b = a.mipmaps.length / a.mipmapCount, d = 0; b > d; d++) {
                        e[d] = {
                            mipmaps: []
                        };
                        for (var g = 0; g < a.mipmapCount; g++) e[d].mipmaps.push(a.mipmaps[d * a.mipmapCount + g]), e[d].format = a.format, e[d].width = a.width, e[d].height = a.height
                    }
                    f.format = a.format, f.needsUpdate = !0, c && c(f)
                }
            }, j.onerror = d, j.open("GET", a, !0), j.responseType = "arraybuffer", j.send(null);
        return f
    },
    parseDDS: function (a, b) {
        function c(a) {
            return a.charCodeAt(0) + (a.charCodeAt(1) << 8) + (a.charCodeAt(2) << 16) + (a.charCodeAt(3) << 24)
        }
        var d = {
                mipmaps: [],
                width: 0,
                height: 0,
                format: null,
                mipmapCount: 1
            },
            e = c("DXT1"),
            f = c("DXT3"),
            g = c("DXT5"),
            h = new Int32Array(a, 0, 31);
        if (542327876 !== h[0]) return console.error("ImageUtils.parseDDS(): Invalid magic number in DDS header"), d;
        if (4 & !h[20]) return console.error("ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"), d;
        var i = h[21];
        switch (i) {
        case e:
            e = 8, d.format = THREE.RGB_S3TC_DXT1_Format;
            break;
        case f:
            e = 16, d.format = THREE.RGBA_S3TC_DXT3_Format;
            break;
        case g:
            e = 16, d.format = THREE.RGBA_S3TC_DXT5_Format;
            break;
        default:
            return console.error("ImageUtils.parseDDS(): Unsupported FourCC code: ", String.fromCharCode(255 & i, 255 & i >> 8, 255 & i >> 16, 255 & i >> 24)), d
        }
        d.mipmapCount = 1, 131072 & h[2] && !1 !== b && (d.mipmapCount = Math.max(1, h[7])), d.isCubemap = 512 & h[28] ? !0 : !1, d.width = h[4], d.height = h[3];
        for (var h = h[1] + 4, f = d.width, g = d.height, i = d.isCubemap ? 6 : 1, j = 0; i > j; j++) {
            for (var k = 0; k < d.mipmapCount; k++) {
                var l = Math.max(4, f) / 4 * Math.max(4, g) / 4 * e,
                    m = {
                        data: new Uint8Array(a, h, l),
                        width: f,
                        height: g
                    };
                d.mipmaps.push(m), h += l, f = Math.max(.5 * f, 1), g = Math.max(.5 * g, 1)
            }
            f = d.width, g = d.height
        }
        return d
    },
    getNormalMap: function (a, b) {
        var c = function (a) {
                var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
                return [a[0] / b, a[1] / b, a[2] / b]
            },
            b = 1 | b,
            d = a.width,
            e = a.height,
            f = document.createElement("canvas");
        f.width = d, f.height = e;
        var g = f.getContext("2d");
        g.drawImage(a, 0, 0);
        for (var h = g.getImageData(0, 0, d, e).data, i = g.createImageData(d, e), j = i.data, k = 0; d > k; k++)
            for (var l = 0; e > l; l++) {
                var m = 0 > l - 1 ? 0 : l - 1,
                    n = l + 1 > e - 1 ? e - 1 : l + 1,
                    o = 0 > k - 1 ? 0 : k - 1,
                    p = k + 1 > d - 1 ? d - 1 : k + 1,
                    q = [],
                    r = [0, 0, h[4 * (l * d + k)] / 255 * b];
                for (q.push([-1, 0, h[4 * (l * d + o)] / 255 * b]), q.push([-1, -1, h[4 * (m * d + o)] / 255 * b]), q.push([0, -1, h[4 * (m * d + k)] / 255 * b]), q.push([1, -1, h[4 * (m * d + p)] / 255 * b]), q.push([1, 0, h[4 * (l * d + p)] / 255 * b]), q.push([1, 1, h[4 * (n * d + p)] / 255 * b]), q.push([0, 1, h[4 * (n * d + k)] / 255 * b]), q.push([-1, 1, h[4 * (n * d + o)] / 255 * b]), m = [], o = q.length, n = 0; o > n; n++) {
                    var p = q[n],
                        s = q[(n + 1) % o],
                        p = [p[0] - r[0], p[1] - r[1], p[2] - r[2]],
                        s = [s[0] - r[0], s[1] - r[1], s[2] - r[2]];
                    m.push(c([p[1] * s[2] - p[2] * s[1], p[2] * s[0] - p[0] * s[2], p[0] * s[1] - p[1] * s[0]]))
                }
                for (q = [0, 0, 0], n = 0; n < m.length; n++) q[0] += m[n][0], q[1] += m[n][1], q[2] += m[n][2];
                q[0] /= m.length, q[1] /= m.length, q[2] /= m.length, r = 4 * (l * d + k), j[r] = 0 | 255 * ((q[0] + 1) / 2), j[r + 1] = 0 | 255 * ((q[1] + 1) / 2), j[r + 2] = 0 | 255 * q[2], j[r + 3] = 255
            }
        return g.putImageData(i, 0, 0), f
    },
    generateDataTexture: function (a, b, c) {
        for (var d = a * b, e = new Uint8Array(3 * d), f = Math.floor(255 * c.r), g = Math.floor(255 * c.g), c = Math.floor(255 * c.b), h = 0; d > h; h++) e[3 * h] = f, e[3 * h + 1] = g, e[3 * h + 2] = c;
        return a = new THREE.DataTexture(e, a, b, THREE.RGBFormat), a.needsUpdate = !0, a
    }
}, THREE.SceneUtils = {
    createMultiMaterialObject: function (a, b) {
        for (var c = new THREE.Object3D, d = 0, e = b.length; e > d; d++) c.add(new THREE.Mesh(a, b[d]));
        return c
    },
    detach: function (a, b, c) {
        a.applyMatrix(b.matrixWorld), b.remove(a), c.add(a)
    },
    attach: function (a, b, c) {
        var d = new THREE.Matrix4;
        d.getInverse(c.matrixWorld), a.applyMatrix(d), b.remove(a), c.add(a)
    }
}, THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function () {
        return this.faces[this.face][this.weight][this.style]
    },
    loadFace: function (a) {
        var b = a.familyName.toLowerCase();
        return this.faces[b] = this.faces[b] || {}, this.faces[b][a.cssFontWeight] = this.faces[b][a.cssFontWeight] || {}, this.faces[b][a.cssFontWeight][a.cssFontStyle] = a, this.faces[b][a.cssFontWeight][a.cssFontStyle] = a
    },
    drawText: function (a) {
        for (var b = this.getFace(), c = this.size / b.resolution, d = 0, e = String(a).split(""), f = e.length, g = [], a = 0; f > a; a++) {
            var h = new THREE.Path,
                h = this.extractGlyphPoints(e[a], b, c, d, h),
                d = d + h.offset;
            g.push(h.path)
        }
        return {
            paths: g,
            offset: d / 2
        }
    },
    extractGlyphPoints: function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, m, n, o, p, q = [],
            r = b.glyphs[a] || b.glyphs["?"];
        if (r) {
            if (r.o)
                for (b = r._cachedOutline || (r._cachedOutline = r.o.split(" ")), i = b.length, a = 0; i > a;) switch (h = b[a++]) {
                case "m":
                    h = b[a++] * c + d, j = b[a++] * c, e.moveTo(h, j);
                    break;
                case "l":
                    h = b[a++] * c + d, j = b[a++] * c, e.lineTo(h, j);
                    break;
                case "q":
                    if (h = b[a++] * c + d, j = b[a++] * c, m = b[a++] * c + d, n = b[a++] * c, e.quadraticCurveTo(m, n, h, j), f = q[q.length - 1])
                        for (k = f.x, l = f.y, f = 1, g = this.divisions; g >= f; f++) {
                            var s = f / g;
                            THREE.Shape.Utils.b2(s, k, m, h), THREE.Shape.Utils.b2(s, l, n, j)
                        }
                    break;
                case "b":
                    if (h = b[a++] * c + d, j = b[a++] * c, m = b[a++] * c + d, n = b[a++] * -c, o = b[a++] * c + d, p = b[a++] * -c, e.bezierCurveTo(h, j, m, n, o, p), f = q[q.length - 1])
                        for (k = f.x, l = f.y, f = 1, g = this.divisions; g >= f; f++) s = f / g, THREE.Shape.Utils.b3(s, k, m, o, h), THREE.Shape.Utils.b3(s, l, n, p, j)
                }
            return {
                offset: r.ha * c,
                path: e
            }
        }
    }
}, THREE.FontUtils.generateShapes = function (a, b) {
    var b = b || {},
        c = void 0 !== b.curveSegments ? b.curveSegments : 4,
        d = void 0 !== b.font ? b.font : "helvetiker",
        e = void 0 !== b.weight ? b.weight : "normal",
        f = void 0 !== b.style ? b.style : "normal";
    for (THREE.FontUtils.size = void 0 !== b.size ? b.size : 100, THREE.FontUtils.divisions = c, THREE.FontUtils.face = d, THREE.FontUtils.weight = e, THREE.FontUtils.style = f, c = THREE.FontUtils.drawText(a).paths, d = [], e = 0, f = c.length; f > e; e++) Array.prototype.push.apply(d, c[e].toShapes());
    return d
},
function (a) {
    var b = function (a) {
        for (var b = a.length, c = 0, d = b - 1, e = 0; b > e; d = e++) c += a[d].x * a[e].y - a[e].x * a[d].y;
        return .5 * c
    };
    return a.Triangulate = function (a, c) {
        var d = a.length;
        if (3 > d) return null;
        var e, f, g, h = [],
            i = [],
            j = [];
        if (0 < b(a))
            for (f = 0; d > f; f++) i[f] = f;
        else
            for (f = 0; d > f; f++) i[f] = d - 1 - f;
        var k = 2 * d;
        for (f = d - 1; d > 2;) {
            if (0 >= k--) {
                console.log("Warning, unable to triangulate polygon!");
                break
            }
            e = f, e >= d && (e = 0), f = e + 1, f >= d && (f = 0), g = f + 1, g >= d && (g = 0);
            var l;
            a: {
                var m = l = void 0,
                    n = void 0,
                    o = void 0,
                    p = void 0,
                    q = void 0,
                    r = void 0,
                    s = void 0,
                    t = void 0,
                    m = a[i[e]].x,
                    n = a[i[e]].y,
                    o = a[i[f]].x,
                    p = a[i[f]].y,
                    q = a[i[g]].x,
                    r = a[i[g]].y;
                if (1e-10 > (o - m) * (r - n) - (p - n) * (q - m)) l = !1;
                else {
                    var u = void 0,
                        v = void 0,
                        w = void 0,
                        x = void 0,
                        y = void 0,
                        z = void 0,
                        A = void 0,
                        B = void 0,
                        C = void 0,
                        D = void 0,
                        C = B = A = t = s = void 0,
                        u = q - o,
                        v = r - p,
                        w = m - q,
                        x = n - r,
                        y = o - m,
                        z = p - n;
                    for (l = 0; d > l; l++)
                        if (l !== e && l !== f && l !== g && (s = a[i[l]].x, t = a[i[l]].y, A = s - m, B = t - n, C = s - o, D = t - p, s -= q, t -= r, C = u * D - v * C, A = y * B - z * A, B = w * t - x * s, C >= 0 && B >= 0 && A >= 0)) {
                            l = !1;
                            break a
                        }
                    l = !0
                }
            }
            if (l) {
                for (h.push([a[i[e]], a[i[f]], a[i[g]]]), j.push([i[e], i[f], i[g]]), e = f, g = f + 1; d > g; e++, g++) i[e] = i[g];
                d--, k = 2 * d
            }
        }
        return c ? j : h
    }, a.Triangulate.area = b, a
}(THREE.FontUtils), self._typeface_js = {
    faces: THREE.FontUtils.faces,
    loadFace: THREE.FontUtils.loadFace
}, THREE.typeface_js = self._typeface_js, THREE.Curve = function () {}, THREE.Curve.prototype.getPoint = function () {
    return console.log("Warning, getPoint() not implemented!"), null
}, THREE.Curve.prototype.getPointAt = function (a) {
    return a = this.getUtoTmapping(a), this.getPoint(a)
}, THREE.Curve.prototype.getPoints = function (a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; a >= b; b++) c.push(this.getPoint(b / a));
    return c
}, THREE.Curve.prototype.getSpacedPoints = function (a) {
    a || (a = 5);
    var b, c = [];
    for (b = 0; a >= b; b++) c.push(this.getPointAt(b / a));
    return c
}, THREE.Curve.prototype.getLength = function () {
    var a = this.getLengths();
    return a[a.length - 1]
}, THREE.Curve.prototype.getLengths = function (a) {
    if (a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == a + 1 && !this.needsUpdate) return this.cacheArcLengths;
    this.needsUpdate = !1;
    var b, c, d = [],
        e = this.getPoint(0),
        f = 0;
    for (d.push(0), c = 1; a >= c; c++) b = this.getPoint(c / a), f += b.distanceTo(e), d.push(f), e = b;
    return this.cacheArcLengths = d
}, THREE.Curve.prototype.updateArcLengths = function () {
    this.needsUpdate = !0, this.getLengths()
}, THREE.Curve.prototype.getUtoTmapping = function (a, b) {
    var c, d = this.getLengths(),
        e = 0,
        f = d.length;
    c = b ? b : a * d[f - 1];
    for (var g, h = 0, i = f - 1; i >= h;)
        if (e = Math.floor(h + (i - h) / 2), g = d[e] - c, 0 > g) h = e + 1;
        else {
            if (!(g > 0)) {
                i = e;
                break
            }
            i = e - 1
        }
    return e = i, d[e] == c ? e / (f - 1) : (h = d[e], d = (e + (c - h) / (d[e + 1] - h)) / (f - 1))
}, THREE.Curve.prototype.getTangent = function (a) {
    var b = a - 1e-4,
        a = a + 1e-4;
    return 0 > b && (b = 0), a > 1 && (a = 1), b = this.getPoint(b), this.getPoint(a).clone().sub(b).normalize()
}, THREE.Curve.prototype.getTangentAt = function (a) {
    return a = this.getUtoTmapping(a), this.getTangent(a)
}, THREE.LineCurve = function (a, b) {
    this.v1 = a, this.v2 = b
}, THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype), THREE.LineCurve.prototype.getPoint = function (a) {
    var b = this.v2.clone().sub(this.v1);
    return b.multiplyScalar(a).add(this.v1), b
}, THREE.LineCurve.prototype.getPointAt = function (a) {
    return this.getPoint(a)
}, THREE.LineCurve.prototype.getTangent = function () {
    return this.v2.clone().sub(this.v1).normalize()
}, THREE.QuadraticBezierCurve = function (a, b, c) {
    this.v0 = a, this.v1 = b, this.v2 = c
}, THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype), THREE.QuadraticBezierCurve.prototype.getPoint = function (a) {
    var b;
    return b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x), a = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y), new THREE.Vector2(b, a)
}, THREE.QuadraticBezierCurve.prototype.getTangent = function (a) {
    var b;
    return b = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x), a = THREE.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y), b = new THREE.Vector2(b, a), b.normalize(), b
}, THREE.CubicBezierCurve = function (a, b, c, d) {
    this.v0 = a, this.v1 = b, this.v2 = c, this.v3 = d
}, THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype), THREE.CubicBezierCurve.prototype.getPoint = function (a) {
    var b;
    return b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), a = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), new THREE.Vector2(b, a)
}, THREE.CubicBezierCurve.prototype.getTangent = function (a) {
    var b;
    return b = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), a = THREE.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), b = new THREE.Vector2(b, a), b.normalize(), b
}, THREE.SplineCurve = function (a) {
    this.points = void 0 == a ? [] : a
}, THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype), THREE.SplineCurve.prototype.getPoint = function (a) {
    var b, c = new THREE.Vector2,
        d = [],
        e = this.points;
    return b = (e.length - 1) * a, a = Math.floor(b), b -= a, d[0] = 0 == a ? a : a - 1, d[1] = a, d[2] = a > e.length - 2 ? e.length - 1 : a + 1, d[3] = a > e.length - 3 ? e.length - 1 : a + 2, c.x = THREE.Curve.Utils.interpolate(e[d[0]].x, e[d[1]].x, e[d[2]].x, e[d[3]].x, b), c.y = THREE.Curve.Utils.interpolate(e[d[0]].y, e[d[1]].y, e[d[2]].y, e[d[3]].y, b), c
}, THREE.EllipseCurve = function (a, b, c, d, e, f, g) {
    this.aX = a, this.aY = b, this.xRadius = c, this.yRadius = d, this.aStartAngle = e, this.aEndAngle = f, this.aClockwise = g
}, THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype), THREE.EllipseCurve.prototype.getPoint = function (a) {
    var b = this.aEndAngle - this.aStartAngle;
    return this.aClockwise || (a = 1 - a), b = this.aStartAngle + a * b, a = this.aX + this.xRadius * Math.cos(b), b = this.aY + this.yRadius * Math.sin(b), new THREE.Vector2(a, b)
}, THREE.ArcCurve = function (a, b, c, d, e, f) {
    THREE.EllipseCurve.call(this, a, b, c, c, d, e, f)
}, THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype), THREE.Curve.Utils = {
    tangentQuadraticBezier: function (a, b, c, d) {
        return 2 * (1 - a) * (c - b) + 2 * a * (d - c)
    },
    tangentCubicBezier: function (a, b, c, d, e) {
        return -3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e
    },
    tangentSpline: function (a) {
        return 6 * a * a - 6 * a + (3 * a * a - 4 * a + 1) + (-6 * a * a + 6 * a) + (3 * a * a - 2 * a)
    },
    interpolate: function (a, b, c, d, e) {
        var a = .5 * (c - a),
            d = .5 * (d - b),
            f = e * e;
        return (2 * b - 2 * c + a + d) * e * f + (-3 * b + 3 * c - 2 * a - d) * f + a * e + b
    }
}, THREE.Curve.create = function (a, b) {
    return a.prototype = Object.create(THREE.Curve.prototype), a.prototype.getPoint = b, a
}, THREE.LineCurve3 = THREE.Curve.create(function (a, b) {
    this.v1 = a, this.v2 = b
}, function (a) {
    var b = new THREE.Vector3;
    return b.subVectors(this.v2, this.v1), b.multiplyScalar(a), b.add(this.v1), b
}), THREE.QuadraticBezierCurve3 = THREE.Curve.create(function (a, b, c) {
    this.v0 = a, this.v1 = b, this.v2 = c
}, function (a) {
    var b, c;
    return b = THREE.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x), c = THREE.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y), a = THREE.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z), new THREE.Vector3(b, c, a)
}), THREE.CubicBezierCurve3 = THREE.Curve.create(function (a, b, c, d) {
    this.v0 = a, this.v1 = b, this.v2 = c, this.v3 = d
}, function (a) {
    var b, c;
    return b = THREE.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), c = THREE.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), a = THREE.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z), new THREE.Vector3(b, c, a)
}), THREE.SplineCurve3 = THREE.Curve.create(function (a) {
    this.points = void 0 == a ? [] : a
}, function (a) {
    var b, c = new THREE.Vector3,
        d = [],
        e = this.points,
        a = (e.length - 1) * a;
    b = Math.floor(a), a -= b, d[0] = 0 == b ? b : b - 1, d[1] = b, d[2] = b > e.length - 2 ? e.length - 1 : b + 1, d[3] = b > e.length - 3 ? e.length - 1 : b + 2, b = e[d[0]];
    var f = e[d[1]],
        g = e[d[2]],
        d = e[d[3]];
    return c.x = THREE.Curve.Utils.interpolate(b.x, f.x, g.x, d.x, a), c.y = THREE.Curve.Utils.interpolate(b.y, f.y, g.y, d.y, a), c.z = THREE.Curve.Utils.interpolate(b.z, f.z, g.z, d.z, a), c
}), THREE.ClosedSplineCurve3 = THREE.Curve.create(function (a) {
    this.points = void 0 == a ? [] : a
}, function (a) {
    var b, c = new THREE.Vector3,
        d = [],
        e = this.points;
    return b = (e.length - 0) * a, a = Math.floor(b), b -= a, a += a > 0 ? 0 : (Math.floor(Math.abs(a) / e.length) + 1) * e.length, d[0] = (a - 1) % e.length, d[1] = a % e.length, d[2] = (a + 1) % e.length, d[3] = (a + 2) % e.length, c.x = THREE.Curve.Utils.interpolate(e[d[0]].x, e[d[1]].x, e[d[2]].x, e[d[3]].x, b), c.y = THREE.Curve.Utils.interpolate(e[d[0]].y, e[d[1]].y, e[d[2]].y, e[d[3]].y, b), c.z = THREE.Curve.Utils.interpolate(e[d[0]].z, e[d[1]].z, e[d[2]].z, e[d[3]].z, b), c
}), THREE.CurvePath = function () {
    this.curves = [], this.bends = [], this.autoClose = !1
}, THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype), THREE.CurvePath.prototype.add = function (a) {
    this.curves.push(a)
}, THREE.CurvePath.prototype.checkConnection = function () {}, THREE.CurvePath.prototype.closePath = function () {
    var a = this.curves[0].getPoint(0),
        b = this.curves[this.curves.length - 1].getPoint(1);
    a.equals(b) || this.curves.push(new THREE.LineCurve(b, a))
}, THREE.CurvePath.prototype.getPoint = function (a) {
    for (var b = a * this.getLength(), c = this.getCurveLengths(), a = 0; a < c.length;) {
        if (c[a] >= b) return b = c[a] - b, a = this.curves[a], b = 1 - b / a.getLength(), a.getPointAt(b);
        a++
    }
    return null
}, THREE.CurvePath.prototype.getLength = function () {
    var a = this.getCurveLengths();
    return a[a.length - 1]
}, THREE.CurvePath.prototype.getCurveLengths = function () {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
    var a, b = [],
        c = 0,
        d = this.curves.length;
    for (a = 0; d > a; a++) c += this.curves[a].getLength(), b.push(c);
    return this.cacheLengths = b
}, THREE.CurvePath.prototype.getBoundingBox = function () {
    var a, b, c, d, e, f, g = this.getPoints();
    a = b = Number.NEGATIVE_INFINITY, d = e = Number.POSITIVE_INFINITY;
    var h, i, j, k, l = g[0] instanceof THREE.Vector3;
    for (k = l ? new THREE.Vector3 : new THREE.Vector2, i = 0, j = g.length; j > i; i++) h = g[i], h.x > a ? a = h.x : h.x < d && (d = h.x), h.y > b ? b = h.y : h.y < e && (e = h.y), l && (h.z > c ? c = h.z : h.z < f && (f = h.z)), k.add(h);
    return g = {
        minX: d,
        minY: e,
        maxX: a,
        maxY: b,
        centroid: k.divideScalar(j)
    }, l && (g.maxZ = c, g.minZ = f), g
}, THREE.CurvePath.prototype.createPointsGeometry = function (a) {
    return a = this.getPoints(a, !0), this.createGeometry(a)
}, THREE.CurvePath.prototype.createSpacedPointsGeometry = function (a) {
    return a = this.getSpacedPoints(a, !0), this.createGeometry(a)
}, THREE.CurvePath.prototype.createGeometry = function (a) {
    for (var b = new THREE.Geometry, c = 0; c < a.length; c++) b.vertices.push(new THREE.Vector3(a[c].x, a[c].y, a[c].z || 0));
    return b
}, THREE.CurvePath.prototype.addWrapPath = function (a) {
    this.bends.push(a)
}, THREE.CurvePath.prototype.getTransformedPoints = function (a, b) {
    var c, d, e = this.getPoints(a);
    for (b || (b = this.bends), c = 0, d = b.length; d > c; c++) e = this.getWrapPoints(e, b[c]);
    return e
}, THREE.CurvePath.prototype.getTransformedSpacedPoints = function (a, b) {
    var c, d, e = this.getSpacedPoints(a);
    for (b || (b = this.bends), c = 0, d = b.length; d > c; c++) e = this.getWrapPoints(e, b[c]);
    return e
}, THREE.CurvePath.prototype.getWrapPoints = function (a, b) {
    var c, d, e, f, g, h, i = this.getBoundingBox();
    for (c = 0, d = a.length; d > c; c++) e = a[c], f = e.x, g = e.y, h = f / i.maxX, h = b.getUtoTmapping(h, f), f = b.getPoint(h), g = b.getNormalVector(h).multiplyScalar(g), e.x = f.x + g.x, e.y = f.y + g.y;
    return a
}, THREE.Gyroscope = function () {
    THREE.Object3D.call(this)
}, THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype), THREE.Gyroscope.prototype.updateMatrixWorld = function (a) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || a) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorld.decompose(this.translationWorld, this.rotationWorld, this.scaleWorld), this.matrix.decompose(this.translationObject, this.rotationObject, this.scaleObject), this.matrixWorld.makeFromPositionQuaternionScale(this.translationWorld, this.rotationObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix), this.matrixWorldNeedsUpdate = !1, a = !0);
    for (var b = 0, c = this.children.length; c > b; b++) this.children[b].updateMatrixWorld(a)
}, THREE.Gyroscope.prototype.translationWorld = new THREE.Vector3, THREE.Gyroscope.prototype.translationObject = new THREE.Vector3, THREE.Gyroscope.prototype.rotationWorld = new THREE.Quaternion, THREE.Gyroscope.prototype.rotationObject = new THREE.Quaternion, THREE.Gyroscope.prototype.scaleWorld = new THREE.Vector3, THREE.Gyroscope.prototype.scaleObject = new THREE.Vector3, THREE.Path = function (a) {
    THREE.CurvePath.call(this), this.actions = [], a && this.fromPoints(a)
}, THREE.Path.prototype = Object.create(THREE.CurvePath.prototype), THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc",
    ELLIPSE: "ellipse"
}, THREE.Path.prototype.fromPoints = function (a) {
    this.moveTo(a[0].x, a[0].y);
    for (var b = 1, c = a.length; c > b; b++) this.lineTo(a[b].x, a[b].y)
}, THREE.Path.prototype.moveTo = function () {
    var a = Array.prototype.slice.call(arguments);
    this.actions.push({
        action: THREE.PathActions.MOVE_TO,
        args: a
    })
}, THREE.Path.prototype.lineTo = function (a, b) {
    var c = Array.prototype.slice.call(arguments),
        d = this.actions[this.actions.length - 1].args,
        d = new THREE.LineCurve(new THREE.Vector2(d[d.length - 2], d[d.length - 1]), new THREE.Vector2(a, b));
    this.curves.push(d), this.actions.push({
        action: THREE.PathActions.LINE_TO,
        args: c
    })
}, THREE.Path.prototype.quadraticCurveTo = function (a, b, c, d) {
    var e = Array.prototype.slice.call(arguments),
        f = this.actions[this.actions.length - 1].args,
        f = new THREE.QuadraticBezierCurve(new THREE.Vector2(f[f.length - 2], f[f.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d));
    this.curves.push(f), this.actions.push({
        action: THREE.PathActions.QUADRATIC_CURVE_TO,
        args: e
    })
}, THREE.Path.prototype.bezierCurveTo = function (a, b, c, d, e, f) {
    var g = Array.prototype.slice.call(arguments),
        h = this.actions[this.actions.length - 1].args,
        h = new THREE.CubicBezierCurve(new THREE.Vector2(h[h.length - 2], h[h.length - 1]), new THREE.Vector2(a, b), new THREE.Vector2(c, d), new THREE.Vector2(e, f));
    this.curves.push(h), this.actions.push({
        action: THREE.PathActions.BEZIER_CURVE_TO,
        args: g
    })
}, THREE.Path.prototype.splineThru = function (a) {
    var b = Array.prototype.slice.call(arguments),
        c = this.actions[this.actions.length - 1].args,
        c = [new THREE.Vector2(c[c.length - 2], c[c.length - 1])];
    Array.prototype.push.apply(c, a), c = new THREE.SplineCurve(c), this.curves.push(c), this.actions.push({
        action: THREE.PathActions.CSPLINE_THRU,
        args: b
    })
}, THREE.Path.prototype.arc = function (a, b, c, d, e, f) {
    var g = this.actions[this.actions.length - 1].args;
    this.absarc(a + g[g.length - 2], b + g[g.length - 1], c, d, e, f)
}, THREE.Path.prototype.absarc = function (a, b, c, d, e, f) {
    this.absellipse(a, b, c, c, d, e, f)
}, THREE.Path.prototype.ellipse = function (a, b, c, d, e, f, g) {
    var h = this.actions[this.actions.length - 1].args;
    this.absellipse(a + h[h.length - 2], b + h[h.length - 1], c, d, e, f, g)
}, THREE.Path.prototype.absellipse = function (a, b, c, d, e, f, g) {
    var h = Array.prototype.slice.call(arguments),
        i = new THREE.EllipseCurve(a, b, c, d, e, f, g);
    this.curves.push(i), i = i.getPoint(g ? 1 : 0), h.push(i.x), h.push(i.y), this.actions.push({
        action: THREE.PathActions.ELLIPSE,
        args: h
    })
}, THREE.Path.prototype.getSpacedPoints = function (a) {
    a || (a = 40);
    for (var b = [], c = 0; a > c; c++) b.push(this.getPoint(c / a));
    return b
}, THREE.Path.prototype.getPoints = function (a, b) {
    if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(a, b);
    var c, d, e, f, g, h, i, j, k, l, m, n, o, a = a || 12,
        p = [];
    for (c = 0, d = this.actions.length; d > c; c++) switch (e = this.actions[c], f = e.action, e = e.args, f) {
    case THREE.PathActions.MOVE_TO:
        p.push(new THREE.Vector2(e[0], e[1]));
        break;
    case THREE.PathActions.LINE_TO:
        p.push(new THREE.Vector2(e[0], e[1]));
        break;
    case THREE.PathActions.QUADRATIC_CURVE_TO:
        for (g = e[2], h = e[3], k = e[0], l = e[1], 0 < p.length ? (f = p[p.length - 1], m = f.x, n = f.y) : (f = this.actions[c - 1].args, m = f[f.length - 2], n = f[f.length - 1]), e = 1; a >= e; e++) o = e / a, f = THREE.Shape.Utils.b2(o, m, k, g), o = THREE.Shape.Utils.b2(o, n, l, h), p.push(new THREE.Vector2(f, o));
        break;
    case THREE.PathActions.BEZIER_CURVE_TO:
        for (g = e[4], h = e[5], k = e[0], l = e[1], i = e[2], j = e[3], 0 < p.length ? (f = p[p.length - 1], m = f.x, n = f.y) : (f = this.actions[c - 1].args, m = f[f.length - 2], n = f[f.length - 1]), e = 1; a >= e; e++) o = e / a, f = THREE.Shape.Utils.b3(o, m, k, i, g), o = THREE.Shape.Utils.b3(o, n, l, j, h), p.push(new THREE.Vector2(f, o));
        break;
    case THREE.PathActions.CSPLINE_THRU:
        for (f = this.actions[c - 1].args, o = [new THREE.Vector2(f[f.length - 2], f[f.length - 1])], f = a * e[0].length, o = o.concat(e[0]), o = new THREE.SplineCurve(o), e = 1; f >= e; e++) p.push(o.getPointAt(e / f));
        break;
    case THREE.PathActions.ARC:
        for (g = e[0], h = e[1], l = e[2], i = e[3], f = e[4], k = !!e[5], m = f - i, n = 2 * a, e = 1; n >= e; e++) o = e / n, k || (o = 1 - o), o = i + o * m, f = g + l * Math.cos(o), o = h + l * Math.sin(o), p.push(new THREE.Vector2(f, o));
        break;
    case THREE.PathActions.ELLIPSE:
        for (g = e[0], h = e[1], l = e[2], j = e[3], i = e[4], f = e[5], k = !!e[6], m = f - i, n = 2 * a, e = 1; n >= e; e++) o = e / n, k || (o = 1 - o), o = i + o * m, f = g + l * Math.cos(o), o = h + j * Math.sin(o), p.push(new THREE.Vector2(f, o))
    }
    return c = p[p.length - 1], 1e-10 > Math.abs(c.x - p[0].x) && 1e-10 > Math.abs(c.y - p[0].y) && p.splice(p.length - 1, 1), b && p.push(p[0]), p
}, THREE.Path.prototype.toShapes = function () {
    var a, b, c, d, e = [],
        f = new THREE.Path;
    for (a = 0, b = this.actions.length; b > a; a++) c = this.actions[a], d = c.args, c = c.action, c == THREE.PathActions.MOVE_TO && 0 != f.actions.length && (e.push(f), f = new THREE.Path), f[c].apply(f, d);
    if (0 != f.actions.length && e.push(f), 0 == e.length) return [];
    var g;
    if (d = [], a = !THREE.Shape.Utils.isClockWise(e[0].getPoints()), 1 == e.length) return f = e[0], g = new THREE.Shape, g.actions = f.actions, g.curves = f.curves, d.push(g), d;
    if (a)
        for (g = new THREE.Shape, a = 0, b = e.length; b > a; a++) f = e[a], THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g.actions = f.actions, g.curves = f.curves, d.push(g), g = new THREE.Shape) : g.holes.push(f);
    else {
        for (a = 0, b = e.length; b > a; a++) f = e[a], THREE.Shape.Utils.isClockWise(f.getPoints()) ? (g && d.push(g), g = new THREE.Shape, g.actions = f.actions, g.curves = f.curves) : g.holes.push(f);
        d.push(g)
    }
    return d
}, THREE.Shape = function () {
    THREE.Path.apply(this, arguments), this.holes = []
}, THREE.Shape.prototype = Object.create(THREE.Path.prototype), THREE.Shape.prototype.extrude = function (a) {
    return new THREE.ExtrudeGeometry(this, a)
}, THREE.Shape.prototype.makeGeometry = function (a) {
    return new THREE.ShapeGeometry(this, a)
}, THREE.Shape.prototype.getPointsHoles = function (a) {
    var b, c = this.holes.length,
        d = [];
    for (b = 0; c > b; b++) d[b] = this.holes[b].getTransformedPoints(a, this.bends);
    return d
}, THREE.Shape.prototype.getSpacedPointsHoles = function (a) {
    var b, c = this.holes.length,
        d = [];
    for (b = 0; c > b; b++) d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
    return d
}, THREE.Shape.prototype.extractAllPoints = function (a) {
    return {
        shape: this.getTransformedPoints(a),
        holes: this.getPointsHoles(a)
    }
}, THREE.Shape.prototype.extractPoints = function (a) {
    return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(a)
}, THREE.Shape.prototype.extractAllSpacedPoints = function (a) {
    return {
        shape: this.getTransformedSpacedPoints(a),
        holes: this.getSpacedPointsHoles(a)
    }
}, THREE.Shape.Utils = {
    removeHoles: function (a, b) {
        var c, d, e, f, g, h, i, j, k, l, m = a.concat(),
            n = m.concat(),
            o = [];
        for (g = 0; g < b.length; g++) {
            for (h = b[g], Array.prototype.push.apply(n, h), d = Number.POSITIVE_INFINITY, c = 0; c < h.length; c++)
                for (k = h[c], l = [], j = 0; j < m.length; j++) i = m[j], i = k.distanceToSquared(i), l.push(i), d > i && (d = i, e = c, f = j);
            c = f - 1 >= 0 ? f - 1 : m.length - 1, d = e - 1 >= 0 ? e - 1 : h.length - 1;
            var p = [h[e], m[f], m[c]];
            j = THREE.FontUtils.Triangulate.area(p);
            var q = [h[e], h[d], m[f]];
            k = THREE.FontUtils.Triangulate.area(q), l = f, i = e, f += 1, e += -1, 0 > f && (f += m.length), f %= m.length, 0 > e && (e += h.length), e %= h.length, c = f - 1 >= 0 ? f - 1 : m.length - 1, d = e - 1 >= 0 ? e - 1 : h.length - 1, p = [h[e], m[f], m[c]], p = THREE.FontUtils.Triangulate.area(p), q = [h[e], h[d], m[f]], q = THREE.FontUtils.Triangulate.area(q), j + k > p + q && (f = l, e = i, 0 > f && (f += m.length), f %= m.length, 0 > e && (e += h.length), e %= h.length, c = f - 1 >= 0 ? f - 1 : m.length - 1, d = e - 1 >= 0 ? e - 1 : h.length - 1), j = m.slice(0, f), k = m.slice(f), l = h.slice(e), i = h.slice(0, e), d = [h[e], h[d], m[f]], o.push([h[e], m[f], m[c]]), o.push(d), m = j.concat(l).concat(i).concat(k)
        }
        return {
            shape: m,
            isolatedPts: o,
            allpoints: n
        }
    },
    triangulateShape: function (a, b) {
        var c, d, e, f, g = THREE.Shape.Utils.removeHoles(a, b),
            h = g.allpoints,
            i = g.isolatedPts,
            g = THREE.FontUtils.Triangulate(g.shape, !1),
            j = {};
        for (c = 0, d = h.length; d > c; c++) f = h[c].x + ":" + h[c].y, void 0 !== j[f] && console.log("Duplicate point", f), j[f] = c;
        for (c = 0, d = g.length; d > c; c++)
            for (e = g[c], h = 0; 3 > h; h++) f = e[h].x + ":" + e[h].y, f = j[f], void 0 !== f && (e[h] = f);
        for (c = 0, d = i.length; d > c; c++)
            for (e = i[c], h = 0; 3 > h; h++) f = e[h].x + ":" + e[h].y, f = j[f], void 0 !== f && (e[h] = f);
        return g.concat(i)
    },
    isClockWise: function (a) {
        return 0 > THREE.FontUtils.Triangulate.area(a)
    },
    b2p0: function (a, b) {
        var c = 1 - a;
        return c * c * b
    },
    b2p1: function (a, b) {
        return 2 * (1 - a) * a * b
    },
    b2p2: function (a, b) {
        return a * a * b
    },
    b2: function (a, b, c, d) {
        return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d)
    },
    b3p0: function (a, b) {
        var c = 1 - a;
        return c * c * c * b
    },
    b3p1: function (a, b) {
        var c = 1 - a;
        return 3 * c * c * a * b
    },
    b3p2: function (a, b) {
        return 3 * (1 - a) * a * a * b
    },
    b3p3: function (a, b) {
        return a * a * a * b
    },
    b3: function (a, b, c, d, e) {
        return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) + this.b3p3(a, e)
    }
}, THREE.AnimationHandler = function () {
    var a = [],
        b = {},
        c = {
            update: function (b) {
                for (var c = 0; c < a.length; c++) a[c].update(b)
            },
            addToUpdate: function (b) {
                -1 === a.indexOf(b) && a.push(b)
            },
            removeFromUpdate: function (b) {
                b = a.indexOf(b), -1 !== b && a.splice(b, 1)
            },
            add: function (a) {
                if (void 0 !== b[a.name] && console.log("THREE.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting."), b[a.name] = a, !0 !== a.initialized) {
                    for (var c = 0; c < a.hierarchy.length; c++) {
                        for (var d = 0; d < a.hierarchy[c].keys.length; d++)
                            if (0 > a.hierarchy[c].keys[d].time && (a.hierarchy[c].keys[d].time = 0), void 0 !== a.hierarchy[c].keys[d].rot && !(a.hierarchy[c].keys[d].rot instanceof THREE.Quaternion)) {
                                var e = a.hierarchy[c].keys[d].rot;
                                a.hierarchy[c].keys[d].rot = new THREE.Quaternion(e[0], e[1], e[2], e[3])
                            }
                        if (a.hierarchy[c].keys.length && void 0 !== a.hierarchy[c].keys[0].morphTargets) {
                            for (e = {}, d = 0; d < a.hierarchy[c].keys.length; d++)
                                for (var f = 0; f < a.hierarchy[c].keys[d].morphTargets.length; f++) {
                                    var g = a.hierarchy[c].keys[d].morphTargets[f];
                                    e[g] = -1
                                }
                            for (a.hierarchy[c].usedMorphTargets = e, d = 0; d < a.hierarchy[c].keys.length; d++) {
                                var h = {};
                                for (g in e) {
                                    for (f = 0; f < a.hierarchy[c].keys[d].morphTargets.length; f++)
                                        if (a.hierarchy[c].keys[d].morphTargets[f] === g) {
                                            h[g] = a.hierarchy[c].keys[d].morphTargetsInfluences[f];
                                            break
                                        }
                                    f === a.hierarchy[c].keys[d].morphTargets.length && (h[g] = 0)
                                }
                                a.hierarchy[c].keys[d].morphTargetsInfluences = h
                            }
                        }
                        for (d = 1; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].time === a.hierarchy[c].keys[d - 1].time && (a.hierarchy[c].keys.splice(d, 1), d--);
                        for (d = 0; d < a.hierarchy[c].keys.length; d++) a.hierarchy[c].keys[d].index = d
                    }
                    for (d = parseInt(a.length * a.fps, 10), a.JIT = {}, a.JIT.hierarchy = [], c = 0; c < a.hierarchy.length; c++) a.JIT.hierarchy.push(Array(d));
                    a.initialized = !0
                }
            },
            get: function (a) {
                return "string" == typeof a ? b[a] ? b[a] : (console.log("THREE.AnimationHandler.get: Couldn't find animation " + a), null) : void 0
            },
            parse: function (a) {
                var b = [];
                if (a instanceof THREE.SkinnedMesh)
                    for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]);
                else d(a, b);
                return b
            }
        },
        d = function (a, b) {
            b.push(a);
            for (var c = 0; c < a.children.length; c++) d(a.children[c], b)
        };
    return c.LINEAR = 0, c.CATMULLROM = 1, c.CATMULLROM_FORWARD = 2, c
}(), THREE.Animation = function (a, b, c) {
    this.root = a, this.data = THREE.AnimationHandler.get(b), this.hierarchy = THREE.AnimationHandler.parse(a), this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.loop = this.isPaused = !0, this.interpolationType = void 0 !== c ? c : THREE.AnimationHandler.LINEAR, this.points = [], this.target = new THREE.Vector3
}, THREE.Animation.prototype.play = function (a, b) {
    if (!1 === this.isPlaying) {
        this.isPlaying = !0, this.loop = void 0 !== a ? a : !0, this.currentTime = void 0 !== b ? b : 0;
        var c, d, e = this.hierarchy.length;
        for (c = 0; e > c; c++) {
            d = this.hierarchy[c], this.interpolationType !== THREE.AnimationHandler.CATMULLROM_FORWARD && (d.useQuaternion = !0), d.matrixAutoUpdate = !0, void 0 === d.animationCache && (d.animationCache = {}, d.animationCache.prevKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, d.animationCache.nextKey = {
                pos: 0,
                rot: 0,
                scl: 0
            }, d.animationCache.originalMatrix = d instanceof THREE.Bone ? d.skinMatrix : d.matrix);
            var f = d.animationCache.prevKey;
            d = d.animationCache.nextKey, f.pos = this.data.hierarchy[c].keys[0], f.rot = this.data.hierarchy[c].keys[0], f.scl = this.data.hierarchy[c].keys[0], d.pos = this.getNextKeyWith("pos", c, 1), d.rot = this.getNextKeyWith("rot", c, 1), d.scl = this.getNextKeyWith("scl", c, 1)
        }
        this.update(0)
    }
    this.isPaused = !1, THREE.AnimationHandler.addToUpdate(this)
}, THREE.Animation.prototype.pause = function () {
    !0 === this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this), this.isPaused = !this.isPaused
}, THREE.Animation.prototype.stop = function () {
    this.isPaused = this.isPlaying = !1, THREE.AnimationHandler.removeFromUpdate(this)
}, THREE.Animation.prototype.update = function (a) {
    if (!1 !== this.isPlaying) {
        var b, c, d, e, f, g, h, i, j, k = ["pos", "rot", "scl"];
        j = this.currentTime += a * this.timeScale, i = this.currentTime %= this.data.length, parseInt(Math.min(i * this.data.fps, this.data.length * this.data.fps), 10);
        for (var l = 0, m = this.hierarchy.length; m > l; l++) {
            a = this.hierarchy[l], h = a.animationCache;
            for (var n = 0; 3 > n; n++) {
                if (b = k[n], f = h.prevKey[b], g = h.nextKey[b], g.time <= j) {
                    if (j > i) {
                        if (!this.loop) return this.stop(), void 0;
                        for (f = this.data.hierarchy[l].keys[0], g = this.getNextKeyWith(b, l, 1); g.time < i;) f = g, g = this.getNextKeyWith(b, l, g.index + 1)
                    } else
                        do f = g, g = this.getNextKeyWith(b, l, g.index + 1); while (g.time < i);
                    h.prevKey[b] = f, h.nextKey[b] = g
                }
                a.matrixAutoUpdate = !0, a.matrixWorldNeedsUpdate = !0, c = (i - f.time) / (g.time - f.time), d = f[b], e = g[b], (0 > c || c > 1) && (console.log("THREE.Animation.update: Warning! Scale out of bounds:" + c + " on bone " + l), c = 0 > c ? 0 : 1), "pos" === b ? (b = a.position, this.interpolationType === THREE.AnimationHandler.LINEAR ? (b.x = d[0] + (e[0] - d[0]) * c, b.y = d[1] + (e[1] - d[1]) * c, b.z = d[2] + (e[2] - d[2]) * c) : (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) && (this.points[0] = this.getPrevKeyWith("pos", l, f.index - 1).pos, this.points[1] = d, this.points[2] = e, this.points[3] = this.getNextKeyWith("pos", l, g.index + 1).pos, c = .33 * c + .33, d = this.interpolateCatmullRom(this.points, c), b.x = d[0], b.y = d[1], b.z = d[2], this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD && (c = this.interpolateCatmullRom(this.points, 1.01 * c), this.target.set(c[0], c[1], c[2]), this.target.sub(b), this.target.y = 0, this.target.normalize(), c = Math.atan2(this.target.x, this.target.z), a.rotation.set(0, c, 0)))) : "rot" === b ? THREE.Quaternion.slerp(d, e, a.quaternion, c) : "scl" === b && (b = a.scale, b.x = d[0] + (e[0] - d[0]) * c, b.y = d[1] + (e[1] - d[1]) * c, b.z = d[2] + (e[2] - d[2]) * c)
            }
        }
    }
}, THREE.Animation.prototype.interpolateCatmullRom = function (a, b) {
    var c, d, e, f, g, h, i = [],
        j = [];
    return c = (a.length - 1) * b, d = Math.floor(c), c -= d, i[0] = 0 === d ? d : d - 1, i[1] = d, i[2] = d > a.length - 2 ? d : d + 1, i[3] = d > a.length - 3 ? d : d + 2, d = a[i[0]], f = a[i[1]], g = a[i[2]], h = a[i[3]], i = c * c, e = c * i, j[0] = this.interpolate(d[0], f[0], g[0], h[0], c, i, e), j[1] = this.interpolate(d[1], f[1], g[1], h[1], c, i, e), j[2] = this.interpolate(d[2], f[2], g[2], h[2], c, i, e), j
}, THREE.Animation.prototype.interpolate = function (a, b, c, d, e, f, g) {
    return a = .5 * (c - a), d = .5 * (d - b), (2 * (b - c) + a + d) * g + (-3 * (b - c) - 2 * a - d) * f + a * e + b
}, THREE.Animation.prototype.getNextKeyWith = function (a, b, c) {
    for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c < d.length - 1 ? c : d.length - 1 : c % d.length; c < d.length; c++)
        if (void 0 !== d[c][a]) return d[c];
    return this.data.hierarchy[b].keys[0]
}, THREE.Animation.prototype.getPrevKeyWith = function (a, b, c) {
    for (var d = this.data.hierarchy[b].keys, c = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? c > 0 ? c : 0 : c >= 0 ? c : c + d.length; c >= 0; c--)
        if (void 0 !== d[c][a]) return d[c];
    return this.data.hierarchy[b].keys[d.length - 1]
}, THREE.KeyFrameAnimation = function (a, b, c) {
    for (this.root = a, this.data = THREE.AnimationHandler.get(b), this.hierarchy = THREE.AnimationHandler.parse(a), this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.loop = this.isPaused = !0, this.JITCompile = void 0 !== c ? c : !0, a = 0, b = this.hierarchy.length; b > a; a++) {
        var c = this.data.hierarchy[a].sids,
            d = this.hierarchy[a];
        if (this.data.hierarchy[a].keys.length && c) {
            for (var e = 0; e < c.length; e++) {
                var f = c[e],
                    g = this.getNextKeyWith(f, a, 0);
                g && g.apply(f)
            }
            d.matrixAutoUpdate = !1, this.data.hierarchy[a].node.updateMatrix(), d.matrixWorldNeedsUpdate = !0
        }
    }
}, THREE.KeyFrameAnimation.prototype.play = function (a, b) {
    if (!this.isPlaying) {
        this.isPlaying = !0, this.loop = void 0 !== a ? a : !0, this.currentTime = void 0 !== b ? b : 0, this.startTimeMs = b, this.startTime = 1e7, this.endTime = -this.startTime;
        var c, d, e, f = this.hierarchy.length;
        for (c = 0; f > c; c++) d = this.hierarchy[c], e = this.data.hierarchy[c], d.useQuaternion = !0, void 0 === e.animationCache && (e.animationCache = {}, e.animationCache.prevKey = null, e.animationCache.nextKey = null, e.animationCache.originalMatrix = d instanceof THREE.Bone ? d.skinMatrix : d.matrix), d = this.data.hierarchy[c].keys, d.length && (e.animationCache.prevKey = d[0], e.animationCache.nextKey = d[1], this.startTime = Math.min(d[0].time, this.startTime), this.endTime = Math.max(d[d.length - 1].time, this.endTime));
        this.update(0)
    }
    this.isPaused = !1, THREE.AnimationHandler.addToUpdate(this)
}, THREE.KeyFrameAnimation.prototype.pause = function () {
    this.isPaused ? THREE.AnimationHandler.addToUpdate(this) : THREE.AnimationHandler.removeFromUpdate(this), this.isPaused = !this.isPaused
}, THREE.KeyFrameAnimation.prototype.stop = function () {
    this.isPaused = this.isPlaying = !1, THREE.AnimationHandler.removeFromUpdate(this);
    for (var a = 0; a < this.data.hierarchy.length; a++) {
        var b = this.hierarchy[a],
            c = this.data.hierarchy[a];
        if (void 0 !== c.animationCache) {
            var d = c.animationCache.originalMatrix;
            b instanceof THREE.Bone ? (d.copy(b.skinMatrix), b.skinMatrix = d) : (d.copy(b.matrix), b.matrix = d), delete c.animationCache
        }
    }
}, THREE.KeyFrameAnimation.prototype.update = function (a) {
    if (this.isPlaying) {
        var b, c, d, e, f, g, h, i = this.data.JIT.hierarchy;
        if (g = this.currentTime += a * this.timeScale, f = this.currentTime %= this.data.length, f < this.startTimeMs && (f = this.currentTime = this.startTimeMs + f), e = parseInt(Math.min(f * this.data.fps, this.data.length * this.data.fps), 10), (h = g > f) && !this.loop) {
            for (var a = 0, j = this.hierarchy.length; j > a; a++) {
                var k = this.data.hierarchy[a].keys,
                    i = this.data.hierarchy[a].sids;
                if (d = k.length - 1, e = this.hierarchy[a], k.length) {
                    for (k = 0; k < i.length; k++) f = i[k], (g = this.getPrevKeyWith(f, a, d)) && g.apply(f);
                    this.data.hierarchy[a].node.updateMatrix(), e.matrixWorldNeedsUpdate = !0
                }
            }
            this.stop()
        } else if (!(f < this.startTime)) {
            for (a = 0, j = this.hierarchy.length; j > a; a++) {
                d = this.hierarchy[a], b = this.data.hierarchy[a];
                var k = b.keys,
                    l = b.animationCache;
                if (this.JITCompile && void 0 !== i[a][e]) d instanceof THREE.Bone ? (d.skinMatrix = i[a][e], d.matrixWorldNeedsUpdate = !1) : (d.matrix = i[a][e], d.matrixWorldNeedsUpdate = !0);
                else if (k.length) {
                    if (this.JITCompile && l && (d instanceof THREE.Bone ? d.skinMatrix = l.originalMatrix : d.matrix = l.originalMatrix), b = l.prevKey, c = l.nextKey, b && c) {
                        if (c.time <= g) {
                            if (h && this.loop)
                                for (b = k[0], c = k[1]; c.time < f;) b = c, c = k[b.index + 1];
                            else if (!h)
                                for (var m = k.length - 1; c.time < f && c.index !== m;) b = c, c = k[b.index + 1];
                            l.prevKey = b, l.nextKey = c
                        }
                        c.time >= f ? b.interpolate(c, f) : b.interpolate(c, c.time)
                    }
                    this.data.hierarchy[a].node.updateMatrix(), d.matrixWorldNeedsUpdate = !0
                }
            }
            if (this.JITCompile && void 0 === i[0][e])
                for (this.hierarchy[0].updateMatrixWorld(!0), a = 0; a < this.hierarchy.length; a++) i[a][e] = this.hierarchy[a] instanceof THREE.Bone ? this.hierarchy[a].skinMatrix.clone() : this.hierarchy[a].matrix.clone()
        }
    }
}, THREE.KeyFrameAnimation.prototype.getNextKeyWith = function (a, b, c) {
    for (b = this.data.hierarchy[b].keys, c %= b.length; c < b.length; c++)
        if (b[c].hasTarget(a)) return b[c];
    return b[0]
}, THREE.KeyFrameAnimation.prototype.getPrevKeyWith = function (a, b, c) {
    for (b = this.data.hierarchy[b].keys, c = c >= 0 ? c : c + b.length; c >= 0; c--)
        if (b[c].hasTarget(a)) return b[c];
    return b[b.length - 1]
}, THREE.CubeCamera = function (a, b, c) {
    THREE.Object3D.call(this);
    var d = new THREE.PerspectiveCamera(90, 1, a, b);
    d.up.set(0, -1, 0), d.lookAt(new THREE.Vector3(1, 0, 0)), this.add(d);
    var e = new THREE.PerspectiveCamera(90, 1, a, b);
    e.up.set(0, -1, 0), e.lookAt(new THREE.Vector3(-1, 0, 0)), this.add(e);
    var f = new THREE.PerspectiveCamera(90, 1, a, b);
    f.up.set(0, 0, 1), f.lookAt(new THREE.Vector3(0, 1, 0)), this.add(f);
    var g = new THREE.PerspectiveCamera(90, 1, a, b);
    g.up.set(0, 0, -1), g.lookAt(new THREE.Vector3(0, -1, 0)), this.add(g);
    var h = new THREE.PerspectiveCamera(90, 1, a, b);
    h.up.set(0, -1, 0), h.lookAt(new THREE.Vector3(0, 0, 1)), this.add(h);
    var i = new THREE.PerspectiveCamera(90, 1, a, b);
    i.up.set(0, -1, 0), i.lookAt(new THREE.Vector3(0, 0, -1)), this.add(i), this.renderTarget = new THREE.WebGLRenderTargetCube(c, c, {
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter
    }), this.updateCubeMap = function (a, b) {
        var c = this.renderTarget,
            j = c.generateMipmaps;
        c.generateMipmaps = !1, c.activeCubeFace = 0, a.render(b, d, c), c.activeCubeFace = 1, a.render(b, e, c), c.activeCubeFace = 2, a.render(b, f, c), c.activeCubeFace = 3, a.render(b, g, c), c.activeCubeFace = 4, a.render(b, h, c), c.generateMipmaps = j, c.activeCubeFace = 5, a.render(b, i, c)
    }
}, THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype), THREE.CombinedCamera = function (a, b, c, d, e, f, g) {
    THREE.Camera.call(this), this.fov = c, this.left = -a / 2, this.right = a / 2, this.top = b / 2, this.bottom = -b / 2, this.cameraO = new THREE.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, f, g), this.cameraP = new THREE.PerspectiveCamera(c, a / b, d, e), this.zoom = 1, this.toPerspective()
}, THREE.CombinedCamera.prototype = Object.create(THREE.Camera.prototype), THREE.CombinedCamera.prototype.toPerspective = function () {
    this.near = this.cameraP.near, this.far = this.cameraP.far, this.cameraP.fov = this.fov / this.zoom, this.cameraP.updateProjectionMatrix(), this.projectionMatrix = this.cameraP.projectionMatrix, this.inPerspectiveMode = !0, this.inOrthographicMode = !1
}, THREE.CombinedCamera.prototype.toOrthographic = function () {
    var a = this.cameraP.aspect,
        b = (this.cameraP.near + this.cameraP.far) / 2,
        b = Math.tan(this.fov / 2) * b,
        a = 2 * b * a / 2,
        b = b / this.zoom,
        a = a / this.zoom;
    this.cameraO.left = -a, this.cameraO.right = a, this.cameraO.top = b, this.cameraO.bottom = -b, this.cameraO.updateProjectionMatrix(), this.near = this.cameraO.near, this.far = this.cameraO.far, this.projectionMatrix = this.cameraO.projectionMatrix, this.inPerspectiveMode = !1, this.inOrthographicMode = !0
}, THREE.CombinedCamera.prototype.setSize = function (a, b) {
    this.cameraP.aspect = a / b, this.left = -a / 2, this.right = a / 2, this.top = b / 2, this.bottom = -b / 2
}, THREE.CombinedCamera.prototype.setFov = function (a) {
    this.fov = a, this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
}, THREE.CombinedCamera.prototype.updateProjectionMatrix = function () {
    this.inPerspectiveMode ? this.toPerspective() : (this.toPerspective(), this.toOrthographic())
}, THREE.CombinedCamera.prototype.setLens = function (a, b) {
    void 0 === b && (b = 24);
    var c = 2 * THREE.Math.radToDeg(Math.atan(b / (2 * a)));
    return this.setFov(c), c
}, THREE.CombinedCamera.prototype.setZoom = function (a) {
    this.zoom = a, this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic()
}, THREE.CombinedCamera.prototype.toFrontView = function () {
    this.rotation.x = 0, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toBackView = function () {
    this.rotation.x = 0, this.rotation.y = Math.PI, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toLeftView = function () {
    this.rotation.x = 0, this.rotation.y = -Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toRightView = function () {
    this.rotation.x = 0, this.rotation.y = Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toTopView = function () {
    this.rotation.x = -Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CombinedCamera.prototype.toBottomView = function () {
    this.rotation.x = Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1
}, THREE.CircleGeometry = function (a, b, c, d) {
    THREE.Geometry.call(this);
    var e, a = a || 50,
        c = void 0 !== c ? c : 0,
        d = void 0 !== d ? d : 2 * Math.PI,
        b = void 0 !== b ? Math.max(3, b) : 8,
        f = [];
    e = new THREE.Vector3;
    var g = new THREE.Vector2(.5, .5);
    for (this.vertices.push(e), f.push(g), e = 0; b >= e; e++) {
        var h = new THREE.Vector3,
            i = c + e / b * d;
        h.x = a * Math.cos(i), h.y = a * Math.sin(i), this.vertices.push(h), f.push(new THREE.Vector2((h.x / a + 1) / 2, (h.y / a + 1) / 2))
    }
    for (c = new THREE.Vector3(0, 0, 1), e = 1; b >= e; e++) this.faces.push(new THREE.Face3(e, e + 1, 0, [c, c, c])), this.faceVertexUvs[0].push([f[e], f[e + 1], g]);
    this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
}, THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.CubeGeometry = function (a, b, c, d, e, f) {
    function g(a, b, c, d, e, f, g, i) {
        var j, k = h.widthSegments,
            l = h.heightSegments,
            m = e / 2,
            n = f / 2,
            o = h.vertices.length;
        "x" === a && "y" === b || "y" === a && "x" === b ? j = "z" : "x" === a && "z" === b || "z" === a && "x" === b ? (j = "y", l = h.depthSegments) : ("z" === a && "y" === b || "y" === a && "z" === b) && (j = "x", k = h.depthSegments);
        var p = k + 1,
            q = l + 1,
            r = e / k,
            s = f / l,
            t = new THREE.Vector3;
        for (t[j] = g > 0 ? 1 : -1, e = 0; q > e; e++)
            for (f = 0; p > f; f++) {
                var u = new THREE.Vector3;
                u[a] = (f * r - m) * c, u[b] = (e * s - n) * d, u[j] = g, h.vertices.push(u)
            }
        for (e = 0; l > e; e++)
            for (f = 0; k > f; f++) a = new THREE.Face4(f + p * e + o, f + p * (e + 1) + o, f + 1 + p * (e + 1) + o, f + 1 + p * e + o), a.normal.copy(t), a.vertexNormals.push(t.clone(), t.clone(), t.clone(), t.clone()), a.materialIndex = i, h.faces.push(a), h.faceVertexUvs[0].push([new THREE.Vector2(f / k, 1 - e / l), new THREE.Vector2(f / k, 1 - (e + 1) / l), new THREE.Vector2((f + 1) / k, 1 - (e + 1) / l), new THREE.Vector2((f + 1) / k, 1 - e / l)])
    }
    THREE.Geometry.call(this);
    var h = this;
    this.width = a, this.height = b, this.depth = c, this.widthSegments = d || 1, this.heightSegments = e || 1, this.depthSegments = f || 1, a = this.width / 2, b = this.height / 2, c = this.depth / 2, g("z", "y", -1, -1, this.depth, this.height, a, 0), g("z", "y", 1, -1, this.depth, this.height, -a, 1), g("x", "z", 1, 1, this.width, this.depth, b, 2), g("x", "z", 1, -1, this.width, this.depth, -b, 3), g("x", "y", 1, -1, this.width, this.height, c, 4), g("x", "y", -1, -1, this.width, this.height, -c, 5), this.computeCentroids(), this.mergeVertices()
}, THREE.CubeGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.CylinderGeometry = function (a, b, c, d, e, f) {
    THREE.Geometry.call(this), this.radiusTop = a = void 0 !== a ? a : 20, this.radiusBottom = b = void 0 !== b ? b : 20, this.height = c = void 0 !== c ? c : 100, this.radiusSegments = d = d || 8, this.heightSegments = e = e || 1, this.openEnded = f = void 0 !== f ? f : !1;
    var g, h, i = c / 2,
        j = [],
        k = [];
    for (h = 0; e >= h; h++) {
        var l = [],
            m = [],
            n = h / e,
            o = n * (b - a) + a;
        for (g = 0; d >= g; g++) {
            var p = g / d,
                q = new THREE.Vector3;
            q.x = o * Math.sin(2 * p * Math.PI), q.y = -n * c + i, q.z = o * Math.cos(2 * p * Math.PI), this.vertices.push(q), l.push(this.vertices.length - 1), m.push(new THREE.Vector2(p, 1 - n))
        }
        j.push(l), k.push(m)
    }
    for (c = (b - a) / c, g = 0; d > g; g++)
        for (0 !== a ? (l = this.vertices[j[0][g]].clone(), m = this.vertices[j[0][g + 1]].clone()) : (l = this.vertices[j[1][g]].clone(), m = this.vertices[j[1][g + 1]].clone()), l.setY(Math.sqrt(l.x * l.x + l.z * l.z) * c).normalize(), m.setY(Math.sqrt(m.x * m.x + m.z * m.z) * c).normalize(), h = 0; e > h; h++) {
            var n = j[h][g],
                o = j[h + 1][g],
                p = j[h + 1][g + 1],
                q = j[h][g + 1],
                r = l.clone(),
                s = l.clone(),
                t = m.clone(),
                u = m.clone(),
                v = k[h][g].clone(),
                w = k[h + 1][g].clone(),
                x = k[h + 1][g + 1].clone(),
                y = k[h][g + 1].clone();
            this.faces.push(new THREE.Face4(n, o, p, q, [r, s, t, u])), this.faceVertexUvs[0].push([v, w, x, y])
        }
    if (!1 === f && a > 0)
        for (this.vertices.push(new THREE.Vector3(0, i, 0)), g = 0; d > g; g++) n = j[0][g], o = j[0][g + 1], p = this.vertices.length - 1, r = new THREE.Vector3(0, 1, 0), s = new THREE.Vector3(0, 1, 0), t = new THREE.Vector3(0, 1, 0), v = k[0][g].clone(), w = k[0][g + 1].clone(), x = new THREE.Vector2(w.u, 0), this.faces.push(new THREE.Face3(n, o, p, [r, s, t])), this.faceVertexUvs[0].push([v, w, x]);
    if (!1 === f && b > 0)
        for (this.vertices.push(new THREE.Vector3(0, -i, 0)), g = 0; d > g; g++) n = j[h][g + 1], o = j[h][g], p = this.vertices.length - 1, r = new THREE.Vector3(0, -1, 0), s = new THREE.Vector3(0, -1, 0), t = new THREE.Vector3(0, -1, 0), v = k[h][g + 1].clone(), w = k[h][g].clone(), x = new THREE.Vector2(w.u, 1), this.faces.push(new THREE.Face3(n, o, p, [r, s, t])), this.faceVertexUvs[0].push([v, w, x]);
    this.computeCentroids(), this.computeFaceNormals()
}, THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.ExtrudeGeometry = function (a, b) {
    "undefined" != typeof a && (THREE.Geometry.call(this), a = a instanceof Array ? a : [a], this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals())
}, THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.ExtrudeGeometry.prototype.addShapeList = function (a, b) {
    for (var c = a.length, d = 0; c > d; d++) this.addShape(a[d], b)
}, THREE.ExtrudeGeometry.prototype.addShape = function (a, b) {
    function c(a, b, c) {
        return b || console.log("die"), b.clone().multiplyScalar(c).add(a)
    }

    function d(a, b, c) {
        var d = THREE.ExtrudeGeometry.__v1,
            e = THREE.ExtrudeGeometry.__v2,
            f = THREE.ExtrudeGeometry.__v3,
            g = THREE.ExtrudeGeometry.__v4,
            h = THREE.ExtrudeGeometry.__v5,
            i = THREE.ExtrudeGeometry.__v6;
        return d.set(a.x - b.x, a.y - b.y), e.set(a.x - c.x, a.y - c.y), d = d.normalize(), e = e.normalize(), f.set(-d.y, d.x), g.set(e.y, -e.x), h.copy(a).add(f), i.copy(a).add(g), h.equals(i) ? g.clone() : (h.copy(b).add(f), i.copy(c).add(g), f = d.dot(g), g = i.sub(h).dot(g), 0 === f && (console.log("Either infinite or no solutions!"), 0 === g ? console.log("Its finite solutions.") : console.log("Too bad, no solutions.")), g /= f, 0 > g ? (b = Math.atan2(b.y - a.y, b.x - a.x), a = Math.atan2(c.y - a.y, c.x - a.x), b > a && (a += 2 * Math.PI), c = (b + a) / 2, a = -Math.cos(c), c = -Math.sin(c), new THREE.Vector2(a, c)) : d.multiplyScalar(g).add(h).sub(a).clone())
    }

    function e(c, d) {
        var e, f;
        for (M = c.length; 0 <= --M;) {
            e = M, f = M - 1, 0 > f && (f = c.length - 1);
            for (var g = 0, h = s + 2 * p, g = 0; h > g; g++) {
                var i = J * g,
                    j = J * (g + 1),
                    k = d + e + i,
                    i = d + f + i,
                    l = d + f + j,
                    j = d + e + j,
                    m = c,
                    n = g,
                    o = h,
                    q = e,
                    r = f,
                    k = k + C,
                    i = i + C,
                    l = l + C,
                    j = j + C;
                B.faces.push(new THREE.Face4(k, i, l, j, null, null, w)), k = x.generateSideWallUV(B, a, m, b, k, i, l, j, n, o, q, r), B.faceVertexUvs[0].push(k)
            }
        }
    }

    function f(a, b, c) {
        B.vertices.push(new THREE.Vector3(a, b, c))
    }

    function g(c, d, e, f) {
        c += C, d += C, e += C, B.faces.push(new THREE.Face3(c, d, e, null, null, v)), c = f ? x.generateBottomUV(B, a, b, c, d, e) : x.generateTopUV(B, a, b, c, d, e), B.faceVertexUvs[0].push(c)
    }
    var h, i, j, k, l, m = void 0 !== b.amount ? b.amount : 100,
        n = void 0 !== b.bevelThickness ? b.bevelThickness : 6,
        o = void 0 !== b.bevelSize ? b.bevelSize : n - 2,
        p = void 0 !== b.bevelSegments ? b.bevelSegments : 3,
        q = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0,
        r = void 0 !== b.curveSegments ? b.curveSegments : 12,
        s = void 0 !== b.steps ? b.steps : 1,
        t = b.extrudePath,
        u = !1,
        v = b.material,
        w = b.extrudeMaterial,
        x = void 0 !== b.UVGenerator ? b.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator;
    t && (h = t.getSpacedPoints(s), u = !0, q = !1, i = void 0 !== b.frames ? b.frames : new THREE.TubeGeometry.FrenetFrames(t, s, !1), j = new THREE.Vector3, k = new THREE.Vector3, l = new THREE.Vector3), q || (o = n = p = 0);
    var y, z, A, B = this,
        C = this.vertices.length,
        r = a.extractPoints(r),
        D = r.shape,
        r = r.holes;
    if (t = !THREE.Shape.Utils.isClockWise(D)) {
        for (D = D.reverse(), z = 0, A = r.length; A > z; z++) y = r[z], THREE.Shape.Utils.isClockWise(y) && (r[z] = y.reverse());
        t = !1
    }
    var E = THREE.Shape.Utils.triangulateShape(D, r),
        t = D;
    for (z = 0, A = r.length; A > z; z++) y = r[z], D = D.concat(y);
    var F, G, H, I, J = D.length,
        K = E.length,
        L = [],
        M = 0,
        N = t.length;
    for (F = N - 1, G = M + 1; N > M; M++, F++, G++) F === N && (F = 0), G === N && (G = 0), L[M] = d(t[M], t[F], t[G]);
    var O, P = [],
        Q = L.concat();
    for (z = 0, A = r.length; A > z; z++) {
        for (y = r[z], O = [], M = 0, N = y.length, F = N - 1, G = M + 1; N > M; M++, F++, G++) F === N && (F = 0), G === N && (G = 0), O[M] = d(y[M], y[F], y[G]);
        P.push(O), Q = Q.concat(O)
    }
    for (F = 0; p > F; F++) {
        for (y = F / p, H = n * (1 - y), G = o * Math.sin(y * Math.PI / 2), M = 0, N = t.length; N > M; M++) I = c(t[M], L[M], G), f(I.x, I.y, -H);
        for (z = 0, A = r.length; A > z; z++)
            for (y = r[z], O = P[z], M = 0, N = y.length; N > M; M++) I = c(y[M], O[M], G), f(I.x, I.y, -H)
    }
    for (G = o, M = 0; J > M; M++) I = q ? c(D[M], Q[M], G) : D[M], u ? (k.copy(i.normals[0]).multiplyScalar(I.x), j.copy(i.binormals[0]).multiplyScalar(I.y), l.copy(h[0]).add(k).add(j), f(l.x, l.y, l.z)) : f(I.x, I.y, 0);
    for (y = 1; s >= y; y++)
        for (M = 0; J > M; M++) I = q ? c(D[M], Q[M], G) : D[M], u ? (k.copy(i.normals[y]).multiplyScalar(I.x), j.copy(i.binormals[y]).multiplyScalar(I.y), l.copy(h[y]).add(k).add(j), f(l.x, l.y, l.z)) : f(I.x, I.y, m / s * y);
    for (F = p - 1; F >= 0; F--) {
        for (y = F / p, H = n * (1 - y), G = o * Math.sin(y * Math.PI / 2), M = 0, N = t.length; N > M; M++) I = c(t[M], L[M], G), f(I.x, I.y, m + H);
        for (z = 0, A = r.length; A > z; z++)
            for (y = r[z], O = P[z], M = 0, N = y.length; N > M; M++) I = c(y[M], O[M], G), u ? f(I.x, I.y + h[s - 1].y, h[s - 1].x + H) : f(I.x, I.y, m + H)
    }
    if (q) {
        for (n = 0 * J, M = 0; K > M; M++) m = E[M], g(m[2] + n, m[1] + n, m[0] + n, !0);
        for (n = J * (s + 2 * p), M = 0; K > M; M++) m = E[M], g(m[0] + n, m[1] + n, m[2] + n, !1)
    } else {
        for (M = 0; K > M; M++) m = E[M], g(m[2], m[1], m[0], !0);
        for (M = 0; K > M; M++) m = E[M], g(m[0] + J * s, m[1] + J * s, m[2] + J * s, !1)
    }
    for (m = 0, e(t, m), m += t.length, z = 0, A = r.length; A > z; z++) y = r[z], e(y, m), m += y.length
}, THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function (a, b, c, d, e, f) {
        return b = a.vertices[e].x, e = a.vertices[e].y, c = a.vertices[f].x, f = a.vertices[f].y, [new THREE.Vector2(a.vertices[d].x, a.vertices[d].y), new THREE.Vector2(b, e), new THREE.Vector2(c, f)]
    },
    generateBottomUV: function (a, b, c, d, e, f) {
        return this.generateTopUV(a, b, c, d, e, f)
    },
    generateSideWallUV: function (a, b, c, d, e, f, g, h) {
        var b = a.vertices[e].x,
            c = a.vertices[e].y,
            e = a.vertices[e].z,
            d = a.vertices[f].x,
            i = a.vertices[f].y,
            f = a.vertices[f].z,
            j = a.vertices[g].x,
            k = a.vertices[g].y,
            g = a.vertices[g].z,
            l = a.vertices[h].x,
            m = a.vertices[h].y,
            a = a.vertices[h].z;
        return .01 > Math.abs(c - i) ? [new THREE.Vector2(b, 1 - e), new THREE.Vector2(d, 1 - f), new THREE.Vector2(j, 1 - g), new THREE.Vector2(l, 1 - a)] : [new THREE.Vector2(c, 1 - e), new THREE.Vector2(i, 1 - f), new THREE.Vector2(k, 1 - g), new THREE.Vector2(m, 1 - a)]
    }
}, THREE.ExtrudeGeometry.__v1 = new THREE.Vector2, THREE.ExtrudeGeometry.__v2 = new THREE.Vector2, THREE.ExtrudeGeometry.__v3 = new THREE.Vector2, THREE.ExtrudeGeometry.__v4 = new THREE.Vector2, THREE.ExtrudeGeometry.__v5 = new THREE.Vector2, THREE.ExtrudeGeometry.__v6 = new THREE.Vector2, THREE.ShapeGeometry = function (a, b) {
    THREE.Geometry.call(this), !1 == a instanceof Array && (a = [a]), this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals()
}, THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.ShapeGeometry.prototype.addShapeList = function (a, b) {
    for (var c = 0, d = a.length; d > c; c++) this.addShape(a[c], b);
    return this
}, THREE.ShapeGeometry.prototype.addShape = function (a, b) {
    void 0 === b && (b = {});
    var c, d, e, f = b.material,
        g = void 0 === b.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator : b.UVGenerator,
        h = this.vertices.length;
    c = a.extractPoints(void 0 !== b.curveSegments ? b.curveSegments : 12);
    var i = c.shape,
        j = c.holes;
    if (!THREE.Shape.Utils.isClockWise(i))
        for (i = i.reverse(), c = 0, d = j.length; d > c; c++) e = j[c], THREE.Shape.Utils.isClockWise(e) && (j[c] = e.reverse());
    var k = THREE.Shape.Utils.triangulateShape(i, j);
    for (c = 0, d = j.length; d > c; c++) e = j[c], i = i.concat(e);
    for (j = i.length, d = k.length, c = 0; j > c; c++) e = i[c], this.vertices.push(new THREE.Vector3(e.x, e.y, 0));
    for (c = 0; d > c; c++) j = k[c], i = j[0] + h, e = j[1] + h, j = j[2] + h, this.faces.push(new THREE.Face3(i, e, j, null, null, f)), this.faceVertexUvs[0].push(g.generateBottomUV(this, a, b, i, e, j))
}, THREE.LatheGeometry = function (a, b, c, d) {
    THREE.Geometry.call(this);
    for (var b = b || 12, c = c || 0, d = d || 2 * Math.PI, e = 1 / (a.length - 1), f = 1 / b, g = 0, h = b; h >= g; g++)
        for (var i = c + g * f * d, j = Math.cos(i), k = Math.sin(i), i = 0, l = a.length; l > i; i++) {
            var m = a[i],
                n = new THREE.Vector3;
            n.x = j * m.x - k * m.y, n.y = k * m.x + j * m.y, n.z = m.z, this.vertices.push(n)
        }
    for (c = a.length, g = 0, h = b; h > g; g++)
        for (i = 0, l = a.length - 1; l > i; i++) d = b = i + c * g, k = b + c, j = b + 1 + c, this.faces.push(new THREE.Face4(d, k, j, b + 1)), j = g * f, b = i * e, d = j + f, k = b + e, this.faceVertexUvs[0].push([new THREE.Vector2(j, b), new THREE.Vector2(d, b), new THREE.Vector2(d, k), new THREE.Vector2(j, k)]);
    this.mergeVertices(), this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.PlaneGeometry = function (a, b, c, d) {
    THREE.Geometry.call(this), this.width = a, this.height = b, this.widthSegments = c || 1, this.heightSegments = d || 1;
    for (var c = a / 2, e = b / 2, d = this.widthSegments, f = this.heightSegments, g = d + 1, h = f + 1, i = this.width / d, j = this.height / f, k = new THREE.Vector3(0, 0, 1), a = 0; h > a; a++)
        for (b = 0; g > b; b++) this.vertices.push(new THREE.Vector3(b * i - c, -(a * j - e), 0));
    for (a = 0; f > a; a++)
        for (b = 0; d > b; b++) c = new THREE.Face4(b + g * a, b + g * (a + 1), b + 1 + g * (a + 1), b + 1 + g * a), c.normal.copy(k), c.vertexNormals.push(k.clone(), k.clone(), k.clone(), k.clone()), this.faces.push(c), this.faceVertexUvs[0].push([new THREE.Vector2(b / d, 1 - a / f), new THREE.Vector2(b / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - (a + 1) / f), new THREE.Vector2((b + 1) / d, 1 - a / f)]);
    this.computeCentroids()
}, THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.RingGeometry = function (a, b, c, d, e, f) {
    THREE.Geometry.call(this);
    for (var a = a || 0, b = b || 50, e = void 0 !== e ? e : 0, f = void 0 !== f ? f : 2 * Math.PI, c = void 0 !== c ? Math.max(3, c) : 8, d = void 0 !== d ? Math.max(3, d) : 8, g = [], h = a, i = (b - a) / d, a = 0; d >= a; a++) {
        for (b = 0; c >= b; b++) {
            var j = new THREE.Vector3,
                k = e + b / c * f;
            j.x = h * Math.cos(k), j.y = h * Math.sin(k), this.vertices.push(j), g.push(new THREE.Vector2((j.x / h + 1) / 2, -(j.y / h + 1) / 2 + 1))
        }
        h += i
    }
    for (e = new THREE.Vector3(0, 0, 1), a = 0; d > a; a++)
        for (f = a * c, b = 0; c >= b; b++) {
            var k = b + f,
                i = k + a,
                j = k + c + a,
                l = k + c + 1 + a;
            this.faces.push(new THREE.Face3(i, j, l, [e, e, e])), this.faceVertexUvs[0].push([g[i], g[j], g[l]]), i = k + a, j = k + c + 1 + a, l = k + 1 + a, this.faces.push(new THREE.Face3(i, j, l, [e, e, e])), this.faceVertexUvs[0].push([g[i], g[j], g[l]])
        }
    this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, h)
}, THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.SphereGeometry = function (a, b, c, d, e, f, g) {
    THREE.Geometry.call(this), this.radius = a = a || 50, this.widthSegments = b = Math.max(3, Math.floor(b) || 8), this.heightSegments = c = Math.max(2, Math.floor(c) || 6), this.phiStart = d = void 0 !== d ? d : 0, this.phiLength = e = void 0 !== e ? e : 2 * Math.PI, this.thetaStart = f = void 0 !== f ? f : 0, this.thetaLength = g = void 0 !== g ? g : Math.PI;
    var h, i, j = [],
        k = [];
    for (i = 0; c >= i; i++) {
        var l = [],
            m = [];
        for (h = 0; b >= h; h++) {
            var n = h / b,
                o = i / c,
                p = new THREE.Vector3;
            p.x = -a * Math.cos(d + n * e) * Math.sin(f + o * g), p.y = a * Math.cos(f + o * g), p.z = a * Math.sin(d + n * e) * Math.sin(f + o * g), this.vertices.push(p), l.push(this.vertices.length - 1), m.push(new THREE.Vector2(n, 1 - o))
        }
        j.push(l), k.push(m)
    }
    for (i = 0; i < this.heightSegments; i++)
        for (h = 0; h < this.widthSegments; h++) {
            var b = j[i][h + 1],
                c = j[i][h],
                d = j[i + 1][h],
                e = j[i + 1][h + 1],
                f = this.vertices[b].clone().normalize(),
                g = this.vertices[c].clone().normalize(),
                l = this.vertices[d].clone().normalize(),
                m = this.vertices[e].clone().normalize(),
                n = k[i][h + 1].clone(),
                o = k[i][h].clone(),
                p = k[i + 1][h].clone(),
                q = k[i + 1][h + 1].clone();
            Math.abs(this.vertices[b].y) === this.radius ? (this.faces.push(new THREE.Face3(b, d, e, [f, l, m])), this.faceVertexUvs[0].push([n, p, q])) : Math.abs(this.vertices[d].y) === this.radius ? (this.faces.push(new THREE.Face3(b, c, d, [f, g, l])), this.faceVertexUvs[0].push([n, o, p])) : (this.faces.push(new THREE.Face4(b, c, d, e, [f, g, l, m])), this.faceVertexUvs[0].push([n, o, p, q]))
        }
    this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, a)
}, THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.TextGeometry = function (a, b) {
    var b = b || {},
        c = THREE.FontUtils.generateShapes(a, b);
    b.amount = void 0 !== b.height ? b.height : 50, void 0 === b.bevelThickness && (b.bevelThickness = 10), void 0 === b.bevelSize && (b.bevelSize = 8), void 0 === b.bevelEnabled && (b.bevelEnabled = !1), THREE.ExtrudeGeometry.call(this, c, b)
}, THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype), THREE.TorusGeometry = function (a, b, c, d, e) {
    for (THREE.Geometry.call(this), this.radius = a || 100, this.tube = b || 40, this.radialSegments = c || 8, this.tubularSegments = d || 6, this.arc = e || 2 * Math.PI, e = new THREE.Vector3, a = [], b = [], c = 0; c <= this.radialSegments; c++)
        for (d = 0; d <= this.tubularSegments; d++) {
            var f = d / this.tubularSegments * this.arc,
                g = 2 * c / this.radialSegments * Math.PI;
            e.x = this.radius * Math.cos(f), e.y = this.radius * Math.sin(f);
            var h = new THREE.Vector3;
            h.x = (this.radius + this.tube * Math.cos(g)) * Math.cos(f), h.y = (this.radius + this.tube * Math.cos(g)) * Math.sin(f), h.z = this.tube * Math.sin(g), this.vertices.push(h), a.push(new THREE.Vector2(d / this.tubularSegments, c / this.radialSegments)), b.push(h.clone().sub(e).normalize())
        }
    for (c = 1; c <= this.radialSegments; c++)
        for (d = 1; d <= this.tubularSegments; d++) {
            var e = (this.tubularSegments + 1) * c + d - 1,
                f = (this.tubularSegments + 1) * (c - 1) + d - 1,
                g = (this.tubularSegments + 1) * (c - 1) + d,
                h = (this.tubularSegments + 1) * c + d,
                i = new THREE.Face4(e, f, g, h, [b[e], b[f], b[g], b[h]]);
            i.normal.add(b[e]), i.normal.add(b[f]), i.normal.add(b[g]), i.normal.add(b[h]), i.normal.normalize(), this.faces.push(i), this.faceVertexUvs[0].push([a[e].clone(), a[f].clone(), a[g].clone(), a[h].clone()])
        }
    this.computeCentroids()
}, THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.TorusKnotGeometry = function (a, b, c, d, e, f, g) {
    function h(a, b, c, d, e, f) {
        var g = Math.cos(a);
        return Math.cos(b), b = Math.sin(a), a *= c / d, c = Math.cos(a), g *= .5 * e * (2 + c), b = .5 * e * (2 + c) * b, e = .5 * f * e * Math.sin(a), new THREE.Vector3(g, b, e)
    }
    for (THREE.Geometry.call(this), this.radius = a || 100, this.tube = b || 40, this.radialSegments = c || 64, this.tubularSegments = d || 8, this.p = e || 2, this.q = f || 3, this.heightScale = g || 1, this.grid = Array(this.radialSegments), c = new THREE.Vector3, d = new THREE.Vector3, e = new THREE.Vector3, a = 0; a < this.radialSegments; ++a)
        for (this.grid[a] = Array(this.tubularSegments), b = 0; b < this.tubularSegments; ++b) {
            var i = 2 * (a / this.radialSegments) * this.p * Math.PI,
                g = 2 * (b / this.tubularSegments) * Math.PI,
                f = h(i, g, this.q, this.p, this.radius, this.heightScale),
                i = h(i + .01, g, this.q, this.p, this.radius, this.heightScale);
            c.subVectors(i, f), d.addVectors(i, f), e.crossVectors(c, d), d.crossVectors(e, c), e.normalize(), d.normalize(), i = -this.tube * Math.cos(g), g = this.tube * Math.sin(g), f.x += i * d.x + g * e.x, f.y += i * d.y + g * e.y, f.z += i * d.z + g * e.z, this.grid[a][b] = this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1
        }
    for (a = 0; a < this.radialSegments; ++a)
        for (b = 0; b < this.tubularSegments; ++b) {
            var e = (a + 1) % this.radialSegments,
                f = (b + 1) % this.tubularSegments,
                c = this.grid[a][b],
                d = this.grid[e][b],
                e = this.grid[e][f],
                f = this.grid[a][f],
                g = new THREE.Vector2(a / this.radialSegments, b / this.tubularSegments),
                i = new THREE.Vector2((a + 1) / this.radialSegments, b / this.tubularSegments),
                j = new THREE.Vector2((a + 1) / this.radialSegments, (b + 1) / this.tubularSegments),
                k = new THREE.Vector2(a / this.radialSegments, (b + 1) / this.tubularSegments);
            this.faces.push(new THREE.Face4(c, d, e, f)), this.faceVertexUvs[0].push([g, i, j, k])
        }
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.TubeGeometry = function (a, b, c, d, e, f) {
    THREE.Geometry.call(this), this.path = a, this.segments = b || 64, this.radius = c || 1, this.radiusSegments = d || 8, this.closed = e || !1, f && (this.debug = new THREE.Object3D), this.grid = [];
    var g, h, i, j, k, l, m, n, e = this.segments + 1,
        f = new THREE.Vector3,
        b = new THREE.TubeGeometry.FrenetFrames(this.path, this.segments, this.closed);
    for (l = b.tangents, m = b.normals, n = b.binormals, this.tangents = l, this.normals = m, this.binormals = n, b = 0; e > b; b++)
        for (this.grid[b] = [], d = b / (e - 1), k = a.getPointAt(d), d = l[b], g = m[b], h = n[b], this.debug && (this.debug.add(new THREE.ArrowHelper(d, k, c, 255)), this.debug.add(new THREE.ArrowHelper(g, k, c, 16711680)), this.debug.add(new THREE.ArrowHelper(h, k, c, 65280))), d = 0; d < this.radiusSegments; d++) i = 2 * (d / this.radiusSegments) * Math.PI, j = -this.radius * Math.cos(i), i = this.radius * Math.sin(i), f.copy(k), f.x += j * g.x + i * h.x, f.y += j * g.y + i * h.y, f.z += j * g.z + i * h.z, this.grid[b][d] = this.vertices.push(new THREE.Vector3(f.x, f.y, f.z)) - 1;
    for (b = 0; b < this.segments; b++)
        for (d = 0; d < this.radiusSegments; d++) e = this.closed ? (b + 1) % this.segments : b + 1, f = (d + 1) % this.radiusSegments, a = this.grid[b][d], c = this.grid[e][d], e = this.grid[e][f], f = this.grid[b][f], l = new THREE.Vector2(b / this.segments, d / this.radiusSegments), m = new THREE.Vector2((b + 1) / this.segments, d / this.radiusSegments), n = new THREE.Vector2((b + 1) / this.segments, (d + 1) / this.radiusSegments), g = new THREE.Vector2(b / this.segments, (d + 1) / this.radiusSegments), this.faces.push(new THREE.Face4(a, c, e, f)), this.faceVertexUvs[0].push([l, m, n, g]);
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.TubeGeometry.FrenetFrames = function (a, b, c) {
    new THREE.Vector3;
    var d = new THREE.Vector3;
    new THREE.Vector3;
    var e, f, g, h = [],
        i = [],
        j = [],
        k = new THREE.Vector3,
        l = new THREE.Matrix4,
        b = b + 1;
    for (this.tangents = h, this.normals = i, this.binormals = j, e = 0; b > e; e++) f = e / (b - 1), h[e] = a.getTangentAt(f), h[e].normalize();
    for (i[0] = new THREE.Vector3, j[0] = new THREE.Vector3, a = Number.MAX_VALUE, e = Math.abs(h[0].x), f = Math.abs(h[0].y), g = Math.abs(h[0].z), a >= e && (a = e, d.set(1, 0, 0)), a >= f && (a = f, d.set(0, 1, 0)), a >= g && d.set(0, 0, 1), k.crossVectors(h[0], d).normalize(), i[0].crossVectors(h[0], k), j[0].crossVectors(h[0], i[0]), e = 1; b > e; e++) i[e] = i[e - 1].clone(), j[e] = j[e - 1].clone(), k.crossVectors(h[e - 1], h[e]), 1e-4 < k.length() && (k.normalize(), d = Math.acos(h[e - 1].dot(h[e])), i[e].applyMatrix4(l.makeRotationAxis(k, d))), j[e].crossVectors(h[e], i[e]);
    if (c)
        for (d = Math.acos(i[0].dot(i[b - 1])), d /= b - 1, 0 < h[0].dot(k.crossVectors(i[0], i[b - 1])) && (d = -d), e = 1; b > e; e++) i[e].applyMatrix4(l.makeRotationAxis(h[e], d * e)), j[e].crossVectors(h[e], i[e])
}, THREE.PolyhedronGeometry = function (a, b, c, d) {
    function e(a) {
        var b = a.normalize().clone();
        b.index = h.vertices.push(b) - 1;
        var c = Math.atan2(a.z, -a.x) / 2 / Math.PI + .5,
            a = Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI + .5;
        return b.uv = new THREE.Vector2(c, 1 - a), b
    }

    function f(a, b, c) {
        var d = new THREE.Face3(a.index, b.index, c.index, [a.clone(), b.clone(), c.clone()]);
        d.centroid.add(a).add(b).add(c).divideScalar(3), d.normal.copy(d.centroid).normalize(), h.faces.push(d), d = Math.atan2(d.centroid.z, -d.centroid.x), h.faceVertexUvs[0].push([g(a.uv, a, d), g(b.uv, b, d), g(c.uv, c, d)])
    }

    function g(a, b, c) {
        return 0 > c && 1 === a.x && (a = new THREE.Vector2(a.x - 1, a.y)), 0 === b.x && 0 === b.z && (a = new THREE.Vector2(c / 2 / Math.PI + .5, a.y)), a.clone()
    }
    THREE.Geometry.call(this);
    for (var c = c || 1, d = d || 0, h = this, i = 0, j = a.length; j > i; i++) e(new THREE.Vector3(a[i][0], a[i][1], a[i][2]));
    for (var k = this.vertices, a = [], i = 0, j = b.length; j > i; i++) {
        var l = k[b[i][0]],
            m = k[b[i][1]],
            n = k[b[i][2]];
        a[i] = new THREE.Face3(l.index, m.index, n.index, [l.clone(), m.clone(), n.clone()])
    }
    for (i = 0, j = a.length; j > i; i++) {
        m = a[i], k = d, b = Math.pow(2, k), Math.pow(4, k);
        for (var k = e(h.vertices[m.a]), l = e(h.vertices[m.b]), o = e(h.vertices[m.c]), m = [], n = 0; b >= n; n++) {
            m[n] = [];
            for (var p = e(k.clone().lerp(o, n / b)), q = e(l.clone().lerp(o, n / b)), r = b - n, s = 0; r >= s; s++) m[n][s] = 0 == s && n == b ? p : e(p.clone().lerp(q, s / r))
        }
        for (n = 0; b > n; n++)
            for (s = 0; 2 * (b - n) - 1 > s; s++) k = Math.floor(s / 2), 0 == s % 2 ? f(m[n][k + 1], m[n + 1][k], m[n][k]) : f(m[n][k + 1], m[n + 1][k + 1], m[n + 1][k])
    }
    for (i = 0, j = this.faceVertexUvs[0].length; j > i; i++) d = this.faceVertexUvs[0][i], a = d[0].x, b = d[1].x, k = d[2].x, l = Math.max(a, Math.max(b, k)), m = Math.min(a, Math.min(b, k)), l > .9 && .1 > m && (.2 > a && (d[0].x += 1), .2 > b && (d[1].x += 1), .2 > k && (d[2].x += 1));
    for (this.mergeVertices(), i = 0, j = this.vertices.length; j > i; i++) this.vertices[i].multiplyScalar(c);
    this.computeCentroids(), this.boundingSphere = new THREE.Sphere(new THREE.Vector3, c)
}, THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.IcosahedronGeometry = function (a, b) {
    this.radius = a, this.detail = b;
    var c = (1 + Math.sqrt(5)) / 2;
    THREE.PolyhedronGeometry.call(this, [[-1, c, 0], [1, c, 0], [-1, -c, 0], [1, -c, 0], [0, -1, c], [0, 1, c], [0, -1, -c], [0, 1, -c], [c, 0, -1], [c, 0, 1], [-c, 0, -1], [-c, 0, 1]], [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]], a, b)
}, THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.OctahedronGeometry = function (a, b) {
    THREE.PolyhedronGeometry.call(this, [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]], [[0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2], [1, 2, 5], [1, 5, 3], [1, 3, 4], [1, 4, 2]], a, b)
}, THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.TetrahedronGeometry = function (a, b) {
    THREE.PolyhedronGeometry.call(this, [[1, 1, 1], [-1, -1, 1], [-1, 1, -1], [1, -1, -1]], [[2, 1, 0], [0, 3, 2], [1, 3, 0], [2, 3, 1]], a, b)
}, THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.ParametricGeometry = function (a, b, c, d) {
    THREE.Geometry.call(this);
    var e, f, g, h, i = this.vertices,
        j = this.faces,
        k = this.faceVertexUvs[0],
        d = void 0 === d ? !1 : d,
        l = b + 1;
    for (e = 0; c >= e; e++)
        for (h = e / c, f = 0; b >= f; f++) g = f / b, g = a(g, h), i.push(g);
    var m, n, o, p;
    for (e = 0; c > e; e++)
        for (f = 0; b > f; f++) a = e * l + f, i = e * l + f + 1, h = (e + 1) * l + f, g = (e + 1) * l + f + 1, m = new THREE.Vector2(f / b, e / c), n = new THREE.Vector2((f + 1) / b, e / c), o = new THREE.Vector2(f / b, (e + 1) / c), p = new THREE.Vector2((f + 1) / b, (e + 1) / c), d ? (j.push(new THREE.Face3(a, i, h)), j.push(new THREE.Face3(i, g, h)), k.push([m, n, o]), k.push([n, p, o])) : (j.push(new THREE.Face4(a, i, g, h)), k.push([m, n, p, o]));
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.ConvexGeometry = function (a) {
    function b(a) {
        var b = a.length();
        return new THREE.Vector2(a.x / b, a.y / b)
    }
    THREE.Geometry.call(this);
    for (var c = [[0, 1, 2], [0, 2, 1]], d = 3; d < a.length; d++) {
        var e = d,
            f = a[e].clone(),
            g = f.length();
        f.x += 2e-6 * g * (Math.random() - .5), f.y += 2e-6 * g * (Math.random() - .5), f.z += 2e-6 * g * (Math.random() - .5);
        for (var g = [], h = 0; h < c.length;) {
            var i, j = c[h],
                k = f,
                l = a[j[0]];
            i = l;
            var m = a[j[1]],
                n = a[j[2]],
                o = new THREE.Vector3,
                p = new THREE.Vector3;
            if (o.subVectors(n, m), p.subVectors(i, m), o.cross(p), o.normalize(), i = o, l = i.dot(l), i.dot(k) >= l) {
                for (k = 0; 3 > k; k++) {
                    for (l = [j[k], j[(k + 1) % 3]], i = !0, m = 0; m < g.length; m++)
                        if (g[m][0] === l[1] && g[m][1] === l[0]) {
                            g[m] = g[g.length - 1], g.pop(), i = !1;
                            break
                        }
                    i && g.push(l)
                }
                c[h] = c[c.length - 1], c.pop()
            } else h++
        }
        for (m = 0; m < g.length; m++) c.push([g[m][0], g[m][1], e])
    }
    for (e = 0, f = Array(a.length), d = 0; d < c.length; d++)
        for (g = c[d], h = 0; 3 > h; h++) void 0 === f[g[h]] && (f[g[h]] = e++, this.vertices.push(a[g[h]])), g[h] = f[g[h]];
    for (d = 0; d < c.length; d++) this.faces.push(new THREE.Face3(c[d][0], c[d][1], c[d][2]));
    for (d = 0; d < this.faces.length; d++) g = this.faces[d], this.faceVertexUvs[0].push([b(this.vertices[g.a]), b(this.vertices[g.b]), b(this.vertices[g.c])]);
    this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals()
}, THREE.ConvexGeometry.prototype = Object.create(THREE.Geometry.prototype), THREE.AxisHelper = function (a) {
    var a = a || 1,
        b = new THREE.Geometry;
    b.vertices.push(new THREE.Vector3, new THREE.Vector3(a, 0, 0), new THREE.Vector3, new THREE.Vector3(0, a, 0), new THREE.Vector3, new THREE.Vector3(0, 0, a)), b.colors.push(new THREE.Color(16711680), new THREE.Color(16755200), new THREE.Color(65280), new THREE.Color(11206400), new THREE.Color(255), new THREE.Color(43775)), a = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    }), THREE.Line.call(this, b, a, THREE.LinePieces)
}, THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype), THREE.ArrowHelper = function (a, b, c, d) {
    THREE.Object3D.call(this), void 0 === d && (d = 16776960), void 0 === c && (c = 1), this.position = b, this.useQuaternion = !0, b = new THREE.Geometry, b.vertices.push(new THREE.Vector3(0, 0, 0)), b.vertices.push(new THREE.Vector3(0, 1, 0)), this.line = new THREE.Line(b, new THREE.LineBasicMaterial({
        color: d
    })), this.line.matrixAutoUpdate = !1, this.add(this.line), b = new THREE.CylinderGeometry(0, .05, .25, 5, 1), b.applyMatrix((new THREE.Matrix4).makeTranslation(0, .875, 0)), this.cone = new THREE.Mesh(b, new THREE.MeshBasicMaterial({
        color: d
    })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(a), this.setLength(c)
}, THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype), THREE.ArrowHelper.prototype.setDirection = function () {
    var a, b = new THREE.Vector3;
    return function (c) {.999 < c.y ? this.quaternion.set(0, 0, 0, 1) : -.999 > c.y ? this.quaternion.set(1, 0, 0, 0) : (b.set(c.z, 0, -c.x).normalize(), a = Math.acos(c.y), this.quaternion.setFromAxisAngle(b, a))
    }
}(), THREE.ArrowHelper.prototype.setLength = function (a) {
    this.scale.set(a, a, a)
}, THREE.ArrowHelper.prototype.setColor = function (a) {
    this.line.material.color.setHex(a), this.cone.material.color.setHex(a)
}, THREE.BoxHelper = function (a) {
    var a = a || 1,
        b = new THREE.Geometry,
        a = [new THREE.Vector3(a, a, a), new THREE.Vector3(-a, a, a), new THREE.Vector3(-a, -a, a), new THREE.Vector3(a, -a, a), new THREE.Vector3(a, a, -a), new THREE.Vector3(-a, a, -a), new THREE.Vector3(-a, -a, -a), new THREE.Vector3(a, -a, -a)];
    b.vertices.push(a[0], a[1], a[1], a[2], a[2], a[3], a[3], a[0], a[4], a[5], a[5], a[6], a[6], a[7], a[7], a[4], a[0], a[4], a[1], a[5], a[2], a[6], a[3], a[7]), this.vertices = a, THREE.Line.call(this, b, new THREE.LineBasicMaterial, THREE.LinePieces)
}, THREE.BoxHelper.prototype = Object.create(THREE.Line.prototype), THREE.BoxHelper.prototype.update = function (a) {
    var b = a.geometry;
    null === b.boundingBox && b.computeBoundingBox();
    var c = b.boundingBox.min,
        b = b.boundingBox.max,
        d = this.vertices;
    d[0].set(b.x, b.y, b.z), d[1].set(c.x, b.y, b.z), d[2].set(c.x, c.y, b.z), d[3].set(b.x, c.y, b.z), d[4].set(b.x, b.y, c.z), d[5].set(c.x, b.y, c.z), d[6].set(c.x, c.y, c.z), d[7].set(b.x, c.y, c.z), this.geometry.computeBoundingSphere(), this.geometry.verticesNeedUpdate = !0, this.matrixAutoUpdate = !1, this.matrixWorld = a.matrixWorld
}, THREE.CameraHelper = function (a) {
    function b(a, b, d) {
        c(a, d), c(b, d)
    }

    function c(a, b) {
        d.vertices.push(new THREE.Vector3), d.colors.push(new THREE.Color(b)), void 0 === f[a] && (f[a] = []), f[a].push(d.vertices.length - 1)
    }
    THREE.Line.call(this);
    var d = new THREE.Geometry,
        e = new THREE.LineBasicMaterial({
            color: 16777215,
            vertexColors: THREE.FaceColors
        }),
        f = {};
    b("n1", "n2", 16755200), b("n2", "n4", 16755200), b("n4", "n3", 16755200), b("n3", "n1", 16755200), b("f1", "f2", 16755200), b("f2", "f4", 16755200), b("f4", "f3", 16755200), b("f3", "f1", 16755200), b("n1", "f1", 16755200), b("n2", "f2", 16755200), b("n3", "f3", 16755200), b("n4", "f4", 16755200), b("p", "n1", 16711680), b("p", "n2", 16711680), b("p", "n3", 16711680), b("p", "n4", 16711680), b("u1", "u2", 43775), b("u2", "u3", 43775), b("u3", "u1", 43775), b("c", "t", 16777215), b("p", "c", 3355443), b("cn1", "cn2", 3355443), b("cn3", "cn4", 3355443), b("cf1", "cf2", 3355443), b("cf3", "cf4", 3355443), THREE.Line.call(this, d, e, THREE.LinePieces), this.camera = a, this.matrixWorld = a.matrixWorld, this.matrixAutoUpdate = !1, this.pointMap = f, this.update()
}, THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype), THREE.CameraHelper.prototype.update = function () {
    var a = new THREE.Vector3,
        b = new THREE.Camera,
        c = new THREE.Projector;
    return function () {
        function d(d, f, g, h) {
            if (a.set(f, g, h), c.unprojectVector(a, b), d = e.pointMap[d], void 0 !== d)
                for (f = 0, g = d.length; g > f; f++) e.geometry.vertices[d[f]].copy(a)
        }
        var e = this;
        b.projectionMatrix.copy(this.camera.projectionMatrix), d("c", 0, 0, -1), d("t", 0, 0, 1), d("n1", -1, -1, -1), d("n2", 1, -1, -1), d("n3", -1, 1, -1), d("n4", 1, 1, -1), d("f1", -1, -1, 1), d("f2", 1, -1, 1), d("f3", -1, 1, 1), d("f4", 1, 1, 1), d("u1", .7, 1.1, -1), d("u2", -.7, 1.1, -1), d("u3", 0, 2, -1), d("cf1", -1, 0, 1), d("cf2", 1, 0, 1), d("cf3", 0, -1, 1), d("cf4", 0, 1, 1), d("cn1", -1, 0, -1), d("cn2", 1, 0, -1), d("cn3", 0, -1, -1), d("cn4", 0, 1, -1), this.geometry.verticesNeedUpdate = !0
    }
}(), THREE.DirectionalLightHelper = function (a, b) {
    THREE.Object3D.call(this), this.matrixAutoUpdate = !1, this.light = a;
    var c = new THREE.SphereGeometry(b, 4, 2),
        d = new THREE.MeshBasicMaterial({
            fog: !1,
            wireframe: !0
        });
    d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightSphere = new THREE.Mesh(c, d), this.lightSphere.matrixWorld = this.light.matrixWorld, this.lightSphere.matrixAutoUpdate = !1, this.add(this.lightSphere), c = new THREE.Geometry, c.vertices.push(this.light.position), c.vertices.push(this.light.target.position), c.computeLineDistances(), d = new THREE.LineDashedMaterial({
        dashSize: 4,
        gapSize: 4,
        opacity: .75,
        transparent: !0,
        fog: !1
    }), d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine = new THREE.Line(c, d), this.add(this.targetLine)
}, THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype), THREE.DirectionalLightHelper.prototype.update = function () {
    this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine.geometry.computeLineDistances(), this.targetLine.geometry.verticesNeedUpdate = !0, this.targetLine.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
}, THREE.GridHelper = function (a, b) {
    for (var c = new THREE.Geometry, d = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    }), e = new THREE.Color(4473924), f = new THREE.Color(8947848), g = -a; a >= g; g += b) {
        c.vertices.push(new THREE.Vector3(-a, 0, g)), c.vertices.push(new THREE.Vector3(a, 0, g)), c.vertices.push(new THREE.Vector3(g, 0, -a)), c.vertices.push(new THREE.Vector3(g, 0, a));
        var h = 0 === g ? e : f;
        c.colors.push(h, h, h, h)
    }
    THREE.Line.call(this, c, d, THREE.LinePieces)
}, THREE.GridHelper.prototype = Object.create(THREE.Line.prototype), THREE.HemisphereLightHelper = function (a, b) {
    THREE.Object3D.call(this), this.light = a;
    var c = new THREE.SphereGeometry(b, 4, 2);
    c.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2));
    for (var d = 0; 8 > d; d++) c.faces[d].materialIndex = 4 > d ? 0 : 1;
    d = new THREE.MeshBasicMaterial({
        fog: !1,
        wireframe: !0
    }), d.color.copy(a.color).multiplyScalar(a.intensity);
    var e = new THREE.MeshBasicMaterial({
        fog: !1,
        wireframe: !0
    });
    e.color.copy(a.groundColor).multiplyScalar(a.intensity), this.lightSphere = new THREE.Mesh(c, new THREE.MeshFaceMaterial([d, e])), this.lightSphere.position = a.position, this.lightSphere.lookAt(new THREE.Vector3), this.add(this.lightSphere)
}, THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype), THREE.HemisphereLightHelper.prototype.update = function () {
    this.lightSphere.lookAt(new THREE.Vector3), this.lightSphere.material.materials[0].color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightSphere.material.materials[1].color.copy(this.light.groundColor).multiplyScalar(this.light.intensity)
}, THREE.PointLightHelper = function (a, b) {
    THREE.Object3D.call(this), this.matrixAutoUpdate = !1, this.light = a;
    var c = new THREE.SphereGeometry(b, 4, 2),
        d = new THREE.MeshBasicMaterial({
            fog: !1,
            wireframe: !0
        });
    d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightSphere = new THREE.Mesh(c, d), this.lightSphere.matrixWorld = this.light.matrixWorld, this.lightSphere.matrixAutoUpdate = !1, this.add(this.lightSphere)
}, THREE.PointLightHelper.prototype = Object.create(THREE.Object3D.prototype), THREE.PointLightHelper.prototype.update = function () {
    this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
}, THREE.SpotLightHelper = function (a, b) {
    THREE.Object3D.call(this), this.matrixAutoUpdate = !1, this.light = a;
    var c = new THREE.SphereGeometry(b, 4, 2),
        d = new THREE.MeshBasicMaterial({
            fog: !1,
            wireframe: !0
        });
    d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightSphere = new THREE.Mesh(c, d), this.lightSphere.matrixWorld = this.light.matrixWorld, this.lightSphere.matrixAutoUpdate = !1, this.add(this.lightSphere), c = new THREE.CylinderGeometry(1e-4, 1, 1, 8, 1, !0), c.applyMatrix((new THREE.Matrix4).makeTranslation(0, -.5, 0)), c.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2)), d = new THREE.MeshBasicMaterial({
        fog: !1,
        wireframe: !0,
        opacity: .3,
        transparent: !0
    }), d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightCone = new THREE.Mesh(c, d), this.lightCone.position = this.light.position, c = a.distance ? a.distance : 1e4, d = c * Math.tan(a.angle), this.lightCone.scale.set(d, d, c), this.lightCone.lookAt(this.light.target.position), this.add(this.lightCone)
}, THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype), THREE.SpotLightHelper.prototype.update = function () {
    var a = this.light.distance ? this.light.distance : 1e4,
        b = a * Math.tan(this.light.angle);
    this.lightCone.scale.set(b, b, a), this.lightCone.lookAt(this.light.target.position), this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightCone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
}, THREE.ImmediateRenderObject = function () {
    THREE.Object3D.call(this), this.render = function () {}
}, THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype), THREE.LensFlare = function (a, b, c, d, e) {
    THREE.Object3D.call(this), this.lensFlares = [], this.positionScreen = new THREE.Vector3, this.customUpdateCallback = void 0, void 0 !== a && this.add(a, b, c, d, e)
}, THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype), THREE.LensFlare.prototype.add = function (a, b, c, d, e, f) {
    void 0 === b && (b = -1), void 0 === c && (c = 0), void 0 === f && (f = 1), void 0 === e && (e = new THREE.Color(16777215)), void 0 === d && (d = THREE.NormalBlending), c = Math.min(c, Math.max(0, c)), this.lensFlares.push({
        texture: a,
        size: b,
        distance: c,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: f,
        color: e,
        blending: d
    })
}, THREE.LensFlare.prototype.updateLensFlares = function () {
    var a, b, c = this.lensFlares.length,
        d = 2 * -this.positionScreen.x,
        e = 2 * -this.positionScreen.y;
    for (a = 0; c > a; a++) b = this.lensFlares[a], b.x = this.positionScreen.x + d * b.distance, b.y = this.positionScreen.y + e * b.distance, b.wantedRotation = .25 * b.x * Math.PI, b.rotation += .25 * (b.wantedRotation - b.rotation)
}, THREE.MorphBlendMesh = function (a, b) {
    THREE.Mesh.call(this, a, b), this.animationsMap = {}, this.animationsList = [];
    var c = this.geometry.morphTargets.length;
    this.createAnimation("__default", 0, c - 1, c / 1), this.setAnimationWeight("__default", 1)
}, THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype), THREE.MorphBlendMesh.prototype.createAnimation = function (a, b, c, d) {
    b = {
        startFrame: b,
        endFrame: c,
        length: c - b + 1,
        fps: d,
        duration: (c - b) / d,
        lastFrame: 0,
        currentFrame: 0,
        active: !1,
        time: 0,
        direction: 1,
        weight: 1,
        directionBackwards: !1,
        mirroredLoop: !1
    }, this.animationsMap[a] = b, this.animationsList.push(b)
}, THREE.MorphBlendMesh.prototype.autoCreateAnimations = function (a) {
    for (var b, c = /([a-z]+)(\d+)/, d = {}, e = this.geometry, f = 0, g = e.morphTargets.length; g > f; f++) {
        var h = e.morphTargets[f].name.match(c);
        if (h && 1 < h.length) {
            var i = h[1];
            d[i] || (d[i] = {
                start: 1 / 0,
                end: -1 / 0
            }), h = d[i], f < h.start && (h.start = f), f > h.end && (h.end = f), b || (b = i)
        }
    }
    for (i in d) h = d[i], this.createAnimation(i, h.start, h.end, a);
    this.firstAnimation = b
}, THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function (a) {
    (a = this.animationsMap[a]) && (a.direction = 1, a.directionBackwards = !1)
}, THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function (a) {
    (a = this.animationsMap[a]) && (a.direction = -1, a.directionBackwards = !0)
}, THREE.MorphBlendMesh.prototype.setAnimationFPS = function (a, b) {
    var c = this.animationsMap[a];
    c && (c.fps = b, c.duration = (c.end - c.start) / c.fps)
}, THREE.MorphBlendMesh.prototype.setAnimationDuration = function (a, b) {
    var c = this.animationsMap[a];
    c && (c.duration = b, c.fps = (c.end - c.start) / c.duration)
}, THREE.MorphBlendMesh.prototype.setAnimationWeight = function (a, b) {
    var c = this.animationsMap[a];
    c && (c.weight = b)
}, THREE.MorphBlendMesh.prototype.setAnimationTime = function (a, b) {
    var c = this.animationsMap[a];
    c && (c.time = b)
}, THREE.MorphBlendMesh.prototype.getAnimationTime = function (a) {
    var b = 0;
    return (a = this.animationsMap[a]) && (b = a.time), b
}, THREE.MorphBlendMesh.prototype.getAnimationDuration = function (a) {
    var b = -1;
    return (a = this.animationsMap[a]) && (b = a.duration), b
}, THREE.MorphBlendMesh.prototype.playAnimation = function (a) {
    var b = this.animationsMap[a];
    b ? (b.time = 0, b.active = !0) : console.warn("animation[" + a + "] undefined")
}, THREE.MorphBlendMesh.prototype.stopAnimation = function (a) {
    (a = this.animationsMap[a]) && (a.active = !1)
}, THREE.MorphBlendMesh.prototype.update = function (a) {
    for (var b = 0, c = this.animationsList.length; c > b; b++) {
        var d = this.animationsList[b];
        if (d.active) {
            var e = d.duration / d.length;
            d.time += d.direction * a, d.mirroredLoop ? (d.time > d.duration || 0 > d.time) && (d.direction *= -1, d.time > d.duration && (d.time = d.duration, d.directionBackwards = !0), 0 > d.time && (d.time = 0, d.directionBackwards = !1)) : (d.time %= d.duration, 0 > d.time && (d.time += d.duration));
            var f = d.startFrame + THREE.Math.clamp(Math.floor(d.time / e), 0, d.length - 1),
                g = d.weight;
            f !== d.currentFrame && (this.morphTargetInfluences[d.lastFrame] = 0, this.morphTargetInfluences[d.currentFrame] = 1 * g, this.morphTargetInfluences[f] = 0, d.lastFrame = d.currentFrame, d.currentFrame = f), e = d.time % e / e, d.directionBackwards && (e = 1 - e), this.morphTargetInfluences[d.currentFrame] = e * g, this.morphTargetInfluences[d.lastFrame] = (1 - e) * g
        }
    }
}, THREE.LensFlarePlugin = function () {
    function a(a, c) {
        var d = b.createProgram(),
            e = b.createShader(b.FRAGMENT_SHADER),
            f = b.createShader(b.VERTEX_SHADER),
            g = "precision " + c + " float;\n";
        return b.shaderSource(e, g + a.fragmentShader), b.shaderSource(f, g + a.vertexShader), b.compileShader(e), b.compileShader(f), b.attachShader(d, e), b.attachShader(d, f), b.linkProgram(d), d
    }
    var b, c, d, e, f, g, h, i, j, k, l, m, n;
    this.init = function (o) {
        b = o.context, c = o, d = o.getPrecision(), e = new Float32Array(16), f = new Uint16Array(6), o = 0, e[o++] = -1, e[o++] = -1, e[o++] = 0, e[o++] = 0, e[o++] = 1, e[o++] = -1, e[o++] = 1, e[o++] = 0, e[o++] = 1, e[o++] = 1, e[o++] = 1, e[o++] = 1, e[o++] = -1, e[o++] = 1, e[o++] = 0, e[o++] = 1, o = 0, f[o++] = 0, f[o++] = 1, f[o++] = 2, f[o++] = 0, f[o++] = 2, f[o++] = 3, g = b.createBuffer(), h = b.createBuffer(), b.bindBuffer(b.ARRAY_BUFFER, g), b.bufferData(b.ARRAY_BUFFER, e, b.STATIC_DRAW), b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h), b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW), i = b.createTexture(), j = b.createTexture(), b.bindTexture(b.TEXTURE_2D, i), b.texImage2D(b.TEXTURE_2D, 0, b.RGB, 16, 16, 0, b.RGB, b.UNSIGNED_BYTE, null), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST), b.bindTexture(b.TEXTURE_2D, j), b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 16, 16, 0, b.RGBA, b.UNSIGNED_BYTE, null), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST), 0 >= b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS) ? (k = !1, l = a(THREE.ShaderFlares.lensFlare, d)) : (k = !0, l = a(THREE.ShaderFlares.lensFlareVertexTexture, d)), m = {}, n = {}, m.vertex = b.getAttribLocation(l, "position"), m.uv = b.getAttribLocation(l, "uv"), n.renderType = b.getUniformLocation(l, "renderType"), n.map = b.getUniformLocation(l, "map"), n.occlusionMap = b.getUniformLocation(l, "occlusionMap"), n.opacity = b.getUniformLocation(l, "opacity"), n.color = b.getUniformLocation(l, "color"), n.scale = b.getUniformLocation(l, "scale"), n.rotation = b.getUniformLocation(l, "rotation"), n.screenPosition = b.getUniformLocation(l, "screenPosition")
    }, this.render = function (a, d, e, f) {
        var a = a.__webglFlares,
            o = a.length;
        if (o) {
            var p = new THREE.Vector3,
                q = f / e,
                r = .5 * e,
                s = .5 * f,
                t = 16 / f,
                u = new THREE.Vector2(t * q, t),
                v = new THREE.Vector3(1, 1, 0),
                w = new THREE.Vector2(1, 1),
                x = n,
                t = m;
            b.useProgram(l), b.enableVertexAttribArray(m.vertex), b.enableVertexAttribArray(m.uv), b.uniform1i(x.occlusionMap, 0), b.uniform1i(x.map, 1), b.bindBuffer(b.ARRAY_BUFFER, g), b.vertexAttribPointer(t.vertex, 2, b.FLOAT, !1, 16, 0), b.vertexAttribPointer(t.uv, 2, b.FLOAT, !1, 16, 8), b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h), b.disable(b.CULL_FACE), b.depthMask(!1);
            var y, z, A, B, C;
            for (y = 0; o > y; y++)
                if (t = 16 / f, u.set(t * q, t), B = a[y], p.set(B.matrixWorld.elements[12], B.matrixWorld.elements[13], B.matrixWorld.elements[14]), p.applyMatrix4(d.matrixWorldInverse), p.applyProjection(d.projectionMatrix), v.copy(p), w.x = v.x * r + r, w.y = v.y * s + s, k || 0 < w.x && w.x < e && 0 < w.y && w.y < f)
                    for (b.activeTexture(b.TEXTURE1), b.bindTexture(b.TEXTURE_2D, i), b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, w.x - 8, w.y - 8, 16, 16, 0), b.uniform1i(x.renderType, 0), b.uniform2f(x.scale, u.x, u.y), b.uniform3f(x.screenPosition, v.x, v.y, v.z), b.disable(b.BLEND), b.enable(b.DEPTH_TEST), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0), b.activeTexture(b.TEXTURE0), b.bindTexture(b.TEXTURE_2D, j), b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGBA, w.x - 8, w.y - 8, 16, 16, 0), b.uniform1i(x.renderType, 1), b.disable(b.DEPTH_TEST), b.activeTexture(b.TEXTURE1), b.bindTexture(b.TEXTURE_2D, i), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0), B.positionScreen.copy(v), B.customUpdateCallback ? B.customUpdateCallback(B) : B.updateLensFlares(), b.uniform1i(x.renderType, 2), b.enable(b.BLEND), z = 0, A = B.lensFlares.length; A > z; z++) C = B.lensFlares[z], .001 < C.opacity && .001 < C.scale && (v.x = C.x, v.y = C.y, v.z = C.z, t = C.size * C.scale / f, u.x = t * q, u.y = t, b.uniform3f(x.screenPosition, v.x, v.y, v.z), b.uniform2f(x.scale, u.x, u.y), b.uniform1f(x.rotation, C.rotation), b.uniform1f(x.opacity, C.opacity), b.uniform3f(x.color, C.color.r, C.color.g, C.color.b), c.setBlending(C.blending, C.blendEquation, C.blendSrc, C.blendDst), c.setTexture(C.texture, 1), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
            b.enable(b.CULL_FACE), b.enable(b.DEPTH_TEST), b.depthMask(!0)
        }
    }
}, THREE.ShadowMapPlugin = function () {
    var a, b, c, d, e, f, g = new THREE.Frustum,
        h = new THREE.Matrix4,
        i = new THREE.Vector3,
        j = new THREE.Vector3,
        k = new THREE.Vector3;
    this.init = function (g) {
        a = g.context, b = g;
        var g = THREE.ShaderLib.depthRGBA,
            h = THREE.UniformsUtils.clone(g.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h
        }), d = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            morphTargets: !0
        }), e = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            skinning: !0
        }), f = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            morphTargets: !0,
            skinning: !0
        }), c._shadowPass = !0, d._shadowPass = !0, e._shadowPass = !0, f._shadowPass = !0
    }, this.render = function (a, c) {
        b.shadowMapEnabled && b.shadowMapAutoUpdate && this.update(a, c)
    }, this.update = function (l, m) {
        var n, o, p, q, r, s, t, u, v, w = [];
        for (q = 0, a.clearColor(1, 1, 1, 1), a.disable(a.BLEND), a.enable(a.CULL_FACE), a.frontFace(a.CCW), b.shadowMapCullFace === THREE.CullFaceFront ? a.cullFace(a.FRONT) : a.cullFace(a.BACK), b.setDepthTest(!0), n = 0, o = l.__lights.length; o > n; n++)
            if (p = l.__lights[n], p.castShadow)
                if (p instanceof THREE.DirectionalLight && p.shadowCascade)
                    for (r = 0; r < p.shadowCascadeCount; r++) {
                        var x;
                        if (p.shadowCascadeArray[r]) x = p.shadowCascadeArray[r];
                        else {
                            v = p, t = r, x = new THREE.DirectionalLight, x.isVirtual = !0, x.onlyShadow = !0, x.castShadow = !0, x.shadowCameraNear = v.shadowCameraNear, x.shadowCameraFar = v.shadowCameraFar, x.shadowCameraLeft = v.shadowCameraLeft, x.shadowCameraRight = v.shadowCameraRight, x.shadowCameraBottom = v.shadowCameraBottom, x.shadowCameraTop = v.shadowCameraTop, x.shadowCameraVisible = v.shadowCameraVisible, x.shadowDarkness = v.shadowDarkness, x.shadowBias = v.shadowCascadeBias[t], x.shadowMapWidth = v.shadowCascadeWidth[t], x.shadowMapHeight = v.shadowCascadeHeight[t], x.pointsWorld = [], x.pointsFrustum = [], u = x.pointsWorld, s = x.pointsFrustum;
                            for (var y = 0; 8 > y; y++) u[y] = new THREE.Vector3, s[y] = new THREE.Vector3;
                            u = v.shadowCascadeNearZ[t], v = v.shadowCascadeFarZ[t], s[0].set(-1, -1, u), s[1].set(1, -1, u), s[2].set(-1, 1, u), s[3].set(1, 1, u), s[4].set(-1, -1, v), s[5].set(1, -1, v), s[6].set(-1, 1, v), s[7].set(1, 1, v), x.originalCamera = m, s = new THREE.Gyroscope, s.position = p.shadowCascadeOffset, s.add(x), s.add(x.target), m.add(s), p.shadowCascadeArray[r] = x, console.log("Created virtualLight", x)
                        }
                        t = p, u = r, v = t.shadowCascadeArray[u], v.position.copy(t.position), v.target.position.copy(t.target.position), v.lookAt(v.target), v.shadowCameraVisible = t.shadowCameraVisible, v.shadowDarkness = t.shadowDarkness, v.shadowBias = t.shadowCascadeBias[u], s = t.shadowCascadeNearZ[u], t = t.shadowCascadeFarZ[u], v = v.pointsFrustum, v[0].z = s, v[1].z = s, v[2].z = s, v[3].z = s, v[4].z = t, v[5].z = t, v[6].z = t, v[7].z = t, w[q] = x, q++
                    } else w[q] = p, q++;
        for (n = 0, o = w.length; o > n; n++) {
            if (p = w[n], p.shadowMap || (r = THREE.LinearFilter, b.shadowMapType === THREE.PCFSoftShadowMap && (r = THREE.NearestFilter), p.shadowMap = new THREE.WebGLRenderTarget(p.shadowMapWidth, p.shadowMapHeight, {
                minFilter: r,
                magFilter: r,
                format: THREE.RGBAFormat
            }), p.shadowMapSize = new THREE.Vector2(p.shadowMapWidth, p.shadowMapHeight), p.shadowMatrix = new THREE.Matrix4), !p.shadowCamera) {
                if (p instanceof THREE.SpotLight) p.shadowCamera = new THREE.PerspectiveCamera(p.shadowCameraFov, p.shadowMapWidth / p.shadowMapHeight, p.shadowCameraNear, p.shadowCameraFar);
                else {
                    if (!(p instanceof THREE.DirectionalLight)) {
                        console.error("Unsupported light type for shadow");
                        continue
                    }
                    p.shadowCamera = new THREE.OrthographicCamera(p.shadowCameraLeft, p.shadowCameraRight, p.shadowCameraTop, p.shadowCameraBottom, p.shadowCameraNear, p.shadowCameraFar)
                }
                l.add(p.shadowCamera), !0 === l.autoUpdate && l.updateMatrixWorld()
            }
            if (p.shadowCameraVisible && !p.cameraHelper && (p.cameraHelper = new THREE.CameraHelper(p.shadowCamera), p.shadowCamera.add(p.cameraHelper)), p.isVirtual && x.originalCamera == m) {
                for (r = m, q = p.shadowCamera, s = p.pointsFrustum, v = p.pointsWorld, i.set(1 / 0, 1 / 0, 1 / 0), j.set(-1 / 0, -1 / 0, -1 / 0), t = 0; 8 > t; t++) u = v[t], u.copy(s[t]), THREE.ShadowMapPlugin.__projector.unprojectVector(u, r), u.applyMatrix4(q.matrixWorldInverse), u.x < i.x && (i.x = u.x), u.x > j.x && (j.x = u.x), u.y < i.y && (i.y = u.y), u.y > j.y && (j.y = u.y), u.z < i.z && (i.z = u.z), u.z > j.z && (j.z = u.z);
                q.left = i.x, q.right = j.x, q.top = j.y, q.bottom = i.y, q.updateProjectionMatrix()
            }
            for (q = p.shadowMap, s = p.shadowMatrix, r = p.shadowCamera, r.position.getPositionFromMatrix(p.matrixWorld), k.getPositionFromMatrix(p.target.matrixWorld), r.lookAt(k), r.updateMatrixWorld(), r.matrixWorldInverse.getInverse(r.matrixWorld), p.cameraHelper && (p.cameraHelper.visible = p.shadowCameraVisible), p.shadowCameraVisible && p.cameraHelper.update(), s.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), s.multiply(r.projectionMatrix), s.multiply(r.matrixWorldInverse), h.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse), g.setFromMatrix(h), b.setRenderTarget(q), b.clear(), v = l.__webglObjects, p = 0, q = v.length; q > p; p++) t = v[p], s = t.object, t.render = !1, !s.visible || !s.castShadow || (s instanceof THREE.Mesh || s instanceof THREE.ParticleSystem) && s.frustumCulled && !g.intersectsObject(s) || (s._modelViewMatrix.multiplyMatrices(r.matrixWorldInverse, s.matrixWorld), t.render = !0);
            for (p = 0, q = v.length; q > p; p++) t = v[p], t.render && (s = t.object, t = t.buffer, y = s.material instanceof THREE.MeshFaceMaterial ? s.material.materials[0] : s.material, u = 0 < s.geometry.morphTargets.length && y.morphTargets, y = s instanceof THREE.SkinnedMesh && y.skinning, u = s.customDepthMaterial ? s.customDepthMaterial : y ? u ? f : e : u ? d : c, t instanceof THREE.BufferGeometry ? b.renderBufferDirect(r, l.__lights, null, u, t, s) : b.renderBuffer(r, l.__lights, null, u, t, s));
            for (v = l.__webglObjectsImmediate, p = 0, q = v.length; q > p; p++) t = v[p], s = t.object, s.visible && s.castShadow && (s._modelViewMatrix.multiplyMatrices(r.matrixWorldInverse, s.matrixWorld), b.renderImmediateObject(r, l.__lights, null, c, s))
        }
        n = b.getClearColor(), o = b.getClearAlpha(), a.clearColor(n.r, n.g, n.b, o), a.enable(a.BLEND), b.shadowMapCullFace === THREE.CullFaceFront && a.cullFace(a.BACK)
    }
}, THREE.ShadowMapPlugin.__projector = new THREE.Projector, THREE.SpritePlugin = function () {
    function a(a, b) {
        return a.z !== b.z ? b.z - a.z : b.id - a.id
    }
    var b, c, d, e, f, g, h, i, j, k;
    this.init = function (a) {
        b = a.context, c = a, d = a.getPrecision(), e = new Float32Array(16), f = new Uint16Array(6), a = 0, e[a++] = -1, e[a++] = -1, e[a++] = 0, e[a++] = 0, e[a++] = 1, e[a++] = -1, e[a++] = 1, e[a++] = 0, e[a++] = 1, e[a++] = 1, e[a++] = 1, e[a++] = 1, e[a++] = -1, e[a++] = 1, e[a++] = 0, e[a++] = 1, a = 0, f[a++] = 0, f[a++] = 1, f[a++] = 2, f[a++] = 0, f[a++] = 2, f[a++] = 3, g = b.createBuffer(), h = b.createBuffer(), b.bindBuffer(b.ARRAY_BUFFER, g), b.bufferData(b.ARRAY_BUFFER, e, b.STATIC_DRAW), b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h), b.bufferData(b.ELEMENT_ARRAY_BUFFER, f, b.STATIC_DRAW);
        var a = THREE.ShaderSprite.sprite,
            l = b.createProgram(),
            m = b.createShader(b.FRAGMENT_SHADER),
            n = b.createShader(b.VERTEX_SHADER),
            o = "precision " + d + " float;\n";
        b.shaderSource(m, o + a.fragmentShader), b.shaderSource(n, o + a.vertexShader), b.compileShader(m), b.compileShader(n), b.attachShader(l, m), b.attachShader(l, n), b.linkProgram(l), i = l, j = {}, k = {}, j.position = b.getAttribLocation(i, "position"), j.uv = b.getAttribLocation(i, "uv"), k.uvOffset = b.getUniformLocation(i, "uvOffset"), k.uvScale = b.getUniformLocation(i, "uvScale"), k.rotation = b.getUniformLocation(i, "rotation"), k.scale = b.getUniformLocation(i, "scale"), k.alignment = b.getUniformLocation(i, "alignment"), k.color = b.getUniformLocation(i, "color"), k.map = b.getUniformLocation(i, "map"), k.opacity = b.getUniformLocation(i, "opacity"), k.useScreenCoordinates = b.getUniformLocation(i, "useScreenCoordinates"), k.sizeAttenuation = b.getUniformLocation(i, "sizeAttenuation"), k.screenPosition = b.getUniformLocation(i, "screenPosition"), k.modelViewMatrix = b.getUniformLocation(i, "modelViewMatrix"), k.projectionMatrix = b.getUniformLocation(i, "projectionMatrix"), k.fogType = b.getUniformLocation(i, "fogType"), k.fogDensity = b.getUniformLocation(i, "fogDensity"), k.fogNear = b.getUniformLocation(i, "fogNear"), k.fogFar = b.getUniformLocation(i, "fogFar"), k.fogColor = b.getUniformLocation(i, "fogColor"), k.alphaTest = b.getUniformLocation(i, "alphaTest")
    }, this.render = function (d, e, f, l) {
        var m = d.__webglSprites,
            n = m.length;
        if (n) {
            var o = j,
                p = k,
                q = l / f,
                f = .5 * f,
                r = .5 * l;
            b.useProgram(i), b.enableVertexAttribArray(o.position), b.enableVertexAttribArray(o.uv), b.disable(b.CULL_FACE), b.enable(b.BLEND), b.bindBuffer(b.ARRAY_BUFFER, g), b.vertexAttribPointer(o.position, 2, b.FLOAT, !1, 16, 0), b.vertexAttribPointer(o.uv, 2, b.FLOAT, !1, 16, 8), b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, h), b.uniformMatrix4fv(p.projectionMatrix, !1, e.projectionMatrix.elements), b.activeTexture(b.TEXTURE0), b.uniform1i(p.map, 0);
            var s = o = 0,
                t = d.fog;
            t ? (b.uniform3f(p.fogColor, t.color.r, t.color.g, t.color.b), t instanceof THREE.Fog ? (b.uniform1f(p.fogNear, t.near), b.uniform1f(p.fogFar, t.far), b.uniform1i(p.fogType, 1), s = o = 1) : t instanceof THREE.FogExp2 && (b.uniform1f(p.fogDensity, t.density), b.uniform1i(p.fogType, 2), s = o = 2)) : (b.uniform1i(p.fogType, 0), s = o = 0);
            for (var u, v, w = [], t = 0; n > t; t++) u = m[t], v = u.material, u.visible && 0 !== v.opacity && (v.useScreenCoordinates ? u.z = -u.position.z : (u._modelViewMatrix.multiplyMatrices(e.matrixWorldInverse, u.matrixWorld), u.z = -u._modelViewMatrix.elements[14]));
            for (m.sort(a), t = 0; n > t; t++) u = m[t], v = u.material, u.visible && 0 !== v.opacity && v.map && v.map.image && v.map.image.width && (b.uniform1f(p.alphaTest, v.alphaTest), !0 === v.useScreenCoordinates ? (b.uniform1i(p.useScreenCoordinates, 1), b.uniform3f(p.screenPosition, (u.position.x * c.devicePixelRatio - f) / f, (r - u.position.y * c.devicePixelRatio) / r, Math.max(0, Math.min(1, u.position.z))), w[0] = c.devicePixelRatio, w[1] = c.devicePixelRatio) : (b.uniform1i(p.useScreenCoordinates, 0), b.uniform1i(p.sizeAttenuation, v.sizeAttenuation ? 1 : 0), b.uniformMatrix4fv(p.modelViewMatrix, !1, u._modelViewMatrix.elements), w[0] = 1, w[1] = 1), e = d.fog && v.fog ? s : 0, o !== e && (b.uniform1i(p.fogType, e), o = e), e = 1 / (v.scaleByViewport ? l : 1), w[0] *= e * q * u.scale.x, w[1] *= e * u.scale.y, b.uniform2f(p.uvScale, v.uvScale.x, v.uvScale.y), b.uniform2f(p.uvOffset, v.uvOffset.x, v.uvOffset.y), b.uniform2f(p.alignment, v.alignment.x, v.alignment.y), b.uniform1f(p.opacity, v.opacity), b.uniform3f(p.color, v.color.r, v.color.g, v.color.b), b.uniform1f(p.rotation, u.rotation), b.uniform2fv(p.scale, w), c.setBlending(v.blending, v.blendEquation, v.blendSrc, v.blendDst), c.setDepthTest(v.depthTest), c.setDepthWrite(v.depthWrite), c.setTexture(v.map, 0), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
            b.enable(b.CULL_FACE)
        }
    }
}, THREE.DepthPassPlugin = function () {
    this.enabled = !1, this.renderTarget = null;
    var a, b, c, d, e, f, g = new THREE.Frustum,
        h = new THREE.Matrix4;
    this.init = function (g) {
        a = g.context, b = g;
        var g = THREE.ShaderLib.depthRGBA,
            h = THREE.UniformsUtils.clone(g.uniforms);
        c = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h
        }), d = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            morphTargets: !0
        }), e = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            skinning: !0
        }), f = new THREE.ShaderMaterial({
            fragmentShader: g.fragmentShader,
            vertexShader: g.vertexShader,
            uniforms: h,
            morphTargets: !0,
            skinning: !0
        }), c._shadowPass = !0, d._shadowPass = !0, e._shadowPass = !0, f._shadowPass = !0
    }, this.render = function (a, b) {
        this.enabled && this.update(a, b)
    }, this.update = function (i, j) {
        var k, l, m, n, o, p;
        for (a.clearColor(1, 1, 1, 1), a.disable(a.BLEND), b.setDepthTest(!0), !0 === i.autoUpdate && i.updateMatrixWorld(), j.matrixWorldInverse.getInverse(j.matrixWorld), h.multiplyMatrices(j.projectionMatrix, j.matrixWorldInverse), g.setFromMatrix(h), b.setRenderTarget(this.renderTarget), b.clear(), p = i.__webglObjects, k = 0, l = p.length; l > k; k++) m = p[k], o = m.object, m.render = !1, !o.visible || (o instanceof THREE.Mesh || o instanceof THREE.ParticleSystem) && o.frustumCulled && !g.intersectsObject(o) || (o._modelViewMatrix.multiplyMatrices(j.matrixWorldInverse, o.matrixWorld), m.render = !0);
        var q;
        for (k = 0, l = p.length; l > k; k++) m = p[k], !m.render || (o = m.object, m = m.buffer, o instanceof THREE.ParticleSystem && !o.customDepthMaterial) || ((q = o.material instanceof THREE.MeshFaceMaterial ? o.material.materials[0] : o.material) && b.setMaterialFaces(o.material), n = 0 < o.geometry.morphTargets.length && q.morphTargets, q = o instanceof THREE.SkinnedMesh && q.skinning, n = o.customDepthMaterial ? o.customDepthMaterial : q ? n ? f : e : n ? d : c, m instanceof THREE.BufferGeometry ? b.renderBufferDirect(j, i.__lights, null, n, m, o) : b.renderBuffer(j, i.__lights, null, n, m, o));
        for (p = i.__webglObjectsImmediate, k = 0, l = p.length; l > k; k++) m = p[k], o = m.object, o.visible && (o._modelViewMatrix.multiplyMatrices(j.matrixWorldInverse, o.matrixWorld), b.renderImmediateObject(j, i.__lights, null, c, o));
        k = b.getClearColor(), l = b.getClearAlpha(), a.clearColor(k.r, k.g, k.b, l), a.enable(a.BLEND)
    }
}, THREE.ShaderFlares = {
    lensFlareVertexTexture: {
        vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nuniform sampler2D occlusionMap;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\nvec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +\ntexture2D( occlusionMap, vec2( 0.5, 0.5 ) );\nvVisibility = (       visibility.r / 9.0 ) *\n( 1.0 - visibility.g / 9.0 ) *\n(       visibility.b / 9.0 ) *\n( 1.0 - visibility.a / 9.0 );\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "uniform lowp int renderType;\nuniform sampler2D map;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvarying float vVisibility;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * vVisibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    },
    lensFlare: {
        vertexShader: "uniform lowp int renderType;\nuniform vec3 screenPosition;\nuniform vec2 scale;\nuniform float rotation;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uv;\nvec2 pos = position;\nif( renderType == 2 ) {\npos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;\npos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;\n}\ngl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );\n}",
        fragmentShader: "precision mediump float;\nuniform lowp int renderType;\nuniform sampler2D map;\nuniform sampler2D occlusionMap;\nuniform float opacity;\nuniform vec3 color;\nvarying vec2 vUV;\nvoid main() {\nif( renderType == 0 ) {\ngl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );\n} else if( renderType == 1 ) {\ngl_FragColor = texture2D( map, vUV );\n} else {\nfloat visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +\ntexture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +\ntexture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +\ntexture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;\nvisibility = ( 1.0 - visibility / 4.0 );\nvec4 texture = texture2D( map, vUV );\ntexture.a *= opacity * visibility;\ngl_FragColor = texture;\ngl_FragColor.rgb *= color;\n}\n}"
    }
}, THREE.ShaderSprite = {
    sprite: {
        vertexShader: "uniform int useScreenCoordinates;\nuniform int sizeAttenuation;\nuniform vec3 screenPosition;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform float rotation;\nuniform vec2 scale;\nuniform vec2 alignment;\nuniform vec2 uvOffset;\nuniform vec2 uvScale;\nattribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUV;\nvoid main() {\nvUV = uvOffset + uv * uvScale;\nvec2 alignedPosition = position + alignment;\nvec2 rotatedPosition;\nrotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;\nrotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;\nvec4 finalPosition;\nif( useScreenCoordinates != 0 ) {\nfinalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );\n} else {\nfinalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\nfinalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );\n}\ngl_Position = finalPosition;\n}",
        fragmentShader: "uniform vec3 color;\nuniform sampler2D map;\nuniform float opacity;\nuniform int fogType;\nuniform vec3 fogColor;\nuniform float fogDensity;\nuniform float fogNear;\nuniform float fogFar;\nuniform float alphaTest;\nvarying vec2 vUV;\nvoid main() {\nvec4 texture = texture2D( map, vUV );\nif ( texture.a < alphaTest ) discard;\ngl_FragColor = vec4( color * texture.xyz, texture.a * opacity );\nif ( fogType > 0 ) {\nfloat depth = gl_FragCoord.z / gl_FragCoord.w;\nfloat fogFactor = 0.0;\nif ( fogType == 1 ) {\nfogFactor = smoothstep( fogNear, fogFar, depth );\n} else {\nconst float LOG2 = 1.442695;\nfloat fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );\nfogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );\n}\ngl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );\n}\n}"
    }
};
var mapdive = window.mapdive ? window.mapdive : {},
    viewportMetrics = {
        width: 1575,
        height: 400,
        FOV: 22,
        viewAngleOffset: 12.3,
        viewIndex: 0
    };
mapdive.trackEvent = function (a, b, c, d) {
    _gaq.push(["_trackEvent", a, b, c, d])
}, THREE.OBJLoader = function () {}, THREE.OBJLoader.prototype = {
    constructor: THREE.OBJLoader,
    addEventListener: THREE.EventDispatcher.prototype.addEventListener,
    hasEventListener: THREE.EventDispatcher.prototype.hasEventListener,
    removeEventListener: THREE.EventDispatcher.prototype.removeEventListener,
    dispatchEvent: THREE.EventDispatcher.prototype.dispatchEvent,
    load: function (a, b) {
        var c = this,
            d = new XMLHttpRequest;
        d.addEventListener("load", function (a) {
            var d = c.parse(a.target.responseText);
            c.dispatchEvent({
                type: "load",
                content: d
            }), b && b(d)
        }, !1), d.addEventListener("progress", function (a) {
            c.dispatchEvent({
                type: "progress",
                loaded: a.loaded,
                total: a.total
            })
        }, !1), d.addEventListener("error", function () {
            c.dispatchEvent({
                type: "error",
                message: "Couldn't load URL [" + a + "]"
            })
        }, !1), d.open("GET", a, !0), d.send(null)
    },
    parse: function (a) {
        function b(a, b, c) {
            return new THREE.Vector3(a, b, c)
        }

        function c(a, b) {
            return new THREE.Vector2(a, b)
        }

        function d(a, b, c, d) {
            return new THREE.Face3(a, b, c, d)
        }

        function e(a, b, c, d, e) {
            return new THREE.Face4(a, b, c, d, e)
        }

        function f(a, b) {
            i.vertices.length > 0 && (i.mergeVertices(), i.computeCentroids(), i.computeFaceNormals(), i.computeBoundingSphere(), h.add(k), i = new THREE.Geometry, k = new THREE.Mesh(i, j), m = 0), void 0 !== a && (k.name = a), void 0 !== b && (j = new THREE.MeshLambertMaterial, j.name = b, k.material = j)
        }
        a = a.replace(/\ \\\r\n/g, "");
        for (var g = new THREE.Object3D, h = g, i = new THREE.Geometry, j = new THREE.MeshLambertMaterial, k = new THREE.Mesh(i, j), l = [], m = 0, n = [], o = [], p = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, q = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, r = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, s = /f( +\d+)( +\d+)( +\d+)( +\d+)?/, t = /f( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))( +(\d+)\/(\d+))?/, u = /f( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))( +(\d+)\/(\d+)\/(\d+))?/, v = /f( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))( +(\d+)\/\/(\d+))?/, w = a.split("\n"), x = 0; x < w.length; x++) {
            var y = w[x];
            y = y.trim();
            var z;
            0 !== y.length && "#" !== y.charAt(0) && (null !== (z = p.exec(y)) ? l.push(b(parseFloat(z[1]), parseFloat(z[2]), parseFloat(z[3]))) : null !== (z = q.exec(y)) ? n.push(b(parseFloat(z[1]), parseFloat(z[2]), parseFloat(z[3]))) : null !== (z = r.exec(y)) ? o.push(c(parseFloat(z[1]), parseFloat(z[2]))) : null !== (z = s.exec(y)) ? void 0 === z[4] ? (i.vertices.push(l[parseInt(z[1]) - 1], l[parseInt(z[2]) - 1], l[parseInt(z[3]) - 1]), i.faces.push(d(m++, m++, m++))) : (i.vertices.push(l[parseInt(z[1]) - 1], l[parseInt(z[2]) - 1], l[parseInt(z[3]) - 1], l[parseInt(z[4]) - 1]), i.faces.push(e(m++, m++, m++, m++))) : null !== (z = t.exec(y)) ? void 0 === z[10] ? (i.vertices.push(l[parseInt(z[2]) - 1], l[parseInt(z[5]) - 1], l[parseInt(z[8]) - 1]), i.faces.push(d(m++, m++, m++)), i.faceVertexUvs[0].push([o[parseInt(z[3]) - 1], o[parseInt(z[6]) - 1], o[parseInt(z[9]) - 1]])) : (i.vertices.push(l[parseInt(z[2]) - 1], l[parseInt(z[5]) - 1], l[parseInt(z[8]) - 1], l[parseInt(z[11]) - 1]), i.faces.push(e(m++, m++, m++, m++)), i.faceVertexUvs[0].push([o[parseInt(z[3]) - 1], o[parseInt(z[6]) - 1], o[parseInt(z[9]) - 1], o[parseInt(z[12]) - 1]])) : null !== (z = u.exec(y)) ? void 0 === z[13] ? (i.vertices.push(l[parseInt(z[2]) - 1], l[parseInt(z[6]) - 1], l[parseInt(z[10]) - 1]), i.faces.push(d(m++, m++, m++, [n[parseInt(z[4]) - 1], n[parseInt(z[8]) - 1], n[parseInt(z[12]) - 1]])), i.faceVertexUvs[0].push([o[parseInt(z[3]) - 1], o[parseInt(z[7]) - 1], o[parseInt(z[11]) - 1]])) : (i.vertices.push(l[parseInt(z[2]) - 1], l[parseInt(z[6]) - 1], l[parseInt(z[10]) - 1], l[parseInt(z[14]) - 1]), i.faces.push(e(m++, m++, m++, m++, [n[parseInt(z[4]) - 1], n[parseInt(z[8]) - 1], n[parseInt(z[12]) - 1], n[parseInt(z[16]) - 1]])), i.faceVertexUvs[0].push([o[parseInt(z[3]) - 1], o[parseInt(z[7]) - 1], o[parseInt(z[11]) - 1], o[parseInt(z[15]) - 1]])) : null !== (z = v.exec(y)) ? void 0 === z[10] ? (i.vertices.push(l[parseInt(z[2]) - 1], l[parseInt(z[5]) - 1], l[parseInt(z[8]) - 1]), i.faces.push(d(m++, m++, m++, [n[parseInt(z[3]) - 1], n[parseInt(z[6]) - 1], n[parseInt(z[9]) - 1]]))) : (i.vertices.push(l[parseInt(z[2]) - 1], l[parseInt(z[5]) - 1], l[parseInt(z[8]) - 1], l[parseInt(z[11]) - 1]), i.faces.push(e(m++, m++, m++, m++, [n[parseInt(z[3]) - 1], n[parseInt(z[6]) - 1], n[parseInt(z[9]) - 1], n[parseInt(z[12]) - 1]]))) : /^o /.test(y) ? (h = new THREE.Object3D, h.name = y.substring(2).trim(), g.add(h)) : /^g /.test(y) ? f(y.substring(2).trim(), void 0) : /^usemtl /.test(y) ? f(void 0, y.substring(7).trim()) : /^mtllib /.test(y) || /^s /.test(y))
        }
        return f(void 0, void 0), g
    }
}, THREE.CSS3DObject = function (a) {
    THREE.Object3D.call(this), this.element = a, this.element.style.position = "absolute", this.element.style.WebkitTransformStyle = "preserve-3d", this.element.style.MozTransformStyle = "preserve-3d", this.element.style.oTransformStyle = "preserve-3d", this.element.style.transformStyle = "preserve-3d"
}, THREE.CSS3DObject.prototype = Object.create(THREE.Object3D.prototype), THREE.CSS3DSprite = function (a) {
    THREE.CSS3DObject.call(this, a)
}, THREE.CSS3DSprite.prototype = Object.create(THREE.CSS3DObject.prototype), THREE.CSS3DRenderer = function () {
    var a, b, c, d, e = new THREE.Projector,
        f = new THREE.Matrix4;
    this.domElement = document.createElement("div"), this.domElement.style.overflow = "hidden", this.domElement.style.WebkitTransformStyle = "preserve-3d", this.domElement.style.WebkitPerspectiveOrigin = "50% 50%", this.domElement.style.MozTransformStyle = "preserve-3d", this.domElement.style.MozPerspectiveOrigin = "50% 50%", this.domElement.style.oTransformStyle = "preserve-3d", this.domElement.style.oPerspectiveOrigin = "50% 50%", this.domElement.style.transformStyle = "preserve-3d", this.domElement.style.perspectiveOrigin = "50% 50%", this.cameraElement = document.createElement("div"), this.cameraElement.style.WebkitTransformStyle = "preserve-3d", this.cameraElement.style.MozTransformStyle = "preserve-3d", this.cameraElement.style.oTransformStyle = "preserve-3d", this.cameraElement.style.transformStyle = "preserve-3d", this.domElement.appendChild(this.cameraElement), this.setSize = function (e, f) {
        a = e, b = f, c = a / 2, d = b / 2, this.domElement.style.width = e + "px", this.domElement.style.height = f + "px", this.cameraElement.style.width = e + "px", this.cameraElement.style.height = f + "px"
    };
    var g = function (a) {
            return Math.abs(a) < 1e-6 ? 0 : a
        },
        h = function (a) {
            var b = a.elements;
            return "matrix3d(" + g(b[0]) + "," + g(-b[1]) + "," + g(b[2]) + "," + g(b[3]) + "," + g(b[4]) + "," + g(-b[5]) + "," + g(b[6]) + "," + g(b[7]) + "," + g(b[8]) + "," + g(-b[9]) + "," + g(b[10]) + "," + g(b[11]) + "," + g(b[12]) + "," + g(-b[13]) + "," + g(b[14]) + "," + g(b[15]) + ")"
        },
        i = function (a) {
            var b = a.elements;
            return "translate3d(-50%,-50%,0) matrix3d(" + g(b[0]) + "," + g(b[1]) + "," + g(b[2]) + "," + g(b[3]) + "," + g(b[4]) + "," + g(b[5]) + "," + g(b[6]) + "," + g(b[7]) + "," + g(b[8]) + "," + g(b[9]) + "," + g(b[10]) + "," + g(b[11]) + "," + g(b[12]) + "," + g(b[13]) + "," + g(b[14]) + "," + g(b[15]) + ") scale3d(1,-1,1)"
        };
    this.setFOV = function (a) {
        var a = .5 / Math.tan(a * Math.PI / 360) * b;
        this.domElement.style.WebkitPerspective = a + "px"
    }, this.render = function (a, g) {
        var j = .5 / Math.tan(g.fov * Math.PI / 360) * b,
            k = "translate3d(0,0," + j + "px)" + h(g.matrixWorldInverse) + " translate3d(" + c + "px," + d + "px, 0)";
        this.cameraElement.style.WebkitTransform = k, this.cameraElement.style.MozTransform = k, this.cameraElement.style.oTransform = k, this.cameraElement.style.transform = k;
        for (var l = e.projectScene(a, g, !1).objects, m = 0, n = l.length; n > m; m++) {
            var o = l[m].object;
            if (o instanceof THREE.CSS3DObject) {
                var p = o.element;
                o instanceof THREE.CSS3DSprite ? (f.copy(g.matrixWorldInverse), f.transpose(), f.extractPosition(o.matrixWorld), f.elements[3] = 0, f.elements[7] = 0, f.elements[11] = 0, f.elements[15] = 1, k = i(f)) : k = i(o.matrixWorld), p.style.WebkitTransform = k, p.style.MozTransform = k, p.style.oTransform = k, p.style.transform = k, p.parentNode !== this.cameraElement && this.cameraElement.appendChild(p)
            }
        }
    }
}, window.Easing = {
    easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
        return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (2 == (b /= e / 2)) return c + d;
        if (g || (g = e * .3 * 1.5), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : .5 * h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    },
    easeInBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
    },
    easeOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
    },
    easeInOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
    },
    easeInBounce: function (a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
    },
    easeOutBounce: function (a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    },
    easeInOutBounce: function (a, b, c, d, e) {
        return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
    }
},
function (a, b) {
    function c(a) {
        var b = a.length,
            c = kb.type(a);
        return kb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || "function" !== c && (0 === b || "number" == typeof b && b > 0 && b - 1 in a)
    }

    function d(a) {
        var b = zb[a] = {};
        return kb.each(a.match(mb) || [], function (a, c) {
            b[c] = !0
        }), b
    }

    function e(a, c, d, e) {
        if (kb.acceptData(a)) {
            var f, g, h = kb.expando,
                i = a.nodeType,
                j = i ? kb.cache : a,
                k = i ? a[h] : a[h] && h;
            if (k && j[k] && (e || j[k].data) || d !== b || "string" != typeof c) return k || (k = i ? a[h] = bb.pop() || kb.guid++ : h), j[k] || (j[k] = i ? {} : {
                toJSON: kb.noop
            }), ("object" == typeof c || "function" == typeof c) && (e ? j[k] = kb.extend(j[k], c) : j[k].data = kb.extend(j[k].data, c)), g = j[k], e || (g.data || (g.data = {}), g = g.data), d !== b && (g[kb.camelCase(c)] = d), "string" == typeof c ? (f = g[c], null == f && (f = g[kb.camelCase(c)])) : f = g, f
        }
    }

    function f(a, b, c) {
        if (kb.acceptData(a)) {
            var d, e, f = a.nodeType,
                g = f ? kb.cache : a,
                i = f ? a[kb.expando] : kb.expando;
            if (g[i]) {
                if (b && (d = c ? g[i] : g[i].data)) {
                    kb.isArray(b) ? b = b.concat(kb.map(b, kb.camelCase)) : b in d ? b = [b] : (b = kb.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    for (; e--;) delete d[b[e]];
                    if (c ? !h(d) : !kb.isEmptyObject(d)) return
                }(c || (delete g[i].data, h(g[i]))) && (f ? kb.cleanData([a], !0) : kb.support.deleteExpando || g != g.window ? delete g[i] : g[i] = null)
            }
        }
    }

    function g(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(Bb, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : Ab.test(d) ? kb.parseJSON(d) : d
                } catch (f) {}
                kb.data(a, c, d)
            } else d = b
        }
        return d
    }

    function h(a) {
        var b;
        for (b in a)
            if (("data" !== b || !kb.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function i() {
        return !0
    }

    function j() {
        return !1
    }

    function k() {
        try {
            return Y.activeElement
        } catch (a) {}
    }

    function l(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function m(a, b, c) {
        if (kb.isFunction(b)) return kb.grep(a, function (a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return kb.grep(a, function (a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (Qb.test(b)) return kb.filter(b, a, c);
            b = kb.filter(b, a)
        }
        return kb.grep(a, function (a) {
            return kb.inArray(a, b) >= 0 !== c
        })
    }

    function n(a) {
        var b = Ub.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            for (; b.length;) c.createElement(b.pop());
        return c
    }

    function o(a, b) {
        return kb.nodeName(a, "table") && kb.nodeName(1 === b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function p(a) {
        return a.type = (null !== kb.find.attr(a, "type")) + "/" + a.type, a
    }

    function q(a) {
        var b = ec.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function r(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) kb._data(c, "globalEval", !b || kb._data(b[d], "globalEval"))
    }

    function s(a, b) {
        if (1 === b.nodeType && kb.hasData(a)) {
            var c, d, e, f = kb._data(a),
                g = kb._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++) kb.event.add(b, c, h[c][d])
            }
            g.data && (g.data = kb.extend({}, g.data))
        }
    }

    function t(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !kb.support.noCloneEvent && b[kb.expando]) {
                e = kb._data(b);
                for (d in e.events) kb.removeEvent(b, d, e.handle);
                b.removeAttribute(kb.expando)
            }
            "script" === c && b.text !== a.text ? (p(b).text = a.text, q(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), kb.support.html5Clone && a.innerHTML && !kb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && bc.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }

    function u(a, c) {
        var d, e, f = 0,
            g = typeof a.getElementsByTagName !== W ? a.getElementsByTagName(c || "*") : typeof a.querySelectorAll !== W ? a.querySelectorAll(c || "*") : b;
        if (!g)
            for (g = [], d = a.childNodes || a; null != (e = d[f]); f++)!c || kb.nodeName(e, c) ? g.push(e) : kb.merge(g, u(e, c));
        return c === b || c && kb.nodeName(a, c) ? kb.merge([a], g) : g
    }

    function v(a) {
        bc.test(a.type) && (a.defaultChecked = a.checked)
    }

    function w(a, b) {
        if (b in a) return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = yc.length; e--;)
            if (b = yc[e] + c, b in a) return b;
        return d
    }

    function x(a, b) {
        return a = b || a, "none" === kb.css(a, "display") || !kb.contains(a.ownerDocument, a)
    }

    function y(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = kb._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && x(d) && (f[g] = kb._data(d, "olddisplay", C(d.nodeName)))) : f[g] || (e = x(d), (c && "none" !== c || !e) && kb._data(d, "olddisplay", e ? c : kb.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function z(a, b, c) {
        var d = rc.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function A(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += kb.css(a, c + xc[f], !0, e)), d ? ("content" === c && (g -= kb.css(a, "padding" + xc[f], !0, e)), "margin" !== c && (g -= kb.css(a, "border" + xc[f] + "Width", !0, e))) : (g += kb.css(a, "padding" + xc[f], !0, e), "padding" !== c && (g += kb.css(a, "border" + xc[f] + "Width", !0, e)));
        return g
    }

    function B(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = kc(a),
            g = kb.support.boxSizing && "border-box" === kb.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = lc(a, b, f), (0 > e || null == e) && (e = a.style[b]), sc.test(e)) return e;
            d = g && (kb.support.boxSizingReliable || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + A(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function C(a) {
        var b = Y,
            c = uc[a];
        return c || (c = D(a, b), "none" !== c && c || (jc = (jc || kb("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(b.documentElement), b = (jc[0].contentWindow || jc[0].contentDocument).document, b.write("<!doctype html><html><body>"), b.close(), c = D(a, b), jc.detach()), uc[a] = c), c
    }

    function D(a, b) {
        var c = kb(b.createElement(a)).appendTo(b.body),
            d = kb.css(c[0], "display");
        return c.remove(), d
    }

    function E(a, b, c, d) {
        var e;
        if (kb.isArray(b)) kb.each(b, function (b, e) {
            c || Ac.test(a) ? d(a, e) : E(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== kb.type(b)) d(a, b);
        else
            for (e in b) E(a + "[" + e + "]", b[e], c, d)
    }

    function F(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(mb) || [];
            if (kb.isFunction(c))
                for (; d = f[e++];) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function G(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, kb.each(a[h] || [], function (a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
            }), i
        }
        var f = {},
            g = a === Rc;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function H(a, c) {
        var d, e, f = kb.ajaxSettings.flatOptions || {};
        for (e in c) c[e] !== b && ((f[e] ? a : d || (d = {}))[e] = c[e]);
        return d && kb.extend(!0, a, d), a
    }

    function I(a, c, d) {
        for (var e, f, g, h, i = a.contents, j = a.dataTypes;
            "*" === j[0];) j.shift(), f === b && (f = a.mimeType || c.getResponseHeader("Content-Type"));
        if (f)
            for (h in i)
                if (i[h] && i[h].test(f)) {
                    j.unshift(h);
                    break
                }
        if (j[0] in d) g = j[0];
        else {
            for (h in d) {
                if (!j[0] || a.converters[h + " " + j[0]]) {
                    g = h;
                    break
                }
                e || (e = h)
            }
            g = g || e
        }
        return g ? (g !== j[0] && j.unshift(g), d[g]) : void 0
    }

    function J(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }

    function K() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function L() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function M() {
        return setTimeout(function () {
            $c = b
        }), $c = kb.now()
    }

    function N(a, b, c) {
        for (var d, e = (ed[b] || []).concat(ed["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function O(a, b, c) {
        var d, e, f = 0,
            g = dd.length,
            h = kb.Deferred().always(function () {
                delete i.elem
            }),
            i = function () {
                if (e) return !1;
                for (var b = $c || M(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: kb.extend({}, b),
                opts: kb.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: $c || M(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = kb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function (b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (P(k, j.opts.specialEasing); g > f; f++)
            if (d = dd[f].call(j, a, k, j.opts)) return d;
        return kb.map(k, N, j), kb.isFunction(j.opts.start) && j.opts.start.call(a, j), kb.fx.timer(kb.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function P(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = kb.camelCase(c), e = b[d], f = a[c], kb.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = kb.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function Q(a, b, c) {
        var d, e, f, g, h, i, j = this,
            k = {},
            l = a.style,
            m = a.nodeType && x(a),
            n = kb._data(a, "fxshow");
        c.queue || (h = kb._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function () {
            h.unqueued || i()
        }), h.unqueued++, j.always(function () {
            j.always(function () {
                h.unqueued--, kb.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [l.overflow, l.overflowX, l.overflowY], "inline" === kb.css(a, "display") && "none" === kb.css(a, "float") && (kb.support.inlineBlockNeedsLayout && "inline" !== C(a.nodeName) ? l.zoom = 1 : l.display = "inline-block")), c.overflow && (l.overflow = "hidden", kb.support.shrinkWrapBlocks || j.always(function () {
            l.overflow = c.overflow[0], l.overflowX = c.overflow[1], l.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], ad.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (m ? "hide" : "show")) continue;
                k[d] = n && n[d] || kb.style(a, d)
            }
        if (!kb.isEmptyObject(k)) {
            n ? "hidden" in n && (m = n.hidden) : n = kb._data(a, "fxshow", {}), f && (n.hidden = !m), m ? kb(a).show() : j.done(function () {
                kb(a).hide()
            }), j.done(function () {
                var b;
                kb._removeData(a, "fxshow");
                for (b in k) kb.style(a, b, k[b])
            });
            for (d in k) g = N(m ? n[d] : 0, d, j), d in n || (n[d] = g.start, m && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function R(a, b, c, d, e) {
        return new R.prototype.init(a, b, c, d, e)
    }

    function S(a, b) {
        var c, d = {
                height: a
            },
            e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = xc[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function T(a) {
        return kb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var U, V, W = typeof b,
        X = a.location,
        Y = a.document,
        Z = Y.documentElement,
        $ = a.jQuery,
        _ = a.$,
        ab = {},
        bb = [],
        cb = "1.10.0",
        db = bb.concat,
        eb = bb.push,
        fb = bb.slice,
        gb = bb.indexOf,
        hb = ab.toString,
        ib = ab.hasOwnProperty,
        jb = cb.trim,
        kb = function (a, b) {
            return new kb.fn.init(a, b, V)
        },
        lb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        mb = /\S+/g,
        nb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        ob = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        pb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        qb = /^[\],:{}\s]*$/,
        rb = /(?:^|:|,)(?:\s*\[)+/g,
        sb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        tb = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
        ub = /^-ms-/,
        vb = /-([\da-z])/gi,
        wb = function (a, b) {
            return b.toUpperCase()
        },
        xb = function (a) {
            (Y.addEventListener || "load" === a.type || "complete" === Y.readyState) && (yb(), kb.ready())
        },
        yb = function () {
            Y.addEventListener ? (Y.removeEventListener("DOMContentLoaded", xb, !1), a.removeEventListener("load", xb, !1)) : (Y.detachEvent("onreadystatechange", xb), a.detachEvent("onload", xb))
        };
    kb.fn = kb.prototype = {
        jquery: cb,
        constructor: kb,
        init: function (a, c, d) {
            var e, f;
            if (!a) return this;
            if ("string" == typeof a) {
                if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : ob.exec(a), !e || !e[1] && c) return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a);
                if (e[1]) {
                    if (c = c instanceof kb ? c[0] : c, kb.merge(this, kb.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : Y, !0)), pb.test(e[1]) && kb.isPlainObject(c))
                        for (e in c) kb.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
                    return this
                }
                if (f = Y.getElementById(e[2]), f && f.parentNode) {
                    if (f.id !== e[2]) return d.find(a);
                    this.length = 1, this[0] = f
                }
                return this.context = Y, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : kb.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), kb.makeArray(a, this))
        },
        selector: "",
        length: 0,
        toArray: function () {
            return fb.call(this)
        },
        get: function (a) {
            return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
        },
        pushStack: function (a) {
            var b = kb.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function (a, b) {
            return kb.each(this, a, b)
        },
        ready: function (a) {
            return kb.ready.promise().done(a), this
        },
        slice: function () {
            return this.pushStack(fb.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        map: function (a) {
            return this.pushStack(kb.map(this, function (b, c) {
                return a.call(b, c, b)
            }))
        },
        end: function () {
            return this.prevObject || this.constructor(null)
        },
        push: eb,
        sort: [].sort,
        splice: [].splice
    }, kb.fn.init.prototype = kb.fn, kb.extend = kb.fn.extend = function () {
        var a, c, d, e, f, g, h = arguments[0] || {},
            i = 1,
            j = arguments.length,
            k = !1;
        for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" == typeof h || kb.isFunction(h) || (h = {}), j === i && (h = this, --i); j > i; i++)
            if (null != (f = arguments[i]))
                for (e in f) a = h[e], d = f[e], h !== d && (k && d && (kb.isPlainObject(d) || (c = kb.isArray(d))) ? (c ? (c = !1, g = a && kb.isArray(a) ? a : []) : g = a && kb.isPlainObject(a) ? a : {}, h[e] = kb.extend(k, g, d)) : d !== b && (h[e] = d));
        return h
    }, kb.extend({
        expando: "jQuery" + (cb + Math.random()).replace(/\D/g, ""),
        noConflict: function (b) {
            return a.$ === kb && (a.$ = _), b && a.jQuery === kb && (a.jQuery = $), kb
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function (a) {
            a ? kb.readyWait++ : kb.ready(!0)
        },
        ready: function (a) {
            if (a === !0 ? !--kb.readyWait : !kb.isReady) {
                if (!Y.body) return setTimeout(kb.ready);
                kb.isReady = !0, a !== !0 && --kb.readyWait > 0 || (U.resolveWith(Y, [kb]), kb.fn.trigger && kb(Y).trigger("ready").off("ready"))
            }
        },
        isFunction: function (a) {
            return "function" === kb.type(a)
        },
        isArray: Array.isArray || function (a) {
            return "array" === kb.type(a)
        },
        isWindow: function (a) {
            return null != a && a == a.window
        },
        isNumeric: function (a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        },
        type: function (a) {
            return null == a ? String(a) : "object" == typeof a || "function" == typeof a ? ab[hb.call(a)] || "object" : typeof a
        },
        isPlainObject: function (a) {
            var c;
            if (!a || "object" !== kb.type(a) || a.nodeType || kb.isWindow(a)) return !1;
            try {
                if (a.constructor && !ib.call(a, "constructor") && !ib.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (d) {
                return !1
            }
            if (kb.support.ownLast)
                for (c in a) return ib.call(a, c);
            for (c in a);
            return c === b || ib.call(a, c)
        },
        isEmptyObject: function (a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        error: function (a) {
            throw new Error(a)
        },
        parseHTML: function (a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && (c = b, b = !1), b = b || Y;
            var d = pb.exec(a),
                e = !c && [];
            return d ? [b.createElement(d[1])] : (d = kb.buildFragment([a], b, e), e && kb(e).remove(), kb.merge([], d.childNodes))
        },
        parseJSON: function (b) {
            return a.JSON && a.JSON.parse ? a.JSON.parse(b) : null === b ? b : "string" == typeof b && (b = kb.trim(b), b && qb.test(b.replace(sb, "@").replace(tb, "]").replace(rb, ""))) ? new Function("return " + b)() : (kb.error("Invalid JSON: " + b), void 0)
        },
        parseXML: function (c) {
            var d, e;
            if (!c || "string" != typeof c) return null;
            try {
                a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
            } catch (f) {
                d = b
            }
            return d && d.documentElement && !d.getElementsByTagName("parsererror").length || kb.error("Invalid XML: " + c), d
        },
        noop: function () {},
        globalEval: function (b) {
            b && kb.trim(b) && (a.execScript || function (b) {
                a.eval.call(a, b)
            })(b)
        },
        camelCase: function (a) {
            return a.replace(ub, "ms-").replace(vb, wb)
        },
        nodeName: function (a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function (a, b, d) {
            var e, f = 0,
                g = a.length,
                h = c(a);
            if (d) {
                if (h)
                    for (; g > f && (e = b.apply(a[f], d), e !== !1); f++);
                else
                    for (f in a)
                        if (e = b.apply(a[f], d), e === !1) break
            } else if (h)
                for (; g > f && (e = b.call(a[f], f, a[f]), e !== !1); f++);
            else
                for (f in a)
                    if (e = b.call(a[f], f, a[f]), e === !1) break; return a
        },
        trim: jb && !jb.call("﻿ ") ? function (a) {
            return null == a ? "" : jb.call(a)
        } : function (a) {
            return null == a ? "" : (a + "").replace(nb, "")
        },
        makeArray: function (a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? kb.merge(d, "string" == typeof a ? [a] : a) : eb.call(d, a)), d
        },
        inArray: function (a, b, c) {
            var d;
            if (b) {
                if (gb) return gb.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a) return c
            }
            return -1
        },
        merge: function (a, c) {
            var d = c.length,
                e = a.length,
                f = 0;
            if ("number" == typeof d)
                for (; d > f; f++) a[e++] = c[f];
            else
                for (; c[f] !== b;) a[e++] = c[f++];
            return a.length = e, a
        },
        grep: function (a, b, c) {
            var d, e = [],
                f = 0,
                g = a.length;
            for (c = !!c; g > f; f++) d = !!b(a[f], f), c !== d && e.push(a[f]);
            return e
        },
        map: function (a, b, d) {
            var e, f = 0,
                g = a.length,
                h = c(a),
                i = [];
            if (h)
                for (; g > f; f++) e = b(a[f], f, d), null != e && (i[i.length] = e);
            else
                for (f in a) e = b(a[f], f, d), null != e && (i[i.length] = e);
            return db.apply([], i)
        },
        guid: 1,
        proxy: function (a, c) {
            var d, e, f;
            return "string" == typeof c && (f = a[c], c = a, a = f), kb.isFunction(a) ? (d = fb.call(arguments, 2), e = function () {
                return a.apply(c || this, d.concat(fb.call(arguments)))
            }, e.guid = a.guid = a.guid || kb.guid++, e) : b
        },
        access: function (a, c, d, e, f, g, h) {
            var i = 0,
                j = a.length,
                k = null == d;
            if ("object" === kb.type(d)) {
                f = !0;
                for (i in d) kb.access(a, c, i, d[i], !0, g, h)
            } else if (e !== b && (f = !0, kb.isFunction(e) || (h = !0), k && (h ? (c.call(a, e), c = null) : (k = c, c = function (a, b, c) {
                return k.call(kb(a), c)
            })), c))
                for (; j > i; i++) c(a[i], d, h ? e : e.call(a[i], i, c(a[i], d)));
            return f ? a : k ? c.call(a) : j ? c(a[0], d) : g
        },
        now: function () {
            return (new Date).getTime()
        },
        swap: function (a, b, c, d) {
            var e, f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e
        }
    }), kb.ready.promise = function (b) {
        if (!U)
            if (U = kb.Deferred(), "complete" === Y.readyState) setTimeout(kb.ready);
            else if (Y.addEventListener) Y.addEventListener("DOMContentLoaded", xb, !1), a.addEventListener("load", xb, !1);
        else {
            Y.attachEvent("onreadystatechange", xb), a.attachEvent("onload", xb);
            var c = !1;
            try {
                c = null == a.frameElement && Y.documentElement
            } catch (d) {}
            c && c.doScroll && function e() {
                if (!kb.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    yb(), kb.ready()
                }
            }()
        }
        return U.promise(b)
    }, kb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (a, b) {
        ab["[object " + b + "]"] = b.toLowerCase()
    }), V = kb(Y),
    function (a, b) {
        function c(a, b, c, d) {
            var e, f, g, h, i, j, k, l, m, n;
            if ((b ? b.ownerDocument || b : S) !== K && J(b), b = b || K, c = c || [], !a || "string" != typeof a) return c;
            if (1 !== (h = b.nodeType) && 9 !== h) return [];
            if (M && !d) {
                if (e = xb.exec(a))
                    if (g = e[1]) {
                        if (9 === h) {
                            if (f = b.getElementById(g), !f || !f.parentNode) return c;
                            if (f.id === g) return c.push(f), c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && Q(b, f) && f.id === g) return c.push(f), c
                    } else {
                        if (e[2]) return eb.apply(c, b.getElementsByTagName(a)), c;
                        if ((g = e[3]) && B.getElementsByClassName && b.getElementsByClassName) return eb.apply(c, b.getElementsByClassName(g)), c
                    }
                if (B.qsa && (!N || !N.test(a))) {
                    if (l = k = R, m = b, n = 9 === h && a, 1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = p(a), (k = b.getAttribute("id")) ? l = k.replace(Ab, "\\$&") : b.setAttribute("id", l), l = "[id='" + l + "'] ", i = j.length; i--;) j[i] = l + q(j[i]);
                        m = rb.test(a) && b.parentNode || b, n = j.join(",")
                    }
                    if (n) try {
                        return eb.apply(c, m.querySelectorAll(n)), c
                    } catch (o) {} finally {
                        k || b.removeAttribute("id")
                    }
                }
            }
            return y(a.replace(ob, "$1"), b, c, d)
        }

        function d(a) {
            return wb.test(a + "")
        }

        function e() {
            function a(c, d) {
                return b.push(c += " ") > D.cacheLength && delete a[b.shift()], a[c] = d
            }
            var b = [];
            return a
        }

        function f(a) {
            return a[R] = !0, a
        }

        function g(a) {
            var b = K.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function h(a, b, c) {
            a = a.split("|");
            for (var d, e = a.length, f = c ? null : b; e--;)(d = D.attrHandle[a[e]]) && d !== b || (D.attrHandle[a[e]] = f)
        }

        function i(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : a[b] === !0 ? b.toLowerCase() : null
        }

        function j(a, b) {
            return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }

        function k(a) {
            return "input" === a.nodeName.toLowerCase() ? a.defaultValue : void 0
        }

        function l(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || _) - (~a.sourceIndex || _);
            if (d) return d;
            if (c)
                for (; c = c.nextSibling;)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function m(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function n(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function o(a) {
            return f(function (b) {
                return b = +b, f(function (c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function p(a, b) {
            var d, e, f, g, h, i, j, k = W[a + " "];
            if (k) return b ? 0 : k.slice(0);
            for (h = a, i = [], j = D.preFilter; h;) {
                (!d || (e = pb.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = qb.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(ob, " ")
                }), h = h.slice(d.length));
                for (g in D.filter)!(e = vb[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break
            }
            return b ? h.length : h ? c.error(a) : W(a, i).slice(0)
        }

        function q(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function r(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = U++;
            return b.first ? function (b, c, f) {
                for (; b = b[d];)
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function (b, c, g) {
                var h, i, j, k = T + " " + f;
                if (g) {
                    for (; b = b[d];)
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    for (; b = b[d];)
                        if (1 === b.nodeType || e)
                            if (j = b[R] || (b[R] = {}), (i = j[d]) && i[0] === k) {
                                if ((h = i[1]) === !0 || h === C) return h === !0
                            } else if (i = j[d] = [k], i[1] = a(b, c, g) || C, i[1] === !0) return !0
            }
        }

        function s(a) {
            return a.length > 1 ? function (b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function t(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function u(a, b, c, d, e, g) {
            return d && !d[R] && (d = u(d)), e && !e[R] && (e = u(e, g)), f(function (f, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = f || x(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : t(p, m, a, h, i),
                    r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d)
                    for (j = t(r, n), d(j, [], h, i), k = j.length; k--;)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
                if (f) {
                    if (e || a) {
                        if (e) {
                            for (j = [], k = r.length; k--;)(l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        for (k = r.length; k--;)(l = r[k]) && (j = e ? gb.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = t(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : eb.apply(g, r)
            })
        }

        function v(a) {
            for (var b, c, d, e = a.length, f = D.relative[a[0].type], g = f || D.relative[" "], h = f ? 1 : 0, i = r(function (a) {
                return a === b
            }, g, !0), j = r(function (a) {
                return gb.call(b, a) > -1
            }, g, !0), k = [
                function (a, c, d) {
                    return !f && (d || c !== H) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d))
                }]; e > h; h++)
                if (c = D.relative[a[h].type]) k = [r(s(k), c)];
                else {
                    if (c = D.filter[a[h].type].apply(null, a[h].matches), c[R]) {
                        for (d = ++h; e > d && !D.relative[a[d].type]; d++);
                        return u(h > 1 && s(k), h > 1 && q(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(ob, "$1"), c, d > h && v(a.slice(h, d)), e > d && v(a = a.slice(d)), e > d && q(a))
                    }
                    k.push(c)
                }
            return s(k)
        }

        function w(a, b) {
            var d = 0,
                e = b.length > 0,
                g = a.length > 0,
                h = function (f, h, i, j, k) {
                    var l, m, n, o = [],
                        p = 0,
                        q = "0",
                        r = f && [],
                        s = null != k,
                        u = H,
                        v = f || g && D.find.TAG("*", k && h.parentNode || h),
                        w = T += null == u ? 1 : Math.random() || .1;
                    for (s && (H = h !== K && h, C = d); null != (l = v[q]); q++) {
                        if (g && l) {
                            for (m = 0; n = a[m++];)
                                if (n(l, h, i)) {
                                    j.push(l);
                                    break
                                }
                            s && (T = w, C = ++d)
                        }
                        e && ((l = !n && l) && p--, f && r.push(l))
                    }
                    if (p += q, e && q !== p) {
                        for (m = 0; n = b[m++];) n(r, o, h, i);
                        if (f) {
                            if (p > 0)
                                for (; q--;) r[q] || o[q] || (o[q] = cb.call(j));
                            o = t(o)
                        }
                        eb.apply(j, o), s && !f && o.length > 0 && p + b.length > 1 && c.uniqueSort(j)
                    }
                    return s && (T = w, H = u), r
                };
            return e ? f(h) : h
        }

        function x(a, b, d) {
            for (var e = 0, f = b.length; f > e; e++) c(a, b[e], d);
            return d
        }

        function y(a, b, c, d) {
            var e, f, g, h, i, j = p(a);
            if (!d && 1 === j.length) {
                if (f = j[0] = j[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && B.getById && 9 === b.nodeType && M && D.relative[f[1].type]) {
                    if (b = (D.find.ID(g.matches[0].replace(Bb, Cb), b) || [])[0], !b) return c;
                    a = a.slice(f.shift().value.length)
                }
                for (e = vb.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !D.relative[h = g.type]);)
                    if ((i = D.find[h]) && (d = i(g.matches[0].replace(Bb, Cb), rb.test(f[0].type) && b.parentNode || b))) {
                        if (f.splice(e, 1), a = d.length && q(f), !a) return eb.apply(c, d), c;
                        break
                    }
            }
            return G(a, j)(d, b, !M, c, rb.test(a)), c
        }

        function z() {}
        var A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R = "sizzle" + -new Date,
            S = a.document,
            T = 0,
            U = 0,
            V = e(),
            W = e(),
            X = e(),
            Y = !1,
            Z = function () {
                return 0
            },
            $ = typeof b,
            _ = 1 << 31,
            ab = {}.hasOwnProperty,
            bb = [],
            cb = bb.pop,
            db = bb.push,
            eb = bb.push,
            fb = bb.slice,
            gb = bb.indexOf || function (a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (this[b] === a) return b;
                return -1
            },
            hb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ib = "[\\x20\\t\\r\\n\\f]",
            jb = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            lb = jb.replace("w", "w#"),
            mb = "\\[" + ib + "*(" + jb + ")" + ib + "*(?:([*^$|!~]?=)" + ib + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + lb + ")|)|)" + ib + "*\\]",
            nb = ":(" + jb + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + mb.replace(3, 8) + ")*)|.*)\\)|)",
            ob = new RegExp("^" + ib + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ib + "+$", "g"),
            pb = new RegExp("^" + ib + "*," + ib + "*"),
            qb = new RegExp("^" + ib + "*([>+~]|" + ib + ")" + ib + "*"),
            rb = new RegExp(ib + "*[+~]"),
            sb = new RegExp("=" + ib + "*([^\\]'\"]*)" + ib + "*\\]", "g"),
            tb = new RegExp(nb),
            ub = new RegExp("^" + lb + "$"),
            vb = {
                ID: new RegExp("^#(" + jb + ")"),
                CLASS: new RegExp("^\\.(" + jb + ")"),
                TAG: new RegExp("^(" + jb.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + mb),
                PSEUDO: new RegExp("^" + nb),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ib + "*(even|odd|(([+-]|)(\\d*)n|)" + ib + "*(?:([+-]|)" + ib + "*(\\d+)|))" + ib + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + hb + ")$", "i"),
                needsContext: new RegExp("^" + ib + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ib + "*((?:-\\d)?\\d*)" + ib + "*\\)|)(?=[^-]|$)", "i")
            },
            wb = /^[^{]+\{\s*\[native \w/,
            xb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            yb = /^(?:input|select|textarea|button)$/i,
            zb = /^h\d$/i,
            Ab = /'|\\/g,
            Bb = new RegExp("\\\\([\\da-f]{1,6}" + ib + "?|(" + ib + ")|.)", "ig"),
            Cb = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(55296 | d >> 10, 56320 | 1023 & d)
            };
        try {
            eb.apply(bb = fb.call(S.childNodes), S.childNodes), bb[S.childNodes.length].nodeType
        } catch (Db) {
            eb = {
                apply: bb.length ? function (a, b) {
                    db.apply(a, fb.call(b))
                } : function (a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        F = c.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, B = c.support = {}, J = c.setDocument = function (a) {
            var b = a ? a.ownerDocument || a : S;
            return b !== K && 9 === b.nodeType && b.documentElement ? (K = b, L = b.documentElement, M = !F(b), B.attributes = g(function (a) {
                return a.innerHTML = "<a href='#'></a>", h("type|href|height|width", j, "#" === a.firstChild.getAttribute("href")), h(hb, i, null == a.getAttribute("disabled")), a.className = "i", !a.getAttribute("className")
            }), B.input = g(function (a) {
                return a.innerHTML = "<input>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
            }), h("value", k, B.attributes && B.input), B.getElementsByTagName = g(function (a) {
                return a.appendChild(b.createComment("")), !a.getElementsByTagName("*").length
            }), B.getElementsByClassName = g(function (a) {
                return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = "i", 2 === a.getElementsByClassName("i").length
            }), B.getById = g(function (a) {
                return L.appendChild(a).id = R, !b.getElementsByName || !b.getElementsByName(R).length
            }), B.getById ? (D.find.ID = function (a, b) {
                if (typeof b.getElementById !== $ && M) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, D.filter.ID = function (a) {
                var b = a.replace(Bb, Cb);
                return function (a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete D.find.ID, D.filter.ID = function (a) {
                var b = a.replace(Bb, Cb);
                return function (a) {
                    var c = typeof a.getAttributeNode !== $ && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), D.find.TAG = B.getElementsByTagName ? function (a, b) {
                return typeof b.getElementsByTagName !== $ ? b.getElementsByTagName(a) : void 0
            } : function (a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, D.find.CLASS = B.getElementsByClassName && function (a, b) {
                return typeof b.getElementsByClassName !== $ && M ? b.getElementsByClassName(a) : void 0
            }, O = [], N = [], (B.qsa = d(b.querySelectorAll)) && (g(function (a) {
                a.innerHTML = "<select><option selected=''></option></select>", a.querySelectorAll("[selected]").length || N.push("\\[" + ib + "*(?:value|" + hb + ")"), a.querySelectorAll(":checked").length || N.push(":checked")
            }), g(function (a) {
                var c = b.createElement("input");
                c.setAttribute("type", "hidden"), a.appendChild(c).setAttribute("t", ""), a.querySelectorAll("[t^='']").length && N.push("[*^$]=" + ib + "*(?:''|\"\")"), a.querySelectorAll(":enabled").length || N.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), N.push(",.*:")
            })), (B.matchesSelector = d(P = L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && g(function (a) {
                B.disconnectedMatch = P.call(a, "div"), P.call(a, "[s!='']:x"), O.push("!=", nb)
            }), N = N.length && new RegExp(N.join("|")), O = O.length && new RegExp(O.join("|")), Q = d(L.contains) || L.compareDocumentPosition ? function (a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function (a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a) return !0;
                return !1
            }, B.sortDetached = g(function (a) {
                return 1 & a.compareDocumentPosition(b.createElement("div"))
            }), Z = L.compareDocumentPosition ? function (a, c) {
                if (a === c) return Y = !0, 0;
                var d = c.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(c);
                return d ? 1 & d || !B.sortDetached && c.compareDocumentPosition(a) === d ? a === b || Q(S, a) ? -1 : c === b || Q(S, c) ? 1 : I ? gb.call(I, a) - gb.call(I, c) : 0 : 4 & d ? -1 : 1 : a.compareDocumentPosition ? -1 : 1
            } : function (a, c) {
                var d, e = 0,
                    f = a.parentNode,
                    g = c.parentNode,
                    h = [a],
                    i = [c];
                if (a === c) return Y = !0, 0;
                if (!f || !g) return a === b ? -1 : c === b ? 1 : f ? -1 : g ? 1 : I ? gb.call(I, a) - gb.call(I, c) : 0;
                if (f === g) return l(a, c);
                for (d = a; d = d.parentNode;) h.unshift(d);
                for (d = c; d = d.parentNode;) i.unshift(d);
                for (; h[e] === i[e];) e++;
                return e ? l(h[e], i[e]) : h[e] === S ? -1 : i[e] === S ? 1 : 0
            }, b) : K
        }, c.matches = function (a, b) {
            return c(a, null, null, b)
        }, c.matchesSelector = function (a, b) {
            if ((a.ownerDocument || a) !== K && J(a), b = b.replace(sb, "='$1']"), !(!B.matchesSelector || !M || O && O.test(b) || N && N.test(b))) try {
                var d = P.call(a, b);
                if (d || B.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return c(b, K, null, [a]).length > 0
        }, c.contains = function (a, b) {
            return (a.ownerDocument || a) !== K && J(a), Q(a, b)
        }, c.attr = function (a, c) {
            (a.ownerDocument || a) !== K && J(a);
            var d = D.attrHandle[c.toLowerCase()],
                e = d && ab.call(D.attrHandle, c.toLowerCase()) ? d(a, c, !M) : b;
            return e === b ? B.attributes || !M ? a.getAttribute(c) : (e = a.getAttributeNode(c)) && e.specified ? e.value : null : e
        }, c.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, c.uniqueSort = function (a) {
            var b, c = [],
                d = 0,
                e = 0;
            if (Y = !B.detectDuplicates, I = !B.sortStable && a.slice(0), a.sort(Z), Y) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return a
        }, E = c.getText = function (a) {
            var b, c = "",
                d = 0,
                e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += E(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else
                for (; b = a[d]; d++) c += E(b);
            return c
        }, D = c.selectors = {
            cacheLength: 50,
            createPseudo: f,
            match: vb,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function (a) {
                    return a[1] = a[1].replace(Bb, Cb), a[3] = (a[4] || a[5] || "").replace(Bb, Cb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function (a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || c.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && c.error(a[0]), a
                },
                PSEUDO: function (a) {
                    var c, d = !a[5] && a[2];
                    return vb.CHILD.test(a[0]) ? null : (a[3] && a[4] !== b ? a[2] = a[4] : d && tb.test(d) && (c = p(d, !0)) && (c = d.indexOf(")", d.length - c) - d.length) && (a[0] = a[0].slice(0, c), a[2] = d.slice(0, c)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function (a) {
                    var b = a.replace(Bb, Cb).toLowerCase();
                    return "*" === a ? function () {
                        return !0
                    } : function (a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function (a) {
                    var b = V[a + " "];
                    return b || (b = new RegExp("(^|" + ib + ")" + a + "(" + ib + "|$)")) && V(a, function (a) {
                        return b.test("string" == typeof a.className && a.className || typeof a.getAttribute !== $ && a.getAttribute("class") || "")
                    })
                },
                ATTR: function (a, b, d) {
                    return function (e) {
                        var f = c.attr(e, a);
                        return null == f ? "!=" === b : b ? (f += "", "=" === b ? f === d : "!=" === b ? f !== d : "^=" === b ? d && 0 === f.indexOf(d) : "*=" === b ? d && f.indexOf(d) > -1 : "$=" === b ? d && f.slice(-d.length) === d : "~=" === b ? (" " + f + " ").indexOf(d) > -1 : "|=" === b ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                    }
                },
                CHILD: function (a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function (a) {
                        return !!a.parentNode
                    } : function (b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (l = b; l = l[p];)
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                for (k = q[R] || (q[R] = {}), j = k[a] || [], n = j[0] === T && j[1], m = j[0] === T && j[2], l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop();)
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [T, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[R] || (b[R] = {}))[a]) && j[0] === T) m = j[1];
                            else
                                for (;
                                    (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[R] || (l[R] = {}))[a] = [T, m]), l !== b)););
                            return m -= e, m === d || 0 === m % d && m / d >= 0
                        }
                    }
                },
                PSEUDO: function (a, b) {
                    var d, e = D.pseudos[a] || D.setFilters[a.toLowerCase()] || c.error("unsupported pseudo: " + a);
                    return e[R] ? e(b) : e.length > 1 ? (d = [a, a, "", b], D.setFilters.hasOwnProperty(a.toLowerCase()) ? f(function (a, c) {
                        for (var d, f = e(a, b), g = f.length; g--;) d = gb.call(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function (a) {
                        return e(a, 0, d)
                    }) : e
                }
            },
            pseudos: {
                not: f(function (a) {
                    var b = [],
                        c = [],
                        d = G(a.replace(ob, "$1"));
                    return d[R] ? f(function (a, b, c, e) {
                        for (var f, g = d(a, null, e, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function (a, e, f) {
                        return b[0] = a, d(b, null, f, c), !c.pop()
                    }
                }),
                has: f(function (a) {
                    return function (b) {
                        return c(a, b).length > 0
                    }
                }),
                contains: f(function (a) {
                    return function (b) {
                        return (b.textContent || b.innerText || E(b)).indexOf(a) > -1
                    }
                }),
                lang: f(function (a) {
                    return ub.test(a || "") || c.error("unsupported lang: " + a), a = a.replace(Bb, Cb).toLowerCase(),
                        function (b) {
                            var c;
                            do
                                if (c = M ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                            while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function (b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function (a) {
                    return a === L
                },
                focus: function (a) {
                    return a === K.activeElement && (!K.hasFocus || K.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function (a) {
                    return a.disabled === !1
                },
                disabled: function (a) {
                    return a.disabled === !0
                },
                checked: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function (a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function (a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeName > "@" || 3 === a.nodeType || 4 === a.nodeType) return !1;
                    return !0
                },
                parent: function (a) {
                    return !D.pseudos.empty(a)
                },
                header: function (a) {
                    return zb.test(a.nodeName)
                },
                input: function (a) {
                    return yb.test(a.nodeName)
                },
                button: function (a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function (a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || b.toLowerCase() === a.type)
                },
                first: o(function () {
                    return [0]
                }),
                last: o(function (a, b) {
                    return [b - 1]
                }),
                eq: o(function (a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: o(function (a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: o(function (a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: o(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: o(function (a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        };
        for (A in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) D.pseudos[A] = m(A);
        for (A in {
            submit: !0,
            reset: !0
        }) D.pseudos[A] = n(A);
        G = c.compile = function (a, b) {
            var c, d = [],
                e = [],
                f = X[a + " "];
            if (!f) {
                for (b || (b = p(a)), c = b.length; c--;) f = v(b[c]), f[R] ? d.push(f) : e.push(f);
                f = X(a, w(e, d))
            }
            return f
        }, D.pseudos.nth = D.pseudos.eq, z.prototype = D.filters = D.pseudos, D.setFilters = new z, B.sortStable = R.split("").sort(Z).join("") === R, J(), [0, 0].sort(Z), B.detectDuplicates = Y, kb.find = c, kb.expr = c.selectors, kb.expr[":"] = kb.expr.pseudos, kb.unique = c.uniqueSort, kb.text = c.getText, kb.isXMLDoc = c.isXML, kb.contains = c.contains
    }(a);
    var zb = {};
    kb.Callbacks = function (a) {
        a = "string" == typeof a ? zb[a] || d(a) : kb.extend({}, a);
        var c, e, f, g, h, i, j = [],
            k = !a.once && [],
            l = function (b) {
                for (e = a.memory && b, f = !0, h = i || 0, i = 0, g = j.length, c = !0; j && g > h; h++)
                    if (j[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                        e = !1;
                        break
                    }
                c = !1, j && (k ? k.length && l(k.shift()) : e ? j = [] : m.disable())
            },
            m = {
                add: function () {
                    if (j) {
                        var b = j.length;
                        ! function d(b) {
                            kb.each(b, function (b, c) {
                                var e = kb.type(c);
                                "function" === e ? a.unique && m.has(c) || j.push(c) : c && c.length && "string" !== e && d(c)
                            })
                        }(arguments), c ? g = j.length : e && (i = b, l(e))
                    }
                    return this
                },
                remove: function () {
                    return j && kb.each(arguments, function (a, b) {
                        for (var d;
                            (d = kb.inArray(b, j, d)) > -1;) j.splice(d, 1), c && (g >= d && g--, h >= d && h--)
                    }), this
                },
                has: function (a) {
                    return a ? kb.inArray(a, j) > -1 : !(!j || !j.length)
                },
                empty: function () {
                    return j = [], g = 0, this
                },
                disable: function () {
                    return j = k = e = b, this
                },
                disabled: function () {
                    return !j
                },
                lock: function () {
                    return k = b, e || m.disable(), this
                },
                locked: function () {
                    return !k
                },
                fireWith: function (a, b) {
                    return b = b || [], b = [a, b.slice ? b.slice() : b], !j || f && !k || (c ? k.push(b) : l(b)), this
                },
                fire: function () {
                    return m.fireWith(this, arguments), this
                },
                fired: function () {
                    return !!f
                }
            };
        return m
    }, kb.extend({
        Deferred: function (a) {
            var b = [["resolve", "done", kb.Callbacks("once memory"), "resolved"], ["reject", "fail", kb.Callbacks("once memory"), "rejected"], ["notify", "progress", kb.Callbacks("memory")]],
                c = "pending",
                d = {
                    state: function () {
                        return c
                    },
                    always: function () {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function () {
                        var a = arguments;
                        return kb.Deferred(function (c) {
                            kb.each(b, function (b, f) {
                                var g = f[0],
                                    h = kb.isFunction(a[b]) && a[b];
                                e[f[1]](function () {
                                    var a = h && h.apply(this, arguments);
                                    a && kb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[g + "With"](this === d ? c.promise() : this, h ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function (a) {
                        return null != a ? kb.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, kb.each(b, function (a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function () {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function () {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function (a) {
            var b, c, d, e = 0,
                f = fb.call(arguments),
                g = f.length,
                h = 1 !== g || a && kb.isFunction(a.promise) ? g : 0,
                i = 1 === h ? a : kb.Deferred(),
                j = function (a, c, d) {
                    return function (e) {
                        c[a] = this, d[a] = arguments.length > 1 ? fb.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                    }
                };
            if (g > 1)
                for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && kb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    }), kb.support = function (b) {
        var c, d, e, f, g, h, i, j, k, l = Y.createElement("div");
        if (l.setAttribute("className", "t"), l.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = l.getElementsByTagName("*") || [], d = l.getElementsByTagName("a")[0], !d || !d.style || !c.length) return b;
        f = Y.createElement("select"), h = f.appendChild(Y.createElement("option")), e = l.getElementsByTagName("input")[0], d.style.cssText = "top:1px;float:left;opacity:.5", b.getSetAttribute = "t" !== l.className, b.leadingWhitespace = 3 === l.firstChild.nodeType, b.tbody = !l.getElementsByTagName("tbody").length, b.htmlSerialize = !!l.getElementsByTagName("link").length, b.style = /top/.test(d.getAttribute("style")), b.hrefNormalized = "/a" === d.getAttribute("href"), b.opacity = /^0.5/.test(d.style.opacity), b.cssFloat = !!d.style.cssFloat, b.checkOn = !!e.value, b.optSelected = h.selected, b.enctype = !!Y.createElement("form").enctype, b.html5Clone = "<:nav></:nav>" !== Y.createElement("nav").cloneNode(!0).outerHTML, b.inlineBlockNeedsLayout = !1, b.shrinkWrapBlocks = !1, b.pixelPosition = !1, b.deleteExpando = !0, b.noCloneEvent = !0, b.reliableMarginRight = !0, b.boxSizingReliable = !0, e.checked = !0, b.noCloneChecked = e.cloneNode(!0).checked, f.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete l.test
        } catch (m) {
            b.deleteExpando = !1
        }
        e = Y.createElement("input"), e.setAttribute("value", ""), b.input = "" === e.getAttribute("value"), e.value = "t", e.setAttribute("type", "radio"), b.radioValue = "t" === e.value, e.setAttribute("checked", "t"), e.setAttribute("name", "t"), g = Y.createDocumentFragment(), g.appendChild(e), b.appendChecked = e.checked, b.checkClone = g.cloneNode(!0).cloneNode(!0).lastChild.checked, l.attachEvent && (l.attachEvent("onclick", function () {
            b.noCloneEvent = !1
        }), l.cloneNode(!0).click());
        for (k in {
            submit: !0,
            change: !0,
            focusin: !0
        }) l.setAttribute(i = "on" + k, "t"), b[k + "Bubbles"] = i in a || l.attributes[i].expando === !1;
        l.style.backgroundClip = "content-box", l.cloneNode(!0).style.backgroundClip = "", b.clearCloneStyle = "content-box" === l.style.backgroundClip;
        for (k in kb(b)) break;
        return b.ownLast = "0" !== k, kb(function () {
            var c, d, e, f = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                g = Y.getElementsByTagName("body")[0];
            g && (c = Y.createElement("div"), c.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", g.appendChild(c).appendChild(l), l.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = l.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", j = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = j && 0 === e[0].offsetHeight, l.innerHTML = "", l.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", kb.swap(g, null != g.style.zoom ? {
                zoom: 1
            } : {}, function () {
                b.boxSizing = 4 === l.offsetWidth
            }), a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(l, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(l, null) || {
                width: "4px"
            }).width, d = l.appendChild(Y.createElement("div")), d.style.cssText = l.style.cssText = f, d.style.marginRight = d.style.width = "0", l.style.width = "1px", b.reliableMarginRight = !parseFloat((a.getComputedStyle(d, null) || {}).marginRight)), typeof l.style.zoom !== W && (l.innerHTML = "", l.style.cssText = f + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === l.offsetWidth, l.style.display = "block", l.innerHTML = "<div></div>", l.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== l.offsetWidth, b.inlineBlockNeedsLayout && (g.style.zoom = 1)), g.removeChild(c), c = l = e = d = null)
        }), c = f = g = h = d = e = null, b
    }({});
    var Ab = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
        Bb = /([A-Z])/g;
    kb.extend({
        cache: {},
        noData: {
            applet: !0,
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function (a) {
            return a = a.nodeType ? kb.cache[a[kb.expando]] : a[kb.expando], !!a && !h(a)
        },
        data: function (a, b, c) {
            return e(a, b, c)
        },
        removeData: function (a, b) {
            return f(a, b)
        },
        _data: function (a, b, c) {
            return e(a, b, c, !0)
        },
        _removeData: function (a, b) {
            return f(a, b, !0)
        },
        acceptData: function (a) {
            if (a.nodeType && 1 !== a.nodeType && 9 !== a.nodeType) return !1;
            var b = a.nodeName && kb.noData[a.nodeName.toLowerCase()];
            return !b || b !== !0 && a.getAttribute("classid") === b
        }
    }), kb.fn.extend({
        data: function (a, c) {
            var d, e, f = null,
                h = 0,
                i = this[0];
            if (a === b) {
                if (this.length && (f = kb.data(i), 1 === i.nodeType && !kb._data(i, "parsedAttrs"))) {
                    for (d = i.attributes; h < d.length; h++) e = d[h].name, 0 === e.indexOf("data-") && (e = kb.camelCase(e.slice(5)), g(i, e, f[e]));
                    kb._data(i, "parsedAttrs", !0)
                }
                return f
            }
            return "object" == typeof a ? this.each(function () {
                kb.data(this, a)
            }) : arguments.length > 1 ? this.each(function () {
                kb.data(this, a, c)
            }) : i ? g(i, a, kb.data(i, a)) : null
        },
        removeData: function (a) {
            return this.each(function () {
                kb.removeData(this, a)
            })
        }
    }), kb.extend({
        queue: function (a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = kb._data(a, b), c && (!d || kb.isArray(c) ? d = kb._data(a, b, kb.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function (a, b) {
            b = b || "fx";
            var c = kb.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = kb._queueHooks(a, b),
                g = function () {
                    kb.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), f.cur = e, e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function (a, b) {
            var c = b + "queueHooks";
            return kb._data(a, c) || kb._data(a, c, {
                empty: kb.Callbacks("once memory").add(function () {
                    kb._removeData(a, b + "queue"), kb._removeData(a, c)
                })
            })
        }
    }), kb.fn.extend({
        queue: function (a, c) {
            var d = 2;
            return "string" != typeof a && (c = a, a = "fx", d--), arguments.length < d ? kb.queue(this[0], a) : c === b ? this : this.each(function () {
                var b = kb.queue(this, a, c);
                kb._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && kb.dequeue(this, a)
            })
        },
        dequeue: function (a) {
            return this.each(function () {
                kb.dequeue(this, a)
            })
        },
        delay: function (a, b) {
            return a = kb.fx ? kb.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
                var d = setTimeout(b, a);
                c.stop = function () {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function (a) {
            return this.queue(a || "fx", [])
        },
        promise: function (a, c) {
            var d, e = 1,
                f = kb.Deferred(),
                g = this,
                h = this.length,
                i = function () {
                    --e || f.resolveWith(g, [g])
                };
            for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;) d = kb._data(g[h], a + "queueHooks"), d && d.empty && (e++, d.empty.add(i));
            return i(), f.promise(c)
        }
    });
    var Cb, Db, Eb = /[\t\r\n\f]/g,
        Fb = /\r/g,
        Gb = /^(?:input|select|textarea|button|object)$/i,
        Hb = /^(?:a|area)$/i,
        Ib = /^(?:checked|selected)$/i,
        Jb = kb.support.getSetAttribute,
        Kb = kb.support.input;
    kb.fn.extend({
        attr: function (a, b) {
            return kb.access(this, kb.attr, a, b, arguments.length > 1)
        },
        removeAttr: function (a) {
            return this.each(function () {
                kb.removeAttr(this, a)
            })
        },
        prop: function (a, b) {
            return kb.access(this, kb.prop, a, b, arguments.length > 1)
        },
        removeProp: function (a) {
            return a = kb.propFix[a] || a, this.each(function () {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function (a) {
            var b, c, d, e, f, g = 0,
                h = this.length,
                i = "string" == typeof a && a;
            if (kb.isFunction(a)) return this.each(function (b) {
                kb(this).addClass(a.call(this, b, this.className))
            });
            if (i)
                for (b = (a || "").match(mb) || []; h > g; g++)
                    if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Eb, " ") : " ")) {
                        for (f = 0; e = b[f++];) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        c.className = kb.trim(d)
                    }
            return this
        },
        removeClass: function (a) {
            var b, c, d, e, f, g = 0,
                h = this.length,
                i = 0 === arguments.length || "string" == typeof a && a;
            if (kb.isFunction(a)) return this.each(function (b) {
                kb(this).removeClass(a.call(this, b, this.className))
            });
            if (i)
                for (b = (a || "").match(mb) || []; h > g; g++)
                    if (c = this[g], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Eb, " ") : "")) {
                        for (f = 0; e = b[f++];)
                            for (; d.indexOf(" " + e + " ") >= 0;) d = d.replace(" " + e + " ", " ");
                        c.className = a ? kb.trim(d) : ""
                    }
            return this
        },
        toggleClass: function (a, b) {
            var c = typeof a,
                d = "boolean" == typeof b;
            return kb.isFunction(a) ? this.each(function (c) {
                kb(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function () {
                if ("string" === c)
                    for (var e, f = 0, g = kb(this), h = b, i = a.match(mb) || []; e = i[f++];) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e);
                else(c === W || "boolean" === c) && (this.className && kb._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : kb._data(this, "__className__") || "")
            })
        },
        hasClass: function (a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Eb, " ").indexOf(b) >= 0) return !0;
            return !1
        },
        val: function (a) {
            var c, d, e, f = this[0]; {
                if (arguments.length) return e = kb.isFunction(a), this.each(function (c) {
                    var f;
                    1 === this.nodeType && (f = e ? a.call(this, c, kb(this).val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : kb.isArray(f) && (f = kb.map(f, function (a) {
                        return null == a ? "" : a + ""
                    })), d = kb.valHooks[this.type] || kb.valHooks[this.nodeName.toLowerCase()], d && "set" in d && d.set(this, f, "value") !== b || (this.value = f))
                });
                if (f) return d = kb.valHooks[f.type] || kb.valHooks[f.nodeName.toLowerCase()], d && "get" in d && (c = d.get(f, "value")) !== b ? c : (c = f.value, "string" == typeof c ? c.replace(Fb, "") : null == c ? "" : c)
            }
        }
    }), kb.extend({
        valHooks: {
            option: {
                get: function (a) {
                    var b = kb.find.attr(a, "value");
                    return null != b ? b : a.text
                }
            },
            select: {
                get: function (a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (kb.support.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && kb.nodeName(c.parentNode, "optgroup"))) {
                            if (b = kb(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function (a, b) {
                    for (var c, d, e = a.options, f = kb.makeArray(b), g = e.length; g--;) d = e[g], (d.selected = kb.inArray(kb(d).val(), f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        },
        attr: function (a, c, d) {
            var e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return typeof a.getAttribute === W ? kb.prop(a, c, d) : (1 === g && kb.isXMLDoc(a) || (c = c.toLowerCase(), e = kb.attrHooks[c] || (kb.expr.match.bool.test(c) ? Db : Cb)), d === b ? e && "get" in e && null !== (f = e.get(a, c)) ? f : (f = kb.find.attr(a, c), null == f ? b : f) : null !== d ? e && "set" in e && (f = e.set(a, d, c)) !== b ? f : (a.setAttribute(c, d + ""), d) : (kb.removeAttr(a, c), void 0))
        },
        removeAttr: function (a, b) {
            var c, d, e = 0,
                f = b && b.match(mb);
            if (f && 1 === a.nodeType)
                for (; c = f[e++];) d = kb.propFix[c] || c, kb.expr.match.bool.test(c) ? Kb && Jb || !Ib.test(c) ? a[d] = !1 : a[kb.camelCase("default-" + c)] = a[d] = !1 : kb.attr(a, c, ""), a.removeAttribute(Jb ? c : d)
        },
        attrHooks: {
            type: {
                set: function (a, b) {
                    if (!kb.support.radioValue && "radio" === b && kb.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function (a, c, d) {
            var e, f, g, h = a.nodeType;
            if (a && 3 !== h && 8 !== h && 2 !== h) return g = 1 !== h || !kb.isXMLDoc(a), g && (c = kb.propFix[c] || c, f = kb.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && null !== (e = f.get(a, c)) ? e : a[c]
        },
        propHooks: {
            tabIndex: {
                get: function (a) {
                    var b = kb.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : Gb.test(a.nodeName) || Hb.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    }), Db = {
        set: function (a, b, c) {
            return b === !1 ? kb.removeAttr(a, c) : Kb && Jb || !Ib.test(c) ? a.setAttribute(!Jb && kb.propFix[c] || c, c) : a[kb.camelCase("default-" + c)] = a[c] = !0, c
        }
    }, kb.each(kb.expr.match.bool.source.match(/\w+/g), function (a, c) {
        var d = kb.expr.attrHandle[c] || kb.find.attr;
        kb.expr.attrHandle[c] = Kb && Jb || !Ib.test(c) ? function (a, c, e) {
            var f = kb.expr.attrHandle[c],
                g = e ? b : (kb.expr.attrHandle[c] = b) != d(a, c, e) ? c.toLowerCase() : null;
            return kb.expr.attrHandle[c] = f, g
        } : function (a, c, d) {
            return d ? b : a[kb.camelCase("default-" + c)] ? c.toLowerCase() : null
        }
    }), Kb && Jb || (kb.attrHooks.value = {
        set: function (a, b, c) {
            return kb.nodeName(a, "input") ? (a.defaultValue = b, void 0) : Cb && Cb.set(a, b, c)
        }
    }), Jb || (Cb = {
        set: function (a, c, d) {
            var e = a.getAttributeNode(d);
            return e || a.setAttributeNode(e = a.ownerDocument.createAttribute(d)), e.value = c += "", "value" === d || c === a.getAttribute(d) ? c : b
        }
    }, kb.expr.attrHandle.id = kb.expr.attrHandle.name = kb.expr.attrHandle.coords = function (a, c, d) {
        var e;
        return d ? b : (e = a.getAttributeNode(c)) && "" !== e.value ? e.value : null
    }, kb.valHooks.button = {
        get: function (a, c) {
            var d = a.getAttributeNode(c);
            return d && d.specified ? d.value : b
        },
        set: Cb.set
    }, kb.attrHooks.contenteditable = {
        set: function (a, b, c) {
            Cb.set(a, "" === b ? !1 : b, c)
        }
    }, kb.each(["width", "height"], function (a, b) {
        kb.attrHooks[b] = {
            set: function (a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        }
    })), kb.support.hrefNormalized || kb.each(["href", "src"], function (a, b) {
        kb.propHooks[b] = {
            get: function (a) {
                return a.getAttribute(b, 4)
            }
        }
    }), kb.support.style || (kb.attrHooks.style = {
        get: function (a) {
            return a.style.cssText || b
        },
        set: function (a, b) {
            return a.style.cssText = b + ""
        }
    }), kb.support.optSelected || (kb.propHooks.selected = {
        get: function (a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    }), kb.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
        kb.propFix[this.toLowerCase()] = this
    }), kb.support.enctype || (kb.propFix.enctype = "encoding"), kb.each(["radio", "checkbox"], function () {
        kb.valHooks[this] = {
            set: function (a, b) {
                return kb.isArray(b) ? a.checked = kb.inArray(kb(a).val(), b) >= 0 : void 0
            }
        }, kb.support.checkOn || (kb.valHooks[this].get = function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var Lb = /^(?:input|select|textarea)$/i,
        Mb = /^key/,
        Nb = /^(?:mouse|contextmenu)|click/,
        Ob = /^(?:focusinfocus|focusoutblur)$/,
        Pb = /^([^.]*)(?:\.(.+)|)$/;
    kb.event = {
        global: {},
        add: function (a, c, d, e, f) {
            var g, h, i, j, k, l, m, n, o, p, q, r = kb._data(a);
            if (r) {
                for (d.handler && (j = d, d = j.handler, f = j.selector), d.guid || (d.guid = kb.guid++), (h = r.events) || (h = r.events = {}), (l = r.handle) || (l = r.handle = function (a) {
                    return typeof kb === W || a && kb.event.triggered === a.type ? b : kb.event.dispatch.apply(l.elem, arguments)
                }, l.elem = a), c = (c || "").match(mb) || [""], i = c.length; i--;) g = Pb.exec(c[i]) || [], o = q = g[1], p = (g[2] || "").split(".").sort(), o && (k = kb.event.special[o] || {}, o = (f ? k.delegateType : k.bindType) || o, k = kb.event.special[o] || {}, m = kb.extend({
                    type: o,
                    origType: q,
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: f,
                    needsContext: f && kb.expr.match.needsContext.test(f),
                    namespace: p.join(".")
                }, j), (n = h[o]) || (n = h[o] = [], n.delegateCount = 0, k.setup && k.setup.call(a, e, p, l) !== !1 || (a.addEventListener ? a.addEventListener(o, l, !1) : a.attachEvent && a.attachEvent("on" + o, l))), k.add && (k.add.call(a, m), m.handler.guid || (m.handler.guid = d.guid)), f ? n.splice(n.delegateCount++, 0, m) : n.push(m), kb.event.global[o] = !0);
                a = null
            }
        },
        remove: function (a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = kb.hasData(a) && kb._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(mb) || [""], j = b.length; j--;)
                    if (h = Pb.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = kb.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || kb.removeEvent(a, n, q.handle), delete k[n])
                    } else
                        for (n in k) kb.event.remove(a, n + b[j], c, d, !0);
                kb.isEmptyObject(k) && (delete q.handle, kb._removeData(a, "events"))
            }
        },
        trigger: function (c, d, e, f) {
            var g, h, i, j, k, l, m, n = [e || Y],
                o = ib.call(c, "type") ? c.type : c,
                p = ib.call(c, "namespace") ? c.namespace.split(".") : [];
            if (i = l = e = e || Y, 3 !== e.nodeType && 8 !== e.nodeType && !Ob.test(o + kb.event.triggered) && (o.indexOf(".") >= 0 && (p = o.split("."), o = p.shift(), p.sort()), h = o.indexOf(":") < 0 && "on" + o, c = c[kb.expando] ? c : new kb.Event(o, "object" == typeof c && c), c.isTrigger = f ? 2 : 3, c.namespace = p.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = b, c.target || (c.target = e), d = null == d ? [c] : kb.makeArray(d, [c]), k = kb.event.special[o] || {}, f || !k.trigger || k.trigger.apply(e, d) !== !1)) {
                if (!f && !k.noBubble && !kb.isWindow(e)) {
                    for (j = k.delegateType || o, Ob.test(j + o) || (i = i.parentNode); i; i = i.parentNode) n.push(i), l = i;
                    l === (e.ownerDocument || Y) && n.push(l.defaultView || l.parentWindow || a)
                }
                for (m = 0;
                    (i = n[m++]) && !c.isPropagationStopped();) c.type = m > 1 ? j : k.bindType || o, g = (kb._data(i, "events") || {})[c.type] && kb._data(i, "handle"), g && g.apply(i, d), g = h && i[h], g && kb.acceptData(i) && g.apply && g.apply(i, d) === !1 && c.preventDefault();
                if (c.type = o, !f && !c.isDefaultPrevented() && (!k._default || k._default.apply(n.pop(), d) === !1) && kb.acceptData(e) && h && e[o] && !kb.isWindow(e)) {
                    l = e[h], l && (e[h] = null), kb.event.triggered = o;
                    try {
                        e[o]()
                    } catch (q) {}
                    kb.event.triggered = b, l && (e[h] = l)
                }
                return c.result
            }
        },
        dispatch: function (a) {
            a = kb.event.fix(a);
            var c, d, e, f, g, h = [],
                i = fb.call(arguments),
                j = (kb._data(this, "events") || {})[a.type] || [],
                k = kb.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                for (h = kb.event.handlers.call(this, a, j), c = 0;
                    (f = h[c++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = f.elem, g = 0;
                        (e = f.handlers[g++]) && !a.isImmediatePropagationStopped();)(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, d = ((kb.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), d !== b && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function (a, c) {
            var d, e, f, g, h = [],
                i = c.delegateCount,
                j = a.target;
            if (i && j.nodeType && (!a.button || "click" !== a.type))
                for (; j != this; j = j.parentNode || this)
                    if (1 === j.nodeType && (j.disabled !== !0 || "click" !== a.type)) {
                        for (f = [], g = 0; i > g; g++) e = c[g], d = e.selector + " ", f[d] === b && (f[d] = e.needsContext ? kb(d, this).index(j) >= 0 : kb.find(d, this, null, [j]).length), f[d] && f.push(e);
                        f.length && h.push({
                            elem: j,
                            handlers: f
                        })
                    }
            return i < c.length && h.push({
                elem: this,
                handlers: c.slice(i)
            }), h
        },
        fix: function (a) {
            if (a[kb.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Nb.test(e) ? this.mouseHooks : Mb.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new kb.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
            return a.target || (a.target = f.srcElement || Y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (a, c) {
                var d, e, f, g = c.button,
                    h = c.fromElement;
                return null == a.pageX && null != c.clientX && (e = a.target.ownerDocument || Y, f = e.documentElement, d = e.body, a.pageX = c.clientX + (f && f.scrollLeft || d && d.scrollLeft || 0) - (f && f.clientLeft || d && d.clientLeft || 0), a.pageY = c.clientY + (f && f.scrollTop || d && d.scrollTop || 0) - (f && f.clientTop || d && d.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), a.which || g === b || (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    if (this !== k() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    return this === k() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    return kb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function (a) {
                    return kb.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (a) {
                    a.result !== b && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function (a, b, c, d) {
            var e = kb.extend(new kb.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? kb.event.trigger(e, null, b) : kb.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, kb.removeEvent = Y.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === W && (a[d] = null), a.detachEvent(d, c))
    }, kb.Event = function (a, b) {
        return this instanceof kb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? i : j) : this.type = a, b && kb.extend(this, b), this.timeStamp = a && a.timeStamp || kb.now(), this[kb.expando] = !0, void 0) : new kb.Event(a, b)
    }, kb.Event.prototype = {
        isDefaultPrevented: j,
        isPropagationStopped: j,
        isImmediatePropagationStopped: j,
        preventDefault: function () {
            var a = this.originalEvent;
            this.isDefaultPrevented = i, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            this.isPropagationStopped = i, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function () {
            this.isImmediatePropagationStopped = i, this.stopPropagation()
        }
    }, kb.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function (a, b) {
        kb.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function (a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !kb.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), kb.support.submitBubbles || (kb.event.special.submit = {
        setup: function () {
            return kb.nodeName(this, "form") ? !1 : (kb.event.add(this, "click._submit keypress._submit", function (a) {
                var c = a.target,
                    d = kb.nodeName(c, "input") || kb.nodeName(c, "button") ? c.form : b;
                d && !kb._data(d, "submitBubbles") && (kb.event.add(d, "submit._submit", function (a) {
                    a._submit_bubble = !0
                }), kb._data(d, "submitBubbles", !0))
            }), void 0)
        },
        postDispatch: function (a) {
            a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && kb.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function () {
            return kb.nodeName(this, "form") ? !1 : (kb.event.remove(this, "._submit"), void 0)
        }
    }), kb.support.changeBubbles || (kb.event.special.change = {
        setup: function () {
            return Lb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (kb.event.add(this, "propertychange._change", function (a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }), kb.event.add(this, "click._change", function (a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1), kb.event.simulate("change", this, a, !0)
            })), !1) : (kb.event.add(this, "beforeactivate._change", function (a) {
                var b = a.target;
                Lb.test(b.nodeName) && !kb._data(b, "changeBubbles") && (kb.event.add(b, "change._change", function (a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || kb.event.simulate("change", this.parentNode, a, !0)
                }), kb._data(b, "changeBubbles", !0))
            }), void 0)
        },
        handle: function (a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function () {
            return kb.event.remove(this, "._change"), !Lb.test(this.nodeName)
        }
    }), kb.support.focusinBubbles || kb.each({
        focus: "focusin",
        blur: "focusout"
    }, function (a, b) {
        var c = 0,
            d = function (a) {
                kb.event.simulate(b, a.target, kb.event.fix(a), !0)
            };
        kb.event.special[b] = {
            setup: function () {
                0 === c++ && Y.addEventListener(a, d, !0)
            },
            teardown: function () {
                0 === --c && Y.removeEventListener(a, d, !0)
            }
        }
    }), kb.fn.extend({
        on: function (a, c, d, e, f) {
            var g, h;
            if ("object" == typeof a) {
                "string" != typeof c && (d = d || c, c = b);
                for (g in a) this.on(g, c, d, a[g], f);
                return this
            }
            if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1) e = j;
            else if (!e) return this;
            return 1 === f && (h = e, e = function (a) {
                return kb().off(a), h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = kb.guid++)), this.each(function () {
                kb.event.add(this, a, e, d, c)
            })
        },
        one: function (a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function (a, c, d) {
            var e, f;
            if (a && a.preventDefault && a.handleObj) return e = a.handleObj, kb(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof a) {
                for (f in a) this.off(f, c, a[f]);
                return this
            }
            return (c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = j), this.each(function () {
                kb.event.remove(this, a, d, c)
            })
        },
        trigger: function (a, b) {
            return this.each(function () {
                kb.event.trigger(a, b, this)
            })
        },
        triggerHandler: function (a, b) {
            var c = this[0];
            return c ? kb.event.trigger(a, b, c, !0) : void 0
        }
    });
    var Qb = /^.[^:#\[\.,]*$/,
        Rb = /^(?:parents|prev(?:Until|All))/,
        Sb = kb.expr.match.needsContext,
        Tb = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    kb.fn.extend({
        find: function (a) {
            var b, c = [],
                d = this,
                e = d.length;
            if ("string" != typeof a) return this.pushStack(kb(a).filter(function () {
                for (b = 0; e > b; b++)
                    if (kb.contains(d[b], this)) return !0
            }));
            for (b = 0; e > b; b++) kb.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? kb.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
        },
        has: function (a) {
            var b, c = kb(a, this),
                d = c.length;
            return this.filter(function () {
                for (b = 0; d > b; b++)
                    if (kb.contains(this, c[b])) return !0
            })
        },
        not: function (a) {
            return this.pushStack(m(this, a || [], !0))
        },
        filter: function (a) {
            return this.pushStack(m(this, a || [], !1))
        },
        is: function (a) {
            return !!m(this, "string" == typeof a && Sb.test(a) ? kb(a) : a || [], !1).length
        },
        closest: function (a, b) {
            for (var c, d = 0, e = this.length, f = [], g = Sb.test(a) || "string" != typeof a ? kb(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && kb.find.matchesSelector(c, a))) {
                        c = f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? kb.unique(f) : f)
        },
        index: function (a) {
            return a ? "string" == typeof a ? kb.inArray(this[0], kb(a)) : kb.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (a, b) {
            var c = "string" == typeof a ? kb(a, b) : kb.makeArray(a && a.nodeType ? [a] : a),
                d = kb.merge(this.get(), c);
            return this.pushStack(kb.unique(d))
        },
        addBack: function (a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), kb.each({
        parent: function (a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function (a) {
            return kb.dir(a, "parentNode")
        },
        parentsUntil: function (a, b, c) {
            return kb.dir(a, "parentNode", c)
        },
        next: function (a) {
            return l(a, "nextSibling")
        },
        prev: function (a) {
            return l(a, "previousSibling")
        },
        nextAll: function (a) {
            return kb.dir(a, "nextSibling")
        },
        prevAll: function (a) {
            return kb.dir(a, "previousSibling")
        },
        nextUntil: function (a, b, c) {
            return kb.dir(a, "nextSibling", c)
        },
        prevUntil: function (a, b, c) {
            return kb.dir(a, "previousSibling", c)
        },
        siblings: function (a) {
            return kb.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function (a) {
            return kb.sibling(a.firstChild)
        },
        contents: function (a) {
            return kb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : kb.merge([], a.childNodes)
        }
    }, function (a, b) {
        kb.fn[a] = function (c, d) {
            var e = kb.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = kb.filter(d, e)), this.length > 1 && (Tb[a] || (e = kb.unique(e)), Rb.test(a) && (e = e.reverse())), this.pushStack(e)
        }
    }), kb.extend({
        filter: function (a, b, c) {
            var d = b[0];
            return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? kb.find.matchesSelector(d, a) ? [d] : [] : kb.find.matches(a, kb.grep(b, function (a) {
                return 1 === a.nodeType
            }))
        },
        dir: function (a, c, d) {
            for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !kb(f).is(d));) 1 === f.nodeType && e.push(f), f = f[c];
            return e
        },
        sibling: function (a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    });
    var Ub = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        Vb = / jQuery\d+="(?:null|\d+)"/g,
        Wb = new RegExp("<(?:" + Ub + ")[\\s/>]", "i"),
        Xb = /^\s+/,
        Yb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        Zb = /<([\w:]+)/,
        $b = /<tbody/i,
        _b = /<|&#?\w+;/,
        ac = /<(?:script|style|link)/i,
        bc = /^(?:checkbox|radio)$/i,
        cc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        dc = /^$|\/(?:java|ecma)script/i,
        ec = /^true\/(.*)/,
        fc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        gc = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            area: [1, "<map>", "</map>"],
            param: [1, "<object>", "</object>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: kb.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
        },
        hc = n(Y),
        ic = hc.appendChild(Y.createElement("div"));
    gc.optgroup = gc.option, gc.tbody = gc.tfoot = gc.colgroup = gc.caption = gc.thead, gc.th = gc.td, kb.fn.extend({
        text: function (a) {
            return kb.access(this, function (a) {
                return a === b ? kb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || Y).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = o(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function () {
            return this.domManip(arguments, function (a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = o(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function () {
            return this.domManip(arguments, function (a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function (a, b) {
            for (var c, d = a ? kb.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || kb.cleanData(u(c)), c.parentNode && (b && kb.contains(c.ownerDocument, c) && r(u(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function () {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && kb.cleanData(u(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                a.options && kb.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function (a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
                return kb.clone(this, a, b)
            })
        },
        html: function (a) {
            return kb.access(this, function (a) {
                var c = this[0] || {},
                    d = 0,
                    e = this.length;
                if (a === b) return 1 === c.nodeType ? c.innerHTML.replace(Vb, "") : b;
                if (!("string" != typeof a || ac.test(a) || !kb.support.htmlSerialize && Wb.test(a) || !kb.support.leadingWhitespace && Xb.test(a) || gc[(Zb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Yb, "<$1></$2>");
                    try {
                        for (; e > d; d++) c = this[d] || {}, 1 === c.nodeType && (kb.cleanData(u(c, !1)), c.innerHTML = a);
                        c = 0
                    } catch (f) {}
                }
                c && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function () {
            var a = kb.map(this, function (a) {
                    return [a.nextSibling, a.parentNode]
                }),
                b = 0;
            return this.domManip(arguments, function (c) {
                var d = a[b++],
                    e = a[b++];
                e && (d && d.parentNode !== e && (d = this.nextSibling), kb(this).remove(), e.insertBefore(c, d))
            }, !0), b ? this : this.remove()
        },
        detach: function (a) {
            return this.remove(a, !0)
        },
        domManip: function (a, b, c) {
            a = db.apply([], a);
            var d, e, f, g, h, i, j = 0,
                k = this.length,
                l = this,
                m = k - 1,
                n = a[0],
                o = kb.isFunction(n);
            if (o || !(1 >= k || "string" != typeof n || kb.support.checkClone) && cc.test(n)) return this.each(function (d) {
                var e = l.eq(d);
                o && (a[0] = n.call(this, d, e.html())), e.domManip(a, b, c)
            });
            if (k && (i = kb.buildFragment(a, this[0].ownerDocument, !1, !c && this), d = i.firstChild, 1 === i.childNodes.length && (i = d), d)) {
                for (g = kb.map(u(i, "script"), p), f = g.length; k > j; j++) e = i, j !== m && (e = kb.clone(e, !0, !0), f && kb.merge(g, u(e, "script"))), b.call(this[j], e, j);
                if (f)
                    for (h = g[g.length - 1].ownerDocument, kb.map(g, q), j = 0; f > j; j++) e = g[j], dc.test(e.type || "") && !kb._data(e, "globalEval") && kb.contains(h, e) && (e.src ? kb._evalUrl(e.src) : kb.globalEval((e.text || e.textContent || e.innerHTML || "").replace(fc, "")));
                i = d = null
            }
            return this
        }
    }), kb.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (a, b) {
        kb.fn[a] = function (a) {
            for (var c, d = 0, e = [], f = kb(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), kb(f[d])[b](c), eb.apply(e, c.get());
            return this.pushStack(e)
        }
    }), kb.extend({
        clone: function (a, b, c) {
            var d, e, f, g, h, i = kb.contains(a.ownerDocument, a);
            if (kb.support.html5Clone || kb.isXMLDoc(a) || !Wb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ic.innerHTML = a.outerHTML, ic.removeChild(f = ic.firstChild)), !(kb.support.noCloneEvent && kb.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || kb.isXMLDoc(a)))
                for (d = u(f), h = u(a), g = 0; null != (e = h[g]); ++g) d[g] && t(e, d[g]);
            if (b)
                if (c)
                    for (h = h || u(a), d = d || u(f), g = 0; null != (e = h[g]); g++) s(e, d[g]);
                else s(a, f);
            return d = u(f, "script"), d.length > 0 && r(d, !i && u(a, "script")), d = h = e = null, f
        },
        buildFragment: function (a, b, c, d) {
            for (var e, f, g, h, i, j, k, l = a.length, m = n(b), o = [], p = 0; l > p; p++)
                if (f = a[p], f || 0 === f)
                    if ("object" === kb.type(f)) kb.merge(o, f.nodeType ? [f] : f);
                    else if (_b.test(f)) {
                for (h = h || m.appendChild(b.createElement("div")), i = (Zb.exec(f) || ["", ""])[1].toLowerCase(), k = gc[i] || gc._default, h.innerHTML = k[1] + f.replace(Yb, "<$1></$2>") + k[2], e = k[0]; e--;) h = h.lastChild;
                if (!kb.support.leadingWhitespace && Xb.test(f) && o.push(b.createTextNode(Xb.exec(f)[0])), !kb.support.tbody)
                    for (f = "table" !== i || $b.test(f) ? "<table>" !== k[1] || $b.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; e--;) kb.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                for (kb.merge(o, h.childNodes), h.textContent = ""; h.firstChild;) h.removeChild(h.firstChild);
                h = m.lastChild
            } else o.push(b.createTextNode(f));
            for (h && m.removeChild(h), kb.support.appendChecked || kb.grep(u(o, "input"), v), p = 0; f = o[p++];)
                if ((!d || -1 === kb.inArray(f, d)) && (g = kb.contains(f.ownerDocument, f), h = u(m.appendChild(f), "script"), g && r(h), c))
                    for (e = 0; f = h[e++];) dc.test(f.type || "") && c.push(f);
            return h = null, m
        },
        cleanData: function (a, b) {
            for (var c, d, e, f, g = 0, h = kb.expando, i = kb.cache, j = kb.support.deleteExpando, k = kb.event.special; null != (c = a[g]); g++)
                if ((b || kb.acceptData(c)) && (e = c[h], f = e && i[e])) {
                    if (f.events)
                        for (d in f.events) k[d] ? kb.event.remove(c, d) : kb.removeEvent(c, d, f.handle);
                    i[e] && (delete i[e], j ? delete c[h] : typeof c.removeAttribute !== W ? c.removeAttribute(h) : c[h] = null, bb.push(e))
                }
        },
        _evalUrl: function (a) {
            return kb.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                async: !1,
                global: !1,
                "throws": !0
            })
        }
    }), kb.fn.extend({
        wrapAll: function (a) {
            if (kb.isFunction(a)) return this.each(function (b) {
                kb(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = kb(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function (a) {
            return kb.isFunction(a) ? this.each(function (b) {
                kb(this).wrapInner(a.call(this, b))
            }) : this.each(function () {
                var b = kb(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function (a) {
            var b = kb.isFunction(a);
            return this.each(function (c) {
                kb(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function () {
            return this.parent().each(function () {
                kb.nodeName(this, "body") || kb(this).replaceWith(this.childNodes)
            }).end()
        }
    });
    var jc, kc, lc, mc = /alpha\([^)]*\)/i,
        nc = /opacity\s*=\s*([^)]*)/,
        oc = /^(top|right|bottom|left)$/,
        pc = /^(none|table(?!-c[ea]).+)/,
        qc = /^margin/,
        rc = new RegExp("^(" + lb + ")(.*)$", "i"),
        sc = new RegExp("^(" + lb + ")(?!px)[a-z%]+$", "i"),
        tc = new RegExp("^([+-])=(" + lb + ")", "i"),
        uc = {
            BODY: "block"
        },
        vc = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        wc = {
            letterSpacing: 0,
            fontWeight: 400
        },
        xc = ["Top", "Right", "Bottom", "Left"],
        yc = ["Webkit", "O", "Moz", "ms"];
    kb.fn.extend({
        css: function (a, c) {
            return kb.access(this, function (a, c, d) {
                var e, f, g = {},
                    h = 0;
                if (kb.isArray(c)) {
                    for (f = kc(a), e = c.length; e > h; h++) g[c[h]] = kb.css(a, c[h], !1, f);
                    return g
                }
                return d !== b ? kb.style(a, c, d) : kb.css(a, c)
            }, a, c, arguments.length > 1)
        },
        show: function () {
            return y(this, !0)
        },
        hide: function () {
            return y(this)
        },
        toggle: function (a) {
            var b = "boolean" == typeof a;
            return this.each(function () {
                (b ? a : x(this)) ? kb(this).show() : kb(this).hide()
            })
        }
    }), kb.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = lc(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": kb.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (a, c, d, e) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var f, g, h, i = kb.camelCase(c),
                    j = a.style;
                if (c = kb.cssProps[i] || (kb.cssProps[i] = w(j, i)), h = kb.cssHooks[c] || kb.cssHooks[i], d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
                if (g = typeof d, "string" === g && (f = tc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(kb.css(a, c)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" !== g || kb.cssNumber[i] || (d += "px"), kb.support.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (j[c] = "inherit"), h && "set" in h && (d = h.set(a, d, e)) === b))) try {
                    j[c] = d
                } catch (k) {}
            }
        },
        css: function (a, c, d, e) {
            var f, g, h, i = kb.camelCase(c);
            return c = kb.cssProps[i] || (kb.cssProps[i] = w(a.style, i)), h = kb.cssHooks[c] || kb.cssHooks[i], h && "get" in h && (g = h.get(a, !0, d)), g === b && (g = lc(a, c, e)), "normal" === g && c in wc && (g = wc[c]), "" === d || d ? (f = parseFloat(g), d === !0 || kb.isNumeric(f) ? f || 0 : g) : g
        }
    }), a.getComputedStyle ? (kc = function (b) {
        return a.getComputedStyle(b, null)
    }, lc = function (a, c, d) {
        var e, f, g, h = d || kc(a),
            i = h ? h.getPropertyValue(c) || h[c] : b,
            j = a.style;
        return h && ("" !== i || kb.contains(a.ownerDocument, a) || (i = kb.style(a, c)), sc.test(i) && qc.test(c) && (e = j.width, f = j.minWidth, g = j.maxWidth, j.minWidth = j.maxWidth = j.width = i, i = h.width, j.width = e, j.minWidth = f, j.maxWidth = g)), i
    }) : Y.documentElement.currentStyle && (kc = function (a) {
        return a.currentStyle
    }, lc = function (a, c, d) {
        var e, f, g, h = d || kc(a),
            i = h ? h[c] : b,
            j = a.style;
        return null == i && j && j[c] && (i = j[c]), sc.test(i) && !oc.test(c) && (e = j.left, f = a.runtimeStyle, g = f && f.left, g && (f.left = a.currentStyle.left), j.left = "fontSize" === c ? "1em" : i, i = j.pixelLeft + "px", j.left = e, g && (f.left = g)), "" === i ? "auto" : i
    }), kb.each(["height", "width"], function (a, b) {
        kb.cssHooks[b] = {
            get: function (a, c, d) {
                return c ? 0 === a.offsetWidth && pc.test(kb.css(a, "display")) ? kb.swap(a, vc, function () {
                    return B(a, b, d)
                }) : B(a, b, d) : void 0
            },
            set: function (a, c, d) {
                var e = d && kc(a);
                return z(a, c, d ? A(a, b, d, kb.support.boxSizing && "border-box" === kb.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), kb.support.opacity || (kb.cssHooks.opacity = {
        get: function (a, b) {
            return nc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function (a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = kb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === kb.trim(f.replace(mc, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = mc.test(f) ? f.replace(mc, e) : f + " " + e)
        }
    }), kb(function () {
        kb.support.reliableMarginRight || (kb.cssHooks.marginRight = {
            get: function (a, b) {
                return b ? kb.swap(a, {
                    display: "inline-block"
                }, lc, [a, "marginRight"]) : void 0
            }
        }), !kb.support.pixelPosition && kb.fn.position && kb.each(["top", "left"], function (a, b) {
            kb.cssHooks[b] = {
                get: function (a, c) {
                    return c ? (c = lc(a, b), sc.test(c) ? kb(a).position()[b] + "px" : c) : void 0
                }
            }
        })
    }), kb.expr && kb.expr.filters && (kb.expr.filters.hidden = function (a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !kb.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || kb.css(a, "display"))
    }, kb.expr.filters.visible = function (a) {
        return !kb.expr.filters.hidden(a)
    }), kb.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function (a, b) {
        kb.cssHooks[a + b] = {
            expand: function (c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + xc[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, qc.test(a) || (kb.cssHooks[a + b].set = z)
    });
    var zc = /%20/g,
        Ac = /\[\]$/,
        Bc = /\r?\n/g,
        Cc = /^(?:submit|button|image|reset|file)$/i,
        Dc = /^(?:input|select|textarea|keygen)/i;
    kb.fn.extend({
        serialize: function () {
            return kb.param(this.serializeArray())
        },
        serializeArray: function () {
            return this.map(function () {
                var a = kb.prop(this, "elements");
                return a ? kb.makeArray(a) : this
            }).filter(function () {
                var a = this.type;
                return this.name && !kb(this).is(":disabled") && Dc.test(this.nodeName) && !Cc.test(a) && (this.checked || !bc.test(a))
            }).map(function (a, b) {
                var c = kb(this).val();
                return null == c ? null : kb.isArray(c) ? kb.map(c, function (a) {
                    return {
                        name: b.name,
                        value: a.replace(Bc, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(Bc, "\r\n")
                }
            }).get()
        }
    }), kb.param = function (a, c) {
        var d, e = [],
            f = function (a, b) {
                b = kb.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (c === b && (c = kb.ajaxSettings && kb.ajaxSettings.traditional), kb.isArray(a) || a.jquery && !kb.isPlainObject(a)) kb.each(a, function () {
            f(this.name, this.value)
        });
        else
            for (d in a) E(d, a[d], c, f);
        return e.join("&").replace(zc, "+")
    }, kb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        kb.fn[b] = function (a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), kb.fn.extend({
        hover: function (a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function (a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function (a, b) {
            return this.off(a, null, b)
        },
        delegate: function (a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function (a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var Ec, Fc, Gc = kb.now(),
        Hc = /\?/,
        Ic = /#.*$/,
        Jc = /([?&])_=[^&]*/,
        Kc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Lc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Mc = /^(?:GET|HEAD)$/,
        Nc = /^\/\//,
        Oc = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        Pc = kb.fn.load,
        Qc = {},
        Rc = {},
        Sc = "*/".concat("*");
    try {
        Fc = X.href
    } catch (Tc) {
        Fc = Y.createElement("a"), Fc.href = "", Fc = Fc.href
    }
    Ec = Oc.exec(Fc.toLowerCase()) || [], kb.fn.load = function (a, c, d) {
        if ("string" != typeof a && Pc) return Pc.apply(this, arguments);
        var e, f, g, h = this,
            i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), kb.isFunction(c) ? (d = c, c = b) : c && "object" == typeof c && (g = "POST"), h.length > 0 && kb.ajax({
            url: a,
            type: g,
            dataType: "html",
            data: c
        }).done(function (a) {
            f = arguments, h.html(e ? kb("<div>").append(kb.parseHTML(a)).find(e) : a)
        }).complete(d && function (a, b) {
            h.each(d, f || [a.responseText, b, a])
        }), this
    }, kb.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
        kb.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), kb.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Fc,
            type: "GET",
            isLocal: Lc.test(Ec[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Sc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": kb.parseJSON,
                "text xml": kb.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (a, b) {
            return b ? H(H(a, kb.ajaxSettings), b) : H(kb.ajaxSettings, a)
        },
        ajaxPrefilter: F(Qc),
        ajaxTransport: F(Rc),
        ajax: function (a, c) {
            function d(a, c, d, e) {
                var f, l, s, t, v, x = c;
                2 !== u && (u = 2, i && clearTimeout(i), k = b, h = e || "", w.readyState = a > 0 ? 4 : 0, f = a >= 200 && 300 > a || 304 === a, d && (t = I(m, w, d)), t = J(m, t, w, f), f ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (kb.lastModified[g] = v), v = w.getResponseHeader("etag"), v && (kb.etag[g] = v)), 204 === a || "HEAD" === m.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = t.state, l = t.data, s = t.error, f = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = (c || x) + "", f ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, j && o.trigger(f ? "ajaxSuccess" : "ajaxError", [w, m, f ? l : s]), q.fireWith(n, [w, x]), j && (o.trigger("ajaxComplete", [w, m]), --kb.active || kb.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (c = a, a = b), c = c || {};
            var e, f, g, h, i, j, k, l, m = kb.ajaxSetup({}, c),
                n = m.context || m,
                o = m.context && (n.nodeType || n.jquery) ? kb(n) : kb.event,
                p = kb.Deferred(),
                q = kb.Callbacks("once memory"),
                r = m.statusCode || {},
                s = {},
                t = {},
                u = 0,
                v = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function (a) {
                        var b;
                        if (2 === u) {
                            if (!l)
                                for (l = {}; b = Kc.exec(h);) l[b[1].toLowerCase()] = b[2];
                            b = l[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function () {
                        return 2 === u ? h : null
                    },
                    setRequestHeader: function (a, b) {
                        var c = a.toLowerCase();
                        return u || (a = t[c] = t[c] || a, s[a] = b), this
                    },
                    overrideMimeType: function (a) {
                        return u || (m.mimeType = a), this
                    },
                    statusCode: function (a) {
                        var b;
                        if (a)
                            if (2 > u)
                                for (b in a) r[b] = [r[b], a[b]];
                            else w.always(a[w.status]);
                        return this
                    },
                    abort: function (a) {
                        var b = a || v;
                        return k && k.abort(b), d(0, b), this
                    }
                };
            if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((a || m.url || Fc) + "").replace(Ic, "").replace(Nc, Ec[1] + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = kb.trim(m.dataType || "*").toLowerCase().match(mb) || [""], null == m.crossDomain && (e = Oc.exec(m.url.toLowerCase()), m.crossDomain = !(!e || e[1] === Ec[1] && e[2] === Ec[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === (Ec[3] || ("http:" === Ec[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = kb.param(m.data, m.traditional)), G(Qc, m, c, w), 2 === u) return w;
            j = m.global, j && 0 === kb.active++ && kb.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Mc.test(m.type), g = m.url, m.hasContent || (m.data && (g = m.url += (Hc.test(g) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = Jc.test(g) ? g.replace(Jc, "$1_=" + Gc++) : g + (Hc.test(g) ? "&" : "?") + "_=" + Gc++)), m.ifModified && (kb.lastModified[g] && w.setRequestHeader("If-Modified-Since", kb.lastModified[g]), kb.etag[g] && w.setRequestHeader("If-None-Match", kb.etag[g])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Sc + "; q=0.01" : "") : m.accepts["*"]);
            for (f in m.headers) w.setRequestHeader(f, m.headers[f]);
            if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u)) return w.abort();
            v = "abort";
            for (f in {
                success: 1,
                error: 1,
                complete: 1
            }) w[f](m[f]);
            if (k = G(Rc, m, c, w)) {
                w.readyState = 1, j && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function () {
                    w.abort("timeout")
                }, m.timeout));
                try {
                    u = 1, k.send(s, d)
                } catch (x) {
                    if (!(2 > u)) throw x;
                    d(-1, x)
                }
            } else d(-1, "No Transport");
            return w
        },
        getJSON: function (a, b, c) {
            return kb.get(a, b, c, "json")
        },
        getScript: function (a, c) {
            return kb.get(a, b, c, "script")
        }
    }), kb.each(["get", "post"], function (a, c) {
        kb[c] = function (a, d, e, f) {
            return kb.isFunction(d) && (f = f || e, e = d, d = b), kb.ajax({
                url: a,
                type: c,
                dataType: f,
                data: d,
                success: e
            })
        }
    }), kb.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function (a) {
                return kb.globalEval(a), a
            }
        }
    }), kb.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), kb.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var c, d = Y.head || kb("head")[0] || Y.documentElement;
            return {
                send: function (b, e) {
                    c = Y.createElement("script"), c.async = !0, a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, b) {
                        (b || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, c.parentNode && c.parentNode.removeChild(c), c = null, b || e(200, "success"))
                    }, d.insertBefore(c, d.firstChild)
                },
                abort: function () {
                    c && c.onload(b, !0)
                }
            }
        }
    });
    var Uc = [],
        Vc = /(=)\?(?=&|$)|\?\?/;
    kb.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var a = Uc.pop() || kb.expando + "_" + Gc++;
            return this[a] = !0, a
        }
    }), kb.ajaxPrefilter("json jsonp", function (c, d, e) {
        var f, g, h, i = c.jsonp !== !1 && (Vc.test(c.url) ? "url" : "string" == typeof c.data && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Vc.test(c.data) && "data");
        return i || "jsonp" === c.dataTypes[0] ? (f = c.jsonpCallback = kb.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, i ? c[i] = c[i].replace(Vc, "$1" + f) : c.jsonp !== !1 && (c.url += (Hc.test(c.url) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function () {
            return h || kb.error(f + " was not called"), h[0]
        }, c.dataTypes[0] = "json", g = a[f], a[f] = function () {
            h = arguments
        }, e.always(function () {
            a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Uc.push(f)), h && kb.isFunction(g) && g(h[0]), h = g = b
        }), "script") : void 0
    });
    var Wc, Xc, Yc = 0,
        Zc = a.ActiveXObject && function () {
            var a;
            for (a in Wc) Wc[a](b, !0)
        };
    kb.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return !this.isLocal && K() || L()
    } : K, Xc = kb.ajaxSettings.xhr(), kb.support.cors = !!Xc && "withCredentials" in Xc, Xc = kb.support.ajax = !!Xc, Xc && kb.ajaxTransport(function (c) {
        if (!c.crossDomain || kb.support.cors) {
            var d;
            return {
                send: function (e, f) {
                    var g, h, i = c.xhr();
                    if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), c.xhrFields)
                        for (h in c.xhrFields) i[h] = c.xhrFields[h];
                    c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), c.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (h in e) i.setRequestHeader(h, e[h])
                    } catch (j) {}
                    i.send(c.hasContent && c.data || null), d = function (a, e) {
                        var h, j, k, l;
                        try {
                            if (d && (e || 4 === i.readyState))
                                if (d = b, g && (i.onreadystatechange = kb.noop, Zc && delete Wc[g]), e) 4 !== i.readyState && i.abort();
                                else {
                                    l = {}, h = i.status, j = i.getAllResponseHeaders(), "string" == typeof i.responseText && (l.text = i.responseText);
                                    try {
                                        k = i.statusText
                                    } catch (m) {
                                        k = ""
                                    }
                                    h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404
                                }
                        } catch (n) {
                            e || f(-1, n)
                        }
                        l && f(h, k, l, j)
                    }, c.async ? 4 === i.readyState ? setTimeout(d) : (g = ++Yc, Zc && (Wc || (Wc = {}, kb(a).unload(Zc)), Wc[g] = d), i.onreadystatechange = d) : d()
                },
                abort: function () {
                    d && d(b, !0)
                }
            }
        }
    });
    var $c, _c, ad = /^(?:toggle|show|hide)$/,
        bd = new RegExp("^(?:([+-])=|)(" + lb + ")([a-z%]*)$", "i"),
        cd = /queueHooks$/,
        dd = [Q],
        ed = {
            "*": [
                function (a, b) {
                    var c = this.createTween(a, b),
                        d = c.cur(),
                        e = bd.exec(b),
                        f = e && e[3] || (kb.cssNumber[a] ? "" : "px"),
                        g = (kb.cssNumber[a] || "px" !== f && +d) && bd.exec(kb.css(c.elem, a)),
                        h = 1,
                        i = 20;
                    if (g && g[3] !== f) {
                        f = f || g[3], e = e || [], g = +d || 1;
                        do h = h || ".5", g /= h, kb.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                    }
                    return e && (c.unit = f, c.start = +g || +d || 0, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
                }]
        };
    kb.Animation = kb.extend(O, {
        tweener: function (a, b) {
            kb.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++) c = a[d], ed[c] = ed[c] || [], ed[c].unshift(b)
        },
        prefilter: function (a, b) {
            b ? dd.unshift(a) : dd.push(a)
        }
    }), kb.Tween = R, R.prototype = {
        constructor: R,
        init: function (a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (kb.cssNumber[c] ? "" : "px")
        },
        cur: function () {
            var a = R.propHooks[this.prop];
            return a && a.get ? a.get(this) : R.propHooks._default.get(this)
        },
        run: function (a) {
            var b, c = R.propHooks[this.prop];
            return this.pos = b = this.options.duration ? kb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : R.propHooks._default.set(this), this
        }
    }, R.prototype.init.prototype = R.prototype, R.propHooks = {
        _default: {
            get: function (a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = kb.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function (a) {
                kb.fx.step[a.prop] ? kb.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[kb.cssProps[a.prop]] || kb.cssHooks[a.prop]) ? kb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, R.propHooks.scrollTop = R.propHooks.scrollLeft = {
        set: function (a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, kb.each(["toggle", "show", "hide"], function (a, b) {
        var c = kb.fn[b];
        kb.fn[b] = function (a, d, e) {
            return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(S(b, !0), a, d, e)
        }
    }), kb.fn.extend({
        fadeTo: function (a, b, c, d) {
            return this.filter(x).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function (a, b, c, d) {
            var e = kb.isEmptyObject(a),
                f = kb.speed(b, c, d),
                g = function () {
                    var b = O(this, kb.extend({}, a), f);
                    g.finish = function () {
                        b.stop(!0)
                    }, (e || kb._data(this, "finish")) && b.stop(!0)
                };
            return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function (a, c, d) {
            var e = function (a) {
                var b = a.stop;
                delete a.stop, b(d)
            };
            return "string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
                var b = !0,
                    c = null != a && a + "queueHooks",
                    f = kb.timers,
                    g = kb._data(this);
                if (c) g[c] && g[c].stop && e(g[c]);
                else
                    for (c in g) g[c] && g[c].stop && cd.test(c) && e(g[c]);
                for (c = f.length; c--;) f[c].elem !== this || null != a && f[c].queue !== a || (f[c].anim.stop(d), b = !1, f.splice(c, 1));
                (b || !d) && kb.dequeue(this, a)
            })
        },
        finish: function (a) {
            return a !== !1 && (a = a || "fx"), this.each(function () {
                var b, c = kb._data(this),
                    d = c[a + "queue"],
                    e = c[a + "queueHooks"],
                    f = kb.timers,
                    g = d ? d.length : 0;
                for (c.finish = !0, kb.queue(this, a, []), e && e.cur && e.cur.finish && e.cur.finish.call(this), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            })
        }
    }), kb.each({
        slideDown: S("show"),
        slideUp: S("hide"),
        slideToggle: S("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function (a, b) {
        kb.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), kb.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? kb.extend({}, a) : {
            complete: c || !c && b || kb.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !kb.isFunction(b) && b
        };
        return d.duration = kb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in kb.fx.speeds ? kb.fx.speeds[d.duration] : kb.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            kb.isFunction(d.old) && d.old.call(this), d.queue && kb.dequeue(this, d.queue)
        }, d
    }, kb.easing = {
        linear: function (a) {
            return a
        },
        swing: function (a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, kb.timers = [], kb.fx = R.prototype.init, kb.fx.tick = function () {
        var a, c = kb.timers,
            d = 0;
        for ($c = kb.now(); d < c.length; d++) a = c[d], a() || c[d] !== a || c.splice(d--, 1);
        c.length || kb.fx.stop(), $c = b
    }, kb.fx.timer = function (a) {
        a() && kb.timers.push(a) && kb.fx.start()
    }, kb.fx.interval = 13, kb.fx.start = function () {
        _c || (_c = setInterval(kb.fx.tick, kb.fx.interval))
    }, kb.fx.stop = function () {
        clearInterval(_c), _c = null
    }, kb.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, kb.fx.step = {}, kb.expr && kb.expr.filters && (kb.expr.filters.animated = function (a) {
        return kb.grep(kb.timers, function (b) {
            return a === b.elem
        }).length
    }), kb.fn.offset = function (a) {
        if (arguments.length) return a === b ? this : this.each(function (b) {
            kb.offset.setOffset(this, a, b)
        });
        var c, d, e = {
                top: 0,
                left: 0
            },
            f = this[0],
            g = f && f.ownerDocument;
        if (g) return c = g.documentElement, kb.contains(c, f) ? (typeof f.getBoundingClientRect !== W && (e = f.getBoundingClientRect()), d = T(g), {
            top: e.top + (d.pageYOffset || c.scrollTop) - (c.clientTop || 0),
            left: e.left + (d.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
        }) : e
    }, kb.offset = {
        setOffset: function (a, b, c) {
            var d = kb.css(a, "position");
            "static" === d && (a.style.position = "relative");
            var e, f, g = kb(a),
                h = g.offset(),
                i = kb.css(a, "top"),
                j = kb.css(a, "left"),
                k = ("absolute" === d || "fixed" === d) && kb.inArray("auto", [i, j]) > -1,
                l = {},
                m = {};
            k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), kb.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), null != b.left && (l.left = b.left - h.left + f), "using" in b ? b.using.call(a, l) : g.css(l)
        }
    }, kb.fn.extend({
        position: function () {
            if (this[0]) {
                var a, b, c = {
                        top: 0,
                        left: 0
                    },
                    d = this[0];
                return "fixed" === kb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), kb.nodeName(a[0], "html") || (c = a.offset()), c.top += kb.css(a[0], "borderTopWidth", !0), c.left += kb.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - kb.css(d, "marginTop", !0),
                    left: b.left - c.left - kb.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function () {
            return this.map(function () {
                for (var a = this.offsetParent || Z; a && !kb.nodeName(a, "html") && "static" === kb.css(a, "position");) a = a.offsetParent;
                return a || Z
            })
        }
    }), kb.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function (a, c) {
        var d = /Y/.test(c);
        kb.fn[a] = function (e) {
            return kb.access(this, function (a, e, f) {
                var g = T(a);
                return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : (g ? g.scrollTo(d ? kb(g).scrollLeft() : f, d ? f : kb(g).scrollTop()) : a[e] = f, void 0)
            }, a, e, arguments.length, null)
        }
    }), kb.each({
        Height: "height",
        Width: "width"
    }, function (a, c) {
        kb.each({
            padding: "inner" + a,
            content: c,
            "": "outer" + a
        }, function (d, e) {
            kb.fn[e] = function (e, f) {
                var g = arguments.length && (d || "boolean" != typeof e),
                    h = d || (e === !0 || f === !0 ? "margin" : "border");
                return kb.access(this, function (c, d, e) {
                    var f;
                    return kb.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? kb.css(c, d, h) : kb.style(c, d, e, h)
                }, c, g ? e : b, g, null)
            }
        })
    }), kb.fn.size = function () {
        return this.length
    }, kb.fn.andSelf = kb.fn.addBack, "object" == typeof module && "object" == typeof module.exports ? module.exports = kb : (a.jQuery = a.$ = kb, "function" == typeof define && define.amd && define("jquery", [], function () {
        return kb
    }))
}(window), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (a, b, c, d, e) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
    },
    easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
        return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
        return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (1 == (b /= e)) return c + d;
        if (g || (g = .3 * e), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158,
            g = 0,
            h = d;
        if (0 == b) return c;
        if (2 == (b /= e / 2)) return c + d;
        if (g || (g = e * .3 * 1.5), h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : .5 * h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    },
    easeInBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
    },
    easeOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
    },
    easeInOutBack: function (a, b, c, d, e, f) {
        return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
    },
    easeInBounce: function (a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
    },
    easeOutBounce: function (a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
    },
    easeInOutBounce: function (a, b, c, d, e) {
        return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
    }
}),
function (a) {
    function b() {
        var b = a("script:first"),
            c = b.css("color"),
            d = !1;
        if (/^rgba/.test(c)) d = !0;
        else try {
            d = c != b.css("color", "rgba(0, 0, 0, 0.5)").css("color"), b.css("color", c)
        } catch (e) {}
        return d
    }

    function c(b, c, d) {
        var e = "rgb" + (a.support.rgba ? "a" : "") + "(" + parseInt(b[0] + d * (c[0] - b[0]), 10) + "," + parseInt(b[1] + d * (c[1] - b[1]), 10) + "," + parseInt(b[2] + d * (c[2] - b[2]), 10);
        return a.support.rgba && (e += "," + (b && c ? parseFloat(b[3] + d * (c[3] - b[3])) : 1)), e += ")"
    }

    function d(a) {
        var b, c;
        return (b = /#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(a)) ? c = [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16), 1] : (b = /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(a)) ? c = [17 * parseInt(b[1], 16), 17 * parseInt(b[2], 16), 17 * parseInt(b[3], 16), 1] : (b = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a)) ? c = [parseInt(b[1]), parseInt(b[2]), parseInt(b[3]), 1] : (b = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(a)) && (c = [parseInt(b[1], 10), parseInt(b[2], 10), parseInt(b[3], 10), parseFloat(b[4])]), c
    }
    a.extend(!0, a, {
        support: {
            rgba: b()
        }
    });
    var e = ["color", "backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "outlineColor"];
    a.each(e, function (b, e) {
        a.Tween.propHooks[e] = {
            get: function (b) {
                return a(b.elem).css(e)
            },
            set: function (b) {
                var f = b.elem.style,
                    g = d(a(b.elem).css(e)),
                    h = d(b.end);
                b.run = function (a) {
                    f[e] = c(g, h, a)
                }
            }
        }
    }), a.Tween.propHooks.borderColor = {
        set: function (b) {
            var f = b.elem.style,
                g = [],
                h = e.slice(2, 6);
            a.each(h, function (c, e) {
                g[e] = d(a(b.elem).css(e))
            });
            var i = d(b.end);
            b.run = function (b) {
                a.each(h, function (a, d) {
                    f[d] = c(g[d], i, b)
                })
            }
        }
    }
}(jQuery);
var viewStyles = {
    "default": {
        sky: "#8bd9f9",
        horizon: "#cbf0ff",
        target: "#fff2bf",
        gradient: 1728371,
        clouds: !0,
        style: [{
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                color: "#e6ebe5"
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#2f728c"
            }, {
                saturation: -4
            }, {
                lightness: -25
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#77d4f1"
            }]
        }, {
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f37582"
            }, {
                saturation: -100
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#84a747"
            }, {
                saturation: -10
            }, {
                lightness: 15
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#c1fc4f"
            }]
        }, {
            featureType: "landscape.natural",
            stylers: [{
                visibility: "on"
            }, {
                color: "#afd972"
            }, {
                saturation: -10
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#33a9ce"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ac3843"
            }, {
                saturation: -100
            }, {
                lightness: 90
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#a4d3df"
            }, {
                visibility: "on"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#66cceb"
            }]
        }]
    },
    hobbiton: {
        textures: {
            gate: "gates/gate_hobbiton.png"
        },
        sky: "#b5e2ff",
        horizon: "#d6efff",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            featureType: "All",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                hue: "#ff4400"
            }, {
                saturation: 60
            }, {
                color: "#b3e1ff"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                color: "#8ab11a"
            }, {
                saturation: -20
            }, {
                lightness: 20
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#337a36"
            }, {
                lightness: 10
            }, {
                saturation: -20
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#5cad44"
            }, {
                lightness: -10
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: 30
            }, {
                color: "#e1f2d3"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#a3d85c"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#ff7747"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 70
            }, {
                color: "#fff7b6"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#6ad0ff"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f0cb71"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#ff0000"
            }, {
                visibility: "off"
            }, {
                hue: "#ffee00"
            }]
        }, {
            featureType: "All",
            elementType: "All"
        }]
    },
    red_roads: {
        textures: {
            gate: "gates/gate_urban.png"
        },
        sky: "#7fc8fd",
        horizon: "#b9dffb",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f2eeea"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                color: "#73b6e6"
            }, {
                visibility: "on"
            }, {
                saturation: 30
            }, {
                lightness: -10
            }]
        }, {
            featureType: "water",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 100
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                hue: "#ff0000"
            }, {
                saturation: -30
            }]
        }, {
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            stylers: [{
                visibility: "on"
            }, {
                hue: "#ff0000"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                hue: "#00ff3c"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#c8df9f"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#b6d087"
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffffff"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffffff"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke"
        }, {
            featureType: "road.local",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                hue: "#ff0000"
            }, {
                color: "#666666"
            }, {
                lightness: 80
            }]
        }]
    },
    urban: {
        textures: {
            gate: "gates/gate_urban.png"
        },
        sky: "#8bd9f9",
        horizon: "#cbf0ff",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                color: "#e6ebe5"
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#2f728c"
            }, {
                saturation: -4
            }, {
                lightness: -25
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#77d4f1"
            }]
        }, {
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f37582"
            }, {
                saturation: -100
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#84a747"
            }, {
                saturation: -10
            }, {
                lightness: 15
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#c1fc4f"
            }]
        }, {
            featureType: "landscape.natural",
            stylers: [{
                visibility: "on"
            }, {
                color: "#afd972"
            }, {
                saturation: -10
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#33a9ce"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ac3843"
            }, {
                saturation: -100
            }, {
                lightness: 90
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#a4d3df"
            }, {
                visibility: "on"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#66cceb"
            }]
        }]
    },
    urban_bright: {
        textures: {
            gate: "gates/gate_urban.png"
        },
        sky: "#89cdfe",
        horizon: "#bce1fd",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            featureType: "All",
            elementType: "All",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f2eeea"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                color: "#73b6e6"
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 100
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                hue: "#ff8800"
            }, {
                lightness: 30
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffffff"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffffff"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#808080"
            }, {
                lightness: 80
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#c8df9f"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#e8e0d8"
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffffff"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffffff"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke"
        }]
    },
    world_of_tomorrow: {
        textures: {
            gate: "gates/gate_urban.png"
        },
        sky: "#9fe5f1",
        horizon: "#cff1f7",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            featureType: "All",
            elementType: "All",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#def2f6"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#c6e7ed"
            }, {
                lightness: -20
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#77d4f1"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f37582"
            }, {
                saturation: -100
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#a9dce6"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#c1fc4f"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -10
            }, {
                color: "#ebf0f2"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#33a9ce"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#a8dae9"
            }, {
                saturation: -20
            }, {
                lightness: -20
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#a4d3df"
            }, {
                visibility: "on"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#66cceb"
            }]
        }, {
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            elementType: "labels.text",
            stylers: [{
                visibility: "off"
            }]
        }]
    },
    tactile: {
        textures: {
            gate: "gates/gate_urban.png"
        },
        sky: "#8bd9f9",
        horizon: "#cbf0ff",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }]
    },
    forest: {
        textures: {
            gate: "gates/gate_forest.png"
        },
        sky: "#5adeec",
        horizon: "#a2f1fa",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 10
            }, {
                color: "#6faa72"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#1ba8b7"
            }, {
                lightness: -20
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -20
            }, {
                color: "#d9ffff"
            }]
        }, {
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            stylers: [{
                visibility: "on"
            }, {
                color: "#d9ffff"
            }, {
                saturation: -20
            }, {
                lightness: -10
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -20
            }, {
                lightness: -10
            }, {
                color: "#f1ffd6"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#c6f75f"
            }, {
                saturation: -40
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#3a4041"
            }]
        }, {
            featureType: "landscape.natural",
            stylers: [{
                visibility: "on"
            }, {
                color: "#7aa458"
            }, {
                lightness: 20
            }, {
                saturation: 10
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -40
            }, {
                color: "#109cb7"
            }, {
                lightness: -30
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#3a90b4"
            }, {
                saturation: -20
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#92c36a"
            }, {
                visibility: "on"
            }, {
                lightness: -20
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#b6f75f"
            }]
        }, {
            elementType: "labels"
        }, {
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }]
    },
    medieval: {
        textures: {
            gate: "gates/gate_forest.png"
        },
        sky: "#83d2e8",
        horizon: "#ace7f8",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            featureType: "All",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -50
            }, {
                lightness: -20
            }, {
                color: "#69adc0"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                lightness: -50
            }, {
                visibility: "on"
            }, {
                color: "#2d7536"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#12572b"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: -50
            }, {
                color: "#094b27"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#c2dce9"
            }, {
                lightness: -10
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#76ad5c"
            }, {
                saturation: -20
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#00689e"
            }, {
                hue: "#00ffe6"
            }, {
                lightness: 20
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#989270"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                hue: "#00ffdd"
            }, {
                lightness: 20
            }, {
                visibility: "off"
            }, {
                color: "#eee1c4"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#d0c897"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }, {
                color: "#92b7c9"
            }]
        }, {
            featureType: "All",
            elementType: "All"
        }]
    },
    pastoral: {
        textures: {
            gate: "gates/gate_forest.png"
        },
        sky: "#90c7de",
        horizon: "#b2dff2",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            featureType: "All",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -50
            }, {
                lightness: -20
            }, {
                color: "#78a7bb"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                lightness: -50
            }, {
                visibility: "on"
            }, {
                color: "#63763e"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#8b924c"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: -50
            }, {
                color: "#6b7d41"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffd266"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -30
            }, {
                lightness: -50
            }, {
                color: "#b5af5b"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#00689e"
            }, {
                hue: "#00ffe6"
            }, {
                lightness: 20
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#eee1c4"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                hue: "#00ffdd"
            }, {
                lightness: 20
            }, {
                visibility: "off"
            }, {
                color: "#eee1c4"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#e8895b"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#47bede"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "All"
        }]
    },
    canyon: {
        textures: {
            gate: "gates/gate_desert.png"
        },
        sky: "#dddaff",
        horizon: "#ffc5c5",
        target: "#fffcc7",
        gradient: 16777202,
        clouds: !1,
        style: [{
            featureType: "All",
            elementType: "All",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ef8746"
            }, {
                saturation: -20
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#1b483d"
            }, {
                lightness: 10
            }, {
                saturation: -30
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffddc7"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                color: "#c299c3"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 20
            }, {
                color: "#ffdeca"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                color: "#af583c"
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#3a4041"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                color: "#cd4604"
            }, {
                lightness: 2
            }, {
                saturation: -40
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#c7824a"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#966bb9"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#a4d3df"
            }, {
                lightness: -60
            }, {
                saturation: -40
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#66cceb"
            }]
        }, {
            featureType: "All",
            elementType: "All"
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffddc7"
            }]
        }, {
            stylers: [{
                saturation: -50
            }, {
                gamma: 1.32
            }]
        }]
    },
    desert: {
        textures: {
            gate: "gates/gate_desert.png"
        },
        sky: "#5ab8c7",
        horizon: "#71d3e2",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#d0bc9d"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#57c4d4"
            }, {
                lightness: -40
            }, {
                saturation: -30
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -20
            }, {
                color: "#8c8275"
            }]
        }, {
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            stylers: [{
                visibility: "on"
            }, {
                color: "#675845"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#efecdb"
            }, {
                lightness: -5
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -20
            }, {
                color: "#b2a186"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#3a4041"
            }]
        }, {
            featureType: "landscape.natural",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 10
            }, {
                color: "#e4ceac"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#c7824a"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#966bb9"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#a4d3df"
            }, {
                lightness: -60
            }, {
                saturation: -40
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#66cceb"
            }]
        }, {}]
    },
    utah: {
        textures: {
            gate: "gates/gate_desert.png"
        },
        sky: "#83c5c7",
        horizon: "#fff7f1",
        target: "#fff2bf",
        gradient: 16777215,
        clouds: !0,
        style: [{
            featureType: "All",
            elementType: "All",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f78f4d"
            }, {
                lightness: 30
            }, {
                saturation: -50
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: -40
            }, {
                saturation: -30
            }, {
                color: "#325b55"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -20
            }, {
                color: "#8c8275"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                color: "#c299c3"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 20
            }, {
                color: "#ffdeca"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                color: "#af583c"
            }, {
                visibility: "on"
            }, {
                lightness: 40
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#3a4041"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f5c19c"
            }, {
                lightness: 30
            }, {
                saturation: -30
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#c7824a"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#966bb9"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#a4d3df"
            }, {
                lightness: -60
            }, {
                saturation: -40
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#66cceb"
            }]
        }, {
            featureType: "All",
            elementType: "All"
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#d56b80"
            }]
        }]
    },
    burningman: {
        textures: {
            gate: "gates/gate_burningman.png",
            star: "stars/star_burningman.jpg"
        },
        sky: "#171425",
        horizon: "#25003c",
        target: "#d7ff8c",
        gradient: 15794115,
        clouds: !0,
        style: [{
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#2b0633"
            }, {
                lightness: -30
            }, {
                saturation: -40
            }]
        }, {
            featureType: "landscape.natural",
            stylers: [{
                visibility: "on"
            }, {
                color: "#251f42"
            }, {
                lightness: -40
            }, {
                saturation: -20
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#4e007e"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#3700fb"
            }, {
                saturation: -30
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ff0a89"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f2deff"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#ae22ff"
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 40
            }, {
                color: "#d5ff8b"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#1fb3a8"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f88eff"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#b21e21"
            }]
        }, {}]
    },
    scifi: {
        textures: {
            base: "landmarks/base_scifi.jpg",
            dropzone: "landmarks/dropzone_scifi.jpg",
            gate: "gates/gate_scifi.png",
            star: "stars/star_scifi.jpg"
        },
        sky: "#06131a",
        horizon: "#081d2b",
        target: "#21e2ff",
        gradient: 12380405,
        clouds: !1,
        style: [{
            featureType: "All",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#0d1a2a"
            }, {
                saturation: -50
            }, {
                lightness: -20
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                color: "#1f4761"
            }, {
                lightness: -50
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#123247"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#3885b7"
            }, {
                lightness: -50
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#5adbff"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#b7fbff"
            }, {
                saturation: -30
            }, {
                lightness: -50
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#00689e"
            }, {
                hue: "#00ffe6"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#00ecff"
            }, {
                saturation: 40
            }, {
                lightness: 40
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#6ad0ff"
            }, {
                hue: "#00ffdd"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffffff"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#47bede"
            }]
        }, {
            featureType: "All",
            elementType: "All"
        }]
    },
    volcano: {
        textures: {
            base: "landmarks/base_volcano.jpg",
            dropzone: "landmarks/dropzone_volcano.jpg",
            gate: "gates/gate_volcano.png",
            star: "stars/star_volcano.jpg"
        },
        sky: "#430102",
        horizon: "#2a0002",
        target: "#ff8400",
        gradient: 16580608,
        clouds: !1,
        style: [{
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ff0000"
            }, {
                saturation: -10
            }, {
                lightness: -90
            }]
        }, {
            featureType: "landscape.natural",
            stylers: [{
                saturation: 80
            }, {
                visibility: "on"
            }, {
                lightness: 20
            }, {
                color: "#a51b00"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#3c0000"
            }, {
                lightness: -30
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ff5400"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ff0000"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ff0000"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 70
            }, {
                color: "#ff0000"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#6ad0ff"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -50
            }, {
                color: "#ff0000"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#ff0000"
            }, {
                visibility: "on"
            }]
        }, {}]
    },
    "8bit": {
        textures: {
            base: "landmarks/base_8bit.jpg",
            dropzone: "landmarks/dropzone_8bit.jpg",
            gate: "gates/gate_8bit.png",
            star: "stars/star_8bit.jpg"
        },
        sky: "#3e99ff",
        horizon: "#9ccbff",
        target: "#fff8ac",
        gradient: 16774806,
        clouds: !1,
        style: [{
            featureType: "All",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -50
            }, {
                lightness: -20
            }, {
                color: "#0b79f4"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                lightness: -50
            }, {
                color: "#8ffe47"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#309434"
            }, {
                lightness: 20
            }, {
                saturation: 20
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#35e238"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#5adbff"
            }, {
                lightness: 20
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#93ef56"
            }, {
                lightness: 40
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#00689e"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f8a435"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#6ad0ff"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#ffe327"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#47bede"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "All"
        }, {
            elementType: "labels.text",
            stylers: [{
                visibility: "off"
            }]
        }, {}]
    },
    night: {
        textures: {
            base: "landmarks/base_night.jpg",
            dropzone: "landmarks/dropzone_night.jpg",
            gate: "gates/gate_night.png",
            star: "stars/star_night.jpg"
        },
        sky: "#06131a",
        horizon: "#081d2b",
        target: "#ffedae",
        gradient: 16769934,
        clouds: !1,
        style: [{
            featureType: "All",
            elementType: "All",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                lightness: 10
            }, {
                visibility: "on"
            }, {
                color: "#0a2a37"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#0f475e"
            }, {
                lightness: -80
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -20
            }, {
                color: "#fff8d9"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                color: "#808080"
            }, {
                lightness: 70
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#fff6d6"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -20
            }, {
                lightness: -10
            }, {
                color: "#ffefb9"
            }]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                saturation: -40
            }, {
                lightness: 5
            }, {
                visibility: "on"
            }, {
                color: "#0d1b21"
            }]
        }, {
            featureType: "transit",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#3a4041"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                lightness: 20
            }, {
                saturation: 10
            }, {
                visibility: "on"
            }, {
                color: "#122f3b"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -40
            }, {
                lightness: -30
            }, {
                color: "#ffd34b"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                color: "#f35d14"
            }, {
                lightness: 10
            }, {
                saturation: -20
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "on"
            }, {
                lightness: -20
            }, {
                color: "#eb862c"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#06171e"
            }, {
                visibility: "on"
            }]
        }, {
            featureType: "All",
            elementType: "labels"
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }]
    },
    revolutions: {
        textures: {
            base: "landmarks/base_revolutions.jpg",
            dropzone: "landmarks/dropzone_revolutions.jpg",
            gate: "gates/gate_revolutions.png",
            star: "stars/star_revolutions.jpg"
        },
        sky: "#15414c",
        horizon: "#2e949a",
        target: "#00fff6",
        gradient: 6486527,
        clouds: !1,
        style: [{
            featureType: "All",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "labels",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                hue: "#ff4400"
            }, {
                saturation: 60
            }, {
                color: "#1e2223"
            }]
        }, {
            featureType: "landscape.natural",
            elementType: "All",
            stylers: [{
                visibility: "on"
            }, {
                saturation: -20
            }, {
                lightness: 20
            }, {
                color: "#0b5443"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#254049"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#1d7161"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                saturation: 30
            }, {
                color: "#17181a"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [{
                visibility: "on"
            }, {
                color: "#0c919c"
            }, {
                saturation: 40
            }, {
                hue: "#00ffc4"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#ff7747"
            }, {
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                lightness: 70
            }, {
                color: "#42a7b3"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                color: "#6ad0ff"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#e3f2ef"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }, {
                hue: "#ffee00"
            }, {
                color: "#36e0b7"
            }]
        }, {
            featureType: "All",
            elementType: "All"
        }]
    },
    raver: {
        textures: {
            base: "landmarks/base_raver.jpg",
            dropzone: "landmarks/dropzone_raver.jpg",
            gate: "gates/gate_raver.png",
            star: "stars/star_raver.jpg"
        },
        sky: "#391b54",
        horizon: "#791578",
        target: "#00ff5a",
        gradient: 65369,
        clouds: !1,
        style: [{
            featureType: "All",
            elementType: "labels.text",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.highway",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#000000"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "All",
            stylers: [{
                color: "#ff0000"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                color: "#00ff30"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "All",
            stylers: [{
                color: "#ff00d2"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                color: "#000000"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                color: "#e4ff01"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }, {
                color: "#b4002f"
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }, {
                color: "#fff600"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                color: "#dcdcdc"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "transit.station.airport",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                color: "#00baff"
            }]
        }]
    },
    terminal: {
        textures: {
            base: "landmarks/base_terminal.jpg",
            dropzone: "landmarks/dropzone_terminal.jpg",
            gate: "gates/gate_terminal.png",
            star: "stars/star_terminal.jpg"
        },
        sky: "#001409",
        horizon: "#07312a",
        target: "#55ffcd",
        gradient: 14745590,
        clouds: !1,
        style: [{
            featureType: "All",
            elementType: "labels.text",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.highway",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "All",
            elementType: "labels.icon",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape",
            elementType: "geometry.fill",
            stylers: [{
                visibility: "on"
            }, {
                color: "#00230f"
            }]
        }, {
            featureType: "road.arterial",
            elementType: "All",
            stylers: [{
                color: "#affecd"
            }]
        }, {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [{
                color: "#7aee96"
            }, {
                saturation: 80
            }, {
                lightness: 30
            }]
        }, {
            featureType: "road.arterial",
            elementType: "All",
            stylers: [{
                color: "#006457"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{
                color: "#001409"
            }]
        }, {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [{
                color: "#00f1b0"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [{
                color: "#cf4e4e"
            }]
        }, {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{
                color: "#00cf97"
            }]
        }, {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "transit.station.airport",
            elementType: "geometry",
            stylers: [{
                visibility: "off"
            }]
        }, {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [{
                color: "#0cff96"
            }, {
                lightness: -70
            }, {
                saturation: -30
            }]
        }]
    }
};
mapdive.styleGroups = {
    "default": ["default"],
    desert: ["desert", "canyon"],
    forest: ["forest", "medieval", "pastoral"],
    urban: ["tactile", "urban", "urban_bright", "red_roads", "world_of_tomorrow"],
    hobbiton: ["hobbiton"]
}, mapdive.landmarks = [{
    name: "statue_of_liberty",
    model: "game/viewport/models/landmarks/statue_of_liberty.obj",
    texture: "radial"
}, {
    name: "st_basils",
    model: "game/viewport/models/landmarks/saint_basils_cathedral.obj",
    texture: "radial"
}, {
    name: "burj_al_arab",
    model: "game/viewport/models/landmarks/burj_al_arab.obj",
    texture: "radial"
}], mapdive.getLandmarkParams = function (a) {
    for (var b = 0; b < mapdive.landmarks.length; b++)
        if (mapdive.landmarks[b].name == a) return mapdive.landmarks[b]
};
var mapdive = window.mapdive ? window.mapdive : {};
mapdive.levels = mapdive.levels ? mapdive.levels : {}, mapdive.levels = [], mapdive.levels.push({
    name: "EMPTY",
    style: "default",
    description: {
        search: "emptiness...",
        target: "The Void",
        address: "123 paradox ln",
        country: "unknown"
    },
    origin: {
        position: {
            x: 75.60899524944264,
            y: 3885.99642866252,
            z: 95.84784190055548
        },
        rotation: {
            x: 0,
            y: 2.1145623666943605,
            z: 0
        }
    },
    entities: []
}), mapdive.getRandomLevel = function (a) {
    for (var b = Math.floor(Math.random() * mapdive.levels.length); mapdive.levels[b].name == a || "EMPTY" == mapdive.levels[b].name;) b = Math.floor(Math.random() * mapdive.levels.length);
    return mapdive.levels[b]
}, mapdive.getLevelByName = function (a) {
    for (var b = 0; b < mapdive.levels.length; b++)
        if (mapdive.levels[b].name == a) return mapdive.levels[b];
    return null
}, mapdive.getNextLevel = function (a) {
    for (var b = [], c = 0; c < mapdive.levels.length; c++) "EMPTY" != mapdive.levels[c].name && b.push(mapdive.levels[c].name);
    for (var c = 0; c < b.length; c++)
        if (b[c] == a) return c < b.length - 1 ? mapdive.getLevelByName(b[c + 1]) : mapdive.getLevelByName(b[0]);
    return mapdive.getLevelByName("default")
}, mapdive.levels.push({
    name: "statue of liberty",
    style: "urban",
    description: {
        search: "statue of liberty",
        target: "Statue of Liberty",
        address: "Liberty Island, New York, NY",
        country: "United States"
    },
    origin: {
        position: {
            x: 75.5512065177572,
            y: 4e3,
            z: 96.03820604365163
        },
        rotation: {
            x: 0,
            y: 2.2884359903982654,
            z: 0
        }
    },
    entities: [{
        id: 7,
        type: "landmark",
        position: {
            x: 75.346103569705,
            y: 0,
            z: 96.27318861165499
        },
        rotation: {
            x: 0,
            y: 1.3089969389957472,
            z: 0
        },
        params: {},
        model: "statue_of_liberty"
    }, {
        id: 8,
        type: "dropzone",
        position: {
            x: 75.34610261603068,
            y: 0,
            z: 96.27319147267791
        },
        rotation: {
            x: 0,
            y: 0,
            z: 0
        },
        params: {}
    }, {
        id: 1,
        type: "gate",
        position: {
            x: 75.53676042866397,
            y: 3676.6042729893834,
            z: 96.05475556918788
        },
        rotation: {
            x: 0,
            y: -3.859232317193161,
            z: 0
        },
        params: {}
    }, {
        id: 2,
        type: "gate",
        position: {
            x: 75.51211452515156,
            y: 3139.5193340307487,
            z: 96.08299006275567
        },
        rotation: {
            x: 0,
            y: -3.859232317193161,
            z: 0
        },
        params: {}
    }, {
        id: 3,
        type: "gate",
        position: {
            x: 75.48625968910758,
            y: 2618.6518799074547,
            z: 96.11330169250792
        },
        rotation: {
            x: 0,
            y: -3.859232317193161,
            z: 0
        },
        params: {}
    }, {
        id: 4,
        type: "gate",
        position: {
            x: 75.46558060786259,
            y: 2125.4495469738595,
            z: 96.136299595016
        },
        rotation: {
            x: 0,
            y: -3.859232317193161,
            z: 0
        },
        params: {}
    }, {
        id: 5,
        type: "gate",
        position: {
            x: 75.4439586888522,
            y: 1579.7788807493446,
            z: 96.16303231428026
        },
        rotation: {
            x: 0,
            y: -3.859232317193161,
            z: 0
        },
        params: {}
    }, {
        id: 6,
        type: "gate",
        position: {
            x: 75.41564895666431,
            y: 1079.8987599422546,
            z: 96.19175236108003
        },
        rotation: {
            x: 0,
            y: -3.859232317193161,
            z: 0
        },
        params: {}
    }, {
        id: 9,
        type: "gate",
        position: {
            x: 75.39568708810015,
            y: 644.8885784765428,
            z: 96.21657392136763
        },
        rotation: {
            x: 0,
            y: -3.859232317193161,
            z: 0
        },
        params: {}
    }, {
        id: 10,
        type: "gate",
        position: {
            x: 75.37588638938838,
            y: 330.12278767305685,
            z: 96.23971536487493
        },
        rotation: {
            x: 0,
            y: -3.833732345370424,
            z: 0
        },
        params: {
            last: !0
        }
    }, {
        id: 11,
        type: "item",
        position: {
            x: 75.53592868414046,
            y: 3658.4788487616497,
            z: 96.05570842065819
        },
        rotation: {
            x: 0,
            y: -3.859232317193163,
            z: 0
        },
        params: {}
    }, {
        id: 12,
        type: "item",
        position: {
            x: 75.52769879096047,
            y: 3479.132545876706,
            z: 96.06513663520658
        },
        rotation: {
            x: 0,
            y: -3.859232317193163,
            z: 0
        },
        params: {}
    }, {
        id: 13,
        type: "item",
        position: {
            x: 75.52235811559899,
            y: 3362.748242940732,
            z: 96.07125494464756
        },
        rotation: {
            x: 0,
            y: -3.859232317193163,
            z: 0
        },
        params: {}
    }, {
        id: 14,
        type: "item",
        position: {
            x: 75.50352031417104,
            y: 2973.5383430799093,
            z: 96.09098543608476
        },
        rotation: {
            x: 0,
            y: -4.165231538345185,
            z: 0
        },
        params: {}
    }, {
        id: 15,
        type: "item",
        position: {
            x: 75.49749799799486,
            y: 2860.969918928721,
            z: 96.0959834176195
        },
        rotation: {
            x: 0,
            y: -3.838648777117957,
            z: 0
        },
        params: {}
    }, {
        id: 16,
        type: "item",
        position: {
            x: 75.49105921162267,
            y: 2709.695737644234,
            z: 96.1050074806574
        },
        rotation: {
            x: 0,
            y: -3.706232317193662,
            z: 0
        },
        params: {}
    }, {
        id: 17,
        type: "item",
        position: {
            x: 75.47784036530926,
            y: 2435.1895147350388,
            z: 96.1215554507511
        },
        rotation: {
            x: 0,
            y: -3.910232317194861,
            z: 0
        },
        params: {}
    }, {
        id: 18,
        type: "item",
        position: {
            x: 75.47480222339108,
            y: 2330.9369229363992,
            z: 96.12469716752632
        },
        rotation: {
            x: 0,
            y: -3.910232317193164,
            z: 0
        },
        params: {}
    }, {
        id: 19,
        type: "item",
        position: {
            x: 75.46465597252251,
            y: 2107.9932684041605,
            z: 96.13720794156089
        },
        rotation: {
            x: 0,
            y: -3.8337314373819615,
            z: 0
        },
        params: {}
    }, {
        id: 20,
        type: "item",
        position: {
            x: 75.44543766116206,
            y: 1606,
            z: 96.16132455426407
        },
        rotation: {
            x: 0,
            y: -3.935545754827187,
            z: 0
        },
        params: {}
    }, {
        id: 21,
        type: "item",
        position: {
            x: 75.43559736202772,
            y: 1426.562604206454,
            z: 96.17154712311421
        },
        rotation: {
            x: 0,
            y: -3.96123231726848,
            z: 0
        },
        params: {}
    }, {
        id: 22,
        type: "item",
        position: {
            x: 75.42975634500557,
            y: 1313.9956327730727,
            z: 96.17700122702288
        },
        rotation: {
            x: 0,
            y: -3.961232317193164,
            z: 0
        },
        params: {}
    }, {
        id: 23,
        type: "item",
        position: {
            x: 75.41398022593198,
            y: 1052.2050684614371,
            z: 96.19379653336908
        },
        rotation: {
            x: 0,
            y: -3.808232317193291,
            z: 0
        },
        params: {}
    }, {
        id: 24,
        type: "item",
        position: {
            x: 75.40560445998848,
            y: 817.3275659910173,
            z: 96.20406072789956
        },
        rotation: {
            x: 0,
            y: -3.859231725599891,
            z: 0
        },
        params: {}
    }, {
        id: 25,
        type: "item",
        position: {
            x: 75.38249426199295,
            y: 414,
            z: 96.2328749094044
        },
        rotation: {
            x: 0,
            y: -3.9356923044599084,
            z: 0
        },
        params: {}
    }, {
        id: 26,
        type: "bonus",
        position: {
            x: 75.45596522396839,
            y: 1843.7077192305278,
            z: 96.14710199768368
        },
        rotation: {
            x: 0,
            y: -3.7572323171931625,
            z: 0
        },
        params: {}
    }]
}), mapdive.levels.push({
    name: "st_basils",
    style: "urban",
    description: {
        search: "cathedral moscow",
        target: "St. Basil's Cathedral",
        address: "ploshchad' Krasnaya, Moscow",
        country: "Russia"
    },
    origin: {
        position: {
            x: 154.99672537109538,
            y: 4e3,
            z: 80.29482522972583
        },
        rotation: {
            x: 0,
            y: -2.5443541417548023,
            z: 0
        }
    },
    entities: [{
        id: 1,
        type: "landmark",
        position: {
            x: 154.75424782222223,
            y: 0,
            z: 80.03042284806403
        },
        rotation: {
            x: 0,
            y: -1.0349421850400937,
            z: 0
        },
        params: {},
        model: "st_basils"
    }, {
        id: 2,
        type: "dropzone",
        position: {
            x: 154.75424782222223,
            y: 0,
            z: 80.03042284806403
        },
        rotation: {
            x: 0,
            y: -1.0349421850400937,
            z: 0
        },
        params: {}
    }, {
        id: 3,
        type: "gate",
        position: {
            x: 154.974650034716,
            y: 3661.2486731859,
            z: 80.27981200408118
        },
        rotation: {
            x: 0,
            y: .9735578149599062,
            z: 0
        },
        params: {}
    }, {
        id: 5,
        type: "gate",
        position: {
            x: 154.9354933208293,
            y: 3033.5028019405204,
            z: 80.23333416913562
        },
        rotation: {
            x: 0,
            y: .24443965007870028,
            z: 0
        },
        params: {}
    }, {
        id: 6,
        type: "gate",
        position: {
            x: 154.9323790114407,
            y: 2684.3904380575195,
            z: 80.20270133121161
        },
        rotation: {
            x: 0,
            y: .1575578149599064,
            z: 0
        },
        params: {}
    }, {
        id: 7,
        type: "gate",
        position: {
            x: 154.91485926132972,
            y: 2307.6171753637186,
            z: 80.16847373381826
        },
        rotation: {
            x: 0,
            y: .48905781495990563,
            z: 0
        },
        params: {}
    }, {
        id: 8,
        type: "gate",
        position: {
            x: 154.89946050248474,
            y: 1999.4784077820582,
            z: 80.1534017015784
        },
        rotation: {
            x: 0,
            y: .9480578149599053,
            z: 0
        },
        params: {}
    }, {
        id: 9,
        type: "gate",
        position: {
            x: 154.86924088718837,
            y: 1535.1167280801092,
            z: 80.14153782515838
        },
        rotation: {
            x: 0,
            y: 1.3560578149599047,
            z: 0
        },
        params: {}
    }, {
        id: 10,
        type: "gate",
        position: {
            x: 154.83748914243284,
            y: 1226.7782028509669,
            z: 80.13210907041352
        },
        rotation: {
            x: 0,
            y: 1.1265578149599142,
            z: 0
        },
        params: {}
    }, {
        id: 11,
        type: "gate",
        position: {
            x: 154.81511260373568,
            y: 920.1678447052022,
            z: 80.117984858155
        },
        rotation: {
            x: 0,
            y: 1.1265426511292627,
            z: 0
        },
        params: {}
    }, {
        id: 12,
        type: "gate",
        position: {
            x: 154.79315263373806,
            y: 636.0661042130497,
            z: 80.10729156453668
        },
        rotation: {
            x: 0,
            y: .7950589884867689,
            z: 0
        },
        params: {}
    }, {
        id: 13,
        type: "gate",
        position: {
            x: 154.7748492419728,
            y: 283.6830202619601,
            z: 80.07045431425472
        },
        rotation: {
            x: 0,
            y: .6108652381980153,
            z: 0
        },
        params: {
            last: !0
        }
    }, {
        id: 4,
        type: "item",
        position: {
            x: 154.98292002845974,
            y: 3760.5586983814183,
            z: 80.28543634792
        },
        rotation: {
            x: 0,
            y: .9735578149599053,
            z: 0
        },
        params: {}
    }, {
        id: 14,
        type: "item",
        position: {
            x: 154.9624755652566,
            y: 3494.863787721239,
            z: 80.26641192225576
        },
        rotation: {
            x: 0,
            y: .6675578149599062,
            z: 0
        },
        params: {}
    }, {
        id: 15,
        type: "item",
        position: {
            x: 154.95635852333137,
            y: 3361.1261310440836,
            z: 80.25865200279323
        },
        rotation: {
            x: 0,
            y: .6675578149599062,
            z: 0
        },
        params: {}
    }, {
        id: 16,
        type: "item",
        position: {
            x: 154.95083760837457,
            y: 3226.584534384109,
            z: 80.25164831441775
        },
        rotation: {
            x: 0,
            y: .6675578149599062,
            z: 0
        },
        params: {}
    }, {
        id: 17,
        type: "item",
        position: {
            x: 154.93848385857868,
            y: 3080.0574975628624,
            z: 80.23726262083913
        },
        rotation: {
            x: 0,
            y: .6675578149599035,
            z: 0
        },
        params: {}
    }, {
        id: 18,
        type: "item",
        position: {
            x: 154.93770748894022,
            y: 2861.15564909009,
            z: 80.21957268248093
        },
        rotation: {
            x: 0,
            y: -.14905107785958882,
            z: 0
        },
        params: {}
    }, {
        id: 19,
        type: "item",
        position: {
            x: 154.93587515209578,
            y: 2770.908373017787,
            z: 80.21124653419447
        },
        rotation: {
            x: 0,
            y: .4633494766881343,
            z: 0
        },
        params: {}
    }, {
        id: 20,
        type: "item",
        position: {
            x: 154.9230741023206,
            y: 2525.4677299914906,
            z: 80.18431340891773
        },
        rotation: {
            x: 0,
            y: .5145578149159,
            z: 0
        },
        params: {}
    }, {
        id: 21,
        type: "item",
        position: {
            x: 154.92066738052543,
            y: 2447.932414000272,
            z: 80.179503814857
        },
        rotation: {
            x: 0,
            y: .38705898848676856,
            z: 0
        },
        params: {}
    }, {
        id: 22,
        type: "item",
        position: {
            x: 154.91660807709084,
            y: 2335.462039632551,
            z: 80.17117484766686
        },
        rotation: {
            x: 0,
            y: .540052816069982,
            z: 0
        },
        params: {}
    }, {
        id: 23,
        type: "item",
        position: {
            x: 154.8971478768746,
            y: 1978.116402136536,
            z: 80.15234136663378
        },
        rotation: {
            x: 0,
            y: 1.2285546542480668,
            z: 0
        },
        params: {}
    }, {
        id: 24,
        type: "item",
        position: {
            x: 154.88782758211048,
            y: 1734.8497322615876,
            z: 80.14861660467862
        },
        rotation: {
            x: 0,
            y: 1.177557789602834,
            z: 0
        },
        params: {}
    }, {
        id: 25,
        type: "item",
        position: {
            x: 154.88179818593363,
            y: 1647.996745837295,
            z: 80.14611533568561
        },
        rotation: {
            x: 0,
            y: 1.1775578149599042,
            z: 0
        },
        params: {}
    }, {
        id: 26,
        type: "item",
        position: {
            x: 154.87134098775908,
            y: 1554.1456030464174,
            z: 80.1417772121416
        },
        rotation: {
            x: 0,
            y: 1.1775578149599042,
            z: 0
        },
        params: {}
    }, {
        id: 27,
        type: "item",
        position: {
            x: 154.82863276377358,
            y: 1118.448574813904,
            z: 80.12834265958331
        },
        rotation: {
            x: 0,
            y: .9739566320860225,
            z: 0
        },
        params: {}
    }, {
        id: 29,
        type: "item",
        position: {
            x: 154.8043046722483,
            y: 778.371476809586,
            z: 80.11269826877194
        },
        rotation: {
            x: 0,
            y: 1.0755566440231465,
            z: 0
        },
        params: {}
    }, {
        id: 30,
        type: "item",
        position: {
            x: 154.79968163522955,
            y: 707.2005644653184,
            z: 80.11027990054623
        },
        rotation: {
            x: 0,
            y: 1.1010574302955325,
            z: 0
        },
        params: {}
    }, {
        id: 31,
        type: "item",
        position: {
            x: 154.78557609989684,
            y: 478.3713278029965,
            z: 80.09280870925987
        },
        rotation: {
            x: 0,
            y: .3620894762689053,
            z: 0
        },
        params: {}
    }, {
        id: 32,
        type: "item",
        position: {
            x: 154.77938180948124,
            y: 364.592447699927,
            z: 80.08000230329881
        },
        rotation: {
            x: 0,
            y: .38822696528711,
            z: 0
        },
        params: {}
    }, {
        id: 28,
        type: "bonus",
        position: {
            x: 154.9147017287975,
            y: 2185.2305448518177,
            z: 80.1518917252418
        },
        rotation: {
            x: 0,
            y: 1.7666960506275329,
            z: 0
        },
        params: {}
    }]
}), mapdive.levels.push({
    name: "burj al arab",
    style: "desert",
    description: {
        search: "palm island dubai",
        target: "Burj Al Arab Hotel",
        address: "Burj Al Arab Hotel - Dubai",
        country: "United Arab Emirates"
    },
    origin: {
        position: {
            x: 167.06045414081714,
            y: 4e3,
            z: 109.4033584884649
        },
        rotation: {
            x: 0,
            y: 14.812704235256973,
            z: 0
        }
    },
    entities: [{
        id: 1,
        type: "landmark",
        position: {
            x: 167.2431383440874,
            y: 0,
            z: 109.51883208916293
        },
        rotation: {
            x: 0,
            y: .19198621771937624,
            z: 0
        },
        params: {},
        model: "burj_al_arab"
    }, {
        id: 2,
        type: "dropzone",
        position: {
            x: 167.2431383440874,
            y: 0,
            z: 109.51883208916293
        },
        rotation: {
            x: 0,
            y: -11.883500562052118,
            z: 0
        },
        params: {}
    }, {
        id: 5,
        type: "gate",
        position: {
            x: 167.04777551591215,
            y: 3702.307928341027,
            z: 109.42452925875602
        },
        rotation: {
            x: 0,
            y: -15.93350159751676,
            z: 0
        },
        params: {}
    }, {
        id: 6,
        type: "gate",
        position: {
            x: 167.05209384438268,
            y: 3393.127719300054,
            z: 109.44590469283139
        },
        rotation: {
            x: 0,
            y: -15.413821674554958,
            z: 0
        },
        params: {}
    }, {
        id: 7,
        type: "gate",
        position: {
            x: 167.06589506188274,
            y: 3159.3617971199947,
            z: 109.47396428963503
        },
        rotation: {
            x: 0,
            y: -15.063500562058968,
            z: 0
        },
        params: {}
    }, {
        id: 8,
        type: "gate",
        position: {
            x: 167.08404274156248,
            y: 2824.674657317069,
            z: 109.48315664085466
        },
        rotation: {
            x: 0,
            y: -14.313500562051884,
            z: 0
        },
        params: {}
    }, {
        id: 9,
        type: "gate",
        position: {
            x: 167.11141208647302,
            y: 2596,
            z: 109.4826644471104
        },
        rotation: {
            x: 0,
            y: -13.875367553354918,
            z: 0
        },
        params: {}
    }, {
        id: 10,
        type: "gate",
        position: {
            x: 167.1376980675761,
            y: 2402,
            z: 109.46629248910443
        },
        rotation: {
            x: 0,
            y: -12.915436464758038,
            z: 0
        },
        params: {}
    }, {
        id: 11,
        type: "gate",
        position: {
            x: 167.1252265102348,
            y: 2148.017093110166,
            z: 109.44031433954034
        },
        rotation: {
            x: 0,
            y: -11.913500562051958,
            z: 0
        },
        params: {}
    }, {
        id: 12,
        type: "gate",
        position: {
            x: 167.09828974662975,
            y: 1851.9171048895541,
            z: 109.43388176668935
        },
        rotation: {
            x: 0,
            y: -10.4135534173996,
            z: 0
        },
        params: {}
    }, {
        id: 13,
        type: "gate",
        position: {
            x: 167.08588244686544,
            y: 1607.9181440202603,
            z: 109.45133973004916
        },
        rotation: {
            x: 0,
            y: -9.22619618058841,
            z: 0
        },
        params: {}
    }, {
        id: 14,
        type: "gate",
        position: {
            x: 167.10105936564597,
            y: 1327.3294549423547,
            z: 109.47185549141174
        },
        rotation: {
            x: 0,
            y: -7.62708883121522,
            z: 0
        },
        params: {}
    }, {
        id: 15,
        type: "gate",
        position: {
            x: 167.13784489094218,
            y: 944,
            z: 109.47245335044812
        },
        rotation: {
            x: 0,
            y: -7.294769763431752,
            z: 0
        },
        params: {}
    }, {
        id: 16,
        type: "gate",
        position: {
            x: 167.15269683554467,
            y: 832.943034141763,
            z: 109.46255034499643
        },
        rotation: {
            x: 0,
            y: -7.382000562051902,
            z: 0
        },
        params: {}
    }, {
        id: 17,
        type: "gate",
        position: {
            x: 167.20417510273063,
            y: 422,
            z: 109.45672465487013
        },
        rotation: {
            x: 0,
            y: -8.402000562051889,
            z: 0
        },
        params: {}
    }, {
        id: 18,
        type: "gate",
        position: {
            x: 167.23511430686244,
            y: 223.8985657778539,
            z: 109.48642174717676
        },
        rotation: {
            x: 0,
            y: -8.861000562051892,
            z: 0
        },
        params: {
            last: !0
        }
    }, {
        id: 54,
        type: "bonus",
        position: {
            x: 167.08185135951948,
            y: 1502.5215616660946,
            z: 109.46748055916817
        },
        rotation: {
            x: 0,
            y: -8.784500562051885,
            z: 0
        },
        params: {}
    }, {
        id: 3,
        type: "item",
        position: {
            x: 167.0472779422257,
            y: 3478.6231106174187,
            z: 109.4394036311954
        },
        rotation: {
            x: 0,
            y: -15.032004938282553,
            z: 0
        },
        params: {}
    }, {
        id: 4,
        type: "item",
        position: {
            x: 167.052150060735,
            y: 3379.029153438709,
            z: 109.44702390616014
        },
        rotation: {
            x: 0,
            y: -15.185000562039152,
            z: 0
        },
        params: {}
    }, {
        id: 19,
        type: "item",
        position: {
            x: 167.05757864494478,
            y: 3297.112303921815,
            z: 109.4581624082507
        },
        rotation: {
            x: 0,
            y: -15.210500563743949,
            z: 0
        },
        params: {}
    }, {
        id: 20,
        type: "item",
        position: {
            x: 167.06834652844438,
            y: 3086.121871320262,
            z: 109.47663763079244
        },
        rotation: {
            x: 0,
            y: -14.52234395425535,
            z: 0
        },
        params: {}
    }, {
        id: 21,
        type: "item",
        position: {
            x: 167.071229719465,
            y: 3011.2912291939783,
            z: 109.47797080501252
        },
        rotation: {
            x: 0,
            y: -14.715616599407523,
            z: 0
        },
        params: {}
    }, {
        id: 22,
        type: "item",
        position: {
            x: 167.07788302486856,
            y: 2926.1638542222863,
            z: 109.48098132487101
        },
        rotation: {
            x: 0,
            y: -14.394500562051883,
            z: 0
        },
        params: {}
    }, {
        id: 23,
        type: "item",
        position: {
            x: 167.08416283042607,
            y: 2828,
            z: 109.48323854095513
        },
        rotation: {
            x: 0,
            y: -14.165001449746644,
            z: 0
        },
        params: {}
    }, {
        id: 25,
        type: "item",
        position: {
            x: 167.12028631041727,
            y: 2524,
            z: 109.48175209789981
        },
        rotation: {
            x: 0,
            y: -13.537851290773784,
            z: 0
        },
        params: {}
    }, {
        id: 26,
        type: "item",
        position: {
            x: 167.1275714277775,
            y: 2486,
            z: 109.47704888852974
        },
        rotation: {
            x: 0,
            y: -13.476501048827535,
            z: 0
        },
        params: {}
    }, {
        id: 27,
        type: "item",
        position: {
            x: 167.13799051237345,
            y: 2394.833896337363,
            z: 109.4658584221775
        },
        rotation: {
            x: 0,
            y: -12.584000562051878,
            z: 0
        },
        params: {}
    }, {
        id: 28,
        type: "item",
        position: {
            x: 167.1348190813423,
            y: 2277.6802083486427,
            z: 109.45368566603747
        },
        rotation: {
            x: 0,
            y: -12.048500562051894,
            z: 0
        },
        params: {}
    }, {
        id: 29,
        type: "item",
        position: {
            x: 167.12886812354034,
            y: 2194.724363629904,
            z: 109.44477208419895
        },
        rotation: {
            x: 0,
            y: -12.043202712834136,
            z: 0
        },
        params: {}
    }, {
        id: 30,
        type: "item",
        position: {
            x: 167.11798636230213,
            y: 2065.5178543660923,
            z: 109.43641283213582
        },
        rotation: {
            x: 0,
            y: -11.151830300176298,
            z: 0
        },
        params: {}
    }, {
        id: 31,
        type: "item",
        position: {
            x: 167.11238614906864,
            y: 2000.5925244032308,
            z: 109.43515690451088
        },
        rotation: {
            x: 0,
            y: -11.181504310340694,
            z: 0
        },
        params: {}
    }, {
        id: 32,
        type: "item",
        position: {
            x: 167.10749547691304,
            y: 1944.8421514067259,
            z: 109.4342369745532
        },
        rotation: {
            x: 0,
            y: -11.181500562051944,
            z: 0
        },
        params: {}
    }, {
        id: 33,
        type: "item",
        position: {
            x: 167.0916303217597,
            y: 1745.170677462793,
            z: 109.43833775114079
        },
        rotation: {
            x: 0,
            y: -9.728001427542099,
            z: 0
        },
        params: {}
    }, {
        id: 34,
        type: "item",
        position: {
            x: 167.08739782324608,
            y: 1653.8546471033717,
            z: 109.44665305041215
        },
        rotation: {
            x: 0,
            y: -9.785547808790552,
            z: 0
        },
        params: {}
    }, {
        id: 35,
        type: "item",
        position: {
            x: 167.10010127782755,
            y: 1338.6948565488347,
            z: 109.4720055261445
        },
        rotation: {
            x: 0,
            y: -7.764500562051888,
            z: 0
        },
        params: {}
    }, {
        id: 24,
        type: "item",
        position: {
            x: 167.11615684661317,
            y: 1118.084171784938,
            z: 109.4728150012228
        },
        rotation: {
            x: 0,
            y: -7.917500563459066,
            z: 0
        },
        params: {}
    }, {
        id: 36,
        type: "item",
        position: {
            x: 167.1216492363986,
            y: 1075.3174555335395,
            z: 109.47316434188427
        },
        rotation: {
            x: 0,
            y: -7.917500562051888,
            z: 0
        },
        params: {}
    }, {
        id: 37,
        type: "item",
        position: {
            x: 167.14431574447224,
            y: 904.4023217958429,
            z: 109.4677203546959
        },
        rotation: {
            x: 0,
            y: -7.280000562051901,
            z: 0
        },
        params: {}
    }, {
        id: 38,
        type: "item",
        position: {
            x: 167.1611086491175,
            y: 734.2870154319738,
            z: 109.46017187185062
        },
        rotation: {
            x: 0,
            y: -7.611500562051862,
            z: 0
        },
        params: {}
    }, {
        id: 39,
        type: "item",
        position: {
            x: 167.16748912438194,
            y: 670.0128401794772,
            z: 109.4586408443924
        },
        rotation: {
            x: 0,
            y: -7.726275221208685,
            z: 0
        },
        params: {}
    }, {
        id: 40,
        type: "item",
        position: {
            x: 167.1756239419747,
            y: 616.8293156421404,
            z: 109.45789956376437
        },
        rotation: {
            x: 0,
            y: -7.764500562034925,
            z: 0
        },
        params: {}
    }, {
        id: 41,
        type: "item",
        position: {
            x: 167.20571103921372,
            y: 404.28374952686045,
            z: 109.45712717464149
        },
        rotation: {
            x: 0,
            y: -8.121500562051894,
            z: 0
        },
        params: {}
    }, {
        id: 42,
        type: "item",
        position: {
            x: 167.21811727615628,
            y: 328.4184438084666,
            z: 109.47060518660442
        },
        rotation: {
            x: 0,
            y: -8.580500562051894,
            z: 0
        },
        params: {}
    }]
}),
function () {
    function a(a) {
        a = $(a);
        for (var b = !1, c = 0, d = 100, e = !1, f = "", g = [], h = a.find("ul").height() / 2, i = a.find("ul li"), j = i.length, k = 0; j > k; k++) g[k] = -1;
        var l = function (a) {
                for (var b = "" + a; b.length < j;) b = "0" + b;
                return b
            },
            m = function (a, c, d) {
                var e = [],
                    g = "" + a;
                if (g != f && !b) {
                    f = g, g = l(g);
                    for (var h = g.split(""), k = h.length, m = 0; k > m; m++) e.push({
                        li: i[m],
                        num: h[m]
                    });
                    for (var o = k; j > o; o++) e.push({
                        li: i[o],
                        num: ""
                    });
                    n(e, c, d)
                }
            },
            n = function (a, f, i) {
                function j(k) {
                    i || (i = d);
                    var l = $(k.li),
                        m = k.num,
                        n = i,
                        o = l.find("div.top"),
                        p = l.find("div.bottom"),
                        q = l.find("div.flip-top"),
                        r = l.find("div.flip-bottom");
                    return "" === m ? (q.html(m), r.html(m), o.html(m), p.html(m), a.length ? j(a.shift()) : f && f(), void 0) : (e || g[a.length] != m ? (c++, b = !0, g[a.length] = m, p.css("top", "-" + h + "px"), o.stop().animate({
                        height: "0"
                    }, 200, "easeInQuad", function () {
                        o.html(m), o.height(h), p.stop().animate({
                            top: "0"
                        }, 400, "easeOutBounce", function () {
                            r.html(m), c--, 0 >= c && (b = !1)
                        })
                    })) : n = 0, a.length ? setTimeout(function () {
                        j(a.shift())
                    }, n) : f && f(), q.html(m), p.html(m), void 0)
                }
                j(a.shift())
            };
        return {
            update: m
        }
    }
    window.global = window.global || {}, window.global.instrument = window.global.instrument || {}, window.global.instrument.counter = a
}(window), mapdive.viewport = function () {
    function a() {
        x = new mapdive.MapManagerCSS({
            camera: y,
            scene: z,
            mapContainerId: "map-container",
            cssViewportId: "css-viewport",
            screenWidth: viewportMetrics.width,
            screenHeight: viewportMetrics.height,
            FOV: viewportMetrics.FOV
        })
    }

    function b() {
        z = new THREE.Scene, y = new THREE.PerspectiveCamera(viewportMetrics.FOV, viewportMetrics.width / viewportMetrics.height, 1, 1e5), y.up.set(0, 1, 0), y.position.set(0, 0, 0);
        var a = document.getElementById("vertexShader").textContent,
            b = document.getElementById("fragmentShader").textContent;
        F = {
            topColor: {
                type: "c",
                value: new THREE.Color(7062762)
            },
            bottomColor: {
                type: "c",
                value: new THREE.Color(7062762)
            },
            offset: {
                type: "f",
                value: 0
            },
            exponent: {
                type: "f",
                value: .18
            }
        };
        var c = new THREE.SphereGeometry(25e3, 24, 16, 0, 2 * Math.PI, 0, Math.PI),
            d = new THREE.ShaderMaterial({
                fog: !1,
                vertexShader: a,
                fragmentShader: b,
                uniforms: F,
                side: THREE.BackSide
            });
        E = new THREE.Mesh(c, d), E.position.y = 2500, z.add(E), z.add(new THREE.AmbientLight(5263440, .01)), M = new THREE.DirectionalLight(9474192, 1), M.castShadows = !1, M.position.set(-.7, 1, -.5), M.position.normalize(), z.add(M);
        var e = document.getElementById("webgl-viewport");
        A = new THREE.WebGLRenderer({
            precision: "highp",
            antialias: !0,
            stencil: !1,
            premultipliedAlpha: !0
        }), A.sortObjects = !1, A.setSize(viewportMetrics.width, viewportMetrics.height), e.appendChild(A.domElement)
    }

    function c() {
        switch (viewportMetrics.viewIndex) {
        case 0:
            Q.push(new PlayerHUD);
            break;
        case -3:
            Q.push(new MiniMapHUD), Q.push(new CopyrightHUD);
            break;
        case 3:
            Q.push(new MapInfoHUD)
        }
        for (var a = 0; a < Q.length; a++) Q[a].initialize();
        $("#HUD > [data-active='false']").remove()
    }

    function d() {
        var a = e(R.behavior);
        if (H.t - R.transitionStart < R.transitionDuration) {
            var b = 1 - (H.t - R.transitionStart) / R.transitionDuration;
            b = Easing.easeInOutQuad(0, b, 0, 1, 1);
            var c = e(R.previousBehavior);
            a.target.lerp(c.target, b), a.position.lerp(c.position, b)
        }
        R.target.copy(a.target), y.position.copy(a.position), y.lookAt(a.target), R.x = y.position.x / P, R.z = y.position.z / P
    }

    function e(a) {
        switch (a) {
        case "chase":
            return k();
        case "idle":
        case "idle-side":
        case "idle-above":
            return m(a);
        case "idle-ui":
            return l();
        case "intro_climb":
        case "intro_float":
        case "intro_swoop":
            return i(a);
        case "closeup":
            return j();
        case "editor-persp":
        case "editor-top":
        case "editor-side":
            return h(a);
        case "end-player1":
        case "end-landmark1":
        case "end-landmark2":
        case "end-landmark3":
        case "end-player2":
        case "end-lose1":
            return g(a);
        case "countdown":
            return n();
        case "start-engine":
            return f();
        default:
            return k()
        }
    }

    function f() {
        var a = m("idle");
        return a.target.y += 75, a
    }

    function g(a) {
        var b = new THREE.Vector3,
            c = new THREE.Vector3,
            d = new THREE.Vector3,
            e = 0,
            f = 0,
            g = 0,
            h = H.t - R.transitionStart;
        switch (a) {
        case "end-player1":
            b.copy(B.getPosition()), c.copy(D.position), g = 0;
            break;
        case "end-landmark2":
            b.copy(C.position), b.y = 100, c.copy(B.getPosition()), c.y = 0, e = .1 * h, g = 250 + 50 * h, f = .25 * Math.PI;
            break;
        case "end-landmark1":
            b.copy(B.getPosition()), c.copy(C.position), c.y = 280, f = .78 * Math.PI, e = .5 * Math.PI, g = 330;
            break;
        case "end-player2":
            b.copy(B.getPosition()), c.copy(C.position), c.y = 100, e = 0, f = .5 * Math.PI, g = 100;
            break;
        case "end-lose1":
            b.copy(B.getPosition()), c.copy(B.getPosition()), e = .4 * h, g = 150 + 20 * h, f = .2 * Math.PI
        }
        return d.set(Math.cos(e) * Math.sin(f) * g, Math.cos(f) * g, Math.sin(e) * Math.sin(f) * g), c.add(d), {
            position: c,
            target: b
        }
    }

    function h(a) {
        var b = {
                "editor-top": [1, 50, 0],
                "editor-persp": [55, 65, 0],
                "editor-side": [50, 0, toRadians(90)]
            },
            c = new THREE.Vector3,
            d = new THREE.Vector3,
            e = H.player.dir[0] + b[a][2];
        return d.x = B.getPosition().x - Math.cos(e) * b[a][0], d.y = B.getPosition().y + b[a][1], d.z = B.getPosition().z - Math.sin(e) * b[a][0], c.x = B.getPosition().x, c.y = B.getPosition().y, c.z = B.getPosition().z, {
            position: d,
            target: c
        }
    }

    function i(a) {
        var b = new THREE.Vector3,
            c = new THREE.Vector3,
            d = H.player.dir[0];
        H.player.dir[2];
        var e = 1e3 * H.t,
            f = 6 * Math.sin(25e-5 * e) * Math.sin(14e-5 * e + 2) + 25;
        switch (f += 80, a) {
        case "intro_climb":
            c.x = B.getPosition().x - Math.cos(d) * f, c.y = R.introStartY, c.z = B.getPosition().z - Math.sin(d) * f;
            break;
        case "intro_float":
            c.x = G.origin.position.x * P - Math.cos(G.origin.rotation.y) * f, c.y = 4e3, c.z = G.origin.position.z * P - Math.sin(G.origin.rotation.y) * f;
            break;
        case "intro_swoop":
            c.x = G.origin.position.x * P - Math.cos(G.origin.rotation.y) * (f / 2.5), c.y = 4110, c.z = G.origin.position.z * P - Math.sin(G.origin.rotation.y) * (f / 2.5)
        }
        return b.x = B.getPosition().x, b.y = B.getPosition().y, b.z = B.getPosition().z, {
            position: c,
            target: b
        }
    }

    function j() {
        var a = new THREE.Vector3,
            b = new THREE.Vector3,
            c = H.player.dir[0];
        H.player.dir[2];
        var d = 1e3 * H.t,
            e = 6 * Math.sin(25e-5 * d) * Math.sin(14e-5 * d + 2) + 25;
        return e += 20, b.x = B.getPosition().x - Math.cos(c) * e, b.y = B.getPosition().y + 5 + Math.sin(25e-5 * d) * Math.sin(14e-5 * d + 2), b.z = B.getPosition().z - Math.sin(c) * e, a.x = B.getPosition().x, a.y = B.getPosition().y, a.z = B.getPosition().z, {
            position: b,
            target: a
        }
    }

    function k() {
        var a = new THREE.Vector3,
            b = new THREE.Vector3,
            c = H.player.dir[0];
        H.player.dir[2];
        var d = 1e3 * H.t,
            e = 25 * Math.sin(25e-5 * d) * Math.sin(14e-5 * d + 2) + 80;
        e += 35, e += 30 * H.cam.speed;
        var f = toRadians(65 + 11 * H.cam.speed),
            g = .4;
        return b.x = B.getPosition().x - Math.cos(c) * e * Math.cos(f) + .05 * Math.sin(.0011 * d) * Math.sin(1e-4 * d + 1) * e * g, b.y = B.getPosition().y + 1.1 * Math.sin(f) * e + .2 * Math.sin(4e-4 * d) * Math.sin(2e-4 * d + 2) * e * g, b.z = B.getPosition().z - Math.sin(c) * e * Math.cos(f) + .05 * Math.sin(13e-5 * d) * Math.sin(1e-4 * d + 3) * e * g, a.x = B.getPosition().x + .35 * .025 * Math.sin(.0013 * d + 2) * Math.sin(17e-5 * d + 3) * e * g, a.y = B.getPosition().y + .5 * .025 * Math.sin(.0023 * d + 1) * Math.sin(13e-5 * d + 2) * e * g, a.z = B.getPosition().z + .5 * .025 * Math.sin(.0017 * d + 4) * Math.sin(11e-5 * d + 1) * e * g, {
            position: b,
            target: a
        }
    }

    function l() {
        var a = new THREE.Vector3,
            b = new THREE.Vector3,
            c = H.player.dir[0];
        H.player.dir[2];
        var d = 1e3 * H.t,
            e = .35,
            f = 250,
            e = .4;
        f = 40 * Math.sin(25e-5 * d) * Math.sin(14e-5 * d + 2) + 170;
        var g = toRadians(40 + 20 * Math.cos(125e-6 * d) * Math.sin(2e-5 * d + 2));
        return c += Math.PI / 2, b.x = B.getPosition().x - Math.cos(c) * f * Math.cos(g) + .05 * Math.sin(.0011 * d) * Math.sin(1e-4 * d + 1) * f * e, b.y = B.getPosition().y - 100 + 1.1 * Math.sin(g) * f + .2 * Math.sin(4e-4 * d) * Math.sin(2e-4 * d + 2) * f * e, b.z = B.getPosition().z - Math.sin(c) * f * Math.cos(g) + .05 * Math.sin(13e-5 * d) * Math.sin(1e-4 * d + 3) * f * e, a.x = B.getPosition().x + .35 * .025 * Math.sin(.0013 * d + 2) * Math.sin(17e-5 * d + 3) * f * e, a.y = B.getPosition().y + .5 * .025 * Math.sin(.0023 * d + 1) * Math.sin(13e-5 * d + 2) * f * e, a.z = B.getPosition().z + .5 * .025 * Math.sin(.0017 * d + 4) * Math.sin(11e-5 * d + 1) * f * e, {
            position: b,
            target: a
        }
    }

    function m(a) {
        var b = new THREE.Vector3,
            c = new THREE.Vector3,
            d = H.player.dir[0];
        H.player.dir[2];
        var e = 1e3 * H.t,
            f = .35,
            g = 40;
        switch (a) {
        case "idle":
            g = 60 * Math.sin(25e-5 * e) * Math.sin(14e-5 * e + 2) + 140;
            var h = toRadians(30 + 30 * Math.cos(125e-6 * e) * Math.sin(2e-5 * e + 2));
            c.x = B.getPosition().x - Math.cos(d) * g * Math.cos(h) + .05 * Math.sin(.0011 * e) * Math.sin(1e-4 * e + 1) * g * f, c.y = B.getPosition().y + 1.1 * Math.sin(h) * g + .2 * Math.sin(4e-4 * e) * Math.sin(2e-4 * e + 2) * g * f, c.z = B.getPosition().z - Math.sin(d) * g * Math.cos(h) + .05 * Math.sin(13e-5 * e) * Math.sin(1e-4 * e + 3) * g * f;
            break;
        case "idle-above":
            var f = .55;
            g = 80 * Math.sin(25e-5 * e) * Math.sin(14e-5 * e + 2) + 350;
            var h = toRadians(65 + 10 * Math.cos(125e-6 * e) * Math.sin(2e-5 * e + 2));
            c.x = B.getPosition().x - Math.cos(d) * g * Math.cos(h) + .05 * Math.sin(.0011 * e) * Math.sin(1e-4 * e + 1) * g * f, c.y = B.getPosition().y + 1.1 * Math.sin(h) * g + .2 * Math.sin(4e-4 * e) * Math.sin(2e-4 * e + 2) * g * f, c.z = B.getPosition().z - Math.sin(d) * g * Math.cos(h) + .05 * Math.sin(13e-5 * e) * Math.sin(1e-4 * e + 3) * g * f;
            break;
        case "idle-side":
            var f = .4;
            g = 40 * Math.sin(25e-5 * e) * Math.sin(14e-5 * e + 2) + 70;
            var h = toRadians(40 + 20 * Math.cos(125e-6 * e) * Math.sin(2e-5 * e + 2));
            d += Math.PI / 2, c.x = B.getPosition().x - Math.cos(d) * g * Math.cos(h) + .05 * Math.sin(.0011 * e) * Math.sin(1e-4 * e + 1) * g * f, c.y = B.getPosition().y + 1.1 * Math.sin(h) * g + .2 * Math.sin(4e-4 * e) * Math.sin(2e-4 * e + 2) * g * f, c.z = B.getPosition().z - Math.sin(d) * g * Math.cos(h) + .05 * Math.sin(13e-5 * e) * Math.sin(1e-4 * e + 3) * g * f
        }
        return b.x = B.getPosition().x + .35 * .025 * Math.sin(.0013 * e + 2) * Math.sin(17e-5 * e + 3) * g * f, b.y = B.getPosition().y + .5 * .025 * Math.sin(.0023 * e + 1) * Math.sin(13e-5 * e + 2) * g * f, b.z = B.getPosition().z + .5 * .025 * Math.sin(.0017 * e + 4) * Math.sin(11e-5 * e + 1) * g * f, {
            position: c,
            target: b
        }
    }

    function n() {
        var a = new THREE.Vector3,
            b = new THREE.Vector3,
            c = H.player.dir[0];
        H.player.dir[2];
        var d = 1e3 * H.t,
            e = 25 * Math.sin(25e-5 * d) * Math.sin(14e-5 * d + 2) + 40;
        e += 40 * H.cam.speed;
        var f = toRadians(30),
            g = 1.5,
            h = .9;
        return d *= h, b.x = B.getPosition().x - Math.cos(c) * e * Math.cos(f) + .05 * Math.sin(.0011 * d) * Math.sin(1e-4 * d + 1) * e * g, b.y = B.getPosition().y + 1.1 * Math.sin(f) * e + .2 * Math.sin(4e-4 * d) * Math.sin(2e-4 * d + 2) * e * g, b.z = B.getPosition().z - Math.sin(c) * e * Math.cos(f) + .05 * Math.sin(13e-5 * d) * Math.sin(1e-4 * d + 3) * e * g, a.x = B.getPosition().x + .35 * .025 * Math.sin(.0013 * d + 2) * Math.sin(17e-5 * d + 3) * e * g, a.y = B.getPosition().y + .5 * .025 * Math.sin(.0023 * d + 1) * Math.sin(13e-5 * d + 2) * e * g, a.z = B.getPosition().z + .5 * .025 * Math.sin(.0017 * d + 4) * Math.sin(11e-5 * d + 1) * e * g, {
            position: b,
            target: a
        }
    }

    function o(a) {
        for (var b = 0; b < N.length; b++) N[b].update(a.t, y, B)
    }

    function p() {
        for (var a = 0; a < N.length; a++) z.remove(N[a].getObject3d()), N[a].dispose();
        N = []
    }

    function q(a) {
        for (var b = 0; b < N.length; b++) N[b].type == a && (z.remove(N[b].getObject3d()), N[b].dispose(), N.splice(b, 1), N.length > 0 && b--)
    }

    function r(a) {
        p(), G = mapdive.getLevelByName(a.name), B.initialize();
        for (var b = !1, c = 0; c < G.entities.length; c++) {
            var d = G.entities[c];
            if ("gate" == d.type) {
                var e = new mapdive.GateEntity(d.id, {
                    end_gate: d.params.last,
                    model: assetManager.getModel("gate_" + a.gateStyle),
                    style: I,
                    position: {
                        x: d.position.x * P,
                        y: d.position.y,
                        z: d.position.z * P
                    },
                    rotation: {
                        x: d.rotation.x,
                        y: d.rotation.y,
                        z: d.rotation.z
                    },
                    scale: 1
                });
                z.add(e.getObject3d()), N.push(e), d.params.last && (b = !0, D = e.getObject3d())
            }
            if ("landmark" == d.type) {
                mapdive.getLandmarkParams(d.model);
                var f = new mapdive.LandmarkEntity(d.id, {
                    modelName: d.model,
                    model: assetManager.getModel(d.model),
                    style: I,
                    position: {
                        x: d.position.x * P,
                        y: d.position.y,
                        z: d.position.z * P
                    },
                    rotation: {
                        x: 0,
                        y: d.rotation.y,
                        z: 0
                    },
                    scale: 1
                });
                z.add(f.getObject3d()), N.push(f), C = f.getObject3d();
                var g = f.getObject3d().position,
                    h = new mapdive.FireworksEntity("fireworks", {
                        position: g,
                        scale: 1
                    });
                z.add(h.getObject3d()), N.push(h), x.setTarget(d.position.x, d.position.z)
            }
            if ("item" == d.type) {
                var i = new mapdive.ItemEntity(d.id, {
                    model: assetManager.getModel("star"),
                    style: I,
                    position: {
                        x: d.position.x * P,
                        y: d.position.y,
                        z: d.position.z * P
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    scale: 1
                });
                z.add(i.getObject3d()), N.push(i)
            }
            if ("bonus" == d.type) {
                J = a.bonusStyle;
                var i = new mapdive.BonusEntity(d.id, {
                    model: assetManager.getModel("bonus_" + J),
                    texture: assetManager.getTexture("bonus_" + J),
                    position: {
                        x: d.position.x * P,
                        y: d.position.y,
                        z: d.position.z * P
                    },
                    rotation: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    scale: 2
                });
                z.add(i.getObject3d()), N.push(i)
            }
        }!b && e && (D = e.getObject3d()), B.addTrails();
        var j = new mapdive.CylinderEntity("cylinder", {
            position: C.position,
            scale: 1
        });
        z.add(j.getObject3d()), N.push(j);
        for (var c = 0; 20 > c; c++) {
            var k = 2e3 * Math.random() + 350,
                l = 2 * Math.random() * Math.PI,
                m = new mapdive.BillboardEntity("cloud" + c, {
                    position: {
                        x: C.position.x + Math.cos(l) * k,
                        y: randomRange(300, 1500),
                        z: C.position.z + Math.sin(l) * k
                    },
                    texture: assetManager.getTexture("cloud"),
                    scale: randomRange(1, 3),
                    opacity: randomRange(.55, .75)
                });
            z.add(m.getObject3d()), N.push(m)
        }
        randomRange(0, 250);
        for (var n = Math.cos(G.origin.rotation.y), o = Math.sin(G.origin.rotation.y), c = 0; 10 > c; c++) {
            var k = 80 * Math.random() + 20,
                l = 2 * Math.random() * Math.PI,
                m = new mapdive.BillboardEntity("top_cloud", {
                    position: {
                        x: n + G.origin.position.x * P + Math.cos(l) * k,
                        y: randomRange(3950, 4e3),
                        z: o + G.origin.position.z * P + Math.sin(l) * k
                    },
                    texture: assetManager.getTexture("cloud"),
                    scale: randomRange(.15, .25),
                    opacity: randomRange(.7, .9)
                });
            z.add(m.getObject3d()), N.push(m)
        }
        var m = new mapdive.TransitionCloudEntity("transition_cloud", {
            position: {
                x: G.origin.position.x * P + Math.cos(l) * k,
                y: 1e4,
                z: G.origin.position.z * P + Math.sin(l) * k
            },
            texture: assetManager.getTexture("cloud"),
            scale: 4
        });
        z.add(m.getObject3d()), N.push(m);
        for (var c = 0; c < Q.length; c++) "function" == typeof Q[c].reset && Q[c].reset();
        I = a.baseStyle, t(a.baseStyle);
        for (var c = 0; c < Q.length; c++) "function" == typeof Q[c].setStyle && Q[c].setStyle(a.baseStyle, viewStyles[a.baseStyle])
    }

    function s() {
        if (O) {
            A.render(z, y), x.update(R, H), 0 == R.behavior.indexOf("end") ? x.setZoomLevel(12) : 0 == R.behavior.indexOf("idle") ? x.setZoomLevel(11) : x.setZoomLevel(w(y.position.y)), x.render();
            for (var a = 0; a < Q.length; a++) Q[a].update(H)
        }
    }

    function t(a) {
        var b = new THREE.Color(viewStyles[a].sky),
            c = new THREE.Color(viewStyles[a].horizon);
        $({
            c: 0
        }).animate({
            c: 1
        }, {
            duration: 3e3,
            step: function (a) {
                F.topColor.value.lerp(b, a), F.bottomColor.value.lerp(c, a), x.setHorizonColor(F.bottomColor.value)
            }
        }), viewStyles[a].lights && (M.color.setStyle(viewStyles[a].lights.sun), L.groundColor.setStyle(viewStyles[a].lights.ground), L.color.setStyle(viewStyles[a].lights.sky)), B.setStyle(a, viewStyles[a]), x.setStyle(a, viewStyles[a]);
        for (var d = 0; d < Q.length; d++) "function" == typeof Q[d].setStyle && Q[d].setStyle(a, viewStyles[a]);
        for (var d = 0; d < N.length; d++) N[d].message({
            style: a,
            params: viewStyles[a]
        })
    }

    function u(a) {
        if (a.messages)
            for (var b = 0; b < a.messages.length; b++) a.messages[b].t = a.state.t, v(a.messages[b]);
        H = a.state, B.getPosition().x = Number(H.player.pos[0]) * P, B.getPosition().y = Number(H.player.pos[1]), B.getPosition().z = Number(H.player.pos[2]) * P, B.setHeading(Number(-H.player.dir[0] - Math.PI / 2)), B.setRoll(H.player.dir[2] + Math.PI / 2), B.setPitch(-H.player.dir[1] - Math.PI / 2 + toRadians(15)), B.update(H), d(), E.position.copy(y.position), E.position.y = 2500, o(H)
    }

    function v(a) {
        if (a.level && r(a.level), a.maptype && t(a.maptype), a.bonusmode && ("bonus" == a.bonusmode ? (K = !0, t(J)) : (K = !1, t(I))), a.mapzoom && x.setZoomEnabled("on" == a.mapzoom), a.viewOffset && (viewportMetrics.viewAngleOffset = parseFloat(a.viewOffset), y.rotation.set(0, (180 + viewportMetrics.viewIndex * viewportMetrics.viewAngleOffset) * Math.PI / 180, 0)), a.hud)
            for (var b = 0; b < Q.length; b++) switch (a.hud) {
            case "show":
                Q[b].show();
                break;
            case "hide":
                Q[b].hide();
                break;
            default:
                "function" == typeof Q[b].message && Q[b].message(a)
            }
        if (a.zoom && x.setZoomLevel(Number(a.zoom)), a.entity)
            for (var b = 0; b < N.length; b++) N[b].id == a.entity && N[b].message(a);
        if (a.camera) switch (R.transitionStart = a.t, R.previousBehavior = R.behavior, R.transitionDuration = Number(a.duration), R.behavior = a.camera, R.behavior) {
        case "intro_climb":
            R.introStartY = B.getPosition().y
        }
    }

    function w(a) {
        return a > 2048 ? 10 : a > 1024 ? 11 : a > 512 ? 12 : a > 256 ? 13 : a > 128 ? 14 : 15
    }
    var x, y, z, A, B, C, D, E, F, G = mapdive.getLevelByName("statue of liberty"),
        H = {
            player: {
                pos: [0, 0, 0],
                dir: [0, 0, 0]
            },
            cam: {
                pos: [0, 0, 0],
                speed: 0
            },
            gates: 0,
            stars: 0
        },
        I = "default",
        J = "",
        K = !1,
        L = null,
        M = null,
        N = [],
        O = !1,
        P = 4096,
        Q = [],
        R = {
            previousBehavior: "",
            behavior: "idle-ui",
            behaviorChangeTime: 0,
            transitionStart: 0,
            transitionDuration: 0,
            x: 40.77799111111109,
            y: 200,
            z: 91.65824101821511,
            target: new THREE.Vector3,
            speed: 0,
            orbit: 0,
            inclination: 0,
            distance: 0,
            introStartY: 0
        };
    return {
        initialize: function () {
            b(), a(), O = !0, B = new mapdive.Player({
                scene: z
            }), r({
                name: "statue of liberty",
                gateStyle: 0,
                baseStyle: "default",
                bonusStyle: "scifi"
            }), c()
        },
        updateViewState: function (a) {
            u(a)
        },
        render: function () {
            s()
        },
        getScene: function () {
            return z
        },
        getsState: function () {
            return H
        },
        currentBonusStyle: J,
        bonusModeActive: K,
        resize: function (a, b) {
            y.aspect = a / b, y.updateProjectionMatrix(), A.setSize(a, b), x.setSize(a, b)
        },
        removeEntitiesByType: q,
        camera: function () {
            return y
        }
    }
}(), mapdive.ItemEntity = function (a, b) {
    var c = a,
        d = b,
        e = null,
        f = new THREE.MeshPhongMaterial({
            specular: 16777215,
            shininess: 100,
            map: assetManager.getTextureForStyle("star", b.style),
            opacity: 1,
            transparent: !0,
            emissive: 7895160,
            color: 16777215,
            overdraw: !0
        }),
        e = d.model.clone();
    e.traverse(function (a) {
        a instanceof THREE.Mesh && (a.material = f)
    }), e.position.x = d.position.x, e.position.y = d.position.y, e.position.z = d.position.z, e.rotation.x = d.rotation.x, e.rotation.y = d.rotation.y, e.rotation.z = d.rotation.z, e.scale.set(d.scale, d.scale, d.scale);
    var g = 360 * Math.random(),
        h = randomRange(1.5, 2);
    randomRange(0, 2 * Math.PI);
    var i = !1,
        j = 0,
        k = 1.3,
        l = {};
    return l.id = c, l.type = "item", l.message = function (a) {
        a.hit && (h *= 6, i || (i = !0), j = a.t), a.position && (d.position.x = a.position.x * mapScale, d.position.y = a.position.y, d.position.z = a.position.z * mapScale, e.position.x = d.position.x, e.position.y = d.position.y, e.position.z = d.position.z), a.rotation && (d.rotation.x = a.rotation.x, d.rotation.y = a.rotation.y, d.rotation.z = a.rotation.z, e.rotation.x = d.rotation.x, e.rotation.y = d.rotation.y, e.rotation.z = d.rotation.z), a.style && (f.map = assetManager.getTextureForStyle("star", a.style))
    }, l.update = function (a) {
        if (e.visible)
            if (i) {
                if (1 > a - j) {
                    b.scale + 2 * (a - j), e.position.y += k, k -= .1;
                    var c = 24 * a % 2;
                    f.opacity = 1 - (a - j) * c, c *= .8, c += .2, f.emissive.setRGB(c, c, c)
                } else e.traverse(function (a) {
                    a instanceof THREE.Mesh && (a.visible = !1)
                });
                e.children[0].rotation.y = b.rotation.y + h * a
            } else e.position.y = b.position.y + .1 * Math.sin(toRadians(90 * a + g)), e.children[0].rotation.y = b.rotation.y + h * a
    }, l.getObject3d = function () {
        return e
    }, l.dispose = function () {
        f.dispose()
    }, l
}, mapdive.BonusEntity = function (a, b) {
    var c = a,
        d = b,
        e = null,
        f = new THREE.MeshPhongMaterial({
            specular: 16777215,
            shininess: 100,
            map: d.texture ? d.texture : null,
            opacity: 1,
            transparent: !1,
            emissive: 9474192,
            color: 16777215,
            overdraw: !0
        }),
        e = d.model.clone();
    e.traverse(function (a) {
        a instanceof THREE.Mesh && (a.material = f)
    }), e.position.x = d.position.x, e.position.y = d.position.y, e.position.z = d.position.z;
    var g = 360 * Math.random(),
        h = new THREE.Vector3(randomRange(.7, 1.2), randomRange(.7, 1.2), randomRange(.7, 1.2));
    randomRange(0, 2 * Math.PI);
    var i = !1,
        j = 0,
        k = {};
    return k.id = c, k.type = "bonus", k.message = function (a) {
        a.hit && (f.emissive.setRGB(1, 1, 1), h.multiplyScalar(6), i || (i = !0), j = a.t), a.position && (d.position.x = a.position.x * mapScale, d.position.y = a.position.y, d.position.z = a.position.z * mapScale, e.position.x = d.position.x, e.position.y = d.position.y, e.position.z = d.position.z), a.style
    }, k.update = function (a) {
        if (e.visible)
            if (i) {
                if (1 > a - j) {
                    var c = b.scale * (1 - (a - j)),
                        d = a - j;
                    f.emissive.setRGB(d, d, d), e.scale.set(c, c, c)
                } else e.visible = !1;
                e.children[0].rotation.x = b.rotation.y = h.y * a, e.children[0].rotation.y = b.rotation.x = h.x * a, e.children[0].rotation.z = b.rotation.z = h.z * a
            } else {
                e.position.y = b.position.y + .1 * Math.sin(toRadians(90 * a + g)), e.children[0].rotation.x = b.rotation.y = h.y * a, e.children[0].rotation.y = b.rotation.x = h.x * a, e.children[0].rotation.z = b.rotation.z = h.z * a;
                var d = .6 + .4 * Math.sin(4 * a + 15 * (b.position.y / 4e3));
                f.emissive.setRGB(d, d, d)
            }
    }, k.getObject3d = function () {
        return e
    }, k.dispose = function () {
        f.dispose()
    }, k
}, mapdive.ObjEntity = function (a, b) {
    var c = a,
        d = b,
        e = null,
        f = new THREE.MeshPhongMaterial({
            emissive: 0,
            specular: 0,
            shininess: 20,
            map: d.textureName ? assetManager.getTexture(d.textureName + "_default") : null,
            opacity: 1,
            transparent: !1,
            color: 16777215,
            overdraw: !0
        }),
        e = d.model.clone();
    e.traverse(function (a) {
        a instanceof THREE.Mesh && (a.material = f)
    }), e.position.x = d.position.x, e.position.y = d.position.y, e.position.z = d.position.z, e.rotation.x = d.rotation.x, e.rotation.y = d.rotation.y, e.rotation.z = d.rotation.z, e.scale.set(d.scale, d.scale, d.scale);
    var g = {};
    return g.type = "obj", g.id = c, g.message = function (a) {
        a.position && (d.position.x = a.position.x * mapScale, d.position.y = a.position.y, d.position.z = a.position.z * mapScale, e.position.x = d.position.x, e.position.y = d.position.y, e.position.z = d.position.z), a.rotation && (d.rotation.x = a.rotation.x, d.rotation.y = a.rotation.y, d.rotation.z = a.rotation.z, e.rotation.x = d.rotation.x, e.rotation.y = d.rotation.y, e.rotation.z = d.rotation.z)
    }, g.update = function () {}, g.getObject3d = function () {
        return e
    }, g.dispose = function () {
        f.dispose()
    }, g
}, mapdive.LandmarkEntity = function (a, b) {
    var c = a,
        d = b,
        e = null,
        f = new THREE.MeshLambertMaterial({
            emissive: 6316128,
            specular: 0,
            shininess: 20,
            map: assetManager.getTextureForStyle("dropzone", d.style),
            opacity: 1,
            transparent: !1,
            color: 16777215,
            overdraw: !0
        }),
        g = new THREE.MeshLambertMaterial({
            emissive: 6316128,
            specular: 0,
            shininess: 20,
            map: assetManager.getTextureForStyle("base", d.style),
            opacity: 1,
            transparent: !1,
            color: 16777215,
            overdraw: !0
        }),
        e = new THREE.Object3D,
        h = d.model.clone();
    h.position.y = 9.04;
    var i = assetManager.getModel("landmark_base").clone();
    i.position.y = 0, i.material = g, e.add(i), e.add(h), h.traverse(function (a) {
        a instanceof THREE.Mesh && (a.material = f)
    }), i.traverse(function (a) {
        a instanceof THREE.Mesh && (a.material = g)
    }), e.position.x = d.position.x, e.position.y = d.position.y, e.position.z = d.position.z, e.rotation.x = d.rotation.x, e.rotation.y = d.rotation.y, e.rotation.z = d.rotation.z, e.scale.set(d.scale, d.scale, d.scale);
    var j = {};
    return j.type = "landmark", j.id = c, j.message = function (a) {
        a.position && (d.position.x = a.position.x * mapScale, d.position.y = a.position.y, d.position.z = a.position.z * mapScale, e.position.x = d.position.x, e.position.y = d.position.y, e.position.z = d.position.z), a.rotation && (d.rotation.x = a.rotation.x, d.rotation.y = a.rotation.y, d.rotation.z = a.rotation.z, e.rotation.x = d.rotation.x, e.rotation.y = d.rotation.y, e.rotation.z = d.rotation.z), a.style && (f.map = assetManager.getTextureForStyle("dropzone", a.style), g.map = assetManager.getTextureForStyle("base", a.style))
    }, j.update = function () {}, j.getObject3d = function () {
        return e
    }, j.dispose = function () {
        f.dispose()
    }, j
}, mapdive.GateEntity = function (a, b) {
    var c = !1,
        d = 0,
        e = a,
        f = b,
        g = new THREE.MeshLambertMaterial({
            emissive: 6316128,
            map: b.end_gate ? assetManager.getTexture("gate_start") : assetManager.getTextureForStyle("gate", b.style),
            color: 16777215
        }),
        h = f.model.clone();
    h.traverse(function (a) {
        a instanceof THREE.Mesh && (a.material = g)
    });
    var i = new THREE.Object3D;
    i.position.x = f.position.x, i.position.y = f.position.y, i.position.z = f.position.z, i.rotation.y = f.rotation.y, h.rotation.x = toRadians(-70), i.add(h), i.scale.set(f.scale, f.scale, f.scale);
    var j = 360 * Math.random(),
        k = randomRange(.2, .7);
    Math.random() > .5 && (k *= -1);
    var l = k,
        m = 0,
        n = {};
    return n.id = e, n.type = "gate", n.message = function (a) {
        if (a.hit && (g.color.set(0, 0, 0), c || (c = !0, d = a.t), l = 10), a.position && (f.position.x = a.position.x * mapScale, f.position.y = a.position.y, f.position.z = a.position.z * mapScale, i.position.x = f.position.x, i.position.y = f.position.y, i.position.z = f.position.z), a.rotation && (f.rotation.x = a.rotation.x, f.rotation.y = a.rotation.y, f.rotation.z = a.rotation.z, i.rotation.y = f.rotation.y), a.style) {
            switch (a.style) {
            case "scifi":
            case "burningman":
            case "scifi":
            case "8bit":
            case "raver":
            case "revolutions":
            case "terminal":
            case "volcano":
            case "night":
                l = 5 * k;
                break;
            default:
                g.color.setStyle("#ffffff"), g.emissive.setStyle("#606060"), l = k
            }
            g.map = f.end_gate && !mapdive.viewport.bonusModeActive ? assetManager.getTexture("gate_start") : assetManager.getTextureForStyle("gate", a.style)
        }
    }, n.update = function (a) {
        if (c)
            if (.5 > a - d) {
                var e = 2 * (a - d),
                    f = b.scale + 2 * e;
                i.children[0].rotation.z = b.rotation.z + l * a, i.scale.set(f, f, f), g.emissive.setRGB(e, e, e)
            } else g.opacity = 0, i.visible && (i.visible = !1, i.traverse(function (a) {
                a instanceof THREE.Mesh && (a.visible = !1)
            }));
        else {
            if (mapdive.viewport.bonusModeActive) switch (mapdive.viewport.currentBonusStyle) {
            case "scifi":
            case "burningman":
            case "scifi":
            case "8bit":
            case "revolutions":
            case "terminal":
            case "volcano":
                var h = 1 * Math.sin(20 * a + 15 * (b.position.y / 4e3));
                h = Math.max(.1, h), g.emissive.setRGB(h, h, h);
                break;
            case "night":
                var h = .4 + .4 * Math.sin(3 * a + 15 * (b.position.y / 4e3));
                h = Math.max(.1, h), g.emissive.setRGB(h, h, h);
                break;
            case "raver":
                var k = 4 * a % 1,
                    n = Math.sin(5 * a + 15 * (b.position.y / 4e3));
                g.emissive.setHSL(k, n, .5), g.color.setHSL(k, n, .5)
            }
            i.position.y = b.position.y + .1 * Math.sin(toRadians(90 * a + j)), i.children[0].rotation.z = b.rotation.z + l * a, i.visible && (g.opacity = Math.min(1, a - m))
        }
    }, n.getObject3d = function () {
        return i
    }, n.dispose = function () {
        g.dispose()
    }, n
}, mapdive.CylinderEntity = function (a, b) {
    var c, d = a,
        e = b,
        f = !0,
        g = ["uniform float time;", "varying vec2 vUv;", "void main() {", "	vUv=uv;", "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "	gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"),
        h = ["uniform float time;", "varying vec2 vUv;", "uniform vec3 color;", "void main() {", "	gl_FragColor = vec4(color,max(0.0,(0.25-vUv.y*vUv.y))*abs(sin(vUv.y*10.0-time*10.0)));", "}"].join("\n"),
        i = {
            time: {
                type: "f",
                value: 0
            },
            color: {
                type: "v3",
                value: new THREE.Vector3(0, 0, 0)
            }
        },
        j = new THREE.ShaderMaterial({
            uniforms: i,
            attributes: {},
            vertexShader: g,
            fragmentShader: h,
            blending: THREE.AdditiveBlending,
            depthTest: !0,
            side: THREE.DoubleSide,
            depthWrite: !1,
            transparent: !0
        }),
        k = new THREE.CylinderGeometry(120, 80, 80, 36, 1, !0);
    c = new THREE.Mesh(k, j), c.position.x = e.position.x, c.position.y = 40, c.position.z = e.position.z, c.scale.set(e.scale, e.scale, e.scale);
    var l = {};
    return l.id = d, l.type = "cylinder", l.message = function (a) {
        if (a.style) {
            var b = new THREE.Color(a.params.gradient);
            i.color.value.set(b.r, b.g, b.b)
        }
        1 == a.run ? (c.visible = !0, f = !0) : 0 == a.run && void 0 != a.run && (c.visible = !1, f = !1)
    }, l.update = function (a) {
        f && (i.time.value = a)
    }, l.getObject3d = function () {
        return c
    }, l.dispose = function () {}, l
}, mapdive.TransitionCloudEntity = function (a, b) {
    var c, d = a,
        e = b,
        f = 0,
        g = 0,
        h = !1,
        i = new THREE.MeshBasicMaterial({
            opacity: 0,
            transparent: !0,
            color: 16777215,
            depthTest: !1,
            depthWrite: !1,
            map: e.texture,
            fog: !1
        }),
        j = new THREE.PlaneGeometry(256, 256, 0, 0);
    c = new THREE.Mesh(j, i), c.position.x = e.position.x, c.position.y = e.position.y, c.position.z = e.position.z, c.scale.set(e.scale, e.scale, e.scale), c.frustumCulling = !1, c.rotation.x = toRadians(-90), c.visible = !1;
    var k = {};
    return k.id = d, k.type = "transitioncloud", k.message = function (a) {
        "fadein" == a.state ? (c.visible = !0, f = 1, g = a.t) : "fadeout" == a.state && (c.visible = !0, f = 2, g = a.t)
    }, k.update = function (a, b, d) {
        if (1 == f) {
            var e = Math.min(1, a - g);
            c.material.opacity = e, 1 == e && (h = !0)
        } else 2 == f && (h = !1, c.material.opacity = Math.max(0, 1 - (a - g)));
        var i = b.position.clone(),
            j = d.getPosition().clone();
        j.sub(i), j.normalize(), j.multiplyScalar(3), i.add(j), c.position.copy(i), c.lookAt(b.position)
    }, k.getObject3d = function () {
        return c
    }, k.dispose = function () {
        i.dispose()
    }, k
}, mapdive.BillboardEntity = function (a, b) {
    var c, d = a,
        e = b,
        f = randomRange(0, 2 * Math.PI),
        g = randomRange(-.025, .025),
        h = null !== b.opacity ? b.opacity : randomRange(.5, .75),
        i = new THREE.MeshBasicMaterial({
            opacity: h,
            transparent: !0,
            color: 16777215,
            depthTest: !0,
            depthWrite: !1,
            map: e.texture,
            fog: !1
        }),
        j = new THREE.PlaneGeometry(256, 256, 0, 0);
    c = new THREE.Mesh(j, i), c.position.x = e.position.x, c.position.y = e.position.y, c.position.z = e.position.z, c.rotation.z = randomRange(0, 2 * Math.PI), c.scale.set(e.scale, e.scale, e.scale), c.rotation.x = toRadians(-90);
    var k = {};
    return k.id = d, k.type = "billboard", k.message = function (a) {
        a.style && (c.visible = a.params.clouds ? !0 : !1), a.hide && (c.visible = !1)
    }, k.update = function (a, b) {
        if (c.visible) {
            var d = b.position.distanceTo(c.position),
                e = 100,
                j = 50;
            if (e > d) {
                var k = e - j;
                d = Math.max(0, d - j), i.opacity = d / k * h
            }
            c.lookAt(b.position), c.rotation.z = a * g + f
        }
    }, k.getObject3d = function () {
        return c
    }, k.dispose = function () {
        i.dispose()
    }, k
}, mapdive.FireworksEntity = function (a, b) {
    for (var c, d = a, e = b, f = !1, g = [], h = 10, i = 100, j = h * i, k = [], l = new THREE.Vector3(0, -2, 0), m = 100, n = m / 2, o = 250, p = 50, q = 1, r = 2, s = 1, t = 0, u = ["attribute float life;", "attribute float size;", "attribute vec4 customColor;", "varying vec4 vColor;", "void main() {", "	vColor = customColor;", "	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "	gl_PointSize = size * ( 300.0 / length( mvPosition.xyz ) );", "	gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"), v = ["uniform sampler2D texture;", "varying vec4 vColor;", "void main() {", "   vec2 uv = vec2(vColor.a, vColor.b);", "   vec4 sample = texture2D( texture, uv);", "   gl_FragColor = vec4(vColor.r, vColor.g, vColor.g, sample.r);", "}"].join("\n"), w = {
        size: {
            type: "f",
            value: []
        },
        customColor: {
            type: "v4",
            value: []
        },
        life: {
            type: "f",
            value: []
        }
    }, x = new THREE.ShaderMaterial({
        uniforms: {
            texture: {
                type: "t",
                value: assetManager.getTexture("particle")
            }
        },
        attributes: w,
        vertexShader: u,
        fragmentShader: v,
        depthTest: !0,
        depthWrite: !1,
        transparent: !0
    }), y = new THREE.Geometry, z = w.customColor.value, A = w.size.value, B = 0; j > B; B++) y.vertices.push(new THREE.Vector3(0, 0, 0)), k.push(new THREE.Vector3(0, 0, 0));
    y.dynamic = !0, c = new THREE.ParticleSystem(y, x);
    for (var B = 0; j > B; B++) z[B] = new THREE.Vector4(1, 1, 1, 1), A[B] = randomRange(4, 8);
    c.position.x = e.position.x, c.position.y = e.position.y, c.position.z = e.position.z, c.scale.set(e.scale, e.scale, e.scale);
    for (var B = 0; h > B; B++) {
        g.push({
            pos: new THREE.Vector3(Math.random() * m - n, 0, Math.random() * m - n),
            vel: new THREE.Vector3(0, o, 0),
            phase: 0,
            delay: 120 * Math.random(),
            type: 1,
            nextPhaseTime: 0
        });
        var C = new THREE.Color;
        C.setHSL(Math.random(), 1, .5);
        for (var D = B * i;
            (B + 1) * i > D; D++) w.customColor.value[D].x = C.r, w.customColor.value[D].y = C.g, w.customColor.value[D].z = C.b, w.customColor.value[D].w = 0
    }
    c.visible = !1;
    var E = function (a) {
            for (var b = 0; h > b; b++) g[b].phase = 0, g[b].nextPhaseTime = a + randomRange(.5 * s, 3 * s), F(b)
        },
        F = function (a) {
            var b = Math.floor(randomRange(0, 3)),
                c = randomRange(0, .2);
            c = .2 + 4 * c;
            for (var d = a * i;
                (a + 1) * i > d; d++) {
                var e = randomRange(0, .2) + c;
                switch (b) {
                case 0:
                    w.customColor.value[d].set(1, 0, e, 1);
                    break;
                case 1:
                    w.customColor.value[d].set(1, 1, e, 1);
                    break;
                case 2:
                    w.customColor.value[d].set(1, Math.round(Math.random()), e, 1)
                }
            }
        },
        G = {};
    return G.id = d, G.type = "fireworks", G.update = function (a) {
        var b = a - t;
        if (t = a, l.set(0, -.8 * b, 0), f) {
            for (var d = 0; h > d; d++) {
                if (a > g[d].nextPhaseTime) switch (g[d].phase) {
                case 0:
                    mapdive.sound.playFireworkLaunchSound();
                    for (var e = d * i;
                        (d + 1) * i > e; e++) w.customColor.value[e].w = 1, w.life.value[e] = randomRange(.5, 1.7);
                    g[d].nextPhaseTime = a + randomRange(.9 * q, 1.1 * q), g[d].phase = 1;
                    break;
                case 1:
                    g[d].nextPhaseTime = a + r, g[d].pos.set(Math.random() * m - n, 60 + 60 * Math.random(), Math.random() * m - n), mapdive.sound.playFireworkSound(), g[d].phase = 2;
                    for (var j = randomRange(0, .2), u = randomRange(3, 10), e = d * i;
                        (d + 1) * i > e; e++) {
                        c.geometry.vertices[e].copy(g[d].pos);
                        var v = 2 * Math.random() * Math.PI,
                            x = 2 * Math.random() * Math.PI,
                            y = randomRange(30, 100);
                        k[e].set(y * Math.cos(v) * Math.sin(x), y * Math.cos(x), y * Math.sin(v) * Math.sin(x)), k[e].multiplyScalar(randomRange(.0095, .01)), w.customColor.value[e].w = Math.random() * j, A[e] = u + randomRange(-.5, .5), w.size.needsUpdate = !0
                    }
                    break;
                case 2:
                    g[d].phase = 0, g[d].nextPhaseTime = a + randomRange(.75 * s, 2 * s), F(g[d]), g[d].vel.set(0, Math.random() * p + o, 0)
                }
                switch (g[d].phase) {
                case 2:
                    for (var e = d * i;
                        (d + 1) * i > e; e++) c.geometry.vertices[e].add(k[e]), k[e].add(l), k[e].multiplyScalar(.95), w.customColor.value[e].w += .5 * b, w.customColor.value[e].w = Math.min(1, w.customColor.value[e].w)
                }
            }
            w.customColor.needsUpdate = !0, c.geometry.verticesNeedUpdate = !0
        }
    }, G.message = function (a) {
        1 == a.run ? (f = !0, c.visible = !0, E(a.t)) : (f = !1, c.visible = !1)
    }, G.getObject3d = function () {
        return c
    }, G.dispose = function () {
        x.dispose(), y.dispose()
    }, G
}, mapdive.ConfettiEntity = function (a, b) {
    for (var c, d = a, e = b, f = !0, g = 400, h = {
        texture: {
            type: "t",
            value: assetManager.getTexture("particle")
        },
        time: {
            type: "f",
            value: 0
        },
        center: {
            type: "v3",
            value: new THREE.Vector3(0, 0, 0)
        }
    }, i = {
        freq: {
            type: "f",
            value: []
        },
        phase: {
            type: "f",
            value: []
        }
    }, j = ["const float WRAP_SIZE = 350.0;", "const float WRAP_HALF = 175.0;", "uniform float time;", "uniform vec3 center;", "attribute float freq;", "attribute float phase;", "varying vec4 vColor;", "void main() {", "   float v= abs(sin(time*freq+phase))*0.25+0.75;", "	vColor = vec4(1.0,1.0,1.0,1.0);", "	vec3 cent = vec3(center * 1.65);", "	vec4 pos = vec4( mod(position.x-cent.x, WRAP_SIZE) - WRAP_HALF, mod(position.y - cent.y, WRAP_SIZE) - WRAP_HALF, mod(position.z-cent.z, WRAP_SIZE) - WRAP_HALF, 1.0 );", "	vec4 mvPosition = modelViewMatrix * pos;", "	gl_PointSize = 24.0;", "	gl_Position = projectionMatrix * mvPosition;", "}"].join("\n"), k = ["uniform sampler2D texture;", "varying vec4 vColor;", "void main() {", "	gl_FragColor = vColor * texture2D( texture, gl_PointCoord );", "}"].join("\n"), l = new THREE.ShaderMaterial({
        uniforms: h,
        attributes: i,
        vertexShader: j,
        fragmentShader: k,
        depthTest: !0,
        depthWrite: !1,
        transparent: !0
    }), m = new THREE.Geometry, n = 0; g > n; n++) m.vertices.push(new THREE.Vector3(350 * Math.random() - 175, 350 * Math.random() - 175, 350 * Math.random() - 175));
    c = new THREE.ParticleSystem(m, l);
    for (var n = 0; g > n; n++) i.freq.value[n] = 1 * Math.random() + 4, i.phase.value[n] = Math.random() * Math.PI;
    i.freq.needsUpdate = !0, i.phase.needsUpdate = !0, c.position.x = e.position.x, c.position.y = e.position.y, c.position.z = e.position.z;
    var o = {};
    return o.id = d, o.type = "confetti", o.update = function (a, b) {
        f && (h.time.value = a, c.position.copy(b.position), h.center.value.copy(b.position))
    }, o.message = function () {}, o.getObject3d = function () {
        return c
    }, o.dispose = function () {}, o
}, mapdive.Player = function (a) {
    var b, c, d, e, f, g, h, i, j, k, l, m = a.scene,
        n = 0,
        o = 0,
        p = 0,
        q = 50,
        r = 0,
        s = !1,
        t = !1,
        u = !1,
        v = {};
    return v.setStyle = function (a, b) {
        for (var c = ["8bit", "burningman", "night", "raver", "revolutions", "scifi", "terminal", "volcano"], d = "default", e = 0; e < c.length; e++)
            if (c[e] == a) {
                d = a;
                break
            }
        h.map = assetManager.getTexture("helmet_" + d), i.map = assetManager.getTexture("head_" + d), j.map = assetManager.getTexture("body_" + d), k.map = assetManager.getTexture("backpack_" + d), l.color.setStyle(b.target)
    }, v.initialize = function () {
        if (!s) {
            h = new THREE.MeshPhongMaterial({
                emissive: 6710886,
                color: 16777215,
                map: assetManager.getTexture("helmet_default")
            }), i = new THREE.MeshLambertMaterial({
                emissive: 2826752,
                color: 16777215,
                map: assetManager.getTexture("head_default")
            }), j = new THREE.MeshLambertMaterial({
                emissive: 5263440,
                color: 16777215,
                map: assetManager.getTexture("body_default")
            }), k = new THREE.MeshLambertMaterial({
                emissive: 6710886,
                color: 16777215,
                map: assetManager.getTexture("backpack_default")
            });
            var a = new THREE.MeshPhongMaterial({
                    shininess: 280,
                    specular: 16777215,
                    transparent: !0,
                    opacity: .85,
                    color: 0
                }),
                n = assetManager.getModel("pegman");
            l = new THREE.MeshBasicMaterial({
                color: 16777215,
                side: THREE.DoubleSide,
                opacity: .35,
                transparent: !0,
                depthWrite: !1,
                depthTest: !0,
                renderDepth: 2
            }), c = new THREE.Geometry, d = new THREE.Geometry, e = new THREE.Ribbon(c, l), f = new THREE.Ribbon(d, l);
            for (var o = 0; q > o; o++) c.vertices.push(new THREE.Vector3), d.vertices.push(new THREE.Vector3);
            var r, t, u;
            n.traverse(function (b) {
                if (b instanceof THREE.Mesh) {
                    var c, d, e, f, g, l, m = new THREE.Matrix4;
                    switch (b.geometry.computeBoundingBox(), c = b.geometry.boundingBox.size(), d = b.geometry.boundingBox.min, e = b.geometry.boundingBox.max, b.material && b.material.dispose(), b.name) {
                    case "HELMET":
                        b.geometry.computeVertexNormals(), b.material = h;
                        break;
                    case "GLASSES":
                        b.geometry.computeVertexNormals(), b.material = a;
                        break;
                    case "BACKPACK":
                        b.material = k;
                        break;
                    case "HEAD":
                        b.geometry.computeVertexNormals(), b.material = i;
                        break;
                    case "CHEST":
                        b.material = j, r = d.x + c.x / 2, t = d.y + c.y / 2, u = d.z + c.z / 2;
                        break;
                    case "ARM_Left":
                        p = c.y, b.material = j, f = -d.x - c.x / 2, g = -e.y, l = -d.z - c.z / 2, m.makeTranslation(f, g, l), b.geometry.applyMatrix(m), b.position.set(-f, -g, -l);
                        break;
                    case "ARM_Right":
                        b.material = j, f = -d.x - c.x / 2, g = -e.y, l = -d.z - c.z / 2, m.makeTranslation(f, g, l), b.geometry.applyMatrix(m), b.position.set(-f, -g, -l);
                        break;
                    case "Leg_Left":
                        b.material = j, f = -d.x, g = -e.y, l = -d.z, m.makeTranslation(f, g, l), b.geometry.applyMatrix(m), b.position.set(-f, -g, -l);
                        break;
                    case "Leg_Right":
                        b.material = j, f = -d.x, g = -e.y, l = -e.z, m.makeTranslation(f, g, l), b.geometry.applyMatrix(m), b.position.set(-f, -g, -l)
                    }
                }
            });
            var v = new THREE.Vector3(-r, -t, -u);
            n.traverse(function (a) {
                a instanceof THREE.Mesh && a.position.add(v)
            }), g = assetManager.getModel("parachute");
            var w = new THREE.MeshPhongMaterial({
                    side: THREE.DoubleSide,
                    color: 16777215,
                    emissive: 5789784,
                    map: assetManager.getTexture("parachute")
                }),
                x = new THREE.MeshBasicMaterial({
                    side: THREE.DoubleSide,
                    color: 0,
                    transparent: !0,
                    opacity: .1
                });
            g.traverse(function (a) {
                if (a instanceof THREE.Mesh) switch (a.name) {
                case "CANOPY":
                    a.geometry.computeVertexNormals(), a.material = w;
                    break;
                case "WIRES":
                    a.material = x
                }
            }), g.name = "parachute", g.position.set(0, 0, 1), b = new THREE.Object3D, n.rotation.x = -Math.PI / 2, n.rotation.y = Math.PI / 2, n.scale.set(.0075, .0075, .0075), b.parts = n, b.add(n), m.add(b), s = !0
        }
    }, v.addTrails = function () {
        t || (t = !0, m.add(e), m.add(f))
    }, v.update = function (a) {
        var h = 1e3 * a.t,
            i = a.player.leftarm,
            j = a.player.rightarm,
            k = a.player.bodyangle;
        if (a.player.parachute, isNaN(i) || void 0 == i || null == i || 0 == i) {
            var l = .1 * Math.sin(.0025 * h) * Math.PI * Math.sin(.0014 * h + 2) * Math.sin(.001 * h + 1) * Math.sin(.0034 * h + 1.4) + .1 * Math.PI;
            b.parts.getObjectByName("ARM_Right").rotation.x = l, b.parts.getObjectByName("ARM_Left").rotation.x = -l, n = l, o = -l
        } else {
            for (var l = .1 * Math.sin(.0025 * h) * Math.PI * Math.sin(.0014 * h + 2) * Math.sin(.001 * h + 1) * Math.sin(.0034 * h + 1.4) + .1 * Math.PI, m = -i - Math.PI / 2 + k; 0 > m;) m += 2 * Math.PI;
            m > 1.5 * Math.PI ? m = 0 : m > Math.PI && (m = Math.PI);
            for (var q = -j - Math.PI / 2 + k; q > 0;) q -= 2 * Math.PI;
            q < -1.5 * Math.PI ? q = 0 : q < -Math.PI && (q = -Math.PI), n += .1 * (m - n), o += .1 * (q - o), b.parts.getObjectByName("ARM_Left").rotation.x = -n - l, b.parts.getObjectByName("ARM_Right").rotation.x = -o + l
        }
        var s = .05 * Math.sin(.0013 * h) * Math.PI * Math.sin(.0021 * h + 1) + .05 * Math.PI,
            t = .05 * Math.sin(.0018 * h) * Math.PI * Math.sin(.0023 * h + 1) + .05 * Math.PI,
            v = .05 * Math.sin(.002 * h) * Math.PI * Math.sin(.0031 * h + 1) * Math.sin(.001 * h + 3) * Math.sin(.004 * h + 1.7) + .05 * Math.PI;
        if (b.parts.getObjectByName("Leg_Left").rotation.z = s, b.parts.getObjectByName("Leg_Right").rotation.z = t, b.parts.getObjectByName("Leg_Left").rotation.x = -v, b.parts.getObjectByName("Leg_Right").rotation.x = v, u || 0 == r % 2) {
            var w = new THREE.Vector3,
                x = new THREE.Vector3,
                y = .8 * p,
                z = 0;
            u || 0 != r % 4 || (z = .1), 1 == a.player.trails ? (w.copy(b.parts.getObjectByName("ARM_Left").position), w.y -= Math.cos(-n - z) * y, w.z -= Math.sin(-n - z) * y, b.parts.localToWorld(w), x.copy(b.parts.getObjectByName("ARM_Right").position), x.y -= Math.cos(-o - z) * y, x.z -= Math.sin(-o - z) * y, b.parts.localToWorld(x), c.vertices.shift(), c.vertices.push(w), c.verticesNeedUpdate = !0, d.vertices.shift(), d.vertices.push(x), d.verticesNeedUpdate = !0, e.visible = !0, f.visible = !0) : (e.visible = !1, f.visible = !1)
        }
        if (0 != a.player.parachute) {
            b.getObjectByName("parachute") || b.add(g);
            var A = a.t - a.player.parachute;
            if (2 > A) {
                var B = Easing.easeOutBounce(0, A, 0, 1.5, 2);
                g.scale.set(B, B, B)
            } else {
                var B = .1 * Math.sin(.0015 * h) * Math.sin(.0024 * h + 2) + 1.5;
                g.scale.set(B, B, B)
            }
        } else b.getObjectByName("parachute") && b.remove(g);
        r++
    }, v.getPosition = function () {
        return b.position
    }, v.getRotation = function () {
        return b.rotation
    }, v.setPitch = function (a) {
        b.parts.rotation.x = a
    }, v.setRoll = function (a) {
        b.parts.rotation.y = a + Math.PI
    }, v.setHeading = function (a) {
        b.rotation.y = a
    }, v
}, mapdive.MapManagerCSS = function (a) {
    function b(a, b) {
        if (d && d.setMap(null), c.getProjection()) {
            var e = c.getProjection().fromPointToLatLng(new google.maps.Point(a, b)),
                f = {
                    center: e,
                    strokeWeight: 0,
                    fillColor: "#00ff00",
                    fillOpacity: .5,
                    map: c,
                    radius: 3030 * Math.cos(toRadians(e.lat()))
                };
            d = new google.maps.Circle(f)
        }
        t = {
            x: a,
            y: b
        }
    }
    var c, d, e = 128,
        f = 3,
        g = {
            uniforms: {
                altitudeColor: {
                    type: "v3",
                    value: new THREE.Vector3(.858, .964, 1)
                },
                color: {
                    type: "v3",
                    value: new THREE.Vector3(1, 0, 0)
                }
            },
            vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
            fragmentShader: ["varying vec2 vUv;", "uniform vec3 altitudeColor;", "uniform vec3 color;", "void main() {", "float f = distance(vUv, vec2(0.5, 0.5)) * 2.0;", "float fadeStart = 0.50;", "float fadeStop = 0.8;", "if(f >= fadeStart){", "  f = mix(0.0, 1.0, (f-fadeStart) * (1.0 / (fadeStop-fadeStart)));", "  f = pow(f, 2.5);", "} else {", "  f = 0.0;", "}", "gl_FragColor = vec4(color, 1.0) * clamp(f, 0.0, 1.0);", "}"].join("\n")
        },
        h = !0,
        i = 1,
        j = 0,
        k = 0,
        l = 0,
        m = "#ffffff",
        n = a.scene,
        o = a.camera,
        p = a.cssViewportId,
        q = a.FOV,
        r = new google.maps.LatLng(45.52594, -122.65595),
        s = 14,
        t = {
            x: 0,
            y: 0
        },
        u = {
            center: r,
            zoom: 14,
            disableDefaultUI: !0,
            animatedZoom: !1,
            mapTypeId: "default",
            draggable: !1,
            scrollwheel: !1,
            optimized: !1
        };
    c = new google.maps.Map(document.getElementById(a.mapContainerId), u);
    var v = {
        strokeWeight: 0,
        fillColor: "#00ff00",
        fillOpacity: .3,
        map: c,
        radius: 2250
    };
    d = new google.maps.Circle(v);
    for (var w in viewStyles) c.mapTypes.set(w, viewStyles[w].mapstyle);
    var x = new THREE.CSS3DRenderer;
    x.setSize(a.screenWidth, a.screenHeight), x.setFOV(q), document.getElementById(p).appendChild(x.domElement), google.maps.event.addListener(c, "projection_changed", function () {
        b(t.x, t.y)
    });
    var y = new THREE.CSS3DObject(document.getElementById(a.mapContainerId));
    y.position.set(0, 0, 0), y.rotation.set(-Math.PI / 2, 0, 0), y.frustumCulled = !1, y.scale.set(.25, .25, .25), n.add(y);
    var z = new THREE.ShaderMaterial(g);
    z.fog = !1;
    var A = new THREE.PlaneGeometry(2048 + e, 2048 + e),
        B = new THREE.Mesh(A, z);
    B.scale.set(1, 1, 1), n.add(B), B.rotation.set(-Math.PI / 2, 0, 0);
    var C = {};
    return C.getCopyright = function () {
        var a = $("#map-container").text();
        return a = a.replace(/Map Data(.+?)-.+/, "$1")
    }, C.update = function (a, b) {
        if (null != c.getProjection()) {
            var d = 1 << c.getZoom();
            b.player.latLng = c.getProjection().fromPointToLatLng(new google.maps.Point(b.player.pos[0], b.player.pos[2]));
            var g = new google.maps.Point(a.x * d, a.z * d);
            if (Math.abs(k - g.x) >= e || Math.abs(l - g.y) >= e) {
                k = g.x, l = g.y;
                var h = c.getProjection().fromPointToLatLng(new google.maps.Point(a.x, a.z));
                c.setCenter(h);
                var i = new google.maps.Point(a.x, a.z);
                window.setTimeout(function () {
                    y.position.x = i.x * mapdive.WORLD_SCALE, y.position.z = i.y * mapdive.WORLD_SCALE, y.position.y = 0
                }, f)
            }
            B.position.x = a.x * mapdive.WORLD_SCALE, B.position.z = a.z * mapdive.WORLD_SCALE
        }
    }, C.render = function () {
        x.render(n, o)
    }, C.setZoomLevel = function (a) {
        if (h && s != a) {
            var b = 12,
                d = b - a;
            c.setZoom(a), y.position.set(0, 0, 0);
            var e = Math.pow(2, d);
            i = 768 * e, j = .99 * i, y.scale.set(e, e, e), B.scale.set(e, e, e), s = a
        }
        return y.scale.x
    }, C.setTarget = function (a, c) {
        b(a, c)
    }, C.setZoomEnabled = function (a) {
        h = a
    }, C.setSize = function (a, b) {
        x.setSize(a, b), $("#" + p).css({
            width: a,
            height: b
        }), $(".layer-ui, .layer-ui-controls, #webgl-viewport").css({
            width: a,
            height: b
        }), x.setFOV(q)
    }, C.setHorizonColor = function (a) {
        g.uniforms.color.value.set(a.r, a.g, a.b)
    }, C.setStyle = function (a, b) {
        m = b.target, d && d.setOptions({
            fillColor: m
        }), c.setMapTypeId(a)
    }, C
}, mapdive.AssetManager = function () {
    var a, b, c = {},
        d = [],
        e = {},
        f = [],
        g = [],
        h = 0,
        i = 0,
        j = 0,
        k = 0,
        l = function () {
            h--, b && b(k - h, k), 0 >= h && "function" == typeof a && a()
        },
        m = function (a, b) {
            for (var d in c)
                if (c[d].sourceFile == b) return c[a] = c[d], l(), void 0;
            c[a] = THREE.ImageUtils.loadTexture(b, {}, function () {
                l()
            })
        },
        n = function (a, b) {
            var c = new THREE.OBJLoader;
            c.addEventListener("load", function (b) {
                e[a] = b.content, l()
            }), c.load(b)
        },
        o = function (a, b) {
            var c = new THREE.JSONLoader;
            c.load(b, function (b, c) {
                e[a] = new THREE.Mesh(b, c), l()
            })
        },
        p = {};
    return p.addTexture = function (a, b) {
        i++, d.push({
            id: a,
            path: b
        })
    }, p.addModel = function (a, b) {
        j++, f.push({
            id: a,
            path: b
        })
    }, p.addJSONModel = function (a, b) {
        j++, g.push({
            id: a,
            path: b
        })
    }, p.loadAssets = function (c, e) {
        "function" == typeof c && (a = c), "function" == typeof e && (b = e), h = d.length + f.length + g.length, k = h;
        for (var i = 0; i < d.length; i++) m(d[i].id, d[i].path);
        for (var i = 0; i < f.length; i++) n(f[i].id, f[i].path);
        for (var i = 0; i < g.length; i++) o(g[i].id, g[i].path)
    }, p.getTexture = function (a) {
        return c[a] ? c[a] : c.TEXTURE_MISSING
    }, p.getModel = function (a) {
        return e[a] ? e[a] : null
    }, p.getTextureForStyle = function (a, b) {
        return c[a + "_" + b] ? p.getTexture(a + "_" + b) : p.getTexture(a + "_default")
    }, p
};
var MiniMapHUD = function () {
        function a() {
            if (!l) {
                f = [], l = !0, $("#mini-map-container").css({
                    display: "block",
                    left: 1090
                }), $("#mini-map-container").animate({
                    left: 62
                });
                var a = c.getProjection().fromPointToLatLng(new google.maps.Point(landmark.position.x / mapScale, landmark.position.z / mapScale));
                playerMarker = new google.maps.Marker({
                    map: c,
                    position: a,
                    animation: google.maps.Animation.DROP,
                    draggable: !1
                }), c.panTo(a), n = !1, window.setTimeout(b, 2e3)
            }
        }

        function b() {
            var a = c.getProjection().fromPointToLatLng(new google.maps.Point(gameState.player.pos[0], gameState.player.pos[2]));
            c.panTo(a), window.setTimeout(function () {
                n = !0, e.css("display", "block"), c.setZoom(12)
            }, 500)
        }
        var c, d, e = $("#minimap-icon"),
            f = [],
            g = {},
            h = 0,
            i = 130,
            j = 0,
            k = !0,
            l = !1,
            m = [],
            n = !1,
            o = new THREE.Vector3;
        return g.initialize = function () {
            $("#mini-map-container").attr("data-active", "true"), $("#mini-map-container").css("display", "block"), $("#mini-map-container").css("visibility", "hidden"), $("#hud-about").attr("data-active", "true");
            var a = {
                zoom: 11,
                disableDefaultUI: !0,
                mapTypeId: "default",
                draggable: !1,
                scrollwheel: !1,
                backgroundColor: "#ffffff"
            };
            c = new google.maps.Map(document.getElementById("mini-map"), a);
            var b = {
                    elementType: "labels.text.stroke",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#edf1f7"
                    }]
                },
                e = {
                    elementType: "labels.text.fill",
                    stylers: [{
                        visibility: "on"
                    }, {
                        color: "#0f100e"
                    }]
                };
            google.maps.event.addListener(c, "idle", function () {
                k && (k = !1, $("#mini-map-container").css({
                    display: "none",
                    visibility: "visible"
                }))
            });
            for (var f in viewStyles) {
                var g = JSON.parse(JSON.stringify(viewStyles[f].style));
                g.push(e), g.push(b), c.mapTypes.set(f, new google.maps.StyledMapType(g, {
                    name: f
                }))
            }
            d = new google.maps.Polyline({
                map: c,
                path: [],
                strokeColor: "#001bff",
                strokeOpacity: .75,
                strokeWeight: 6
            })
        }, g.setStyle = function (a, b) {
            d.setOptions({
                strokeColor: b.target
            }), c.setMapTypeId(a)
        }, g.update = function () {
            l && n && (j > gameState.player.pos[0] ? e.addClass("left") : j < gameState.player.pos[0] && e.removeClass("left"), o.y = gameState.player.pos[1], c.panTo(gameState.player.latLng), o.distanceTo(player.getPosition()) > 4 && (f.push(c.getCenter()), f.length > i && (f = f.splice(1, f.length - 1)), d.setPath(f), h = gameState.t, o.copy(player.getPosition())), j = gameState.player.pos[0])
        }, g.message = function (b) {
            "intro_results" == b.hud && a(), "gate_hit" == b.hud && m.push(new google.maps.Marker({
                map: c,
                position: c.getProjection().fromPointToLatLng(new google.maps.Point(b.x, b.z)),
                animation: google.maps.Animation.DROP,
                draggable: !1
            }))
        }, g.show = function () {
            a()
        }, g.hide = function () {
            l = !1, n = !1;
            for (var a = 0; a < m.length; a++) m[a].setMap(null);
            m = [], e.css("display", "none"), $("#mini-map-container").animate({
                left: 1090
            }, function () {
                $("#mini-map-container").css({
                    display: "none"
                })
            })
        }, g.type = "minimap", g
    },
    MapInfoHUD = function () {
        function a(a, b) {
            var c = Math.floor(a),
                d = 60 * Math.abs(c - a),
                e = Math.floor(d),
                f = Math.floor(60 * (d - e)),
                g = "";
            return g = b ? a > 0 ? "N" : "S" : a > 0 ? "E" : "W", g + " " + Math.abs(c) + "&deg; " + e + "' " + f + '"'
        }

        function b(a) {
            if (a >= 1e3) {
                var b = Math.floor(.001 * a),
                    c = Math.floor(a - 1e3 * b);
                return 10 > c ? c = "00" + c : 100 > c && (c = "0" + c), b + "," + c
            }
            return a
        }

        function c() {
            $("#mapinfo-search-term").html(currentLevel.description.search), $("#mapinfo-target-name").html(currentLevel.description.target), $("#mapinfo-target-address").html(currentLevel.description.address), $("#mapinfo-target-country").html(currentLevel.description.country), $("#mapinfo-location,#mapinfo-target").css({
                display: "block",
                left: -1080
            }), $("#mapinfo-search").css({
                display: "block"
            }), $("#mapinfo-search").animate({
                top: 85
            }, function () {
                $("#mapinfo-target").animate({
                    left: 62
                }, function () {
                    $("#mapinfo-location").animate({
                        left: 62
                    })
                })
            })
        }
        var d, e, f, g, h = !1,
            i = {};
        return i.initialize = function () {
            $("#mapinfo-search,#mapinfo-target,#mapinfo-location").attr("data-active", "true"), d = $("#mapinfo-latlng"), e = $("#mapinfo-altitude"), f = document.getElementById("mapinfo-altitude"), g = document.getElementById("mapinfo-latlng"), $("#mapinfo-search-term").html("&nbsp;")
        }, i.update = function () {
            h && gameState.player.latLng && (g.innerHTML = a(gameState.player.latLng.lat(), !0) + "&nbsp;&nbsp;&nbsp;" + a(gameState.player.latLng.lng(), !1), f.innerHTML = b(Math.round(5 * gameState.player.pos[1])) + " ft")
        }, i.message = function (a) {
            "intro_results" == a.hud && c()
        }, i.show = function () {
            h || (h = !0, c())
        }, i.hide = function () {
            h = !1, $("#mapinfo-location,#mapinfo-target").animate({
                left: -1080
            }), $("#mapinfo-search").animate({
                top: -200
            })
        }, i.type = "mapinfo", i
    },
    PlayerHUD = function () {
        function a() {
            for (var a = 0; 6 > a; a++) d.morphTargetInfluences[a] = 0
        }

        function b() {
            f = window.global.instrument.counter($("#star-counter")), g = window.global.instrument.counter($("#gate-counter")), f.update(0), g.update(0)
        }
        var c, d, e, f, g, h, i, j, k, l = {},
            m = 0,
            n = 3,
            o = 4,
            p = !1,
            q = !0,
            r = !0,
            s = 0,
            t = !1,
            u = 0,
            v = 180,
            w = -65;
        return l.initialize = function () {
            if (!p) {
                i = new THREE.Scene, k = new THREE.PerspectiveCamera(viewportMetrics.FOV, 1, 1, 5e3), k.position.set(0, 0, 350), j = new THREE.WebGLRenderer({
                    antialias: !0
                }), j.maxMorphTargets = 6, j.setSize(v, v), $("#hud-viewport").append(j.domElement);
                var a = new THREE.AmbientLight(2105376);
                i.add(a);
                var f = new THREE.DirectionalLight(11053224);
                f.castShadows = !0, f.position.x = -1, f.position.y = .7, f.position.z = 1, f.position.normalize(), i.add(f), $("#hud-viewport").attr("data-active", "true"), setTimeout(function () {
                    $("#hud-viewport").css("display", "block")
                }, 500), p = !0;
                var g = new THREE.MeshBasicMaterial({
                        color: 0
                    }),
                    h = new THREE.MeshPhongMaterial({
                        emissive: 7166245,
                        color: 16757778,
                        morphTargets: !0
                    }),
                    l = new THREE.MeshPhongMaterial({
                        emissive: 7895160,
                        color: 14606046,
                        specular: 16777215,
                        shininess: 100,
                        map: assetManager.getTexture("helmetHUD")
                    }),
                    m = new THREE.MeshPhongMaterial({
                        shininess: 280,
                        color: 0,
                        specular: 16777215,
                        opacity: .85,
                        transparent: !0
                    });
                c = assetManager.getModel("pegmanHUD"), c.traverse(function (a) {
                    if (a instanceof THREE.Mesh) {
                        a.material && a.material.dispose(), new THREE.Matrix4;
                        var b, c, d;
                        switch (a.geometry.computeBoundingBox(), a.geometry.computeVertexNormals(), b = a.geometry.boundingBox.size(), c = a.geometry.boundingBox.min, d = a.geometry.boundingBox.max, a.name) {
                        case "GLASSES":
                            a.geometry.computeVertexNormals(), a.material = m;
                            break;
                        case "HELMET":
                            a.geometry.computeVertexNormals(), a.material = l;
                            break;
                        case "BLACK":
                            a.material = g
                        }
                    }
                }), c.position.set(0, -80, 0), d = assetManager.getModel("pegmanFaces"), d.material = h, d.geometry.computeVertexNormals(), d.position.y = -80, e = new THREE.Object3D, e.add(d), e.add(c), e.position.y = w, e.position.x = -2, i.add(e), b()
            }
        }, l.update = function (b) {
            if (p) {
                var c = b.t;
                if (b.player.dir[0], e.rotation.x = .15 * Math.sin(.4 * c) * Math.sin(.28 * c) - .1, e.rotation.y = .15 * Math.sin(.189 * c) * Math.cos(.52 * c), t) {
                    var h = b.t - s,
                        l = 0;
                    1 > h ? l = -h : 2 > h ? l = h - 2 : (l = 0, t = !1), d.morphTargetInfluences[0] = l
                } else switch (b.state) {
                case "dive":
                    a(), d.morphTargetInfluences[o] = .25 * (Math.sin(27 * c) + 1) + .25 * b.cam.speed * (Math.sin(27 * c) * Math.sin(18.5 * c) + 2);
                    break;
                case "intro":
                    e.rotation.x += .15 * Math.sin(2.189 * c) * Math.cos(.52 * c) * m, d.morphTargetInfluences[n] = m;
                    break;
                case "countdown":
                    m *= .9, d.morphTargetInfluences[n] = m;
                    break;
                case "ending":
                    a(), d.morphTargetInfluences[0] = -(.25 * (Math.sin(10 * c) + 3));
                    break;
                case "loose":
                    a(), d.morphTargetInfluences[0] = .25 * (Math.sin(10 * c) + 3)
                }
                f.update(b.stars), g.update(b.gates), j.render(i, k)
            }
        }, l.message = function (b) {
            if ("intro" == b.hud) {
                if (b.start && (q = !0, h.clearRect(0, 0, 350, 350), $("#hud-viewport").animate({
                    top: 0
                }, function () {
                    $("#hud-intro").animate({
                        opacity: 1
                    })
                }), m = 0, a()), b.progress) {
                    h.clearRect(0, 0, 350, 350), h.beginPath(), m = b.progress;
                    var c = Math.PI / 2,
                        d = Math.PI * Number(b.progress);
                    h.arc(175, 175, 147, c + d, c - d, !0), h.stroke()
                }
                b.hide_progress && $("#hud-intro").animate({
                    opacity: 0
                })
            }
            "smile" == b.hud && (t = !0, s = b.t)
        }, l.reset = function () {
            u = 0
        }, l.show = function () {
            q || (q = !0, $("#hud-viewport").animate({
                bottom: 60
            }), window.setTimeout(function () {
                $("#hud-viewport").animate({
                    width: 750,
                    "margin-left": -375
                }, function () {
                    $("#gate-container,#star-container").css({
                        display: "block"
                    })
                })
            }, 1e3))
        }, l.hide = function () {
            r || !q || mapdive.control.viewState.oldstate !== mapdive.control.viewState.state && "idle" !== mapdive.control.viewState.state && !mapdive.UI.forceClose || (q = !1, mapdive.UI.forceClose = !1, $("#gate-container,#star-container").css({
                display: "none"
            }), $("#hud-viewport").animate({
                width: 0,
                "margin-left": 0,
                bottom: -230
            })), mapdive.UI.forceClose = !1, r = !1
        }, l.type = "player", l
    },
    CopyrightHUD = function () {
        var a, b = {};
        return b.initialize = function () {
            $("#mapinfo-copyright").attr("data-active", "true"), $("#mapinfo-copyright").css("display", "block"), a = $("#map-info-copytext")
        }, b.update = function () {
            a.html(mapManager.getCopyright())
        }, b.show = function () {}, b.hide = function () {}, b.type = "copyright", b
    },
    LogoHUD = function () {
        var a = {};
        return a.initialize = function () {
            $("#mapinfo-logo").attr("data-active", "true"), $("#mapinfo-logo").css("display", "block")
        }, a.update = function () {}, a.show = function () {}, a.hide = function () {}, a.type = "logo", a
    },
    SearchHUD = function () {
        function a() {
            g || (g = !0, $("#mapinfo-search").css({
                display: "block"
            }), $("#mapinfo-search").animate({
                top: 85
            }, function () {
                $("#intro-cancel,#intro-confirm").animate({
                    opacity: 1
                })
            }))
        }

        function b() {
            g && ($("#mapinfo-search-term").html("&nbsp;"), h = 0, window.clearTimeout(n), m = window.setTimeout(c, 500), window.clearInterval(j), j = window.setInterval(d, 150))
        }

        function c() {
            g && h < f.length && (h++, $("#mapinfo-search-term").html(f.substring(0, h) + "|"), window.clearInterval(j), j = window.setInterval(d, 150), n = window.setTimeout(c, .5 * o[p++]), p >= o.length && (p = 0))
        }

        function d() {
            i = !i;
            var a = f.substring(0, h) + (i ? "|" : "&nbsp;");
            $("#mapinfo-search-term").html(a)
        }

        function e() {
            g = !1, window.clearInterval(j), window.clearTimeout(l), window.clearTimeout(k), window.clearTimeout(m), f = "", $("#mapinfo-search").animate({
                top: -200
            }), $("#intro-cancel,#intro-confirm").animate({
                opacity: 0
            })
        }
        var f = "",
            g = !1,
            h = 0,
            i = !0,
            j = null,
            k = null,
            l = null,
            m = null,
            n = null,
            o = [137, 86, 91, 190, 113, 105, 182, 174, 95, 194, 198, 81, 106, 175],
            p = 0,
            q = {};
        return q.initialize = function () {
            $("#mapinfo-search,#intro-search").attr("data-active", "true"), $("#mapinfo-search-term").html("&nbsp;"), $("#intro-cancel,#intro-confirm").css("opacity", 0)
        }, q.update = function () {
            !g
        }, q.message = function (c) {
            if ("intro_search" == c.hud && (a(), f = c.search, b()), "intro_status" == c.hud) {
                var d = .7 + .3 * c.cancel,
                    g = .7 + .3 * c.confirm;
                $("#intro-cancel-icon").css("transform", "scale(" + d + ", " + d + ")"), $("#intro-confirm-icon").css("transform", "scale(" + g + ", " + g + ")"), $("#intro-cancel-hand,#intro-confirm-hand").css("opacity", 1)
            }
            "intro_confirm" == c.hud && $("#intro-cancel,#intro-confirm").animate({
                opacity: 0
            }), "intro_results" == c.hud && e()
        }, q.show = function () {}, q.hide = function () {
            e()
        }, q.type = "mapinfo", q
    },
    HelpTextHUD = function () {
        var a = {},
            b = "";
        return a.initialize = function () {
            $("#help-text-hud").attr("data-active", "true"), $("#help-text-hud").css("display", "block")
        }, a.update = function () {
            gameState.state != b && ("idle" == gameState.state ? $("#help-text-hud").css("display", "block") : $("#help-text-hud").css("display", "none"), b = gameState.state)
        }, a.show = function () {}, a.hide = function () {}, a.type = "copyright", a
    },
    InstructionsHUD = function () {
        var a = {},
            b = !1,
            c = !1,
            d = 0,
            e = null;
        return a.initialize = function () {
            e = $("#hud-instructions"), e.attr("data-active", "true"), e.css("display", "none")
        }, a.message = function (a) {
            "show_instructions" == a.hud && (b = !0, c = !0, d = gameState.t, e.css({
                display: "block",
                opacity: 0
            })), "hide_instructions" == a.hud && (b = !1, c = !0, d = gameState.t)
        }, a.update = function () {
            if (c) {
                var a = 2 * (gameState.t - d);
                a > 1 && (c = !1, b || e.css({
                    display: "none"
                }), a = 1), b ? e.css({
                    opacity: a
                }) : e.css({
                    opacity: 1 - a
                })
            }
        }, a.show = function () {}, a.hide = function () {}, a.type = "copyright", a
    };
mapdive.GameStates = {
    IDLE: "idle",
    INTRO: "intro",
    DIVE: "dive",
    ENDING: "ending",
    LOSE: "lose",
    PAUSED: "paused",
    START: "start"
}, mapdive.ENDING_ALTITUDE = 175, mapdive.WORLD_SCALE = 4096, mapdive.control = function () {
    function a(a) {
        M.oldstate = M.state, M.state = a, s[a].setActive(), u = a, b("stateChange", {
            "new": a,
            old: M.oldstate
        }), M.oldstate == mapdive.GameStates.DIVE && (a == mapdive.GameStates.LOSE && b("diveEnded", {
            win: !1
        }), a == mapdive.GameStates.ENDING && b("diveEnded", {
            win: !0
        }))
    }

    function b(a, b) {
        R[a] && "function" == typeof R[a] && R[a](b)
    }

    function c(a) {
        v = null != a ? mapdive.getLevelByName(a) : mapdive.getNextLevel(v.name), D = [], J.stars = [0, 0], J.gates = [0, 0], J.gotBonus = !1;
        for (var b = 0; b < v.entities.length; b++)
            if ("gate" == v.entities[b].type && J.gates[1]++, "item" == v.entities[b].type && J.stars[1]++, d(v.entities[b]), "dropzone" == v.entities[b].type) {
                var c = v.entities[b].position;
                r = new THREE.Vector3(c.x, c.y, c.z)
            }
        var e = ["burningman", "8bit", "night", "raver", "revolutions", "scifi", "terminal", "volcano"],
            f = e[Math.floor(randomRange(0, e.length))];
        "burning man" == v.name && (f = "burningman");
        var g = mapdive.styleGroups[v.style],
            h = g[Math.floor(randomRange(0, g.length))];
        i({
            level: {
                name: v.name,
                gateStyle: Math.floor(randomRange(0, 9)),
                baseStyle: h,
                bonusStyle: f
            }
        })
    }

    function d(a) {
        var b = {
            id: a.id,
            type: a.type,
            hit: !1,
            selected: !1,
            position: new THREE.Vector3(a.position.x, a.position.y, a.position.z),
            rotation: new THREE.Vector3(a.rotation.x, a.rotation.y, a.rotation.z),
            params: a.params
        };
        D.push(b)
    }

    function e() {
        var a = H.getDelta();
        x.heading.update(a), x.roll.update(a), x.pitch.update(a), x.speed.update(a), y.heading.update(a), y.roll.update(a), y.pitch.update(a), K.speed.update(a), K.heading.update(a), L.update(a), f(a), s[u].update(a), u == mapdive.GameStates.DIVE && j(a), h(), y.heading.set(x.heading.get()), z || (y.pitch.set(x.pitch.get()), y.roll.set(x.roll.get())), k(a)
    }

    function f() {
        if ("keyboard" == O) {
            var a = .85;
            I.states[I.DOWN] || I.states[I.S] ? K.speed.set(a) : I.states[I.UP] || I.states[I.W] ? K.speed.set(-a) : K.speed.set(0), M.player.leftarm = Math.PI - toRadians(10) - toRadians(45 * -K.speed.get()), M.player.rightarm = -Math.PI + toRadians(10) + toRadians(45 * -K.speed.get()), I.states[I.LEFT] || I.states[I.A] ? K.heading.set(-a) : I.states[I.RIGHT] || I.states[I.D] ? K.heading.set(a) : K.heading.set(0)
        }
        "mouse" == O && (K.speed.set(G), K.heading.set(F), M.player.leftarm = Math.PI - toRadians(10) - toRadians(45 * -K.speed.get()), M.player.rightarm = -Math.PI + toRadians(10) + toRadians(45 * -K.speed.get())), L.set(K.speed.get())
    }

    function g(a) {
        A = t;
        for (var b = 0; b < a.length; b++) C.push(a[b]);
        for (var b = 0; b < C.length; b++) C[b].start = Number(C[b].delay) + t, C[b].end = C[b].start + Number(C[b].duration), C[b].started = !1, C[b].end > B && (B = C[b].end), C[b].tweenFunc = window.Easing[C[b].ease];
        z = !0
    }

    function h() {
        if (z) {
            for (var a = 0; a < C.length; a++)
                if (t <= C[a].end && t >= C[a].start) {
                    0 == C[a].started && (C[a].startValue = Number(y[C[a].tween].get()), C[a].endValue = Number(C[a].value) * Math.PI / 180 - C[a].startValue, C[a].started = !0);
                    var b = C[a].tweenFunc(0, t - C[a].start, C[a].startValue, C[a].endValue, Number(C[a].duration));
                    y[C[a].tween].now(b)
                }
            if (t >= B) {
                z = !1;
                for (var a = 0; a < C.length; a++) y[C[a].tween].clamp(), C.splice(a, 1), a--
            }
        }
    }

    function i(a) {
        E.push(a)
    }

    function j() {
        P.copy(x.position), P.x *= mapdive.WORLD_SCALE, P.z *= mapdive.WORLD_SCALE;
        for (var b = 0; b < D.length; b++) {
            var c = D[b];
            if ("item" == c.type || "gate" == c.type || "bonus" == c.type) {
                if (Q.copy(c.position), Q.x *= mapdive.WORLD_SCALE, Q.z *= mapdive.WORLD_SCALE, c._dst = Q.distanceTo(P), "gate" == c.type && !c.hit && c._dst < 12) {
                    i({
                        entity: c.id,
                        hit: !0,
                        t: M.t
                    }), i({
                        hud: "gate_hit",
                        x: c.position.x,
                        z: c.position.z
                    }), mapdive.sound.playGateSound();
                    var d = 180 * x.pitch.get() / Math.PI - 360;
                    g([{
                        tween: "pitch",
                        value: d,
                        delay: "0",
                        ease: "easeInOutExpo",
                        duration: "1"
                    }]), c.hit = !0, J.gates[0]++, i({
                        hud: "smile",
                        t: M.t
                    }), c.params.last && a(mapdive.GameStates.ENDING)
                }
                if ("item" == c.type && !c.hit && c._dst < 7) {
                    i({
                        entity: c.id,
                        hit: !0,
                        t: M.t
                    }), mapdive.sound.playItemSound();
                    var d = 180 * x.roll.get() / Math.PI + 360;
                    g([{
                        tween: "roll",
                        value: d,
                        delay: "0",
                        ease: "easeInOutQuad",
                        duration: "0.75"
                    }]), c.hit = !0, J.stars[0]++, i({
                        hud: "smile",
                        t: M.t
                    })
                }
                "bonus" == c.type && !c.hit && c._dst < 10 && (i({
                    entity: c.id,
                    hit: !0,
                    t: M.t
                }), i({
                    bonusmode: "bonus"
                }), mapdive.sound.playBonusSound(), N.bonusModeActive = !0, N.bonusModeStartTime = n(), J.gotBonus = !0, c.hit = !0)
            }
        }
    }

    function k(a) {
        M.stars = 100 * J.stars[0] + J.stars[1], M.gates = 100 * J.gates[0] + J.gates[1], M.player.pos[0] = x.position.x, M.player.pos[1] = x.position.y, M.player.pos[2] = x.position.z, M.player.dir[0] = y.heading.get(), M.player.dir[1] = y.pitch.get(), M.player.dir[2] = y.roll.get(), M.player.vel[0] = Math.cos(x.heading.get()) * x.speed.get(), M.player.vel[1] = -.5, M.player.vel[2] = Math.sin(x.heading.get()) * x.speed.get(), M.control = [K.speed.get(), K.heading.get()], M.cam.speed = L.get(), M.t += a, t = M.t
    }

    function l() {
        var a = {
            state: M
        };
        return E.length > 0 && (a.messages = E), E = [], a
    }

    function m(a, b) {
        i({
            camera: a,
            duration: b
        })
    }

    function n() {
        return M.t
    }

    function o() {
        s[mapdive.GameStates.INTRO] = new mapdive.IntroState, s[mapdive.GameStates.IDLE] = new mapdive.IdleState, s[mapdive.GameStates.DIVE] = new mapdive.DiveState, s[mapdive.GameStates.ENDING] = new mapdive.EndingState, s[mapdive.GameStates.LOSE] = new mapdive.LoseState, s[mapdive.GameStates.PAUSED] = new mapdive.PausedState, s[mapdive.GameStates.START] = new mapdive.StartDiveState
    }

    function p() {
        $(window).on("keydown", function (a) {
            I.states[a.keyCode] = !0, O = "keyboard", (I.states[I.DOWN] || I.states[I.UP] || I.states[I.LEFT] || I.states[I.RIGHT]) && a.preventDefault()
        }), $(window).on("keyup", function (a) {
            I.states[a.keyCode] = !1
        });
        for (var a = 0; 110 > a; a++) I[a] = !1
    }

    function q() {
        p(), o(), a("idle"), m("start-engine", 0), m("idle-ui", 2.45), M.player.trails = 0, $(document.body).on("mousemove", function (a) {
            O = "mouse", F = 2 * (a.clientX / window.innerWidth) - 1, G = 2 * (a.clientY / window.innerHeight) - 1
        }), $(document.body).on("mouseout", function () {
            F = 0, G = 0
        })
    }
    var r, s = {},
        t = 0,
        u = mapdive.GameStates.IDLE,
        v = mapdive.getLevelByName("statue of liberty"),
        w = "statue of liberty",
        x = {
            heading: new EasedValue(.25),
            pitch: new EasedValue(.15),
            roll: new EasedValue(.15),
            position: new THREE.Vector3(v.origin.position.x, 3600, v.origin.position.z),
            speed: new EasedValue(.1)
        },
        y = {
            heading: new EasedValue(.25),
            pitch: new EasedValue(.15),
            roll: new EasedValue(.15)
        },
        z = !1,
        A = 0,
        B = 0,
        C = [],
        D = [],
        E = [],
        F = 0,
        G = 0,
        H = new THREE.Clock,
        I = {
            states: [],
            ESCAPE: 27,
            PAGE_UP: 33,
            PAGE_DOWN: 34,
            UP: 38,
            LEFT: 37,
            DOWN: 40,
            RIGHT: 39,
            W: 87,
            A: 65,
            D: 68,
            S: 83,
            P: 80,
            TAB: 9,
            SPACE: 32,
            DELETE: 46,
            NUM_1: 49,
            NUM_2: 50,
            NUM_3: 51,
            NUM_4: 52
        },
        J = {
            stars: [0, 0],
            gates: [0, 0],
            bonus: !1
        },
        K = {
            heading: new EasedValue(.5),
            speed: new EasedValue(.5)
        },
        L = new EasedValue(.06),
        M = {
            t: 0,
            cam: {
                target: [0, 0, 0],
                speed: 0
            },
            player: {
                pos: [0, 0, 0],
                dir: [0, 0, 0],
                vel: [0, 0, 0],
                parachute: 0,
                trails: 0,
                leftarm: 0,
                rightarm: 0,
                bodyangle: 0
            },
            stars: 0,
            gates: 0,
            state: mapdive.GameStates.IDLE
        },
        N = {
            hideHUD: !1,
            bonusModeActive: !1,
            bonusModeStartTime: 0
        },
        O = "keyboard",
        P = new THREE.Vector3,
        Q = new THREE.Vector3,
        R = {
            stateChange: null,
            diveEnded: null
        };
    return {
        initialize: q,
        getFrameState: l,
        update: e,
        setCameraMode: m,
        loadLevel: c,
        viewState: M,
        gameState: N,
        player: x,
        controlValues: K,
        now: n,
        sendMessage: i,
        setGameState: a,
        startTween: g,
        getCurrentLevel: function () {
            return v
        },
        getScore: function () {
            return {
                stars: J.stars[0],
                totalStars: J.stars[1],
                gates: J.gates[0],
                totalGates: J.gates[1],
                gotBonus: J.gotBonus
            }
        },
        isTweening: function () {
            return z
        },
        entities: function () {
            return D
        },
        addListener: function (a, b) {
            "function" == typeof b && (R[a] = b)
        },
        setCurrentLevelName: function (a) {
            w = a
        },
        getCurrentLevelName: function () {
            return w
        }
    }
}(), mapdive.sound = function () {
    function a(a) {
        if (v && w) {
            var b = i.createBufferSource();
            b.buffer = a, b.connect(o), b.start ? b.start(0) : b.noteOn(0)
        }
    }

    function b(a, b) {
        var c = new XMLHttpRequest;
        c.open("GET", a, !0), c.responseType = "arraybuffer", c.onload = function () {
            i.decodeAudioData(c.response, b)
        }, c.send()
    }

    function c(a) {
        v && w && (a.source = i.createBufferSource(), a.gainNode = i.createGain(), a.gainNode.gain.value = 0, a.source.loop = !0, a.source.buffer = a.buffer, a.source.connect(a.gainNode), a.gainNode.connect(p), a.source.start ? a.source.start(0) : a.source.noteOn(0))
    }

    function d(a) {
        var b = i.currentTime,
            c = s * Math.random();
        a.gainNode.gain.linearRampToValueAtTime(0, b), a.gainNode.gain.linearRampToValueAtTime(a.max, b + c)
    }

    function e(a) {
        var b = i.currentTime,
            c = s * Math.random();
        a.gainNode.gain.linearRampToValueAtTime(a.max, b), a.gainNode.gain.linearRampToValueAtTime(0, b + c)
    }

    function f() {
        return "undefined" == typeof webkitAudioContext ? (w = !1, $("#toggle-sound").remove(), void 0) : (i = new webkitAudioContext, i.createGain ? (o = i.createGain(), p = i.createGain()) : (o = i.createGainNode(), p = i.createGainNode()), o.connect(i.destination), p.connect(o), j = i.createBufferSource(), b("game/audio/wind.mp3", function (a) {
            j.gainNode = i.createGain(), j.gainNode.gain.value = .5, j.buffer = a, j.connect(j.gainNode), j.gainNode.connect(o), j.loop = !0, j.start ? j.start(0) : j.noteOn(0)
        }), b("game/audio/gate.mp3", function (a) {
            k = a
        }), b("game/audio/firework.mp3", function (a) {
            l = a
        }), b("game/audio/firework_launch.mp3", function (a) {
            m = a
        }), b("game/audio/ui.mp3", function (a) {
            n = a
        }), u.samples.forEach(function (a) {
            b("game/audio/music/" + a + ".mp3", function (b) {
                u[a].buffer = b, u.loaded++, u.loaded === u.samples.length && g()
            })
        }), p.gain.value = t, o.gain.value = 0, void 0)
    }

    function g() {
        u.samples.forEach(function (a) {
            c(u[a])
        }), h()
    }

    function h() {
        var a = [];
        u.rhythm[Math.floor(Math.random() * u.rhythm.length)], u.samples.filter(function (b) {
            1 === Math.round(Math.random()) && a.push(b)
        }), u.samples.forEach(function (b) {
            var c = a.indexOf(b),
                f = u.playing.indexOf(b); - 1 !== c ? -1 === f && (d(u[b]), u.playing.push(b)) : -1 !== f && (e(u[b]), u.playing.splice(f, 1))
        });
        var b = Math.random() * (q - r) + r;
        setTimeout(h, 1e3 * b)
    }
    var i, j, k, l, m, n, o, p, q = 120,
        r = 60,
        s = 10,
        t = .9,
        u = {
            loaded: 0,
            playing: [],
            samples: ["bass", "chirp", "hat", "melody_bell", "melody_string", "stab", "synth_voice", "synth", "travel", "tronic"],
            rhythm: ["bass", "hat"],
            bass: {
                max: .6
            },
            chirp: {
                max: .2
            },
            hat: {
                max: .76
            },
            melody_bell: {
                max: .73
            },
            melody_string: {
                max: .59
            },
            stab: {
                max: 1
            },
            synth_voice: {
                max: 1
            },
            synth: {
                max: 1
            },
            travel: {
                max: .46
            },
            tronic: {
                max: .22
            }
        },
        v = !1,
        w = !0;
    return {
        initialize: function () {
            f(), v = !0
        },
        update: function (a) {
//            v && w && (j.playbackRate.value = 1.2 + .15 * a, j.gain.value = .75 + .15 * a)
        },
        playGateSound: function () {
            a(k)
        },
        playItemSound: function () {
            a(k)
        },
        playBonusSound: function () {
            a(k)
        },
        playFireworkSound: function () {
            a(l)
        },
        playFireworkLaunchSound: function () {
            a(m)
        },
        playUISound: function () {
            a(n)
        },
        setMute: function (a) {
            w && (o.gain.value = a ? 0 : 1)
        }
    }
}(), mapdive.IntroState = function () {
    var a = mapdive.control.viewState,
        b = mapdive.control.player,
        c = mapdive.control.getCurrentLevel(),
        d = 0,
        e = 5,
        f = 4,
        g = 0,
        h = f,
        i = 0,
        j = 0,
        i = 0,
        k = 0,
        l = !1,
        m = !1,
        n = {};
    return n.setActive = function () {
        c = mapdive.control.getCurrentLevel();
        var d = a.t;
        mapdive.control.sendMessage({
            mapzoom: "on"
        }), m = !1, l = !1, b.heading.set(c.origin.rotation.y), b.roll.set(0), a.player.parachute = 0, a.player.trails = 0, g = 0, mapdive.control.setCameraMode("closeup", 2), h = f, i = d, j = d, mapdive.control.sendMessage({
            hud: "hide"
        }), mapdive.control.sendMessage({
            entity: "top_cloud",
            hide: 1
        });
        var e = 180 * b.roll.get() / Math.PI - 360;
        mapdive.control.startTween([{
            tween: "roll",
            value: e,
            delay: "1",
            ease: "easeInOutQuad",
            duration: "1.5"
        }])
    }, n.update = function () {
        var g = a.t;
        switch (h) {
        case f:
            b.roll.set(Math.PI), b.pitch.set(-Math.PI / 2), !l && g - j > .25 && (mapdive.control.sendMessage({
                hud: "show_instructions"
            }), l = !0), g - j > 2 && (h = d, i = g, mapdive.control.setCameraMode("intro_climb", 1));
            break;
        case d:
            b.pitch.set(toRadians(-100)), b.roll.set(0), b.position.y += .015 * (4e3 - b.position.y), b.heading.set(c.origin.rotation.y), g - i > 1.55 && (mapdive.control.loadLevel(mapdive.control.getCurrentLevelName()), c = mapdive.control.getCurrentLevel(), b.position.x = c.origin.position.x, b.position.z = c.origin.position.z, b.position.y = 3930, mapdive.control.setCameraMode("intro_float", 0), i = g, b.position.x = c.origin.position.x, b.position.z = c.origin.position.z, b.heading.set(c.origin.rotation.y), h = e);
            break;
        case e:
            b.position.y += .025 * (4e3 + Math.sin(4 * g) - b.position.y), g - i > 2 && (k = g, mapdive.control.sendMessage({
                hud: "intro_search",
                search: c.description.search
            }), mapdive.UI.needsInstruction || mapdive.control.setGameState("start"))
        }
    }, n
}, mapdive.IdleState = function () {
    var a = mapdive.control.player,
        b = mapdive.control.viewState,
        c = new EasedValue(.02),
        d = {},
        e = 0,
        f = !1,
        g = 0,
        h = !1;
    return d.setActive = function () {
        h = !1, a.pitch.setEase(.15), a.pitch.set(0), mapdive.UI.preserveHUD || mapdive.control.sendMessage({
            hud: "hide"
        }), mapdive.viewport.removeEntitiesByType("gate"), mapdive.viewport.removeEntitiesByType("bonus"), mapdive.viewport.removeEntitiesByType("item"), mapdive.UI.preserveHUD = !1, mapdive.control.setCameraMode("idle-ui", 2), b.player.parachute = 0, b.player.trails = 1, e = b.t, f = !1, mapdive.control.sendMessage({
            entity: "cylinder",
            run: !0
        }), mapdive.control.sendMessage({
            hud: "hide_instructions"
        }), mapdive.control.sendMessage({
            mapzoom: "on"
        }), c.now(mapdive.control.player.position.y), g = b.t + randomRange(10, 20)
    }, d.update = function () {
        var d = b.t,
            g = b.t - e;
        g > 1 && 0 == f && (mapdive.control.sendMessage({
            entity: "transition_cloud",
            state: "fadeout"
        }), f = !0);
        var h = .005 * (Math.cos(d) + Math.sin(1.23 * d) * (.7 * Math.cos(2.548 * d) + .2)) - .001;
        a.heading.add(h), a.roll.set(100 * h);
        var i = 1e-4,
            j = 1300 + (400 * Math.sin(.05 * d) + 80 * Math.cos(.2731 * (d + 1.5482))) + 30 * Math.sin(.4 * (d + 2.1287));
        a.pitch.set(toRadians(Math.max(-35, Math.min(35, 7 * (a.position.y - j))))), c.set(j), c.update(), a.position.y = c.get(), b.player.speed = 1e-4, b.cam.speed = .35 + .4 * Math.sin(.4 * d) * Math.cos(1.235 * d), b.player.leftarm = 0, b.player.rightarm = 0, b.player.bodyangle = -Math.PI / 2, a.position.x += Math.cos(a.heading.get()) * i, a.position.z += Math.sin(a.heading.get()) * i, mapdive.control.isTweening() || Math.random() > .997 && (Math.random() > .5 ? mapdive.control.startTween([{
            tween: "roll",
            value: 360,
            delay: "0",
            ease: "easeInOutQuad",
            duration: "1.75"
        }]) : mapdive.control.startTween([{
            tween: "roll",
            value: -360,
            delay: "0",
            ease: "easeInOutQuad",
            duration: "1.75"
        }]))
    }, d
}, mapdive.DiveState = function () {
    var a = !1,
        b = mapdive.control.viewState,
        c = mapdive.control.gameState,
        d = mapdive.control.controlValues,
        e = mapdive.control.player,
        f = {};
    return f.setActive = function () {
        mapdive.control.setCameraMode("chase", 2), mapdive.control.viewState.player.trails = 1, c.hideHUD || mapdive.control.sendMessage({
            hud: "show"
        }), a = !0
    }, f.update = function (f) {
        var g = b.t,
            h = 2,
            i = 1 * f,
            j = .002 * f,
            k = j,
            l = j / 2,
            m = 0;
        m = -d.speed.get() >= 0 ? k * -d.speed.get() + j : l * -d.speed.get() + j, e.heading.add(i * d.heading.get()), e.roll.set(40 * i * d.heading.get());
        var n = (d.speed.get() + 1) / 2,
            o = .3 + .7 * Math.sin(n * Math.PI / 2);
        e.speed.set(Math.cos(n * Math.PI / 2) * m * h), e.pitch.set(Math.atan2(o, e.speed.get() * mapdive.WORLD_SCALE)), e.position.x += Math.cos(e.heading.get()) * e.speed.get(), e.position.z += Math.sin(e.heading.get()) * e.speed.get(), e.position.y -= o * 70 * f, e.position.y < mapdive.ENDING_ALTITUDE && mapdive.control.setGameState(mapdive.GameStates.LOSE), a && e.position.y < 3600 && (mapdive.control.sendMessage({
            entity: "top_cloud",
            hide: 1
        }), a = !1), mapdive.sound.update(d.speed.get()), c.bonusModeActive && g > c.bonusModeStartTime + 15 && (c.bonusModeActive = !1, mapdive.control.sendMessage({
            bonusmode: "normal"
        }))
    }, f
}, mapdive.EndingState = function () {
    function a() {
        var a = m + (b.t - g) * toRadians(51),
            d = n + .007 * Math.sin(.2123 * b.t) * Math.cos(.34566 * b.t),
            e = p.x + Math.cos(a) * d,
            f = p.z + Math.sin(a) * d,
            h = Math.atan2(p.z - c.position.z, p.x - c.position.x) - Math.PI / 2;
        c.heading.set(h), c.heading.wrap(), o.set(e, 50 + 20 * Math.sin(.41123 * b.t) * Math.cos(.3766 * b.t), f), c.pitch.set(toRadians(Math.max(-20, Math.min(20, 3 * (c.position.y - o.y))))), c.position.lerp(o, .08)
    }
    var b = mapdive.control.viewState,
        c = mapdive.control.player,
        d = {},
        e = 0,
        f = 0,
        g = 0,
        h = 0,
        i = 2,
        j = 3,
        k = 4,
        l = 5,
        m = 0,
        n = .1,
        o = new THREE.Vector3,
        p = new THREE.Vector3;
    return d.setActive = function () {
        mapdive.control.sendMessage({
            entity: "cylinder",
            run: !1
        }), mapdive.control.sendMessage({
            entity: "fireworks",
            run: !0
        }), mapdive.control.sendMessage({
            mapzoom: "off"
        }), e = i, g = b.t, f = b.t, mapdive.control.setCameraMode("end-player1", 2);
        for (var a = new THREE.Vector3, d = mapdive.control.entities(), h = 0; h < d.length; h++) "gate" == d[h].type && d[h].params.last && (a.x = d[h].position.x, a.z = d[h].position.z, a.y = 0), "landmark" == d[h].type && (p.x = d[h].position.x, p.z = d[h].position.z, p.y = 0);
        m = Math.atan2(p.z - c.position.z, p.x - c.position.x) + Math.PI, n = .018, c.pitch.set(0), c.roll.set(0)
    }, d.update = function () {
        if (c.heading.get(), e == i) a(), b.t - f > 8 && (e = j, f = b.t, mapdive.control.setCameraMode("end-landmark2", 0));
        else if (e == j) a(), b.t - f > 8 && (e = k, h = 0, f = b.t, mapdive.control.setCameraMode("end-player2", 0), mapdive.control.sendMessage({
            entity: "fireworks",
            run: !1
        }));
        else if (e == k && b.t - f > 4) e = l, mapdive.control.sendMessage({
            entity: "transition_cloud",
            state: "fadein"
        }), f = b.t;
        else if (e == l && b.t - f > 1) return mapdive.control.setGameState(mapdive.GameStates.IDLE), void 0;
        k > e || (c.pitch.setEase(.03), c.pitch.set(-Math.PI / 2), c.position.x += Math.cos(c.heading.get()) * c.speed.get(), c.position.y = Math.min(1500, c.position.y + h), c.position.z += Math.sin(c.heading.get()) * c.speed.get(), 2 > h && (h += .1), c.speed.set(0))
    }, d
}, mapdive.LoseState = function () {
    var a = mapdive.control.viewState,
        b = mapdive.control.player,
        c = {},
        d = 0,
        e = !1;
    return c.setActive = function () {
        mapdive.control.sendMessage({
            mapzoom: "off"
        }), d = a.t, a.player.parachute = a.t, a.player.trails = 0, mapdive.control.setCameraMode("end-lose1", 4), e = !1
    }, c.update = function (c) {
        b.roll.set(0), b.pitch.set(toRadians(-75)), b.position.y -= .05 * c;
        var f = a.t - d;
        f > 8 ? mapdive.control.setGameState(mapdive.GameStates.IDLE) : f > 7 && 0 == e && (mapdive.control.sendMessage({
            entity: "transition_cloud",
            state: "fadein"
        }), e = !0)
    }, c
}, mapdive.PausedState = function () {
    var a = {};
    return a.setActive = function () {}, a.update = function () {}, a
}, mapdive.StartDiveState = function () {
    var a = mapdive.control.viewState,
        b = mapdive.control.player,
        c = mapdive.control.getCurrentLevel(),
        d = 1,
        e = 2,
        f = 0,
        g = d,
        h = 0,
        i = 0,
        j = 0,
        h = 0,
        k = 0,
        l = {};
    return l.setActive = function () {
        c = mapdive.control.getCurrentLevel();
        var b = a.t;
        a.player.parachute = 0, a.player.trails = 0, f = 0, g = d, k = b, h = b, j = b
    }, l.update = function () {
        var h = a.t;
        switch (g) {
        case d:
            if (b.position.y += .002 * (4e3 - b.position.y), h - k > 1 && (mapdive.control.sendMessage({
                hud: "hide_instructions"
            }), a.player.trails = 1), h - k > 2) {
                g = e;
                var j = 180 * b.roll.get() / Math.PI - 360,
                    l = b.pitch.get() + 90;
                mapdive.control.startTween([{
                    tween: "roll",
                    value: j,
                    delay: "0",
                    ease: "easeInOutQuad",
                    duration: "2"
                }, {
                    tween: "pitch",
                    value: l,
                    delay: "0",
                    ease: "easeInOutQuad",
                    duration: "1"
                }]), i = h, mapdive.control.setCameraMode("intro_swoop", 2), b.heading.set(c.origin.rotation.y), b.pitch.set(toRadians(70))
            }
            h - k > 1.5 && (f += .015, b.position.y += f, b.position.x += 325e-7 * Math.cos(c.origin.rotation.y), b.position.z += 325e-7 * Math.sin(c.origin.rotation.y));
            break;
        case e:
            .25 > h - i ? f += .0125 : f -= .015, b.position.y += f, b.position.x += 325e-7 * Math.cos(c.origin.rotation.y), b.position.z += 325e-7 * Math.sin(c.origin.rotation.y), h - i > 2.5 && (mapdive.control.setGameState(mapdive.GameStates.DIVE), b.roll.wrap(), b.roll.clamp())
        }
    }, l
}, mapdive.UI = {
    screens: $(".ui-screen").not("#finished"),
    levelCards: $(".level-card"),
    shareLinks: $("#bottom-left .nav a, .score-share a"),
    fullscreen: !1,
    mute: !1,
    needsInstruction: !0,
    auth: {
        signedIn: !1
    },
    messages: {
        paused: "Game paused",
        win: "Congratulations! Successful dive!",
        lose: "Heads up!<br>You should give that another shot."
    },
    levels: [],
    levelDefaults: {
        hasPlayed: !0,
        sound_on: !0,
        statue_of_liberty_unlocked: !0,
        statue_of_liberty_wings: 0
    },
    continued: !1,
    version: 2
}, mapdive.UI.showUI = function () {
    setTimeout(function () {
        $(".layer-ui, .layer-ui-controls").show().animate({
            opacity: 1
        }), $("#attract").animate({
            paddingTop: "100px"
        }), mapdive.UI.showAttract()
    }, 2500)
}, mapdive.UI.hideScreens = function () {
    window.scrollTo(0, 0), mapdive.UI.screens.hide(), $("body, html").removeClass("technology"), $("#finished").removeClass("on"), $("#hud-viewport").removeClass("full missed success paused")
}, mapdive.UI.goHome = function (a) {
    mapdive.UI.forceClose = !0, mapdive.control.sendMessage({
        hud: "hide"
    }), a.preventDefault(), mapdive.UI.showAttract()
}, mapdive.UI.toggleFullScreen = function (a) {
    a.preventDefault(), mapdive.UI.fullscreen ? (document.cancelFullScreen ? document.cancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen(), mapdive.UI.fullscreen = !1) : (document.documentElement.requestFullScreen ? document.documentElement.requestFullScreen() : document.documentElement.mozRequestFullScreen ? document.documentElement.mozRequestFullScreen() : document.documentElement.webkitRequestFullScreen && document.documentElement.webkitRequestFullScreen(), mapdive.UI.fullscreen = !0), $("body").toggleClass("full-screen-mode")
}, mapdive.UI.showAttract = function () {
    mapdive.UI.forceClose = !0, mapdive.UI.hideScreens(), mapdive.control.setGameState("idle"), $("#attract").show(), $("#attract-buttons").animate({
        bottom: "120px"
    }), $("#mapinfo-copyright").hide(), $("#mapinfo-logo").hide(), $(".experiment-tag").show()
}, mapdive.UI.showStatus = function (a) {
    mapdive.UI.preserveHUD = !0, mapdive.UI.hideScreens();
    var b = 0;
    a && (b = a.win ? 7500 : 4500, a.win ? mapdive.control.setGameState("ending") : mapdive.control.setGameState("lose")), setTimeout(function () {
        a && (mapdive.UI.preserveHUD = !0, a.win ? ($("#hud-message").html(mapdive.UI.messages.win), $("#hud-viewport").addClass("success"), mapdive.UI.calculateScore()) : ($("#hud-message").html(mapdive.UI.messages.lose), $("#hud-viewport").addClass("missed"), mapdive.UI.trackEvent("Complete", "Missed", mapdive.control.getCurrentLevel().name))), $("#hud-viewport").addClass("full"), setTimeout(function () {
            $("#finished").toggleClass("on")
        }, 300)
    }, b)
}, mapdive.UI.calculateScore = function () {
    var a = mapdive.control.getScore(),
        b = 40 * (a.gates / a.totalGates),
        c = 40 * (a.stars / a.totalStars),
        d = a.gotBonus ? 20 : 0,
        e = b + c + d,
        f = 0;
    e >= 50 && (f = 1), e >= 80 && (f = 2), e >= 90 && (f = 3);
    var g = mapdive.control.getCurrentLevel().name.replace(/ /g, "_"),
        h = {};
    h[g + "_success"] = !0, h[g + "_score"] = e, h[g + "_bonus"] = a.gotBonus, h[g + "_gates"] = a.gates, h[g + "_stars"] = a.stars, h[g + "_wings"] = Math.max(parseInt(mapdive.UI.data[g + "_wings"]), f);
    var i = mapdive.UI.levels[mapdive.UI.levels.indexOf(g) + 1];
    i && !mapdive.UI.data[i + "_unlocked"] && (h[i + "_unlocked"] = !0, h[i + "_wings"] = 0, mapdive.UI.unlockLevel(i)), parseInt(mapdive.UI.data[g + "_wings"]) < f && mapdive.UI.setWings(g, f), $(".score-message .wing").slice(0, f).each(function () {
        $(this).addClass("on")
    }), mapdive.UI.writeData(h), mapdive.UI.trackEvent("Complete", "Success", mapdive.control.getCurrentLevel().name, parseInt(e, 10))
}, mapdive.UI.showLevelSelect = function (a) {
    a.preventDefault(), mapdive.UI.forceClose = !0, mapdive.control.sendMessage({
        hud: "hide"
    }), mapdive.UI.hideScreens(), mapdive.control.setGameState("paused"), $("#levels").show()
}, mapdive.UI.showTechnology = function (a) {
    if (a.preventDefault(), !$("#technology").is(":visible")) {
        if (mapdive.UI.forceClose = !0, mapdive.control.sendMessage({
            hud: "hide"
        }), $("#mapinfo-copyright").hide(), $("#mapinfo-logo").hide(), $(".experiment-tag").show(), $("#technology .content").css({
            opacity: 0
        }), $(".tech-inner").css({
            opacity: 0
        }), $("#HUD").delay(1250).hide(), $("#attract").is(":visible")) $("#attract-buttons").animate({
            bottom: "-100px"
        }, 350, "linear", function () {
            mapdive.UI.hideScreens(), mapdive.control.setGameState("paused"), $("body, html").addClass("technology"), $("#technology").show().find(".tech-inner").delay(800).animate({
                opacity: 1
            }, 700, "linear").end().find(".content").delay(500).animate({
                opacity: 1
            }, 400, "linear")
        });
        else {
            var b = $(".ui-screen:visible").not("#finished");
            if (0 === b.length) {
                mapdive.UI.hideScreens(), mapdive.control.setGameState("paused"), $("body, html").addClass("technology");
                var c = $("#technology h1");
                c.css({
                    marginTop: "-300px"
                }), $("#technology").show().find(".tech-inner").delay(1400).animate({
                    opacity: 1
                }, 700, "linear").end().find(".content").delay(500).animate({
                    opacity: 1
                }, 400, "linear"), c.animate({
                    marginTop: 0
                }, 350, "linear")
            } else b.animate({
                opacity: 0
            }, 400, "linear", function () {
                mapdive.UI.hideScreens(), b.css({
                    opacity: 1
                }), mapdive.control.setGameState("paused"), $("body, html").addClass("technology");
                var a = $("#technology h1");
                a.css({
                    marginTop: "-300px"
                }), $("#technology").show().find(".tech-inner").delay(200).animate({
                    opacity: 1
                }, 700, "linear").end().find(".content").delay(500).animate({
                    opacity: 1
                }, 400, "linear"), a.animate({
                    marginTop: 0
                }, 350, "linear")
            })
        }
        mapdive.control.viewState.player.trails = 0, mapdive.control.setCameraMode("start-engine", 1), $("#technology .tech-inner, #technology .tech-block").each(function () {
            var a = $(this),
                b = a.data("bg");
            b && a.css({
                backgroundImage: "url(/images/tech/" + b + ")"
            })
        });
        var d = $("#technology .tech-map"),
            e = d.data("src");
        d[0].src = "/images/tech/" + e, mapdive.UI.trackEvent("Technology", "Show")
    }
}, mapdive.UI.showCredits = function (a) {
    a.preventDefault(), mapdive.UI.forceClose = !0, mapdive.UI.hideScreens(), $("#credits").show()
}, mapdive.UI.showLoading = function () {
    mapdive.UI.loadingCanvas = $("#loading-animation")[0], mapdive.UI.loadingCanvas.width = 200, mapdive.UI.loadingCanvas.height = 200, mapdive.UI.drawLoadingProgress(0), $("#loading").show()
}, mapdive.UI.drawLoadingProgress = function (a) {
    var b = mapdive.UI.loadingCanvas.getContext("2d");
    b.clearRect(0, 0, mapdive.UI.loadingCanvas.width, mapdive.UI.loadingCanvas.height), b.save(), b.lineWidth = 16, b.lineCap = "round", b.translate(100, 100), b.rotate(135 * (Math.PI / 180));
    var c = .75 * 2 * Math.PI;
    b.save(), b.shadowOffsetX = 0, b.shadowOffsetY = 0, b.shadowBlur = 12, b.shadowColor = "rgba(0, 0, 0, .25)", b.strokeStyle = "white", b.beginPath(), b.arc(0, 0, 80, c * a, c), b.stroke(), b.restore(), b.save(), b.shadowOffsetX = 0, b.shadowOffsetY = 0, b.shadowBlur = 12, b.shadowColor = "rgba(0, 0, 0, .25)", b.strokeStyle = "#fed151", b.beginPath(), b.arc(0, 0, 80, 0, c * a), b.stroke(), b.restore(), b.restore()
}, mapdive.UI.loadingProgress = function (a, b) {
    mapdive.UI.drawLoadingProgress(a / b)
}, mapdive.UI.loadingComplete = function () {
    mapdive.sound.initialize(), mapdive.UI.setLocalStorage(), mapdive.UI.ping(), $("#loading img").delay(350).animate({
        marginTop: "600px"
    }, 450, "linear", function () {
        onAssetsLoaded(), mapdive.UI.showUI(), mapdive.UI.setUICopyright()
    }), $("#loading-animation").delay(500).animate({
        opacity: 0
    }, 250)
}, mapdive.UI.setUICopyright = function () {
    setTimeout(function () {
        var a = $("#map-info-copytext"),
            b = $("#map-container").text();
        b = $.trim(b.replace(/Map Data(.+?)-.+/, "$1")), "" === b ? mapdive.UI.setUICopyright() : a.html(b)
    }, 200)
}, mapdive.UI.setLocalStorage = function () {
    localStorage.version && parseInt(localStorage.version) === mapdive.UI.version || (localStorage.clear(), localStorage.setItem("version", mapdive.UI.version))
}, mapdive.UI.selectLevel = function (a) {
    a.preventDefault();
    var b = $(this);
    if (!b.hasClass("locked")) {
        var c = b.data("level");
        mapdive.control.setCurrentLevelName(c), mapdive.UI.startLevel()
    }
}, mapdive.UI.startLevelAgain = function () {
    mapdive.UI.hideScreens(), mapdive.control.setGameState("intro"), $(".wing").removeClass("on"), mapdive.UI.trackEvent("Play", "Restart", mapdive.control.getCurrentLevel().name)
}, mapdive.UI.playGame = function (a) {
    a.preventDefault(), mapdive.control.setCurrentLevelName("statue of liberty"), mapdive.UI.startLevel()
}, mapdive.UI.startLevel = function () {
    $("#HUD").show(), mapdive.UI.forceClose = !0, mapdive.UI.hideScreens(), mapdive.control.setGameState("intro"), $(".score-message .wing").removeClass("on"), setTimeout(function () {
        mapdive.UI.needsInstruction ? $("#instructions").show().animate({
            height: "88%",
            opacity: 1
        }, 300, "swing") : mapdive.UI.showSearch()
    }, 2e3), mapdive.UI.trackEvent("Play", "Start", mapdive.control.getCurrentLevel().name)
}, mapdive.UI.showSearch = function () {
    function a() {
        $("#search-box").css({
            "max-width": "600px"
        }), $("#search, #search-box").show(), $("#location-box").hide(), mapdive.UI.typeText($("#search-box .text")[0], mapdive.getLevelByName(mapdive.control.getCurrentLevelName()).description.target, 0, 50, mapdive.UI.completeSearch)
    }
    mapdive.UI.forceClose = !0, mapdive.UI.needsInstruction ? ($("#instructions").animate({
        height: "118%",
        opacity: 0
    }, 300, "swing", function () {
        mapdive.UI.hideScreens(), a()
    }), mapdive.control.setGameState("start"), mapdive.UI.needsInstruction = !1) : ($("#instructions").css({
        height: "118%",
        opacity: 0
    }), mapdive.UI.hideScreens(), a()), $("#mapinfo-copyright").show(), $("#mapinfo-logo").show(), $(".experiment-tag").hide()
}, mapdive.UI.completeSearch = function () {
    setTimeout(function () {
        $("#search-box").animate({
            maxWidth: 0
        }, 260, "swing", function () {
            mapdive.UI.hideScreens()
        })
    }, 1200)
}, mapdive.UI.playNextLevel = function () {
    var a = mapdive.getNextLevel(mapdive.control.getCurrentLevel().name).name;
    mapdive.control.setCurrentLevelName(a), mapdive.UI.startLevel()
}, mapdive.UI.evaluateKeyDown = function (a) {
    32 === a.keyCode && (a.preventDefault(), "paused" === mapdive.control.viewState.state && $("#hud-viewport").is(".paused") ? (mapdive.UI.hideScreens(), mapdive.control.setGameState("dive"), $("#hud-viewport").removeClass("paused")) : "dive" === mapdive.control.viewState.state ? (mapdive.control.setGameState("paused"), $("#hud-message").html(mapdive.UI.messages.paused), mapdive.UI.showStatus(), $("#hud-viewport").addClass("paused")) : $("#instructions").is(":visible") && mapdive.UI.continued === !1 && (mapdive.UI.continued = !0, setTimeout(function () {
        mapdive.UI.showSearch()
    }, 1500)))
}, mapdive.UI.resume = function (a) {
    a.preventDefault(), mapdive.UI.hideScreens(), mapdive.control.setGameState("dive"), $("#hud-viewport").removeClass("paused")
}, mapdive.UI.toggleSound = function (a) {
    a.preventDefault(), mapdive.UI.mute = !mapdive.UI.mute, $(this).toggleClass("off"), mapdive.UI.writeData({
        mute_on: mapdive.UI.mute
    }), mapdive.sound.setMute(mapdive.UI.mute)
}, mapdive.UI.initSound = function () {
    mapdive.UI.data && mapdive.UI.data.mute_on && "false" !== mapdive.UI.data.mute_on && (mapdive.UI.mute = !0, $("#toggle-sound").toggleClass("off")), mapdive.sound.setMute(mapdive.UI.mute)
}, mapdive.UI.initScoring = function () {
    for (var a = 0; a < mapdive.levels.length; a++)
        if ("EMPTY" != mapdive.levels[a].name) {
            var b = mapdive.levels[a].name.replace(/ /g, "_");
            mapdive.UI.levels.push(b), mapdive.UI.data[b + "_unlocked"] ? (mapdive.UI.unlockLevel(b), mapdive.UI.data[b + "_wings"] ? mapdive.UI.setWings(b, mapdive.UI.data[b + "_wings"]) : mapdive.UI.setWings(b, 0)) : mapdive.UI.lockLevel(b)
        }
}, mapdive.UI.lockLevel = function (a) {
    var b = $("#card_" + a);
    b.addClass("locked"), b.find(".level-wings").after('<div class="level-lock"></div>').remove()
}, mapdive.UI.unlockLevel = function (a) {
    var b = $("#card_" + a);
    b.removeClass("locked"), b.find(".level-lock").after('<div class="level-wings"><span class="wing"></span><span class="wing"></span><span class="wing"></span></div>').remove()
}, mapdive.UI.setWings = function (a, b) {
    $("#card_" + a + " .wing").each(function () {
        $(this).removeClass("on")
    }).slice(0, b).each(function () {
        $(this).addClass("on")
    })
}, mapdive.UI.disconnectUser = function (a) {
    a.preventDefault();
    var b = "https://accounts.google.com/o/oauth2/revoke?token=" + mapdive.UI.auth.access;
    $.ajax({
        type: "GET",
        url: b,
        async: !1,
        contentType: "application/json",
        dataType: "jsonp",
        success: function () {
            $(".sign-in").addClass("on"), $(".log-out").removeClass("on"), $("#user-display").find("p:first, img").remove(), window.signInCallback()
        },
        error: function () {}
    })
}, mapdive.UI.writeData = function (a) {
    mapdive.UI.auth.signedIn ? $.ajax({
        url: SERVER_PREFIX + "details/" + mapdive.UI.auth.id,
        data: {
            json: JSON.stringify(a),
            _method: "post"
        },
        dataType: "jsonp",
        success: function () {
            $.get(SERVER_PREFIX + "details/" + mapdive.UI.auth.id, function (a) {
                mapdive.UI.data = jQuery.extend({}, a)
            }, "jsonp")
        }
    }) : ($.each(a, function (a, b) {
        localStorage.setItem(a, b)
    }), mapdive.UI.data = jQuery.extend({}, localStorage))
}, mapdive.UI.typeText = function (a, b, c, d, e) {
    a.innerHTML = b.substr(0, c), c < b.length + 1 ? setTimeout(function () {
        mapdive.UI.typeText(a, b, c + 1, d, e)
    }, d) : $.isFunction(e) && setTimeout(e, 600)
}, mapdive.UI.trackEvent = function (a, b, c, d) {
    _gaq && _gaq.push(["_trackEvent", a, b, c, d])
}, mapdive.UI.ping = function () {
    $(".sign-in, .log-out").hide(), $.ajax({
        url: SERVER_PREFIX + "hb",
        dataType: "jsonp",
        success: function () {
            $(".sign-in, .log-out").show()
        }
    })
}, window.signInCallback = function (a) {
    a && void 0 == a.error ? (mapdive.UI.trackEvent("Login", "Success"), gapi.auth.setToken(a), gapi.client.load("plus", "v1", function () {
        var a = gapi.client.plus.people.get({
            userId: "me"
        });
        a.execute(function (a) {
            $("#user-display").prepend("<p>+" + a.displayName + "</p>").prepend('<img src="' + a.image.url + '" />'), $(".sign-in").removeClass("on"), $(".log-out").addClass("on")
        })
    }), mapdive.UI.auth.signedIn = !0, mapdive.UI.auth.access = a.access_token, $.get("https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + a.access_token, function (a) {
        mapdive.UI.auth.id = a.id, $.get(SERVER_PREFIX + "details/" + a.id, function (a) {
            a.error && "not found" === a.error ? mapdive.UI.writeData(mapdive.UI.levelDefaults) : a.id && (mapdive.UI.data = jQuery.extend({}, a)), mapdive.UI.initSound(), mapdive.UI.initScoring(), mapdive.UI.data = jQuery.extend({}, a)
        }, "jsonp")
    })) : (!a || a.error) && (localStorage.hasPlayed ? localStorage.hasPlayed && (mapdive.UI.data = jQuery.extend({}, localStorage)) : mapdive.UI.writeData(mapdive.UI.levelDefaults), mapdive.UI.initSound(), mapdive.UI.initScoring(), $(".sign-in").addClass("on"), $(".log-out").removeClass("on"), mapdive.UI.data = jQuery.extend({}, localStorage))
}, document.getElementById("btn-home").addEventListener("click", mapdive.UI.goHome), document.getElementById("btn-full-screen").addEventListener("click", mapdive.UI.toggleFullScreen), document.getElementById("link-technology").addEventListener("click", mapdive.UI.showTechnology), document.getElementById("btn-play-game").addEventListener("click", mapdive.UI.playGame), document.getElementById("btn-play-again").addEventListener("click", mapdive.UI.startLevelAgain), document.getElementById("btn-restart-level").addEventListener("click", mapdive.UI.startLevelAgain), document.getElementById("btn-select-level-attract").addEventListener("click", mapdive.UI.showLevelSelect), document.getElementById("btn-select-level-status").addEventListener("click", mapdive.UI.showLevelSelect), document.getElementById("btn-next-level").addEventListener("click", mapdive.UI.playNextLevel), document.getElementById("btn-resume").addEventListener("click", mapdive.UI.resume), document.getElementById("btn-quit").addEventListener("click", mapdive.UI.goHome), document.getElementById("toggle-sound").addEventListener("click", mapdive.UI.toggleSound), document.getElementById("link-log-out").addEventListener("click", mapdive.UI.disconnectUser), document.getElementById("instructions").addEventListener("click", function () {
    mapdive.UI.continued === !1 && (mapdive.UI.continued = !0, setTimeout(function () {
        mapdive.UI.showSearch()
    }, 1500))
}), window.addEventListener("keydown", mapdive.UI.evaluateKeyDown), $("#btn-play-game span, #btn-select-level-attract span, .level-inner, #finished .nav .btn").on("mouseenter", function () {
    mapdive.sound.playUISound()
}), mapdive.control.addListener("diveEnded", mapdive.UI.showStatus), mapdive.UI.levelCards.each(function () {
    this.addEventListener("click", mapdive.UI.selectLevel)
}), mapdive.UI.shareLinks.click(function () {
    mapdive.UI.trackEvent("Share", $(this).data("action"), $(this).data("label"))
});
var assetManager;
$(document).on("ready", function () {
    mapdive.UI.showLoading(), loadMapStyles(), assetManager = new mapdive.AssetManager, loadAssets(), $("#css-viewport").css({
        width: viewportMetrics.width,
        height: viewportMetrics.height
    })
});