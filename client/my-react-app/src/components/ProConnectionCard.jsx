import React from "react";

export default function ProConnectionCard({ professional, onBack }) {
  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #dbeafe",
        borderRadius: "18px",
        padding: "1.25rem",
        boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
        <div>
          <h2 style={{ margin: 0, color: "#0f172a", fontSize: "1.45rem" }}>
            {professional?.name || "ללא שם"}
          </h2>
          <p style={{ margin: "0.25rem 0 0", color: "#475569" }}>
            {professional?.role || "איש מקצוע"}
          </p>
        </div>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "#4c7ee1",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "0.75rem 1rem",
            cursor: "pointer",
          }}
        >
          חזרה
        </button>
      </div>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <span
          style={{
            width: "0.85rem",
            height: "0.85rem",
            borderRadius: "50%",
            background: professional?.status === "Connected" ? "#34d399" : "#f59e0b",
            display: "inline-block",
          }}
        />
        <span style={{ color: "#475569", fontWeight: 600 }}>
          {professional?.status || "Offline"}
        </span>
      </div>
    </section>
  );
}
