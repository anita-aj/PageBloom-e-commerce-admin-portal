import { create } from "zustand";
import { persist } from "zustand/middleware";
import { API } from "../constants";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      error: "",

      signIn: async (email, password) => {
        const res = await fetch(`${API}/users?${new URLSearchParams({ email, password })}`);
        const [user] = await res.json(); // first match, or undefined if none
        set({ user: user || null, error: user ? "" : "Wrong email or password" });
        return Boolean(user);
      },

      signUp: async (name, email, password) => {
        const res = await fetch(`${API}/users?${new URLSearchParams({ email })}`);
        if ((await res.json()).length > 0) {
          set({ error: "That email is already used" });
          return false;
        }
        const created = await fetch(`${API}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        set({ user: await created.json(), error: "" });
        return true;
      },

   }),
    { name: "pagebloom-auth" }
  )
);

export default useAuthStore;