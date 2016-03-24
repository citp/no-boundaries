CREATE TABLE IF NOT EXISTS input_forms(
	id INTEGER PRIMARY KEY,
	crawl_id INTEGER,
  top_url TEXT,
  script_url TEXT,
	is_visible BOOLEAN,
	node_path TEXT,
	serialized_element TEXT,
	element_type TEXT
);
