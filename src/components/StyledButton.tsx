import { ReactNode } from "react";

type StyledButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  title?: string;
  type: "submit" | "reset" | "button" | undefined;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function StyledButton({
  children,
  type,
  title,
  disabled,
  onClick,
}: StyledButtonProps) {
  return (
    <button
      disabled={disabled}
      title={title}
      onClick={onClick}
      type={type}
      className="rounded-md border-2 border-gray-400 px-4 py-2 text-gray-400 transition-all hover:bg-gray-400 hover:text-white disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
