import { useEffect, useState } from "react";
import User from "../types/FormType";
import useSendCode from "../hook/useVerefyPost";
import useRegistration from "../hook/useRegistration";
import useVerefyCode from "../hook/useVerefyCode";
import useLogin from "../hook/useLogin";
import { observer } from "mobx-react";
import { authStore } from "../store";
import Google from "./GoogleAuth";
import useLoginGoogle from "../hook/useLoginGoogle";
import { useGoogleLogin } from "@react-oauth/google";
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
    day: 0,
    month: 0,
    year: 0,
    isVerefy: false,
    email: "",
    password: "",
    surname: "",
    retry_password: "",
  });
  interface InputValueProps {
    value: string | number;
    field: keyof User;
  }
  function InputValue({ value, field }: InputValueProps) {
    let newValue: string | number = field === "code" ? Number(value) : value;

    if (["code", "day", "month", "year"].includes(field)) {
      newValue = Number(value);
      if (isNaN(newValue)) return;
    }

    if (field === "code" && newValue.toString().length > 6) {
      return;
    }

    if (field === "day" && (Number(newValue) < 1 || Number(newValue) > 31)) {
      return;
    }

    if (field === "month" && (Number(newValue) < 1 || Number(newValue) > 12)) {
      return;
    }

    const currentYear = new Date().getFullYear();
    if (
      field === "year" &&
      (Number(newValue) < 1900 || Number(newValue) > currentYear)
    ) {
      return;
    }

    setDataFrom((prev) => ({
      ...prev,
      [field]: newValue,
    }));
    if (field === "code" && newValue.toString().length === 6) {
      sendVerefy();
      return;
    }
    console.log(`Поле "${field}" обновлено:`, newValue);
  }

  const handelClichButtonRegistration = () => {
    if (authStage === AuthStage.SIGNUP && step < 3) {
      setStep(step + 1);
    } else {
      console.log("Форма отправлена");

      sendDataRegistration(undefined, {
        onSuccess: (data) => {
          if (!data.success) return;

          localStorage.setItem("access", data.access || "");
          localStorage.setItem("name", data.name || "");
          localStorage.setItem("surname", data.surname || "");
          localStorage.setItem("refresh", data.refresh || "");
          authStore.setAuth(true);

          hide();
        },
        onError: (error) => {
          console.error("Ошибка:", error);
        },
      });
    }
  };

  const handelClichButtonLogin = () => {
    sendDataLogin(undefined, {
      onSuccess: (data) => {
        console.log(data);
        if (!data.success) return;
        localStorage.setItem("access", data.access || "");
        localStorage.setItem("refresh", data.refresh || "");
        localStorage.setItem("name", data.name || "");
        localStorage.setItem("surname", data.surname || "");

        authStore.setAuth(true);
        hide();
      },
      onError: (error) => {
        console.error("Ошибка:", error);
      },
    });
  };

  function clearInputs() {
    setDataFrom({
      name: "",
      code: 0,
      day: 0,
      month: 0,
      year: 0,
      isVerefy: false,
      email: "",
      password: "",
      surname: "",
      retry_password: "",
    });
  }

  const [step, setStep] = useState(0);
  function validStepLogin() {
    return !(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromData.email) &&
      fromData.password.length >= 6
    );
  }
  function validStepRegistration(stepItem: number) {
    switch (stepItem) {
      case 0:
        return !(fromData.name && fromData.surname);
      case 1:
        return !(fromData.day && fromData.month && fromData.year);

      case 2:
        return !(
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromData.email) &&
          fromData.code.toString().length >= 6 &&
          trueCode
        );
      case 3:
        return !(
          fromData.retry_password === fromData.password &&
          fromData.password.length >= 5
        );

      default:
        return true;
    }
  }

  const {
    mutate: sendVerefy,
    isSuccess: trueCode,
    isIdle,
  } = useVerefyCode({
    email: fromData.email,
    code: fromData.code,
  });
  const {
    mutate: sendCode,
    isPending: waitCode,
    data: messageCode,
    isError: errorCode,
  } = useSendCode({
    email: fromData.email,
  });

  const {
    mutate: sendDataRegistration,
    data: dataRegistration,
    isPending: waitRegistration,
  } = useRegistration(fromData);
  const {
    mutate: sendDataLogin,
    data: loginData,
    isPending: waisLogin,
  } = useLogin(fromData);

  const {
    mutate: startGoogleAuth,
    isPending: waitGoogleAuth,
    isSuccess: successGoogleAuth,
    data: googleAuthData,
  } = useLoginGoogle();
  useEffect(() => {
    if (googleAuthData) {
      if (googleAuthData.success) {
        localStorage.setItem("access", googleAuthData.access || "");
        localStorage.setItem("name", googleAuthData.name || "");
        localStorage.setItem("surname", googleAuthData.surname || "");
        localStorage.setItem("refresh", googleAuthData.refresh || "");
        authStore.setAuth(true);
        hide();
      }
      console.log("Google auth data:", googleAuthData);
    }
  }, [googleAuthData]);
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
                    clearInputs();
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
                  {step === 0 && (
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
                          InputValue({
                            value: e.target.value,
                            field: "surname",
                          })
                        }
                        placeholder="Фамилия"
                      />
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <p className="text-ver">Дата рождения</p>
                      <div className="flex">
                        <div>
                          <span className="text-birth">День</span>
                          <input
                            type="number"
                            className="input"
                            onChange={(e) =>
                              InputValue({
                                value: e.target.value,
                                field: "day",
                              })
                            }
                            placeholder="09"
                          />
                        </div>
                        <div>
                          <span className="text-birth">Месяц</span>
                          <input
                            type="number"
                            className="input"
                            placeholder="07"
                            onChange={(e) =>
                              InputValue({
                                value: e.target.value,
                                field: "month",
                              })
                            }
                          />
                        </div>
                        <div>
                          <span className="text-birth">Год</span>
                          <input
                            type="number"
                            onChange={(e) =>
                              InputValue({
                                value: e.target.value,
                                field: "year",
                              })
                            }
                            className="input"
                            placeholder="2005"
                          />
                        </div>
                      </div>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <p className="text-ver">
                        {messageCode?.data?.message ??
                          (errorCode ? "Код уже отправлен" : "Введите почту")}
                      </p>

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
                          placeholder="love@webhunt.ru"
                        />
                        {!waitCode &&
                          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromData.email) && (
                            <span
                              className="sendCode"
                              onClick={() => sendCode()}
                            >
                              Отправить код
                            </span>
                          )}
                      </div>
                      {/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromData.email) && (
                        <div className="flex input code">
                          <input
                            type="number"
                            disabled={trueCode}
                            value={fromData.code}
                            onInput={(e) =>
                              InputValue({
                                value: e.currentTarget.value,
                                field: "code",
                              })
                            }
                            className="inputCode"
                            placeholder="Код"
                          />
                          {fromData.code

                            .toString()
                            .split("")
                            .slice(0, 6)
                            .map((item, index) => (
                              <div
                                className="input"
                                style={{
                                  border:
                                    isIdle && trueCode
                                      ? "1px solid green"
                                      : isIdle && errorCode
                                      ? "1px solid red"
                                      : "none",
                                }}
                                key={index}
                              >
                                {item || ""}
                              </div>
                            ))}
                        </div>
                      )}
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <p className="text-ver">
                        {dataRegistration?.error
                          ? dataRegistration.error
                          : "Введите пароль"}
                      </p>
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
                  )}
                </>
              ) : (
                <>
                  <p className="text-ver">
                    {loginData?.error ||
                      googleAuthData?.error ||
                      "Введите почту и пароль"}
                  </p>

                  <input
                    onInput={(e) =>
                      InputValue({
                        value: e.currentTarget.value,
                        field: "email",
                      })
                    }
                    type="email"
                    className="input"
                    placeholder="love@webhunt.ru"
                  />
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
                </>
              )}
            </div>

            <div className="cont">
              {authStage === AuthStage.SIGNIN && (
                <Google
                  startGoogleAuth={startGoogleAuth}
                  waitGoogleAuth={waitGoogleAuth}
                  successGoogleAuth={successGoogleAuth}
                />
              )}

              <button
                disabled={
                  authStage === AuthStage.SIGNUP
                    ? validStepRegistration(step) || waitRegistration
                    : validStepLogin() || waisLogin
                }
                className="submit"
                onClick={
                  AuthStage.SIGNUP === authStage
                    ? handelClichButtonRegistration
                    : handelClichButtonLogin
                }
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

export default observer(AuthPanel);
