import { useNavigate } from "react-router-dom";
import { authStore } from "../../store";
import { observer } from "mobx-react";

function UserData() {
  const navigate = useNavigate();
  const handle_exit = async () => {
    await localStorage.clear();
    await authStore.setWaitAuth(false);
    await authStore.setAuth(false);
    await navigate("/");
  };
  return (
    <div className="autorizacia">
      <div className="user-info">
        <img src="/ДефолтСпециалист.jpg" alt="User" className="user-icon" />
        <div className="user-text">
          <p className="user-name">
            {localStorage.getItem("name")} {localStorage.getItem("surname")}
          </p>
          <p className="user-status">Нет подписки</p>
        </div>
      </div>
      <button className="button_header_common" onClick={handle_exit}>
        Выйти
      </button>
    </div>
  );
}

export default observer(UserData);
