CREATE TABLE IF NOT EXISTS modified_elements(
    id INTEGER PRIMARY KEY,
    crawl_id INTEGER,
    visit_id INTEGER,
    script_url TEXT,
    script_line TEXT,
    script_col TEXT,
    call_stack TEXT,
    document_url TEXT,
    top_level_url TEXT,
    node_path TEXT,
    serialized_element TEXT,
    element_type TEXT,
    attribute TEXT,
    prev_value TEXT,
    new_value TEXT,
    guid TEXT,
    time_stamp TEXT
);
