import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const options = [
  { label: "Profile", description: "View and edit your profile." },
  {
    label: "Activity / Games",
    description: "See today’s activity and play uplifting games.",
  },
  { label: "Messages", description: "Read and send messages." },
  { label: "Friends", description: "Manage your friends list." },
  {
    label: "Talk to a Professional",
    description: "Connect with a counselor or coach.",
    route: "/talk-to-professional",
  },
  {
    label: "Call / Video Call",
    description: "Start a voice or video conversation.",
  },
];

const initialQuickPeople = [
  { name: "דניאל", age: 27, mood: "🙂", isOnline: true },
  { name: "נועה", age: 22, mood: "💬", isOnline: true },
  { name: "יואב", age: 24, mood: "💙", isOnline: false },
];

function getPresenceColor(isOnline) {
  return isOnline ? "#22c55e" : "#94a3b8";
}

function getPresenceText(isOnline) {
  return isOnline ? "מחובר" : "לא מחובר";
}

function getNextPresence(isOnline) {
  if (isOnline) return Math.random() < 0.85 ? true : false;
  return Math.random() < 0.25 ? true : false;
}

export default function RealHome() {
  const navigate = useNavigate();
  const [quickPeople, setQuickPeople] = useState(initialQuickPeople);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuickPeople((prevPeople) =>
        prevPeople.map((person) => ({
          ...person,
          isOnline: getNextPresence(person.isOnline),
        }))
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1rem",
        background: "#f3f7ff",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "980px",
          background: "white",
          borderRadius: "26px",
          boxShadow: "0 26px 70px rgba(15, 23, 42, 0.12)",
          padding: "2.5rem",
          border: "1px solid #dbeafe",
        }}
      >
        <div style={{ marginBottom: "2rem", textAlign: "center" }}>
          <h1 style={{ margin: 0, fontSize: "3rem", color: "#0f172a" }}>
            Your Home
          </h1>
          <p
            style={{
              margin: "1rem auto 0",
              maxWidth: "680px",
              color: "#475569",
              fontSize: "1.05rem",
            }}
          >
            Choose one of the options below to explore your profile, activity,
            messaging, friends, professional support, and calls.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {options.map((option) => (
            <div
              key={option.label}
              style={{
                background: "#eff6ff",
                padding: "1.5rem",
                borderRadius: "22px",
                border: "1px solid #bfdbfe",
                minHeight: "170px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <h2
                  style={{ margin: 0, fontSize: "1.35rem", color: "#0f172a" }}
                >
                  {option.label}
                </h2>
                <p
                  style={{
                    margin: "0.75rem 0 0",
                    color: "#475569",
                    lineHeight: 1.7,
                  }}
                >
                  {option.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (option.route) {
                    navigate(option.route);
                    return;
                  }
                  alert(`${option.label} page coming soon!`);
                }}
                style={{
                  marginTop: "1.25rem",
                  border: "none",
                  borderRadius: "14px",
                  padding: "0.95rem 1rem",
                  fontSize: "1rem",
                  background: "#4C7EE1",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Open
              </button>
            </div>
          ))}
        </div>
      </div>

      <section className="people-section">
        <div className="section-heading">
          <span className="section-title">אנשים שאולי תאהב/י</span>
          <button type="button" className="btn btn-ghost" onClick={() => navigate('/search')}>
            הכל
          </button>
        </div>
        <div className="people-grid">
          {quickPeople.map((person) => (
            <article key={person.name} className="glass-card person-card">
              <div className="person-card-top">
                <div className="person-avatar">{person.mood}</div>
                <div>
                  <strong>{person.name}</strong>
                  <p>{person.age} גיל</p>
                </div>
              </div>
              <div className="person-tags" style={{ alignItems: "center" }}>
                <span>מחפש/ת: חברים חדשים</span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span
                    style={{
                      width: "0.65rem",
                      height: "0.65rem",
                      borderRadius: "50%",
                      background: getPresenceColor(person.isOnline),
                      display: "inline-block",
                    }}
                  />
                  {getPresenceText(person.isOnline)}
                </span>
              </div>
              <button type="button" className="btn btn-primary">שלח הודעה</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
