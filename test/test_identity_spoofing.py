from selenium.common.exceptions import NoSuchElementException
from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
from ..automation.utilities import db_utils
from ..automation.Commands.utils import form_utils
import utilities as util

DOM_EMAIL = 'jeromecisco@hotmail.com'
DOM_NAME = 'Jerome Cisco'
DOM_LOGIN = ['username', 'password', 'submit']
DOM_CHECKOUT = ['name', 'email', 'emailC', 'ship-address', 'ship-city',
                'ship-state', 'ship-zip', 'ship-country', 'ccname',
                'cardnumber', 'cvc', 'cc-exp', 'phone', 'submit']

COOKIES = {
    u'xxx-name': u'ChiefWiggins',
    u'xxx-email': u'chief_wiggins@hotmail.com',
    u'xxx-uid': u'36732d0b-a127-4903-83a9-482cbcb56aef'
}

IFRAME_URL = u'https://rawgit.com/englehardt/e05f7b95f4713f94a70a9c0c55bad067/raw/160a3582fafece3e3287085f9d601e5e2b649a41/blank.html'  # noqa
TOP_LEVEL_URL = u'http://localtest.me:8000/test_pages/simple_with_iframe.html'

FILL_EMAIL = "randomtestuser.1234@gmail.com"
FILL_PASSWORD = "_pa$$word123_"
CHECKOUT = {
    'email': FILL_EMAIL,
    'name': 'Random User',
    'ship-address': '123 Not A Real Street',
    'ship-city': 'New York',
    'ship-state': 'NY',
    'ship-zip': '10001',
    'ship-country': 'USA',
    'ccname':  'Random User',
    'cardnumber': '5105105105105100',
    'cvc': '123',
    'cc-exp': '08/2019',
    'phone': '123-555-0100'
}


class TestIdentitySpoofing(OpenWPMTest):
    NUM_BROWSERS = 1

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['http_instrument'] = True
        browser_params[0]['spoof_identity']['enabled'] = True
        return manager_params, browser_params

    def test_dom_and_storage_spoofing(self):
        """Verify that dom and storage spoofing functionality

        This verifies that DOM and Storage spoofing functions insert the
        correct elements into the DOM (and iframes). It also verifies that
        the honeypot form filling function works as expected."""
        manager_params, browser_params = self.get_config()
        browser_params[0]['spoof_identity']['dom_identity'] = True
        browser_params[0]['spoof_identity']['dom_checkout'] = True
        browser_params[0]['spoof_identity']['dom_login'] = True
        browser_params[0]['spoof_identity']['storage'] = True
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_with_iframe.html'

        # Verify that DOM contains identity
        def check_dom_and_storage(**kwargs):
            driver = kwargs['driver']

            def get_email():
                try:
                    elem = driver.find_element_by_xpath(
                        "//*[text()[contains(.,'@hotmail.com')]]")
                except NoSuchElementException:
                    return ''
                return elem.get_attribute('innerHTML')

            def get_name():
                try:
                    elem = driver.find_element_by_xpath(
                        "//*[text()[contains(.,'Welcome')]]")
                except NoSuchElementException:
                    return ''
                return elem.get_attribute('innerHTML')

            def get_login():
                try:
                    elem = driver.find_element_by_id("dom-login-credentials")
                except NoSuchElementException:
                    return []
                return [x.get_attribute('name') for x in
                        elem.find_elements_by_tag_name('input')]

            def get_checkout():
                try:
                    elem = driver.find_element_by_id("dom-checkout-payment")
                except NoSuchElementException:
                    return []
                return [x.get_attribute('name') for x in
                        elem.find_elements_by_tag_name('input')]

            def get_cookies():
                cookies = dict()
                for cookie in driver.get_cookies():
                    if cookie['name'] == '__cfduid':
                        continue
                    cookies[cookie['name']] = cookie['value']
                return cookies

            # Check main frame, should have both DOM and cookies
            assert get_email() == DOM_EMAIL
            assert get_login() == DOM_LOGIN
            assert get_checkout() == DOM_CHECKOUT
            assert DOM_NAME in get_name()
            assert get_cookies() == COOKIES

            # Check iframe, should have DOM but NOT cookies
            iframe = driver.find_element_by_tag_name('iframe')
            driver.switch_to_frame(iframe)
            assert get_email() == DOM_EMAIL
            assert get_login() == DOM_LOGIN
            assert get_checkout() == DOM_CHECKOUT
            assert DOM_NAME in get_name()
            assert get_cookies() == dict()

        # Verify that forms have been filled
        def check_form_filling(**kwargs):
            driver = kwargs['driver']

            def verify_spoofed_login_elements():
                form = driver.find_element_by_id('dom-login-credentials')
                elem = form.find_element_by_name('username')
                assert elem.get_attribute('value') == FILL_EMAIL

                elem = form.find_element_by_name('password')
                assert elem.get_attribute('value') == FILL_PASSWORD

            def verify_spoofed_checkout_elements():
                form = driver.find_element_by_id('dom-checkout-payment')
                elem = form.find_element_by_name('name')
                assert elem.get_attribute('value') == CHECKOUT['name']

                elem = form.find_element_by_name('email')
                assert elem.get_attribute('value') == CHECKOUT['email']

                elem = form.find_element_by_name('emailC')
                assert elem.get_attribute('value') == CHECKOUT['email']

                elem = form.find_element_by_name('ship-address')
                assert elem.get_attribute('value') == CHECKOUT['ship-address']

                elem = form.find_element_by_name('ship-city')
                assert elem.get_attribute('value') == CHECKOUT['ship-city']

                elem = form.find_element_by_name('ship-state')
                assert elem.get_attribute('value') == CHECKOUT['ship-state']

                elem = form.find_element_by_name('ship-zip')
                assert elem.get_attribute('value') == CHECKOUT['ship-zip']

                elem = form.find_element_by_name('ship-country')
                assert elem.get_attribute('value') == CHECKOUT['ship-country']

                elem = form.find_element_by_name('ccname')
                assert elem.get_attribute('value') == CHECKOUT['ccname']

                elem = form.find_element_by_name('cardnumber')
                assert elem.get_attribute('value') == CHECKOUT['cardnumber']

                elem = form.find_element_by_name('cvc')
                assert elem.get_attribute('value') == CHECKOUT['cvc']

                elem = form.find_element_by_name('cc-exp')
                assert elem.get_attribute('value') == CHECKOUT['cc-exp']

                elem = form.find_element_by_name('phone')
                assert elem.get_attribute('value') == CHECKOUT['phone']

            # Check main frame and iframe
            # All spoofed elements should be present and filled in both
            driver.switch_to_default_content()
            verify_spoofed_login_elements()
            verify_spoofed_checkout_elements()
            iframe = driver.find_element_by_tag_name('iframe')
            driver.switch_to_frame(iframe)
            verify_spoofed_login_elements()
            verify_spoofed_checkout_elements()

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=2, timeout=60)
        cs.run_custom_function(check_dom_and_storage)
        cs.run_custom_function(form_utils.fill_spoofed_elements_and_submit,
                               timeout=60)
        cs.run_custom_function(check_form_filling)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])
