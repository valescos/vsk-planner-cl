import { PulseLoader } from "react-spinners";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import type { TSignInSchema } from "../types";
import { singInSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SigninForm() {
  const { authorizationMutation } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignInSchema>({
    resolver: zodResolver(singInSchema),
  });

  const onSubmit = (data: TSignInSchema) => {
    authorizationMutation.mutate({
      endpoint: "signin",
      email: data.email,
      password: data.password,
    });
    reset();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="signin_email" className="self-center">
        E-mail
      </label>
      <input
        {...register("email")}
        id="signin_email"
        type="email"
        autoComplete="email"
        className="boder-gray-500 rounded-md border-2 px-4 py-2"
      />
      {errors.email && (
        <p className="self-center font-thin text-rose-500">{`${errors.email.message}`}</p>
      )}
      <label htmlFor="singin_password" className="self-center">
        Пароль
      </label>
      <input
        {...register("password")}
        id="singin_password"
        type="password"
        autoComplete="new-password"
        className="boder-gray-500 rounded-md border-2 px-4 py-2"
      />
      {errors.password && (
        <p className="self-center font-thin text-rose-500">{`${errors.password.message}`}</p>
      )}
      <button
        disabled={isSubmitting}
        className="mt-2 rounded-md border-2 border-gray-500 p-2 text-gray-500 transition-all hover:bg-gray-500 hover:text-white disabled:cursor-not-allowed"
      >
        {isSubmitting ? <PulseLoader color="#9ca3af" size={10} /> : "Войти"}
      </button>
    </form>
  );
}
