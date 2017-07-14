from automation import TaskManager, CommandSequence
import crawl_utils

# The list of sites that we wish to crawl
NUM_BROWSERS = 15

manager_params, browser_params = TaskManager.load_default_params(NUM_BROWSERS)

prefix = 'test_browse'
manager_params['database_name'] = prefix + '.sqlite'
manager_params['data_directory'] = '~/Desktop/' + prefix
manager_params['log_directory'] = '~/Desktop/' + prefix

# Read the site list
sites = crawl_utils.get_sampled_sites(
    location=manager_params['data_directory'],
    include_rank=True,
    slices=[(100, 0, 100)]
)

for i in xrange(NUM_BROWSERS):
    browser_params[i]['js_instrument'] = True
    browser_params[i]['cookie_instrument'] = True
    browser_params[i]['http_instrument'] = True
    browser_params[i]['save_javascript'] = True
    browser_params[i]['record_js_errors'] = True

manager = TaskManager.TaskManager(manager_params, browser_params)
current_index = 0
for i in range(len(sites)):
    cs = CommandSequence.CommandSequence(sites[i][0],
                                         site_rank=sites[i][1],
                                         reset=True)
    cs.browse(num_links=5, sleep=5, timeout=120)
    manager.execute_command_sequence(cs)
manager.close()
