import { Link, useLocation } from "react-router-dom";
import AuthPanel from "./AuthPanel";
import { useState } from "react";
import { authStore } from "../store/index";
import { observer } from "mobx-react";
import { useNewChat } from "../hook/NewChat";

import logo from '../static/logo.svg'
const links = [
  { text: "Наши продукты", href: "/products" },
  { text: "Разработчики", href: "/developers" },
  { text: "Документация", href: "/documentation" },
];
function Header(): any {
  const location = useLocation();
  let [isActive, setIsActive] = useState(false);
  let [isHiding, setIsHiding] = useState(false);

  const { mutate } = useNewChat();

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
      <header className="header" id="header">
        <a href="/">
          <img src={logo} alt="Логотип HuntAI" className="logo" />
        </a>
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

        {!authStore.isAuth ? (
          <button className="auth-button" onClick={showHandle}>
            {authStore.isWaitAuth ? "Загрузка" : "Авторизация"}
          </button>
        ) : (
          <button className="auth-button" onClick={() => mutate()}>
            Перейти в чат
          </button>
        )}
      </header>
      {isActive && <AuthPanel hide={hideHandle} isHiding={isHiding} />}
    </>
  );
}

export default observer(Header);
