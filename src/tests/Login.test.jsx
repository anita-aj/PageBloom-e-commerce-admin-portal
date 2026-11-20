//Password test for Login.jsx

import { render, screen } from "@testing-library/react"; // render = draw a component, screen = look at what is drawn
import userEvent from "@testing-library/user-event"; // pretends to be a person typing and clicking
import { MemoryRouter } from "react-router-dom"; // a pretend browser address bar
import { it, expect, vi } from "vitest"; // it = one test, expect = a check, vi = fake things
import Login from "../components/Login"; // the page being tested

it("shows an error for a wrong password", async () => { 
  global.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve([]) }); // fake server that says "no user found"
  render(<MemoryRouter><Login /></MemoryRouter>); // draw the page
  await userEvent.type(screen.getByPlaceholderText(/email/i), "a@b.com"); // type in the email box
  await userEvent.type(screen.getByPlaceholderText(/password/i), "wrong"); // type in the password box
  await userEvent.click(screen.getByRole("button", { name: "Sign in" })); // click Sign in
  expect(await screen.findByText("Wrong email or password")).toBeInTheDocument(); // the error should appear
});

//Sign up switch test for Login.jsx

it("switches to the sign up form", async () => { 
  render(<MemoryRouter><Login /></MemoryRouter>); // draw the page
  await userEvent.click(screen.getByRole("button", { name: "No account? Sign up" })); // click the switch button
  expect(screen.getByText("Create account")).toBeInTheDocument(); // the new title should show
  expect(screen.getByPlaceholderText("Name")).toBeInTheDocument(); // the Name box should appear
});