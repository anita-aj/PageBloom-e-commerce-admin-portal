import { render, screen } from "@testing-library/react";
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



