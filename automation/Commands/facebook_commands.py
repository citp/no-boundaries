from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoSuchWindowException
from selenium.common.exceptions import StaleElementReferenceException
from selenium.common.exceptions import ElementNotVisibleException
from selenium.common.exceptions import WebDriverException
import time
import re
from utils import XPathUtil as xp
from utils import webdriver_extensions as wd_ext
from ..MPLogger import loggingclient
from ..SocketInterface import clientsocket

FB_USERNAME = 'KattyOzo@hotmail.com'
FB_PASSWORD = 'ucJQgYNS'


def find_login(driver, url, logger, browser_params):
    """Find all login options on each iframe and try to execute login"""
    # Item may be in an iframe
    try:
        iframes = driver.find_elements_by_tag_name('iframe')
    except NoSuchElementException:
        iframes = []

    logger.info("BROWSER %i: [Login Finding] iFrames to look through: %d" % (
        browser_params['crawl_id'], len(iframes)))

    # Loop through frames looking for login buttons to click
    success = False
    connect_success = False
    fblogin_reached = False
    for i in range(0, len(iframes)+1):
        if i > 0:  # check main page first (i=0)
            try:
                driver.switch_to_default_content()
                driver.switch_to_frame(iframes[i-1])
                time.sleep(1)
            except StaleElementReferenceException:
                logger.error("BROWSER %i: [Login Finding] Page must have "
                             "changed since last visited. Possible successful "
                             "login." % (
                                 browser_params['crawl_id']))
                break

        targets = []

        def find_targets(selector):
            try:
                targets.extend(driver.find_elements_by_xpath(selector))
            except NoSuchElementException:
                logger.error("BROWSER %i: [Login Finding] Illegal query with "
                             "%s" % (browser_params['crawl_id'], selector))

        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'sign*in with facebook'))
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'log*in with facebook'))
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'log*in'))
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'log*in'))
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'sign*in'))
        find_targets("//*[text()[contains(" + xp.xp1_lowercase(".") +
                     ",'sign in')]]")
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'sign*up'))
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'create*account'))
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'create an*account'))
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'join*now'))
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'register*now'))
        find_targets('//*' + xp.xp1_wildcard(xp.xp1_lowercase('text()'),
                                             'register an*account'))

        logger.info(
            "BROWSER %i: [Login Finding] Targets on this iFrame: %d" % (
                browser_params['crawl_id'], len(targets))
        )

        for element in targets:
            wd_ext.move_to_element(driver, element)
            try:
                # Click element and wait to load
                element.click()
                logger.info("BROWSER %i: [Login Finding] Clicking %s" % (
                    browser_params['crawl_id'], element))
                time.sleep(6)

                # Search for Facebook Login
                logger.info("BROWSER %i: [Login Finding] Trying to find "
                            "Facebook button." % browser_params['crawl_id'])
                connect_success, fblogin_reached = find_connect(
                    driver, logger, browser_params)
                time.sleep(5)

                # Confirm Facebook Login
                fb_api_confirm = check_FB_API(driver)
                logger.info("BROWSER %i: [Login Finding] Target %s success? "
                            "%s" % (browser_params["crawl_id"], element,
                                    connect_success))

                # Check success status
                success = fb_api_confirm or connect_success or fblogin_reached
                if success:
                    logger.info(
                        "BROWSER %i: [Login Finding] Returning to main page. "
                        "Login confirmed with FB API? %s" % (
                            browser_params['crawl_id'], str(fb_api_confirm)))
                    break
                else:
                    # TODO Targets may be stale or page may have changed with
                    #      the click!
                    logger.info("BROWSER %i: [Login Finding] Returning to "
                                "main page to try another click" % (
                                    browser_params['crawl_id']))
            except ElementNotVisibleException:
                logger.warning("BROWSER %i: [Login Finding] Can't click "
                               "target %s" % (browser_params['crawl_id'],
                                              element))
            except StaleElementReferenceException:
                logger.info("BROWSER %i: [Login Finding] Page must have "
                            "changed since last visited." % (
                                browser_params['crawl_id']))
                break

        # No need to check other frames if successful
        if success:
            break
    return connect_success, fblogin_reached


def check_FB_API(driver):
    try:
        auth_response = driver.execute_async_script("""
                    callback = arguments[0];
                    window.FB.getLoginStatus(function(response) {
                        callback(response);
                    });
                """)
        if auth_response['status'] == 'connected':
            return True
    except WebDriverException:
        return False
    return False


def permissions(driver, logger, browser_params):
    # read permissions
    res = driver.find_element_by_name('read')
    read_permissions = res.get_attribute('value')
    read_permissions = re.split(',', read_permissions)

    # write permissions
    res = driver.find_element_by_name('write')
    write_permissions = res.get_attribute('value')
    write_permissions = re.split(',', write_permissions)

    # display read permissions
    out_str = "BROWSER %i: Read permissions:\n" % browser_params['crawl_id']
    for item in read_permissions:
        if item != '':
            out_str += item + '\n'
    logger.info(out_str)

    # display write permissions
    out_str = "BROWSER %i: Write permissions:\n" % browser_params['crawl_id']
    for item in write_permissions:
        if item != '':
            out_str += item + '\n'
    logger.info(out_str)


def authorize_connect(driver, is_window, logger, browser_params,
                      save_permissions=False):
    # Return early if not on fb login page
    if "facebook.com/login.php" not in driver.current_url:
        return False, False
    try:
        # Check that we are logged into facebook
        try:
            form = driver.find_element_by_id('email')
            form.send_keys(FB_USERNAME)

            form = driver.find_element_by_id('pass')
            form.send_keys(FB_PASSWORD)

            bttn = driver.find_element_by_name('login')
            bttn.click()
            # Confirm facebook connect
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                if save_permissions:
                    permissions(driver, logger, browser_params)
                logger.info("BROWSER %i: [Authorize] Clicking %s" % (
                    browser_params['crawl_id'], r.text))
                r.click()
                time.sleep(3)
            except NoSuchElementException:
                if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                    logger.info("BROWSER %i: [Authorize] Redirect back to site"
                                "--no permissions needed" % (
                                    browser_params['crawl_id']))
                else:
                    logger.info("BROWSER %i: [Authorize] Redirect back to "
                                "site" % browser_params['crawl_id'])

            # Additional Permissions
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                logger.info("BROWSER %i: [Authorize] Clicking %s" % (
                    browser_params['crawl_id'], r.text))
                r.click()
                time.sleep(3)
            except NoSuchElementException:
                if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                    logger.info("BROWSER %i: [Authorize] Redirect back to site"
                                "--no permissions needed" % (
                                    browser_params['crawl_id']))
                else:
                    logger.info("BROWSER %i: [Authorize] Redirect back to "
                                "site" % browser_params['crawl_id'])
            return True, True
        except NoSuchElementException:
            # no form - check if only permissions needed or if a failure
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                if save_permissions:
                    permissions(driver, logger, browser_params)
                logger.info("BROWSER %i: [Authorize] Clicking %s" % (
                    browser_params['crawl_id'], r.text))
                r.click()
            except NoSuchElementException:
                return False, True

            # Additional Permissions
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                logger.info("BROWSER %i: [Authorize] Clicking %s" % (
                    browser_params['crawl_id'], r.text))
                r.click()
            except NoSuchElementException:
                if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                    logger.info("BROWSER %i: [Authorize] Redirect back to site"
                                "--no permissions needed" % (
                                    browser_params['crawl_id']))
                else:
                    logger.info("BROWSER %i: [Authorize] Redirect back to "
                                "site" % browser_params['crawl_id'])
            return True, True
    except NoSuchWindowException:  # Already connected
        logger.info("BROWSER %i: [Authorize] Facebook connect window "
                    "closed..." % browser_params['crawl_id'])
        return True, True


def find_connect(driver, logger, browser_params, save_permissions=False):
    # Current state of the driver
    handles = driver.window_handles
    main_handle = driver.current_window_handle

    time.sleep(2.5)

    # First check if any of the current windows are the connect page
    initwindowHandle = driver.current_window_handle
    for handle in driver.window_handles:
        try:
            driver.switch_to_window(handle)
            if "facebook.com/login.php" in driver.current_url:
                connected, fblogin_reached = authorize_connect(
                    driver, False, logger, browser_params,
                    save_permissions=save_permissions
                )
                return connected, fblogin_reached
        except:
            pass
    driver.switch_to_window(initwindowHandle)

    # Next check main page and all iframes for Facebook Login button
    try:
        iframes = driver.find_elements_by_tag_name('iframe')
    except NoSuchElementException:
        iframes = []
    logger.info("BROWSER %i: [Connect Finding] Potential iFrames to look "
                "through: %d" % (browser_params['crawl_id'], len(iframes)))

    for i in range(0, len(iframes)+1):
        if i > 0:  # check main page first (i=0)
            try:
                driver.switch_to_default_content()
                driver.switch_to_frame(iframes[i-1])
                time.sleep(1)
            except StaleElementReferenceException:
                break

        targets = []

        def do_search(selector, targets):
            try:
                targets.extend(driver.find_elements_by_xpath(selector))
            except NoSuchElementException:
                logger.error("BROWSER %i: [Connect Finding] Illegal query with"
                             " %s" % (browser_params['crawl_id'], selector))

        do_search("//button[contains(@class, 'facebook')]", targets)
        do_search("//button[contains(@class, 'Facebook')]", targets)
        do_search("//button[contains(@title, 'facebook')]", targets)
        do_search("//button[contains(@title, 'Facebook')]", targets)
        do_search("//a[contains(@title, 'facebook')]", targets)
        do_search("//a[contains(@title, 'Facebook')]", targets)
        do_search("//a[contains(@id, 'facebook')]", targets)
        do_search("//a[contains(@id, 'Facebook')]", targets)
        do_search("//a[contains(@href, 'facebook')]", targets)
        do_search("//a[contains(@href, 'Facebook')]", targets)
        do_search("//a[contains(@class, 'Facebook')]", targets)
        do_search("//a[contains(@class, 'facebook')]", targets)
        do_search("//button[contains(@id, 'facebook')]", targets)
        do_search("//button[contains(@id, 'Facebook')]", targets)
        do_search("//button[contains(@class, 'fb-login')]", targets)
        do_search("//div[contains(@class, 'fb-login')]", targets)
        do_search("//input[contains(@class, 'facebook')]", targets)
        do_search("//input[contains(@class, 'Facebook')]", targets)

        logger.info("BROWSER %i: [Connect Finding] Facebook Button Targets: "
                    "%d" % (browser_params['crawl_id'], len(targets)))

        # Try to click each element found
        for element in targets:
            try:
                wd_ext.move_to_element(driver, element)  # hover
                element.click()
                logger.info(
                    "BROWSER %i: [Connect Finding] Clicked a potential "
                    "Facebook login button found on %s\n" % (
                        browser_params['crawl_id'], driver.current_url)
                )
            except ElementNotVisibleException:
                logger.warning("BROWSER %i: [Connect Finding] Can't click "
                               "target %s" % (browser_params['crawl_id'],
                                              element))
                continue
            except WebDriverException:
                logger.warning("BROWSER %i: [Connect Finding] Can't click "
                               "target %s" % (browser_params['crawl_id'],
                                              element))
                continue
            except StaleElementReferenceException:
                continue

            time.sleep(4)
            new_windows = set(driver.window_handles) - set(handles)
            for window in new_windows:
                driver.switch_to_window(window)
                if "facebook.com/login.php" not in driver.current_url:
                    driver.close()
                    driver.switch_to_window(main_handle)
                    continue
                logger.info(
                    "BROWSER %i: [Connect Finding] Trying to login via pop up "
                    "windows" % browser_params['crawl_id']
                )
                connected, fblogin_reached = authorize_connect(
                    driver, True, logger, browser_params,
                    save_permissions=save_permissions
                )
                driver.switch_to_window(main_handle)
                if connected or fblogin_reached:
                    return connected, fblogin_reached

            # If no pop-ups, Facebook connect window may be the main page
            if len(new_windows) == 0:
                logger.info(
                    "BROWSER %i: [Connect Finding] Trying to login via main "
                    "window" % (browser_params['crawl_id']))
                connected, fblogin_reached = authorize_connect(
                    driver, False, logger, browser_params,
                    save_permissions=save_permissions
                )
                if connected or fblogin_reached:
                    return connected, fblogin_reached

    return False, False


def facebook_login(driver, url, visit_id, manager_params, browser_params):
    initwindowHandle = driver.current_window_handle

    # Connect to database and logger
    logger = loggingclient(*manager_params['logger_address'])
    sock = clientsocket()
    sock.connect(*manager_params['aggregator_address'])

    # First search for generic "Log In" page
    # This will also match "Log in with Facebook" on the homepage
    connect_success, fblogin_reached = find_login(driver, url, logger,
                                                  browser_params)

    # If generic "Log In" page fails, do a full Facebook search on homepage
    if not connect_success:
        try:
            driver.switch_to_default_content()
        except StaleElementReferenceException:
            logger.error("BROWSER %i: Tried and failed to switch to main "
                         "iframe for this site" % browser_params['crawl_id'])
        try:
            driver.get(url)
            time.sleep(2)
        except NoSuchWindowException:
            pass
        connect_success, fblogin_reached = find_connect(driver, logger,
                                                        browser_params)

    # Confirm FB API status
    try:
        driver.switch_to_default_content()
    except StaleElementReferenceException:
        logger.error("BROWSER %i: Tried and failed to switch to main "
                     "iframe for this site" % browser_params['crawl_id'])
    fb_api_confirm = check_FB_API(driver)

    # Save success result to database
    query = ("INSERT INTO fb_login (crawl_id, visit_id, connect_page_found, "
             "connect_successful, fb_api_verified) VALUES (?,?,?,?,?)",
             (browser_params['crawl_id'], visit_id, fblogin_reached,
              connect_success, fb_api_confirm))
    sock.send(query)

    # close other window handles
    for handle in driver.window_handles:
        try:
            if handle == initwindowHandle:
                continue
            driver.switch_to_window(handle)
            driver.close()
        except:
            pass
    driver.switch_to_window(initwindowHandle)
