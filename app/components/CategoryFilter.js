// import Link from "next/link";

// const categories = ["Technology", "Business", "Science", "Sports"];

// export default function CategoryFilter({ selected }) {
//   return (
//     <div className="flex gap-3 flex-wrap">
//       {/* All */}
//       <Link
//         href="/dashboard"
//         className={`px-4 py-2 rounded-lg border ${
//           !selected
//             ? "bg-emerald-400 text-black border-emerald-400"
//             : "border-gray-700 hover:bg-gray-800"
//         }`}
//       >
//         All
//       </Link>

//       {categories.map((cat) => (
//         <Link
//           key={cat}
//           href={`?category=${cat}`}
//           className={`px-4 py-2 rounded-lg border ${
//             selected === cat
//               ? "bg-emerald-400 text-black border-emerald-400"
//               : "border-gray-700 hover:bg-gray-800"
//           }`}
//         >
//           {cat}
//         </Link>
//       ))}
//     </div>
//   );
// }
