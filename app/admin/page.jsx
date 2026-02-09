import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const user = getSession();

  if (!user) redirect("/login");

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Admin Panel</h1>
      <p className="mt-4">Welcome {user.email}</p>
    </div>
  );
}
