import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getLogin = (userId) => {
    // console.log(jwtToken)
    console.log("User ID:", userId);
    sessionStorage.setItem("user_id", userId);
    navigate("/dashboard"); // Redirect to dashboard using React Router
  };

  const verifyCredentials = async () => {
    try {
      const newUser = { username, password };
      console.log(newUser);
      const response = await axios.post(
        "https://loginappbackend-k3cu.onrender.com/login",
        newUser,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 5000, // 5 seconds timeout
        }
      );
      console.log(response, "response");
      if (response.data) {
        getLogin(response.data);
        return response.data;
      } else {
        setError("Invalid response from server");
        return null;
      }
    } catch (err) {
      setError(err.response ? err.response.data : "Failed credentials");
      console.log("Error", err.response ? err.response.data : err.message);
    }
  };

  const submitFormData = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Call verifyCredentials to handle login
    verifyCredentials();
  };

  return (
    <div className="App">
      <form className="form form-container" onSubmit={submitFormData}>
        <h1 className="login-heading">User Login</h1>
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
          autoComplete="current-password"
        />
        <button type="submit" className="submit-btn">
          Login
        </button>
        <div>
          <p>
            New user? <a href="/register">Register here</a>
          </p>
        </div>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
