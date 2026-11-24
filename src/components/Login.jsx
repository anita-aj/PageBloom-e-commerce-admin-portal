import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const BASE = import.meta.env.BASE_URL;
const box = "w-full rounded border p-2";

function Login() {
  const [mode, setMode] = useState("signin");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { signIn, signUp, error } = useAuthStore();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const ok =
      mode === "signin"
        ? await signIn(form.email, form.password)
        : await signUp(form.name, form.email, form.password);
    if (ok) navigate("/");
  }

  return (
    <div className="flex min-h-screen w-full bg-cream">
      <div
        className="hidden w-1/2 flex-col items-center bg-cream bg-cover bg-bottom p-8 pt-16 text-center md:flex"
        style={{ backgroundImage: `url(${BASE}images/login-bg6.png)` }}
      >
        <img
          src={`${BASE}images/Logo1.png`}
          alt="PageBloom logo"
          className="h-16"
        />
        <h2 className="mt-2 text-2xl font-bold">PageBloom</h2>
        <p className="text-sm">Manage your bookshop with ease.</p>
      </div>

      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold">
            {mode === "signin" ? "Welcome Back!" : "Create account"}
          </h1>

          <p className="text-sm text-gray-600">
            {mode === "signin"
              ? "Sign in to continue"
              : "Fill in your details to get started"}
          </p>

          {mode === "signup" && (
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className={box}
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className={box}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={box}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button type="submit" className="w-full rounded bg-clay p-2 text-white">
            {mode === "signin" ? "Sign in" : "Sign up"}
          </button>

          <button
            type="button"
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-sm text-clay"
          >
            {mode === "signin"
              ? "No account? Sign up"
              : "Have an account? Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;