/**
 * UserReplay Client Capture Library.
 * http://www.userreplay.com
 *
 * @version 2.8.13
 * @build 80477b0
 * @copyright 2016 User Replay Ltd.
 */
;
(function() {
    (function() {
        var e, t, r, n, i, a, o, u, s, d, c, f, l, h, p, g, m, v, y, b, w, E, N, S, x, T, _, C, L, I, R, A, P, k, O, D, M, U, F, q, V, B, X, j, K, H, W, J, Y, G, z, $, Z, Q, ee, te, re, ne, ie, ae, oe, ue, se, de, ce, fe;
        e = function() {
            var e = {};
            return {
                fire: function(t) {
                    var r = Array.prototype.slice.call(arguments, 1);
                    if (!e[t]) {
                        return
                    }
                    for (var n in e[t]) {
                        if (e[t].hasOwnProperty(n)) {
                            e[t][n].apply(t, r)
                        }
                    }
                },
                on: function(t, r) {
                    if (typeof r === "function") {
                        (e[t] = e[t] || []).push(r)
                    }
                }
            }
        }();
        t = {
            captureMode: {
                DEFAULT: 0,
                SIMPLE: 1
            }
        };
        r = function(e, t) {
            return e === t
        };
        n = function(e, t) {
            return e.test(t)
        };
        i = function(e, t) {
            return function(r, n, i, a) {
                var o = [],
                    u, s;
                for (var d = 0; d < r.length; d++) {
                    s = r[d][n] instanceof RegExp ? t : e;
                    if (r[d].hasOwnProperty(n) && s(r[d][n], i)) {
                        if (a) {
                            u = r.splice(d, 1);
                            o.push(u[0]);
                            d--
                        } else {
                            o.push(r[d])
                        }
                    }
                }
                if (o.length === 0) {
                    return null
                } else {
                    return o.length > 1 ? o : o[0]
                }
            }
        }(r, n);
        a = function(e, t) {
            var r = [];
            for (var n = 0; n < e.length; n++) {
                r.push(e[n][t])
            }
            return r.length > 1 ? r : r[0]
        };
        o = function(e) {
            return e.replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "")
        };
        u = function(e, t) {
            if (!e || e.length === 0) {
                return -1
            }
            for (var r = 0; r < e.length; r++) {
                if (e[r] === t) {
                    return r
                }
            }
            return -1
        };
        s = function(e, t) {
            return function(r, n) {
                if (r.length < 1) {
                    return false
                }
                if (e(r, n) !== -1) {
                    return true
                }
                for (var i = 0; i < r.length; i++) {
                    if (r[i] instanceof RegExp) {
                        if (t(r[i], n)) {
                            return true
                        }
                    }
                }
                return false
            }
        }(u, n);
        d = function(e) {
            return Object.prototype.toString.call(e) === "[object String]"
        };
        c = window.document;
        f = function(e) {
            function t(e) {
                this.selectors = e
            }
            t.prototype.applyRule = function() {
                var t = e.querySelectorAll(this.selectors);
                if (!t.length) {
                    t = [t]
                }
                for (var r = 0; r < t.length; r++) {
                    t[r].urScrubRule = {
                        target: "childNodes"
                    }
                }
            };
            return t
        }(c);
        l = function(e, t, r, n, i, a, o, u, s) {
            var d = null,
                c = ["id", "server"],
                f = {
                    fields: {
                        id: [],
                        name: [],
                        class: []
                    },
                    xhr: {
                        postParam: [],
                        json: {
                            requestBody: [],
                            responseText: []
                        }
                    }
                },
                l = {
                    xhr: []
                },
                h = {
                    mouseover: [],
                    mouseout: [],
                    click: [],
                    focus: [],
                    blur: [],
                    change: [],
                    keypress: [],
                    load: [],
                    xhr: []
                },
                p = {
                    node: [],
                    xhr: {
                        responseText: [],
                        requestBody: []
                    }
                },
                g = {
                    page: [],
                    formAction: [],
                    form: [],
                    field: {
                        id: [],
                        name: ["__VIEWSTATE"]
                    },
                    xhr: {
                        json: {
                            requestBody: [],
                            responseText: []
                        },
                        target: [],
                        postParam: ["__VIEWSTATE"],
                        responseText: true
                    },
                    xhrResponseText: true
                },
                m = [],
                v = [],
                y = {
                    angularHashPrefix: "!",
                    angularPrettyUrls: true,
                    angularRoutesToSteps: true,
                    autoCapture: true,
                    autoCaptureEvent: "load",
                    autoCaptureDelay: 0,
                    animationReplayFidelity: 100,
                    captureCookies: true,
                    captureDimensions: true,
                    captureEvents: true,
                    captureForms: true,
                    captureMode: t.captureMode.DEFAULT,
                    captureReferrer: true,
                    captureSource: true,
                    captureSourceMaxSize: 0,
                    captureStateChanges: false,
                    captureXhr: true,
                    cookieName: "UrCapture",
                    dnt: false,
                    errorReporting: true,
                    eventCacheFlushLimit: 8192,
                    formAnalysis: true,
                    id: undefined,
                    iframes: false,
                    passiveCapture: false,
                    pageTimeout: 20,
                    scrubMask: "xX9*",
                    scrubCardsPartial: true,
                    server: undefined,
                    storageDomain: null,
                    storageTarget: null,
                    suppressWhitespace: true,
                    version: undefined,
                    windowLoadTimeout: 5e3
                };

            function UrConfig(e, t) {
                y.id = e;
                y.server = t;
                d.init();
                return d
            }

            function b() {}
            b.prototype = {
                constructor: UrConfig,
                init: function() {
                    this.id = y.id;
                    this.server = y.server
                },
                get: function(e) {
                    if (!e) {
                        return y
                    }
                    return typeof y[e] === "undefined" ? false : y[e]
                },
                set: function(e, t) {
                    if (y.hasOwnProperty(e) && a(c, e) === -1) {
                        y[e] = t
                    }
                    return this
                },
                show: function() {
                    return y
                },
                addNodeEventTrigger: function(e, t, r, n, i, a) {
                    if (!document.URL.match(n)) {
                        return this
                    }
                    h[e].push({
                        selectors: t,
                        type: e,
                        capture: {
                            selectors: r,
                            mode: i || "html",
                            delay: a || 0
                        }
                    });
                    return this
                },
                addXhrEventTrigger: function(e, t, r, n) {
                    h.xhr.push({
                        target: e,
                        type: "xhr",
                        capture: {
                            selectors: t,
                            mode: r || "html",
                            delay: n || 0
                        }
                    });
                    return this
                },
                addWindowEventTrigger: function(e, t, r, n, i) {
                    if (!document.URL.match(t)) {
                        return this
                    }
                    h[e].push({
                        type: e,
                        capture: {
                            selectors: r,
                            mode: n || "html",
                            delay: i || 0
                        }
                    });
                    return this
                },
                getXhrEventTrigger: function(e) {
                    try {
                        return r(h.xhr, "target", e)
                    } catch (e) {
                        return null
                    }
                },
                excludePage: function(t) {
                    if (!(t instanceof RegExp)) {
                        return this
                    }
                    try {
                        if (a(g.page, t) === -1) {
                            g.page.push(t)
                        }
                    } catch (t) {
                        e.fire("error:raise", t, "core/config:excludePage")
                    }
                    return this
                },
                excludeFormAction: function(t) {
                    if (!(t instanceof RegExp)) {
                        return this
                    }
                    try {
                        if (a(g.formAction, t) === -1) {
                            g.formAction.push(t)
                        }
                    } catch (t) {
                        e.fire("error:raise", t, "core/config:excludeFormAction")
                    }
                    return this
                },
                excludeXhr: function(t) {
                    if (!(t instanceof RegExp)) {
                        return this
                    }
                    try {
                        if (a(g.xhr.target, t) === -1) {
                            g.xhr.target.push(t)
                        }
                    } catch (t) {
                        e.fire("error:raise", t, "core/config:excludeXhr")
                    }
                    return this
                },
                excludeXhrPostParam: function(t) {
                    if (u(t)) {
                        t = [t]
                    }
                    try {
                        for (var r = 0; r < t.length; r++) {
                            if (a(g.xhr.postParam, t[r]) === -1) {
                                g.xhr.postParam.push(t[r])
                            }
                        }
                    } catch (t) {
                        e.fire("error:raise", t, "core/config:excludeXhrPostParam")
                    }
                    return this
                },
                excludeXhrResponseText: function(e) {
                    g.xhr.responseText = e;
                    return this
                },
                excludeStateChangesToElements: function(e) {
                    var t = e.split(",");
                    if (t.length > 0) {
                        for (var r = 0; r < t.length; r++) {
                            if (a(m, t[r]) === -1) {
                                m.push(t[r])
                            }
                        }
                    }
                    return this
                },
                getStateChangeExclusionSelectors: function() {
                    return m
                },
                excludeAttrChanges: function(e) {
                    if (a(ignore.stateChanges.attr, e)) {
                        g.stateChanges.attr.push(e)
                    }
                    return this
                },
                excludeSubtreeChanges: function(e) {
                    if (a(ignore.stateChanges.subtree, e)) {
                        g.stateChanges.subtree.push(e)
                    }
                    return this
                },
                addNodeScrubbingRule: function(e, t) {
                    var r;
                    if (arguments.length === 3) {
                        e = arguments[1];
                        t = arguments[2]
                    }
                    if (document.URL.match(t)) {
                        r = new s(e);
                        p.node.push(r)
                    }
                    return this
                },
                getNodeScrubbingRules: function() {
                    return p.node
                },
                getNodeEventTriggers: function() {
                    return {
                        click: h.click,
                        mouseover: h.mouseover,
                        mouseout: h.mouseout,
                        focus: h.focus,
                        blur: h.blur,
                        change: h.change,
                        keypress: h.keypress
                    }
                },
                addUploadTrigger: function(e, t, r) {
                    l[e].push({
                        url: t,
                        pause: r || 100
                    });
                    return this
                },
                getUploadTriggers: function(e, t) {
                    return r(l.xhr, "url", t)
                },
                isPageExcluded: function(e) {
                    for (var t = 0; t < g.page.length; t++) {
                        if (e.match(g.page[t])) {
                            return true
                        }
                    }
                    return false
                },
                getAttrExclusions: function() {
                    return g.stateChanges.attr
                },
                getSubtreeExclusions: function() {
                    return g.stateChanges.subtree
                },
                isXhrExcluded: function(e) {
                    for (var t = 0; t < g.xhr.target.length; t++) {
                        if (e.match(g.xhr.target[t])) {
                            return true
                        }
                    }
                    return false
                },
                isXhrResponseTextExcluded: function() {
                    return g.xhr.responseText
                },
                isFieldExcluded: function(e) {
                    var t = g.field.id.concat(g.field.name);
                    return a(t, e) !== -1
                },
                isFieldWhitelisted: function(e) {
                    if (typeof e === "undefined") {
                        return false
                    }
                    if (u(e)) {
                        e = e.split(" ")
                    }
                    for (var t = 0; t < e.length; t++) {
                        if (o([].concat(f.fields.id, f.fields.name, f.fields.class), i(e[t]))) {
                            return true
                        }
                    }
                    return false
                },
                addSimpleCaptureRule: function(e) {
                    if (a(v, e) === -1) {
                        v.push(e)
                    }
                    return this
                },
                isSimpleCaptureModeEnabled: function() {
                    for (var e = 0; e < v.length; e++) {
                        if (document.URL.match(v[e])) {
                            return true
                        }
                    }
                    return false
                },
                getExcludedXhrPostParams: function() {
                    return g.xhr.postParam
                },
                getExcludedXhrJsonKeys: function(e) {
                    return g.xhr.json[e]
                },
                getWhitelistedXhrPostParams: function() {
                    return f.xhr.postParam
                },
                getWhitelistedJsonKeys: function(e) {
                    return f.xhr.json[e]
                },
                whitelistFieldIds: function(e) {
                    if (u(e)) {
                        e = [e]
                    }
                    for (var t = 0; t < e.length; t++) {
                        if (a(f.fields.id, e[t]) === -1) {
                            f.fields.id.push(e[t])
                        }
                    }
                    return this
                },
                whitelistFieldNames: function(e) {
                    if (u(e)) {
                        e = [e]
                    }
                    for (var t = 0; t < e.length; t++) {
                        if (a(f.fields.name, e[t]) === -1) {
                            f.fields.name.push(e[t])
                        }
                    }
                    return this
                },
                whitelistFieldClasses: function(e) {
                    if (u(e)) {
                        e = [e]
                    }
                    for (var t = 0; t < e.length; t++) {
                        if (u(e[t]) && a(f.fields.class) === -1) {
                            f.fields.class.push(e[t])
                        }
                    }
                    return this
                },
                whitelistXhrPostParams: function(e) {
                    if (u(e)) {
                        e = [e]
                    }
                    for (var t = 0; t < e.length; t++) {
                        if (a(f.xhr.postParam, e[t]) === -1) {
                            f.xhr.postParam.push(e[t])
                        }
                    }
                    return this
                },
                whitelistXhrJsonKeys: function(e, t) {
                    var r = ["requestBody", "responseText"];
                    if (u(e)) {
                        e = [e]
                    }
                    if (!u(t) || a(r, t) === -1) {
                        return this
                    }
                    for (var n = 0; n < e.length; n++) {
                        if (a(f.xhr.json[t], e[n]) === -1) {
                            f.xhr.json[t].push(e[n])
                        }
                    }
                    return this
                }
            };
            d = new b;
            return d
        }(e, t, i, a, o, u, s, d, f);
        h = function() {
            var e = 0,
                t = document.domain,
                r = t.split("."),
                n = "_urDomainCheck=";
            while (e < r.length - 1 && document.cookie.indexOf(n) === -1) {
                t = r.slice(-1 - ++e).join(".");
                document.cookie = n + t + "; path=/; domain=" + t + "; max-age=3"
            }
            return t
        }();
        p = function(e, t, r, n) {
            var i = n.get("cookieName"),
                a = function() {
                    return "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
                        var t = Math.random() * 16 | 0,
                            r = e == "x" ? t : t & 3 | 8;
                        return r.toString(16)
                    })
                }(),
                o = {
                    set: function() {
                        if (!this.get()) {
                            i = n.get("cookieName");
                            e.cookie = i + "=" + a + "; path=/; domain=" + t
                        }
                        return this
                    },
                    get: function() {
                        return u(n.get("cookieName"))
                    },
                    name: function(e) {
                        if (arguments.length == 1) {
                            i = e;
                            return this
                        }
                        return i
                    }
                };

            function u(t) {
                var n, i = e.cookie.split(";");
                if (i.length === 0) {
                    return false
                }
                for (var a = 0; a < i.length; a++) {
                    n = i[a].split("=");
                    if (r(n[0]) === t && typeof n[1] !== "undefined") {
                        return r(n[1])
                    }
                }
                return false
            }
            return o
        }(c, h, o, l);
        g = function(e, t, r) {
            var n = window.performance || null,
                i = false,
                a = null,
                o, u, s;
            try {
                s = {
                    requestStart: n.timing.requestStart,
                    responseStart: n.timing.responseStart,
                    responseEnd: n.timing.responseEnd
                }
            } catch (e) {
                s = {
                    requestStart: window.urCapture.timeStarted,
                    responseStart: window.urCapture.timeStarted,
                    responseEnd: (new Date).getTime()
                }
            }

            function d() {
                var t = e.querySelector(o);
                if (t) {
                    if (a) {
                        a.disconnect()
                    }
                    i = true;
                    r.fire("page:ready")
                }
            }
            var c = {
                isReady: function() {
                    return i
                },
                initWatcher: function() {
                    o = t.getAutoCaptureNodeSelectors();
                    if (o) {
                        if (!d()) {
                            a = new MutationObserver(d);
                            a.observe({
                                childNodes: true,
                                subtree: true
                            })
                        }
                    }
                },
                resetTimings: function() {
                    var e = (new Date).getTime();
                    s.requestStart = e;
                    s.responseStart = e;
                    s.responseEnd = e
                },
                getToken: function() {
                    return u
                },
                setToken: function() {
                    var e = (new Date).getTime().toString(16),
                        t = Math.round(Math.random() * 1e6).toString(16);
                    u = e + t
                }
            };
            Object.defineProperties(c, {
                requestStart: {
                    value: function() {
                        return s.requestStart
                    },
                    enumerable: true
                },
                responseStart: {
                    value: function() {
                        return s.responseStart
                    },
                    enumerable: true
                },
                responseEnd: {
                    value: function() {
                        return s.responseEnd
                    },
                    enumerable: true
                }
            });
            c.setToken();
            return c
        }(c, l, e);
        m = function(e, t) {
            for (var r in t) {
                if (t.hasOwnProperty(r)) {
                    e[r] = t[r]
                }
            }

            function n() {
                this.constructor = e
            }
            if (typeof e === "function") {
                n.prototype = t.prototype;
                e.prototype = new n
            }
        };
        v = function() {
            var e = [];

            function t(r) {
                for (var n in r) {
                    if (r.hasOwnProperty(n)) {
                        if (typeof r[n] === "object") {
                            t(r[n])
                        } else {
                            e.push(encodeURIComponent(n) + "=" + encodeURIComponent(r[n]))
                        }
                    }
                }
            }
            return function(r) {
                e = [];
                t(r);
                return e.join("&")
            }
        }();
        y = function(e, t, r, n, i, a, o) {
            var u = [],
                s = new Image,
                d = "error.gif",
                c = "beacon.gif";

            function f(r, i) {
                var u = e.get("server") + "/" + r + "?",
                    d = {
                        cookie: t.get(),
                        url: o.URL,
                        version: e.get("version"),
                        id: e.get("id")
                    };
                if (e.get("captureReferrer")) {
                    d.referrer = o.referrer
                }
                if (i) {
                    n(d, i)
                }
                u += a(d);
                s.src = u
            }
            return {
                raiseErr: function(t, r) {
                    var n = t.number || "" + r;
                    var a = d;
                    var o = t.stack ? t.stack.toString() : r;
                    var s = {
                        errMsg: t.message,
                        errCode: t.number & 65535,
                        errName: t.name,
                        errLocation: o.replace(/(?:\r\n|\r|\n)/g, " ")
                    };
                    if (i(u, n) === -1) {
                        if (!e.get("errorReporting")) {} else {
                            f.call(this, a, s)
                        }
                        u.push(n)
                    }
                },
                fireBeacon: function() {
                    var e = c;
                    f.call(this, e)
                }
            }
        }(l, p, g, m, u, v, c);
        b = function(e) {
            return {
                getConstructorName: function(t) {
                    if (typeof Object.getPrototypeOf(t).constructor.name === "undefined") {
                        var r = /function\s(\w{1,})/;
                        var n = r.exec(Object.getPrototypeOf(t).constructor.toString());
                        return n && n.length > 1 ? e(n[1]) : ""
                    } else {
                        return Object.getPrototypeOf(t).constructor.name
                    }
                },
                get: function(e) {
                    try {
                        if (typeof Object.getPrototypeOf(e) !== "function") {
                            if (typeof e.__proto__ === "object") {
                                return e.__proto__
                            } else {
                                return object.constructor.prototype
                            }
                            return Object.__proto__
                        } else {
                            return Object.getPrototypeOf(e)
                        }
                    } catch (e) {
                        return null
                    }
                }
            }
        }(o);
        w = function(e) {
            var t = window.navigator.userAgent,
                r = window.navigator.appName;
            return {
                isIE: function() {
                    return r === "Netscape" && t.match(/Trident\/7/)
                },
                isSupported: function() {
                    try {
                        return typeof MutationObserver !== "undefined" && e.get(window) !== null
                    } catch (e) {
                        return false
                    }
                }
            }
        }(b);
        E = function(e, t) {
            function r(t) {
                if (!t || typeof t !== "object") {
                    return false
                }
                if (e.getConstructorName(t) === "undefined" && (e.getConstructorName(t).match(/XMLHttpRequest\(\)/) || e.getConstructorName(t).match(/XMLHttpRequestConstructor/))) {
                    return true
                } else {
                    return e.getConstructorName(t) === "XMLHttpRequest"
                }
            }

            function n(n) {
                if (!n || typeof n !== "object") {
                    return false
                }
                for (var i in n) {
                    if (n.hasOwnProperty(i) || t.isIE()) {
                        if (r(n[i])) {
                            TransportXhr = e.get(n[i]).constructor;
                            return TransportXhr
                        }
                    }
                }
                return n.constructor
            }
            return function() {
                var e = new XMLHttpRequest;
                return n(e)
            }()
        }(b, w);
        N = function(e) {
            var t = "";
            for (var r in e) {
                if (e.hasOwnProperty(r)) {
                    t += r + "=" + encodeURIComponent(e[r]) + "&"
                }
            }
            return t.replace(/&$/, "")
        };
        S = function(e, t, r, n, i, a, o, u, s, d, c) {
            var f = "POST",
                l = i.URL,
                h = false,
                p = 1e4,
                g = false,
                m = 1;

            function v(e, t) {
                this.disabled = h;
                this.xhr = new a;
                this.xhr.urTransport = true;
                if (e && typeof e === "function") {
                    this.xhr.urCallback = e
                }
                this.xhr.urFlags = t || {}
            }

            function y(e) {
                this.data = e;
                if (t.get("passiveCapture")) {
                    if (this.data.action !== "fORMMETA2") {
                        this.data.action = this.data.action.toLowerCase()
                    }
                }
            }
            y.prototype.format = function(e) {
                var a;
                if (t.get("passiveCapture") && this.data.action !== "page" && this.data.action !== "dom") {
                    e.setRequestHeader("Content-Type", "application/urdata");
                    e.setRequestHeader("X-UR-Capture-Type", this.data.action);
                    e.setRequestHeader("X-UR-version", t.get("version"));
                    return this.data.source
                } else {
                    e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    if (!e.urRetry) {
                        u(this.data, {
                            id: t.get("id"),
                            version: t.get("version"),
                            cookie: r.get(),
                            sequenceId: m++,
                            currentTime: (new Date).getTime()
                        });
                        if (t.get("captureCookies")) {
                            u(this.data, {
                                cookies: i.cookie
                            })
                        }
                        if (this.data.action === "PAGE") {
                            u(this.data, {
                                token: n.getToken()
                            })
                        } else {
                            u(this.data, {
                                ptoken: n.getToken()
                            })
                        }
                        if (!this.data.url) {
                            this.data.url = l
                        }
                        if (typeof this.data.requestStart === "undefined") {
                            this.data.requestStart = (new Date).getTime()
                        }
                    }
                    a = this.data.action;
                    return d(this.data)
                }
            };
            v.prototype = {
                constructor: v,
                sendData: function(r, n) {
                    var i = new y(r),
                        a = t.get("server"),
                        o, u = false;
                    a += t.get("passiveCapture") ? "?" + (new Date).getTime() : "";
                    if (this.disabled) {
                        return false
                    }
                    try {
                        if (!this.xhr.urStorageId) {
                            this.xhr.urStorageId = (new Date).getTime().toString() + Math.round(Math.random() * 100)
                        }
                        this.xhr.urRetry = n || false;
                        this.xhr.urAction = i.data.action;
                        if (this.xhr.nativeOpen) {
                            this.xhr.nativeOpen(f, a, true)
                        } else {
                            this.xhr.open(f, a, true)
                        }
                        this.xhr.timeout = p;
                        this.xhr.addEventListener("readystatechange", this.readystatechange, false);
                        this.xhr.addEventListener("timeout", this.timeout, false);
                        if (this.xhr.nativeSend) {
                            this.xhr.nativeSend(i.format(this.xhr))
                        } else {
                            this.xhr.send(i.format(this.xhr))
                        }
                        if (g && !this.xhr.urRetry && i.data.action.match(/event/i)) {
                            e.fire("transport:sent", this.xhr, i.data)
                        }
                    } catch (t) {
                        e.fire("error:raise", t, "core/transport::sendData")
                    }
                },
                readystatechange: function(t) {
                    if (this.readyState === 2) {
                        e.fire("transport:complete", this);
                        if (this.urCallback) {
                            this.urCallback.apply(this, t)
                        }
                        return
                    }
                    if (this.readyState === 3) {}
                },
                timeout: function(e) {
                    e.currentTarget.timedOut = true
                }
            };
            e.on("session:expired", function() {
                h = true
            });
            e.on("navigation:page:unloading", function() {
                g = true
            });
            return v
        }(e, l, p, g, c, E, b, m, u, N, w);
        x = function(e, t, r, n) {
            var i = "__ur__",
                a, o, u, s;

            function d() {
                s = u.contentWindow;
                urStorage.read();
                e.fire("storage:ready")
            }

            function c(r) {
                var n, i, o, u = r.origin || r.originalEvent.origin;
                if (u !== a) {
                    return false
                }
                try {
                    o = JSON.parse(r.data);
                    i = function(e) {
                        urStorage.delete(e)
                    };
                    for (var s in o.payloads) {
                        var d = o.payloads[s];
                        if (d !== null) {
                            n = new t(i.bind(this, s));
                            n.sendData(JSON.parse(d), true)
                        }
                    }
                } catch (t) {
                    e.fire("error:raise", t, "core/storage::receiver")
                }
            }
            urStorage = {
                init: function() {
                    var e, t;
                    a = r.get("storageDomain");
                    o = r.get("storageTarget");
                    if (!this.isAvailable("sessionStorage") || !o) {
                        return false
                    }
                    e = document.body;
                    t = document.createElement("urscrub");
                    u = document.createElement("iframe");
                    u.setAttribute("src", a + o);
                    u.style.display = "none";
                    u.style.width = "1px";
                    u.style.height = "1px";
                    u.style.border = "none";
                    u.style.visibility = "hidden";
                    u.onload = d;
                    u.onreadystatechange = function() {
                        if (this.readyState === "loaded" || this.readyState === "complete") {
                            d()
                        }
                    };
                    t.appendChild(u);
                    e.appendChild(t);
                    window.addEventListener("message", c, false)
                },
                isAvailable: function(e) {
                    var t = window[e],
                        r = "__ur__test";
                    try {
                        t.setItem(r, "true");
                        t.removeItem(r);
                        return true
                    } catch (e) {
                        return false
                    }
                },
                clear: function() {
                    if (!s) {
                        return
                    }
                    var e = {
                        action: "clear"
                    };
                    s.postMessage(JSON.stringify(e), a);
                    return this
                },
                delete: function(e) {
                    if (!s) {
                        return
                    }
                    var t = {
                        action: "delete",
                        key: i + e
                    };
                    s.postMessage(JSON.stringify(t), a);
                    return this
                },
                read: function() {
                    if (!s) {
                        return
                    }
                    var e = {
                        action: "read"
                    };
                    s.postMessage(JSON.stringify(e), a);
                    return this
                },
                write: function(e, t) {
                    if (!s) {
                        return
                    }
                    var r = {
                        action: "write",
                        key: i + e,
                        data: t
                    };
                    s.postMessage(JSON.stringify(r), a);
                    return this
                }
            };
            e.on("transport:sent", function(e, t) {
                urStorage.write(e.urStorageId, t)
            });
            e.on("transport:complete", function(e) {
                urStorage.delete(e.urStorageId)
            });
            return urStorage
        }(e, S, l, h);
        T = function(e, t) {
            var r = [];
            for (var n = 0; n < t; n++) {
                r.push(e)
            }
            return r.join("")
        };
        _ = function(e) {
            var t = -1;
            return function(r, n, i, a) {
                var o = e(n, i - r.length);
                a = a || t;
                return a === -1 ? o + r : r + o
            }
        }(T);
        C = {
            dec2hex: function(e) {
                return parseInt(e, 10).toString(16)
            }
        };
        L = function(e, t, r) {
            var n = 8;
            return {
                offset: function(e) {
                    var t, r = e || (new Date).getTime();
                    if (window.performance) {
                        t = window.performance.timing.responseStart
                    } else {
                        t = window.urCapture.timeStarted()
                    }
                    return r - t
                },
                output: function(e) {
                    var i;
                    if (!e) {
                        e = false
                    }
                    i = r.dec2hex(this.offset(e));
                    return t(i, "0", n)
                },
                format: function(e) {
                    e = r.dec2hex(e);
                    return t(e, "0", n)
                }
            }
        }(oe, _, C);
        I = function(e, t, r) {
            var n = "0";

            function i(e) {
                return function(t) {
                    return o(t, e)
                }
            }

            function a(e) {
                if (typeof Math.log2 === "function") {
                    return Math.log2(e)
                }
                return Math.log(e) / Math.LN2
            }

            function o(e, i) {
                var o = Math.floor(0xffffffffffff / Math.pow(256, 6 - i)),
                    u, s = "var/numberformat",
                    d;
                try {
                    e = parseInt(e, 10);
                    if (isNaN(e)) {
                        e = 0
                    }
                    if (typeof e !== "number" || isNaN(e)) {
                        u = "Could not cast number (" + e + ") to int";
                        throw new ReferenceError(u)
                    }
                    if (e < 0) {
                        if (i < 1) {
                            u = "Unable to convert to anything less than a single byte.";
                            throw new RangeError(u)
                        } else if (i > 6) {
                            u = "6 bytes is the max size supported.";
                            throw new RangeError(u)
                        }
                        if (a(-e) > 8 * i - 1) {
                            u = "Cannot convert number (" + e + ") in " + i + " bytes.";
                            throw new RangeError(u)
                        }
                        e = o + e + 1
                    } else {
                        if (a(e) >= 8 * i - 1) {
                            u = "Cannot convert number (" + e + ") in " + i + " bytes.";
                            throw new RangeError(u)
                        }
                    }
                } catch (e) {
                    if (window.urCapture.isDebug()) {
                        t.fire("error:raise", e, s + ":format");
                        throw e
                    }
                }
                return r(e.toString(16), n, i * 2)
            }
            return {
                strLen: i(4),
                id: i(1),
                xy: i(4),
                keycode: i(2),
                tabIndex: i(2),
                sequenceId: i(4)
            }
        }(l, e, _);
        R = {
            getUtf8Bytes: function(e) {
                var t, r = 0;
                if (typeof e === "undefined") {
                    return 0
                }
                for (var n = 0; n < e.length; ++n) {
                    t = e.charCodeAt(n);
                    if ((t & 65408) === 0) {
                        r += 1
                    } else if ((t & 63488) === 0) {
                        r += 2
                    } else if ((t & 63488) === 55296) {
                        r += 4;
                        ++n
                    } else {
                        r += 3
                    }
                }
                return r
            }
        };
        A = function(e, t, r, n) {
            var i = function(e) {
                return function(t) {
                    var r = t.replace(/(\s|-|\.){1}/g, ""),
                        n = /^(?:[1-9]\d{11,19})$/g,
                        i = r.length,
                        a = 1,
                        o = 0;
                    if (!r.match(n)) {
                        return false
                    }
                    while (i--) {
                        o += !(a ^= 1) ? parseInt(r[i], 10) : e[r[i]]
                    }
                    return o % 10 === 0 && o > 0
                }
            }([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]);

            function a(t, r) {
                var n = t,
                    i = "",
                    a = e.get("scrubMask"),
                    o, u;
                if (typeof t === "undefined" || t === null) {
                    return t
                }
                t = String(t);
                o = t.length;
                if (r) {
                    n = t.substr(0, o - 4);
                    i = t.substr(o - 4, o)
                }
                u = a.split("");
                n = n.replace(/[a-z]/g, u[0]);
                n = n.replace(/[A-Z]/g, u[1]);
                n = n.replace(/[^\da-zA-Z]/g, u[3]);
                n = n.replace(/\d/g, u[2]);
                return n + i
            }
            return {
                maskKeycode: function(e) {
                    var t = String.fromCharCode(e),
                        r = this.mask(t);
                    return r.charCodeAt(0)
                },
                scrubNode: function() {
                    var t = false,
                        r = this.scrubTargets.attr,
                        n = this.scrubTargets.self;
                    if (this.whitelisted) {
                        return
                    }
                    if (this.excluded) {
                        this.value = "";
                        this.attributes.value = "";
                        return
                    }
                    if (r.length > 0) {
                        for (var o = 0; o < r.length; o++) {
                            if (i(this.attributes[r[o]])) {
                                t = e.get("scrubCardsPartial")
                            }
                            this.attributes[r[o]] = a(this.attributes[r[o]], t);
                            if (r[o] === "value") {
                                this.value = this.attributes.value
                            }
                        }
                    }
                    if (n) {
                        this.value = a(this.value, t)
                    }
                },
                scrubQueryString: function(r, n) {
                    var i = r.split("&"),
                        o = [],
                        u = [],
                        s = e.getExcludedXhrPostParams(),
                        d;
                    d = e.getWhitelistedXhrPostParams();
                    for (var c = 0, f; c < i.length; c++) {
                        o = i[c].split("=");
                        if (t(s, o[0]) === -1) {
                            f = n ? encodeURIComponent(o[0]) : o[0];
                            if (t(d, o[0]) !== -1) {
                                u.push(f + "=" + o[1])
                            } else {
                                try {
                                    o[1] = JSON.parse(o[1]);
                                    o[1] = this.scrubObject(o[1]);
                                    u.push(f + "=" + JSON.stringify(o[1]))
                                } catch (e) {
                                    u.push(f + "=" + a(o[1]))
                                }
                            }
                        }
                    }
                    return u.join("&")
                },
                scrubObject: function(n, i) {
                    var o = e.getWhitelistedJsonKeys(i);
                    for (var u in n) {
                        if (n.hasOwnProperty(u)) {
                            if (t(e.getExcludedXhrJsonKeys(i), u) === -1) {
                                if (typeof n[u] === "number") {
                                    try {
                                        n[u] = n[u].toString()
                                    } catch (e) {
                                        continue
                                    }
                                }
                                if (r(n[u])) {
                                    if (t(o, u) === -1) {
                                        n[u] = a(n[u])
                                    }
                                } else {
                                    n[u] = this.scrubObject(n[u], i)
                                }
                            }
                        }
                    }
                    return n
                }
            }
        }(l, u, d, i);
        P = function(e, t, r, n, i, a, o) {
            var u = ["button", "submit", "image"];

            function s(e) {
                var t = {},
                    r, n;
                if (!e) {
                    return t
                }
                for (var i in e) {
                    if (e.hasOwnProperty(i)) {
                        if (typeof e[i].nodeName === "undefined") {
                            continue
                        }
                        r = e[i].nodeName.toLowerCase();
                        n = e[i].value;
                        if (r) {
                            t[r] = n
                        }
                    }
                }
                return t
            }

            function d() {
                if (this.name === "input" && this.attributes.type !== "button" || this.name === "select" || this.name === "option" || this.name === "textarea" || this.name === "#text" && this.parent.formField && this.parent.name !== "select" && n(u, this.parent.name) === -1) {
                    this.scrubTarget = true
                }
                this.attributes.value = this.value
            }

            function c() {
                this.scrubTargets = {
                    attr: [],
                    self: false
                };
                if (this.type === 3 && this.scrubTarget) {
                    this.scrubTargets.self = true
                }
                if (this.formField && this.attributes.value) {
                    this.scrubTargets.attr.push("value")
                }
                if (this.name === "option" && this.attributes.label) {
                    this.scrubTargets.attr.push("label")
                }
                if (this.parent && (this.parent.name === "textarea" || this.parent.name === "option")) {
                    this.scrubTargets.self = true
                }
                if (this.name === "textarea" || this.name === "select") {
                    this.scrubTargets.self = true
                }
                if (this.scrubTargets.attr.length > 0 || this.scrubTargets.self) {
                    this.scrubTarget = true
                }
            }

            function f(e) {
                if (e.type === 3 && o(e.value) === "") {
                    this.whitespace = true
                }
                this.id = e.id;
                this.name = e.name;
                this.type = e.type;
                this.attributes = s(e.attributes);
                this.stateChanges = {
                    excluded: false
                };
                this.captureTriggers = {
                    click: [],
                    mouseover: [],
                    mouseout: [],
                    focus: [],
                    blur: [],
                    change: [],
                    keypress: []
                };
                this.uuid = e.uuid || null;
                if (this.uuid) {
                    this.attributes.urid = this.uuid
                }
                this.formField = e.formField;
                this.added = e.added || false;
                this.scanId = e.scanId || 1;
                this.domNode = e.domNode;
                r.getNodeEventTriggers(this);
                this.update(e)
            }

            function l() {
                var e = this.domNode.options;
                for (var t = 0; t < e.length; t++) {
                    e[t].urNode.attributes.selected = e[t].selected
                }
            }
            f.prototype = {
                update: function(e) {
                    this.parent = e.parent;
                    this.whitelisted = e.whitelisted || false;
                    this.scrubTarget = e.scrubTarget || false;
                    this.excluded = e.excluded || false;
                    a(this.attributes, s(e.attributes));
                    this.value = e.value;
                    if (e.formField || e.parent && e.parent.formField) {
                        d.apply(this)
                    }
                    this.nextSibling = null;
                    this.scrub()
                },
                scrub: function() {
                    c.apply(this);
                    if (!this.whitelisted && this.scrubTarget) {
                        t.scrubNode.apply(this)
                    }
                },
                onchange: function() {
                    if (this.name === "select") {
                        l.apply(this)
                    }
                    if (this.name === "input" && this.attributes.type && (this.attributes.type === "checkbox" || this.attributes.type === "radio")) {
                        this.attributes.checked = this.domNode.checked
                    }
                    if (this.name === "select" || this.name === "input" || this.name === "button" || this.name === "image" || this.name === "textarea") {
                        if (this.domNode.disabled) {
                            this.attributes.disabled = this.domNode.disabled
                        } else {
                            try {
                                delete this.attributes.disabled
                            } catch (e) {}
                        }
                    }
                    this.value = this.domNode.value || "";
                    if (this.name !== "textarea") {
                        this.attributes.value = this.value
                    }
                    this.scrub()
                },
                getAttributeValueByKey: function(t) {
                    t = t.toLowerCase();
                    try {
                        if (this.attributes) {
                            return this.attributes[t]
                        }
                    } catch (t) {
                        e.fire("error:raise", t, "dom/node::getAttributeValueByKey")
                    }
                    return null
                },
                flagAsNew: function() {
                    this.added = true
                }
            };
            return f
        }(e, A, l, u, a, m, o);
        k = function(e, t) {
            var r = t || document;
            var n = typeof r.querySelectorAll === "function" ? r.querySelectorAll(e) : [];
            return n
        };
        O = function(e, t) {
            function r(e) {
                this.type = e.type;
                this.selectors = e.capture.selectors;
                this.mode = e.capture.mode;
                this.delay = e.capture.delay
            }
            r.prototype.fire = function() {
                var r = t(this.selectors);
                for (var n = 0; n < r.length; n++) {
                    switch (this.mode) {
                        case "html":
                            e.fire("state:change:trigger", {
                                attributeName: "ur-nodeupdate",
                                node: r[n],
                                delay: this.delay
                            });
                            break;
                        case "style":
                            e.fire("state:change:trigger", {
                                attributeName: "style",
                                node: r[n],
                                delay: this.delay
                            });
                            break
                    }
                }
            };
            return r
        }(e, k);
        D = function(e, t, r, n) {
            var i, a = [],
                o = false,
                u = {
                    IDLE: 0,
                    WRITING: 1,
                    FLUSHING: 2
                },
                s = u.IDLE,
                d = function() {
                    return e.get("eventCacheFlushLimit")
                };

            function c(e) {
                s = u.IDLE;
                if (this.urFlags.reset) {
                    r.fire("capture:page:newstep")
                }
            }
            i = {
                write: function(e, t) {
                    if (o) {
                        return this
                    }
                    a.push(e);
                    if (a.join("").length >= d() || t) {
                        this.flush()
                    }
                    r.fire("session:activity", {
                        timestamp: (new Date).getTime()
                    });
                    return this
                },
                flush: function(e) {
                    var t = new n(c, e),
                        r = {
                            action: "EVENT2",
                            source: a.join("")
                        };
                    a = [];
                    s = u.FLUSHING;
                    if (r.source.length === 0) {
                        return this
                    }
                    t.sendData(r);
                    return this
                },
                setFlushLimit: function(t) {
                    e.set("eventCacheFlushLimit", t);
                    return this
                },
                cacheSize: function() {
                    return a.length
                },
                isFlushing: function() {
                    return s === u.FLUSHING
                },
                reset: function() {
                    a = [];
                    t.clearCacheCookie();
                    return this
                }
            };
            r.on("session:expired", function() {
                o = true
            });
            r.on("capture:page:reset", function() {
                i.flush({
                    reset: true
                })
            });
            return i
        }(l, p, e, S);
        M = function(e, t, r, n, i) {
            var a = 0;
            var o = function() {
                function t() {
                    if (this.payload) {
                        this.cache = e;
                        this.sequenceId = this.getSequenceId();
                        this.payloadLen = n.strLen(i.getUtf8Bytes(this.eventType + this.sequenceId + this.payload.join("")));
                        this.writeToCache()
                    }
                }
                t.prototype.writeToCache = function() {
                    var e = [this.rto, this.payloadLen, this.eventType, this.sequenceId].concat(this.payload).join("");
                    this.cache.write(e);
                    return this
                };
                t.prototype.applyNodeCaptureTriggers = function(e) {
                    var t, r;
                    if (!this.webEvent || !this.webEvent.target.urNode || !this.webEvent.target.urNode.captureTriggers) {
                        return false
                    }
                    r = this.webEvent.target.urNode.captureTriggers[e];
                    for (var n = 0; n < r.length; n++) {
                        r[n].fire()
                    }
                    return this
                };
                t.prototype.getSequenceId = function() {
                    return n.sequenceId(++a)
                };
                return t
            }();
            return o
        }(D, e, x, I, R);
        U = {
            MOUSEMOVE: 1,
            MOUSECLICK: 4,
            WINDOWSCROLL: 10,
            WINDOWRESIZE: 11,
            FIELDFOCUS: 12,
            FIELDBLUR: 13,
            FIELDCHANGE: 14,
            FIELDKEYPRESS: 15,
            FORMSUBMIT: 16,
            NODEADDED: 17,
            NODEREMOVED: 18,
            NODECHANGED: 19
        };
        F = function(e, t, r, n, i, a, o, u, s, d, c) {
            var f, l = "event/mouse",
                h = function(e) {
                    o(t, e);

                    function t(t) {
                        this.eventType = a.id(c.MOUSEMOVE);
                        this.webEvent = t;
                        this.rto = n.output();
                        this.generatePayload();
                        e.call(this)
                    }
                    t.prototype.generatePayload = function() {
                        var e, t;
                        try {
                            e = a.xy(this.webEvent.pageX);
                            t = a.xy(this.webEvent.pageY);
                            this.payload = [e, t]
                        } catch (e) {
                            s.fire("error:raise", e, l + "::MouseMoveEvent")
                        }
                    };
                    return t
                }(d),
                p = function(e) {
                    o(i, e);

                    function i(i) {
                        if (i.pageX === 0 && i.pageY === 0) {
                            return
                        }
                        this.eventType = a.id(c.MOUSECLICK);
                        this.webEvent = i;
                        this.applyNodeCaptureTriggers("click");
                        if (r.get("captureMode") !== t.captureMode.SIMPLE) {
                            this.rto = n.output();
                            this.generatePayload();
                            e.call(this);
                            this.cache.flush()
                        }
                    }
                    i.prototype.generatePayload = function() {
                        var e, t, r, n, i, o, u;
                        try {
                            e = a.xy(this.webEvent.pageX);
                            t = a.xy(this.webEvent.pageY);
                            r = a.id(1);
                            o = this.webEvent.target.__ur_uuid__ || "";
                            u = a.strLen(o.toString().length);
                            n = this.webEvent.target.id || "";
                            i = a.strLen(n.length);
                            this.payload = [r, e, t, u, o, i, n]
                        } catch (e) {
                            s.fire("error:raise", e, l + "::MouseClickEvent")
                        }
                    };
                    return i
                }(d),
                g = function(e) {
                    o(t, e);

                    function t(e) {
                        this.webEvent = e;
                        this.applyNodeCaptureTriggers("mouseover")
                    }
                    return t
                }(d);
            MouseOutEvent = function(e) {
                o(t, e);

                function t(e) {
                    this.webEvent = e;
                    this.applyNodeCaptureTriggers("mouseout")
                }
                return t
            }(d);
            return {
                bindings: {
                    move: function(e) {
                        window.setTimeout(function() {
                            new h(e)
                        }, 0)
                    },
                    click: function(e) {
                        window.setTimeout(function() {
                            new p(e)
                        }, 0)
                    },
                    mouseover: function(e) {
                        window.setTimeout(function() {
                            new g(e)
                        }, 0)
                    },
                    mouseout: function(e) {
                        window.setTimeout(function() {
                            new MouseOutEvent(e)
                        }, 0)
                    }
                }
            }
        }(c, t, l, L, o, I, m, B, e, M, U);
        q = function(e, t, r, n, i, a) {
            var o = {},
                u = {},
                s = ["mouseover", "mouseout"];

            function d() {
                this.fetch()
            }
            d.prototype.fetch = function() {
                o = e.getNodeEventTriggers()
            };
            d.prototype.assign = function(e) {
                var t;
                for (var d in o) {
                    if (o.hasOwnProperty(d) && o[d].length > 0) {
                        for (var c = 0; c < o[d].length; c++) {
                            t = a(o[d][c].selectors, e);
                            for (var f = 0; f < t.length; f++) {
                                if (!u[t[f].__ur_uuid__] || u[t[f].__ur_uuid__] !== o[d][c]) {
                                    t[f].urNode.captureTriggers[d].push(new r(o[d][c]));
                                    u[t[f].__ur_uuid__] = o[d][c];
                                    if (i(s, d) !== -1) {
                                        t[f].addEventListener(d, n.bindings[d], false)
                                    }
                                }
                            }
                        }
                    }
                }
            };
            return new d
        }(l, e, O, F, u, k);
        V = function(e, t, r, n, i, a, o) {
            var u = "formfield/metadata",
                s = [],
                d = [],
                c = [],
                f = {
                    "input-text": 1,
                    "input-password": 2,
                    "input-radio": 3,
                    "input-checkbox": 4,
                    "input-hidden": 5,
                    "input-button": 6,
                    "input-submit": 7,
                    "input-image": 8,
                    "input-reset": 9,
                    "input-file": 10,
                    "input-url": 11,
                    "input-number": 12,
                    "input-date": 13,
                    "input-datetime": 14,
                    "input-datetime-local": 15,
                    "input-time": 16,
                    "input-week": 17,
                    "input-month": 18,
                    "input-range": 19,
                    "input-search": 20,
                    "input-tel": 21,
                    "input-email": 22,
                    "input-color": 23,
                    select: 24,
                    "select-multiple": 25,
                    button: 26,
                    textarea: 27
                },
                l = {
                    addForm: function(t) {
                        var r, n = a.id(1),
                            o = t.id || null,
                            d = t.getAttributeValueByKey("action") || "none",
                            f = t.getAttributeValueByKey("enctype") === "multipart/form-data" ? a.id(2) : a.id(1),
                            l, h, p;
                        if (!o) {
                            return
                        }
                        if (i(s, o) !== -1) {
                            return
                        } else {
                            s.push(o)
                        }
                        try {
                            l = a.strLen(o.length);
                            h = a.strLen(d.length);
                            p = a.strLen([l, o, h, d, f].join("").length);
                            r = [n, p, l, o, h, d, f].join("");
                            c.push(r)
                        } catch (t) {
                            e.fire("error:raise", t, u + "::addForm")
                        }
                    },
                    addField: function(r, n) {
                        var s, l = r,
                            h = a.id(2),
                            p = n ? n.id || n.getAttributeValueByKey("name") : null,
                            g = l.getAttributeValueByKey("name") ? p + "." + l.getAttributeValueByKey("name") : null,
                            m = l.value || "",
                            v = l.getAttributeValueByKey("tabindex") || null,
                            y = l.getAttributeValueByKey("tabindex") || "",
                            b = function() {
                                var e = l.name;
                                if (e === "input") {
                                    e += "-" + l.getAttributeValueByKey("type")
                                } else if (e === "select") {
                                    e += l.domNode.multiple ? "-multiple" : ""
                                }
                                return f[e]
                            }(),
                            w, E, N, S;
                        try {
                            if (!g || !p) {
                                return
                            }
                            if (t.isFieldExcluded(l.getAttributeValueByKey("name"))) {
                                return
                            }
                            if (i(d, g) !== -1) {
                                return
                            } else {
                                d.push(g)
                            }
                            w = p ? a.strLen(p.length) : a.strLen(0);
                            E = a.strLen(g.length);
                            b = a.id(b);
                            N = a.strLen(o.getUtf8Bytes(m));
                            if (y) {
                                y = a.tabIndex(y)
                            }
                            v = v ? a.id(1) : a.id(0);
                            S = a.strLen([w, p, E, g, b, N, m, v, y].join("").length);
                            s = [h, S, w, p, E, g, b, N, m, v, y].join("");
                            c.push(s)
                        } catch (t) {
                            e.fire("error:raise", t, u + "::addField")
                        }
                    },
                    flush: function() {
                        var t = new r,
                            n = {
                                action: "fORMMETA2",
                                source: c.join("")
                            };
                        if (c.length === 0) {
                            return
                        }
                        try {
                            t.sendData(n)
                        } catch (t) {
                            e.fire("error:raise", t, u + "::flush")
                        }
                        c = []
                    }
                };
            e.on("dom:scan:end", l.flush);
            return l
        }(e, l, S, B, u, I, R);
        B = function(e, t, r, n, i, a, o, u, s, d, c, f) {
            var l = function() {
                    var e, t = a.doctype;
                    if (t) {
                        e = "<!DOCTYPE " + t.name + (t.publicId ? ' PUBLIC "' + t.publicId + '"' : "") + (!t.publicId && t.systemId ? " SYSTEM" : "") + (t.systemId ? ' "' + t.systemId + '"' : "") + ">";
                        return e
                    }
                    return ""
                }(),
                h = ["INPUT", "IMG", "BR", "HR", "AREA", "PARAM", "META", "LINK", "TRACK", "SOURCE", "PICTURE", "WBR", "BASE", "EMBED"],
                p = a.documentElement,
                g = function() {
                    return l && o(l, "xhtml") !== -1
                },
                m = {
                    current: [],
                    previous: []
                },
                v = 1,
                y = 0,
                b = false,
                w = false,
                E = null,
                N = function() {
                    try {
                        return new MutationObserver(function(e) {
                            n.fire("state:change", e)
                        })
                    } catch (e) {
                        return null
                    }
                }(),
                S = {
                    observer: N,
                    scan: function(e) {
                        _();
                        if (!e) {
                            e = p
                        }
                        b = true;
                        var t = (new Date).getTime();
                        C(e, L);
                        var i = (new Date).getTime();
                        x();
                        r.assign(e);
                        y++;
                        n.fire("dom:scan:end")
                    },
                    toString: function(e) {
                        var r = "",
                            n = [],
                            u;
                        if (l && !e) {
                            u = a.doctype.nextSibling;
                            while (u) {
                                if (u.nodeType === 8) {
                                    r += "<!--" + u.nodeValue + "-->"
                                }
                                u = u.nextSibling
                            }
                        }
                        C(e || a.documentElement, function(e) {
                            var a = e.urNode;
                            if (typeof a === "undefined") {
                                this.scan(e);
                                a = e.urNode
                            }
                            if (a.type === 8) {
                                return
                            }
                            if (a.type === 3 && a.value && a.value.length > 0) {
                                if (!a.whitespace && !a.whitelisted) {
                                    t.prototype.scrub.apply(a)
                                }
                                r += T(a.value)
                            } else if (a.type === 1) {
                                if (a.name === "img") {
                                    if (i.isPageExcluded(e.src)) {
                                        return
                                    }
                                }
                                if (a.name === "iframe") {
                                    if (i.isPageExcluded(e.src)) {
                                        return
                                    }
                                }
                                if (a.formField && i.isFieldExcluded(a.id)) {
                                    return
                                }
                                if (o(h, a.name.toUpperCase()) === -1) {
                                    n.push(a.name)
                                }
                                r += "<" + a.name;
                                if (a.attributes) {
                                    for (var u in a.attributes) {
                                        if (a.attributes.hasOwnProperty(u)) {
                                            if (u === "urscrub" || u === "ur-nodeupdate" || u.match(/((x|data)-)?ng[-|_|:](bind|click|if|model|form|repeat|value|switch)(-(html|template|options|when))?/)) {
                                                continue
                                            }
                                            if (a.name === "option" && u === "selected") {
                                                if (e.selected) {
                                                    r += g() ? ' selected="selected"' : " selected"
                                                }
                                            } else if (a.name === "input" && u === "checked") {
                                                if (e.checked) {
                                                    r += g() ? ' checked="checked"' : " checked"
                                                }
                                            } else if (u === "disabled") {
                                                if (e.disabled) {
                                                    r += g() ? ' disabled="disabled"' : " disabled"
                                                }
                                            } else if (u === "multiple") {
                                                if (e.multiple) {
                                                    r += g() ? ' multiple="multiple"' : " multiple"
                                                }
                                            } else if (u === "required") {
                                                if (e.multiple) {
                                                    r += " required"
                                                }
                                            } else {
                                                if (typeof a.attributes[u] === "undefined") {
                                                    a.attributes[u] = ""
                                                }
                                                r += " " + u + '="' + a.attributes[u] + '"'
                                            }
                                        }
                                    }
                                    r += g() && o(h, a.name.toUpperCase()) !== -1 ? " />" : ">"
                                }
                            }
                        }.bind(this), function(e) {
                            var t = e.urNode;
                            if (!t) {
                                return
                            }
                            if (n[n.length - 1] === t.name) {
                                r += "</" + n.pop() + ">"
                            }
                        });
                        var s = /<urscrub\b[^>]*?\/>|<urscrub\b[^>]*>(?:(?!<urscrub\b[^>]*>|<\/urscrub>)[\S\s])*<\/urscrub>/i;
                        while (r != (r = r.replace(s, "")));
                        return T(!e ? l + r : r)
                    },
                    isXhtml: g,
                    getCurrentState: function() {
                        return m.current
                    },
                    findParentForm: function(e) {
                        if (e.formField && e.domNode.form) {
                            return e.domNode.form.urNode || null
                        }
                        return null
                    },
                    getObserver: function() {
                        return N
                    },
                    scanCount: function() {
                        return y
                    }
                };
            S.xpath = {
                get: function(e) {
                    if (e instanceof t) {
                        return e.attributes.urid.toString()
                    } else {
                        if (!e.urNode) {
                            S.scan(e)
                        }
                        return e.urNode.attributes.urid.toString()
                    }
                }
            };

            function x() {
                var e = i.getStateChangeExclusionSelectors(),
                    t;
                if (e.length > 0) {
                    t = a.querySelectorAll(e.join(","))
                }
                if (t) {
                    for (var r = 0; r < t.length; r++) {
                        if (t[r].urNode) {
                            t[r].urNode.stateChanges = {
                                excluded: true
                            }
                        }
                    }
                }
            }

            function T(e) {
                e = e.replace(/\t/, "");
                e = e.replace(/  {2,}/g, " ");
                e = e.replace(/(\r\n|\n|\r){2,}/g, "$1");
                e = e.replace(/(\r\n|\r|\n) /, "$1");
                return e
            }

            function _() {
                var e = i.getNodeScrubbingRules();
                if (e === null) {
                    return
                }
                if (!Array.isArray(e)) {
                    e = [e]
                }
                for (var t = 0; t < e.length; t++) {
                    e[t].applyRule()
                }
            }

            function C(e, t, r) {
                var n = e;
                t(e);
                if (b && e.urScrubRule && e.urScrubRule.target === "childNodes") {
                    w = true;
                    E = n
                }
                e = e.firstChild;
                while (e) {
                    C(e, t, r);
                    e = e.nextSibling
                }
                if (w && E === n) {
                    w = false;
                    E = null
                }
                if (r && n.nodeType === 1 && o(h, n.nodeName.toUpperCase()) === -1) {
                    r(n)
                }
            }

            function L(e) {
                if (e.__ur_uuid__) {
                    return
                }
                var r = ["input", "select", "option", "optgroup", "textarea", "button"],
                    a, o = e.nodeName.toLowerCase(),
                    s = {
                        id: e.id,
                        name: o,
                        type: e.nodeType,
                        attributes: e.attributes,
                        value: typeof e.value === "string" ? e.value : e.nodeValue,
                        formField: r.indexOf(o) !== -1,
                        parent: e.parentNode ? e.parentNode.urNode : null,
                        domNode: e
                    },
                    d, c, l, h;
                if (e.nodeType === 1 || e.nodeType === 11) {
                    e.__ur_uuid__ = v;
                    v++;
                    s.uuid = e.__ur_uuid__
                }
                if (w && s.type === 3 && u(s.value).length > 0) {
                    s.scrubTarget = true
                }
                if (s.formField || s.parent && s.parent.formField) {
                    do {
                        if (s.name === "input" && s.attributes.getNamedItem("type") && s.attributes.getNamedItem("type").value === "password") {
                            s.whitelisted = false;
                            break
                        }
                        if (s.name === "input" && s.attributes.getNamedItem("type") && s.attributes.getNamedItem("type").value === "button" || s.type === 3 && s.parent.name === "button") {
                            s.whitelisted = true;
                            break
                        }
                        d = s.attributes && s.attributes.getNamedItem("name") ? s.attributes.getNamedItem("name").value : null;
                        c = s.attributes && s.attributes.getNamedItem("class") ? s.attributes.getNamedItem("class").value : null;
                        if (s.id && i.isFieldWhitelisted(s.id) || d && i.isFieldWhitelisted(d) || c && i.isFieldWhitelisted(c)) {
                            s.whitelisted = true;
                            break
                        }
                        if (s.parent) {
                            l = s.parent.name === "optgroup" ? s.parent.parent : s.parent;
                            d = l.attributes.name || null;
                            c = l.attributes.class || null;
                            if (s.type === 1 && l && l.name && l.name === "select" || s.type === 3 && l && l.name && l.name === "button" || s.type === 3 && l && l.name && l.name === "input" || s.type === 3 && l && l.name && l.name === "textarea") {
                                if (s.type === 3 && l && l.name && l.name === "button" || i.isFieldWhitelisted(l.id) || d && i.isFieldWhitelisted(d) || c && i.isFieldWhitelisted(c)) {
                                    s.whitelisted = true;
                                    break
                                }
                            }
                        }
                        if (s.type === 3 && s.parent && s.parent.name === "option") {
                            l = s.parent.parent.name === "optgroup" ? s.parent.parent.parent : s.parent.parent;
                            d = l && l.attributes.name || null;
                            c = l && l.attributes.class || null;
                            if (l) {
                                if (i.isFieldWhitelisted(l.id) || d && i.isFieldWhitelisted(d) || c && i.isFieldWhitelisted(c)) {
                                    s.whitelisted = true;
                                    break
                                }
                            }
                        }
                        if (!s.whitelisted) {
                            s.scrubTarget = true;
                            break
                        }
                        break
                    } while (true)
                }
                if (s.formField && s.attributes.getNamedItem("name") && i.isFieldExcluded(s.attributes.getNamedItem("name").value)) {
                    s.excluded = true
                }
                s.scanId = y;
                h = new t(s);
                e.urNode = h;
                if (y === 0) {
                    n.fire("dom:scan:newnode", e.__ur_uuid__)
                }
                if (o === "form") {
                    if (i.get("formAnalysis")) {
                        f.addForm(h)
                    }
                    n.fire("dom:add:form", h)
                }
                if (s.formField && s.name !== "option") {
                    a = S.findParentForm(h);
                    if (a) {
                        if (i.get("formAnalysis")) {
                            f.addField(h, a)
                        }
                        e.urNode.formId = a.id
                    }
                    n.fire("dom:add:formfield", h)
                }
            }
            n.on("dom:content:loaded", function() {
                if (N) {
                    N.observe(a.body, {
                        attributes: true,
                        attributeOldValue: true,
                        childList: true,
                        subtree: true,
                        characterData: true
                    })
                }
            });
            return S
        }(oe, P, q, e, l, c, u, o, a, i, m, V);
        X = function(e, t, r, n, i, a, o, u, s, d) {
            var c = [],
                f = "event/formfield",
                l = function(r) {
                    o(a, r);

                    function a(e) {
                        this.eventType = n.id(d.FIELDFOCUS);
                        this.rto = t.output();
                        this.webEvent = e;
                        this.applyNodeCaptureTriggers("focus");
                        this.generatePayload();
                        r.call(this)
                    }
                    a.prototype.generatePayload = function() {
                        var t, r, a, o, u;
                        try {
                            t = this.webEvent.target.urNode;
                            if (t.name === "button") {
                                return
                            }
                            r = typeof t.formId !== "undefined" ? t.formId + "." + t.getAttributeValueByKey("name") : t.getAttributeValueByKey("name");
                            a = n.strLen(i.getUtf8Bytes(r));
                            o = this.webEvent.target.__ur_uuid__;
                            u = n.strLen(o.toString().length);
                            this.payload = [a, r, u, o]
                        } catch (t) {
                            e.fire("error:raise", t, f + "::FieldFocusEvent")
                        }
                    };
                    return a
                }(s),
                h = function(r) {
                    o(u, r);

                    function u(e) {
                        this.eventType = n.id(d.FIELDBLUR);
                        this.rto = t.output();
                        this.webEvent = e;
                        this.applyNodeCaptureTriggers("blur");
                        this.generatePayload();
                        r.call(this)
                    }
                    u.prototype.generatePayload = function() {
                        var t, r, o, u, s;
                        try {
                            t = this.webEvent.target.urNode;
                            var d = a(c, t.__ur_uuid__);
                            c.splice(d, 1);
                            if (t.name === "button") {
                                return
                            }
                            r = typeof t.formId !== "undefined" ? t.formId + "." + t.getAttributeValueByKey("name") : t.getAttributeValueByKey("name");
                            o = n.strLen(i.getUtf8Bytes(r));
                            u = this.webEvent.target.__ur_uuid__;
                            s = n.strLen(u.toString().length);
                            this.payload = [o, r, s, u]
                        } catch (t) {
                            e.fire("error:raise", t, f + "::FieldBlurEvent")
                        }
                    };
                    return u
                }(s),
                p = function(r) {
                    o(a, r);

                    function a(e) {
                        this.eventType = n.id(d.FIELDCHANGE);
                        this.rto = t.output();
                        this.webEvent = e;
                        this.applyNodeCaptureTriggers("change");
                        this.generatePayload();
                        r.call(this);
                        if (e.isSynthesized) {
                            e.stopPropagation()
                        }
                    }
                    a.prototype.generatePayload = function() {
                        var t, r, a, o, u, s, d, c;
                        try {
                            t = this.webEvent.target.urNode;
                            t.onchange(this.webEvent.target.value);
                            r = typeof t.formId !== "undefined" ? t.formId + "." + t.getAttributeValueByKey("name") : t.getAttributeValueByKey("name");
                            a = n.strLen(i.getUtf8Bytes(r));
                            if (t.name === "select") {
                                u = [];
                                for (var l = 0; l < t.domNode.selectedOptions.length; l++) {
                                    u.push(t.domNode.selectedOptions[l].index)
                                }
                                o = u.join(",")
                            } else if (t.name === "input" && (t.attributes.type === "checkbox" || t.attributes.type === "radio")) {
                                o = t.domNode.checked ? 1 : 0
                            } else {
                                o = t.value
                            }
                            s = n.strLen(i.getUtf8Bytes(o.toString()));
                            d = this.webEvent.target.__ur_uuid__;
                            c = n.strLen(d.toString().length);
                            this.payload = [a, r, s, o, c, d]
                        } catch (t) {
                            e.fire("error:raise", t, f + "::FieldChangeEvent")
                        }
                    };
                    return a
                }(s),
                g = function(r) {
                    o(i, r);

                    function i(e) {
                        this.eventType = n.id(d.FIELDKEYPRESS);
                        this.rto = t.output();
                        this.webEvent = e;
                        this.applyNodeCaptureTriggers("keypress");
                        this.generatePayload();
                        r.call(this)
                    }
                    i.prototype.generatePayload = function() {
                        var t, r, i, o, u, s, d, l, h;
                        try {
                            t = this.webEvent.target.urNode;
                            if (a(c, t.__ur_uuid__) !== -1) {
                                return
                            } else {
                                c.push(t.__ur_uuid__)
                            }
                            r = typeof t.formId !== "undefined" ? t.formId + "." : "";
                            i = t.getAttributeValueByKey("name") || t.getAttributeValueByKey("id") || "";
                            o = r ? r + i : i;
                            u = n.strLen(o.length);
                            d = n.keycode(0);
                            urid = this.webEvent.target.__ur_uuid__;
                            uridLen = n.strLen(urid.toString().length);
                            this.payload = [u, o, d, uridLen, urid]
                        } catch (t) {
                            e.fire("error:raise", t, f + "::FieldKeypressEvent")
                        }
                    };
                    return i
                }(s);
            FieldKeydownEvent = function(r) {
                var i = [9, 13];
                o(u, r);

                function u(e) {
                    if (a(i, e.keyCode) === -1) {
                        return
                    }
                    this.eventType = n.id(d.FIELDKEYPRESS);
                    this.rto = t.output();
                    this.webEvent = e;
                    this.applyNodeCaptureTriggers("keypress");
                    this.generatePayload();
                    r.call(this)
                }
                u.prototype.generatePayload = function() {
                    var t, r, i, a, o, u, s, d, c;
                    try {
                        t = this.webEvent.target.urNode;
                        r = typeof t.formId !== "undefined" ? t.formId + "." : "";
                        i = t.getAttributeValueByKey("name") || t.getAttributeValueByKey("id") || "";
                        a = r ? r + i : i;
                        o = n.strLen(a.length);
                        s = n.keycode(this.webEvent.keyCode);
                        urid = this.webEvent.target.__ur_uuid__;
                        uridLen = n.strLen(urid.toString().length);
                        this.payload = [o, a, s, uridLen, urid]
                    } catch (t) {
                        e.fire("error:raise", t, f + "::FieldKeydownEvent")
                    }
                };
                return u
            }(s);
            return {
                bindings: {
                    focus: function(e) {
                        window.setTimeout(function() {
                            new l(e)
                        }, 0)
                    },
                    blur: function(e) {
                        window.setTimeout(function() {
                            new h(e)
                        }, 0)
                    },
                    change: function(e) {
                        window.setTimeout(function() {
                            new p(e)
                        }, 0)
                    },
                    keypress: function(e) {
                        window.setTimeout(function() {
                            new g(e)
                        }, 0)
                    },
                    keydown: function(e) {
                        window.setTimeout(function() {
                            new FieldKeydownEvent(e)
                        }, 0)
                    }
                }
            }
        }(e, L, o, I, R, u, m, B, M, U);
        j = function(e, t, r, n, i, a, o, u, s, d, c) {
            var f = "event/submit",
                l = function(e) {
                    c(a, e);

                    function a(r) {
                        this.eventType = d.id(t.FORMSUBMIT);
                        this.rto = u.output();
                        this.webEvent = r;
                        this.generatePayload();
                        e.call(this);
                        if (this.webEvent.type && this.webEvent.type === "submit") {
                            this.cache.flush()
                        }
                    }
                    a.prototype.generatePayload = function() {
                        var e, t;
                        try {
                            e = this.webEvent.target.id;
                            t = d.strLen(e.length);
                            this.payload = [t, e]
                        } catch (e) {
                            i.fire("error:raise", e, f + "::submit")
                        }
                        if (!r.get("passiveCapture")) {
                            this.processData(this.webEvent.target)
                        }
                    };
                    a.prototype.processData = function(e) {
                        var t = new n,
                            r = {
                                action: "FORM",
                                target: e.action,
                                method: e.method.toUpperCase(),
                                data: []
                            },
                            i, a, o, u;
                        for (var s = 0; s < e.elements.length; s++) {
                            i = e.elements[s].urNode;
                            if (typeof i === "undefined") {
                                continue
                            }
                            if (i.attributes.type && i.attributes.type === "hidden") {
                                i.scrub()
                            }
                            a = i.getAttributeValueByKey("type");
                            o = i.getAttributeValueByKey("name");
                            u = i.getAttributeValueByKey("value") || i.value;
                            if (a && (a === "button" || a === "submit" || a === "image" || a === "file")) {
                                continue
                            }
                            if (i.excluded) {
                                continue
                            }
                            if (i.name === "input" || i.name === "textarea") {
                                if (typeof o !== "undefined") {
                                    if (a === "checkbox" || a === "radio") {
                                        if (e.elements[s].checked) {
                                            r.data.push(encodeURIComponent(o) + "=" + encodeURIComponent(u))
                                        }
                                    } else {
                                        r.data.push(encodeURIComponent(o) + "=" + encodeURIComponent(u))
                                    }
                                }
                            } else if (i.name === "select") {
                                if (e.elements[s].multiple) {
                                    u = [];
                                    for (var d = 0; d < e.elements[s].options.length; d++) {
                                        if (e.elements[s].options[d].selected) {
                                            u.push(encodeURIComponent(i.value))
                                        }
                                    }
                                    r.data.push(encodeURIComponent(o) + "=" + u.join(","))
                                } else {
                                    r.data.push(encodeURIComponent(o) + "=" + encodeURIComponent(u))
                                }
                            }
                        }
                        r.data = r.data.join("&");
                        t.sendData(r)
                    };
                    return a
                }(e);
            return {
                bind: function(e) {
                    new l(e)
                }
            }
        }(M, U, l, S, e, B, A, L, o, I, m);
        K = function(e, t, r, n, i, a, o) {
            var u = "event/scroll",
                s = function(n) {
                    r(a, n);

                    function a(e) {
                        this.eventType = i.id(o.WINDOWSCROLL);
                        this.rto = t.output();
                        this.generatePayload();
                        n.call(this)
                    }
                    a.prototype.generatePayload = function() {
                        var t, r;
                        try {
                            t = document.scrollingElement ? i.xy(document.scrollingElement.scrollLeft) : i.xy(document.body.scrollLeft);
                            r = document.scrollingElement ? i.xy(document.scrollingElement.scrollTop) : i.xy(document.body.scrollTop);
                            this.payload = [t, r]
                        } catch (t) {
                            e.fire("error:raise", t, u + "::ScrollEvent")
                        }
                    };
                    return a
                }(a);
            return {
                bind: function(e) {
                    window.setTimeout(function() {
                        new s(e)
                    }, 0)
                }
            }
        }(e, L, m, o, I, M, U);
        H = function(e, t, r, n, i, a, o) {
            var u = "event/touch",
                s;

            function d(e, t) {
                var n = r.output(),
                    a = i.id(t),
                    u, s, d, c, l, h = [],
                    p, g, m;
                for (var v = 0; v < e.touches.length; v++) {
                    s = new f(e.touches[v]);
                    h.push(s.get())
                }
                d = i.strLen(h.length);
                l = i.strLen(h.join("").length);
                p = [a, d, l, c].join("");
                g = i.strLen(u.length);
                m = [n, g, p].join("");
                o.write(m)
            }

            function c(t) {
                return function(r) {
                    try {
                        return d(r, t)
                    } catch (t) {
                        e.fire("err:raise", t, u + "::handleTouchByEventId")
                    }
                }
            }

            function f(e) {
                this.id = e.identifier;
                this.x = e.clientX;
                this.y = e.clientY
            }
            f.prototype.get = function() {
                var e = i.strLen(this.id.length),
                    t = i.xy(this.x),
                    r = i.xy(this.y);
                return [e, this.id, t, r].join("")
            };
            s = {
                start: c(6),
                end: c(7),
                move: c(8),
                cancel: c(9)
            };
            return {
                init: function() {
                    if (t.addEventListener) {
                        t.addEventListener("touchstart", s.start, false);
                        t.addEventListener("touchend", s.end, false);
                        t.addEventListener("touchmove", s.move, false);
                        t.addEventListener("touchcancel", s.cancel, false)
                    }
                }
            }
        }(e, c, L, o, I, B, D);
        W = function(e, t, r, n, i, a, o, u, s) {
            var d = 0,
                c = false,
                f = {
                    newStep: function() {
                        if (d > 0) {
                            d = 0;
                            n.resetTimings();
                            n.setToken();
                            window.setTimeout(function() {
                                f.page()
                            }, 1e3)
                        }
                    },
                    page: function(o) {
                        var f, l, h = {
                                action: function() {
                                    if (r.get("iframes") === true && window.document !== window.parent.document) {
                                        c = true;
                                        return "IFRAME"
                                    } else {
                                        if (o && o.action) {
                                            return o.action.toUpperCase()
                                        }
                                        return d === 0 ? "PAGE" : "DOM"
                                    }
                                }()
                            },
                            p = {
                                captureSource: r.get("captureSource"),
                                captureDimensions: r.get("captureDimensions"),
                                captureReferrer: r.get("captureReferrer"),
                                callback: undefined
                            };
                        s(p, o);
                        f = new t(p.callback);
                        if (h.action !== "DOM") {
                            h.requestStart = n.requestStart();
                            h.responseStart = n.responseStart();
                            h.responseEnd = n.responseEnd();
                            if (h.responseEnd > (new Date).getTime() || h.responseEnd < h.responseStart) {
                                h.responseEnd = h.responseStart + 1e3
                            }
                        }
                        if (p.captureSource) {
                            a.scan();
                            h.source = a.toString();
                            if (d === 0) {
                                e.fire("dom:source-captured")
                            }
                        }
                        if (p.captureDimensions) {
                            l = u.documentElement;
                            h.dimensions = [l.clientWidth, l.clientHeight].join(",")
                        }
                        if (c || p.captureReferrer && u.referrer) {
                            h.referrer = c ? window.parent.document.URL : u.referrer
                        }
                        f.sendData(h);
                        if (d === 0) {
                            i.flush()
                        }
                        d++
                    },
                    xhr: function(n) {
                        var i = new t,
                            a = {
                                action: "AJAX"
                            };
                        s(a, n);
                        if (r.isXhrExcluded(a.target)) {
                            return
                        }
                        try {
                            i.sendData(a)
                        } catch (t) {
                            e.fire("error:raise", t, "core/capture:xhr() failed")
                        }
                    },
                    event: function(r) {
                        var n = new t,
                            i = {
                                action: "EVENT2"
                            };
                        s(i, r);
                        try {
                            n.sendData(i)
                        } catch (t) {
                            e.fire("error:raise", t, "core/capture:event() failed")
                        }
                    },
                    keepAlive: function() {
                        var r = new t,
                            n = {
                                action: "KEEP-ALIVE"
                            };
                        try {
                            r.sendData(n)
                        } catch (t) {
                            e.fire("error:raise", t, "core/capture:keepAlive() failed")
                        }
                    }
                };
            e.on("capture:page:newstep", function(e) {
                f.newStep(e)
            });
            return f
        }(e, S, l, g, D, B, V, c, m);
        J = function(e, t, r, n, i) {
            var a = false;

            function o(e) {
                a = true;
                if (n.get("autoCapture") && !n.get("passiveCapture") && n.get("autoCaptureEvent") === "load") {
                    window.setTimeout(function() {
                        i.page()
                    }, n.get("autoCaptureDelay"))
                }
            }

            function u(e) {
                if (e) {}
                r.fire("dom:content:loaded");
                t.scan();
                if (n.get("autoCapture") && !n.get("passiveCapture") && n.get("autoCaptureEvent") === "DOMContentLoaded") {
                    window.setTimeout(function() {
                        i.page()
                    }, n.get("autoCaptureDelay"))
                } else {
                    window.setTimeout(s, n.get("windowLoadTimeout"))
                }
            }

            function s() {
                if (!a && n.get("autoCapture") && !n.get("passiveCapture")) {
                    i.page()
                }
            }
            return {
                init: function() {
                    if (e.readyState === "loading") {
                        e.addEventListener("DOMContentLoaded", u, false)
                    } else {
                        u()
                    }
                    window.addEventListener("load", o, false)
                }
            }
        }(c, B, e, l, W);
        Y = function(e, t, r) {
            return {
                init: function() {
                    window.addEventListener("beforeunload", function() {
                        e.fire("navigation:page:unloading");
                        r.flush()
                    }, false)
                }
            }
        }(e, c, D);
        G = function(e, t, r, n, i, a) {
            var o = "event/resize",
                u = function(i) {
                    r(u, i);

                    function u(e) {
                        this.rto = t.output();
                        this.eventType = n.id(a.WINDOWRESIZE);
                        this.generatePayload();
                        i.call(this)
                    }
                    u.prototype.generatePayload = function() {
                        var t, r;
                        try {
                            t = n.xy(document.documentElement.clientWidth);
                            r = n.xy(document.documentElement.clientHeight);
                            this.payload = [t, r]
                        } catch (t) {
                            e.fire("error:raise", t, o + "::ResizeEvent")
                        }
                    };
                    return u
                }(i);
            return {
                bind: function(e) {
                    window.setTimeout(function() {
                        new u(e)
                    }, 0)
                }
            }
        }(e, L, m, I, M, U);
        z = function(e, t) {
            var r;

            function n() {
                this.nodeList = [];
                this.changeMap = {}
            }
            n.prototype.addNode = function(e) {
                if (t(this.nodeList, e) === -1) {
                    this.nodeList.push(e);
                    return true
                }
                return false
            };
            n.prototype.removeNode = function(e) {
                var r = t(this.nodeList, e);
                if (r) {
                    delete this.nodeList[e];
                    return true
                }
                return false
            };
            n.prototype.hasNode = function(e) {
                return t(this.nodeList, e) === -1 ? false : true
            };
            n.prototype.logChange = function(e, t) {
                var r = t.name,
                    n = t.value,
                    i = t.rtime;
                if (!this.changeMap[e]) {
                    this.changeMap[e] = {}
                }
                if (!this.changeMap[e][r]) {
                    this.changeMap[e][r] = {}
                }
                this.changeMap[e][r] = {
                    rtime: i,
                    value: n
                }
            };
            n.prototype.hasNodeChanged = function(e, t) {
                var r = t.name,
                    n = t.value;
                if (!this.changeMap[e] || !this.changeMap[e][r] || this.changeMap[e][r].value !== n) {
                    this.logChange(e, t);
                    return true
                }
                return false
            };
            r = new n;
            e.on("dom:scan:newnode", function(e) {
                r.addNode("__uuid_" + e)
            });
            return r
        }(e, u);
        $ = function(e, t) {
            function r(e, r) {
                if (e[t] === r[t]) {
                    return 0
                }
                return e[t] > r[t] ? 1 : -1
            }
            return e.sort(r)
        };
        Z = function(e) {
            var t = [];
            for (var r in e) {
                if (e.hasOwnProperty(r)) {
                    t.push(e[r])
                }
            }
            return t
        };
        Q = function(e) {
            var t = ["background", "font", "padding", "margin", "overflow", "display", "position", "float", "width", "height", "box-sizing", "visibility", "z-index", "color"],
                r = document.createElement("div");
            return function(e) {
                var n = window.getComputedStyle(e);
                r.style.cssText = "";
                if (n) {
                    for (var i = 0; i < t.length; i++) {
                        r.style[t[i]] = n[t[i]]
                    }
                }
                return r.style.cssText
            }
        }(l);
        ee = function(e, t, r, n, i, a, o, u, s, d, c, f, l, h, p, g, m, v) {
            var y = {},
                b = {},
                w = null,
                E = null,
                N = 0,
                S = null,
                x = {
                    HIGH: 0,
                    MEDIUM: 100,
                    LOW: 500
                },
                T = {
                    id: "id",
                    title: "title",
                    href: "href",
                    class: "className",
                    disabled: "disabled"
                },
                _ = ["script", "urscrub"],
                C = function(e) {
                    c(t, e);

                    function t(t) {
                        this.eventType = u.id(v.NODEADDED);
                        this.rto = o.format(t.rtime);
                        this.changeSpec = t;
                        this.generatePayload();
                        e.call(this)
                    }
                    t.prototype.generatePayload = function() {
                        var e, t, r, n, a, o, d, c, f;
                        e = u.id(this.changeSpec.mode);
                        t = "";
                        r = u.strLen(t.length);
                        n = "";
                        a = u.strLen(n.length);
                        o = this.changeSpec.ref.__ur_uuid__;
                        d = u.strLen(o.toString().length);
                        c = i.toString(this.changeSpec.node);
                        f = u.strLen(s.getUtf8Bytes(c));
                        if (c === "") {
                            this.payload = null;
                            return
                        }
                        this.payload = [e, r, t, a, n, d, o, f, c]
                    };
                    return t
                }(m),
                L = function(e) {
                    c(t, e);

                    function t(t) {
                        this.eventType = u.id(v.NODEREMOVED);
                        this.rto = o.format(t.rtime);
                        this.changeSpec = t;
                        this.generatePayload();
                        e.call(this)
                    }
                    t.prototype.generatePayload = function() {
                        var e, t;
                        e = this.changeSpec.node.__ur_uuid__;
                        t = u.strLen(e.toString().length);
                        this.payload = [t, e]
                    };
                    return t
                }(m),
                I = function(e) {
                    c(t, e);

                    function t(t) {
                        this.eventType = u.id(v.NODECHANGED);
                        this.rto = o.format(t.rtime);
                        this.changeSpec = t;
                        this.generatePayload();
                        e.call(this)
                    }
                    t.prototype.generatePayload = function() {
                        var e, t, r, n, i, a;
                        i = this.changeSpec.uuid;
                        a = u.strLen(i.toString().length);
                        e = this.changeSpec.name;
                        t = u.strLen(s.getUtf8Bytes(e));
                        r = this.changeSpec.value || "";
                        n = s.getUtf8Bytes(r);
                        n = u.strLen(n > 0 ? n : 0);
                        this.payload = [a, i, t, e, n, r]
                    };
                    return t
                }(m);

            function R(e) {
                this.node = e.node;
                this.target = e.target || null;
                this.value = e.value || null;
                this.ts = e.ts;
                this.attribute = e.attribute || null;
                this.mode = e.mode || null;
                this.ref = e.ref || null
            }

            function A(e, t) {
                var r;
                if (e.urNode) {
                    if (e.nodeType === 3) {
                        e.urNode.value = e.nodeValue;
                        return
                    }
                    if (t === "style") {
                        e.urNode.attributes[t] = e.style.cssText
                    } else {
                        r = e.getAttribute(t);
                        if (!r) {
                            t = T[t] || t;
                            r = e[t]
                        }
                        e.urNode.attributes[t] = r
                    }
                }
            }

            function P(e) {
                var t = [];
                for (var r in e) {
                    if (e.hasOwnProperty(r)) {
                        t = t.concat(e[r].attrChanges);
                        t = t.concat(e[r].updates);
                        t = t.concat(e[r].nodesAdded);
                        t = t.concat(e[r].nodesRemoved)
                    }
                }
                return h(t, "sequenceId")
            }

            function k(e) {
                var t = 0;
                for (var r = 0; r < e.length; r++) {
                    if (e[r].rtime === t) {
                        e[r].rtime += 1
                    } else if (e[r].rtime < t) {
                        e[r].rtime = t + 1
                    }
                    switch (l.getConstructorName(e[r])) {
                        case "NodeAttributeChange":
                            new I(e[r]);
                            break;
                        case "NodeAddition":
                            new C(e[r]);
                            break;
                        case "NodeRemoval":
                            if (e[r].uuid) {
                                new L(e[r])
                            }
                            break;
                        case "NodeUpdate":
                            new I(e[r]);
                            break
                    }
                    t = e[r].rtime
                }
            }

            function O(e) {
                var t = {};
                if (!window.urCapture.pageCaptured()) {
                    return
                }
                B.call(t, e);
                X.call(t, e);
                V.call(t, e);
                q.call(t, e);
                return t
            }

            function D(e) {
                var t;
                for (var r in e) {
                    if (e.hasOwnProperty(r)) {
                        if (e[r].attrChanges.length > 0) {
                            e[r].normalizeAttributeChanges()
                        }
                        if (e[r].nodesAdded.length === 0 && e[r].nodesRemoved.length === 0 && e[r].updates.length === 0) {
                            continue
                        }
                        e[r].flatten();
                        if (e[r].updates.length > 0) {
                            e[r].useUpdateOnly()
                        }
                        if (e[r].nodesAdded.length > 0 && e[r].nodesRemoved.length > 0) {
                            e[r].removeObsolete()
                        }
                        if (e[r].nodesAdded.length === 0 && e[r].nodesRemoved.length === 0 && e[r].updates.length === 0 && e[r].attrChanges.length === 0) {
                            delete e[r]
                        }
                    }
                }
            }

            function M() {
                var e, t, r;
                E = w;
                w = null;
                H(b[E]);
                e = O(y[E]);
                D(e);
                r = P(e);
                k(r);
                delete y[E];
                delete b[E]
            }

            function U(e) {
                this.target = e.target;
                this.sequenceId = e.sequenceId;
                this.rtime = e.rtime
            }

            function NodeUpdate(e) {
                this.name = "ur-nodeupdate";
                this.value = e.value;
                U.call(this, e)
            }

            function NodeAddition(e) {
                this.node = e.node;
                this.value = e.value;
                this.mode = e.mode;
                this.ref = e.ref;
                U.call(this, e)
            }

            function NodeRemoval(e) {
                this.uuid = e.node.__ur_uuid__;
                this.node = e.node;
                U.call(this, e)
            }

            function NodeAttributeChange(e) {
                this.uuid = e.target.__ur_uuid__;
                this.name = e.attribute;
                this.value = e.value;
                U.call(this, e)
            }

            function F() {
                this.attrChanges = [];
                this.nodesAdded = [];
                this.nodesRemoved = [];
                this.updates = [];
                this.flattened = []
            }
            F.prototype = {
                registerAttributeChange: function(e) {
                    this.attrChanges.push(e)
                },
                registerUpdate: function(e) {
                    this.updates.push(e)
                },
                registerNodeAddition: function(e) {
                    this.nodesAdded.push(e)
                },
                registerNodeRemoval: function(e) {
                    this.nodesRemoved.push(e)
                },
                flatten: function() {
                    var e = [].concat(this.nodesAdded, this.nodesRemoved, this.attrChanges, this.updates);
                    this.flattened = h(e, "sequenceId")
                },
                useUpdateOnly: function() {
                    var e, t, r;
                    e = h([].concat(this.updates), "sequenceId");
                    t = e.pop();
                    r = this.flattened.pop();
                    t.value = i.toString(t.target);
                    t.sequenceId = r.sequenceId;
                    t.rtime = r.rtime;
                    this.updates = [t];
                    this.nodesAdded = [];
                    this.nodesRemoved = []
                },
                normalizeAttributeChanges: function() {
                    var e = h(this.attrChanges, "sequenceId"),
                        t = {};
                    for (var r in e) {
                        if (e.hasOwnProperty(r)) {
                            t[e[r].name] = e[r]
                        }
                    }
                    this.attrChanges = p(t)
                },
                removeObsolete: function() {
                    var e = h([].concat(this.nodesAdded, this.nodesRemoved), "sequenceId"),
                        t = {},
                        r = {};
                    for (var n in e) {
                        if (e.hasOwnProperty(n)) {
                            if (l.getConstructorName(e[n]) === "NodeRemoval") {
                                if (t[e[n].node.__ur_uuid__]) {
                                    delete t[e[n].node.__ur_uuid__];
                                    continue
                                } else {
                                    r[e[n].node.__ur_uuid__] = e[n]
                                }
                            }
                            if (l.getConstructorName(e[n]) === "NodeAddition") {
                                if (r[e[n].node.__ur_uuid__]) {
                                    delete r[e[n].node.__ur_uuid__];
                                    continue
                                } else {
                                    t[e[n].node.__ur_uuid__] = e[n]
                                }
                            }
                        }
                    }
                    this.nodesAdded = p(t);
                    this.nodesRemoved = p(r)
                }
            };

            function q(e) {
                var t, r = e.attributeChanges;
                for (var n = 0; n < r.length; n++) {
                    t = "__uuid_" + r[n].target.__ur_uuid__;
                    if (!this[t]) {
                        this[t] = new F
                    }
                    if (a.hasNodeChanged(t, r[n])) {
                        this[t].registerAttributeChange(r[n])
                    }
                }
            }

            function V(e) {
                var t, r = e.nodeUpdates;
                for (var n = 0; n < r.length; n++) {
                    t = "__uuid_" + r[n].target.__ur_uuid__;
                    r[n].uuid = r[n].target.__ur_uuid__;
                    if (!this[t]) {
                        this[t] = new F
                    }
                    r[n].value = i.toString(r[n].target);
                    this[t].registerUpdate(r[n])
                }
            }

            function B(e) {
                var t, r = false,
                    n = false,
                    i = e.nodeAdditions,
                    a;
                for (var o = 0; o < i.length; o++) {
                    t = "__uuid_" + i[o].target.__ur_uuid__;
                    if (!this[t]) {
                        this[t] = new F
                    }
                    this[t].registerNodeAddition(i[o])
                }
            }

            function X(e) {
                var t, r = e.nodeRemovals;
                for (var n = 0; n < r.length; n++) {
                    t = "__uuid_" + r[n].target.__ur_uuid__;
                    if (!this[t]) {
                        this[t] = new F
                    }
                    this[t].registerNodeRemoval(r[n])
                }
            }

            function j(e) {
                if (!urCapture.pageCaptured()) {
                    w = null;
                    y = {};
                    return
                }
                if (w) {
                    window.clearTimeout(S);
                    b[w].push({
                        ts: (new Date).getTime(),
                        records: e
                    })
                } else {
                    w = (new Date).getTime();
                    y[w] = {
                        attributeChanges: [],
                        nodeUpdates: [],
                        nodeAdditions: [],
                        nodeRemovals: []
                    };
                    b[w] = [];
                    b[w].push({
                        ts: (new Date).getTime(),
                        records: e
                    })
                }
                i.observer.takeRecords();
                if (k && urCapture.pageCaptured()) {
                    S = window.setTimeout(M, 0)
                }
            }

            function K(e) {
                var t = e.nextElementSibling;
                return t && e.__ur_uuid__ && t.__ur_uuid__ < e.__ur_uuid__ ? 2 : 1
            }

            function H(e) {
                var n = [];
                var a = false;
                var u = [];
                var s = t.get("captureStateChanges");
                var c = null;
                var l = false;
                for (var h = 0; h < e.length; h++) {
                    var p = e[h].records;
                    var g = e[h].ts;
                    for (var m = 0; m < p.length; m++) {
                        var v = p[m];
                        if (v.type === "attributes") {
                            A(v.target, v.attributeName)
                        }
                        if (t.get("captureMode") === r.captureMode.SIMPLE || !v.target.urNode || v.target.urNode.stateChanges.excluded || v.type === "characterData" && v.target.parentElement.urNode.stateChanges.excluded) {
                            continue
                        }
                        switch (v.type) {
                            case "childList":
                                if (f(_, v.target.nodeName.toLowerCase()) !== -1) {
                                    continue
                                }
                                if (v.addedNodes > 0 || v.removedNodes > 0 && !l) {
                                    i.scan();
                                    l = true
                                }
                                if (v.addedNodes.length > 0 && v.removedNodes.length > 0) {
                                    y[E].nodeUpdates.push(new NodeUpdate({
                                        rtime: o.offset(g),
                                        value: "",
                                        target: v.target,
                                        sequenceId: N
                                    }));
                                    N++
                                } else {
                                    n = [];
                                    a = false;
                                    if (v.addedNodes.length > 0) {
                                        for (var b = 0; b < v.addedNodes.length && !a; b++) {
                                            if (f(_, v.addedNodes[b].nodeName.toLowerCase()) !== -1) {
                                                continue
                                            }
                                            if (v.addedNodes[b].nodeName.toLowerCase() === "input" && v.addedNodes[b].attributes.type === "hidden") {
                                                continue
                                            }
                                            if (v.addedNodes[b].nodeType === 8) {
                                                continue
                                            }
                                            if (v.addedNodes[b].nodeType === 3) {
                                                if (!d(y[E].nodeAdditions, "node", v.target)) {
                                                    y[E].nodeUpdates.push(new NodeUpdate({
                                                        rtime: o.offset(g),
                                                        value: "",
                                                        target: v.target,
                                                        sequenceId: N
                                                    }));
                                                    N++;
                                                    a = true;
                                                    b = v.addedNodes.length
                                                }
                                            } else {
                                                if (v.addedNodes[b].__ur_uuid__) {
                                                    if (v.target !== document.body) {
                                                        y[E].nodeUpdates.push(new NodeUpdate({
                                                            rtime: o.offset(g),
                                                            value: "",
                                                            target: v.target,
                                                            sequenceId: N
                                                        }));
                                                        N++;
                                                        a = true;
                                                        b = v.addedNodes.length;
                                                        continue
                                                    }
                                                }
                                                if (v.addedNodes[b].nodeName.toLowerCase() === "img") {
                                                    if (t.isPageExcluded(v.addedNodes[b].src)) {
                                                        continue
                                                    }
                                                }
                                                if (v.addedNodes[b].nodeName.toLowerCase() === "iframe") {
                                                    if (t.isPageExcluded(v.addedNodes[b].src)) {
                                                        continue
                                                    }
                                                }
                                                var w = K(v.addedNodes[b]);
                                                n.push(new NodeAddition({
                                                    rtime: o.offset(g),
                                                    target: v.target,
                                                    sequenceId: N,
                                                    node: v.addedNodes[b],
                                                    value: "",
                                                    mode: w,
                                                    ref: w === 2 ? v.addedNodes[b].nextElementSibling : v.target
                                                }));
                                                N++
                                            }
                                        }
                                        if (!a) {
                                            y[E].nodeAdditions = y[E].nodeAdditions.concat(n)
                                        }
                                    } else {
                                        n = [];
                                        a = false;
                                        for (var S = 0; S < v.removedNodes.length && !a; S++) {
                                            if (f(_, v.removedNodes[S].nodeName.toLowerCase()) !== -1) {
                                                continue
                                            }
                                            if (v.removedNodes[S].nodeName.toLowerCase() === "input" && v.removedNodes[S].attributes.type === "hidden") {
                                                continue
                                            }
                                            if (v.removedNodes[S].nodeType === 8) {
                                                continue
                                            }
                                            if (v.removedNodes[S].nodeType === 3) {
                                                y[E].nodeUpdates.push(new NodeUpdate({
                                                    rtime: o.offset(g),
                                                    value: "",
                                                    target: v.target,
                                                    sequenceId: N
                                                }));
                                                N++;
                                                a = true;
                                                S = v.removedNodes.length
                                            } else {
                                                n.push(new NodeRemoval({
                                                    rtime: o.offset(g),
                                                    target: v.target,
                                                    sequenceId: N,
                                                    node: v.removedNodes[S]
                                                }));
                                                N++
                                            }
                                        }
                                        if (!a) {
                                            y[E].nodeRemovals = y[E].nodeRemovals.concat(n)
                                        }
                                    }
                                }
                                break;
                            case "attributes":
                                if (f(_, v.target.nodeName.toLowerCase()) !== -1 || f(u, v.attributeName) !== -1) {
                                    continue
                                }
                                if (v.target.nodeName.toLowerCase() === "input" && v.target.attributes.type === "hidden") {
                                    continue
                                }
                                if (v.attributeName.match(/((x|data)-)?ng[-|_|:](bind|click|if|model|form|repeat|value|switch)(-(html|template|options|when))?/)) {
                                    continue
                                }
                                if (v.target.urNode && v.target.urNode.formField && v.attributeName === "value") {
                                    try {
                                        c = new Event("change")
                                    } catch (e) {
                                        try {
                                            c = document.createEvent("HTMLEvents");
                                            c.initEvent("change", false, false)
                                        } catch (e) {}
                                    } finally {
                                        if (c) {
                                            v.target.dispatchEvent(c);
                                            c = null;
                                            continue
                                        }
                                    }
                                }
                                if (v.target.urNode.stateChanges.excluded) {
                                    continue
                                }
                                if (v.attributeName === "checked" || v.attributeName === "selected") {
                                    continue
                                }
                                if (v.attributeName === "style") {
                                    v.attributeValue = v.target.style.cssText
                                } else if (T[v.attributeName]) {
                                    v.attributeValue = v.target[T[v.attributeName]]
                                } else {
                                    v.attributeValue = v.target.getAttribute(v.attributeName)
                                }
                                if (v.attributeValue == v.oldValue || v.attributeValue === "" && v.oldValue === null || v.attributeValue === null) {
                                    continue
                                }
                                y[E].attributeChanges.push(new NodeAttributeChange({
                                    attribute: v.attributeName,
                                    value: v.attributeName === "value" ? v.target.urNode.value : v.attributeValue,
                                    rtime: o.offset(g),
                                    target: v.target,
                                    sequenceId: N
                                }));
                                N++;
                                break;
                            case "characterData":
                                v.target.urNode.value = v.target.nodeValue;
                                y[E].nodeUpdates.push(new NodeUpdate({
                                    rtime: o.offset(g),
                                    target: v.target.parentElement,
                                    value: "",
                                    sequenceId: N
                                }));
                                N++;
                                break
                        }
                    }
                }
            }
            e.on("state:change", j);
            e.on("navigation:page:unloading", function() {
                if (t.get("captureMode") === r.captureMode.SIMPLE) {
                    i.scan();
                    changeSpec = new NodeAttributeChange({
                        target: document.body,
                        rtime: o.offset((new Date).getTime()),
                        attribute: "ur-nodeupdate",
                        value: i.toString(document.body)
                    });
                    new I(changeSpec)
                }
            });
            e.on("state:change:trigger", function(e) {
                var t;
                var r = function() {
                    switch (e.attributeName) {
                        case "ur-nodeupdate":
                            t = i.toString(e.node);
                            break;
                        case "style":
                            t = g(e.node);
                            break
                    }
                    changeSpec = new NodeAttributeChange({
                        target: e.node,
                        rtime: o.offset((new Date).getTime()),
                        attribute: e.attributeName,
                        value: t
                    });
                    new I(changeSpec)
                };
                if (e.delay > 0) {
                    window.setTimeout(r, e.delay)
                } else {
                    r()
                }
            })
        }(e, l, t, W, B, z, L, I, R, i, m, u, b, $, Z, Q, M, U);
        te = function(e, t) {
            function r(e) {}
            return {
                bind: function() {
                    window.addEventListener("hashchange", r, false)
                }
            }
        }(W, e);
        re = function(e) {
            var t = function(t) {
                function r() {
                    var r = t.pushState;
                    t.pushState = function(n, i, a) {
                        if (typeof t.onpushstate === "function") {
                            t.onpushstate({
                                state: n
                            })
                        }
                        if (a) {
                            e.fire("capture:page:reset", a)
                        }
                        r.apply(t, arguments)
                    }
                }
                return r
            }(window.history);
            return t
        }(e);
        ne = function(e) {
            if (typeof e.match === "function") {
                return e.match(/(\S=\S&?)+/)
            } else {
                return false
            }
        };
        ie = function(e, t, r, n, i, a) {
            var o = 1,
                u = 2,
                s = 3,
                d = 4,
                c = "responseText excluded from capture",
                f = "responseText is excluded from capture when plain text is returned",
                l = "request body is excluded when in plain text without any white listing rules";
            STR_RESPONSETEXT_UNAVAILABLE = "responseText was not available in it's current format";
            STR_RESPONSETYPE_UNAVAILABLE = "responseType was not available in it's current format";

            function h() {
                var e = this;
                switch (e.readyState) {
                    case o:
                        e.corePayload.requestHeaders = [];
                        break;
                    case u:
                        e.corePayload.responseHeaders = e.getAllResponseHeaders() || "";
                        e.corePayload.status = e.status;
                        break;
                    case s:
                        e.corePayload.responseStart = (new Date).getTime();
                        break;
                    case d:
                        try {
                            e.corePayload.responseText = e.responseText;
                            e.corePayload.responseType = e.responseType
                        } catch (t) {
                            e.corePayload.responseText = STR_RESPONSETEXT_UNAVAILABLE;
                            e.corePayload.responseType = STR_RESPONSETYPE_UNAVAILABLE
                        }
                        e.corePayload.responseEnd = (new Date).getTime();
                        if (!t.get("passiveCapture")) {
                            p.call(e.corePayload);
                            window.setTimeout(function() {
                                r.xhr(e.corePayload)
                            })
                        }
                        if (e.uploadTriggers) {
                            window.setTimeout(function() {
                                r.page.call()
                            }, e.uploadTriggers.pause)
                        }
                        if (e.captureTrigger) {
                            e.captureTrigger.fire()
                        }
                        break
                }
            }

            function p() {
                var e;
                if (t.isXhrResponseTextExcluded()) {
                    this.responseText = this.responseText === STR_RESPONSETEXT_UNAVAILABLE ? STR_RESPONSETEXT_UNAVAILABLE : c
                } else {
                    try {
                        e = JSON.parse(this.responseText);
                        e = n.scrubObject(e, "responseText");
                        this.responseText = JSON.stringify(e)
                    } catch (e) {
                        this.responseText = f
                    }
                }
            }

            function g() {
                var t = false,
                    r = this.data,
                    a;
                if (r && r.length > 0 && i(this.data)) {
                    try {
                        r = decodeURIComponent(r);
                        t = r !== this.data
                    } catch (t) {
                        e.fire("error:raise", t, "event/xhr::processRequestBody")
                    }
                    this.data = n.scrubQueryString(r, t)
                } else {
                    try {
                        a = JSON.parse(this.data);
                        a = n.scrubObject(a, "requestBody");
                        this.data = JSON.stringify(a)
                    } catch (e) {
                        this.data = l
                    }
                }
            }
            return {
                bind: function() {
                    if (t.get("captureXhr")) {
                        XMLHttpRequest.prototype.nativeOpen = XMLHttpRequest.prototype.open;
                        XMLHttpRequest.prototype.nativeSend = XMLHttpRequest.prototype.send;
                        XMLHttpRequest.prototype.nativeSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
                        XMLHttpRequest.prototype.open = function() {
                            var r;
                            this.corePayload = {
                                method: arguments[0],
                                target: arguments[1]
                            };
                            this.uploadTriggers = t.getUploadTriggers("xhr", this.corePayload.target);
                            r = t.getXhrEventTrigger(this.corePayload.target);
                            if (r) {
                                this.captureTrigger = new a(r)
                            }
                            this.addEventListener("readystatechange", h, false);
                            try {
                                return this.nativeOpen ? this.nativeOpen.apply(this, arguments) : this.open.apply(this, arguments)
                            } catch (t) {
                                e.fire("error:raise", t, "xhr open() method could not be found")
                            }
                        };
                        XMLHttpRequest.prototype.send = function() {
                            this.corePayload.data = arguments[0];
                            this.corePayload.requestStart = (new Date).getTime();
                            g.call(this.corePayload);
                            try {
                                if (typeof this.nativeSend !== "undefined") {
                                    this.nativeSend.apply(this, arguments)
                                } else {
                                    this.send.apply(this, arguments)
                                }
                            } catch (t) {
                                e.fire("error:raise", t, "xhr send() method could not be found")
                            }
                        };
                        window.XMLHttpRequest.prototype.setRequestHeader = function(t, r) {
                            try {
                                if (typeof this.nativeSetRequestHeader !== "undefined") {
                                    this.nativeSetRequestHeader.apply(this, arguments)
                                } else {
                                    this.setRequestHeader.apply(this, arguments)
                                }
                            } catch (t) {
                                e.fire("error:raise", t, "xhr nativeSetRequestHeader() failed")
                            }
                        }
                    }
                }
            }
        }(e, l, W, A, ne, O);
        ae = function(e, t, r, n, i, a, o, u, s, d, c, f, l, h, p, g) {
            var m = [];
            return {
                init: function() {
                    if (t.get("captureStateChanges") && t.get("captureMode") === r.captureMode.DEFAULT && t.get("angularRoutesToSteps")) {
                        new p;
                        h.bind()
                    }
                    if (t.get("captureEvents")) {
                        if (t.get("captureMode") === r.captureMode.DEFAULT) {
                            document.addEventListener("mousemove", o.bindings.move, false);
                            document.addEventListener("scroll", u.bind, false);
                            window.addEventListener("resize", f.bind, false)
                        }
                        document.addEventListener("click", o.bindings.click, false);
                        e.on("dom:add:formfield", function(e) {
                            var n = e.domNode;
                            if (typeof n === "undefined") {
                                return
                            }
                            if (t.get("captureMode") === r.captureMode.DEFAULT) {
                                n.addEventListener("focus", i.bindings.focus, false);
                                n.addEventListener("blur", i.bindings.blur, false);
                                n.addEventListener("change", i.bindings.change, false);
                                n.addEventListener("keypress", i.bindings.keypress, false);
                                n.addEventListener("keydown", i.bindings.keydown, false);
                                Object.defineProperty(n, "watch", {
                                    enumerable: false,
                                    configurable: true,
                                    writable: false,
                                    value: function(e, t) {
                                        var r, n, i = function() {
                                                return n
                                            },
                                            a = function(e) {
                                                r = n;
                                                t.call(this, propertyName, r, e);
                                                return n = e
                                            };
                                        for (var o = 0; o < e.length; o++) {
                                            Object.defineProperty(this, e[o], {
                                                enumerable: true,
                                                configurable: true,
                                                get: i,
                                                set: a
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                    if (t.get("captureXhr") && !t.get("passiveCapture")) {
                        g.bind()
                    }
                    e.on("dom:add:form", function(e) {
                        var t = e.domNode;
                        if (typeof t === "undefined") {
                            return
                        }
                        if (n(m, t) === -1) {
                            t.addEventListener("submit", a.bind, false);
                            t.nativeSubmit = t.submit;
                            t.submit = function() {
                                a.bind({
                                    target: this
                                });
                                if (!this.defaultPrevented) {
                                    this.nativeSubmit()
                                }
                            };
                            m.push(t)
                        }
                    });
                    d.init();
                    c.init()
                }
            }
        }(e, l, t, u, X, j, F, K, H, J, Y, G, ee, te, re, ie);
        oe = function(e, t, r, n, i, a, o, u, s) {
            var d, c = "2.8.13",
                f = "\n",
                l = {
                    INACTIVE: -1,
                    INITIALISING: 0,
                    READY: 1,
                    BUSY: 2,
                    EXPIRED: 3
                },
                h = l.INACTIVE,
                p = false,
                g = false;
            r.on("error:raise", e.raiseErr);
            r.on("beacon:fire", e.fireBeacon);
            r.on("session:expired", function() {
                h = l.EXPIRED
            });
            r.on("dom:source-captured", function() {
                g = true
            });
            r.on("capture:page:reset", function() {});
            r.on("capture:reset:done", function() {});

            function m() {
                var e = document.getElementsByTagName("base");
                for (var t = 0; t < e.length; t++) {
                    for (var r = 0; r < e[t].attributes.length; r++) {
                        if (e[t].attributes[r].name === "userreplay") {
                            return true
                        }
                    }
                }
                return false
            }
            d = {
                timeStarted: function() {
                    var e = (new Date).getTime();
                    return function() {
                        return e
                    }
                }(),
                pageToken: function() {
                    var e = (new Date).getTime().toString(16),
                        t = Math.round(Math.random() * 1e6).toString(16);
                    return e + t
                }(),
                getVersion: function() {
                    return c
                },
                getState: function() {
                    return h
                },
                isDebug: function() {
                    return s(f).length > 0 ? true : false
                },
                pageCaptured: function() {
                    return g
                },
                storageReady: function() {
                    return p
                },
                isReady: function() {
                    return h === l.READY
                },
                setState: function(e) {
                    if (e === l.INACTIVE || e === l.READY || e === l.INITIALISING || e === l.BUSY) {
                        h = e
                    } else {
                        r.fire("error:raise", "Invalid state for setState method in core: " + e)
                    }
                    return this
                },
                init: function(e) {
                    if (urCapture.state() !== l.INACTIVE) {
                        return
                    }
                    h = this.setState(l.INITIALISING);
                    if (t.isSimpleCaptureModeEnabled()) {
                        t.set("captureMode", a.captureMode.SIMPLE)
                    }
                    if (m()) {
                        this.setState(l.INACTIVE);
                        return false
                    }
                    if (!e.id || !e.server) {
                        this.setState(l.INACTIVE);
                        return false
                    }
                    r.on("storage:ready", function() {
                        p = true
                    });
                    if (!i.init()) {}
                    if (this.isDebug()) {
                        try {
                            if (!window.top.urCapture || !window.top.urCapture.inDebug) {
                                window.top.urCapture.inDebug = true
                            }
                        } catch (e) {}
                    }
                    n.set();
                    t.set("version", c);
                    if (!u.isSupported()) {
                        h = this.setState(l.INACTIVE);
                        r.fire("beacon:fire");
                        return false
                    }
                    if (t.get("dnt") && (navigator.doNotTrack === "yes" || navigator.doNotTrack === "1" || navigator.msDoNotTrack === "1")) {
                        this.setState(l.INACTIVE);
                        return false
                    }
                    if (t.isPageExcluded(document.URL)) {
                        this.setState(l.INACTIVE);
                        return false
                    }
                    o.init();
                    r.fire("capture:ready", l.READY);
                    return this
                }
            };
            return d
        }(y, l, e, p, x, t, ae, w, o);
        ue = function(e) {
            return function(t) {
                var r = {
                    type: "pageupload"
                };
                e.page.call(r, t)
            }
        }(W);
        se = function(e, t, r, n, i) {
            var a = "formfield/validation";
            return {
                registerSuccess: function(r, o) {
                    var u, s, d, c, f;
                    try {
                        u = i.output();
                        s = 20;
                        if (typeof o !== "boolean") {
                            return
                        } else {
                            o = o ? 1 : 0
                        }
                        d = n.strLen(r.length);
                        c = n.strLen([s, d, r, o].join("").length);
                        f = [u, c, s, d, r, o].join("");
                        t.write(f)
                    } catch (t) {
                        e.fire("error:raise", t, a + "::registerSuccess")
                    }
                }
            }
        }(e, D, l, I, L);
        de = function(e, t, r) {
            this.fn = e;
            this.context = t;
            this.args = r
        };
        ce = function(e, t, r, n, i, a) {
            var o;
            e.ready = function(e, t) {
                var r = arguments.length > 2 ? Array.prototype.slice.apply(arguments, 2) : null;
                if (e && typeof e === "function") {
                    t = t || this;
                    o = new i(e, t, r)
                }
                return this
            };

            function u(t) {
                e.setState(t);
                if (o && typeof o.fn === "function") {
                    o.fn.apply(o.context, o.args)
                }
            }
            t.on("capture:ready", u)
        }(oe, e, p, W, de, D);
        fe = function(e, t, r, n) {
            if (window.urCapture && window.UrConfig) {
                return
            }
            var i = {
                init: function() {
                    return function(t) {
                        e.init.call(e, t)
                    }
                }(),
                ready: e.ready,
                version: function() {
                    var t = e.getVersion();
                    return t
                }(),
                pageToken: e.pageToken,
                pageCaptured: e.pageCaptured,
                isReady: e.isReady,
                isDebug: e.isDebug,
                pageUpload: r,
                formValidation: n,
                getConfig: function() {
                    return t.get()
                },
                state: function() {
                    return e.getState()
                }
            };
            window.urCapture = i;
            window.UrConfig = t.constructor
        }(oe, l, ue, se)
    })();
}());
