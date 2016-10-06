import pytest
import utilities
from ..automation.platform_utils import create_xpi


@pytest.fixture(scope="session", autouse=True)
def prepare_test_setup(request):
    """Create the extension .xpi and start an HTTP server."""
    print "\nCalling create_xpi", create_xpi()
    print "\nStarting local_http_server"
    server, server_thread = utilities.start_server()

    def local_http_server_stop():
        print "\nClosing server thread..."
        server.shutdown()
        server_thread.join()

    request.addfinalizer(local_http_server_stop)
