import { useState } from "react";
import User from "../types/FormType";
enum AuthStage {
  SIGNUP,
  SIGNIN,
}

const AuthPanel = ({
  hide,
  isHiding,
}: {
  hide: () => void;
  isHiding: boolean;
}) => {
  const [authStage, setAuthStage] = useState<AuthStage>(AuthStage.SIGNIN);
  const [fromData, setDataFrom] = useState<User>({
    name: "",
    code: 0,
    dirthday: "",
    email: "",
    password: "",
    surname: "",
    retry_password: "",
  });
  function InputValue({
    value,
    field,
  }: {
    value: string | number;
    field: keyof User;
  }) {
    const newValue = field === "code" ? Number(value) : value;
    setDataFrom((prev) => ({
      ...prev,
      [field]: newValue,
    }));
    console.log(fromData);
  }

  const [step, setStep] = useState(0);
  function validStep() {
    switch (step) {
      case 0:
        // if()
        break;

      default:
        break;
    }
  }
  return (
    <div className="auth-panel__container">
      <div className={`auth-panel ${isHiding ? "slide-out" : "slide-in"}`}>
        <button className="auth-panel__close" onClick={hide}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <path
              d="M2 2L24 24M46 46L24 24M24 24L46 2L2 46"
              stroke="black"
              strokeWidth="3"
            />
          </svg>
        </button>

        <div className="auth-panel__header">
          <img
            src="img-login.png"
            alt="Header"
            className="auth-panel__header-image"
          />
        </div>

        <div className="auth-panel__content">
          <div className="content-aut">
            <div className="cont">
              <div className="verh">
                <h2 className="t1">
                  {authStage === AuthStage.SIGNIN ? "Вход" : "Регистрация"}
                </h2>
                <button
                  className="button-auth"
                  onClick={() => {
                    setStep(0);
                    setAuthStage(
                      authStage === AuthStage.SIGNUP
                        ? AuthStage.SIGNIN
                        : AuthStage.SIGNUP
                    );
                  }}
                >
                  {authStage === AuthStage.SIGNUP ? "Вход" : "Регистрация"}
                </button>
              </div>
            </div>

            <div className="cont">
              {authStage === AuthStage.SIGNUP ? (
                <>
                  <>
                    <p className="text-ver">Введите свое имя и фамилию</p>
                    <input
                      type="text"
                      className="input"
                      placeholder="Имя"
                      onChange={(e) =>
                        InputValue({ value: e.target.value, field: "name" })
                      }
                    />
                    <input
                      type="text"
                      className="input"
                      onChange={(e) =>
                        InputValue({ value: e.target.value, field: "surname" })
                      }
                      placeholder="Фамилия"
                    />
                  </>

                  <>
                    <p className="text-ver">Дата рождения</p>
                    <div className="flex">
                      <div>
                        <span className="text-birth">День</span>
                        <input
                          type="number"
                          className="input"
                          placeholder="09"
                        />
                      </div>
                      <div>
                        <span className="text-birth">Месяц</span>
                        <input
                          type="number"
                          className="input"
                          placeholder="07"
                        />
                      </div>
                      <div>
                        <span className="text-birth">Год</span>
                        <input
                          type="number"
                          className="input"
                          placeholder="2005"
                        />
                      </div>
                    </div>
                  </>
                  <>
                    <p className="text-ver">Подтвердите почту</p>
                    <div className="containerCode">
                      <input
                        onInput={(e) =>
                          InputValue({
                            value: e.currentTarget.value,
                            field: "email",
                          })
                        }
                        type="email"
                        className="input"
                        placeholder="example@ex.ex"
                      />
                      <span className="sendCode">Отправить код</span>
                    </div>
                    <div className="flex input code">
                      <input
                        type="text"
                        onInput={(e) =>
                          InputValue({
                            value: e.currentTarget.value,
                            field: "code",
                          })
                        }
                        className="inputCode"
                        placeholder="Код"
                      />
                    </div>
                  </>
                  <>
                    <p className="text-ver">Введите пароль</p>
                    <input
                      type="password"
                      className="input"
                      onInput={(e) =>
                        InputValue({
                          value: e.currentTarget.value,
                          field: "password",
                        })
                      }
                      placeholder="Пароль"
                    />
                    <input
                      type="password"
                      className="input"
                      onInput={(e) =>
                        InputValue({
                          value: e.currentTarget.value,
                          field: "retry_password",
                        })
                      }
                      placeholder="Повторите пароль"
                    />
                  </>
                </>
              ) : (
                <>
                  <p className="text-ver">Введите почту и пароль</p>
                  <input type="email" className="input" placeholder="Почта" />
                  <input
                    type="password"
                    className="input"
                    placeholder="Пароль"
                  />
                </>
              )}
            </div>

            <div className="cont">
              {authStage === AuthStage.SIGNIN && (
                <div className="verh">
                  <p className="text-ver">Войти при помощи</p>
                  <a href="#" className="button_hea">
                    <img src="google.svg" alt="Google" />
                  </a>
                </div>
              )}

              <button
                className="submit"
                onClick={() => {
                  if (authStage === AuthStage.SIGNUP && step < 3) {
                    setStep(step + 1);
                  } else {
                    console.log("Форма отправлена");
                  }
                }}
              >
                {authStage === AuthStage.SIGNUP
                  ? step === 3
                    ? "Завершить"
                    : "Продолжить"
                  : "Войти"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
