import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./GenerateTestPage.css";

const API = import.meta.env.VITE_API_URL;

export default function GenerateTestPage() {

  const navigate = useNavigate();

  const [documents, setDocuments] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState(10);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {

    try {

      const res = await axios.get(`${API}/documents`);

      setDocuments(res.data.files);

    } catch (err) {

      console.log(err);

    }

  }

  async function generateTest() {

    if (!selectedDoc) {

      alert("Please select a PDF");

      return;

    }

    try {

      setLoading(true);

      const body = {

        document_id: selectedDoc.document_id,

        filename: selectedDoc.filename,

        topic,

        number_of_questions: Number(questions),

        difficulty: "Medium"

      };

      console.log(body);

      const res = await axios.post(
        `${API}/generate-test`,
        body
      );

      console.log(res.data);

      alert("Mock Test Generated Successfully!");

      navigate("/mock-tests");

    } catch (err) {

      console.log(err);

      if (err.response) {

        console.log(err.response.data);

        alert(err.response.data.detail);

      } else {

        alert("Failed to generate mock test.");

      }

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="generate-page">

      <h1>📝 Generate Mock Test</h1>

      <div className="generate-card">

        <label>Select Question Paper</label>

        <select
          value={selectedDoc?.document_id || ""}
          onChange={(e) => {

            const doc = documents.find(
              d => d.document_id === e.target.value
            );

            setSelectedDoc(doc);

          }}
        >

          <option value="">
            Select Uploaded PDF
          </option>

          {

            documents.map(doc => (

              <option
                key={doc.document_id}
                value={doc.document_id}
              >

                {doc.filename}

              </option>

            ))

          }

        </select>

        <label>Topic (Optional)</label>

        <input
          placeholder="Banking Awareness"
          value={topic}
          onChange={(e)=>setTopic(e.target.value)}
        />

        <label>Number of Questions</label>

        <select
          value={questions}
          onChange={(e)=>setQuestions(e.target.value)}
        >

          <option value={5}>5</option>

          <option value={10}>10</option>

          <option value={15}>15</option>

          <option value={20}>20</option>

        </select>

        <button
          onClick={generateTest}
          disabled={loading}
        >

          {

            loading ?

            "Generating..." :

            "Generate Mock Test"

          }

        </button>

      </div>

    </div>

  );

}