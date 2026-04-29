import { useState } from "react";
import API from "../api/axios.js";
import { useParams, useNavigate, useNavigation } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/signin.css"


export default function Signin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("accounts/signin/", form);

    localStorage.setItem("access_token", res.data.access);

    navigate(`/home/`);
    } catch (err) {
      setMessage(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="signin-body">
      <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <h2>Login Form</h2>

        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">Sign in</button>

        <p>{message}</p>
      </form>
    </div>
    </div>
  );
}