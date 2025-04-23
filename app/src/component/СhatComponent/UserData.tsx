export default function UserData() {
  return <div className="autorizacia">
    <div className="user-info">
      <img src="/ЯрикФото.png" alt="User" className="user-icon" />
      <div className="user-text">
        <p className="user-name">
          {localStorage.getItem("name")} {localStorage.getItem("surname")}
        </p>
        <p className="user-status">Нет подписки</p>
      </div>
    </div>
    <a className="button_header_common" href="#">
      Выйти
    </a>
  </div>;
}
