"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import {
  TbPlayerTrackPrevFilled,
  TbPlayerTrackNextFilled,
} from "react-icons/tb";

export default function Pagination({ totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // current page from URL
  const currentPage = Number(searchParams.get("page") ?? 1);

  // change page but keep other params
  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  // build pages with ellipsis
  const buildPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = buildPages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2 mt-8 flex-wrap">
      {/* Prev */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-2 py-1 border rounded transition ${
          currentPage === 1
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-300"
        }`}
      >
        <TbPlayerTrackPrevFilled color="#32a852" size={18} />
      </button>

      {/* Page numbers */}
      {pages.map((p, index) =>
        p === "..." ? (
          <span key={`dots-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goToPage(p)}
            className={`px-3 py-1 border rounded transition ${
              currentPage === p
                ? "bg-emerald-300 text-black border border-emerald-700"
                : "bg-slate-500 text-amber-100 hover:bg-gray-200 hover:text-black"
            }`}
          >
            {p}
          </button>
        ),
      )}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-2 py-1 border rounded transition ${
          currentPage === totalPages
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-300"
        }`}
      >
        <TbPlayerTrackNextFilled color="#32a852" size={18} fill="#32a852" />
      </button>
    </div>
  );
}
