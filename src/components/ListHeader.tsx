import { useModalContext } from "../contexts/ModalContext";
import { useCookies } from "react-cookie";

import { BadgePlus } from "lucide-react";

import StyledButton from "./StyledButton";
import useServer from "../hooks/useServer";
import { BeatLoader } from "react-spinners";

export default function ListHeader() {
  const [cookies, __, removeCookie] = useCookies();
  const { setModalStatus, modalStatus } = useModalContext();
  const { isFetching } = useServer();

  function handleSignOut() {
    removeCookie("Email");
    removeCookie("AuthToken");
  }

  return (
    <div className="flex flex-col justify-between gap-4 p-2 pb-4 md:flex-row">
      <div className="order-2 flex flex-col items-center md:order-1 md:flex-row md:gap-2">
        <div className="order-2 md:order-1">
          <StyledButton
            title="Добавить"
            type="button"
            onClick={() => {
              setModalStatus("create");
            }}
          >
            <BadgePlus />
          </StyledButton>
        </div>
        <h1 className="order-1 text-3xl font-black">{cookies.Email}</h1>
        <div className="fixed left-[50%] top-4 order-2 -translate-x-[50%] self-end md:relative md:left-[25%] md:top-0">
          {isFetching && modalStatus === "closed" && <BeatLoader />}
        </div>
      </div>
      <button onClick={() => handleSignOut()} className="md:order-2">
        <h2 className="text-2xl text-gray-500 transition-all hover:text-black hover:underline">
          Выйти
        </h2>
      </button>
    </div>
  );
}
