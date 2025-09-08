import React, { useState, useEffect } from "react";
import axios from "axios";
// import Cookies from "js-cookie";
import "../App.css";

const Register = (props) => {
  const [username, setUsername] = useState("akhil@gmail.com");
  const [password, setPassword] = useState("pswrds");
  const [error, setError] = useState(null);
  const [successmsg, setSuccessMsg] = useState(null);

  const registerUser = async () => {
    try {
      const newUser = { username, password };
      console.log(newUser);
      const response = await axios.post(
        "https://loginappbackend-k3cu.onrender.com/register",
        newUser,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000, // 5 seconds timeout
        }
      );
      console.log(response.data);
      setSuccessMsg("Registration successful! Please log in.");
      return response.data;
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
      console.log("Error", err.response ? err.response.data : err.message);
    }
    //
  };

  const submitFormData = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Add form submission logic here
    registerUser();
  };

  return (
    <div className="App">
      <form className="form form-container" onSubmit={submitFormData}>
        <h1 className="login-heading">Register User</h1>
        <input
          type="email"
          placeholder="USERNAME"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="input-field"
        />
        <input
          type="password"
          placeholder="PASSWORD"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="input-field"
          autoComplete="new-password"
        />
        <button type="submit" className="submit-btn">
          Register or Sign Up
        </button>
        <p>
          Existing User! <a href="/">Login</a>{" "}
        </p>
        {successmsg && (
          <>
            <p className="success-message">{successmsg}</p>
            <p>
              Proceed to <a href="/">Login</a>
            </p>
          </>
        )}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
