export default function NewsCard({ article }) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className="h-40 w-full object-cover"
      />

      <div className="p-4">
        <span className="text-xs text-blue-600 font-semibold">
          {article.category}
        </span>

        <h3 className="font-bold mt-2">{article.title}</h3>

        <p className="text-sm text-gray-500 mt-2">{article.date}</p>
      </div>
    </div>
  );
}
