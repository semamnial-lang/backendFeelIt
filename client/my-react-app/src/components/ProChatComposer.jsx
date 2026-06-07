import React, { useState } from "react";

const quickOptions = [
  "אני מרגיש קצת לחוץ ולא יודע איך להתחיל",
  "תוכל לעזור לי להרגיע את המתח?",
  "אני רוצה לדבר על מצב הרוח שלי היום",
];

export default function ProChatComposer({ onSend, disabled }) {
  const [draft, setDraft] = useState("");

  const submitDraft = (event) => {
    event.preventDefault();
    if (disabled) return;
    const value = draft.trim();
    if (!value) return;
    onSend(value);
    setDraft("");
  };

  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #dbeafe",
        borderRadius: "18px",
        padding: "1.25rem",
      }}
    >
      <h2 style={{ margin: 0, color: "#0f172a" }}>הודעה מהירה</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
        {quickOptions.map((option) => (
          <button
            key={option}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && onSend(option)}
            style={{
              background: disabled ? "#f8fafc" : "#e0f2fe",
              border: "1px solid #93c5fd",
              color: disabled ? "#94a3b8" : "#0f172a",
              borderRadius: "14px",
              padding: "0.75rem 0.95rem",
              cursor: disabled ? "not-allowed" : "pointer",
            }}
          >
            {option}
          </button>
        ))}
      </div>

      <form onSubmit={submitDraft} style={{ display: "flex", gap: "0.75rem" }}>
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="הקלד הודעה"
          disabled={disabled}
          style={{
            flex: 1,
            border: "1px solid #cbd5e1",
            borderRadius: "16px",
            padding: "0.9rem 1rem",
            fontSize: "1rem",
            background: disabled ? "#f8fafc" : "white",
            color: disabled ? "#94a3b8" : "#0f172a",
          }}
        />
        <button
          type="submit"
          disabled={disabled}
          style={{
            background: disabled ? "#cbd5e1" : "#4c7ee1",
            color: "white",
            border: "none",
            borderRadius: "16px",
            padding: "0.95rem 1.25rem",
            cursor: disabled ? "not-allowed" : "pointer",
          }}
        >
          שליחה
        </button>
      </form>
    </section>
  );
}
