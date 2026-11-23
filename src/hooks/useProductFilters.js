import { useMemo, useState } from "react";

// Custom hook for searching and filtering products
function useProductFilters(products) {
     // Search text
  const [search, setSearch] = useState("");
     // Selected category
  const [category, setCategory] = useState("All");
     
     // Minimum and maximum prices
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  
  // Filter products whenever the filters change
  const filteredProducts = useMemo(() => {
    return (products ?? []).filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) || product.author.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || product.category === category;
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
    })
  }, [products, search, category, minPrice, maxPrice]);

// Return values and functions for the Products component
return {
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    filteredProducts,
  };
}

export default useProductFilters;
