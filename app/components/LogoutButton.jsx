"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
    >
      Logout
    </button>
  );
}
