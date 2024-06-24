import { useState } from "react";
import { AuthMode } from "../types";
import useAuth from "../hooks/useAuth";

type SigninSignupFormProps = {
  authMode: AuthMode;
};

export default function SigninSignupForm({ authMode }: SigninSignupFormProps) {
  const { handleAuthorization } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  function handleInput(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    if (authMode === "signup" && password !== confirmPassword) {
      setError("Ошибка подтверждения пароля");
      return;
    }
    handleAuthorization({ endpoint: authMode, email, password });
  }

  return (
    <div className="flex flex-col gap-2">
      <form className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="email" className="self-center">
            Е-mail:
          </label>
          <input
            required
            autoComplete="email"
            id="email"
            className="boder-gray-500 rounded-md border-2 px-4 py-2"
            type="email"
            placeholder="введите email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="self-center">
            Пароль:
          </label>
          <input hidden type="text" autoComplete="username " />
          <input
            required
            autoComplete="new-password"
            className="boder-gray-500 rounded-md border-2 px-4 py-2"
            type="password"
            placeholder="введите пароль"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      {authMode === "signup" && (
        <form>
          <div className="flex flex-col">
            <label htmlFor="confirm_password" className="self-center">
              Повторите пароль:
            </label>
            <input hidden type="text" autoComplete="username " />
            <input
              required
              autoComplete="new-password"
              className="boder-gray-500 rounded-md border-2 px-4 py-2"
              type="password"
              placeholder="подтвердите пароль"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </form>
      )}
      <button
        onClick={(e) => handleInput(e)}
        className="mt-2 rounded-md border-2 border-gray-500 p-2 text-gray-500 transition-all hover:bg-gray-500 hover:text-white"
      >
        {authMode === "signin" ? "Войти" : "Зарегистрироваться"}
      </button>
      {error && <p className="text-center font-bold text-rose-500">{error}</p>}
    </div>
  );
}
