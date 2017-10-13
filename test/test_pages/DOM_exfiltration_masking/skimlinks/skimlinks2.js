/*
 Skimlinks javascript runtime
 Copyrights 2009 - 2017

 Build time: Tue, 10 Oct 2017 13:35:50 GMT
 Version: 13.0.3
*/
(function() {
    function fb(a) {
        var b;
        var c = b = null;
        var d = 5;
        a.Limit && (d = a.Limit);
        var e = function() {
            return a.Priority || 0
        };
        return {
            group_id: function() {
                return b ? b.id() : 0
            },
            dec_limit: function() {
                return d - 1
            },
            limit: function() {
                return d
            },
            action_type: function() {
                return a.ActionType
            },
            text: function() {
                return a.OriginalPhrase
            },
            start_byte: function() {
                return a.StartByte
            },
            url: function() {
                return a.Url
            },
            multi: function() {
                return a.Mt ? !0 : !1
            },
            is_editor: function() {
                return null != a.ValidOn && "" !== a.ValidOn ? !0 : !1
            },
            is_blacklisted: function() {
                return null !=
                    a.IsBlacklisted ? a.IsBlacklisted : !1
            },
            group_priority: function() {
                return b ? b.group_priority() : e()
            },
            id: function() {
                return c ? c : a.PhraseId
            },
            groups: function() {
                var b;
                return (b = a.Groups) ? b : []
            },
            title: function() {
                return a.Unlinked ? "" : null != a.ActionTitle ? a.ActionTitle : "Shopping link provided by SkimWords"
            },
            set_title: function(b) {
                return a.Unlinked ? a.Title = "" : a.Title = b
            },
            occurrence: function() {
                return a.PhraseOccurrence
            },
            set_group: function(a) {
                return b = a
            },
            set_id: function(a) {
                return c = a
            }
        }
    }

    function za(a, b, c) {
        var d = b.phrase;
        var e = {};
        e.w = d.text();
        e.lp = d.url();
        if (c) {
            e.t = H.creative;
            var f = "unlinked"
        } else {
            if (0 === d.limit()) return !1;
            h.link_all || d.dec_limit();
            h.handlers += 1;
            d.is_editor() ? e.ed = 1 : e.ed = 0;
            e.t = gb(d.action_type());
            f = "skimwords";
            0 === d.group_id() ? e.pid = 0 : e.pid = hb(d.id(), d.action_type())
        }
        a: {
            d = f;
            var g;f = !0;
            if ("skimwords" === d) {
                var p = n.phrase_impressions;
                var r = 0;
                for (g = p.length; r < g; r++)
                    if (d = p[r], f = d.pid ? d.pid === e.pid : d.w === e.w) break a;
                n.phrase_impressions.push(e)
            } else if ("unlinked" === d) {
                p = n.unlinked_impressions;
                r = 0;
                for (g =
                    p.length; r < g; r++) d = p[r], d.w === e.w && (f = !1);
                f && n.unlinked_impressions.push(e);
                Z++
            }
        }
        tc(a, b, c);
        return !0
    }

    function hb(a, b) {
        1E7 < a && 6 !== b && (a -= 1E7);
        return a
    }

    function gb(a) {
        10 > parseInt(a) && (a = "0" + a);
        return "3000" + a
    }

    function Aa(a, b, c, d) {
        var e;
        var f = document.createDocumentFragment();
        var g = 0;
        var p = [];
        var r = b.nodeValue;
        var h = [];
        var l = b.parentNode;
        d || (d = "skimwords-potential");
        c || (c = "-1");
        if (l) {
            var m = 0;
            for (e = a.length; m < e; m++) {
                var t = a[m];
                var k = document.createElement("span");
                k.className = d;
                var n = document.createTextNode(r.substring(g,
                    t.start));
                f.appendChild(n);
                k.innerHTML = t.text;
                f.appendChild(k);
                g = {};
                g.node = k;
                g.match = t;
                w(g, "occurrence", t.target_occurrence);
                p.push(g);
                g = t.start + t.text.length;
                h.push(n);
                v.add_node(n, c)
            }
            a = document.createTextNode(r.substring(g));
            h.push(a);
            f.appendChild(a);
            v.add_node(a, c);
            l.replaceChild(f, b)
        }
        return [p, h]
    }

    function vc() {
        if (ib) return !1;
        ib = !0;
        if (u.getElementsByTagName("body").length) {
            if (u.addEventListener) return u.getElementsByTagName("body")[0].addEventListener("DOMNodeInserted", jb, !1), !0;
            if (document.attachEvent) return u.getElementsByTagName("body")[0].attachEvent("DOMNodeInserted",
                jb), !0
        }
    }

    function Ba(a, b) {
        return 0 === b.length ? !1 : aa(a, b.join(",")) ? !0 : a.parentNode ? Ba(a.parentNode, b) : !1
    }

    function kb(a, b) {
        var c = a.style.cssText;
        "" !== c && (c += " ");
        var d = m("link_background");
        d && (-1 === d.indexOf("#") && (d = "#" + d), c += "background-color: " + d + " !important; ");
        null !== m("link_tooltip", null) && (a.title = m("link_tooltip"));
        b && (lb && (d = lb, -1 === d.indexOf("#") && (d = "#" + d), c += "color: " + d + " !important; "), mb && (c += "font-weight: " + mb + " !important; "), ja && (c = "double" === ja ? c + "border-bottom: 1px double !important; " :
            "dashed" === ja ? c + "border-bottom: 1px dashed !important; " : c + ("text-decoration: " + ja + " !important; ")), nb && (c += "font-style: " + nb + " !important; "), m("skimwords_link_style") && (d = m("skimwords_link_style"), c += d + "; "), m("skimwords_link_class") && (a.className = A(a.className + " " + m("skimwords_link_class"))), ob && (a.title = ob), null === a.getAttribute("title") && (a.title = "Shopping link added by SkimWords"), a.getAttribute("data-skim-creative") && (d = parseInt(a.getAttribute("data-skim-creative")) % 10, 1 === d || 2 === d)) && (a.title =
            "");
        a.style.cssText = c;
        return !0
    }

    function Ca(a) {
        var b;
        a = a.target || a.srcElement;
        var c = null != a ? null != (b = a.nodeName) ? "function" === typeof b.toUpperCase ? b.toUpperCase() : void 0 : void 0 : void 0;
        "A" !== c && "AREA" !== c && (a = pb(a));
        return a
    }

    function Da(a) {
        var b;
        q.event && (a = q.event);
        var c = a.originalTarget || a.srcElement || a.target;
        var d = null != c ? c.nodeName.toUpperCase() : void 0;
        "A" !== d && "AREA" !== d && (c = wc(c));
        (d = !c || qb(c)) || (d = w(c, "rel"), d = !(ka ? ka === d : !d || !rb(d)));
        if (d) return !0;
        var e = A(c.href);
        d = Q(c.hostname);
        var f = "click" ===
            a.type || "contextmenu" === a.type;
        if (b = xc)
            if (b = c, null === b.offsetParent) b = !0;
            else {
                var g = q.getComputedStyle;
                b = x(g) ? "hidden" === g(b).visibility : !1
            }
        g = (g = c) && g.href ? /^https?:\/\//.test(g.href) || /^\/\//.test(g.href) : !1;
        if (g && Ea(c.href, d) && !b) {
            if (sb(d) || yc(d)) tb(c, a);
            else if (f && ub(e, d) && !vb(d)) return R && w(c, "target", R), zc(a);
            return !0
        }
    }

    function S(a) {
        var b = Ca(a);
        if (!b) return !0;
        var c = b;
        c && c.nodeName && "A" !== c.nodeName.toUpperCase() && "AREA" !== c.nodeName.toUpperCase() && (c = pb(c));
        if (c) {
            var d = Ac(c);
            var e = k.waypointDomain;
            if (!(d.length >= e.length && d.substr(0, e.length) === e)) {
                e = -1 !== d.indexOf(e) ? d : Bc(c, d);
                if (Cc) {
                    var f = m("pageTracker");
                    var g = "/skimout/" + d;
                    null != f && f._trackPageview ? f._trackPageview(g) : m("_gaq") ? (f = m("_gaq"), f.push(["_trackEvent", "skimout", "click", d])) : m("ga") && m("ga")("send", "event", "click", "skimout", d)
                }
                wb(c);
                xb(c, e)
            }
        }
        c = m("skimlinks_keywee_pixel", null);
        e = -1 < q.location.href.indexOf("utm_campaign=fbkw");
        c && e && Fa(c);
        m("vglnk") && I(b, "skimwords-link") && (a && a.stopPropagation ? a.stopPropagation() : (a = q.event, a.cancelBubble = !0));
        return !0
    }

    function pb(a) {
        for (; a.parentNode;) {
            a = a.parentNode;
            var b = a.nodeName.toUpperCase();
            if ("A" === b || "AREA" === b) return a
        }
        return null
    }

    function yb(a) {
        var b;
        var c = [];
        var d = 0;
        for (b = a.length; d < b; d++) {
            var e = a[d];
            null !== k.aff_domains[e] && void 0 !== k.aff_domains[e] || c.push(e)
        }
        return c.length ? Ga(c, "skimlinksApplyAuxHandlers") : !0
    }

    function Ga(a, b) {
        var c = {
            data: F({
                pubcode: B,
                domains: a,
                page: q.location.href
            })
        };
        Ha(c);
        Dc(a, b);
        return !0
    }

    function zb() {
        var a;
        var b = T();
        var c = [];
        var d = 0;
        for (a = b.length; d < a; d++) {
            var e =
                b[d];
            var f = Q(e.hostname);
            var g = A(e.href);
            e = w(e, "rel");
            !f || !Ea(g, f) || (ka ? ka !== e : e && rb(e)) || ba(f) || void 0 !== k.aff_domains[f] || (c.push(f), k.domain_data.domains.push(f), k.aff_domains[f] = null)
        }
        return c
    }

    function Ec(a) {
        return Ia(a, "beacon_callback_aux")
    }

    function Fc(a) {
        Ia(a, "beacon_callback_post_page_load");
        return Ab()
    }

    function Gc(a) {
        return Ia(a, "beacon_callback_pre_page_load")
    }

    function Ab(a) {
        var b, c;
        a || (a = 0);
        if (q.skimlinks_requests_in_flight && 5 > a) setTimeout(function() {
            return Ab(a + 1)
        }, 400 * a);
        else {
            var d = T();
            var e = b = 0;
            for (c = d.length; e < c; e++) {
                var f = d[e];
                var g = A(f.href);
                var p = Q(f.hostname);
                var r = w(f, "class");
                (!r || -1 === r.indexOf("skimwords-link") && -1 === r.indexOf("skimlinks-unlinked")) && Ea(g, p) && !Hc(f) && (sb(p) ? (b++, C(n.link_impressions, g) ? n.link_impressions[g].ae = 1 : n.link_impressions[g] = {
                    count: 0,
                    ae: 1
                }) : C(n.link_impressions, g) || (n.link_impressions[g] = {
                    count: 0,
                    ae: 0
                }), n.link_impressions[g].count++, f = Ic(g)) && (n.link_impressions[g].slmcid = f, 0 > Jc.call(n.campaign_ids, f) && n.campaign_ids.push(f))
            }
            k.handlers = b;
            k.links_tracked ||
                null == Bb || null == k.domain_data || null == k.domain_data.domains || (k.links_tracked = !0, Bb(k.domain_data.domains));
            ca("skimlinks")
        }
        return !0
    }

    function J(a, b, c) {
        for (null == c && (c = !1); null != a && a !== k.html_root;) {
            var d = I(a, b) || I(a, "noskim");
            if (a.className && d) return !0;
            a = c ? null : a.parentNode
        }
        return !1
    }

    function vb(a) {
        null !== k.exclude_lookup && null !== k.include_lookup || Cb();
        if (!a) return !1;
        var b = k.exclude_lookup;
        for (d in b)
            if (Db.call(b, d)) {
                var c = b[d];
                if (0 === d.indexOf("*")) {
                    var d = d.substr(1);
                    --c;
                    var e = a.lastIndexOf(d);
                    if (-1 !==
                        e && e === a.length - c) return !0
                } else if (a === d) return !0
            }
        return !1
    }

    function Hc(a) {
        var b = Kc.join(", ");
        if (!a && !b) return !1;
        var c = Boolean,
            d;
        if (d = b) a: if (x(window.Element.prototype.closest)) d = a.closest(b);
            else {
                for (; a && 1 === a.nodeType;) {
                    d = a;
                    var e = b,
                        f = window.Element.prototype;
                    f = f.matches || f.msMatchesSelector || f.mozMatchesSelector || f.webkitMatchesSelector;
                    if (x(f)) d = f.call(d, e);
                    else {
                        e = Eb(d.document || d.ownerDocument, e);
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
        return c(d)
    }

    function Ea(a,
        b) {
        return ub(a, b) && !vb(b) && Lc(b)
    }

    function sb(a) {
        return U ? (Fb(a) && (k.handlers += 1), !1) : Fb(a)
    }

    function qb(a) {
        for (var b, c, d, e, f; a && a !== k.html_root;) {
            d = a.id;
            c = 0;
            for (e = la.length; c < e; c++)
                if (b = la[c], I(a, b)) return !1;
            f = k.included_ids;
            c = 0;
            for (e = f.length; c < e; c++)
                if (b = f[c], d === b) return !1;
            e = k.excluded_classes;
            d = 0;
            for (c = e.length; d < c; d++)
                if (b = e[d], I(a, b)) return !0;
            a = a.parentNode
        }
        return la.length || k.included_ids.length ? !0 : !1
    }

    function T(a) {
        var b = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : u,
            c = null;
        a && (c =
            new RegExp("\\b" + Ja(a) + "\\b", "i"));
        var d = Ka(b.getElementsByTagName("a"));
        b = Ka(b.getElementsByTagName("area"));
        d = d.concat(b);
        return La(d, function(a, b) {
            b.href && (!c || b.className && c.test(b.className)) && a.push(b);
            return a
        }, [])
    }

    function ca(a) {
        var b;
        if (!Gb || Hb) return !1;
        n.tracking[a] = !1;
        a = !0;
        var c = n.tracking;
        for (b in c)
            if (Ib.call(c, b)) {
                var d = c[b];
                if (!0 === d) {
                    a = !1;
                    break
                }
            }
        if (a) return Hb = !0, Mc()
    }

    function Bb() {
        if (!Gb) return !1;
        var a = Jb(B, q, l, k, n);
        a = {
            data: F(a)
        };
        D && (a.dnt = D);
        G && (a.fdnt = 1);
        a = Ha(a);
        if (l.isAdblockUser ||
            // XXX !Kb("//t.skimresources.com/api/link", a, Lb)) return Nc()
            !Kb("//t.localtest.me:8000/api/link", a, Lb)) return Nc()
    }

    function Kb(a, b, c) {
        if ("msie" !== l.detect.browser) {
            var d = !1;
            var e = new XMLHttpRequest;
            e.open("POST", a, !0);
            e.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            0 <= Mb.call(e, "withCredentials") && (e.withCredentials = !0);
            e.async = "true";
            e.onreadystatechange = function() {
                if (d) return !0;
                if (4 === e.readyState) {
                    d = !0;
                    if (200 === e.status) {
                        var a = {};
                        var b = e.responseText;
                        if (0 === b.indexOf("//")) return c(a), !0;
                        try {
                            a = ma(e.responseText)
                        } catch (r) {}
                        c(a);
                        return !0
                    }
                    return !1
                }
            };
            e.send(b)
        } else if (q.XDomainRequest) {
            var f = new XDomainRequest;
            0 <= Mb.call(f, "withCredentials") && (f.withCredentials = !0);
            if (f) {
                f.open("POST", a, !0);
                f.onload = function() {
                    var a = {};
                    if (0 === f.responseText.indexOf("//")) return c(a), !0;
                    try {
                        a = ma(f.responseText)
                    } catch (p) {}
                    c(a);
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
                    f.send(b)
                } catch (g) {
                    return !1
                }
            }
        } else return !1;
        return !0
    }

    function Ha(a) {
        var b;
        var c = [];
        U && (a.xrf = 1);
        for (b in a) C(a, b) &&
            c.push("" + b + "=" + y(a[b]));
        return c.join("&")
    }

    function da(a, b, c, d, e) {
        var f;
        null == c && (c = {});
        var g = c.charset || null;
        var p = c.target || null;
        c = null != (f = c.async) ? f : !0;
        f = null != p && p.document ? p.document : document;
        var r = f.getElementsByTagName("head")[0];
        var h = f.createElement("script");
        h.type = "text/javascript";
        g && (h.charset = g);
        b && (h.onload = h.onreadystatechange = function(a) {
            return function() {
                var c = !1;
                return function() {
                    var d = a.readyState;
                    if (!(c || d && "complete" !== d && "loaded" !== d)) return h.onload = h.onreadystatechange =
                        null, c = !0, b.call(p), !0
                }
            }
        }(this)());
        h.onerror = function() {
            if (null != d) return null != e ? d(e) : d(!1)
        };
        h.async = !1 !== c;
        h.src = a;
        r.appendChild(h);
        return h
    }

    function ub(a, b) {
        var c = k.hostname;
        return /^\/\/|https?:\/\//i.test(a) && (!b || !c || -1 === b.indexOf(c)) && (!c || -1 === c.indexOf("." + b))
    }

    function Q(a) {
        return a.replace(/^www\./i, "")
    }

    function Nb(a, b) {
        var c = a();
        if (null != c) return function(a) {
            return a(c)
        };
        var d = null;
        Ob.once(b, function() {
            return "function" === typeof d ? d(a()) : void 0
        });
        return function(a) {
            return d = a
        }
    }

    function Oc() {
        for (var a =
                0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : [], b = arguments[1], c = arguments[2], d = 0; d < a.length; d++) {
            var e = Pb(a[d]);
            if (!na(e)) return x(c) ? c(e, b) : e
        }
        return b
    }

    function Pb(a, b, c) {
        return na(q[a]) ? b : x(c) ? c(q[a], b) : q[a]
    }

    function m(a, b, c) {
        return Ma(a) ? Oc(a, b, c) : Pb(a, b, c)
    }

    function na(a) {
        return "undefined" === typeof a || null === a
    }

    function Ma(a) {
        return Array.isArray ? Array.isArray(a) : "[object Array]" === Object.prototype.toString.call(a)
    }

    function x(a) {
        return "[object Function]" === Object.prototype.toString.call(a)
    }

    function Pc() {
        var a = arguments[1];
        return 0 === (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "").slice(2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 0).indexOf(a)
    }

    function oa(a) {
        var b = u.createElement("a");
        b.href = a;
        return Q(b.hostname)
    }

    function Qb(a) {
        // XXX return Rb ? Rb : "msie" === l.detect.browser && 8 >= l.detect.version || a ? "//go.redirectingat.com" : "//go.skimresources.com"
        return Rb ? Rb : "msie" === l.detect.browser && 8 >= l.detect.version || a ? "//go.redirectingat.com" : "//go.localtest.me:8000"
    }

    function ba(a) {
        // XXX return -1 !== k.waypointDomain.indexOf(a) || -1 !== a.indexOf("go.redirectingat.com") || -1 !== a.indexOf("go.skimresources.com")
        return -1 !== k.waypointDomain.indexOf(a) || -1 !== a.indexOf("go.redirectingat.com") || -1 !== a.indexOf("go.localtest.me:8000")
    }

    function C(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function ea(a) {
        return 10 > a ? "0" + a : "" + a
    }

    function Na() {
        return this.valueOf()
    }

    function Oa(a) {
        Pa.lastIndex = 0;
        return Pa.test(a) ? '"' + a.replace(Pa, function(a) {
            var b = Sb[a];
            return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function pa(a, b) {
        var c, d = void 0,
            e = E,
            f = b[a];
        f && "object" === typeof f && x(f.toJSON) && (f = f.toJSON(a));
        x(K) && (f = K.call(b, a, f));
        switch (typeof f) {
            case "string":
                return Oa(f);
            case "number":
                return isFinite(f) ?
                    String(f) : "null";
            case "boolean":
            case "null":
                return String(f);
            case "object":
                if (!f) return "null";
                E += qa;
                var g = [];
                if (Ma(f)) {
                    var p = f.length;
                    for (c = 0; c < p; c += 1) g[c] = pa(c, f) || "null";
                    var r = 0 === g.length ? "[]" : E ? "[\n" + E + g.join(",\n" + E) + "\n" + e + "]" : "[" + g.join(",") + "]";
                    E = e;
                    return r
                }
                if (K && "object" === typeof K)
                    for (p = K.length, c = 0; c < p; c += 1) "string" === typeof K[c] && (d = K[c], (r = pa(d, f)) && g.push(Oa(d) + (E ? ": " : ":") + r));
                else
                    for (d in f) C(f, d) && (r = pa(d, f)) && g.push(Oa(d) + (E ? ": " : ":") + r);
                r = 0 === g.length ? "{}" : E ? "{\n" + E + g.join(",\n" +
                    E) + "\n" + e + "}" : "{" + g.join(",") + "}";
                E = e;
                return r
        }
    }

    function F(a, b, c) {
        if (window.JSON && x(JSON.stringify)) return JSON.stringify.apply(null, arguments);
        var d;
        qa = E = "";
        if ("number" === typeof c)
            for (d = 0; d < c; d += 1) qa += " ";
        else "string" === typeof c && (qa = c);
        if ((K = b) && !x(b) && ("object" !== typeof b || "number" !== typeof b.length)) throw Error("JSON.stringify");
        return pa("", {
            "": a
        })
    }

    function ma(a, b) {
        function c(a, d) {
            var e = void 0,
                f = a[d];
            if (f && "object" === typeof f)
                for (e in f)
                    if (C(f, e)) {
                        var r = c(f, e);
                        void 0 !== r ? f[e] = r : delete f[e]
                    }
            return b.call(a,
                d, f)
        }
        if (window.JSON && x(JSON.parse)) return JSON.parse.apply(null, arguments);
        var d = void 0;
        a = String(a);
        Qa.lastIndex = 0;
        Qa.test(a) && (a = a.replace(Qa, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (Qc.test(a.replace(Rc, "@").replace(Sc, "]").replace(Tc, ""))) return d = (0, eval)("(" + a + ")"), x(b) ? c({
            "": d
        }, "") : d;
        throw new SyntaxError("JSON.parse");
    }

    function Uc(a) {
        a.width = 0;
        a.height = 0;
        a.style.display = "none"
    }

    function Tb() {
        return (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : u).getElementsByTagName("body")[0]
    }

    function Fa(a, b) {
        V || (V = u.createElement("iframe"), Tb().appendChild(V), Uc(V));
        var c = V.contentDocument || V.contentWindow.document,
            d = Tb(c);
        d || (d = u.createElement("body"), c.appendChild(d));
        c = c.createElement("img");
        c.src = a;
        c.width = 1;
        c.height = 1;
        b && x(b) && (c.onload = function() {
            b()
        });
        d.appendChild(c)
    }

    function Ub(a, b) {
        for (var c = 0; c < a.length; c++) b(a[c], c, a)
    }

    function A(a) {
        return na(a) ? "" : a.toString().replace(/^[\s\xA0]+|[\s\xA0]+$/g, "")
    }

    function w(a, b, c) {
        3 <= arguments.length && ("undefined" !== typeof a.setAttribute ?
            a.setAttribute(b, c) : a[b] = c);
        try {
            var d = a[b];
            d || (d = a.getAttribute(b));
            return d
        } catch (e) {
            return null
        }
    }

    function Jb(a, b, c, d, e) {
        return {
            dl: e.link_impressions,
            guid: c.cookie,
            hae: d.handlers ? 1 : 0,
            pag: b.location.href,
            pub: a,
            sessid: c.sessid,
            slmcid: e.campaign_ids,
            typ: "l",
            tz: c.timezone,
            uuid: c.uuid
        }
    }

    function La(a, b, c) {
        for (var d = 0, e = null === a ? 0 : a.length; d < e;) c = b(c, a[d], d, a), d += 1;
        return c
    }

    function Ka(a) {
        return La(a, function(a, c) {
            return a.concat(c)
        }, [])
    }

    function Vc(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ?
            arguments[2] : !1,
            d = document.createElement("div"),
            e = "qsa" + String(Math.random()).slice(3);
        d.innerHTML = "x<style>" + b + "{qsa:" + e + ";}";
        d = Vb.appendChild(d.lastChild);
        e = Wb(a, b, c, e);
        Vb.removeChild(d);
        return c ? e[0] : e
    }

    function Wb(a, b, c, d) {
        var e = /1|9/.test(a.nodeType),
            f = a.childNodes,
            g = [],
            p = 0;
        if (e && a.currentStyle && a.currentStyle.qsa === d && g.push(a) && c) return g;
        for (;
            (a = f[p]) && (g = g.concat(Wb(a, b, c, d)), p += 1, !c || !g.length););
        return g
    }

    function Eb(a, b) {
        1 === arguments.length && "string" === typeof a && (b = a, a = u);
        return x(a.querySelectorAll) ?
            Ka(a.querySelectorAll(b)) : Vc(a, b, !1)
    }

    function ra(a, b) {
        if (x(a.indexOf)) return a.indexOf(b);
        if (Ma(a))
            for (var c = 0; c < a.length; c++)
                if (a[c] === b) return c;
        return -1
    }

    function I(a, b) {
        return a && a.className && b ? 0 <= ra(A(a.className).split(/\s+/), b) : !1
    }

    function xb(a, b) {
        if (a) {
            var c = null,
                d = a.childNodes.length && 3 === a.childNodes[0].nodeType;
            "msie" === l.detect.browser && d && (c = a.innerHTML);
            a.href = b;
            c && c !== a.innerHTML && (a.innerHTML = c)
        }
    }

    function wb(a) {
        if (!a || !a.sl_href_restore_scheduled) {
            var b = a.href,
                c = "msie" === l.detect.browser &&
                7 > l.detect.version ? 1E4 : Wc;
            a.sl_href_restore_scheduled = !0;
            setTimeout(function() {
                a.href = b;
                delete a.sl_href_restore_scheduled
            }, c)
        }
    }

    function Xc(a, b, c) {
        var d = 0,
            e = a.length - 1,
            f = void 0,
            g = void 0;
        for ("function" !== typeof c && (c = function(a, b) {
                return a === b ? 0 : a > b ? 1 : -1
            }); d <= e;)
            if (f = Math.floor((e + d) / 2), g = c(b, a[f]), 0 < g) d = f + 1;
            else if (0 > g) e = f - 1;
        else return {
            found: !0,
            index: f
        };
        return {
            found: !1,
            index: d
        }
    }

    function Yc(a) {
        function b(a, b) {
            Math.abs(a.x - b.x) <= t && Math.abs(a.y - b.y) <= n && (q = !0);
            return a.y === b.y ? a.x - b.x : a.y - b.y
        }
        var c =
            1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [],
            d = arguments[2],
            e = void 0,
            f = e = void 0,
            g = void 0,
            p = f = void 0,
            r = void 0,
            l = void 0,
            m = void 0,
            k = f = f = e = void 0;
        g = Xb(a);
        var t = h.x_min_visual_distance,
            n = h.y_min_visual_distance,
            q = !1;
        if (!t && !n) return !0;
        t = t ? t : 0;
        n = n ? n : 4;
        f = {
            test: function(a) {
                return 0 < a && a < c.length
            },
            count: function(a) {
                return a - 1
            }
        };
        e = {
            test: function(a) {
                return a < c.length
            },
            count: function(a) {
                return a + 1
            }
        };
        f = [f, e];
        e = Yb(a);
        e = Yb(a);
        e = Xb(e);
        p = [g, e];
        for (var u = 0; u < p.length; u++) {
            r = p[u];
            if (q) break;
            l = Xc(c, r, b);
            for (var v = 0; v < f.length && (k = f[v], !q); v++)
                for (var w = k.count(l.index); k.test(w); w = k.count(w)) {
                    m = c[w];
                    if (!(Math.abs(r.y - m.y) <= n)) break;
                    if (Math.abs(r.x - m.x) <= t) {
                        q = !0;
                        break
                    }
                }
        }
        if (!d && q) return !q;
        f = g.y === e.y ? g.x - e.x : g.y - e.y;
        0 < f ? f = e : 0 > f ? (f = g, g = e) : (f = g, g = null);
        l.index === c.length ? (c.push(f), g && c.push(g)) : g ? c.splice(l.index, 0, f, g) : c.splice(l.index, 0, f);
        return d || !q
    }

    function Xb(a) {
        var b = 0,
            c = 0;
        if (a.offsetParent) {
            do b += a.offsetLeft, c += a.offsetTop; while (a = a.offsetParent)
        }
        return {
            x: b,
            y: c
        }
    }

    function Yb(a) {
        var b = u.createElement("span");
        b.style.position = "absolute";
        a.nextSibling ? a.parentNode.insertBefore(b, a.nextSibling) : a.parentNode.appendChild(b);
        return b
    }

    function sa(a) {
        if (na(a)) return [];
        var b = [],
            c;
        for (c in a) C(a, c) && b.push(c);
        return b
    }

    function Zb(a, b) {
        var c = parseInt(a.phrase.action_type()),
            d = parseInt(b.phrase.action_type()),
            e = parseFloat(a.phrase.group_priority()),
            f = parseFloat(b.phrase.group_priority()),
            g = d - c,
            p = f - e,
            h = b.phrase.text().length - a.phrase.text().length;
        return 8 == c || 8 == d ? g ? 8 == c ? -1 : 1 : h : p ? 0 < p ? 1 : -1 : isNaN(e) && isNaN(f) ? h : isNaN(e) ?
            1 : isNaN(f) ? -1 : 0
    }

    function Zc(a, b) {
        return {
            id: function() {
                return a.GroupId
            },
            group_priority: function() {
                return a.GroupPriority
            },
            products: function() {
                return a.Products
            },
            phrase: function() {
                return b
            }
        }
    }

    function $c(a, b) {
        return {
            id: function() {
                return a.Id
            },
            title: function() {
                return a.Title
            },
            price: function() {
                return a.Price
            },
            url: function() {
                return a.Url
            },
            merchant_id: function() {
                return parseInt(a.MerchantId)
            },
            set_first: function() {},
            country: function() {
                var b = L.country();
                b || (b = "US");
                return a.Country ? a.Country.toUpperCase() :
                    b
            },
            action_type: function() {
                return b.phrase().action_type()
            }
        }
    }

    function ad(a, b) {
        var c = void 0,
            d = void 0,
            e = void 0,
            f = void 0,
            g = e = void 0,
            p = void 0,
            r = void 0,
            l = [],
            m = !0;
        b.sort(function(a, b) {
            return b.group_priority() - a.group_priority()
        });
        g = b[0];
        d = a.multi() ? b.length : 1;
        for (c = 0; c < d; c++)
            for (e = b[c], p = e.products(), e = 0, f = p.length; e < f; e++) {
                r = $c(p[e], g);
                if (l.length === h.maxproducts) {
                    c = d;
                    break
                }
                r.price() && " " !== r.price() && (l.push(r), m && (r.set_first(), m = !1))
            }
        return [g, l]
    }

    function bd(a) {
        var b = void 0,
            c = void 0,
            d = void 0,
            e = void 0;
        b = [];
        var f = a.groups(),
            g = null;
        a.multi();
        d = void 0;
        if (f.length) {
            d = 0;
            for (e = f.length; d < e; d++) {
                var p = Zc(f[d], a);
                b.push(p)
            }
            d = ad(a, b);
            g = d[0];
            c = d[1];
            a.set_group(g);
            d = 0;
            for (e = c.length; d < e && (b = c[d], b.country(), !h.branded_merchant || b.merchant_id() !== h.branded_merchant); d++);
        } else return null;
        return {
            phrase: function() {
                return a
            },
            id: function() {
                return g.id()
            },
            product_id: function() {
                return c[0].id()
            }
        }
    }

    function cd(a, b) {
        return a.phrase.start_byte() - b.phrase.start_byte()
    }

    function $b(a, b) {
        var c = void 0;
        c = void 0;
        var d = 0,
            e = void 0,
            f = void 0,
            g = void 0,
            p = [],
            h = {};
        if (!b) return p;
        if (null != a && "-1" !== a) {
            c = W[a];
            if (!c) return p;
            g = c.search_objects;
            g.sort(cd);
            c = b.data;
            e = 0;
            for (f = g.length; e < f; e++) {
                var l = g[e],
                    m = l.phrase,
                    k = {
                        start: -1,
                        text: null
                    };
                if (0 < m.limit())
                    for (;;) {
                        var t = c.match(l.regex);
                        if (t && t.length) {
                            C(h, m.text()) ? h[m.text()]++ : h[m.text()] = 1;
                            t = t[1];
                            var n = c.indexOf(t) + d;
                            d += t.length;
                            var q = b.data.substr(n, m.text().length);
                            c = c.replace(t, "");
                            if (h[m.text()] == l.target_occurrence && A(q.toLowerCase()) == A(m.text().toLowerCase())) {
                                k.start =
                                    n;
                                k.text = t;
                                k.phrase = m;
                                k.target_occurrence = l.target_occurrence;
                                k.repl_regex = l.repl_regex;
                                k.replacement = l.replacement;
                                p.push(k);
                                break
                            } else if (A(q.toLowerCase()) != A(m.text().toLowerCase())) break
                        } else {
                            k.start = -1;
                            break
                        }
                    }
            }
            p.sort(function(a, b) {
                return a.start - b.start
            });
            return p
        }
    }

    function dd() {
        var a = 0,
            b = void 0,
            c = void 0,
            d = c = c = void 0,
            e = void 0,
            f = d = void 0;
        b = v.get_as_pair_array();
        b.sort(function(a, b) {
            return b[1].length - a[1].length
        });
        for (var g = 0, p = b.length; g < p; g++)
            if (d = b[g], c = d[0], d = d[1], !(d.meta && d.meta.ReadOnly ||
                    J(d, "noskimwords")) && (e = L.find_matches(c, d)) && e.length) {
                c = Aa(e, d, c);
                c = c[0];
                e = 0;
                for (var h = c.length; e < h; e++) f = c[e], d = f.match, f = f.node, (!L.maxkeywords() || a < L.maxkeywords()) && za(f, d) && a++
            }
    }

    function Ra(a, b) {
        var c = void 0,
            d = c = void 0,
            e = void 0;
        e = "";
        var f = c = void 0,
            g = void 0,
            p = void 0,
            r = void 0,
            m = d = g = void 0;
        h.original_request = a;
        h.send_in_progress = !0;
        c = v.get_non_colliding_nodes();
        f = {};
        for (d in c)
            if (C(c, d) && (g = c[d], p = g.nodeName === ta ? A(g.nodeValue) : null, m = g.meta || {}, p)) {
                if (g.parentNode) {
                    try {
                        r = g.parentNode.getBoundingClientRect()
                    } catch (ia) {
                        r = {
                            left: 0,
                            top: 0,
                            width: 100,
                            height: 100
                        }
                    }
                    g = {
                        Contents: p,
                        X: r.left,
                        Y: r.top,
                        W: r.width,
                        H: r.height,
                        ReadOnly: m.ReadOnly,
                        ElementTag: m.ElementTag
                    }
                } else g = {
                    Contents: p,
                    X: 0,
                    Y: 0,
                    W: 100,
                    H: 100,
                    ReadOnly: m.ReadOnly,
                    ElementTag: m.ElementTag
                };
                f[d] = g
            }
        c = F(f);
        h.lite ? e = "lite" : h.diy_filter ? e = "diy" : h.whitelist_filter && (e = "whitelist");
        b && (h.force_tree = "http://lb-swq-9038638.us-east-1.elb.amazonaws.com:8080/query/");
        f = {
            instant: "1",
            pubcode: B,
            page: l.pageLocation,
            pref: l.referrer
        };
        h.force_country && (f.force_country = h.force_country);
        h.force_tree &&
            (f.force_tree = h.force_tree);
        h.merchant_excludes && (f.merchant_excludes = h.merchant_excludes);
        h.diy && (f.diy = "1");
        c = {
            data: F(f),
            content: c,
            dnt: D,
            fdnt: G ? "1" : "",
            version: "10",
            js: 1
        };
        h.force_domain_check && (c.force_domain_check = 1);
        h.debug && (c.debug = h.debug);
        e && (c.filter = e);
        e = [];
        for (d in c) C(c, d) && e.push("" + d + "=" + y(c[d]));
        d = e.join("&");
        if ("msie" === l.detect.browser && 9 >= l.detect.version) {
            var k = new q.XDomainRequest;
            "withCredentials" in k && (k.withCredentials = !0);
            if (k) {
                // XXX k.open("POST", "//i.skimresources.com/api/", !0);
                k.open("POST", "//i.localtest.me:8000/api/", !0);
                k.onload = function() {
                    try {
                        X(ma(k.responseText))
                    } catch (ia) {}
                };
                k.onerror = function() {};
                k.onprogress = function() {};
                k.ontimeout = function() {};
                k.async = !0;
                try {
                    k.send(d)
                } catch (ia) {}
            }
        } else {
            var n = !1,
                t = void 0;
            t = new XMLHttpRequest;
            // XXX t.open("POST", "//i.skimresources.com/api/", !0);
            t.open("POST", "//i.localtest.me:8000/api/", !0);
            t.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            "withCredentials" in t && (t.withCredentials = !0);
            t.async = "true";
            t.onreadystatechange = function() {
                if (!n && 4 === t.readyState && (n = !0, 200 === t.status)) try {
                    X(ma(t.responseText))
                } catch (ia) {}
            };
            try {
                t.send(d)
            } catch (ia) {}
        }
    }

    function Sa(a) {
        var b = "",
            c = 0;
        var d = a.nodeType;
        if (!d)
            for (; d = a[c++];) b += Sa(d);
        else if (1 === d || 9 === d || 11 === d) {
            if ("string" === typeof a.textContent) return a.textContent;
            for (a = a.firstChild; a; a = a.nextSibling) b += Sa(a)
        } else if (3 === d || 4 === d) return a.nodeValue;
        return b
    }

    function ed(a, b) {
        var c = [];
        for (a = a.parentNode; a;)("undefined" === typeof b || x(b) && !0 === b(a)) && c.push(a), a = a.parentNode;
        return c.reverse()
    }

    function Ta(a) {
        return La(a, function(a, c) {
            return -1 !== ra(a, c) ? a : a.concat(c)
        }, [])
    }

    function ac(a) {
        "" ===
        l.cookie && a.guid && (l.cookie = a.guid);
        "" === l.sessid && a.sessid && (l.sessid = a.sessid);
        if (2 !== a.nc) {
            h.settings || (h.settings = a);
            if (a.includes) {
                var b = Ta(a.includes),
                    c = Ta(a.excludes),
                    d = Ta(a.read_onlys);
                v.traverse(b, c, d)
            } else v.traverse(["body"], [], []);
            1 === a.nc ? Ra(a) : X(a);
            z.publish("instant_api_callback_settings")
        }
    }

    function fd(a) {
        if (a.length) {
            var b = void 0,
                c = void 0,
                d = [],
                e = 0,
                f = L.maxkeywords() || 0,
                g = "msie" === l.detect.browser && 9 > l.detect.version;
            g && (b = Sa(u.body).length, 3E4 < b ? f = Math.ceil(b / 1E4) : g = !1);
            b = 0;
            for (c = a.length; b <
                c; b++) {
                var p = a[b],
                    r = p.node;
                p = p.match;
                var m = p.phrase.group_priority() ? parseFloat(p.phrase.group_priority()) : 0,
                    k = !1;
                if ("1" === p.phrase.action_type() || "2" === p.phrase.action_type() || h.prio_threshold && m > h.prio_threshold) k = !0;
                g && (k = !0);
                "17075X740592" === B && ed(r, function(a) {
                    return I(a, "atma-norules")
                }).length && (k = !0);
                if (!J(r, "noskimwords") && 0 !== p.phrase.limit() && Yc(r, d, k) && (e++, za(r, p), f && e >= f)) break
            }
        }
    }

    function X(a) {
        h.data = a;
        h.settings || (h.settings = a);
        if (h.data) {
            "" == l.cookie && h.data.guid && (l.cookie = h.data.guid);
            "" == l.sessid && h.data.sessid && (l.sessid = h.data.sessid);
            if (h.data.meta && 1 == h.data.meta.queued && 5 > h.request_counter) return h.request_counter += 1, setTimeout(function() {
                Ra(h.original_request)
            }, 2E3 * h.request_counter), !1;
            v.is_traversed() || v.traverse(h.data.includes, h.data.excludes, h.data.read_onlys);
            L.store(a);
            if (v.length() && L.num_nodes()) {
                a = h.noVisual ? 0 : 1;
                if ("mozilla" === l.detect.browser) {
                    var b = /Firefox\/(\d.\d)/.exec(navigator.userAgent);
                    b && 2 <= b.length && 3.7 >= parseFloat(b[1]) && (a = 0)
                } else "msie" === l.detect.browser &&
                    8 > l.detect.version && (a = 0);
                if (a) {
                    a = L.spanify_all();
                    var c = b = void 0;
                    b = 0;
                    for (c = a.length; b < c; b++) a[b].orig_i = b;
                    a.sort(function(a, b) {
                        var c = Zb(a.match, b.match);
                        return c ? c : a.orig_i - b.orig_i
                    });
                    fd(a)
                } else dd();
                a = T("skimwords-link");
                if ("msie" === l.detect.browser && 9 > l.detect.version) {
                    var d = c = b = void 0,
                        e = void 0,
                        f = /^\s/;
                    b = 0;
                    for (c = a.length; b < c; b++) e = a[b], (d = e.previousSibling) && d.nodeValue && d.nodeValue.length && f.test(d.nodeValue[d.nodeValue.length - 1]) && (d.nodeValue += " "), (d = e.nextSibling) && d.nodeValue && d.nodeValue.length &&
                        f.test(d.nodeValue[0]) && (d.nodeValue = " " + d.nodeValue)
                }
                setTimeout(function() {
                    for (var a = T("skimwords-link"), b, c = 0, d = a.length; c < d; c++) {
                        var e = b = a[c];
                        M(e, "click", S);
                        M(e, "contextmenu", S);
                        h.handler_attached_hook && h.handler_attached_hook(b)
                    }
                    if ("17075X740592" === B)
                        for (a = Eb(".atma-norules a.skimwords-link"), b = 0, c = a.length; b < c; b++) a[b].style.color = "#C9C7C7 !important", a[b].style.fontStyle = "normal !important"
                }, 10)
            }
        }
        ca("skimwords");
        gd && (h.send_in_progress = !1, vc())
    }

    function bc(a) {
        var b = void 0;
        b = void 0;
        var c = "";
        if (h.settings) return "instantDataCallback" === a ? ac(h.settings) : "skimwordsDataCallback" === a && X(h.settings), !0;
        if (cc) return setTimeout(function() {
            bc(a)
        }, 1E3), !0;
        cc = !0;
        h.lite ? c = "&filter=lite" : h.standard ? c = "&filter=standard" : h.diy_filter ? c = "&filter=diy" : h.whitelist_filter && (c = "&filter=whitelist");
        c += "&version=10&js=1";
        b = encodeURIComponent('{"instant":"1","page":"' + l.pageLocation + '","pref":"' + l.referrer + '","pubcode":"' + B + '"' + (h.force_country ? ',"force_country":"' + h.force_country + '"' : "") + (h.force_tree ? ',"force_tree":"' +
            h.force_tree + '"' : "") + "}");
        // XXX b = "//i.skimresources.com/api/?callback=" + a + "&data=" + b + (h.debug ? "&debug=" + h.debug : "") + (D ? "&dnt=1" : "") + (G ? "&fdnt=1" : "") + c;
        b = "//i.skimresources.com/api/?callback=" + a + "&data=" + b + (h.debug ? "&debug=" + h.debug : "") + (D ? "&dnt=1" : "") + (G ? "&fdnt=1" : "") + c;
        da(b, !1, {}, X, !1)
    }

    function hd() {
        "msie" === l.detect.browser && 8 > l.detect.version ? h.disabled = !0 : bc("instantDataCallback")
    }

    function Ua(a) {
        return String(a).replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
    }

    function id(a) {
        h.settings = a;
        2 === a.nc ? H.disabled || yb(k.domain_data.domains) : H.disabled || (a.includes ? (N && N.length && (a.excludes =
            a.excludes.concat(N)), v.traverse(a.includes, a.excludes, a.read_onlys)) : N && N.length ? v.traverse(["body"], N, []) : v.traverse(["body"], [], []));
        dc()
    }

    function dc() {
        a: {
            var a = u.getElementsByTagName("body");
            if (a.length) {
                a = a[0].textContent || a[0].innerText;
                var b;
                if (b = a) a = /$|\b(?:https?:\/\/)?(?:[-_a-zA-Z]+\.)*(?:[-_a-zA-Z]{2,}\.[-_\w]{2,5}\b)[^\[\]\s]*\b|$/ig.exec(a), b = a.length && "" !== a[0] ? !0 : !1;
                if (b) {
                    a = !0;
                    break a
                }
            }
            a = !1
        }
        a ? (h.disabled && v.traverse([], N, []), ec()) : ca("unlinked")
    }

    function ec() {
        var a;
        var b = v.get_as_hash_node_dict();
        var c = {};
        for (g in b) {
            var d = b[g];
            if (d.parentNode && !(qb(d) || J(d, "noskimwords") || J(d, "noskimlinks") || J(d, "noskimw") || d.meta && d.meta.ReadOnly)) {
                d = jd(d, g);
                var e = d[0];
                var f = 0;
                for (a = e.length; f < a; f++) d = e[f], !c[d] && kd(d) && (c[d] = !0, k.domain_data.domains.push(d))
            }
        }
        var g = sa(c);
        g.length ? yb(g) : ca("unlinked")
    }

    function ld() {
        sa(k.aff_domains).length && (Ub(H.url_spans, function(a) {
            k.aff_domains[a.match.domain] && za(a.node, a.match, !0)
        }), setTimeout(function() {
            var a;
            var b = T("skimlinks-unlinked");
            var c = [];
            var d = 0;
            for (a = b.length; d <
                a; d++) {
                var e = b[d];
                c.push(md(e))
            }
            return c
        }, 10));
        ca("unlinked")
    }

    function fc(a, b) {
        Y || 1E3 < b ? x(a) && (Y ? Va ? a(!0) : a(!1) : a(!1)) : setTimeout(fc, b *= 2, a, b)
    }

    function gc() {
        Y || (fa.complete && ha.complete && (Y = !0), Y && "0" != fa.width && "0" == ha.width && (Va = !0))
    }

    function nd(a) {
        for (var b = 0; b < hc.length; b++) {
            var c = hc[b];
            if (-1 !== a.toLowerCase().indexOf(c.toLowerCase())) return !0
        }
        return !1
    }
    var ic = window.skimlinks_context_window || null,
        q = ic ? window[ic] : window,
        u = q.document,
        Ob, od = [].indexOf || function(a) {
            for (var b =
                    0, c = this.length; b < c; b++)
                if (b in this && this[b] === a) return b;
            return -1
        },
        z = Ob = {
            topics: {},
            on: function(a, b) {
                var c;
                null == (c = this.topics)[a] && (c[a] = []);
                return this.topics[a].push(b)
            },
            off: function(a, b) {
                var c = 0 <= od.call(this.topics[a], b);
                if (-1 < c) return this.topics[a].splice(c, 1)
            },
            once: function(a, b) {
                var c = function(a) {
                    return function() {
                        c.called || b.apply(a, arguments);
                        return c.called = !0
                    }
                }(this);
                c.called = !1;
                return this.on(a, c)
            },
            publish: function(a, b) {
                var c;
                var d = {
                    topic: a,
                    extra: b
                };
                if (this.topics[a]) {
                    var e = this.topics[a];
                    var f = [];
                    var g = 0;
                    for (c = e.length; g < c; g++) {
                        var p = e[g];
                        f.push("function" === typeof p ? p(d) : void 0)
                    }
                    return f
                }
            }
        },
        pd = "*.g.doubleclick.net *mjxads.internet.com *pgpartner.co.uk *pgpartner.com *pricegrabber.co.uk *pricegrabber.com *overture.com *youtube.com paid.outbrain.com trc.taboola.com traffic.outbrain.com zergnet.com *.criteo.com".split(" "),
        Wa = /https?:/g,
        ta = u.createTextNode("").nodeName,
        qd = ["noskim", "norewrite"],
        Xa = {
            "t.umblr.com": {
                name: "z"
            }
        },
        B = "78380X1529106",
        jc = "1529106",
        rd =
        m("noskimkinks", !1) || m("noskim", !1),
        sd = m("noskimwords", !1) || m("noskim", !1),
        td = m("nounlinked", !1) || m("noskim", !1),
        D = m("skimlinks_dnt", 0, function(a) {
            return a && "0" !== a && "false" !== a ? 1 : 0
        }),
        G = m("skimlinks_nocookie", !1),
        la = m("skimlinks_included_classes", []),
        ud = m("skimlinks_excluded_classes", []),
        vd = m("skimlinks_exclude", []),
        wd = m("skimlinks_include", []),
        xd = m("skimlinks_included_ids", []),
        kc = m("skimlinks_exrel", ""),
        ka = m("skimlinks_byrel", !1),
        xc = m("skimlinks_ignore_hidden_links", false),
        Kc = m("skimlinks_link_impression_exclude_selector", []),
        yd = m("skimlinks_add_nofollow", false),
        zd = m("skimlinks_before_click_handler", false, function(a, b) {
            return "boolean" !==
                typeof a ? b : a
        }),
        Ad = m("skimlinks_first_party_na", !1),
        Bd = m("skimlinks_cookie_sync_optout", false),
        Gb = !m("noimpressions", !1),
        Wc = m("skimlinks_replace_timeout", 300, function(a, b) {
            var c = parseFloat(a);
            return isNaN(c) ? b : c
        }),
        Cd = m("skimlinks_affiliate_unknown_links", true),
        R = m("skimlinks_target", null),
        gd = m("skimlinks_ajax_rerun", false),
        ua = m("sl_test", !1),
        N = [],
        U = m("skimlinks_revenue_forecast", false),
        Dd = m("skimlinks_noright", false),
        Ed = m("skimlinks_url_extraction_rules", !1) || false,
        lc = m("skimlinks_extra_redir_params", []).join("&"),
        Ya = m(["affiliate_tracking", "skimlinks_tracking"], !1, function(a, b) {
            var c = /^[a-z0-9_\\|]+$/i;
            return a && c.test(a) ? a : b
        }),
        Za = m("force_location"),
        O = m(["skimlinks_site", "skimlinks_sitename"], !1),
        mc = m("skimlinks_domain",
            ""),
        Rb = mc ? "http://" + mc : "",
        Cc = m("skimlinks_google", false),
        hc = m("noskim_domains", []),
        Fd = m("skimwords_horizontal_distance", 80),
        Gd = m("skimwords_vertical_distance", 80),
        Hd = m("skimlinks_profiling", false),
        lb = m("skimwords_color", null),
        mb = m("skimwords_weight", null),
        ja = m("skimwords_decoration",
            null),
        nb = m("skimwords_style", null),
        ob = m("skimwords_title", null),
        l = function() {
            var a = u.referrer || document.referrer || "",
                b = Za || q.location.href;
            var c = "aspsession-id aspsessionid cftoken j-sessionid jsessid jsession_id jsessionid phpsessid phpsession-id phpsessionid seskey sessid session-id session-key session_id sessionid sessionkey uniqueid utm_campaign utm_medium utm_source utm_term".split(" ");
            for (var d = 0; d < c.length; d++) {
                var e =
                    c[d];
                var f = b.split("?");
                if (2 <= f.length) {
                    b = f.shift();
                    f = f.join("?");
                    e = encodeURIComponent(e) + "=";
                    f = f.split(/[&;]/gi);
                    for (var g = f.length - 1; 0 <= g; g--) Pc(f[g], e) && f.splice(g, 1);
                    b = b + "?" + f.join("&")
                }
            }
            "?" === b[b.length - 1] && (b = b.substr(0, b.length - 1));
            c = b;
            d = navigator.userAgent.toLowerCase();
            d = /(webkit)[ /]([\w.]+)/.exec(d) || /(opera)(?:.*version)?[ /]([\w.]+)/.exec(d) || /(msie) ([\w.]+)/.exec(d) || 0 > d.indexOf("compatible") && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(d) || [];
            d = {
                browser: d[1] || "",
                version: parseFloat(d[2]) ||
                    0
            };
            b = (new Date).getTimezoneOffset();
            e = "";
            for (f = 0; 8 > f; f++) e += Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
            return {
                cookie: "",
                detect: d,
                isAdblockUser: !1,
                pageLocation: c,
                referrer: a,
                sessid: "",
                timezone: b,
                uuid: e
            }
        }(),
        n = {
            campaign_ids: [],
            impressions: {
                pag: "",
                phr: [],
                unl: [],
                pub: B,
                slc: 0,
                swc: 0,
                ulc: 0,
                jsl: 0,
                jsf: "",
                guid: "",
                uuid: "",
                sessid: "",
                uc: Ya,
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
                b = Za ? oa(Za) : q.location.hostname;
            return {
                aff_domains: {},
                beacon: [],
                callback_name: "skimlinksApplyHandlers",
                disabled: rd,
                domain_data: {
                    domains: []
                },
                exclude: vd,
                exclude_lookup: null,
                excluded_classes: ["noskimlinks", "noskim"].concat(ud),
                handlers: 0,
                has_been_called: !1,
                hostname: b,
                html_root: a,
                include: wd,
                include_lookup: null,
                included_classes: la,
                included_ids: xd,
                links: [],
                links_tracked: !1,
                target: null,
                waypointDomain: Qb()
            }
        }(),
        h = {
            branded_merchant: !1,
            branded_merchant_url: !1,
            country: "",
            data: void 0,
            debug: 0,
            disabled: sd,
            diy: !1,
            diy_filter: !1,
            force_country: !1,
            force_domain_check: !1,
            force_tree: !1,
            handler_attached_hook: !1,
            handlers: 0,
            hover_name: "dark",
            link_all: !1,
            lite: !1,
            maxproducts: 3,
            merchant_excludes: !1,
            merchant_includes: !1,
            no_limit: !1,
            noVisual: !1,
            original_request: void 0,
            post_init_hook: !1,
            prio_threshold: 0,
            request_counter: 0,
            settings: null,
            send_in_progress: !1,
            standard: !1,
            this_page: q.location.href,
            whitelist_filter: !1,
            x_min_visual_distance: 80,
            y_min_visual_distance: 80
        },
        H = {
            creative: "500005",
            disabled: td,
            url_spans: []
        },
        Qc = /^[\],:{}\s]*$/,
        Rc = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        Sc = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        Tc = /(?:^|:|,)(?:\s*\[)+/g,
        Pa = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        Qa = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    x(Date.prototype.toJSON) || (Date.prototype.toJSON =
        function() {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + ea(this.getUTCMonth() + 1) + "-" + ea(this.getUTCDate()) + "T" + ea(this.getUTCHours()) + ":" + ea(this.getUTCMinutes()) + ":" + ea(this.getUTCSeconds()) + "Z" : null
        });
    x(Boolean.prototype.toJSON) || (Boolean.prototype.toJSON = Na);
    x(Number.prototype.toJSON) || (Number.prototype.toJSON = Na);
    x(String.prototype.toJSON) || (String.prototype.toJSON = Na);
    var E = void 0,
        qa = void 0,
        Sb = void 0,
        K = void 0;
    Sb = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    };
    var Mb = [].indexOf || function(a) {
            for (var b = 0, c = this.length; b < c; b++)
                if (b in this && this[b] === a) return b;
            return -1
        },
        y = function() {
            var a;
            var b = [function() {
                var b;
                var d = [
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
                for (b = d.length; f < b; f++) a = d[f], e.push([new RegExp(a[0], "g"), a[1]]);
                return e
            }()];
            return function(c) {
                var d;
                var e = encodeURIComponent(c);
                c = 0;
                for (d = b.length; c < d; c++) a = b[c], e = e.replace(a[0], a[1]);
                return e
            }
        }(),
        V = void 0,
        Ib = {}.hasOwnProperty;
    var Hb = !1;
    var Z = 0;
    var Nc = function() {
        var a;
        var b = 8E3;
        "msie" === l.detect.browser && (b = 2E3);
        var c = Jb(B, q, l, k, n);
        c.dl = {};
        // XXX var d = "//t.skimresources.com/api/link?data=";
        var d = "//t.localtest.me:8000/api/link?data=";
        var e = 0;
        var f = n.link_impressions;
        for (a in f)
            if (Ib.call(f, a)) {
                var g = f[a];
                e++;
                c.dl[a] = g;
                g = d + y(F(c));
                g.length > b && (e--, delete c.dl[a])
            }
        e && (d += y(F(c)), da(d, !1, {
            async: !0
        }));
        return !0
    };
    var Lb = function() {
        return !0
    };
    var va = function(a) {
        var b, c;
        if (a instanceof Array) {
            var d = {};
            var e = b = 0;
            for (c = a.length; b < c; e = ++b) {
                var f = a[e];
                d["" + e] = f
            }
            return d
        }
        return a
    };
    var Id =
        function() {
            var a, b, c;
            var d = (new Date).getTime() - n.loading_started;
            var e = 8E3;
            "msie" === l.detect.browser && (e = 2E3);
            n.impressions.tz = l.timezone;
            n.impressions.slc = k.handlers;
            n.impressions.swc = null != (a = h.handlers) ? a : 0;
            n.impressions.ulc = null != Z ? Z : 0;
            n.impressions.jsl = d;
            n.impressions.guid = l.cookie;
            n.impressions.slmcid = n.campaign_ids;
            n.impressions.uuid = l.uuid;
            n.impressions.sessid = l.sessid;
            n.impressions.pref = l.referrer;
            n.impressions.phr = [];
            n.impressions.unl = [];
            U && (n.impressions.xrf = 1);
            // XXX d = "//t.skimresources.com/api/track.php?";
            d = "//t.localtest.me:8000/api/track.php?";
            D && (d += "dnt=1&");
            G && (d += "fdnt=1&");
            l.isAdblockUser && (d += "abp=1&");
            d += "data=";
            var f = n.phrase_impressions;
            a = b = 0;
            for (c = f.length; b < c; a = ++b) a = f[a], n.impressions.phr.push(a), a = d + y(F(n.impressions).replace(Wa, "")), a.length > e && (n.impressions.phr = n.impressions.phr.slice(0, -1));
            f = n.unlinked_impressions;
            a = b = 0;
            for (c = f.length; b < c; a = ++b) a = f[a], n.impressions.unl.push(a), a = d + y(F(n.impressions).replace(Wa, "")), a.length > e && (n.impressions.unl = n.impressions.unl.slice(0, -1));
            n.impressions.phr = va(n.impressions.phr);
            n.impressions.unl =
                va(n.impressions.unl);
            e = d + y(F(n.impressions).replace(Wa, ""));
            return da(e, !1, {
                async: !0
            })
        };
    var Mc = function() {
        var a;
        var b = (new Date).getTime() - n.loading_started;
        n.impressions.tz = l.timezone;
        n.impressions.slc = k.handlers;
        n.impressions.swc = null != (a = h.handlers) ? a : 0;
        n.impressions.ulc = null != Z ? Z : 0;
        n.impressions.jsl = b;
        n.impressions.guid = l.cookie;
        n.impressions.slmcid = n.campaign_ids;
        n.impressions.uuid = l.uuid;
        n.impressions.sessid = l.sessid;
        n.impressions.pref = l.referrer;
        n.impressions.pag = l.pageLocation;
        n.impressions.phr =
            va(n.phrase_impressions);
        n.impressions.unl = va(n.unlinked_impressions);
        b = {
            data: F(n.impressions)
        };
        D && (b.dnt = D);
        G && (b.fdnt = 1);
        b = Ha(b);
        // XXX !l.isAdblockUser && Kb("//t.skimresources.com/api/track.php", b, Lb) || Id();
        !l.isAdblockUser && Kb("//t.localtest.me:8000/api/track.php", b, Lb) || Id();
        return !0
    };
    z.on("skim_js_init", function() {
        k.disabled && (n.tracking.skimlinks = !1);
        h.disabled && (n.tracking.skimwords = !1);
        if (H.disabled) return n.tracking.unlinked = !1
    });
    var Ja = function() {
            var a = /[-[\]{}()*+?.,\\^$|#]/g,
                b = /\s+/g;
            return function(c) {
                return c.replace(a, "\\$&").replace(b, "\\s+")
            }
        }(),
        Vb = u.getElementsByTagName("head")[0],
        Db = {}.hasOwnProperty,
        Jd = [].indexOf || function(a) {
            for (var b = 0, c = this.length; b < c; b++)
                if (b in this && this[b] === a) return b;
            return -1
        };
    var Cb = function() {
        var a;
        k.exclude_lookup = {};
        k.include_lookup = {};
        O && k.exclude.push(O);
        var b = k.exclude.concat(pd);
        var c = 0;
        for (a = b.length; c < a; c++) {
            var d = b[c];
            k.exclude_lookup[d] = d.length
        }
        b = k.include;
        c = 0;
        for (a = b.length; c < a; c++) d = b[c], k.include_lookup[d] = d.length;
        return k.exclude_lookup
    };
    var Lc = function(a) {
        null !== k.exclude_lookup && null !== k.include_lookup || Cb();
        if (!a) return !1;
        if (0 ===
            k.include.length) return !0;
        var b = k.include_lookup;
        for (e in b)
            if (Db.call(b, e)) {
                var c = "*" === e.substr(0, 1);
                var d = "*" === e.substr(e.length - 1, 1);
                var e = e.replace(/\*/g, "");
                if (c && d) {
                    if (-1 !== a.indexOf(e)) return !0
                } else if (c) {
                    if (-1 !== a.indexOf(e) && a.indexOf(e) === a.length - e.length) return !0
                } else if (d) {
                    if (0 === a.indexOf(e)) return !0
                } else if (a === e) return !0
            }
        return !1
    };
    var Fb = function(a) {
        return !0 === k.aff_domains[a] || (null === k.aff_domains[a] || void 0 === k.aff_domains[a]) && Cd && !ba(a)
    };
    var rb = function(a) {
        var b;
        if (!a) return !1;
        var c = a.toLowerCase().split(/\s+/);
        a = kc ? [kc.toLowerCase()] : [];
        a = a.concat(qd);
        var d = 0;
        for (b = c.length; d < b; d++) {
            var e = c[d];
            if (0 <= Jd.call(a, e)) return !0
        }
        return !1
    };
    var Jc = [].indexOf || function(a) {
        for (var b = 0, c = this.length; b < c; b++)
            if (b in this && this[b] === a) return b;
        return -1
    };
    var Ic = function(a) {
        return -1 === a.indexOf("#slm-") || (a = a.split("#slm-"), 2 !== a.length || isNaN(a[1]) || 10 * parseInt(a[1]) !== 10 * a[1]) ? null : parseInt(a[1])
    };
    var Ia = function(a, b) {
        var c;
        --q.skimlinks_requests_in_flight;
        var d = null != a ? a : {};
        a && (k.beacon.push(d),
            z.publish("beacon", d));
        k.waypointDomain = Qb(d.guid);
        d.country && (h.country = d.country);
        d.guid && "" === l.cookie && (l.cookie = d.guid);
        d.sessid && "" === l.sessid && (l.sessid = d.sessid);
        var e = d.merchant_domains || [];
        var f = 0;
        for (c = e.length; f < c; f++) {
            var g = e[f];
            ba(g) || (k.aff_domains[g] = !0)
        }
        for (g in k.aff_domains) null === k.aff_domains[g] && (k.aff_domains[g] = !1);
        Hd && (g = l.cookie, jc && g && da("http://odpp.skimapis.com/" + jc + "/profile/" + g + "?callback=skimlinksODPCallback", !1, {}));
        if (yd)
            for (e = T(), g = 0, f = e.length; g < f; g++) c = e[g], Kd(c);
        return z.publish(b, d)
    };
    var Kd = function(a) {
        var b = w(a, "rel");
        var c = Q(a.hostname);
        if (!b && c && !0 === k.aff_domains[c]) return w(a, "rel", "nofollow")
    };
    q.skimlinksODPCallback = function(a) {
        var b = a.status;
        a = a.actions;
        a = void 0 === a ? [] : a;
        b && "OK" === b && Ub(a, function(a) {
            var b = a.url;
            "pixel" === a.action && Fa(b)
        })
    };
    var Dc = function(a, b) {
        var c, d;
        null == b && (b = k.callback_name);
        q.skimlinks_requests_in_flight = (null != (c = q.skimlinks_requests_in_flight) ? c : 0) + 1;
        if (null == a || !a.length) return q[b](), !1;
        c = y('{"pubcode":"' + B + '","domains":_DOMAIN_LIST_,"page":"' +
            q.location.href + '"}');
        // XXX var e = "//r.skimresources.com/api/?callback=" + b + (D ? "&dnt=1" : "") + (G ? "&fdnt=1" : "") + "&data=" + c;
        var e = "//r.localtest.me:8000/api/?callback=" + b + (D ? "&dnt=1" : "") + (G ? "&fdnt=1" : "") + "&data=" + c;
        c = "msie" === l.detect.browser ? 2E3 : 8E3;
        var f = [];
        var g = 0;
        for (d = a.length; g < d; g++) {
            var p = a[g];
            f.push(p);
            e.replace("_DOMAIN_LIST_", y(F(f))).length > c && (f = f.slice(0, -1))
        }
        e = e.replace("_DOMAIN_LIST_", y(F(f)));
        return da(e, !1, {})
    };
    var M = function() {
        return u.addEventListener ? function(a, b, c) {
            var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : !1;
            if (a && (a.nodeName || a === q)) return a.addEventListener(b,
                c, d)
        } : function(a, b, c) {
            if (a && (a.nodeName || a === q)) return a.attachEvent("on" + b, function() {
                return 7 > l.detect.version && !q.event ? (setTimeout(function() {
                    return c.call(a, q.event)
                }, 100), !0) : c.call(a, q.event)
            })
        }
    }();
    var Ac = function(a) {
        var b;
        if (Ed) {
            var c = Q(a.hostname);
            if (c in Xa) return c = "[&?]" + Xa[c].name + "=(http[^&]+)", c = new RegExp(c), decodeURIComponent(null != (b = a.href) ? b.match(c).pop() : void 0) || a.href
        }
        return a.href
    };
    var Bc = function(a, b) {
        var c = l.referrer ? "&pref=" + y(l.referrer) : "";
        var d = !1;
        if (0 < b.indexOf("#slm-")) {
            var e =
                b.split("#slm-");
            2 !== e.length || isNaN(e[1]) || 10 * parseInt(e[1]) !== 10 * e[1] || (b = e[0], d = e[1])
        }
        var f = w(a, "data-skimlinks-tracking") || Ya;
        var g = w(a, "data-skimlinks-editor") && 1 === parseInt(w(a, "data-skimlinks-editor")) ? 1 : 0;
        if (I(a, "skimwords-link")) {
            var p = w(a, "data-skimwords-word");
            e = w(a, "data-skim-creative");
            var h = w(a, "data-skim-product");
            var m = k.waypointDomain;
            b = m + "/?id=" + B + (f ? "&xcust=" + f : "") + (!1 !== d ? "&xs=9" : "&xs=2") + "&url=" + y(b) + "&xguid=" + l.cookie + "&xuuid=" + l.uuid + "&xsessid=" + l.sessid + "&isjs=1&xword=" + (p ?
                p : "") + "&xcreo=" + (e ? e : "") + "&xpid=" + (h ? h : "") + "&xed=" + g + "&sref=" + y(q.location) + c + (D ? "&dnt=1" : "") + (G ? "&fdnt=1" : "") + (!1 !== d ? "&slmcid=" + d : "") + (!1 !== l.timezone ? "&xtz=" + l.timezone : "")
        } else I(a, "skimlinks-inline") ? (e = w(a, "data-skim-creative"), b = k.waypointDomain + "/?id=" + B + (O ? "&site=" + O : "") + (ua ? "&test=" + ua : "") + (f ? "&xcust=" + f : "") + (!1 !== d ? "&xs=9" : "&xs=8") + "&isjs=1&url=" + y(b) + "&xguid=" + l.cookie + "&xuuid=" + l.uuid + "&xsessid=" + l.sessid + "&xcreo=" + (a && null != e ? e : 0) + "&xed=" + g + "&sref=" + y(q.location) + "&pref=" + y(l.referrer) +
            (D ? "&dnt=1" : "") + (G ? "&fdnt=1" : "") + (!1 !== d ? "&slmcid=" + d : "") + (!1 !== l.timezone ? "&xtz=" + l.timezone : "")) : J(a, "noskimlinks") || (e = w(a, "data-skim-creative"), b = k.waypointDomain + "/?id=" + B + (O ? "&site=" + O : "") + (ua ? "&test=" + ua : "") + (f ? "&xcust=" + f : "") + (!1 !== d ? "&xs=9" : "&xs=1") + "&isjs=1&url=" + y(b) + "&xguid=" + l.cookie + "&xuuid=" + l.uuid + "&xsessid=" + l.sessid + "&xcreo=" + (a && null != e ? e : 0) + "&xed=" + g + "&sref=" + y(q.location) + c + (D ? "&dnt=1" : "") + (G ? "&fdnt=1" : "") + (!1 !== d ? "&slmcid=" + d : "") + (!1 !== l.timezone ? "&xtz=" + l.timezone : ""));
        0 < lc.length &&
            (b += "&" + lc);
        l.isAdblockUser && !J(a, "noskimlinks") && (b += "&abp=1");
        return b
    };
    var Ld = {}.hasOwnProperty;
    var Md = function(a, b) {
        var c;
        var d = [];
        U && (a.xrf = 1);
        for (c in a)
            if (Ld.call(a, c)) {
                var e = a[c];
                "data" !== c && d.push(c + "=" + e)
            }
        a.data && d.push("data=" + a.data);
        return b + "?" + d.join("&")
    };
    var Nd = function(a) {
        var b = u.getElementsByTagName("body")[0];
        var c = u.createElement("img");
        c.src = a;
        c.width = 1;
        c.height = 1;
        "undefined" !== typeof c.style && (c.style.display = "none");
        b.appendChild(c);
        return c
    };
    var tb = function(a, b) {
        Od(a);
        R &&
            w(a, "target", R);
        var c = w(a, "onclick");
        var d = "click" === b.type || "contextmenu" === b.type;
        if (null != c && -1 !== c.toString().indexOf("return false")) {
            if (d) return d = Ca(b), S(b), (R ? q.open(d.href) : q.open(d.href, R)).focus()
        } else return S(b)
    };
    var zc = function(a) {
        var b = Ca(a);
        var c = b.href;
        var d = oa(c);
        ba(d) && (c = Pd(b, c));
        "" === l.cookie && Ad ? tb(b, a) : (a = c, d = oa(a), ba(d) || (d = "", c = w(b, "data-skimlinks-tracking") || Ya, 0 < a.indexOf("#slm-") && (b = a.split("#slm-"), 2 !== b.length || isNaN(b[1]) || 10 * parseInt(b[1]) !== 10 * b[1] || (a = b[0], d = b[1])),
            b = {
                call: "track",
                data: y('{"pubcode":"' + B + '", "referrer":"' + q.location + '", "pref":"' + l.referrer + '", "site":"' + O + '", "url":"' + a + '", "custom":"' + (c || "") + '", "xtz":' + l.timezone + ', "uuid":"' + l.uuid + '", "slmcid":"' + d + '", "product":"1"}')
            //XXX }, D && (b.dnt = D), G && (b.fdnt = 1), b = Md(b, "//t.skimresources.com/api/"), b = b + "&rnd=" + Math.random(), Nd(b)));
            }, D && (b.dnt = D), G && (b.fdnt = 1), b = Md(b, "//t.localtest.me:8000/api/"), b = b + "&rnd=" + Math.random(), Nd(b)));
        return !0
    };
    var nc = function(a, b, c) {
        if (0 === b) return c;
        try {
            return a()
        } catch (d) {
            return nc(a, b - 1, c)
        }
    };
    var wc = function(a) {
        if (null == a) return null;
        for (;
            "A" !== a.nodeName.toUpperCase();)
            if (a =
                nc(function() {
                    return a.parentNode
                }, 3, null), null == a) return null;
        return a
    };
    var yc = function(a) {
        return a in Xa
    };
    var Pd = function(a, b) {
        var c = Qd(b);
        c !== b && (wb(a), xb(a, c));
        return c
    };
    var Qd = function(a) {
        return a = l.cookie ? a.replace(/([&\?]{1})xguid=([a-fA-F0-9]{32})/, "$1xguid=" + l.cookie) : a.replace(/([&\?]{1}xguid=[a-fA-F0-9]{32})/, "")
    };
    var Od = function(a) {
        var b, c;
        var d = m("skimlinks_strip_attribute", !1);
        if (!d) return !1;
        for (c in d)
            if (C(d, c)) {
                var e = d[c];
                (b = w(a, c)) && 0 === b.indexOf(e) && (b = b.substr(e.length), w(a, c, b))
            }
        return !0
    };
    var P = function() {
        if (k.has_been_called) return !1;
        k.has_been_called = !0;
        return Ga(zb(), "skimlinksApplySecondaryHandlers")
    };
    var Rd = function() {
        if (!k.disabled) {
            var a = zb();
            Ga(a);
            a: if (a = u) {
                zd && M(a, "mouseup", Da, !0);
                M(a, "click", Da, !0);
                try {
                    var b = "onauxclick" in u.createElement("body") ? "auxclick" : "contextmenu";
                    M(a, b, Da, !0)
                } catch (c) {
                    b = !1;
                    break a
                }
                b = !0
            } else b = !1;
            return b
        }
    };
    z.on("skim_js_ready", function() {
        q.skimlinks_revenue_forecast = window.skimlinks_revenue_forecast = !1;
        k.tracking && !/^[a-z0-9_\\|]+$/i.test(k.tracking) &&
            (k.tracking = !1);
        if (U && m("skimlinks")) return !1;
        Rd();
        var a = function() {
            if (k.has_been_called) return !0;
            try {
                u.documentElement.doScroll("left")
            } catch (d) {
                return setTimeout(a, 50), !1
            }
            return P()
        };
        var b = function() {
            return function() {
                return u.addEventListener ? function() {
                    u.removeEventListener("DOMContentLoaded", b, !1);
                    P();
                    return !0
                } : u.attachEvent ? function() {
                    u.detachEvent("onreadystatechange", b);
                    P();
                    return !0
                } : function() {
                    P();
                    return !0
                }
            }
        }(this)();
        if ("complete" === u.readyState) return setTimeout(P, 1);
        if (u.addEventListener) return u.addEventListener("DOMContentLoaded",
            b, !1), q.addEventListener("load", P, !1);
        if (u.attachEvent) {
            u.attachEvent("onreadystatechange", b);
            q.attachEvent("onload", P);
            var c = !1;
            try {
                c = null === q.frameElement
            } catch (d) {}
            if (u.documentElement.doScroll && c) return a()
        }
    });
    null == q.skimlinksApplyHandlers && (q.skimlinksApplyHandlers = Gc);
    null == q.skimlinksApplySecondaryHandlers && (q.skimlinksApplySecondaryHandlers = Fc);
    null == q.skimlinksApplyAuxHandlers && (q.skimlinksApplyAuxHandlers = Ec);
    var oc = {}.hasOwnProperty;
    var $a = 0;
    var ib = !1;
    var ab = null;
    var bb = 0;
    var wa = !1;
    var xa = {};
    var pc = function(a) {
        var b;
        return a && -1 !== a.indexOf("class=") ? (b = a.match(/([^\[]+)\[class=([^\]]+)\]/i)) && 3 === b.length ? b[1] + "." + b[2] : a : a
    };
    var Sd = function(a) {
        xa[a] = xa[a] || 0;
        xa[a]++;
        return a + "_" + xa[a]
    };
    var cb = function(a) {
        var b;
        var c = b = null;
        if (-1 !== a.indexOf(".")) {
            a = a.split(".");
            var d = a[0];
            c = a[1]
        } else -1 !== a.indexOf("[class=") ? (a = a.split("[class="), d = a[0], c = a[1].split("]"), c = c[0]) : -1 !== a.indexOf("[class^=") ? (a = a.split("[class^="), d = a[0], c = a[1].split("]"), c = c[0]) : -1 !== a.indexOf("[id*=") ? (a = a.split("[id*="),
            d = a[0], b = a[1].split("]"), b = b[0]) : d = a;
        return {
            tag: d,
            id: b,
            "class": c
        }
    };
    var aa = function(a, b) {
        var c;
        var d = b.split(",");
        var e = 0;
        for (c = d.length; e < c; e++) {
            b = d[e];
            b = A(b);
            b = cb(b);
            var f = !0;
            var g = (g = "string" === typeof a.className ? a.className : "") || ("function" === typeof a.getAttribute ? a.getAttribute("class") : void 0) || "";
            var p = ("function" === typeof a.getAttribute ? a.getAttribute("id") : void 0) || "";
            !b.tag || a.nodeName && a.nodeName.toLowerCase() === b.tag || (f = !1);
            b["class"] && (!g || g !== b["class"] && 0 !== g.indexOf(b["class"])) &&
                (f = !1);
            b.id && (!p || p !== b.id && -1 === p.indexOf(b.id)) && (f = !1);
            if (f) return !0
        }
        return !1
    };
    var Td = function(a) {
        var b, c;
        if ("undefined" !== typeof document.querySelectorAll) return document.querySelectorAll(a);
        var d = [];
        a = cb(a);
        if (a.tag && a["class"]) {
            var e = document.getElementsByTagName(a.tag);
            var f = 0;
            for (b = e.length; f < b; f++) {
                var g = e[f];
                (c = g.className || g.getAttribute("class")) && 0 === c.indexOf(a["class"]) && d.push(g)
            }
        } else a.tag && a.id ? (g = document.getElementById(a.id)) && g.nodeName.toLowerCase() === a.tag && d.push(g) : (a = a.tag,
            d = document.getElementsByTagName(a));
        return d
    };
    var rc = function(a, b) {
        var c = [];
        aa(a, b) ? c.push(a) : c = qc(a, b, !0);
        return c
    };
    var qc = function(a, b, c) {
        var d, e;
        var f = [];
        if ("undefined" !== typeof a.querySelectorAll) f = a.querySelectorAll(b);
        else if (b = cb(b), b.tag && b["class"]) {
            if (!a.getElementsByTagName) return c ? [] : !1;
            var g = a.getElementsByTagName(b.tag);
            var p = 0;
            for (d = g.length; p < d; p++)
                if (a = g[p], (e = a.className || a.getAttribute("class")) && 0 === e.indexOf(b["class"]))
                    if (c) f.push(a);
                    else return !0
        } else if (b.tag && b.id) {
            if ((a =
                    document.getElementById(b.id)) && a.nodeName && a.nodeName.toLowerCase() === b.tag)
                if (c) f.push(a);
                else return !0
        } else b = b.tag, f = a.getElementsByTagName(b);
        return c ? f : 0 < f.length
    };
    var db = function(a, b) {
        return 0 === b.length || aa(a, b.join(",")) ? !0 : a.parentNode ? db(a.parentNode, b) : !1
    };
    var Ud = function(a) {
        var b = a.offsetWidth;
        a = a.offsetHeight;
        return 468 === b && 60 === a || 234 === b && 60 === a || 728 === b && 90 === a || 300 === b && 250 === a || 250 === b && 250 === a || 336 === b && 280 === a || 160 === b && 600 === a || 120 === b && 600 === a ? !0 : !1
    };
    var Vd = function() {
        var a = [];
        a.push("div.widget-content");
        a.push("div.googleAdText");
        a.push("div[id=ad]");
        a.push("div[id=banner]");
        a.push("div[id=advertisement]");
        a.push("div[id=adv_container]");
        a.push("div.ad");
        a.push("div.banner");
        a.push("div.advertisement");
        a.push("div.ad_container");
        a.push("span.IL_AD");
        a.push("div[id=fave-ext-container]");
        a.push("span.skimlinks-unlinked"); - 1 !== q.location.href.indexOf(".google.") ? (a.push("td.gac_c"), a.push("table[id=mbEnd]"), a.push("div[id=mbEnd]"), a.push("span[id=taw]"), a.push("td.std"),
            a.push("div.std"), a.push("table.gssb_e"), a.push("div.c"), a.push("div[id=tads]")) : -1 !== q.location.href.indexOf(".yahoo.") ? (a.push("ul.spns,ul.reducepx-spnslist"), a.push("ul[class*=reducepx-spnslist]"), a.push("ul[id=east]")) : -1 !== q.location.href.indexOf(".aol.") ? (a.push("div.sllLink"), a.push("div.n")) : -1 !== q.location.href.indexOf(".bing.") && (a.push("div.sb_adsW"), a.push("div[id=sidebar]"), a.push("div.sb_adsWv2"), a.push("div.sb_adsNv2"), a.push("div[class*=sb_ads]"));
        return a
    };
    var Wd = function(a) {
        var b;
        var c = {};
        var d = 0;
        for (b = a.length; d < b; d++) {
            var e = a[d];
            c[e] = !0
        }
        return c
    };
    var Xd = function() {
        $a = 0;
        return z.publish("dom_changed")
    };
    var Yd = function(a, b, c, d) {
        var e, f, g;
        if ((e = a.className || ("function" === typeof a.getAttribute ? a.getAttribute("class") : void 0) || "") && ("skimlinks-unlinked" === e || "skimwords-link" === e)) return !1;
        if (0 === c.length && 0 === b.length) return v.traverse_node(a, !1, "", "", d);
        if (0 !== c.length) {
            if (!Ba(a, c)) {
                e = v.get_exclude_selector(c);
                c = v.get_exclude_selector([]);
                var p = e.selector;
                var h = e.needed;
                var m =
                    c.selector;
                if (0 === b.length || db(a, b)) return v.traverse_node(a, h, m, p, d);
                var k = [];
                e = 0;
                for (g = b.length; e < g; e++) {
                    c = b[e];
                    var l = rc(a, c);
                    l.length ? k.push(function() {
                        var a;
                        var b = [];
                        var c = 0;
                        for (a = l.length; c < a; c++) f = l[c], b.push(v.traverse_node(f, h, m, p, d));
                        return b
                    }()) : k.push(void 0)
                }
                return k
            }
        } else if (0 !== b.length) {
            if (db(a, b)) return v.traverse_node(a, !1, "", "", d);
            k = [];
            e = 0;
            for (g = b.length; e < g; e++) c = b[e], l = rc(a, c), l.length ? k.push(function() {
                var a;
                var b = [];
                var c = 0;
                for (a = l.length; c < a; c++) f = l[c], b.push(v.traverse_node(f, !1, "", "", d));
                return b
            }()) : k.push(void 0);
            return k
        }
    };
    var jb = function(a) {
        a = a.relatedNode || !1;
        if (!a || h.send_in_progress || m("stop_skimwords_ajax")) return !1;
        ab && clearTimeout(ab);
        $a++;
        1 === $a && v.reset();
        Yd(a, h.settings.includes || [], h.settings.excludes || [], h.settings.read_onlys || []);
        if (v.get_non_colliding_nodes() && 1 <= bb) return ab = setTimeout(function() {
            return Xd()
        }, 1E3)
    };
    var v = function() {
        var a = {};
        return {
            traverse: function(b, c, d, e) {
                b = b || [];
                c = c || [];
                d = d || [];
                return a && a.length && !e ? a : this.traverse_dom(b, c, d)
            },
            traverse_dom: function(b,
                c, d) {
                var e, f, g;
                if (wa) return a;
                wa = !0;
                var p = this.get_exclude_selector(c);
                var h = this.get_exclude_selector([]);
                c = p.selector;
                p = p.needed;
                h = h.selector;
                0 === b.length && b.push("body");
                b = b.concat(d);
                var k = 0;
                for (f = b.length; k < f; k++) {
                    var l = b[k];
                    l = pc(l);
                    l = Td(l);
                    var m = e = 0;
                    for (g = l.length; e < g; m = ++e) m = l[m], this.traverse_node(m, p, h, c, d)
                }
                return a
            },
            traverse_node: function(b, c, d, e, f) {
                var g = [];
                var h = 0;
                for (g.push({
                        node: b,
                        tagName: "",
                        readOnly: !1,
                        parent_id: null
                    }); h < g.length;) {
                    if ((b = g[h].node) && !(Ud(b) || J(b, "noskimwords", !0) ||
                            c && "" !== d && aa(b, d))) {
                        g[h].readOnly = !1;
                        if (b.nodeName && b.nodeName !== ta) {
                            g[h].tagName = b.nodeName;
                            null !== g[h].parent_id && (g[h].readOnly = g[g[h].parent_id].readOnly);
                            if (!g[h].readOnly)
                                if (c && aa(b, e)) g[h].readOnly = !0;
                                else {
                                    var k = b.nodeName.toLowerCase(); - 1 !== ra(f, k) && (g[h].readOnly = !0)
                                }
                            k = b.nodeName.toLowerCase(); - 1 !== ra(f, k) && (g[h].readOnly = !0)
                        } else null !== g[h].parent_id && (g[h].tagName = g[g[h].parent_id].tagName, g[h].readOnly = g[g[h].parent_id].readOnly);
                        "msie" === l.detect.browser && 9 > l.detect.version && g[h].readOnly ||
                            (b.hasChildNodes() ? g = this.add_child_nodes(g[h], h, g) : this._add(b, !1, g[h].tagName, g[h].readOnly))
                    }
                    h++
                }
                return a
            },
            is_traversed: function() {
                return wa
            },
            is_good_tag: function(a) {
                return Wd("p body div span ul ol li table tbody td tr th tfoot col colgroup em strong big small blockquote cite b dl dfn dd dt ins form legend noframes pre noscript center font i article section main".split(" "))[a.nodeName.toLowerCase()] ? !0 : !1
            },
            is_html: function(a) {
                return (a = A(a)) && "<" === a[0]
            },
            get_non_colliding_nodes: function() {
                var b;
                var c = a;
                var d = {};
                bb = 0;
                for (b in c) oc.call(c, b) && (d[b] = c[b], bb++);
                return d
            },
            get_as_hash_node_dict: function() {
                var b;
                var c = {};
                for (b in a) {
                    var d = a[b];
                    C(a, b) && (c[b] = d)
                }
                return c
            },
            get_as_pair_array: function() {
                var b;
                var c = [];
                for (b in a) oc.call(a, b) && c.push([b, a[b]]);
                return c
            },
            get_exclude_selector: function(a, c) {
                var b, e, f;
                var g = [];
                if (!c) {
                    c = document.getElementsByTagName("body");
                    if (!c.length) return {
                        needed: !1,
                        selector: ""
                    };
                    c = c[0]
                }
                a = a.concat(Vd());
                var h = b = 0;
                for (e = a.length; b < e; h = ++b) a[h] = pc(a[h]);
                b = !1;
                e = "";
                var k =
                    0;
                for (f = a.length; k < f; k++) h = a[k], qc(c, h, !1) && g.push(h);
                g.length && (b = !0, e = g.join(",").replace("class=", "class^="));
                return {
                    needed: b,
                    selector: e
                }
            },
            length: function() {
                return sa(a).length
            },
            reset: function() {
                a = [];
                return wa = !1
            },
            add_child_nodes: function(a, c, d) {
                var b, f;
                var g = a.node.childNodes;
                var h = 0;
                for (f = g.length; h < f; h++)(b = g[h]) && b.nodeName && !this._add(b, !1, a.tagName, a.readOnly) && this.is_good_tag(b) && d.push({
                    node: b,
                    tagName: a.tagName,
                    readOnly: a.readOnly,
                    parent_id: c
                });
                return d
            },
            add_node: function(a, c) {
                return this._add(a,
                    c)
            },
            _add: function(b, c, d, e) {
                var f = null;
                b.nodeName === ta && (f = A(b.nodeValue));
                c = c || !1;
                if ("msie" === l.detect.browser && 9 > l.detect.version && e) return !1;
                if ("msie" !== l.detect.browser || 9 <= l.detect.version) try {
                    b.meta = {
                        ElementTag: d,
                        ReadOnly: e
                    }
                } catch (g) {}
                if (f && !this.is_html(f) && 3 <= f.length) {
                    if (c && "-1" === c) return !1;
                    c = this._skim_id_hash(f, c);
                    if (!c) return !1;
                    a[c] = b
                }
                return f ? !0 : !1
            },
            _skim_id_hash: function(a) {
                if (!a) return "";
                var b = A(a.replace(/\s+/g, " ")).length;
                a = a.replace(/[:\s]*/g, "");
                b = "" + b + ":" + a.substring(0, 20);
                return b =
                    Sd(b)
            }
        }
    }();
    var tc = function(a, b, c) {
        if (U) return !1;
        var d = (a.data ? a.data : a.childNodes[0].data).replace(b.repl_regex, b.replacement);
        var e = document.createElement("span");
        b = document.createDocumentFragment();
        e.innerHTML = d;
        if ("msie" === l.detect.browser && 9 > l.detect.version) {
            d = a.previousSibling;
            var f = /^\s/;
            d && d.nodeValue && d.nodeValue.length && f.test(d.nodeValue[d.nodeValue.length - 1]) && (d.nodeValue += " ");
            (d = a.nextSibling) && d.nodeValue && d.nodeValue.length && f.test(d.nodeValue[0]) && (d.nodeValue = " " + d.nodeValue)
        }
        for (; e.firstChild;) e.firstChild.nodeName ===
            ta ? (d = b.appendChild(e.firstChild), v.add_node(d)) : (d = b.appendChild(e.firstChild), null === d || c || kb(d, !0));
        if (c = a.parentNode) return c.replaceChild(b, a)
    };
    var W = void 0,
        sc = void 0,
        ya = 5,
        L = {
            store: function(a) {
                var b, c = void 0,
                    d;
                W = a.Nodes;
                sc = a.country;
                ya = h.no_limit ? 0 : a.Maxkeywords;
                null != ya && (ya = 5);
                for (c in W)
                    if (C(W, c)) {
                        a = W[c];
                        var e = a.Phrases;
                        var f = [];
                        var g = 0;
                        for (d = e.length; g < d; g++) {
                            var k = fb(e[g]);
                            var l = k.action_type();
                            var m = gb(l);
                            var n = 0;
                            if (b = bd(k)) n = b.id(), k.set_id(b.product_id());
                            b = k.id();
                            b = hb(parseInt(b), l);
                            var q = b === k.id() ? b : 0;
                            1E7 < parseInt(b) && 6 !== l && (q = b -= 1E7);
                            l = k;
                            var t = m,
                                u = c;
                            m = Ja(l.text());
                            var uc = l.occurrence(),
                                v = 0;
                            "de" == h.country.toLowerCase() && l.set_title("Shopping link hinzugef\u00fcgt von SkimWords");
                            l.is_editor() && (v = 1);
                            m = "(?:^|[\\s]+)(?:\\\\;\\.|,\\'\\\"\\(\\)\\/:\\?])?(" + m + ")(?:\\'s)?(?:[\\\\;,\\.\\'\\\"|\\(\\)\\/:\\?])*(?:[\\s]+|$)";
                            b = '$1$2<a href="' + l.url() + '" class="skimwords-link" target="_blank" data-skimwords-id="' + b + '" data-skimlinks-editor="' + v + '" data-skimwords-word="' + encodeURIComponent(l.text()) +
                                '" data-group-id="' + n + '" data-skim-creative="' + t + '" data-skim-product="' + q + '" title="' + l.title() + '" occurrence="' + uc + '" data-skim-node-id="' + u + '">$3$4</a>$5$6';
                            n = m.replace(/\?:/g, "");
                            l = new RegExp(m, "i");
                            n = new RegExp(n, "i");
                            f.push({
                                phrase: k,
                                repl_regex: n,
                                replacement: b,
                                regex: l,
                                target_occurrence: e[g].PhraseOccurrence
                            })
                        }
                        f.sort(Zb);
                        a.search_objects = f
                    }
            },
            find_matches: $b,
            country: function() {
                return sc
            },
            num_nodes: function() {
                return sa(W).length
            },
            maxkeywords: function() {
                return ya
            },
            spanify_all: function() {
                var a, b =
                    v.get_as_pair_array(),
                    c = [];
                for (a = 0; a < b.length; a++) {
                    var d = b[a];
                    var e = d[0];
                    var f = d[1];
                    d = f.parentNode;
                    if (!f.meta || !f.meta.ReadOnly)
                        if (!d || !d.nodeName || v.is_good_tag(d)) {
                            var g = $b(e, f);
                            d = {};
                            if (g && g.length)
                                for (e = Aa(g, f, e), e = e[0], f = 0, g = e.length; f < g; f++) {
                                    var h = e[f].match.phrase.text();
                                    C(d, h) ? d[h]++ : d[h] = 1;
                                    w(e[f], "occurrence", d[h]);
                                    c.push(e[f])
                                }
                        }
                }
                return c
            }
        },
        cc = !1;
    z.on("skim_js_init", function() {
        h.disabled || (h.branded_merchant = m("skimwords_branded_merchant", !1), h.branded_merchant_url = m("skimwords_branded_merchant_url", !1), h.debug = m("skimwords_debug", 0), h.diy = m("skimwords_diy", !1), h.diy_filter = m("skimwords_diy_filter", !1), h.force_country = m("skimwords_force_country", !1), h.force_domain_check = m("skimwords_force_domain_check", !1), h.force_tree = m("skimwords_force_tree", !1), h.hover_name = m("skimwords_hover_name", "dark"), h.link_all = m("skimwords_link_all", !1), h.lite = m("skimwords_lite", !1), h.maxproducts = m("skimlinks_maxproducts", 3), h.merchant_excludes = m("skimwords_merchant_excludes", !1), h.merchant_includes = m("skimwords_merchant_includes", !1), h.no_limit = m("skimwords_no_limit", !1), h.noVisual = m("skimwords_no_visual", !1), h.prio_threshold = m("skimwords_prio_threshold", 0), h.standard = m("skimwords_standard", !1), h.whitelist_filter = m("skimwords_whitelist_filter", !1), h.x_min_visual_distance = Fd, h.y_min_visual_distance = Gd, h.branded_merchant && (h.branded_merchant = parseInt(h.branded_merchant)), x(h.post_init_hook) && h.post_init_hook(), z.on("beacon_callback_post_page_load", hd), z.on("dom_changed", function() {
            return Ra({}, !0)
        }))
    });
    q.skimwordsDataCallback =
        X;
    q.instantDataCallback = ac;
    var md = function(a) {
        M(a, "click", S);
        Dd || M(a, "contextmenu", S);
        return kb(a, !1)
    };
    var Zd = function(a, b, c, d) {
        var e = Ja(a);
        var f = "";
        k.target && (f = 'target="' + k.target + '"');
        b = Ua(b);
        e = "(?:^|[\\s]+)(?:\\\\;\\.|,\\'\\\"\\(\\)\\/:\\?])?(" + e + ")(?:\\'s)?(?:[\\\\;,\\.\\'\\\"|\\(\\)\\/:\\?])*(?:[\\s]+|$)";
        a = '$1$2<a href="' + b + '" class="' + d + '" ' + f + ' data-skimwords-word="' + encodeURIComponent(Ua(a)) + ('"  data-skim-creative="' + c + '" title="">$3$4</a>$5$6');
        b = e.replace(/\?:/g, "");
        return {
            search_regex: new RegExp(e,
                "i"),
            repl_regex: new RegExp(b, "i"),
            repl_text: a
        }
    };
    var jd = function(a, b) {
        var c, d, e;
        if (!a || Ba(a, ["span.skimlinks-unlinked"])) return [
            [],
            []
        ];
        var f = a.data;
        var g = [];
        var h = [];
        for (d = /$|\b(?:https?:\/\/)?(?:[-_a-zA-Z]+\.)*(?:[-_a-zA-Z]{2,}\.[-_\w]{2,5}\b)[^\[\]\s]*\b|$/ig; c = d.exec(f);) {
            var k = c[0];
            if ("link.phrase" !== k) {
                var m = c.index;
                if (0 < A(k).length && -1 === k.indexOf("/.") && -1 === k.indexOf("...")) {
                    var n = k;
                    0 !== k.indexOf("http") && 0 !== k.indexOf("//") && (n = "msie" === l.detect.browser && 6 >= l.detect.version ? "http://" + k : "//" +
                        k);
                    c = oa(n);
                    var q = fb({
                        OriginalPhrase: "" + k,
                        Url: n,
                        Title: "",
                        ActionType: 2,
                        GroupId: 0,
                        Unlinked: !0
                    });
                    (e = Zd("" + k, n, H.creative, "skimlinks-unlinked")) && h.push({
                        start: m,
                        text: "" + Ua(k),
                        domain: c,
                        repl_regex: e.repl_regex,
                        replacement: e.repl_text,
                        regex: e.search_regex,
                        phrase: q,
                        link: n
                    });
                    g.push(c)
                } else break
            }
        }
        if (h.length) {
            var t = Aa(h, a, b, "skimlinks-unlinked");
            k = t[0];
            t = t[1];
            h = 0;
            for (d = k.length; h < d; h++) f = k[h], H.url_spans.push(f)
        }
        t || (t = []);
        return [g, t]
    };
    var kd = function(a) {
        var b;
        if (k.exclude.length) {
            var c = k.exclude;
            var d = 0;
            for (b =
                c.length; d < b; d++) {
                var e = c[d];
                if (e === a) return !1
            }
        }
        if (k.include.length) {
            c = k.include;
            d = 0;
            for (b = c.length; d < b; d++)
                if (e = c[d], e === a) return !0;
            return !1
        }
        return !0
    };
    z.on("skim_js_init", function() {
        if (!H.disabled) {
            var a = "beacon_callback_post_page_load",
                b = dc;
            h.disabled || (a = "instant_api_callback_settings", b = id);
            z.on(a, b);
            z.on("dom_changed", ec);
            z.on("beacon_callback_aux", ld)
        }
    });
    var $d = [{
        label: "lotame",
        // XXX url: "//bcp.crwdcntrl.net/5/c=7507/pv=y?https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dlotame%26skim_mapping%3Dtrue%26provider_id%3D%24%7Bprofile_id%7D",
        url: "//bcp.localtest.me:8000/5/c=7507/pv=y?https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dlotame%26skim_mapping%3Dtrue%26provider_id%3D%24%7Bprofile_id%7D",
        resyncAfter: [2, "days"],
        priority: 1,
        active: !0
    }, {
        label: "blue_kai",
        // XXX url: "https://stags.bluekai.com/site/27381?redir=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dblue_kai%26skim_mapping%3Dtrue%26provider_id%3D%24_BK_UUID",
        url: "https://stags.localtest.me:8000/site/27381?redir=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dblue_kai%26skim_mapping%3Dtrue%26provider_id%3D%24_BK_UUID",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "dfp",
        // XXX url: "//cm.g.doubleclick.net/pixel?google_nid=skimlinks_ddp&google_cm",
        url: "//cm.g.localtest.me:8000/pixel?google_nid=skimlinks_ddp&google_cm",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "mediamath",
        // XXX url: "//pixel.mathtag.com/sync/img?redir=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dmediamath%26skim_mapping%3Dtrue%26provider_id%3D%5BMM_UUID%5D%26provider_dc%3D%5BMT_DC%5D",
        url: "//pixel.localtest.me:8000/sync/img?redir=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Dmediamath%26skim_mapping%3Dtrue%26provider_id%3D%5BMM_UUID%5D%26provider_dc%3D%5BMT_DC%5D",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "app_nexus",
        // XXX url: "https://secure.adnxs.com/getuid?https%3A%2F%2Fx.skimresources.com%2F%3Fprovider_id%3D%24UID%26provider%3Dapp_nexus%26skim_mapping%3Dtrue",
        url: "https://secure.localtest.me:8000/getuid?https%3A%2F%2Fx.skimresources.com%2F%3Fprovider_id%3D%24UID%26provider%3Dapp_nexus%26skim_mapping%3Dtrue",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "eyeota",
        // XXX url: "//ps.eyeota.net/match?bid=dn9h51u&r=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Deyeota%26provider_id%3D%7BUUID_dn9h51u%7D%26skim_mapping%3Dtrue",
        url: "//ps.localtest.me:8000/match?bid=dn9h51u&r=https%3A%2F%2Fx.skimresources.com%2F%3Fprovider%3Deyeota%26provider_id%3D%7BUUID_dn9h51u%7D%26skim_mapping%3Dtrue",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "magnetic",
        // XXX url: "//magnetic.t.domdex.com/sync/skimlinks",
        url: "//magnetic.t.localtest.me:8000/sync/skimlinks",
        resyncAfter: [7, "days"],
        priority: 3,
        active: !0
    }, {
        label: "exelate",
        // XXX url: "//x.skimresources.com/?provider=exelate",
        url: "//x.localtest.me:8000/?provider=exelate",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "exelate2",
        // XXX url: "//x.skimresources.com/?provider=exelate2",
        url: "//x.localtest.me:8000/?provider=exelate2",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "krux",
        // XXX url: "//x.skimresources.com/?provider=krux",
        url: "//x.localtest.me:8000/?provider=krux",
        resyncAfter: [1, "days"],
        priority: 2,
        active: !0
    }, {
        label: "avocet",
        // XXX url: "https://ads.avocet.io/getuid?url=https%3A%2F%2Fx.skimresources.com%2F%3Fskim_mapping%3Dtrue%26provider%3Davocet%26provider_id%3D%7B%7BUUID%7D%7D",
        url: "https://ads.localtest.me:8000/getuid?url=https%3A%2F%2Fx.skimresources.com%2F%3Fskim_mapping%3Dtrue%26provider%3Davocet%26provider_id%3D%7B%7BUUID%7D%7D",
        resyncAfter: [1, "days"],
        priority: 3,
        active: !0
    }, {
        label: "tapad",
        // XXX url: "//x.skimresources.com/?provider=tapad",
        url: "//x.localtest.me:8000/?provider=tapad",
        resyncAfter: [3, "days"],
        priority: 3,
        active: !0
    }, {
        label: "skim",
        // XXX url: "//x.skimresources.com/?provider=skim",
        url: "//x.localtest.me:8000/?provider=skim",
        resyncAfter: [5, "days"],
        priority: 3,
        active: !0
    }, {
        label: "trade_desk",
        // XXX url: "//match.adsrvr.org/track/cmf/generic?ttd_pid=qakudad&ttd_tpi=1",
        url: "//match.localtest.me:8000/track/cmf/generic?ttd_pid=qakudad&ttd_tpi=1",
        resyncAfter: [3, "days"],
        priority: 3,
        active: !0
    }, {
        label: "rakutenoutbound",
        // XXX url: "//x.skimresources.com/?provider=rakutenoutbound",
        url: "//x.localtest.me:8000/?provider=rakutenoutbound",
        resyncAfter: [3, "days"],
        priority: 2,
        active: !0
    }, {
        label: "sovrn",
        // XXX url: "//x.skimresources.com/?provider=sovrn",
        url: "//x.localtest.me:8000/?provider=sovrn",
        resyncAfter: [5, "days"],
        priority: 2,
        active: !0
    }, {
        label: "narrative",
        // XXX url: "//x.skimresources.com/?provider=narrative",
        url: "//x.localtest.me:8000/?provider=narrative",
        resyncAfter: [5, "days"],
        priority: 2,
        active: !0
    }, {
        label: "tbin",
        // XXX url: "//trc.taboola.com/sg/skimlinks/1/cm",
        url: "//trc.localtest.me:8000/sg/skimlinks/1/cm",
        resyncAfter: [5, "days"],
        priority: 2,
        active: !0
    }, {
        label: "liout",
        // XXX url: "//query.petametrics.com/skimlinks",
        url: "//query.localtest.me:8000/skimlinks",
        resyncAfter: [4, "days"],
        priority: 3,
        active: !0
    }];
    var eb = function() {
        if (eb) return eb;
        var a = function(a) {
            return ((null != a ? a[0] : void 0) || 2) * {
                minutes: 60,
                hours: 3600,
                days: 86400
            }[(null != a ? a[1] : void 0) || "days"]
        };
        var b = $d;
        var c = {};
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
            return c.getServerTime(function(b) {
                b = k(a, b);
                return n(b)
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
        var k = function(a, c) {
            var f;
            var k = d(b, function(b) {
                var d;
                return b.active ? (d = a[b.label]) ? e(d, b, c) : !0 : !1
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
        var n = function(a) {
            if (a.length) {
                var b = a.shift();
                var c = function() {
                    var b = !1;
                    return function() {
                        if (!b) return n(a), b = !0
                    }
                }();
                Fa(b.url, c);
                return setTimeout(c, 500)
            }
        };
        return {
            init: function(a, b, d) {
                c.getServerTime = d;
                if (a) return b(l)
            },
            __private__: {
                day: 86400,
                isTimeToSync: e,
                configToSeconds: a,
                parseSyncCookie: m,
                getSuitableProviders: k,
                setProviders: function(a) {
                    return b =
                        a
                }
            }
        }
    }();
    z.on("skim_js_init", function() {
        var a = !Bd;
        var b = Nb(function() {
            var a;
            return null != (a = k.beacon[0]) ? a.csp : void 0
        }, "beacon");
        var c = Nb(function() {
            var a;
            return null != (a = k.beacon[0]) ? a.ts : void 0
        }, "beacon");
        return eb.init(a, b, c)
    });
    var Va = !1,
        Y = !1,
        fa = null,
        ha = null,
        ae = {
            detect: function(a) {
                a: {
                    try {
                        var b = navigator.userAgent.toLowerCase();
                        if (-1 === b.indexOf("firefox") && -1 === b.indexOf("chrome")) {
                            Y = !0;
                            Va = !1;
                            break a
                        }
                    } catch (c) {}
                    // XXX b = "" + 11 * Math.random();fa = new Image;fa.onload = gc;fa.src = "//p.skimresources.com/px.gif?ch=*&rn=*".replace(/\*/,
                    // XXX    "1").replace(/\*/, b);ha = new Image;ha.onload = gc;ha.src = "//p.skimresources.com/px.gif?ch=*&rn=*".replace(/\*/, "2").replace(/\*/, b)
                    b = "" + 11 * Math.random();fa = new Image;fa.onload = gc;fa.src = "//p.localtest.me:8000/px.gif?ch=*&rn=*".replace(/\*/,
                        "1").replace(/\*/, b);ha = new Image;ha.onload = gc;ha.src = "//p.localtest.me:8000/px.gif?ch=*&rn=*".replace(/\*/, "2").replace(/\*/, b)
                }
                fc(a, 250)
            }
        };
    (function() {
        q.skimInitAlreadyCalled || (q.skimInitAlreadyCalled = !0, nd(k.hostname) && (k.disabled = !0, h.disabled = !0), ae.detect(function(a) {
            l.isAdblockUser = a
        }), z.publish("skim_js_init"), z.publish("skim_js_ready"))
    })()
})();
