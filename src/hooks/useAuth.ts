import { useCookies } from "react-cookie";

import { AuthMode } from "../types";

const base_url = import.meta.env.VITE_APP_SERVERURL;

export default function useAuth() {
  const [_, setCookie, __] = useCookies();

  type handleAuthorizationProps = {
    endpoint: AuthMode;
    email: string;
    password: string;
  };

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
        console.log(data.detail);
      } else {
        setCookie("Email", data.email);
        setCookie("AuthToken", data.token);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return { handleAuthorization };
}
