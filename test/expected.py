""" Contains lists of expected data and or rows for tests """
from utilities import BASE_TEST_URL, BASE_TEST_URL_DOMAIN, BASE_TEST_URL_NOPATH

properties = {
    "window.navigator.appCodeName",
    "window.navigator.appName",
    "window.navigator.appVersion",
    "window.navigator.buildID",
    "window.navigator.cookieEnabled",
    "window.navigator.doNotTrack",
    "window.navigator.geolocation",
    "window.navigator.language",
    "window.navigator.languages",
    "window.navigator.onLine",
    "window.navigator.oscpu",
    "window.navigator.platform",
    "window.navigator.product",
    "window.navigator.productSub",
    "window.navigator.userAgent",
    "window.navigator.vendorSub",
    "window.navigator.vendor",
    "window.screen.pixelDepth",
    "window.screen.colorDepth"}

# HTTP Requests and Responses Instrumentation
# NOTE: The [System Principal] favicon request will change in future versions
#       of FF. See Bug https://bugzilla.mozilla.org/show_bug.cgi?id=1277803.
# (request_url,
#     top_level_url,
#     is_XHR, is_frame_load, is_full_page, is_tp_content, is_tp_window,
#     triggering_origin,
#     loading_origin, content_policy_type)
http_requests = {
    (u'http://localtest.me:8000/test_pages/http_test_page.html',
        None,
        0, 0, 1, None, None,
        u'[System Principal]',
        u'chrome://browser/content/browser.xul', 6),
    (u'http://localtest.me:8000/test_pages/shared/test_favicon.ico',
        None,
        0, None, None, None, None,
        u'[System Principal]',
        u'chrome://browser/content/browser.xul', 3),
    (u'http://localtest.me:8000/test_pages/shared/test_favicon.ico',
        None,
        0, None, None, None, None,
        u'http://localtest.me:8000',
        u'undefined', 3),
    (u'http://localtest.me:8000/test_pages/shared/test_image_2.png',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, None, None, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page_2.html', 3),
    (u'http://localtest.me:8000/test_pages/shared/test_script_2.js',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, None, None, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page_2.html', 2),
    (u'http://localtest.me:8000/test_pages/shared/test_script.js',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, None, None, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page.html', 2),
    (u'http://localtest.me:8000/test_pages/shared/test_image.png',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, None, None, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page.html', 3),
    (u'http://localtest.me:8000/test_pages/http_test_page_2.html',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, 1, 0, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page.html', 7),
    (u'http://localtest.me:8000/test_pages/shared/test_style.css',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, None, None, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page.html', 4)
}

# format: (request_url, referrer, location)
http_responses = {
    (u'http://localtest.me:8000/test_pages/http_test_page.html',
        u'',
        u''),
    (u'http://localtest.me:8000/test_pages/shared/test_favicon.ico',
        u'',
        u''),
    (u'http://localtest.me:8000/test_pages/shared/test_style.css',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        u''),
    (u'http://localtest.me:8000/test_pages/shared/test_script.js',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        u''),
    (u'http://localtest.me:8000/test_pages/shared/test_image.png',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        u''),
    (u'http://localtest.me:8000/test_pages/http_test_page_2.html',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        u''),
    (u'http://localtest.me:8000/test_pages/shared/test_image_2.png',
        u'http://localtest.me:8000/test_pages/http_test_page_2.html',
        u''),
    (u'http://localtest.me:8000/test_pages/shared/test_script_2.js',
        u'http://localtest.me:8000/test_pages/http_test_page_2.html',
        u'')
}

http_cached_requests = {
    (u'http://localtest.me:8000/test_pages/http_test_page.html',
        None,
        0, 0, 1, None, None,
        u'[System Principal]',
        u'chrome://browser/content/browser.xul', 6),
    (u'http://localtest.me:8000/test_pages/shared/test_script_2.js',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, None, None, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page_2.html', 2),
    (u'http://localtest.me:8000/test_pages/shared/test_script.js',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, None, None, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page.html', 2),
    (u'http://localtest.me:8000/test_pages/http_test_page_2.html',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, 1, 0, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page.html', 7),
    (u'http://localtest.me:8000/test_pages/shared/test_style.css',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        0, None, None, 0, 0,
        u'http://localtest.me:8000',
        u'http://localtest.me:8000/test_pages/http_test_page.html', 4)
}

# format: (request_url, referrer, is_cached)
http_cached_responses = {
    (u'http://localtest.me:8000/test_pages/http_test_page.html',
        u'',
        1),
    (u'http://localtest.me:8000/test_pages/shared/test_style.css',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        1),
    (u'http://localtest.me:8000/test_pages/shared/test_script.js',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        1),
    (u'http://localtest.me:8000/test_pages/http_test_page_2.html',
        u'http://localtest.me:8000/test_pages/http_test_page.html',
        1),
    (u'http://localtest.me:8000/test_pages/shared/test_script_2.js',
        u'http://localtest.me:8000/test_pages/http_test_page_2.html',
        1)
}

# HTTP request call stack instrumentation
# Expected stack frames
HTTP_STACKTRACE_TEST_URL = BASE_TEST_URL + "/http_stacktrace.html"
stack_trace_inject_image =\
    "inject_image@" + HTTP_STACKTRACE_TEST_URL + ":18:7;null\n"\
    "inject_all@" + HTTP_STACKTRACE_TEST_URL + ":22:7;null\n"\
    "onload@" + HTTP_STACKTRACE_TEST_URL + ":1:1;null"

RAWGIT_HTTP_STACKTRACE_TEST_URL = "https://rawgit.com/gunesacar/b927d3fe69f3e7bf456da5192f74beea/raw/8d3e490b5988c633101ec45ef1443e61b1fd495e/inject_pixel.js"  # noqa
# https://gist.github.com/gunesacar/b927d3fe69f3e7bf456da5192f74beea
stack_trace_inject_pixel =\
    "inject_pixel@" + RAWGIT_HTTP_STACKTRACE_TEST_URL + ":4:3;null\n"\
    "null@" + RAWGIT_HTTP_STACKTRACE_TEST_URL + ":6:1;null"

stack_trace_inject_js =\
    "inject_js@" + HTTP_STACKTRACE_TEST_URL + ":13:7;null\n"\
    "inject_all@" + HTTP_STACKTRACE_TEST_URL + ":21:7;null\n"\
    "onload@" + HTTP_STACKTRACE_TEST_URL + ":1:1;null"

http_stacktraces = set((stack_trace_inject_image, stack_trace_inject_pixel, stack_trace_inject_js))
# parsed HTTP call stack dict
call_stack_inject_image =\
    [{"func_name": "inject_image",
     "filename": HTTP_STACKTRACE_TEST_URL,
     "line_no": "18",
     "col_no": "7",
     "async_cause": "null"
     },
    {"func_name": "inject_all",
     "filename": HTTP_STACKTRACE_TEST_URL,
     "line_no": "22",
     "col_no": "7",
     "async_cause": "null"
     },
    {"func_name": "onload",
     "filename": HTTP_STACKTRACE_TEST_URL,
     "line_no": "1",
     "col_no": "1",
     "async_cause": "null"
     }]

# Canvas Fingerprinting DB calls and property sets
CANVAS_TEST_URL = u"%s/canvas_fingerprinting.html" % BASE_TEST_URL

canvas = {(CANVAS_TEST_URL,
           u"HTMLCanvasElement.getContext", u"call", u"", 0, u"2d"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.textBaseline",
           u"set", u"top", None, None),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.font", u"set",
           u"14px 'Arial'", None, None),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.textBaseline",
           u"set", u"alphabetic", None, None),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillStyle",
           u"set", u"#f60", None, None),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillRect",
           u"call", u"", 0, u"125"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillRect",
           u"call", u"", 1, u"1"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillRect",
           u"call", u"", 2, u"62"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillRect",
           u"call", u"", 3, u"20"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillStyle",
           u"set", u"#069", None, None),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillText",
           u"call", u"", 0, u"BrowserLeaks,com <canvas> 1.0"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillText",
           u"call", u"", 1, u"2"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillText",
           u"call", u"", 2, u"15"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillStyle",
           u"set", u"rgba(102, 204, 0, 0.7)", None, None),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillText",
           u"call", u"", 0, u"BrowserLeaks,com <canvas> 1.0"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillText",
           u"call", u"", 1, u"4"),
          (CANVAS_TEST_URL, u"CanvasRenderingContext2D.fillText",
           u"call", u"", 2, u"17"),
          (CANVAS_TEST_URL, u"HTMLCanvasElement.toDataURL", u"call",
           u"", None, None)
          }

adblockplus = {
    "%s/abp/adblock_plus_test.html" % BASE_TEST_URL,
    # favicon request is made to URL without a path
    "%s/favicon.ico" % BASE_TEST_URL_NOPATH}

js_cookie = (u'%s/js_cookie.html' % BASE_TEST_URL,
             u'%s' % BASE_TEST_URL_DOMAIN,
             u'test_cookie',
             u'Test-0123456789',
             u'%s' % BASE_TEST_URL_DOMAIN,
             u'/')

lso_content = [u'%s/lso/setlso.html?lso_test_key=test_key&lso_test_value=REPLACEME' % BASE_TEST_URL,  # noqa
               u'localtest.me',
               u'FlashCookie.sol',
               u'localtest.me/FlashCookie.sol',
               u'test_key',
               u'REPLACEME']

WEBRTC_TEST_URL = u"%s/webrtc_localip.html" % BASE_TEST_URL

webrtc_calls = ((WEBRTC_TEST_URL, u'RTCPeerConnection.createDataChannel',
                 u'call', u'', 0, u''),
                (WEBRTC_TEST_URL, u'RTCPeerConnection.createDataChannel',
                 u'call', u'', 1, u'{"reliable":false}'),
                (WEBRTC_TEST_URL, u'RTCPeerConnection.onicecandidate',
                 u'set', u'FUNCTION', None, None),
                (WEBRTC_TEST_URL, u'RTCPeerConnection.createDataChannel',
                 u'call', u'', 0, u''),
                (WEBRTC_TEST_URL, u'RTCPeerConnection.createOffer',
                 u'call', u'', 0, u'FUNCTION'),
                (WEBRTC_TEST_URL, u'RTCPeerConnection.createOffer',
                 u'call', u'', 1, u'FUNCTION'))

# we expect these strings to be present in the WebRTC SDP
webrtc_sdp_offer_strings = ("a=ice-options",
                            "o=mozilla...THIS_IS_SDPARTA",
                            "IN IP4",
                            "a=fingerprint:sha-256",
                            "a=ice-options:",
                            "a=msid-semantic",
                            "m=application",
                            "a=sendrecv",
                            "a=ice-pwd:",
                            "a=ice-ufrag:",
                            "a=mid:sdparta",
                            "a=sctpmap:",
                            "a=setup:",
                            "a=ssrc:",
                            "cname:")

FB_API_JS_TEST_URL = u"%s/fb_api/fb_steal.js" % BASE_TEST_URL
FB_API_TEST_URL = u"%s/fb_api/fb_login.html" % BASE_TEST_URL

fb_api_calls = [(FB_API_JS_TEST_URL,
                 u'window.FB.getLoginStatus', u'call', u'', 0, u'FUNCTION'),
                (FB_API_JS_TEST_URL,
                u'window.FB.api', u'call', u'', 0, u'/me'),
                (FB_API_JS_TEST_URL,
                 u'window.FB.api', u'call', u'', 1,
                 u'{"fields":"name,email,gender"}'),
                (FB_API_JS_TEST_URL, u'window.FB.api', u'call', u'', 2,
                 u'FUNCTION'),
                (FB_API_TEST_URL,
                 u'window.FB.init', u'call', u'', 0,
                 '{"appId":"012345678901234","cookie":true,"xfbml":true,"version":"v2.5"}'),  # noqa
                (FB_API_TEST_URL,
                 u'window.FB.getLoginStatus', u'call', u'', 0, "FUNCTION"),
                (FB_API_TEST_URL, u'window.FB.api', u'call', u'', 0, u'/me'),
                (FB_API_TEST_URL, u'window.FB.api', u'call', u'', 1,
                 u'FUNCTION')]

# We won't observe the first party calls from the HTML file when we
# fake the FB API init ourselves
fb_api_fake_first_party_sdk_calls = fb_api_calls[0:4]
FB_API_TEST_URL = u"%s/fb_api/fb_login.html" % BASE_TEST_URL
FORM_HTML = u'<form xmlns="http://www.w3.org/1999/xhtml"><input type="email" id="email" name="email" /><input type="password" id="password" name="password" /></form>'  #noqa

FORM_SNIFFER_TEST_PAGE = u'https://rawgit.com/gunesacar/cb9e70d6e9b5721894d6/raw/fba680626ab93f622075128c9d163a4d314ea5fa/autofill_mainpage.html'
# https://gist.github.com/gunesacar/cb9e70d6e9b5721894d6

FORM_SNIFFER_SCRIPT = u'https://rawgit.com/gunesacar/4f586bfaed271edd7b6d/raw/7c95f726bab3908279dd7f3b3d507d3c5f67205b/autofillsniff.js'  # noqa
# https://gist.github.com/gunesacar/4f586bfaed271edd7b6d

autofill_mainpage_calls = [(FORM_SNIFFER_TEST_PAGE,
                           FORM_SNIFFER_SCRIPT,
                           u'false',
                           u'BODY/DIV[1,be-container,,false,none,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form')]

# Form autofill with input elements

FORM_SNIFFER_NO_FORM_SCRIPT = u'https://rawgit.com/gunesacar/801547573d000481e5ef/raw/389b84b6c0a47fcb4656cf47c319ffa3cb2d2687/autofillsniff_noform.js'  # noqa
# https://gist.github.com/gunesacar/801547573d000481e5ef

FORM_SNIFFER_NO_FORM_TEST_PAGE = u'https://rawgit.com/gunesacar/4a24574ef1334981cd1b/raw/9d4ee5dbccb92dd227abf5c1471cd135f1b14434/autofillsniff_noform.html'  # noqa
# https://gist.github.com/gunesacar/4a24574ef1334981cd1b
autofill_noform_calls = [(FORM_SNIFFER_NO_FORM_TEST_PAGE,
                          FORM_SNIFFER_NO_FORM_SCRIPT,
                          u'false',
                          u'BODY/DIV[1,be-container,,false,none,]/INPUT[1,email,,false,,]',  # noqa
                          u'<input xmlns="http://www.w3.org/1999/xhtml" type="email" id="email" name="email" />',  # noqa
                          u'input'),
                         (FORM_SNIFFER_NO_FORM_TEST_PAGE,
                          FORM_SNIFFER_NO_FORM_SCRIPT,
                          u'false',
                          u'BODY/DIV[1,be-container,,false,none,]/INPUT[2,password,,false,,]',  # noqa
                          u'<input xmlns="http://www.w3.org/1999/xhtml" type="password" id="password" name="password" />',  # noqa
                          u'input')]

autofill_3rdp_calls = [(u'***REMOVED***',
                        FORM_SNIFFER_SCRIPT,
                        u'false', u'BODY/DIV[1,be-container,,false,none,]/FORM[1,,,false,,]',  # noqa
                        FORM_HTML,  # noqa
                        u'form')]

HIDDEN_FORM_TEST_URL = u'%s/hidden_form/hidden_form.html' % BASE_TEST_URL
HIDDEN_FORM_TEST_SCRIPT = u'%s/hidden_form/hidden_form.js' % BASE_TEST_URL

hidden_form_insertions = [(HIDDEN_FORM_TEST_URL,
                           HIDDEN_FORM_TEST_SCRIPT, u'true',
                           u'BODY/DIV[1,div1,,false,,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form'),
                          (HIDDEN_FORM_TEST_URL,
                           HIDDEN_FORM_TEST_SCRIPT, u'false',
                           u'BODY/DIV[2,div2,,true,,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form'),
                          (HIDDEN_FORM_TEST_URL,
                           HIDDEN_FORM_TEST_SCRIPT, u'false',
                           u'BODY/DIV[3,div3,,false,none,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form'),
                          (HIDDEN_FORM_TEST_URL,
                           HIDDEN_FORM_TEST_SCRIPT, u'false',
                           u'BODY/DIV[4,div4,,false,,hidden]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form'),
                          (HIDDEN_FORM_TEST_URL,
                           HIDDEN_FORM_TEST_SCRIPT, u'true',
                           u'BODY/DIV[5,div5-1,,false,,]/DIV[1,div5-2,,false,,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form'),
                          (HIDDEN_FORM_TEST_URL,
                           HIDDEN_FORM_TEST_SCRIPT, u'false',
                           u'BODY/DIV[6,div6-1,,true,,]/DIV[1,div6-2,,false,,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form'),
                          (HIDDEN_FORM_TEST_URL,
                           HIDDEN_FORM_TEST_SCRIPT, u'false',
                           u'BODY/DIV[7,div7-1,,false,none,]/DIV[1,div7-2,,false,,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form'),
                          (HIDDEN_FORM_TEST_URL,
                           HIDDEN_FORM_TEST_SCRIPT, u'false',
                           u'BODY/DIV[8,div8-1,,false,,hidden]/DIV[1,div8-2,,false,,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form'),
                          (HIDDEN_FORM_TEST_URL,
                           HIDDEN_FORM_TEST_SCRIPT, u'false',
                           u'BODY/DIV[9,div9,,false,,]/DIV[1,,,false,,]/DIV[1,,,true,,]/DIV[1,,,false,,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form')]

form_insertion_js_calls = [(FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.id', u'set', u'email', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.value', u'get', u'randomtestuser@gmail.com', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.value', u'get', u'PWD12345678', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLFormElement.attributes', u'get', u'{}', None, None),
                           (FORM_SNIFFER_TEST_PAGE, u'window.HTMLFormElement.id', u'get', u'', None, None),
                           (FORM_SNIFFER_TEST_PAGE, u'window.HTMLFormElement.hidden', u'get', u'false', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.type', u'set', u'email', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.type', u'set', u'password', None, None),
                           (FORM_SNIFFER_TEST_PAGE, u'window.HTMLFormElement.style', u'get', u'{}', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.id', u'set', u'password', None, None),
                           (FORM_SNIFFER_TEST_PAGE, u'window.HTMLFormElement.className', u'get', u'', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.name', u'set', u'email', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.attributes', u'get', u'{}', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.name', u'set', u'password', None, None),
                           (FORM_SNIFFER_SCRIPT, u'window.HTMLFormElement.appendChild', u'call', u'', 0, u'"NULL/INPUT"')]

SET_PROP_TEST_PAGE = u'%s/set_property/set_property.js' % BASE_TEST_URL
set_property = [(SET_PROP_TEST_PAGE,
                 u'5', u'3',
                 u'set_window_name@%s:5:3\n'
                 '@%s:8:1\n' % (SET_PROP_TEST_PAGE, SET_PROP_TEST_PAGE),
                 u'window.HTMLFormElement.action',
                 u'set', u'TEST-ACTION', None, None)]

page_links = {
    (u'http://localtest.me:8000/test_pages/simple_a.html', u'http://localtest.me:8000/test_pages/simple_c.html'),
    (u'http://localtest.me:8000/test_pages/simple_a.html', u'http://localtest.me:8000/test_pages/simple_d.html'),
    (u'http://localtest.me:8000/test_pages/simple_a.html', u'http://example.com/test.html?localtest.me'),
}

# Event listeners
event_listener_additions = {
    "window.addEventListener",
    "window.document.addEventListener",
    "window.HTMLBodyElement.addEventListener",
    "window.HTMLFormElement.addEventListener",
    "window.HTMLInputElement.addEventListener"
}

# AudioContext and AudioNode symbols we expect from our test script
audio = {
    u"AudioContext.createOscillator",
    u"AudioContext.createAnalyser",
    u"AudioContext.createGain",
    u"AudioContext.createScriptProcessor",
    u"GainNode.gain",
    u"OscillatorNode.type",
    u"OscillatorNode.connect",
    u"AnalyserNode.connect",
    u"ScriptProcessorNode.connect",
    u"AudioContext.destination",
    u"GainNode.connect",
    u"ScriptProcessorNode.onaudioprocess",
    u"OscillatorNode.start",
    u"AnalyserNode.frequencyBinCount",
    u"AnalyserNode.getFloatFrequencyData",
    u"AnalyserNode.disconnect",
    u"ScriptProcessorNode.disconnect",
    u"GainNode.disconnect",
    u"OscillatorNode.stop"}

JS_STACK_TEST_URL = u"%s/js_call_stack.html" % BASE_TEST_URL
JS_STACK_TEST_SCRIPT_URL = u"%s/stack.js" % BASE_TEST_URL

js_stack_calls = (
    (JS_STACK_TEST_URL, u'1', u'1', u'', u'line 10 > eval', u'',
     u'window.navigator.appName', u'get'),
    (JS_STACK_TEST_SCRIPT_URL, u'3', u'5', u'js_check_navigator', u'', u'',
     u'window.navigator.userAgent', u'get'),
    (JS_STACK_TEST_SCRIPT_URL, u'1', u'1', u'', u'line 4 > eval', u'',
     u'window.navigator.platform', u'get'),
    (JS_STACK_TEST_SCRIPT_URL, u'1', u'1', u'', u'line 11 > eval', u'',
     u'window.navigator.buildID', u'get'),
    (JS_STACK_TEST_SCRIPT_URL, u'1', u'1', u'anonymous', u'line 14 > Function', u'',
     u'window.navigator.appVersion', u'get'),
    (JS_STACK_TEST_URL, u'7', u'9', u'check_navigator', u'', u'',
     u'window.navigator.userAgent', u'get'),
    (JS_STACK_TEST_URL, u'1', u'1', u'', u'line 8 > eval', u'',
     u'window.navigator.appCodeName', u'get'))

# Form fill test
FORM_FILL_PAGE = u'%s/form/form_fill.html' % BASE_TEST_URL
HTMLINPUT_VALUE = "window.HTMLInputElement.value"
# TODO: read the following from a common file or from form_utils.py
TEST_EMAIL = "randomtestuser@gmail.com"
TEST_PASSWORD = "_pa$$word123_"

form_sniffing = set([(FORM_FILL_PAGE, HTMLINPUT_VALUE, "get", TEST_EMAIL),
                     (FORM_FILL_PAGE, HTMLINPUT_VALUE, "get", "password"),
                     (FORM_FILL_PAGE, HTMLINPUT_VALUE, "get", "Subscribe"),
                     (FORM_FILL_PAGE, HTMLINPUT_VALUE, "get", "Sign Up"),
                     (FORM_FILL_PAGE, HTMLINPUT_VALUE, "get", TEST_PASSWORD)])
