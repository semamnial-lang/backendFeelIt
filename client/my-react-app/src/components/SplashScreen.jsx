import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("Sem Amnial");
  const [age, setAge] = useState("15");
  const [city, setCity] = useState("איפה אתה גר?");
  const [bio, setBio] = useState("ספר/י קצת על עצמך...");
  const [saved, setSaved] = useState(false);

  const handleSave = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <main className="dashboard-panel">
      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">S</div>
          <h1 style={{ margin: '1rem 0 0.25rem', color: 'var(--text-h)' }}>הפרופיל שלי</h1>
          <p style={{ margin: 0, color: 'var(--muted)' }}>
            עדכן את הפרטים שלך כדי לשמור על חיבור אישי וחזק יותר.
          </p>
        </div>

        <form onSubmit={handleSave} className="profile-grid">
          <div className="profile-field">
            <label>שם תצוגה *</label>
            <input type="text" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
          </div>

          <div className="profile-field">
            <label>גיל</label>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>

          <div className="profile-field">
            <label>עיר</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>

          <div className="profile-field">
            <label>קצת על עצמי</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="profile-actions">
            <button type="button" onClick={handleSave} className="btn btn-primary">
              שמור פרופיל
            </button>
            <button type="button" onClick={() => navigate('/home')} className="btn btn-ghost">
              חזור לדף הבית
            </button>
          </div>
          {saved && (
            <p style={{ textAlign: 'center', color: 'var(--accent-teal)', fontWeight: 600, margin: 0 }}>
              הפרופיל שלך נשמר בהצלחה!
            </p>
          )}
        </div>

        <div className="profile-nav">
          <div className="nav-item" onClick={() => navigate('/profile')}>
            <div className="icon">👤</div>
            <div className="label">פרופיל</div>
          </div>
          <div className="nav-item" onClick={() => navigate('/dashboard')}>
            <div className="icon">🎮</div>
            <div className="label">משחקים</div>
          </div>
          <div className="nav-item" onClick={() => navigate('/home')}>
            <div className="icon">🏠</div>
            <div className="label">בית</div>
          </div>
          <div className="nav-item" onClick={() => navigate('/chat')}>
            <div className="icon">💬</div>
            <div className="label">צ'אט</div>
          </div>
          <div className="nav-item" onClick={() => navigate('/groups')}>
            <div className="icon">👥</div>
            <div className="label">קבוצות</div>
          </div>
        </div>
      </div>
    </main>
  );
}
