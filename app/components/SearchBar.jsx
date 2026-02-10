"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(params.get("search") ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const q = new URLSearchParams(params.toString());

    if (value.trim()) q.set("search", value);
    else q.delete("search");

    q.set("page", 1);

    router.push(`?${q.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        type="text"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="px-3 py-2 rounded flex-1 outline-none bg-slate-700 shadow-md shadow-slate-600 text-white"
      />
      <button className="bg-blue-400 text-white px-4 py-2 rounded">
        Search
      </button>
    </form>
  );
}
