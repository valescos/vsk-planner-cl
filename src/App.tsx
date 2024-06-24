import { useState } from "react";
import { useCookies } from "react-cookie";
import useServer from "./hooks/useServer";

import { AuthMode } from "./types";

import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import Modal from "./components/Modal";
import SigninSignupForm from "./components/SigninSignupForm";

function App() {
  const [cookies, _, __] = useCookies();
  const [authMode, setAuthMode] = useState<AuthMode>("signup");
  const authToken = cookies.AuthToken;

  const { todos } = useServer();

  if (!authToken)
    return (
      <div className="flex flex-col items-center">
        <div className="wrapper mt-12 flex flex-col gap-4 rounded-lg border-2 border-gray-400 bg-white p-4 shadow-md">
          <div className="flex justify-between px-4">
            <button
              title="Зарегистрироваться"
              type="button"
              onClick={() => {
                setAuthMode("signup");
              }}
            >
              <h2
                className={
                  authMode === "signup"
                    ? "text-lg transition-all sm:text-2xl"
                    : "tr text-lg text-gray-300 transition-all hover:underline sm:text-2xl"
                }
              >
                Регистрация
              </h2>
            </button>
            <button
              title="Войти"
              type="button"
              onClick={() => {
                setAuthMode("signin");
              }}
            >
              <h2
                className={
                  authMode === "signin"
                    ? "text-lg transition-all sm:text-2xl"
                    : "text-lg text-gray-300 transition-all hover:underline sm:text-2xl"
                }
              >
                Авторизация
              </h2>
            </button>
          </div>
          <div className="wrapper self-center">
            <SigninSignupForm authMode={authMode} />
          </div>
        </div>
      </div>
    );

  if (authToken)
    return (
      <div className="flex flex-col items-center">
        <Modal />
        <div className="wrapper mt-12 flex flex-col gap-6 rounded-lg border-2 border-gray-400 bg-white p-2 shadow-md">
          <ListHeader />
          {todos &&
            todos
              .sort(
                (a, b) =>
                  new Date(a.date).getTime() - new Date(b.date).getTime(),
              )
              .map((item) => <ListItem key={item.id} {...item} />)}
        </div>
      </div>
    );
}

export default App;
