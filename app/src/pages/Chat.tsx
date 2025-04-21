import React from "react";
import Header from "../component/Header";
const ChatPage: React.FC = () => {
  return (
    <div className="layout">
      <Header />

      <main className="main-content">
        <aside className="sidebar sidebar--history">
          <div className="history">
            <div className="sidebar__top">
              <p className="text">История</p>
              <a className="button_header_common">Новый чат</a>
            </div>
            <div className="sidebar__list">
              <p className="history-item">Ярослав Ушаков дизайн гений 💙</p>
              <p className="history-item-no-activity">
                Вдохновляющий UI концепт
              </p>
              <p className="history-item-no-activity">Идеи для веб-студии</p>
              <p className="history-item-no-activity">
                Документация API WebHunt
              </p>
            </div>
          </div>
          <div className="autorizacia">
            <div className="user-info">
              <img src="ЯрикФото.png" alt="User" className="user-icon" />
              <div className="user-text">
                <p className="user-name">Ярослав Ушаков</p>
                <p className="user-status">Нет подписки</p>
              </div>
            </div>
            <a className="button_header_common">Выйти</a>
          </div>
        </aside>

        <section className="chat-area">
          <div className="chat-messages">
            <div className="message received">
              <div className="message__body">
                <div className="message__avatar">
                  <img
                    src="ЛогоЧата.svg"
                    alt="Bot"
                    className="message__avatar-img"
                  />
                </div>
                <div className="message__wrapper">
                  <div className="message__header">
                    <span className="message__sender">HuntAI</span>
                    <button className="message__copy-button" title="Копировать">
                      <img
                        src="copy.svg"
                        alt="Copy"
                        className="message__copy-icon"
                      />
                    </button>
                  </div>
                  <div className="message__content markdown-content">
                    <p>
                      Now, when the .header-text content (e.g., "Web Chat With
                      AI") is too long for its container, it will truncate with
                      .... If you don’t see the ellipsis and want to force it,
                      let me know, and I can suggest a specific max-width or
                      other tweaks!
                    </p>
                    <div className="message__content-code">
                      <div className="message__header">
                        <div className="Code">html</div>
                        <img
                          src="copy.svg"
                          alt="Copy"
                          className="message__copy-icon"
                        />
                      </div>
                      <pre className="Code"></pre>
                    </div>
                    <p>
                      Now, when the .header-text content (e.g., "Web Chat With
                      AI") is too long for its container, it will truncate with
                      .... If you don’t see the ellipsis and want to force it,
                      let me know, and I can suggest a specific max-width or
                      other tweaks!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="message sent">
              <div className="message__content">
                <p className="message__text">
                  Привет! Всё отлично, спасибо! Как ты? 🙌
                </p>
              </div>
            </div>
          </div>

          <form className="chat-input" id="chat-form">
            <textarea
              className="chat-input__textarea"
              placeholder="Введите запрос..."
            ></textarea>
            <button type="submit" className="chat-input__button">
              <img src="send.svg" alt="Send" />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default ChatPage;
