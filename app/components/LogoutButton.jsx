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
      className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg hover:rounded-sm shadow-gray-500 transition-all duration-300 cursor-pointer shadow-xs "
    >
      Logout
    </button>
  );
}
