import { Link } from "react-router-dom";
import { useCookieConsent } from "@/context/CookieConsentContext";

export default function CookieConsent() {
  const { hasAgreed, onCookieConsent } = useCookieConsent();

  if (hasAgreed !== null) {
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full py-4 px-6 bg-black text-orange-600 opacity-90">
      <section className="flex justify-between items-center text-xl mb-2">
        <p>Съгласие за бисквитки</p>
        <button onClick={() => onCookieConsent(false)}>X</button>
      </section>
      <p>
        Чрез използването на този уебсайт, вие се съгласявате с използването на
        бисквитки в съответствие с нашата{" "}
        <Link
          className="text-cyan-700 underline font-bold"
          to="/privacy-policy"
        >
          Политика за поверителност
        </Link>
        . Бисквитките ни позволяват да предоставяме по-добро преживяване на
        потребителите. За да научите повече за начина, по който използваме
        бисквитки и вашите възможности, моля прегледайте нашата Политика за
        поверителност.
      </p>
      <section className="flex justify-end">
        <button
          onClick={() => onCookieConsent(true)}
          className="py-2 px-4 bg-yellow-500 hover:bg-yellow-700 rounded text-black text-lg"
        >
          Разбрах!
        </button>
      </section>
    </div>
  );
}
