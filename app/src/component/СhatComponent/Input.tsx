export default function Input() {
  return (
    <div className="chat-input" id="chat-form">
      <textarea
        className="chat-input__textarea"
        placeholder="Введите запрос..."
      ></textarea>
      <button type="submit" className="chat-input__button" onSubmit={() => {}}>
        <img src="/send.svg" alt="Send" />
      </button>
    </div>
  );
}
