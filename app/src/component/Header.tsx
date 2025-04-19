import { Link, useLocation } from "react-router-dom";
import AuthPanel from "./AuthPanel";
import { useState } from "react";

const links = [
  { text: "Наши продукты", href: "/products" },
  { text: "Разработчики", href: "/developers" },
  { text: "Документация", href: "/documentation" },
];

export default function Header():any  {
  const location = useLocation();
  let [isActive, setIsActive] = useState(false);
  let [isHiding, setIsHiding] = useState(false);
  function hideHandle() {
    setIsHiding(true);
    setTimeout(() => {
      setIsActive(false);
      setIsHiding(false);
    }, 300); 
  }

  function showHandle() {
    setIsActive(true);
  }

  return (
    <>
      <header className="header">
        <img src="logo.svg" alt="Логотип HuntAI" className="logo" />

        <nav className="header-nav" aria-label="Основная навигация">
          <ul className="header-buttons">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.href}
                  className={
                    location.pathname === link.href
                      ? "button_header"
                      : "button_header_common"
                  }
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button className="auth-button" onClick={showHandle}>
          Авторизация
        </button>
      </header>
      {isActive && <AuthPanel hide={hideHandle} isHiding={isHiding} />}

    </>
  );
}
