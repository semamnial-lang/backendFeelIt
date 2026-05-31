import React, { useEffect, useState } from "react";
import {
  getCurrentEmail,
  loadUserMoodState,
  saveUserMoodState,
  clearTodayMood,
} from "../utils/moodStorage";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

const moodOptions = [
  { value: "sad", emoji: "😢", label: "Sad" },
  { value: "upset", emoji: "😕", label: "Upset" },
  { value: "okay", emoji: "🙂", label: "Okay" },
  { value: "good", emoji: "😊", label: "Good" },
  { value: "amazing", emoji: "🤩", label: "Amazing" },
];

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDayCount(startDateString) {
  if (!startDateString) return 0;
  const start = new Date(startDateString);
  const today = new Date(getTodayKey());
  const diff = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  return diff + 1;
}

function getFollowUpPrompt(mood) {
  if (mood === "sad" || mood === "upset") {
    return "What made you feel that way today?";
  }
  if (mood === "okay" || mood === "good") {
    return "What made you feel this way, or how can we make your day even better?";
  }
  if (mood === "amazing") {
    return "How can we make your day even more amazing? Share a happy positive word or thought.";
  }
  return "What are you feeling about today?";
}

async function getTodayMoodFromServer(email) {
  if (!email) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}/user-health/today?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}

async function saveTodayMoodToServer(email, mood, note) {
  if (!email || !mood) {
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}/user-health/today`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mood, note }),
    });
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch {
    return null;
  }
}

export default function DailyMoodPrompt() {
  const currentEmail = getCurrentEmail();
  const [submittedToday, setSubmittedToday] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [startDate, setStartDate] = useState(null);

  useEffect(() => {
    if (!currentEmail) return;

    async function loadMood() {
      const serverData = await getTodayMoodFromServer(currentEmail);
      const saved = loadUserMoodState(currentEmail);

      const startDateValue = serverData?.startDate || saved?.startDate || null;
      setStartDate(startDateValue);

      if (serverData?.answeredToday) {
        setSelectedMood(serverData.mood);
        setSavedNote(serverData.note || "");
        setSubmittedToday(true);
        saveUserMoodState(currentEmail, serverData.mood, serverData.note || "");
        return;
      }

      if (saved?.answeredToday) {
        setSelectedMood(saved.mood);
        setSavedNote(saved.note || "");
        setSubmittedToday(true);
      }
    }

    loadMood();
  }, [currentEmail]);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setMoodNote("");
    setSubmittedToday(false);
  };

  const handleSaveNote = async () => {
    if (!selectedMood || !currentEmail) return;
    await saveTodayMoodToServer(currentEmail, selectedMood, moodNote);
    const saved = saveUserMoodState(currentEmail, selectedMood, moodNote);
    setSavedNote(saved.note || "");
    setStartDate(saved.startDate || null);
    setSubmittedToday(true);
  };

  const moodLabel = moodOptions.find(
    (item) => item.value === selectedMood,
  )?.label;
  const dayCount = getDayCount(startDate);
  const followUpPrompt = getFollowUpPrompt(selectedMood);

  if (!currentEmail) {
    return (
      <div className="mood-card" style={{ textAlign: 'center' }}>
        <h2 style={{ margin: 0, fontSize: "1.65rem" }}>Sign in to track your mood</h2>
        <p style={{ margin: "0.75rem 0 0" }}>We need your email to remember each journey separately.</p>
      </div>
    );
  }

  return (
    <div className="mood-card">
      <h2>How are you feeling today?</h2>
      <p style={{ marginTop: '0.5rem' }}>Choose one mood from sad/upset to amazing/star-eyes. You can answer only once per day.</p>

      {submittedToday ? (
        <div style={{ display: "grid", gap: "1rem" }}>
          <div className="feature-card">
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-h)' }}>Today's mood</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '1.35rem' }}>
              {moodOptions.find((item) => item.value === selectedMood)?.emoji} {moodLabel}
            </p>
          </div>

          <div className="feature-card">
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-h)' }}>What you shared today</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '1rem', whiteSpace: 'pre-wrap', color: 'var(--muted)' }}>
              {savedNote || "No extra note was added."}
            </p>
          </div>

          <div className="feature-card">
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-h)' }}>Journey start</p>
            <p style={{ margin: '0.5rem 0 0', fontSize: '1rem' }}>
              {startDate
                ? `Started on ${new Date(startDate).toLocaleDateString()}`
                : "Start date not set yet."}
            </p>
            <p style={{ marginTop: '0.75rem', color: 'var(--muted)' }}>
              {startDate ? `Day ${dayCount} of your journey` : "This is the first entry of your journey."}
            </p>
            <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem' }}>
              <button type="button" onClick={() => {
                // enable editing: populate the editor with saved values
                setMoodNote(savedNote || '');
                setSubmittedToday(false);
              }} className="btn btn-primary">Edit entry</button>
              <button type="button" onClick={() => {
                // simple delete: clear saved state (local storage) and UI
                clearTodayMood(currentEmail);
                setSelectedMood(null);
                setSavedNote('');
                setSubmittedToday(false);
              }} className="btn btn-ghost">Delete</button>
            </div>
          </div>
        </div>
      ) : selectedMood ? (
        <div style={{ display: "grid", gap: "1rem" }}>
          <div className="feature-card">
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--text-h)' }}>
              {moodOptions.find((item) => item.value === selectedMood)?.emoji} {moodLabel}
            </p>
            <p style={{ marginTop: '0.5rem', color: 'var(--muted)' }}>{followUpPrompt}</p>
            <textarea
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
              rows={5}
              placeholder="Type how you feel here..."
              style={{ width: '100%', marginTop: '1rem', borderRadius: '12px', padding: '1rem', fontSize: '1rem', color: 'var(--text-h)', background: 'rgba(0,0,0,0.4)', border: '1px solid var(--border-soft)', resize: 'vertical' }}
            />
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
              <button type="button" onClick={handleSaveNote} className="btn-primary">Save today's feeling</button>
              <button type="button" onClick={() => setSelectedMood(null)} className="btn-ghost">Choose a different mood</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mood-choices">
          {moodOptions.map((option) => (
            <div key={option.value} role="button" tabIndex={0} onClick={() => handleMoodSelect(option.value)} className="mood-option">
              <div style={{ fontSize: '1.6rem' }} aria-hidden>{option.emoji}</div>
              <div className="label">{option.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
