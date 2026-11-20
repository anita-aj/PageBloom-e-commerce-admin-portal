import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../store/useAuthStore"; 

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


  return ( 
  <div className="flex min-h-screen w-full bg-cream"> {/*outer box*/}
    
      
      <div // left panel box
        className="hidden w-1/2 flex-col items-center bg-cream bg-cover bg-bottom p-8 pt-16 text-center md:flex" // hidden on phones, half the card, stacked and centred, picture fills it from the bottom, shown from medium screens up
        style={{ backgroundImage: "url(/images/login-bg6.png)" }} // puts the book picture behind the panel
        >
        <img src="/images/Logo1.png" alt="PageBloom logo" className="h-16" /> {/*the book logo*/}
        <h2 className="mt-2 text-2xl font-bold">PageBloom</h2> 
        <p className="text-sm">Manage your bookshop with ease.</p> 
      </div> 

      
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
     <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4"> {/* the form runs handleSubmit when sent */}
        <h1 className="text-2xl font-bold">{mode === "signin" ? "Welcome Back!" : "Create account"}</h1> {/*the title changes with the mode*/}
        <p className="text-sm text-gray-600"> {/* subtitle under the title */}
          
          {mode === "signin" ? "Sign in to continue" : "Fill in your details to get started"} {/* subtitle text changes with the mode */}
        </p> 

        {mode === "signup" && ( // show the next box only when signing up
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className={box} /> //the name tells handleChange which box it is, value shows what was typed 
        )} 

        <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} className={box} /> {/* the email box */}
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className={box} /> {/* the password box */}

        {error && <p className="text-sm text-red-600">{error}</p>} {/* error message */}

        <button type="submit" className="w-full rounded bg-clay p-2 text-white"> {/* main button: sends the form */}
          {mode === "signin" ? "Sign in" : "Sign up"} {/* button text changes with the mode */}
        </button> 

        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-sm text-clay"> {/* switch button: click changes the mode */}
          {mode === "signin" ? "No account? Sign up" : "Have an account? Sign in"} {/* switch text matches the other mode */}
        </button> 
      </form> 

    </div> 
  </div> 
); 

}


export default Login;