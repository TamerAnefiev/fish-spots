import { createContext } from "react";

type CookieConsentData = {
  hasAgreed: boolean;
  onCookieConsent: (isAccepted: boolean) => void;
};

export const CookieConsentContext = createContext<
  CookieConsentData | undefined
>(undefined);
