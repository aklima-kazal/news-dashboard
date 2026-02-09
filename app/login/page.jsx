"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return setError(data.error);

    saveSession(data);
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <input
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>

        <p className="text-sm">
          No account?{" "}
          <a className="text-blue-600" href="/register">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
