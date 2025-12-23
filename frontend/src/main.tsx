import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CookieConsentProvider } from "./context/CookieConsentContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <CookieConsentProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </CookieConsentProvider>
);
