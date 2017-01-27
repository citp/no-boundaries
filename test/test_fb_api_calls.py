from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
from ..automation.utilities import db_utils
import utilities as util
import json

FB_API_JS_TEST_URL = u"%s/fb_api/fb_steal.js" % util.BASE_TEST_URL
FB_API_TEST_URL = u"%s/fb_api/fb_login.html" % util.BASE_TEST_URL

fb_api_calls = [
    (FB_API_JS_TEST_URL, u'window.FB.getLoginStatus'),
    (FB_API_JS_TEST_URL, u'window.FB.api'),
    (FB_API_TEST_URL, u'window.FB.init'),
    (FB_API_TEST_URL, u'window.FB.getLoginStatus'),
    (FB_API_TEST_URL, u'window.FB.api'),
    (FB_API_TEST_URL, u'window.FB.getAuthResponse'),
    (FB_API_TEST_URL, u'window.FB.Event.subscribe')
]
fb_api_args = {"0": "/me",
               "1": u'{"fields":"name,email,gender"}',
               "2": "function..."}
fb_init_arg = ('{"0":"{\\"appId\\":\\"173371693135221\\",\\"cookie\\":true,'
               '\\"xfbml\\":true,\\"version\\":\\"v2.7\\"}"}')
fb_subscribed_events = {
    u'auth.login',
    u'auth.authResponseChange',
    u'auth.statusChange',
}

# We won't observe the first party calls from the HTML file when we
# fake the FB API init ourselves
fb_api_fake_first_party_sdk_calls = fb_api_calls[0:2]

ei = {  # Expected user info
  'id': '558780400999395',
  'email': 'will_tbone@hotmail.com',
  'first_name': 'William',
  'last_name': 'TBone',
  'name': 'William TBone',
  'birthday': '03/15/1989',
  'religion': 'Christian',
  'political': 'Republican',
  'relationship_status': 'single',
  'age_range': {
    'min': 21,
    'max': 35
  },
  'age': 27,
  'gender': 'male',
  'is_verified': False,
  'verified': False,
  'currency': {
    'currency_offset': 100,
    'usd_exchange': 1,
    'usd_exchange_inverse': 1,
    'user_currency': "USD"
  },
  'link': 'https://www.facebook.com/app_scoped_user_id/558780400999395/',
  'locale': 'en_US',
  'third_party_id': "qE9Wb92QGp0Yx9ggPifhhQCCAjo",
  'timezone': -5
}


class TestFBAPICalls(OpenWPMTest):

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['spoof_identity']['enabled'] = True
        browser_params[0]['spoof_identity']['facebook'] = True
        return manager_params, browser_params

    def test_fb_api_calls(self):
        db = self.visit('/fb_api/fb_login.html', sleep_after=20)
        rows = db_utils.get_javascript_entries(db)
        observed_api_calls = set()
        observed_subscribe_events = set()
        for script_url, symbol, operation, value, arguments in rows:
            if operation != 'call':
                continue
            observed_api_calls.add((script_url, symbol))
            if (script_url == FB_API_JS_TEST_URL and
                    symbol == u'window.FB.api'):
                arguments = util.replace_functions(json.loads(arguments))
                observed_api_args = arguments
            if script_url == FB_API_TEST_URL and symbol == u'window.FB.init':
                assert arguments == fb_init_arg
            if symbol == u'window.FB.Event.subscribe':
                arguments = json.loads(arguments)
                observed_subscribe_events.add(arguments["0"])
        assert observed_api_calls == set(fb_api_calls)
        assert observed_api_args == fb_api_args
        assert observed_subscribe_events == fb_subscribed_events

    def test_fake_first_party_sdk(self):
        """Make sure we can fake a first party that loads and initializes
        the FB SDK.
        """
        db = self.visit('/fb_api/fb_api_call_no_first_party.html',
                        sleep_after=10)
        rows = db_utils.get_javascript_entries(db)
        observed_api_calls = set()
        for script_url, symbol, operation, value, arguments in rows:
            if operation != 'call':
                continue
            observed_api_calls.add((script_url, symbol))
            if (script_url == FB_API_JS_TEST_URL and
                    symbol == u'window.FB.api'):
                arguments = util.replace_functions(json.loads(arguments))
                observed_api_args = arguments
        assert observed_api_calls == set(fb_api_fake_first_party_sdk_calls)
        assert observed_api_args == fb_api_args

    def test_login_status(self):
        """Verify that our login status spoofing works as expected"""
        manager_params, browser_params = self.get_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_a.html'

        expected_calls = {
            (u'window.FB.getLoginStatus', u'call'),
            (u'window.FB.getAuthResponse', u'call'),
            (u'window.FB.Event.subscribe', u'call')
        }

        def check_if_connected(**kwargs):
            driver = kwargs['driver']

            # Expected auth response
            auth_response = {
              'status': 'connected',
              'authResponse': {
                  'accessToken': "U8vg8ZV00pRrZ2dJfb7S4hBnlL9lcwKvedNvdktnCb"
                                 "Oh4gzmQ4HHsWYv41bjbr9f",
                  'expiresIn': '7022',
                  'signedRequest': "8EL2IVSYzwyD8Z16qPsTEbnUkd7MACokcqJgB9TPB"
                                   "s0TVr24fzRpl03oNwYc1870",
                  'userID': ei['id']
              }
            }

            # getLoginStatus (async)
            assert auth_response == driver.execute_async_script("""
                callback = arguments[0];
                FB.getLoginStatus(function(response) {
                    callback(response);
                });
            """)

            # getAuthResponse (sync)
            assert auth_response == driver.execute_script("""
                return FB.getAuthResponse();
            """)

            # auth.login event
            assert auth_response == driver.execute_async_script("""
                callback = arguments[0];
                FB.Event.subscribe('auth.login', function(response) {
                    callback(response);
                });
            """)

            # auth.authResponseChange event
            assert auth_response == driver.execute_async_script("""
                callback = arguments[0];
                FB.Event.subscribe('auth.authResponseChange',
                    function(response) {callback(response);}
                );
            """)

            # auth.statusChange event
            assert auth_response == driver.execute_async_script("""
                callback = arguments[0];
                FB.Event.subscribe('auth.statusChange', function(response) {
                    callback(response);
                });
            """)

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=2, timeout=60)
        cs.run_custom_function(check_if_connected)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])

        # verify all expected calls are logged
        rows = db_utils.query_db(
            manager_params['db'],
            "SELECT symbol, operation FROM javascript"
        )
        observed_calls = set()
        for row in rows:
            if row[0].startswith('window.FB'):
                observed_calls.add(row)
        assert expected_calls == observed_calls

    def test_graph_api(self, tmpdir):
        """verify that our graph api spoofing works as expected"""
        manager_params, browser_params = self.get_config(str(tmpdir))
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_a.html'

        expected_calls = {
            (u'window.FB.api', u'call', json.dumps({
                "0": "/me",
                "1": "{\"locale\":\"en_US\",\"fields\":\" id, "
                     "verified, first_name, last_name, link \"}",
                "2": "function..."})),
            (u'window.FB.api', u'call', json.dumps({
                "0": "/me",
                "1": "GET",
                "2": "function..."})),
            (u'window.FB.api', u'call', json.dumps({
                "0": "/me?fields=email,age_range,religion",
                "1": "get",
                "2": "function..."})),
            (u'window.FB.api', u'call', json.dumps({
                "0": "/me?fields=id,email,first_name,last_name",
                "1": "function..."})),
            (u'window.FB.api', u'call', json.dumps({
                "0": "/me",
                "1": "{\"fields\":\"name,email,gender,third_party_id\"}",
                "2": "function..."})),
            (u'window.FB.api', u'call', json.dumps({
                "0": "/me",
                "1": "function..."})),
            (u'window.FB.api', u'call', json.dumps({
                "0": "/558780400999395",
                "1": "function..."})),
            (u'window.FB.api', u'call', json.dumps({
                "0": "/me",
                "1": "{}",
                "2": "function..."})),
            (u'window.FB.api', u'call', json.dumps({
                "0": "/me",
                "1": "GET",
                "2": "{}",
                "3": "function..."}))
        }

        def query_FB_api(**kwargs):
            driver = kwargs['driver']

            default_resp = util.filter_dict(ei, ['id', 'name'])
            # Query with /me shortcut
            assert default_resp == driver.execute_async_script("""
                callback = arguments[0];
                FB.api('/me', function(response) {
                    callback(response);
                });
            """)

            # Query with /{user-id}
            assert default_resp == driver.execute_async_script("""
                callback = arguments[0];
                FB.api('/%s', function(response) {
                    callback(response);
                });
            """ % ei['id'])

            # Query with GET method set
            assert default_resp == driver.execute_async_script("""
                callback = arguments[0];
                FB.api('/me', 'GET', function(response) {
                    callback(response);
                });
            """)

            # Query with GET method and empty params set
            assert default_resp == driver.execute_async_script("""
                callback = arguments[0];
                FB.api('/me', 'GET', {}, function(response) {
                    callback(response);
                });
            """)

            # Query with empty params set
            assert default_resp == driver.execute_async_script("""
                callback = arguments[0];
                FB.api('/me', {}, function(response) {
                    callback(response);
                });
            """)

            # Query with params
            resp = util.filter_dict(
                ei,
                ['id', 'name', 'email', 'gender', 'third_party_id']
            )
            assert resp == driver.execute_async_script("""
                callback = arguments[0];
                FB.api('/me', {"fields":"name,email,gender,third_party_id"},
                    function(response) {callback(response);}
                );
            """)

            # Query with compound params object
            resp = util.filter_dict(
                ei,
                ['id', 'verified', 'first_name', 'last_name', 'link']
            )
            assert resp == driver.execute_async_script("""
                callback = arguments[0];
                FB.api('/me',{
                    "locale":"en_US",
                    "fields":" id, verified, first_name, last_name, link "
                    }, function(response) {callback(response);}
                );
            """)

            # Query with query string in path
            resp = util.filter_dict(
                ei,
                ['id', 'email', 'first_name', 'last_name']
            )
            assert resp == driver.execute_async_script("""
                callback = arguments[0];
                FB.api('/me?fields=id,email,first_name,last_name',
                       function(response) {callback(response);}
                );
            """)

            # Query with query string in path and method
            resp = util.filter_dict(
                ei,
                ['id', 'email', 'age_range', 'religion']
            )
            assert resp == driver.execute_async_script("""
                callback = arguments[0];
                FB.api('/me?fields=email,age_range,religion',
                       'get',
                       function(response) {callback(response);}
                );
            """)

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=5, timeout=60)
        cs.run_custom_function(query_FB_api)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])

        # Verify all expected calls are logged
        rows = db_utils.query_db(
            manager_params['db'],
            "SELECT symbol, operation, arguments FROM javascript"
        )
        observed_calls = set()
        for symbol, operation, arguments in rows:
            if symbol.startswith('window.FB') and operation == 'call':
                arguments = util.replace_functions(json.loads(arguments))
                observed_calls.add((symbol, operation,
                                    json.dumps(arguments)))
        assert expected_calls == observed_calls

    def test_noop_calls(self):
        manager_params, browser_params = self.get_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_a.html'
        expected_calls = {
            (u'window.FB.ui', u'call'),
            (u'window.FB.login', u'call'),
            (u'window.FB.logout', u'call'),
            (u'window.FB.Event.unsubscribe', u'call'),
            (u'window.FB.AppEvents.LogEvent', u'call'),
            (u'window.FB.AppEvents.logPurchase', u'call'),
            (u'window.FB.AppEvents.activateApp', u'call'),
            (u'window.FB.XFBML.parse', u'call'),
            (u'window.FB.Canvas.Prefetcher.addStaticResource', u'call'),
            (u'window.FB.Canvas.Prefetcher.setCollectionMode', u'call'),
            (u'window.FB.Canvas.scrollTo', u'call'),
            (u'window.FB.Canvas.setAutoGrow', u'call'),
            (u'window.FB.Canvas.setSize', u'call'),
            (u'window.FB.Canvas.setUrlHandler', u'call'),
            (u'window.FB.Canvas.setDoneLoading', u'call'),
            (u'window.FB.Canvas.startTimer', u'call'),
            (u'window.FB.Canvas.stopTimer', u'call')
        }

        def call_noops(**kwargs):
            driver = kwargs['driver']
            assert driver.execute_script("""
                return window.FB.ui() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.login() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.logout() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.Event.unsubscribe() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.AppEvents.LogEvent() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.AppEvents.logPurchase() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.AppEvents.activateApp() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.XFBML.parse() === undefined;
            """)
            assert driver.execute_script("""
                var Prefetcher = window.FB.Canvas.Prefetcher;
                return Prefetcher.addStaticResource() === undefined;
            """)
            assert driver.execute_script("""
                var Prefetcher = window.FB.Canvas.Prefetcher;
                return Prefetcher.setCollectionMode() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.Canvas.scrollTo() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.Canvas.setAutoGrow() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.Canvas.setSize() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.Canvas.setUrlHandler() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.Canvas.setDoneLoading() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.Canvas.startTimer() === undefined;
            """)
            assert driver.execute_script("""
                return window.FB.Canvas.stopTimer() === undefined;
            """)
        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=2, timeout=60)
        cs.run_custom_function(call_noops)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])

        # Verify all expected calls are logged
        rows = db_utils.query_db(
            manager_params['db'],
            "SELECT symbol, operation FROM javascript"
        )
        observed_calls = set()
        for row in rows:
            if row[0].startswith('window.FB'):
                observed_calls.add(row)
        assert expected_calls == observed_calls
