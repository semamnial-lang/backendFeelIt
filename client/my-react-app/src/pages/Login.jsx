import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { setCurrentEmail } from "../utils/moodStorage";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

async function signInWithServer(email, password) {
  if (!email || !password) {
    throw new Error("Email and password are required.");
  }

  try {
    const response = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.error || "Login failed.");
    }

    const body = await response.json();
    return body.user || null;
  } catch (error) {
    if (error instanceof TypeError) {
      return null;
    }
    throw error;
  }
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signInWithServer(email, password);
      setCurrentEmail(result?.email || email);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-screen">
      <form onSubmit={handleSubmit} className="auth-box">
        <h2>התחברות</h2>
        <div className="auth-field">
          <label>אימייל</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="auth-field">
          <label>סיסמה</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <div className="auth-actions">
          <button type="submit" className="btn btn-primary">התחבר</button>
        </div>
        <p className="auth-helper">
          עדיין לא רשום? <Link to="/register">צור חשבון</Link>
        </p>
      </form>
    </div>
  );
}
