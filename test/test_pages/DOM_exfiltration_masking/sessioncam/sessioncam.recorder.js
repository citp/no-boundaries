//<![CDATA[
window.scInitTime0 = new Date().getTime();

/* HTML5 Shiv v3.3RC1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
var html5 = {
    elements: "abbr article aside audio avglsdata bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
    shivCSS: false,
    shivMethods: true
};
var html5shim = function(g, i) {
    var k = g.html5 || {};
    var c = /^<|^(?:button|iframe|input|script|textarea)$/i;
    var b;
    var d;
    (function() {
        var o, n = i.createElement("a"),
            m = g.getComputedStyle,
            p = i.documentElement,
            l = i.body || (o = p.insertBefore(i.createElement("body"), p.firstChild));
        l.insertBefore(n, l.firstChild);
        n.hidden = true;
        n.innerHTML = "<xyz></xyz>";
        b = (n.currentStyle || m(n, null)).display == "none";
        d = n.childNodes.length == 1 || (function() {
            try {
                (i.createElement)("a")
            } catch (q) {
                return true
            }
            var r = i.createDocumentFragment();
            return (typeof r.cloneNode == "undefined" || typeof r.createDocumentFragment == "undefined" || typeof r.createElement == "undefined")
        }());
        l.removeChild(n);
        o && p.removeChild(o)
    }());

    function j(l, n) {
        var o = l.createElement("p"),
            m = l.getElementsByTagName("head")[0] || l.documentElement;
        o.innerHTML = "x<style>" + n + "</style>";
        return m.insertBefore(o.lastChild, m.firstChild)
    }

    function f() {
        var l = e.elements;
        return typeof l == "string" ? l.split(" ") : l
    }

    function h(u) {
        var q, m = {},
            r = u.createElement,
            o = u.createDocumentFragment,
            l = f(),
            s = o(),
            p = l.length;

        function t() {
            var v = s.cloneNode(false);
            return e.shivMethods ? (h(v), v) : v
        }

        function n(w) {
            var v = (m[w] || (m[w] = r(w))).cloneNode(false);
            return e.shivMethods && !c.test(w) ? s.appendChild(v) : v
        }
        while (p--) {
            q = l[p];
            m[q] = r(q);
            s.createElement(q)
        }
        u.createElement = n;
        u.createDocumentFragment = t
    }

    function a(m) {
        var l;
        if (m.documentShived) {
            return m
        }
        if (e.shivCSS && !b) {
            l = !!j(m, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")
        }
        if (e.shivMethods && !d) {
            l = !h(m)
        }
        if (l) {
            m.documentShived = l
        }
        return m
    }
    var e = {
        elements: k.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video".split(" "),
        shivCSS: !(k.shivCSS === false),
        shivMethods: !(k.shivMethods === false),
        type: "default",
        shivDocument: a
    };
    g.html5 = e;
    a(i)
};
var sessionCamRecorder, html5shim;

function SessionCamRecorder(lg, gQ, hx) {
    this.lg = lg;
    this.scStatsLoggingHost = gQ;
    this.scStatsMaxLength = hx;
    /*
     * jQuery JavaScript Library v1.5.2
     * http://jquery.com/
     *
     * Copyright 2011, John Resig
     * Dual licensed under the MIT or GPL Version 2 licenses.
     * http://jquery.org/license
     *
     * Includes Sizzle.js
     * http://sizzlejs.com/
     * Copyright 2011, The Dojo Foundation
     * Released under the MIT, BSD, and GPL Licenses.
     *
     * Date: Thu Mar 31 15:28:23 2011 -0400
     */
    (function(a0, I) {
        var am = a0.document;
        var b = (function() {
            var bo = function(bI, bJ) {
                    return new bo.fn.init(bI, bJ, bm)
                },
                bD = a0.jQuery,
                bq = a0.$,
                bm, bH = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,
                bw = /\S/,
                bs = /^\s+/,
                bn = /\s+$/,
                br = /\d/,
                bk = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                bx = /^[\],:{}\s]*$/,
                bF = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                bz = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                bt = /(?:^|:|,)(?:\s*\[)+/g,
                bi = /(webkit)[ \/]([\w.]+)/,
                bB = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                bA = /(msie) ([\w.]+)/,
                bC = /(mozilla)(?:.*? rv:([\w.]+))?/,
                bG = navigator.userAgent,
                bE, bl, e, bv = Object.prototype.toString,
                bp = Object.prototype.hasOwnProperty,
                bj = Array.prototype.push,
                bu = Array.prototype.slice,
                by = String.prototype.trim,
                bf = Array.prototype.indexOf,
                bh = {};
            bo.fn = bo.prototype = {
                constructor: bo,
                init: function(bI, bM, bL) {
                    var bK, bN, bJ, bO;
                    if (!bI) {
                        return this
                    }
                    if (bI.nodeType) {
                        this.context = this[0] = bI;
                        this.length = 1;
                        return this
                    }
                    if (bI === "body" && !bM && am.body) {
                        this.context = am;
                        this[0] = am.body;
                        this.selector = "body";
                        this.length = 1;
                        return this
                    }
                    if (typeof bI === "string") {
                        bK = bH.exec(bI);
                        if (bK && (bK[1] || !bM)) {
                            if (bK[1]) {
                                bM = bM instanceof bo ? bM[0] : bM;
                                bO = (bM ? bM.ownerDocument || bM : am);
                                bJ = bk.exec(bI);
                                if (bJ) {
                                    if (bo.isPlainObject(bM)) {
                                        bI = [am.createElement(bJ[1])];
                                        bo.fn.attr.call(bI, bM, true)
                                    } else {
                                        bI = [bO.createElement(bJ[1])]
                                    }
                                } else {
                                    bJ = bo.buildFragment([bK[1]], [bO]);
                                    bI = (bJ.cacheable ? bo.clone(bJ.fragment) : bJ.fragment).childNodes
                                }
                                return bo.merge(this, bI)
                            } else {
                                bN = am.getElementById(bK[2]);
                                if (bN && bN.parentNode) {
                                    if (bN.id !== bK[2]) {
                                        return bL.find(bI)
                                    }
                                    this.length = 1;
                                    this[0] = bN
                                }
                                this.context = am;
                                this.selector = bI;
                                return this
                            }
                        } else {
                            if (!bM || bM.jquery) {
                                return (bM || bL).find(bI)
                            } else {
                                return this.constructor(bM).find(bI)
                            }
                        }
                    } else {
                        if (bo.isFunction(bI)) {
                            return bL.ready(bI)
                        }
                    }
                    if (bI.selector !== I) {
                        this.selector = bI.selector;
                        this.context = bI.context
                    }
                    return bo.makeArray(bI, this)
                },
                selector: "",
                jquery: "1.5.2 SessionCam",
                length: 0,
                size: function() {
                    return this.length
                },
                toArray: function() {
                    return bu.call(this, 0)
                },
                get: function(bI) {
                    return bI == null ? this.toArray() : (bI < 0 ? this[this.length + bI] : this[bI])
                },
                pushStack: function(bJ, bL, bI) {
                    var bK = this.constructor();
                    if (bo.isArray(bJ)) {
                        bj.apply(bK, bJ)
                    } else {
                        bo.merge(bK, bJ)
                    }
                    bK.prevObject = this;
                    bK.context = this.context;
                    if (bL === "find") {
                        bK.selector = this.selector + (this.selector ? " " : "") + bI
                    } else {
                        if (bL) {
                            bK.selector = this.selector + "." + bL + "(" + bI + ")"
                        }
                    }
                    return bK
                },
                each: function(bJ, bI) {
                    return bo.each(this, bJ, bI)
                },
                ready: function(bI) {
                    bo.bindReady();
                    bl.done(bI);
                    return this
                },
                eq: function(bI) {
                    return bI === -1 ? this.slice(bI) : this.slice(bI, +bI + 1)
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                slice: function() {
                    return this.pushStack(bu.apply(this, arguments), "slice", bu.call(arguments).join(","))
                },
                map: function(bI) {
                    return this.pushStack(bo.map(this, function(bK, bJ) {
                        return bI.call(bK, bJ, bK)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: bj,
                sort: [].sort,
                splice: [].splice
            };
            bo.fn.init.prototype = bo.fn;
            bo.extend = bo.fn.extend = function() {
                var bR, bK, bI, bJ, bO, bP, bN = arguments[0] || {},
                    bM = 1,
                    bL = arguments.length,
                    bQ = false;
                if (typeof bN === "boolean") {
                    bQ = bN;
                    bN = arguments[1] || {};
                    bM = 2
                }
                if (typeof bN !== "object" && !bo.isFunction(bN)) {
                    bN = {}
                }
                if (bL === bM) {
                    bN = this;
                    --bM
                }
                for (; bM < bL; bM++) {
                    if ((bR = arguments[bM]) != null) {
                        for (bK in bR) {
                            bI = bN[bK];
                            bJ = bR[bK];
                            if (bN === bJ) {
                                continue
                            }
                            if (bQ && bJ && (bo.isPlainObject(bJ) || (bO = bo.isArray(bJ)))) {
                                if (bO) {
                                    bO = false;
                                    bP = bI && bo.isArray(bI) ? bI : []
                                } else {
                                    bP = bI && bo.isPlainObject(bI) ? bI : {}
                                }
                                bN[bK] = bo.extend(bQ, bP, bJ)
                            } else {
                                if (bJ !== I) {
                                    bN[bK] = bJ
                                }
                            }
                        }
                    }
                }
                return bN
            };
            bo.extend({
                noConflict: function(bI) {
                    a0.$ = bq;
                    if (bI) {
                        a0.jQuery = bD
                    }
                    return bo
                },
                isReady: false,
                readyWait: 1,
                ready: function(bI) {
                    if (bI === true) {
                        bo.readyWait--
                    }
                    if (!bo.readyWait || (bI !== true && !bo.isReady)) {
                        if (!am.body) {
                            return setTimeout(bo.ready, 1)
                        }
                        bo.isReady = true;
                        if (bI !== true && --bo.readyWait > 0) {
                            return
                        }
                        bl.resolveWith(am, [bo]);
                        if (bo.fn.trigger) {
                            bo(am).trigger("ready").unbind("ready")
                        }
                    }
                },
                bindReady: function() {
                    if (bl) {
                        return
                    }
                    bl = bo._Deferred();
                    if (am.readyState === "complete") {
                        return setTimeout(bo.ready, 1)
                    }
                    if (am.addEventListener) {
                        am.addEventListener("DOMContentLoaded", e, false);
                        a0.addEventListener("load", bo.ready, false)
                    } else {
                        if (am.attachEvent) {
                            am.attachEvent("onreadystatechange", e);
                            a0.attachEvent("onload", bo.ready);
                            var bI = false;
                            try {
                                bI = a0.frameElement == null
                            } catch (bJ) {}
                            if (am.documentElement.doScroll && bI) {
                                bg()
                            }
                        }
                    }
                },
                isFunction: function(bI) {
                    return bo.type(bI) === "function"
                },
                isArray: Array.isArray || function(bI) {
                    return bo.type(bI) === "array"
                },
                isWindow: function(bI) {
                    return bI && typeof bI === "object" && "setInterval" in bI
                },
                isNaN: function(bI) {
                    return bI == null || !br.test(bI) || isNaN(bI)
                },
                type: function(bI) {
                    return bI == null ? String(bI) : bh[bv.call(bI)] || "object"
                },
                isPlainObject: function(bJ) {
                    if (!bJ || bo.type(bJ) !== "object" || bJ.nodeType || bo.isWindow(bJ)) {
                        return false
                    }
                    if (bJ.constructor && !bp.call(bJ, "constructor") && !bp.call(bJ.constructor.prototype, "isPrototypeOf")) {
                        return false
                    }
                    var bI;
                    for (bI in bJ) {}
                    return bI === I || bp.call(bJ, bI)
                },
                isEmptyObject: function(bJ) {
                    for (var bI in bJ) {
                        return false
                    }
                    return true
                },
                error: function(bI) {
                    throw bI
                },
                parseJSON: function(bI) {
                    if (typeof bI !== "string" || !bI) {
                        return null
                    }
                    bI = bo.trim(bI);
                    if (bx.test(bI.replace(bF, "@").replace(bz, "]").replace(bt, ""))) {
                        return a0.JSON && a0.JSON.parse ? a0.JSON.parse(bI) : (new Function("return " + bI))()
                    } else {
                        bo.error("Invalid JSON: " + bI)
                    }
                },
                parseXML: function(bK, bI, bJ) {
                    if (a0.DOMParser) {
                        bJ = new DOMParser();
                        bI = bJ.parseFromString(bK, "text/xml")
                    } else {
                        bI = new ActiveXObject("Microsoft.XMLDOM");
                        bI.async = "false";
                        bI.loadXML(bK)
                    }
                    bJ = bI.documentElement;
                    if (!bJ || !bJ.nodeName || bJ.nodeName === "parsererror") {
                        bo.error("Invalid XML: " + bK)
                    }
                    return bI
                },
                noop: function() {},
                globalEval: function(bK) {
                    if (bK && bw.test(bK)) {
                        var bJ = am.head || am.getElementsByTagName("head")[0] || am.documentElement,
                            bI = am.createElement("script");
                        if (bo.support.scriptEval()) {
                            bI.appendChild(am.createTextNode(bK))
                        } else {
                            bI.text = bK
                        }
                        bJ.insertBefore(bI, bJ.firstChild);
                        bJ.removeChild(bI)
                    }
                },
                nodeName: function(bJ, bI) {
                    return bJ.nodeName && bJ.nodeName.toUpperCase() === bI.toUpperCase()
                },
                each: function(bL, bP, bK) {
                    var bJ, bM = 0,
                        bN = bL.length,
                        bI = bN === I || bo.isFunction(bL);
                    if (bK) {
                        if (bI) {
                            for (bJ in bL) {
                                if (bP.apply(bL[bJ], bK) === false) {
                                    break
                                }
                            }
                        } else {
                            for (; bM < bN;) {
                                if (bP.apply(bL[bM++], bK) === false) {
                                    break
                                }
                            }
                        }
                    } else {
                        if (bI) {
                            for (bJ in bL) {
                                if (bP.call(bL[bJ], bJ, bL[bJ]) === false) {
                                    break
                                }
                            }
                        } else {
                            for (var bO = bL[0]; bM < bN && bP.call(bO, bM, bO) !== false; bO = bL[++bM]) {}
                        }
                    }
                    return bL
                },
                trim: by ? function(bI) {
                    return bI == null ? "" : by.call(bI)
                } : function(bI) {
                    return bI == null ? "" : bI.toString().replace(bs, "").replace(bn, "")
                },
                makeArray: function(bL, bJ) {
                    var bI = bJ || [];
                    if (bL != null) {
                        var bK = bo.type(bL);
                        if (bL.length == null || bK === "string" || bK === "function" || bK === "regexp" || bo.isWindow(bL)) {
                            bj.call(bI, bL)
                        } else {
                            bo.merge(bI, bL)
                        }
                    }
                    return bI
                },
                inArray: function(bK, bL) {
                    if (bL.indexOf) {
                        return bL.indexOf(bK)
                    }
                    for (var bI = 0, bJ = bL.length; bI < bJ; bI++) {
                        if (bL[bI] === bK) {
                            return bI
                        }
                    }
                    return -1
                },
                merge: function(bM, bK) {
                    var bL = bM.length,
                        bJ = 0;
                    if (typeof bK.length === "number") {
                        for (var bI = bK.length; bJ < bI; bJ++) {
                            bM[bL++] = bK[bJ]
                        }
                    } else {
                        while (bK[bJ] !== I) {
                            bM[bL++] = bK[bJ++]
                        }
                    }
                    bM.length = bL;
                    return bM
                },
                grep: function(bJ, bO, bI) {
                    var bK = [],
                        bN;
                    bI = !!bI;
                    for (var bL = 0, bM = bJ.length; bL < bM; bL++) {
                        bN = !!bO(bJ[bL], bL);
                        if (bI !== bN) {
                            bK.push(bJ[bL])
                        }
                    }
                    return bK
                },
                map: function(bJ, bO, bI) {
                    var bK = [],
                        bN;
                    for (var bL = 0, bM = bJ.length; bL < bM; bL++) {
                        bN = bO(bJ[bL], bL, bI);
                        if (bN != null) {
                            bK[bK.length] = bN
                        }
                    }
                    return bK.concat.apply([], bK)
                },
                guid: 1,
                proxy: function(bK, bJ, bI) {
                    if (arguments.length === 2) {
                        if (typeof bJ === "string") {
                            bI = bK;
                            bK = bI[bJ];
                            bJ = I
                        } else {
                            if (bJ && !bo.isFunction(bJ)) {
                                bI = bJ;
                                bJ = I
                            }
                        }
                    }
                    if (!bJ && bK) {
                        bJ = function() {
                            return bK.apply(bI || this, arguments)
                        }
                    }
                    if (bK) {
                        bJ.guid = bK.guid = bK.guid || bJ.guid || bo.guid++
                    }
                    return bJ
                },
                access: function(bI, bQ, bO, bK, bN, bP) {
                    var bJ = bI.length;
                    if (typeof bQ === "object") {
                        for (var bL in bQ) {
                            bo.access(bI, bL, bQ[bL], bK, bN, bO)
                        }
                        return bI
                    }
                    if (bO !== I) {
                        bK = !bP && bK && bo.isFunction(bO);
                        for (var bM = 0; bM < bJ; bM++) {
                            bN(bI[bM], bQ, bK ? bO.call(bI[bM], bM, bN(bI[bM], bQ)) : bO, bP)
                        }
                        return bI
                    }
                    return bJ ? bN(bI[0], bQ) : I
                },
                now: function() {
                    return (new Date()).getTime()
                },
                uaMatch: function(bJ) {
                    bJ = bJ.toLowerCase();
                    var bI = bi.exec(bJ) || bB.exec(bJ) || bA.exec(bJ) || bJ.indexOf("compatible") < 0 && bC.exec(bJ) || [];
                    return {
                        browser: bI[1] || "",
                        version: bI[2] || "0"
                    }
                },
                sub: function() {
                    function bJ(bL, bM) {
                        return new bJ.fn.init(bL, bM)
                    }
                    bo.extend(true, bJ, this);
                    bJ.superclass = this;
                    bJ.fn = bJ.prototype = this();
                    bJ.fn.constructor = bJ;
                    bJ.subclass = this.subclass;
                    bJ.fn.init = function bK(bL, bM) {
                        if (bM && bM instanceof bo && !(bM instanceof bJ)) {
                            bM = bJ(bM)
                        }
                        return bo.fn.init.call(this, bL, bM, bI)
                    };
                    bJ.fn.init.prototype = bJ.fn;
                    var bI = bJ(am);
                    return bJ
                },
                browser: {}
            });
            bo.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(bJ, bI) {
                bh["[object " + bI + "]"] = bI.toLowerCase()
            });
            bE = bo.uaMatch(bG);
            if (bE.browser) {
                bo.browser[bE.browser] = true;
                bo.browser.version = bE.version
            }
            if (bo.browser.webkit) {
                bo.browser.safari = true
            }
            if (bf) {
                bo.inArray = function(bI, bJ) {
                    return bf.call(bJ, bI)
                }
            }
            if (bw.test("\xA0")) {
                bs = /^[\s\xA0]+/;
                bn = /[\s\xA0]+$/
            }
            bm = bo(am);
            if (am.addEventListener) {
                e = function() {
                    am.removeEventListener("DOMContentLoaded", e, false);
                    bo.ready()
                }
            } else {
                if (am.attachEvent) {
                    e = function() {
                        if (am.readyState === "complete") {
                            am.detachEvent("onreadystatechange", e);
                            bo.ready()
                        }
                    }
                }
            }

            function bg() {
                if (bo.isReady) {
                    return
                }
                try {
                    am.documentElement.doScroll("left")
                } catch (bI) {
                    setTimeout(bg, 1);
                    return
                }
                bo.ready()
            }
            return bo
        })();
        var a = "then done fail isResolved isRejected promise".split(" "),
            aA = [].slice;
        b.extend({
            _Deferred: function() {
                var bh = [],
                    bi, bf, bg, e = {
                        done: function() {
                            if (!bg) {
                                var bk = arguments,
                                    bl, bo, bn, bm, bj;
                                if (bi) {
                                    bj = bi;
                                    bi = 0
                                }
                                for (bl = 0, bo = bk.length; bl < bo; bl++) {
                                    bn = bk[bl];
                                    bm = b.type(bn);
                                    if (bm === "array") {
                                        e.done.apply(e, bn)
                                    } else {
                                        if (bm === "function") {
                                            bh.push(bn)
                                        }
                                    }
                                }
                                if (bj) {
                                    e.resolveWith(bj[0], bj[1])
                                }
                            }
                            return this
                        },
                        resolveWith: function(bk, bj) {
                            if (!bg && !bi && !bf) {
                                bj = bj || [];
                                bf = 1;
                                try {
                                    while (bh[0]) {
                                        bh.shift().apply(bk, bj)
                                    }
                                } finally {
                                    bi = [bk, bj];
                                    bf = 0
                                }
                            }
                            return this
                        },
                        resolve: function() {
                            e.resolveWith(this, arguments);
                            return this
                        },
                        isResolved: function() {
                            return !!(bf || bi)
                        },
                        cancel: function() {
                            bg = 1;
                            bh = [];
                            return this
                        }
                    };
                return e
            },
            Deferred: function(bf) {
                var e = b._Deferred(),
                    bh = b._Deferred(),
                    bg;
                b.extend(e, {
                    then: function(bj, bi) {
                        e.done(bj).fail(bi);
                        return this
                    },
                    fail: bh.done,
                    rejectWith: bh.resolveWith,
                    reject: bh.resolve,
                    isRejected: bh.isResolved,
                    promise: function(bj) {
                        if (bj == null) {
                            if (bg) {
                                return bg
                            }
                            bg = bj = {}
                        }
                        var bi = a.length;
                        while (bi--) {
                            bj[a[bi]] = e[a[bi]]
                        }
                        return bj
                    }
                });
                e.done(bh.cancel).fail(e.cancel);
                delete e.cancel;
                if (bf) {
                    bf.call(e, e)
                }
                return e
            },
            when: function(bk) {
                var bf = arguments,
                    bg = 0,
                    bj = bf.length,
                    bi = bj,
                    e = bj <= 1 && bk && b.isFunction(bk.promise) ? bk : b.Deferred();

                function bh(bl) {
                    return function(bm) {
                        bf[bl] = arguments.length > 1 ? aA.call(arguments, 0) : bm;
                        if (!(--bi)) {
                            e.resolveWith(e, aA.call(bf, 0))
                        }
                    }
                }
                if (bj > 1) {
                    for (; bg < bj; bg++) {
                        if (bf[bg] && b.isFunction(bf[bg].promise)) {
                            bf[bg].promise().then(bh(bg), e.reject)
                        } else {
                            --bi
                        }
                    }
                    if (!bi) {
                        e.resolveWith(e, bf)
                    }
                } else {
                    if (e !== bk) {
                        e.resolveWith(e, bj ? [bk] : [])
                    }
                }
                return e.promise()
            }
        });
        (function() {
            b.support = {};
            var bf = am.createElement("div");
            bf.style.display = "none";
            bf.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
            var bo = bf.getElementsByTagName("*"),
                bm = bf.getElementsByTagName("a")[0],
                bn = am.createElement("select"),
                bg = bn.appendChild(am.createElement("option")),
                bl = bf.getElementsByTagName("input")[0];
            if (!bo || !bo.length || !bm) {
                return
            }
            b.support = {
                leadingWhitespace: bf.firstChild.nodeType === 3,
                tbody: !bf.getElementsByTagName("tbody").length,
                htmlSerialize: !!bf.getElementsByTagName("link").length,
                style: /red/.test(bm.getAttribute("style")),
                hrefNormalized: bm.getAttribute("href") === "/a",
                opacity: /^0.55$/.test(bm.style.opacity),
                cssFloat: !!bm.style.cssFloat,
                checkOn: bl.value === "on",
                optSelected: bg.selected,
                deleteExpando: true,
                optDisabled: false,
                checkClone: false,
                noCloneEvent: true,
                noCloneChecked: true,
                boxModel: null,
                inlineBlockNeedsLayout: false,
                shrinkWrapBlocks: false,
                reliableHiddenOffsets: true,
                reliableMarginRight: true
            };
            bl.checked = true;
            b.support.noCloneChecked = bl.cloneNode(true).checked;
            bn.disabled = true;
            b.support.optDisabled = !bg.disabled;
            var bh = null;
            b.support.scriptEval = function() {
                if (bh === null) {
                    var bq = am.documentElement,
                        br = am.createElement("script"),
                        bt = "script" + b.now();
                    try {
                        br.appendChild(am.createTextNode("window." + bt + "=1;"))
                    } catch (bs) {}
                    bq.insertBefore(br, bq.firstChild);
                    if (a0[bt]) {
                        bh = true;
                        delete a0[bt]
                    } else {
                        bh = false
                    }
                    bq.removeChild(br)
                }
                return bh
            };
            try {
                delete bf.test
            } catch (bj) {
                b.support.deleteExpando = false
            }
            if (!bf.addEventListener && bf.attachEvent && bf.fireEvent) {
                bf.attachEvent("onclick", function bp() {
                    b.support.noCloneEvent = false;
                    bf.detachEvent("onclick", bp)
                });
                bf.cloneNode(true).fireEvent("onclick")
            }
            bf = am.createElement("div");
            bf.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
            var bi = am.createDocumentFragment();
            bi.appendChild(bf.firstChild);
            b.support.checkClone = bi.cloneNode(true).cloneNode(true).lastChild.checked;
            b(function() {
                var br = am.createElement("div"),
                    e = am.getElementsByTagName("body")[0];
                if (!e) {
                    return
                }
                br.style.width = br.style.paddingLeft = "1px";
                e.appendChild(br);
                b.boxModel = b.support.boxModel = br.offsetWidth === 2;
                if ("zoom" in br.style) {
                    br.style.display = "inline";
                    br.style.zoom = 1;
                    b.support.inlineBlockNeedsLayout = br.offsetWidth === 2;
                    br.style.display = "";
                    br.innerHTML = "<div style='width:4px;'></div>";
                    b.support.shrinkWrapBlocks = br.offsetWidth !== 2
                }
                br.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>";
                var bq = br.getElementsByTagName("td");
                b.support.reliableHiddenOffsets = bq[0].offsetHeight === 0;
                bq[0].style.display = "";
                bq[1].style.display = "none";
                b.support.reliableHiddenOffsets = b.support.reliableHiddenOffsets && bq[0].offsetHeight === 0;
                br.innerHTML = "";
                if (am.defaultView && am.defaultView.getComputedStyle) {
                    br.style.width = "1px";
                    br.style.marginRight = "0";
                    b.support.reliableMarginRight = am.defaultView.getComputedStyle(br, null) && ((parseInt(am.defaultView.getComputedStyle(br, null).marginRight, 10) || 0) === 0)
                }
                e.removeChild(br).style.display = "none";
                br = bq = null
            });
            var bk = function(e) {
                var br = am.createElement("div");
                e = "on" + e;
                if (!br.attachEvent) {
                    return true
                }
                var bq = (e in br);
                if (!bq) {
                    br.setAttribute(e, "return;");
                    bq = typeof br[e] === "function"
                }
                return bq
            };
            b.support.submitBubbles = bk("submit");
            b.support.changeBubbles = bk("change");
            bf = bo = bm = null
        })();
        var aG = /^(?:\{.*\}|\[.*\])$/;
        b.extend({
            cache: {},
            uuid: 0,
            expando: "jQuery" + (b.fn.jquery + Math.random()).replace(/\D/g, ""),
            noData: {
                embed: true,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
                applet: true
            },
            hasData: function(e) {
                e = e.nodeType ? b.cache[e[b.expando]] : e[b.expando];
                return !!e && !Q(e)
            },
            data: function(bh, bf, bj, bi) {
                if (!b.acceptData(bh)) {
                    return
                }
                var bm = b.expando,
                    bl = typeof bf === "string",
                    bk, bn = bh.nodeType,
                    e = bn ? b.cache : bh,
                    bg = bn ? bh[b.expando] : bh[b.expando] && b.expando;
                if ((!bg || (bi && bg && !e[bg][bm])) && bl && bj === I) {
                    return
                }
                if (!bg) {
                    if (bn) {
                        bh[b.expando] = bg = ++b.uuid
                    } else {
                        bg = b.expando
                    }
                }
                if (!e[bg]) {
                    e[bg] = {};
                    if (!bn) {
                        e[bg].toJSON = b.noop
                    }
                }
                if (typeof bf === "object" || typeof bf === "function") {
                    if (bi) {
                        e[bg][bm] = b.extend(e[bg][bm], bf)
                    } else {
                        e[bg] = b.extend(e[bg], bf)
                    }
                }
                bk = e[bg];
                if (bi) {
                    if (!bk[bm]) {
                        bk[bm] = {}
                    }
                    bk = bk[bm]
                }
                if (bj !== I) {
                    bk[bf] = bj
                }
                if (bf === "events" && !bk[bf]) {
                    return bk[bm] && bk[bm].events
                }
                return bl ? bk[bf] : bk
            },
            removeData: function(bi, bg, bj) {
                if (!b.acceptData(bi)) {
                    return
                }
                var bl = b.expando,
                    bm = bi.nodeType,
                    bf = bm ? b.cache : bi,
                    bh = bm ? bi[b.expando] : b.expando;
                if (!bf[bh]) {
                    return
                }
                if (bg) {
                    var bk = bj ? bf[bh][bl] : bf[bh];
                    if (bk) {
                        delete bk[bg];
                        if (!Q(bk)) {
                            return
                        }
                    }
                }
                if (bj) {
                    delete bf[bh][bl];
                    if (!Q(bf[bh])) {
                        return
                    }
                }
                var e = bf[bh][bl];
                if (b.support.deleteExpando || bf != a0) {
                    delete bf[bh]
                } else {
                    bf[bh] = null
                }
                if (e) {
                    bf[bh] = {};
                    if (!bm) {
                        bf[bh].toJSON = b.noop
                    }
                    bf[bh][bl] = e
                } else {
                    if (bm) {
                        if (b.support.deleteExpando) {
                            delete bi[b.expando]
                        } else {
                            if (bi.removeAttribute) {
                                bi.removeAttribute(b.expando)
                            } else {
                                bi[b.expando] = null
                            }
                        }
                    }
                }
            },
            _data: function(bf, e, bg) {
                return b.data(bf, e, bg, true)
            },
            acceptData: function(bf) {
                if (bf.nodeName) {
                    var e = b.noData[bf.nodeName.toLowerCase()];
                    if (e) {
                        return !(e === true || bf.getAttribute("classid") !== e)
                    }
                }
                return true
            }
        });
        b.fn.extend({
            data: function(bi, bk) {
                var bj = null;
                if (typeof bi === "undefined") {
                    if (this.length) {
                        bj = b.data(this[0]);
                        if (this[0].nodeType === 1) {
                            var e = this[0].attributes,
                                bg;
                            for (var bh = 0, bf = e.length; bh < bf; bh++) {
                                bg = e[bh].name;
                                if (bg.indexOf("data-") === 0) {
                                    bg = bg.substr(5);
                                    aV(this[0], bg, bj[bg])
                                }
                            }
                        }
                    }
                    return bj
                } else {
                    if (typeof bi === "object") {
                        return this.each(function() {
                            b.data(this, bi)
                        })
                    }
                }
                var bl = bi.split(".");
                bl[1] = bl[1] ? "." + bl[1] : "";
                if (bk === I) {
                    bj = this.triggerHandler("getData" + bl[1] + "!", [bl[0]]);
                    if (bj === I && this.length) {
                        bj = b.data(this[0], bi);
                        bj = aV(this[0], bi, bj)
                    }
                    return bj === I && bl[1] ? this.data(bl[0]) : bj
                } else {
                    return this.each(function() {
                        var bn = b(this),
                            bm = [bl[0], bk];
                        bn.triggerHandler("setData" + bl[1] + "!", bm);
                        b.data(this, bi, bk);
                        bn.triggerHandler("changeData" + bl[1] + "!", bm)
                    })
                }
            },
            removeData: function(e) {
                return this.each(function() {
                    b.removeData(this, e)
                })
            }
        });

        function aV(bg, bf, bh) {
            if (bh === I && bg.nodeType === 1) {
                bh = bg.getAttribute("data-" + bf);
                if (typeof bh === "string") {
                    try {
                        bh = bh === "true" ? true : bh === "false" ? false : bh === "null" ? null : !b.isNaN(bh) ? parseFloat(bh) : aG.test(bh) ? b.parseJSON(bh) : bh
                    } catch (bi) {}
                    b.data(bg, bf, bh)
                } else {
                    bh = I
                }
            }
            return bh
        }

        function Q(bf) {
            for (var e in bf) {
                if (e !== "toJSON") {
                    return false
                }
            }
            return true
        }
        b.extend({
            queue: function(bf, e, bh) {
                if (!bf) {
                    return
                }
                e = (e || "fx") + "queue";
                var bg = b._data(bf, e);
                if (!bh) {
                    return bg || []
                }
                if (!bg || b.isArray(bh)) {
                    bg = b._data(bf, e, b.makeArray(bh))
                } else {
                    bg.push(bh)
                }
                return bg
            },
            dequeue: function(bh, bg) {
                bg = bg || "fx";
                var e = b.queue(bh, bg),
                    bf = e.shift();
                if (bf === "inprogress") {
                    bf = e.shift()
                }
                if (bf) {
                    if (bg === "fx") {
                        e.unshift("inprogress")
                    }
                    bf.call(bh, function() {
                        b.dequeue(bh, bg)
                    })
                }
                if (!e.length) {
                    b.removeData(bh, bg + "queue", true)
                }
            }
        });
        b.fn.extend({
            queue: function(e, bf) {
                if (typeof e !== "string") {
                    bf = e;
                    e = "fx"
                }
                if (bf === I) {
                    return b.queue(this[0], e)
                }
                return this.each(function(bh) {
                    var bg = b.queue(this, e, bf);
                    if (e === "fx" && bg[0] !== "inprogress") {
                        b.dequeue(this, e)
                    }
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    b.dequeue(this, e)
                })
            },
            delay: function(bf, e) {
                bf = b.fx ? b.fx.speeds[bf] || bf : bf;
                e = e || "fx";
                return this.queue(e, function() {
                    var bg = this;
                    setTimeout(function() {
                        b.dequeue(bg, e)
                    }, bf)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            }
        });
        var aE = /[\n\t\r]/g,
            a5 = /\s+/,
            aI = /\r/g,
            a4 = /^(?:href|src|style)$/,
            g = /^(?:button|input)$/i,
            D = /^(?:button|input|object|select|textarea)$/i,
            l = /^a(?:rea)?$/i,
            R = /^(?:radio|checkbox)$/i;
        b.props = {
            "for": "htmlFor",
            "class": "className",
            readonly: "readOnly",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            rowspan: "rowSpan",
            colspan: "colSpan",
            tabindex: "tabIndex",
            usemap: "useMap",
            frameborder: "frameBorder"
        };
        b.fn.extend({
            attr: function(e, bf) {
                return b.access(this, e, bf, true, b.attr)
            },
            removeAttr: function(e, bf) {
                return this.each(function() {
                    b.attr(this, e, "");
                    if (this.nodeType === 1) {
                        this.removeAttribute(e)
                    }
                })
            },
            addClass: function(bl) {
                if (b.isFunction(bl)) {
                    return this.each(function(bo) {
                        var bn = b(this);
                        bn.addClass(bl.call(this, bo, bn.attr("class")))
                    })
                }
                if (bl && typeof bl === "string") {
                    var e = (bl || "").split(a5);
                    for (var bh = 0, bg = this.length; bh < bg; bh++) {
                        var bf = this[bh];
                        if (bf.nodeType === 1) {
                            if (!bf.className) {
                                bf.className = bl
                            } else {
                                var bi = " " + bf.className + " ",
                                    bk = bf.className;
                                for (var bj = 0, bm = e.length; bj < bm; bj++) {
                                    if (bi.indexOf(" " + e[bj] + " ") < 0) {
                                        bk += " " + e[bj]
                                    }
                                }
                                bf.className = b.trim(bk)
                            }
                        }
                    }
                }
                return this
            },
            removeClass: function(bj) {
                if (b.isFunction(bj)) {
                    return this.each(function(bn) {
                        var bm = b(this);
                        bm.removeClass(bj.call(this, bn, bm.attr("class")))
                    })
                }
                if ((bj && typeof bj === "string") || bj === I) {
                    var bk = (bj || "").split(a5);
                    for (var bg = 0, bf = this.length; bg < bf; bg++) {
                        var bi = this[bg];
                        if (bi.nodeType === 1 && bi.className) {
                            if (bj) {
                                var bh = (" " + bi.className + " ").replace(aE, " ");
                                for (var bl = 0, e = bk.length; bl < e; bl++) {
                                    bh = bh.replace(" " + bk[bl] + " ", " ")
                                }
                                bi.className = b.trim(bh)
                            } else {
                                bi.className = ""
                            }
                        }
                    }
                }
                return this
            },
            toggleClass: function(bh, bf) {
                var bg = typeof bh,
                    e = typeof bf === "boolean";
                if (b.isFunction(bh)) {
                    return this.each(function(bj) {
                        var bi = b(this);
                        bi.toggleClass(bh.call(this, bj, bi.attr("class"), bf), bf)
                    })
                }
                return this.each(function() {
                    if (bg === "string") {
                        var bk, bj = 0,
                            bi = b(this),
                            bl = bf,
                            bm = bh.split(a5);
                        while ((bk = bm[bj++])) {
                            bl = e ? bl : !bi.hasClass(bk);
                            bi[bl ? "addClass" : "removeClass"](bk)
                        }
                    } else {
                        if (bg === "undefined" || bg === "boolean") {
                            if (this.className) {
                                b._data(this, "__className__", this.className)
                            }
                            this.className = this.className || bh === false ? "" : b._data(this, "__className__") || ""
                        }
                    }
                })
            },
            hasClass: function(e) {
                var bh = " " + e + " ";
                for (var bg = 0, bf = this.length; bg < bf; bg++) {
                    if ((" " + this[bg].className + " ").replace(aE, " ").indexOf(bh) > -1) {
                        return true
                    }
                }
                return false
            },
            val: function(bm) {
                if (!arguments.length) {
                    var bg = this[0];
                    if (bg) {
                        if (b.nodeName(bg, "option")) {
                            var bf = bg.attributes.value;
                            return !bf || bf.specified ? bg.value : bg.text
                        }
                        if (b.nodeName(bg, "select")) {
                            var bk = bg.selectedIndex,
                                bn = [],
                                bo = bg.options,
                                bj = bg.type === "select-one";
                            if (bk < 0) {
                                return null
                            }
                            for (var bh = bj ? bk : 0, bl = bj ? bk + 1 : bo.length; bh < bl; bh++) {
                                var bi = bo[bh];
                                if (bi.selected && (b.support.optDisabled ? !bi.disabled : bi.getAttribute("disabled") === null) && (!bi.parentNode.disabled || !b.nodeName(bi.parentNode, "optgroup"))) {
                                    bm = b(bi).val();
                                    if (bj) {
                                        return bm
                                    }
                                    bn.push(bm)
                                }
                            }
                            if (bj && !bn.length && bo.length) {
                                return b(bo[bk]).val()
                            }
                            return bn
                        }
                        if (R.test(bg.type) && !b.support.checkOn) {
                            return bg.getAttribute("value") === null ? "on" : bg.value
                        }
                        return (bg.value || "").replace(aI, "")
                    }
                    return I
                }
                var e = b.isFunction(bm);
                return this.each(function(br) {
                    var bq = b(this),
                        bs = bm;
                    if (this.nodeType !== 1) {
                        return
                    }
                    if (e) {
                        bs = bm.call(this, br, bq.val())
                    }
                    if (bs == null) {
                        bs = ""
                    } else {
                        if (typeof bs === "number") {
                            bs += ""
                        } else {
                            if (b.isArray(bs)) {
                                bs = b.map(bs, function(bt) {
                                    return bt == null ? "" : bt + ""
                                })
                            }
                        }
                    }
                    if (b.isArray(bs) && R.test(this.type)) {
                        this.checked = b.inArray(bq.val(), bs) >= 0
                    } else {
                        if (b.nodeName(this, "select")) {
                            var bp = b.makeArray(bs);
                            b("option", this).each(function() {
                                this.selected = b.inArray(b(this).val(), bp) >= 0
                            });
                            if (!bp.length) {
                                this.selectedIndex = -1
                            }
                        } else {
                            this.value = bs
                        }
                    }
                })
            }
        });
        b.extend({
            attrFn: {
                val: true,
                css: true,
                html: true,
                text: true,
                data: true,
                width: true,
                height: true,
                offset: true
            },
            attr: function(bf, e, bk, bm) {
                if (!bf || bf.nodeType === 3 || bf.nodeType === 8 || bf.nodeType === 2) {
                    return I
                }
                if (bm && e in b.attrFn) {
                    return b(bf)[e](bk)
                }
                var bg = bf.nodeType !== 1 || !b.isXMLDoc(bf),
                    bj = bk !== I;
                e = bg && b.props[e] || e;
                if (bf.nodeType === 1) {
                    var bi = a4.test(e);
                    if (e === "selected" && !b.support.optSelected) {
                        var bl = bf.parentNode;
                        if (bl) {
                            bl.selectedIndex;
                            if (bl.parentNode) {
                                bl.parentNode.selectedIndex
                            }
                        }
                    }
                    if ((e in bf || bf[e] !== I) && bg && !bi) {
                        if (bj) {
                            if (e === "type" && g.test(bf.nodeName) && bf.parentNode) {
                                b.error("type property can't be changed")
                            }
                            if (bk === null) {
                                if (bf.nodeType === 1) {
                                    bf.removeAttribute(e)
                                }
                            } else {
                                bf[e] = bk
                            }
                        }
                        if (b.nodeName(bf, "form") && bf.getAttribute) {
                            return bf.getAttribute(e) || ""
                        }
                        return bf[e]
                    }
                    if (!b.support.style && bg && e === "style") {
                        if (bj) {
                            bf.style.cssText = "" + bk
                        }
                        return bf.style.cssText
                    }
                    if (bj) {
                        bf.setAttribute(e, "" + bk)
                    }
                    if (!bf.attributes[e] && (bf.hasAttribute && !bf.hasAttribute(e))) {
                        return I
                    }
                    var bh = !b.support.hrefNormalized && bg && bi ? bf.getAttribute(e, 2) : bf.getAttribute(e);
                    return bh === null ? I : bh
                }
                if (bj) {
                    bf[e] = bk
                }
                return bf[e]
            }
        });
        var aR = /\.(.*)$/,
            a2 = /^(?:textarea|input|select)$/i,
            L = /\./g,
            ab = / /g,
            ax = /[^\w\s.|`]/g,
            F = function(e) {
                return e.replace(ax, "\\$&")
            };
        b.event = {
            add: function(bi, bm, bt, bk) {
                if (bi.nodeType === 3 || bi.nodeType === 8) {
                    return
                }
                try {
                    if (b.isWindow(bi) && (bi !== a0 && !bi.frameElement)) {
                        bi = a0
                    }
                } catch (bn) {}
                if (bt === false) {
                    bt = a7
                } else {
                    if (!bt) {
                        return
                    }
                }
                var bg, br;
                if (bt.handler) {
                    bg = bt;
                    bt = bg.handler
                }
                if (!bt.guid) {
                    bt.guid = b.guid++
                }
                var bo = b._data(bi);
                if (!bo) {
                    return
                }
                var bs = bo.events,
                    bl = bo.handle;
                if (!bs) {
                    bo.events = bs = {}
                }
                if (!bl) {
                    bo.handle = bl = function(bu) {
                        return typeof b !== "undefined" && b.event.triggered !== bu.type ? b.event.handle.apply(bl.elem, arguments) : I
                    }
                }
                bl.elem = bi;
                bm = bm.split(" ");
                var bq, bj = 0,
                    bf;
                while ((bq = bm[bj++])) {
                    br = bg ? b.extend({}, bg) : {
                        handler: bt,
                        data: bk
                    };
                    if (bq.indexOf(".") > -1) {
                        bf = bq.split(".");
                        bq = bf.shift();
                        br.namespace = bf.slice(0).sort().join(".")
                    } else {
                        bf = [];
                        br.namespace = ""
                    }
                    br.type = bq;
                    if (!br.guid) {
                        br.guid = bt.guid
                    }
                    var bh = bs[bq],
                        bp = b.event.special[bq] || {};
                    if (!bh) {
                        bh = bs[bq] = [];
                        if (!bp.setup || bp.setup.call(bi, bk, bf, bl) === false) {
                            if (bi.addEventListener) {
                                bi.addEventListener(bq, bl, false)
                            } else {
                                if (bi.attachEvent) {
                                    bi.attachEvent("on" + bq, bl)
                                }
                            }
                        }
                    }
                    if (bp.add) {
                        bp.add.call(bi, br);
                        if (!br.handler.guid) {
                            br.handler.guid = bt.guid
                        }
                    }
                    bh.push(br);
                    b.event.global[bq] = true
                }
                bi = null
            },
            global: {},
            remove: function(bt, bo, bg, bk) {
                if (bt.nodeType === 3 || bt.nodeType === 8) {
                    return
                }
                if (bg === false) {
                    bg = a7
                }
                var bw, bj, bl, bq, br = 0,
                    bh, bm, bp, bi, bn, e, bv, bs = b.hasData(bt) && b._data(bt),
                    bf = bs && bs.events;
                if (!bs || !bf) {
                    return
                }
                if (bo && bo.type) {
                    bg = bo.handler;
                    bo = bo.type
                }
                if (!bo || typeof bo === "string" && bo.charAt(0) === ".") {
                    bo = bo || "";
                    for (bj in bf) {
                        b.event.remove(bt, bj + bo)
                    }
                    return
                }
                bo = bo.split(" ");
                while ((bj = bo[br++])) {
                    bv = bj;
                    e = null;
                    bh = bj.indexOf(".") < 0;
                    bm = [];
                    if (!bh) {
                        bm = bj.split(".");
                        bj = bm.shift();
                        bp = new RegExp("(^|\\.)" + b.map(bm.slice(0).sort(), F).join("\\.(?:.*\\.)?") + "(\\.|$)")
                    }
                    bn = bf[bj];
                    if (!bn) {
                        continue
                    }
                    if (!bg) {
                        for (bq = 0; bq < bn.length; bq++) {
                            e = bn[bq];
                            if (bh || bp.test(e.namespace)) {
                                b.event.remove(bt, bv, e.handler, bq);
                                bn.splice(bq--, 1)
                            }
                        }
                        continue
                    }
                    bi = b.event.special[bj] || {};
                    for (bq = bk || 0; bq < bn.length; bq++) {
                        e = bn[bq];
                        if (bg.guid === e.guid) {
                            if (bh || bp.test(e.namespace)) {
                                if (bk == null) {
                                    bn.splice(bq--, 1)
                                }
                                if (bi.remove) {
                                    bi.remove.call(bt, e)
                                }
                            }
                            if (bk != null) {
                                break
                            }
                        }
                    }
                    if (bn.length === 0 || bk != null && bn.length === 1) {
                        if (!bi.teardown || bi.teardown.call(bt, bm) === false) {
                            b.removeEvent(bt, bj, bs.handle)
                        }
                        bw = null;
                        delete bf[bj]
                    }
                }
                if (b.isEmptyObject(bf)) {
                    var bu = bs.handle;
                    if (bu) {
                        bu.elem = null
                    }
                    delete bs.events;
                    delete bs.handle;
                    if (b.isEmptyObject(bs)) {
                        b.removeData(bt, I, true)
                    }
                }
            },
            trigger: function(bf, bk, bh) {
                var bo = bf.type || bf,
                    bj = arguments[3];
                if (!bj) {
                    bf = typeof bf === "object" ? bf[b.expando] ? bf : b.extend(b.Event(bo), bf) : b.Event(bo);
                    if (bo.indexOf("!") >= 0) {
                        bf.type = bo = bo.slice(0, -1);
                        bf.exclusive = true
                    }
                    if (!bh) {
                        bf.stopPropagation();
                        if (b.event.global[bo]) {
                            b.each(b.cache, function() {
                                var bt = b.expando,
                                    bs = this[bt];
                                if (bs && bs.events && bs.events[bo]) {
                                    b.event.trigger(bf, bk, bs.handle.elem)
                                }
                            })
                        }
                    }
                    if (!bh || bh.nodeType === 3 || bh.nodeType === 8) {
                        return I
                    }
                    bf.result = I;
                    bf.target = bh;
                    bk = b.makeArray(bk);
                    bk.unshift(bf)
                }
                bf.currentTarget = bh;
                var bl = b._data(bh, "handle");
                if (bl) {
                    bl.apply(bh, bk)
                }
                var bq = bh.parentNode || bh.ownerDocument;
                try {
                    if (!(bh && bh.nodeName && b.noData[bh.nodeName.toLowerCase()])) {
                        if (bh["on" + bo] && bh["on" + bo].apply(bh, bk) === false) {
                            bf.result = false;
                            bf.preventDefault()
                        }
                    }
                } catch (bp) {}
                if (!bf.isPropagationStopped() && bq) {
                    b.event.trigger(bf, bk, bq, true)
                } else {
                    if (!bf.isDefaultPrevented()) {
                        var bg, bm = bf.target,
                            e = bo.replace(aR, ""),
                            br = b.nodeName(bm, "a") && e === "click",
                            bn = b.event.special[e] || {};
                        if ((!bn._default || bn._default.call(bh, bf) === false) && !br && !(bm && bm.nodeName && b.noData[bm.nodeName.toLowerCase()])) {
                            try {
                                if (bm[e]) {
                                    bg = bm["on" + e];
                                    if (bg) {
                                        bm["on" + e] = null
                                    }
                                    b.event.triggered = bf.type;
                                    bm[e]()
                                }
                            } catch (bi) {}
                            if (bg) {
                                bm["on" + e] = bg
                            }
                            b.event.triggered = I
                        }
                    }
                }
            },
            handle: function(e) {
                var bn, bg, bf, bp, bo, bj = [],
                    bl = b.makeArray(arguments);
                e = bl[0] = b.event.fix(e || a0.event);
                e.currentTarget = this;
                bn = e.type.indexOf(".") < 0 && !e.exclusive;
                if (!bn) {
                    bf = e.type.split(".");
                    e.type = bf.shift();
                    bj = bf.slice(0).sort();
                    bp = new RegExp("(^|\\.)" + bj.join("\\.(?:.*\\.)?") + "(\\.|$)")
                }
                e.namespace = e.namespace || bj.join(".");
                bo = b._data(this, "events");
                bg = (bo || {})[e.type];
                if (bo && bg) {
                    bg = bg.slice(0);
                    for (var bi = 0, bh = bg.length; bi < bh; bi++) {
                        var bm = bg[bi];
                        if (bn || bp.test(bm.namespace)) {
                            e.handler = bm.handler;
                            e.data = bm.data;
                            e.handleObj = bm;
                            var bk = bm.handler.apply(this, bl);
                            if (bk !== I) {
                                e.result = bk;
                                if (bk === false) {
                                    e.preventDefault();
                                    e.stopPropagation()
                                }
                            }
                            if (e.isImmediatePropagationStopped()) {
                                break
                            }
                        }
                    }
                }
                return e.result
            },
            props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
            fix: function(bh) {
                if (bh[b.expando]) {
                    return bh
                }
                var bf = bh;
                bh = b.Event(bf);
                for (var bg = this.props.length, bj; bg;) {
                    bj = this.props[--bg];
                    bh[bj] = bf[bj]
                }
                if (!bh.target) {
                    bh.target = bh.srcElement || am
                }
                if (bh.target.nodeType === 3) {
                    bh.target = bh.target.parentNode
                }
                if (!bh.relatedTarget && bh.fromElement) {
                    bh.relatedTarget = bh.fromElement === bh.target ? bh.toElement : bh.fromElement
                }
                if (bh.pageX == null && bh.clientX != null) {
                    var bi = am.documentElement,
                        e = am.body;
                    bh.pageX = bh.clientX + (bi && bi.scrollLeft || e && e.scrollLeft || 0) - (bi && bi.clientLeft || e && e.clientLeft || 0);
                    bh.pageY = bh.clientY + (bi && bi.scrollTop || e && e.scrollTop || 0) - (bi && bi.clientTop || e && e.clientTop || 0)
                }
                if (bh.which == null && (bh.charCode != null || bh.keyCode != null)) {
                    bh.which = bh.charCode != null ? bh.charCode : bh.keyCode
                }
                if (!bh.metaKey && bh.ctrlKey) {
                    bh.metaKey = bh.ctrlKey
                }
                if (!bh.which && bh.button !== I) {
                    bh.which = (bh.button & 1 ? 1 : (bh.button & 2 ? 3 : (bh.button & 4 ? 2 : 0)))
                }
                return bh
            },
            guid: 100000000,
            proxy: b.proxy,
            special: {
                ready: {
                    setup: b.bindReady,
                    teardown: b.noop
                },
                live: {
                    add: function(e) {
                        b.event.add(this, o(e.origType, e.selector), b.extend({}, e, {
                            handler: ag,
                            guid: e.handler.guid
                        }))
                    },
                    remove: function(e) {
                        b.event.remove(this, o(e.origType, e.selector), e)
                    }
                },
                beforeunload: {
                    setup: function(bg, bf, e) {
                        if (b.isWindow(this)) {
                            this.onbeforeunload = e
                        }
                    },
                    teardown: function(bf, e) {
                        if (this.onbeforeunload === e) {
                            this.onbeforeunload = null
                        }
                    }
                }
            }
        };
        b.removeEvent = am.removeEventListener ? function(bf, e, bg) {
            if (bf.removeEventListener) {
                bf.removeEventListener(e, bg, false)
            }
        } : function(bf, e, bg) {
            if (bf.detachEvent) {
                bf.detachEvent("on" + e, bg)
            }
        };
        b.Event = function(e) {
            if (!this.preventDefault) {
                return new b.Event(e)
            }
            if (e && e.type) {
                this.originalEvent = e;
                this.type = e.type;
                this.isDefaultPrevented = (e.defaultPrevented || e.returnValue === false || e.getAttribute && e.getAttribute("defaultPrevented")) ? i : a7
            } else {
                this.type = e
            }
            this.timeStamp = b.now();
            this[b.expando] = true
        };

        function a7() {
            return false
        }

        function i() {
            return true
        }
        b.Event.prototype = {
            preventDefault: function() {
                this.isDefaultPrevented = i;
                var bf = this.originalEvent;
                if (!bf) {
                    return
                }
                if (bf.preventDefault) {
                    bf.preventDefault()
                } else {
                    bf.returnValue = false
                }
            },
            stopPropagation: function() {
                this.isPropagationStopped = i;
                var bf = this.originalEvent;
                if (!bf) {
                    return
                }
                if (bf.stopPropagation) {
                    bf.stopPropagation()
                }
                bf.cancelBubble = true
            },
            stopImmediatePropagation: function() {
                this.isImmediatePropagationStopped = i;
                this.stopPropagation()
            },
            isDefaultPrevented: a7,
            isPropagationStopped: a7,
            isImmediatePropagationStopped: a7
        };
        var aa = function(bg) {
                var bf = bg.relatedTarget;
                try {
                    if (bf && bf !== am && !bf.parentNode) {
                        return
                    }
                    while (bf && bf !== this) {
                        bf = bf.parentNode
                    }
                    if (bf !== this) {
                        bg.type = bg.data;
                        b.event.handle.apply(this, arguments)
                    }
                } catch (bh) {}
            },
            aM = function(e) {
                e.type = e.data;
                b.event.handle.apply(this, arguments)
            };
        b.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        }, function(bf, e) {
            b.event.special[bf] = {
                setup: function(bg) {
                    b.event.add(this, e, bg && bg.selector ? aM : aa, bf)
                },
                teardown: function(bg) {
                    b.event.remove(this, e, bg && bg.selector ? aM : aa)
                }
            }
        });
        if (!b.support.submitBubbles) {
            b.event.special.submit = {
                setup: function(bf, e) {
                    if (this.nodeName && this.nodeName.toLowerCase() !== "form") {
                        b.event.add(this, "click.specialSubmit", function(bi) {
                            var bh = bi.target,
                                bg = bh.type;
                            if ((bg === "submit" || bg === "image") && b(bh).closest("form").length) {
                                aP("submit", this, arguments)
                            }
                        });
                        b.event.add(this, "keypress.specialSubmit", function(bi) {
                            var bh = bi.target,
                                bg = bh.type;
                            if ((bg === "text" || bg === "password") && b(bh).closest("form").length && bi.keyCode === 13) {
                                aP("submit", this, arguments)
                            }
                        })
                    } else {
                        return false
                    }
                },
                teardown: function(e) {
                    b.event.remove(this, ".specialSubmit")
                }
            }
        }
        if (!b.support.changeBubbles) {
            var a8, k = function(bf) {
                    var e = bf.type,
                        bg = bf.value;
                    if (e === "radio" || e === "checkbox") {
                        bg = bf.checked
                    } else {
                        if (e === "select-multiple") {
                            bg = bf.selectedIndex > -1 ? b.map(bf.options, function(bh) {
                                return bh.selected
                            }).join("-") : ""
                        } else {
                            if (bf.nodeName.toLowerCase() === "select") {
                                bg = bf.selectedIndex
                            }
                        }
                    }
                    return bg
                },
                Y = function Y(bh) {
                    var bf = bh.target,
                        bg, bi;
                    if (!a2.test(bf.nodeName) || bf.readOnly) {
                        return
                    }
                    bg = b._data(bf, "_change_data");
                    bi = k(bf);
                    if (bh.type !== "focusout" || bf.type !== "radio") {
                        b._data(bf, "_change_data", bi)
                    }
                    if (bg === I || bi === bg) {
                        return
                    }
                    if (bg != null || bi) {
                        bh.type = "change";
                        bh.liveFired = I;
                        b.event.trigger(bh, arguments[1], bf)
                    }
                };
            b.event.special.change = {
                filters: {
                    focusout: Y,
                    beforedeactivate: Y,
                    click: function(bh) {
                        var bg = bh.target,
                            bf = bg.type;
                        if (bf === "radio" || bf === "checkbox" || bg.nodeName.toLowerCase() === "select") {
                            Y.call(this, bh)
                        }
                    },
                    keydown: function(bh) {
                        var bg = bh.target,
                            bf = bg.type;
                        if ((bh.keyCode === 13 && bg.nodeName.toLowerCase() !== "textarea") || (bh.keyCode === 32 && (bf === "checkbox" || bf === "radio")) || bf === "select-multiple") {
                            Y.call(this, bh)
                        }
                    },
                    beforeactivate: function(bg) {
                        var bf = bg.target;
                        b._data(bf, "_change_data", k(bf))
                    }
                },
                setup: function(bg, bf) {
                    if (this.type === "file") {
                        return false
                    }
                    for (var e in a8) {
                        b.event.add(this, e + ".specialChange", a8[e])
                    }
                    return a2.test(this.nodeName)
                },
                teardown: function(e) {
                    b.event.remove(this, ".specialChange");
                    return a2.test(this.nodeName)
                }
            };
            a8 = b.event.special.change.filters;
            a8.focus = a8.beforeactivate
        }

        function aP(bf, bh, e) {
            var bg = b.extend({}, e[0]);
            bg.type = bf;
            bg.originalEvent = {};
            bg.liveFired = I;
            b.event.handle.call(bh, bg);
            if (bg.isDefaultPrevented()) {
                e[0].preventDefault()
            }
        }
        if (am.addEventListener) {
            b.each({
                focus: "focusin",
                blur: "focusout"
            }, function(bh, e) {
                var bf = 0;
                b.event.special[e] = {
                    setup: function() {
                        if (bf++ === 0) {
                            am.addEventListener(bh, bg, true)
                        }
                    },
                    teardown: function() {
                        if (--bf === 0) {
                            am.removeEventListener(bh, bg, true)
                        }
                    }
                };

                function bg(bi) {
                    var bj = b.event.fix(bi);
                    bj.type = e;
                    bj.originalEvent = {};
                    b.event.trigger(bj, null, bj.target);
                    if (bj.isDefaultPrevented()) {
                        bi.preventDefault()
                    }
                }
            })
        }
        b.each(["bind", "one"], function(bf, e) {
            b.fn[e] = function(bl, bm, bk) {
                if (typeof bl === "object") {
                    for (var bi in bl) {
                        this[e](bi, bm, bl[bi], bk)
                    }
                    return this
                }
                if (b.isFunction(bm) || bm === false) {
                    bk = bm;
                    bm = I
                }
                var bj = e === "one" ? b.proxy(bk, function(bn) {
                    b(this).unbind(bn, bj);
                    return bk.apply(this, arguments)
                }) : bk;
                if (bl === "unload" && e !== "one") {
                    this.one(bl, bm, bk)
                } else {
                    for (var bh = 0, bg = this.length; bh < bg; bh++) {
                        b.event.add(this[bh], bl, bj, bm)
                    }
                }
                return this
            }
        });
        b.fn.extend({
            unbind: function(bi, bh) {
                if (typeof bi === "object" && !bi.preventDefault) {
                    for (var bg in bi) {
                        this.unbind(bg, bi[bg])
                    }
                } else {
                    for (var bf = 0, e = this.length; bf < e; bf++) {
                        b.event.remove(this[bf], bi, bh)
                    }
                }
                return this
            },
            delegate: function(e, bf, bh, bg) {
                return this.live(bf, bh, bg, e)
            },
            undelegate: function(e, bf, bg) {
                if (arguments.length === 0) {
                    return this.unbind("live")
                } else {
                    return this.die(bf, null, bg, e)
                }
            },
            trigger: function(e, bf) {
                return this.each(function() {
                    b.event.trigger(e, bf, this)
                })
            },
            triggerHandler: function(e, bg) {
                if (this[0]) {
                    var bf = b.Event(e);
                    bf.preventDefault();
                    bf.stopPropagation();
                    b.event.trigger(bf, bg, this[0]);
                    return bf.result
                }
            },
            toggle: function(bg) {
                var e = arguments,
                    bf = 1;
                while (bf < e.length) {
                    b.proxy(bg, e[bf++])
                }
                return this.click(b.proxy(bg, function(bh) {
                    var bi = (b._data(this, "lastToggle" + bg.guid) || 0) % bf;
                    b._data(this, "lastToggle" + bg.guid, bi + 1);
                    bh.preventDefault();
                    return e[bi].apply(this, arguments) || false
                }))
            },
            hover: function(e, bf) {
                return this.mouseenter(e).mouseleave(bf || e)
            }
        });
        var aJ = {
            focus: "focusin",
            blur: "focusout",
            mouseenter: "mouseover",
            mouseleave: "mouseout"
        };
        b.each(["live", "die"], function(bf, e) {
            b.fn[e] = function(bp, bm, br, bi) {
                var bq, bn = 0,
                    bo, bh, bt, bk = bi || this.selector,
                    bg = bi ? this : b(this.context);
                if (typeof bp === "object" && !bp.preventDefault) {
                    for (var bs in bp) {
                        bg[e](bs, bm, bp[bs], bk)
                    }
                    return this
                }
                if (b.isFunction(bm)) {
                    br = bm;
                    bm = I
                }
                bp = (bp || "").split(" ");
                while ((bq = bp[bn++]) != null) {
                    bo = aR.exec(bq);
                    bh = "";
                    if (bo) {
                        bh = bo[0];
                        bq = bq.replace(aR, "")
                    }
                    if (bq === "hover") {
                        bp.push("mouseenter" + bh, "mouseleave" + bh);
                        continue
                    }
                    bt = bq;
                    if (bq === "focus" || bq === "blur") {
                        bp.push(aJ[bq] + bh);
                        bq = bq + bh
                    } else {
                        bq = (aJ[bq] || bq) + bh
                    }
                    if (e === "live") {
                        for (var bl = 0, bj = bg.length; bl < bj; bl++) {
                            b.event.add(bg[bl], "live." + o(bq, bk), {
                                data: bm,
                                selector: bk,
                                handler: br,
                                origType: bq,
                                origHandler: br,
                                preType: bt
                            })
                        }
                    } else {
                        bg.unbind("live." + o(bq, bk), br)
                    }
                }
                return this
            }
        });

        function ag(bp) {
            var bm, bh, bv, bj, e, br, bo, bq, bn, bu, bl, bk, bt, bs = [],
                bi = [],
                bf = b._data(this, "events");
            if (bp.liveFired === this || !bf || !bf.live || bp.target.disabled || bp.button && bp.type === "click") {
                return
            }
            if (bp.namespace) {
                bk = new RegExp("(^|\\.)" + bp.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)")
            }
            bp.liveFired = this;
            var bg = bf.live.slice(0);
            for (bo = 0; bo < bg.length; bo++) {
                e = bg[bo];
                if (e.origType.replace(aR, "") === bp.type) {
                    bi.push(e.selector)
                } else {
                    bg.splice(bo--, 1)
                }
            }
            bj = b(bp.target).closest(bi, bp.currentTarget);
            for (bq = 0, bn = bj.length; bq < bn; bq++) {
                bl = bj[bq];
                for (bo = 0; bo < bg.length; bo++) {
                    e = bg[bo];
                    if (bl.selector === e.selector && (!bk || bk.test(e.namespace)) && !bl.elem.disabled) {
                        br = bl.elem;
                        bv = null;
                        if (e.preType === "mouseenter" || e.preType === "mouseleave") {
                            bp.type = e.preType;
                            bv = b(bp.relatedTarget).closest(e.selector)[0]
                        }
                        if (!bv || bv !== br) {
                            bs.push({
                                elem: br,
                                handleObj: e,
                                level: bl.level
                            })
                        }
                    }
                }
            }
            for (bq = 0, bn = bs.length; bq < bn; bq++) {
                bj = bs[bq];
                if (bh && bj.level > bh) {
                    break
                }
                bp.currentTarget = bj.elem;
                bp.data = bj.handleObj.data;
                bp.handleObj = bj.handleObj;
                bt = bj.handleObj.origHandler.apply(bj.elem, arguments);
                if (bt === false || bp.isPropagationStopped()) {
                    bh = bj.level;
                    if (bt === false) {
                        bm = false
                    }
                    if (bp.isImmediatePropagationStopped()) {
                        break
                    }
                }
            }
            return bm
        }

        function o(bf, e) {
            return (bf && bf !== "*" ? bf + "." : "") + e.replace(L, "`").replace(ab, "&")
        }
        b.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error").split(" "), function(bf, e) {
            b.fn[e] = function(bh, bg) {
                if (bg == null) {
                    bg = bh;
                    bh = null
                }
                return arguments.length > 0 ? this.bind(e, bh, bg) : this.trigger(e)
            };
            if (b.attrFn) {
                b.attrFn[e] = true
            }
        });
        (function() {
            var bp = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
                bq = 0,
                bt = Object.prototype.toString,
                bk = false,
                bj = true,
                br = /\\/g,
                bx = /\W/;
            [0, 0].sort(function() {
                bj = false;
                return 0
            });
            var bh = function(bC, e, bF, bG) {
                bF = bF || [];
                e = e || am;
                var bI = e;
                if (e.nodeType !== 1 && e.nodeType !== 9) {
                    return []
                }
                if (!bC || typeof bC !== "string") {
                    return bF
                }
                var bz, bK, bN, by, bJ, bM, bL, bE, bB = true,
                    bA = bh.isXML(e),
                    bD = [],
                    bH = bC;
                do {
                    bp.exec("");
                    bz = bp.exec(bH);
                    if (bz) {
                        bH = bz[3];
                        bD.push(bz[1]);
                        if (bz[2]) {
                            by = bz[3];
                            break
                        }
                    }
                } while (bz);
                if (bD.length > 1 && bl.exec(bC)) {
                    if (bD.length === 2 && bm.relative[bD[0]]) {
                        bK = bu(bD[0] + bD[1], e)
                    } else {
                        bK = bm.relative[bD[0]] ? [e] : bh(bD.shift(), e);
                        while (bD.length) {
                            bC = bD.shift();
                            if (bm.relative[bC]) {
                                bC += bD.shift()
                            }
                            bK = bu(bC, bK)
                        }
                    }
                } else {
                    if (!bG && bD.length > 1 && e.nodeType === 9 && !bA && bm.match.ID.test(bD[0]) && !bm.match.ID.test(bD[bD.length - 1])) {
                        bJ = bh.find(bD.shift(), e, bA);
                        e = bJ.expr ? bh.filter(bJ.expr, bJ.set)[0] : bJ.set[0]
                    }
                    if (e) {
                        bJ = bG ? {
                            expr: bD.pop(),
                            set: bn(bG)
                        } : bh.find(bD.pop(), bD.length === 1 && (bD[0] === "~" || bD[0] === "+") && e.parentNode ? e.parentNode : e, bA);
                        bK = bJ.expr ? bh.filter(bJ.expr, bJ.set) : bJ.set;
                        if (bD.length > 0) {
                            bN = bn(bK)
                        } else {
                            bB = false
                        }
                        while (bD.length) {
                            bM = bD.pop();
                            bL = bM;
                            if (!bm.relative[bM]) {
                                bM = ""
                            } else {
                                bL = bD.pop()
                            }
                            if (bL == null) {
                                bL = e
                            }
                            bm.relative[bM](bN, bL, bA)
                        }
                    } else {
                        bN = bD = []
                    }
                }
                if (!bN) {
                    bN = bK
                }
                if (!bN) {
                    bh.error(bM || bC)
                }
                if (bt.call(bN) === "[object Array]") {
                    if (!bB) {
                        bF.push.apply(bF, bN)
                    } else {
                        if (e && e.nodeType === 1) {
                            for (bE = 0; bN[bE] != null; bE++) {
                                if (bN[bE] && (bN[bE] === true || bN[bE].nodeType === 1 && bh.contains(e, bN[bE]))) {
                                    bF.push(bK[bE])
                                }
                            }
                        } else {
                            for (bE = 0; bN[bE] != null; bE++) {
                                if (bN[bE] && bN[bE].nodeType === 1) {
                                    bF.push(bK[bE])
                                }
                            }
                        }
                    }
                } else {
                    bn(bN, bF)
                }
                if (by) {
                    bh(by, bI, bF, bG);
                    bh.uniqueSort(bF)
                }
                return bF
            };
            bh.uniqueSort = function(by) {
                if (bs) {
                    bk = bj;
                    by.sort(bs);
                    if (bk) {
                        for (var e = 1; e < by.length; e++) {
                            if (by[e] === by[e - 1]) {
                                by.splice(e--, 1)
                            }
                        }
                    }
                }
                return by
            };
            bh.matches = function(e, by) {
                return bh(e, null, null, by)
            };
            bh.matchesSelector = function(e, by) {
                return bh(by, null, null, [e]).length > 0
            };
            bh.find = function(bE, e, bF) {
                var bD;
                if (!bE) {
                    return []
                }
                for (var bA = 0, bz = bm.order.length; bA < bz; bA++) {
                    var bB, bC = bm.order[bA];
                    if ((bB = bm.leftMatch[bC].exec(bE))) {
                        var by = bB[1];
                        bB.splice(1, 1);
                        if (by.substr(by.length - 1) !== "\\") {
                            bB[1] = (bB[1] || "").replace(br, "");
                            bD = bm.find[bC](bB, e, bF);
                            if (bD != null) {
                                bE = bE.replace(bm.match[bC], "");
                                break
                            }
                        }
                    }
                }
                if (!bD) {
                    bD = typeof e.getElementsByTagName !== "undefined" ? e.getElementsByTagName("*") : []
                }
                return {
                    set: bD,
                    expr: bE
                }
            };
            bh.filter = function(bI, bH, bL, bB) {
                var bD, e, bz = bI,
                    bN = [],
                    bF = bH,
                    bE = bH && bH[0] && bh.isXML(bH[0]);
                while (bI && bH.length) {
                    for (var bG in bm.filter) {
                        if ((bD = bm.leftMatch[bG].exec(bI)) != null && bD[2]) {
                            var bM, bK, by = bm.filter[bG],
                                bA = bD[1];
                            e = false;
                            bD.splice(1, 1);
                            if (bA.substr(bA.length - 1) === "\\") {
                                continue
                            }
                            if (bF === bN) {
                                bN = []
                            }
                            if (bm.preFilter[bG]) {
                                bD = bm.preFilter[bG](bD, bF, bL, bN, bB, bE);
                                if (!bD) {
                                    e = bM = true
                                } else {
                                    if (bD === true) {
                                        continue
                                    }
                                }
                            }
                            if (bD) {
                                for (var bC = 0;
                                    (bK = bF[bC]) != null; bC++) {
                                    if (bK) {
                                        bM = by(bK, bD, bC, bF);
                                        var bJ = bB ^ !!bM;
                                        if (bL && bM != null) {
                                            if (bJ) {
                                                e = true
                                            } else {
                                                bF[bC] = false
                                            }
                                        } else {
                                            if (bJ) {
                                                bN.push(bK);
                                                e = true
                                            }
                                        }
                                    }
                                }
                            }
                            if (bM !== I) {
                                if (!bL) {
                                    bF = bN
                                }
                                bI = bI.replace(bm.match[bG], "");
                                if (!e) {
                                    return []
                                }
                                break
                            }
                        }
                    }
                    if (bI === bz) {
                        if (e == null) {
                            bh.error(bI)
                        } else {
                            break
                        }
                    }
                    bz = bI
                }
                return bF
            };
            bh.error = function(e) {
                throw "Syntax error, unrecognized expression: " + e
            };
            var bm = bh.selectors = {
                order: ["ID", "NAME", "TAG"],
                match: {
                    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                    CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                },
                leftMatch: {},
                attrMap: {
                    "class": "className",
                    "for": "htmlFor"
                },
                attrHandle: {
                    href: function(e) {
                        return e.getAttribute("href")
                    },
                    type: function(e) {
                        return e.getAttribute("type")
                    }
                },
                relative: {
                    "+": function(bD, by) {
                        var bA = typeof by === "string",
                            bC = bA && !bx.test(by),
                            bE = bA && !bC;
                        if (bC) {
                            by = by.toLowerCase()
                        }
                        for (var bz = 0, e = bD.length, bB; bz < e; bz++) {
                            if ((bB = bD[bz])) {
                                while ((bB = bB.previousSibling) && bB.nodeType !== 1) {}
                                bD[bz] = bE || bB && bB.nodeName.toLowerCase() === by ? bB || false : bB === by
                            }
                        }
                        if (bE) {
                            bh.filter(by, bD, true)
                        }
                    },
                    ">": function(bD, by) {
                        var bC, bB = typeof by === "string",
                            bz = 0,
                            e = bD.length;
                        if (bB && !bx.test(by)) {
                            by = by.toLowerCase();
                            for (; bz < e; bz++) {
                                bC = bD[bz];
                                if (bC) {
                                    var bA = bC.parentNode;
                                    bD[bz] = bA.nodeName.toLowerCase() === by ? bA : false
                                }
                            }
                        } else {
                            for (; bz < e; bz++) {
                                bC = bD[bz];
                                if (bC) {
                                    bD[bz] = bB ? bC.parentNode : bC.parentNode === by
                                }
                            }
                            if (bB) {
                                bh.filter(by, bD, true)
                            }
                        }
                    },
                    "": function(bA, by, bC) {
                        var bB, bz = bq++,
                            e = bv;
                        if (typeof by === "string" && !bx.test(by)) {
                            by = by.toLowerCase();
                            bB = by;
                            e = bf
                        }
                        e("parentNode", by, bz, bA, bB, bC)
                    },
                    "~": function(bA, by, bC) {
                        var bB, bz = bq++,
                            e = bv;
                        if (typeof by === "string" && !bx.test(by)) {
                            by = by.toLowerCase();
                            bB = by;
                            e = bf
                        }
                        e("previousSibling", by, bz, bA, bB, bC)
                    }
                },
                find: {
                    ID: function(by, bz, bA) {
                        if (typeof bz.getElementById !== "undefined" && !bA) {
                            var e = bz.getElementById(by[1]);
                            return e && e.parentNode ? [e] : []
                        }
                    },
                    NAME: function(bz, bC) {
                        if (typeof bC.getElementsByName !== "undefined") {
                            var by = [],
                                bB = bC.getElementsByName(bz[1]);
                            for (var bA = 0, e = bB.length; bA < e; bA++) {
                                if (bB[bA].getAttribute("name") === bz[1]) {
                                    by.push(bB[bA])
                                }
                            }
                            return by.length === 0 ? null : by
                        }
                    },
                    TAG: function(e, by) {
                        if (typeof by.getElementsByTagName !== "undefined") {
                            return by.getElementsByTagName(e[1])
                        }
                    }
                },
                preFilter: {
                    CLASS: function(bA, by, bz, e, bD, bE) {
                        bA = " " + bA[1].replace(br, "") + " ";
                        if (bE) {
                            return bA
                        }
                        for (var bB = 0, bC;
                            (bC = by[bB]) != null; bB++) {
                            if (bC) {
                                if (bD ^ (bC.className && (" " + bC.className + " ").replace(/[\t\n\r]/g, " ").indexOf(bA) >= 0)) {
                                    if (!bz) {
                                        e.push(bC)
                                    }
                                } else {
                                    if (bz) {
                                        by[bB] = false
                                    }
                                }
                            }
                        }
                        return false
                    },
                    ID: function(e) {
                        return e[1].replace(br, "")
                    },
                    TAG: function(by, e) {
                        return by[1].replace(br, "").toLowerCase()
                    },
                    CHILD: function(e) {
                        if (e[1] === "nth") {
                            if (!e[2]) {
                                bh.error(e[0])
                            }
                            e[2] = e[2].replace(/^\+|\s*/g, "");
                            var by = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2] === "even" && "2n" || e[2] === "odd" && "2n+1" || !/\D/.test(e[2]) && "0n+" + e[2] || e[2]);
                            e[2] = (by[1] + (by[2] || 1)) - 0;
                            e[3] = by[3] - 0
                        } else {
                            if (e[2]) {
                                bh.error(e[0])
                            }
                        }
                        e[0] = bq++;
                        return e
                    },
                    ATTR: function(bB, by, bz, e, bC, bD) {
                        var bA = bB[1] = bB[1].replace(br, "");
                        if (!bD && bm.attrMap[bA]) {
                            bB[1] = bm.attrMap[bA]
                        }
                        bB[4] = (bB[4] || bB[5] || "").replace(br, "");
                        if (bB[2] === "~=") {
                            bB[4] = " " + bB[4] + " "
                        }
                        return bB
                    },
                    PSEUDO: function(bB, by, bz, e, bC) {
                        if (bB[1] === "not") {
                            if ((bp.exec(bB[3]) || "").length > 1 || /^\w/.test(bB[3])) {
                                bB[3] = bh(bB[3], null, null, by)
                            } else {
                                var bA = bh.filter(bB[3], by, bz, true ^ bC);
                                if (!bz) {
                                    e.push.apply(e, bA)
                                }
                                return false
                            }
                        } else {
                            if (bm.match.POS.test(bB[0]) || bm.match.CHILD.test(bB[0])) {
                                return true
                            }
                        }
                        return bB
                    },
                    POS: function(e) {
                        e.unshift(true);
                        return e
                    }
                },
                filters: {
                    enabled: function(e) {
                        return e.disabled === false && e.type !== "hidden"
                    },
                    disabled: function(e) {
                        return e.disabled === true
                    },
                    checked: function(e) {
                        return e.checked === true
                    },
                    selected: function(e) {
                        if (e.parentNode) {
                            e.parentNode.selectedIndex
                        }
                        return e.selected === true
                    },
                    parent: function(e) {
                        return !!e.firstChild
                    },
                    empty: function(e) {
                        return !e.firstChild
                    },
                    has: function(bz, by, e) {
                        return !!bh(e[3], bz).length
                    },
                    header: function(e) {
                        return (/h\d/i).test(e.nodeName)
                    },
                    text: function(bz) {
                        var e = bz.getAttribute("type"),
                            by = bz.type;
                        return "text" === by && (e === by || e === null)
                    },
                    radio: function(e) {
                        return "radio" === e.type
                    },
                    checkbox: function(e) {
                        return "checkbox" === e.type
                    },
                    file: function(e) {
                        return "file" === e.type
                    },
                    password: function(e) {
                        return "password" === e.type
                    },
                    submit: function(e) {
                        return "submit" === e.type
                    },
                    image: function(e) {
                        return "image" === e.type
                    },
                    reset: function(e) {
                        return "reset" === e.type
                    },
                    button: function(e) {
                        return "button" === e.type || e.nodeName.toLowerCase() === "button"
                    },
                    input: function(e) {
                        return (/input|select|textarea|button/i).test(e.nodeName)
                    }
                },
                setFilters: {
                    first: function(by, e) {
                        return e === 0
                    },
                    last: function(bz, by, e, bA) {
                        return by === bA.length - 1
                    },
                    even: function(by, e) {
                        return e % 2 === 0
                    },
                    odd: function(by, e) {
                        return e % 2 === 1
                    },
                    lt: function(bz, by, e) {
                        return by < e[3] - 0
                    },
                    gt: function(bz, by, e) {
                        return by > e[3] - 0
                    },
                    nth: function(bz, by, e) {
                        return e[3] - 0 === by
                    },
                    eq: function(bz, by, e) {
                        return e[3] - 0 === by
                    }
                },
                filter: {
                    PSEUDO: function(bz, bE, bD, bF) {
                        var e = bE[1],
                            by = bm.filters[e];
                        if (by) {
                            return by(bz, bD, bE, bF)
                        } else {
                            if (e === "contains") {
                                return (bz.textContent || bz.innerText || bh.getText([bz]) || "").indexOf(bE[3]) >= 0
                            } else {
                                if (e === "not") {
                                    var bA = bE[3];
                                    for (var bC = 0, bB = bA.length; bC < bB; bC++) {
                                        if (bA[bC] === bz) {
                                            return false
                                        }
                                    }
                                    return true
                                } else {
                                    bh.error(e)
                                }
                            }
                        }
                    },
                    CHILD: function(e, bA) {
                        var bD = bA[1],
                            by = e;
                        switch (bD) {
                            case "only":
                            case "first":
                                while ((by = by.previousSibling)) {
                                    if (by.nodeType === 1) {
                                        return false
                                    }
                                }
                                if (bD === "first") {
                                    return true
                                }
                                by = e;
                            case "last":
                                while ((by = by.nextSibling)) {
                                    if (by.nodeType === 1) {
                                        return false
                                    }
                                }
                                return true;
                            case "nth":
                                var bz = bA[2],
                                    bG = bA[3];
                                if (bz === 1 && bG === 0) {
                                    return true
                                }
                                var bC = bA[0],
                                    bF = e.parentNode;
                                if (bF && (bF.sizcache !== bC || !e.nodeIndex)) {
                                    var bB = 0;
                                    for (by = bF.firstChild; by; by = by.nextSibling) {
                                        if (by.nodeType === 1) {
                                            by.nodeIndex = ++bB
                                        }
                                    }
                                    bF.sizcache = bC
                                }
                                var bE = e.nodeIndex - bG;
                                if (bz === 0) {
                                    return bE === 0
                                } else {
                                    return (bE % bz === 0 && bE / bz >= 0)
                                }
                        }
                    },
                    ID: function(by, e) {
                        return by.nodeType === 1 && by.getAttribute("id") === e
                    },
                    TAG: function(by, e) {
                        return (e === "*" && by.nodeType === 1) || by.nodeName.toLowerCase() === e
                    },
                    CLASS: function(by, e) {
                        return (" " + (by.className || by.getAttribute("class")) + " ").indexOf(e) > -1
                    },
                    ATTR: function(bC, bA) {
                        var bz = bA[1],
                            e = bm.attrHandle[bz] ? bm.attrHandle[bz](bC) : bC[bz] != null ? bC[bz] : bC.getAttribute(bz),
                            bD = e + "",
                            bB = bA[2],
                            by = bA[4];
                        return e == null ? bB === "!=" : bB === "=" ? bD === by : bB === "*=" ? bD.indexOf(by) >= 0 : bB === "~=" ? (" " + bD + " ").indexOf(by) >= 0 : !by ? bD && e !== false : bB === "!=" ? bD !== by : bB === "^=" ? bD.indexOf(by) === 0 : bB === "$=" ? bD.substr(bD.length - by.length) === by : bB === "|=" ? bD === by || bD.substr(0, by.length + 1) === by + "-" : false
                    },
                    POS: function(bB, by, bz, bC) {
                        var e = by[2],
                            bA = bm.setFilters[e];
                        if (bA) {
                            return bA(bB, bz, by, bC)
                        }
                    }
                }
            };
            var bl = bm.match.POS,
                bg = function(by, e) {
                    return "\\" + (e - 0 + 1)
                };
            for (var bi in bm.match) {
                bm.match[bi] = new RegExp(bm.match[bi].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
                bm.leftMatch[bi] = new RegExp(/(^(?:.|\r|\n)*?)/.source + bm.match[bi].source.replace(/\\(\d+)/g, bg))
            }
            var bn = function(by, e) {
                by = Array.prototype.slice.call(by, 0);
                if (e) {
                    e.push.apply(e, by);
                    return e
                }
                return by
            };
            try {
                Array.prototype.slice.call(am.documentElement.childNodes, 0)[0].nodeType
            } catch (bw) {
                bn = function(bB, bA) {
                    var bz = 0,
                        by = bA || [];
                    if (bt.call(bB) === "[object Array]") {
                        Array.prototype.push.apply(by, bB)
                    } else {
                        if (typeof bB.length === "number") {
                            for (var e = bB.length; bz < e; bz++) {
                                by.push(bB[bz])
                            }
                        } else {
                            for (; bB[bz]; bz++) {
                                by.push(bB[bz])
                            }
                        }
                    }
                    return by
                }
            }
            var bs, bo;
            if (am.documentElement.compareDocumentPosition) {
                bs = function(by, e) {
                    if (by === e) {
                        bk = true;
                        return 0
                    }
                    if (!by.compareDocumentPosition || !e.compareDocumentPosition) {
                        return by.compareDocumentPosition ? -1 : 1
                    }
                    return by.compareDocumentPosition(e) & 4 ? -1 : 1
                }
            } else {
                bs = function(bF, bE) {
                    var bC, by, bz = [],
                        e = [],
                        bB = bF.parentNode,
                        bD = bE.parentNode,
                        bG = bB;
                    if (bF === bE) {
                        bk = true;
                        return 0
                    } else {
                        if (bB === bD) {
                            return bo(bF, bE)
                        } else {
                            if (!bB) {
                                return -1
                            } else {
                                if (!bD) {
                                    return 1
                                }
                            }
                        }
                    }
                    while (bG) {
                        bz.unshift(bG);
                        bG = bG.parentNode
                    }
                    bG = bD;
                    while (bG) {
                        e.unshift(bG);
                        bG = bG.parentNode
                    }
                    bC = bz.length;
                    by = e.length;
                    for (var bA = 0; bA < bC && bA < by; bA++) {
                        if (bz[bA] !== e[bA]) {
                            return bo(bz[bA], e[bA])
                        }
                    }
                    return bA === bC ? bo(bF, e[bA], -1) : bo(bz[bA], bE, 1)
                };
                bo = function(by, e, bz) {
                    if (by === e) {
                        return bz
                    }
                    var bA = by.nextSibling;
                    while (bA) {
                        if (bA === e) {
                            return -1
                        }
                        bA = bA.nextSibling
                    }
                    return 1
                }
            }
            bh.getText = function(e) {
                var by = "",
                    bA;
                for (var bz = 0; e[bz]; bz++) {
                    bA = e[bz];
                    if (bA.nodeType === 3 || bA.nodeType === 4) {
                        by += bA.nodeValue
                    } else {
                        if (bA.nodeType !== 8) {
                            by += bh.getText(bA.childNodes)
                        }
                    }
                }
                return by
            };
            (function() {
                var by = am.createElement("div"),
                    bz = "script" + (new Date()).getTime(),
                    e = am.documentElement;
                by.innerHTML = "<a name='" + bz + "'/>";
                e.insertBefore(by, e.firstChild);
                if (am.getElementById(bz)) {
                    bm.find.ID = function(bB, bC, bD) {
                        if (typeof bC.getElementById !== "undefined" && !bD) {
                            var bA = bC.getElementById(bB[1]);
                            return bA ? bA.id === bB[1] || typeof bA.getAttribute !== "undefined" && bA.getAttribute("id") === bB[1] ? [bA] : I : []
                        }
                    };
                    bm.filter.ID = function(bB, bA) {
                        return bB.nodeType === 1 && bB.getAttribute && bB.getAttribute("id") === bA
                    }
                }
                e.removeChild(by);
                e = by = null
            })();
            (function() {
                var e = am.createElement("div");
                e.appendChild(am.createComment(""));
                if (e.getElementsByTagName("*").length > 0) {
                    bm.find.TAG = function(by, bC) {
                        var bB = bC.getElementsByTagName(by[1]);
                        if (by[1] === "*") {
                            var bA = [];
                            for (var bz = 0; bB[bz]; bz++) {
                                if (bB[bz].nodeType === 1) {
                                    bA.push(bB[bz])
                                }
                            }
                            bB = bA
                        }
                        return bB
                    }
                }
                e.innerHTML = "<a href='#'></a>";
                if (e.firstChild && typeof e.firstChild.getAttribute !== "undefined" && e.firstChild.getAttribute("href") !== "#") {
                    bm.attrHandle.href = function(by) {
                        return by.getAttribute("href", 2)
                    }
                }
                e = null
            })();
            if (am.querySelectorAll) {
                (function() {
                    var e = bh,
                        bA = am.createElement("div"),
                        bz = "__sizzle__";
                    bA.innerHTML = "<p class='TEST'></p>";
                    if (bA.querySelectorAll && bA.querySelectorAll(".TEST").length === 0) {
                        return
                    }
                    bh = function(bL, bC, bG, bK) {
                        bC = bC || am;
                        if (!bK && !bh.isXML(bC)) {
                            var bJ = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(bL);
                            if (bJ && (bC.nodeType === 1 || bC.nodeType === 9)) {
                                if (bJ[1]) {
                                    return bn(bC.getElementsByTagName(bL), bG)
                                } else {
                                    if (bJ[2] && bm.find.CLASS && bC.getElementsByClassName) {
                                        return bn(bC.getElementsByClassName(bJ[2]), bG)
                                    }
                                }
                            }
                            if (bC.nodeType === 9) {
                                if (bL === "body" && bC.body) {
                                    return bn([bC.body], bG)
                                } else {
                                    if (bJ && bJ[3]) {
                                        var bF = bC.getElementById(bJ[3]);
                                        if (bF && bF.parentNode) {
                                            if (bF.id === bJ[3]) {
                                                return bn([bF], bG)
                                            }
                                        } else {
                                            return bn([], bG)
                                        }
                                    }
                                }
                                try {
                                    return bn(bC.querySelectorAll(bL), bG)
                                } catch (bH) {}
                            } else {
                                if (bC.nodeType === 1 && bC.nodeName.toLowerCase() !== "object") {
                                    var bD = bC,
                                        bE = bC.getAttribute("id"),
                                        bB = bE || bz,
                                        bN = bC.parentNode,
                                        bM = /^\s*[+~]/.test(bL);
                                    if (!bE) {
                                        bC.setAttribute("id", bB)
                                    } else {
                                        bB = bB.replace(/'/g, "\\$&")
                                    }
                                    if (bM && bN) {
                                        bC = bC.parentNode
                                    }
                                    try {
                                        if (!bM || bN) {
                                            return bn(bC.querySelectorAll("[id='" + bB + "'] " + bL), bG)
                                        }
                                    } catch (bI) {} finally {
                                        if (!bE) {
                                            bD.removeAttribute("id")
                                        }
                                    }
                                }
                            }
                        }
                        return e(bL, bC, bG, bK)
                    };
                    for (var by in e) {
                        bh[by] = e[by]
                    }
                    bA = null
                })()
            }(function() {
                var e = am.documentElement,
                    bz = e.matchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || e.msMatchesSelector;
                if (bz) {
                    var bB = !bz.call(am.createElement("div"), "div"),
                        by = false;
                    try {
                        bz.call(am.documentElement, "[test!='']:sizzle")
                    } catch (bA) {
                        by = true
                    }
                    bh.matchesSelector = function(bD, bF) {
                        bF = bF.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                        if (!bh.isXML(bD)) {
                            try {
                                if (by || !bm.match.PSEUDO.test(bF) && !/!=/.test(bF)) {
                                    var bC = bz.call(bD, bF);
                                    if (bC || !bB || bD.document && bD.document.nodeType !== 11) {
                                        return bC
                                    }
                                }
                            } catch (bE) {}
                        }
                        return bh(bF, null, null, [bD]).length > 0
                    }
                }
            })();
            (function() {
                var e = am.createElement("div");
                e.innerHTML = "<div class='test e'></div><div class='test'></div>";
                if (!e.getElementsByClassName || e.getElementsByClassName("e").length === 0) {
                    return
                }
                e.lastChild.className = "e";
                if (e.getElementsByClassName("e").length === 1) {
                    return
                }
                bm.order.splice(1, 0, "CLASS");
                bm.find.CLASS = function(by, bz, bA) {
                    if (typeof bz.getElementsByClassName !== "undefined" && !bA) {
                        return bz.getElementsByClassName(by[1])
                    }
                };
                e = null
            })();

            function bf(by, bD, bC, bG, bE, bF) {
                for (var bA = 0, bz = bG.length; bA < bz; bA++) {
                    var e = bG[bA];
                    if (e) {
                        var bB = false;
                        e = e[by];
                        while (e) {
                            if (e.sizcache === bC) {
                                bB = bG[e.sizset];
                                break
                            }
                            if (e.nodeType === 1 && !bF) {
                                e.sizcache = bC;
                                e.sizset = bA
                            }
                            if (e.nodeName.toLowerCase() === bD) {
                                bB = e;
                                break
                            }
                            e = e[by]
                        }
                        bG[bA] = bB
                    }
                }
            }

            function bv(by, bD, bC, bG, bE, bF) {
                for (var bA = 0, bz = bG.length; bA < bz; bA++) {
                    var e = bG[bA];
                    if (e) {
                        var bB = false;
                        e = e[by];
                        while (e) {
                            if (e.sizcache === bC) {
                                bB = bG[e.sizset];
                                break
                            }
                            if (e.nodeType === 1) {
                                if (!bF) {
                                    e.sizcache = bC;
                                    e.sizset = bA
                                }
                                if (typeof bD !== "string") {
                                    if (e === bD) {
                                        bB = true;
                                        break
                                    }
                                } else {
                                    if (bh.filter(bD, [e]).length > 0) {
                                        bB = e;
                                        break
                                    }
                                }
                            }
                            e = e[by]
                        }
                        bG[bA] = bB
                    }
                }
            }
            if (am.documentElement.contains) {
                bh.contains = function(by, e) {
                    return by !== e && (by.contains ? by.contains(e) : true)
                }
            } else {
                if (am.documentElement.compareDocumentPosition) {
                    bh.contains = function(by, e) {
                        return !!(by.compareDocumentPosition(e) & 16)
                    }
                } else {
                    bh.contains = function() {
                        return false
                    }
                }
            }
            bh.isXML = function(e) {
                var by = (e ? e.ownerDocument || e : 0).documentElement;
                return by ? by.nodeName !== "HTML" : false
            };
            var bu = function(e, bE) {
                var bC, bA = [],
                    bB = "",
                    bz = bE.nodeType ? [bE] : bE;
                while ((bC = bm.match.PSEUDO.exec(e))) {
                    bB += bC[0];
                    e = e.replace(bm.match.PSEUDO, "")
                }
                e = bm.relative[e] ? e + "*" : e;
                for (var bD = 0, by = bz.length; bD < by; bD++) {
                    bh(e, bz[bD], bA)
                }
                return bh.filter(bB, bA)
            };
            b.find = bh;
            b.expr = bh.selectors;
            b.expr[":"] = b.expr.filters;
            b.unique = bh.uniqueSort;
            b.text = bh.getText;
            b.isXMLDoc = bh.isXML;
            b.contains = bh.contains
        })();
        var X = /Until$/,
            aj = /^(?:parents|prevUntil|prevAll)/,
            aY = /,/,
            bb = /^.[^:#\[\.,]*$/,
            N = Array.prototype.slice,
            G = b.expr.match.POS,
            ap = {
                children: true,
                contents: true,
                next: true,
                prev: true
            };
        b.fn.extend({
            find: function(e) {
                var bg = this.pushStack("", "find", e),
                    bj = 0;
                for (var bh = 0, bf = this.length; bh < bf; bh++) {
                    bj = bg.length;
                    b.find(e, this[bh], bg);
                    if (bh > 0) {
                        for (var bk = bj; bk < bg.length; bk++) {
                            for (var bi = 0; bi < bj; bi++) {
                                if (bg[bi] === bg[bk]) {
                                    bg.splice(bk--, 1);
                                    break
                                }
                            }
                        }
                    }
                }
                return bg
            },
            has: function(bf) {
                var e = b(bf);
                return this.filter(function() {
                    for (var bh = 0, bg = e.length; bh < bg; bh++) {
                        if (b.contains(this, e[bh])) {
                            return true
                        }
                    }
                })
            },
            not: function(e) {
                return this.pushStack(aw(this, e, false), "not", e)
            },
            filter: function(e) {
                return this.pushStack(aw(this, e, true), "filter", e)
            },
            is: function(e) {
                return !!e && b.filter(e, this).length > 0
            },
            closest: function(bo, bf) {
                var bl = [],
                    bi, bg, bn = this[0];
                if (b.isArray(bo)) {
                    var bk, bh, bj = {},
                        e = 1;
                    if (bn && bo.length) {
                        for (bi = 0, bg = bo.length; bi < bg; bi++) {
                            bh = bo[bi];
                            if (!bj[bh]) {
                                bj[bh] = b.expr.match.POS.test(bh) ? b(bh, bf || this.context) : bh
                            }
                        }
                        while (bn && bn.ownerDocument && bn !== bf) {
                            for (bh in bj) {
                                bk = bj[bh];
                                if (bk.jquery ? bk.index(bn) > -1 : b(bn).is(bk)) {
                                    bl.push({
                                        selector: bh,
                                        elem: bn,
                                        level: e
                                    })
                                }
                            }
                            bn = bn.parentNode;
                            e++
                        }
                    }
                    return bl
                }
                var bm = G.test(bo) ? b(bo, bf || this.context) : null;
                for (bi = 0, bg = this.length; bi < bg; bi++) {
                    bn = this[bi];
                    while (bn) {
                        if (bm ? bm.index(bn) > -1 : b.find.matchesSelector(bn, bo)) {
                            bl.push(bn);
                            break
                        } else {
                            bn = bn.parentNode;
                            if (!bn || !bn.ownerDocument || bn === bf) {
                                break
                            }
                        }
                    }
                }
                bl = bl.length > 1 ? b.unique(bl) : bl;
                return this.pushStack(bl, "closest", bo)
            },
            index: function(e) {
                if (!e || typeof e === "string") {
                    return b.inArray(this[0], e ? b(e) : this.parent().children())
                }
                return b.inArray(e.jquery ? e[0] : e, this)
            },
            add: function(e, bf) {
                var bh = typeof e === "string" ? b(e, bf) : b.makeArray(e),
                    bg = b.merge(this.get(), bh);
                return this.pushStack(C(bh[0]) || C(bg[0]) ? bg : b.unique(bg))
            },
            andSelf: function() {
                return this.add(this.prevObject)
            }
        });

        function C(e) {
            return !e || !e.parentNode || e.parentNode.nodeType === 11
        }
        b.each({
            parent: function(bf) {
                var e = bf.parentNode;
                return e && e.nodeType !== 11 ? e : null
            },
            parents: function(e) {
                return b.dir(e, "parentNode")
            },
            parentsUntil: function(bf, e, bg) {
                return b.dir(bf, "parentNode", bg)
            },
            next: function(e) {
                return b.nth(e, 2, "nextSibling")
            },
            prev: function(e) {
                return b.nth(e, 2, "previousSibling")
            },
            nextAll: function(e) {
                return b.dir(e, "nextSibling")
            },
            prevAll: function(e) {
                return b.dir(e, "previousSibling")
            },
            nextUntil: function(bf, e, bg) {
                return b.dir(bf, "nextSibling", bg)
            },
            prevUntil: function(bf, e, bg) {
                return b.dir(bf, "previousSibling", bg)
            },
            siblings: function(e) {
                return b.sibling(e.parentNode.firstChild, e)
            },
            children: function(e) {
                return b.sibling(e.firstChild)
            },
            contents: function(e) {
                return b.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : b.makeArray(e.childNodes)
            }
        }, function(e, bf) {
            b.fn[e] = function(bj, bg) {
                var bi = b.map(this, bf, bj),
                    bh = N.call(arguments);
                if (!X.test(e)) {
                    bg = bj
                }
                if (bg && typeof bg === "string") {
                    bi = b.filter(bg, bi)
                }
                bi = this.length > 1 && !ap[e] ? b.unique(bi) : bi;
                if ((this.length > 1 || aY.test(bg)) && aj.test(e)) {
                    bi = bi.reverse()
                }
                return this.pushStack(bi, e, bh.join(","))
            }
        });
        b.extend({
            filter: function(bg, e, bf) {
                if (bf) {
                    bg = ":not(" + bg + ")"
                }
                return e.length === 1 ? b.find.matchesSelector(e[0], bg) ? [e[0]] : [] : b.find.matches(bg, e)
            },
            dir: function(bg, bf, bi) {
                var e = [],
                    bh = bg[bf];
                while (bh && bh.nodeType !== 9 && (bi === I || bh.nodeType !== 1 || !b(bh).is(bi))) {
                    if (bh.nodeType === 1) {
                        e.push(bh)
                    }
                    bh = bh[bf]
                }
                return e
            },
            nth: function(bi, e, bg, bh) {
                e = e || 1;
                var bf = 0;
                for (; bi; bi = bi[bg]) {
                    if (bi.nodeType === 1 && ++bf === e) {
                        break
                    }
                }
                return bi
            },
            sibling: function(bg, bf) {
                var e = [];
                for (; bg; bg = bg.nextSibling) {
                    if (bg.nodeType === 1 && bg !== bf) {
                        e.push(bg)
                    }
                }
                return e
            }
        });

        function aw(bh, bg, e) {
            if (b.isFunction(bg)) {
                return b.grep(bh, function(bj, bi) {
                    var bk = !!bg.call(bj, bi, bj);
                    return bk === e
                })
            } else {
                if (bg.nodeType) {
                    return b.grep(bh, function(bj, bi) {
                        return (bj === bg) === e
                    })
                } else {
                    if (typeof bg === "string") {
                        var bf = b.grep(bh, function(bi) {
                            return bi.nodeType === 1
                        });
                        if (bb.test(bg)) {
                            return b.filter(bg, bf, !e)
                        } else {
                            bg = b.filter(bg, bf)
                        }
                    }
                }
            }
            return b.grep(bh, function(bj, bi) {
                return (b.inArray(bj, bg) >= 0) === e
            })
        }
        var ac = / jQuery\d+="(?:\d+|null)"/g,
            ak = /^\s+/,
            P = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
            d = /<([\w:]+)/,
            w = /<tbody/i,
            U = /<|&#?\w+;/,
            M = /<(?:script|object|embed|option|style)/i,
            n = /checked\s*(?:[^=]|=\s*.checked.)/i,
            ao = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                area: [1, "<map>", "</map>"],
                _default: [0, "", ""]
            };
        ao.optgroup = ao.option;
        ao.tbody = ao.tfoot = ao.colgroup = ao.caption = ao.thead;
        ao.th = ao.td;
        if (!b.support.htmlSerialize) {
            ao._default = [1, "div<div>", "</div>"]
        }
        b.fn.extend({
            text: function(e) {
                if (b.isFunction(e)) {
                    return this.each(function(bg) {
                        var bf = b(this);
                        bf.text(e.call(this, bg, bf.text()))
                    })
                }
                if (typeof e !== "object" && e !== I) {
                    return this.empty().append((this[0] && this[0].ownerDocument || am).createTextNode(e))
                }
                return b.text(this)
            },
            wrapAll: function(e) {
                if (b.isFunction(e)) {
                    return this.each(function(bg) {
                        b(this).wrapAll(e.call(this, bg))
                    })
                }
                if (this[0]) {
                    var bf = b(e, this[0].ownerDocument).eq(0).clone(true);
                    if (this[0].parentNode) {
                        bf.insertBefore(this[0])
                    }
                    bf.map(function() {
                        var bg = this;
                        while (bg.firstChild && bg.firstChild.nodeType === 1) {
                            bg = bg.firstChild
                        }
                        return bg
                    }).append(this)
                }
                return this
            },
            wrapInner: function(e) {
                if (b.isFunction(e)) {
                    return this.each(function(bf) {
                        b(this).wrapInner(e.call(this, bf))
                    })
                }
                return this.each(function() {
                    var bf = b(this),
                        bg = bf.contents();
                    if (bg.length) {
                        bg.wrapAll(e)
                    } else {
                        bf.append(e)
                    }
                })
            },
            wrap: function(e) {
                return this.each(function() {
                    b(this).wrapAll(e)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    if (!b.nodeName(this, "body")) {
                        b(this).replaceWith(this.childNodes)
                    }
                }).end()
            },
            append: function() {
                return this.domManip(arguments, true, function(e) {
                    if (this.nodeType === 1) {
                        this.appendChild(e)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, true, function(e) {
                    if (this.nodeType === 1) {
                        this.insertBefore(e, this.firstChild)
                    }
                })
            },
            before: function() {
                if (this[0] && this[0].parentNode) {
                    return this.domManip(arguments, false, function(bf) {
                        this.parentNode.insertBefore(bf, this)
                    })
                } else {
                    if (arguments.length) {
                        var e = b(arguments[0]);
                        e.push.apply(e, this.toArray());
                        return this.pushStack(e, "before", arguments)
                    }
                }
            },
            after: function() {
                if (this[0] && this[0].parentNode) {
                    return this.domManip(arguments, false, function(bf) {
                        this.parentNode.insertBefore(bf, this.nextSibling)
                    })
                } else {
                    if (arguments.length) {
                        var e = this.pushStack(this, "after", arguments);
                        e.push.apply(e, b(arguments[0]).toArray());
                        return e
                    }
                }
            },
            remove: function(e, bh) {
                for (var bf = 0, bg;
                    (bg = this[bf]) != null; bf++) {
                    if (!e || b.filter(e, [bg]).length) {
                        if (!bh && bg.nodeType === 1) {
                            b.cleanData(bg.getElementsByTagName("*"));
                            b.cleanData([bg])
                        }
                        if (bg.parentNode) {
                            bg.parentNode.removeChild(bg)
                        }
                    }
                }
                return this
            },
            empty: function() {
                for (var e = 0, bf;
                    (bf = this[e]) != null; e++) {
                    if (bf.nodeType === 1) {
                        b.cleanData(bf.getElementsByTagName("*"))
                    }
                    while (bf.firstChild) {
                        bf.removeChild(bf.firstChild)
                    }
                }
                return this
            },
            clone: function(bf, e) {
                bf = bf == null ? false : bf;
                e = e == null ? bf : e;
                return this.map(function() {
                    return b.clone(this, bf, e)
                })
            },
            html: function(bh) {
                if (bh === I) {
                    return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(ac, "") : null
                } else {
                    if (typeof bh === "string" && !M.test(bh) && (b.support.leadingWhitespace || !ak.test(bh)) && !ao[(d.exec(bh) || ["", ""])[1].toLowerCase()]) {
                        bh = bh.replace(P, "<$1></$2>");
                        try {
                            for (var bg = 0, bf = this.length; bg < bf; bg++) {
                                if (this[bg].nodeType === 1) {
                                    b.cleanData(this[bg].getElementsByTagName("*"));
                                    this[bg].innerHTML = bh
                                }
                            }
                        } catch (bi) {
                            this.empty().append(bh)
                        }
                    } else {
                        if (b.isFunction(bh)) {
                            this.each(function(bj) {
                                var e = b(this);
                                e.html(bh.call(this, bj, e.html()))
                            })
                        } else {
                            this.empty().append(bh)
                        }
                    }
                }
                return this
            },
            replaceWith: function(e) {
                if (this[0] && this[0].parentNode) {
                    if (b.isFunction(e)) {
                        return this.each(function(bh) {
                            var bg = b(this),
                                bf = bg.html();
                            bg.replaceWith(e.call(this, bh, bf))
                        })
                    }
                    if (typeof e !== "string") {
                        e = b(e).detach()
                    }
                    return this.each(function() {
                        var bg = this.nextSibling,
                            bf = this.parentNode;
                        b(this).remove();
                        if (bg) {
                            b(bg).before(e)
                        } else {
                            b(bf).append(e)
                        }
                    })
                } else {
                    return this.length ? this.pushStack(b(b.isFunction(e) ? e() : e), "replaceWith", e) : this
                }
            },
            detach: function(e) {
                return this.remove(e, true)
            },
            domManip: function(bl, bp, bo) {
                var bh, bi, bk, bn, bm = bl[0],
                    bf = [];
                if (!b.support.checkClone && arguments.length === 3 && typeof bm === "string" && n.test(bm)) {
                    return this.each(function() {
                        b(this).domManip(bl, bp, bo, true)
                    })
                }
                if (b.isFunction(bm)) {
                    return this.each(function(br) {
                        var bq = b(this);
                        bl[0] = bm.call(this, br, bp ? bq.html() : I);
                        bq.domManip(bl, bp, bo)
                    })
                }
                if (this[0]) {
                    bn = bm && bm.parentNode;
                    if (b.support.parentNode && bn && bn.nodeType === 11 && bn.childNodes.length === this.length) {
                        bh = {
                            fragment: bn
                        }
                    } else {
                        bh = b.buildFragment(bl, this, bf)
                    }
                    bk = bh.fragment;
                    if (bk.childNodes.length === 1) {
                        bi = bk = bk.firstChild
                    } else {
                        bi = bk.firstChild
                    }
                    if (bi) {
                        bp = bp && b.nodeName(bi, "tr");
                        for (var bg = 0, e = this.length, bj = e - 1; bg < e; bg++) {
                            bo.call(bp ? aZ(this[bg], bi) : this[bg], bh.cacheable || (e > 1 && bg < bj) ? b.clone(bk, true, true) : bk)
                        }
                    }
                    if (bf.length) {
                        b.each(bf, ba)
                    }
                }
                return this
            }
        });

        function aZ(e, bf) {
            return b.nodeName(e, "table") ? (e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody"))) : e
        }

        function t(e, bl) {
            if (bl.nodeType !== 1 || !b.hasData(e)) {
                return
            }
            var bk = b.expando,
                bh = b.data(e),
                bi = b.data(bl, bh);
            if ((bh = bh[bk])) {
                var bm = bh.events;
                bi = bi[bk] = b.extend({}, bh);
                if (bm) {
                    delete bi.handle;
                    bi.events = {};
                    for (var bj in bm) {
                        for (var bg = 0, bf = bm[bj].length; bg < bf; bg++) {
                            b.event.add(bl, bj + (bm[bj][bg].namespace ? "." : "") + bm[bj][bg].namespace, bm[bj][bg], bm[bj][bg].data)
                        }
                    }
                }
            }
        }

        function ad(bf, e) {
            if (e.nodeType !== 1) {
                return
            }
            var bg = e.nodeName.toLowerCase();
            e.clearAttributes();
            e.mergeAttributes(bf);
            if (bg === "object") {
                e.outerHTML = bf.outerHTML
            } else {
                if (bg === "input" && (bf.type === "checkbox" || bf.type === "radio")) {
                    if (bf.checked) {
                        e.defaultChecked = e.checked = bf.checked
                    }
                    if (e.value !== bf.value) {
                        e.value = bf.value
                    }
                } else {
                    if (bg === "option") {
                        e.selected = bf.defaultSelected
                    } else {
                        if (bg === "input" || bg === "textarea") {
                            e.defaultValue = bf.defaultValue
                        }
                    }
                }
            }
            e.removeAttribute(b.expando)
        }
        b.buildFragment = function(bj, bh, bf) {
            var bi, e, bg, bk = (bh && bh[0] ? bh[0].ownerDocument || bh[0] : am);
            if (bj.length === 1 && typeof bj[0] === "string" && bj[0].length < 512 && bk === am && bj[0].charAt(0) === "<" && !M.test(bj[0]) && (b.support.checkClone || !n.test(bj[0]))) {
                e = true;
                bg = b.fragments[bj[0]];
                if (bg) {
                    if (bg !== 1) {
                        bi = bg
                    }
                }
            }
            if (!bi) {
                bi = bk.createDocumentFragment();
                b.clean(bj, bk, bi, bf)
            }
            if (e) {
                b.fragments[bj[0]] = bg ? bi : 1
            }
            return {
                fragment: bi,
                cacheable: e
            }
        };
        b.fragments = {};
        b.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, bf) {
            b.fn[e] = function(bg) {
                var bj = [],
                    bm = b(bg),
                    bl = this.length === 1 && this[0].parentNode;
                if (bl && bl.nodeType === 11 && bl.childNodes.length === 1 && bm.length === 1) {
                    bm[bf](this[0]);
                    return this
                } else {
                    for (var bk = 0, bh = bm.length; bk < bh; bk++) {
                        var bi = (bk > 0 ? this.clone(true) : this).get();
                        b(bm[bk])[bf](bi);
                        bj = bj.concat(bi)
                    }
                    return this.pushStack(bj, e, bm.selector)
                }
            }
        });

        function a3(e) {
            if ("getElementsByTagName" in e) {
                return e.getElementsByTagName("*")
            } else {
                if ("querySelectorAll" in e) {
                    return e.querySelectorAll("*")
                } else {
                    return []
                }
            }
        }
        b.extend({
            clone: function(bi, bk, bg) {
                var bj = bi.cloneNode(true),
                    e, bf, bh;
                if ((!b.support.noCloneEvent || !b.support.noCloneChecked) && (bi.nodeType === 1 || bi.nodeType === 11) && !b.isXMLDoc(bi)) {
                    ad(bi, bj);
                    e = a3(bi);
                    bf = a3(bj);
                    for (bh = 0; e[bh]; ++bh) {
                        ad(e[bh], bf[bh])
                    }
                }
                if (bk) {
                    t(bi, bj);
                    if (bg) {
                        e = a3(bi);
                        bf = a3(bj);
                        for (bh = 0; e[bh]; ++bh) {
                            t(e[bh], bf[bh])
                        }
                    }
                }
                return bj
            },
            clean: function(bg, bi, bp, bk) {
                bi = bi || am;
                if (typeof bi.createElement === "undefined") {
                    bi = bi.ownerDocument || bi[0] && bi[0].ownerDocument || am
                }
                var bq = [];
                for (var bo = 0, bj;
                    (bj = bg[bo]) != null; bo++) {
                    if (typeof bj === "number") {
                        bj += ""
                    }
                    if (!bj) {
                        continue
                    }
                    if (typeof bj === "string" && !U.test(bj)) {
                        bj = bi.createTextNode(bj)
                    } else {
                        if (typeof bj === "string") {
                            bj = bj.replace(P, "<$1></$2>");
                            var br = (d.exec(bj) || ["", ""])[1].toLowerCase(),
                                bh = ao[br] || ao._default,
                                bn = bh[0],
                                bf = bi.createElement("div");
                            bf.innerHTML = bh[1] + bj + bh[2];
                            while (bn--) {
                                bf = bf.lastChild
                            }
                            if (!b.support.tbody) {
                                var e = w.test(bj),
                                    bm = br === "table" && !e ? bf.firstChild && bf.firstChild.childNodes : bh[1] === "<table>" && !e ? bf.childNodes : [];
                                for (var bl = bm.length - 1; bl >= 0; --bl) {
                                    if (b.nodeName(bm[bl], "tbody") && !bm[bl].childNodes.length) {
                                        bm[bl].parentNode.removeChild(bm[bl])
                                    }
                                }
                            }
                            if (!b.support.leadingWhitespace && ak.test(bj)) {
                                bf.insertBefore(bi.createTextNode(ak.exec(bj)[0]), bf.firstChild)
                            }
                            bj = bf.childNodes
                        }
                    }
                    if (bj.nodeType) {
                        bq.push(bj)
                    } else {
                        bq = b.merge(bq, bj)
                    }
                }
                if (bp) {
                    for (bo = 0; bq[bo]; bo++) {
                        if (bk && b.nodeName(bq[bo], "script") && (!bq[bo].type || bq[bo].type.toLowerCase() === "text/javascript")) {
                            bk.push(bq[bo].parentNode ? bq[bo].parentNode.removeChild(bq[bo]) : bq[bo])
                        } else {
                            if (bq[bo].nodeType === 1) {
                                bq.splice.apply(bq, [bo + 1, 0].concat(b.makeArray(bq[bo].getElementsByTagName("script"))))
                            }
                            bp.appendChild(bq[bo])
                        }
                    }
                }
                return bq
            },
            cleanData: function(bf) {
                var bi, bg, e = b.cache,
                    bn = b.expando,
                    bl = b.event.special,
                    bk = b.support.deleteExpando;
                for (var bj = 0, bh;
                    (bh = bf[bj]) != null; bj++) {
                    if (bh.nodeName && b.noData[bh.nodeName.toLowerCase()]) {
                        continue
                    }
                    bg = bh[b.expando];
                    if (bg) {
                        bi = e[bg] && e[bg][bn];
                        if (bi && bi.events) {
                            for (var bm in bi.events) {
                                if (bl[bm]) {
                                    b.event.remove(bh, bm)
                                } else {
                                    b.removeEvent(bh, bm, bi.handle)
                                }
                            }
                            if (bi.handle) {
                                bi.handle.elem = null
                            }
                        }
                        if (bk) {
                            delete bh[b.expando]
                        } else {
                            if (bh.removeAttribute) {
                                bh.removeAttribute(b.expando)
                            }
                        }
                        delete e[bg]
                    }
                }
            }
        });

        function ba(e, bf) {
            if (bf.src) {
                b.ajax({
                    url: bf.src,
                    async: false,
                    dataType: "script"
                })
            } else {
                b.globalEval(bf.text || bf.textContent || bf.innerHTML || "")
            }
            if (bf.parentNode) {
                bf.parentNode.removeChild(bf)
            }
        }
        var af = /alpha\([^)]*\)/i,
            al = /opacity=([^)]*)/,
            aO = /-([a-z])/ig,
            z = /([A-Z]|^ms)/g,
            a1 = /^-?\d+(?:px)?$/i,
            a9 = /^-?\d/,
            aX = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            ah = ["Left", "Right"],
            aT = ["Top", "Bottom"],
            V, az, aN, m = function(e, bf) {
                return bf.toUpperCase()
            };
        b.fn.css = function(e, bf) {
            if (arguments.length === 2 && bf === I) {
                return this
            }
            return b.access(this, e, bf, true, function(bh, bg, bi) {
                return bi !== I ? b.style(bh, bg, bi) : b.css(bh, bg)
            })
        };
        b.extend({
            cssHooks: {
                opacity: {
                    get: function(bg, bf) {
                        if (bf) {
                            var e = V(bg, "opacity", "opacity");
                            return e === "" ? "1" : e
                        } else {
                            return bg.style.opacity
                        }
                    }
                }
            },
            cssNumber: {
                zIndex: true,
                fontWeight: true,
                opacity: true,
                zoom: true,
                lineHeight: true
            },
            cssProps: {
                "float": b.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(bh, bg, bm, bi) {
                if (!bh || bh.nodeType === 3 || bh.nodeType === 8 || !bh.style) {
                    return
                }
                var bl, bj = b.camelCase(bg),
                    bf = bh.style,
                    bn = b.cssHooks[bj];
                bg = b.cssProps[bj] || bj;
                if (bm !== I) {
                    if (typeof bm === "number" && isNaN(bm) || bm == null) {
                        return
                    }
                    if (typeof bm === "number" && !b.cssNumber[bj]) {
                        bm += "px"
                    }
                    if (!bn || !("set" in bn) || (bm = bn.set(bh, bm)) !== I) {
                        try {
                            bf[bg] = bm
                        } catch (bk) {}
                    }
                } else {
                    if (bn && "get" in bn && (bl = bn.get(bh, false, bi)) !== I) {
                        return bl
                    }
                    return bf[bg]
                }
            },
            css: function(bj, bi, bf) {
                var bh, bg = b.camelCase(bi),
                    e = b.cssHooks[bg];
                bi = b.cssProps[bg] || bg;
                if (e && "get" in e && (bh = e.get(bj, true, bf)) !== I) {
                    return bh
                } else {
                    if (V) {
                        return V(bj, bi, bg)
                    }
                }
            },
            swap: function(bh, bg, bi) {
                var e = {};
                for (var bf in bg) {
                    e[bf] = bh.style[bf];
                    bh.style[bf] = bg[bf]
                }
                bi.call(bh);
                for (bf in bg) {
                    bh.style[bf] = e[bf]
                }
            },
            camelCase: function(e) {
                return e.replace(aO, m)
            }
        });
        b.curCSS = b.css;
        b.each(["height", "width"], function(bf, e) {
            b.cssHooks[e] = {
                get: function(bi, bh, bg) {
                    var bj;
                    if (bh) {
                        if (bi.offsetWidth !== 0) {
                            bj = p(bi, e, bg)
                        } else {
                            b.swap(bi, aX, function() {
                                bj = p(bi, e, bg)
                            })
                        }
                        if (bj <= 0) {
                            bj = V(bi, e, e);
                            if (bj === "0px" && aN) {
                                bj = aN(bi, e, e)
                            }
                            if (bj != null) {
                                return bj === "" || bj === "auto" ? "0px" : bj
                            }
                        }
                        if (bj < 0 || bj == null) {
                            bj = bi.style[e];
                            return bj === "" || bj === "auto" ? "0px" : bj
                        }
                        return typeof bj === "string" ? bj : bj + "px"
                    }
                },
                set: function(bg, bh) {
                    if (a1.test(bh)) {
                        bh = parseFloat(bh);
                        if (bh >= 0) {
                            return bh + "px"
                        }
                    } else {
                        return bh
                    }
                }
            }
        });
        if (!b.support.opacity) {
            b.cssHooks.opacity = {
                get: function(bf, e) {
                    return al.test((e && bf.currentStyle ? bf.currentStyle.filter : bf.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : e ? "1" : ""
                },
                set: function(bh, bi) {
                    var bg = bh.style;
                    bg.zoom = 1;
                    var e = b.isNaN(bi) ? "" : "alpha(opacity=" + bi * 100 + ")",
                        bf = bg.filter || "";
                    bg.filter = af.test(bf) ? bf.replace(af, e) : bg.filter + " " + e
                }
            }
        }
        b(function() {
            if (!b.support.reliableMarginRight) {
                b.cssHooks.marginRight = {
                    get: function(bg, bf) {
                        var e;
                        b.swap(bg, {
                            display: "inline-block"
                        }, function() {
                            if (bf) {
                                e = V(bg, "margin-right", "marginRight")
                            } else {
                                e = bg.style.marginRight
                            }
                        });
                        return e
                    }
                }
            }
        });
        if (am.defaultView && am.defaultView.getComputedStyle) {
            az = function(bj, e, bh) {
                var bg, bi, bf;
                bh = bh.replace(z, "-$1").toLowerCase();
                if (!(bi = bj.ownerDocument.defaultView)) {
                    return I
                }
                if ((bf = bi.getComputedStyle(bj, null))) {
                    bg = bf.getPropertyValue(bh);
                    if (bg === "" && !b.contains(bj.ownerDocument.documentElement, bj)) {
                        bg = b.style(bj, bh)
                    }
                }
                return bg
            }
        }
        if (am.documentElement.currentStyle) {
            aN = function(bi, bg) {
                var bj, bf = bi.currentStyle && bi.currentStyle[bg],
                    e = bi.runtimeStyle && bi.runtimeStyle[bg],
                    bh = bi.style;
                if (!a1.test(bf) && a9.test(bf)) {
                    bj = bh.left;
                    if (e) {
                        bi.runtimeStyle.left = bi.currentStyle.left
                    }
                    bh.left = bg === "fontSize" ? "1em" : (bf || 0);
                    bf = bh.pixelLeft + "px";
                    bh.left = bj;
                    if (e) {
                        bi.runtimeStyle.left = e
                    }
                }
                return bf === "" ? "auto" : bf
            }
        }
        V = az || aN;

        function p(bg, bf, e) {
            var bi = bf === "width" ? ah : aT,
                bh = bf === "width" ? bg.offsetWidth : bg.offsetHeight;
            if (e === "border") {
                return bh
            }
            b.each(bi, function() {
                if (!e) {
                    bh -= parseFloat(b.css(bg, "padding" + this)) || 0
                }
                if (e === "margin") {
                    bh += parseFloat(b.css(bg, "margin" + this)) || 0
                } else {
                    bh -= parseFloat(b.css(bg, "border" + this + "Width")) || 0
                }
            });
            return bh
        }
        if (b.expr && b.expr.filters) {
            b.expr.filters.hidden = function(bg) {
                var bf = bg.offsetWidth,
                    e = bg.offsetHeight;
                return (bf === 0 && e === 0) || (!b.support.reliableHiddenOffsets && (bg.style.display || b.css(bg, "display")) === "none")
            };
            b.expr.filters.visible = function(e) {
                return !b.expr.filters.hidden(e)
            }
        }
        var j = /%20/g,
            ai = /\[\]$/,
            be = /\r?\n/g,
            bc = /#.*$/,
            at = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
            aQ = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
            aD = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/,
            aF = /^(?:GET|HEAD)$/,
            c = /^\/\//,
            J = /\?/,
            aW = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            q = /^(?:select|textarea)/i,
            h = /\s+/,
            bd = /([?&])_=[^&]*/,
            S = /(^|\-)([a-z])/g,
            aL = function(bf, e, bg) {
                return e + bg.toUpperCase()
            },
            H = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
            A = b.fn.load,
            W = {},
            r = {},
            av, s;
        try {
            av = am.location.href
        } catch (an) {
            av = am.createElement("a");
            av.href = "";
            av = av.href
        }
        s = H.exec(av.toLowerCase()) || [];

        function f(e) {
            return function(bi, bk) {
                if (typeof bi !== "string") {
                    bk = bi;
                    bi = "*"
                }
                if (b.isFunction(bk)) {
                    var bh = bi.toLowerCase().split(h),
                        bg = 0,
                        bj = bh.length,
                        bf, bl, bm;
                    for (; bg < bj; bg++) {
                        bf = bh[bg];
                        bm = /^\+/.test(bf);
                        if (bm) {
                            bf = bf.substr(1) || "*"
                        }
                        bl = e[bf] = e[bf] || [];
                        bl[bm ? "unshift" : "push"](bk)
                    }
                }
            }
        }

        function aK(bf, bo, bj, bn, bl, bh) {
            bl = bl || bo.dataTypes[0];
            bh = bh || {};
            bh[bl] = true;
            var bk = bf[bl],
                bg = 0,
                e = bk ? bk.length : 0,
                bi = (bf === W),
                bm;
            for (; bg < e && (bi || !bm); bg++) {
                bm = bk[bg](bo, bj, bn);
                if (typeof bm === "string") {
                    if (!bi || bh[bm]) {
                        bm = I
                    } else {
                        bo.dataTypes.unshift(bm);
                        bm = aK(bf, bo, bj, bn, bm, bh)
                    }
                }
            }
            if ((bi || !bm) && !bh["*"]) {
                bm = aK(bf, bo, bj, bn, "*", bh)
            }
            return bm
        }
        b.fn.extend({
            load: function(bg, bj, bk) {
                if (typeof bg !== "string" && A) {
                    return A.apply(this, arguments)
                } else {
                    if (!this.length) {
                        return this
                    }
                }
                var bi = bg.indexOf(" ");
                if (bi >= 0) {
                    var e = bg.slice(bi, bg.length);
                    bg = bg.slice(0, bi)
                }
                var bh = "GET";
                if (bj) {
                    if (b.isFunction(bj)) {
                        bk = bj;
                        bj = I
                    } else {
                        if (typeof bj === "object") {
                            bj = b.param(bj, b.ajaxSettings.traditional);
                            bh = "POST"
                        }
                    }
                }
                var bf = this;
                b.ajax({
                    url: bg,
                    type: bh,
                    dataType: "html",
                    data: bj,
                    complete: function(bm, bl, bn) {
                        bn = bm.responseText;
                        if (bm.isResolved()) {
                            bm.done(function(bo) {
                                bn = bo
                            });
                            bf.html(e ? b("<div>").append(bn.replace(aW, "")).find(e) : bn)
                        }
                        if (bk) {
                            bf.each(bk, [bn, bl, bm])
                        }
                    }
                });
                return this
            },
            serialize: function() {
                return b.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    return this.elements ? b.makeArray(this.elements) : this
                }).filter(function() {
                    return this.name && !this.disabled && (this.checked || q.test(this.nodeName) || aQ.test(this.type))
                }).map(function(e, bf) {
                    var bg = b(this).val();
                    return bg == null ? null : b.isArray(bg) ? b.map(bg, function(bi, bh) {
                        return {
                            name: bf.name,
                            value: bi.replace(be, "\r\n")
                        }
                    }) : {
                        name: bf.name,
                        value: bg.replace(be, "\r\n")
                    }
                }).get()
            }
        });
        b.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(e, bf) {
            b.fn[bf] = function(bg) {
                return this.bind(bf, bg)
            }
        });
        b.each(["get", "post"], function(e, bf) {
            b[bf] = function(bg, bi, bj, bh) {
                if (b.isFunction(bi)) {
                    bh = bh || bj;
                    bj = bi;
                    bi = I
                }
                return b.ajax({
                    type: bf,
                    url: bg,
                    data: bi,
                    success: bj,
                    dataType: bh
                })
            }
        });
        b.extend({
            getScript: function(e, bf) {
                return b.get(e, I, bf, "script")
            },
            getJSON: function(e, bf, bg) {
                return b.get(e, bf, bg, "json")
            },
            ajaxSetup: function(bg, e) {
                if (!e) {
                    e = bg;
                    bg = b.extend(true, b.ajaxSettings, e)
                } else {
                    b.extend(true, bg, b.ajaxSettings, e)
                }
                for (var bf in {
                        context: 1,
                        url: 1
                    }) {
                    if (bf in e) {
                        bg[bf] = e[bf]
                    } else {
                        if (bf in b.ajaxSettings) {
                            bg[bf] = b.ajaxSettings[bf]
                        }
                    }
                }
                return bg
            },
            ajaxSettings: {
                url: av,
                isLocal: aD.test(s[1]),
                global: true,
                type: "GET",
                contentType: "application/x-www-form-urlencoded",
                processData: true,
                async: true,
                accepts: {
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain",
                    json: "application/json, text/javascript",
                    "*": "*/*"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText"
                },
                converters: {
                    "* text": a0.String,
                    "text html": true,
                    "text json": b.parseJSON,
                    "text xml": b.parseXML
                }
            },
            ajaxPrefilter: f(W),
            ajaxTransport: f(r),
            ajax: function(bj, bh) {
                if (typeof bj === "object") {
                    bh = bj;
                    bj = I
                }
                bh = bh || {};
                var bn = b.ajaxSetup({}, bh),
                    bB = bn.context || bn,
                    bq = bB !== bn && (bB.nodeType || bB instanceof b) ? b(bB) : b.event,
                    bA = b.Deferred(),
                    bx = b._Deferred(),
                    bl = bn.statusCode || {},
                    bm, br = {},
                    bz, bi, bv, bo, bs, bk = 0,
                    bg, bu, bt = {
                        readyState: 0,
                        setRequestHeader: function(e, bC) {
                            if (!bk) {
                                br[e.toLowerCase().replace(S, aL)] = bC
                            }
                            return this
                        },
                        getAllResponseHeaders: function() {
                            return bk === 2 ? bz : null
                        },
                        getResponseHeader: function(bC) {
                            var e;
                            if (bk === 2) {
                                if (!bi) {
                                    bi = {};
                                    while ((e = at.exec(bz))) {
                                        bi[e[1].toLowerCase()] = e[2]
                                    }
                                }
                                e = bi[bC.toLowerCase()]
                            }
                            return e === I ? null : e
                        },
                        overrideMimeType: function(e) {
                            if (!bk) {
                                bn.mimeType = e
                            }
                            return this
                        },
                        abort: function(e) {
                            e = e || "abort";
                            if (bv) {
                                bv.abort(e)
                            }
                            bp(0, e);
                            return this
                        }
                    };

                function bp(bH, bF, bI, bE) {
                    if (bk === 2) {
                        return
                    }
                    bk = 2;
                    if (bo) {
                        clearTimeout(bo)
                    }
                    bv = I;
                    bz = bE || "";
                    bt.readyState = bH ? 4 : 0;
                    var bC, bM, bL, bG = bI ? a6(bn, bt, bI) : I,
                        bD, bK;
                    if (bH >= 200 && bH < 300 || bH === 304) {
                        if (bn.ifModified) {
                            if ((bD = bt.getResponseHeader("Last-Modified"))) {
                                b.lastModified[bm] = bD
                            }
                            if ((bK = bt.getResponseHeader("Etag"))) {
                                b.etag[bm] = bK
                            }
                        }
                        if (bH === 304) {
                            bF = "notmodified";
                            bC = true
                        } else {
                            try {
                                bM = E(bn, bG);
                                bF = "success";
                                bC = true
                            } catch (bJ) {
                                bF = "parsererror";
                                bL = bJ
                            }
                        }
                    } else {
                        bL = bF;
                        if (!bF || bH) {
                            bF = "error";
                            if (bH < 0) {
                                bH = 0
                            }
                        }
                    }
                    bt.status = bH;
                    bt.statusText = bF;
                    if (bC) {
                        bA.resolveWith(bB, [bM, bF, bt])
                    } else {
                        bA.rejectWith(bB, [bt, bF, bL])
                    }
                    bt.statusCode(bl);
                    bl = I;
                    if (bg) {
                        bq.trigger("ajax" + (bC ? "Success" : "Error"), [bt, bn, bC ? bM : bL])
                    }
                    bx.resolveWith(bB, [bt, bF]);
                    if (bg) {
                        bq.trigger("ajaxComplete", [bt, bn]);
                        if (!(--b.active)) {
                            b.event.trigger("ajaxStop")
                        }
                    }
                }
                bA.promise(bt);
                bt.success = bt.done;
                bt.error = bt.fail;
                bt.complete = bx.done;
                bt.statusCode = function(bC) {
                    if (bC) {
                        var e;
                        if (bk < 2) {
                            for (e in bC) {
                                bl[e] = [bl[e], bC[e]]
                            }
                        } else {
                            e = bC[bt.status];
                            bt.then(e, e)
                        }
                    }
                    return this
                };
                bn.url = ((bj || bn.url) + "").replace(bc, "").replace(c, s[1] + "//");
                bn.dataTypes = b.trim(bn.dataType || "*").toLowerCase().split(h);
                if (bn.crossDomain == null) {
                    bs = H.exec(bn.url.toLowerCase());
                    bn.crossDomain = !!(bs && (bs[1] != s[1] || bs[2] != s[2] || (bs[3] || (bs[1] === "http:" ? 80 : 443)) != (s[3] || (s[1] === "http:" ? 80 : 443))))
                }
                if (bn.data && bn.processData && typeof bn.data !== "string") {
                    bn.data = b.param(bn.data, bn.traditional)
                }
                aK(W, bn, bh, bt);
                if (bk === 2) {
                    return false
                }
                bg = bn.global;
                bn.type = bn.type.toUpperCase();
                bn.hasContent = !aF.test(bn.type);
                if (bg && b.active++ === 0) {
                    b.event.trigger("ajaxStart")
                }
                if (!bn.hasContent) {
                    if (bn.data) {
                        bn.url += (J.test(bn.url) ? "&" : "?") + bn.data
                    }
                    bm = bn.url;
                    if (bn.cache === false) {
                        var bf = b.now(),
                            by = bn.url.replace(bd, "$1_=" + bf);
                        bn.url = by + ((by === bn.url) ? (J.test(bn.url) ? "&" : "?") + "_=" + bf : "")
                    }
                }
                if (bn.data && bn.hasContent && bn.contentType !== false || bh.contentType) {
                    br["Content-Type"] = bn.contentType
                }
                if (bn.ifModified) {
                    bm = bm || bn.url;
                    if (b.lastModified[bm]) {
                        br["If-Modified-Since"] = b.lastModified[bm]
                    }
                    if (b.etag[bm]) {
                        br["If-None-Match"] = b.etag[bm]
                    }
                }
                br.Accept = bn.dataTypes[0] && bn.accepts[bn.dataTypes[0]] ? bn.accepts[bn.dataTypes[0]] + (bn.dataTypes[0] !== "*" ? ", */*; q=0.01" : "") : bn.accepts["*"];
                for (bu in bn.headers) {
                    bt.setRequestHeader(bu, bn.headers[bu])
                }
                if (bn.beforeSend && (bn.beforeSend.call(bB, bt, bn) === false || bk === 2)) {
                    bt.abort();
                    return false
                }
                for (bu in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) {
                    bt[bu](bn[bu])
                }
                bv = aK(r, bn, bh, bt);
                if (!bv) {
                    bp(-1, "No Transport")
                } else {
                    bt.readyState = 1;
                    if (bg) {
                        bq.trigger("ajaxSend", [bt, bn])
                    }
                    if (bn.async && bn.timeout > 0) {
                        bo = setTimeout(function() {
                            bt.abort("timeout")
                        }, bn.timeout)
                    }
                    try {
                        bk = 1;
                        bv.send(br, bp)
                    } catch (bw) {
                        if (status < 2) {
                            bp(-1, bw)
                        } else {
                            b.error(bw)
                        }
                    }
                }
                return bt
            },
            param: function(e, bg) {
                var bf = [],
                    bi = function(bj, bk) {
                        bk = b.isFunction(bk) ? bk() : bk;
                        bf[bf.length] = encodeURIComponent(bj) + "=" + encodeURIComponent(bk)
                    };
                if (bg === I) {
                    bg = b.ajaxSettings.traditional
                }
                if (b.isArray(e) || (e.jquery && !b.isPlainObject(e))) {
                    b.each(e, function() {
                        bi(this.name, this.value)
                    })
                } else {
                    for (var bh in e) {
                        v(bh, e[bh], bg, bi)
                    }
                }
                return bf.join("&").replace(j, "+")
            }
        });

        function v(bg, bi, bf, bh) {
            if (b.isArray(bi) && bi.length) {
                b.each(bi, function(bk, bj) {
                    if (bf || ai.test(bg)) {
                        bh(bg, bj)
                    } else {
                        v(bg + "[" + (typeof bj === "object" || b.isArray(bj) ? bk : "") + "]", bj, bf, bh)
                    }
                })
            } else {
                if (!bf && bi != null && typeof bi === "object") {
                    if (b.isArray(bi) || b.isEmptyObject(bi)) {
                        bh(bg, "")
                    } else {
                        for (var e in bi) {
                            v(bg + "[" + e + "]", bi[e], bf, bh)
                        }
                    }
                } else {
                    bh(bg, bi)
                }
            }
        }
        b.extend({
            active: 0,
            lastModified: {},
            etag: {}
        });

        function a6(bn, bm, bj) {
            var bf = bn.contents,
                bl = bn.dataTypes,
                bg = bn.responseFields,
                bi, bk, bh, e;
            for (bk in bg) {
                if (bk in bj) {
                    bm[bg[bk]] = bj[bk]
                }
            }
            while (bl[0] === "*") {
                bl.shift();
                if (bi === I) {
                    bi = bn.mimeType || bm.getResponseHeader("content-type")
                }
            }
            if (bi) {
                for (bk in bf) {
                    if (bf[bk] && bf[bk].test(bi)) {
                        bl.unshift(bk);
                        break
                    }
                }
            }
            if (bl[0] in bj) {
                bh = bl[0]
            } else {
                for (bk in bj) {
                    if (!bl[0] || bn.converters[bk + " " + bl[0]]) {
                        bh = bk;
                        break
                    }
                    if (!e) {
                        e = bk
                    }
                }
                bh = bh || e
            }
            if (bh) {
                if (bh !== bl[0]) {
                    bl.unshift(bh)
                }
                return bj[bh]
            }
        }

        function E(br, bj) {
            if (br.dataFilter) {
                bj = br.dataFilter(bj, br.dataType)
            }
            var bn = br.dataTypes,
                bq = {},
                bk, bo, bg = bn.length,
                bl, bm = bn[0],
                bh, bi, bp, bf, e;
            for (bk = 1; bk < bg; bk++) {
                if (bk === 1) {
                    for (bo in br.converters) {
                        if (typeof bo === "string") {
                            bq[bo.toLowerCase()] = br.converters[bo]
                        }
                    }
                }
                bh = bm;
                bm = bn[bk];
                if (bm === "*") {
                    bm = bh
                } else {
                    if (bh !== "*" && bh !== bm) {
                        bi = bh + " " + bm;
                        bp = bq[bi] || bq["* " + bm];
                        if (!bp) {
                            e = I;
                            for (bf in bq) {
                                bl = bf.split(" ");
                                if (bl[0] === bh || bl[0] === "*") {
                                    e = bq[bl[1] + " " + bm];
                                    if (e) {
                                        bf = bq[bf];
                                        if (bf === true) {
                                            bp = e
                                        } else {
                                            if (e === true) {
                                                bp = bf
                                            }
                                        }
                                        break
                                    }
                                }
                            }
                        }
                        if (!(bp || e)) {
                            b.error("No conversion from " + bi.replace(" ", " to "))
                        }
                        if (bp !== true) {
                            bj = bp ? bp(bj) : e(bf(bj))
                        }
                    }
                }
            }
            return bj
        }
        var ar = b.now(),
            u = /(\=)\?(&|$)|\?\?/i;
        b.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                return b.expando + "_" + (ar++)
            }
        });
        b.ajaxPrefilter("json jsonp", function(bo, bk, bn) {
            var bm = (typeof bo.data === "string");
            if (bo.dataTypes[0] === "jsonp" || bk.jsonpCallback || bk.jsonp != null || bo.jsonp !== false && (u.test(bo.url) || bm && u.test(bo.data))) {
                var bl, bg = bo.jsonpCallback = b.isFunction(bo.jsonpCallback) ? bo.jsonpCallback() : bo.jsonpCallback,
                    bj = a0[bg],
                    e = bo.url,
                    bi = bo.data,
                    bf = "$1" + bg + "$2",
                    bh = function() {
                        a0[bg] = bj;
                        if (bl && b.isFunction(bj)) {
                            a0[bg](bl[0])
                        }
                    };
                if (bo.jsonp !== false) {
                    e = e.replace(u, bf);
                    if (bo.url === e) {
                        if (bm) {
                            bi = bi.replace(u, bf)
                        }
                        if (bo.data === bi) {
                            e += (/\?/.test(e) ? "&" : "?") + bo.jsonp + "=" + bg
                        }
                    }
                }
                bo.url = e;
                bo.data = bi;
                a0[bg] = function(bp) {
                    bl = [bp]
                };
                bn.then(bh, bh);
                bo.converters["script json"] = function() {
                    if (!bl) {
                        b.error(bg + " was not called")
                    }
                    return bl[0]
                };
                bo.dataTypes[0] = "json";
                return "script"
            }
        });
        b.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /javascript|ecmascript/
            },
            converters: {
                "text script": function(e) {
                    b.globalEval(e);
                    return e
                }
            }
        });
        b.ajaxPrefilter("script", function(e) {
            if (e.cache === I) {
                e.cache = false
            }
            if (e.crossDomain) {
                e.type = "GET";
                e.global = false
            }
        });
        b.ajaxTransport("script", function(bg) {
            if (bg.crossDomain) {
                var e, bf = am.head || am.getElementsByTagName("head")[0] || am.documentElement;
                return {
                    send: function(bh, bi) {
                        e = am.createElement("script");
                        e.async = "async";
                        if (bg.scriptCharset) {
                            e.charset = bg.scriptCharset
                        }
                        e.src = bg.url;
                        e.onload = e.onreadystatechange = function(bk, bj) {
                            if (!e.readyState || /loaded|complete/.test(e.readyState)) {
                                e.onload = e.onreadystatechange = null;
                                if (bf && e.parentNode) {
                                    bf.removeChild(e)
                                }
                                e = I;
                                if (!bj) {
                                    bi(200, "success")
                                }
                            }
                        };
                        bf.insertBefore(e, bf.firstChild)
                    },
                    abort: function() {
                        if (e) {
                            e.onload(0, 1)
                        }
                    }
                }
            }
        });
        var y = b.now(),
            K, au;

        function B() {
            b(a0).unload(function() {
                for (var e in K) {
                    K[e](0, 1)
                }
            })
        }

        function aC() {
            try {
                return new a0.XMLHttpRequest()
            } catch (bf) {}
        }

        function ae() {
            try {
                return new a0.ActiveXObject("Microsoft.XMLHTTP")
            } catch (bf) {}
        }
        b.ajaxSettings.xhr = a0.ActiveXObject ? function() {
            return !this.isLocal && aC() || ae()
        } : aC;
        au = b.ajaxSettings.xhr();
        b.support.ajax = !!au;
        b.support.cors = au && ("withCredentials" in au);
        au = I;
        if (b.support.ajax) {
            b.ajaxTransport(function(e) {
                if (!e.crossDomain || b.support.cors) {
                    var bf;
                    return {
                        send: function(bl, bg) {
                            var bk = e.xhr(),
                                bj, bi;
                            if (e.username) {
                                bk.open(e.type, e.url, e.async, e.username, e.password)
                            } else {
                                bk.open(e.type, e.url, e.async)
                            }
                            if (e.xhrFields) {
                                for (bi in e.xhrFields) {
                                    bk[bi] = e.xhrFields[bi]
                                }
                            }
                            if (e.mimeType && bk.overrideMimeType) {
                                bk.overrideMimeType(e.mimeType)
                            }
                            if (!e.crossDomain && !bl["X-Requested-With"]) {
                                bl["X-Requested-With"] = "XMLHttpRequest"
                            }
                            try {
                                for (bi in bl) {
                                    bk.setRequestHeader(bi, bl[bi])
                                }
                            } catch (bh) {}
                            bk.send((e.hasContent && e.data) || null);
                            bf = function(bu, bo) {
                                var bp, bn, bm, bs, br;
                                try {
                                    if (bf && (bo || bk.readyState === 4)) {
                                        bf = I;
                                        if (bj) {
                                            bk.onreadystatechange = b.noop;
                                            delete K[bj]
                                        }
                                        if (bo) {
                                            if (bk.readyState !== 4) {
                                                bk.abort()
                                            }
                                        } else {
                                            bp = bk.status;
                                            bm = bk.getAllResponseHeaders();
                                            bs = {};
                                            br = bk.responseXML;
                                            if (br && br.documentElement) {
                                                bs.xml = br
                                            }
                                            bs.text = bk.responseText;
                                            try {
                                                bn = bk.statusText
                                            } catch (bt) {
                                                bn = ""
                                            }
                                            if (!bp && e.isLocal && !e.crossDomain) {
                                                bp = bs.text ? 200 : 404
                                            } else {
                                                if (bp === 1223) {
                                                    bp = 204
                                                }
                                            }
                                        }
                                    }
                                } catch (bq) {
                                    if (!bo) {
                                        bg(-1, bq)
                                    }
                                }
                                if (bs) {
                                    bg(bp, bn, bs, bm)
                                }
                            };
                            if (!e.async || bk.readyState === 4) {
                                bf()
                            } else {
                                if (!K) {
                                    K = {};
                                    B()
                                }
                                bj = y++;
                                bk.onreadystatechange = K[bj] = bf
                            }
                        },
                        abort: function() {
                            if (bf) {
                                bf(0, 1)
                            }
                        }
                    }
                }
            })
        }
        var O = {},
            aq = /^(?:toggle|show|hide)$/,
            aH = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
            aU, ay = [
                ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
                ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
                ["opacity"]
            ];
        b.fn.extend({
            show: function(bh, bk, bj) {
                var bg, bi;
                if (bh || bh === 0) {
                    return this.animate(aS("show", 3), bh, bk, bj)
                } else {
                    for (var bf = 0, e = this.length; bf < e; bf++) {
                        bg = this[bf];
                        bi = bg.style.display;
                        if (!b._data(bg, "olddisplay") && bi === "none") {
                            bi = bg.style.display = ""
                        }
                        if (bi === "" && b.css(bg, "display") === "none") {
                            b._data(bg, "olddisplay", x(bg.nodeName))
                        }
                    }
                    for (bf = 0; bf < e; bf++) {
                        bg = this[bf];
                        bi = bg.style.display;
                        if (bi === "" || bi === "none") {
                            bg.style.display = b._data(bg, "olddisplay") || ""
                        }
                    }
                    return this
                }
            },
            hide: function(bg, bj, bi) {
                if (bg || bg === 0) {
                    return this.animate(aS("hide", 3), bg, bj, bi)
                } else {
                    for (var bf = 0, e = this.length; bf < e; bf++) {
                        var bh = b.css(this[bf], "display");
                        if (bh !== "none" && !b._data(this[bf], "olddisplay")) {
                            b._data(this[bf], "olddisplay", bh)
                        }
                    }
                    for (bf = 0; bf < e; bf++) {
                        this[bf].style.display = "none"
                    }
                    return this
                }
            },
            _toggle: b.fn.toggle,
            toggle: function(bg, bf, bh) {
                var e = typeof bg === "boolean";
                if (b.isFunction(bg) && b.isFunction(bf)) {
                    this._toggle.apply(this, arguments)
                } else {
                    if (bg == null || e) {
                        this.each(function() {
                            var bi = e ? bg : b(this).is(":hidden");
                            b(this)[bi ? "show" : "hide"]()
                        })
                    } else {
                        this.animate(aS("toggle", 3), bg, bf, bh)
                    }
                }
                return this
            },
            fadeTo: function(e, bh, bg, bf) {
                return this.filter(":hidden").css("opacity", 0).show().end().animate({
                    opacity: bh
                }, e, bg, bf)
            },
            animate: function(bi, bf, bh, bg) {
                var e = b.speed(bf, bh, bg);
                if (b.isEmptyObject(bi)) {
                    return this.each(e.complete)
                }
                return this[e.queue === false ? "each" : "queue"](function() {
                    var bl = b.extend({}, e),
                        bp, bm = this.nodeType === 1,
                        bn = bm && b(this).is(":hidden"),
                        bj = this;
                    for (bp in bi) {
                        var bk = b.camelCase(bp);
                        if (bp !== bk) {
                            bi[bk] = bi[bp];
                            delete bi[bp];
                            bp = bk
                        }
                        if (bi[bp] === "hide" && bn || bi[bp] === "show" && !bn) {
                            return bl.complete.call(this)
                        }
                        if (bm && (bp === "height" || bp === "width")) {
                            bl.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                            if (b.css(this, "display") === "inline" && b.css(this, "float") === "none") {
                                if (!b.support.inlineBlockNeedsLayout) {
                                    this.style.display = "inline-block"
                                } else {
                                    var bo = x(this.nodeName);
                                    if (bo === "inline") {
                                        this.style.display = "inline-block"
                                    } else {
                                        this.style.display = "inline";
                                        this.style.zoom = 1
                                    }
                                }
                            }
                        }
                        if (b.isArray(bi[bp])) {
                            (bl.specialEasing = bl.specialEasing || {})[bp] = bi[bp][1];
                            bi[bp] = bi[bp][0]
                        }
                    }
                    if (bl.overflow != null) {
                        this.style.overflow = "hidden"
                    }
                    bl.curAnim = b.extend({}, bi);
                    b.each(bi, function(br, bv) {
                        var bu = new b.fx(bj, bl, br);
                        if (aq.test(bv)) {
                            bu[bv === "toggle" ? bn ? "show" : "hide" : bv](bi)
                        } else {
                            var bt = aH.exec(bv),
                                bw = bu.cur();
                            if (bt) {
                                var bq = parseFloat(bt[2]),
                                    bs = bt[3] || (b.cssNumber[br] ? "" : "px");
                                if (bs !== "px") {
                                    b.style(bj, br, (bq || 1) + bs);
                                    bw = ((bq || 1) / bu.cur()) * bw;
                                    b.style(bj, br, bw + bs)
                                }
                                if (bt[1]) {
                                    bq = ((bt[1] === "-=" ? -1 : 1) * bq) + bw
                                }
                                bu.custom(bw, bq, bs)
                            } else {
                                bu.custom(bw, bv, "")
                            }
                        }
                    });
                    return true
                })
            },
            stop: function(bf, e) {
                var bg = b.timers;
                if (bf) {
                    this.queue([])
                }
                this.each(function() {
                    for (var bh = bg.length - 1; bh >= 0; bh--) {
                        if (bg[bh].elem === this) {
                            if (e) {
                                bg[bh](true)
                            }
                            bg.splice(bh, 1)
                        }
                    }
                });
                if (!e) {
                    this.dequeue()
                }
                return this
            }
        });

        function aS(bf, e) {
            var bg = {};
            b.each(ay.concat.apply([], ay.slice(0, e)), function() {
                bg[this] = bf
            });
            return bg
        }
        b.each({
            slideDown: aS("show", 1),
            slideUp: aS("hide", 1),
            slideToggle: aS("toggle", 1),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, bf) {
            b.fn[e] = function(bg, bi, bh) {
                return this.animate(bf, bg, bi, bh)
            }
        });
        b.extend({
            speed: function(bg, bh, bf) {
                var e = bg && typeof bg === "object" ? b.extend({}, bg) : {
                    complete: bf || !bf && bh || b.isFunction(bg) && bg,
                    duration: bg,
                    easing: bf && bh || bh && !b.isFunction(bh) && bh
                };
                e.duration = b.fx.off ? 0 : typeof e.duration === "number" ? e.duration : e.duration in b.fx.speeds ? b.fx.speeds[e.duration] : b.fx.speeds._default;
                e.old = e.complete;
                e.complete = function() {
                    if (e.queue !== false) {
                        b(this).dequeue()
                    }
                    if (b.isFunction(e.old)) {
                        e.old.call(this)
                    }
                };
                return e
            },
            easing: {
                linear: function(bg, bh, e, bf) {
                    return e + bf * bg
                },
                swing: function(bg, bh, e, bf) {
                    return ((-Math.cos(bg * Math.PI) / 2) + 0.5) * bf + e
                }
            },
            timers: [],
            fx: function(bf, e, bg) {
                this.options = e;
                this.elem = bf;
                this.prop = bg;
                if (!e.orig) {
                    e.orig = {}
                }
            }
        });
        b.fx.prototype = {
            update: function() {
                if (this.options.step) {
                    this.options.step.call(this.elem, this.now, this)
                }(b.fx.step[this.prop] || b.fx.step._default)(this)
            },
            cur: function() {
                if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                    return this.elem[this.prop]
                }
                var e, bf = b.css(this.elem, this.prop);
                return isNaN(e = parseFloat(bf)) ? !bf || bf === "auto" ? 0 : bf : e
            },
            custom: function(bj, bi, bh) {
                var e = this,
                    bg = b.fx;
                this.startTime = b.now();
                this.start = bj;
                this.end = bi;
                this.unit = bh || this.unit || (b.cssNumber[this.prop] ? "" : "px");
                this.now = this.start;
                this.pos = this.state = 0;

                function bf(bk) {
                    return e.step(bk)
                }
                bf.elem = this.elem;
                if (bf() && b.timers.push(bf) && !aU) {
                    aU = setInterval(bg.tick, bg.interval)
                }
            },
            show: function() {
                this.options.orig[this.prop] = b.style(this.elem, this.prop);
                this.options.show = true;
                this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
                b(this.elem).show()
            },
            hide: function() {
                this.options.orig[this.prop] = b.style(this.elem, this.prop);
                this.options.hide = true;
                this.custom(this.cur(), 0)
            },
            step: function(bh) {
                var bm = b.now(),
                    bi = true;
                if (bh || bm >= this.options.duration + this.startTime) {
                    this.now = this.end;
                    this.pos = this.state = 1;
                    this.update();
                    this.options.curAnim[this.prop] = true;
                    for (var bj in this.options.curAnim) {
                        if (this.options.curAnim[bj] !== true) {
                            bi = false
                        }
                    }
                    if (bi) {
                        if (this.options.overflow != null && !b.support.shrinkWrapBlocks) {
                            var bg = this.elem,
                                bn = this.options;
                            b.each(["", "X", "Y"], function(bo, bp) {
                                bg.style["overflow" + bp] = bn.overflow[bo]
                            })
                        }
                        if (this.options.hide) {
                            b(this.elem).hide()
                        }
                        if (this.options.hide || this.options.show) {
                            for (var e in this.options.curAnim) {
                                b.style(this.elem, e, this.options.orig[e])
                            }
                        }
                        this.options.complete.call(this.elem)
                    }
                    return false
                } else {
                    var bf = bm - this.startTime;
                    this.state = bf / this.options.duration;
                    var bk = this.options.specialEasing && this.options.specialEasing[this.prop];
                    var bl = this.options.easing || (b.easing.swing ? "swing" : "linear");
                    this.pos = b.easing[bk || bl](this.state, bf, 0, 1, this.options.duration);
                    this.now = this.start + ((this.end - this.start) * this.pos);
                    this.update()
                }
                return true
            }
        };
        b.extend(b.fx, {
            tick: function() {
                var bf = b.timers;
                for (var e = 0; e < bf.length; e++) {
                    if (!bf[e]()) {
                        bf.splice(e--, 1)
                    }
                }
                if (!bf.length) {
                    b.fx.stop()
                }
            },
            interval: 13,
            stop: function() {
                clearInterval(aU);
                aU = null
            },
            speeds: {
                slow: 600,
                fast: 200,
                _default: 400
            },
            step: {
                opacity: function(e) {
                    b.style(e.elem, "opacity", e.now)
                },
                _default: function(e) {
                    if (e.elem.style && e.elem.style[e.prop] != null) {
                        e.elem.style[e.prop] = (e.prop === "width" || e.prop === "height" ? Math.max(0, e.now) : e.now) + e.unit
                    } else {
                        e.elem[e.prop] = e.now
                    }
                }
            }
        });
        if (b.expr && b.expr.filters) {
            b.expr.filters.animated = function(e) {
                return b.grep(b.timers, function(bf) {
                    return e === bf.elem
                }).length
            }
        }

        function x(bg) {
            if (!O[bg]) {
                var e = b("<" + bg + ">").appendTo("body"),
                    bf = e.css("display");
                e.remove();
                if (bf === "none" || bf === "") {
                    bf = "block"
                }
                O[bg] = bf
            }
            return O[bg]
        }
        var T = /^t(?:able|d|h)$/i,
            Z = /^(?:body|html)$/i;
        if ("getBoundingClientRect" in am.documentElement) {
            b.fn.offset = function(bs) {
                var bi = this[0],
                    bl;
                if (bs) {
                    return this.each(function(e) {
                        b.offset.setOffset(this, bs, e)
                    })
                }
                if (!bi || !bi.ownerDocument) {
                    return null
                }
                if (bi === bi.ownerDocument.body) {
                    return b.offset.bodyOffset(bi)
                }
                try {
                    bl = bi.getBoundingClientRect()
                } catch (bp) {}
                var br = bi.ownerDocument,
                    bg = br.documentElement;
                if (!bl || !b.contains(bg, bi)) {
                    return bl ? {
                        top: bl.top,
                        left: bl.left
                    } : {
                        top: 0,
                        left: 0
                    }
                }
                var bm = br.body,
                    bn = aB(br),
                    bk = bg.clientTop || bm.clientTop || 0,
                    bo = bg.clientLeft || bm.clientLeft || 0,
                    bf = bn.pageYOffset || b.support.boxModel && bg.scrollTop || bm.scrollTop,
                    bj = bn.pageXOffset || b.support.boxModel && bg.scrollLeft || bm.scrollLeft,
                    bq = bl.top + bf - bk,
                    bh = bl.left + bj - bo;
                return {
                    top: bq,
                    left: bh
                }
            }
        } else {
            b.fn.offset = function(bp) {
                var bj = this[0];
                if (bp) {
                    return this.each(function(bq) {
                        b.offset.setOffset(this, bp, bq)
                    })
                }
                if (!bj || !bj.ownerDocument) {
                    return null
                }
                if (bj === bj.ownerDocument.body) {
                    return b.offset.bodyOffset(bj)
                }
                b.offset.initialize();
                var bm, bg = bj.offsetParent,
                    bf = bj,
                    bo = bj.ownerDocument,
                    bh = bo.documentElement,
                    bk = bo.body,
                    bl = bo.defaultView,
                    e = bl ? bl.getComputedStyle(bj, null) : bj.currentStyle,
                    bn = bj.offsetTop,
                    bi = bj.offsetLeft;
                while ((bj = bj.parentNode) && bj !== bk && bj !== bh) {
                    if (b.offset.supportsFixedPosition && e.position === "fixed") {
                        break
                    }
                    bm = bl ? bl.getComputedStyle(bj, null) : bj.currentStyle;
                    bn -= bj.scrollTop;
                    bi -= bj.scrollLeft;
                    if (bj === bg) {
                        bn += bj.offsetTop;
                        bi += bj.offsetLeft;
                        if (b.offset.doesNotAddBorder && !(b.offset.doesAddBorderForTableAndCells && T.test(bj.nodeName))) {
                            bn += parseFloat(bm.borderTopWidth) || 0;
                            bi += parseFloat(bm.borderLeftWidth) || 0
                        }
                        bf = bg;
                        bg = bj.offsetParent
                    }
                    if (b.offset.subtractsBorderForOverflowNotVisible && bm.overflow !== "visible") {
                        bn += parseFloat(bm.borderTopWidth) || 0;
                        bi += parseFloat(bm.borderLeftWidth) || 0
                    }
                    e = bm
                }
                if (e.position === "relative" || e.position === "static") {
                    bn += bk.offsetTop;
                    bi += bk.offsetLeft
                }
                if (b.offset.supportsFixedPosition && e.position === "fixed") {
                    bn += Math.max(bh.scrollTop, bk.scrollTop);
                    bi += Math.max(bh.scrollLeft, bk.scrollLeft)
                }
                return {
                    top: bn,
                    left: bi
                }
            }
        }
        b.offset = {
            initialize: function() {
                var e = am.body,
                    bf = am.createElement("div"),
                    bi, bk, bj, bl, bg = parseFloat(b.css(e, "marginTop")) || 0,
                    bh = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
                b.extend(bf.style, {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    border: 0,
                    width: "1px",
                    height: "1px",
                    visibility: "hidden"
                });
                bf.innerHTML = bh;
                e.insertBefore(bf, e.firstChild);
                bi = bf.firstChild;
                bk = bi.firstChild;
                bl = bi.nextSibling.firstChild.firstChild;
                this.doesNotAddBorder = (bk.offsetTop !== 5);
                this.doesAddBorderForTableAndCells = (bl.offsetTop === 5);
                bk.style.position = "fixed";
                bk.style.top = "20px";
                this.supportsFixedPosition = (bk.offsetTop === 20 || bk.offsetTop === 15);
                bk.style.position = bk.style.top = "";
                bi.style.overflow = "hidden";
                bi.style.position = "relative";
                this.subtractsBorderForOverflowNotVisible = (bk.offsetTop === -5);
                this.doesNotIncludeMarginInBodyOffset = (e.offsetTop !== bg);
                e.removeChild(bf);
                b.offset.initialize = b.noop
            },
            bodyOffset: function(e) {
                var bg = e.offsetTop,
                    bf = e.offsetLeft;
                b.offset.initialize();
                if (b.offset.doesNotIncludeMarginInBodyOffset) {
                    bg += parseFloat(b.css(e, "marginTop")) || 0;
                    bf += parseFloat(b.css(e, "marginLeft")) || 0
                }
                return {
                    top: bg,
                    left: bf
                }
            },
            setOffset: function(bh, bq, bk) {
                var bl = b.css(bh, "position");
                if (bl === "static") {
                    bh.style.position = "relative"
                }
                var bj = b(bh),
                    bf = bj.offset(),
                    e = b.css(bh, "top"),
                    bo = b.css(bh, "left"),
                    bp = (bl === "absolute" || bl === "fixed") && b.inArray("auto", [e, bo]) > -1,
                    bn = {},
                    bm = {},
                    bg, bi;
                if (bp) {
                    bm = bj.position()
                }
                bg = bp ? bm.top : parseInt(e, 10) || 0;
                bi = bp ? bm.left : parseInt(bo, 10) || 0;
                if (b.isFunction(bq)) {
                    bq = bq.call(bh, bk, bf)
                }
                if (bq.top != null) {
                    bn.top = (bq.top - bf.top) + bg
                }
                if (bq.left != null) {
                    bn.left = (bq.left - bf.left) + bi
                }
                if ("using" in bq) {
                    bq.using.call(bh, bn)
                } else {
                    bj.css(bn)
                }
            }
        };
        b.fn.extend({
            position: function() {
                if (!this[0]) {
                    return null
                }
                var bg = this[0],
                    bf = this.offsetParent(),
                    bh = this.offset(),
                    e = Z.test(bf[0].nodeName) ? {
                        top: 0,
                        left: 0
                    } : bf.offset();
                bh.top -= parseFloat(b.css(bg, "marginTop")) || 0;
                bh.left -= parseFloat(b.css(bg, "marginLeft")) || 0;
                e.top += parseFloat(b.css(bf[0], "borderTopWidth")) || 0;
                e.left += parseFloat(b.css(bf[0], "borderLeftWidth")) || 0;
                return {
                    top: bh.top - e.top,
                    left: bh.left - e.left
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var e = this.offsetParent || am.body;
                    while (e && (!Z.test(e.nodeName) && b.css(e, "position") === "static")) {
                        e = e.offsetParent
                    }
                    return e
                })
            }
        });
        b.each(["Left", "Top"], function(bf, e) {
            var bg = "scroll" + e;
            b.fn[bg] = function(bj) {
                var bh = this[0],
                    bi;
                if (!bh) {
                    return null
                }
                if (bj !== I) {
                    return this.each(function() {
                        bi = aB(this);
                        if (bi) {
                            bi.scrollTo(!bf ? bj : b(bi).scrollLeft(), bf ? bj : b(bi).scrollTop())
                        } else {
                            this[bg] = bj
                        }
                    })
                } else {
                    bi = aB(bh);
                    return bi ? ("pageXOffset" in bi) ? bi[bf ? "pageYOffset" : "pageXOffset"] : b.support.boxModel && bi.document.documentElement[bg] || bi.document.body[bg] : bh[bg]
                }
            }
        });

        function aB(e) {
            return b.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : false
        }
        b.each(["Height", "Width"], function(bf, e) {
            var bg = e.toLowerCase();
            b.fn["inner" + e] = function() {
                return this[0] ? parseFloat(b.css(this[0], bg, "padding")) : null
            };
            b.fn["outer" + e] = function(bh) {
                return this[0] ? parseFloat(b.css(this[0], bg, bh ? "margin" : "border")) : null
            };
            b.fn[bg] = function(bi) {
                var bj = this[0];
                if (!bj) {
                    return bi == null ? null : this
                }
                if (b.isFunction(bi)) {
                    return this.each(function(bn) {
                        var bm = b(this);
                        bm[bg](bi.call(this, bn, bm[bg]()))
                    })
                }
                if (b.isWindow(bj)) {
                    var bk = bj.document.documentElement["client" + e];
                    return bj.document.compatMode === "CSS1Compat" && bk || bj.document.body["client" + e] || bk
                } else {
                    if (bj.nodeType === 9) {
                        return Math.max(bj.documentElement["client" + e], bj.body["scroll" + e], bj.documentElement["scroll" + e], bj.body["offset" + e], bj.documentElement["offset" + e])
                    } else {
                        if (bi === I) {
                            var bl = b.css(bj, bg),
                                bh = parseFloat(bl);
                            return b.isNaN(bh) ? bl : bh
                        } else {
                            return this.css(bg, typeof bi === "string" ? bi : bi + "px")
                        }
                    }
                }
            }
        });
        a0.sessionCamJQuery = b
    })(window);

    /*
    http://plugins.jquery.com/project/dataSelector
    Copyright (c) 2009, Pim Jager
    All rights reserved. */

    /*
    THIS SOFTWARE IS PROVIDED BY Pim Jager ''AS IS'' AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL Pim Jager BE LIABLE FOR ANY
    DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    */
    (function($) {
        var gT = function(a) {
            return typeof a === 'undefined';
        };
        $.expr[':'].data = function(elem, dX, params) {
            if (gT(elem) || gT(params)) return false;
            var dr = params[3];
            if (!dr) return false;
            var jV = dr.split('=');
            var lf = jV[0].charAt(jV[0].length - 1);
            if (lf == '^' || lf == '$' || lf == '!' || lf == '*') {
                jV[0] = jV[0].substring(0, jV[0].length - 1);
                if (!$.stringQuery && lf != '!') {
                    return false;
                }
            } else lf = '=';
            var er = jV[0];
            var bU = er.split('.');
            var data = $(elem).data(bU[0]);
            if (gT(data)) return false;
            if (bU[1]) {
                for (i = 1, x = bU.length; i < x; i++) {
                    data = data[bU[i]];
                    if (gT(data)) return false;
                }
            }
            if (jV[1]) {
                var kh = (data + '');
                switch (lf) {
                    case '=':
                        return kh == jV[1];
                        break;
                    case '!':
                        return kh != jV[1];
                        break;
                    case '^':
                        return $.stringQuery.startsWith(kh, jV[1]);
                        break;
                    case '$':
                        return $.stringQuery.endsWith(kh, jV[1]);
                        break;
                    case '*':
                        return $.stringQuery.contains(kh, jV[1]);
                        break;
                    default:
                        return false;
                        break;
                }
            } else {
                return true;
            }
        }
    })(window.sessionCamJQuery);
    /*
     * jQuery stringifyJSON
     * http://github.com/flowersinthesand/jquery-stringifyJSON
     *
     * Copyright 2011, Donghwan Kim
     * Licensed under the Apache License, Version 2.0
     * http://www.apache.org/licenses/LICENSE-2.0
     */
    (function($) {
        var gr = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            meta = {
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            };

        function ak(string) {
            return '"' + string.replace(gr, function(a) {
                var c = meta[a];
                return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"';
        };

        function f(n) {
            return n < 10 ? "0" + n : n;
        };

        function str(key, gc) {
            var i, v, hj, fT, value = gc[key],
                type = typeof value;
            if (value && typeof value === "object" && typeof value.toJSON === "function") {
                value = value.toJSON(key);
                type = typeof value;
            }
            switch (type) {
                case "string":
                    return ak(value);
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                    return String(value);
                case "object":
                    if (!value) {
                        return "null";
                    }
                    switch (Object.prototype.toString.call(value)) {
                        case "[object Date]":
                            return isFinite(value.valueOf()) ? '"' + value.getUTCFullYear() + "-" + f(value.getUTCMonth() + 1) + "-" + f(value.getUTCDate()) + "T" + f(value.getUTCHours()) + ":" + f(value.getUTCMinutes()) + ":" + f(value.getUTCSeconds()) + "Z" + '"' : "null";
                        case "[object Array]":
                            hj = value.length;
                            fT = [];
                            for (i = 0; i < hj; i++) {
                                fT.push(str(i, value) || "null");
                            }
                            return "[" + fT.join(",") + "]";
                        default:
                            fT = [];
                            for (i in value) {
                                if (Object.prototype.hasOwnProperty.call(value, i)) {
                                    v = str(i, value);
                                    if (v) {
                                        fT.push(ak(i) + ":" + v);
                                    }
                                }
                            }
                            return "{" + fT.join(",") + "}";
                    }
            }
        };
        $.stringifyJSON = function(value) {
            if (window.JSON && window.JSON.stringify) {
                return window.JSON.stringify(value);
            }
            return str("", {
                "": value
            });
        };
    }(window.sessionCamJQuery));
    this.hI = (function() {
        "use strict";
        var at, ch, fP = {
                '"': '"',
                '\\': '\\',
                '/': '/',
                b: '\b',
                f: '\f',
                n: '\n',
                r: '\r',
                t: '\t'
            },
            text, error = function(m) {
                throw {
                    name: 'SyntaxError',
                    message: m,
                    at: at,
                    text: text
                };
            },
            next = function(c) {
                if (c && c !== ch) {
                    error("Expected '" + c + "' instead of '" + ch + "'");
                }
                ch = text.charAt(at);
                at += 1;
                return ch;
            },
            number = function() {
                var number, string = '';
                if (ch === '-') {
                    string = '-';
                    next('-');
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
                if (ch === '.') {
                    string += '.';
                    while (next() && ch >= '0' && ch <= '9') {
                        string += ch;
                    }
                }
                if (ch === 'e' || ch === 'E') {
                    string += ch;
                    next();
                    if (ch === '-' || ch === '+') {
                        string += ch;
                        next();
                    }
                    while (ch >= '0' && ch <= '9') {
                        string += ch;
                        next();
                    }
                }
                number = +string;
                if (!isFinite(number)) {
                    error("Bad number");
                } else {
                    return number;
                }
            },
            string = function() {
                var hc, i, string = '',
                    uffff;
                if (ch === '"') {
                    while (next()) {
                        if (ch === '"') {
                            next();
                            return string;
                        }
                        if (ch === '\\') {
                            next();
                            if (ch === 'u') {
                                uffff = 0;
                                for (i = 0; i < 4; i += 1) {
                                    hc = parseInt(next(), 16);
                                    if (!isFinite(hc)) {
                                        break;
                                    }
                                    uffff = uffff * 16 + hc;
                                }
                                string += String.fromCharCode(uffff);
                            } else if (typeof fP[ch] === 'string') {
                                string += fP[ch];
                            } else {
                                break;
                            }
                        } else {
                            string += ch;
                        }
                    }
                }
                error("Bad string");
            },
            white = function() {
                while (ch && ch <= ' ') {
                    next();
                }
            },
            word = function() {
                switch (ch) {
                    case 't':
                        next('t');
                        next('r');
                        next('u');
                        next('e');
                        return true;
                    case 'f':
                        next('f');
                        next('a');
                        next('l');
                        next('s');
                        next('e');
                        return false;
                    case 'n':
                        next('n');
                        next('u');
                        next('l');
                        next('l');
                        return null;
                }
                error("Unexpected '" + ch + "'");
            },
            value, array = function() {
                var array = [];
                if (ch === '[') {
                    next('[');
                    white();
                    if (ch === ']') {
                        next(']');
                        return array;
                    }
                    while (ch) {
                        array.push(value());
                        white();
                        if (ch === ']') {
                            next(']');
                            return array;
                        }
                        next(',');
                        white();
                    }
                }
                error("Bad array");
            },
            object = function() {
                var key, object = {};
                if (ch === '{') {
                    next('{');
                    white();
                    if (ch === '}') {
                        next('}');
                        return object;
                    }
                    while (ch) {
                        key = string();
                        white();
                        next(':');
                        if (Object.hasOwnProperty.call(object, key)) {
                            error('Duplicate key "' + key + '"');
                        }
                        object[key] = value();
                        white();
                        if (ch === '}') {
                            next('}');
                            return object;
                        }
                        next(',');
                        white();
                    }
                }
                error("Bad object");
            };
        value = function() {
            white();
            switch (ch) {
                case '{':
                    return object();
                case '[':
                    return array();
                case '"':
                    return string();
                case '-':
                    return number();
                default:
                    return ch >= '0' && ch <= '9' ? number() : word();
            }
        };
        return function(source, gK) {
            var result;
            text = source;
            at = 0;
            ch = ' ';
            result = value();
            white();
            if (ch) {
                error("Syntax error");
            }
            return typeof gK === 'function' ? (function walk(gc, key) {
                var k, v, value = gc[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.prototype.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return gK.call(gc, key, value);
            }({
                '': result
            }, '')) : result;
        };
    }());
    this.gg = '4.78'; //-->
    function iO() {
        this.bT = [];
    };
    iO.prototype.append = function append(string) {
        this.bT.push(string);
        return this;
    };
    iO.prototype.toString = function toString() {
        return this.bT.join("");
    };
    iO.prototype.isEmpty = function isEmpty() {
        return !this.bT.length;
    };
    iO.prototype.reset = function reset() {
        this.bT = [];
        return;
    };
    this.iO = function() {
        return new iO();
    };

    function fq() {
        this.ShowFirstChars = 0;
        this.ShowLastChars = 0;
    };
    this.fq = function() {
        return new fq();
    };
    this.gu = '';
    this.mk = 46;
    this.ef = 8;
    this.dh = 32;
    this.kO = 13;
    this.ku = 37;
    this.jY = 38;
    this.ko = 39;
    this.cP = 40;
    this.altKey = 18;
    this.ctrlKey = 17;
    this.dp = 45;
    this.cD = 36;
    this.cT = 35;
    this.co = 33;
    this.cX = 34;
    this.hK = '';
    this.lb = decodeURI(window.location);
    this.lB = false;
    this.cZ = false;
    this.mo = false;
    this.hk = null;
    this.gw = null;
    this.kp = 0;
    this.jX = 0;
    this.scrollX = 0;
    this.scrollY = 0;
    this.dL = 0;
    this.ce = 0;
    this.cO = -1;
    this.cq = -1;
    this.dB = 0;
    this.bY = 0;
    this.kZ = 0;
    this.jL = 0;
    this.cs = false;
    this.mI = 1;
    this.fp = this.lg + '/Logger/log.aspx';
    this.jS = false;
    this.me = false;
    this.mt = false;
    this.ft = 1000;
    this.fd = 200;
    this.gM = 50;
    this.kR = [];
    this.bv = [];
    this.aj = 'sessioncammonitorscroll';
    this.sessioncamMainFixed = 'sessioncammainfixed';
    this.es = 500;
    this.bF = null;
    this.jP = 250;
    this.kz = 0;
    this.kE = 10;
    this.kF = '';
    this.lc = new iO();
    this.requestType = '';
    this.ll = '<!-- SessionCam:Hide -->';
    this.ld = '<!-- /SessionCam:Hide -->';
    this.mA = 'sessioncamhidetext';
    this.sessionCamIgnoreChanges = "sessioncamignorechanges";
    this.sessionCamPreserveWhitespace = "sessioncampreservewhitespace";
    this.sessioncamName = "sessioncam-name";
    this.kX = 'input[type=text], input[type=email], input[type=url], input[type=search], input[type=tel]';
    this.jZ = 'input[type=number], input[type=date], input[type=week], input[type=month], input[type=time], input[type=datetime], input[type=datetime-local], input[type=color], input[type=range]';
    this.fF = 0;
    this.eY = 1;
    this.la = [];
    this.mJ = 0;
    this.nf = '';
    this.aA = false;
    this.ph = '';
    this.oj = '';
    this.om = 1000;
    this.kk = 0;
    this.kj = 0;
    this.kM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    this.eE = '';
    this.as = -1;
    this.kc = -1;
    this.fi = '\u001E';
    this.ed = '\u001D';
    this.fo = {
        'Click': 'c',
        'iU': 'f',
        'jr': 'b',
        'mL': 'ws',
        'ElementScroll': 'es',
        'lU': 'mp',
        'MouseDown': 'md',
        'MouseUp': 'mu',
        'PageLoad': 'pl',
        'iH': 'pu',
        'KeyPress': 'k',
        'KeyDown': 'kd',
        'hQ': 'fe',
        'ly': 'fi',
        'kr': 'fs',
        'jv': 'ft',
        'Start': 'st',
        'jd': 'af',
        'hS': 'aa',
        'Remove': 'r',
        'jA': 'cc',
        'mx': 'ic',
        'js': 'tc',
        'ib': 'sc',
        'iX': 'src',
        'iB': 'alt',
        'DisabledChange': 'dc',
        'ji': 'tg',
        'bl': 'px',
        'jz': 'fx',
        'iJ': 'val',
        'mU': 'gvl',
        'ew': 'tag',
        'eH': 'lh',
        'DefaultValue': 'dv',
        'hY': 'kis',
        'jq': 'hcc',
        'lC': 'hsc',
        'iy': 'ha',
        'jc': 'hc',
        'il': 'hr',
        'ik': 'bsa',
        'iG': 'bsf',
        'iI': 'bsc',
        'iK': 'bsr',
        'ix': 'wr',
        'io': 'oc',
        'eo': 'tb',
        'Zoom': 'z',
        'iL': 'ts',
        'iq': 'te',
        'hO': 'tm',
        'hZ': 'tf',
        'iF': 'tcl',
        'ClientEvent': 'ce',
        'nl': 'cvs',
        'ea': 'hs',
        'ns': 'he',
        'lO': 'set',
        'nN': 'bv',
        'oG': 'bc'
    };

    function ia(sessionId, kL, iE) {
        this.A = false;
        this.I = false;
        this.N = '';
        this.P = '';
        this.H = '';
        this.D = false;
        this.B = 7;
        this.U = '';
        this.S = (sessionId ? sessionId : '');
        this.E = [];
        this.C = null;
        this.G = false;
        this.T = 0;
        this.Z = false;
        this.L = 0;
        this.AA = (kL ? kL : '');
        this.AB = (iE ? iE : '');
        this.AS = false;
        this.AT = 250;
        this.AU = false;
        this.AV = 1;
        this.AW = '';
        this.AX = false;
        this.AY = true;
        this.AZ = 0;
    };
    this.ia = function(sessionId, kL, iE) {
        return new ia(sessionId, kL, iE);
    };
    this.gi = false;
    this.lG = null;
    this.configuration = new ia();

    function iA(url, uri, gz, kL, iE) {
        this.url = url;
        this.uri = uri;
        this.gz = gz;
        this.kL = kL;
        this.iE = iE;
    };
    this.iA = function(url, uri, gz, kL, iE) {
        return new iA(url, uri, gz, kL, iE);
    };
    this.iD = [];
    this.jG = this.getTime();
    this.eq = this.jG;
    this.gm = this.jG;
    this.gh = 1;
    this.fY = false;
    this.hA = [];
    this.touches = {};
    this.hw = this.getTime();
    this.jD = 0;
    this.hM = 0;
    this.gY = null;
    this.gE = 1;
    this.gX = null;
    this.gU = 0;
    this.hy = 0;
    this.hh = 0;
    this.fV = 500;
    this.gO = null;
    this.gL = 0;
    this.gD = 0;
    this.notifications = (function() {
        var hD = {};
        var mR = hD.hasOwnProperty;
        return {
            subscribe: function(topic, listener) {
                try {
                    if (!mR.call(hD, topic)) hD[topic] = [];
                    var index = hD[topic].push(listener) - 1;
                    return {
                        remove: function() {
                            try {
                                delete hD[topic][index];
                            } catch (err) {}
                        }
                    };
                } catch (err) {
                    return err;
                }
            },
            lD: function(topic, info) {
                if (!mR.call(hD, topic)) return;
                hD[topic].forEach(function(fn) {
                    try {
                        fn(info !== undefined ? info : {});
                    } catch (err) {}
                });
            }
        };
    })();
    this.oY = (function() {
        var oJ = 0,
            nY = false,
            fG;
        fG = (function() {
            var fD = false,
                gc, oH = 0;

            function configureOmniture(config) {
                try {
                    if (++oH > 20) {
                        return;
                    }
                    if (typeof gc === 'undefined' || !gc.tl) {
                        setTimeout(configureOmniture.bind(null, config), 250);
                        return;
                    }
                    if (!config.BF.evar.BH) {
                        return;
                    }
                    gc.linkTrackVars = config.BF.evar.BH;
                    gc[config.BF.evar.BH] = window.sessionCamRecorder.sessionId();
                    gc.tl(true, 'o', 'SessionCam Session ID');
                } catch (exc) {
                    sessionCamRecorder.log('An error occurred while configuring Omniture');
                }
            };
            return {
                initialise: function(config) {
                    fD = true;
                    if (Object.prototype.hasOwnProperty.call(window, "s")) {
                        gc = window.s;
                    } else if (Object.prototype.hasOwnProperty.call(window, "s_c_il")) {
                        for (var index in window.s_c_il) {
                            var item = window.s_c_il[parseInt(index)];
                            if (item.constructor && ((item.constructor.name === "AppMeasurement") || (item.constructor.toString().indexOf('function AppMeasurement()') === 0))) {
                                gc = item;
                                break;
                            }
                        }
                    }
                    if (!config.BF.configPageName.BH || config.BF.configPageName.BH === 0 || config.BF.configPageName.BH === '0' || !gc) {
                        return;
                    }
                    window.sessioncamConfiguration = window.sessioncamConfiguration || {};
                    window.sessioncamConfiguration.SessionCamPath = "";
                    window.sessioncamConfiguration.SessionCamPageName = gc.pageName;
                },
                enable: function(config) {
                    if (!config.BF || !config.BF.evar || (sessionCamRecorder.configuration.BL !== 1) || !fD || !gc) {
                        return;
                    }
                    getSessionCamId(configureOmniture.bind(this, config), null);
                }
            };
        })();

        function getSessionCamId(oA, oy) {
            function oe() {
                try {
                    if (oJ >= 20) {
                        if (oy) oy();
                        return;
                    }
                    if (nY) {
                        if (oA) oA();
                        return;
                    }++oJ;
                    if (typeof window.sessionCamRecorder == 'undefined' || window.sessionCamRecorder.sessionId().length < 40) {
                        setTimeout(oe, 250);
                        return;
                    }
                    nY = true;
                    if (oA) oA();
                } catch (exc) {
                    sessionCamRecorder.log('An error occurred while attempting to retrieve the SessionId');
                }
            };
            oe();
        };

        function enableUniversalAnalytics(config) {
            if (!config.BF || (sessionCamRecorder.configuration.BL !== 1)) {
                return;
            }
            var oH = 0;

            function configureAnalytics() {
                var ox, pp;
                try {
                    var trackerName;
                    if (++oH > 20) {
                        return;
                    }
                    if (typeof ga === 'undefined') {
                        setTimeout(configureAnalytics, 250);
                        return;
                    }
                    var oZ = (function() {
                        var pj = Object.getOwnPropertyNames(config.BF).sort();
                        return pj.length == 2 && pj[0] == "dimension" && pj[1] == "trackerName";
                    })();
                    if (oZ) {
                        var dimension = config.BF.dimension.BH;
                        trackerName = config.BF.trackerName.BH || (function() {
                            var ox = ga && ga.getAll();
                            return ox && ox[0].get('name');
                        })();
                        ga(trackerName + '.set', dimension, sessionCamRecorder.sessionId());
                        ga(trackerName + '.send', 'event', 'SessionCam', 'SessionID', 'SessionCam Recording ID', {
                            'nonInteraction': 1
                        });
                        return;
                    }
                    for (var nD in config.BF) {
                        if (config.BF[nD].BG !== 0 || !config.BF[nD].BH || !config.BF[nD].BH.match(/dimension(?:200|[0-1]?[0-9]?[0-9])$/i)) {
                            continue;
                        }
                        if (nD != 'dimension') {
                            trackerName = nD;
                        } else {
                            ox = ga.getAll();
                            pp = 0;
                            trackerName = ox[pp].get('name');
                        }
                        ga(trackerName + '.set', config.BF[nD].BH, sessionCamRecorder.sessionId());
                        ga(trackerName + '.send', 'event', 'SessionCam', 'SessionID', 'SessionCam Recording ID', {
                            'nonInteraction': 1
                        });
                    }
                } catch (exc) {
                    sessionCamRecorder.log('An error occurred while configuring Google Universal Analytics');
                }
            };
            getSessionCamId(configureAnalytics.bind(this), null);
        };

        function enablePiwik(config) {
            if (!config.BF || !config.BF.varIndex) {
                return;
            }
            var oH = 0;

            function configurePiwik() {
                try {
                    if (++oH > 20) {
                        return;
                    }
                    if (typeof _paq === 'undefined' || !_paq.push) {
                        setTimeout(configurePiwik, 250);
                        return;
                    }
                    _paq.push(['setCustomVariable', Number.parseInt(config.BF.varIndex.BH), "SessionCamID", sessionCamRecorder.sessionId(), "visit"]);
                    _paq.push(['trackPageView']);
                } catch (exc) {
                    sessionCamRecorder.log('An error occurred while configuring Piwik');
                }
            };
            getSessionCamId(configurePiwik.bind(this), null);
        };

        function enableVisualWebOptimiser() {
            var _vis_counter = 0;
            window.sessioncamConfiguration = window.sessioncamConfiguration || {};
            window.sessioncamConfiguration.customDataObjects = window.sessioncamConfiguration.customDataObjects || [];
            window._vis_opt_queue = window._vis_opt_queue || [];
            window._vis_opt_queue.push(function() {
                try {
                    if (!_vis_counter) {
                        var _vis_data = {},
                            _vis_combination, _vis_id, _vis_l = 0;
                        for (; _vis_l < _vwo_exp_ids.length; _vis_l++) {
                            _vis_id = _vwo_exp_ids[_vis_l];
                            if (_vwo_exp[_vis_id].ready) {
                                _vis_combination = _vis_opt_readCookie('_vis_opt_exp_' + _vis_id + '_combi');
                                if (typeof(_vwo_exp[_vis_id].combination_chosen) != "undefined") {
                                    _vis_combination = _vwo_exp[_vis_id].combination_chosen;
                                }
                                if (typeof(_vwo_exp[_vis_id].comb_n[_vis_combination]) != "undefined") {
                                    _vis_data[_vis_id] = _vwo_exp[_vis_id].comb_n[_vis_combination];
                                    _vis_counter++;
                                }
                            }
                        }
                        if (_vis_counter) {
                            for (var of in _vis_data) {
                                if (_vis_data.hasOwnProperty( of )) {
                                    window.sessioncamConfiguration.customDataObjects.push({
                                        key: "Campaign-" + of ,
                                        value: _vis_data[ of ]
                                    });
                                }
                            }
                        }
                    }
                } catch (err) {
                    sessionCamRecorder.log('An error occurred while configuring Visual Web Optimizer');
                }
            });
        };

        function enableQubit() {
            var i = 0,
                ps = 0;
            window.sessioncamConfiguration = window.sessioncamConfiguration || {};
            window.sessioncamConfiguration.customDataObjects = window.sessioncamConfiguration.customDataObjects || [];

            function oo() {
                var uv = window.universal_variable,
                    qb = window.__qubit,
                    qbEtcData = (uv && uv.qb && uv.qb.qb_etc_data) || window.qb_etc_data,
                    experiment, sessionCamData, expData, ov, expName;
                if (ps >= 20) {
                    return;
                }
                if (!qbEtcData || typeof window.__qubit === 'undefined') {
                    setTimeout(oo, 200);
                    ++ps;
                    return;
                }
                for (i; i < qbEtcData.length; i++) {
                    experiment = qbEtcData[i];
                    if (experiment.s === '1' && experiment.e) {
                        sessionCamData = qb.sessionCamData && qb.sessionCamData[experiment.e];
                        expData = sessionCamData || '' + experiment.e;
                        ov = (experiment.cnt) ? 'control' : 'variation';
                        expName = sessionCamData || '' + experiment.e;
                        if (typeof expData !== 'string' && expData.expName && expData.variations) {
                            expName = expData.expName;
                            ov = expData.variations[experiment.cm] || ov;
                        }
                        window.sessioncamConfiguration.customDataObjects.push({
                            key: 'Qubit: ' + expName,
                            value: ov
                        });
                    }
                }
            };
            oo();
            window.uv_listener = window.uv_listener || [];
            window.uv_listener.push(['on', 'change:qb.qb_etc_data', function() {
                ps = 0;
                oo();
            }]);
            window.uv_listener.push(['on', 'change:qb_etc_data', function() {
                ps = 0;
                oo();
            }]);
        };

        function enableOptimizely() {
            var ps = 0;
            window.sessioncamConfiguration = window.sessioncamConfiguration || {};
            window.sessioncamConfiguration.customDataObjects = window.sessioncamConfiguration.customDataObjects || [];

            function oo() {
                if (ps >= 20) return;
                if (typeof window.optimizely === 'undefined') {
                    setTimeout(oo, 200);
                    ++ps;
                    return;
                }
                var hs = function(fh) {
                    var experiment = fh.experiment.name + '(' + fh.experiment.id + ')';
                    if (fh.experiment.name.indexOf(fh.experiment.id) !== -1) experiment = fh.experiment.id;
                    var variations = fh.variations.map(function(variation) {
                        if (!variation.name || variation.name == ('Var ' + variation.id)) return variation.id;
                        return variation.name + '(' + variation.id + ')';
                    }).join(',');
                    var fC = variations;
                    var fr = "Optimizely: " + experiment;
                    if (!window.sessioncamConfiguration) window.sessioncamConfiguration = {};
                    if (!window.sessioncamConfiguration.customDataObjects) window.sessioncamConfiguration.customDataObjects = [];
                    var item = {
                        key: fr,
                        value: fC
                    };
                    window.sessioncamConfiguration.customDataObjects.push(item);
                };
                var hq = function(eD) {
                    var campaign = eD.campaignName + '(' + eD.id + ')';
                    if (!eD.campaignName) campaign = eD.id;
                    var experiment = eD.experiment.name;
                    if (!eD.experiment.name) experiment = eD.experiment.id;
                    var variation = eD.variation.name + '(' + eD.variation.id + ')';
                    if (!eD.variation.name) variation = eD.variation.id;
                    var fC = variation;
                    var fr = "Optimizely: " + experiment;
                    if (!window.sessioncamConfiguration) window.sessioncamConfiguration = {};
                    if (!window.sessioncamConfiguration.customDataObjects) window.sessioncamConfiguration.customDataObjects = [];
                    var item = {
                        key: fr,
                        value: fC
                    };
                    window.sessioncamConfiguration.customDataObjects.push(item);
                };
                (function jE(config) {
                    var gy = function(sendExperimentData) {
                        var data = window.optimizely && window.optimizely.data;
                        var state = data && data.state;
                        var i;
                        if (state) {
                            var activeExperiments = state.activeExperiments;
                            if (state.redirectExperiment) {
                                var ej = state.redirectExperiment.experimentId;
                                var index = -1;
                                for (i = 0; i < state.activeExperiments.length; i++) {
                                    if (state.activeExperiments[i] === ej) {
                                        index = i;
                                        break;
                                    }
                                }
                                if (index === -1) activeExperiments.push(ej);
                            }
                            for (i = 0; i < activeExperiments.length; i++) {
                                var fv = {
                                    experiment: {
                                        id: activeExperiments[i],
                                        name: data.experiments[activeExperiments[i]].name
                                    },
                                    variations: []
                                };
                                var gd = state.variationIdsMap[fv.experiment.id];
                                for (var j = 0; j < gd.length; j++) {
                                    var id = gd[j];
                                    var name = data.variations[id].name;
                                    fv.variations.push({
                                        id: id,
                                        name: name
                                    });
                                }
                                sendExperimentData(fv);
                            }
                        }
                    };
                    var hH = function(sendCampaignData) {
                        var fZ = function(id) {
                            var state = window.optimizely.get && window.optimizely.get('state');
                            var ei = state.getCampaignStates({
                                isActive: true
                            });
                            var eD = ei[id];
                            sendCampaignData(eD);
                        };
                        var gZ = function() {
                            window.optimizely = window.optimizely || [];
                            window.optimizely.push({
                                type: 'addListener',
                                filter: {
                                    type: 'lifecycle',
                                    name: 'campaignDecided'
                                },
                                handler: function(event) {
                                    var id = event.data.campaign.id;
                                    fZ(id);
                                }
                            });
                        };
                        var hF = function() {
                            window.optimizely = window.optimizely || [];
                            var state = window.optimizely.get && window.optimizely.get('state');
                            if (state) {
                                var ei = state.getCampaignStates({
                                    isActive: true
                                });
                                for (var id in ei) {
                                    if ({}.hasOwnProperty.call(ei, id)) {
                                        fZ(id);
                                    }
                                }
                            }
                        };
                        hF();
                        gZ();
                    };
                    gy(config.sendExperimentData);
                    hH(config.sendCampaignData);
                }({
                    sendExperimentData: hs,
                    sendCampaignData: hq
                }));
            };
            oo();
        };

        function enableIntegration(config) {
            switch (config.BE) {
                case 0:
                    enableUniversalAnalytics(config);
                    break;
                case 1:
                    fG.enable(config);
                    break;
                case 2:
                    enablePiwik(config);
                    break;
                case 3:
                    enableVisualWebOptimiser(config);
                    break;
                case 4:
                    enableQubit(config);
                    break;
                case 5:
                    enableOptimizely(config);
                    break;
            }
        };

        function fa(config) {
            switch (config.BE) {
                case 1:
                    fG.initialise(config);
                    break;
            }
        };
        return {
            enableIntegration: enableIntegration,
            fa: fa
        };
    })();
};
if ((navigator.appVersion.toUpperCase().indexOf('MSIE 7') >= 0) || (navigator.appVersion.toUpperCase().indexOf('MSIE 8') >= 0)) {
    SessionCamRecorder.prototype.bo = function(gN, key) {
        return (function($) {
            return $.data(gN, key);
        }(window.sessionCamJQuery));
    };
    SessionCamRecorder.prototype.bg = function(gN, key, data) {
        return (function($) {
            $.data(gN, key, data);
        }(window.sessionCamJQuery));
    };
} else {
    SessionCamRecorder.prototype.bo = function(gN, key) {
        return (gN ? gN[key] : null);
    };
    SessionCamRecorder.prototype.bg = function(gN, key, data) {
        if (gN) gN[key] = data;
    };
}
SessionCamRecorder.prototype.ig = function() {
    try {
        if (document.addEventListener) {
            document.addEventListener('touchstart', sessionCamRecorder.ic, 'false');
            document.addEventListener('touchmove', sessionCamRecorder.ic, 'false');
            document.addEventListener('touchend', sessionCamRecorder.ic, 'false');
            document.addEventListener('touchcancel', sessionCamRecorder.ic, 'false');
        }
    } catch (err) {
        sessionCamRecorder.log('bindTouchEvents', err);
    }
};
SessionCamRecorder.prototype.ic = function(e) {
    try {
        switch (e.type) {
            case 'touchstart':
                sessionCamRecorder.hX(e);
                break;
            case 'touchmove':
                sessionCamRecorder.ii(e);
                break;
            case 'touchend':
            case 'touchcancel':
                sessionCamRecorder.iW(e);
                break;
        }
    } catch (err) {
        sessionCamRecorder.log('handleTouchEvent', err);
    }
};
SessionCamRecorder.prototype.iT = function(touches) {
    try {
        var i, j, fR;
        for (i = 0; i < touches.length; i++) {
            fR = false;
            for (j = 0; j < sessionCamRecorder.hA.length && !fR; j++) {
                if (sessionCamRecorder.hA[j].identifier == touches[i].identifier) {
                    sessionCamRecorder.hA[j] = touches[i];
                    fR = true;
                }
            }
            if (!fR) sessionCamRecorder.hA.push(touches[i]);
        }
    } catch (err) {
        sessionCamRecorder.log('addTouches', err);
    }
};
SessionCamRecorder.prototype.iw = function(touches, id) {
    try {
        var i;
        for (i = 0; i < touches.length; i++) {
            if (touches[i].identifier == id) {
                touches.splice(i, 1);
                return;
            }
        }
    } catch (err) {
        sessionCamRecorder.log('removeTouchByIdentifier', err);
    }
};
SessionCamRecorder.prototype.ii = function(e) {
    try {
        var data, gI;
        sessionCamRecorder.iT(e.changedTouches);
        gI = sessionCamRecorder.getTime();
        if (sessionCamRecorder.gO != null) {
            for (var i = 0; i < e.changedTouches.length; i++) {
                if (sessionCamRecorder.gO.Event.identifier == e.changedTouches[i].identifier) sessionCamRecorder.gO.mf = true;
            }
        }
        if ((gI - sessionCamRecorder.hw) > sessionCamRecorder.fd) {
            sessionCamRecorder.hw = gI;
            data = sessionCamRecorder.it(sessionCamRecorder.hA);
            sessionCamRecorder.gG(sessionCamRecorder.fo.hO, data, '', null, null, null, null, null, gI + 1);
            sessionCamRecorder.hA = [];
        }
    } catch (err) {
        sessionCamRecorder.log('sendTouchMoveEvent', err);
    }
};
SessionCamRecorder.prototype.iW = function(e) {
    return (function($) {
        try {
            var i, data, gx = false,
                hd, gA, hl;
            for (i = 0; i < e.changedTouches.length; i++) {
                sessionCamRecorder.iw(sessionCamRecorder.hA, e.changedTouches[i].identifier);
            }
            if (sessionCamRecorder.gO != null && e.touches.length === 0) {
                hd = Math.abs(sessionCamRecorder.gL - e.changedTouches[0].pageX);
                gA = Math.abs(sessionCamRecorder.gD - e.changedTouches[0].pageY);
                hl = Math.max(hd, gA);
                if (!sessionCamRecorder.gO.mf && (sessionCamRecorder.getTime() - sessionCamRecorder.gO.jl) < sessionCamRecorder.fV && hl < 20) {
                    data = sessionCamRecorder.it(sessionCamRecorder.gO.Event);
                    sessionCamRecorder.gG(sessionCamRecorder.fo.iF, sessionCamRecorder.gO.hG, sessionCamRecorder.et(sessionCamRecorder.gO.Event.target), sessionCamRecorder.hJ(sessionCamRecorder.gO.Event.target), null, null, null, null, sessionCamRecorder.gO.jl);
                    gx = true;
                } else sessionCamRecorder.gG(sessionCamRecorder.fo.iL, sessionCamRecorder.gO.hG, null, null, null, null, null, null, sessionCamRecorder.gO.jl);
            }
            sessionCamRecorder.gO = null;
            if (!gx) {
                data = sessionCamRecorder.it(e.changedTouches);
                sessionCamRecorder.gG(sessionCamRecorder.fo.iq, data);
                if (e.touches.length === 0 && !sessionCamRecorder.gY) {
                    sessionCamRecorder.jD = $(window).scrollLeft();
                    sessionCamRecorder.hM = $(window).scrollTop();
                    sessionCamRecorder.gY = setTimeout(sessionCamRecorder.jy, 10);
                }
            }
        } catch (err) {
            sessionCamRecorder.log('sendTouchEndEvent', err);
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.hX = function(e) {
    try {
        if (sessionCamRecorder.gY != null) sessionCamRecorder.im();
        clearTimeout(sessionCamRecorder.gY);
        sessionCamRecorder.gY = null;
        sessionCamRecorder.iT(e.changedTouches);
        var data = sessionCamRecorder.it(sessionCamRecorder.hA);
        if (e.touches.length == 1) {
            sessionCamRecorder.gO = {};
            sessionCamRecorder.gO.Event = e.touches[0];
            sessionCamRecorder.gO.hG = data;
            sessionCamRecorder.gO.mf = false;
            sessionCamRecorder.gO.jl = sessionCamRecorder.getTime() + 1;
            sessionCamRecorder.gL = e.touches[0].pageX;
            sessionCamRecorder.gD = e.touches[0].pageY;
        } else sessionCamRecorder.gG(sessionCamRecorder.fo.iL, data);
    } catch (err) {
        sessionCamRecorder.log('sendTouchStartEvent', err);
    }
};
SessionCamRecorder.prototype.jy = function() {
    return (function($) {
        try {
            if (sessionCamRecorder.jD == $(window).scrollLeft() && sessionCamRecorder.hM == $(window).scrollTop()) return;
            sessionCamRecorder.iz();
        } catch (err) {
            sessionCamRecorder.log('checkTouchInertia', err);
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.iz = function() {
    return (function($) {
        try {
            sessionCamRecorder.jD = $(window).scrollLeft();
            sessionCamRecorder.hM = $(window).scrollTop();
            sessionCamRecorder.gY = setTimeout(function() {
                if (sessionCamRecorder.jD == $(window).scrollLeft() && sessionCamRecorder.hM == $(window).scrollTop()) {
                    sessionCamRecorder.im();
                    return;
                }
                sessionCamRecorder.gY = setTimeout(sessionCamRecorder.iz, sessionCamRecorder.fd);
            }, sessionCamRecorder.fd);
        } catch (err) {
            sessionCamRecorder.log('measureTouchInertia', err);
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.getTouchFixData = function() {
    return (function($) {
        var leftScroll = ($('.' + sessionCamRecorder.sessioncamMainFixed).scrollLeft() ? $('.' + sessionCamRecorder.sessioncamMainFixed).scrollLeft() : $(window).scrollLeft());
        var topScroll = ($('.' + sessionCamRecorder.sessioncamMainFixed).scrollTop() ? $('.' + sessionCamRecorder.sessioncamMainFixed).scrollTop() : $(window).scrollTop());
        if (Math.round(leftScroll) < 0) {
            leftScroll = 0;
        }
        if (Math.round(topScroll) < 0) {
            topScroll = 0;
        }
        return sessionCamRecorder.ih() + '-' + leftScroll + '-' + topScroll + '-' + window.innerWidth + '-' + window.innerHeight + '-' + (sessionCamRecorder.getTime() - sessionCamRecorder.gm);
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.im = function() {
    try {
        clearTimeout(sessionCamRecorder.gY);
        sessionCamRecorder.gY = null;
        var data = sessionCamRecorder.getTouchFixData();
        sessionCamRecorder.gm = sessionCamRecorder.getTime();
        sessionCamRecorder.gG(sessionCamRecorder.fo.hZ, data);
    } catch (err) {
        sessionCamRecorder.log('sendTouchFix', err);
    }
};
SessionCamRecorder.prototype.it = function(touches) {
    try {
        var i, t, data = '';
        for (i = 0; i < touches.length; i++) {
            t = sessionCamRecorder.jF(touches[i]);
            if (parseFloat(t.clientX) < 0) t.clientX = 0;
            if (parseFloat(t.clientY) < 0) t.clientY = 0;
            if (parseFloat(touches[i].pageX) < 0) touches[i].pageX = 0;
            if (parseFloat(touches[i].pageY) < 0) touches[i].pageY = 0;
            data += touches[i].identifier + '-' + t.clientX + '-' + t.clientY + '-' + touches[i].pageX + '-' + touches[i].pageY + '-';
        }
        if (data.length > 1) data = data.substring(0, data.length - 1);
        data += '|' + sessionCamRecorder.getTouchFixData();
        sessionCamRecorder.gm = sessionCamRecorder.getTime();
        return data;
    } catch (err) {
        sessionCamRecorder.log('getTouchData', err);
    }
};
SessionCamRecorder.prototype.jF = function(gf) {
    try {
        var gH = window.pageXOffset,
            ha = window.pageYOffset,
            x = gf.clientX,
            y = gf.clientY;
        if (((gf.pageY === 0) && (Math.floor(y) > Math.floor(gf.pageY))) || ((gf.pageX === 0) && (Math.floor(x) > Math.floor(gf.pageX)))) {
            x = x - gH;
            y = y - ha;
        } else if (y < (gf.pageY - ha) || x < (gf.pageX - gH)) {
            x = gf.pageX - gH;
            y = gf.pageY - ha;
        }
        return {
            clientX: x,
            clientY: y
        };
    } catch (err) {
        sessionCamRecorder.log('fixTouch', err);
    }
};
SessionCamRecorder.prototype.ih = function() {
    try {
        var hL = screen.width;
        if (sessionCamRecorder.jk() === 'portrait') {
            if (screen.width > screen.height) hL = screen.height;
        } else {
            if (screen.width < screen.height) hL = screen.height;
        }
        return Math.round((hL / window.innerWidth) * 10000) / 10000;
    } catch (err) {
        sessionCamRecorder.log('getScale', err);
    }
};
SessionCamRecorder.prototype.ff = function() {
    try {
        var orientation = window.orientation;
        if (orientation === undefined) return;
        else {
            if ((orientation === 0 || orientation === 180) && document.documentElement.clientHeight > document.documentElement.clientWidth) {
                sessionCamRecorder.initialOrientation = "portraitFirst";
            } else if ((orientation === 90 || orientation === -90) && document.documentElement.clientWidth > document.documentElement.clientHeight) {
                sessionCamRecorder.initialOrientation = "portraitFirst";
            } else {
                sessionCamRecorder.initialOrientation = "landscapeFirst";
            }
        }
    } catch (err) {
        sessionCamRecorder.log('ff', err);
    }
};
SessionCamRecorder.prototype.jk = function() {
    try {
        var orientation = window.orientation;
        if (orientation === undefined) {
            if (document.documentElement.clientWidth > document.documentElement.clientHeight) orientation = 'landscape';
            else orientation = 'portrait';
        } else if (orientation === 0 || orientation === 180) orientation = sessionCamRecorder.initialOrientation == "portraitFirst" ? 'portrait' : 'landscape';
        else orientation = sessionCamRecorder.initialOrientation == "portraitFirst" ? 'landscape' : 'portrait';
        return orientation;
    } catch (err) {
        sessionCamRecorder.log('getOrientation', err);
    }
};
SessionCamRecorder.prototype.lN = function() {
    return (function($) {
        var mP = $(document).width() + sessionCamRecorder.lj();
        if (mP > 10000 || ((window.getComputedStyle) && (window.getComputedStyle(document.documentElement).overflowX == "hidden" || window.getComputedStyle(document.body).overflowX == "hidden"))) mP = Math.max(document.documentElement.offsetWidth, document.documentElement.clientWidth);
        return mP;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.mG = function() {
    return (function($) {
        return $(document).height() + sessionCamRecorder.ci();
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.lT = function() {
    return (function($) {
        return $(window).width() + sessionCamRecorder.lj();
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.na = function() {
    return (function($) {
        return $(window).height() + sessionCamRecorder.ci();
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.hU = function(name, value, dq) {
    var hn, expires;
    if (dq) {
        hn = new Date();
        hn.setTime(hn.getTime() + (dq * 60 * 60 * 1000));
        expires = "; expires=" + hn.toGMTString();
    } else expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
    return;
};
SessionCamRecorder.prototype.iC = function(name) {
    var i, c, dx = name + "=",
        cz = document.cookie.split(';');
    for (i = 0; i < cz.length; i++) {
        c = cz[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(dx) === 0) return c.substring(dx.length, c.length);
    }
    return null;
};
SessionCamRecorder.prototype.iM = function(name) {
    this.hU(name, "", -60);
    return;
};
SessionCamRecorder.prototype.iV = function() {
    var cookieEnabled = true;
    this.hU('SessionCamTestCookie', 'true', undefined);
    if (this.iC('SessionCamTestCookie') == null) cookieEnabled = false;
    this.iM('SessionCamTestCookie');
    return cookieEnabled;
};
SessionCamRecorder.prototype.initialise = function(config) {
    var eB, i, ln;
    try {
        sessionCamRecorder.gJ = sessionCamRecorder.getTime();
        if (config && !sessionCamRecorder.cZ) {
            sessionCamRecorder.configuration = config;
            sessionCamRecorder.eV();
            eB = sessionCamRecorder.iC('sc.Status') | 0;
            if (sessionCamRecorder.configuration.AD) {
                if (sessionCamRecorder.bp.protocol.indexOf('https') >= 0) sessionCamRecorder.hU('sc.Status', eB | 2);
                else sessionCamRecorder.hU('sc.Status', eB | 1);
                eB = sessionCamRecorder.iC('sc.Status') | 0;
            }
            if (sessionCamRecorder.configuration.I) {
                if (sessionCamRecorder.configuration.BD && sessionCamRecorder.configuration.BD.length > 0) {
                    for (i = 0, ln = sessionCamRecorder.configuration.BD.length; i < ln; ++i) {
                        try {
                            this.oY.fa(sessionCamRecorder.configuration.BD[i]);
                        } catch (err1) {
                            sessionCamRecorder.log('initialise initialiseIntegration', err1);
                        }
                    }
                }
                sessionCamRecorder.jp();
                if (sessionCamRecorder.configuration.AZ) sessionCamRecorder.nf = sessionCamRecorder.lM();
                sessionCamRecorder.ep();
                sessionCamRecorder.ml();
                sessionCamRecorder.dj();
                sessionCamRecorder.bW();
                if (('ontouchstart' in window) && sessionCamRecorder.configuration.M) {
                    sessionCamRecorder.ff();
                    var scale = sessionCamRecorder.ih();
                    sessionCamRecorder.gU = Math.round(window.innerWidth * scale);
                    sessionCamRecorder.hy = Math.round(window.innerHeight * scale);
                    sessionCamRecorder.fY = true;
                    if (!sessionCamRecorder.mo) sessionCamRecorder.ig();
                } else {
                    sessionCamRecorder.gU = sessionCamRecorder.lT();
                    sessionCamRecorder.hy = sessionCamRecorder.na();
                }
                if (!sessionCamRecorder.mo) {
                    sessionCamRecorder.cU();
                    if (window.sessioncamConfiguration && window.sessioncamConfiguration.notifications) {
                        for (i = 0; i < window.sessioncamConfiguration.notifications.length; i++) {
                            try {
                                sessionCamRecorder.subscribe(window.sessioncamConfiguration.notifications[i].event, window.sessioncamConfiguration.notifications[i].listener);
                            } catch (err1) {
                                sessionCamRecorder.log('error in window.sessioncamConfiguration.notifications[' + i + ']', err1);
                            }
                        }
                    }
                }
                sessionCamRecorder.eI();
            }
            sessionCamRecorder.aD = sessionCamRecorder.getTime();
            if (!(sessionCamRecorder.configuration.AC && (sessionCamRecorder.configuration.AC === '2'))) {
                if (sessionCamRecorder.kf()) sessionCamRecorder.insertFlash();
            }
            sessionCamRecorder.ae = sessionCamRecorder.getTime();
            if (sessionCamRecorder.configuration.I) {
                sessionCamRecorder.ey();
                setTimeout(sessionCamRecorder.cB, 100);
                sessionCamRecorder.jM();
                sessionCamRecorder.cZ = true;
                window.setTimeout(sessionCamRecorder.dz, 100);
                if (!sessionCamRecorder.mo && (sessionCamRecorder.configuration.BI || sessionCamRecorder.configuration.BJ)) sessionCamRecorder.pn();
                sessionCamRecorder.mo = true;
            }
            if (sessionCamRecorder.configuration.J) {
                try {
                    eval(sessionCamRecorder.configuration.J);
                } catch (err1) {
                    sessionCamRecorder.log('error in custom javascript', err1);
                }
            }
            window.setTimeout(sessionCamRecorder.jB, 1000);
            if (sessionCamRecorder.configuration.BD && sessionCamRecorder.configuration.BD.length > 0) {
                for (i = 0, ln = sessionCamRecorder.configuration.BD.length; i < ln; ++i) {
                    try {
                        this.oY.enableIntegration(sessionCamRecorder.configuration.BD[i]);
                    } catch (err1) {
                        sessionCamRecorder.log('initialise enableIntegration', err1);
                    }
                }
            }
        }
    } catch (err) {
        sessionCamRecorder.log('initialise', err);
    }
    return;
};
SessionCamRecorder.prototype.iQ = function() {
    try {
        var orientation = sessionCamRecorder.jk();
        if (orientation != this.gw) {
            sessionCamRecorder.gG(sessionCamRecorder.fo.io, orientation);
            this.gw = orientation;
        }
    } catch (err) {
        sessionCamRecorder.log('updateOrientation', err);
    }
};
SessionCamRecorder.prototype.log = function(message, data) {
    return (true ? null : message + data);
};
SessionCamRecorder.prototype.iY = function() {
    var fO = false,
        d;
    try {
        d = document.createElement('DIV');
        d.innerHTML = '<xyz></xyz>';
        fO = d.childNodes.length == 1;
    } catch (jK) {}
    return fO;
};
SessionCamRecorder.prototype.ml = function() {
    return (function($) {
        var hz = '',
            hv, body, eN, eL, c, children, s, scflashob, stflashob, hR, gR, hW, i, ez, eC, jf, canvas, ni, elements, F = sessionCamRecorder.getElementsToRemove();
        hv = $.browser.safari || $.browser.webkit;
        if (sessionCamRecorder.hP() && !sessionCamRecorder.iY()) html5shim(window, document);
        hz = document.documentElement.cloneNode(false);
        body = document.createElement('body');
        eN = document.body.innerHTML;
        eN = sessionCamRecorder.mz(eN);
        body.innerHTML = "SessionCam:TempString" + (hv ? eN.replace(/name='/gi, 'name=\'scName_').replace(/name="/gi, 'name="scName_') : eN);
        sessionCamRecorder.nj(body);
        body.className = document.body.className;
        $(body).attr('style', $('BODY').attr('style'));
        body.id = document.body.id;
        for (i = 0; i < document.body.attributes.length; i++) {
            if (document.body.attributes[i].name.indexOf('data-') === 0) {
                body.setAttribute(document.body.attributes[i].name, document.body.attributes[i].value);
            }
        }
        sessionCamRecorder.mE(body);
        eL = document.createElement('head');
        hz.appendChild(eL);
        children = eL.childNodes;
        for (c = 0; c < children.length; c++) {
            eL.removeChild(children[c]);
        }
        hz.appendChild(body);
        hz = $(hz);
        elements = $('a[href*="<"]', hz).add('a[href*=">"]', hz);
        for (i = 0; i < elements.length; i++) {
            $(elements[i]).attr('href', $(elements[i]).attr('href').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        }
        try {
            jf = $.browser.msie && (parseInt($.browser.version) > 8);
        } catch (err) {
            jf = false;
        }
        eC = $('input,select,textarea', hz);
        for (i = 0; i < eC.length; i++) {
            $(eC[i]).replaceWith(sessionCamRecorder.ck($(eC[i])));
            if (jf && $(eC[i]).attr('checked')) $('input,select,textarea', hz)[i].setAttribute('checked', $(eC[i]).attr('checked'));
        }
        scflashob = hz.find('#scflashob');
        if (scflashob != null) $(scflashob).replaceWith(sessionCamRecorder.eg($(scflashob)));
        stflashob = hz.find('#stflashob');
        if (stflashob != null) $(stflashob).replaceWith(sessionCamRecorder.eg($(stflashob)));
        if (F) {
            elements = $(F, hz);
            for (i = 0; i < elements.length; i++) $(elements[i]).replaceWith(sessionCamRecorder.eg($(elements[i])));
        }
        if (sessionCamRecorder.configuration.AV) {
            canvas = $('canvas');
            ni = $('canvas', hz);
            for (i = 0; i < canvas.length; i++) {
                if (i < ni.length) {
                    $(ni[i]).attr('sccanvasdata', sessionCamRecorder.mV(canvas[i]));
                }
            }
        }
        hR = sessionCamRecorder.iR(($('body'), hz)[0]);
        gR = sessionCamRecorder.iR(sessionCamRecorder.lQ());
        if (hR.length == gR.length) {
            for (s = 0; s < hR.length; s++) {
                $(hR[s]).replaceWith(sessionCamRecorder.ja(gR[s], true));
            }
        }
        sessionCamRecorder.hK = hz[0].outerHTML;
        if (hR.length != gR.length) {
            for (s = 0; s < gR.length; s++) {
                sessionCamRecorder.hK = sessionCamRecorder.hK.replace(/<body([\s\S]*?)>/i, '$&' + sessionCamRecorder.ja(gR[s]));
            }
        }
        if (sessionCamRecorder.hK.toLowerCase().indexOf('<head>') >= 0) {
            hW = '<head>' + sessionCamRecorder.nb() + sessionCamRecorder.jj(sessionCamRecorder.jh()) + '</head>';
            hW = hW.replace(/\$/g, 'SessionCamDollar');
            sessionCamRecorder.hK = sessionCamRecorder.hK.replace(/<head><\/head>/i, hW);
            sessionCamRecorder.hK = sessionCamRecorder.hK.replace(/SessionCamDollar/g, '$');
        } else sessionCamRecorder.hK = '<head>' + sessionCamRecorder.nb() + sessionCamRecorder.jj(sessionCamRecorder.jh()) + '</head>' + sessionCamRecorder.hK;
        if (hv) sessionCamRecorder.hK = sessionCamRecorder.hK.replace(/name='scName_/gi, 'name=\'').replace(/name="scName_/gi, 'name="');
        ez = $('base');
        for (i = ez.length - 1; i >= 0; i--) {
            sessionCamRecorder.hK = sessionCamRecorder.hK.replace(/<head>/, '<head>' + ez[i].outerHTML);
        }
        sessionCamRecorder.hK = sessionCamRecorder.hK.replace(/<head>/i, "<head><title>" + document.title + "</title>").replace(/SessionCamAutoPlay/gi, '');
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.jC = function() {
    var fO = '';
    if (document.doctype && document.doctype.name) fO = '<!DOCTYPE ' + document.doctype.name + (document.doctype.publicId ? ' PUBLIC "' + document.doctype.publicId + '"' : '') + (document.doctype.systemId ? '"' + document.doctype.systemId + '"' : '') + '>';
    else if (document.documentElement && document.documentElement.previousSibling && document.documentElement.previousSibling.data && (document.documentElement.previousSibling.data.toLowerCase().indexOf('doctype') >= 0)) fO = '<!' + document.documentElement.previousSibling.data + '>';
    return fO;
};
SessionCamRecorder.prototype.hP = function() {
    var fO = false,
        doctype, reg;
    doctype = sessionCamRecorder.jC();
    reg = new RegExp(/<!doctype(\s+)html(\s*)>/i);
    fO = reg.test(doctype);
    if (!fO) {
        reg = new RegExp(/<!doctype(\s+)html(\s+)system(\s+)"about:legacy-compat"(\s*)>/i);
        fO = reg.test(doctype);
    }
    if (!fO) {
        reg = new RegExp(/<!doctype(\s+)html(\s+)system(\s+)'about:legacy-compat'(\s*)>/i);
        fO = reg.test(doctype);
    }
    return fO;
};
SessionCamRecorder.prototype.sessionId = function() {
    try {
        var fO = '';
        if (this.configuration && this.configuration.I && this.configuration.S && this.configuration.T) fO = this.configuration.S + ',' + this.configuration.T;
        return fO;
    } catch (err) {
        sessionCamRecorder.log('sessionId', err);
    }
};
SessionCamRecorder.prototype.subscribe = function(event, listener) {
    return this.notifications.subscribe(event, listener).remove;
};
SessionCamRecorder.prototype.version = function() {
    return this.gg;
};
SessionCamRecorder.prototype.getTime = function() {
    return new Date().getTime();
};
SessionCamRecorder.prototype.bk = function() {
    this.hV = sessionCamRecorder.getTime();
    return;
};
SessionCamRecorder.prototype.lm = function() {
    var ay, os = '';
    try {
        if (navigator.appVersion.toUpperCase().indexOf('MSIE 7') < 0) {
            if (sessionCamRecorder.iV()) {
                if (sessionCamRecorder.nx()) {
                    sessionCamRecorder.jp(true);
                    os = sessionCamRecorder.lb;
                }
                sessionCamRecorder.jp();
                if (sessionCamRecorder.bp.protocol.indexOf('https') >= 0) ay = sessionCamRecorder.iC('sc.Status') & 2;
                else ay = sessionCamRecorder.iC('sc.Status') & 1;
                var skip_ay_check = 1;
                if (!skip_ay_check && always_load) return;
                if (!sessionCamRecorder.jG) sessionCamRecorder.jG = sessionCamRecorder.getTime();
                var fixed_ts = "1507676601439";
                // var src = this.lg + '/config.aspx?url=' + encodeURIComponent(sessionCamRecorder.lb) + '&ae=1&sse=' + sessionCamRecorder.jG + (os ? '&urlnc=' + os : '');
                var src = this.lg + '/config.aspx';
                
                var hT = sessionCamRecorder.iC('sc.ASP.NET_SESSIONID');
                //if (hT && (hT != 'undefined')) src += "&id=" + hT;
                var lq = document.createElement('script');
                lq.type = 'text/javascript';
                lq.src = src;
                document.getElementsByTagName('head')[0].appendChild(lq);
                sessionCamRecorder.bk();
            } else {
                sessionCamRecorder.log('Unable to write cookie');
            }
        }
    } catch (err) {
        sessionCamRecorder.log('requestConfig', err);
    }
};
SessionCamRecorder.prototype.getConfig = function() {
    return this.configuration;
};
SessionCamRecorder.prototype.kf = function() {
    var gF, fO = ((sessionCamRecorder.configuration.AC != null) && (sessionCamRecorder.configuration.AC === '1')) || !window.XMLHttpRequest;
    if (!fO) {
        try {
            gF = new window.XMLHttpRequest();
            if (!('withCredentials' in gF)) {
                fO = true;
                this.requestType = 'Flash';
            } else {
                gF.open('POST', this.lg + '/record.asmx/GetPageId', true);
                this.requestType = 'XMLHttpRequest';
            }
        } catch (err) {
            fO = true;
            this.requestType = 'Flash';
        }
    }
    return (fO ? true : false);
};
SessionCamRecorder.prototype.ep = function(fU) {
    if ((sessionCamRecorder.configuration && sessionCamRecorder.configuration.G) || ((window.location.protocol.toLowerCase().indexOf('https') >= 0) && (navigator.appName.toLowerCase().indexOf('microsoft internet explorer') >= 0))) sessionCamRecorder.af(fU);
};
SessionCamRecorder.prototype.af = function(fU) {
    return (function($) {
        try {
            if (fU == null) fU = $('body');
            sessionCamRecorder.fI(fU);
            var i, fQ = $('[style*="url"]', fU);
            if ((fQ.length === 0) && (fU.html().indexOf('url(') >= 0)) fQ = $('[style]', fU);
            for (i = 0; i < fQ.length; i++) {
                sessionCamRecorder.fI($(fQ[i]));
            }
            fQ = $('[background]', fU);
            for (i = 0; i < fQ.length; i++) {
                sessionCamRecorder.fI($(fQ[i]));
            }
        } catch (err) {
            sessionCamRecorder.log('removeMixedModeProblem', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.fI = function(fU) {
    var style, fz, reg, url, background;
    style = fU.attr('style');
    if (style) {
        fz = style.replace(/[\"\']/g, '');
        reg = new RegExp(/url\((.*?)\)/i);
        url = reg.exec(fz);
        if (url && url[1] && (url[1].indexOf('#') !== 0)) fU.attr('style', fz.replace(url[1], this.aX(url[1])));
    }
    background = fU.attr('background');
    if (background) fU.attr('background', this.aX(background));
    return;
};
SessionCamRecorder.prototype.eO = function(gN) {
    var name, iZ;
    switch (sessionCamRecorder.hJ(gN)) {
        case 'input':
        case 'select':
        case 'textarea':
            if (gN && gN.getAttribute) {
                name = gN.getAttribute('name');
                iZ = gN.getAttribute(sessionCamRecorder.sessioncamName);
                return iZ ? iZ.replace(/[\"\']/g, '') : (name ? name.replace(/[\"\']/g, '') : '');
            } else return '';
            break;
        default:
            return sessionCamRecorder.et(gN);
    }
};
SessionCamRecorder.prototype.R = function(gN) {
    return gN.scId;
};
SessionCamRecorder.prototype.et = function(gN, fc) {
    var id = (fc ? 'scDummyId' : sessionCamRecorder.bo(gN, 'scElementId') || (gN && gN.getAttribute ? gN.getAttribute('id') : '')),
        scId = sessionCamRecorder.R(gN);
    return 'xp{' + sessionCamRecorder.dU(gN) + '}' + (id && id.replace ? 'id{' + id.replace(/[\"\']/g, '') + '}' : '') + (scId ? 'scId{' + scId + '}' : '');
};
SessionCamRecorder.prototype.dU = function(gN) {
    return (function($) {
        var id, eQ = '';
        try {
            for (undefined; gN && gN.nodeType == 1; gN = gN.parentNode) {
                id = $(gN.parentNode).children(gN.tagName).index(gN);
                if (id > 0) id = ':' + id;
                else id = '';
                eQ = '/' + gN.tagName.toLowerCase() + id + eQ;
            }
        } catch (err) {
            eQ = '';
        }
        return eQ.replace('/html/body', '');
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.iv = function(gN) {
    var fO = null;
    while (!fO && gN.previousSibling) {
        if ((gN.previousSibling.nodeType == 1) && (sessionCamRecorder.hJ(gN.previousSibling) == 'style' || !sessionCamRecorder.kJ(gN.previousSibling))) fO = gN.previousSibling;
        else gN = gN.previousSibling;
    }
    return fO;
};
SessionCamRecorder.prototype.jw = function(gN) {
    var fO = gN.scId;
    if (!fO) {
        gN.scId = this.eY++;
        fO = gN.scId;
    }
    return fO;
};
SessionCamRecorder.prototype.eG = function(scId, elements) {
    var fO = null,
        i = 0;
    while ((fO == null) && (i < elements.length)) {
        if (sessionCamRecorder.R(elements[i]) == scId) fO = elements[i];
        i++;
    }
    return fO;
};
SessionCamRecorder.prototype.eg = function(fU) {
    return fU.length ? '<' + this.hJ(fU[0]) + ' style="display: none" />' : '';
};
SessionCamRecorder.prototype.getLanguage = function(fU) {
    var lang;
    var e = fU[0] || document.documentElement;
    while (e) {
        lang = (e.getAttribute ? e.getAttribute('lang') : null);
        if (lang && !lang.nodeType) break;
        else e = e.parentNode;
    }
    if (!lang) {
        var meta = document.getElementsByTagName('meta');
        for (var i = 0; i < meta.length; i++) {
            if (/(?:dc\.)?language/i.test(meta[i].name) || /content-language/i.test(meta[i].httpEquiv)) {
                lang = meta[i].content;
                break;
            }
        }
    }
    return lang || '';
};
SessionCamRecorder.prototype.mQ = function() {
    return /translated-(?:ltr|rtl)/i.test(document.documentElement.className);
};
SessionCamRecorder.prototype.dP = function(fU, group) {
    return (function($) {
        try {
            var result = {};
            if (!fU || !fU[0]) return '';
            result.i = fU[0].getAttribute(sessionCamRecorder.sessioncamName);
            result.s = 3;
            if (sessionCamRecorder.jW(result.i)) {
                result.i = fU[0].getAttribute('name');
                result.s = 2;
            }
            if (sessionCamRecorder.jW(result.i)) {
                result.i = fU[0].getAttribute('id');
                result.s = 1;
            }
            var ju = document.getElementsByName(fU[0].getAttribute('name'));
            for (var i = ju.length - 1; i >= 0; i--) {
                if (ju[i].getAttribute('name') != fU[0].getAttribute('name')) {
                    ju.splice(i, 1);
                }
            }
            var type = fU[0].getAttribute('type');
            var label, lang;
            if (type && ju.length > 1 && group && (type.toLowerCase() == 'radio' || type.toLowerCase() == 'checkbox')) {
                var fieldset = ju[0];
                while (fieldset) {
                    if (fieldset.tagName && fieldset.tagName.toLowerCase() == 'fieldset') break;
                    else fieldset = fieldset.parentNode;
                }
                if (fieldset) {
                    var legend = fieldset.getElementsByTagName('legend')[0];
                    if (legend && fieldset.getElementsByTagName('input').length == ju.length) {
                        label = legend.innerHTML;
                        lang = sessionCamRecorder.getLanguage($(legend));
                    }
                }
            } else {
                if (ju.length > 1) {
                    result.v = sessionCamRecorder.fW(fU[0].getAttribute('value')).replace(/[\"\']/g, '');
                    if (sessionCamRecorder.jW(result.v) || (result.v == 'on')) result.v = 'true';
                    var lH = ju[0].getAttribute(sessionCamRecorder.sessioncamName);
                    if (lH) result.i = lH;
                }
                var mu = sessionCamRecorder.lP(fU);
                if (mu) {
                    label = sessionCamRecorder.mB(mu).replace(/[\"\']/g, '');
                    lang = sessionCamRecorder.getLanguage(mu);
                }
            }
            if (label) {
                if (label.length > 100) result.l = label.substr(0, 100);
                else result.l = label;
                if (sessionCamRecorder.jW(lang)) lang = sessionCamRecorder.getLanguage(fU);
                result.c = lang;
            }
            if (sessionCamRecorder.mQ()) result.t = 'true';
            if (sessionCamRecorder.jW(result.l) && sessionCamRecorder.jW(result.v) && sessionCamRecorder.jW(result.c) && sessionCamRecorder.jW(result.s) && sessionCamRecorder.jW(result.t)) return result.i;
            else return $.stringifyJSON(result);
        } catch (err) {
            sessionCamRecorder.log('getFieldName', err);
        }
        return '';
    })(window.sessionCamJQuery);
};
SessionCamRecorder.prototype.ij = function(fU) {
    return sessionCamRecorder.dP(fU, true);
};
SessionCamRecorder.prototype.lP = function(fU) {
    return (function($) {
        if (!fU || !fU[0]) return null;
        var id = fU[0].getAttribute('id');
        if (id) {
            var label = $('label[for="' + id.replace(/\./g, '\\.').replace(/:/g, '\\:') + '"]');
            if (label && label.length > 0) return label;
        }
        return null;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.mB = function(fU) {
    return (function($) {
        return $.trim(fU.text()).replace(/'/g, '&apos;').replace(/"/g, '&quot;');
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.jW = function(data) {
    return (data === null) || (data === undefined) || (data === '');
};
SessionCamRecorder.prototype.fW = function(data) {
    return (data == null ? '' : data);
};
SessionCamRecorder.prototype.hJ = function(gN) {
    var fO = '';
    try {
        if (gN && gN.nodeName) fO = gN.nodeName.toLowerCase();
    } catch (jK) {}
    return fO;
};
SessionCamRecorder.prototype.eI = function() {
    return (function($) {
        try {
            var ht, i, fQ, val, scChildIds = [],
                head, body = sessionCamRecorder.lQ();
            if ((sessionCamRecorder.configuration != null) && (sessionCamRecorder.configuration.D)) {
                ht = $('body');
                if ((sessionCamRecorder.configuration.C != null) && (sessionCamRecorder.configuration.C.length > 0)) ht = $('#' + sessionCamRecorder.configuration.C);
                if (!ht || ht.length < 1) ht = $('body');
                sessionCamRecorder.kC(ht, 0);
            }
            fQ = $(sessionCamRecorder.kX + ', textarea, ' + sessionCamRecorder.jZ);
            for (i = 0; i < fQ.length; i++) {
                sessionCamRecorder.bg(fQ[i], 'scVal', $(fQ[i]).val());
            }
            fQ = $('select');
            for (i = 0; i < fQ.length; i++) {
                val = $(fQ[i]).val();
                if ($.isArray(val)) val = val.join();
                sessionCamRecorder.bg(fQ[i], 'scVal', val);
            }
            fQ = $('input[type=checkbox]');
            for (i = 0; i < fQ.length; i++) {
                sessionCamRecorder.bg(fQ[i], 'scVal', $(fQ[i]).attr('checked'));
            }
            fQ = $('input[type=radio]');
            for (i = 0; i < fQ.length; i++) {
                sessionCamRecorder.bg(fQ[i], 'scVal', $(fQ[i]).attr('checked'));
            }
            head = sessionCamRecorder.jh();
            if (head) {
                fQ = sessionCamRecorder.iP(head);
                for (i = 0; i < fQ.length; i++) {
                    scChildIds.push(sessionCamRecorder.jw(fQ[i]));
                    sessionCamRecorder.bg(fQ[i], 'scOuterHTML', sessionCamRecorder.ja(fQ[i]));
                }
                sessionCamRecorder.bg(head, 'scChildIds', scChildIds);
                sessionCamRecorder.bg(head, 'scInnerHTML', sessionCamRecorder.jj());
            }
            scChildIds = [];
            fQ = sessionCamRecorder.iR(body, true);
            for (i = 0; i < fQ.length; i++) {
                scChildIds.push(sessionCamRecorder.jw(fQ[i]));
                sessionCamRecorder.bg(fQ[i], 'scOuterHTML', sessionCamRecorder.ja(fQ[i]));
            }
            sessionCamRecorder.bg($('body')[0], 'scStyleIds', scChildIds);
            sessionCamRecorder.bg(document.documentElement, 'scClassName', document.documentElement.className);
            sessionCamRecorder.bg(document.documentElement, 'scStyle', sessionCamRecorder.fW($(document.documentElement).attr('style')));
        } catch (err) {
            sessionCamRecorder.log('setupDOMMonitoring', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.kJ = function(gN) {
    return (function($) {
        var fO = true,
            F = sessionCamRecorder.getElementsToRemove();
        if (gN && gN.nodeName) {
            try {
                switch (gN.nodeName.toLowerCase()) {
                    case 'object':
                    case 'script':
                    case '#comment':
                    case '#text':
                    case 'link':
                    case 'style':
                        break;
                    case 'esi:include':
                    case 'svg':
                        fO = false;
                        break;
                    default:
                        fO = ((gN.nodeName.indexOf(':') >= 0) || (gN.id == 'stElement') || $(gN).hasClass(sessionCamRecorder.sessionCamIgnoreChanges) || (F && $(gN).is(F)));
                        break;
                }
            } catch (err) {
                sessionCamRecorder.log('error in ignoreElement', err);
                fO = true;
            }
        }
        return fO;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.mZ = function(gN) {
    return (function($) {
        var fO, type;
        if ($(gN).is(':visible')) fO = true;
        else {
            if ($(gN).is('INPUT')) {
                type = $(gN).attr('type').toLowerCase();
                if (type === 'hidden') return false;
            }
            if (gN.currentStyle) fO = gN.currentStyle.display != 'none';
            else if (window.getComputedStyle) fO = window.getComputedStyle(gN, null) && (window.getComputedStyle(gN, null).display != 'none');
            else fO = true;
        }
        return fO;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.dT = function(fU) {
    var fO = fU.is('TEXTAREA'),
        type;
    if (!fO && fU.is('INPUT')) {
        type = fU.attr('type');
        if (type) {
            switch (type.toLowerCase()) {
                case 'text':
                case 'email':
                case 'url':
                case 'search':
                case 'tel':
                    fO = true;
                    break;
            }
        }
    }
    return fO;
};
SessionCamRecorder.prototype.mg = function(fU) {
    var fO = false,
        type;
    if (fU.is('INPUT')) {
        type = fU.attr('type');
        if (type) {
            switch (type.toLowerCase()) {
                case 'number':
                case 'date':
                case 'week':
                case 'month':
                case 'time':
                case 'datetime':
                case 'datetime-local':
                case 'color':
                case 'range':
                    fO = true;
                    break;
            }
        }
    }
    return fO;
};
SessionCamRecorder.prototype.ds = function() {
    var fO = 7;
    if (this.configuration != null && this.configuration.B != null) fO = this.configuration.B;
    return fO;
};
SessionCamRecorder.prototype.kC = function(fU, fN) {
    return (function($) {
        var jO, c, cY, child, en, type, val;
        if (fU[0] && !sessionCamRecorder.kJ(fU[0])) {
            try {
                jO = sessionCamRecorder.mZ(fU[0]);
                sessionCamRecorder.bg(fU[0], 'scVisible', jO);
                if (jO) {
                    cY = [];
                    sessionCamRecorder.bg(fU[0], 'scChildIds', []);
                    if (!sessionCamRecorder.bo(fU[0], 'scChildIds')) return;
                    if (sessionCamRecorder.hJ(fU[0]) != 'select') {
                        en = fU[0].childNodes ? fU[0].childNodes.length : 0;
                        for (c = 0; c < en; c++) {
                            child = fU[0].childNodes[c];
                            if (!sessionCamRecorder.kJ(child)) {
                                sessionCamRecorder.bo(fU[0], 'scChildIds').push(sessionCamRecorder.jw(child));
                                if (fN < sessionCamRecorder.ds()) cY.push(child);
                                sessionCamRecorder.cL($(child));
                            }
                        }
                    }
                    sessionCamRecorder.fK(fU);
                    sessionCamRecorder.bg(fU[0], 'scInnerHtml', sessionCamRecorder.fW(fU.html()));
                    sessionCamRecorder.bg(fU[0], 'scClass', sessionCamRecorder.fW(fU[0].className));
                    sessionCamRecorder.bg(fU[0], 'scElementId', sessionCamRecorder.fW(fU.attr('id')));
                    sessionCamRecorder.bg(fU[0], 'scTitle', sessionCamRecorder.fW(fU.attr('title')));
                    sessionCamRecorder.bg(fU[0], 'scStyle', sessionCamRecorder.fW(fU.attr('style')));
                    if (fU.is('IMG')) {
                        sessionCamRecorder.bg(fU[0], 'scSrc', sessionCamRecorder.fW(fU.attr('src')));
                        sessionCamRecorder.bg(fU[0], 'scAlt', sessionCamRecorder.fW(fU.attr('alt')));
                        sessionCamRecorder.bg(fU[0], 'scSrcSet', sessionCamRecorder.fW(fU.attr('srcset')));
                    }
                    if (fU.is('SOURCE')) {
                        sessionCamRecorder.bg(fU[0], 'scSrcSet', sessionCamRecorder.fW(fU.attr('srcset')));
                    }
                    if (fU.is('SELECT') || sessionCamRecorder.dT(fU) || sessionCamRecorder.mg(fU)) {
                        val = fU.val();
                        if ($.isArray(val)) val = val.join();
                        sessionCamRecorder.bg(fU[0], 'scVal', val);
                    } else if (fU.is('INPUT')) {
                        type = fU.attr('type');
                        if (type) type = type.toLowerCase();
                        if ((type === 'checkbox') || (type === 'radio')) sessionCamRecorder.bg(fU[0], 'scVal', fU.attr('checked'));
                        if ((type === 'submit') || (type === 'button')) {
                            sessionCamRecorder.bg(fU[0], 'scVal', fU.val());
                            sessionCamRecorder.bg(fU[0], 'scDisabled', fU.attr('disabled'));
                        }
                    }
                    sessionCamRecorder.ob(fU[0]);
                    for (c = 0; c < cY.length; c++) {
                        sessionCamRecorder.kC($(cY[c]), fN + 1);
                    }
                }
            } catch (e) {
                sessionCamRecorder.log('error in initDOMMonitoring', e);
            }
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.ct = function(fU) {
    var hg = '',
        kK;
    if (fU[0]) {
        kK = fU[0].previousSibling;
        while (kK && this.kJ(kK)) {
            if (kK.nodeType == 3) hg = kK.data + hg;
            else if (kK.nodeType == 8) {
                try { //-->
                    if (kK.nodeValue.indexOf('SessionCam:Hide') >= 0) hg = kK.nodeValue.replace(/\/SessionCam:Hide/g, 'SessionCam:Temp').replace(/SessionCam:Hide/g, this.ll).replace(/SessionCam:Temp/g, this.ld) + hg;
                } catch (jK) {}
            }
            kK = kK.previousSibling;
        }
    }
    return hg;
};
SessionCamRecorder.prototype.cL = function(fU) {
    sessionCamRecorder.bg(fU[0], 'scTextBefore', this.fW(this.ct(fU)));
    return;
};
SessionCamRecorder.prototype.dD = function(fU, hg) {
    var fO = false;
    if (this.fW(hg) != sessionCamRecorder.bo(fU[0], 'scTextBefore')) {
        fO = true;
        this.cL(fU);
    }
    return fO;
};
SessionCamRecorder.prototype.cQ = function(fU) {
    var jm = '',
        child;
    if (fU[0]) {
        child = fU[0].lastChild;
        while (child && this.kJ(child)) {
            if (child.nodeType == 3) jm = child.data + jm;
            else if (child.nodeType == 8) {
                try {
                    if (child.nodeValue.indexOf('SessionCam:Hide') >= 0) jm = child.nodeValue.replace(/\/SessionCam:Hide/g, 'SessionCam:Temp').replace(/SessionCam:Hide/g, this.ll).replace(/SessionCam:Temp/g, this.ld) + jm;
                } catch (jK) {}
            }
            child = child.previousSibling;
        }
    }
    return jm;
};
SessionCamRecorder.prototype.fK = function(fU) {
    sessionCamRecorder.bg(fU[0], 'scTextAtEnd', this.fW(this.cQ(fU)));
    return;
};
SessionCamRecorder.prototype.fe = function(fU, jm, fN) {
    var fO = false;
    if (this.fW(jm) != sessionCamRecorder.bo(fU[0], 'scTextAtEnd')) {
        fO = true;
        this.gG(this.fo.jz, sessionCamRecorder.ms(jm, fU[0]), this.et(fU[0]), this.hJ(fU[0]), null, null, fU[0], fN);
        sessionCamRecorder.bg(fU[0], 'scTextAtEnd', this.fW(jm));
    }
    return fO;
};
SessionCamRecorder.prototype.dc = function(fU) {
    var jR = new sessionCamRecorder.iO(),
        nextSibling;
    if (fU[0]) {
        nextSibling = fU[0].nextSibling;
        while (nextSibling && this.kJ(nextSibling)) {
            if (nextSibling.nodeType == 3) jR.append(nextSibling.data);
            else if (nextSibling.nodeType == 8) {
                try {
                    if (nextSibling.nodeValue.indexOf('SessionCam:Hide') >= 0) jR.append(nextSibling.nodeValue.replace(/\/SessionCam:Hide/g, 'SessionCam:Temp').replace(/SessionCam:Hide/g, this.ll).replace(/SessionCam:Temp/g, this.ld));
                } catch (jK) {}
            }
            if (nextSibling.nodeType == 1) nextSibling = null;
            else nextSibling = nextSibling.nextSibling;
        }
    }
    return jR.toString();
};
SessionCamRecorder.prototype.df = function(fU, fN) {
    return (function($) {
        var fO = false,
            mw = true,
            nodeName, innerHTML, eK, jQ, fX, pq, md, cW, cF, dK, de, eVal, eDisabled, nq, type, val;
        nodeName = sessionCamRecorder.hJ(fU[0]);
        if (nodeName == 'select') {
            val = fU.val();
            if ($.isArray(val)) val = val.join();
            if (sessionCamRecorder.bo(fU[0], 'scVal') != val) {
                sessionCamRecorder.bg(fU[0], 'scVal', val);
                if (!((sessionCamRecorder.configuration != null && !sessionCamRecorder.configuration.A) || sessionCamRecorder.eb(fU[0]))) {
                    sessionCamRecorder.gG(sessionCamRecorder.fo.ji, sessionCamRecorder.kN(fU, true), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                    mw = false;
                }
            }
        } else if (nodeName != 'textarea') {
            innerHTML = sessionCamRecorder.fW(fU.html());
            eK = sessionCamRecorder.bo(fU[0], 'scInnerHtml');
            if (innerHTML != eK) {
                sessionCamRecorder.bg(fU[0], 'scInnerHtml', innerHTML);
                if ((fU.children().length === 0) || (fN == sessionCamRecorder.ds())) {
                    sessionCamRecorder.ep(fU);
                    sessionCamRecorder.gG(sessionCamRecorder.fo.ji, sessionCamRecorder.kN(fU, true), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                    sessionCamRecorder.aK(sessionCamRecorder.getTime() + 1, fU);
                    mw = false;
                } else fO = true;
            }
        }
        if (mw) {
            jQ = sessionCamRecorder.fW(fU[0].className);
            fX = sessionCamRecorder.bo(fU[0], 'scClass');
            if (jQ != fX) {
                if (nodeName == 'select') sessionCamRecorder.gG(sessionCamRecorder.fo.ji, sessionCamRecorder.kN(fU, true), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                else sessionCamRecorder.gG(sessionCamRecorder.fo.jA, fU[0].className ? sessionCamRecorder.bo(fU[0], 'scHover') === 1 ? fU[0].className + ' sessionCamHover' : fU[0].className : (sessionCamRecorder.bo(fU[0], 'scHover') === 1 ? 'sessionCamHover' : ''), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                sessionCamRecorder.bg(fU[0], 'scClass', jQ);
            }
            pq = sessionCamRecorder.fW(fU.attr('id'));
            md = sessionCamRecorder.bo(fU[0], 'scElementId');
            if (pq != md) {
                if (nodeName == 'select') sessionCamRecorder.gG(sessionCamRecorder.fo.ji, sessionCamRecorder.kN(fU, true), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                else sessionCamRecorder.gG(sessionCamRecorder.fo.mx, fU.attr('id'), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                sessionCamRecorder.bg(fU[0], 'scElementId', pq);
            }
            cW = sessionCamRecorder.fW(fU.attr('title'));
            if (cW != sessionCamRecorder.bo(fU[0], 'scTitle')) {
                if (nodeName == 'select') sessionCamRecorder.gG(sessionCamRecorder.fo.ji, sessionCamRecorder.kN(fU, true), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                else sessionCamRecorder.gG(sessionCamRecorder.fo.js, fU.attr('title'), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                sessionCamRecorder.bg(fU[0], 'scTitle', cW);
            }
            cF = sessionCamRecorder.fW(fU.attr('style'));
            if (cF != sessionCamRecorder.bo(fU[0], 'scStyle')) {
                if (nodeName == 'select') sessionCamRecorder.gG(sessionCamRecorder.fo.ji, sessionCamRecorder.kN(fU, true), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                else {
                    sessionCamRecorder.ep(fU.parent());
                    sessionCamRecorder.gG(sessionCamRecorder.fo.ib, cF.replace(/[\"\']/g, ''), sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                }
                sessionCamRecorder.bg(fU[0], 'scStyle', cF);
            }
            if (fU.is('IMG')) {
                dK = sessionCamRecorder.fW(fU.attr('src'));
                if (dK != sessionCamRecorder.bo(fU[0], 'scSrc')) {
                    sessionCamRecorder.gG(sessionCamRecorder.fo.iX, dK, sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                    sessionCamRecorder.bg(fU[0], 'scSrc', dK);
                }
                de = sessionCamRecorder.fW(fU.attr('alt'));
                if (de != sessionCamRecorder.bo(fU[0], 'scAlt')) {
                    sessionCamRecorder.gG(sessionCamRecorder.fo.iB, de, sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                    sessionCamRecorder.bg(fU[0], 'scAlt', de);
                }
                nq = sessionCamRecorder.fW(fU.attr('srcset'));
                if (nq != sessionCamRecorder.bo(fU[0], 'scSrcSet')) {
                    sessionCamRecorder.gG(sessionCamRecorder.fo.lO, nq, sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                    sessionCamRecorder.bg(fU[0], 'scSrcSet', nq);
                }
            }
            if (fU.is('SOURCE')) {
                nq = sessionCamRecorder.fW(fU.attr('srcset'));
                if (nq != sessionCamRecorder.bo(fU[0], 'scSrcSet')) {
                    sessionCamRecorder.gG(sessionCamRecorder.fo.lO, nq, sessionCamRecorder.et(fU[0]), nodeName, null, null, fU[0], fN);
                    sessionCamRecorder.bg(fU[0], 'scSrcSet', nq);
                }
            }
            if (fU.is('INPUT')) {
                type = fU.attr('type');
                if (type) type = type.toLowerCase();
                if ((type === 'submit') || (type === 'button')) {
                    eVal = fU.val();
                    if (eVal != sessionCamRecorder.bo(fU[0], 'scVal')) {
                        sessionCamRecorder.gG(sessionCamRecorder.fo.iJ, eVal, sessionCamRecorder.dP($(fU[0])), nodeName, sessionCamRecorder.eO(fU[0]), null, fU[0], fN);
                        sessionCamRecorder.bg(fU[0], 'scVal', eVal);
                    }
                    eDisabled = fU.attr('disabled');
                    if (eDisabled != sessionCamRecorder.bo(fU[0], 'scDisabled')) {
                        sessionCamRecorder.gG(sessionCamRecorder.fo.DisabledChange, eDisabled, sessionCamRecorder.dP($(fU[0])), nodeName, sessionCamRecorder.eO(fU[0]), null, fU[0], fN);
                        sessionCamRecorder.bg(fU[0], 'scDisabled', eDisabled);
                    }
                }
            }
        }
        return fO;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.nj = function(gN) {
    return (function($) {
        var i, objects, jU;
        objects = $('script', gN);
        for (i = 0; i < objects.length; i++) {
            try {
                objects[i].parentNode.replaceChild(document.createElement('SCRIPT'), objects[i]);
            } catch (err) {}
        }
        objects = $('object', gN);
        for (i = 0; i < objects.length; i++) {
            try {
                jU = document.createElement('OBJECT');
                sessionCamRecorder.nL(objects[i], jU, ['data']);
                objects[i].parentNode.replaceChild(jU, objects[i]);
            } catch (err) {}
        }
        objects = $('video', gN);
        for (i = 0; i < objects.length; i++) {
            try {
                jU = document.createElement('VIDEO');
                sessionCamRecorder.nL(objects[i], jU, ['src']);
                objects[i].parentNode.replaceChild(jU, objects[i]);
            } catch (err) {}
        }
        objects = $('audio', gN);
        for (i = 0; i < objects.length; i++) {
            try {
                jU = document.createElement('AUDIO');
                try {
                    jU.innerHTML = objects[i].innerHTML;
                } catch (err1) {}
                sessionCamRecorder.nL(objects[i], jU, ['src']);
                objects[i].parentNode.replaceChild(jU, objects[i]);
            } catch (err) {}
        }
        objects = $('[action]', gN);
        for (i = 0; i < objects.length; i++) {
            try {
                objects[i].setAttribute('action', objects[i].getAttribute('action').replace(/[<>]|(&lt;)|(&gt;)/g, '...'));
            } catch (err) {}
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.nL = function(lX, nr, mF) {
    return (function($) {
        try {
            var attributes = lX.attributes;
            for (var i = 0; i < attributes.length; i++) {
                if (attributes[i].specified === true) {
                    if (!$.isArray(mF) || ($.inArray(attributes[i].nodeName.toLowerCase(), mF) < 0)) {
                        try {
                            $(nr).attr(attributes[i].nodeName, attributes[i].nodeValue);
                        } catch (err1) {}
                    }
                }
            }
        } catch (err) {}
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.mz = function(s) {
    return (function($) {
        s = s || '';
        s = s.replace(/\n/g, "SessionCam:NewLine").replace(/\r/g, "").replace(/(autoplay)/gi, "SessionCamAutoPlay$1");
        if ($.browser.msie && (parseInt($.browser.version) < 10)) s = s.replace(/<!-->/g, '');
        s = s.replace(/(<img[^>]+?src)([^>]+?)([\'\"]{1})([^>]*?captcha[^>]*?)(\3)([^>]*?)(>)/gi, '$1$2$3$5$6$7');
        s = s.replace(/(<img[^>]+?src)([^>]+?)([\'\"]{1})([^>]*?cryptograph[^>]*?)(\3)([^>]*?)(>)/gi, '$1$2$3$5$6$7');
        s = s.replace(/(<iframe[\S|\s]+?)srcdoc=([\'|\"])([\S|\s]*?)\2([\S\s]*?)>([\S|\s]*?)(<\/iframe>)/gi, '$1$4>$6');
        s = s.replace(/SessionCam:NewLine/g, "\n");
        return s;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.ab = function(s) {
    if (s.indexOf && ((s.indexOf('<S') >= 0) || (s.indexOf('<s') >= 0))) {
        s = s.replace(/\n/g, "SessionCam:NewLine").replace(/\r/g, "");
        s = s.replace(/<script(.*?)<\/script>/gi, '');
        s = s.replace(/<script(.*?)>/gi, '').replace(/<\/script>/gi, '');
        s = s.replace(/SessionCam:NewLine/g, "\n");
    }
    return s;
};
SessionCamRecorder.prototype.ob = function(gN) {
    return (function($) {
        var children, c;
        if ($(gN).hasClass(sessionCamRecorder.aj)) sessionCamRecorder.aN(gN);
        children = $(sessionCamRecorder.aj, $(gN));
        for (c = 0; c < children.length; c++) {
            sessionCamRecorder.aN(children[c]);
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.aN = function(gN) {
    return (function($) {
        if (sessionCamRecorder.bo(gN, 'scScrollMonitor') != 1) {
            $(gN).scroll(function() {
                sessionCamRecorder.bw(this);
            });
            sessionCamRecorder.bg(gN, 'scScrollMonitor', 1);
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.bw = function(gN) {
    return (function($) {
        if ($.inArray(gN, sessionCamRecorder.bv) < 0) {
            sessionCamRecorder.bv.push(gN);
            if (sessionCamRecorder.bF == null) sessionCamRecorder.bF = window.setTimeout(sessionCamRecorder.eh, sessionCamRecorder.es);
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.bq = function(gN) {
    return (function($) {
        var i, children = $(sessionCamRecorder.aj, $(gN));
        if ($(gN).hasClass(sessionCamRecorder.aj)) sessionCamRecorder.bw(gN);
        for (i = 0; i < children.length; i++) sessionCamRecorder.bw(children[i]);
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.eh = function() {
    try {
        sessionCamRecorder.bF = null;
        while (sessionCamRecorder.bv.length > 0) {
            sessionCamRecorder.bM(sessionCamRecorder.bv[0]);
            sessionCamRecorder.bv.splice(0, 1);
        }
    } catch (err) {
        if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in processScrollQueue', err);
    }
};
SessionCamRecorder.prototype.bM = function(gN) {
    sessionCamRecorder.gG(sessionCamRecorder.fo.ElementScroll, gN.scrollLeft + ',' + gN.scrollTop, sessionCamRecorder.et(gN), sessionCamRecorder.hJ(gN));
};
SessionCamRecorder.prototype.kN = function(fU, hi) {
    return (function($) {
        var nodeName, id, style, jH, src, alt, title, href, hidden, name, value, scId, width, height, color, face, size, hv, kn, gp, canvas = '',
            i, j, eC, fJ, eR, fL, attributeNames, otherAttributes, attrName, elements, F = sessionCamRecorder.getElementsToRemove();
        if (!fU[0]) return '';
        nodeName = sessionCamRecorder.hJ(fU[0]);
        if ((nodeName == 'input') || (nodeName == 'select') || (nodeName == 'textarea')) {
            if (hi && (sessionCamRecorder.dT(fU) || sessionCamRecorder.mg(fU))) sessionCamRecorder.bg(fU[0], 'scVal', fU.val());
            return sessionCamRecorder.ck(fU);
        }
        attributeNames = [];
        id = fU.attr('id') ? ' id="' + fU.attr('id') + '" ' : '';
        style = fU.attr('style') ? ' style="' + fU.attr('style').replace(/[\"\']/g, '') + '" ' : '';
        jH = fU[0].className ? ' class="' + (sessionCamRecorder.bo(fU[0], 'scHover') === 1 ? fU[0].className + ' sessionCamHover' : fU[0].className) + '" ' : (sessionCamRecorder.bo(fU[0], 'scHover') === 1 ? ' class="sessionCamHover" ' : '');
        src = fU.attr('src') ? ' src="' + fU.attr('src') + '" ' : '';
        alt = fU.attr('alt') ? ' alt="' + fU.attr('alt') + '" ' : '';
        title = fU.attr('title') ? ' title="' + fU.attr('title') + '" ' : '';
        href = fU.attr('href') ? ' href="' + fU.attr('href').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '" ' : '';
        hidden = fU.attr('hidden') ? ' hidden="' + fU.attr('hidden') + '" ' : '';
        name = fU[0].getAttribute('name') ? ' name="' + fU[0].getAttribute('name') + '" ' : '';
        value = fU.attr('value') ? ' value="' + fU.attr('value') + '" ' : '';
        scId = sessionCamRecorder.R(fU[0]);
        if (scId) scId = ' scId="' + scId + '"  ';
        else scId = '';
        width = sessionCamRecorder.jW(fU.attr('width')) ? '' : ' width="' + fU.attr('width') + '" ';
        height = sessionCamRecorder.jW(fU.attr('height')) ? '' : ' height="' + fU.attr('height') + '" ';
        otherAttributes = new sessionCamRecorder.iO();
        for (i = 0; i < fU[0].attributes.length; i++) {
            attrName = fU[0].attributes[i].name;
            if (attrName) {
                attrName = attrName.toLowerCase();
                if ((attrName.indexOf('data-') === 0) && ($.inArray(attrName, attributeNames) < 0) || (attrName.indexOf('_') === 0) && ($.inArray(attrName, attributeNames) < 0)) otherAttributes.append(' ' + attrName + '="' + (sessionCamRecorder.jW(fU[0].attributes[i].value) ? '' : fU[0].attributes[i].value.replace(/\"/g, '&quot;')) + '"');
            }
        }
        if (sessionCamRecorder.configuration.AV && (nodeName == 'canvas')) canvas = ' sccanvasdata="' + sessionCamRecorder.mV(fU[0]) + '" ';
        if (nodeName == 'img') {
            width = (fU[0].getAttribute('width') ? ' width="' + fU[0].getAttribute('width') + '" ' : '');
            height = (fU[0].getAttribute('height') ? ' height="' + fU[0].getAttribute('height') + '" ' : '');
        }
        color = '';
        face = '';
        size = '';
        if (nodeName == 'font') {
            color = fU.attr('color') ? ' color="' + fU.attr('color') + '" ' : '';
            face = fU.attr('face') ? ' face="' + fU.attr('face') + '" ' : '';
            size = sessionCamRecorder.jW(fU.attr('size')) ? '' : ' size="' + fU.attr('size') + '" ';
        }
        hv = $.browser.safari || $.browser.webkit;
        gp = fU[0].innerHTML;
        kn = document.createElement(sessionCamRecorder.hJ(fU[0]));
        $(kn).attr('class', fU.attr('class'));
        if (gp) {
            if (hv) gp = gp.replace(/name='/gi, 'name=\'scName_').replace(/name="/gi, 'name="scName_');
            kn.innerHTML = "SessionCam:TempString" + sessionCamRecorder.mz(gp);
            sessionCamRecorder.nj(kn);
            sessionCamRecorder.mE(kn);
        }
        kn = $(kn);
        elements = $('a[href*="<"]', kn).add('a[href*=">"]', kn);
        for (i = 0; i < elements.length; i++) {
            $(elements[i]).attr('href', $(elements[i]).attr('href').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        }
        if (sessionCamRecorder.configuration.AW && sessionCamRecorder.configuration.AW.length) {
            try {
                eC = $(sessionCamRecorder.configuration.AW, kn);
                fJ = $(sessionCamRecorder.configuration.AW, fU);
                if (eC.length === fJ.length) {
                    for (i = 0; i < eC.length; i++) {
                        if (sessionCamRecorder.bo(fJ[i], 'scHover') === 1) $(eC[i]).addClass('sessionCamHover');
                    }
                }
            } catch (err) {
                sessionCamRecorder.log('Error in getOuterHtml applying configuration.AW', err);
            }
        }
        eC = kn.find('textarea,input,select');
        fJ = fU.find('textarea,input,select');
        if (hv) {
            for (i = 0; i < eC.length; i++) {
                if (i < fJ.length) {
                    if (hi && (sessionCamRecorder.dT($(fJ[i])) || sessionCamRecorder.mg($(fJ[i])))) sessionCamRecorder.bg(fJ[i], 'scVal', $(fJ[i]).val());
                    $(eC[i]).replaceWith(sessionCamRecorder.ck($(fJ[i])).replace("name='" + $(fJ[i]).attr('name'), "name='" + $(eC[i]).attr('name')).replace('name="' + $(fJ[i]).attr('name'), 'name="' + $(eC[i]).attr('name')));
                }
            }
        } else {
            for (i = 0; i < eC.length; i++) {
                if (i < fJ.length) {
                    if (hi && (sessionCamRecorder.dT($(fJ[i])) || sessionCamRecorder.mg($(fJ[i])))) sessionCamRecorder.bg(fJ[i], 'scVal', $(fJ[i]).val());
                    $(eC[i]).replaceWith(sessionCamRecorder.ck($(fJ[i])));
                }
            }
        }
        if (sessionCamRecorder.configuration.AV && (nodeName != 'canvas')) {
            eC = kn.find('canvas');
            fJ = fU.find('canvas');
            for (i = 0; i < eC.length; i++) {
                if (i < fJ.length) {
                    $(eC[i]).replaceWith(sessionCamRecorder.kN($(fJ[i]), hi));
                }
            }
        }
        kn.find('.' + sessionCamRecorder.sessionCamIgnoreChanges).empty().remove();
        if (F) {
            elements = $(F, kn);
            for (i = 0; i < elements.length; i++) $(elements[i]).replaceWith(sessionCamRecorder.eg($(elements[i])));
        }
        eR = kn.find('input[type="checkbox"], input[type="radio"]');
        fL = (hv ? fU.find('input[type="checkbox"], input[type="radio"]') : eR);
        for (j = 0; j < eR.length; j++) {
            if (fL[j].checked) eR[j].setAttribute('checked', 'checked');
            else eR[j].removeAttribute('checked');
        }
        gp = kn.html().replace(/SessionCamAutoPlay/gi, '');
        if (hv) gp = gp.replace(/name='scName_/gi, 'name=\'').replace(/name="scName_/gi, 'name="');
        return '<' + nodeName + sessionCamRecorder.ab(id + name + width + height + style + jH + src + alt + title + href + hidden + color + face + size + scId + value + canvas + otherAttributes.toString()) + '>' + gp + '</' + nodeName + '>';
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.ck = function(fU) {
    return (function($) {
        var fO, gb, gv, nodeName, id, name, style, jH, alt, checked, maxlength, min, max, hidden, placeholder, size, type, disabled, readonly, cols, rows, src, multiple, value, kA, attributes, html, iZ, attributeNames, otherAttributes, attrName, i, lang;
        gb = sessionCamRecorder.eb(fU[0]);
        gv = (sessionCamRecorder.configuration != null && !sessionCamRecorder.configuration.A);
        nodeName = sessionCamRecorder.hJ(fU[0]);
        id = fU.attr('id') ? ' id="' + fU.attr('id').replace(/[\"\']/g, '') + '" ' : '';
        name = fU.attr('name') || '';
        if ((name.toUpperCase().indexOf('__EVENT') >= 0) || (name.toUpperCase().indexOf('__VIEWSTATE') >= 0)) return '<input type="hidden" />';
        name = (name ? ' name="' + name.replace(/[\"\']/g, '') + '" ' : '');
        iZ = fU.attr(sessionCamRecorder.sessioncamName) ? ' ' + sessionCamRecorder.sessioncamName + '="' + sessionCamRecorder.fW(fU.attr(sessionCamRecorder.sessioncamName)).replace(/[\"\']/g, '') + '" ' : '';
        attributeNames = [];
        style = fU.attr('style') ? ' style="' + fU.attr('style').replace(/[\"\']/g, '') + '" ' : '';
        jH = fU[0].className ? ' class="' + (sessionCamRecorder.bo(fU[0], 'scHover') === 1 ? fU[0].className + ' sessionCamHover' : fU[0].className) + '" ' : (sessionCamRecorder.bo(fU[0], 'scHover') === 1 ? ' class="sessionCamHover" ' : '');
        alt = fU.attr('alt') ? ' alt="' + fU.attr('alt') + '" ' : '';
        checked = fU.attr('checked') ? ' checked="' + fU.attr('checked') + '" ' : '';
        maxlength = fU.attr('maxlength') ? ' maxlength="' + fU.attr('maxlength') + '" ' : '';
        size = sessionCamRecorder.jW(fU.attr('size')) ? '' : ' size="' + fU.attr('size') + '" ';
        type = fU.attr('type') ? ' type="' + fU.attr('type') + '" ' : '';
        disabled = fU.attr('disabled') ? ' disabled="' + fU.attr('disabled') + '" ' : '';
        readonly = fU.attr('readonly') ? ' readonly="' + fU.attr('readonly') + '" ' : '';
        cols = fU.attr('cols') ? ' cols="' + fU.attr('cols') + '" ' : '';
        rows = fU.attr('rows') ? ' rows="' + fU.attr('rows') + '" ' : '';
        src = fU.attr('src') ? ' src="' + fU.attr('src') + '" ' : '';
        multiple = fU.attr('multiple') ? ' multiple="' + fU.attr('multiple') + '" ' : '';
        min = fU.attr('min') ? ' min="' + fU.attr('min') + '" ' : '';
        max = fU.attr('max') ? ' max="' + fU.attr('max') + '" ' : '';
        hidden = fU.attr('hidden') ? ' hidden="' + fU.attr('hidden') + '" ' : '';
        placeholder = fU.attr('placeholder') || '';
        if (placeholder) {
            if (gb || gv) placeholder = sessionCamRecorder.fg(placeholder, gb);
            placeholder = ' placeholder="' + placeholder + '" ';
        }
        lang = fU.attr('lang') ? ' lang="' + fU.attr('lang') + '" ' : '';
        otherAttributes = new sessionCamRecorder.iO();
        for (i = 0; i < fU[0].attributes.length; i++) {
            attrName = fU[0].attributes[i].name;
            if (attrName) {
                attrName = attrName.toLowerCase();
                if ((attrName.indexOf('data-') === 0) && ($.inArray(attrName, attributeNames) < 0) || (attrName.indexOf('_') === 0) && ($.inArray(attrName, attributeNames) < 0)) otherAttributes.append(' ' + attrName + '="' + (sessionCamRecorder.jW(fU[0].attributes[i].value) ? '' : fU[0].attributes[i].value.replace(/\"/g, '&quot;')) + '"');
            }
        }
        value = '';
        kA = sessionCamRecorder.fW(fU.val());
        if (kA) {
            if (kA.replace) kA = kA.replace(/</g, '&lt;').replace(/>/g, '&gt;');
            if ((nodeName == 'select') || ((fU.attr('type') == 'button') || (fU.attr('type') == 'submit'))) {
                if (gv || gb) {
                    if (multiple || ((nodeName == 'select') && (fU.attr('type') == 'select-multiple'))) value = sessionCamRecorder.jt(fU, gv, gb);
                    else {
                        if (gb || (nodeName == 'select')) value = sessionCamRecorder.fg(kA, gb);
                        else value = kA;
                    }
                } else value = kA;
            } else if (sessionCamRecorder.fW(fU.attr('type')) != 'hidden') {
                if ((gb || gv) && !((fU.attr('type') == 'radio') || (fU.attr('type') == 'checkbox'))) {
                    switch (fU.attr('type') || '') {
                        case 'password':
                            break;
                        case 'number':
                        case 'date':
                        case 'week':
                        case 'month':
                        case 'time':
                        case 'datetime':
                        case 'datetime-local':
                        case 'color':
                        case 'range':
                            value = sessionCamRecorder.mX(kA, fU);
                            break;
                        default:
                            value = sessionCamRecorder.fg(kA, gb);
                            break;
                    }
                    kA = value;
                } else value = kA;
            }
            value = ' value="' + value + '" ';
        } else if ((fU.attr('type') == 'button') || (fU.attr('type') == 'submit')) {
            value = ' value="SessionCam:Blank" ';
        }
        attributes = sessionCamRecorder.ab(id + iZ + name + style + jH + alt + checked + maxlength + min + max + hidden + placeholder + size + type + disabled + readonly + cols + rows + src + multiple + value + lang + otherAttributes.toString());
        html = '';
        if (nodeName == 'select') html = sessionCamRecorder.dg(fU, gv, gb);
        else if (nodeName == 'textarea') html = kA;
        else html = fU.html();
        if (html.length > 0) fO = '<' + nodeName + attributes + '>' + html + '</' + nodeName + '>';
        else fO = '<' + nodeName + attributes + ' />';
        return fO;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.cE = function(fU) {
    return (function($) {
        var fO = new sessionCamRecorder.iO(),
            gv, gb, s, jo;
        gv = (sessionCamRecorder.configuration != null) && !sessionCamRecorder.configuration.A;
        gb = (gv ? null : sessionCamRecorder.eb(fU[0]));
        jo = $('option:selected', fU);
        if ((jo != null) && (jo.length > 0)) {
            for (s = 0; s < jo.length; s++) {
                fO.append('<option value="' + (gv || gb ? sessionCamRecorder.fg(jo[s].value) : jo[s].value) + '" selected="selected">' + (gv || gb ? sessionCamRecorder.fg(jo[s].text, gb) : jo[s].text) + '</option>');
            }
        }
        return fO.toString();
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.jt = function(fU, gv, gb) {
    var i, fO = (fU.val() || []);
    if (gv == null) gv = (sessionCamRecorder.configuration != null) && !sessionCamRecorder.configuration.A;
    if (!gv && (gb == null)) gb = sessionCamRecorder.eb(fU[0]);
    if (gv || gb) {
        for (i = 0; i < fO.length; i++) {
            fO[i] = sessionCamRecorder.fg(fO[i]);
        }
    }
    return fO.join(',');
};
SessionCamRecorder.prototype.dg = function(fU, gv, gb) {
    return (function($) {
        var fO = new sessionCamRecorder.iO(),
            dY, s, jo;
        dY = fU.attr('multiple');
        jo = (dY ? $('option', fU) : $('option:selected', fU));
        if ((jo != null) && (jo.length > 0)) {
            for (s = 0; s < jo.length; s++) {
                if (dY) fO.append('<option value="' + (gv || gb ? sessionCamRecorder.fg(jo[s].value) : jo[s].value) + (jo[s].selected ? '" selected="selected">' : '">') + (gv || gb ? sessionCamRecorder.fg(jo[s].text, gb) : jo[s].text) + '</option>');
                else fO.append('<option value="' + (gv || gb ? sessionCamRecorder.fg(jo[s].value) : jo[s].value) + '" selected="selected">' + (gv || gb ? sessionCamRecorder.fg(jo[s].text, gb) : jo[s].text) + '</option>');
            }
        }
        return fO.toString();
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.dJ = function(gN, fN) {
    return (function($) {
        var fO = 0,
            time, nodeName, jO, da, child, lu, gV, i, en, ks, cc, ki, dw, c, gs, hg, dm, ek, hf, data;
        if (!sessionCamRecorder.kJ(gN)) {
            time = sessionCamRecorder.getTime();
            nodeName = sessionCamRecorder.hJ(gN);
            jO = sessionCamRecorder.mZ(gN);
            da = sessionCamRecorder.bo(gN, 'scVisible');
            if (jO !== da) {
                sessionCamRecorder.gG(sessionCamRecorder.fo.ji, sessionCamRecorder.kN($(gN), true), sessionCamRecorder.et(gN, true), nodeName, null, null, gN, fN, time++);
                sessionCamRecorder.bg(gN, 'scVisible', jO);
                if (jO) {
                    sessionCamRecorder.ep($(gN));
                    sessionCamRecorder.aK(time++, $(gN));
                    sessionCamRecorder.kC($(gN), fN);
                    sessionCamRecorder.bq(gN);
                }
            } else if (jO || ($(gN).is('INPUT') && ($(gN).attr('type') === 'checkbox'))) {
                gV = sessionCamRecorder.df($(gN), fN);
                if (gV) {
                    sessionCamRecorder.fe($(gN), sessionCamRecorder.cQ($(gN)), fN);
                    lu = sessionCamRecorder.bo(gN, 'scChildIds') || [];
                    i = 0;
                    while (i < lu.length) {
                        child = sessionCamRecorder.eG(lu[i], gN.childNodes);
                        if (child && !sessionCamRecorder.kJ(child)) i++;
                        else {
                            sessionCamRecorder.gG(sessionCamRecorder.fo.Remove, '', sessionCamRecorder.et(gN) + 'child{' + i + '}childScId{' + lu[i] + '}serial{' + (sessionCamRecorder.fF++) + '}', null, null, null, gN, fN, time++);
                            lu.splice(i, 1);
                        }
                    }
                    en = gN.childNodes ? gN.childNodes.length : 0;
                    cc = [];
                    ki = [];
                    dw = -1;
                    if (en === 0) sessionCamRecorder.aK(sessionCamRecorder.getTime() + 1, gN);
                    for (c = 0; c < en; c++) {
                        child = gN.childNodes[c];
                        if (!sessionCamRecorder.kJ(child)) {
                            gs = $(child);
                            dw++;
                            hg = sessionCamRecorder.ct(gs);
                            dm = sessionCamRecorder.dD(gs, hg);
                            if (($.inArray(sessionCamRecorder.jw(child), lu) < 0)) {
                                if (ks) {
                                    sessionCamRecorder.ep($(gN));
                                    data = sessionCamRecorder.ms(hg, gN) + sessionCamRecorder.kN(gs, true) + sessionCamRecorder.ms(sessionCamRecorder.dc(gs), gN);
                                    if (data.indexOf(sessionCamRecorder.ll) >= 0) data = sessionCamRecorder.bS(data);
                                    sessionCamRecorder.gG(sessionCamRecorder.fo.hS, data, sessionCamRecorder.et(ks[0]), sessionCamRecorder.hJ(ks[0]), null, null, gN, fN, time++);
                                } else {
                                    sessionCamRecorder.ep($(gN));
                                    data = sessionCamRecorder.ms(hg, gN) + sessionCamRecorder.kN(gs, true) + sessionCamRecorder.ms(sessionCamRecorder.dc(gs), gN);
                                    if (data.indexOf(sessionCamRecorder.ll) >= 0) data = sessionCamRecorder.bS(data);
                                    sessionCamRecorder.gG(sessionCamRecorder.fo.jd, data, sessionCamRecorder.et(gN), sessionCamRecorder.hJ(gN), null, null, gN, fN, time++);
                                }
                                lu.splice(dw, 0, sessionCamRecorder.jw(child));
                                sessionCamRecorder.kC(gs, fN + 1);
                                sessionCamRecorder.cL(gs);
                                sessionCamRecorder.aK(sessionCamRecorder.getTime() + 1, child);
                            } else cc.push(child);
                            if (dm) sessionCamRecorder.gG(sessionCamRecorder.fo.bl, sessionCamRecorder.ms(hg, gN), sessionCamRecorder.et(child), sessionCamRecorder.hJ(child), null, null, gN, fN, time++);
                            ki.push(sessionCamRecorder.jw(child));
                            ks = gs;
                        }
                    }
                    sessionCamRecorder.bg(gN, 'scChildIds', ki);
                    ek = false;
                    if (ki.toString() != lu.toString()) {
                        sessionCamRecorder.gG(sessionCamRecorder.fo.ji, sessionCamRecorder.kN($(gN), true), sessionCamRecorder.et(gN), nodeName, null, null, gN, fN, time++);
                        ek = true;
                    }
                    if (!ek && (cc.length > 0)) {
                        for (c = 0; c < cc.length; c++) {
                            sessionCamRecorder.kR.push({
                                elem: cc[c],
                                level: fN + 1
                            });
                        }
                        fO = cc.length;
                    }
                    sessionCamRecorder.bq(gN);
                    if (sessionCamRecorder.scStatsCurrentSection) {
                        hf = '';
                        if (gN.id) hf = '"' + gN.id + '" ';
                        hf += cc.length + (cc.length == 1 ? ' child' : ' children') + ' queued';
                        sessionCamRecorder.scStatsCurrentSection.annotate(hf);
                    }
                }
            }
        }
        return fO;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.dz = function() {
    var ht, cc, mh;
    try {
        if (sessionCamRecorder.scStats) sessionCamRecorder.scStatsCurrentSection = sessionCamRecorder.scStats.addSection('monitorDOM');
        if ((sessionCamRecorder.configuration != null) && (sessionCamRecorder.configuration.D)) {
            if (sessionCamRecorder.kR.length < 1) {
                if ((sessionCamRecorder.configuration.C != null) && (sessionCamRecorder.configuration.C.length > 0)) ht = document.getElementById(sessionCamRecorder.configuration.C) || sessionCamRecorder.lQ();
                else ht = sessionCamRecorder.lQ();
                cc = 0;
                if (ht) cc = sessionCamRecorder.dJ(ht, 0);
                if (cc > 0) window.setTimeout(sessionCamRecorder.dH, 1);
                else {
                    window.setTimeout(sessionCamRecorder.cv, 1);
                    window.setTimeout(sessionCamRecorder.hN, 50);
                    window.setTimeout(sessionCamRecorder.kQ, 100);
                    if (sessionCamRecorder.configuration.AV) window.setTimeout(sessionCamRecorder.nu, 250);
                }
            }
        } else {
            sessionCamRecorder.cv();
            sessionCamRecorder.kQ();
        }
        if (sessionCamRecorder.scStatsCurrentSection) {
            sessionCamRecorder.scStatsCurrentSection.complete();
            sessionCamRecorder.scStatsCurrentSection = null;
        }
        mh = sessionCamRecorder.configuration.AT;
        if (!mh) mh = 250;
        window.setTimeout(sessionCamRecorder.dz, mh);
    } catch (err) {
        sessionCamRecorder.log('monitorDOM', err);
    }
    return;
};
SessionCamRecorder.prototype.dH = function() {
    try {
        if (sessionCamRecorder.scStats) sessionCamRecorder.scStatsCurrentSection = sessionCamRecorder.scStats.addSection('processDOMQueue');
        if (sessionCamRecorder.kR.length > 0) {
            sessionCamRecorder.dJ(sessionCamRecorder.kR[0].elem, sessionCamRecorder.kR[0].level);
            sessionCamRecorder.kR.splice(0, 1);
        }
        if (sessionCamRecorder.scStatsCurrentSection && (sessionCamRecorder.scStatsCurrentSection.sectionName == 'processDOMQueue')) {
            sessionCamRecorder.scStatsCurrentSection.annotate(sessionCamRecorder.kR.length + ' item' + (sessionCamRecorder.kR.length == 1 ? '' : 's') + ' left');
            sessionCamRecorder.scStatsCurrentSection.complete();
            sessionCamRecorder.scStatsCurrentSection = null;
        }
        if (sessionCamRecorder.kR.length > 0) setTimeout(sessionCamRecorder.dH, 1);
        return sessionCamRecorder.kR.length;
    } catch (err) {
        sessionCamRecorder.log('processDOMQueue', err);
    }
};
SessionCamRecorder.prototype.cv = function() {
    return (function($) {
        try {
            var fQ, eS, i, val, F = sessionCamRecorder.getElementsToRemove();
            fQ = $(sessionCamRecorder.kX + ', ' + sessionCamRecorder.jZ + ', textarea:not(.' + sessionCamRecorder.sessionCamIgnoreChanges + ')');
            eS = ((document.activeElement !== undefined) && (document.activeElement !== null)) ? document.activeElement : '';
            for (i = 0; i < fQ.length; i++) {
                if (!F || !$(fQ[i]).is(F)) {
                    val = $(fQ[i]).val();
                    if (val != sessionCamRecorder.bo(fQ[i], 'scVal')) {
                        if (fQ[i] != eS) {
                            sessionCamRecorder.bg(fQ[i], 'scVal', val);
                            sessionCamRecorder.gG(sessionCamRecorder.fo.iJ, val, sessionCamRecorder.dP($(fQ[i])), sessionCamRecorder.hJ(fQ[i]), sessionCamRecorder.eO(fQ[i]), null, fQ[i]);
                        }
                    }
                }
            }
            fQ = $('select');
            for (i = 0; i < fQ.length; i++) {
                if (!F || !$(fQ[i]).is(F)) {
                    val = $(fQ[i]).val();
                    if ($.isArray(val)) val = val.join();
                    if (val != sessionCamRecorder.bo(fQ[i], 'scVal')) {
                        sessionCamRecorder.bg(fQ[i], 'scVal', val);
                        if (fQ[i] != eS) sessionCamRecorder.gG(sessionCamRecorder.fo.iJ, ($(fQ[i]).attr('multiple') ? sessionCamRecorder.jt($(fQ[i])) : sessionCamRecorder.cE($(fQ[i]))), sessionCamRecorder.dP($(fQ[i])), 'select', sessionCamRecorder.et(fQ[i]), null, fQ[i]);
                    }
                }
            }
            var ky = [];
            fQ = $('input[type=checkbox]');
            for (i = 0; i < fQ.length; i++) {
                if (!F || !$(fQ[i]).is(F)) {
                    val = sessionCamRecorder.mD($(fQ[i]));
                    if (val != sessionCamRecorder.bo(fQ[i], 'scVal')) {
                        sessionCamRecorder.bg(fQ[i], 'scVal', val);
                        if (fQ[i] != eS) {
                            sessionCamRecorder.gG(sessionCamRecorder.fo.iJ, sessionCamRecorder.iS($(fQ[i])), sessionCamRecorder.dP($(fQ[i])), 'checkbox', sessionCamRecorder.et(fQ[i]), val, fQ[i]);
                            if ($.inArray($(fQ[i]).attr('name'), ky) < 0) {
                                sessionCamRecorder.gG(sessionCamRecorder.fo.mU, sessionCamRecorder.mn($(fQ[i])), sessionCamRecorder.ij($(fQ[i])), 'checkbox');
                                ky.push($(fQ[i]).attr('name'));
                            }
                        }
                    }
                }
            }
            ky = [];
            fQ = $('input[type=radio]');
            for (i = 0; i < fQ.length; i++) {
                if (!F || !$(fQ[i]).is(F)) {
                    val = sessionCamRecorder.mD($(fQ[i]));
                    if (val != sessionCamRecorder.bo(fQ[i], 'scVal')) {
                        sessionCamRecorder.bg(fQ[i], 'scVal', val);
                        if (fQ[i] != eS) {
                            sessionCamRecorder.gG(sessionCamRecorder.fo.iJ, sessionCamRecorder.iS($(fQ[i])), sessionCamRecorder.dP($(fQ[i])), 'radio', sessionCamRecorder.et(fQ[i]), val, fQ[i]);
                            if ($.inArray($(fQ[i]).attr('name'), ky) < 0) {
                                sessionCamRecorder.gG(sessionCamRecorder.fo.mU, sessionCamRecorder.nk($(fQ[i])), sessionCamRecorder.ij($(fQ[i])), 'radio');
                                ky.push($(fQ[i]).attr('name'));
                            }
                        }
                    }
                }
            }
        } catch (err) {
            sessionCamRecorder.log('checkInputsForValChanges', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.nu = function() {
    return (function($) {
        if (!sessionCamRecorder.configuration.AV) return;
        try {
            var i, fU = $('canvas'),
                nm, val;
            for (i = 0; i < fU.length; i++) {
                nm = sessionCamRecorder.bo(fU[i], 'sccanvasdata') || "";
                val = sessionCamRecorder.mV(fU[i]) || nm;
                if (val !== nm) sessionCamRecorder.gG(sessionCamRecorder.fo.nl, val, sessionCamRecorder.et(fU[i]), 'canvas');
            }
        } catch (err) {
            sessionCamRecorder.log('checkCanvas', err);
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.mV = function(gN) {
    var fO;
    try {
        if (!sessionCamRecorder.configuration.AV) fO = '';
        else if (sessionCamRecorder.configuration.AV === 10) fO = gN.toDataURL();
        else fO = gN.toDataURL('image/jpeg', (sessionCamRecorder.configuration.AV / 10));
        sessionCamRecorder.bg(gN, 'sccanvasdata', fO);
    } catch (err) {
        sessionCamRecorder.log('setCanvasData', err);
        fO = '';
    }
    return fO;
};
SessionCamRecorder.prototype.jh = function() {
    var cy = document.getElementsByTagName('HEAD');
    return (cy.length ? cy[0] : null);
};
SessionCamRecorder.prototype.lQ = function() {
    var elements = document.getElementsByTagName('BODY');
    return (elements.length ? elements[0] : null);
};
SessionCamRecorder.prototype.iP = function() {
    return (function($) {
        return $('head>link[href][rel*=stylesheet]:not([media=print]), head>link[href][rel*=STYLESHEET]:not([media=print]), head>link[href][rel*=Stylesheet]:not([media=print]), head>link[href][rel*=StyleSheet]:not([media=print])').add('head>style:not([media=print])');
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.iR = function(body, mq) {
    return (function($) {
        var fO = [],
            i, elements = $('link', $(body)).add('style', $(body));
        for (i = 0; i < elements.length; i++) {
            switch (sessionCamRecorder.hJ(elements[i])) {
                case 'style':
                    if ($(elements[i]).attr('media') !== 'print') fO.push(elements[i]);
                    break;
                case 'link':
                    if (($(elements[i]).attr('href')) && ($(elements[i]).attr('rel') && $(elements[i]).attr('rel').indexOf('stylesheet') >= 0) && ($(elements[i]).attr('media') !== 'print')) {
                        if (!mq || !$(elements[i]).attr('disabled')) fO.push(elements[i]);
                    }
                    break;
            }
        }
        return fO;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.ja = function(gk, je) {
    return (function($) {
        var fO, rel, href, type, media, disabled, gP, hE, val, val1, lastVal, lastVal1, fB, i;
        switch (sessionCamRecorder.hJ(gk)) {
            case 'style':
                media = $(gk).attr('media');
                if (gk.styleSheet && gk.styleSheet.cssText) {
                    val = (gk.innerHTML || gk.innerText || '');
                    val1 = gk.styleSheet.cssText || '';
                    lastVal = sessionCamRecorder.bo(gk, 'scVal0') || '';
                    lastVal1 = sessionCamRecorder.bo(gk, 'scVal1') || '';
                    sessionCamRecorder.bg(gk, 'scVal0', val);
                    sessionCamRecorder.bg(gk, 'scVal1', val1);
                    if (lastVal == val) {
                        if (lastVal1 == val1) val = sessionCamRecorder.bo(gk, 'scVal') || '';
                        else val = val1;
                    }
                    sessionCamRecorder.bg(gk, 'scVal', val);
                } else {
                    val = (gk.innerHTML || gk.innerText);
                    if (!val && gk.sheet && gk.sheet.cssRules && gk.sheet.cssRules.length) {
                        fB = new sessionCamRecorder.iO();
                        for (i = 0; i < gk.sheet.cssRules.length; i++) {
                            fB.append(gk.sheet.cssRules[i].cssText);
                        }
                        val = fB.toString();
                    }
                }
                fO = '<style scId="' + sessionCamRecorder.jw(gk) + '"' + (media ? ' media="' + media + '"' : '') + '>' + val + '</style>';
                break;
            case 'link':
                rel = $(gk).attr('rel');
                href = $(gk).attr('href');
                if (href && je) href = sessionCamRecorder.aX(href);
                type = $(gk).attr('type');
                media = $(gk).attr('media');
                disabled = $(gk).attr('disabled');
                gP = (gk.outerHTML.substr(gk.outerHTML.length - 2).toLowerCase() == '/>');
                hE = (gP ? '' : ((gk.outerHTML.length > 6) && (gk.outerHTML.substr(gk.outerHTML.length - 7).toLowerCase() == '</link>') ? '</link>' : ''));
                fO = '<link scId="' + sessionCamRecorder.jw(gk) + '" ' + (rel ? 'rel="' + rel + '" ' : '') + (media ? 'media="' + media + '" ' : '') + (href ? 'href="' + href + '" ' : '') + (type ? 'type="' + type + '" ' : '') + (disabled ? 'disabled="' + disabled + '" ' : '') + (gP ? '/>' : '>' + hE);
                break;
        }
        return fO;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.jj = function() {
    var sb = new sessionCamRecorder.iO(),
        i, fQ = sessionCamRecorder.iP();
    for (i = 0; i < fQ.length; i++) {
        sb.append(sessionCamRecorder.ja(fQ[i]));
    }
    return sb.toString();
};
SessionCamRecorder.prototype.nb = function() {
    return (function($) {
        var meta = $('meta[name=viewport][content]');
        return (meta.length ? meta[0].outerHTML : '');
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.hN = function() {
    return (function($) {
        try {
            if (sessionCamRecorder.scStats) sessionCamRecorder.scStatsCurrentSection = sessionCamRecorder.scStats.addSection('domMonitorNonBody');
            var i, fQ, scChildIds, bt, dR, head, body, kK, scId;
            head = sessionCamRecorder.jh();
            if (head) {
                if (sessionCamRecorder.bo(head, 'scInnerHTML') != sessionCamRecorder.jj()) {
                    fQ = sessionCamRecorder.iP();
                    scChildIds = [];
                    bt = sessionCamRecorder.bo(head, 'scChildIds') || [];
                    for (i = 0; i < bt.length; i++) {
                        if (!sessionCamRecorder.eG(bt[i], fQ)) sessionCamRecorder.gG(sessionCamRecorder.fo.il, null, bt[i], 'head');
                    }
                    for (i = 0; i < fQ.length; i++) {
                        dR = sessionCamRecorder.ja(fQ[i]);
                        scId = sessionCamRecorder.R(fQ[i]);
                        if ($.inArray(scId, bt) >= 0) {
                            if (sessionCamRecorder.bo(fQ[i], 'scOuterHTML') != dR) {
                                sessionCamRecorder.gG(sessionCamRecorder.fo.jc, dR, scId, 'head');
                                sessionCamRecorder.bg(fQ[i], 'scOuterHTML', dR);
                            }
                        } else {
                            sessionCamRecorder.gG(sessionCamRecorder.fo.iy, dR, (i > 0 ? sessionCamRecorder.R(fQ[i - 1]) : 0), 'head');
                            sessionCamRecorder.bg(fQ[i], 'scOuterHTML', dR);
                        }
                        scChildIds.push(scId);
                    }
                    sessionCamRecorder.bg(head, 'scChildIds', scChildIds);
                    sessionCamRecorder.bg(head, 'scInnerHTML', sessionCamRecorder.jj());
                }
            }
            scChildIds = [];
            body = sessionCamRecorder.lQ();
            bt = sessionCamRecorder.bo(body, 'scStyleIds');
            fQ = sessionCamRecorder.iR(body, true);
            for (i = 0; i < bt.length; i++) {
                if (!sessionCamRecorder.eG(bt[i], fQ)) sessionCamRecorder.gG(sessionCamRecorder.fo.iK, null, bt[i]);
            }
            scChildIds = [];
            for (i = 0; i < fQ.length; i++) {
                dR = sessionCamRecorder.ja(fQ[i]);
                scId = sessionCamRecorder.R(fQ[i]);
                if ($.inArray(scId, bt) >= 0) {
                    if (sessionCamRecorder.bo(fQ[i], 'scOuterHTML') != dR) {
                        sessionCamRecorder.gG(sessionCamRecorder.fo.iI, dR, scId, sessionCamRecorder.hJ(fQ[i]));
                        sessionCamRecorder.bg(fQ[i], 'scOuterHTML', dR);
                    }
                } else {
                    kK = sessionCamRecorder.iv(fQ[i]);
                    if (kK) sessionCamRecorder.gG(sessionCamRecorder.fo.iG, dR, sessionCamRecorder.et(kK), sessionCamRecorder.hJ(fQ[i]));
                    else sessionCamRecorder.gG(sessionCamRecorder.fo.ik, dR, sessionCamRecorder.et(fQ[i].parentNode), sessionCamRecorder.hJ(fQ[i]));
                    sessionCamRecorder.bg(fQ[i], 'scOuterHTML', dR);
                }
                scChildIds.push(scId);
            }
            sessionCamRecorder.bg(body, 'scStyleIds', scChildIds);
            if (sessionCamRecorder.bo(document.documentElement, 'scClassName') != document.documentElement.className) {
                sessionCamRecorder.gG(sessionCamRecorder.fo.jq, document.documentElement.className, null, 'html', null, null, document.documentElement);
                sessionCamRecorder.bg(document.documentElement, 'scClassName', document.documentElement.className);
            }
            var style = sessionCamRecorder.fW($(document.documentElement).attr('style'));
            if (sessionCamRecorder.bo(document.documentElement, 'scStyle') != style) {
                sessionCamRecorder.gG(sessionCamRecorder.fo.lC, style, null, 'html', null, null, document.documentElement);
                sessionCamRecorder.bg(document.documentElement, 'scStyle', style);
            }
            if (sessionCamRecorder.scStatsCurrentSection) {
                sessionCamRecorder.scStatsCurrentSection.complete();
                sessionCamRecorder.scStatsCurrentSection = null;
            }
        } catch (err) {
            sessionCamRecorder.log('domMonitorNonBody', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.jB = function() {
    if (window.sessioncamConfiguration && window.sessioncamConfiguration.customDataObjects) {
        try {
            var fb;
            while (window.sessioncamConfiguration.customDataObjects.length) {
                fb = window.sessioncamConfiguration.customDataObjects.pop();
                sessionCamRecorder.sendCustomDataEvent(fb.key, fb.value);
            }
        } catch (err) {
            sessionCamRecorder.log('checkCustomDataObjects', err);
        }
    }
    window.setTimeout(sessionCamRecorder.jB, 1000);
    return;
};
SessionCamRecorder.prototype.sendCustomDataEvent = function(key, value) {
    try {
        if (sessionCamRecorder.configuration.I) sessionCamRecorder.gG(sessionCamRecorder.fo.ew, value, key);
    } catch (err) {
        sessionCamRecorder.log('sendCustomDataEvent', err);
    }
    return;
};
SessionCamRecorder.prototype.registerFields = function(dZ) {
    try {
        var i, bZ = [];
        for (i = 1; i < arguments.length; i++) {
            bZ.push(arguments[i]);
        }
        sessionCamRecorder.la.push({
            kw: dZ,
            lJ: bZ,
            kd: sessionCamRecorder.fu(window.sessionCamJQuery(dZ))
        });
    } catch (err) {
        sessionCamRecorder.log('registerFields', err);
    }
    return;
};
SessionCamRecorder.prototype.getFieldValue = function(gN) {
    return (function($) {
        var fO = '';
        try {
            switch (sessionCamRecorder.hJ(gN)) {
                case 'input':
                    switch ($(gN).attr('type').toLowerCase()) {
                        case 'radio':
                        case 'checkbox':
                            fO = (gN.checked ? gN.value : '');
                            break;
                        default:
                            fO = $(gN).val();
                            break;
                    }
                    break;
                case 'select':
                case 'textarea':
                    fO = $(gN).val();
                    break;
                default:
                    fO = $(gN).html();
                    break;
            }
        } catch (err) {
            sessionCamRecorder.log('getFieldValue', err);
        }
        return (fO || '');
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.registeredFieldsGetValue = function(fU) {
    return (function($) {
        var fO = '',
            sb, i, kg;
        try {
            sb = sessionCamRecorder.iO();
            kg = '';
            for (i = 0; i < fU.length; i++) {
                kg = sessionCamRecorder.getFieldValue(fU[i]);
                if (kg) {
                    if ($.isArray(kg)) sb.append(',' + kg.join());
                    else sb.append(',' + kg);
                }
            }
            fO = sb.toString();
            return (fO.length > 1 ? fO.substring(1) : '');
        } catch (err) {
            sessionCamRecorder.log('registeredFieldsGetValue', err);
        }
        return fO || '';
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.fu = function(fU) {
    var i, sb = sessionCamRecorder.iO(),
        fO;
    for (i = 0; i < fU.length; i++) {
        sb.append(',' + sessionCamRecorder.getFieldValue(fU[i]));
    }
    fO = sb.toString();
    return (fO.length > 1 ? fO.substring(1) : '');
};
SessionCamRecorder.prototype.kQ = function() {
    return (function($) {
        try {
            var i, f, kd;
            for (i = 0; i < sessionCamRecorder.la.length; i++) {
                kd = sessionCamRecorder.fu($(sessionCamRecorder.la[i].kw));
                if (kd != sessionCamRecorder.la[i].kd) {
                    sessionCamRecorder.la[i].kd = kd;
                    for (f = 0; f < sessionCamRecorder.la[i].lJ.length; f++) {
                        try {
                            sessionCamRecorder.la[i].lJ[f].call(sessionCamRecorder, $(sessionCamRecorder.la[i].kw));
                        } catch (err1) {
                            sessionCamRecorder.log('Warning: error calling function ' + f + ' for registered fields ' + i + ' in SessionCamRecorder.checkRegisteredFields', err1);
                        }
                    }
                }
            }
        } catch (err) {
            sessionCamRecorder.log('checkRegisteredFields', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.ao = function(data, kS, gN) {
    return (function($) {
        var lA, result, O, pres, nn, i;
        if (data && data.length) {
            try {
                if ((gN && $(gN).hasClass(sessionCamRecorder.sessionCamPreserveWhitespace)) || (kS && ((kS.toLowerCase() === 'textarea') || (kS.toLowerCase() === 'pre')))) data = sessionCamRecorder.cp(data);
                else {
                    O = [];
                    lA = new RegExp(/<textarea([\S|\s]*?)<\/textarea>/gi);
                    result = lA.exec(data);
                    while (result && (result.length > 0)) {
                        O.push(result[0]);
                        result = lA.exec(data);
                    }
                    pres = [];
                    lA = new RegExp(/<pre([\S|\s]*?)<\/pre>/gi);
                    result = lA.exec(data);
                    while (result && (result.length > 0)) {
                        pres.push(result[0]);
                        result = lA.exec(data);
                    }
                    nn = (gN ? $('.' + sessionCamRecorder.sessionCamPreserveWhitespace, gN) : []);
                    data = data.replace(/\s{1,}/g, ' ');
                    for (i = 0; i < O.length; i++) {
                        data = data.replace(O[i].replace(/\s{1,}/g, ' '), sessionCamRecorder.cp(O[i]));
                    }
                    for (i = 0; i < pres.length; i++) {
                        data = data.replace(pres[i].replace(/\s{1,}/g, ' '), sessionCamRecorder.cp(pres[i]));
                    }
                    for (i = 0; i < nn.length; i++) {
                        data = data.replace(nn[i].outerHTML.replace(/\s{1,}/g, ' '), sessionCamRecorder.cp(nn[i].outerHTML));
                    }
                }
                data = encodeURIComponent(data);
            } catch (e) {
                data = encodeURIComponent(data);
            }
        }
        return data;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.fj = function(s) {
    if (s && s.replace) s = s.replace(/\u001E/g, 'SessionCam:field').replace(/\u001D/g, 'SessionCam:event').replace(/\&/g, 'SessionCam:ampersand');
    return s;
};
SessionCamRecorder.prototype.mO = function(data, gN) {
    return (function($) {
        var fU = $(gN);
        var c = fU.attr('class');
        if (typeof c !== 'string') c = '';
        var ho = {
            n: fU.attr('name'),
            s: fU.attr(sessionCamRecorder.sessioncamName),
            c: c,
            t: fU.attr('type'),
            d: (typeof(data) === "boolean" ? data.toString() : data)
        };
        if (fU.is('INPUT') && (fU.attr('type') == 'range')) ho.min = fU.attr('min');
        return $.stringifyJSON(ho);
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.gG = function(lv, data, dC, kS, kY, kI, gN, fN, timeStamp) {
    return (function($) {
        try {
            if (sessionCamRecorder.me || !sessionCamRecorder.configuration) return;
            if (sessionCamRecorder.mt) {
                switch (lv) {
                    case sessionCamRecorder.fo.lU:
                    case sessionCamRecorder.fo.MouseDown:
                    case sessionCamRecorder.fo.MouseUp:
                    case sessionCamRecorder.fo.KeyPress:
                    case sessionCamRecorder.fo.KeyDown:
                    case sessionCamRecorder.fo.iL:
                    case sessionCamRecorder.fo.iq:
                    case sessionCamRecorder.fo.hO:
                    case sessionCamRecorder.fo.iF:
                        sessionCamRecorder.mt = false;
                        break;
                    default:
                        return;
                }
            }
            if (!sessionCamRecorder.lB) {
                if (sessionCamRecorder.getTime() > (sessionCamRecorder.jG + 60000)) sessionCamRecorder.me = true;
            }
            var gb = null,
                db;
            if (sessionCamRecorder.scStatsCurrentSection) sessionCamRecorder.scStatsCurrentSection.annotate(lv + ' (' + (data ? data.length : 0) + ' bytes' + (fN ? '@level' + fN : '') + ')');
            if (!sessionCamRecorder.jS) {
                if (!timeStamp) timeStamp = sessionCamRecorder.getTime();
                timeStamp -= sessionCamRecorder.jG;
                if (data == null) data = '';
                if (dC == null) dC = '';
                if (kS == null) kS = '';
                switch (kS) {
                    case 'submit':
                    case 'button':
                        if (gN) gb = sessionCamRecorder.eb(gN);
                        if (gb) {
                            data = sessionCamRecorder.jx(lv, data, kS, gb, $(gN));
                            if (kI != null) kI = sessionCamRecorder.jx(lv, kI, kS, gb, $(gN));
                        }
                        break;
                    case 'radio':
                    case 'checkbox':
                    case 'select':
                        break;
                    case 'head':
                    case 'html':
                        break;
                    default:
                        if (gN) gb = sessionCamRecorder.eb(gN);
                        if (!sessionCamRecorder.configuration.A || gb) {
                            data = sessionCamRecorder.jx(lv, data, kS, gb, $(gN));
                            if (kI != null) kI = sessionCamRecorder.jx(lv, kI, kS, gb, $(gN));
                        }
                }
                if (sessionCamRecorder.configuration.L && (sessionCamRecorder.configuration.L > 0) && ((data && (data.length > sessionCamRecorder.configuration.L)) || (kI && (kI.length > sessionCamRecorder.configuration.L)))) {
                    data = 'eventDesc=' + lv + ', data.length=' + (data ? data.length : 0) + ', playbackData.length=' + (kI ? kI.length : 0);
                    kI = data;
                    lv = sessionCamRecorder.fo.eo;
                }
                if (dC.indexOf) {
                    while (dC.indexOf(String.fromCharCode(10)) >= 0) {
                        dC = dC.replace(String.fromCharCode(10), '');
                    }
                }
                if ((kY != null) && kY.indexOf) {
                    while (kY.indexOf(String.fromCharCode(10)) >= 0) {
                        kY = kY.replace(String.fromCharCode(10), '');
                    }
                }
                switch (lv) {
                    case sessionCamRecorder.fo.iU:
                    case sessionCamRecorder.fo.jr:
                    case sessionCamRecorder.fo.iJ:
                    case sessionCamRecorder.fo.DefaultValue:
                    case sessionCamRecorder.fo.hY:
                    case sessionCamRecorder.fo.KeyPress:
                    case sessionCamRecorder.fo.jd:
                    case sessionCamRecorder.fo.hS:
                    case sessionCamRecorder.fo.bl:
                    case sessionCamRecorder.fo.jz:
                        if (!gN || !kS) {
                            sessionCamRecorder.log('queueEvent requires both element and elementType parameters for this event type, aborting');
                            return;
                        }
                        data = sessionCamRecorder.mO(data, gN);
                        break;
                }
                data = sessionCamRecorder.ao(sessionCamRecorder.fj(data), kS, gN);
                if (kI != null) kI = sessionCamRecorder.ao(sessionCamRecorder.fj(kI), kS, gN);
                dC = sessionCamRecorder.fj(sessionCamRecorder.ab(dC));
                if (kY != null) kY = sessionCamRecorder.fj(sessionCamRecorder.ab(kY));
                if ((kI != null) && (kI.length === 0) && (data)) kI = 'SessionCam:Blank';
                db = new sessionCamRecorder.iO();
                db.append(lv + sessionCamRecorder.fi + timeStamp + sessionCamRecorder.fi + data);
                if (dC || kS || !sessionCamRecorder.jW(kI) || kY) db.append(sessionCamRecorder.fi + (dC ? dC : ''));
                if (kS || !sessionCamRecorder.jW(kI) || kY) db.append(sessionCamRecorder.fi + (kS ? kS : ''));
                if (!sessionCamRecorder.jW(kI) || kY) db.append(sessionCamRecorder.fi + (sessionCamRecorder.jW(kI) ? '' : kI));
                if (kY) db.append(sessionCamRecorder.fi + kY);
                db = db.toString();
                sessionCamRecorder.lc.append(db + sessionCamRecorder.ed);
                sessionCamRecorder.cG(db);
            }
        } catch (err) {
            sessionCamRecorder.log('queueEvent', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.cp = function(s) {
    if (sessionCamRecorder.jW(s)) return '';
    if (s.indexOf) {
        if (s.indexOf('\n') >= 0) s = s.replace(/\n/g, 'SessionCam:NewLine');
        if (s.indexOf('\r') >= 0) s = s.replace(/\r/g, '');
    }
    return s;
};
SessionCamRecorder.prototype.ey = function() {
    var reg, match;
    this.hK = this.hK.replace(/<div FirebugVersion=\"(.*?)\" style=\"display: none;\" id=\"_firebugConsole\"><\/div>/i, '<div></div>');
    reg = new RegExp(/url\(&quot;(.*?)&quot;/gi);
    match = reg.exec(this.hK);
    while (match) {
        this.hK = this.hK.replace(match[0], match[0].replace(/&quot;/g, ''));
        match = reg.exec(this.hK);
    }
    return;
};
SessionCamRecorder.prototype.getElementsToRemove = function() {
    return window.sessioncamConfiguration && window.sessioncamConfiguration.elementsToRemove ? window.sessioncamConfiguration.elementsToRemove : null;
};
SessionCamRecorder.prototype.eb = function(gN) {
    var fO = false,
        i = 0,
        name, iZ;
    try {
        if (gN) {
            if (gN.className && (gN.className.toLowerCase().indexOf('sessioncamexclude') >= 0)) fO = new sessionCamRecorder.fq();
            if (!fO) {
                name = (gN.getAttribute && gN.getAttribute('name')) || '';
                iZ = (gN.getAttribute && gN.getAttribute(sessionCamRecorder.sessioncamName)) || '';
                name = name.replace('scName_', '').replace(/SessionCamAutoPlay/gi, '').toLowerCase();
                iZ = iZ.replace('scName_', '').replace(/SessionCamAutoPlay/gi, '').toLowerCase();
                if (name || iZ) {
                    if ((sessionCamRecorder.configuration != null) && (sessionCamRecorder.configuration.E)) {
                        while (!fO && (i < sessionCamRecorder.configuration.E.length)) {
                            if (sessionCamRecorder.configuration.E[i].AF) {
                                if ((sessionCamRecorder.configuration.E[i].AF.toLowerCase() === name) || (sessionCamRecorder.configuration.E[i].AF.toLowerCase() === iZ)) {
                                    fO = new sessionCamRecorder.fq();
                                    fO.ShowFirstChars = (sessionCamRecorder.configuration.E[i].AG ? sessionCamRecorder.configuration.E[i].AG : 0);
                                    fO.ShowLastChars = (sessionCamRecorder.configuration.E[i].AH ? sessionCamRecorder.configuration.E[i].AH : 0);
                                }
                            }
                            if (!fO) i++;
                        }
                    }
                    if (!fO) {
                        if (sessionCamRecorder.an(name, iZ, 'card', 'day') || sessionCamRecorder.an(name, iZ, 'card', 'month') || sessionCamRecorder.an(name, iZ, 'card', 'num') || sessionCamRecorder.an(name, iZ, 'card', 'year') || sessionCamRecorder.an(name, iZ, 'card', 'ccard') || sessionCamRecorder.an(name, iZ, 'card', 'credit') || sessionCamRecorder.an(name, iZ, 'sort', 'code') || sessionCamRecorder.an(name, iZ, 'account', 'num') || sessionCamRecorder.an(name, iZ, 'account', 'no') || sessionCamRecorder.an(name, iZ, 'security', 'code') || sessionCamRecorder.an(name, iZ, 'security', 'answer') || sessionCamRecorder.an(name, iZ, 'cv', 'cvv') || sessionCamRecorder.an(name, iZ, 'cv', 'cv2') || sessionCamRecorder.an(name, iZ, 'cv', 'ccv') || sessionCamRecorder.an(name, iZ, 'cv', 'cvc') || sessionCamRecorder.an(name, iZ, 'cv', 'num') || sessionCamRecorder.an(name, iZ, 'exp', 'day') || sessionCamRecorder.an(name, iZ, 'exp', 'month') || sessionCamRecorder.an(name, iZ, 'exp', 'year') || sessionCamRecorder.an(name, iZ, 'cc', 'day') || sessionCamRecorder.an(name, iZ, 'cc', 'month') || sessionCamRecorder.an(name, iZ, 'cc', 'num') || sessionCamRecorder.an(name, iZ, 'cc', 'year') || (name.indexOf('password') >= 0) || (iZ.indexOf('password') >= 0) || (name.indexOf('security') >= 0) || (iZ.indexOf('security') >= 0) || (name.indexOf('cardno') >= 0) || (iZ.indexOf('cardno') >= 0) || (name.indexOf('cvn') >= 0) || (iZ.indexOf('cvn') >= 0)) fO = new sessionCamRecorder.fq();
                    }
                } else {
                    if ((sessionCamRecorder.configuration.AY === false) || (gN.getAttribute && ((gN.getAttribute('type') === 'button') || (gN.getAttribute('type') === 'submit')))) fO = false;
                    else fO = new sessionCamRecorder.fq();
                }
            }
        }
    } catch (err) {
        sessionCamRecorder.log('getExcludeDetailsForElement', err);
        return new sessionCamRecorder.fq();
    }
    return fO;
};
SessionCamRecorder.prototype.an = function(s0, s1, match0, match1) {
    var fO = false;
    if (s0.indexOf(match0) >= 0) fO = (s0.indexOf(match1) >= 0);
    if (!fO && (s1.indexOf(match0) >= 0)) fO = (s1.indexOf(match1) >= 0);
    return fO;
}; //-->
//-->
//-->
SessionCamRecorder.prototype.bS = function(s) {
    var fO = s,
        cN, eA, kP, lA, match, lastIndex, kq;
    if (fO.indexOf(sessionCamRecorder.ll) >= 0) {
        cN = sessionCamRecorder.ll;
        eA = sessionCamRecorder.ld;
        kP = "(" + cN + ")(.*?)(" + eA + ")";
        lA = new RegExp(kP, "gi");
        lastIndex = 0;
        fO = fO.replace(/\n/g, "SessionCam:NewLine");
        match = lA.exec(fO);
        while (match) {
            lastIndex = lA.lastIndex;
            fO = fO.replace(match[0], sessionCamRecorder.dM(match[0]));
            match = lA.exec(fO);
        }
        kq = fO.substr(lastIndex).indexOf(cN);
        if (kq >= 0) {
            kq += lastIndex;
            fO = fO.substring(0, kq) + sessionCamRecorder.dM(fO.substr(kq));
        }
        fO = fO.replace(/SessionCam:NewLine/g, "\n");
    }
    return fO;
};
SessionCamRecorder.prototype.ms = function(s, parent) {
    return (function($) {
        if ($('body').hasClass(sessionCamRecorder.mA) || (parent && $(parent).hasClass(sessionCamRecorder.mA)) || sessionCamRecorder.configuration.AU) s = sessionCamRecorder.nh(s);
        else if (s.indexOf(sessionCamRecorder.ll) >= 0) s = sessionCamRecorder.bS(s);
        return s;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.mE = function(gN) {
    return (function($) {
        var elements, i;
        if (!gN) return;
        if ($('body').hasClass(sessionCamRecorder.mA) || $(gN).hasClass(sessionCamRecorder.mA) || sessionCamRecorder.configuration.AU) {
            gN.innerHTML = gN.innerHTML.replace(/SessionCam:TempString/g, '');
            sessionCamRecorder.mC(gN);
        } else {
            elements = $('.' + sessionCamRecorder.mA, gN);
            for (i = 0; i < elements.length; i++) sessionCamRecorder.mC(elements[i]);
            if (gN.innerHTML && (gN.innerHTML.indexOf(sessionCamRecorder.ll) >= 0)) gN.innerHTML = sessionCamRecorder.bS(gN.innerHTML);
            gN.innerHTML = gN.innerHTML.replace(/SessionCam:TempString/g, '');
            sessionCamRecorder.lZ($(gN));
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.lZ = function(fU) {
    return (function($) {
        if (window.location.toString().indexOf('everydaymatters.landg.com') >= 0) {
            var i, elements, selector = '.dropdown-menu>li>a,span.address-display,span.dropdown-label,#P783-C1-C3>div>div>span,#P35-C0-C0-C4>div>div>span,#P174-C3-C2-C3 >div>div.text-field';
            if (fU.is(selector)) fU.html(sessionCamRecorder.nh(fU.html()));
            else {
                elements = $(selector, fU);
                for (i = 0; i < elements.length; i++) $(elements[i]).html(sessionCamRecorder.nh($(elements[i]).html()));
            }
        }
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.dM = function(s) {
    var sb, kP, lA, jn, bV, lastIndex;
    sb = new sessionCamRecorder.iO();
    kP = "(<([^<]*?)[\/]?>)|(SessionCam:NewLine)";
    lA = new RegExp(kP, "gi");
    jn = lA.exec(s);
    bV = 0;
    lastIndex = -1;
    while (jn) {
        lastIndex = lA.lastIndex - jn[0].length;
        if (lastIndex > 0) sb.append(this.fg(s.substring(bV, lastIndex)));
        sb.append(jn[0]);
        bV = lA.lastIndex;
        jn = lA.exec(s);
    }
    if (bV > 0) sb.append(this.fg(s.substr(bV)));
    else {
        sb = new sessionCamRecorder.iO();
        sb.append(s);
    }
    return sb.toString();
};
SessionCamRecorder.prototype.fg = function(s, gb) {
    var fO, str, dW, length, fs, i, charCode, eU;
    fO = new sessionCamRecorder.iO();
    if ((s !== undefined) && (s !== null)) {
        str = String(s);
        dW = 0;
        length = str.length;
        fs = -1;
        if (gb && gb.ShowLastChars) {
            fs = length - 1;
            eU = 0;
            while ((fs >= 0) && (eU < gb.ShowLastChars)) {
                if (str.charCodeAt(fs) > 32) eU++;
                fs--;
            }
        } else fs = length;
        for (i = 0; i < length; i++) {
            charCode = str.charCodeAt(i);
            if (charCode > 32) {
                if (gb) {
                    if (dW >= gb.ShowFirstChars) {
                        if (i <= fs) fO.append('*');
                        else fO.append(str.charAt(i));
                    } else fO.append(str.charAt(i));
                    dW++;
                } else fO.append('*');
            } else if (charCode == 10) fO.append("SessionCam:NewLine");
            else if (charCode != 13) fO.append(" ");
        }
    }
    return fO.toString();
};
SessionCamRecorder.prototype.nh = function(s) {
    var fO = '';
    if (s) {
        var gN = document.createElement('DIV');
        gN.innerHTML = s;
        sessionCamRecorder.mC(gN);
        fO = gN.innerHTML;
    }
    return fO;
};
SessionCamRecorder.prototype.mC = function(gN) {
    var i, fx = sessionCamRecorder.mr(gN);
    for (i = 0; i < fx.length; i++) {
        if (fx[i].data && fx[i].data.replace) fx[i].data = fx[i].data.replace(/\S/gi, '*');
    }
};
SessionCamRecorder.prototype.mr = function(node, mK) {
    var fx = [],
        lS = /\S/;

    function lV(node) {
        if (node.nodeType == 3) {
            if (mK || lS.test(node.nodeValue)) {
                fx.push(node);
            }
        } else {
            for (var i = 0, hj = node.childNodes.length; i < hj; ++i) {
                lV(node.childNodes[i]);
            }
        }
    };
    lV(node);
    return fx;
};
SessionCamRecorder.prototype.mX = function(value, fU) {
    var fO = (value ? value.replace(/\S/g, '*') : ''),
        type = fU.attr('type') || '';
    switch (type) {
        case 'week':
            fO = '2000-W01';
            break;
        case 'month':
            fO = '2000-01';
            break;
        case 'time':
            fO = '00:00';
            break;
        case 'date':
            fO = '2000-01-01';
            break;
        case 'datetime':
        case 'datetime-local':
            fO = '2000-01-01T00:00';
            break;
        case 'color':
            fO = '#000000';
            break;
        case 'number':
            fO = '0';
            break;
        case 'range':
            fO = fU.attr('min') || '0';
            break;
    }
    return fO;
};
SessionCamRecorder.prototype.bW = function() {
    return (function($) {
        $(document).ready(function() {
            var i, j, o, defaultValue, kd, kw = $('input, select, textarea');
            for (i = 0; i < kw.length; i++) {
                o = kw[i];
                defaultValue = '';
                kd = '';
                if (o.type == 'text' || o.type == 'search' || o.type == 'number' || o.type == 'url' || o.type == 'email' || o.type == 'tel' || o.type == 'textarea') {
                    kd = o.value;
                    defaultValue = o.defaultValue;
                }
                if (o.type == 'checkbox' || o.type == 'radio') {
                    kd = o.checked;
                    defaultValue = o.defaultChecked;
                }
                if (o.type == 'select-one') {
                    for (j = 0; j < o.options.length; j++) {
                        if (o.options[j].defaultSelected) defaultValue = o.options[j].value;
                    }
                    if ((o.options.length > 0) && (o.selectedIndex >= 0)) kd = o.options[o.selectedIndex].value;
                }
                if (kd != defaultValue) {
                    switch (o.type) {
                        case 'textarea':
                            sessionCamRecorder.gG(sessionCamRecorder.fo.jr, kd, sessionCamRecorder.eO(o), 'textarea', null, null, o, null, sessionCamRecorder.jG + 1);
                            break;
                        case 'checkbox':
                            sessionCamRecorder.gG(sessionCamRecorder.fo.jr, kd, sessionCamRecorder.eO(o), 'checkbox', null, null, o, null, sessionCamRecorder.jG + 1);
                            break;
                        case 'radio':
                            sessionCamRecorder.gG(sessionCamRecorder.fo.jr, kd, sessionCamRecorder.eO(o), 'radio', null, null, o, null, sessionCamRecorder.jG + 1);
                            break;
                        case 'text':
                        case 'search':
                        case 'number':
                        case 'url':
                        case 'email':
                        case 'tel':
                            sessionCamRecorder.gG(sessionCamRecorder.fo.jr, kd, sessionCamRecorder.eO(o), $(o).attr('type'), null, null, o, null, sessionCamRecorder.jG + 1);
                            break;
                        case '':
                            sessionCamRecorder.gG(sessionCamRecorder.fo.jr, kd, sessionCamRecorder.eO(o), 'text', null, null, o, null, sessionCamRecorder.jG + 1);
                            break;
                        case 'select-one':
                            if (defaultValue.length > 0) sessionCamRecorder.gG(sessionCamRecorder.fo.jr, sessionCamRecorder.cE($(o)), sessionCamRecorder.eO(o), 'select', null, null, o, null, sessionCamRecorder.jG + 1);
                            break;
                    }
                }
            }
            sessionCamRecorder.gG(sessionCamRecorder.fo.Start, null, null, null, null, null, null, null, sessionCamRecorder.jG + 1);
        });
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.aK = function(kb, gN) {
    return (function($) {
        var kw, i, fU, jb, nodeName, gv, gb, bX, defaultValue, eZ, mT, nv;
        var nc = [];
        var nt = [];
        kw = $('input, textarea, select', gN);
        for (i = 0; i < kw.length; i++) {
            fU = $(kw[i]);
            jb = sessionCamRecorder.dP(fU);
            nodeName = sessionCamRecorder.hJ(kw[i]);
            if (nodeName === 'input') nodeName = fU.attr('type') || '';
            eZ = false;
            switch (nodeName) {
                case 'radio':
                    defaultValue = sessionCamRecorder.iS(fU);
                    eZ = true;
                    if ($.inArray(fU[0].getAttribute('name'), nc) < 0) {
                        mT = sessionCamRecorder.ij(fU);
                        nv = sessionCamRecorder.nk(fU);
                        sessionCamRecorder.gG(sessionCamRecorder.fo.DefaultValue, nv, mT, nodeName, null, null, kw[i], null, kb);
                        nc.push(fU[0].getAttribute('name'));
                    }
                    break;
                case 'checkbox':
                    defaultValue = sessionCamRecorder.iS(fU);
                    eZ = true;
                    if ($.inArray(fU[0].getAttribute('name'), nt) < 0) {
                        mT = sessionCamRecorder.ij(fU);
                        nv = sessionCamRecorder.mn(fU);
                        sessionCamRecorder.gG(sessionCamRecorder.fo.DefaultValue, nv, mT, nodeName, null, null, kw[i], null, kb);
                        nt.push(fU[0].getAttribute('name'));
                    }
                    break;
                case 'select':
                    gv = (sessionCamRecorder.configuration != null && !sessionCamRecorder.configuration.A);
                    gb = sessionCamRecorder.eb(fU[0]);
                    if (fU.attr('multiple')) defaultValue = sessionCamRecorder.jt(fU, gv, gb);
                    else {
                        bX = $('option:selected', fU);
                        if (!bX.length) bX = $('option', fU);
                        if (bX.length) defaultValue = '<option value="' + (gv || gb ? sessionCamRecorder.fg(bX[0].value) : bX[0].value) + '" selected="selected">' + (gv || gb ? sessionCamRecorder.fg(bX[0].text, gb) : bX[0].text);
                        else defaultValue = '';
                    }
                    eZ = true;
                    break;
                case 'hidden':
                case 'image':
                case 'reset':
                case 'button':
                case 'submit':
                case 'password':
                case 'file':
                    break;
                default:
                    defaultValue = sessionCamRecorder.fW(fU.val()).replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    eZ = true;
                    break;
            }
            if (eZ) sessionCamRecorder.gG(sessionCamRecorder.fo.DefaultValue, defaultValue, jb, nodeName, null, null, kw[i], null, kb);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.ir = function(gl, hm, hC) {
    return (gl + hC >= hm && gl - hC <= hm);
};
SessionCamRecorder.prototype.cU = function() {
    return (function($) {
        function mW() {
            try {
                sessionCamRecorder.dk();
                sessionCamRecorder.jM();
            } catch (err) {
                if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in beforeUnloadProcess', err);
            }
        };
        if (sessionCamRecorder.configuration.AZ) {
            try {
                $(window).bind('popstate', function() {
                    sessionCamRecorder.mS();
                });
                $(window).bind('hashchange', function() {
                    sessionCamRecorder.mS();
                });
                if (window.history && window.history.pushState) {
                    (function(history) {
                        var pushState = history.pushState;
                        history.pushState = function() {
                            var fO = pushState.apply(history, arguments);
                            sessionCamRecorder.mS();
                            return fO;
                        };
                    })(window.history);
                }
                if (window.history && window.history.replaceState) {
                    (function(history) {
                        var replaceState = history.replaceState;
                        history.replaceState = function() {
                            var fO = replaceState.apply(history, arguments);
                            sessionCamRecorder.mS();
                            return fO;
                        };
                    })(window.history);
                }
            } catch (err) {
                if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in bindEvents for AZ', err);
            }
        }
        try {
            var du = 'a,input[type="submit"],input[type="button"],button';
            sessionCamRecorder.dO();
            sessionCamRecorder.cC();
            sessionCamRecorder.iQ();
            if (sessionCamRecorder.configuration.AW && sessionCamRecorder.configuration.AW.length) {
                try {
                    $(sessionCamRecorder.configuration.AW).live('mouseenter', function() {
                        sessionCamRecorder.bg(this, 'scHover', 1);
                        sessionCamRecorder.gG(sessionCamRecorder.fo.ea, '', sessionCamRecorder.et(this), sessionCamRecorder.hJ(this));
                    });
                    $(sessionCamRecorder.configuration.AW).live('mouseleave', function() {
                        sessionCamRecorder.bg(this, 'scHover', 0);
                        sessionCamRecorder.gG(sessionCamRecorder.fo.ns, '', sessionCamRecorder.et(this), sessionCamRecorder.hJ(this));
                    });
                } catch (err) {
                    sessionCamRecorder.log('Error in bindEvents applying configuration.AW', err);
                }
            }
            $(document).mousemove(function(e) {
                try {
                    sessionCamRecorder.cr(e, false);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for $(document).mousemove', err);
                }
            });
            $(document).scroll(function(e) {
                try {
                    sessionCamRecorder.cr(e, true);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for $(document).scroll', err);
                }
            });
            sessionCamRecorder.ob(sessionCamRecorder.lQ());
            $(document).mousedown(function(e) {
                try {
                    sessionCamRecorder.hb(e);
                    sessionCamRecorder.mI = e.which;
                    sessionCamRecorder.gG(sessionCamRecorder.fo.MouseDown, sessionCamRecorder.mI, sessionCamRecorder.et(e.target), sessionCamRecorder.hJ(e.target));
                    if (!$(e.target).is(du)) sessionCamRecorder.fH(sessionCamRecorder.et(e.target), sessionCamRecorder.hJ(e.target));
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for $(document).mousedown', err);
                }
            });
            $(document).mouseup(function(e) {
                try {
                    sessionCamRecorder.hb(e);
                    sessionCamRecorder.gG(sessionCamRecorder.fo.MouseUp, sessionCamRecorder.mI, sessionCamRecorder.et(e.target), sessionCamRecorder.hJ(e.target));
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for $(document).mouseup', err);
                }
            });
            $(document).click(function(e) {
                try {
                    sessionCamRecorder.hb(e);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for $(document).click', err);
                }
            });
            $(window).bind('orientationchange resize', function() {
                try {
                    window.clearTimeout(this.hk);
                    this.hk = window.setTimeout(function() {
                        var scale, w, h, data;
                        sessionCamRecorder.iQ();
                        if (sessionCamRecorder.fY) {
                            scale = sessionCamRecorder.ih();
                            w = Math.round(window.innerWidth);
                            h = Math.round(window.innerHeight);
                            if (sessionCamRecorder.configuration && sessionCamRecorder.configuration.Q && sessionCamRecorder.configuration.Q.indexOf && (sessionCamRecorder.configuration.Q.indexOf('iPhone') > -1)) h += 60;
                            data = w + '-' + h + '|' + sessionCamRecorder.ih() + '-' + $(window).scrollLeft() + '-' + $(window).scrollTop() + '|' + sessionCamRecorder.lN() + '-' + sessionCamRecorder.mG();
                            if (!sessionCamRecorder.ir(w, sessionCamRecorder.gU, 20) || !sessionCamRecorder.ir(h, sessionCamRecorder.hy, 20)) {
                                sessionCamRecorder.gG(sessionCamRecorder.fo.ix, data, null, null, null, null, this, null, sessionCamRecorder.getTime() - sessionCamRecorder.fd);
                                sessionCamRecorder.gU = w;
                                sessionCamRecorder.hy = h;
                            }
                        } else {
                            sessionCamRecorder.gG(sessionCamRecorder.fo.ix, sessionCamRecorder.lT() + '-' + sessionCamRecorder.na() + '|' + '1' + '-' + $(window).scrollLeft() + '-' + $(window).scrollTop() + '|' + sessionCamRecorder.lN() + '-' + sessionCamRecorder.mG(), null, null, null, null, this, null, sessionCamRecorder.getTime() - sessionCamRecorder.fd);
                            sessionCamRecorder.gU = sessionCamRecorder.lT();
                            sessionCamRecorder.hy = sessionCamRecorder.na();
                        }
                    }, sessionCamRecorder.fd);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for $(window).resize', err);
                }
            });
            $('textarea').live('focus', function() {
                try {
                    sessionCamRecorder.lk($(this));
                    sessionCamRecorder.jJ($(this));
                    sessionCamRecorder.bg(this, "newlyFocussed", "1");
                    sessionCamRecorder.gG(sessionCamRecorder.fo.iU, $(this).val(), sessionCamRecorder.eO(this), 'textarea', null, null, this);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for textarea.focus', err);
                }
            });
            $('textarea').live('blur', function() {
                try {
                    sessionCamRecorder.kH($(this));
                    sessionCamRecorder.gG(sessionCamRecorder.fo.jr, $(this).val(), sessionCamRecorder.eO(this), 'textarea', null, null, this);
                    sessionCamRecorder.bg(this, 'scVal', $(this).val());
                    sessionCamRecorder.bg(this, "newlyFocussed", null);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for textarea.blur', err);
                }
            });
            $('select').live('focus', function() {
                try {
                    sessionCamRecorder.lk($(this));
                    sessionCamRecorder.jJ($(this));
                    var hu, val, gb;
                    hu = $(this).attr('multiple');
                    val = (hu ? sessionCamRecorder.jt($(this)) : $(this).val());
                    if (!hu) {
                        gb = sessionCamRecorder.eb(this);
                        if ((sessionCamRecorder.configuration != null && !sessionCamRecorder.configuration.A) || gb) val = sessionCamRecorder.fg(val);
                    }
                    sessionCamRecorder.gG(sessionCamRecorder.fo.iU, val, sessionCamRecorder.eO(this), 'select', null, null, this);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for select.focus', err);
                }
            });
            $('select').live('blur', function() {
                try {
                    sessionCamRecorder.kH($(this));
                    var val = $(this).val();
                    if ($.isArray(val)) val = val.join();
                    sessionCamRecorder.bg(this, 'scVal', val);
                    sessionCamRecorder.gG(sessionCamRecorder.fo.jr, ($(this).attr('multiple') ? sessionCamRecorder.jt($(this)) : sessionCamRecorder.cE($(this))), sessionCamRecorder.eO(this), 'select', null, null, this);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for select.blur', err);
                }
            });
            $('form').live('submit', function() {
                try {
                    sessionCamRecorder.gG(sessionCamRecorder.fo.kr, null, null, 'form');
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for form.submit', err);
                }
            });
            $(sessionCamRecorder.kX + ', ' + sessionCamRecorder.jZ).live('focus', function(e) {
                try {
                    if (e && e.target) {
                        sessionCamRecorder.lk($(this));
                        sessionCamRecorder.jJ($(this));
                        var fU = $(this);
                        sessionCamRecorder.bg(this, "newlyFocussed", "1");
                        sessionCamRecorder.gG(sessionCamRecorder.fo.iU, fU.val(), sessionCamRecorder.eO(this), fU.attr('type'), null, null, fU[0]);
                    }
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for inputTextTypes.focus', err);
                }
            });
            $(sessionCamRecorder.kX + ', ' + sessionCamRecorder.jZ).live('blur', function(e) {
                try {
                    if (e && e.target) {
                        sessionCamRecorder.kH($(this));
                        sessionCamRecorder.gG(sessionCamRecorder.fo.jr, $(this).val(), sessionCamRecorder.eO(this), $(this).attr('type'), null, null, this);
                        sessionCamRecorder.bg(this, 'scVal', $(this).val());
                        sessionCamRecorder.bg(this, "newlyFocussed", null);
                    }
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for inputTextTypes.blur', err);
                }
            });
            $('input[type=checkbox]').live('click', function() {
                try {
                    sessionCamRecorder.lk($(this));
                    sessionCamRecorder.jJ($(this));
                    sessionCamRecorder.kH($(this));
                    var val = sessionCamRecorder.mD($(this));
                    sessionCamRecorder.bg(this, 'scVal', val);
                    sessionCamRecorder.gG(sessionCamRecorder.fo.iJ, sessionCamRecorder.iS($(this)), sessionCamRecorder.dP($(this)), 'checkbox', sessionCamRecorder.et(this), val, this);
                    sessionCamRecorder.gG(sessionCamRecorder.fo.mU, sessionCamRecorder.mn($(this)), sessionCamRecorder.ij($(this)), 'checkbox');
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for checkbox.click', err);
                }
            });
            $('input[type=radio]').live('click', function() {
                try {
                    sessionCamRecorder.lk($(this));
                    sessionCamRecorder.jJ($(this));
                    sessionCamRecorder.kH($(this));
                    var val = sessionCamRecorder.mD($(this));
                    sessionCamRecorder.bg(this, 'scVal', val);
                    sessionCamRecorder.gG(sessionCamRecorder.fo.iJ, sessionCamRecorder.iS($(this)), sessionCamRecorder.dP($(this)), 'radio', sessionCamRecorder.et(this), val, this);
                    sessionCamRecorder.gG(sessionCamRecorder.fo.mU, sessionCamRecorder.nk($(this)), sessionCamRecorder.ij($(this)), 'radio');
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for radio.click', err);
                }
            });
            $(document).keydown(function(e) {
                try {
                    sessionCamRecorder.mp(e, "kd");
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for $(document).keydown', err);
                }
            });
            $(document).keypress(function(e) {
                try {
                    sessionCamRecorder.mp(e, "k");
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for $(document).keypress', err);
                }
            });
            if ("onbeforeunload" in window) {
                if (window.addEventListener) {
                    window.addEventListener('beforeunload', mW);
                } else {
                    window.attachEvent('beforeunload', mW);
                }
            } else {
                $(window).unload(mW);
            }
            $(du).live('mouseenter', function() {
                try {
                    sessionCamRecorder.nd();
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) {
                        sessionCamRecorder.log('Error in SessionCam handler for $(linkAnalyticsElements).mouseenter', err);
                    }
                }
            });
            $(du).live('mouseleave', function() {
                try {
                    sessionCamRecorder.dS(sessionCamRecorder.et(this), sessionCamRecorder.hJ(this), false);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) {
                        sessionCamRecorder.log('Error in SessionCam handler for $(linkAnalyticsElements).mouseleave', err);
                    }
                }
            });
            $(du).live('mousedown', function(e) {
                try {
                    sessionCamRecorder.hb(e);
                    sessionCamRecorder.dS(sessionCamRecorder.et(this), sessionCamRecorder.hJ(this), true);
                } catch (err) {
                    if (sessionCamRecorder && sessionCamRecorder.log) sessionCamRecorder.log('Error in SessionCam handler for $(linkAnalyticsElements).mousedown', err);
                }
            });
        } catch (err) {
            sessionCamRecorder.log('bindEvents', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.mn = function(fU) {
    return (function($) {
        var fO, name, group, i, value;
        fO = new sessionCamRecorder.iO();
        name = fU[0].getAttribute('name');
        if (name === null) group = $('input[name=]');
        else group = $('input[name="' + name + '"]');
        for (i = 0; i < group.length; i++) {
            if (!fO.isEmpty()) fO.append(',');
            if (group[i].checked) {
                value = group[i].getAttribute('value');
                if (!value || (value == 'on')) value = 'true';
            } else value = "false";
            fO.append(value);
        }
        return fO.toString();
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.nk = function(fU) {
    return (function($) {
        var radioName = fU[0].getAttribute('name');
        var value;
        if (radioName === null) value = $('input[name=]:checked').val();
        else value = $('input[name="' + radioName + '"]:checked').val();
        if (!value) value = '';
        return value;
    })(window.sessionCamJQuery);
};
SessionCamRecorder.prototype.mD = function(fU) {
    return fU[0].checked;
};
SessionCamRecorder.prototype.iS = function(fU) {
    var type = fU.attr('type').toLowerCase();
    var value = (fU.length ? fU[0].getAttribute('value') : undefined);
    if (!value) value = 'true';
    if (type.toLowerCase() == 'checkbox') return value;
    else if (type.toLowerCase() == 'radio') return value + '{' + fU.attr('checked') + '}';
    else return '';
};
SessionCamRecorder.prototype.nd = function() {
    sessionCamRecorder.kj++;
    sessionCamRecorder.kk = sessionCamRecorder.getTime();
};
SessionCamRecorder.prototype.gj = function(jb, kS, fy) {
    return (function($) {
        if ((jb !== undefined) && (jb !== null) && (jb !== '')) {
            var jg, jT, fl, fw, gq, data, gI = sessionCamRecorder.getTime();
            var ec = (sessionCamRecorder.configuration.AS && sessionCamRecorder.kj < sessionCamRecorder.gM);
            if (sessionCamRecorder.kk === 0) {
                jg = 0;
                jT = gI - sessionCamRecorder.eq;
            } else {
                jg = (gI - sessionCamRecorder.kk);
                jT = (sessionCamRecorder.kk - sessionCamRecorder.eq);
            }
            fw = jg + ',' + jT + ',' + (fy ? '1' : '0') + ',' + sessionCamRecorder.kj;
            if (fy) {
                sessionCamRecorder.eT(sessionCamRecorder.fo.mL);
                sessionCamRecorder.eT(sessionCamRecorder.fo.Click);
                sessionCamRecorder.scrollX = $(document).scrollLeft();
                sessionCamRecorder.scrollY = $(document).scrollTop();
                fl = sessionCamRecorder.scrollX + ',' + sessionCamRecorder.scrollY + ',' + sessionCamRecorder.lT() + ',' + sessionCamRecorder.na() + ',' + (gI - sessionCamRecorder.gm);
                gq = sessionCamRecorder.kp + ',' + sessionCamRecorder.jX + ',' + (gI - sessionCamRecorder.eq) + sessionCamRecorder.fi + (jb) + sessionCamRecorder.fi + (kS ? kS : '');
                sessionCamRecorder.gm = gI;
                data = sessionCamRecorder.fo.mL + sessionCamRecorder.fi + (gI - sessionCamRecorder.jG) + sessionCamRecorder.fi + fl;
                if (ec) data += sessionCamRecorder.ed + sessionCamRecorder.fo.eH + sessionCamRecorder.fi + (gI - sessionCamRecorder.jG) + sessionCamRecorder.fi + fw + sessionCamRecorder.fi + sessionCamRecorder.fi + sessionCamRecorder.fi + sessionCamRecorder.fi + jb;
                data += sessionCamRecorder.ed + sessionCamRecorder.fo.Click + sessionCamRecorder.fi + (gI - sessionCamRecorder.jG) + sessionCamRecorder.fi + gq + sessionCamRecorder.fi + sessionCamRecorder.fi + jb;
                if (data.length > 2000) data = sessionCamRecorder.fo.Click + sessionCamRecorder.fi + (gI - sessionCamRecorder.jG) + sessionCamRecorder.fi + gq + sessionCamRecorder.fi + sessionCamRecorder.fi + jb;
            } else if (ec) {
                data = sessionCamRecorder.fo.eH + sessionCamRecorder.fi + (gI - sessionCamRecorder.jG) + sessionCamRecorder.fi + fw + sessionCamRecorder.fi + sessionCamRecorder.fi + sessionCamRecorder.fi + sessionCamRecorder.fi + jb;
            } else data = '';
            return data;
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.eT = function(type, jb) {
    var remove = -1,
        lE = !jb,
        lK;
    for (var i = sessionCamRecorder.lc.bT.length - 1; i >= 0; i--) {
        if (sessionCamRecorder.lc.bT[i].substring(0, type.length + 1) === type + sessionCamRecorder.fi) {
            if (!lE) {
                lK = sessionCamRecorder.lc.bT[i].split(sessionCamRecorder.fi);
                lE = (((lK.length > 3) && (lK[3] == jb)) || ((lK.length > 6) && (lK[6] == jb)));
            }
            if (lE) {
                remove = i;
                break;
            }
        }
    }
    if (remove > -1) sessionCamRecorder.lc.bT.splice(remove, 1);
};
SessionCamRecorder.prototype.dS = function(jb, kS, fy) {
    var data = sessionCamRecorder.gj(jb, kS, fy);
    if (data.length > 0) sessionCamRecorder.makeGETRequest(data);
};
SessionCamRecorder.prototype.lj = function() {
    return (function($) {
        var ge, he, gn;
        if (sessionCamRecorder.as == -1) {
            if (!sessionCamRecorder.fY && ($(document).height() > $(window).height())) {
                if ($.browser.msie) {
                    ge = $('<textarea cols="10" rows="2"></textarea>').css({
                        position: 'absolute',
                        top: -1000,
                        left: -1000
                    }).appendTo('body');
                    he = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({
                        position: 'absolute',
                        top: -1000,
                        left: -1000
                    }).appendTo('body');
                    sessionCamRecorder.as = ge.width() - he.width();
                    ge.add(he).remove();
                } else {
                    gn = $('<div />').css({
                        width: 100,
                        height: 100,
                        overflow: 'auto',
                        position: 'absolute',
                        top: -1000,
                        left: -1000
                    }).prependTo('body').append('<div />').find('div').css({
                        width: '100%',
                        height: 200
                    });
                    sessionCamRecorder.as = 100 - gn.width();
                    gn.parent().remove();
                }
            } else sessionCamRecorder.as = 0;
        }
        return sessionCamRecorder.as;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.ci = function() {
    return (function($) {
        if (sessionCamRecorder.kc == -1) {
            if (!sessionCamRecorder.fY && ($(document).width() > $(window).width())) sessionCamRecorder.kc = sessionCamRecorder.lj();
            else sessionCamRecorder.kc = 0;
        }
        return sessionCamRecorder.kc;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.fH = function(jb, kS) {
    var data = sessionCamRecorder.kp + ',' + sessionCamRecorder.jX + ',' + (sessionCamRecorder.getTime() - sessionCamRecorder.jG);
    sessionCamRecorder.gG(sessionCamRecorder.fo.Click, data, jb, kS);
};
SessionCamRecorder.prototype.dO = function() {
    return (function($) {
        if (sessionCamRecorder.cO == -1) sessionCamRecorder.scrollX = sessionCamRecorder.scrollY = 0;
        else {
            sessionCamRecorder.scrollX = $(document).scrollLeft();
            sessionCamRecorder.scrollY = $(document).scrollTop();
        }
        if (sessionCamRecorder.cO != sessionCamRecorder.scrollX || sessionCamRecorder.cq != sessionCamRecorder.scrollY) {
            var data = sessionCamRecorder.scrollX + ',' + sessionCamRecorder.scrollY + ',' + sessionCamRecorder.lT() + ',' + sessionCamRecorder.na() + ',' + (sessionCamRecorder.getTime() - sessionCamRecorder.gm);
            sessionCamRecorder.gG(sessionCamRecorder.fo.mL, data);
            sessionCamRecorder.gm = sessionCamRecorder.getTime();
        }
        sessionCamRecorder.cO = sessionCamRecorder.scrollX;
        sessionCamRecorder.cq = sessionCamRecorder.scrollY;
        window.setTimeout(sessionCamRecorder.dO, sessionCamRecorder.fd);
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.makeGETRequest = function(data) {
    if (sessionCamRecorder.me || sessionCamRecorder.mt) return false;
    var sb = new sessionCamRecorder.iO(),
        img;
    if (sessionCamRecorder.lB && sessionCamRecorder.configuration != null && sessionCamRecorder.configuration.I) {
        data = 'data=' + encodeURIComponent(data) + '&url=' + encodeURIComponent(sessionCamRecorder.lb);
        data = data.replace(/~/g, '%7E');
        sb.append(sessionCamRecorder.lg + '/record.asmx/SaveGETEvents');
        sb.append('?d=' + sessionCamRecorder.eW(data));
        sb.append('&id=' + sessionCamRecorder.configuration.H);
        sb.append('&w=' + sessionCamRecorder.lN());
        sb.append('&h=' + sessionCamRecorder.mG());
        sb.append('&originalUrl=' + encodeURIComponent(decodeURI(window.location)));
        sb.append('&plsse=' + sessionCamRecorder.jG);
        if (sessionCamRecorder.configuration.VP) sb.append('&vp=1');
        if (sessionCamRecorder.configuration.S) sb.append('&si=' + sessionCamRecorder.configuration.S);
        if (sessionCamRecorder.configuration.AA) sb.append('&aa=' + sessionCamRecorder.configuration.AA);
        if (sessionCamRecorder.configuration.AB) sb.append('&ab=' + sessionCamRecorder.configuration.AB);
        sb.append('&jsver=' + sessionCamRecorder.gg);
        img = new window.Image();
        img.src = sb.toString();
    }
};
SessionCamRecorder.prototype.eW = function(input) {
    var output, gC, hB, gB, cx, dn, kU, lw, i;
    output = new sessionCamRecorder.iO();
    i = 0;
    while (i < input.length) {
        gC = input.charCodeAt(i++);
        hB = input.charCodeAt(i++);
        gB = input.charCodeAt(i++);
        cx = gC >> 2;
        dn = ((gC & 3) << 4) | (hB >> 4);
        kU = ((hB & 15) << 2) | (gB >> 6);
        lw = gB & 63;
        if (isNaN(hB)) kU = lw = 64;
        else if (isNaN(gB)) lw = 64;
        output.append(sessionCamRecorder.kM.charAt(cx) + sessionCamRecorder.kM.charAt(dn) + sessionCamRecorder.kM.charAt(kU) + sessionCamRecorder.kM.charAt(lw));
    }
    return output.toString();
};
SessionCamRecorder.prototype.dk = function() {
    return (function($) {
        var id, gb, val;
        if (document.activeElement && ($(document.activeElement).is(sessionCamRecorder.kX + ', ' + sessionCamRecorder.jZ + ', textarea') || ($(document.activeElement).is('SELECT')))) {
            sessionCamRecorder.kH($(document.activeElement));
            id = sessionCamRecorder.eO(document.activeElement);
            sessionCamRecorder.eT(sessionCamRecorder.fo.jr, id);
            gb = sessionCamRecorder.eb(document.activeElement);
            if ($(document.activeElement).is('SELECT')) val = ($(document.activeElement).attr('multiple') ? sessionCamRecorder.jt($(document.activeElement)) : sessionCamRecorder.cE($(document.activeElement)));
            else val = $(document.activeElement).val();
            if (!sessionCamRecorder.configuration.A || gb) val = sessionCamRecorder.jx('b', val, sessionCamRecorder.hJ(document.activeElement), gb, $(document.activeElement));
            val = sessionCamRecorder.mO(val, document.activeElement);
            sessionCamRecorder.makeGETRequest(sessionCamRecorder.fo.jr + sessionCamRecorder.fi + (sessionCamRecorder.getTime() - sessionCamRecorder.jG) + sessionCamRecorder.fi + val + sessionCamRecorder.fi + id + sessionCamRecorder.fi + $(document.activeElement).attr('type') + sessionCamRecorder.fi + sessionCamRecorder.fi + id);
        }
        sessionCamRecorder.gG(sessionCamRecorder.fo.iH);
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.lk = function(fU) {
    if (!this.gi) {
        this.gG(sessionCamRecorder.fo.hQ, '', this.dP(fU), null, null, null, fU[0]);
        this.gi = true;
    }
    this.lG = sessionCamRecorder.getTime();
    return;
};
SessionCamRecorder.prototype.kH = function(fU) {
    if (this.lG != null) {
        var dV = sessionCamRecorder.getTime() - this.lG;
        var type = fU.attr('type');
        if (type && (type.toLowerCase() == 'checkbox' || type.toLowerCase() == 'radio')) this.gG(sessionCamRecorder.fo.jv, dV, this.ij(fU), null, null, null, fU[0]);
        this.gG(sessionCamRecorder.fo.jv, dV, this.dP(fU), null, null, null, fU[0]);
    }
    return;
};
SessionCamRecorder.prototype.jJ = function(fU) {
    return (function($) {
        var type = fU.attr('type');
        var groupName = null;
        if (type && (type.toLowerCase() == 'checkbox' || type.toLowerCase() == 'radio')) {
            var fnStr = sessionCamRecorder.ij(fU);
            if ($.trim(fnStr)[0] == '{') {
                var fnObj = $.parseJSON(fnStr);
                groupName = fnObj.i;
            } else groupName = fnStr;
        }
        sessionCamRecorder.gG(sessionCamRecorder.fo.ly, '', sessionCamRecorder.dP(fU), groupName, null, null, fU[0]);
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.cC = function() {
    if (sessionCamRecorder.dL != sessionCamRecorder.kp || sessionCamRecorder.ce != sessionCamRecorder.jX || sessionCamRecorder.cO != sessionCamRecorder.scrollX || sessionCamRecorder.cq != sessionCamRecorder.scrollY) {
        sessionCamRecorder.dL = sessionCamRecorder.kp;
        sessionCamRecorder.ce = sessionCamRecorder.jX;
        sessionCamRecorder.cO = sessionCamRecorder.scrollX;
        sessionCamRecorder.cq = sessionCamRecorder.scrollY;
        sessionCamRecorder.gG(sessionCamRecorder.fo.lU, sessionCamRecorder.kp + '.' + sessionCamRecorder.jX);
    }
    window.setTimeout(sessionCamRecorder.cC, sessionCamRecorder.fd);
    return;
};
SessionCamRecorder.prototype.cr = function(e, mb) {
    return (function($) {
        var ke, cS;
        sessionCamRecorder.scrollX = $(document).scrollLeft();
        sessionCamRecorder.scrollY = $(document).scrollTop();
        if (mb === false && (e.pageX !== undefined) && (e.pageX !== null)) {
            sessionCamRecorder.kp = parseInt(e.pageX, 10);
            sessionCamRecorder.jX = parseInt(e.pageY, 10);
            sessionCamRecorder.ma(e);
            sessionCamRecorder.kZ = sessionCamRecorder.scrollX;
            sessionCamRecorder.jL = sessionCamRecorder.scrollY;
            sessionCamRecorder.cs = false;
        } else {
            if (mb === true && !sessionCamRecorder.cs) {
                sessionCamRecorder.dB = sessionCamRecorder.kp;
                sessionCamRecorder.bY = sessionCamRecorder.jX;
                sessionCamRecorder.cs = true;
            }
            ke = Math.abs(sessionCamRecorder.jL - sessionCamRecorder.scrollY);
            cS = Math.abs(sessionCamRecorder.kZ - sessionCamRecorder.scrollX);
            if (sessionCamRecorder.jL > sessionCamRecorder.scrollY) sessionCamRecorder.jX = sessionCamRecorder.bY - ke;
            else sessionCamRecorder.jX = sessionCamRecorder.bY + ke;
            if (sessionCamRecorder.kZ > sessionCamRecorder.scrollX) sessionCamRecorder.kp = sessionCamRecorder.dB - cS;
            else sessionCamRecorder.kp = sessionCamRecorder.dB + cS;
            if (sessionCamRecorder.kp < 0) sessionCamRecorder.kp = 0;
            if (sessionCamRecorder.jX < 0) sessionCamRecorder.jX = 0;
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.hb = function(e) {
    try {
        var evnt = e;
        if (!evnt) evnt = window.event;
        if (evnt.pageX || evnt.pageY) {
            sessionCamRecorder.kp = parseInt(evnt.pageX, 10);
            sessionCamRecorder.jX = parseInt(evnt.pageY, 10);
        } else if (evnt.clientX || evnt.clientY) {
            sessionCamRecorder.kp = parseInt(evnt.clientX, 10) + parseInt(document.body.scrollLeft, 10) + parseInt(document.documentElement.scrollLeft, 10);
            sessionCamRecorder.jX = parseInt(evnt.clientY, 10) + parseInt(document.body.scrollTop, 10) + parseInt(document.documentElement.scrollTop, 10);
        }
        sessionCamRecorder.ma(e);
    } catch (err) {
        sessionCamRecorder.log('updateMousePositionFromEvent', err);
    }
    return;
};
SessionCamRecorder.prototype.ma = function(e) {
    return (function($) {
        try {
            if ($('body').css('position') === 'fixed') {
                var mj = parseInt($('body').css('left'));
                if (mj) sessionCamRecorder.kp -= mj;
                var my = parseInt($('body').css('top'));
                if (my) sessionCamRecorder.jX -= my;
                var lI = $('body').scrollLeft();
                if (lI) sessionCamRecorder.kp -= lI;
                var lL = $('body').scrollTop();
                if (lL) sessionCamRecorder.jX -= lL;
                var mN = $('html').scrollLeft();
                if (mN) sessionCamRecorder.kp -= mN;
                var mi = $('html').scrollTop();
                if (mi) sessionCamRecorder.jX -= mi;
            } else if (e && e.target && $('.' + sessionCamRecorder.sessioncamMainFixed).length) {
                var fU = $(e.target);
                while (fU.length && !fU.parent().hasClass(sessionCamRecorder.sessioncamMainFixed)) fU = fU.parent();
                if (fU.parent().hasClass(sessionCamRecorder.sessioncamMainFixed)) {
                    sessionCamRecorder.kp += fU.parent().scrollLeft();
                    sessionCamRecorder.jX += fU.parent().scrollTop();
                }
            }
        } catch (err) {
            sessionCamRecorder.log('adjustMouseForBodyFixed', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.jM = function() {
    try {
        if (sessionCamRecorder.lB === true && !sessionCamRecorder.lc.isEmpty() && sessionCamRecorder.configuration != null && sessionCamRecorder.configuration.I) {
            var kW = sessionCamRecorder.lc.toString();
            kW = kW.substr(0, kW.length - 1);
            kW += '&ASPNetSessionId=' + sessionCamRecorder.configuration.H;
            kW += '&w=' + sessionCamRecorder.lN();
            kW += '&h=' + sessionCamRecorder.mG();
            kW += '&originalUrl=' + encodeURIComponent(decodeURI(window.location));
            kW += '&plsse=' + sessionCamRecorder.jG;
            kW += '&jsver=' + sessionCamRecorder.gg;
            if (sessionCamRecorder.configuration.VP) kW += '&vp=1';
            sessionCamRecorder.lh('/record.asmx/SaveEvents', 'POST', 'data=' + kW, sessionCamRecorder.cK);
            sessionCamRecorder.cG('data=' + kW);
            sessionCamRecorder.lc.reset();
        }
        window.setTimeout(sessionCamRecorder.jM, sessionCamRecorder.ft);
    } catch (err) {
        sessionCamRecorder.log('processEventQueue', err);
    }
    return;
};
SessionCamRecorder.prototype.jx = function(e, d, t, gb, fU) {
    var newValue = d,
        ls, jn;
    if (e == sessionCamRecorder.fo.jr || e == sessionCamRecorder.fo.iU || e == sessionCamRecorder.fo.iJ || e == sessionCamRecorder.fo.hY || e == sessionCamRecorder.fo.DefaultValue) {
        if (t != 'select') {
            newValue = sessionCamRecorder.mX(d, fU);
            if (newValue.indexOf('*') >= 0) newValue = sessionCamRecorder.fg(d, gb);
        }
    } else if (e == sessionCamRecorder.fo.KeyPress) {
        ls = new RegExp("k{(.*?)}", "gi");
        jn = ls.exec(d);
        while (jn) {
            newValue = d.replace(jn[0], "k{" + sessionCamRecorder.fg(jn[1]) + "}");
            jn = ls.exec(d);
        }
    }
    return newValue;
};
SessionCamRecorder.prototype.iu = function() {
    try {
        var hp, gW, fA;
        hp = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
        gW = (navigator.appVersion.toLowerCase().indexOf("win") != -1) ? true : false;
        fA = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;

        function bc() {
            var a, b;
            try {
                b = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                a = b.GetVariable("$version");
            } catch (jK) {}
            if (!a) {
                try {
                    b = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    a = "WIN 6,0,21,0";
                    b.AllowScriptAccess = "always";
                    a = b.GetVariable("$version");
                } catch (jK) {}
            }
            if (!a) {
                try {
                    b = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                    a = b.GetVariable("$version");
                } catch (jK) {}
            }
            if (!a) {
                try {
                    b = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash.3");
                    a = "WIN 3,0,18,0";
                } catch (jK) {}
            }
            if (!a) {
                try {
                    b = new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    a = "WIN 2,0,0,11";
                } catch (c) {
                    a = -1;
                }
            }
            return a;
        };

        function bI() {
            var f, a, e, c, h, b, d, g = -1;
            if (navigator.plugins != null && navigator.plugins.length > 0) {
                if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
                    f = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
                    a = navigator.plugins["Shockwave Flash" + f].description;
                    e = a.split(" ");
                    c = e[2].split(".");
                    h = c[0];
                    b = c[1];
                    d = e[3];
                    if (d == "") {
                        d = e[4];
                    }
                    if (d[0] == "d") {
                        d = d.substring(1);
                    } else {
                        if (d[0] == "r") {
                            d = d.substring(1);
                            if (d.indexOf("d") > 0) {
                                d = d.substring(0, d.indexOf("d"));
                            }
                        }
                    }
                    g = h + "." + b + "." + d;
                }
            } else {
                if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) {
                    g = 4;
                } else {
                    if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) {
                        g = 3;
                    } else {
                        if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) {
                            g = 2;
                        } else {
                            if (hp && gW && !fA) {
                                g = bc();
                            }
                        }
                    }
                }
            }
            return g;
        };
        return bI();
    } catch (err) {
        sessionCamRecorder.log('getFlashVersion', err);
    }
};
SessionCamRecorder.prototype.cB = function() {
    return (function($) {
        var params, fE, scale, w, h;
        try {
            params = new sessionCamRecorder.iO();
            fE = sessionCamRecorder.iC('sc.ASP.NET_SESSIONID');
            params.append('doctype=');
            params.append(encodeURIComponent(sessionCamRecorder.jC()));
            params.append('&d=');
            params.append(sessionCamRecorder.ao(sessionCamRecorder.hK, 'body', $('body')[0]));
            params.append('&sse=');
            params.append(sessionCamRecorder.jG);
            if (sessionCamRecorder.fY) {
                scale = sessionCamRecorder.ih();
                w = Math.round(window.innerWidth);
                h = Math.round(window.innerHeight);
                params.append('&w=' + w);
                if (sessionCamRecorder.configuration && sessionCamRecorder.configuration.Q && sessionCamRecorder.configuration.Q.indexOf && sessionCamRecorder.configuration.Q.indexOf('iPhone') > -1) h += 60;
                params.append('&h=' + h);
                params.append('&s=' + scale);
                params.append('&im=' + sessionCamRecorder.fY);
            } else {
                params.append('&w=');
                params.append(sessionCamRecorder.lT());
                params.append('&h=');
                params.append(sessionCamRecorder.na());
            }
            params.append('&sx=' + $(window).scrollLeft());
            params.append('&sy=' + $(window).scrollTop());
            params.append('&dw=' + sessionCamRecorder.lN());
            params.append('&dh=' + sessionCamRecorder.mG());
            params.append('&sw=' + screen.width);
            params.append('&sh=' + screen.height);
            params.append('&r=');
            params.append(encodeURIComponent(decodeURI(document.referrer)));
            params.append('&originalUrl=');
            params.append(encodeURIComponent(decodeURI(window.location)));
            params.append('&flashVersion=');
            params.append(sessionCamRecorder.iu());
            params.append('&sessionUserId=');
            params.append(sessionCamRecorder.getSessionCamUserId());
            params.append('&ASPNetSessionId=');
            params.append(fE);
            params.append('&test=');
            params.append((window.location.search.indexOf('sessioncamtestmode') > -1 ? '1' : '0'));
            params.append('&jsver=' + sessionCamRecorder.version());
            sessionCamRecorder.kF = params.toString();
            sessionCamRecorder.kl();
        } catch (err) {
            sessionCamRecorder.log('getPageId', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.kl = function() {
    var fm = '';
    try {
        var lp = (window.performance && window.performance.timing && window.performance.timing.responseStart ? (window.scInitTime0 - window.performance.timing.responseStart) : 'NA');
        fm = '&jsstats=pre ' + lp + ' startup ' + (sessionCamRecorder.hV - window.scInitTime0) + ' config ' + (sessionCamRecorder.gJ - sessionCamRecorder.hV) + ' eventsBound ' + (sessionCamRecorder.aD - sessionCamRecorder.gJ) + ' insertFlash ' + (sessionCamRecorder.ae - sessionCamRecorder.aD) + ' getPageId ' + (sessionCamRecorder.getTime() - sessionCamRecorder.gJ);
    } catch (jK) {}
    if (sessionCamRecorder.lh('/record.asmx/GetPageId', 'POST', sessionCamRecorder.kF + fm, sessionCamRecorder.dI) === 'tryAgain') {
        if (sessionCamRecorder.kz < sessionCamRecorder.kE) {
            sessionCamRecorder.kz++;
            window.setTimeout(sessionCamRecorder.kl, sessionCamRecorder.jP);
        }
    }
};
SessionCamRecorder.prototype.getSessionCamUserId = function() {
    try {
        var ip = this.iC('sc.UserId');
        if (!ip) {
            if ((this.configuration != null) && this.configuration.U) ip = this.configuration.U;
            if (ip == null) this.ip = '';
            if ((ip.length > 0) && (ip != '00000000-0000-0000-0000-000000000000')) this.hU('sc.UserId', ip, 8760);
        }
        return ip;
    } catch (err) {
        sessionCamRecorder.log('getSessionCamUserId', err);
    }
};
SessionCamRecorder.prototype.eu = function() {
    try {
        var mc = 'originalUrl=' + encodeURIComponent(decodeURI(window.location)) + '&sse=' + sessionCamRecorder.jG;
        var hT = sessionCamRecorder.iC('sc.ASP.NET_SESSIONID');
        if (hT) mc += "&ASPNetSessionId=" + hT;
        this.lh('/record.asmx/LoadConfig', 'POST', mc, this.cA);
    } catch (err) {
        sessionCamRecorder.log('loadConfig', err);
    }
};
SessionCamRecorder.prototype.cA = function(kB) {
    return (function($) {
        try {
            var lA, data;
            lA = new RegExp("<string.*?>(.*?)</string>", "");
            data = kB.match(lA);
            if (data.length > 0) sessionCamRecorder.initialise($.parseJSON(data[1]));
        } catch (err) {
            sessionCamRecorder.log('handle_loadConfig', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.cK = function(kB) {
    return (function($) {
        try {
            if (kB.length > 0 && sessionCamRecorder.configuration != null && sessionCamRecorder.lB === true) {
                var di = $.parseJSON(kB);
                if (di.X) sessionCamRecorder.me = true;
                else if (di.V) {
                    sessionCamRecorder.jG = sessionCamRecorder.getTime();
                    sessionCamRecorder.eq = sessionCamRecorder.jG;
                    sessionCamRecorder.cZ = false;
                    sessionCamRecorder.configuration = new sessionCamRecorder.ia(sessionCamRecorder.configuration.S, sessionCamRecorder.configuration.AA, sessionCamRecorder.configuration.AB);
                    sessionCamRecorder.lB = false;
                    sessionCamRecorder.requestType = '';
                    sessionCamRecorder.lc.reset();
                    sessionCamRecorder.eu();
                } else {
                    if (di.H) sessionCamRecorder.configuration.H = di.H;
                    if (di.AB) sessionCamRecorder.configuration.AB = di.AB;
                    if (di.BC) sessionCamRecorder.mt = true;
                }
            }
        } catch (err) {
            sessionCamRecorder.log('handle_sendEvents', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.dI = function(kB) {
    try {
        sessionCamRecorder.getPageIdResponse(kB);
    } catch (err) {
        sessionCamRecorder.log('handle_getPageId', err);
    }
};
SessionCamRecorder.prototype.parseJSON = function(json) {
    var gK = function(key, value) {
        var a;
        if (typeof value === 'string') {
            a = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
            if (a) return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4], +a[5], +a[6]));
        }
        return value;
    };
    try {
        return sessionCamRecorder.hI(json, gK);
    } catch (err) {
        return sessionCamRecorder.hI(json.replace(/\\\\/g, '\\'), gK);
    }
};
SessionCamRecorder.prototype.getPageIdResponse = function(kB) {
    try {
        sessionCamRecorder.configuration = sessionCamRecorder.parseJSON(kB);
        if (!sessionCamRecorder.configuration.I) {
            sessionCamRecorder.me = true;
            return;
        }
        sessionCamRecorder.eV();
        sessionCamRecorder.lB = true;
        sessionCamRecorder.notifications.lD('session/started', {
            sessionId: sessionCamRecorder.sessionId()
        });
    } catch (err) {
        sessionCamRecorder.log('getPageIdResponse', err);
    }
    return;
};
SessionCamRecorder.prototype.eV = function() {
    this.hU('sc.ASP.NET_SESSIONID', this.configuration.H, undefined);
    return;
};
SessionCamRecorder.prototype.aX = function(url) {
    if (url.indexOf('http') === 0) return url;
    var gN = document.createElement('div');
    gN.innerHTML = '<a href="' + url.split('"').join('&quot;') + '">x</a>';
    return gN.firstChild.href.toString();
};
SessionCamRecorder.prototype.bd = function(url) {
    var path, pathname, pagename, port, dy, a = document.createElement("A");
    a.href = sessionCamRecorder.aX(url);
    path = a.pathname;
    if (sessionCamRecorder.jW(path)) path = '/';
    else if (path[0] !== '/') path = '/' + path;
    dy = path.lastIndexOf('/');
    pathname = path.substr(0, dy + 1);
    pagename = (path.length > (dy + 1) ? path.substr(dy + 1) : '');
    if ((a.port === '') || (a.port.toString() === '0') || ((a.protocol === 'http:') && (a.port.toString() === '80')) || ((a.protocol === 'https:') && (a.port.toString() === '443'))) port = '';
    else port = ':' + a.port;
    return {
        protocol: a.protocol + '//',
        port: port,
        hostname: a.hostname,
        path: pathname,
        pageName: pagename,
        aE: a.search
    };
};
SessionCamRecorder.prototype.nx = function() {
    return (function($) {
        var link = null;
        if (sessionCamRecorder.configuration.AX || (window.sessioncamConfiguration && window.sessioncamConfiguration.IgnoreCanonicalLink)) sessionCamRecorder.aA = true;
        if (!sessionCamRecorder.aA) {
            link = $('link[href][rel=canonical]', sessionCamRecorder.jh());
            if (link.length != 1) link = null;
        }
        return link;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.lW = function(aA) {
    var link = aA ? null : sessionCamRecorder.nx();
    return (link ? sessionCamRecorder.bd(link.attr('href')) : sessionCamRecorder.bd(window.location.toString()));
};
SessionCamRecorder.prototype.jp = function(aA) {
    var uri, hostname, path, pageName, aF, prevUri = sessionCamRecorder.bp;
    try {
        uri = sessionCamRecorder.lW(aA);
        if (window.SessionCamPath !== undefined) path = window.SessionCamPath;
        else if (window.sessioncamConfiguration && (window.sessioncamConfiguration.SessionCamPath !== undefined)) path = window.sessioncamConfiguration.SessionCamPath;
        else if (sessionCamRecorder.configuration.P) path = eval(sessionCamRecorder.configuration.P);
        else path = uri.path;
        path = sessionCamRecorder.fW(path);
        if (!path.length) path = '/';
        else if (path.indexOf('/') !== 0) path = '/' + path;
        if (path.lastIndexOf('/') !== (path.length - 1)) path = path + '/';
        if (window.SessionCamPageName !== undefined) pageName = window.SessionCamPageName;
        else if (window.sessioncamConfiguration && (window.sessioncamConfiguration.SessionCamPageName !== undefined)) pageName = window.sessioncamConfiguration.SessionCamPageName;
        else if (sessionCamRecorder.configuration.N) pageName = eval(sessionCamRecorder.configuration.N);
        else pageName = uri.pageName;
        pageName = sessionCamRecorder.fW(pageName);
        aF = pageName.toLowerCase().indexOf(';jsessionid=');
        if (aF > 0) pageName = pageName.substring(0, aF);
        else if (aF === 0) pageName = '';
        if (window.sessioncamConfiguration && (window.sessioncamConfiguration.SessionCamHostname !== undefined)) {
            hostname = window.sessioncamConfiguration.SessionCamHostname;
            if (hostname.indexOf('https://') === 0) {
                if (hostname.substr(8).indexOf('/') >= 0) hostname = 'https://' + hostname.substr(8).substring(0, hostname.substr(8).indexOf('/'));
            } else if (hostname.indexOf('http://') === 0) {
                if (hostname.substr(7).indexOf('/') >= 0) hostname = 'http://' + hostname.substr(7).substring(0, hostname.substr(7).indexOf('/'));
            } else if (hostname.indexOf('/') > 0) hostname = hostname.substring(0, hostname.indexOf('/'));
        }
        if (!hostname) hostname = uri.hostname;
        if (hostname.indexOf('http') === 0) sessionCamRecorder.lb = hostname + uri.port + path + decodeURIComponent(pageName) + decodeURIComponent(uri.aE);
        else sessionCamRecorder.lb = uri.protocol + hostname + uri.port + path + decodeURIComponent(pageName) + decodeURIComponent(uri.aE);
    } catch (err) {
        sessionCamRecorder.log('setPageURL - returning window.location', err);
        sessionCamRecorder.lb = window.location.toString();
    }
    try {
        aF = sessionCamRecorder.lb.toLowerCase().indexOf(';jsessionid=');
        if (aF >= 0) sessionCamRecorder.lb = sessionCamRecorder.lb.substring(0, aF);
        sessionCamRecorder.bp = sessionCamRecorder.bd(sessionCamRecorder.lb.replace("%", "%25"));
    } catch (err) {}
    if (prevUri) {
        if ((sessionCamRecorder.bp.protocol != prevUri.protocol) || (sessionCamRecorder.bp.hostname != prevUri.hostname) || (sessionCamRecorder.bp.port != prevUri.port)) {
            sessionCamRecorder.configuration.AA = null;
            sessionCamRecorder.configuration.AB = null;
        } else if ((sessionCamRecorder.bp.path != prevUri.path) || (sessionCamRecorder.bp.pageName != prevUri.pageName) || (sessionCamRecorder.bp.aE != prevUri.aE)) sessionCamRecorder.configuration.AA = null;
        sessionCamRecorder.configuration.AB = null;
    }
    return sessionCamRecorder.lb;
};
SessionCamRecorder.prototype.lM = function() {
    var hash, path = window.location.pathname;
    if (window.location.hash) {
        hash = window.location.hash;
        if (hash.indexOf('?') >= 0) hash = hash.substring(0, hash.indexOf('?'));
        if (hash.indexOf('#') === 0) hash = hash.substring(1);
        if ((hash.indexOf('/') === 0) && (hash.length > 1)) hash = hash.substring(1);
        if (path.length && (path.substr(path.length - 1, 1) != '/')) path += '/';
        path += hash;
    }
    if (path.length > 1) path = path.substring(1);
    return path;
};
SessionCamRecorder.prototype.mS = function() {
    var path = sessionCamRecorder.lM();
    if (path != sessionCamRecorder.nf) {
        if (sessionCamRecorder.mJ) {
            window.clearTimeout(sessionCamRecorder.mJ);
            sessionCamRecorder.createVirtualPageLoad();
        }
        sessionCamRecorder.nf = path;
        sessionCamRecorder.mJ = window.setTimeout(sessionCamRecorder.createVirtualPageLoad, sessionCamRecorder.configuration.AZ);
    }
};
SessionCamRecorder.prototype.createVirtualPageLoad = function(path) {
    var eP, jI, lo, kv, kV, result, dy, params;
    try {
        sessionCamRecorder.mJ = 0;
        if (!path) {
            path = sessionCamRecorder.nf;
            sessionCamRecorder.nf = '';
            if (!path) return;
        }
        if (sessionCamRecorder.lB === true && sessionCamRecorder.configuration != null && sessionCamRecorder.configuration.I && !sessionCamRecorder.mt) {
            eP = sessionCamRecorder.lb;
            jI = sessionCamRecorder.bp;
            lo = sessionCamRecorder.configuration.VP;
            kv = sessionCamRecorder.configuration.AA;
            kV = sessionCamRecorder.configuration.AB;
            sessionCamRecorder.dz();
            result = sessionCamRecorder.dH();
            while (result) {
                result = sessionCamRecorder.dH();
            }
            sessionCamRecorder.jM();
            if (path) {
                dy = path.lastIndexOf('/');
                if (dy >= 0) {
                    window.SessionCamPath = path.substr(0, dy + 1);
                    window.SessionCamPageName = path.substr(dy + 1);
                } else {
                    window.SessionCamPath = '/';
                    window.SessionCamPageName = path;
                }
            }
            sessionCamRecorder.jp();
            sessionCamRecorder.configuration.VP = true;
            sessionCamRecorder.configuration.AA = null;
            sessionCamRecorder.configuration.AB = null;
            sessionCamRecorder.eq = sessionCamRecorder.getTime();
            params = new sessionCamRecorder.iO();
            params.append('sse=');
            params.append(sessionCamRecorder.getTime());
            params.append('&w=');
            params.append(sessionCamRecorder.lN());
            params.append('&h=');
            params.append(sessionCamRecorder.mG());
            params.append('&r=');
            params.append(encodeURIComponent(eP));
            params.append('&originalUrl=');
            params.append(encodeURIComponent(decodeURI(window.location)));
            params.append('&ASPNetSessionId=');
            params.append(sessionCamRecorder.iC('sc.ASP.NET_SESSIONID'));
            params.append('&test=');
            params.append((window.location.search.indexOf('sessioncamtestmode') > -1 ? '1' : '0'));
            sessionCamRecorder.lh('/record.asmx/CreateVirtualPageLoad', 'POST', params.toString(), sessionCamRecorder.cK);
            sessionCamRecorder.iD.push(sessionCamRecorder.iA(eP, jI, lo, kv, kV));
            sessionCamRecorder.aK(sessionCamRecorder.getTime() + 1, document);
        }
    } catch (err) {
        sessionCamRecorder.log('createVirtualPageLoad', err);
    }
    return;
};
SessionCamRecorder.prototype.closeVirtualPage = function() {
    var gS, result, params;
    try {
        if (sessionCamRecorder.lB === true && sessionCamRecorder.configuration != null && sessionCamRecorder.configuration.I && (sessionCamRecorder.iD.length >= 1) && !sessionCamRecorder.mt) {
            gS = sessionCamRecorder.iD.pop();
            sessionCamRecorder.dz();
            result = sessionCamRecorder.dH();
            while (result) {
                result = sessionCamRecorder.dH();
            }
            sessionCamRecorder.jM();
            sessionCamRecorder.eq = sessionCamRecorder.getTime();
            params = new sessionCamRecorder.iO();
            params.append('sse=');
            params.append(sessionCamRecorder.getTime());
            params.append('&w=');
            params.append(sessionCamRecorder.lN());
            params.append('&h=');
            params.append(sessionCamRecorder.mG());
            params.append('&aa=' + gS.kL);
            params.append('&ab=' + gS.iE);
            params.append('&isvp=' + (gS.gz ? '1' : '0'));
            params.append('&originalUrl=');
            params.append(encodeURIComponent(decodeURI(window.location)));
            params.append('&ASPNetSessionId=');
            params.append(sessionCamRecorder.iC('sc.ASP.NET_SESSIONID'));
            params.append('&test=');
            params.append((window.location.search.indexOf('sessioncamtestmode') > -1 ? '1' : '0'));
            sessionCamRecorder.lb = gS.url;
            sessionCamRecorder.bp = gS.uri;
            sessionCamRecorder.configuration.VP = gS.gz;
            sessionCamRecorder.configuration.AA = gS.kL;
            sessionCamRecorder.configuration.AB = gS.iE;
            sessionCamRecorder.lh('/record.asmx/CloseVirtualPage', 'POST', params.toString(), sessionCamRecorder.cK);
        }
    } catch (err) {
        sessionCamRecorder.log('closeVirtualPage', err);
    }
    return;
};
SessionCamRecorder.prototype.endSession = function() {
    if (sessionCamRecorder.configuration != null && sessionCamRecorder.configuration.I) {
        var params;
        sessionCamRecorder.jM();
        params = new sessionCamRecorder.iO();
        params.append('sse=');
        params.append(sessionCamRecorder.getTime());
        params.append('&w=');
        params.append(sessionCamRecorder.lT());
        params.append('&test=');
        params.append((window.location.search.indexOf('sessioncamtestmode') > -1 ? '1' : '0'));
        params.append('&originalUrl=');
        params.append(encodeURIComponent(decodeURI(window.location)));
        params.append('&ASPNetSessionId=');
        params.append(sessionCamRecorder.iC('sc.ASP.NET_SESSIONID'));
        sessionCamRecorder.lh('/record.asmx/EndSession', 'POST', params.toString());
        sessionCamRecorder.me = true;
    }
};
SessionCamRecorder.prototype.createClientEvent = function(data, callbackFunction, callbackFunctionParameter) {
    if (data.length > 256) data = data.substr(0, 256);
    data = encodeURIComponent(sessionCamRecorder.cp(sessionCamRecorder.fj(data)));
    sessionCamRecorder.makeGETRequest('ce' + sessionCamRecorder.fi + (sessionCamRecorder.getTime() - sessionCamRecorder.jG) + sessionCamRecorder.fi + data);
    if (callbackFunction) callbackFunction(callbackFunctionParameter);
};
SessionCamRecorder.prototype.sendBasketValue = function(value) {
    sessionCamRecorder.ph = value;
    sessionCamRecorder.gG(sessionCamRecorder.fo.nN, value);
};
SessionCamRecorder.prototype.sendBasketCurrencyCode = function(currencyCode) {
    sessionCamRecorder.oj = currencyCode;
    sessionCamRecorder.gG(sessionCamRecorder.fo.oG, currencyCode);
};
SessionCamRecorder.prototype.pn = function() {
    if (sessionCamRecorder.configuration.BI) {
        try {
            var bi = sessionCamRecorder.aJ(sessionCamRecorder.configuration.BI);
            if (!sessionCamRecorder.jW(bi) && (bi != sessionCamRecorder.ph)) sessionCamRecorder.sendBasketValue(bi);
        } catch (jK) {}
    }
    if (sessionCamRecorder.configuration.BJ) {
        try {
            var bj = sessionCamRecorder.aJ(sessionCamRecorder.configuration.BJ);
            if (!sessionCamRecorder.jW(bj) && (bj != sessionCamRecorder.oj)) sessionCamRecorder.sendBasketCurrencyCode(bj);
        } catch (jK) {}
    }
    window.setTimeout(sessionCamRecorder.pn, sessionCamRecorder.om);
};
SessionCamRecorder.prototype.aJ = function(am) {
    var K = window,
        ah = am.split(/[\.\[]/gi);
    for (var i = 0; i < ah.length; i++) {
        var accessor = ah[i];
        if (i === 0 && (accessor === 'window' || accessor === '')) continue;
        if (accessor.substring(accessor.length - 1) === "]") {
            var matches = /(?:^|['"])(?!['"])(.+?)(?:\]|['"])/.exec(accessor);
            if (!matches || matches.length < 2) {
                return null;
            }
            accessor = matches[1];
        }
        if (!K.hasOwnProperty(accessor)) {
            return null;
        }
        K = K[accessor];
    }
    return K;
};
SessionCamRecorder.prototype.lh = function(url, method, data, le) {
    var gF, sb, fO = false;
    if (sessionCamRecorder.me) return fO;
    try {
        if (!this.jS) {
            if ((data !== null) && (data !== undefined) && (data !== '')) {
                data += '&';
            }
            data += 'url=' + encodeURIComponent(this.lb);
            if (this.configuration.S || this.configuration.AA || this.configuration.AB) {
                sb = new sessionCamRecorder.iO();
                if (this.configuration.S) sb.append('&si=' + this.configuration.S);
                if (this.configuration.AA) sb.append('&aa=' + this.configuration.AA);
                if (this.configuration.AB) sb.append('&ab=' + this.configuration.AB);
                data += sb.toString();
            }
            if ((this.requestType === 'XMLHttpRequest') || ((!this.requestType) && window.XMLHttpRequest)) {
                gF = new XMLHttpRequest();
                if ('withCredentials' in gF) {
                    this.requestType = 'XMLHttpRequest';
                    url += '?url=' + encodeURIComponent(this.lb);
                    try {
                        gF.open(method, this.lg + url, true);
                    } catch (e) {
                        this.requestType = '';
                        gF = null;
                    }
                    if (gF != null) {
                        gF.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        gF.withCredentials = true;
                        gF.onreadystatechange = function() {
                            if (gF.readyState == 4) {
                                if (gF.status == 200) {
                                    if (le) le(gF.responseText);
                                } else if (gF.status !== 0) {
                                    sessionCamRecorder.log('Server error', gF.statusText);
                                    sessionCamRecorder.jS = true;
                                }
                            }
                        };
                    }
                } else gF = null;
            }
            if (gF == null) {
                if ((this.requestType === 'Flash') || ((!this.requestType) && window.SWFHttpRequest)) {
                    this.requestType = 'Flash';
                    try {
                        gF = new window.SWFHttpRequest();
                    } catch (e) {
                        fO = 'tryAgain';
                    }
                    try {
                        gF.open(method, this.lg + url);
                    } catch (e) {
                        sessionCamRecorder.log('Flash error', e);
                        fO = 'tryAgain';
                    }
                    if (gF != null) {
                        gF.onreadystatechange = function() {
                            if (gF.readyState == 4) {
                                if (gF.status == 200) {
                                    if (le) le(gF.responseText);
                                } else if (gF.status !== 0) {
                                    sessionCamRecorder.log('Server error', gF.statusText);
                                    sessionCamRecorder.jS = true;
                                }
                            }
                        };
                    }
                } else this.requestType = 'None';
            }
            if (gF != null) {
                try {
                    gF.send(data);
                    fO = true;
                } catch (e) {
                    sessionCamRecorder.log('Send error', e);
                }
            } else sessionCamRecorder.log('No transport', (this.requestType == 'None' ? 'Flash not initialised' : ''));
        }
    } catch (err) {
        sessionCamRecorder.log('General makeRequest', err);
    }
    return fO;
};
SessionCamRecorder.prototype.dN = function(text) {
    return text.replace(/\r/g, '');
};
SessionCamRecorder.prototype.lx = function(gN) {
    var fO, lz, jN, cn, dG, ka, ee, cR, cI, fS, tr, dF, cf, dA, dv;
    try {
        if ((gN.selectionStart !== undefined) && (gN.selectionStart !== null)) {
            lz = gN.selectionStart;
            jN = gN.selectionEnd;
            cn = gN.value.substring(0, lz).match(/\r\n/g);
            dG = gN.value.substring(0, jN).match(/\r\n/g);
            if (cn) lz -= cn.length;
            if (dG) jN -= dG.length;
            fO = {
                start: lz,
                end: jN
            };
        } else if (document.selection) {
            if (document.activeElement && (document.activeElement === gN)) {
                fS = document.selection.createRange();
                if (gN.type == "textarea") {
                    ka = document.body.createTextRange();
                    ka.moveToElementText(gN);
                    for (cR = 0; ka.compareEndPoints('StartToStart', fS) < 0; cR++) {
                        ka.moveStart('character', 1);
                    }
                    ee = gN.value.replace(/\n/g, '.').replace(/\r/g, '');
                    for (cI = ee.length; ka.compareEndPoints('EndToEnd', fS) > 0; cI--) {
                        ka.moveEnd('character', -1);
                    }
                    fO = {
                        start: cR,
                        end: cI
                    };
                } else {
                    tr = gN.createTextRange();
                    dF = tr.duplicate();
                    dF.moveToBookmark(fS.getBookmark());
                    tr.setEndPoint('EndToStart', dF);
                    if (fS == null || tr == null) fO = {
                        start: gN.value.length,
                        end: gN.value.length,
                        length: 0,
                        text: ''
                    };
                    cf = fS.text.replace(/[\r\n]/g, '.');
                    dA = gN.value.replace(/[\r\n]/g, '.');
                    dv = dA.indexOf(cf, tr.text.length);
                    fO = {
                        start: dv,
                        end: dv + cf.length
                    };
                }
            } else fO = {
                start: gN.value.length,
                end: gN.value.length
            };
        } else fO = {
            start: gN.value.length,
            end: gN.value.length
        };
    } catch (jK) {
        fO = {
            start: gN.value.length,
            end: gN.value.length
        };
    }
    return fO;
};
SessionCamRecorder.prototype.cV = function(kT) {
    var np = String(kT.start);
    if (kT.end != kT.start) np += ":" + kT.end;
    return np;
};
SessionCamRecorder.prototype.cw = function(cH) {
    return (function($) {
        var fO, kG;
        if (cH) {
            kG = $('input[name="' + cH.name + '"]:radio:checked');
            if (kG && kG.length == 1) fO = kG[0];
        }
        return fO;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.mv = function(event) {
    var fO = "";
    if (event) {
        fO = event.keyCode;
        if ((event.which !== undefined) && (event.which !== null)) fO = event.which.toString();
        if (fO) {
            if (fO < 32) fO = "";
            else fO = String.fromCharCode(fO);
        }
    }
    return fO;
};
SessionCamRecorder.prototype.cj = function(event) {
    var fO = "";
    if (event && event.keyCode) fO = event.keyCode;
    return fO;
};
SessionCamRecorder.prototype.eJ = function(fk, kS, kt, key, km, selection, kb, gN) {
    return (function($) {
        var data, lv, val;
        val = $(gN).val();
        if ($.isArray(val)) val = val.join();
        if (sessionCamRecorder.bo(gN, 'scVal') == val) key = '';
        data = "k{" + key + "} s{" + selection + "}";
        if (km) data += " m{o}";
        lv = sessionCamRecorder.fo.KeyPress;
        if (kt == "kd") lv = sessionCamRecorder.fo.KeyDown;
        else if (kt == "k") lv = sessionCamRecorder.fo.KeyPress;
        else return;
        if (!kb) kb = sessionCamRecorder.getTime();
        sessionCamRecorder.gG(lv, data, fk, kS, null, null, gN, null, kb);
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.kx = function(fk, kS, kt, key, dE, kD, target) {
    window.setTimeout(function() {
        var km = false;
        if (dE) km = dE();
        sessionCamRecorder.eJ(fk, kS, kt, key, km, kD(target), null, target);
    }, 50);
    return;
};
SessionCamRecorder.prototype.mp = function(event, fo) {
    return (function($) {
        try {
            if (!event) return;
            var target, eF, character, key, kD, cJ, cd, cg, dQ;
            target = event.target;
            if (target) {
                eF = sessionCamRecorder.cj(event.originalEvent);
                character = sessionCamRecorder.mv(event.originalEvent);
                key = "";
                if (fo == "kd") key = eF;
                else if (fo == "k") key = character;
                if ((fo == "kd") && (eF == sessionCamRecorder.kO)) return;
                if ((fo == "k") && (eF == sessionCamRecorder.kO)) {
                    fo = "kd";
                    key = sessionCamRecorder.kO;
                }
                switch (target.type) {
                    case "text":
                    case "textarea":
                    case "search":
                    case "url":
                    case "email":
                    case "number":
                    case "tel":
                        if (((fo == "k") && (character.length > 0)) || ((fo == "kd") && ((eF == sessionCamRecorder.ef) || (eF == sessionCamRecorder.mk) || (eF == sessionCamRecorder.altKey) || (eF == sessionCamRecorder.ctrlKey) || (eF == sessionCamRecorder.kO) || (eF == sessionCamRecorder.dp) || (eF == sessionCamRecorder.jY) || (eF == sessionCamRecorder.cP) || (eF == sessionCamRecorder.ko) || (eF == sessionCamRecorder.ku) || (eF == sessionCamRecorder.cD) || (eF == sessionCamRecorder.cT) || (eF == sessionCamRecorder.co) || (eF == sessionCamRecorder.cX)))) {
                            if (sessionCamRecorder.bo(target, "newlyFocussed") == "1") {
                                sessionCamRecorder.gG(sessionCamRecorder.fo.hY, $(target).val(), sessionCamRecorder.eO(target), target.type, null, null, target);
                                sessionCamRecorder.bg(target, "newlyFocussed", null);
                            }
                            kD = function(target) {
                                var fO, kT;
                                fO = "0";
                                kT = sessionCamRecorder.lx(target);
                                if (kT) fO = sessionCamRecorder.cV(kT);
                                return fO;
                            };
                            cJ = kD(target);
                            cd = function() {
                                return cJ;
                            };
                            cg = cd;
                            if ((fo == "kd") && ((eF == sessionCamRecorder.altKey) || (eF == sessionCamRecorder.ctrlKey) || (eF == sessionCamRecorder.dp) || (eF == sessionCamRecorder.jY) || (eF == sessionCamRecorder.cP) || (eF == sessionCamRecorder.ko) || (eF == sessionCamRecorder.ku) || (eF == sessionCamRecorder.cD) || (eF == sessionCamRecorder.cT) || (eF == sessionCamRecorder.co) || (eF == sessionCamRecorder.cX))) {
                                cg = kD;
                            }
                            dQ = sessionCamRecorder.dN(target.value).substr(sessionCamRecorder.lx(target).end);
                            sessionCamRecorder.kx(sessionCamRecorder.eO(target), target.type, fo, key, function() {
                                var fM, cu;
                                fM = sessionCamRecorder.lx(target);
                                cu = sessionCamRecorder.dN(target.value).substr(fM.end);
                                return (fo == "k") && (cu != dQ);
                            }, cg, target);
                        }
                        break;
                    case "select-one":
                        sessionCamRecorder.kx(sessionCamRecorder.eO(target), target.type, fo, key, false, function() {
                            return sessionCamRecorder.cE($(target));
                        }, target);
                        break;
                    case "select-multiple":
                        sessionCamRecorder.kx(sessionCamRecorder.eO(target), target.type, fo, key, false, function() {
                            return sessionCamRecorder.jt($(target));
                        }, target);
                        break;
                    case "checkbox":
                        sessionCamRecorder.kx(sessionCamRecorder.eO(target), target.type, fo, key, false, function() {
                            return target.checked ? '1' : '0';
                        }, target);
                        break;
                    case "radio":
                        if ((fo == "kd") && ((eF == sessionCamRecorder.ku) || (eF == sessionCamRecorder.ko) || (eF == sessionCamRecorder.jY) || (eF == sessionCamRecorder.cP) || (eF == sessionCamRecorder.dh) || (eF == sessionCamRecorder.kO) || (eF == sessionCamRecorder.altKey) || (eF == sessionCamRecorder.ctrlKey))) {
                            sessionCamRecorder.kx(sessionCamRecorder.eO(target), target.type, fo, key, false, function() {
                                var fO, kT;
                                fO = "";
                                kT = sessionCamRecorder.cw(target);
                                if (kT) fO = kT.id;
                                return fO;
                            }, target);
                        }
                        break;
                }
            }
        } catch (err) {
            sessionCamRecorder.log('processKeyboardEvent', err);
        }
        return;
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.mY = function() {
    return (document.webkitVisibilityState && (document.webkitVisibilityState === 'prerender')) || (document.visibilityState && (document.visibilityState === 'prerender'));
};
SessionCamRecorder.prototype.lF = function() {
    return (function($) {
        $(document).bind('visibilitychange', function() {
            if (!sessionCamRecorder.mY()) sessionCamRecorder.start();
        });
        $(document).bind('webkitvisibilitychange', function() {
            if (!sessionCamRecorder.mY()) sessionCamRecorder.start();
        });
    }(window.sessionCamJQuery));
};
SessionCamRecorder.prototype.lY = function() {
    return sessionCamRecorder.sessionCamDebug ? true : false;
};
SessionCamRecorder.prototype.cG = function(s) {
    if (!sessionCamRecorder.lY()) {
        return;
    }
    window.sessionCamJQuery('#sessionCamDebugWindow').val(s + "\n" + window.sessionCamJQuery('#sessionCamDebugWindow').val());
    return;
};
SessionCamRecorder.prototype.dj = function() {
    if (!sessionCamRecorder.lY()) {
        return;
    }
    window.sessionCamJQuery('body').append('<textarea id="sessionCamDebugWindow" style="width:100%; height:200px;"></textarea>');
    return;
};
//]]>
SessionCamRecorder.prototype.insertFlash = function() {
    var ServiceTickDetection = function() {
        var ar = '9.0.0';
        var swf = window.location.protocol + '//d2oh4tlt9mrke9.cloudfront.net/Record/swfhttprequest.swf';
        var bO = function() {
            var UNDEF = "undefined",
                OBJECT = "object",
                SHOCKWAVE_FLASH = "Shockwave Flash",
                SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
                FLASH_MIME_TYPE = "application/x-shockwave-flash",
                ON_READY_STATE_CHANGE = "onreadystatechange",
                win = window,
                doc = document,
                nav = navigator,
                bm = false,
                aq = [main],
                ba = [],
                bH = [],
                aP = [],
                ap = false,
                aY, bN, aT = true,
                ua = function() {
                    var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
                        u = nav.userAgent.toLowerCase(),
                        p = nav.platform.toLowerCase(),
                        windows = p ? /win/.test(p) : /win/.test(u),
                        mac = p ? /mac/.test(p) : /mac/.test(u),
                        webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
                        ie = !+"\v1",
                        bC = [0, 0, 0],
                        d = null;
                    if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
                        d = nav.plugins[SHOCKWAVE_FLASH].description;
                        if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
                            bm = true;
                            ie = false;
                            d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                            bC[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
                            bC[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                            bC[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
                        }
                    } else if (typeof win.ActiveXObject != UNDEF) {
                        try {
                            var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
                            if (a) {
                                d = a.GetVariable("$version");
                                if (d) {
                                    ie = true;
                                    d = d.split(" ")[1].split(",");
                                    bC = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                                }
                            }
                        } catch (e) {}
                    }
                    return {
                        w3: w3cdom,
                        pv: bC,
                        wk: webkit,
                        ie: ie,
                        win: windows,
                        mac: mac
                    };
                }(),
                onDomLoad = function() {
                    if (!ua.w3) {
                        return;
                    }
                    if ((typeof doc.readyState != UNDEF && doc.readyState == "complete") || (typeof doc.readyState == UNDEF && (doc.getElementsByTagName("body")[0] || doc.body))) {
                        bQ();
                    }
                    if (!ap) {
                        if (typeof doc.addEventListener != UNDEF) {
                            doc.addEventListener("DOMContentLoaded", bQ, false);
                        }
                        if (ua.ie && ua.win) {
                            doc.attachEvent(ON_READY_STATE_CHANGE, function() {
                                if (doc.readyState == "complete") {
                                    doc.detachEvent(ON_READY_STATE_CHANGE, arguments.callee);
                                    bQ();
                                }
                            });
                            if (win == top) {
                                (function() {
                                    if (ap) return;
                                    try {
                                        doc.documentElement.doScroll("left");
                                    } catch (e) {
                                        setTimeout(arguments.callee, 0);
                                        return;
                                    }
                                    bQ();
                                })();
                            }
                        }
                        if (ua.wk) {
                            (function() {
                                if (ap) return;
                                if (!/loaded|complete/.test(doc.readyState)) {
                                    setTimeout(arguments.callee, 0);
                                    return;
                                }
                                bQ();
                            })();
                        }
                        av(bQ);
                    }
                }();

            function bQ() {
                if (ap) return;
                try {
                    var t = doc.getElementsByTagName("body")[0].appendChild(createElement("span"));
                    t.parentNode.removeChild(t);
                } catch (e) {
                    return;
                }
                ap = true;
                var dl = aq.length;
                for (var i = 0; i < dl; i++) {
                    aq[i]();
                }
            };

            function bJ(fn) {
                if (ap) fn();
                else aq[aq.length] = fn;
            };

            function av(fn) {
                if (typeof win.addEventListener != UNDEF) win.addEventListener("load", fn, false);
                else if (typeof doc.addEventListener != UNDEF) doc.addEventListener("load", fn, false);
                else if (typeof win.attachEvent != UNDEF) bn(win, "onload", fn);
                else if (typeof win.onload == "function") {
                    var bz = win.onload;
                    win.onload = function() {
                        bz();
                        fn();
                    };
                } else win.onload = fn;
            };

            function main() {
                if (bm) au();
                else aB();
            };

            function au() {
                var b = doc.getElementsByTagName("body")[0];
                var o = createElement(OBJECT);
                o.setAttribute("type", FLASH_MIME_TYPE);
                var t = b.appendChild(o);
                if (t) {
                    var dX = 0;
                    (function() {
                        if (typeof t.GetVariable != UNDEF) {
                            var d = t.GetVariable("$version");
                            if (d) {
                                d = d.split(" ")[1].split(",");
                                ua.pv = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                            }
                        } else if (dX < 10) {
                            dX++;
                            setTimeout(arguments.callee, 10);
                            return;
                        }
                        b.removeChild(o);
                        t = null;
                        aB();
                    })();
                } else aB();
            };

            function aB() {
                var rl = ba.length;
                if (rl > 0) {
                    for (var i = 0; i < rl; i++) {
                        var id = ba[i].id;
                        var cb = ba[i].bu;
                        var cbObj = {
                            success: false,
                            id: id
                        };
                        if (ua.pv[0] > 0) {
                            var ho = getElementById(id);
                            if (ho) {
                                if (aH(ba[i].ag) && !(ua.wk && ua.wk < 312)) {
                                    aR(id, true);
                                    if (cb) {
                                        cbObj.success = true;
                                        cbObj.ref = bP(id);
                                        cb(cbObj);
                                    }
                                } else {
                                    bA(ho);
                                    if (cb) cb(cbObj);
                                }
                            }
                        } else {
                            aR(id, true);
                            if (cb) {
                                var o = bP(id);
                                if (o && typeof o.SetVariable != UNDEF) {
                                    cbObj.success = true;
                                    cbObj.ref = o;
                                }
                                cb(cbObj);
                            }
                        }
                    }
                }
            };

            function bP(ad) {
                var r = null;
                var o = getElementById(ad);
                if (o && o.nodeName == "OBJECT") {
                    if (typeof o.SetVariable != UNDEF) r = o;
                    else {
                        var n = o.getElementsByTagName(OBJECT)[0];
                        if (n) r = n;
                    }
                }
                return r;
            };

            function bA(ho) {
                if (ua.ie && ua.win && ho.readyState != 4) {
                    var el = createElement("div");
                    ho.parentNode.insertBefore(el, ho);
                    el.parentNode.replaceChild(bB(ho), el);
                    ho.style.display = "none";
                    (function() {
                        if (ho.readyState == 4) ho.parentNode.removeChild(ho);
                        else setTimeout(arguments.callee, 10);
                    })();
                } else {
                    ho.parentNode.replaceChild(bB(ho), ho);
                }
            };

            function bB(ho) {
                var ac = createElement("div");
                if (ua.win && ua.ie) ac.innerHTML = ho.innerHTML;
                else {
                    var aW = ho.getElementsByTagName(OBJECT)[0];
                    if (aW) {
                        var c = aW.childNodes;
                        if (c) {
                            var cl = c.length;
                            for (var i = 0; i < cl; i++) {
                                if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) ac.appendChild(c[i].cloneNode(true));
                            }
                        }
                    }
                }
                return ac;
            };

            function aL(attObj, bs, id) {
                var r, el = getElementById(id);
                if (ua.wk && ua.wk < 312) return r;
                if (el) {
                    if (typeof attObj.id == UNDEF) attObj.id = id;
                    if (ua.ie && ua.win) {
                        var att = "";
                        for (var i in attObj) {
                            if (attObj[i] != Object.prototype[i]) {
                                if (i.toLowerCase() == "data") bs.movie = attObj[i];
                                else if (i.toLowerCase() == "styleclass") att += ' class="' + attObj[i] + '"';
                                else if (i.toLowerCase() != "classid") att += ' ' + i + '="' + attObj[i] + '"';
                            }
                        }
                        var par = "";
                        for (var j in bs) {
                            if (bs[j] != Object.prototype[j]) par += '<param name="' + j + '" value="' + bs[j] + '" />';
                        }
                        el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
                        bH[bH.length] = attObj.id;
                        r = getElementById(attObj.id);
                    } else {
                        var o = createElement(OBJECT);
                        o.setAttribute("type", FLASH_MIME_TYPE);
                        for (var m in attObj) {
                            if (attObj[m] != Object.prototype[m]) {
                                if (m.toLowerCase() == "styleclass") o.setAttribute("class", attObj[m]);
                                else if (m.toLowerCase() != "classid") o.setAttribute(m, attObj[m]);
                            }
                        }
                        for (var n in bs) {
                            if (bs[n] != Object.prototype[n] && n.toLowerCase() != "movie") bE(o, n, bs[n]);
                        }
                        el.parentNode.replaceChild(o, el);
                        r = o;
                    }
                }
                return r;
            };

            function bE(el, aa, ai) {
                var p = createElement("param");
                p.setAttribute("name", aa);
                p.setAttribute("value", ai);
                el.appendChild(p);
            };

            function bh(id) {
                var ho = getElementById(id);
                if (ho && ho.nodeName == "OBJECT") {
                    if (ua.ie && ua.win) {
                        ho.style.display = "none";
                        (function() {
                            if (ho.readyState == 4) bR(id);
                            else setTimeout(arguments.callee, 10);
                        })();
                    } else ho.parentNode.removeChild(ho);
                }
            };

            function bR(id) {
                var ho = getElementById(id);
                if (ho) {
                    for (var i in ho) {
                        if (typeof ho[i] == "function") ho[i] = null;
                    }
                    ho.parentNode.removeChild(ho);
                }
            };

            function getElementById(id) {
                var el = null;
                try {
                    el = doc.getElementById(id);
                } catch (e) {}
                return el;
            };

            function createElement(el) {
                return doc.createElement(el);
            };

            function bn(target, fo, fn) {
                target.attachEvent(fo, fn);
                aP[aP.length] = [target, fo, fn];
            };

            function aH(rv) {
                var pv = ua.pv,
                    v = rv.split(".");
                v[0] = parseInt(v[0], 10);
                v[1] = parseInt(v[1], 10) || 0;
                v[2] = parseInt(v[2], 10) || 0;
                return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
            };

            function aQ(kT, decl, media, fz) {
                if (ua.ie && ua.mac) {
                    return;
                }
                var h = doc.getElementsByTagName("head")[0];
                if (!h) {
                    return;
                }
                var m = (media && typeof media == "string") ? media : "screen";
                if (fz) {
                    aY = null;
                    bN = null;
                }
                if (!aY || bN != m) {
                    var s = createElement("style");
                    s.setAttribute("type", "text/css");
                    s.setAttribute("media", m);
                    aY = h.appendChild(s);
                    if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) aY = doc.styleSheets[doc.styleSheets.length - 1];
                    bN = m;
                }
                if (ua.ie && ua.win) {
                    if (aY && typeof aY.addRule == OBJECT) aY.addRule(kT, decl);
                } else {
                    if (aY && typeof doc.createTextNode != UNDEF) aY.appendChild(doc.createTextNode(kT + " {" + decl + "}"));
                }
            };

            function aR(id, jO) {
                if (!aT) {
                    return;
                }
                var v = jO ? "visible" : "hidden";
                if (ap && getElementById(id)) getElementById(id).style.visibility = v;
                else aQ("#" + id, "visibility:" + v);
            };

            function bx(s) {
                var regex = /[\\\"<>\.;]/;
                var aw = regex.exec(s) != null;
                return aw && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s;
            };
            return {
                registerObject: function(ad, aU, ax, bu) {
                    if (ua.w3 && ad && aU) {
                        var aC = {};
                        aC.id = ad;
                        aC.ag = aU;
                        aC.bD = ax;
                        aC.bu = bu;
                        ba[ba.length] = aC;
                        aR(ad, false);
                    } else if (bu) bu({
                        success: false,
                        id: ad
                    });
                },
                bP: function(ad) {
                    if (ua.w3) return bP(ad);
                },
                aG: function(bK, bG, aV, aO, aU, ax, aM, bs, attObj, bu) {
                    var bL = {
                        success: false,
                        id: bG
                    };
                    if (ua.w3 && !(ua.wk && ua.wk < 312) && bK && bG && aV && aO && aU) {
                        aR(bG, false);
                        bJ(function() {
                            aV += "";
                            aO += "";
                            var att = {};
                            if (attObj && typeof attObj === OBJECT) {
                                for (var i in attObj) {
                                    att[i] = attObj[i];
                                }
                            }
                            att.data = bK;
                            att.width = aV;
                            att.height = aO;
                            var par = {};
                            if (bs && typeof bs === OBJECT) {
                                for (var j in bs) {
                                    par[j] = bs[j];
                                }
                            }
                            if (aM && typeof aM === OBJECT) {
                                for (var k in aM) {
                                    if (typeof par.az != UNDEF) par.az += "&" + k + "=" + aM[k];
                                    else par.az = k + "=" + aM[k];
                                }
                            }
                            if (aH(aU)) {
                                var ho = aL(att, par, bG);
                                if (att.id == bG) aR(bG, true);
                                bL.success = true;
                                bL.ref = ho;
                            } else aR(bG, true);
                            if (bu) bu(bL);
                        });
                    } else if (bu) bu(bL);
                },
                ua: ua,
                aL: function(attObj, bs, bG) {
                    if (ua.w3) return aL(attObj, bs, bG);
                    else return undefined;
                },
                bh: function(aZ) {
                    if (ua.w3) bh(aZ);
                },
                aQ: function(aI, declStr, by, bf) {
                    if (ua.w3) aQ(aI, declStr, by, bf);
                },
                bJ: bJ,
                av: av
            };
        }();
        var be = function(bO) {
            try {
                var aS = document.getElementById('stflashobContainer');
                if (aS) {
                    for (var p in aS) {
                        try {
                            aS[p] = '';
                        } catch (e1) {}
                    }
                }
                bO.bh();
            } catch (e) {}
        };
        var scCallback = function() {};
        var bb = function() {
            var stflashobContainer = document.getElementById('stflashobContainer');
            if (!stflashobContainer) stflashobContainer = document.getElementById('stflashob');
            if (stflashobContainer) {
                if (scCallback) scCallback();
                return;
            }
            stflashobContainer = document.createElement('DIV');
            stflashobContainer.setAttribute('id', 'stflashobContainer');
            stflashobContainer.setAttribute('class', 'ServiceTickHidden');
            stflashobContainer.setAttribute('style', 'width:1;height:1;display:inline;position:absolute;left:-1000px;top:-1000px;');
            document.getElementsByTagName('BODY')[0].appendChild(stflashobContainer);
            var attributes = {
                id: 'stflashobContainer',
                style: 'display:inline;position:absolute;left:-1000px;top:-1000px;',
                styleclass: 'ServiceTickHidden'
            };
            var params = {
                menu: 'false',
                allowScriptAccess: 'always',
                play: '0',
                SAlign: 'LT'
            };
            bO.aG(swf, 'stflashobContainer', '1', '1', ar, false, false, params, attributes, scCallback);
            if (navigator.appVersion.indexOf("MSIE") != -1) {
                var ver = 0;
                try {
                    ver = parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf('MSIE') + 4));
                } catch (err) {}
                if (ver >= 10) window.attachEvent('onbeforeunload', be);
                else window.attachEvent('onunload', be);
            }
        };
        return {
            al: function() {
                try {
                    bb();
                } catch (err) {
                    if (window.attachEvent) window.attachEvent('onload', bb);
                    else if (window.addEventListener) window.addEventListener('load', bb, false);
                }
            }
        }
    }();
    ServiceTickDetection.al();
};
SessionCamRecorder.prototype.start = function() {
    return (function($) {
        sessionCamRecorder.lm();
        return;
    }(window.sessionCamJQuery));
};
if (!window.sessionCamRecorder) {
    window.sessionCamRecorder = new SessionCamRecorder('http://localtest.me:8000/test_pages/DOM_exfiltration_masking/sessioncam', '', 100);
    if (window.sessionCamRecorder.mY()) window.sessionCamRecorder.lF();
    else window.sessionCamRecorder.start();
}
