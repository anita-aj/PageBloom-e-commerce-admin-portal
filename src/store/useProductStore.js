import { create } from "zustand";
import { API } from "../constants.js";

const headers ={"Content-Type": "application/json"};
const useProductStore = create((set) => ({
// Initial state
products: [],
loading: false,
error: "",

// GET: Fetch a single product by ID
fetchProductById: async (id) => {
  set({ loading: true, error: "" });

  try {
    const res = await fetch(`${API}/products/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const product = await res.json();   

    set({ products: [product], loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
},

  //GET: Fetch all products
  fetchProducts: async () => {
    set({ loading: true, error: "" });

    try {
      const res = await fetch(`${API}/products`);

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      
      const products = await res.json();

      set({ products, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
},

//PATCH: Update a product's details
// PATCH: Update a product's price
updatePrice: async (id, price) => {
  try {
    const res = await fetch(`${API}/products/${id}`, { 
        method: "PATCH",
        headers,
        body: JSON.stringify({ price }),
    });
    if (!res.ok) {
      throw new Error("Failed to update product price");
    }

    const updatedProduct = await res.json();

    set((state) => ({
        products: state.products.map((product) => 
            product.id === id ? updatedProduct : product
        ),
    }));
    return true;
  } catch (error) {
    set({ error: error.message });
    return false;
  }  
},

// DELETE: Remove a product
deleteProduct: async (id) => {
    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }

      set((state) => ({
        products: state.products.filter(
          (product) => product.id !== id
        ),
      }));

      return true;
    } catch (error) {
      set({ error: error.message });
      return false;
    }
},
}));

export default useProductStore;
