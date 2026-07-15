from app.database.database import get_connection


def save_result(data):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO test_history(
            student_id,
            filename,
            topic,
            score,
            total,
            percentage
        )
        VALUES(?,?,?,?,?,?)
    """, (

        data.student_id,

        data.filename,

        data.topic,

        data.score,

        data.total,

        data.percentage

    ))

    conn.commit()

    conn.close()


def get_history(student_id):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute("""

    SELECT *

    FROM test_history

    WHERE student_id=?

    ORDER BY created_at DESC

    """, (student_id,))

    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]

from app.database.database import get_connection


def get_progress(student_id):
    conn = get_connection()
    cursor = conn.cursor()

    # Overall statistics
    cursor.execute("""
        SELECT
            COUNT(*) as tests_taken,
            AVG(percentage) as average_score,
            MAX(percentage) as best_score,
            MIN(percentage) as lowest_score
        FROM test_history
        WHERE student_id = ?
    """, (student_id,))

    stats = dict(cursor.fetchone())

    # Topic-wise averages
    cursor.execute("""
        SELECT
            topic,
            AVG(percentage) as avg_score
        FROM test_history
        WHERE student_id = ?
        GROUP BY topic
    """, (student_id,))

    rows = cursor.fetchall()

    strong_topics = []
    weak_topics = []

    for row in rows:
        topic = row["topic"]
        avg = row["avg_score"]

        if avg >= 70:
            strong_topics.append(topic)
        else:
            weak_topics.append(topic)

    stats["strong_topics"] = strong_topics
    stats["weak_topics"] = weak_topics

    if weak_topics:
        stats["recommendation"] = (
            "Revise " + ", ".join(weak_topics) +
            " before taking the next mock test."
        )
    else:
        stats["recommendation"] = (
            "Excellent work! Continue practicing advanced topics."
        )

    conn.close()

    return stats