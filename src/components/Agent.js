import React, { useState } from "react";
import { generateContent } from "./services/api";
import "./Agent.css";
import { useNavigate } from "react-router-dom";


export default function Agent() {

     const navigate = useNavigate();
  

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const askAI = async () => {

    if (!question.trim()) return;

    setLoading(true);

    try {

      const response =
        await generateContent(question);

      setAnswer(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (
    <>

     <nav className="terms-navbar">
        <div className="terms-nav-left">
         <button
            className="nav-back-btn"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>
        </div>

        <div className="terms-nav-right">
          

         <button
  className="nav-contact-btn"   onClick={() => navigate("/contact")}
>
  Contact Us
</button>
        </div>
      </nav>

    
    <div className="education-agent-container">

      <div className="hero-section">

        <span className="agent-badge">
          Education Agent
        </span>

        {/* <h1>
          DnyanAI Education Agent
        </h1> */}

        <p>
          Empowering students with
          personalized learning guidance.
        </p>

      </div>

      <div className="query-card">

        <textarea
          rows="6"
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Ask your question..."
        />

        <button
          onClick={askAI}
        >
          Ask Education Agent
        </button>

        {loading && (
          <p>Loading...</p>
        )}

        {answer && (

          <div className="response-card">

            <p>
              <strong>Variety:</strong>
              {" "}
              {answer.variety}
            </p>

            <p>
              <strong>Grade:</strong>
              {" "}
              {answer.grade_level}
            </p>

            <p>
              <strong>Subject:</strong>
              {" "}
              {answer.subject}
            </p>

            <p>
              <strong>Board:</strong>
              {" "}
              {answer.board}
            </p>

            <pre>
              {answer.markdown_content}
            </pre>

            {answer.pdf_download_url && (

              <a
                href={
                  "http://127.0.0.1:8000" +
                  answer.pdf_download_url
                }
                target="_blank"
                rel="noreferrer"
              >
                Download PDF
              </a>

            )}

          </div>

        )}
      </div>

    </div>

      </>

  );
}