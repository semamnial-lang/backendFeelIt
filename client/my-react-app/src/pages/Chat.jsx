import React, { useRef, useState } from "react";

const contacts = [
  { id: "manasse", name: "Manasse Kofi", intro: "נשמח לשמוע איך אתה מרגיש היום.", status: "מתחבר עכשיו" },
  { id: "shay", name: "shay yadid", intro: "מוכן לשיחה, בוא נדבר.", status: "באינטרנט" },
  { id: "avic", name: "Avigail", intro: "אני כאן כדי להקשיב.", status: "זמין" },
];

const initialMessages = {
  manasse: [
    { sender: "other", type: "text", text: "היי! איך אתה מרגיש היום?", time: "Now" },
    { sender: "me", type: "text", text: "אני רוצה לדבר איתך על משהו חשוב.", time: "Now" },
  ],
  shay: [
    { sender: "other", type: "text", text: "נשמע שאתה צריך שיחה, בוא נתחיל.", time: "12:30" },
  ],
  avic: [
    { sender: "other", type: "text", text: "אני כאן לשמוע. שלח הודעה בזמן שנוח לך.", time: "Yesterday" },
  ],
};

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState(contacts[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const currentContact = contacts.find((contact) => contact.id === selectedContact);
  const chatMessages = messages[selectedContact] || [];

  const getTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const handleSend = () => {
    if (!draft.trim() && !selectedImage) return;

    const newMessages = [...chatMessages];
    const time = getTime();

    if (draft.trim()) {
      newMessages.push({ sender: "me", type: "text", text: draft.trim(), time });
    }

    if (selectedImage) {
      newMessages.push({ sender: "me", type: "image", src: selectedImage.url, alt: selectedImage.name, time });
    }

    setMessages((prev) => ({
      ...prev,
      [selectedContact]: newMessages,
    }));
    setDraft("");
    setSelectedImage(null);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setSelectedImage({ url, name: file.name });
    event.target.value = null;
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleStartCall = () => {
    alert("שיחה וידאו תגיע בקרוב - כרגע זה רק ממשק הודעות.");
  };

  return (
    <main className="dashboard-panel chat-page">
      <section className="page-header">
        <p className="eyebrow">צ'אט</p>
        <h1>תוכל לתקשר כאן</h1>
        <p className="subtext">בחר עם מי אתה רוצה לדבר ושלח טקסט או תמונה.</p>
      </section>

      <section className="glass-card chat-container">
        <aside className="chat-sidebar">
          <div className="page-section-title">בחר מישהו לשיחה</div>
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
                <span className="contact-status">{contact.status}</span>
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
            <button type="button" className="btn btn-secondary" onClick={handleStartCall}>
              התחלת שיחה
            </button>
          </div>

          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.sender === "me" ? "mine" : "theirs"}`}
              >
                {message.type === "text" ? (
                  <p>{message.text}</p>
                ) : (
                  <div className="chat-image-wrapper">
                    <img src={message.src} alt={message.alt || "Uploaded image"} />
                    <div className="chat-image-label">{message.alt}</div>
                  </div>
                )}
                <span>{message.time}</span>
              </div>
            ))}
          </div>

          <div className="chat-input-row">
            <div className="chat-input-group">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="כתוב הודעה..."
                rows={3}
              />
              {selectedImage && (
                <div className="image-preview-card">
                  <img src={selectedImage.url} alt={selectedImage.name} />
                  <div className="preview-footer">
                    <span>{selectedImage.name}</span>
                    <button type="button" className="btn btn-ghost" onClick={() => setSelectedImage(null)}>
                      הסר
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="chat-actions-column">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageSelect}
              />
              <button type="button" className="btn btn-secondary" onClick={handleAttachClick}>
                צרף תמונה
              </button>
              <button type="button" className="btn btn-primary" onClick={handleSend}>
                שלח
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
