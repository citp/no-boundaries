from selenium.common.exceptions import NoSuchElementException
from openwpmtest import OpenWPMTest
from ..automation import TaskManager, CommandSequence
from ..automation.utilities import db_utils
from ..automation.Commands.utils import form_utils
import utilities as util


SESSION_REPLAY_TEST_PAGE = '/session_replay.html'
SESSION_REPLAY_TEST_PAGE = util.BASE_TEST_URL + SESSION_REPLAY_TEST_PAGE

EXPECTED_CALLS = [
    (SESSION_REPLAY_TEST_PAGE, "document.documentElement.innerHTML", "get"),
    (SESSION_REPLAY_TEST_PAGE, "document.documentElement.outerHTML", "get"),
    (SESSION_REPLAY_TEST_PAGE, "document.documentElement.innerText", "get"),
    (SESSION_REPLAY_TEST_PAGE, "document.documentElement.textContent", "get"),
    (SESSION_REPLAY_TEST_PAGE, "HTMLBodyElement.innerHTML", "get"),
    (SESSION_REPLAY_TEST_PAGE, "HTMLBodyElement.outerHTML", "get"),
    (SESSION_REPLAY_TEST_PAGE, "HTMLBodyElement.innerText", "get"),
    (SESSION_REPLAY_TEST_PAGE, "HTMLBodyElement.textContent", "get"),
    (SESSION_REPLAY_TEST_PAGE, "document.documentElement.innerHTML", "get"),
    (SESSION_REPLAY_TEST_PAGE, "document.documentElement.outerHTML", "get"),
    (SESSION_REPLAY_TEST_PAGE, "document.documentElement.innerText", "get"),
    (SESSION_REPLAY_TEST_PAGE, "document.documentElement.textContent", "get")
    ]


class TestDOMChunkInjection(OpenWPMTest):
    NUM_BROWSERS = 1

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['http_instrument'] = True
        browser_params[0]['spoof_identity']['enabled'] = True
        browser_params[0]['spoof_identity']['dom_chunk'] = True

        return manager_params, browser_params

    def test_capture_dom(self):
        """ Ensure we instrument the DOM capturing calls."""
        db = self.visit(SESSION_REPLAY_TEST_PAGE)
        rows = db_utils.get_javascript_entries(db)

        observed_calls = []
        for script_url, symbol, operation, _, _ in rows:
            observed_calls.append((script_url, symbol, operation))
        assert observed_calls == EXPECTED_CALLS

    def test_dom_injection(self):
        """Verify that dom injection functionality

        This verifies that we inject the DOM chunk into the main page only,
        not into the iframes."""
        manager_params, browser_params = self.get_config()
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = util.BASE_TEST_URL + '/simple_with_iframe.html'

        # Verify that DOM contains the injected chunk but nothing else
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

            def get_chunk():
                try:
                    chunk_id = "injected-for-research-purposes-contact-at-webtap.princeton.edu"  # noqa
                    el = driver.find_element_by_id(chunk_id)
                    return el.text
                except NoSuchElementException:
                    return ""

            # Check main frame, should have both DOM and cookies
            assert len(get_chunk()) == 500000
            assert get_email() == ''
            assert get_login() == []
            assert get_checkout() == []
            assert get_name() == ''
            assert get_cookies() == {}

            # Check iframe, shouldn't have anything
            iframe = driver.find_element_by_tag_name('iframe')
            driver.switch_to_frame(iframe)
            assert len(get_chunk()) == 0
            assert get_email() == ''
            assert get_login() == []
            assert get_checkout() == []
            assert get_name() == ''
            assert get_cookies() == {}

        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=2, timeout=60)
        cs.run_custom_function(check_dom_and_storage)
        manager.execute_command_sequence(cs)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])
