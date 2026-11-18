import { useNavigate } from "react-router-dom"; 
import useAuthStore from "../store/useAuthStore"; 

function Login() {
  const signIn = useAuthStore((s) => s.signIn); // take the signIn function out of useAuthStore
  const navigate = useNavigate(); 

  async function go() { // runs when the button is clicked
    if (await signIn("admin@pagebloom.com", "admin123")) navigate("/"); // sign in as the test user, then go Home
  }

  return <button onClick={go}>Temporary sign in</button>; // button that runs go()
}
export default Login;