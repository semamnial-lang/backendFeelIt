import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "בית", path: "/dashboard", icon: "🏠" },
  { label: "פרופיל", path: "/profile", icon: "👤" },
  { label: "צ'אט", path: "/chat", icon: "💬" },
  { label: "קבוצות", path: "/groups", icon: "👥" },
  { label: "משחקים", path: "/games", icon: "🎮" },
  { label: "חיפוש", path: "/search", icon: "🔎" },
];

export default function DashboardShell({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dashboard-shell">
      <div className="dashboard-container">{children}</div>
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <button
            key={item.path}
            type="button"
            className={`bottom-nav-item ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => navigate(item.path)}
          >
            <span className="icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
