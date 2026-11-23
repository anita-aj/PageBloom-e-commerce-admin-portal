import { create } from "zustand";
import { getCollection, saveCollection } from "../data/localDb";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  error: "",

  fetchProductById: async (id) => {
    set({ loading: true, error: "" });
    const products = getCollection("products");
    const product = products.find((p) => String(p.id) === String(id));
    if (!product) {
      set({ error: "Failed to fetch product", loading: false });
      return;
    }
    set({ products: [product], loading: false });
  },

  fetchProducts: async () => {
    set({ loading: true, error: "" });
    const products = getCollection("products");
    set({ products, loading: false });
  },

  addProduct: async (newProduct) => {
    const products = getCollection("products");
    const productWithId = { ...newProduct, id: Date.now() };
    const updated = [...products, productWithId];
    saveCollection("products", updated);
    set({ products: updated, error: "" });
    return true;
  },

  updatePrice: async (id, price) => {
    const products = getCollection("products");
    const updated = products.map((product) =>
      product.id === id ? { ...product, price } : product
    );
    saveCollection("products", updated);
    set({ products: updated, error: "" });
    return true;
  },

  deleteProduct: async (id) => {
    const products = getCollection("products");
    const updated = products.filter((product) => product.id !== id);
    saveCollection("products", updated);
    set({ products: updated, error: "" });
    return true;
  },
}));

export default useProductStore;
