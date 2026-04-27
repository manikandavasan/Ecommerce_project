import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/",
});

// attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  // ❗ don't attach token for auth routes
  if (token && !config.url.includes("signin") && !config.url.includes("signup")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;