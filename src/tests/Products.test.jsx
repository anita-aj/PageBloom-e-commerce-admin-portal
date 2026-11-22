import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Products from "../components/Products";

// Create a mock for store so tests don't change the real database
const mockStore = vi.hoisted(() => ({
  products: [],
  loading: false,
  error: "",
  fetchProducts: vi.fn(),
  updatePrice: vi.fn(),
  deleteProduct: vi.fn(),
}));

vi.mock("../store/useProductStore", () => ({
  default: (selector) => selector(mockStore),
}));

const sampleProducts = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    price: 1200,
    image: "/images/1984.jpg",
  },
  {
    id: 2,
    title: "Matilda",
    author: "Roald Dahl",
    category: "Children",
    price: 900,
    image: "/images/matilda.jpg",
  },
  {
    id: 3,
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "Non-fiction",
    price: 2100,
    image: "/images/sapiens.jpg",
  },
];   

describe("Products page", () => {
  beforeEach(() => {
    mockStore.products = sampleProducts;
    mockStore.loading = false;
    mockStore.error = "";
    vi.clearAllMocks();
  });

it("displays the Product page and its books", () => {
    render(<Products />);

    expect(
      screen.getByRole("heading", { name: "Products" })
    ).toBeInTheDocument();

    expect(screen.getByText("1984")).toBeInTheDocument();
    expect(screen.getByText("Matilda")).toBeInTheDocument();
    expect(screen.getByText("Sapiens")).toBeInTheDocument();
  });
    
  it("fetches products when the page loads", () => {
    render(<Products />);

    expect(mockStore.fetchProducts).toHaveBeenCalled();
  });
  
it("searches books by title", async () => {
    const user = userEvent.setup();
    render(<Products />);

    await user.type(
      screen.getByRole("searchbox", { name: "Search books" }),
      "1984"
    );

    expect(screen.getByText("1984")).toBeInTheDocument();
    expect(screen.queryByText("Matilda")).not.toBeInTheDocument();
});

it("searches books by author", async () => {
    const user = userEvent.setup();
    render(<Products />);

    await user.type(
      screen.getByRole("searchbox", { name: "Search books" }),
      "Roald Dahl"
    );
  
    expect(screen.getByText("Matilda")).toBeInTheDocument();
    expect(screen.queryByText("1984")).not.toBeInTheDocument();
  });
    
it("filters books by category", async () => {
    const user = userEvent.setup();
    render(<Products />);

    await user.selectOptions(
      screen.getByRole("combobox", { name: "Filter by category" }),
      "Children"
    );
  
    expect(screen.getByText("Matilda")).toBeInTheDocument();
    expect(screen.queryByText("1984")).not.toBeInTheDocument();
    expect(screen.queryByText("Sapiens")).not.toBeInTheDocument();
  });
    
it("filters books by minimum price", async () => {
    const user = userEvent.setup();
    render(<Products />);

    await user.clear(screen.getByRole("spinbutton", { name: "Minimum price" }));
    await user.type(
      screen.getByRole("spinbutton", { name: "Minimum price" }),
      "1000"
    );

    await user.clear(screen.getByRole("spinbutton", { name: "Maximum price" }));
    await user.type(
      screen.getByRole("spinbutton", { name: "Maximum price" }),
      "1500"
    );
    
    expect(screen.getByText("1984")).toBeInTheDocument();
    expect(screen.queryByText("Matilda")).not.toBeInTheDocument();
    expect(screen.queryByText("Sapiens")).not.toBeInTheDocument();
  }); 
    
  it("shows a message when no books match the search", async () => {
    const user = userEvent.setup();
    render(<Products />);

    await user.type(
      screen.getByRole("searchbox", { name: "Search books" }),
      "Harry Potter"
    );

    expect(screen.getByText("No books found. Try changing your search or filters.")
    ).toBeInTheDocument();
  });
});

it("shows a loadaing message while products are loading", () => {
    mockStore.loading = true;

    render(<Products />);

    expect(screen.getByText("Loading books...")).toBeInTheDocument();
  });
  
it("shows an error message when products fail to load", () => {
  mockStore.loading = false;
  mockStore.error = "Failed to fetch products";

    render(<Products />);

    expect(
        screen.getByText("Failed to fetch products")
    ).toBeInTheDocument();

    expect(
        screen.getByRole("button", { name: "Try Again" })
    ).toBeInTheDocument();
});
