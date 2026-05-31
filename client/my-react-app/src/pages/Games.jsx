import React from "react";

const games = [
  { title: "מדד מצב רוח", subtitle: "אתגר יומי לשיפור היום שלך." },
  { title: "פעילות מהנה", subtitle: "משחק קצר להנעת הרוח ומוטיבציה." },
  { title: "אתגר חברתי", subtitle: "הזמנה לחיבור עם אחרים בצורה קלילה." },
];

export default function Games() {
  return (
    <main className="dashboard-panel">
      <section className="page-header">
        <p className="eyebrow">משחקים</p>
        <h1>משחקים ופעילויות</h1>
        <p className="subtext">שמרו על מצב רוח פעיל עם חוויות קצרות וממריצות.</p>
      </section>

      <section className="cards-grid">
        {games.map((game) => (
          <article key={game.title} className="glass-card game-card">
            <h2>{game.title}</h2>
            <p>{game.subtitle}</p>
            <button type="button" className="btn btn-secondary">פתח</button>
          </article>
        ))}
      </section>
    </main>
  );
}
