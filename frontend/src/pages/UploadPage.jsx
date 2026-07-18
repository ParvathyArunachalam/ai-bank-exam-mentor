import { useState } from "react";
import axios from "axios";
import "./UploadPage.css";

const API = import.meta.env.VITE_API_URL;

function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const uploadFile = async () => {
    if (!file) {
      setMessage("Please select a PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setMessage("");

      const res = await axios.post(
        `${API}/documents/upload`,
        formData
      );

      console.log("SUCCESS");
      console.log(res.data);

      setMessage("✅ PDF uploaded successfully!");

      setFile(null);

      document.querySelector("input[type=file]").value = "";
    } catch (err) {
      console.error(err);

      console.log("MESSAGE:", err.message);
      console.log("CODE:", err.code);

      if (err.response) {
        console.log(err.response.data);
      }

      setMessage(
        err.response?.data?.detail ||
          err.message ||
          "Upload failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">

      <h1>📚 Upload Study Material</h1>

      <p className="subtitle">
        Upload your PDF notes to generate AI-powered mock tests.
      </p>

      <div className="upload-card">

        <div className="upload-icon">
          📄
        </div>

        <h2>Upload PDF</h2>

        <p>Select a study material</p>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        {file && (
          <div className="selected-file">
            📘 {file.name}
          </div>
        )}

        <button
          className="upload-btn"
          disabled={loading}
          onClick={uploadFile}
        >
          {loading ? "Uploading..." : "⬆ Upload PDF"}
        </button>

        {message && (
          <div className="upload-message">
            {message}
          </div>
        )}

      </div>

    </div>
  );
}

export default UploadPage;