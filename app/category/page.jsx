import { news } from "@/lib/data";
import CategoryFilter from "../components/CategoryFilter";
import Pagination from "../components/Pagination";
import Link from "next/link";
import { CategoryBtn } from "../components/CategoryBtn";

export default function CategoryPage({ searchParams }) {
  const category = searchParams?.category ?? "";
  const page = Number(searchParams?.page ?? 1);

  const perPage = 6;

  // filter by category
  const filteredNews = category
    ? news.filter((item) => item.category === category)
    : news;

  // paginate
  const start = (page - 1) * perPage;
  const paginatedNews = filteredNews.slice(start, start + perPage);

  const totalPages = Math.ceil(filteredNews.length / perPage);

  return (
    <div className="p-6 bg-slate-900">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl text-amber-100 font-bold mb-4">
          Category: {category || "All"}
        </h1>
        <div className="cursor-pointer shadow-2xl shadow-slate-600">
          <CategoryBtn />
        </div>
      </div>
      <div className="">
        <CategoryFilter />
      </div>

      {paginatedNews.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {paginatedNews.map((item) => (
            <div
              key={item.id}
              className="border rounded overflow-hidden bg-slate-700 object-cover shadow-2xl shadow-slate-600 hover:shadow-lg hover:scale-95 hover:shadow-slate-600 hover:bg-cyan-950 transition ease-in duration-400 "
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full  object-cover "
              />
              <div className="p-3 ">
                <p className="text-lg text-amber-100">{item.category}</p>
                <h2 className="font-semibold text-emerald-200">{item.title}</h2>
                <p className="text-xs text-gray-400">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination totalPages={totalPages} />
    </div>
  );
}
