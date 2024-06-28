import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function SigninForm() {
  const { handleAuthorization } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleInput(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    handleAuthorization({ endpoint: "signin", email, password });
  }

  return (
    <div className="flex flex-col gap-2">
      <form className="flex flex-col gap-2">
        <div className="flex flex-col">
          <label htmlFor="email_signin" className="self-center">
            Е-mail:
          </label>
          <input
            required
            autoComplete="email"
            id="email_signin"
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
      <button
        onClick={(e) => handleInput(e)}
        className="mt-2 rounded-md border-2 border-gray-500 p-2 text-gray-500 transition-all hover:bg-gray-500 hover:text-white"
      >
        Войти
      </button>
    </div>
  );
}
