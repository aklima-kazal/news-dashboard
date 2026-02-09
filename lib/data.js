export const users = [];

export const news = [
  {
    id: 1,
    title: "AI is transforming web development",
    category: "Technology",
    date: "Feb 9, 2026",
    image: "https://picsum.photos/400/250?1",
  },
  {
    id: 2,
    title: "Markets rally",
    category: "Business",
    date: "Feb 8, 2026",
    image: "https://picsum.photos/400/250?2",
  },
  {
    id: 3,
    title: "Space travel breakthrough",
    category: "Science",
    date: "Feb 7, 2026",
    image: "https://picsum.photos/400/250?3",
  },
  {
    id: 4,
    title: "Big final tonight",
    category: "Sports",
    date: "Feb 6, 2026",
    image: "https://picsum.photos/400/250?4",
  },
  // duplicate to simulate many
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 10,
    title: `News Article ${i}`,
    category: i % 2 ? "Technology" : "Business",
    date: "Feb 2026",
    image: `https://picsum.photos/400/250?random=${i}`,
  })),
];
