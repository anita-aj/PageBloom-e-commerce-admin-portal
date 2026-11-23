import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { it, expect, vi } from "vitest";
import useAuthStore from "../store/useAuthStore"; // so we can pretend someone is logged in
import Home from "../components/Home";

it("welcomes the logged-in user", async () => {
  useAuthStore.setState({ user: { name: "Anita" } }); // pretend Anita is logged in
  globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve([]) }); // fake server: empty lists
  render(<MemoryRouter><Home /></MemoryRouter>); // draw the page
  expect(await screen.findByText("Welcome, Anita!")).toBeInTheDocument(); // the greeting should appear
});