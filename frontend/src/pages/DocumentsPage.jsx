import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./DocumentsPage.css";

const API = import.meta.env.VITE_API_URL;

export default function DocumentsPage() {

  const [docs, setDocs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {

      const res = await axios.get(
        `${API}/documents`
      );

      console.log(res.data);

      setDocs(res.data.files || []);

    } catch (err) {

      console.error(err);

    }
  };

  return (
    <div className="docs-page">

      <h1>Uploaded Question Papers</h1>

      {docs.length === 0 ? (
        <p>No PDFs uploaded.</p>
      ) : (
        <div className="docs-grid">

          {docs.map((doc) => (

            <div
              className="doc-card"
              key={doc.document_id}
            >

              <div className="pdf-icon">
                📄
              </div>

              <h3>{doc.filename}</h3>

              <p>
                Status:
                <strong> {doc.upload_status}</strong>
              </p>

              <p>
                Chunks:
                <strong> {doc.chunks}</strong>
              </p>

              <button
                onClick={() =>
                  navigate(
                    "/generate-test",
                    {
                      state: doc,
                    }
                  )
                }
              >
                Generate Mock Test
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}