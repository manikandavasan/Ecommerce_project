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

  try {
    const res = await API.post("/accounts/signup/", form);

    console.log("Signup response:", res.data);

    if (res.status === 201) {
      alert("Signup success");
      setMessage(res.data.message);
    }
    navigate("/signin/");

  } 
  catch (error) {
  console.log("FULL ERROR:", error.response);

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
        <p>already have an account <button className="text-white btn btn-primary p-1" onClick={GoSignin}>Click here</button></p>
      </form>
    </div>
    </div>
    </>
  );
}