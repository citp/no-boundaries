import pytest
import utilities
from openwpmtest import OpenWPMTest
from ..automation import TaskManager
from ..automation.utilities import db_utils
from datetime import datetime
import os

# Expected Navigator and Screen properties
PROPERTIES = {
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
    "window.screen.colorDepth"
}

# Canvas Fingerprinting DB calls and property sets
CANVAS_TEST_URL = u"%s/canvas_fingerprinting.html" % utilities.BASE_TEST_URL

CANVAS_CALLS = {
    (CANVAS_TEST_URL, 'CanvasRenderingContext2D.fillStyle',
     'set', '#f60', None),
    (CANVAS_TEST_URL, 'CanvasRenderingContext2D.textBaseline', 'set',
     'alphabetic', None),
    (CANVAS_TEST_URL, 'CanvasRenderingContext2D.textBaseline', 'set',
     'top', None),
    (CANVAS_TEST_URL, 'CanvasRenderingContext2D.font', 'set',
     "14px 'Arial'", None),
    (CANVAS_TEST_URL, 'CanvasRenderingContext2D.fillStyle', 'set',
     '#069', None),
    (CANVAS_TEST_URL, 'CanvasRenderingContext2D.fillStyle', 'set',
     'rgba(102, 204, 0, 0.7)', None),
    (CANVAS_TEST_URL, 'HTMLCanvasElement.getContext', 'call',
     '', '{"0":"2d"}'),
    (CANVAS_TEST_URL, 'CanvasRenderingContext2D.fillRect', 'call',
     '', '{"0":125,"1":1,"2":62,"3":20}'),
    (CANVAS_TEST_URL, 'HTMLCanvasElement.toDataURL', 'call',
     '', None),
    (CANVAS_TEST_URL, 'CanvasRenderingContext2D.fillText', 'call',
     '', '{"0":"BrowserLeaks,com <canvas> 1.0","1":4,"2":17}'),
    (CANVAS_TEST_URL, 'CanvasRenderingContext2D.fillText', 'call',
     '', '{"0":"BrowserLeaks,com <canvas> 1.0","1":2,"2":15}')
}

WEBRTC_TEST_URL = u"%s/webrtc_localip.html" % utilities.BASE_TEST_URL

WEBRTC_CALLS = {
    (WEBRTC_TEST_URL, 'RTCPeerConnection.createOffer', 'call',
     '', '{"0":"FUNCTION","1":"FUNCTION"}'),
    (WEBRTC_TEST_URL, 'RTCPeerConnection.createDataChannel', 'call',
     '', '{"0":""}'),
    (WEBRTC_TEST_URL, 'RTCPeerConnection.createDataChannel', 'call',
     '', '{"0":"","1":"{\\"reliable\\":false}"}'),
    (WEBRTC_TEST_URL, 'RTCPeerConnection.onicecandidate', 'set',
     'FUNCTION', None)
}

# we expect these strings to be present in the WebRTC SDP
WEBRTC_SDP_OFFER_STRINGS = ("a=ice-options",
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

# AudioContext and AudioNode symbols we expect from our test script
AUDIO_SYMBOLS = {
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
    u"OscillatorNode.stop"
}

# Symbols used during battery fingerprinting
BATTERY_SYMBOLS = {
    "window.navigator.getBattery",
    "BatteryManager.charging",
    "BatteryManager.level",
    "BatteryManager.chargingTime",
    "BatteryManager.dischargingTime",
    "BatteryManager.addEventListener"
}
BATTERY_ARGUMENTS = {
    '{"0":"chargingtimechange","1":"FUNCTION"}',
    '{"0":"chargingchange","1":"FUNCTION"}',
    '{"0":"levelchange","1":"FUNCTION"}',
    '{"0":"dischargingtimechange","1":"FUNCTION"}'
}

JS_STACK_TEST_URL = u"%s/js_call_stack.html" % utilities.BASE_TEST_URL
JS_STACK_TEST_SCRIPT_URL = u"%s/stack.js" % utilities.BASE_TEST_URL

JS_STACK_CALLS = {
    (JS_STACK_TEST_URL, u'1', u'1', u'', u'line 10 > eval', u'',
     u'window.navigator.appName', u'get'),
    (JS_STACK_TEST_SCRIPT_URL, u'3', u'5', u'js_check_navigator', u'', u'',
     u'window.navigator.userAgent', u'get'),
    (JS_STACK_TEST_SCRIPT_URL, u'1', u'1', u'', u'line 4 > eval', u'',
     u'window.navigator.platform', u'get'),
    (JS_STACK_TEST_SCRIPT_URL, u'1', u'1', u'', u'line 11 > eval', u'',
     u'window.navigator.buildID', u'get'),
    (JS_STACK_TEST_SCRIPT_URL, u'1', u'1', u'anonymous', u'line 14 > Function',
     u'', u'window.navigator.appVersion', u'get'),
    (JS_STACK_TEST_URL, u'7', u'9', u'check_navigator', u'', u'',
     u'window.navigator.userAgent', u'get'),
    (JS_STACK_TEST_URL, u'1', u'1', u'', u'line 8 > eval', u'',
     u'window.navigator.appCodeName', u'get')
}

SET_PROP_TEST_PAGE = u'%s/set_property/set_property.js' % (
    utilities.BASE_TEST_URL)
SET_PROPERTY = [(SET_PROP_TEST_PAGE,
                 u'5', u'3',
                 u'set_window_name@%s:5:3\n'
                 '@%s:8:1' % (SET_PROP_TEST_PAGE, SET_PROP_TEST_PAGE),
                 u'window.HTMLFormElement.action',
                 u'set', u'TEST-ACTION', None)]


JS_COOKIE_TEST_URL = u'%s/js_cookie.html' % utilities.BASE_TEST_URL

DOCUMENT_COOKIE_READ = (
    JS_COOKIE_TEST_URL,
    u'8',
    u'9',
    u'set_cookie',
    u'',
    u'set_cookie@' + JS_COOKIE_TEST_URL + ':8:9'
    '\nonload@' + JS_COOKIE_TEST_URL + ':1:1',
    u'window.document.cookie', u'get',
    u'test_cookie=Test-0123456789')

DOCUMENT_COOKIE_WRITE = (
    JS_COOKIE_TEST_URL,
    u'7',
    u'9',
    u'set_cookie',
    u'',
    u'set_cookie@' + JS_COOKIE_TEST_URL + ':7:9'
    '\nonload@' + JS_COOKIE_TEST_URL + ':1:1',
    u'window.document.cookie', u'set',
    u'test_cookie=Test-0123456789; '
    'expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/')

DOCUMENT_COOKIE_READ_WRITE = set([DOCUMENT_COOKIE_READ,
                                  DOCUMENT_COOKIE_WRITE])

CONTEXT_PARENT_URL = utilities.BASE_TEST_URL + '/nested_iframes/'
CONTEXT_CHILD_1_URL = u'http://iframe.localtest.me:8000/test_pages/nested_iframes/' # noqa
CONTEXT_CHILD_2_URL = u'http://iframe2.localtest.me:8000/test_pages/nested_iframes/' # noqa
CONTEXT_URLS = {
    (CONTEXT_PARENT_URL + u'shared_script.js',
     CONTEXT_PARENT_URL + u'parent_page.html',
     CONTEXT_PARENT_URL + u'parent_page.html'),
    (CONTEXT_PARENT_URL + u'shared_script.js',
     CONTEXT_CHILD_1_URL + u'child_page_1.html',
     CONTEXT_PARENT_URL + u'parent_page.html'),
    (CONTEXT_PARENT_URL + u'shared_script.js',
     CONTEXT_CHILD_2_URL + u'child_page_2.html',
     CONTEXT_PARENT_URL + u'parent_page.html')
}


class TestExtension(OpenWPMTest):

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        return manager_params, browser_params

    @pytest.mark.skip("Screen instrumentation is disabled")
    def test_property_enumeration(self):
        test_url = utilities.BASE_TEST_URL + '/property_enumeration.html'
        db = self.visit(test_url)
        rows = db_utils.query_db(db,
                                 "SELECT script_url, symbol FROM javascript")
        observed_symbols = set()
        for script_url, symbol in rows:
            assert script_url == test_url
            observed_symbols.add(symbol)
        assert PROPERTIES == observed_symbols

    @pytest.mark.skip("Canvas instrumentation is disabled")
    def test_canvas_fingerprinting(self):
        db = self.visit('/canvas_fingerprinting.html')
        # Check that all calls and methods are recorded
        rows = db_utils.get_javascript_entries(db)
        observed_rows = set()
        for item in rows:
            observed_rows.add(item)
        assert CANVAS_CALLS == observed_rows

    def test_extension_gets_correct_visit_id(self):
        manager_params, browser_params = self.get_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)

        url_a = utilities.BASE_TEST_URL + '/simple_a.html'
        url_b = utilities.BASE_TEST_URL + '/simple_b.html'

        manager.get(url_a)
        manager.get(url_b)
        manager.close()
        qry_res = db_utils.query_db(
            manager_params['db'],
            "SELECT visit_id, site_url FROM site_visits"
        )

        # Construct dict mapping site_url to visit_id
        visit_ids = dict()
        for row in qry_res:
            visit_ids[row[1]] = row[0]

        simple_a_visit_id = db_utils.query_db(
            manager_params['db'],
            "SELECT visit_id FROM javascript WHERE "
            "symbol=?", ("window.navigator.userAgent",)
        )

        simple_b_visit_id = db_utils.query_db(
            manager_params['db'],
            "SELECT visit_id FROM javascript WHERE "
            "symbol=?", ("window.navigator.platform",)
        )

        assert visit_ids[url_a] == simple_a_visit_id[0][0]
        assert visit_ids[url_b] == simple_b_visit_id[0][0]

    def check_webrtc_sdp_offer(self, sdp_str):
        """Make sure the SDP offer includes expected fields/strings.

        SDP offer contains randomly generated strings (e.g. GUID). That's why
        we don't expect a fixed string but only check the presence of certain
        protocol fields.
        """
        for expected_str in WEBRTC_SDP_OFFER_STRINGS:
            assert expected_str in sdp_str

    @pytest.mark.skip("WebRTC instrumentation is disabled")
    def test_webrtc_localip(self):
        db = self.visit('/webrtc_localip.html')
        # Check that all calls and methods are recorded
        rows = db_utils.get_javascript_entries(db)
        observed_rows = set()
        for item in rows:
            if (item[1] == "RTCPeerConnection.setLocalDescription" and
                    item[2] == 'call'):
                sdp_offer = item[4]
                self.check_webrtc_sdp_offer(sdp_offer)
            else:
                observed_rows.add(item)
        assert WEBRTC_CALLS == observed_rows

    # @pytest.mark.skipif(
    #    "TRAVIS" in os.environ and os.environ["TRAVIS"] == "true",
    #    reason='Flaky on Travis CI')
    @pytest.mark.skip("Audio instrumentation is disabled")
    def test_audio_fingerprinting(self):
        db = self.visit('/audio_fingerprinting.html')
        # Check that all calls and methods are recorded
        rows = db_utils.get_javascript_entries(db)
        observed_symbols = set()
        for item in rows:
            observed_symbols.add(item[1])
        assert AUDIO_SYMBOLS == observed_symbols

    def test_set_property_stack_trace(self):
        # make sure we handle set property on elements properly
        db = self.visit('/set_property/set_property.html')
        rows = db_utils.query_db(db, "SELECT script_url, script_line,"
                                 " script_col, call_stack, symbol,"
                                 " operation, value, arguments "
                                 "FROM javascript", as_tuple=True)
        assert rows == SET_PROPERTY

    def test_js_call_stack(self):
        db = self.visit('/js_call_stack.html')
        # Check that all stack info are recorded
        rows = db_utils.get_javascript_entries(db, all_columns=True)
        observed_rows = set()
        for row in rows:
            item = (row['script_url'], row['script_line'], row['script_col'],
                    row['func_name'], row['script_loc_eval'],
                    row['call_stack'], row['symbol'], row['operation'])
            observed_rows.add(item)
        assert JS_STACK_CALLS == observed_rows

    def test_js_time_stamp(self):
        # Check that timestamp is recorded correctly for the javascript table
        MAX_TIMEDELTA = 30  # max time diff in seconds
        db = self.visit('/js_call_stack.html')
        utc_now = datetime.utcnow()  # OpenWPM stores timestamp in UTC time
        rows = db_utils.get_javascript_entries(db, all_columns=True)
        assert len(rows)  # make sure we have some JS events captured
        for row in rows:
            js_time = datetime.strptime(row['time_stamp'],
                                        "%Y-%m-%dT%H:%M:%S.%fZ")
            # compare UTC now and the timestamp recorded at the visit
            assert (utc_now - js_time).seconds < MAX_TIMEDELTA
        assert not db_utils.any_command_failed(db)

    @pytest.mark.skip("Battery instrumentation is disabled")
    def test_battery_fingerprinting(self):
        db = self.visit('/battery_fingerprinting.html')
        # Check that all calls and methods are recorded
        rows = db_utils.get_javascript_entries(db)
        observed_symbols = set()
        observed_arguments = set()
        for script_url, symbol, operation, value, args in rows:
            if symbol == "BatteryManager.addEventListener":
                observed_arguments.add(args)
            observed_symbols.add(symbol)
        assert BATTERY_SYMBOLS == observed_symbols
        assert BATTERY_ARGUMENTS == observed_arguments

    def test_document_cookie_instrumentation(self):
        db = self.visit(utilities.BASE_TEST_URL + "/js_cookie.html")
        rows = db_utils.get_javascript_entries(db, all_columns=True)
        captured_cookie_calls = set()
        for row in rows:
            item = (row['script_url'], row['script_line'], row['script_col'],
                    row['func_name'], row['script_loc_eval'],
                    row['call_stack'], row['symbol'], row['operation'],
                    row['value'])
            captured_cookie_calls.add(item)
        assert captured_cookie_calls == DOCUMENT_COOKIE_READ_WRITE

    def test_document_and_top_level_url(self):
        """Ensure document and top-level urls are set in all js instruments"""
        test_url = os.path.join(utilities.BASE_TEST_URL, 'nested_iframes',
                                'parent_page.html')
        db = self.visit(test_url, sleep_after=5)

        # check javascript entries
        observed_js = set()
        for row in db_utils.get_javascript_entries(db, all_columns=True):
            observed_js.add((row['script_url'],
                             row['document_url'],
                             row['top_level_url']))
        assert observed_js == CONTEXT_URLS

        # check element insertions
        rows = db_utils.query_db(
            db,
            "SELECT * FROM inserted_elements AS f LEFT JOIN site_visits as v"
            " ON f.visit_id = v.visit_id"
            " WHERE guid NOT NULL AND guid != ''"
        )
        observed_inserts = set()
        for row in rows:
            observed_inserts.add((row['script_url'],
                                  row['document_url'],
                                  row['top_level_url']))
        assert observed_inserts == CONTEXT_URLS

        # check element modifications
        rows = db_utils.query_db(
            db,
            "SELECT * FROM modified_elements AS f LEFT JOIN site_visits as v"
            " ON f.visit_id = v.visit_id"
            " WHERE guid NOT NULL AND guid != ''"
        )
        observed_modifications = set()
        for row in rows:
            # row['script_url'] gives incorrect url. See #126.
            script_url = ':'.join(
                row['call_stack'].split('@')[-1].split(':')[0:-2])

            observed_modifications.add((script_url,
                                        row['document_url'],
                                        row['top_level_url']))
        assert observed_modifications == CONTEXT_URLS
