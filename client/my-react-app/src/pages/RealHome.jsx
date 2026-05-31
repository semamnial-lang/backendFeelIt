import React from "react";
import { useNavigate } from "react-router-dom";
import DailyMoodPrompt from "../components/DailyMoodPrompt";

const quickPeople = [
  {
    name: "Manasse Kofi",
    status: "מוזיקה",
    mood: "😌",
    age: "30",
  },
  {
    name: "shay yadid",
    status: "בית לחם",
    mood: "🙂",
    age: "40",
  },
];

export default function RealHome() {
  const navigate = useNavigate();

  return (
    <main className="dashboard-panel home-dashboard">
      <section className="home-header">
        <div className="home-welcome">
          <p className="eyebrow">שלום,</p>
          <h1>Sem Amnial</h1>
          <p className="home-description">
            הדשבורד החברתי שלך במראה חדש: מצב רוח, חיבור מהיר וקהילות בפורמט של אפליקציה פרימיום.
          </p>
        </div>

        <div className="home-profile-summary">
          <div className="home-avatar">S</div>
          <div>
            <p className="profile-name">Sem Amnial</p>
            <p className="profile-meta">מוזיקה • מחפש/ת חברים חדשים</p>
          </div>
        </div>
      </section>

      <section className="home-feature-grid">
        <article className="glass-card home-stats-card">
          <div className="card-title">איך אתה מרגיש היום?</div>
          <p className="card-copy">בחר את מצב הרוח שלך וראה את המסע היומי שלך עם תמיכה ונתונים.</p>
          <DailyMoodPrompt />
        </article>

        <article className="glass-card home-cta-card">
          <div>
            <p className="eyebrow">אני צריך/ה לדבר עכשיו</p>
            <h2>מצא מישהו פנוי לשיחה</h2>
            <p className="subtext">יש לנו אנשים זמינים לתמיכה, שיתוף או פשוט להיות כאן בשבילך.</p>
          </div>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/chat')}>
            דבר עכשיו
          </button>
        </article>
      </section>

      <section className="home-grid">
        <article className="glass-card home-quick-card" onClick={() => navigate('/groups')}>
          <div className="quick-icon">👥</div>
          <div className="card-title">קבוצות</div>
          <p className="card-copy">הצטרף לשיחות פעילות וקהילות שנוצרות סביב נושאים שמעניינים אותך.</p>
        </article>
        <article className="glass-card home-quick-card" onClick={() => navigate('/search')}>
          <div className="quick-icon">🔎</div>
          <div className="card-title">גלה אנשים</div>
          <p className="card-copy">מצא חברים חדשים, קהילות ושיחות לפי תחומי העניין שלך.</p>
        </article>
      </section>

      <section className="glass-card challenge-card">
        <div className="challenge-head">
          <div>
            <p className="eyebrow">אתגר יומי</p>
            <h2>מה החלום הכי מטורף שחלמת בזמן האחרון?</h2>
          </div>
          <span className="challenge-icon">✨</span>
        </div>
        <div className="challenge-input-row">
          <input className="input-glow" type="text" placeholder="הכנס/י את תשובתך..." />
          <button type="button" className="btn btn-secondary">שלח</button>
        </div>
      </section>

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
              <div className="person-tags">
                <span>מחפש/ת: חברים חדשים</span>
                <span>{person.status}</span>
              </div>
              <button type="button" className="btn btn-primary">שלח הודעה</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
