import React, { useState, createContext, useEffect, useContext } from "react";
import { baseUrl } from "../util/constants";

type CookieConsentData = {
  hasAgreed: boolean;
  onCookieConsent: (isAccepted: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentData | undefined>(
  undefined
);

export const CookieConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [hasAgreed, setHasAgreed] = useState(true);

  useEffect(() => {
    const checkCookieConsent = () => {
      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };
      fetch(`${baseUrl}/profile/cookie-consent/`, options)
        .then((response) => response.json())
        .then((data) => {
          setHasAgreed(data.consent);
        })
        .catch((error) => console.error(error.message));
    };

    checkCookieConsent();
  }, []);

  const onCookieConsent = (isAccepted: boolean) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ consent: isAccepted }),
      credentials: "include",
    };
    fetch(`${baseUrl}/profile/cookie-consent/`, options)
      .then((response) => response.json())
      .then((data) => {
        setHasAgreed(data.consent);
      })
      .catch((error) => console.error(error.message));
  };

  let contextData = {
    hasAgreed,
    onCookieConsent,
  };

  return (
    <CookieConsentContext.Provider value={contextData}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsentContext = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsentContext must be used within a CookieConsentProvider"
    );
  }

  return context;
};
