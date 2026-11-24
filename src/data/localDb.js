import { PLACEHOLDER } from "../constants";

const SEED_DATA = {
  products: [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      category: "Fiction",
      price: 1200,
      description: "A dystopian classic.",
      image: PLACEHOLDER,
    },
    {
      id: 2,
      title: "Matilda",
      author: "Roald Dahl",
      category: "Children",
      price: 900,
      description: "A story about an extraordinary girl.",
      image: PLACEHOLDER,
    },
    {
      id: 3,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      category: "Non-fiction",
      price: 2100,
      description: "A brief history of humankind.",
      image: PLACEHOLDER,
    },
    {
      id: 4,
      title: "Clean Code",
      author: "Robert C. Martin",
      category: "Education",
      price: 2500,
      description: "A handbook of agile software craftsmanship.",
      image: PLACEHOLDER,
    },
  ],
  orders: [
    {
      id: 101,
      customerId: 1,
      customer: "Anita Wanjiku",
      items: ["1984", "Matilda"],
      total: 2100,
      status: "Completed",
      date: "2026-03-10",
    },
    {
      id: 102,
      customerId: 2,
      customer: "Brian Ochieng",
      items: ["Sapiens"],
      total: 2100,
      status: "Pending",
      date: "2026-03-12",
    },
    {
      id: 103,
      customerId: 1,
      customer: "Anita Wanjiku",
      items: ["Clean Code"],
      total: 2500,
      status: "Cancelled",
      date: "2026-03-14",
    },
  ],
  topBooks: [
    { id: 1, title: "1984", sold: 142 },
    { id: 2, title: "Sapiens", sold: 98 },
    { id: 3, title: "Matilda", sold: 76 },
  ],
};

export function getCollection(key) {
  const storageKey = `pagebloom-${key}`;
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved) return JSON.parse(saved);
  } catch {
    // fall back to seed data
  }
  const initial = SEED_DATA[key] || [];
  localStorage.setItem(storageKey, JSON.stringify(initial));
  return initial;
}

export function saveCollection(key, data) {
  localStorage.setItem(`pagebloom-${key}`, JSON.stringify(data));
}