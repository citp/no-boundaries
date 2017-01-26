import json
from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
from ..automation.utilities import db_utils
import utilities as util

ei = {  # Expected user info
    u'id': u'101947710780300010678',
    u'email': u'Flo.Bar.12345@gmail.com',
    u'first_name': u'Florentino',
    u'last_name': u'Bartholomew',
    u'name': u'Florentino Bartholomew',
    u'image_url': u'"https://lh4.googleusercontent.com/-UqEcQyoiCHk/'
                  'AAAAAAAAAAI/AAAAAAAAAAA/AKB_U8vzhLOBmQrGyD1teSBAuB4YvWhnJA/'
                  's96-c/photo.jpg"',
}
epi = {  # Expected plus info
  u"id": ei['id'],
  u"kind": u"plus#person",
  u"objectType": u"person",
  u"isPlusUser": True,
  u"etag": u"\"qwejzoixvlmke529mc2djlONDH28/jlkj98DHHD723K01hH_Jf8\"",
  u"url": u"https://plus.google.com/" + ei['id'],
  u"emails": [
   {
    u"value": ei['email'],
    u"type": u"account"
   }
  ],
  u"displayName": ei['name'],
  u"name": {
   u"familyName": ei['last_name'],
   u"givenName": ei['first_name']
  },
  u"nickname": u"FloBar",
  u"tagline": u"Only the best survive",
  u"aboutMe": u"Find me at LLWbZxZS6C65oM7IaNGk",
  u"image": {
   u"url": ei['image_url'],
   u"isDefault": True
  },
  u"occupation": u"A Student of Life",
  u"gender": u"male",
  u"urls": [
   {
    u"value": u"http://LLWbZxZS6C65oM7IaNGk.com",
    u"type": u"other",
    u"label": u"The best LLWbZxZS6C65oM7IaNGk in town."
   }
  ],
  u"language": u"en",
  u"birthday": u"1980-04-01",
  u"ageRange": {
   u"min": 21,
   u"max": 40
  },
  u"organizations": [
   {
    u"name": u"Trump University",
    u"title": u"The Art of the Deal",
    u"type": u"school",
    u"startDate": u"2001",
    u"endDate": u"2004",
    u"primary": False
   }
  ],
  u"placesLived": [
   {
    u"value": u"Alabaster, Alabama",
    u"primary": True
   },
   {
    u"value": u"Dayton, Louisiana"
   },
   {
    u"value": u"Monterey, California"
   }
  ],
  u"circledByCount": 0,
  u"verified": True
}

# Response should also have a `Content-Length`, `Expires`, and `Date` key
HTTPResponseHeaders = {
    'Cache-Control': "private, max-age=0, must-revalidate, no-transform",
    'Content-Encoding': 'gzip',
    'Content-Type': "application/json; charset=UTF-8",
    'Etag': "FFDKJie6cYw9BakjIIJFNNGVVdio/sdfg70qDT9rg2nj8zSasdfs_lFYYs",
    'Server': "GSE",
    'Vary': "X-Origin"
}


class TestGoogleAPICalls(OpenWPMTest):
    NUM_BROWSERS = 1

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['spoof_social_login'] = True
        return manager_params, browser_params

    def test_real_script_interception(self):
        """Verify that we redirect requests to platform.js to a noop"""
        manager_params, browser_params = self.get_config()
        browser_params[0]['http_instrument'] = True
        manager_params['testing'] = True
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/google_api/google_login.html'

        # Verify that script replacement is working as expected
        def check_script_replace(**kwargs):
            driver = kwargs['driver']

            # Check if google script was replaced
            assert driver.execute_script("""
                return window.script_replaced === true;
            """)

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=2, timeout=60)
        cs.run_custom_function(check_script_replace)
        manager.execute_command_sequence(cs)
        manager.close()

        # Verify that request still exists in http_requests
        db = manager_params['db']
        rows = db_utils.query_db(
            db,
            "SELECT * FROM http_requests WHERE url = ?",
            ("https://apis.google.com/js/platform.js",)
        )
        assert len(rows) == 1

    def test_spoofed_google_api(self):
        """Verify that `gapi` spoofing works as expected"""
        manager_params, browser_params = self.get_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_a.html'

        expected_calls = {
            (u'window.gapi.auth2.init', u'call'),
            (u'window.gapi.auth2.BasicProfile.getEmail', u'call'),
            (u'window.gapi.auth2.GoogleUser.isSignedIn', u'call'),
            (u'window.gapi.auth2.BasicProfile.getId', u'call'),
            (u'window.gapi.auth2.GoogleAuth.then', u'call'),
            (u'window.gapi.auth2.GoogleAuth.currentUser.listen', u'call'),
            (u'window.gapi.auth2.BasicProfile.getImageUrl', u'call'),
            (u'window.gapi.auth2.BasicProfile.getName', u'call'),
            (u'window.gapi.auth2.BasicProfile.getGivenName', u'call'),
            (u'window.gapi.auth2.BasicProfile.getFamilyName', u'call'),
            (u'window.gapi.auth2.GoogleUser.getBasicProfile', u'call'),
            (u'window.gapi.auth2.GoogleAuth.currentUser.get', u'call'),
            (u'window.gapi.auth2.GoogleAuth.isSignedIn.listen', u'call'),
            (u'window.gapi.auth2.GoogleUser.getId', u'call'),
            (u'window.gapi.auth2.getAuthInstance', u'call'),
            (u'window.gapi.auth2.GoogleAuth.isSignedIn.get', u'call')
        }

        def check_api(**kwargs):
            driver = kwargs['driver']

            # Auth from init (async)
            assert driver.execute_async_script("""
                callback = arguments[0];
                window.gapi.auth2.init({}).then(function(GoogleAuth) {
                    callback(GoogleAuth.isSignedIn.get() === true);
                }, function(error){console.log("Error on init",error);});
            """)

            # isSignedIn (sync) via GoogleAuth
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                return GoogleAuth.isSignedIn.get() === true;
            """)

            # isSignedIn (async) via GoogleAuth
            assert driver.execute_async_script("""
                callback = arguments[0];
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                GoogleAuth.isSignedIn.listen(function(response) {
                    callback(response === true);
                });
            """)

            # isSignedIn (sync) via GoogleUser (sync)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                var GoogleUser = GoogleAuth.currentUser.get();
                return GoogleUser.isSignedIn() === true;
            """)

            # isSignedIn (sync) via GoogleUser (async)
            assert driver.execute_async_script("""
                callback = arguments[0];
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                GoogleAuth.currentUser.listen(function(GoogleUser) {
                    callback(GoogleUser.isSignedIn() === true);
                });
            """)

            # getId (sync) via GoogleUser (sync)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                var GoogleUser = GoogleAuth.currentUser.get();
                return GoogleUser.getId() == %s;
            """ % ei['id'])

            # getId (sync) via BasicProfile (sync)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                var GoogleUser = GoogleAuth.currentUser.get();
                var BasicProfile = GoogleUser.getBasicProfile();
                return BasicProfile.getId() == %s;
            """ % ei['id'])

            # getName (sync) via BasicProfile (sync)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                var GoogleUser = GoogleAuth.currentUser.get();
                var BasicProfile = GoogleUser.getBasicProfile();
                return BasicProfile.getName() == '%s';
            """ % ei['name'])

            # getGivenName (sync) via BasicProfile (sync)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                var GoogleUser = GoogleAuth.currentUser.get();
                var BasicProfile = GoogleUser.getBasicProfile();
                return BasicProfile.getGivenName() == '%s';
            """ % ei['first_name'])

            # getFamilyName (sync) via BasicProfile (sync)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                var GoogleUser = GoogleAuth.currentUser.get();
                var BasicProfile = GoogleUser.getBasicProfile();
                return BasicProfile.getFamilyName() == '%s';
            """ % ei['last_name'])

            # getImageUrl (sync) via BasicProfile (sync)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                var GoogleUser = GoogleAuth.currentUser.get();
                var BasicProfile = GoogleUser.getBasicProfile();
                return BasicProfile.getImageUrl() == '%s';
            """ % ei['image_url'])

            # getEmail (sync) via BasicProfile (sync)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.getAuthInstance();
                var GoogleUser = GoogleAuth.currentUser.get();
                var BasicProfile = GoogleUser.getBasicProfile();
                return BasicProfile.getEmail() == '%s';
            """ % ei['email'])

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=5, timeout=60)
        cs.run_custom_function(check_api)
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
            if row[0].startswith('window.gapi'):
                observed_calls.add(row)
        assert observed_calls == expected_calls

    def test_spoofed_plus_api(self):
        """Verify that Google Plus API spoofing works as expected

        There are two "plus" API points to test, the first is
        `gapi.client.plus.people.get` and the second is `gapi.client.request`.
        Both APIs can be queried in multiple ways:
        (1) The user can be specified as `me` or as an ID.
        (2) In the `request` API, fields can be passed as query string
            parameters in the path, or in the `params` argument.
        (3) The APIs create a `Request` object that can be executed in
            multiple ways (`.then()` and `.execute()`) and which return
            slightly different objects depending on execution type.

        Both APIs return all information by default, and only return the
        available information when fields are specified.
        """
        manager_params, browser_params = self.get_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_a.html'

        expected_calls = {
            (u'window.gapi.client.request', u'call'),
            (u'window.gapi.client.plus.people.get', u'call'),
        }

        def check_api(**kwargs):
            driver = kwargs['driver']

            def verify_response(resp):
                """ Verify spoofed HTTP Response object """
                assert json.loads(resp['body']) == epi
                assert resp['status'] == 200
                assert resp['statusText'] == "OK"
                assert util.filter_dict(
                    resp['headers'],
                    HTTPResponseHeaders.keys()) == HTTPResponseHeaders
                assert resp['headers']['Content-Length'] == len(resp['body'])
                assert 'Date' in resp['headers']
                assert 'Expires' in resp['headers']

            ###
            # People API
            ###

            # Verify `people.get().then()` response body
            resp = driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.plus.people.get({
                  userId: 'me'
                }).then(function(response) {
                  callback(response);
                });
            """)
            assert resp['result'] == epi
            verify_response(resp)

            # Verify `people.get().execute()` first response argument
            resp = driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.plus.people.get({
                  userId: 'me'
                }).execute(function(arg1, arg2) {
                  callback(arg1);
                });
            """)
            assert resp['result'] == epi
            assert util.filter_dict(resp, epi.keys()) == epi

            # Verify `people.get().execute()` second response argument
            resp = driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.plus.people.get({
                  userId: 'me'
                }).execute(function(arg1, arg2) {
                  callback(JSON.parse(arg2));
                });
            """)
            assert resp['result'] == epi
            assert resp['id'] == "gapiRpc"

            # Query `people` with `{user-id}` using `.then()`
            assert epi == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.plus.people.get({
                  userId: %s
                }).then(function(response) {
                  callback(response.result);
                });
            """ % epi['id'])

            # Query `people` with `me` using fields
            resp = util.filter_dict(
                epi,
                ['kind', 'displayName', 'birthday', 'emails']
            )
            assert resp == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.plus.people.get({
                  userId: 'me',
                  fields: 'kind, displayName, birthday, emails'
                }).then(function(response) {
                  callback(response.result);
                });
            """)

            # Query `people` with `{user-id}` using fields
            resp = util.filter_dict(epi, ['gender', 'url', 'id', 'ageRange'])
            assert resp == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.plus.people.get({
                  userId: %s,
                  fields: 'gender,url,id,ageRange'
                }).execute(function(arg1, arg2) {
                  callback(arg1.result);
                });
            """ % epi['id'])

            # Verify `people` .then() body property with params
            resp = util.filter_dict(epi, ['kind', 'displayName'])
            assert resp == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.plus.people.get({
                  userId: 'me',
                  fields: 'kind, displayName'
                }).then(function(response) {
                  callback(JSON.parse(response.body));
                });
            """)

            # Query `people` with for a different user (should return empty)
            assert {} == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.plus.people.get({
                  userId: 'blah',
                  fields: 'gender,url,id,ageRange'
                }).execute(function(arg1, arg2) {
                  callback(arg1.result);
                });
            """)

            # Query `people` with for a different user (should return empty)
            assert {} == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.plus.people.get({
                  userId: 'blah',
                  fields: 'gender,url,id,ageRange'
                }).execute(function(arg1, arg2) {
                  callback(arg1.result);
                });
            """)

            ###
            # Request API
            ###

            # Verify `request().then()` response
            resp = driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'plus/v1/people/me'
                }).then(function(response) {
                  callback(response);
                });
            """)
            assert resp['result'] == epi
            verify_response(resp)

            # Verify `request().execute()` first response argument
            assert epi == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'plus/v1/people/me'
                }).execute(function(arg1, arg2) {
                  callback(arg1);
                });
            """)

            # Verify `request().execute()` second response argument
            resp = driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'plus/v1/people/me'
                }).execute(function(arg1, arg2) {
                  callback(JSON.parse(arg2));
                });
            """)
            verify_response(resp['gapiRequest']['data'])

            # Verify `request()` with callback argument -- first response arg
            assert epi == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'plus/v1/people/me',
                  callback: function(arg1, arg2) {
                    callback(arg1);
                  }
                });
            """)

            # Verify `request()` with callback argument -- second response arg
            resp = driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'plus/v1/people/me',
                  callback: function(arg1, arg2) {
                    callback(JSON.parse(arg2));
                  }
                });
            """)
            verify_response(resp['gapiRequest']['data'])

            # Query `request` with `{user-id}` using `.then()`
            assert epi == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'plus/v1/people/%s'
                }).then(function(response) {
                  callback(response.result);
                });
            """ % epi['id'])

            # Query `request` with `me` using fields in `path`
            resp = util.filter_dict(epi, ['id', 'tagline'])
            assert resp == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'plus/v1/people/me?blah=123&fields=id,tagline'
                }).then(function(response) {
                  callback(response.result);
                });
            """)

            # Query `request` with `me` using fields in `params`
            resp = util.filter_dict(epi, ['id', 'occupation', 'verified'])
            assert resp == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'plus/v1/people/me',
                  params: {'blah': 123, 'fields': 'occupation,id,verified'}
                }).then(function(response) {
                  callback(response.result);
                });
            """)

            # Query `request` with for a different user (should return empty)
            assert {} == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'plus/v1/people/blah',
                  params: {'blah': 123, 'fields': 'occupation,id,verified'}
                }).then(function(response) {
                  callback(response.result);
                });
            """)

            # Query `request` with a different API endpoint (should be empty)
            assert {} == driver.execute_async_script("""
                callback = arguments[0];
                gapi.client.request({
                  path: 'blah/endpoint/me',
                  params: {'blah': 123, 'fields': 'occupation,id,verified'}
                }).then(function(response) {
                  callback(response.result);
                });
            """)

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=5, timeout=60)
        cs.run_custom_function(check_api)
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
            if row[0].startswith('window.gapi'):
                observed_calls.add(row)
        assert observed_calls == expected_calls

    def test_noop_calls(self):
        manager_params, browser_params = self.get_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_a.html'

        expected_calls = {
            (u'window.gapi.client.Batch.execute', u'call'),
            (u'window.gapi.auth2.GoogleUser.grantOfflineAccess', u'call'),
            (u'window.gapi.auth2.GoogleUser.getAuthResponse', u'call'),
            (u'window.gapi.auth2.GoogleUser.hasGrantedScopes', u'call'),
            (u'window.gapi.auth2.GoogleAuth.grantOfflineAccess', u'call'),
            (u'window.gapi.auth2.GoogleAuth.signIn', u'call'),
            (u'window.gapi.auth2.GoogleUser.reloadAuthResponse', u'call'),
            (u'window.gapi.auth2.GoogleAuth.attachClickHandler', u'call'),
            (u'window.gapi.client.newBatch', u'call'),
            (u'window.gapi.signin2.render', u'call'),
            (u'window.gapi.auth2.GoogleUser.grant', u'call'),
            (u'window.gapi.auth2.GoogleAuth.signOut', u'call'),
            (u'window.gapi.auth2.GoogleAuth.disconnect', u'call'),
            (u'window.gapi.client.setApiKey', u'call'),
            (u'window.gapi.auth2.GoogleUser.getHostedDomain', u'call'),
            (u'window.gapi.auth2.GoogleUser.disconnect', u'call'),
            (u'window.gapi.client.Batch.add', u'call'),
            (u'window.gapi.auth2.GoogleUser.getGrantedScopes', u'call'),
            (u'window.gapi.client.Batch.then', u'call')
        }

        def call_noops(**kwargs):
            driver = kwargs['driver']
            assert driver.execute_script("""
                return window.gapi.client.setApiKey() === undefined;
            """)
            assert driver.execute_script("""
                return window.gapi.client.newBatch() === undefined;
            """)
            assert driver.execute_script("""
                return window.gapi.client.Batch.add() === undefined;
            """)
            assert driver.execute_script("""
                return window.gapi.client.Batch.then() === undefined;
            """)
            assert driver.execute_script("""
                return window.gapi.client.Batch.execute() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.GoogleAuth;
                return GoogleAuth.signIn() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.GoogleAuth;
                return GoogleAuth.signOut() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.GoogleAuth;
                return GoogleAuth.disconnect() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.GoogleAuth;
                return GoogleAuth.grantOfflineAccess() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleAuth = window.gapi.auth2.GoogleAuth;
                return GoogleAuth.attachClickHandler() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleUser = window.gapi.auth2.GoogleUser;
                return GoogleUser.getHostedDomain() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleUser = window.gapi.auth2.GoogleUser;
                return GoogleUser.getGrantedScopes() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleUser = window.gapi.auth2.GoogleUser;
                return GoogleUser.getAuthResponse() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleUser = window.gapi.auth2.GoogleUser;
                return GoogleUser.reloadAuthResponse() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleUser = window.gapi.auth2.GoogleUser;
                return GoogleUser.hasGrantedScopes() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleUser = window.gapi.auth2.GoogleUser;
                return GoogleUser.grant() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleUser = window.gapi.auth2.GoogleUser;
                return GoogleUser.grantOfflineAccess() === undefined;
            """)
            assert driver.execute_script("""
                var GoogleUser = window.gapi.auth2.GoogleUser;
                return GoogleUser.disconnect() === undefined;
            """)
            assert driver.execute_script("""
                return window.gapi.signin2.render() === undefined;
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
            if row[0].startswith('window.gapi'):
                observed_calls.add(row)
        assert expected_calls == observed_calls
