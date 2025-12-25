import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";
import App from "@/App";
import { AuthProvider } from "@/context/AuthContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { ThemeProvider } from "@/context/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <CookieConsentProvider>
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider defaultTheme="system" storageKey="ui-theme">
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </CookieConsentProvider>
);
