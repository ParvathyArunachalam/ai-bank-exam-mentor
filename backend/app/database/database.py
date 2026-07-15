import sqlite3

DB_NAME = "student_history.db"


def get_connection():

    conn = sqlite3.connect(DB_NAME)

    conn.row_factory = sqlite3.Row

    return conn


def create_tables():

    conn = get_connection()

    cursor = conn.cursor()

    # ===============================
    # Test History
    # ===============================
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS test_history(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        student_id TEXT,

        filename TEXT,

        topic TEXT,

        score INTEGER,

        total INTEGER,

        percentage REAL,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
    """)

    # ===============================
    # Uploaded Documents
    # ===============================
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS documents(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        document_id TEXT UNIQUE,

        filename TEXT,

        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
    """)

    # ===============================
    # Generated Mock Tests
    # ===============================
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS mock_tests(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        mock_test_id TEXT UNIQUE,

        document_id TEXT,

        title TEXT,

        difficulty TEXT,

        question_count INTEGER,

        questions_json TEXT,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
    """)

    # ===============================
    # Mock Test Attempts
    # ===============================
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS mock_attempts(

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        mock_test_id TEXT,

        score INTEGER,

        total INTEGER,

        percentage REAL,

        attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )
    """)

    conn.commit()

    conn.close()


# Create all tables automatically
create_tables()