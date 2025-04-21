import Message from "../../types/ChatMessages";

export default function MessageTemplate(data: Message) {
  if (data.sender === "Bot") {
    return (
      <>
        <div className="message received">
          <div className="message__body">
            <div className="message__avatar">
              <img
                src="/ЛогоЧата.svg"
                alt="Bot"
                className="message__avatar-img"
              />
            </div>
            <div className="message__wrapper">
              <div className="message__header">
                <span className="message__sender">HuntAI</span>
                <button
                  className="message__copy-button"
                  title="Копировать"
                  type="button"
                >
                  <img
                    src="/copy.svg"
                    alt="Copy"
                    className="message__copy-icon"
                  />
                </button>
              </div>
              <div className="message__content markdown-content">
                <p>
                  Now, when the .header-text content (e.g., "Web Chat With AI")
                  is too long for its container, it will truncate with .... If
                  you don’t see the ellipsis and want to force it, let me know,
                  and I can suggest a specific max-width or other tweaks!
                </p>
                <div className="message__content-code">
                  <div className="message__header">
                    <div className="Code">html</div>
                    <img
                      src="/copy.svg"
                      alt="Copy"
                      className="message__copy-icon"
                    />
                  </div>
                  <pre className="Code"></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="message sent">
        <div className="message__content">
          <p className="message__text">
            Привет! Всё отлично, спасибо! Как ты? 🙌
          </p>
        </div>
      </div>
    );
  }
}
