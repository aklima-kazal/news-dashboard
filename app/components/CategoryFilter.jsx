"use client";

import { useRouter, useSearchParams } from "next/navigation";

const categories = ["Technology", "Business", "Science", "Sports"];

export default function CategoryFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const selectedCategory = params.get("category") || "";

  function handleSelect(cat) {
    const q = new URLSearchParams();
    q.set("category", cat);
    q.set("page", 1);

    // navigate to another page
    router.push(`/category?${q.toString()}`);
  }

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {categories.map((c) => (
        <button
          key={c}
          onClick={() => handleSelect(c)}
          className={`px-3 py-1 rounded border ${
            selectedCategory === c
              ? "bg-purple-600 text-white border-purple-600"
              : "bg-white border-gray-300 hover:bg-gray-200"
          }`}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
