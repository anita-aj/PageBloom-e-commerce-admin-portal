import { create } from "zustand"; // builds a store 
import { persist } from "zustand/middleware"; // saves the store in the browser so a refresh keeps you logged in
import { API } from "../constants"; // the server address

const headers = { "Content-Type": "application/json" }; 

const useAuthStore = create( 
  persist( 
    (set) => ({  
      user: null, // shows who is logged in, nobody at first
      error: "", // shown when login fails

      signIn: async (email, password) => { //Log someone in
        const res = await fetch( 
          `${API}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        ); // encodeURIComponent makes odd characters safe inside a web address
        const found = await res.json(); // turn the reply into a list
        if (found.length === 0) { // an empty list means no such user
          set({ error: "Wrong email or password" }); // save the error message
          return false; // tell the caller it failed
        }
        set({ user: found[0], error: "" }); // save the user and clear any old error
        return true; // tell the caller it worked
      },

      signUp: async (name, email, password) => { // create a new account
        const check = await fetch(`${API}/users?email=${encodeURIComponent(email)}`); // is the email already used?
        if ((await check.json()).length > 0) { // yes, someone has it
          set({ error: "That email is already used" }); // save the error message
          return false; // failed
        }
        const res = await fetch(`${API}/users`, { 
          method: "POST", // POST means "add something new"
          headers, // say we are sending JSON
          body: JSON.stringify({ name, email, password }), // turn the details into JSON text
        });
        set({ user: await res.json(), error: "" }); // save the new user as logged in
        return true; // worked
      },

      logout: () => set({ user: null }), // log out by forgetting the user
    }),
    { name: "pagebloom-auth" } // the name it is saved under in the browser
  )
);

export default useAuthStore;