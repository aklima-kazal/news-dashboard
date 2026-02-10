export default function NewsCard({ article }) {
  return (
    <div className=" rounded-lg shadow-slate-600 hover:shadow-lg hover:scale-95 hover:shadow-slate-600 hover:bg-cyan-950 shadow-md transition ease-in duration-400 overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <span className="text-lg text-cyan-400 font-semibold">
          {article.category}
        </span>

        <h3 className="font-bold text-emerald-100 mt-2">{article.title}</h3>

        <p className="text-sm text-gray-500 mt-2">{article.date}</p>
      </div>
    </div>
  );
}
