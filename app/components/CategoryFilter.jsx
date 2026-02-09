"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = ["Technology", "Business", "Science", "Sports"];

export default function CategoryFilter() {
  const router = useRouter();
  const params = useSearchParams();

  // Current selected category
  const selectedCategory = params.get("category") || "";

  function handleSelect(cat) {
    const q = new URLSearchParams(params.toString());
    if (cat === selectedCategory) {
      q.delete("category"); // toggle off
    } else {
      q.set("category", cat);
    }
    q.set("page", 1); // reset page on new filter
    router.push(`?${q.toString()}`);
  }

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => handleSelect(c)}
          className={`px-3 py-1 rounded border ${
            selectedCategory === c
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white border-gray-300 hover:bg-gray-200"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
