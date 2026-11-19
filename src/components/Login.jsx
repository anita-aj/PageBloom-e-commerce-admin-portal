import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

const box = "w-full rounded border p-2"; // a string of Tailwind classes that we can use to style the input boxes

function Login(){
   const [mode, setMode] = useState("signin"); // is the user signing in or signing up?
   const [form, setForm] = useState({ name: "", email: "", password: "" }); // what the person has typed so far
   const { signIn, signUp, error } = useAuthStore(); // take the functions and the error message from the notebook
   const navigate = useNavigate(); // allows user to navigate to a different page after signing in or signing up

 
 
function handleChange(e) { // runs when text is typed in a box
    setForm({ ...form, [e.target.name]: e.target.value }); // copy the form, changing only the box that changed
  }


async function handleSubmit(e) { // runs when the form is sent
    e.preventDefault(); // stop the browser's normal behavior of reloading the page
    const ok = mode === "signin" // is the user signing in?
      ? await signIn(form.email, form.password) // yes: try to sign in
      : await signUp(form.name, form.email, form.password); // no: try to create an account
    if (ok) navigate("/"); // if it worked, go to the Home page
  }


  return <h1>Login</h1>;
}