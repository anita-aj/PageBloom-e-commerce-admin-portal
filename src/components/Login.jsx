import {useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuthStore from "../store/useAuthStore"; 

const box = "w-full rounded border p-2"; // styles for the input boxes

function Login(){
   const [mode, setMode] = useState("signin"); 
   const [form, setForm] = useState({ name: "", email: "", password: "" }); 
   const { signIn, signUp, error } = useAuthStore();
   const navigate = useNavigate();

 
 
function handleChange(e) { 
    setForm({ ...form, [e.target.name]: e.target.value }); // copy the form, changing only the box that changed
  }


async function handleSubmit(e) { 
    e.preventDefault(); 
    const ok = mode === "signin" // is the user signing in?
      ? await signIn(form.email, form.password) // yes: try to sign in
      : await signUp(form.name, form.email, form.password); // no: try to create an account
    if (ok) navigate("/"); 
  }


  return ( 
  <div className="flex min-h-screen w-full bg-cream"> {/*outer box*/}
    
      
      <div // left panel box
        className="hidden w-1/2 flex-col items-center bg-cream bg-cover bg-bottom p-8 pt-16 text-center md:flex" 
        style={{ backgroundImage: "url(/images/login-bg6.png)" }} 
        >
        <img src="/images/Logo1.png" alt="PageBloom logo" className="h-16" /> {/*the book logo*/}
        <h2 className="mt-2 text-2xl font-bold">PageBloom</h2> 
        <p className="text-sm">Manage your bookshop with ease.</p> 
      </div> 

      
      <div className="flex w-full items-center justify-center bg-white p-8 md:w-1/2">
     <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4"> 
        <h1 className="text-2xl font-bold">{mode === "signin" ? "Welcome Back!" : "Create account"}</h1> 
        
         {/* subtitle under the title */}
        <p className="text-sm text-gray-600"> 
          
          {mode === "signin" ? "Sign in to continue" : "Fill in your details to get started"} 
        </p> 

        {mode === "signup" && ( 
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className={box} /> //the name tells handleChange which box it is, value shows what was typed 
        )} 

        <input name="email" type="email" placeholder="Email address" value={form.email} onChange={handleChange} className={box} /> 
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className={box} />

        {error && <p className="text-sm text-red-600">{error}</p>} 

        <button type="submit" className="w-full rounded bg-clay p-2 text-white"> 
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