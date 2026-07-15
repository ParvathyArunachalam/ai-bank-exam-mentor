import sqlite3

DB_NAME = "app/database/results.db"


def get_connection():
    return sqlite3.connect(DB_NAME)


def create_table():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS test_results(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        mock_test_id TEXT,

        score INTEGER,

        total INTEGER,

        percentage REAL,

        overall_feedback TEXT,

        strengths TEXT,

        weaknesses TEXT,

        study_plan TEXT,

        recommendation TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    )
    """)

    conn.commit()
    conn.close()


create_table()