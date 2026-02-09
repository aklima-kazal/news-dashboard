"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setMessage({ type: "success", text: data.message });
      setEmail("");
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="bg-white border-t mt-10 p-6">
      <h3 className="font-semibold mb-3">Subscribe to Newsletter</h3>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="border rounded px-3 py-2 flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Submitting..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-3 text-sm ${
            message.type === "error" ? "text-red-500" : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </footer>
  );
}
