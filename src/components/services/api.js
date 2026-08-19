
import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000";

/* =========================================================
   GET /
   Check whether API is running
========================================================= */

export const checkRootAPI = async () => {
  const response = await fetch(`${API_BASE_URL}/`);

  if (!response.ok) {
    throw new Error("Root API failed");
  }

  return await response.json();
};


/* =========================================================
   GET /health
========================================================= */

export const checkHealth = async () => {
  const response = await fetch(
    `${API_BASE_URL}/health`
  );

  if (!response.ok) {
    throw new Error("Health API failed");
  }

  return await response.json();
};


/* =========================================================
   POST /counsel
   Generate CAP counselling recommendations
========================================================= */

export const sendCounselRequest = async (profile) => {

  const requestBody = {
    student_profile: {
      percentile:
        Number(profile.ui_percentile) || 0,

      category:
        profile.ui_category || "OPEN",

      gender:
        profile.ui_gender === "General Pool"
          ? null
          : profile.ui_gender || null,

      preferred_branches:
        profile.ui_stream
          ? [profile.ui_stream]
          : [],

      preferred_locations:
        profile.ui_city &&
        profile.ui_city !== "Any"
          ? [profile.ui_city]
          : [],

      seat_type:
        profile.ui_seat_type === "Any"
          ? null
          : profile.ui_seat_type || null,

      college_count:
        Number(profile.ui_college_count) || 30,
    },

    user_request:
      "Generate a ranked CAP preference list with Dream, Target and Safe options.",
  };

  console.log(
    "========================================"
  );

  console.log(
    "Sending request to /counsel:"
  );

  console.log(
    JSON.stringify(
      requestBody,
      null,
      2
    )
  );

  console.log(
    "========================================"
  );

  try {

    const response = await fetch(
      `${API_BASE_URL}/counsel`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",
        },

        body:
          JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {

      const errorText =
        await response.text();

      throw new Error(
        `Counsel API Error ${response.status}: ${errorText}`
      );
    }

    const data =
      await response.json();

    console.log(
      "Counsel API response:",
      data
    );

    return data;

  } catch (error) {

    console.error(
      "Counsel API Error:",
      error
    );

    throw error;
  }
};


/* =========================================================
   POST /feedback

   Send follow-up request to counsellor
========================================================= */

export const sendFeedback = async (
  sessionId,
  feedback
) => {

  if (!sessionId) {
    throw new Error(
      "Counselling session ID is missing."
    );
  }

  if (!feedback?.trim()) {
    throw new Error(
      "Feedback message cannot be empty."
    );
  }

  const response = await fetch(
    `${API_BASE_URL}/feedback`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Accept:
          "application/json",
      },

      body:
        JSON.stringify({
          session_id:
            sessionId,

          feedback:
            feedback.trim(),
        }),
    }
  );

  if (!response.ok) {

    const errorText =
      await response.text();

    throw new Error(
      `Feedback API Error ${response.status}: ${errorText}`
    );
  }

  return await response.json();
};


/* =========================================================
   POST /upload

   Upload documents to Knowledge Base
========================================================= */

export const uploadDocuments = async (
  files,
  documentType
) => {

  if (!files || files.length === 0) {
    throw new Error(
      "Please select at least one file."
    );
  }

  const formData =
    new FormData();

  files.forEach((file) => {
    formData.append(
      "files",
      file
    );
  });

  formData.append(
    "document_type",
    documentType
  );

  console.log(
    "Uploading files:",
    files
  );

  console.log(
    "Document type:",
    documentType
  );

  try {

    const response =
      await fetch(
        `${API_BASE_URL}/upload`,
        {
          method: "POST",

          headers: {
            Accept:
              "application/json",
          },

          body:
            formData,
        }
      );

    if (!response.ok) {

      const errorText =
        await response.text();

      throw new Error(
        `Upload API Error ${response.status}: ${errorText}`
      );
    }

    const data =
      await response.json();

    console.log(
      "Upload API response:",
      data
    );

    return data;

  } catch (error) {

    console.error(
      "Document Upload Error:",
      error
    );

    throw error;
  }
};


/* =========================================================
   GET /download/{filename}

   Download generated Excel/report
========================================================= */

export const downloadFile = async (filename) => {
  if (!filename) {
    throw new Error("Filename is missing.");
  }

  console.log("Downloading Excel file:", filename);

  const downloadUrl =
    `${API_BASE_URL}/download/${encodeURIComponent(filename)}`;

  console.log("Download URL:", downloadUrl);

  try {
    const response = await fetch(downloadUrl, {
      method: "GET",
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    console.log("Download response status:", response.status);
    console.log("Download response:", response);

    if (!response.ok) {
      const errorText = await response.text();

      console.error(
        "Download API error:",
        errorText
      );

      throw new Error(
        `File download failed (${response.status}): ${errorText}`
      );
    }

    const blob = await response.blob();

    console.log(
      "Downloaded blob:",
      blob,
      "size:",
      blob.size,
      "type:",
      blob.type
    );

    if (!blob || blob.size === 0) {
      throw new Error(
        "Downloaded file is empty."
      );
    }

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      filename.toLowerCase().endsWith(".xlsx")
        ? filename
        : `${filename}.xlsx`;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => {
      window.URL.revokeObjectURL(url);
    }, 1000);

    console.log(
      "Excel download started successfully."
    );

  } catch (error) {

    console.error(
      "Excel download error:",
      error
    );

    throw error;
  }
};

/* =========================================================
   DELETE /knowledge-base

   Reset knowledge base
========================================================= */

export const resetKnowledgeBase =
  async () => {

    const response =
      await fetch(
        `${API_BASE_URL}/knowledge-base`,
        {
          method: "DELETE",

          headers: {
            Accept:
              "application/json",
          },
        }
      );

    if (!response.ok) {

      const errorText =
        await response.text();

      throw new Error(
        `Reset API Error ${response.status}: ${errorText}`
      );
    }

    return await response.json();
  };


/* =========================================================
   Existing APIs
========================================================= */

export const getAgentData = () => {
  return axios.get(
    `${API_BASE_URL}/`
  );
};


export const generateContent = (
  query
) => {

  return axios.post(
    `${API_BASE_URL}/api/v1/generate`,
    {
      query,

      compile_pdf:
        true,

      language_override:
        "English",

      stream_override:
        "education",
    }
  );
};


export const sendChat = async (
  payload
) => {

  return await axios.post(
    `${API_BASE_URL}/api/v1/chat`,
    payload,
    {
      headers: {
        "Content-Type":
          "application/json",
      },
    }
  );
};
