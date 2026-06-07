import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProConnectionCard from "../components/ProConnectionCard";
import ProChatMessages from "../components/ProChatMessages";
import ProChatComposer from "../components/ProChatComposer";

const professional1 = {
  name: "Dr. Maya Ben",
  role: "Licensed Mental Health Counselor",
  status: "Connected",
};

const professional2 = {
  name: "Dr. Sarah Cohen",
  role: "Clinical Psychologist",
  status: "Not Connected",
};

const responsePool = [
  "Thank you for sharing that. You are not alone in this.",
  "That sounds heavy. Let's break it down one step at a time.",
  "I hear you. Would grounding exercises help right now?",
  "You're doing the right thing by reaching out. I'm here with you.",
];

export default function TalkToProfessional() {
  const navigate = useNavigate();
  const [professional, setProfessional] = useState(professional1);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "system",
      senderName: "System",
      text: `${professional1.name} is now connected to this chat.`,
    },
    {
      id: 2,
      sender: "professional",
      senderName: professional1.name,
      text: "Hi, I am glad you reached out today. How are you feeling right now?",
    },
  ]);

  const nextId = useMemo(() => messages.length + 1, [messages.length]);

  const sendUserMessage = (text) => {
    const userMessage = {
      id: nextId,
      sender: "user",
      senderName: "You",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    window.setTimeout(() => {
      const randomReply =
        responsePool[Math.floor(Math.random() * responsePool.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "professional",
          senderName: professional.name,
          text: randomReply,
        },
      ]);
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eef4ff 0%, #f8fafc 100%)",
        padding: "2.2rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          margin: "0 auto",
          display: "grid",
          gap: "1rem",
        }}
      >
        <div>
          <h1
            style={{
              margin: "0 0 0.35rem",
              color: "#0f172a",
              fontSize: "2.2rem",
            }}
          >
            Talk to a Professional
          </h1>
          <p style={{ margin: 0, color: "#475569", lineHeight: 1.6 }}>
            This secure demo chat lets you practice opening a conversation with
            a licensed professional.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <button
            type="button"
            onClick={() => setProfessional(professional1)}
            style={{
              background: professional.name === professional1.name ? "#34d399" : "#f1f5f9",
              color: professional.name === professional1.name ? "white" : "#0f172a",
              border: "1px solid #cbd5e1",
              borderRadius: "14px",
              padding: "0.8rem 1rem",
              cursor: "pointer",
              fontWeight: professional.name === professional1.name ? "600" : "400",
            }}
          >
            {professional1.name} ✓
          </button>
          <button
            type="button"
            onClick={() => setProfessional(professional2)}
            style={{
              background: professional.name === professional2.name ? "#f8fafc" : "#f1f5f9",
              color: professional.name === professional2.name ? "#0f172a" : "#475569",
              border: "1px solid #cbd5e1",
              borderRadius: "14px",
              padding: "0.8rem 1rem",
              cursor: "pointer",
              fontWeight: professional.name === professional2.name ? "600" : "400",
            }}
          >
            {professional2.name}
          </button>
        </div>

        <ProConnectionCard
          professional={professional}
          onBack={() => navigate("/dashboard")}
        />

        {professional.status !== "Connected" && (
          <section
            style={{
              background: "#f8fafc",
              border: "1px solid #dbeafe",
              borderRadius: "18px",
              padding: "1rem",
              color: "#334155",
            }}
          >
            <p style={{ margin: 0, fontSize: "1rem" }}>
              {professional.name} is currently not available. Please try again later or select the other professional.
            </p>
          </section>
        )}

        <ProChatMessages
          messages={
            professional.status === "Connected"
              ? messages
              : [
                  {
                    id: 1,
                    sender: "system",
                    senderName: "System",
                    text: `${professional.name} is not connected right now.`,
                  },
                ]
          }
        />

        <ProChatComposer
          onSend={sendUserMessage}
          disabled={professional.status !== "Connected"}
        />
      </div>
    </div>
  );
}
