import { useForm, Controller } from "react-hook-form";
import { useEffect } from "react";
import { authForm } from "../store";

interface RegistrationInputsProps {
  step: number;
}

interface FormData {
  name: string;
  surname: string;
  birthday: string;
  email: string;
  code: string;
  password: string;
  retry_password: string;
}

const RegistrationInputs = ({ step }: RegistrationInputsProps) => {
  const { control, watch, setValue } = useForm<FormData>({
    defaultValues: authForm.fromData, 
  });

  const watchedFields = watch();

  // синхронизация с MobX
  useEffect(() => {
    for (const key in watchedFields) {
      const value = watchedFields[key as keyof FormData];
      authForm.setField(key as keyof FormData, value);
    }
  }, [watchedFields]);

  const birthday = watchedFields.birthday || "";
  const [day = "", month = "", year = ""] = birthday.split(".");

  const updateBirthday = (part: "day" | "month" | "year", value: string) => {
    const newBirthday = {
      day,
      month,
      year,
      [part]: value,
    };
    const formatted = `${newBirthday.day}.${newBirthday.month}.${newBirthday.year}`;
    setValue("birthday", formatted);
    authForm.setField("birthday", formatted); // сразу обновляем MobX
  };

  return (
    <>
      {step === 0 && (
        <>
          <p className="text-ver">Введите свое имя и фамилию</p>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                className="input"
                placeholder="Имя"
                {...field}
              />
            )}
          />
          <Controller
            name="surname"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                className="input"
                placeholder="Фамилия"
                {...field}
              />
            )}
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
                placeholder="09"
                value={day}
                onInput={(e) => updateBirthday("day", e.currentTarget.value)}
              />
            </div>
            <div>
              <span className="text-birth">Месяц</span>
              <input
                type="number"
                className="input"
                placeholder="07"
                value={month}
                onInput={(e) => updateBirthday("month", e.currentTarget.value)}
              />
            </div>
            <div>
              <span className="text-birth">Год</span>
              <input
                type="number"
                className="input"
                placeholder="2005"
                value={year}
                onInput={(e) => updateBirthday("year", e.currentTarget.value)}
              />
            </div>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-ver">Подтвердите почту</p>
          <div className="containerCode">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input
                  type="email"
                  className="input"
                  placeholder="example@ex.ex"
                  {...field}
                />
              )}
            />
            <span className="sendCode">Отправить код</span>
          </div>
          <div className="flex input code">
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <input type="text" className="inputCode" {...field} />
              )}
            />
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <p className="text-ver">Введите пароль</p>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                className="input"
                placeholder="Пароль"
                {...field}
              />
            )}
          />
          <Controller
            name="retry_password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                className="input"
                placeholder="Повторите пароль"
                {...field}
              />
            )}
          />
        </>
      )}
    </>
  );
};

export default RegistrationInputs;
