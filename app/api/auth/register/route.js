import { store } from "@/lib/store";
import { v4 as uuid } from "uuid";

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ error: "All fields required" }, { status: 400 });
  }

  const exists = store.users.find((u) => u.email === email);
  if (exists) {
    return Response.json({ error: "Email already exists" }, { status: 400 });
  }

  const user = { id: uuid(), name, email, password };
  store.users.push(user);

  return Response.json({ message: "Registered successfully" });
}
