import SkeletonCard from "./components/SkeletonCard";

export default function Loading() {
  return (
    <div className="p-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
