import React, { useState } from "react";

const suggestions = ["חברים חדשים", "משחקים מומלצים", "קבוצות תמיכה", "מוזיקה להרגעה"];

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <main className="dashboard-panel">
      <section className="page-header">
        <p className="eyebrow">חיפוש</p>
        <h1>מצא את מה שמעניין אותך</h1>
        <p className="subtext">חפש מבין שיחות, קהילות ומשאבים בתוך האפליקציה.</p>
      </section>

      <section className="glass-card search-card">
        <label className="page-section-title">חיפוש מהיר</label>
        <input
          className="input-glow"
          type="text"
          placeholder="הקלד כאן..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="suggestion-list">
          {suggestions.map((item) => (
            <button key={item} type="button" className="pill-chip">{item}</button>
          ))}
        </div>
      </section>
    </main>
  );
}
