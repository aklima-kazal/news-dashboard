import Sidebar from "./components/Sidebar";
import NewsCard from "./components/NewsCard";
import Newsletter from "./components/Newsletter";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import { news as newsData } from "@/lib/data";
import Link from "next/link";
import { clearSession } from "@/lib/auth";
import LogoutButton from "./components/LogoutButton";
import DashboardPage from "./dashboard/page";

// Helper: filter, search, paginate

export default function Home({ searchParams }) {
  return (
    <div>
      <DashboardPage searchParams={searchParams} />
    </div>
  );
}
