import Spinner from "./Spin";

export default function LoadingMessage() {
  return (
    <div className="message received">
      <div className="message__body">
        <div className="message__avatar">
          <img src="/ЛогоЧата.svg" alt="Bot" className="message__avatar-img" />
        </div>
        <div className="message__wrapper">
          <div className="beflex">
            <h1 className="message__sender">HuntAI</h1>
            <p className="message__header">
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
            </p>
          </div>
          <div className="message__content markdown-content">
            <Spinner />
          </div>
        </div>
      </div>
    </div>
  );
}
