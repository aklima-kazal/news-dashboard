"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveSession } from "@/lib/auth";
import { FaEye } from "react-icons/fa";
import { GiEyelashes } from "react-icons/gi";
import Loading from "../loading";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("");

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
        onSubmit={(e) => submit(e)}
        className="bg-white p-6 rounded shadow w-80 space-y-4"
      >
        <h1 className="text-xl font-bold">Login</h1>

        <input
          placeholder="Email"
          className="w-full border p-2"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <div className="relative flex items-center">
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            className="w-full border p-2"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2.5 hover:text-white text-cyan-200 cursor-pointer"
          >
            {showPassword ? <FaEye size={22} /> : <GiEyelashes size={23} />}
          </button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

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
