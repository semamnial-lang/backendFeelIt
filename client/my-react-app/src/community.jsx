import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, Users, HeartPulse } from "lucide-react";

const members = [
  { name: "Ari", mood: "Happy", status: "Online" },
  { name: "Leo", mood: "Sad", status: "2m ago" },
  { name: "Raya", mood: "Excited", status: "5m ago" },
];
const messages = [
  {
    person: "Nina",
    snippet: "Feeling great in the creative lounge!",
    mood: "Happy",
  },
  {
    person: "Sam",
    snippet: "Want to join a calm talk room?",
    mood: "Lonely",
  },
  {
    person: "Mira",
    snippet: "Stressed but finding support here.",
    mood: "Stressed",
  },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 rounded-[32px] border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/40 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Community hub</p>
            <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Connect with the right mood squad.</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-200 transition hover:border-indigo-400 hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4 text-indigo-300" /> Back home
            </Link>
            <button className="inline-flex items-center gap-2 rounded-3xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500">
              <HeartPulse className="h-4 w-4" /> Join room
            </button>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[0.7fr_0.45fr]">
          <section className="rounded-[32px] border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/40">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Live conversations</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Mood rooms</h2>
              </div>
              <MessageSquare className="h-6 w-6 text-indigo-300" />
            </div>
            <div className="mt-6 space-y-4">
              {messages.map((message) => (
                <div key={message.person} className="rounded-3xl border border-slate-800 bg-slate-950/90 p-5 transition hover:border-indigo-400 hover:bg-slate-900">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-white">{message.person}</p>
                      <p className="mt-1 text-sm text-slate-400">{message.snippet}</p>
                    </div>
                    <span className="rounded-2xl bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.25em] text-slate-300">
                      {message.mood}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-[32px] border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/40">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">People nearby</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Active members</h2>
                </div>
                <Users className="h-6 w-6 text-indigo-300" />
              </div>
              <div className="mt-6 space-y-4">
                {members.map((member) => (
                  <div key={member.name} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-800 bg-slate-950/90 p-4 transition hover:border-indigo-400 hover:bg-slate-900">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-500/20 text-indigo-300">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-base font-semibold text-white">{member.name}</p>
                        <p className="text-sm text-slate-400">{member.status}</p>
                      </div>
                    </div>
                    <span className="rounded-2xl bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">{member.mood}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/40">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Quick tip</p>
              <p className="mt-4 text-sm leading-7 text-slate-300">
                Pick your mood, browse matching rooms, and send a first message. The smoother your intro, the faster the community responds.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
