import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css";

function Login() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userData = {
      name: decoded.name,
      email: decoded.email,
      image: decoded.picture,
      provider: "Google",
      token: credentialResponse.credential
    };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    setError("");
  };

  const handleGoogleFailure = () => {
    setError("Google login failed. Please try again.");
  };

  const handleGitHubLogin = () => {
    const clientId = "Ov23liu4nLpR7guHNAiV";
    const redirectUri = "http://localhost:3000";
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email&prompt=select_account`;
    window.location.href = githubAuthUrl;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code && !user) {
      // Send code to backend to exchange for access token and fetch user data
      fetch('http://localhost:5000/api/auth/github', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
            window.history.replaceState({}, document.title, "/");
            setError("");
          }
        })
        .catch(() => setError("GitHub authentication failed"));
    }
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setError("");
    localStorage.removeItem("user");
  };

  return (
    <div className="login-container">
      {!user ? (
        <div className="login-card">
          <h1>Welcome Back</h1>
          <p className="subtitle">Sign in to continue</p>
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="login-buttons">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
              size="large"
              width="100%"
            />
            <button onClick={handleGitHubLogin} className="github-button">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>
      ) : (
        <div className="user-info">
          <img src={user.image} alt="profile" className="avatar" />
          <h2>{user.name}</h2>
          <p className="email">{user.email}</p>
          <span className="provider">Logged in via {user.provider}</span>
          <br />
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;
