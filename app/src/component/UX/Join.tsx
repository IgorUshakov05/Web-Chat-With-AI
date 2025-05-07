import { observer } from "mobx-react";
import { authStore } from "../../store";

function Join() {
  return (
    <div className="sd">
      <img src="HuntID.webp" className="left-img" alt="HuntID logo" />
      <div className="right">
        <h4 className="name-product size">Присоединяйся</h4>
        <div className="join">
          <p className="text-join">
            Станьте частью нашей ЭКО-системы, аккаунт созданный на любой из
            наших платформ, вы можете использовать на других наших платформах{" "}
          </p>
          <div className="list-product-join">
            <div className="element">
              <img
                src="Галочка.svg"
                className="logo-plasd"
                alt="WebHunt logo"
              />
              <p className="opisa">WebHunt</p>
            </div>
            <div className="element">
              <img
                src="Галочка.svg"
                className="logo-plasd"
                alt="CountryHunt logo"
              />
              <p className="opisa">CountryHunt</p>
            </div>
            <div className="element">
              <img src="Галочка.svg" className="logo-plasd" alt="HuntAI logo" />
              <p className="opisa">HuntAI</p>
            </div>
          </div>
          {!authStore.isAuth && (
            <div className="list-product-join">
              <a href="#header" className="button-join-vhod">
                Войти
              </a>
              <a href="#header" className="button-join-registr">
                Зарегестрироваться
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(Join);
