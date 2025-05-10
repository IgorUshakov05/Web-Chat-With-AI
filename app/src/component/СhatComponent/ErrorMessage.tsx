export default function ErrorMessage() {
  return (
    <div className="message received">
      <div className="message__body">
        <div className="message__avatar">
          <img src="/ЛогоЧата.svg" alt="Bot" className="message__avatar-img" />
        </div>
        <div className="message__wrapper">
          <div className="message__content markdown-content loading error">
            Ошибка генерации
            <div className="loader">
              <svg
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.29359 1.79139C6.0735 0.515592 7.9265 0.515591 8.70641 1.79139L12.9339 8.70685C13.7486 10.0395 12.7895 11.75 11.2275 11.75H2.77249C1.2105 11.75 0.25139 10.0395 1.06609 8.70685L5.29359 1.79139Z"
                  fill="#FF0000"
                />
                <path d="M7 4V8" stroke="white" stroke-width="1.5" />
                <path d="M7 9L7 10.5" stroke="white" stroke-width="1.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
