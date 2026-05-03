import { useState, useEffect } from "react";
import API from "../api/axios.js";
import { useParams, useNavigate, Link } from "react-router-dom"
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

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/accounts/signup/", form);

    if (res.status === 201) {
      alert("Signup success");
      setMessage(res.data.message);
    }
    navigate("/signin/");

  } 
  catch (error) {
  alert(
    error.response?.data?.error ||
    JSON.stringify(error.response?.data) ||
    "Signup failed"
  );
}
};

  return (
    <>
      <div className="container-fluid signup-body">
      <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>SignUp Form</h2>

        <input type="text" name="username" placeholder="Username" onChange={handleChange} />
        <input type="text" name="first_name" placeholder="FirstName" onChange={handleChange} />
        <input type="text" name="last_name" placeholder="LastName" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="password" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} />

        <button type="submit">Register</button>
        <p>{message}</p>
        
        <div className="signin-root">
          <p>already have an account</p>
          <Link to={`/signin/`} className="text-white btn btn-primary p-1">Click here</Link>
        </div>
      </form>
    </div>
    </div>
    </>
  );
}