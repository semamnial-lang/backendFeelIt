import React from "react";
import { useNavigate } from "react-router-dom";
import DailyMoodPrompt from "../components/DailyMoodPrompt";
import { clearCurrentEmail, getCurrentEmail, getEmailList } from "../utils/moodStorage";

export default function UserHome() {
  const navigate = useNavigate();
  const currentEmail = getCurrentEmail();
  const accountList = getEmailList();

  return (
    <div className="dashboard-panel">
      <section className="dashboard-hero">
          <div>
            <p className="eyebrow">Welcome back</p>
            <h1>הדשבורד שלך</h1>
            <p className="subtext">מעקב יומי, מצב רוח וניווט מהיר לכל הפיצ'רים החברתיים.</p>
          </div>
          <div className="hero-stats">
            <div>
              <span>מייל</span>
              <strong>{currentEmail || 'לא ידוע'}</strong>
            </div>
            <div>
              <span>חשבונות</span>
              <strong>{accountList.length}</strong>
            </div>
          </div>
        </section>

        <section className="cards-grid">
          <div className="glass-card wide-card">
            <div className="card-title">מדיה יומית</div>
            <div className="card-copy">הזן את מצב הרוח של היום וראה את המסע שלך.</div>
            <DailyMoodPrompt />
          </div>

          <div className="glass-card settings-card">
            <div className="card-title">ניהול חשבון</div>
            <p className="card-copy">התחבר, נהל פרופיל וגש מהיר לדפים מרכזיים.</p>
            <div className="card-actions">
              <button className="btn btn-secondary" onClick={() => navigate('/profile')}>פרופיל</button>
              <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>סיכום</button>
              <button className="btn btn-secondary" onClick={() => navigate('/talk-to-professional')}>התייעצות מקצועית</button>
              <button className="btn btn-secondary" onClick={() => { clearCurrentEmail(); navigate('/'); }}>התנתק</button>
            </div>
          </div>

          <div className="glass-card">
            <div className="card-title">דבר עם אנשים</div>
            <p className="card-copy">פתח שיחה פרטית, שלח הודעות ותמונות ותקשר עם חברים.</p>
            <button className="btn btn-primary" onClick={() => navigate('/chat')}>פתח צ'אט עכשיו</button>
          </div>
        </section>
      </div>
  );
}
