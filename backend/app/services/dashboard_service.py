from app.database.database import get_connection


def get_dashboard_data():

    conn = get_connection()

    cursor = conn.cursor()

    # Documents
    cursor.execute("SELECT COUNT(*) FROM documents")
    total_documents = cursor.fetchone()[0]

    # Mock Tests
    cursor.execute("SELECT COUNT(*) FROM mock_tests")
    total_tests = cursor.fetchone()[0]

    # Attempts
    cursor.execute("SELECT COUNT(*) FROM mock_attempts")
    total_attempts = cursor.fetchone()[0]

    # Average Score
    cursor.execute("""
        SELECT AVG(percentage)
        FROM mock_attempts
    """)

    avg = cursor.fetchone()[0]

    if avg is None:
        avg = 0

    conn.close()

    return {

        "documents": total_documents,

        "tests": total_tests,

        "attempts": total_attempts,

        "average_score": round(avg,2)

    }