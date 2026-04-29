import { useState, useEffect } from "react";
import API from "../api/axios.js";
import { useParams, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import "../assets/css/signup.css"

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const GoSignin = ()=>{
    navigate("/signin/")
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
  !form.username?.trim() ||
  !form.email?.trim() ||
  !form.password?.trim() ||
  !form.confirm_password?.trim()
) {
  alert("All fields are required");
  return;
}

  try {
    const res = await API.post("/accounts/signup/", form);

    console.log("Signup response:", res.data);

    if (res.status === 201) {
      alert("Signup success");
      setMessage(res.data.message);

      // IMPORTANT: consistent route
      navigate("/signin/");
    }

  } catch (error) {
    console.log("Signup error:", error.response?.data);
    alert(error.response?.data?.error || "Signup failed");
  }
};

  return (
    <>
      <div className="container-fluid signup-body">
      <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>SignUp Form</h2>

        <input type="text" name="username" value={form.username} onChange={handleChange} />
        <input type="text" name="first_name" value={form.first_name} onChange={handleChange} />
        <input type="text" name="last_name" value={form.last_name} onChange={handleChange} />
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        <input type="password" name="confirm_password" value={form.confirm_password} onChange={handleChange} />

        <button type="submit">Register</button>
        <p>{message}</p>
        <p>already have an account <button className="text-white btn btn-primary p-1" onClick={GoSignin}>Click here</button></p>
      </form>
    </div>
    </div>
    </>
  );
}