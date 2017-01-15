import utilities
from openwpmtest import OpenWPMTest
from ..automation.utilities import db_utils
from datetime import datetime


MAX_TIMEDELTA = 30  # max time diff in seconds
CONSOLE_ERR_CLIPBOARD_TEXT = u'TypeError: window.FB.nonexistent_func is not a function\nstart_test() js_error.html:9\nonload() js_error.html:1\n1 js_error.html:9:7\n'  # noqa


class TestConsoleErrorLogging(OpenWPMTest):

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        browser_params[0]['record_js_errors'] = True
        return manager_params, browser_params

    def test_console_error_logs(self):
        utc_now = datetime.utcnow()  # OpenWPM stores timestamp in UTC time
        test_url = utilities.BASE_TEST_URL + '/js_error.html'
        db = self.visit(test_url)
        console_row = db_utils.query_db(db, "SELECT * FROM console_errors")[0]
        # Compare id, crawl_id, visit_id & script URL
        assert console_row[0:4] == (1, 1, 1, test_url)
        # The console message contains timestamp, space, followed by the text
        # we get rid of the timestamp and compare the text
        assert console_row[4].split(" ", 1)[1] == CONSOLE_ERR_CLIPBOARD_TEXT
        js_time = datetime.strptime(console_row[5], "%Y-%m-%dT%H:%M:%S.%fZ")
        # compare UTC now and the timestamp recorded at the visit
        assert (js_time - utc_now).seconds < MAX_TIMEDELTA
