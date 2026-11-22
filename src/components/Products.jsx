import { useEffect } from "react";
import useProductStore from "../store/useProductStore";
import useProductFilters from "../hooks/useProductFilters";
import ProductCard from "./ProductCard";
import { CATEGORIES, MAX_PRICE } from "../constants.js";

function Products() {
  // Get products and actions from the Zustand store
  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const fetchProducts = useProductStore((state) => state.fetchProducts);

  // Fetch products when the page first loads
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get search and filter functionality from our custom hook
  const {
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredProducts,
  } = useProductFilters(products);
  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-2 text-gray-600">
          Manage your bookstore inventory.
        </p>
      </div>

      {/* Search and filter section */}
      <section className="mb-6 rounded-xl bg-cream p-4">
        <h2 className="mb-4 text-lg font-bold">Search and Filter Books</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Search by title or author */}
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by title or author..."
            aria-label="Search books"
            className="rounded-lg border border-gray-300 bg-white p-3"
          />

          {/* Filter by category */}
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
            className="rounded-lg border border-gray-300 bg-white p-3"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          {/* Minimum price */}
          <input
            type="number"
            min="0"
            max={MAX_PRICE}
            value={minPrice}
            onChange={(event) => setMinPrice(Number(event.target.value))}
            placeholder="Minimum price"
            aria-label="Minimum price"
            className="rounded-lg border border-gray-300 bg-white p-3"
          />

          {/* Maximum price */}
          <input
            type="number"
            min="0"
            max={MAX_PRICE}
            value={maxPrice}
            onChange={(event) => setMaxPrice(Number(event.target.value))}
            placeholder="Maximum price"
            aria-label="Maximum price"
            className="rounded-lg border border-gray-300 bg-white p-3"
          />
        </div>
      </section>

      {/* Product results */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Available Books</h2>
          <p className="text-sm text-gray-600">
            {filteredProducts.length} book(s) found
          </p>
        </div>

        {loading ? (
          <p className="py-8 text-center">Loading books...</p>
        ) : error ? (
          <div className="py-8 text-center">
            <p className="mb-3 text-red-600">{error}</p>
            <button
              onClick={fetchProducts}
              className="rounded-lg bg-clay px-4 py-2 text-white"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="rounded-xl bg-cream p-8 text-center">
            No books found. Try changing your search or filters.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Products;
