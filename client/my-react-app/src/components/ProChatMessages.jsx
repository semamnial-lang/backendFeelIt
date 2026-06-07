import React, { useEffect, useRef } from "react";

export default function ProChatMessages({ messages }) {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section
      style={{
        background: "#ffffff",
        border: "1px solid #dbeafe",
        borderRadius: "18px",
        padding: "1.25rem",
        minHeight: "360px",
      }}
    >
      <h2 style={{ margin: 0, color: "#0f172a" }}>שיחה</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {messages.map((message) => {
          const isSystem = message.sender === "system";
          const isUser = message.sender === "user";
          const isProfessional = message.sender === "professional";
          return (
            <div
              key={message.id}
              style={{
                alignSelf: isUser ? "flex-end" : isProfessional ? "flex-start" : "center",
                maxWidth: "78%",
                background: isSystem
                  ? "#f1f5f9"
                  : isUser
                  ? "#c7d2fe"
                  : "#e0f2fe",
                color: "#0f172a",
                borderRadius: "16px",
                padding: "0.85rem 1rem",
                border: isSystem ? "1px solid #cbd5e1" : "1px solid transparent",
                boxShadow: isSystem ? "none" : "0 8px 20px rgba(15, 23, 42, 0.05)",
              }}
            >
              <div style={{ fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.3rem" }}>
                {message.senderName}
              </div>
              <div style={{ lineHeight: 1.6 }}>{message.text}</div>
            </div>
          );
        })}
      </div>
      <div ref={endRef} />
    </section>
  );
}
