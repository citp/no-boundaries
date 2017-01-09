CREATE TABLE IF NOT EXISTS console_errors(
    id INTEGER PRIMARY KEY,
    crawl_id INTEGER,
    visit_id INTEGER,
    script_url TEXT,
    console_msg TEXT,
    time_stamp TEXT NOT NULL    
);
