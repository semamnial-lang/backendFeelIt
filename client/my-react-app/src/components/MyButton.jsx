import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyButton() {
  const navigate = useNavigate();
  return (
    <div className="auth-buttons" style={{ marginTop: '2rem' }}>
      <button onClick={() => navigate('/login')} className="btn btn-ghost">Sign In</button>
    </div>
  );
}
