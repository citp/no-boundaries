import utilities
import pytest
from time import sleep
from ..automation import TaskManager


class OpenWPMTest(object):

    def visit(self, page_url, data_dir, sleep_after=0, post_process=False):
        """Visits a given test page according to given parameters."""
        manager_params, browser_params = self.get_config(data_dir)
        manager = TaskManager.TaskManager(manager_params, browser_params)
        if not page_url.startswith("http"):
            page_url = utilities.BASE_TEST_URL + page_url
        manager.get(page_url)
        sleep(sleep_after)
        manager.close(post_process)
        return manager_params['db']
