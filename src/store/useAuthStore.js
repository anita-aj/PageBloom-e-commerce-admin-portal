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
        const users = getStoredUsers();
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        set({
          user: user || null,
          error: user ? "" : "Wrong email or password",
        });
        return Boolean(user);
      },

      signUp: async (name, email, password) => {
        const users = getStoredUsers();
        if (users.some((u) => u.email === email)) {
          set({ error: "That email is already used" });
          return false;
        }
        const newUser = { id: Date.now(), name, email, password };
        saveStoredUsers([...users, newUser]);
        set({ user: newUser, error: "" });
        return true;
      },

      signOut: () => set({ user: null, error: "" }),
    }),
    { name: "pagebloom-auth" }
  )
);

export default useAuthStore;