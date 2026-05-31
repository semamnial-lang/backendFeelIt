import React, { useState } from "react";

const contacts = [
  { id: "ortal", name: "אורטל", intro: "היי! איך הולך היום?" },
  { id: "dani", name: "דני", intro: "נשמע שאתה צריך לשתף..." },
  { id: "hila", name: "הילה", intro: "יש לי המלצה על סדרה חדשה." },
];

const initialMessages = {
  ortal: [
    { sender: "other", text: "היי! איך הולך היום?", time: "Now" },
    { sender: "me", text: "בסדר, קצת לחוץ אבל מסתדר.", time: "Now" },
  ],
  dani: [
    { sender: "other", text: "נשמע שאתה צריך לשתף...", time: "12:30" },
  ],
  hila: [
    { sender: "other", text: "יש לי המלצה על סדרה חדשה.", time: "Yesterday" },
  ],
};

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState(contacts[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");

  const currentContact = contacts.find((contact) => contact.id === selectedContact);
  const chatMessages = messages[selectedContact] || [];

  const handleSend = () => {
    if (!draft.trim()) return;

    const nextMessage = {
      sender: "me",
      text: draft.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), nextMessage],
    }));
    setDraft("");
  };

  return (
    <main className="dashboard-panel chat-page">
      <section className="page-header">
        <p className="eyebrow">צ'אט</p>
        <h1>דבר עם אנשים</h1>
        <p className="subtext">בחר חבר, שלח הודעה וקבל חיבור אישי.</p>
      </section>

      <section className="glass-card chat-container">
        <aside className="chat-sidebar">
          <div className="page-section-title">אנשים לשיחה</div>
          <div className="contact-list">
            {contacts.map((contact) => (
              <button
                type="button"
                key={contact.id}
                className={`contact-item ${contact.id === selectedContact ? "active" : ""}`}
                onClick={() => setSelectedContact(contact.id)}
              >
                <div>
                  <strong>{contact.name}</strong>
                  <p>{contact.intro}</p>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="chat-panel">
          <div className="chat-header">
            <div>
              <p className="eyebrow">שיחה עם</p>
              <h2>{currentContact?.name}</h2>
            </div>
          </div>

          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender === "me" ? "mine" : "theirs"}`}
              >
                <p>{message.text}</p>
                <span>{message.time}</span>
              </div>
            ))}
          </div>

          <div className="chat-input-row">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="כתוב הודעה..."
              rows={3}
            />
            <button type="button" className="btn btn-primary" onClick={handleSend}>
              שלח
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
