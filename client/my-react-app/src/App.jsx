import React, { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT - Branding */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 text-white p-12 flex flex-col justify-center">

          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Feel It
          </h1>

          <p className="text-blue-100 text-lg mb-8">
            A safe place to connect, share emotions and build real friendships.
          </p>

          <div className="space-y-3 text-blue-100">
            <div>✔ Real people, real conversations</div>
            <div>✔ Safe & supportive community</div>
            <div>✔ Find friends instantly</div>
          </div>

        </div>

        {/* RIGHT - Login */}
        <div className="p-12 flex flex-col justify-center">

          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>

          <p className="text-gray-500 mb-6">
            Enter your email to continue
          </p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
          />

          <button className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition shadow-md">
            Continue
          </button>

          <p className="text-xs text-gray-400 mt-5 text-center">
            By continuing you agree to our Terms & Privacy Policy
          </p>

        </div>
      </div>
    </div>
  );
}
