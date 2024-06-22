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
    <form className="flex flex-col gap-4">
      <div className="flex flex-col">
        <label htmlFor="email" className="self-center">
          Е-mail:
        </label>
        <input
          required
          id="email"
          className="boder-gray-500 rounded-md border-2 px-4 py-2"
          type="email"
          placeholder="введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="pass" className="self-center">
          Пароль:
        </label>
        <input
          required
          className="boder-gray-500 rounded-md border-2 px-4 py-2"
          type="password"
          placeholder="введите пароль"
          id="pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {authMode === "signup" && (
        <div className="flex flex-col">
          <label htmlFor="pass2" className="self-center">
            Повторите пароль:
          </label>
          <input
            required
            className="boder-gray-500 rounded-md border-2 px-4 py-2"
            type="password"
            placeholder="подтвердите пароль"
            id="pass2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      )}
      <button
        onClick={(e) => handleInput(e)}
        className="mt-2 rounded-md border-2 border-gray-500 p-2 text-gray-500 transition-all hover:bg-gray-500 hover:text-white"
      >
        {authMode === "signin" ? "Войти" : "Зарегистрироваться"}
      </button>
      {error && <p className="text-center font-bold text-rose-500">{error}</p>}
    </form>
  );
}
