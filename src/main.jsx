import { StrictMode } from "react"; // a wrapper that warns us about mistakes while developing
import { createRoot } from "react-dom/client"; // the tool that puts React on the web page
import { BrowserRouter } from "react-router-dom"; // lets the app switch pages by address
import App from "./App"; // our main component
import "./index.css"; // load the styles

createRoot(document.getElementById("root")).render( // find the empty box in index.html and draw into it
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);