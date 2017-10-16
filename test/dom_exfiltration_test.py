import pytest
import utilities
from openwpmtest import OpenWPMTest
from ..automation import TaskManager
from ..automation import CommandSequence
from ..automation.utilities import db_utils
from time import sleep
from selenium.common.exceptions import WebDriverException

DISPLAY_DATA = {
    "name": "Betty G. Forbes",
    "email": "BettyGForbes@teleworm.us",
    "emailC": "BettyGForbes@teleworm.us",
    "phone": "816-598-7768",
    "ship-address": "797 White Oak Drive",
    "ship-city": "Blue Springs",
    "ship-state": "MO",
    "ship-zip": "64015",
    "ship-country": "United States of America",
    "maiden-name": "Johns",
    "ssn": "078-05-1120",
    "birthday": "September 30, 1971",
    "username": "Evety1971",
    "password": "Ohph0Eo8aeSh",
    "website": "TrafficMoms.com",
    "profession": "Sales engineer",
    "ccname": "Betty G. Forbes",
    "cardnumber": "5221 2537 9417 5916",
    "cardnumber_lastfour": "5916",
    "cvc": "221",
    "cc-exp": "5/2022"
    }

FORM_DATA = {
    "name": "Jeff J. Ryan",
    "email": "JeffJRyan@armyspy.com",
    "emailC": "JeffJRyan@armyspy.com",
    "phone": "408-635-1896",
    "ship-address": "416 Friendship Lane",
    "ship-city": "Milpitas",
    "ship-state": "CA",
    "ship-zip": "95035",
    "ship-country": "United States of America",
    "maiden-name": "Kuhn",
    "ssn": "554-40-1120",
    "birthday": "July 5, 1977",
    "username": "Pokeed",
    "password": "ooZaegh8",
    "website": "coloursinice.com",
    "profession": "Employee relations manager",
    "ccname": "Jeff J. Ryan",
    "cardnumber": "4539 2182 6707 4391",
    "cardnumber_lastfour": "4391",
    "cvc": "520",
    "cc-exp": "6/2021"
    }


def fill_out_form(**kwargs):
    driver = kwargs['driver']
    form = driver.find_element_by_id('usrForm')
    for elem_name, elem_value in FORM_DATA.iteritems():
        # print elem_name, elem_value
        elem = form.find_element_by_name(elem_name)
        try:
            elem.click()  # move focus to the input element
        except WebDriverException:
            # Even if the element is displayed and enabled we can
            # get an "Element is not clickable at point" exception
            # since "Other element would receive the click"
            pass
        elem.clear()
        # TODO add a click
        elem.send_keys(elem_value)  # type the text
        sleep(0.3)


class TestDOMExfiltration(OpenWPMTest):
    """This is not a part of the automated test suite."""
    BASE_DOMAIN = utilities.BASE_TEST_URL + '/DOM_exfiltration_masking/'

    def get_config(self, data_dir=""):
        return self.get_test_config(data_dir)

    def run_dom_exfiltration_test(self, test_type):
        manager_params, browser_params = self.get_config()
        browser_params[0]['headless'] = False
        browser_params[0]['record_js_errors'] = True
        browser_params[0]['http_instrument'] = True
        manager = TaskManager.TaskManager(manager_params, browser_params)
        test_url = self.BASE_DOMAIN + 'index.html?test_type=%s' % test_type
        cs = CommandSequence.CommandSequence(test_url, blocking=True)
        cs.get(sleep=3, timeout=60)
        cs.run_custom_function(fill_out_form)
        manager.execute_command_sequence(cs)
        sleep(10)
        manager.close()
        assert not db_utils.any_command_failed(manager_params['db'])
        return manager_params['db']

    def test_userreplay(self):
        # don't search for leaks in these resources
        ignored_urls = [
            "%sindex.html?test_type=userreplay" % self.BASE_DOMAIN,
            "%s/shared/utils.js" % utilities.BASE_TEST_URL,
            "%suserreplay/userreplay.js" % self.BASE_DOMAIN,
            "http://localtest.me:8000/favicon.ico"]
        db = self.run_dom_exfiltration_test("userreplay")
        self.check_leaks(db, ignored_urls)

    def test_sessioncam(self):
        # don't search for leaks in these resources
        ignored_urls = [
            "%sindex.html?test_type=sessioncam" % self.BASE_DOMAIN,
            "%s/shared/utils.js" % utilities.BASE_TEST_URL,
            "%ssessioncam/sessioncam.recorder.js" % self.BASE_DOMAIN,
            "%ssessioncam/config.aspx" % self.BASE_DOMAIN,
            "http://localtest.me:8000/favicon.ico"]

        db = self.run_dom_exfiltration_test("sessioncam")
        self.check_leaks(db, ignored_urls)

    def test_skimlinks(self):
        ignored_urls = [
            "%sindex.html?test_type=skimlinks" % self.BASE_DOMAIN,
            "%s/shared/utils.js" % utilities.BASE_TEST_URL,
            "%sskimlinks/skimlinks2.js" % self.BASE_DOMAIN,
            "%sskimlinks/px.gif" % self.BASE_DOMAIN,
            "%sapi_callback=skimlinksApplyHandlers" % self.BASE_DOMAIN,
            "http://localtest.me:8000/favicon.ico",
            "http://localtest.me/api/?callback=instantDataCallback"]

        db = self.run_dom_exfiltration_test("skimlinks")
        self.check_leaks(db, ignored_urls)

    def check_leaks(self, db, ignored_urls):
        query = ("SELECT url, method, post_body FROM http_requests")
        checked_for_leaks = False  # to make sure we checked the leaks
        observed_form_leaks = set()
        observed_display_leaks = set()
        for url, method, post_body in db_utils.query_db(db, query):
            if url in ignored_urls:
                continue
            # print url, method, post_body
            checked_for_leaks = True
            # we might need to check for encodings and hashes
            # but we observed_form_leaks that the tested scripts send eveything
            # unencoded, except Yandex
            for elem_name, elem_value in FORM_DATA.iteritems():
                if (method == "POST" and elem_value in post_body) or\
                        (method == "GET" and elem_value in url):
                    # print "Found form data", elem_name, elem_value
                    observed_form_leaks.add(elem_name)

            for elem_name, elem_value in DISPLAY_DATA.iteritems():
                if (method == "POST" and elem_value in post_body) or\
                        (method == "GET" and elem_value in url):
                    # print "Found display data", elem_name, elem_value
                    observed_display_leaks.add(elem_name)

        if not checked_for_leaks:
            pytest.fail("No requests sent by the tested script")

        if observed_form_leaks == set(FORM_DATA.keys()):
            print "Form data is sent without masking"
        else:
            print "Form data is sent with masking or not sent at all"

        if observed_display_leaks == set(DISPLAY_DATA.keys()):
            print "Display data is sent without masking"
        else:
            print "Display data is sent with masking or not sent at all"

        for item in FORM_DATA.iterkeys():
            if item not in observed_form_leaks:
                print "Form data NOT sent in the clear", item, FORM_DATA[item]
            else:
                print "Form data sent in the clear", item, FORM_DATA[item]

        for item in DISPLAY_DATA.iterkeys():
            if item not in observed_display_leaks:
                print "Display data NOT sent in the clear", item, DISPLAY_DATA[item]
