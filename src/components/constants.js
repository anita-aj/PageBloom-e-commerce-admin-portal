const BASE = import.meta.env.BASE_URL;

export const API = import.meta.env.VITE_API_URL || "http://localhost:3001";
export const CATEGORIES = ["Fiction", "Non-fiction", "Children", "Education"];
export const MAX_PRICE = 3000;
export const PLACEHOLDER = `${BASE}images/placeholder.png`;