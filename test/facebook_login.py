from selenium.common.exceptions import NoSuchElementException
from selenium.common.exceptions import NoSuchWindowException
from selenium.common.exceptions import StaleElementReferenceException
from bs4 import BeautifulSoup as bs
import time
import re

from ..automation.Commands.utils import XPathUtil
from ..automation.Commands.utils import webdriver_extensions as wd_ext

# A set of possible strings to find the login page
# They are in a preferred order - try to find
# "Sign up" pages before "Sign in", but some sites
# have their sign up on the sign in page
LOGIN_REGEX = re.compile(r'(sign[ -_]{0,1}up|' +
                         r'create (an ){0,1}account|' +
                         r'join( now){0,1}|' +
                         r'register( (an ){0,1}account){0,1}|' +
                         r'log[ -_]{0,1}in|' +
                         r'sign[ -_]{0,1}in)',
                         flags=re.IGNORECASE)

# Locate tags with inner text like "Sign in with Facebook"
FB_LOGIN_REGEX = re.compile(
    r'(.* with Facebook|.* using Facebook|\s{0,}Facebook\s{0,}$)',
    flags=re.IGNORECASE
)
FB_LINK_REGEX = re.compile(
    r'(https{0,1}://)?(www\.)?facebook\.com\/[A-Za-z0-9]{0,}'
)


def find_login(driver):
    """
    Will find and click a "Login" button
    """
    # Item may be in an iframe
    try:
        iframes = driver.find_elements_by_tag_name('iframe')
    except NoSuchElementException:
        iframes = []

    # Loop through frames looking for login buttons to click
    for i in range(0, len(iframes)+1):
        if i > 0:
            driver.switch_to_default_content()
            driver.switch_to_frame(iframes[i-1])

        # Parse with beautiful soup for regex support
        print "Parsing %s with beautifulsoup lxml" % driver.current_url
        soup = bs(driver.page_source, 'lxml')
        print "Searching for pattern in soup..."
        r = soup.findAll(text=LOGIN_REGEX)
        print "Searching complete..."

        for item in r:
            # TODO why is this here?
            if item.parent == soup:
                continue

            # Get elements XPath and click if clickable
            xpath = XPathUtil.ExtractXPath(item.parent)
            full_xpath = XPathUtil.ExtractXPath(item.parent, use_id=False)
            if wd_ext.is_clickable(driver, full_xpath, xpath, timeout=.01):
                current_url = driver.current_url
                print "Found clickable xpath for login on %s\nFull:%s\n%s" % (
                    current_url, full_xpath, xpath)
                element = driver.find_element_by_xpath(xpath)
                wd_ext.move_to_element(driver, element)
                element.click()
                return True
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
    try:
        # Check that we are logged into facebook
        try:
            form = driver.find_element_by_id('email')
            form.send_keys('jeffjohnson12345@outlook.com')

            form = driver.find_element_by_id('pass')
            form.send_keys('Corndawg!')

            bttn = driver.find_element_by_name('login')
            bttn.click()
        except NoSuchElementException:
            print "We are already logged in..."

        # Cofirm facebook connect
        try:
            r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
            if save_permissions:
                permissions(driver)
            if r.text != 'Okay':
                print "This should say \'Okay\', let\'s click it anyway..."
            print "Clicking " + r.text
            r.click()
        except NoSuchElementException:
            if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                print "Redirect back to site, success!"
                return True
            else:
                print "Unknown Page, login failed!"
                return False

        # Additional Permissions
        try:
            r = wd_ext.wait_and_find(driver, 'name', '__CONFIRM__')
            if r.text != 'Okay':
                print "This should say \'Okay\', let\'s click it anyway..."
            print "Clicking " + r.text
            r.click()
        except NoSuchElementException:
            if is_window and not wd_ext.title_is(driver, 'Facebook', 0):
                print "Redirect back to site, success!"
                return True
            else:
                print "Unknown Page, login failed!"
                return False
    except NoSuchWindowException:  # Already connected
        print "Facebook connect window closed..."
        return True


def connect(driver, save_permissions=False):
    # Current state of the driver
    handles = driver.window_handles
    main_handle = driver.current_window_handle

    # Facebook button by link text
    # Text matching '* with Facebook' contained in
    # an 'a' tag, a 'button' tag, or an 'input' tag
    # is assumed to be a clickable link. A stricter
    # implementation could check that <input type='button'>
    time.sleep(3)
    current_url = driver.current_url

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
                driver.switch_to_frame(iframes[i-1])
            except StaleElementReferenceException:
                break

        # Parse with beautiful soup for regex support
        print "Parsing %s with beautifulsoup lxml" % driver.current_url
        soup = bs(driver.page_source, 'lxml')
        print "Searching for pattern in soup..."
        r = soup.findAll(text=FB_LOGIN_REGEX)
        print "Searching complete..."
        xpaths = []
        full_xpaths = []
        for item in r:
            if item.parent == soup:
                continue
            xpaths.append(XPathUtil.ExtractXPath(item.parent))
            full_xpaths.append(
                XPathUtil.ExtractXPath(item.parent, use_id=False))

        # Try to click each xpath if clickable
        for i in range(0, len(xpaths)):
            if wd_ext.is_clickable(driver, full_xpaths[i],
                                   xpaths[i], timeout=0):
                element = driver.find_element_by_xpath(xpaths[i])

                # Skip links which lead to facebook pages.
                # These are not part of the login API
                ele_link = element.get_attribute('href')
                if (ele_link is not None and
                        re.match(FB_LINK_REGEX, ele_link) is not None):
                    continue

                # hover over element
                wd_ext.move_to_element(driver, element)

                element.click()
                clicked = True
                print "Facebook login button found on %s\nFull:%s\n%s" % (
                    current_url, xpaths[i], full_xpaths[i])
                break

        # Exit frame loop when successful
        if clicked:
            break

    # Button not found
    if not clicked:
        return False

    # See if there are any new windows
    time.sleep(2)

    new_windows = set(driver.window_handles) - set(handles)
    if len(new_windows) > 0:
        for i in range(len(new_windows)):
            driver.switch_to_window(new_windows.pop())
            if wd_ext.title_contains(driver, 'Facebook'):
                connected = authorize_connect(
                    driver,
                    is_window=True,
                    save_permissions=save_permissions
                )
                driver.switch_to_window(main_handle)
                return connected
    else:
        connected = authorize_connect(driver, is_window=False,
                                      save_permissions=save_permissions)
        return connected

    # TODO But are we really sure that we successfully logged in here?
    return True


def get_and_login(driver, url):
    driver.get(url)
    login_success = find_login(driver)
    print "Found login page? %s. Current url: %s" % (
        login_success, driver.current_url)

    # Whether or not login page was found, search for login with facebook
    connect_success = connect(driver)
    print "Login with Facebook? %s. Current url: %s" % (
        connect_success, driver.current_url)


if __name__ == '__main__':
    import selenium_utils as su
    driver = su.get_webdriver()

    sites = [  # 'http://policeauctions.com',
             'http://vimeo.com',
             'http://pinterest.com',
             'http://8tracks.com',
             'http://academia.edu',
             'http://meetme.com',
             'http://quizlet.com',
             'http://instagram.com',
             'http://vk.com',
             'http://myspace.com',
             'http://ups.com',
             'http://strava.com']
    for site in sites:
        get_and_login(driver, site)
