import { store } from "@/lib/store";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  const { email, password } = await req.json();

  const user = store.users.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = uuid();
  store.sessions[token] = user.id;

  return Response.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}
