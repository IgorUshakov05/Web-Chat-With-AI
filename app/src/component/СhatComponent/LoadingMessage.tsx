export default function LoadingMessage() {
  return (
    <div className="message received">
      <div className="message__body">
        <div className="message__avatar">
          <img src="/ЛогоЧата.svg" alt="Bot" className="message__avatar-img" />
        </div>
        <div className="message__wrapper">
          <div className="message__content markdown-content loading">
            Генерирую
            <div className="loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
