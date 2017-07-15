from openwpmtest import OpenWPMTest
from ..automation.utilities.platform_utils import get_iso8601_timestamp


class TestPlatformUtils(OpenWPMTest):

    def test_get_iso8601_timestamp(self):
        for _ in xrange(100000):
            ts = get_iso8601_timestamp()
            assert ts[-1] == "Z"
            assert len(ts.split(".")[-1]) == 4


if __name__ == "__main__":
    pass
