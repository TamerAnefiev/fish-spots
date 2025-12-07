import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CookieConsentProvider } from "./context/CookieConsentContext.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookieConsentProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </CookieConsentProvider>
);

reportWebVitals();
