import os
from openwpmtest import OpenWPMTest
from ..automation import TaskManager
import utilities
import expected


class TestDOMInstrumentation(OpenWPMTest):

    def get_config(self, data_dir=""):
        manager_params, browser_params = self.get_test_config(data_dir)
        browser_params[0]['js_instrument'] = True
        return manager_params, browser_params

    def test_dom_modification_events(self):
        """Check if we can detect element insertions and modifications"""
        test_url = os.path.join(utilities.BASE_TEST_URL,'dom_modification.html')
        db = self.visit(test_url, sleep_after=5)

        # check element insertions
        rows = utilities.query_db(db,
                ("SELECT v.site_url, f.script_url, f.is_visible,"
                 " f.node_path, f.element_type"
                 " FROM inserted_elements AS f LEFT JOIN site_visits as v"
                 " ON f.visit_id = v.visit_id"
                 " WHERE guid NOT NULL AND guid != ''"))
        assert set(rows) == expected.inserted_elements

        # check element modifications
        rows = utilities.query_db(db,
                ("SELECT v.site_url, f.script_url, f.node_path,"
                 " f.element_type, f.attribute, f.prev_value, f.new_value"
                 " FROM modified_elements AS f LEFT JOIN site_visits as v"
                 " ON f.visit_id = v.visit_id"
                 " WHERE guid NOT NULL AND guid != ''"))
        assert set(rows) == expected.modified_elements
