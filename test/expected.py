""" Contains lists of expected data and or rows for tests """
from utilities import BASE_TEST_URL, BASE_TEST_URL_DOMAIN, BASE_TEST_URL_NOPATH

# XXX DO NOT PLACE NEW PROPERTIES HERE. Move anything you need to edit out
# XXX of this file and into the respective test file. See Issue #73.

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

adblockplus = {
    "%s/abp/adblock_plus_test.html" % BASE_TEST_URL,
    # favicon request is made to URL without a path
    "%s/favicon.ico" % BASE_TEST_URL_NOPATH}

JS_COOKIE_TEST_URL = u'%s/js_cookie.html' % BASE_TEST_URL

js_cookie = (JS_COOKIE_TEST_URL,
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
FORM_SNIFFER_TEST_PAGE = u'https://rawgit.com/gunesacar/cb9e70d6e9b5721894d6/raw/fba680626ab93f622075128c9d163a4d314ea5fa/autofill_mainpage.html'
# https://gist.github.com/gunesacar/cb9e70d6e9b5721894d6

FORM_SNIFFER_SCRIPT = u'https://rawgit.com/gunesacar/4f586bfaed271edd7b6d/raw/7c95f726bab3908279dd7f3b3d507d3c5f67205b/autofillsniff.js'  # noqa
# https://gist.github.com/gunesacar/4f586bfaed271edd7b6d

autofill_mainpage_calls = {
        (FORM_SNIFFER_TEST_PAGE,
        FORM_SNIFFER_SCRIPT,
        u'false',
        u'BODY/DIV[1,be-container,,false,none,]/FORM[1,,,false,,]',
        u'FORM'),
        (FORM_SNIFFER_TEST_PAGE,
        FORM_SNIFFER_SCRIPT,
         u'false',
         u'BODY/DIV[1,be-container,,false,none,]/FORM[1,,,false,,]/INPUT[1,email,,false,,]',
         u'INPUT'),
        (FORM_SNIFFER_TEST_PAGE,
        FORM_SNIFFER_SCRIPT,
         u'false',
         u'BODY/DIV[1,be-container,,false,none,]/FORM[1,,,false,,]/INPUT[2,password,,false,,]',
         u'INPUT')
}

# Form autofill with input elements

FORM_SNIFFER_NO_FORM_SCRIPT = u'https://rawgit.com/gunesacar/801547573d000481e5ef/raw/389b84b6c0a47fcb4656cf47c319ffa3cb2d2687/autofillsniff_noform.js'  # noqa
# https://gist.github.com/gunesacar/801547573d000481e5ef

FORM_SNIFFER_NO_FORM_TEST_PAGE = u'https://rawgit.com/gunesacar/4a24574ef1334981cd1b/raw/9d4ee5dbccb92dd227abf5c1471cd135f1b14434/autofillsniff_noform.html'  # noqa
# https://gist.github.com/gunesacar/4a24574ef1334981cd1b
autofill_noform_calls = {
        (FORM_SNIFFER_NO_FORM_TEST_PAGE,
         FORM_SNIFFER_NO_FORM_SCRIPT,
         u'false',
         u'BODY/DIV[1,be-container,,false,none,]/INPUT[1,email,,false,,]',  # noqa
         u'INPUT'),
        (FORM_SNIFFER_NO_FORM_TEST_PAGE,
         FORM_SNIFFER_NO_FORM_SCRIPT,
         u'false',
         u'BODY/DIV[1,be-container,,false,none,]/INPUT[2,password,,false,,]',  # noqa
         u'INPUT')
}

FORM_SNIFFER_3RDP_TEST_PAGE = u'***REMOVED***' # noqa
autofill_3rdp_calls = {
        (FORM_SNIFFER_3RDP_TEST_PAGE,
        FORM_SNIFFER_SCRIPT,
        u'false', u'BODY/DIV[1,be-container,,false,none,]/FORM[1,,,false,,]',  # noqa
        u'FORM'),
        (FORM_SNIFFER_3RDP_TEST_PAGE,
         FORM_SNIFFER_SCRIPT,
         u'false',
         u'BODY/DIV[1,be-container,,false,none,]/FORM[1,,,false,,]/INPUT[1,email,,false,,]',
         u'INPUT'),
        (FORM_SNIFFER_3RDP_TEST_PAGE,
         FORM_SNIFFER_SCRIPT,
         u'false',
         u'BODY/DIV[1,be-container,,false,none,]/FORM[1,,,false,,]/INPUT[2,password,,false,,]',
         u'INPUT')
}

HIDDEN_FORM_TEST_URL = u'%s/hidden_form/hidden_form.html' % BASE_TEST_URL
HIDDEN_FORM_TEST_SCRIPT = u'%s/hidden_form/hidden_form.js' % BASE_TEST_URL
hidden_form_insertions = {
        (HIDDEN_FORM_TEST_URL,
         HIDDEN_FORM_TEST_SCRIPT, u'true',
         u'BODY/DIV[1,div1,,false,,]/FORM[1,,,false,,]',
         u'FORM'),
        (HIDDEN_FORM_TEST_URL,
         HIDDEN_FORM_TEST_SCRIPT, u'false',
         u'BODY/DIV[2,div2,,true,,]/FORM[1,,,false,,]',
         u'FORM'),
        (HIDDEN_FORM_TEST_URL,
         HIDDEN_FORM_TEST_SCRIPT, u'false',
         u'BODY/DIV[3,div3,,false,none,]/FORM[1,,,false,,]',
         u'FORM'),
        (HIDDEN_FORM_TEST_URL,
         HIDDEN_FORM_TEST_SCRIPT, u'false',
         u'BODY/DIV[4,div4,,false,,hidden]/FORM[1,,,false,,]',
         u'FORM'),
        (HIDDEN_FORM_TEST_URL,
         HIDDEN_FORM_TEST_SCRIPT, u'true',
         u'BODY/DIV[5,div5-1,,false,,]/DIV[1,div5-2,,false,,]/FORM[1,,,false,,]',
         u'FORM'),
        (HIDDEN_FORM_TEST_URL,
         HIDDEN_FORM_TEST_SCRIPT, u'false',
         u'BODY/DIV[6,div6-1,,true,,]/DIV[1,div6-2,,false,,]/FORM[1,,,false,,]',
         u'FORM'),
        (HIDDEN_FORM_TEST_URL,
         HIDDEN_FORM_TEST_SCRIPT, u'false',
         u'BODY/DIV[7,div7-1,,false,none,]/DIV[1,div7-2,,false,,]/FORM[1,,,false,,]',
         u'FORM'),
        (HIDDEN_FORM_TEST_URL,
         HIDDEN_FORM_TEST_SCRIPT, u'false',
         u'BODY/DIV[8,div8-1,,false,,hidden]/DIV[1,div8-2,,false,,]/FORM[1,,,false,,]',
         u'FORM'),
        (HIDDEN_FORM_TEST_URL,
         HIDDEN_FORM_TEST_SCRIPT, u'false',
         u'BODY/DIV[9,div9,,false,,]/DIV[1,,,false,,]/DIV[1,,,true,,]/DIV[1,,,false,,]/FORM[1,,,false,,]',
         u'FORM')
}

form_insertion_js_calls = {
        (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.id', u'set', u'email', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.value', u'get', u'randomtestuser.4321@gmail.com', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.value', u'get', u'_pa$$word123_', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLFormElement.attributes', u'get', u'{}', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.type', u'set', u'email', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.type', u'set', u'password', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.id', u'set', u'password', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.name', u'set', u'email', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.attributes', u'get', u'{}', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLInputElement.name', u'set', u'password', None, None),
        (FORM_SNIFFER_SCRIPT, u'window.HTMLFormElement.appendChild', u'call', u'', 0, u'"NULL/INPUT"')
}

# DOM modification instrumentation
DOM_MODIFICATION_TEST_PAGE = u'http://localtest.me:8000/test_pages/dom_modification.html'
inserted_elements = {
        (DOM_MODIFICATION_TEST_PAGE,
         DOM_MODIFICATION_TEST_PAGE,
         u'true',
         u'BODY/DIV[1,test1,,false,,]/FORM[1,form1,,false,,]',
         u'FORM'),
        (DOM_MODIFICATION_TEST_PAGE,
         DOM_MODIFICATION_TEST_PAGE,
         u'true',
         u'BODY/DIV[1,test1,,false,,]/FORM[1,form1,,false,,]/INPUT[1,email1,,false,,]',
         u'INPUT'),
        (DOM_MODIFICATION_TEST_PAGE,
         DOM_MODIFICATION_TEST_PAGE,
         u'true',
         u'BODY/DIV[1,test1,,false,,]/FORM[1,form1,,false,,]/INPUT[2,password1,,false,,]',
         u'INPUT'),
        (DOM_MODIFICATION_TEST_PAGE,
         DOM_MODIFICATION_TEST_PAGE,
         u'false',
         u'BODY/DIV[2,test2,,false,,]/FORM[1,form2,,false,,]',
         u'FORM'),
        (DOM_MODIFICATION_TEST_PAGE,
         DOM_MODIFICATION_TEST_PAGE,
         u'true',
         u'BODY/DIV[2,test2,,false,,]/FORM[1,form2,,false,,]/INPUT[1,email2,,false,,]',
         u'INPUT'),
        (DOM_MODIFICATION_TEST_PAGE,
         DOM_MODIFICATION_TEST_PAGE,
         u'true',
         u'BODY/DIV[2,test2,,false,,]/FORM[1,form2,,false,,]/INPUT[2,password2,,false,,]',
         u'INPUT')
}
modified_elements = {
        (DOM_MODIFICATION_TEST_PAGE,
         DOM_MODIFICATION_TEST_PAGE,
         u'BODY/DIV[1,test1,,false,,]/FORM[1,form1,,false,,]',
         u'FORM',
         u'autocomplete',
         u'',
         u'on'),
        (DOM_MODIFICATION_TEST_PAGE,
         DOM_MODIFICATION_TEST_PAGE,
         u'BODY/DIV[2,test2,,false,,]/FORM[1,form2,,false,,]',
         u'FORM',
         u'autocomplete',
         u'',
         u'on')
}

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
