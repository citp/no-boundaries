/*
 Skimlinks javascript runtime
 Copyrights 2009 - 2017

 Build time: Tue, 10 Oct 2017 13:36:26 GMT
 Version: 13.0.3
*/
(function() {
    function W(a) {
        var c;
        a = a.target || a.srcElement;
        var b = null != a ? null != (c = a.nodeName) ? "function" === typeof c.toUpperCase ? c.toUpperCase() : void 0 : void 0 : void 0;
        "A" !== b && "AREA" !== b && (a = ta(a));
        return a
    }

    function X(a) {
        var c;
        m.event && (a = m.event);
        var b = a.originalTarget || a.srcElement || a.target;
        var d = null != b ? b.nodeName.toUpperCase() : void 0;
        "A" !== d && "AREA" !== d && (b = lb(b));
        (d = !b || mb(b)) || (d = r(b, "rel"), d = !(O ? O === d : !d || !ua(d)));
        if (d) return !0;
        var e = P(b.href);
        d = E(b.hostname);
        var f = "click" === a.type || "contextmenu" ===
            a.type;
        if (c = nb)
            if (c = b, null === c.offsetParent) c = !0;
            else {
                var n = m.getComputedStyle;
                c = q(n) ? "hidden" === n(c).visibility : !1
            }
        n = (n = b) && n.href ? /^https?:\/\//.test(n.href) || /^\/\//.test(n.href) : !1;
        if (n && Y(b.href, d) && !c) {
            if (va(d) || ob(d)) wa(b, a);
            else if (f && xa(e, d) && !ya(d)) return F && r(b, "target", F), pb(a);
            return !0
        }
    }

    function za(a) {
        var c = W(a);
        if (!c) return !0;
        var b = c;
        b && b.nodeName && "A" !== b.nodeName.toUpperCase() && "AREA" !== b.nodeName.toUpperCase() && (b = ta(b));
        if (b) {
            var d = qb(b);
            var e = k.waypointDomain;
            if (!(d.length >= e.length &&
                    d.substr(0, e.length) === e)) {
                e = -1 !== d.indexOf(e) ? d : rb(b, d);
                if (sb) {
                    var f = l("pageTracker");
                    var n = "/skimout/" + d;
                    null != f && f._trackPageview ? f._trackPageview(n) : l("_gaq") ? (f = l("_gaq"), f.push(["_trackEvent", "skimout", "click", d])) : l("ga") && l("ga")("send", "event", "click", "skimout", d)
                }
                Aa(b);
                Ba(b, e)
            }
        }
        b = l("skimlinks_keywee_pixel", null);
        e = -1 < m.location.href.indexOf("utm_campaign=fbkw");
        b && e && Z(b);
        l("vglnk") && A(c, "skimwords-link") && (a && a.stopPropagation ? a.stopPropagation() : (a = m.event, a.cancelBubble = !0));
        return !0
    }

    function ta(a) {
        for (; a.parentNode;) {
            a = a.parentNode;
            var c = a.nodeName.toUpperCase();
            if ("A" === c || "AREA" === c) return a
        }
        return null
    }

    function Ca(a, c) {
        var b = {
            data: w({
                pubcode: x,
                domains: a,
                page: m.location.href
            })
        };
        aa(b);
        tb(a, c);
        return !0
    }

    function Da() {
        var a;
        var c = ba();
        var b = [];
        var d = 0;
        for (a = c.length; d < a; d++) {
            var e = c[d];
            var f = E(e.hostname);
            var n = P(e.href);
            e = r(e, "rel");
            !f || !Y(n, f) || (O ? O !== e : e && ua(e)) || J(f) || void 0 !== k.aff_domains[f] || (b.push(f), k.domain_data.domains.push(f), k.aff_domains[f] = null)
        }
        return b
    }

    function ub(a) {
        return ca(a,
            "beacon_callback_aux")
    }

    function vb(a) {
        ca(a, "beacon_callback_post_page_load");
        return Ea()
    }

    function wb(a) {
        return ca(a, "beacon_callback_pre_page_load")
    }

    function Ea(a) {
        var c, b;
        a || (a = 0);
        if (m.skimlinks_requests_in_flight && 5 > a) setTimeout(function() {
            return Ea(a + 1)
        }, 400 * a);
        else {
            var d = ba();
            var e = c = 0;
            for (b = d.length; e < b; e++) {
                var f = d[e];
                var n = P(f.href);
                var h = E(f.hostname);
                var l = r(f, "class");
                (!l || -1 === l.indexOf("skimwords-link") && -1 === l.indexOf("skimlinks-unlinked")) && Y(n, h) && !xb(f) && (va(h) ? (c++, G(g.link_impressions,
                    n) ? g.link_impressions[n].ae = 1 : g.link_impressions[n] = {
                    count: 0,
                    ae: 1
                }) : G(g.link_impressions, n) || (g.link_impressions[n] = {
                    count: 0,
                    ae: 0
                }), g.link_impressions[n].count++, f = yb(n)) && (g.link_impressions[n].slmcid = f, 0 > zb.call(g.campaign_ids, f) && g.campaign_ids.push(f))
            }
            k.handlers = c;
            k.links_tracked || null == Fa || null == k.domain_data || null == k.domain_data.domains || (k.links_tracked = !0, Fa(k.domain_data.domains));
            Ab("skimlinks")
        }
        return !0
    }

    function Ga(a, c, b) {
        for (null == b && (b = !1); null != a && a !== k.html_root;) {
            var d = A(a, c) || A(a,
                "noskim");
            if (a.className && d) return !0;
            a = b ? null : a.parentNode
        }
        return !1
    }

    function ya(a) {
        null !== k.exclude_lookup && null !== k.include_lookup || Ha();
        if (!a) return !1;
        var c = k.exclude_lookup;
        for (d in c)
            if (Ia.call(c, d)) {
                var b = c[d];
                if (0 === d.indexOf("*")) {
                    var d = d.substr(1);
                    --b;
                    var e = a.lastIndexOf(d);
                    if (-1 !== e && e === a.length - b) return !0
                } else if (a === d) return !0
            }
        return !1
    }

    function xb(a) {
        var c = Bb.join(", ");
        if (!a && !c) return !1;
        var b = Boolean,
            d;
        if (d = c) a: if (q(window.Element.prototype.closest)) d = a.closest(c);
            else {
                for (; a && 1 === a.nodeType;) {
                    d =
                        a;
                    var e = c,
                        f = window.Element.prototype;
                    f = f.matches || f.msMatchesSelector || f.mozMatchesSelector || f.webkitMatchesSelector;
                    if (q(f)) d = f.call(d, e);
                    else {
                        e = Cb(d.document || d.ownerDocument, e);
                        for (f = 0; e[f] && e[f] !== d;) f += 1;
                        d = !!e[f]
                    }
                    if (d) {
                        d = a;
                        break a
                    }
                    a = a.parentNode
                }
                d = null
            }
        return b(d)
    }

    function Y(a, c) {
        return xa(a, c) && !ya(c) && Db(c)
    }

    function va(a) {
        return K ? (Ja(a) && (k.handlers += 1), !1) : Ja(a)
    }

    function mb(a) {
        for (var c, b, d, e, f; a && a !== k.html_root;) {
            d = a.id;
            b = 0;
            for (e = Q.length; b < e; b++)
                if (c = Q[b], A(a, c)) return !1;
            f = k.included_ids;
            b = 0;
            for (e = f.length; b < e; b++)
                if (c = f[b], d === c) return !1;
            e = k.excluded_classes;
            d = 0;
            for (b = e.length; d < b; d++)
                if (c = e[d], A(a, c)) return !0;
            a = a.parentNode
        }
        return Q.length || k.included_ids.length ? !0 : !1
    }

    function ba(a) {
        var c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : p,
            b = null;
        a && (b = new RegExp("\\b" + Eb(a) + "\\b", "i"));
        var d = da(c.getElementsByTagName("a"));
        c = da(c.getElementsByTagName("area"));
        d = d.concat(c);
        return Ka(d, function(a, c) {
            c.href && (!b || c.className && b.test(c.className)) && a.push(c);
            return a
        }, [])
    }

    function Ab(a) {
        var c;
        if (!La || Ma) return !1;
        g.tracking[a] = !1;
        a = !0;
        var b = g.tracking;
        for (c in b)
            if (Na.call(b, c)) {
                var d = b[c];
                if (!0 === d) {
                    a = !1;
                    break
                }
            }
        if (a) return Ma = !0, Fb()
    }

    function Fa() {
        if (!La) return !1;
        var a = Oa(x, m, h, k, g);
        a = {
            data: w(a)
        };
        v && (a.dnt = v);
        y && (a.fdnt = 1);
        a = aa(a);
        // XXX updated
        //if (h.isAdblockUser || !Pa("//t.skimresources.com/api/link", a, Qa)) return Gb()
        if (h.isAdblockUser || !Pa("//t.localtest.me/api/link", a, Qa)) return Gb()
    }

    function Pa(a, c, b) {
        if ("msie" !== h.detect.browser) {
            var d = !1;
            var e = new XMLHttpRequest;
            e.open("POST", a, !0);
            e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            0 <= Ra.call(e,
                "withCredentials") && (e.withCredentials = !0);
            e.async = "true";
            e.onreadystatechange = function() {
                if (d) return !0;
                if (4 === e.readyState) {
                    d = !0;
                    if (200 === e.status) {
                        var a = {};
                        var c = e.responseText;
                        if (0 === c.indexOf("//")) return b(a), !0;
                        try {
                            a = Sa(e.responseText)
                        } catch (vc) {}
                        b(a);
                        return !0
                    }
                    return !1
                }
            };
            e.send(c)
        } else if (m.XDomainRequest) {
            var f = new XDomainRequest;
            0 <= Ra.call(f, "withCredentials") && (f.withCredentials = !0);
            if (f) {
                f.open("POST", a, !0);
                f.onload = function() {
                    var a = {};
                    if (0 === f.responseText.indexOf("//")) return b(a), !0;
                    try {
                        a = Sa(f.responseText)
                    } catch (uc) {}
                    b(a);
                    return !0
                };
                f.onerror = function() {
                    return !1
                };
                f.onprogress = function() {
                    return !1
                };
                f.ontimeout = function() {
                    return !1
                };
                f.async = !0;
                try {
                    f.send(c)
                } catch (n) {
                    return !1
                }
            }
        } else return !1;
        return !0
    }

    function aa(a) {
        var c;
        var b = [];
        K && (a.xrf = 1);
        for (c in a) G(a, c) && b.push("" + c + "=" + t(a[c]));
        return b.join("&")
    }

    function R(a, c, b, d, e) {
        var f;
        null == b && (b = {});
        var n = b.charset || null;
        var g = b.target || null;
        b = null != (f = b.async) ? f : !0;
        f = null != g && g.document ? g.document : document;
        var k = f.getElementsByTagName("head")[0];
        var h = f.createElement("script");
        h.type = "text/javascript";
        n && (h.charset = n);
        c && (h.onload = h.onreadystatechange = function(a) {
            return function() {
                var b = !1;
                return function() {
                    var d = a.readyState;
                    if (!(b || d && "complete" !== d && "loaded" !== d)) return h.onload = h.onreadystatechange = null, b = !0, c.call(g), !0
                }
            }
        }(this)());
        h.onerror = function() {
            if (null != d) return null != e ? d(e) : d(!1)
        };
        h.async = !1 !== b;
        h.src = a;
        k.appendChild(h);
        return h
    }

    function xa(a, c) {
        var b = k.hostname;
        return /^\/\/|https?:\/\//i.test(a) && (!c || !b || -1 === c.indexOf(b)) &&
            (!b || -1 === b.indexOf("." + c))
    }

    function E(a) {
        return a.replace(/^www\./i, "")
    }

    function Ta(a, c) {
        var b = a();
        if (null != b) return function(a) {
            return a(b)
        };
        var d = null;
        Ua.once(c, function() {
            return "function" === typeof d ? d(a()) : void 0
        });
        return function(a) {
            return d = a
        }
    }

    function Hb() {
        for (var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], c = arguments[1], b = arguments[2], d = 0; d < a.length; d++) {
            var e = Va(a[d]);
            if (!ea(e)) return q(b) ? b(e, c) : e
        }
        return c
    }

    function Va(a, c, b) {
        return ea(m[a]) ? c : q(b) ? b(m[a], c) : m[a]
    }

    function l(a,
        c, b) {
        return fa(a) ? Hb(a, c, b) : Va(a, c, b)
    }

    function ea(a) {
        return "undefined" === typeof a || null === a
    }

    function fa(a) {
        return Array.isArray ? Array.isArray(a) : "[object Array]" === Object.prototype.toString.call(a)
    }

    function q(a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    }

    function Ib() {
        var a = arguments[1];
        return 0 === (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "").slice(2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0).indexOf(a)
    }

    function ha(a) {
        var c = p.createElement("a");
        c.href =
            a;
        return E(c.hostname)
    }

    function Wa(a) {
        // XXX updated
        //return Xa ? Xa : "msie" === h.detect.browser && 8 >= h.detect.version || a ? "//go.redirectingat.com" : "//go.skimresources.com"
        return Xa ? Xa : "msie" === h.detect.browser && 8 >= h.detect.version || a ? "//go.redirectingat.com" : "//go.localtest.me"
    }

    function J(a) {
        // XXX updated
        //return -1 !== k.waypointDomain.indexOf(a) || -1 !== a.indexOf("go.redirectingat.com") || -1 !== a.indexOf("go.skimresources.com")
        return -1 !== k.waypointDomain.indexOf(a) || -1 !== a.indexOf("go.redirectingat.com") || -1 !== a.indexOf("go.localtest.me")
    }

    function G(a, c) {
        return Object.prototype.hasOwnProperty.call(a, c)
    }

    function L(a) {
        return 10 > a ? "0" + a : "" + a
    }

    function ia() {
        return this.valueOf()
    }

    function ja(a) {
        ka.lastIndex = 0;
        return ka.test(a) ? '"' + a.replace(ka, function(a) {
            var b =
                Ya[a];
            return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function S(a, c) {
        var b, d = void 0,
            e = u,
            f = c[a];
        f && "object" === typeof f && q(f.toJSON) && (f = f.toJSON(a));
        q(z) && (f = z.call(c, a, f));
        switch (typeof f) {
            case "string":
                return ja(f);
            case "number":
                return isFinite(f) ? String(f) : "null";
            case "boolean":
            case "null":
                return String(f);
            case "object":
                if (!f) return "null";
                u += T;
                var n = [];
                if (fa(f)) {
                    var h = f.length;
                    for (b = 0; b < h; b += 1) n[b] = S(b, f) || "null";
                    var g = 0 === n.length ? "[]" : u ? "[\n" +
                        u + n.join(",\n" + u) + "\n" + e + "]" : "[" + n.join(",") + "]";
                    u = e;
                    return g
                }
                if (z && "object" === typeof z)
                    for (h = z.length, b = 0; b < h; b += 1) "string" === typeof z[b] && (d = z[b], (g = S(d, f)) && n.push(ja(d) + (u ? ": " : ":") + g));
                else
                    for (d in f) G(f, d) && (g = S(d, f)) && n.push(ja(d) + (u ? ": " : ":") + g);
                g = 0 === n.length ? "{}" : u ? "{\n" + u + n.join(",\n" + u) + "\n" + e + "}" : "{" + n.join(",") + "}";
                u = e;
                return g
        }
    }

    function w(a, c, b) {
        if (window.JSON && q(JSON.stringify)) return JSON.stringify.apply(null, arguments);
        var d;
        T = u = "";
        if ("number" === typeof b)
            for (d = 0; d < b; d += 1) T += " ";
        else "string" === typeof b && (T = b);
        if ((z = c) && !q(c) && ("object" !== typeof c || "number" !== typeof c.length)) throw Error("JSON.stringify");
        return S("", {
            "": a
        })
    }

    function Sa(a, c) {
        function b(a, d) {
            var e = void 0,
                f = a[d];
            if (f && "object" === typeof f)
                for (e in f)
                    if (G(f, e)) {
                        var g = b(f, e);
                        void 0 !== g ? f[e] = g : delete f[e]
                    }
            return c.call(a, d, f)
        }
        if (window.JSON && q(JSON.parse)) return JSON.parse.apply(null, arguments);
        var d = void 0;
        a = String(a);
        la.lastIndex = 0;
        la.test(a) && (a = a.replace(la, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (Jb.test(a.replace(Kb, "@").replace(Lb, "]").replace(Mb, ""))) return d = (0, eval)("(" + a + ")"), q(c) ? b({
            "": d
        }, "") : d;
        throw new SyntaxError("JSON.parse");
    }

    function Nb(a) {
        a.width = 0;
        a.height = 0;
        a.style.display = "none"
    }

    function Za() {
        return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : p).getElementsByTagName("body")[0]
    }

    function Z(a, c) {
        H || (H = p.createElement("iframe"), Za().appendChild(H), Nb(H));
        var b = H.contentDocument || H.contentWindow.document,
            d = Za(b);
        d || (d = p.createElement("body"), b.appendChild(d));
        b = b.createElement("img");
        b.src = a;
        b.width = 1;
        b.height = 1;
        c && q(c) && (b.onload = function() {
            c()
        });
        d.appendChild(b)
    }

    function Ob(a, c) {
        for (var b = 0; b < a.length; b++) c(a[b], b, a)
    }

    function P(a) {
        return ea(a) ? "" : a.toString().replace(/^[\s\xA0]+|[\s\xA0]+$/g, "")
    }

    function r(a, c, b) {
        3 <= arguments.length && ("undefined" !== typeof a.setAttribute ? a.setAttribute(c, b) : a[c] = b);
        try {
            var d = a[c];
            d || (d = a.getAttribute(c));
            return d
        } catch (e) {
            return null
        }
    }

    function Oa(a, c, b, d, e) {
        return {
            dl: e.link_impressions,
            guid: b.cookie,
            hae: d.handlers ? 1 : 0,
            pag: c.location.href,
            pub: a,
            sessid: b.sessid,
            slmcid: e.campaign_ids,
            typ: "l",
            tz: b.timezone,
            uuid: b.uuid
        }
    }

    function Ka(a, c, b) {
        for (var d = 0, e = null === a ? 0 : a.length; d < e;) b = c(b, a[d], d, a), d += 1;
        return b
    }

    function da(a) {
        return Ka(a, function(a, b) {
            return a.concat(b)
        }, [])
    }

    function Pb(a, c) {
        var b = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : !1,
            d = document.createElement("div"),
            e = "qsa" + String(Math.random()).slice(3);
        d.innerHTML = "x<style>" + c + "{qsa:" + e + ";}";
        d = $a.appendChild(d.lastChild);
        e = ab(a, c, b, e);
        $a.removeChild(d);
        return b ? e[0] : e
    }

    function ab(a,
        c, b, d) {
        var e = /1|9/.test(a.nodeType),
            f = a.childNodes,
            g = [],
            h = 0;
        if (e && a.currentStyle && a.currentStyle.qsa === d && g.push(a) && b) return g;
        for (;
            (a = f[h]) && (g = g.concat(ab(a, c, b, d)), h += 1, !b || !g.length););
        return g
    }

    function Cb(a, c) {
        1 === arguments.length && "string" === typeof a && (c = a, a = p);
        return q(a.querySelectorAll) ? da(a.querySelectorAll(c)) : Pb(a, c, !1)
    }

    function A(a, c) {
        if (!a || !a.className || !c) return !1;
        a: {
            var b = P(a.className).split(/\s+/);
            if (q(b.indexOf)) b = b.indexOf(c);
            else {
                if (fa(b))
                    for (var d = 0; d < b.length; d++)
                        if (b[d] ===
                            c) {
                            b = d;
                            break a
                        }
                b = -1
            }
        }
        return 0 <= b
    }

    function Ba(a, c) {
        if (a) {
            var b = null,
                d = a.childNodes.length && 3 === a.childNodes[0].nodeType;
            "msie" === h.detect.browser && d && (b = a.innerHTML);
            a.href = c;
            b && b !== a.innerHTML && (a.innerHTML = b)
        }
    }

    function Aa(a) {
        if (!a || !a.sl_href_restore_scheduled) {
            var c = a.href,
                b = "msie" === h.detect.browser && 7 > h.detect.version ? 1E4 : Qb;
            a.sl_href_restore_scheduled = !0;
            setTimeout(function() {
                a.href = c;
                delete a.sl_href_restore_scheduled
            }, b)
        }
    }

    function bb(a, c) {
        I || 1E3 < c ? q(a) && (I ? ma ? a(!0) : a(!1) : a(!1)) : setTimeout(bb,
            c *= 2, a, c)
    }

    function cb() {
        I || (M.complete && N.complete && (I = !0), I && "0" != M.width && "0" == N.width && (ma = !0))
    }

    function Rb(a) {
        for (var c = 0; c < db.length; c++) {
            var b = db[c];
            if (-1 !== a.toLowerCase().indexOf(b.toLowerCase())) return !0
        }
        return !1
    }
    var eb = window.skimlinks_context_window || null,
        m = eb ? window[eb] : window,
        p = m.document,
        Ua, Sb = [].indexOf || function(a) {
            for (var c = 0, b = this.length; c < b; c++)
                if (c in this && this[c] === a) return c;
            return -1
        },
        B = Ua = {
            topics: {},
            on: function(a, c) {
                var b;
                null == (b = this.topics)[a] &&
                    (b[a] = []);
                return this.topics[a].push(c)
            },
            off: function(a, c) {
                var b = 0 <= Sb.call(this.topics[a], c);
                if (-1 < b) return this.topics[a].splice(b, 1)
            },
            once: function(a, c) {
                var b = function(a) {
                    return function() {
                        b.called || c.apply(a, arguments);
                        return b.called = !0
                    }
                }(this);
                b.called = !1;
                return this.on(a, b)
            },
            publish: function(a, c) {
                var b;
                var d = {
                    topic: a,
                    extra: c
                };
                if (this.topics[a]) {
                    var e = this.topics[a];
                    var f = [];
                    var g = 0;
                    for (b = e.length; g < b; g++) {
                        var h = e[g];
                        f.push("function" === typeof h ? h(d) : void 0)
                    }
                    return f
                }
            }
        },
        Tb = "*.g.doubleclick.net *mjxads.internet.com *pgpartner.co.uk *pgpartner.com *pricegrabber.co.uk *pricegrabber.com *overture.com *youtube.com paid.outbrain.com trc.taboola.com traffic.outbrain.com zergnet.com *.criteo.com".split(" "),
        na = /https?:/g;
    p.createTextNode("");
    var Ub = ["noskim", "norewrite"],
        oa = {
            "t.umblr.com": {
                name: "z"
            }
        },
        x = "87696X1540561",
        fb = "1540561",
        Vb = l("noskimkinks", !1) || l("noskim", !1),
        Wb = l("noskimwords", !1) || l("noskim", !1),
        Xb = l("nounlinked", !1) || l("noskim", !1),
        v = l("skimlinks_dnt", 0, function(a) {
            return a && "0" !== a && "false" !== a ? 1 : 0
        }),
        y = l("skimlinks_nocookie", !1),
        Q = l("skimlinks_included_classes", []),
        Yb = l("skimlinks_excluded_classes", []),
        Zb = l("skimlinks_exclude", []),
        $b = l("skimlinks_include", []),
        ac = l("skimlinks_included_ids", []),
        gb = l("skimlinks_exrel", ""),
        O = l("skimlinks_byrel", !1),
        nb = l("skimlinks_ignore_hidden_links", false),
        Bb = l("skimlinks_link_impression_exclude_selector", []),
        bc = l("skimlinks_add_nofollow",
            false),
        cc = l("skimlinks_before_click_handler", false, function(a, c) {
            return "boolean" !== typeof a ? c : a
        }),
        dc = l("skimlinks_first_party_na", !1),
        ec = l("skimlinks_cookie_sync_optout", false),
        La = !l("noimpressions", !1),
        Qb = l("skimlinks_replace_timeout", 300, function(a, c) {
            var b = parseFloat(a);
            return isNaN(b) ? c : b
        }),
        fc = l("skimlinks_affiliate_unknown_links", true),
        F = l("skimlinks_target", null);
    l("skimlinks_ajax_rerun", false);
    var U = l("sl_test", !1),
        K = l("skimlinks_revenue_forecast", false);
    l("skimlinks_noright", false);
    var gc = l("skimlinks_url_extraction_rules", !1) || false,
        hb = l("skimlinks_extra_redir_params", []).join("&"),
        pa = l(["affiliate_tracking", "skimlinks_tracking"], !1, function(a, c) {
            var b = /^[a-z0-9_\\|]+$/i;
            return a && b.test(a) ? a : c
        }),
        qa = l("force_location"),
        C = l(["skimlinks_site", "skimlinks_sitename"], !1),
        ib = l("skimlinks_domain", ""),
        Xa = ib ? "http://" + ib : "",
        sb = l("skimlinks_google", false),
        db = l("noskim_domains", []);
    l("skimwords_horizontal_distance", 80);
    l("skimwords_vertical_distance", 80);
    var hc = l("skimlinks_profiling", false);
    l("skimwords_color",
        null);
    l("skimwords_weight", null);
    l("skimwords_decoration", null);
    l("skimwords_style", null);
    l("skimwords_title", null);
    var h = function() {
            var a = p.referrer || document.referrer || "",
                c = qa || m.location.href;
            var b = "aspsession-id aspsessionid cftoken j-sessionid jsessid jsession_id jsessionid phpsessid phpsession-id phpsessionid seskey sessid session-id session-key session_id sessionid sessionkey uniqueid utm_campaign utm_medium utm_source utm_term".split(" ");
            for (var d = 0; d < b.length; d++) {
                var e = b[d];
                var f = c.split("?");
                if (2 <= f.length) {
                    c = f.shift();
                    f = f.join("?");
                    e = encodeURIComponent(e) + "=";
                    f = f.split(/[&;]/gi);
                    for (var g = f.length - 1; 0 <= g; g--) Ib(f[g], e) && f.splice(g, 1);
                    c = c + "?" + f.join("&")
                }
            }
            "?" === c[c.length - 1] && (c = c.substr(0, c.length - 1));
            b = c;
            d = navigator.userAgent.toLowerCase();
            d = /(webkit)[ /]([\w.]+)/.exec(d) || /(opera)(?:.*version)?[ /]([\w.]+)/.exec(d) || /(msie) ([\w.]+)/.exec(d) || 0 > d.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(d) || [];
            d = {
                browser: d[1] ||
                    "",
                version: parseFloat(d[2]) || 0
            };
            c = (new Date).getTimezoneOffset();
            e = "";
            for (f = 0; 8 > f; f++) e += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
            return {
                cookie: "",
                detect: d,
                isAdblockUser: !1,
                pageLocation: b,
                referrer: a,
                sessid: "",
                timezone: c,
                uuid: e
            }
        }(),
        g = {
            campaign_ids: [],
            impressions: {
                pag: "",
                phr: [],
                unl: [],
                pub: x,
                slc: 0,
                swc: 0,
                ulc: 0,
                jsl: 0,
                jsf: "",
                guid: "",
                uuid: "",
                sessid: "",
                uc: pa,
                t: 1,
                slmcid: !1
            },
            link_impressions: {},
            loading_started: (new Date).getTime(),
            phrase_impressions: [],
            tracking: {
                skimlinks: !0,
                skimwords: !0,
                unlinked: !0
            },
            unlinked_impressions: []
        },
        k = function() {
            var a = document.getElementsByTagName("html") ? document.getElementsByTagName("html")[0] : null,
                c = qa ? ha(qa) : m.location.hostname;
            return {
                aff_domains: {},
                beacon: [],
                callback_name: "skimlinksApplyHandlers",
                disabled: Vb,
                domain_data: {
                    domains: []
                },
                exclude: Zb,
                exclude_lookup: null,
                excluded_classes: ["noskimlinks", "noskim"].concat(Yb),
                handlers: 0,
                has_been_called: !1,
                hostname: c,
                html_root: a,
                include: $b,
                include_lookup: null,
                included_classes: Q,
                included_ids: ac,
                links: [],
                links_tracked: !1,
                target: null,
                waypointDomain: Wa()
            }
        }(),
        jb = Wb,
        Jb = /^[\],:{}\s]*$/,
        Kb = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        Lb = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        Mb = /(?:^|:|,)(?:\s*\[)+/g,
        ka = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        la = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    q(Date.prototype.toJSON) || (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ?
            this.getUTCFullYear() + "-" + L(this.getUTCMonth() + 1) + "-" + L(this.getUTCDate()) + "T" + L(this.getUTCHours()) + ":" + L(this.getUTCMinutes()) + ":" + L(this.getUTCSeconds()) + "Z" : null
    });
    q(Boolean.prototype.toJSON) || (Boolean.prototype.toJSON = ia);
    q(Number.prototype.toJSON) || (Number.prototype.toJSON = ia);
    q(String.prototype.toJSON) || (String.prototype.toJSON = ia);
    var u = void 0,
        T = void 0,
        Ya = void 0,
        z = void 0;
    Ya = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    var Ra = [].indexOf || function(a) {
            for (var c =
                    0, b = this.length; c < b; c++)
                if (c in this && this[c] === a) return c;
            return -1
        },
        t = function() {
            var a;
            var c = [function() {
                var b;
                var c = [
                    ["%20", "+"],
                    ["!", "%21"],
                    ["'", "%27"],
                    ["\\(", "%28"],
                    ["\\)", "%29"],
                    ["\\*", "%2A"],
                    ["\\~", "%7E"]
                ];
                var e = [];
                var f = 0;
                for (b = c.length; f < b; f++) a = c[f], e.push([new RegExp(a[0], "g"), a[1]]);
                return e
            }()];
            return function(b) {
                var d;
                var e = encodeURIComponent(b);
                b = 0;
                for (d = c.length; b < d; b++) a = c[b], e = e.replace(a[0], a[1]);
                return e
            }
        }(),
        H = void 0,
        Na = {}.hasOwnProperty;
    var Ma = !1;
    var Gb = function() {
        var a;
        var c =
            8E3;
        "msie" === h.detect.browser && (c = 2E3);
        var b = Oa(x, m, h, k, g);
        b.dl = {};
        // XXX updated
        // var d = "//t.skimresources.com/api/link?data=";
        var d = "//t.localtest.me/api/link?data=";
        var e = 0;
        var f = g.link_impressions;
        for (a in f)
            if (Na.call(f, a)) {
                var n = f[a];
                e++;
                b.dl[a] = n;
                n = d + t(w(b));
                n.length > c && (e--, delete b.dl[a])
            }
        e && (d += t(w(b)), R(d, !1, {
            async: !0
        }));
        return !0
    };
    var Qa = function() {
        return !0
    };
    var V = function(a) {
        var c, b;
        if (a instanceof Array) {
            var d = {};
            var e = c = 0;
            for (b = a.length; c < b; e = ++c) {
                var f = a[e];
                d["" + e] = f
            }
            return d
        }
        return a
    };
    var ic = function() {
        var a, c;
        var b = (new Date).getTime() -
            g.loading_started;
        var d = 8E3;
        "msie" === h.detect.browser && (d = 2E3);
        g.impressions.tz = h.timezone;
        g.impressions.slc = k.handlers;
        g.impressions.swc = 0;
        g.impressions.ulc = 0;
        g.impressions.jsl = b;
        g.impressions.guid = h.cookie;
        g.impressions.slmcid = g.campaign_ids;
        g.impressions.uuid = h.uuid;
        g.impressions.sessid = h.sessid;
        g.impressions.pref = h.referrer;
        g.impressions.phr = [];
        g.impressions.unl = [];
        K && (g.impressions.xrf = 1);
        // XXX updated
        // b = "//t.skimresources.com/api/track.php?";
        b = "//localtest.me/api/track.php?";
        v && (b += "dnt=1&");
        y && (b += "fdnt=1&");
        h.isAdblockUser && (b += "abp=1&");
        b += "data=";
        var e = g.phrase_impressions;
        var f = a = 0;
        for (c = e.length; a < c; f = ++a) f = e[f], g.impressions.phr.push(f), f = b + t(w(g.impressions).replace(na, "")), f.length > d && (g.impressions.phr = g.impressions.phr.slice(0, -1));
        e = g.unlinked_impressions;
        f = a = 0;
        for (c = e.length; a < c; f = ++a) f = e[f], g.impressions.unl.push(f), f = b + t(w(g.impressions).replace(na, "")), f.length > d && (g.impressions.unl = g.impressions.unl.slice(0, -1));
        g.impressions.phr = V(g.impressions.phr);
        g.impressions.unl = V(g.impressions.unl);
        d = b + t(w(g.impressions).replace(na,
            ""));
        return R(d, !1, {
            async: !0
        })
    };
    var Fb = function() {
        var a = (new Date).getTime() - g.loading_started;
        g.impressions.tz = h.timezone;
        g.impressions.slc = k.handlers;
        g.impressions.swc = 0;
        g.impressions.ulc = 0;
        g.impressions.jsl = a;
        g.impressions.guid = h.cookie;
        g.impressions.slmcid = g.campaign_ids;
        g.impressions.uuid = h.uuid;
        g.impressions.sessid = h.sessid;
        g.impressions.pref = h.referrer;
        g.impressions.pag = h.pageLocation;
        g.impressions.phr = V(g.phrase_impressions);
        g.impressions.unl = V(g.unlinked_impressions);
        a = {
            data: w(g.impressions)
        };
        v && (a.dnt = v);
        y && (a.fdnt = 1);
        a = aa(a);
        // XXX updated
        //!h.isAdblockUser && Pa("//t.skimresources.com/api/track.php", a, Qa) || ic();
        !h.isAdblockUser && Pa("//t.localtest.me/api/track.php", a, Qa) || ic();
        return !0
    };
    B.on("skim_js_init", function() {
        k.disabled && (g.tracking.skimlinks = !1);
        jb && (g.tracking.skimwords = !1);
        if (Xb) return g.tracking.unlinked = !1
    });
    var Eb = function() {
            var a = /[-[\]{}()*+?.,\\^$|#]/g,
                c = /\s+/g;
            return function(b) {
                return b.replace(a, "\\$&").replace(c, "\\s+")
            }
        }(),
        $a = p.getElementsByTagName("head")[0],
        Ia = {}.hasOwnProperty,
        jc = [].indexOf || function(a) {
            for (var c = 0, b = this.length; c < b; c++)
                if (c in
                    this && this[c] === a) return c;
            return -1
        };
    var Ha = function() {
        var a;
        k.exclude_lookup = {};
        k.include_lookup = {};
        C && k.exclude.push(C);
        var c = k.exclude.concat(Tb);
        var b = 0;
        for (a = c.length; b < a; b++) {
            var d = c[b];
            k.exclude_lookup[d] = d.length
        }
        c = k.include;
        b = 0;
        for (a = c.length; b < a; b++) d = c[b], k.include_lookup[d] = d.length;
        return k.exclude_lookup
    };
    var Db = function(a) {
        null !== k.exclude_lookup && null !== k.include_lookup || Ha();
        if (!a) return !1;
        if (0 === k.include.length) return !0;
        var c = k.include_lookup;
        for (e in c)
            if (Ia.call(c, e)) {
                var b = "*" ===
                    e.substr(0, 1);
                var d = "*" === e.substr(e.length - 1, 1);
                var e = e.replace(/\*/g, "");
                if (b && d) {
                    if (-1 !== a.indexOf(e)) return !0
                } else if (b) {
                    if (-1 !== a.indexOf(e) && a.indexOf(e) === a.length - e.length) return !0
                } else if (d) {
                    if (0 === a.indexOf(e)) return !0
                } else if (a === e) return !0
            }
        return !1
    };
    var Ja = function(a) {
        return !0 === k.aff_domains[a] || (null === k.aff_domains[a] || void 0 === k.aff_domains[a]) && fc && !J(a)
    };
    var ua = function(a) {
        var c;
        if (!a) return !1;
        var b = a.toLowerCase().split(/\s+/);
        a = gb ? [gb.toLowerCase()] : [];
        a = a.concat(Ub);
        var d = 0;
        for (c =
            b.length; d < c; d++) {
            var e = b[d];
            if (0 <= jc.call(a, e)) return !0
        }
        return !1
    };
    var zb = [].indexOf || function(a) {
        for (var c = 0, b = this.length; c < b; c++)
            if (c in this && this[c] === a) return c;
        return -1
    };
    var yb = function(a) {
        return -1 === a.indexOf("#slm-") || (a = a.split("#slm-"), 2 !== a.length || isNaN(a[1]) || 10 * parseInt(a[1]) !== 10 * a[1]) ? null : parseInt(a[1])
    };
    var ca = function(a, c) {
        var b;
        --m.skimlinks_requests_in_flight;
        var d = null != a ? a : {};
        a && (k.beacon.push(d), B.publish("beacon", d));
        k.waypointDomain = Wa(d.guid);
        d.guid && "" === h.cookie && (h.cookie =
            d.guid);
        d.sessid && "" === h.sessid && (h.sessid = d.sessid);
        var e = d.merchant_domains || [];
        var f = 0;
        for (b = e.length; f < b; f++) {
            var g = e[f];
            J(g) || (k.aff_domains[g] = !0)
        }
        for (g in k.aff_domains) null === k.aff_domains[g] && (k.aff_domains[g] = !1);
        hc && (g = h.cookie, fb && g && R("http://odpp.skimapis.com/" + fb + "/profile/" + g + "?callback=skimlinksODPCallback", !1, {}));
        if (bc)
            for (e = ba(), g = 0, f = e.length; g < f; g++) b = e[g], kc(b);
        return B.publish(c, d)
    };
    var kc = function(a) {
        var c = r(a, "rel");
        var b = E(a.hostname);
        if (!c && b && !0 === k.aff_domains[b]) return r(a,
            "rel", "nofollow")
    };
    m.skimlinksODPCallback = function(a) {
        var c = a.status;
        a = a.actions;
        a = void 0 === a ? [] : a;
        c && "OK" === c && Ob(a, function(a) {
            var b = a.url;
            "pixel" === a.action && Z(b)
        })
    };
    var tb = function(a, c) {
        var b, d;
        null == c && (c = k.callback_name);
        m.skimlinks_requests_in_flight = (null != (b = m.skimlinks_requests_in_flight) ? b : 0) + 1;
        if (null == a || !a.length) return m[c](), !1;
        b = t('{"pubcode":"' + x + '","domains":_DOMAIN_LIST_,"page":"' + m.location.href + '"}');
        // XXX updated
        //var e = "//r.skimresources.com/api/?callback=" + c + (v ? "&dnt=1" : "") + (y ? "&fdnt=1" :
        var e = "//r.localtest.me/api/?callback=" + c + (v ? "&dnt=1" : "") + (y ? "&fdnt=1" :
            "") + "&data=" + b;
        b = "msie" === h.detect.browser ? 2E3 : 8E3;
        var f = [];
        var g = 0;
        for (d = a.length; g < d; g++) {
            var l = a[g];
            f.push(l);
            e.replace("_DOMAIN_LIST_", t(w(f))).length > b && (f = f.slice(0, -1))
        }
        e = e.replace("_DOMAIN_LIST_", t(w(f)));
        return R(e, !1, {})
    };
    var ra = function() {
        return p.addEventListener ? function(a, c, b) {
            var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : !1;
            if (a && (a.nodeName || a === m)) return a.addEventListener(c, b, d)
        } : function(a, c, b) {
            if (a && (a.nodeName || a === m)) return a.attachEvent("on" + c, function() {
                return 7 >
                    h.detect.version && !m.event ? (setTimeout(function() {
                        return b.call(a, m.event)
                    }, 100), !0) : b.call(a, m.event)
            })
        }
    }();
    var qb = function(a) {
        var c;
        if (gc) {
            var b = E(a.hostname);
            if (b in oa) return b = "[&?]" + oa[b].name + "=(http[^&]+)", b = new RegExp(b), decodeURIComponent(null != (c = a.href) ? c.match(b).pop() : void 0) || a.href
        }
        return a.href
    };
    var rb = function(a, c) {
        var b = h.referrer ? "&pref=" + t(h.referrer) : "";
        var d = !1;
        if (0 < c.indexOf("#slm-")) {
            var e = c.split("#slm-");
            2 !== e.length || isNaN(e[1]) || 10 * parseInt(e[1]) !== 10 * e[1] || (c = e[0], d =
                e[1])
        }
        var f = r(a, "data-skimlinks-tracking") || pa;
        var g = r(a, "data-skimlinks-editor") && 1 === parseInt(r(a, "data-skimlinks-editor")) ? 1 : 0;
        if (A(a, "skimwords-link")) {
            var l = r(a, "data-skimwords-word");
            e = r(a, "data-skim-creative");
            var p = r(a, "data-skim-product");
            var q = k.waypointDomain;
            c = q + "/?id=" + x + (f ? "&xcust=" + f : "") + (!1 !== d ? "&xs=9" : "&xs=2") + "&url=" + t(c) + "&xguid=" + h.cookie + "&xuuid=" + h.uuid + "&xsessid=" + h.sessid + "&isjs=1&xword=" + (l ? l : "") + "&xcreo=" + (e ? e : "") + "&xpid=" + (p ? p : "") + "&xed=" + g + "&sref=" + t(m.location) + b + (v ? "&dnt=1" :
                "") + (y ? "&fdnt=1" : "") + (!1 !== d ? "&slmcid=" + d : "") + (!1 !== h.timezone ? "&xtz=" + h.timezone : "")
        } else A(a, "skimlinks-inline") ? (e = r(a, "data-skim-creative"), c = k.waypointDomain + "/?id=" + x + (C ? "&site=" + C : "") + (U ? "&test=" + U : "") + (f ? "&xcust=" + f : "") + (!1 !== d ? "&xs=9" : "&xs=8") + "&isjs=1&url=" + t(c) + "&xguid=" + h.cookie + "&xuuid=" + h.uuid + "&xsessid=" + h.sessid + "&xcreo=" + (a && null != e ? e : 0) + "&xed=" + g + "&sref=" + t(m.location) + "&pref=" + t(h.referrer) + (v ? "&dnt=1" : "") + (y ? "&fdnt=1" : "") + (!1 !== d ? "&slmcid=" + d : "") + (!1 !== h.timezone ? "&xtz=" + h.timezone :
            "")) : Ga(a, "noskimlinks") || (e = r(a, "data-skim-creative"), c = k.waypointDomain + "/?id=" + x + (C ? "&site=" + C : "") + (U ? "&test=" + U : "") + (f ? "&xcust=" + f : "") + (!1 !== d ? "&xs=9" : "&xs=1") + "&isjs=1&url=" + t(c) + "&xguid=" + h.cookie + "&xuuid=" + h.uuid + "&xsessid=" + h.sessid + "&xcreo=" + (a && null != e ? e : 0) + "&xed=" + g + "&sref=" + t(m.location) + b + (v ? "&dnt=1" : "") + (y ? "&fdnt=1" : "") + (!1 !== d ? "&slmcid=" + d : "") + (!1 !== h.timezone ? "&xtz=" + h.timezone : ""));
        0 < hb.length && (c += "&" + hb);
        h.isAdblockUser && !Ga(a, "noskimlinks") && (c += "&abp=1");
        return c
    };
    var lc = {}.hasOwnProperty;
    var mc = function(a, c) {
        var b;
        var d = [];
        K && (a.xrf = 1);
        for (b in a)
            if (lc.call(a, b)) {
                var e = a[b];
                "data" !== b && d.push(b + "=" + e)
            }
        a.data && d.push("data=" + a.data);
        return c + "?" + d.join("&")
    };
    var nc = function(a) {
        var c = p.getElementsByTagName("body")[0];
        var b = p.createElement("img");
        b.src = a;
        b.width = 1;
        b.height = 1;
        "undefined" !== typeof b.style && (b.style.display = "none");
        c.appendChild(b);
        return b
    };
    var wa = function(a, c) {
        oc(a);
        F && r(a, "target", F);
        var b = r(a, "onclick");
        var d = "click" === c.type || "contextmenu" === c.type;
        if (null != b && -1 !==
            b.toString().indexOf("return false")) {
            if (d) return d = W(c), za(c), (F ? m.open(d.href) : m.open(d.href, F)).focus()
        } else return za(c)
    };
    var pb = function(a) {
        var c = W(a);
        var b = c.href;
        var d = ha(b);
        J(d) && (b = pc(c, b));
        "" === h.cookie && dc ? wa(c, a) : (a = b, d = ha(a), J(d) || (d = "", b = r(c, "data-skimlinks-tracking") || pa, 0 < a.indexOf("#slm-") && (c = a.split("#slm-"), 2 !== c.length || isNaN(c[1]) || 10 * parseInt(c[1]) !== 10 * c[1] || (a = c[0], d = c[1])), c = {
            call: "track",
            data: t('{"pubcode":"' + x + '", "referrer":"' + m.location + '", "pref":"' + h.referrer + '", "site":"' +
                C + '", "url":"' + a + '", "custom":"' + (b || "") + '", "xtz":' + h.timezone + ', "uuid":"' + h.uuid + '", "slmcid":"' + d + '", "product":"1"}')
        // XXX update
        // }, v && (c.dnt = v), y && (c.fdnt = 1), c = mc(c, "//t.skimresources.com/api/"), c = c + "&rnd=" + Math.random(), nc(c)));
        }, v && (c.dnt = v), y && (c.fdnt = 1), c = mc(c, "//t.localtest.me/api/"), c = c + "&rnd=" + Math.random(), nc(c)));
        return !0
    };
    var kb = function(a, c, b) {
        if (0 === c) return b;
        try {
            return a()
        } catch (d) {
            return kb(a, c - 1, b)
        }
    };
    var lb = function(a) {
        if (null == a) return null;
        for (;
            "A" !== a.nodeName.toUpperCase();)
            if (a = kb(function() {
                    return a.parentNode
                }, 3, null), null == a) return null;
        return a
    };
    var ob = function(a) {
        return a in
            oa
    };
    var pc = function(a, c) {
        var b = qc(c);
        b !== c && (Aa(a), Ba(a, b));
        return b
    };
    var qc = function(a) {
        return a = h.cookie ? a.replace(/([&\?]{1})xguid=([a-fA-F0-9]{32})/, "$1xguid=" + h.cookie) : a.replace(/([&\?]{1}xguid=[a-fA-F0-9]{32})/, "")
    };
    var oc = function(a) {
        var c, b;
        var d = l("skimlinks_strip_attribute", !1);
        if (!d) return !1;
        for (b in d)
            if (G(d, b)) {
                var e = d[b];
                (c = r(a, b)) && 0 === c.indexOf(e) && (c = c.substr(e.length), r(a, b, c))
            }
        return !0
    };
    var D = function() {
        if (k.has_been_called) return !1;
        k.has_been_called = !0;
        return Ca(Da(), "skimlinksApplySecondaryHandlers")
    };
    var rc = function() {
        if (!k.disabled) {
            var a = Da();
            Ca(a);
            a: if (a = p) {
                cc && ra(a, "mouseup", X, !0);
                ra(a, "click", X, !0);
                try {
                    var c = "onauxclick" in p.createElement("body") ? "auxclick" : "contextmenu";
                    ra(a, c, X, !0)
                } catch (b) {
                    c = !1;
                    break a
                }
                c = !0
            } else c = !1;
            return c
        }
    };
    B.on("skim_js_ready", function() {
        m.skimlinks_revenue_forecast = window.skimlinks_revenue_forecast = !1;
        k.tracking && !/^[a-z0-9_\\|]+$/i.test(k.tracking) && (k.tracking = !1);
        if (K && l("skimlinks")) return !1;
        rc();
        var a = function() {
            if (k.has_been_called) return !0;
            try {
                p.documentElement.doScroll("left")
            } catch (d) {
                return setTimeout(a,
                    50), !1
            }
            return D()
        };
        var c = function() {
            return function() {
                return p.addEventListener ? function() {
                    p.removeEventListener("DOMContentLoaded", c, !1);
                    D();
                    return !0
                } : p.attachEvent ? function() {
                    p.detachEvent("onreadystatechange", c);
                    D();
                    return !0
                } : function() {
                    D();
                    return !0
                }
            }
        }(this)();
        if ("complete" === p.readyState) return setTimeout(D, 1);
        if (p.addEventListener) return p.addEventListener("DOMContentLoaded", c, !1), m.addEventListener("load", D, !1);
        if (p.attachEvent) {
            p.attachEvent("onreadystatechange", c);
            m.attachEvent("onload", D);
            var b = !1;
            try {
                b = null === m.frameElement
            } catch (d) {}
            if (p.documentElement.doScroll && b) return a()
        }
    });
    null == m.skimlinksApplyHandlers && (m.skimlinksApplyHandlers = wb);
    null == m.skimlinksApplySecondaryHandlers && (m.skimlinksApplySecondaryHandlers = vb);
    null == m.skimlinksApplyAuxHandlers && (m.skimlinksApplyAuxHandlers = ub);
    var sc = [{
        label: "lotame",
        // XXX updated
        //url: "//bcp.crwdcntrl.net/5/c=7507/pv=y?https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dlotame%26skim_mapping%3Dtrue%26provider_id%3D%24%7Bprofile_id%7D",
        url: "//bcp.localtest.me/5/c=7507/pv=y?https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dlotame%26skim_mapping%3Dtrue%26provider_id%3D%24%7Bprofile_id%7D",
        resyncAfter: [2, "days"],
        priority: 1,
        active: !0
    }, {
        label: "blue_kai",
        // XXX updated
        //url: "https://stags.bluekai.com/site/27381?redir=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dblue_kai%26skim_mapping%3Dtrue%26provider_id%3D%24_BK_UUID",
        url: "https://stags.localtest.me/site/27381?redir=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dblue_kai%26skim_mapping%3Dtrue%26provider_id%3D%24_BK_UUID",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "dfp",
        // XXX updated
        //url: "//cm.g.doubleclick.net/pixel?google_nid=skimlinks_ddp&google_cm",
        url: "//cm.g.localtest.me/pixel?google_nid=skimlinks_ddp&google_cm",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "mediamath",
        // XXX updated
        //url: "//pixel.mathtag.com/sync/img?redir=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dmediamath%26skim_mapping%3Dtrue%26provider_id%3D%5BMM_UUID%5D%26provider_dc%3D%5BMT_DC%5D",
        url: "//pixel.localtest.me/sync/img?redir=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dmediamath%26skim_mapping%3Dtrue%26provider_id%3D%5BMM_UUID%5D%26provider_dc%3D%5BMT_DC%5D",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "app_nexus",
        // XXX updated
        //url: "https://secure.adnxs.com/getuid?https%3A%2F%2Fx.skimresources.com%2F%3Fprovider_id%3D%24UID%26provider%3Dapp_nexus%26skim_mapping%3Dtrue",
        url: "https://secure.localtest.me/getuid?https%3A%2F%2Fx.skimresources.com%2F%3Fprovider_id%3D%24UID%26provider%3Dapp_nexus%26skim_mapping%3Dtrue",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "eyeota",
        // XXX updated
        //url: "//ps.eyeota.net/match?bid=dn9h51u&r=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Deyeota%26provider_id%3D%7BUUID_dn9h51u%7D%26skim_mapping%3Dtrue",
        url: "//ps.localtest.me/match?bid=dn9h51u&r=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Deyeota%26provider_id%3D%7BUUID_dn9h51u%7D%26skim_mapping%3Dtrue",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "magnetic",
        // XXX updated
        //url: "//magnetic.t.domdex.com/sync/skimlinks",
        url: "//magnetic.t.localtest.me/sync/skimlinks",
        resyncAfter: [7, "days"],
        priority: 3,
        active: !0
    }, {
        label: "exelate",
        // XXX updated
        //url: "//x.skimresources.com/?provider=exelate",
        url: "//x.localtest.me/?provider=exelate",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "exelate2",
        // XXX updated
        //url: "//x.skimresources.com/?provider=exelate2",
        url: "//x.localtest.me/?provider=exelate2",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "krux",
        // XXX updated
        //url: "//x.skimresources.com/?provider=krux",
        url: "//x.localtest.me/?provider=krux",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "avocet",
        // XXX updated
        //url: "https://ads.avocet.io/getuid?url=https%3A%2F%2Fx.skimresources.com%2F%3Fskim_mapping%3Dtrue%26provider%3Davocet%26provider_id%3D%7B%7BUUID%7D%7D",
        url: "https://ads.localtest.me/getuid?url=https%3A%2F%2Fx.skimresources.com%2F%3Fskim_mapping%3Dtrue%26provider%3Davocet%26provider_id%3D%7B%7BUUID%7D%7D",
        resyncAfter: [1, "days"],
        priority: 3,
        active: !0
    }, {
        label: "tapad",
        // XXX updated
        //url: "//x.skimresources.com/?provider=tapad",
        url: "//x.localtest.me/?provider=tapad",
        resyncAfter: [3, "days"],
        priority: 3,
        active: !0
    }, {
        label: "skim",
        // XXX updated
        //url: "//x.skimresources.com/?provider=skim",
        url: "//x.localtest.me/?provider=skim",
        resyncAfter: [5, "days"],
        priority: 3,
        active: !0
    }, {
        label: "trade_desk",
        // XXX updated
        // url: "//match.adsrvr.org/track/cmf/generic?ttd_pid=qakudad&ttd_tpi=1",
        url: "//match.localtest.me/track/cmf/generic?ttd_pid=qakudad&ttd_tpi=1",
        resyncAfter: [3, "days"],
        priority: 3,
        active: !0
    }, {
        label: "rakutenoutbound",
        // XXX updated
        // url: "//x.skimresources.com/?provider=rakutenoutbound",
        url: "//x.localtest.me/?provider=rakutenoutbound",
        resyncAfter: [3, "days"],
        priority: 2,
        active: !0
    }, {
        label: "sovrn",
        // XXX updated
        // url: "//x.skimresources.com/?provider=sovrn",
        url: "//x.localtest.me/?provider=sovrn",
        resyncAfter: [5, "days"],
        priority: 2,
        active: !0
    }, {
        label: "narrative",
        // XXX updated
        //url: "//x.skimresources.com/?provider=narrative",
        url: "//x.localtest.me/?provider=narrative",
        resyncAfter: [5, "days"],
        priority: 2,
        active: !0
    }, {
        label: "tbin",
        // XXX updated
        //url: "//trc.taboola.com/sg/skimlinks/1/cm",
        url: "//localtest.me/sg/skimlinks/1/cm",
        resyncAfter: [5, "days"],
        priority: 2,
        active: !0
    }, {
        label: "liout",
        // XXX updated
        //url: "//query.petametrics.com/skimlinks",
        url: "//query.localtest.me/skimlinks",
        resyncAfter: [4, "days"],
        priority: 3,
        active: !0
    }];
    var sa = function() {
        if (sa) return sa;
        var a = function(a) {
            return ((null != a ? a[0] : void 0) || 2) * {
                minutes: 60,
                hours: 3600,
                days: 86400
            }[(null != a ? a[1] : void 0) || "days"]
        };
        var c = sc;
        var b = {};
        var d = function(a, b) {
            var c, d, e;
            if (a.filter) return null != (c = a.filter) ? "function" === typeof c.call ? c.call(a, b) : void 0 : void 0;
            var f = [];
            c = d = 0;
            for (e = a.length; 0 <= e ? d < e : d > e; c = 0 <= e ? ++d : --d) b(a[c]) && f.push(a[c]);
            return f
        };
        var e = function(b, c, d) {
            return b.timestamp + a(c.resyncAfter) <= d
        };
        var f = function(a) {
            return b.getServerTime(function(b) {
                b = k(a, b);
                return p(b)
            })
        };
        var g = function(a, b) {
            var c = Math.max(1, Number(a.priority)) - 1;
            null == b[c] &&
                (b[c] = []);
            return b[c].push(a)
        };
        var h = function(a) {
            var b;
            for (b = a.length; b;) {
                var c = Math.floor(Math.random() * b--);
                var d = b;
                var e = a[d];
                a[d] = a[c];
                a[c] = e
            }
            return a
        };
        var k = function(a, b) {
            var f;
            var k = d(c, function(c) {
                var d;
                return c.active ? (d = a[c.label]) ? e(d, c, b) : !0 : !1
            });
            var l = [];
            var m = d(k, function(a) {
                return 1 === a.priority
            });
            k = m.length ? m : k;
            m = 0;
            for (f = k.length; m < f; m++) {
                var n = k[m];
                g(n, l)
            }
            n = [];
            m = 0;
            for (f = l.length; m < f; m++) k = l[m], null != k && n.push.apply(n, h(k));
            return n
        };
        var l = function(a) {
            return f(m(a))
        };
        var m = function(a) {
            var b;
            var c = {};
            if (!a) return c;
            var d = a.split("|");
            a = 0;
            for (b = d.length; a < b; a++) {
                var e = d[a];
                e = e.split(":");
                var f = e[0];
                c[f] = {
                    label: f,
                    timestamp: parseInt(e[1])
                }
            }
            return c
        };
        var p = function(a) {
            if (a.length) {
                var b = a.shift();
                var c = function() {
                    var b = !1;
                    return function() {
                        if (!b) return p(a), b = !0
                    }
                }();
                Z(b.url, c);
                return setTimeout(c, 500)
            }
        };
        return {
            init: function(a, c, d) {
                b.getServerTime = d;
                if (a) return c(l)
            },
            __private__: {
                day: 86400,
                isTimeToSync: e,
                configToSeconds: a,
                parseSyncCookie: m,
                getSuitableProviders: k,
                setProviders: function(a) {
                    return c =
                        a
                }
            }
        }
    }();
    B.on("skim_js_init", function() {
        var a = !ec;
        var c = Ta(function() {
            var a;
            return null != (a = k.beacon[0]) ? a.csp : void 0
        }, "beacon");
        var b = Ta(function() {
            var a;
            return null != (a = k.beacon[0]) ? a.ts : void 0
        }, "beacon");
        return sa.init(a, c, b)
    });
    var ma = !1,
        I = !1,
        M = null,
        N = null,
        tc = {
            detect: function(a) {
                a: {
                    try {
                        var c = navigator.userAgent.toLowerCase();
                        if (-1 === c.indexOf("firefox") && -1 === c.indexOf("chrome")) {
                            I = !0;
                            ma = !1;
                            break a
                        }
                    } catch (b) {}
                    c = "" + 11 * Math.random();M = new Image;M.onload = cb;
                    // XXX updated
                    //M.src = "//p.skimresources.com/px.gif?ch=*&rn=*".replace(/\*/,"1").replace(/\*/, c);
                    M.src = "//p.localtest.me/px.gif?ch=*&rn=*".replace(/\*/,"1").replace(/\*/, c);
                    N = new Image;N.onload = cb;
                    // XXX updated
                    //N.src = "//p.skimresources.com/px.gif?ch=*&rn=*".replace(/\*/, "2").replace(/\*/, c)
                    N.src = "//p.localtest.me/px.gif?ch=*&rn=*".replace(/\*/, "2").replace(/\*/, c)
                }
                bb(a, 250)
            }
        };
    (function() {
        m.skimInitAlreadyCalled || (m.skimInitAlreadyCalled = !0, Rb(k.hostname) && (jb = k.disabled = !0), tc.detect(function(a) {
            h.isAdblockUser = a
        }), B.publish("skim_js_init"), B.publish("skim_js_ready"))
    })()
})();
