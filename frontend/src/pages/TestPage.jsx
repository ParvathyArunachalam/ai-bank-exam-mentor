import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TestPage.css";

const API = "https://automatic-tribble-4jwv445ww7rf7prp-8000.app.github.dev";

function TestPage() {

    const { id } = useParams();

    const [loading, setLoading] = useState(true);

    const [test, setTest] = useState(null);

    const [questions, setQuestions] = useState([]);

    const [current, setCurrent] = useState(0);

    const [answers, setAnswers] = useState({});

    const [timeLeft, setTimeLeft] = useState(20 * 60);

    useEffect(() => {

        loadTest();

    }, []);

    useEffect(() => {

        if (loading) return;

        const timer = setInterval(() => {

            setTimeLeft((prev) => {

                if (prev <= 1) {

                    clearInterval(timer);

                    return 0;

                }

                return prev - 1;

            });

        }, 1000);

        return () => clearInterval(timer);

    }, [loading]);

    const loadTest = async () => {

        try {

            const res = await axios.get(`${API}/mock-tests/${id}`);

            setTest(res.data);

            setQuestions(res.data.questions_json);

            setLoading(false);

        } catch (err) {

            console.log(err);

        }

    };

    const selectAnswer = (option) => {

        setAnswers({

            ...answers,

            [current]: option

        });

    };

    const nextQuestion = () => {

        if (current < questions.length - 1)

            setCurrent(current + 1);

    };

    const previousQuestion = () => {

        if (current > 0)

            setCurrent(current - 1);

    };

    const formatTime = () => {

        const min = Math.floor(timeLeft / 60);

        const sec = timeLeft % 60;

        return `${min}:${sec.toString().padStart(2, "0")}`;

    };

    if (loading)

        return <h2>Loading Test...</h2>;

    const q = questions[current];

    return (

        <div className="exam-page">

            <div className="exam-header">

                <h2>{test.title}</h2>

                <div className="timer">

                    ⏱ {formatTime()}

                </div>

            </div>

            <div className="exam-body">

                <div className="question-section">

                    <h3>

                        Question {current + 1} of {questions.length}

                    </h3>

                    <p className="question">

                        {q.question}

                    </p>

                    <div className="options">

                        {q.options.map((option, index) => (

                            <label key={index}>

                                <input

                                    type="radio"

                                    checked={answers[current] === option}

                                    onChange={() => selectAnswer(option)}

                                />

                                {option}

                            </label>

                        ))}

                    </div>

                    <div className="navigation">

                        <button

                            onClick={previousQuestion}

                            disabled={current === 0}

                        >

                            ◀ Previous

                        </button>

                        <button

                            onClick={nextQuestion}

                            disabled={current === questions.length - 1}

                        >

                            Next ▶

                        </button>

                    </div>

                    <button className="submit-btn">

                        Submit Test

                    </button>

                </div>

                <div className="palette">

                    <h3>Questions</h3>

                    <div className="palette-grid">

                        {questions.map((_, index) => (

                            <button

                                key={index}

                                className={current === index ? "active" : ""}

                                onClick={() => setCurrent(index)}

                            >

                                {index + 1}

                            </button>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default TestPage;