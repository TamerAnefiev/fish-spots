import { useContext } from "react";
import { CookieConsentContext } from "@/context/CookieConsentContext";

export const useCookieConsentContext = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsentContext must be used within a CookieConsentProvider"
    );
  }

  return context;
};
