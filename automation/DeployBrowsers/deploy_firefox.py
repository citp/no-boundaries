from ..MPLogger import loggingclient
from ..Commands.profile_commands import load_profile
import configure_firefox

from selenium.webdriver.firefox.firefox_binary import FirefoxBinary
from selenium import webdriver

from pyvirtualdisplay import Display
import shutil
import os
import random


class MyFirefoxProfile(webdriver.FirefoxProfile):
    # We subclass FirefoxProfile to be able to overwrite the frozen prefs.
    # https://github.com/SeleniumHQ/selenium/blob/7c97c37525d561e2963e86265c1b664456c0c86e/py/selenium/webdriver/firefox/firefox_profile.py#L84
    def set_preference(self, key, value, force=False):
        """
        Set the preference that we want in the profile.

        Overwrite the frozen prefs if force param is True.
        https://github.com/SeleniumHQ/selenium/blob/75b9300def2854cb1ab01bab6a15206b665da5ad/javascript/firefox-driver/webdriver.json#L2  # noqa
        """
        self.default_preferences[key] = value
        # the code we add is below
        if force:
            self.DEFAULT_PREFERENCES['frozen'][key] = value


DEFAULT_SCREEN_RES = (1366, 768)  # Default screen res when no preferences are given

def deploy_firefox(status_queue, browser_params, manager_params, crash_recovery):
    """ launches a firefox instance with parameters set by the input dictionary """
    root_dir = os.path.dirname(__file__)  # directory of this file
    logger = loggingclient(*manager_params['logger_address'])

    display_pid = None
    display_port = None
    # fp = webdriver.FirefoxProfile()
    fp = MyFirefoxProfile()

    browser_profile_path = fp.path + '/'
    status_queue.put(('STATUS','Profile Created',browser_profile_path))

    profile_settings = None  # Imported browser settings
    if browser_params['profile_tar'] and not crash_recovery:
        logger.debug("BROWSER %i: Loading initial browser profile from: %s" % (browser_params['crawl_id'], browser_params['profile_tar']))
        profile_settings = load_profile(browser_profile_path, manager_params, browser_params,
                                        browser_params['profile_tar'],
                                        load_flash=browser_params['disable_flash'] is False)
    elif browser_params['profile_tar']:
        logger.debug("BROWSER %i: Loading recovered browser profile from: %s" % (browser_params['crawl_id'], browser_params['profile_tar']))
        profile_settings = load_profile(browser_profile_path, manager_params, browser_params,
                                        browser_params['profile_tar'])
    status_queue.put(('STATUS','Profile Tar',None))

    if browser_params['random_attributes'] and profile_settings is None:
        logger.debug("BROWSER %i: Loading random attributes for browser" % browser_params['crawl_id'])
        profile_settings = dict()

        # choose a random screen-res from list
        resolutions = list()
        with open(os.path.join(root_dir, 'screen_resolutions.txt'), 'r') as f:
            for line in f:
                resolutions.append(tuple(line.strip().split(',')))
        profile_settings['screen_res'] = random.choice(resolutions)

        # set a random user agent from list
        ua_strings = list()
        with open(os.path.join(root_dir, 'user_agent_strings.txt'), 'r') as f:
            for line in f:
                ua_strings.append(line.strip())
        profile_settings['ua_string'] = random.choice(ua_strings)

    # If profile settings still not set - set defaults
    if profile_settings is None:
        profile_settings = dict()
        profile_settings['screen_res'] = DEFAULT_SCREEN_RES
        profile_settings['ua_string'] = None

    if profile_settings['ua_string'] is not None:
        logger.debug("BROWSER %i: Overriding user agent string with the following: %s" % (browser_params['crawl_id'], profile_settings['ua_string']))
        fp.set_preference("general.useragent.override", profile_settings['ua_string'])

    if browser_params['headless']:
        display = Display(visible=0, size=profile_settings['screen_res'])
        display.start()
        display_pid = display.pid
        display_port = display.cmd_param[5][1:]
    status_queue.put(('STATUS','Display',(display_pid, display_port)))

    if browser_params['debugging']:
        firebug_loc = os.path.join(root_dir, 'firefox_extensions/firebug-1.11.0.xpi')
        fp.add_extension(extension=firebug_loc)
        fp.set_preference("extensions.firebug.currentVersion", "1.11.0")  # Avoid startup screen

    if browser_params['extension']['enabled']:
        ext_loc = os.path.join(root_dir + "/../", 'Extension/firefox/@openwpm-0.0.1.xpi')
        ext_loc = os.path.normpath(ext_loc)
        fp.add_extension(extension=ext_loc)
        with open(browser_profile_path + 'database_settings.txt', 'w') as f:
            host, port = manager_params['aggregator_address']
            crawl_id = browser_params['crawl_id']
            f.write(host + ',' + str(port) + ',' + str(crawl_id))
            f.write(','+str(browser_params['extension']['cookieInstrument']))
            f.write(','+str(browser_params['extension']['jsInstrument']))
            f.write(','+str(browser_params['extension']['cpInstrument']))
        logger.debug("BROWSER %i: OpenWPM Firefox extension loaded" % browser_params['crawl_id'])

    if browser_params['proxy']:
        PROXY_HOST = "localhost"
        PROXY_PORT = browser_params['proxy']

        # Direct = 0, Manual = 1, PAC = 2, AUTODETECT = 4, SYSTEM = 5
        fp.set_preference("network.proxy.type", 1)
        fp.set_preference("network.proxy.http", PROXY_HOST)
        fp.set_preference("network.proxy.http_port", PROXY_PORT)
        fp.set_preference("network.proxy.ssl", PROXY_HOST)  # https sites
        fp.set_preference("network.proxy.ssl_port", PROXY_PORT)

        # set this to exclude sites from using proxy
        # http://kb.mozillazine.org/Network.proxy.no_proxies_on
        fp.set_preference("network.proxy.no_proxies_on", "")

        # copy the dbs into temp profile
        # these were created by manually adding the cert to
        # a previous tmp selenium profile
        shutil.copy(os.path.join(root_dir + "/../", 'Proxy/key3.db'), fp.path + '/key3.db')
        shutil.copy(os.path.join(root_dir + "/../", 'Proxy/cert8.db'), fp.path + '/cert8.db')

    # Disable flash
    if browser_params['disable_flash']:
        fp.set_preference('plugin.state.flash', 0)

    # Configure privacy settings
    configure_firefox.privacy(browser_params, fp, root_dir, browser_profile_path)

    configure_firefox.custom_prefs(fp, browser_params)
    # Set various prefs to improve speed and eliminate traffic to Mozilla
    configure_firefox.optimize_prefs(fp)

    # Launch the webdriver
    status_queue.put(('STATUS','Launch Attempted',None))
    fb = FirefoxBinary(root_dir  + "/../../firefox-bin/firefox")
    driver = webdriver.Firefox(firefox_profile=fp, firefox_binary=fb)
    status_queue.put(('STATUS','Browser Launched',(int(driver.binary.process.pid), profile_settings)))

    # set window size
    driver.set_window_size(*profile_settings['screen_res'])

    return driver, browser_profile_path, profile_settings
