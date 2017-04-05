from automation import TaskManager, CommandSequence

NUM_BROWSERS = 1

sites = [
    'http://policeauctions.com',
    'http://8tracks.com',
    'http://academia.edu',
    'http://addthis.com',
    'http://meetme.com',  # **doesnt work because cant pull html
    'http://quizlet.com',
    'http://instagram.com',
    'http://vk.com',
    'http://myspace.com',  # doesn't work, requires extra steps to complete
    'http://ups.com',  # **no fb login available
    'http://strava.com'
    'http://greatvaluecolleges.net',
    'http://unthsc.edu',
    'http://pes-smoke-patch.blogspot.com',
    'http://xn--cckcdp0exfb2h9c9fti.com',
    'http://manjubox.net',
    'http://travelertips.org',
    'http://cookingman.ru',
    'http://bookfair.jp',
    'http://minecraft-schematics.com',
    'http://tinmoi.vn',
    'http://amenzing.com',
    'http://nepalnews2016.blogspot.com',
    'http://alpenverein.pl',
    'http://satgurutravel.com',
    'http://bowlersparadise.com',
    'http://goldenekamera.de',
    'http://pokemongoplus.vn',
    'http://www.cbssports.com/',
    'https://www.miniclip.com/games/en/',
    'http://www.espn.com/',
    'https://www.producthunt.com/',
]

manager_params, browser_params = TaskManager.load_default_params(NUM_BROWSERS)
manager_params['data_directory'] = '~/Desktop/'
manager_params['log_directory'] = '~/Desktop/'
manager = TaskManager.TaskManager(manager_params, browser_params)

for site in sites:
    command_sequence = CommandSequence.CommandSequence(site)
    command_sequence.get(sleep=2)
    command_sequence.facebook_login(site)
    manager.execute_command_sequence(command_sequence)

manager.close()
