import json

from app.database.results_db import get_connection


def save_result(

    mock_test_id,
    evaluation,
    performance,
    recommendation

):

    conn = get_connection()

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO test_results(

            mock_test_id,

            score,

            total,

            percentage,

            overall_feedback,

            strengths,

            weaknesses,

            study_plan,

            recommendation

        )

        VALUES(?,?,?,?,?,?,?,?,?)

        """,
        (

            mock_test_id,

            evaluation["score"],

            evaluation["total"],

            evaluation["percentage"],

            performance["overall_feedback"],

            json.dumps(performance["strengths"]),

            json.dumps(performance["weaknesses"]),

            json.dumps(performance["study_plan"]),

            json.dumps(recommendation)

        )

    )

    conn.commit()

    conn.close()