import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { it, expect, vi } from "vitest";
import Analytics from "../components/Analytics";

it("shows the revenue card", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve([]),
  });

  render(<Analytics />);

  expect(
    await screen.findByText("Total Revenue")
  ).toBeInTheDocument();
});




it("shows the top selling books", async () => {
  global.fetch = vi.fn((url) =>
    Promise.resolve({
      json: () =>
        Promise.resolve(
          url.includes("topBooks")
            ? [{ id: 1, title: "1984", sold: 142 }]
            : []
        ),
    })
  );

  render(<Analytics />);

  expect(
    await screen.findByText("1984: 142 sold")
  ).toBeInTheDocument();
});

it("range buttons switch", async () => {
  global.fetch = vi.fn().mockResolvedValue({
    json: () => Promise.resolve([]),
  });

  render(<Analytics />);

  await userEvent.click(screen.getByText("1W"));

  expect(screen.getByText("1W")).toHaveClass("bg-clay");
});



it("shows the total number of unique customers", async () => {
  global.fetch = vi.fn((url) =>
    Promise.resolve({
      json: () =>
        Promise.resolve(
          url.includes("/orders")
            ? [
                { id: 1, customerId: 101 },
                { id: 2, customerId: 101 },
                { id: 3, customerId: 102 },
              ]
            : []
        ),
    })
  );

  render(<Analytics />);

  const customerLabel = await screen.findByText("Total Customers");

  expect(customerLabel.previousSibling.textContent).toBe("2");
});
