import pytest
import utilities
import commands
import socket


def create_xpi():
    """Creates a new xpi using jpm."""
    cmd_cd = "cd ../automation/Extension/firefox/"
    cmd_jpm = "jpm xpi"
    print commands.getstatusoutput("%s && %s" % (cmd_cd, cmd_jpm))


def is_port_open(port_no):
    port_status = False
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = s.connect_ex(('127.0.0.1', port_no))
    if result == 0:
        port_status = True
    s.close()
    return port_status


@pytest.fixture(scope="session", autouse=True)
def prepare_test_setup(request):
    """Run an HTTP server during the tests."""
    server, server_thread = None, None
    create_xpi()
    if not is_port_open(utilities.LOCAL_WEBSERVER_PORT):
        try:
            server, server_thread = utilities.start_server()
        except:
            print "\nException while starting local_http_server"

    def local_http_server_stop():
        print "\nClosing server thread..."
        if server:
            server.shutdown()
        if server_thread:
            server_thread.join()

    request.addfinalizer(local_http_server_stop)
