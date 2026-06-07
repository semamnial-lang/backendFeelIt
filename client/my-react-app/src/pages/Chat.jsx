  import React, { useEffect, useRef, useState } from "react";

const initialContacts = [
  {
    id: "manasse",
    name: "Manasse Kofi",
    intro: "נשמח לשמוע איך אתה מרגיש היום.",
    need: "להתבטא על רגשות ולפרוק מהכאב",
    isOnline: true,
  },
  {
    id: "shay",
    name: "shay yadid",
    intro: "מוכן לשיחה, בוא נדבר.",
    need: "להרגיש פחות לבד ולקבל תמיכה",
    isOnline: true,
  },
  {
    id: "avic",
    name: "Avigail",
    intro: "אני כאן להקשיב.",
    need: "לשחרר את המתח ולהתמקד ברוגע",
    isOnline: false,
  },
];

function getStatusColor(isOnline) {
  return isOnline ? "#22c55e" : "#94a3b8";
}

function getStatusText(isOnline) {
  return isOnline ? "מחובר" : "לא מחובר";
}

function getNextOnline(isOnline) {
  if (isOnline) return Math.random() < 0.8 ? true : false;
  return Math.random() < 0.25 ? true : false;
}

function getContactReply(contactId, userText) {
  const normalized = userText?.trim().toLowerCase() || "";
  const contactNeeds = {
    manasse: "להתבטא על רגשות ולפרוק מהכאב",
    shay: "להרגיש פחות לבד ולקבל תמיכה",
    avic: "לשחרר את המתח ולהתמקד ברוגע",
  };

  const needText = contactNeeds[contactId] || "אני כאן בשבילך";

  if (/עצוב|דכדוך|כועס|עצבים|בוכה|מבואס/.test(normalized)) {
    return `אני שומע שיש רגשות קשים עכשיו. אם תוכל להסביר קצת יותר על זה, אוכל להיות כאן איתך.`;
  }

  if (/לחץ|חרדה|פחד|מתוח|לחוצה/.test(normalized)) {
    return `זה נשמע שאתה חווה הרבה לחץ. בוא ננסה להתמקד יחד ברגע הזה ולהוריד קצת מהמתח.`;
  }

  if (/בודד|לבד|אין לי|אין כלום/.test(normalized)) {
    return `זה נשמע שאתה מרגיש לבד. אני כאן להקשיב ויחד ננסה למצוא משהו שידאג לך.`;
  }

  if (/טוב|בסדר|סבבה|סבבה/.test(normalized)) {
    return `נחמד לשמוע שזה קצת טוב. אשמח לשמוע מה עוזר לך להרגיש ככה.`;
  }

  if (/מה לעשות|איך|עזרה|עוזר/.test(normalized)) {
    return `אני כאן כדי לעזור. ספר לי מה הכי קשה כרגע ואנסה לתת לך תמיכה.`;
  }

  return `שמתי לב שאתה רוצה ${needText}. אם תספר לי עוד, אני יכול להקשיב ולעזור כמיטב יכולתי.`;
}

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
  const [contacts, setContacts] = useState(initialContacts);
  const [selectedContact, setSelectedContact] = useState(initialContacts[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const currentContact = contacts.find((contact) => contact.id === selectedContact);
  const chatMessages = messages[selectedContact] || [];

  useEffect(() => {
    const interval = setInterval(() => {
      setContacts((prevContacts) =>
        prevContacts.map((contact) => ({
          ...contact,
          isOnline: getNextOnline(contact.isOnline),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

    if (currentContact?.isOnline) {
      window.setTimeout(() => {
        const replyText = getContactReply(selectedContact, draft);
        setMessages((prev) => ({
          ...prev,
          [selectedContact]: [
            ...prev[selectedContact],
            {
              sender: "other",
              type: "text",
              text: replyText,
              time: getTime(),
            },
          ],
        }));
      }, 900);
    }
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
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <span
                    style={{
                      width: "0.75rem",
                      height: "0.75rem",
                      borderRadius: "50%",
                      background: getStatusColor(contact.isOnline),
                      marginBottom: "0.4rem",
                    }}
                  />
                  <span className="contact-status">{getStatusText(contact.isOnline)}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>

        <div className="chat-panel">
          <div className="chat-header">
            <div>
              <p className="eyebrow">שיחה עם</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                <h2 style={{ margin: 0 }}>{currentContact?.name}</h2>
                <span
                  style={{
                    width: "0.85rem",
                    height: "0.85rem",
                    borderRadius: "50%",
                    background: getStatusColor(currentContact?.isOnline),
                    display: currentContact ? "inline-block" : "none",
                  }}
                />
              </div>
              <p style={{ margin: "0.25rem 0 0", color: "#64748b" }}>{getStatusText(currentContact?.isOnline)}</p>
              <p style={{ margin: "0.35rem 0 0", color: "#475569", fontSize: "0.95rem" }}>
                {currentContact?.need}
              </p>
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
