CREATE TABLE IF NOT EXISTS inserted_elements(
  id INTEGER PRIMARY KEY,
  crawl_id INTEGER,
  visit_id INTEGER,
  script_url TEXT,
  script_line TEXT,
  script_col TEXT,
  call_stack TEXT,
  is_visible BOOLEAN,
  node_path TEXT,
  serialized_element TEXT,
  element_type TEXT,
  guid TEXT,
  time_stamp TEXT
);
