import os
from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
import utilities as util

ei = {  # Expected user info
    'id': '101947710780300010678',
    'email': 'Flo.Bar.12345@gmail.com',
    'first_name': 'Florentino',
    'last_name': 'Bartholomew',
    'name': 'Florentino Bartholomew',
    'image_url': 'https://lh4.googleusercontent.com/-UqEcQyoiCHk/AAAAAAAAAAI/'
                 'AAAAAAAAAAA/AKB_U8vzhLOBmQrGyD1teSBAuB4YvWhnJA/s96-c/'
                 'photo.jpg',
}
epi = {  # Expected plus info
  "id": ei['id'],
  "kind": "plus#person",
  "objectType": "person",
  "isPlusUser": True,
  "etag": "\"qwejzoixvlmke529mc2djlONDH28/jlkj98DHHD723K01hH_Jf8\"",
  "url": "https://plus.google.com/" + ei['id'],
  "emails": [
   {
    "value": ei['email'],
    "type": "account"
   }
  ],
  "displayName": ei['name'],
  "name": {
   "familyName": ei['last_name'],
   "givenName": ei['first_name']
  },
  "nickname": "FloBar",
  "tagline": "Only the best survive",
  "aboutMe": "Find me at LLWbZxZS6C65oM7IaNGk",
  "image": {
   "url": ei['image_url'],
   "isDefault": True
  },
  "occupation": "A Student of Life",
  "gender": "male",
  "urls": [
   {
    "value": "http://LLWbZxZS6C65oM7IaNGk.com",
    "type": "other",
    "label": "The best LLWbZxZS6C65oM7IaNGk in town."
   }
  ],
  "language": "en",
  "birthday": "1980-04-01",
  "ageRange": {
   "min": 21,
   "max": 40
  },
  "organizations": [
   {
    "name": "Trump University",
    "title": "The Art of the Deal",
    "type": "school",
    "startDate": "2001",
    "endDate": "2004",
    "primary": False
   }
  ],
  "placesLived": [
   {
    "value": "Alabaster, Alabama",
    "primary": True
   },
   {
    "value": "Dayton, Louisiana"
   },
   {
    "value": "Monterey, California"
   }
  ],
  "circledByCount": 0,
  "verified": True
}

class TestGoogleAPICalls(OpenWPMTest):
    NUM_BROWSERS = 1

    def get_config(self, data_dir):
        manager_params, browser_params = TaskManager.load_default_params(
            self.NUM_BROWSERS)
        manager_params['data_directory'] = data_dir
        manager_params['log_directory'] = data_dir
        browser_params[0]['headless'] = True
        browser_params[0]['js_instrument'] = True
        manager_params['db'] = os.path.join(manager_params['data_directory'],
                                            manager_params['database_name'])
        return manager_params, browser_params

    #TODO test instrumentation monitoring with and without real SDK present

    def test_spoofed_google_api(self, tmpdir):
        """Verify that `gapi` spoofing works as expected"""
        manager_params, browser_params = self.get_config(str(tmpdir))
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_a.html'

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
        assert not util.any_command_failed(manager_params['db'])

    def test_spoofed_plus_api(self, tmpdir):
        """Verify that `gapi.client.plus` spoofing works as expected"""
        manager_params, browser_params = self.get_config(str(tmpdir))
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_a.html'

        def check_api(**kwargs):
            driver = kwargs['driver']
            #TODO

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=5, timeout=60)
        cs.run_custom_function(check_api)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not util.any_command_failed(manager_params['db'])
