import json
import uuid

from app.database.database import get_connection


# ---------------------------------------
# Save Generated Mock Test
# ---------------------------------------
def save_mock_test(
    document_id,
    title,
    difficulty,
    question_count,
    questions
):

    conn = get_connection()

    cursor = conn.cursor()

    mock_test_id = str(uuid.uuid4())

    cursor.execute(
        """
        INSERT INTO mock_tests(
            mock_test_id,
            document_id,
            title,
            difficulty,
            question_count,
            questions_json
        )

        VALUES(?,?,?,?,?,?)
        """,
        (
            mock_test_id,
            document_id,
            title,
            difficulty,
            question_count,
            json.dumps(questions)
        )
    )

    conn.commit()

    conn.close()

    return mock_test_id


# ---------------------------------------
# Get All Mock Tests
# ---------------------------------------
def get_mock_tests():

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            mock_test_id,
            document_id,
            title,
            difficulty,
            question_count,
            created_at
        FROM mock_tests

        ORDER BY created_at DESC
        """
    )

    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]


# ---------------------------------------
# Get One Mock Test
# ---------------------------------------
def get_mock_test(mock_test_id):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM mock_tests

        WHERE mock_test_id=?
        """,
        (mock_test_id,)
    )

    row = cursor.fetchone()

    conn.close()

    if row is None:

        return None

    data = dict(row)

    data["questions_json"] = json.loads(
        data["questions_json"]
    )

    return data


# ---------------------------------------
# Delete Mock Test
# ---------------------------------------
def delete_mock_test(mock_test_id):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM mock_tests

        WHERE mock_test_id=?
        """,
        (mock_test_id,)
    )

    conn.commit()

    deleted = cursor.rowcount

    conn.close()

    return deleted