import { useCookies } from "react-cookie";
import { AuthMode } from "../types";
import { useMutation } from "@tanstack/react-query";

const base_url = import.meta.env.VITE_APP_SERVERURL;

export default function useAuth() {
  const [_, setCookie, __] = useCookies();

  type handleAuthorizationProps = {
    endpoint: AuthMode;
    email: string;
    password: string;
  };

  const authorizationMutation = useMutation({
    mutationFn: handleAuthorization,
  });

  async function handleAuthorization({
    endpoint,
    email,
    password,
  }: handleAuthorizationProps) {
    try {
      const response = await fetch(`${base_url}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.detail) {
        throw new Error(data.detail);
      } else {
        setCookie("Email", data.email);
        setCookie("AuthToken", data.token);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { authorizationMutation };
}
