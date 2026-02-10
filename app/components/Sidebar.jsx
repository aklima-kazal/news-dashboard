"use client";

import { news as newsData } from "@/lib/data";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as BarTooltip,
} from "recharts";
import { FiFileText, FiPieChart, FiClock, FiBarChart2 } from "react-icons/fi";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FD0"];

// Helper: format date as YYYY-MM-DD
const formatDate = (dateStr) => new Date(dateStr).toISOString().split("T")[0];

export default function Sidebar() {
  // Total articles
  const totalArticles = newsData.length;

  // Articles per category
  const categoryCounts = {};
  newsData.forEach((item) => {
    if (!categoryCounts[item.category]) categoryCounts[item.category] = 0;
    categoryCounts[item.category]++;
  });

  const chartDataPie = Object.entries(categoryCounts).map(([name, value]) => ({
    name,
    value,
  }));

  // Articles per day (for bar chart)
  const dailyCountsMap = {};
  newsData.forEach((item) => {
    const day = formatDate(item.date);
    if (!dailyCountsMap[day]) dailyCountsMap[day] = 0;
    dailyCountsMap[day]++;
  });

  const chartDataBar = Object.entries(dailyCountsMap)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([date, count]) => ({ date, count }));

  // Most recent article
  const recentArticle = newsData.reduce((latest, current) => {
    return new Date(current.date) > new Date(latest.date) ? current : latest;
  }, newsData[0]);

  return (
    <div className="p-4 flex flex-col gap-6  min-h-screen">
      <h2 className="text-2xl text-amber-100 font-bold mb-4">Analytics</h2>

      {/* Total Articles */}
      <div className="flex items-center gap-3 bg-sky-200 p-4 rounded-lg shadow hover:shadow-lg transition">
        <FiFileText className="text-blue-500 text-2xl" />
        <div>
          <p className="text-sm text-gray-500">Total Articles</p>
          <p className="text-xl font-bold">{totalArticles}</p>
        </div>
      </div>

      {/* Articles by Category */}
      <div className="bg-sky-200 p-4 rounded-lg shadow hover:shadow-lg transition">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <FiPieChart /> Articles by Category
        </h3>
        <ul className="text-sm space-y-1">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <li key={cat} className="flex justify-between">
              <span>{cat}</span>
              <span className="font-medium">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Daily Article Trends (Bar Chart) */}
      <div className="bg-sky-200 p-4 rounded-lg shadow hover:shadow-lg transition">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <FiBarChart2 /> Daily Article Trends
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartDataBar} margin={{ top: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis allowDecimals={false} />
            <BarTooltip />
            <Bar dataKey="count" fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart: Category Distribution */}
      <div className="bg-sky-200 p-4 rounded-lg shadow hover:shadow-lg transition">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <FiPieChart /> Category Distribution
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={chartDataPie}
              dataKey="value"
              nameKey="name"
              outerRadius={70}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {chartDataPie.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <PieTooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Most Recent Article */}
      <div className="bg-sky-200 p-4 rounded-lg shadow hover:shadow-lg transition">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <FiClock /> Most Recent Article
        </h3>
        <p className="text-sm font-medium truncate">{recentArticle.title}</p>
        <p className="text-xs text-gray-500">{recentArticle.date}</p>
      </div>
    </div>
  );
}
