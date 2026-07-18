import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MockTestsPage.css";

const API = "https://automatic-tribble-4j7wv445ww7rf7prp-8000.app.github.dev";

function MockTestsPage() {

    const [tests, setTests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadMockTests();
    }, []);

    const loadMockTests = async () => {

        try {

            const res = await axios.get(`${API}/mock-tests`);

            setTests(res.data.tests);

        } catch (err) {

            console.error(err);

            alert("Unable to load mock tests.");

        }

    };

    const deleteTest = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this mock test?"
        );

        if (!confirmDelete) return;

        try {

            await axios.delete(`${API}/mock-tests/${id}`);

            loadMockTests();

        } catch (err) {

            console.error(err);

            alert("Delete Failed");

        }

    };

    return (

        <div className="mock-container">

            <h2>📝 My Mock Tests</h2>

            {tests.length === 0 ? (

                <div className="empty">

                    <h3>No Mock Tests Available</h3>

                    <p>
                        Generate a mock test from your uploaded question papers.
                    </p>

                </div>

            ) : (

                tests.map((test) => (

                    <div
                        className="mock-card"
                        key={test.mock_test_id}
                    >

                        <div className="card-header">

                            <div>

                                <h3>{test.title}</h3>

                                <span className="status">
                                    🟢 Ready to Attempt
                                </span>

                            </div>

                        </div>

                        <div className="card-details">

                            <p>

                                <strong>Difficulty:</strong>{" "}
                                {test.difficulty}

                            </p>

                            <p>

                                <strong>Questions:</strong>{" "}
                                {test.question_count}

                            </p>

                            <p>

                                <strong>Duration:</strong>{" "}
                                {test.question_count * 2} Minutes

                            </p>

                            <p>

                                <strong>Marks:</strong>{" "}
                                {test.question_count}

                            </p>

                            <p>

                                <strong>Generated:</strong>{" "}
                                {test.created_at}

                            </p>

                        </div>

                        <div className="buttons">

                            <button
                                className="start"
                                onClick={() =>
                                    navigate(`/test/${test.mock_test_id}`)
                                }
                            >
                                ▶ Start Test
                            </button>

                            <button
                                className="delete"
                                onClick={() =>
                                    deleteTest(test.mock_test_id)
                                }
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </div>

                ))

            )}

        </div>

    );

}

export default MockTestsPage;