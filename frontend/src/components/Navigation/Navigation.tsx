import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Fish } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Hamburger from "./Hamburger";
import { UserDropdown } from "./UserDropdown";

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
  const { user } = useAuth();

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

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full p-3 text-2xl font-medium md:justify-center">
      <nav className="click-outside flex max-w-screen-2xl items-center max-md:w-full md:w-5/6 md:justify-between">
        <Hamburger
          isOpen={hamburgerOpen}
          handleHamburgerMenu={handleHamburgerMenu}
        />

        <section className="flex items-center">
          <Link
            onClick={handleCloseHamburgerMenu}
            className="hover:bg-muted flex h-8 w-8 items-center justify-center rounded-lg p-2 duration-200"
            to="/"
          >
            <Fish color="#1f61f9" className="h-4 w-4" />
          </Link>

          <ul className="flex max-md:hidden">
            {staticNavigationLinks.links.map((link) => {
              if (!user && link.hideWhenNotLogged) return null;

              return (
                <li key={link.text}>
                  <Link
                    to={link.linkTo}
                    className="hover:bg-muted flex h-8 rounded-lg p-2 text-sm font-medium duration-200"
                  >
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="flex">
          <UserDropdown />
        </section>
      </nav>
    </header>
  );
};

export default Navigation;
