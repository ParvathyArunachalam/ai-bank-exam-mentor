import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  FaRobot,
  FaUser,
  FaPaperPlane,
  FaTrash,
  FaSpinner,
} from "react-icons/fa";
import "./ChatPage.css";

const API = "https://automatic-tribble-4j7wv445ww7rf7prp-8000.app.github.dev";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! Ask me anything from your uploaded study material.",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMsg = {
      sender: "user",
      text: question,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);

    const currentQuestion = question;

    setQuestion("");

    setLoading(true);

    try {
      const res = await axios.post(`${API}/query`, {
        question: currentQuestion,
      });

      const botMsg = {
        sender: "bot",
        text: res.data.answer,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Unable to get response.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }

    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      {
        sender: "bot",
        text: "👋 Chat cleared. Ask me anything.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <div className="chat-page">

      <div className="chat-header">
        <h1>🤖 Ask AI</h1>

        <button className="clear-btn" onClick={clearChat}>
          <FaTrash /> Clear Chat
        </button>
      </div>

      <div className="chat-box">

        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-row ${
              msg.sender === "user" ? "user" : "bot"
            }`}
          >
            {msg.sender === "bot" && (
              <div className="avatar bot-avatar">
                <FaRobot />
              </div>
            )}

            <div
              className={`message ${
                msg.sender === "user"
                  ? "user-msg"
                  : "bot-msg"
              }`}
            >
              <p>{msg.text}</p>
              <span>{msg.time}</span>
            </div>

            {msg.sender === "user" && (
              <div className="avatar user-avatar">
                <FaUser />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="message-row bot">
            <div className="avatar bot-avatar">
              <FaRobot />
            </div>

            <div className="message bot-msg loading-msg">
              <FaSpinner className="spin" />
              AI is typing...
            </div>
          </div>
        )}

        <div ref={bottomRef}></div>
      </div>

      <div className="input-area">

        <textarea
          rows="2"
          placeholder="Ask anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKey}
        />

        <button onClick={askQuestion}>
          <FaPaperPlane />
        </button>

      </div>
    </div>
  );
}