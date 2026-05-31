import React from "react";

const groups = [
  { title: "קבוצת תמיכה יומית", description: "שיתוף רגשות ושגרות טובות." },
  { title: "סשן יצירתיות", description: "משחקים, מוזיקה ורעיונות חדשים." },
  { title: "קהילת ספורט", description: "תמיכה במצב רוח דרך תנועה.", },
];

export default function Groups() {
  return (
    <main className="dashboard-panel">
      <section className="page-header">
        <p className="eyebrow">קבוצות</p>
        <h1>קהילות פעילות</h1>
        <p className="subtext">הצטרף לשיחות, אירועים וקבוצות שמתאימות לך.</p>
      </section>

      <section className="cards-grid">
        {groups.map((group) => (
          <article key={group.title} className="glass-card group-card">
            <div className="group-badge">קבוצה</div>
            <h2>{group.title}</h2>
            <p>{group.description}</p>
            <button type="button" className="btn btn-secondary">הצטרף</button>
          </article>
        ))}
      </section>
    </main>
  );
}
