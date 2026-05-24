import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">

      {/* NAVBAR */}
      <header className="flex justify-between items-center px-8 py-5 bg-white shadow-sm sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-indigo-600">
          Feel It
        </h1>

        <div className="space-x-4">
          <button className="text-gray-700 hover:text-indigo-600 font-medium">
            Home
          </button>

          <button className="text-gray-700 hover:text-indigo-600 font-medium">
            Community
          </button>

          <button className="bg-indigo-600 text-white px-5 py-2 rounded-xl hover:bg-indigo-700 transition">
            Join Now
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28 bg-gradient-to-br from-indigo-600 to-blue-500 text-white">

        <h2 className="text-5xl md:text-7xl font-bold mb-6">
          You Are Never Alone
        </h2>

        <p className="text-lg md:text-2xl max-w-3xl mb-10 text-blue-100">
          Connect with people, share your feelings, and build real friendships
          in a safe and supportive community.
        </p>

        <div className="flex gap-4">
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition">
            Get Started
          </button>

          <button className="border border-white px-8 py-4 rounded-2xl font-bold hover:bg-white hover:text-indigo-600 transition">
            Learn More
          </button>
        </div>

      </section>

      {/* FEATURES */}
      <section className="px-8 py-24">

        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">
            Why Feel It?
          </h3>

          <p className="text-gray-600 text-lg">
            Everything you need to connect with people.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition">
            <div className="text-5xl mb-4">💬</div>

            <h4 className="text-2xl font-bold mb-3">
              Real Chat
            </h4>

            <p className="text-gray-600">
              Talk with real people instantly and create meaningful conversations.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition">
            <div className="text-5xl mb-4">🌍</div>

            <h4 className="text-2xl font-bold mb-3">
              Meet Friends
            </h4>

            <p className="text-gray-600">
              Discover people with similar interests and emotions.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition">
            <div className="text-5xl mb-4">❤️</div>

            <h4 className="text-2xl font-bold mb-3">
              Support
            </h4>

            <p className="text-gray-600">
              Receive kindness, motivation, and emotional support.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 hover:scale-105 transition">
            <div className="text-5xl mb-4">🔒</div>

            <h4 className="text-2xl font-bold mb-3">
              Safe Space
            </h4>

            <p className="text-gray-600">
              A clean and positive community where everyone is welcome.
            </p>
          </div>

        </div>
      </section>

      {/* COMMUNITY PREVIEW */}
      <section className="bg-white py-24 px-8">

        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">
            Community
          </h3>

          <p className="text-gray-600 text-lg">
            People connecting every day.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-gray-50 rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-indigo-500"></div>

              <div>
                <h4 className="font-bold">Alex</h4>
                <p className="text-sm text-gray-500">Online now</p>
              </div>
            </div>

            <p className="text-gray-700">
              I finally found people who understand me.
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-blue-500"></div>

              <div>
                <h4 className="font-bold">Mia</h4>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
            </div>

            <p className="text-gray-700">
              This app helped me make real friends.
            </p>
          </div>

          <div className="bg-gray-50 rounded-3xl p-6 shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-pink-500"></div>

              <div>
                <h4 className="font-bold">Daniel</h4>
                <p className="text-sm text-gray-500">5 minutes ago</p>
              </div>
            </div>

            <p className="text-gray-700">
              I feel less alone every time I open Feel It.
            </p>
          </div>

        </div>
      </section>

      {/* QUOTE SECTION */}
      <section className="py-24 px-8 bg-gradient-to-r from-indigo-600 to-blue-500 text-white text-center">

        <h3 className="text-4xl font-bold mb-6">
          Someone out there understands you.
        </h3>

        <p className="text-blue-100 text-lg">
          Join a community where people truly care.
        </p>

      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center bg-gray-50">

        <h3 className="text-5xl font-bold mb-6">
          Ready to connect?
        </h3>

        <p className="text-gray-600 text-xl mb-10">
          Start your journey and meet amazing people today.
        </p>

        <button className="bg-indigo-600 text-white px-10 py-5 rounded-2xl text-lg font-bold hover:bg-indigo-700 transition shadow-lg">
          Join Feel It
        </button>

      </section>

      {/* FOOTER */}
      <footer className="bg-white py-8 text-center text-gray-500 border-t">
        © 2026 Feel It. All rights reserved.
      </footer>

    </div>
  );
}
