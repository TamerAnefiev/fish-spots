import { useState, createContext, useEffect } from "react";
import { baseUrl } from "../util/constants";

const CookieConsentContext = createContext();

export default CookieConsentContext;

export const CookieConsentProvider = ({ children }) => {
  const [hasAgreed, setHasAgreed] = useState(true);

  useEffect(() => {
    const checkCookieConsent = () => {
      const options = {
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

  const onCookieConsent = (isAccepted) => {
    const options = {
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
