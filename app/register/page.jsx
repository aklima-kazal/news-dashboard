"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) return setError(data.error);

    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={submit}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h1 className="text-xl font-bold">Register</h1>

        <input
          placeholder="Name"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
