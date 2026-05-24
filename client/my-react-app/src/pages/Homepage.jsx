import React, { useState } from "react";

export default function Homepage() {
  const [feel, setFeel] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-sky-100 to-indigo-100 p-6">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">How are you feeling today?</h1>
        <p className="text-slate-600 mb-8">
          Share your mood and see a friendly response. This is a simple input form that saves how you feel.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block text-sm font-medium text-slate-700">
            My mood is:
            <input
              type="text"
              value={feel}
              onChange={(e) => {
                setFeel(e.target.value);
                setSubmitted(false);
              }}
              placeholder="Happy, sad, excited, nervous..."
              required
              className="mt-2 w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
            />
          </label>

          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded-2xl font-semibold hover:bg-sky-700 transition"
          >
            Share mood
          </button>
        </form>

        {submitted && (
          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-semibold text-slate-900 mb-2">Thanks for sharing!</h2>
            <p className="text-slate-700">
              You said you feel <span className="font-semibold text-sky-600">{feel}</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
