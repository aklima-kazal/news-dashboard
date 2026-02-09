"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  // Initialize input from query
  const initialSearch = params.get("search") || "";
  const [value, setValue] = useState(initialSearch);

  function handleSubmit(e) {
    e.preventDefault();

    // Keep current query params
    const q = new URLSearchParams(params.toString());
    q.set("search", value);
    q.set("page", 1); // reset page on new search

    router.push(`?${q.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex gap-4 mt-2">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search articles..."
        className="border border-gray-700 shadow shadow-gray-400 px-3 py-2 rounded flex-1 bg-gray-800 text-white outline-none focus:none"
      />
      <button className="bg-blue-600 text-white px-4 py-2 cursor-pointer rounded">
        Search
      </button>
    </form>
  );
}
