
import React, { useState } from "react";
import "./AIAccelerator.css";

// ==========================================================
// FASTAPI BACKEND URL
// ==========================================================

const API_BASE_URL = "http://127.0.0.1:8000";


// ==========================================================
// AI ACCELERATOR COMPONENT
// ==========================================================

function AIAAccelerator() {

  // ========================================================
  // SETTINGS
  // ========================================================

  const [embeddingModel, setEmbeddingModel] =
    useState("all-MiniLM-L6-v2");

  const [chunkStrategy, setChunkStrategy] =
    useState("Recursive");

  const [retrievalStrategy, setRetrievalStrategy] =
    useState("Hybrid Search");

  const [topK, setTopK] =
    useState(5);

  const [scoreThreshold, setScoreThreshold] =
    useState(0.5);


  // ========================================================
  // PDF STATE
  // ========================================================

  const [file, setFile] =
    useState(null);

  const [uploading, setUploading] =
    useState(false);

  const [uploadMessage, setUploadMessage] =
    useState("");

  const [indexed, setIndexed] =
    useState(false);


  // ========================================================
  // CHAT STATE
  // ========================================================

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [asking, setAsking] =
    useState(false);


  // ========================================================
  // FILE SELECTION
  // ========================================================

  const handleFileChange = (e) => {

    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) {

      setFile(null);
      setUploadMessage("");
      setIndexed(false);

      return;
    }


    // ------------------------------------------------------
    // PDF VALIDATION
    // ------------------------------------------------------

    const isPDF =
      selectedFile.type === "application/pdf" ||
      selectedFile.name
        .toLowerCase()
        .endsWith(".pdf");


    if (!isPDF) {

      alert("Please select a PDF file.");

      e.target.value = "";

      setFile(null);
      setIndexed(false);

      return;
    }


    // ------------------------------------------------------
    // OPTIONAL FILE SIZE CHECK
    // ------------------------------------------------------

    const maxSize =
      20 * 1024 * 1024; // 20 MB


    if (selectedFile.size > maxSize) {

      alert(
        "File size must be less than 20 MB."
      );

      e.target.value = "";

      setFile(null);
      setIndexed(false);

      return;
    }


    // ------------------------------------------------------
    // SET FILE
    // ------------------------------------------------------

    setFile(selectedFile);

    setUploadMessage("");

    setIndexed(false);

  };


  // ========================================================
  // UPLOAD / INDEX PDF
  // POST /upload
  // ========================================================

  const handleIndexPDF = async () => {

    if (!file) {

      alert(
        "Please select a PDF file first."
      );

      return;
    }


    setUploading(true);

    setUploadMessage("");

    setIndexed(false);


    try {

      // ----------------------------------------------------
      // CREATE FORM DATA
      // ----------------------------------------------------

      const formData =
        new FormData();


      // IMPORTANT:
      // These names must match FastAPI

      formData.append(
        "file",
        file
      );

      formData.append(
        "chunk_method",
        chunkStrategy
      );

      formData.append(
        "embedding_model",
        embeddingModel
      );


      // ----------------------------------------------------
      // DEBUG LOG
      // ----------------------------------------------------

      console.log(
        "========== UPLOAD REQUEST =========="
      );

      console.log({
        file: file.name,
        chunk_method: chunkStrategy,
        embedding_model: embeddingModel,
        url: `${API_BASE_URL}/upload`
      });


      // ----------------------------------------------------
      // API REQUEST
      // ----------------------------------------------------

      const response =
        await fetch(
          `${API_BASE_URL}/upload`,
          {
            method: "POST",
            body: formData
          }
        );


      // ----------------------------------------------------
      // READ RESPONSE
      // ----------------------------------------------------

      const responseText =
        await response.text();


      console.log(
        "Upload API Status:",
        response.status
      );

      console.log(
        "Upload API Raw Response:",
        responseText
      );


      // ----------------------------------------------------
      // HTTP ERROR
      // ----------------------------------------------------

      if (!response.ok) {

        let serverMessage =
          responseText;


        try {

          const errorJson =
            JSON.parse(responseText);

          serverMessage =
            errorJson.detail ||
            errorJson.message ||
            responseText;

        } catch {

          // Keep original response
        }


        throw new Error(
          `Upload API failed (${response.status}): ${serverMessage}`
        );
      }


      // ----------------------------------------------------
      // PARSE RESPONSE
      // ----------------------------------------------------

      let result;

      try {

        result =
          JSON.parse(
            responseText
          );

      } catch {

        result =
          responseText;
      }


      console.log(
        "Upload API Parsed Response:",
        result
      );


      // ----------------------------------------------------
      // SUCCESS MESSAGE
      // ----------------------------------------------------

      let successMessage =
        "PDF indexed successfully.";


      if (
        typeof result === "string"
      ) {

        successMessage =
          result;

      } else if (
        result?.message
      ) {

        successMessage =
          result.message;

      } else if (
        result?.chunks
      ) {

        successMessage =
          `PDF indexed successfully! ${result.chunks} chunks created.`;

      }


      setUploadMessage(
        successMessage
      );

      setIndexed(true);


      // ----------------------------------------------------
      // CLEAR PREVIOUS CHAT
      // ----------------------------------------------------

      setMessages([]);


      alert(
        successMessage
      );


    } catch (error) {

      console.error(
        "Upload API Error:",
        error
      );


      let errorMessage =
        error?.message ||
        "Unknown upload error.";


      // ----------------------------------------------------
      // CONNECTION ERROR
      // ----------------------------------------------------

      if (
        error instanceof TypeError &&
        error.message === "Failed to fetch"
      ) {

        errorMessage =
          `Cannot connect to FastAPI backend.

Please make sure FastAPI is running on:
${API_BASE_URL}

Run:
python -m uvicorn backend.api:app --reload --host 127.0.0.1 --port 8000`;
      }


      setUploadMessage(
        `Upload failed: ${errorMessage}`
      );

      setIndexed(false);


    } finally {

      setUploading(false);

    }

  };


  // ========================================================
  // MAP RETRIEVAL STRATEGY
  // ========================================================

  const getRetrievalMethod = () => {

    switch (retrievalStrategy) {

      case "Similarity":
        return "Similarity";

      case "Multi Query":
        return "Multi Query";

      case "Vector Search":
        return "Vector Search";

      case "Hybrid Search":
        return "Hybrid Search";

      default:
        return "Similarity";

    }

  };


  // ========================================================
  // ASK QUESTION
  // POST /ask
  // ========================================================

  const handleAskAI = async () => {

    if (!question.trim()) {

      alert(
        "Please enter your question."
      );

      return;
    }


    const userQuestion =
      question.trim();


    // ------------------------------------------------------
    // CHECK PDF INDEXED
    // ------------------------------------------------------

    if (!indexed) {

      alert(
        "Please upload and index a PDF before asking questions."
      );

      return;
    }


    // ------------------------------------------------------
    // ADD USER MESSAGE
    // ------------------------------------------------------

    setMessages(
      (prev) => [
        ...prev,
        {
          type: "user",
          text: userQuestion
        }
      ]
    );


    setQuestion("");

    setAsking(true);


    try {

      // ----------------------------------------------------
      // RETRIEVAL METHOD
      // ----------------------------------------------------

      const retrievalMethod =
        getRetrievalMethod();


      // ----------------------------------------------------
      // REQUEST BODY
      // ----------------------------------------------------

      const requestBody = {

        question:
          userQuestion,

        retrieval_method:
          retrievalMethod,

        embedding_model:
          embeddingModel,

        top_k:
          Number(topK),

        score_threshold:
          Number(scoreThreshold),

        semantic_weight:
          0.7,

        keyword_weight:
          0.3,

        reranker_model:
          "None"

      };


      // ----------------------------------------------------
      // DEBUG LOG
      // ----------------------------------------------------

      console.log(
        "========== ASK REQUEST =========="
      );

      console.log(
        requestBody
      );


      console.log(
        "Ask API URL:",
        `${API_BASE_URL}/ask`
      );


      // ----------------------------------------------------
      // API REQUEST
      // ----------------------------------------------------

      const response =
        await fetch(
          `${API_BASE_URL}/ask`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body:
              JSON.stringify(
                requestBody
              )
          }
        );


      // ----------------------------------------------------
      // READ RESPONSE
      // ----------------------------------------------------

      const responseText =
        await response.text();


      console.log(
        "Ask API Status:",
        response.status
      );

      console.log(
        "Ask API Raw Response:",
        responseText
      );


      // ----------------------------------------------------
      // HTTP ERROR
      // ----------------------------------------------------

      if (!response.ok) {

        let serverMessage =
          responseText;


        try {

          const errorJson =
            JSON.parse(
              responseText
            );

          serverMessage =
            errorJson.detail ||
            errorJson.message ||
            responseText;

        } catch {

          // Keep original response
        }


        throw new Error(
          `Ask API failed (${response.status}): ${serverMessage}`
        );

      }


      // ----------------------------------------------------
      // PARSE RESPONSE
      // ----------------------------------------------------

      let result;

      try {

        result =
          JSON.parse(
            responseText
          );

      } catch {

        result =
          responseText;
      }


      console.log(
        "Ask API Parsed Response:",
        result
      );


      // ----------------------------------------------------
      // EXTRACT ANSWER
      // ----------------------------------------------------

      let botResponse =
        "";


      if (
        typeof result === "string"
      ) {

        botResponse =
          result;

      } else if (
        result?.answer
      ) {

        botResponse =
          result.answer;

      } else if (
        result?.response
      ) {

        botResponse =
          result.response;

      } else if (
        result?.message
      ) {

        botResponse =
          result.message;

      } else if (
        result?.result
      ) {

        botResponse =
          result.result;

      } else {

        botResponse =
          JSON.stringify(
            result,
            null,
            2
          );

      }


      // ----------------------------------------------------
      // ADD BOT RESPONSE
      // ----------------------------------------------------

      setMessages(
        (prev) => [
          ...prev,
          {
            type: "bot",
            text: botResponse
          }
        ]
      );


    } catch (error) {

      console.error(
        "Ask API Error:",
        error
      );


      let errorMessage =
        error?.message ||
        "Unknown error occurred.";


      // ----------------------------------------------------
      // CONNECTION ERROR
      // ----------------------------------------------------

      if (
        error instanceof TypeError &&
        error.message === "Failed to fetch"
      ) {

        errorMessage =
          `Cannot connect to FastAPI backend.

Please make sure FastAPI is running on:
${API_BASE_URL}

Run:
python -m uvicorn backend.api:app --reload --host 127.0.0.1 --port 8000`;
      }


      // ----------------------------------------------------
      // ADD ERROR MESSAGE
      // ----------------------------------------------------

      setMessages(
        (prev) => [
          ...prev,
          {
            type: "bot",
            text:
              `❌ ${errorMessage}`
          }
        ]
      );


    } finally {

      setAsking(false);

    }

  };


  // ========================================================
  // RENDER
  // ========================================================

  return (

    <div className="container">

      {/* ==================================================
          HEADER
      ================================================== */}

      <div className="header">

        <h1 className="main-title">
          📚 AI Accelerator
        </h1>

        <p className="subtitle">
          Ask Questions From Your Documents
        </p>

      </div>


      {/* ==================================================
          MAIN GRID
      ================================================== */}

      <div className="main-grid">


        {/* ==================================================
            SETTINGS SIDEBAR
        ================================================== */}

        <div className="settings-card">

          <h4>
            ⚙️ Settings
          </h4>

          <hr />


          {/* ================================================
              EMBEDDING MODEL
          ================================================= */}

          <div className="form-group">

            <label className="form-label">
              Embedding Model
            </label>

            <select
              className="form-select"
              value={embeddingModel}
              onChange={(e) =>
                setEmbeddingModel(
                  e.target.value
                )
              }
              disabled={uploading || asking}
            >

              <option value="all-MiniLM-L6-v2">
                all-MiniLM-L6-v2
              </option>

              <option value="bge-small-en-v1.5">
                bge-small-en-v1.5
              </option>

              <option value="bge-base-en-v1.5">
                bge-base-en-v1.5
              </option>

              <option value="multi-qa-MiniLM-L6-cos-v1">
                multi-qa-MiniLM-L6-cos-v1
              </option>

            </select>

          </div>


          {/* ================================================
              CHUNK STRATEGY
          ================================================= */}

          <div className="form-group">

            <label className="form-label">
              Chunk Strategy
            </label>

            <select
              className="form-select"
              value={chunkStrategy}
              onChange={(e) =>
                setChunkStrategy(
                  e.target.value
                )
              }
              disabled={uploading || asking}
            >

              <option value="Recursive">
                Recursive
              </option>

              <option value="Fixed">
                Fixed
              </option>

              <option value="Page">
                Page
              </option>

            </select>

          </div>


          {/* ================================================
              RETRIEVAL STRATEGY
          ================================================= */}

          <div className="form-group">

            <label className="form-label">
              Retrieval Strategy
            </label>

            <select
              className="form-select"
              value={retrievalStrategy}
              onChange={(e) =>
                setRetrievalStrategy(
                  e.target.value
                )
              }
              disabled={asking}
            >

              <option value="Similarity">
                Similarity
              </option>

              <option value="Multi Query">
                Multi Query
              </option>

              <option value="Vector Search">
                Vector Search
              </option>

              <option value="Hybrid Search">
                Hybrid Search
              </option>

            </select>

          </div>


          {/* ================================================
              TOP K
          ================================================= */}

          <div className="form-group">

            <label className="form-label">
              Top K
            </label>

            <input
              type="range"
              min="1"
              max="20"
              value={topK}
              disabled={asking}
              onChange={(e) =>
                setTopK(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <div className="range-value">

              <span>
                1
              </span>

              <strong>
                {topK}
              </strong>

              <span>
                20
              </span>

            </div>

          </div>


          {/* ================================================
              SCORE THRESHOLD
          ================================================= */}

          <div className="form-group">

            <label className="form-label">
              Score Threshold
            </label>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={scoreThreshold}
              disabled={asking}
              onChange={(e) =>
                setScoreThreshold(
                  Number(
                    e.target.value
                  )
                )
              }
            />

            <div className="range-value">

              <span>
                0
              </span>

              <strong>
                {scoreThreshold.toFixed(2)}
              </strong>

              <span>
                1
              </span>

            </div>

          </div>


          <hr />


          {/* ================================================
              SYSTEM INFO
          ================================================= */}

          <div className="system-info">

            <h6>
              System Info
            </h6>

            <p>
              <strong>
                LLM:
              </strong>{" "}
              Groq
            </p>

            <p>
              <strong>
                Vector DB:
              </strong>{" "}
              ChromaDB
            </p>

            <p>
              <strong>
                Backend:
              </strong>{" "}
              FastAPI
            </p>

            <p>
              <strong>
                Status:
              </strong>{" "}
              <span
                style={{
                  color: indexed
                    ? "#16a34a"
                    : "#6b7280"
                }}
              >
                {indexed
                  ? "PDF Indexed"
                  : "Waiting for PDF"}
              </span>
            </p>

          </div>

        </div>


        {/* ==================================================
            MAIN AREA
        ================================================== */}

        <div>


          {/* ==================================================
              PDF UPLOAD
          ================================================== */}

          <div className="upload-card">

            <h4>
              📄 Upload PDF
            </h4>


            <input
              type="file"
              className="form-control"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              disabled={uploading}
            />


            {/* ----------------------------------------------
                SELECTED FILE
            ----------------------------------------------- */}

            {file && (

              <p
                style={{
                  marginTop: "10px",
                  color: "#16a34a",
                  fontSize: "14px"
                }}
              >

                Selected:{" "}

                <strong>
                  {file.name}
                </strong>

              </p>

            )}


            {/* ----------------------------------------------
                UPLOAD MESSAGE
            ----------------------------------------------- */}

            {uploadMessage && (

              <p
                style={{
                  marginTop: "10px",
                  color:
                    uploadMessage
                      .toLowerCase()
                      .includes("failed")
                      ? "#dc2626"
                      : "#2563eb",
                  fontSize: "14px",
                  whiteSpace: "pre-line"
                }}
              >
                {uploadMessage}
              </p>

            )}


            {/* ----------------------------------------------
                INDEX BUTTON
            ----------------------------------------------- */}

            <button
              className="btn btn-primary"
              onClick={handleIndexPDF}
              disabled={
                uploading ||
                !file
              }
            >

              {uploading
                ? "⏳ Indexing..."
                : "🚀 Index PDF"}

            </button>

          </div>


          {/* ==================================================
              METRICS
          ================================================== */}

          <div className="metrics-grid">


            <div className="metric-card">

              <h6>
                Embedding
              </h6>

              <h5>
                {embeddingModel}
              </h5>

            </div>


            <div className="metric-card">

              <h6>
                Chunking
              </h6>

              <h5>
                {chunkStrategy}
              </h5>

            </div>


            <div className="metric-card">

              <h6>
                Retrieval
              </h6>

              <h5>
                {retrievalStrategy}
              </h5>

            </div>


            <div className="metric-card">

              <h6>
                Top K
              </h6>

              <h5>
                {topK}
              </h5>

            </div>

          </div>


          {/* ==================================================
              CHAT
          ================================================== */}

          <div className="chat-container">


            {/* ----------------------------------------------
                CHAT HEADER
            ----------------------------------------------- */}

            <div className="chat-header">

              🤖 AI Chat

            </div>


            {/* ----------------------------------------------
                CHAT BODY
            ----------------------------------------------- */}

            <div className="chat-body">


              {messages.length === 0 ? (

                <div className="empty-chat">

                  <div>

                    <div
                      style={{
                        fontSize: "35px"
                      }}
                    >
                      💬
                    </div>

                    <p>
                      {indexed
                        ? "Ask anything about your PDF..."
                        : "Upload and index a PDF to start chatting."}
                    </p>

                  </div>

                </div>

              ) : (

                messages.map(
                  (
                    message,
                    index
                  ) => (

                    <div
                      key={index}
                      className={
                        `message ${
                          message.type === "user"
                            ? "user-message"
                            : "bot-message"
                        }`
                      }
                    >

                      {message.text}

                    </div>

                  )
                )

              )}


              {/* ----------------------------------------------
                  LOADING
              ----------------------------------------------- */}

              {asking && (

                <div className="message bot-message">

                  🤖 Thinking...

                </div>

              )}

            </div>


            {/* ----------------------------------------------
                CHAT FOOTER
            ----------------------------------------------- */}

            <div className="chat-footer">


              <textarea
                className="form-control chat-textarea"
                rows="2"
                placeholder={
                  !indexed
                    ? "Please upload and index a PDF first..."
                    : asking
                      ? "AI is generating answer..."
                      : "Ask anything about your PDF..."
                }
                value={question}
                disabled={
                  asking ||
                  !indexed
                }
                onChange={(e) =>
                  setQuestion(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {

                  if (
                    e.key === "Enter" &&
                    !e.shiftKey
                  ) {

                    e.preventDefault();

                    if (
                      !asking &&
                      indexed &&
                      question.trim()
                    ) {

                      handleAskAI();

                    }

                  }

                }}
              />


              <button
                className="btn btn-success ask-button"
                onClick={handleAskAI}
                disabled={
                  asking ||
                  !indexed ||
                  !question.trim()
                }
              >

                {asking
                  ? "⏳ Asking..."
                  : "🤖 Ask AI"}

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


// ==========================================================
// EXPORT
// ==========================================================

export default AIAAccelerator;
