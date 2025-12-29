import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Hamburger from "./Hamburger";
import { logoutUser } from "@/services/users";
import { ThemeDropdown } from "./ThemeDropdown";

const staticNavigationLinks = {
  cssClasses: "hover:text-stone-300 duration-300",
  links: [
    {
      linkTo: "/catch-history",
      text: "Риболовна История",
      hideWhenNotLogged: true,
    },
    { linkTo: "/chepareta", text: "Чепарета", hideWhenNotLogged: false },
    {
      linkTo: "/city?search=varna",
      text: "Варна",
      hideWhenNotLogged: false,
    },
    {
      linkTo: "/city?search=burgas",
      text: "Бургас",
      hideWhenNotLogged: false,
    },
  ],
};

const Navigation = () => {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const { isLogged, resetUser } = useAuth();
  const navigate = useNavigate();

  const handleHamburgerMenu = () => {
    // used for when the hamburger menu is clicked
    const isOpen = !hamburgerOpen;

    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else if (!isOpen) {
      document.body.classList.remove("overflow-hidden");
    }

    setHamburgerOpen(isOpen);
  };

  const handleCloseHamburgerMenu = () => {
    // used for closing the menu when the click is outside or when you click a link
    setHamburgerOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element | null;
      // if (!event.target.closest(".click-outside")) { // this is for when it was in JS and event didnt have a type
      if (target && !target.closest(".click-outside")) {
        handleCloseHamburgerMenu();
      }
    };

    if (hamburgerOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [hamburgerOpen]);

  const handleLogOut = async () => {
    try {
      const response = await logoutUser();

      if (response.status === 200) {
        resetUser();
        navigate("/", { replace: true });
      }
    } catch {
      console.error("failed to log out.");
    }
  };

  return (
    <header className="sticky top-0 z-50 flex w-full bg-linear-to-r from-blue-500 to-cyan-500 p-6 text-2xl font-medium text-white md:justify-center">
      <nav className="click-outside flex max-w-screen-2xl max-md:w-full max-md:items-center md:w-5/6 md:justify-between">
        <Hamburger
          isOpen={hamburgerOpen}
          handleHamburgerMenu={handleHamburgerMenu}
        />

        <section className="max-md:w-full max-md:text-center">
          <Link
            onClick={handleCloseHamburgerMenu}
            className={staticNavigationLinks.cssClasses}
            to="/"
          >
            Риболовни места
          </Link>
        </section>

        <ul className="flex flex-wrap gap-12 max-md:hidden">
          {staticNavigationLinks.links.map((link) => {
            if (!isLogged && link.hideWhenNotLogged) return null;

            return (
              <li key={link.text}>
                <Link
                  className={staticNavigationLinks.cssClasses}
                  to={link.linkTo}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
          {!isLogged && (
            <li>
              <Link
                className={`cursor-pointer ${staticNavigationLinks.cssClasses}`}
                to="/login"
              >
                Вход
              </Link>
            </li>
          )}
          {isLogged && (
            <li
              key="logout"
              className={`cursor-pointer ${staticNavigationLinks.cssClasses}`}
              onClick={handleLogOut}
            >
              Изход
            </li>
          )}

          <li>
            <ThemeDropdown />
          </li>
        </ul>

        <ul
          className={`fixed top-20 bottom-0 left-0 z-50 flex w-60 flex-col gap-5 overflow-auto rounded-r-lg bg-slate-900 p-4 text-2xl font-medium text-white transition-opacity duration-300 ease-in-out ${
            hamburgerOpen ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {staticNavigationLinks.links.map((link) => {
            if (!isLogged && link.hideWhenNotLogged) return null;

            return (
              <li
                key={link.text}
                className="border-b-2 border-red-900"
                onClick={handleCloseHamburgerMenu}
              >
                <Link
                  className={staticNavigationLinks.cssClasses}
                  to={link.linkTo}
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
          {!isLogged && (
            <li>
              <Link
                className={`cursor-pointer ${staticNavigationLinks.cssClasses}`}
                to="/login"
              >
                Вход
              </Link>
            </li>
          )}
          {isLogged && (
            <li
              key="logout-mobile"
              className={`cursor-pointer ${staticNavigationLinks.cssClasses}`}
              onClick={handleLogOut}
            >
              Изход
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
