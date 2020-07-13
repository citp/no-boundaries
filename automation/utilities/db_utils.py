import sqlite3
import os
import plyvel
from common import (FORM_SUBMISSION_MARK, FORM_FILLING_MARK)


def query_db(db, query, params=None, as_tuple=False):
    """Run a query against the given db.

    If params is not None, securely construct a query from the given
    query string and params.
    """
    with sqlite3.connect(db) as con:
        if not as_tuple:
            con.row_factory = sqlite3.Row
        if params is None:
            rows = con.execute(query).fetchall()
        else:
            rows = con.execute(query, params).fetchall()
    return rows


def get_javascript_content(data_directory):
    """Yield key, value pairs from the deduplicated leveldb content database

    Parameters
    ----------
    data_directory : str
        root directory of the crawl files containing `javascript.ldb`
    """
    db_path = os.path.join(data_directory, 'javascript.ldb')
    db = plyvel.DB(db_path,
                   create_if_missing=False,
                   compression='snappy')
    for content_hash, content in db.iterator():
        yield content_hash, content
    db.close()


def get_javascript_entries(db, all_columns=False, as_tuple=False):
    if all_columns:
        select_columns = "*"
    else:
        select_columns = "script_url, symbol, operation, value, arguments"

    return query_db(db, "SELECT %s FROM javascript" % select_columns,
                    as_tuple=as_tuple)


def get_autofill_entries(db, as_tuple=False):
    return query_db(
        db, "SELECT v.site_url, f.top_url, f.frame_url, f.elem_str,"
        " f.form_str, f.value FROM form_filling_events AS f"
        " LEFT JOIN site_visits as v ON f.visit_id = v.visit_id"
        " WHERE f.crawl_type = 'AUTOFILL';",
        as_tuple=as_tuple
    )


def any_command_failed(db):
    """Returns True if any command in a given database failed"""
    rows = query_db(db, "SELECT * FROM CrawlHistory;")
    for row in rows:
        if row[3] != 1:
            return True
    return False


# TODO replace the following with pandas based alternatives similar
# to requests and responses
def get_pre_submit_post_form_fill_javascript(db, crawl_id=1, visit_id=1):
    query = """SELECT * FROM javascript WHERE
                    crawl_id = %d AND
                    visit_id = %d AND
                    time_stamp > (SELECT time_stamp FROM javascript
                            WHERE visit_id = %d AND operation = "%s") AND
                    time_stamp < (SELECT time_stamp FROM javascript
                    WHERE visit_id = %d AND operation = "%s")
            """ % (crawl_id, visit_id, visit_id, FORM_FILLING_MARK,
                   visit_id, FORM_SUBMISSION_MARK)
    return query_db(db, query)


def get_post_form_fill_javascript(db, crawl_id=1, visit_id=1):
    query = """SELECT * FROM javascript WHERE
                    crawl_id = %d AND
                    visit_id = %d AND
                    time_stamp > (SELECT time_stamp FROM javascript
                            WHERE visit_id = %d AND operation = "%s") AND
                    operation != "%s";
            """ % (crawl_id, visit_id, visit_id, FORM_FILLING_MARK,
                   FORM_SUBMISSION_MARK)
    return query_db(db, query)
