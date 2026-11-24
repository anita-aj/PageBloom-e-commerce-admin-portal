export const API = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:3001" : "")).replace(/\/+$/, "");
export const CATEGORIES = ["Fiction", "Non-fiction", "Children", "Education"]; // the four book categories
export const MAX_PRICE = 3000; // the highest value on the price sliders
export const PLACEHOLDER = "/images/placeholder.png"; 