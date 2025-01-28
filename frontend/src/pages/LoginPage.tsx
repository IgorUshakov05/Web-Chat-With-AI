import React, { useCallback, useReducer, useMemo } from "react";
import { Link } from "react-router-dom";
import InputForm from "../components/FormInput";
import { ActionType, InputData, InputType } from "../types/InputForm";
const LoginPage = () => {
  function reducer(state: InputData, action: ActionType) {
    console.log(state);
    switch (action.type) {
      case InputType.LOGIN:
        return { ...state, login: action.payload };
      case InputType.PASSWORD:
        return { ...state, password: action.payload };
      default:
        return { ...state };
    }
  }
  let [dataForm, dispatch] = useReducer(reducer, { mail: "", password: "" });
  const handleLoginChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ payload: e.target.value, type: InputType.LOGIN });
    },
    []
  );
  console.log("render");
  const loginProps = useMemo(
    () => ({
      current_value: dataForm.mail,
      handler_input: handleLoginChange,
      text: "Логин",
    }),
    [dataForm.mail, handleLoginChange]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ payload: e.target.value, type: InputType.PASSWORD });
    },
    []
  );
  const passwordProps = useMemo(
    () => ({
      current_value: dataForm.password,
      handler_input: handlePasswordChange,
      text: "Пароль",
    }),
    [dataForm.password, handlePasswordChange]
  );
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="/WebHunt.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Вход
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          <InputForm {...loginProps} />
          <InputForm {...passwordProps} />
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Войти
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Нет аккаунта?{" "}
          <Link
            to="/join"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Создать аккаунт
          </Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;
