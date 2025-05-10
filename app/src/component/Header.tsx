import { Link, useLocation } from "react-router-dom";
import AuthPanel from "./AuthPanel";
import { useState } from "react";
import { authStore } from "../store/index";
import { observer } from "mobx-react";
import { useNewChat } from "../hook/NewChat";

import logo from "../static/logo.svg";
const links = [
  { text: "Наши продукты", href: "/products" },
  { text: "Разработчики", href: "/developers" },
  { text: "Документация", href: "/documentation" },
];
function Header(): any {
  const location = useLocation();
  let [isActive, setIsActive] = useState(false);
  let [isHiding, setIsHiding] = useState(false);
  let [isOpen, setOpen] = useState(false);
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
        <div className="replaace">
          <nav className="header-nav" aria-label="Основная навигация">
            <div
              className={`burger ${isOpen ? "open" : ""}`}
              onClick={() => setOpen(!isOpen)}
            >
              <div></div>
              <div></div>
            </div>
            <ul className={`header-buttons ${isOpen ? "open" : ""}`}>
              {links.map((link, index) => (
                <li
                  key={index}
                  style={{
                    width:
                      links.length - 1 === index && !authStore.isAuth
                        ? "100%"
                        : "50%",
                  }}
                >
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
              {authStore.isAuth && (
                <li>
                  <Link
                    to="#"
                    onClick={() => mutate()}
                    className={"button_header_common"}
                  >
                    Перейти в чат
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {!authStore.isAuth ? (
            <button className="auth-button" onClick={showHandle}>
              {authStore.isWaitAuth ? "Загрузка" : "Авторизация"}
            </button>
          ) : (
            <button className="auth-button m-none" onClick={() => mutate()}>
              Перейти в чат
            </button>
          )}
        </div>
      </header>
      {isActive && <AuthPanel hide={hideHandle} isHiding={isHiding} />}
    </>
  );
}

export default observer(Header);
