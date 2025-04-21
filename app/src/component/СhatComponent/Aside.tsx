export default function Aside() {
  return (
    <aside className="sidebar sidebar--history">
      <div className="history">
        <div className="sidebar__top">
          <p className="text">История</p>
          <a className="button_header_common" href="#">
            Новый чат
          </a>
        </div>
        <div className="sidebar__list">
          <p className="history-item">Ярослав Ушаков дизайн гений 💙</p>
          <p className="history-item-no-activity">Вдохновляющий UI концепт</p>
          <p className="history-item-no-activity">Идеи для веб-студии</p>
          <p className="history-item-no-activity">Документация API WebHunt</p>
        </div>
      </div>
      <div className="autorizacia">
        <div className="user-info">
          <img src="/ЯрикФото.png" alt="User" className="user-icon" />
          <div className="user-text">
            <p className="user-name">Ярослав Ушаков</p>
            <p className="user-status">Нет подписки</p>
          </div>
        </div>
        <a className="button_header_common" href="#">
          Выйти
        </a>
      </div>
    </aside>
  );
}
