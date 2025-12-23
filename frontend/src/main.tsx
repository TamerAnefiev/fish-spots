import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { CookieConsentProvider } from "./providers/CookieConsentProvider";

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
