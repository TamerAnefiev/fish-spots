import { BrowserRouter } from "react-router-dom";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/util/constants";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <CookieConsentProvider>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <AuthProvider>
            <BrowserRouter>
              <ThemeProvider defaultTheme="system" storageKey="ui-theme">
                <TooltipProvider>{children}</TooltipProvider>
              </ThemeProvider>
            </BrowserRouter>
          </AuthProvider>
        </GoogleOAuthProvider>
      </CookieConsentProvider>
    </QueryProvider>
  );
}
