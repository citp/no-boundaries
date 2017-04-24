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

# FB_USERNAME = 'jeffjohnson12345@outlook.com'
# FB_PASSWORD = 'Corndawg!'
FB_USERNAME = 'jessjohnson12345@outlook.com'
FB_PASSWORD = 'C2Au2RPSETuwKeLU'


def find_login(driver, url, logger, browser_params):
    """Find all login options on each iframe and try to execute login"""
    # Item may be in an iframe
    try:
        iframes = driver.find_elements_by_tag_name('iframe')
    except NoSuchElementException:
        iframes = []

    logger.info("BROWSER %i: Potential iFrames to look through: %d" % (
        browser_params['crawl_id'], len(iframes)))

    # Loop through frames looking for login buttons to click
    success = False
    for i in range(0, len(iframes)+1):
        if i > 0:  # check main page first (i=0)
            try:
                driver.switch_to_default_content()
                driver.switch_to_frame(iframes[i-1])
                time.sleep(1)
            except StaleElementReferenceException:
                logger.error("BROWSER %i: Page must have changed since last "
                             "visited. Possible successful login" % (
                                 browser_params['crawl_id']))
                break

        targets = []

        def find_targets(selector):
            try:
                targets.extend(driver.find_elements_by_xpath(selector))
            except NoSuchElementException:
                logger.error("BROWSER %i: Illegal query with %s" % (
                    browser_params['crawl_id'], selector))

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
            "BROWSER %i: Potential Login Targets on this iFrame: %d" % (
                browser_params['crawl_id'], len(targets))
        )

        for element in targets:
            wd_ext.move_to_element(driver, element)
            try:
                element.click()
                logger.info("BROWSER %i: Trying to click login now" % (
                    browser_params['crawl_id']))
                time.sleep(6)

                logger.info("BROWSER %i: Trying to find Facebook button "
                            "now." % browser_params['crawl_id'])
                # try to find a facebook button on this login page
                connect_success, stop_searching = find_connect(
                    driver, logger, browser_params)
                time.sleep(5)
                fb_api_confirm = check_FB_API(driver)
                if fb_api_confirm is True:
                    connect_success = True
                logger.info("BROWSER %i: Login with Facebook with Login "
                            "Target %s? %s." % (
                                browser_params["crawl_id"], element,
                                connect_success))
                if connect_success:
                    try:
                        driver.get(url)
                    except NoSuchWindowException:
                        pass
                    success = True
                    logger.info(
                        "BROWSER %i: Returning to main page. Login confirmed "
                        "with FB API? %s" % (
                            browser_params['crawl_id'], str(fb_api_confirm)))
                    break
                elif stop_searching:
                    try:
                        driver.get(url)
                    except NoSuchWindowException:
                        pass
                    # TODO probably don't want to print success here and
                    # keep searching with other targets
                    success = True
                    logger.info(
                        "BROWSER %i: Returning to main page, reached an FB "
                        "login page. FB.API? %s" % (
                            browser_params['crawl_id'], str(fb_api_confirm)))
                else:
                    try:
                        driver.get(url)
                    except NoSuchWindowException:
                        pass
                    # TODO other targets stale after page reload?
                    logger.info("BROWSER %i: Returning to main page to "
                                "try another login on this iFrame" % (
                                    browser_params['crawl_id']))
            except ElementNotVisibleException:
                logger.warning("BROWSER %i: Can't click target %s" % (
                    browser_params['crawl_id'], element))
            except StaleElementReferenceException:
                logger.info("BROWSER %i: Page must have changed since "
                            "last visited. Possible successful login." % (
                                browser_params['crawl_id']))
                break

        # No need to check other frames if successful
        if success:
            break
    return success


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
    # if button click immediately logs us & api is connected, return true

    stop_searching = False
    current_url = driver.current_url
    stop_searching = "facebook" in current_url
    if check_FB_API(driver) is True:
        return True, stop_searching
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
                if r.text != 'Okay':
                    logger.warning("BROWSER %i: This should say 'Okay', let's"
                                   " click it anyway" % (
                                       browser_params['crawl_id']))
                logger.info("BROWSER %i: Clicking %s" % (
                    browser_params['crawl_id'], r.text))
                r.click()
            except NoSuchElementException:
                # if we clicked facbeook URL right away
                if "facebook" not in current_url:
                    logger.info("BROWSER %i: Likely filled out wrong form." % (
                        browser_params['crawl_id']))
                    return False, stop_searching
                if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                    logger.info("BROWSER %i: Redirect back to site - "
                                "no permissions needed" % (
                                    browser_params['crawl_id']))
                else:
                    logger.info("BROWSER %i: Redirect back to site" % (
                        browser_params['crawl_id']))

            # Additional Permissions
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                if r.text != 'Okay':
                    logger.warning("BROWSER %i: This should say 'Okay', let's"
                                   " click it anyway" % (
                                       browser_params['crawl_id']))
                logger.info("BROWSER %i: Clicking %s" % (
                    browser_params['crawl_id'], r.text))
                r.click()
            except NoSuchElementException:
                if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                    logger.info("BROWSER %i: Redirect back to site - "
                                "no permissions needed" % (
                                    browser_params['crawl_id']))
                else:
                    logger.info("BROWSER %i: Redirect back to site" % (
                        browser_params['crawl_id']))
            return True, stop_searching
        except NoSuchElementException:
            # no form - check if only permissions needed or if a failure
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                if save_permissions:
                    permissions(driver, logger, browser_params)
                if r.text != 'Okay':
                    logger.warning("BROWSER %i: This should say 'Okay', let's"
                                   " click it anyway" % (
                                       browser_params['crawl_id']))
                logger.info("BROWSER %i: Clicking %s" % (
                    browser_params['crawl_id'], r.text))
                r.click()
            except NoSuchElementException:
                return False, stop_searching

            # Additional Permissions
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                if r.text != 'Okay':
                    logger.warning("BROWSER %i: This should say 'Okay', let's"
                                   " click it anyway" % (
                                       browser_params['crawl_id']))
                logger.info("BROWSER %i: Clicking %s" % (
                    browser_params['crawl_id'], r.text))
                r.click()
            except NoSuchElementException:
                if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                    logger.info("BROWSER %i: Redirect back to site - "
                                "no permissions needed" % (
                                    browser_params['crawl_id']))
                else:
                    logger.info("BROWSER %i: Redirect back to site" % (
                        browser_params['crawl_id']))
            return True, stop_searching
    except NoSuchWindowException:  # Already connected
        logger.info("BROWSER %i: Facebook connect window closed..." % (
            browser_params['crawl_id']))
        return True, stop_searching


def find_connect(driver, logger, browser_params, save_permissions=False):
    # Current state of the driver
    handles = driver.window_handles
    main_handle = driver.current_window_handle

    time.sleep(2.5)

    # First check if the "Log In" button we clicked led to Facebook Login
    initwindowHandle = driver.current_window_handle
    for handle in driver.window_handles:
        try:
            driver.switch_to_window(handle)
            if "facebook.com/login.php" in driver.current_url:
                connected, stop_searching = authorize_connect(
                    driver, False, logger, browser_params,
                    save_permissions=save_permissions
                )
                return connected, stop_searching
        except:
            pass
    driver.switch_to_window(initwindowHandle)

    # Next check main page and all iframes for Facebook Login button
    try:
        iframes = driver.find_elements_by_tag_name('iframe')
    except NoSuchElementException:
        iframes = []
    logger.info("BROWSER %i: Potential iFrames to look through: %d" % (
        browser_params['crawl_id'], len(iframes)))

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
                logger.error("BROWSER %i: Illegal query with %s" % (
                    browser_params['crawl_id'], selector))

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

        logger.info("BROWSER %i: Facebook Button Targets: %d" % (
            browser_params['crawl_id'], len(targets)))

        # Try to click each element found
        for element in targets:
            try:
                wd_ext.move_to_element(driver, element)  # hover
                element.click()
                logger.info(
                    "BROWSER %i: Clicked a potential Facebook login button "
                    "found on %s\n" % (browser_params['crawl_id'],
                                       driver.current_url)
                )
            except ElementNotVisibleException:
                logger.warning("BROWSER %i: Can't click target %s" % (
                    browser_params['crawl_id'], element))
                continue
            except WebDriverException:
                logger.warning("BROWSER %i: Can't click target %s" % (
                    browser_params['crawl_id'], element))
                continue
            except StaleElementReferenceException:
                continue

            time.sleep(4)
            new_windows = set(driver.window_handles) - set(handles)
            for window in new_windows:
                driver.switch_to_window(window)
                if not wd_ext.title_contains(driver, 'Facebook'):
                    driver.switch_to_window(main_handle)
                    continue
                logger.info(
                    "BROWSER %i: Trying to login via pop up "
                    "windows" % browser_params['crawl_id']
                )
                connected, stop_searching = authorize_connect(
                    driver, True, logger, browser_params,
                    save_permissions=save_permissions
                )
                driver.switch_to_window(main_handle)
                if connected or stop_searching:
                    return connected, stop_searching

            # If no pop-ups, Facebook connect window may be the main page
            if len(new_windows) == 0:
                logger.info(
                    "BROWSER %i: Trying to login via main window" % (
                        browser_params['crawl_id']))
                connected, stop_searching = authorize_connect(
                    driver, False, logger, browser_params,
                    save_permissions=save_permissions
                )
                if connected or stop_searching:
                    return connected, stop_searching

    return False, False


def facebook_login(driver, url, manager_params, browser_params):
    # Connect to logger
    logger = loggingclient(*manager_params['logger_address'])

    initwindowHandle = driver.current_window_handle
    login_success = find_login(driver, url, logger, browser_params)

    # if login page not found or not fruitful,
    # search main page for facebook button
    if login_success:
        # TODO Save success
        print "noop"
    else:
        # switch back to main iframe
        try:
            driver.switch_to_default_content()
        except StaleElementReferenceException:
            logger.error("BROWSER %i: Tried and failed to switch to main "
                         "iframe for this site" % browser_params['crawl_id'])
        connect_success, stop_searching = find_connect(driver, logger,
                                                       browser_params)
        time.sleep(5)
        fb_api_confirm = check_FB_API(driver)

        if fb_api_confirm:
            connect_success = True
            # TODO Save the result here
            print "Login with Facebook? %s." % (connect_success)
        if connect_success:
            try:
                driver.get(url)
            except NoSuchWindowException:
                pass
            print "returning to main page with likely successful login"
            if fb_api_confirm is False:
                # TODO Save the result here
                print ("However could not confirm connection to FB API, "
                       "flag for review")
            else:
                # TODO Save the result here
                print "Confirmed successful login with FB API"
        else:
            # TODO Save the result here
            print "Unable to login with Facebook. Failed"

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
