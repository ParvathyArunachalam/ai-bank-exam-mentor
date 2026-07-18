/*import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";

// Temporary pages
function ChatPage() {
  return <h2 style={{ color: "white", textAlign: "center" }}>Chat Page</h2>;
}

function GenerateTestPage() {
  return <h2 style={{ color: "white", textAlign: "center" }}>Generate Test Page</h2>;
}

function SubmitTestPage() {
  return <h2 style={{ color: "white", textAlign: "center" }}>Submit Test Page</h2>;
}

function PerformancePage() {
  return <h2 style={{ color: "white", textAlign: "center" }}>Performance Page</h2>;
}

function RecommendationPage() {
  return <h2 style={{ color: "white", textAlign: "center" }}>Recommendation Page</h2>;
}

function ProgressPage() {
  return <h2 style={{ color: "white", textAlign: "center" }}>Progress Page</h2>;
}

function HistoryPage() {
  return <h2 style={{ color: "white", textAlign: "center" }}>History Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/upload" element={<UploadPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/generate-test" element={<GenerateTestPage />} />
        <Route path="/submit-test" element={<SubmitTestPage />} />
        <Route path="/performance" element={<PerformancePage />} />
        <Route path="/recommendation" element={<RecommendationPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

*/

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import UploadPage from "./pages/UploadPage";
import Dashboard from "./pages/Dashboard";
import ChatPage from "./pages/ChatPage";
import GenerateTestPage from "./pages/GenerateTestPage";
import ResultPage from "./pages/ResultPage";
import PerformancePage from "./pages/PerformancePage";
import RecommendationPage from "./pages/RecommendationPage";
import MockTestsPage from "./pages/MockTestsPage";
import StartTestPage from "./pages/StartTestPage";
import DocumentsPage from "./pages/DocumentsPage";

// Add these pages when you create them
// import ChatPage from "./pages/ChatPage";
// import GenerateTestPage from "./pages/GenerateTestPage";
// import SubmitTestPage from "./pages/SubmitTestPage";
// import PerformancePage from "./pages/PerformancePage";
// import RecommendationPage from "./pages/RecommendationPage";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Upload */}
          <Route path="/upload" element={<UploadPage />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/chat" element={<ChatPage />} />

          <Route path="/generate-test" element={<GenerateTestPage />} />

          <Route path="/result" element={<ResultPage />} />

          <Route path="/performance" element={<PerformancePage />} />

          <Route
            path="/recommendation"
            element={<RecommendationPage />}
          />

          <Route
            path="/documents"
            element={<DocumentsPage />}
          />
          <Route
            path="/mock-tests"
            element={<MockTestsPage />}
          />

          <Route
    path="/test/:id"
    element={<StartTestPage />}
/>

          {/* Uncomment these when the pages are created */}

          {/*
          <Route path="/chat" element={<ChatPage />} />

          <Route
            path="/generate-test"
            element={<GenerateTestPage />}
          />

          <Route
            path="/submit-test"
            element={<SubmitTestPage />}
          />

          <Route
            path="/performance"
            element={<PerformancePage />}
          />

          <Route
            path="/recommendation"
            element={<RecommendationPage />}
          />
          */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;