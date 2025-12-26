import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "@/index.css";
import App from "@/App";
import { AuthProvider } from "@/context/AuthContext";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/providers/QueryProvider";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <QueryProvider>
    <CookieConsentProvider>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider defaultTheme="system" storageKey="ui-theme">
            <TooltipProvider>
              <App />
            </TooltipProvider>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </CookieConsentProvider>
  </QueryProvider>
);
