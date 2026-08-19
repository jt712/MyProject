
import "./RightSidebar.css";

import { useState } from "react";

import {
  uploadDocuments,
} from "../services/api";


function RightSidebar() {

  const [open, setOpen] =
    useState(true);

  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null);

  const [
    documentType,
    setDocumentType,
  ] = useState("cutoff");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");


  /* =====================================================
     FILE CHANGE
  ===================================================== */

  const handleFileChange =
    (e) => {

      const file =
        e.target.files?.[0];


      setMessage("");
      setError("");


      if (!file) {

        setSelectedFile(
          null
        );

        return;
      }


      /*
        Maximum file size = 10 MB
      */

      const maxSize =
        10 * 1024 * 1024;


      if (
        file.size >
        maxSize
      ) {

        setSelectedFile(
          null
        );

        setError(
          "File size should be less than 10 MB."
        );

        e.target.value =
          "";

        return;
      }


      setSelectedFile(
        file
      );
    };


  /* =====================================================
     UPLOAD
  ===================================================== */

  const handleUpload =
    async () => {

      setMessage("");
      setError("");


      if (!selectedFile) {

        setError(
          "Please select a document first."
        );

        return;
      }


      try {

        setLoading(true);


        console.log(
          "Selected file:",
          selectedFile
        );

        console.log(
          "Document type:",
          documentType
        );


        const response =
          await uploadDocuments(
            [selectedFile],
            documentType
          );


        console.log(
          "Upload response:",
          response
        );


        setMessage(
          response?.message ||
          response?.detail ||
          "Document uploaded and indexed successfully."
        );


        setSelectedFile(
          null
        );


        const input =
          document.getElementById(
            "knowledge-file"
          );


        if (input) {
          input.value = "";
        }


      } catch (error) {

        console.error(
          "Document upload error:",
          error
        );


        setError(
          error?.message ||
          "Unable to upload document. Please try again."
        );

      } finally {

        setLoading(
          false
        );
      }
    };


  return (

    <div
      className={`right-sidebar ${
        open
          ? "open"
          : "close"
      }`}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div
        className="knowledge-header"

        onClick={() =>
          setOpen(!open)
        }
      >

        <span className="header-label">
          Knowledge Base
        </span>

        <span className="header-icon">
          ☰
        </span>

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      {open && (

        <div className="right-sidebar-content">

          <h4>
            📚 Knowledge Base
          </h4>


          {/* =============================================
              FILE
          ============================================= */}

          <label className="upload-label">
            Select Document
          </label>


          <div className="upload-box">

            <input
              id="knowledge-file"

              type="file"

              accept="
                .pdf,
                .doc,
                .docx,
                .txt,
                .csv,
                .xlsx
              "

              onChange={
                handleFileChange
              }

              disabled={
                loading
              }
            />

          </div>


          {/* =============================================
              SELECTED FILE
          ============================================= */}

          {selectedFile && (

            <div className="selected-file">

              <span className="file-icon">
                📄
              </span>

              <div className="file-info">

                <span className="file-name">
                  {selectedFile.name}
                </span>

                <span className="file-size">

                  {(
                    selectedFile.size /
                    (1024 * 1024)
                  ).toFixed(2)}{" "}
                  MB

                </span>

              </div>

            </div>
          )}


          {/* =============================================
              DOCUMENT TYPE
          ============================================= */}

          <label className="upload-label">
            Document Type
          </label>


          <select
            className="document-select"

            value={
              documentType
            }

            onChange={(e) =>
              setDocumentType(
                e.target.value
              )
            }

            disabled={
              loading
            }
          >

            <option value="cutoff">
              Cutoff
            </option>

            <option value="general">
              General
            </option>

          </select>


          {/* =============================================
              ERROR
          ============================================= */}

          {error && (

            <div className="upload-error">

              ❌ {error}

            </div>

          )}


          {/* =============================================
              SUCCESS
          ============================================= */}

          {message && (

            <div className="upload-success">

              ✅ {message}

            </div>

          )}


          {/* =============================================
              UPLOAD
          ============================================= */}

          <button
            className="upload-btn"

            onClick={
              handleUpload
            }

            disabled={
              loading ||
              !selectedFile
            }
          >

            {loading
              ? "Uploading & Indexing..."
              : "Upload & Index"}

          </button>

        </div>
      )}

    </div>
  );
}


export default RightSidebar;
