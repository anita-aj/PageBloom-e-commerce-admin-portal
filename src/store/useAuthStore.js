import { create } from "zustand";
import { persist } from "zustand/middleware";

const USERS_KEY = "pagebloom-users";

const getStoredUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveStoredUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      error: "",

      signIn: async (email, password) => {
        if (!API) {
          set({ error: "Backend URL is not configured. Set VITE_API_URL and redeploy." });
          return false;
        }

        try {
          const res = await fetch(`${API}/users?${new URLSearchParams({ email, password })}`);
          if (!res.ok) throw new Error("Backend request failed");
          const [user] = await res.json(); // first match, or undefined if none
          set({ user: user || null, error: user ? "" : "Wrong email or password" });
          return Boolean(user);
        } catch {
          set({ error: "Could not connect to the backend. Check that it is running and VITE_API_URL is correct." });
          return false;
        }
      },

      signUp: async (name, email, password) => {
        if (!API) {
          set({ error: "Backend URL is not configured. Set VITE_API_URL and redeploy." });
          return false;
        }

        try {
          const res = await fetch(`${API}/users?${new URLSearchParams({ email })}`);
          if (!res.ok) throw new Error("Backend request failed");
          if ((await res.json()).length > 0) {
            set({ error: "That email is already used" });
            return false;
          }
          const created = await fetch(`${API}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });
          if (!created.ok) throw new Error("Backend request failed");
          set({ user: await created.json(), error: "" });
          return true;
        } catch {
          set({ error: "Could not connect to the backend. Check that it is running and VITE_API_URL is correct." });
          return false;
        }
      },

      signOut: () => set({ user: null, error: "" }),
    }),
    { name: "pagebloom-auth" }
  )
);

export default useAuthStore;