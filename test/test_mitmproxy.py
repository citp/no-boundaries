import pytest
from ..automation.utilities.db_utils import query_db
from openwpmtest import OpenWPMTest


class TestMITMProxy(OpenWPMTest):

    def get_config(self, data_dir):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['proxy'] = True
        browser_params[0]['js_instrument'] = True
        return manager_params, browser_params

    def assert_request_and_responses(self, db, test_url):
        HTTP_STATUS_OK = 200
        request_url_rows = query_db(db, "SELECT url FROM http_requests_proxy")
        response_url_rows = query_db(db, "SELECT url, response_status FROM"
                                     " http_responses_proxy")
        request_urls = [row[0] for row in request_url_rows]
        assert test_url in request_urls
        response_urls = [row[0] for row in response_url_rows]
        response_statuses = [row[1] for row in response_url_rows]
        assert test_url in response_urls
        assert HTTP_STATUS_OK in response_statuses

    @pytest.mark.xfail(reason="citp/OpenWPM/issues/53")
    def test_https_connection(self):
        """Make sure mitmproxy allows connections to HTTPS sites.

        See, https://github.com/citp/OpenWPM/issues/53

        No request and response stored in the database
        if we get a `ssl_error_rx_record_too_long` error.
        """
        # We shouldn't use sites with preloaded public keys in this test
        # (e.g. google.com). Otherwise, test would pass even there's a
        # problem with the mitmproxy certificate.
        # https://dxr.mozilla.org/mozilla-central/source/security/manager/ssl/StaticHPKPins.h#697  # noqa
        test_url = "https://httpbin.org/"  # we use this site in the tests

        db = self.visit(test_url)
        self.assert_request_and_responses(db, test_url)
