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
FORM_SNIFFER_SCRIPT = u'https://rawgit.com/gunesacar/4f586bfaed271edd7b6d/raw/7c95f726bab3908279dd7f3b3d507d3c5f67205b/autofillsniff.js'  # noqa

autofill_mainpage_calls = [(FORM_SNIFFER_TEST_PAGE,
                           FORM_SNIFFER_SCRIPT,
                           u'false',
                           u'BODY/DIV[1,be-container,,false,none,]/FORM[1,,,false,,]',
                           FORM_HTML,
                           u'form')]

# Form autofill with input elements

FORM_SNIFFER_NO_FORM_SCRIPT = u'https://rawgit.com/gunesacar/801547573d000481e5ef/raw/389b84b6c0a47fcb4656cf47c319ffa3cb2d2687/autofillsniff_noform.js'  # noqa
FORM_SNIFFER_NO_FORM_TEST_PAGE = u'https://rawgit.com/gunesacar/4a24574ef1334981cd1b/raw/9d4ee5dbccb92dd227abf5c1471cd135f1b14434/autofillsniff_noform.html'  # noqa
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

# Event listeners
event_listener_additions = {
    "window.addEventListener",
    "window.document.addEventListener",
    "window.HTMLBodyElement.addEventListener",
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
