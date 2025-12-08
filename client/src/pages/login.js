import React, { useState } from "react";
import "./css/login.css";
import axios from "axios";

function Login() {
  const active = window.location.href.split("/")[3];
  const set = active === "login" ? 0 : 1;
  const [activeTab, setActiveTab] = useState(set);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signupMessage, setSignupMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const backend = "https://languagesbackend.onrender.com";

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setErrorMessage("");
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `${backend}/api/users/${loginUsername}/${loginPassword}`
      );
      if (response.status === 200) {
        setLoginStatus(response.data.data.data.userName);
        setLoginMessage("Successfully Logged In");
        window.location.href = "/home";
      } else {
        setLoginMessage("Login failed");
      }
    } catch (error) {
      console.error(error, errorMessage);
      setErrorMessage("Invalid UserName or Password!");
    }

    setLoginUsername("");
    setLoginPassword("");
    setTimeout(() => {
      setLoginMessage("");
      setErrorMessage("");
    }, 1000);
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${backend}/api/users/`, {
        userName,
        password,
        email,
      });
      console.log(response);
      if (response.data.status === "success") {
        setSignupMessage("Successfully Signed Up!");
        window.location.href = "/home";
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error(error, errorMessage);
      setErrorMessage("An error occurred during login.");
    }

    setUserName("");
    setPassword("");
    setEmail("");
    setTimeout(() => {
      setSignupMessage("");
      setErrorMessage("");
    }, 5000);
  };

  return (
    <div className="login">
      <div className="box">
        <div className="login-page">
          <div className="tabs">
            <button
              className={`tab ${activeTab === 0 ? "active" : ""}`}
              onClick={(e) => handleTabChange(e, 0)}
            >
              Login
            </button>
            <button
              className={`tab ${activeTab === 1 ? "active" : ""}`}
              onClick={(e) => handleTabChange(e, 1)}
            >
              Signup
            </button>
          </div>
          <div className="form-container">
            {activeTab === 0 && (
              <form onSubmit={handleLoginSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <button type="submit">Login</button>
              </form>
            )}
            {activeTab === 1 && (
              <form onSubmit={handleSignupSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Signup</button>
              </form>
            )}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {signupMessage && <p className="error-message">{signupMessage}</p>}
            {loginMessage && (
              <p className="error-message">
                {loginMessage} as {loginStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
