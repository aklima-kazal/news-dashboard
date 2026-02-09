import { news } from "@/lib/data";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 6);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  let filtered = [...news];

  if (search) {
    filtered = filtered.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (category) {
    filtered = filtered.filter((n) => n.category === category);
  }

  const start = (page - 1) * limit;
  const end = start + limit;

  return Response.json({
    data: filtered.slice(start, end),
    total: filtered.length,
    page,
    totalPages: Math.ceil(filtered.length / limit),
  });
}
