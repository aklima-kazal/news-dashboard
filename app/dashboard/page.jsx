import Sidebar from "../components/Sidebar";
import NewsCard from "../components/NewsCard";
import Newsletter from "../components/Newsletter";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import { news as newsData } from "@/lib/data";
import ProtectedRoute from "../components/ProtectedRoute";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";

// Helper: filter + search + paginate
function getNews(searchParams = {}) {
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 6;
  const search = searchParams.search || "";
  const category = searchParams.category || "";

  let filtered = [...newsData];

  // Search
  if (search) {
    filtered = filtered.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Category filter
  if (category) {
    filtered = filtered.filter((item) => item.category === category);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return { data, totalPages, page };
}

export default function DashboardPage({ searchParams }) {
  const { data, totalPages, page } = getNews(searchParams);

  return (
    <ProtectedRoute>
      <div className="grid grid-cols-12 min-h-screen bg-black">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2 border-r bg-black">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="col-span-12 md:col-span-9 lg:col-span-10 p-6">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold mb-4 text-emerald-200">
              News Dashboard
            </h1>
            <LogoutButton />
          </div>
          {/* Search + Category Filter */}
          <SearchBar />
          <CategoryFilter />

          {/* News Grid */}
          {data.length === 0 ? (
            <p className="mt-10 text-gray-500">No articles found.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex gap-2 mt-8 flex-wrap">
            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;

              // Preserve search + category in links
              const params = new URLSearchParams();
              if (searchParams?.search)
                params.set("search", searchParams.search);
              if (searchParams?.category)
                params.set("category", searchParams.category);
              params.set("page", p);

              return (
                <a
                  key={p}
                  href={`?${params.toString()}`}
                  className={`px-3 py-1 border rounded ${
                    Number(page) === p
                      ? "bg-blue-200 text-blue-900 "
                      : "bg-white "
                  }`}
                >
                  {p}
                </a>
              );
            })}
          </div>

          {/* Newsletter */}
          <Newsletter />
        </main>
      </div>
    </ProtectedRoute>
  );
}
