import { useModalContext } from "../contexts/ModalContext";
import { useCookies } from "react-cookie";

import { BadgePlus } from "lucide-react";

import { cn } from "../utilities";

import StyledButton from "./StyledButton";
import useServer from "../hooks/useServer";

export default function ListHeader() {
  const [cookies, __, removeCookie] = useCookies();
  const { setModalStatus } = useModalContext();
  const { isListEmpty } = useServer();

  function handleSignOut() {
    removeCookie("Email");
    removeCookie("AuthToken");
  }

  return (
    <div
      className={cn(
        "flex justify-between p-4 pb-4",
        !isListEmpty && "border-b-2 border-dotted border-gray-400",
      )}
    >
      <div className="flex items-center gap-4">
        <StyledButton
          title="Добавить"
          type="button"
          onClick={() => {
            setModalStatus("create");
          }}
        >
          <BadgePlus />
        </StyledButton>
        <h1 className="text-3xl font-black">{cookies.Email}</h1>
      </div>
      <button onClick={() => handleSignOut()}>
        <h2 className="text-2xl text-gray-500 transition-all">Выйти</h2>
      </button>
    </div>
  );
}
