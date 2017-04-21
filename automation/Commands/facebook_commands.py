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


def find_login(driver, url, logger):
    """Find all login options on each iframe and try to execute login"""
    # Item may be in an iframe
    try:
        iframes = driver.find_elements_by_tag_name('iframe')
    except NoSuchElementException:
        iframes = []

    # Loop through frames looking for login buttons to click
    success = False
    for i in range(0, len(iframes)+1):
        if i > 0:
            try:
                driver.switch_to_default_content()
                driver.switch_to_frame(iframes[i-1])
            except StaleElementReferenceException:
                logger.error("page must have changed since last visited. "
                             "Possible successful login *FLAG for review*")
                break

        targets = []

        def find_targets(selector):
            try:
                targets.extend(driver.find_elements_by_xpath(selector))
            except NoSuchElementException:
                logger.error("Illegal query with %s" % selector)

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

        login_options = targets
        logger.info("Potential Login Targets on this iFrame: %d" % (
            len(login_options)))

        if len(login_options) > 0:
            for i in range(0, len(login_options)):
                element = login_options[i]
                wd_ext.move_to_element(driver, element)
                try:
                    element.click()
                    logger.info("Trying to click login now")
                    time.sleep(6)

                    logger.info("Trying to find Facebook button now")
                    # try to find a facebook button on this login page
                    connect_success, stop_searching = connect(driver, logger)
                    time.sleep(5)
                    fb_api_confirm = check_FB_API(driver)
                    if fb_api_confirm is True:
                        connect_success = True
                    logger.info("Login with Facebook with Login Target"
                                "%d? %s." % (i, connect_success))
                    if connect_success:
                        try:
                            driver.get(url)
                        except NoSuchWindowException:
                            pass
                        success = True
                        logger.info("returning to main page with likely "
                                    "successful login")
                        if fb_api_confirm is False:
                            logger.info("However could not confirm connection "
                                        "to FB API, flag for review")
                        else:
                            logger.info("Confirmed successful login "
                                        "with FB API")
                        break
                    elif stop_searching is True:
                        try:
                            driver.get(url)
                        except NoSuchWindowException:
                            pass
                        success = True
                        # TODO DO We need to log this
                        logger.info("returning to main page, reached an "
                                    "FB login page *FLAG FOR REVIEW*")
                        time.sleep(3)
                    else:
                        try:
                            driver.get(url)
                        except NoSuchWindowException:
                            pass
                        logger.info("returning to main page to try another "
                                    "login on this iFrame")
                        time.sleep(3)
                except ElementNotVisibleException:
                    # TODO which target?
                    logger.warning("can't click that target")
                except StaleElementReferenceException:
                    # TODO DO We need to log this
                    logger.info("page must have changed since last visited. "
                                "Possible successful login *FLAG for review*")
                    break
        if success is True:
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


def permissions(driver):
    # read permissions
    res = driver.find_element_by_name('read')
    read_permissions = res.get_attribute('value')
    read_permissions = re.split(',', read_permissions)

    # write permissions
    res = driver.find_element_by_name('write')
    write_permissions = res.get_attribute('value')
    write_permissions = re.split(',', write_permissions)

    # display read permissions
    print "Read permissions:"
    for item in read_permissions:
        if item != '':
            print item

    # display write permissions
    print "Write permissions:"
    for item in write_permissions:
        if item != '':
            print item


def authorize_connect(driver, is_window, save_permissions=False):
    # if button click immediately logs us & api is connected, return true

    stop_searching = False
    current_url = driver.current_url
    if "facebook" in current_url:
        stop_searching = True
    if check_FB_API(driver) is True:
        return True, stop_searching
    try:
        # Check that we are logged into facebook
        try:
            form = driver.find_element_by_id('email')
            form.send_keys('jeffjohnson12345@outlook.com')

            form = driver.find_element_by_id('pass')
            form.send_keys('Corndawg!')

            bttn = driver.find_element_by_name('login')
            bttn.click()
            # Confirm facebook connect
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                if save_permissions:
                    permissions(driver)
                if r.text != 'Okay':
                    print "This should say \'Okay\', let\'s click it anyway..."
                print "Clicking " + r.text
                r.click()
            except NoSuchElementException:
                # if we clicked facbeook URL right away
                if "facebook" not in current_url:
                    print "Likely filled out wrong form"
                    return False, stop_searching
                if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                    print "Redirect back to site - no permissions needed"
                else:
                    print "Redirect back to site"

            # Additional Permissions
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                if r.text != 'Okay':
                    print "This should say \'Okay\', let\'s click it anyway..."
                print "Clicking " + r.text
                r.click()
            except NoSuchElementException:
                if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                    print "Redirect back to site - no 2nd permissions needed"
                else:
                    print "Redirect back to site"
            return True, stop_searching
        except NoSuchElementException:
            # no form - check if only permissions needed or if a failure
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                if save_permissions:
                    permissions(driver)
                if r.text != 'Okay':
                    print "This should say \'Okay\', let\'s click it anyway..."
                print "Clicking " + r.text
                r.click()
            except NoSuchElementException:
                return False, stop_searching

            # Additional Permissions
            try:
                r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
                if r.text != 'Okay':
                    print "This should say \'Okay\', let\'s click it anyway..."
                print "Clicking " + r.text
                r.click()
            except NoSuchElementException:
                if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                    print "Redirect back to site - no 2nd permissions needed"
                else:
                    print "Redirect back to site"
            return True, stop_searching
    except NoSuchWindowException:  # Already connected
        print "Facebook connect window closed..."
        return True, stop_searching


def connect(driver, logger, save_permissions=False):
    # Current state of the driver
    handles = driver.window_handles
    main_handle = driver.current_window_handle

    time.sleep(2.5)

    # if we clicked facebook URL right away try to log right in
    initwindowHandle = driver.current_window_handle
    for handle in driver.window_handles:
        try:
            driver.switch_to_window(handle)
            if "facebook.com/login.php" in driver.current_url:
                connected, stop_searching = authorize_connect(
                    driver, is_window=False,
                    save_permissions=save_permissions
                )
                return connected, stop_searching
        except:
            pass
    driver.switch_to_window(initwindowHandle)

    # Item may be in an iframe
    try:
        iframes = driver.find_elements_by_tag_name('iframe')
    except NoSuchElementException:
        iframes = []

    # First loop checks main page, next loops check iframes
    clicked = False
    for i in range(0, len(iframes)+1):  # check iframes first
        if i > 0:
            try:
                driver.switch_to_default_content()
                driver.switch_to_frame(iframes[i - 1])
            except StaleElementReferenceException:
                break

        targets = []

        logger.info("Potential iFrames to look through: %d" % len(iframes))
        # Parse with Selenium XPath

        def do_search(selector, targets):
            try:
                targets.extend(driver.find_elements_by_xpath(selector))
            except NoSuchElementException:
                logger.error("Illegal query with %s" % selector)

        time.sleep(3)

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

        logger.info("Facebook Button Targets: %d" % len(targets))

        # Try to click each xpath if clickable
        for i in range(0, len(targets)):
            element = targets[i]
            # hover over element
            wd_ext.move_to_element(driver, element)
            try:
                element.click()
                clicked = True
                logger.info("A button, hopefully Facebook login button "
                            "found on %s\n" % (driver.current_url))
            except ElementNotVisibleException:
                print "can't click that target"
            except WebDriverException:
                print "can't click that target"
            except StaleElementReferenceException:
                break
                # Exit frame loop when successful
            if clicked:
                time.sleep(4)
                new_windows = set(driver.window_handles) - set(handles)
                if len(new_windows) > 0:
                    for i in range(len(new_windows)):
                        driver.switch_to_window(new_windows.pop())
                        print "trying to login via pop up windows"
                        if wd_ext.title_contains(driver, 'Facebook'):
                            connected, stop_searching = authorize_connect(
                                driver,
                                is_window=True,
                                save_permissions=save_permissions
                            )
                            driver.switch_to_window(main_handle)
                            if connected or stop_searching:
                                return connected, stop_searching
                else:
                    print "trying to login via main window"
                    connected, stop_searching = authorize_connect(
                        driver, is_window=False,
                        save_permissions=save_permissions
                    )
                    if connected or stop_searching:
                        return connected, stop_searching
            clicked = False

    connected = False
    stop_searching = False
    return connected, stop_searching


def facebook_login(driver, url, manager_params):
    # Connect to logger
    logger = loggingclient(*manager_params['logger_address'])

    initwindowHandle = driver.current_window_handle
    login_success = find_login(driver, url, logger)

    # if login page not found or not fruitful,
    # search main page for facebook button
    if login_success is False:
        # switch back to main iframe
        try:
            driver.switch_to_default_content()
        except StaleElementReferenceException:
            logger.error(
                "Tried and failed to switch to main iframe for this site")
        connect_success, stop_searching = connect(driver, logger)
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
