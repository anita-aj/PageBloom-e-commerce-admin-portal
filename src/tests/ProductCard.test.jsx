import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "../components/ProductCard";  

// Mock the Zustand store
const mockStore = vi.hoisted(() => ({
  updatePrice: vi.fn(),
  deleteProduct: vi.fn(),
}));

vi.mock("../store/useProductStore", () => ({
  default: (selector) => selector(mockStore),
}));

const sampleProduct = {
  id: 1,
  title: "1984",
  author: "George Orwell",
  category: "Fiction",
  price: 1200,
  image: "/images/1984.jpg",
};

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockStore.updatePrice.mockResolvedValue(true);
    mockStore.deleteProduct.mockResolvedValue(true);
    window.confirm = vi.fn();
  });

  it("opens the price editor when Edit Price is clicked", async () => {
    const user = userEvent.setup();

    render(<ProductCard product={sampleProduct} />);

    await user.click(screen.getByRole("button", { name: "Edit Price" }));

    expect(
      screen.getByRole("spinbutton", { name: "New price for 1984" })
    ).toHaveValue(1200);
  });
 
  it("displays the book details and cover image", () => {
    render(<ProductCard product={sampleProduct} />);

    expect(screen.getByText("1984")).toBeInTheDocument();
    expect(screen.getByText("George Orwell")).toBeInTheDocument();
    expect(screen.getByText("Fiction")).toBeInTheDocument();
    expect(screen.getByAltText("1984")).toHaveAttribute(
      "src",
      "/images/1984.jpg"
    );
  });

  it("saves the updated price", async () => {
    const user = userEvent.setup();

    render(<ProductCard product={sampleProduct} />);

    await user.click(screen.getByRole("button", { name: "Edit Price" }));

    const input = screen.getByRole("spinbutton", {
      name: "New price for 1984",
    });

    await user.clear(input);
    await user.type(input, "1500");

    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(mockStore.updatePrice).toHaveBeenCalledWith(1, 1500);
  });

  it("cancels price editing and restores the original price", async () => {
    const user = userEvent.setup();

    render(<ProductCard product={sampleProduct} />);

    await user.click(screen.getByRole("button", { name: "Edit Price" }));

    const input = screen.getByRole("spinbutton", {
      name: "New price for 1984",
    });

    await user.clear(input);
    await user.type(input, "1500");

    await user.click(screen.getByRole("button", { name: "Cancel" }));

    expect(
      screen.queryByRole("spinbutton", { name: "New price for 1984" })
    ).not.toBeInTheDocument();

    expect(screen.getByText("KSh 1,200")).toBeInTheDocument();
  });

  it("deletes a book after the user confirms", async () => {
    const user = userEvent.setup();

    window.confirm.mockReturnValue(true);

    render(<ProductCard product={sampleProduct} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete "1984"?'
    );

    expect(mockStore.deleteProduct).toHaveBeenCalledWith(1);
  });

  it("does not delete a book when the user cancels", async () => {
    const user = userEvent.setup();

    window.confirm.mockReturnValue(false);

    render(<ProductCard product={sampleProduct} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));

    expect(window.confirm).toHaveBeenCalled();

    expect(mockStore.deleteProduct).not.toHaveBeenCalled();
  });
});
  