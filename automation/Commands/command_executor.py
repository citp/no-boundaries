import browser_commands
import profile_commands
import facebook_commands


def execute_command(command, webdriver, proxy_queue, browser_settings,
                    browser_params, manager_params, extension_sockets):
    """
    executes BrowserManager commands by passing command tuples into necessary helper function
    commands are of form (COMMAND, ARG0, ARG1, ...)
    the only imports in this file should be imports to helper libraries
    """
    if command[0] == 'GET':
        browser_commands.get_website(
            url=command[1], sleep=command[2], visit_id=command[3],
            webdriver=webdriver, proxy_queue=proxy_queue,
            browser_params=browser_params,
            extension_sockets=extension_sockets
        )

    if command[0] == 'BROWSE':
        browser_commands.browse_website(
            url=command[1], num_links=command[2], sleep=command[3],
            visit_id=command[4], webdriver=webdriver,
            proxy_queue=proxy_queue, browser_params=browser_params,
            manager_params=manager_params,
            extension_sockets=extension_sockets
        )

    if command[0] == 'DUMP_FLASH_COOKIES':
        browser_commands.dump_flash_cookies(start_time=command[1], visit_id=command[2],
                                            webdriver=webdriver, browser_params=browser_params,
                                            manager_params=manager_params)

    if command[0] == 'DUMP_PROFILE_COOKIES':
        browser_commands.dump_profile_cookies(start_time=command[1], visit_id=command[2],
                                              webdriver=webdriver, browser_params=browser_params,
                                              manager_params=manager_params)

    if command[0] == 'DUMP_PROF':
        profile_commands.dump_profile(browser_profile_folder=browser_params['profile_path'],
                                      manager_params=manager_params,
                                      browser_params=browser_params,
                                      tar_location=command[1], close_webdriver=command[2],
                                      webdriver=webdriver, browser_settings=browser_settings,
                                      compress=command[3],
                                      save_flash=browser_params['disable_flash'] is False)

    if command[0] == 'EXTRACT_LINKS':
        browser_commands.extract_links(webdriver, browser_params, manager_params)

    if command[0] == 'SAVE_SCREENSHOT':
        browser_commands.save_screenshot(screenshot_name=command[1], webdriver=webdriver,
                                         browser_params=browser_params, manager_params=manager_params)

    if command[0] == 'DUMP_PAGE_SOURCE':
        browser_commands.dump_page_source(dump_name=command[1], webdriver=webdriver,
                                          browser_params=browser_params, manager_params=manager_params)

    if command[0] == 'BROWSE_AND_DUMP_SOURCE':
        browser_commands.browse_and_dump_source(
            url=command[1],
            num_links=command[2],
            sleep=command[3],
            visit_id=command[4],
            webdriver=webdriver,
            proxy_queue=proxy_queue,
            browser_params=browser_params,
            manager_params=manager_params,
            extension_sockets=extension_sockets
        )

    if command[0] == 'RECURSIVE_DUMP_PAGE_SOURCE':
        browser_commands.recursive_dump_page_source(
            visit_id=command[2],
            driver=webdriver,
            manager_params=manager_params,
            suffix=command[1]
        )

    if command[0] == 'FACEBOOK_LOGIN':
        facebook_commands.facebook_login(
            driver=webdriver,
            url=command[1],
            visit_id=command[2],
            manager_params=manager_params,
            browser_params=browser_params
        )

    if command[0] == 'REQUEST_FILTER':
        browser_commands.request_filter(
            control_message=command[1],
            filter_name=command[2],
            crawl_id=browser_params['crawl_id'],
            extension_sockets=extension_sockets,
            manager_params=manager_params
        )

    if command[0] == 'RUN_CUSTOM_FUNCTION':
        arg_dict = {"command": command,
                    "driver": webdriver,
                    "proxy_queue": proxy_queue,
                    "browser_settings": browser_settings,
                    "browser_params": browser_params,
                    "manager_params": manager_params,
                    "extension_sockets": extension_sockets}
        command[1](*command[2], visit_id=command[3], **arg_dict)
