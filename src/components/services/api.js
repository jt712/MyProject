import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getAgentData = () => {
  return axios.get(`${API_URL}/`);
};

export const generateContent = (query) => {
  return axios.post(`${API_URL}/api/v1/generate`, {
    query,
    compile_pdf: true,
    language_override: "English",
    stream_override: "education",
  });
};


export const sendChat = async (payload) => {
  return await axios.post(
    "http://127.0.0.1:8000/api/v1/chat",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

