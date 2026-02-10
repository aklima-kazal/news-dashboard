import Link from "next/link";
import React from "react";

export const CategoryBtn = () => {
  return (
    <div>
      <Link href="/dashboard" className="text-white">
        <button className="px-4 py-2 rounded-lg border border-violet-900 hover:bg-gray-800 bg-violet-100 text-red-100 cursor-pointer">
          Dashboard
        </button>
      </Link>
    </div>
  );
};
