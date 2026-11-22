import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AddProduct from "../components/AddProduct";

describe("AddProduct", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("submits a new product successfully", async () => {
    fetch.mockResolvedValue({
      ok: true,
    });

    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/book title/i), {
      target: { value: "The Great Gatsby" },
    });

    fireEvent.change(screen.getByLabelText(/author/i), {
      target: { value: "F. Scott Fitzgerald" },
    });

    fireEvent.change(screen.getByLabelText(/price/i), {
      target: { value: "1500" },
    });

    fireEvent.click(screen.getByRole("button", { name: /add product/i }));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:3001/products",
        expect.objectContaining({
          method: "POST",
        })
      );
    });
  });

  it("displays an error when required fields are missing", () => {
    render(
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    );

    const form = document.querySelector("form");

    fireEvent.submit(form);

    expect(screen.getByText("Book title is required")).toBeInTheDocument();
  });
});
