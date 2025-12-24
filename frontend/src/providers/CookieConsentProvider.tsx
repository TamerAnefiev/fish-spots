import { useEffect, useState } from "react";
import { CookieConsentContext } from "@/context/CookieConsentContext";
import { baseUrl } from "@/util/constants";

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

  const contextData = {
    hasAgreed,
    onCookieConsent,
  };

  return (
    <CookieConsentContext.Provider value={contextData}>
      {children}
    </CookieConsentContext.Provider>
  );
};
