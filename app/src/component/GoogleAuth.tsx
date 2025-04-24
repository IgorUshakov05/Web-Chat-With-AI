import { useGoogleLogin } from "@react-oauth/google";

interface GoogleProps {
  startGoogleAuth: (data: { access_token: string }) => void;
  waitGoogleAuth: boolean;
  successGoogleAuth: boolean;
}

export default function Google({
  startGoogleAuth,
  waitGoogleAuth,
  successGoogleAuth,
}: GoogleProps) {
  const login = useGoogleLogin({
    onError: (e) => {
      console.error("Ошибка логина через Google:", e);
    },
    onSuccess: (codeResponse) => {
      startGoogleAuth({ access_token: codeResponse.access_token });
    },
  });

  return (
    <div className="verh">
      <p className="text-ver">Войти при помощи</p>
      <button
        className="button_hea"
        onClick={() => login()}
        disabled={waitGoogleAuth}
      >
        <img src="/google.svg" alt="Google" />
      </button>
    </div>
  );
}
