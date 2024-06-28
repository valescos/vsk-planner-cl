import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import type { TSignUpSchema } from "../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../types";
import { PulseLoader } from "react-spinners";

export default function SignupForm() {
  const { handleAuthorization } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = (data: TSignUpSchema) => {
    handleAuthorization({
      endpoint: "signup",
      email: data.email,
      password: data.password,
    });
    reset();
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="signup_email" className="self-center">
        E-mail
      </label>
      <input
        {...register("email")}
        id="signup_email"
        type="email"
        autoComplete="email"
        className="boder-gray-500 rounded-md border-2 px-4 py-2"
      />
      {errors.email && (
        <p className="self-center font-thin text-rose-500">{`${errors.email.message}`}</p>
      )}
      <label htmlFor="singup_password" className="self-center">
        Пароль
      </label>
      <input
        {...register("password")}
        id="singup_password"
        type="password"
        autoComplete="new-password"
        className="boder-gray-500 rounded-md border-2 px-4 py-2"
      />
      {errors.password && (
        <p className="self-center font-thin text-rose-500">{`${errors.password.message}`}</p>
      )}
      <label htmlFor="singup_confirm_password" className="self-center">
        Подтвердите пароль
      </label>
      <input
        {...register("confirmPassword")}
        id="singup_confirm_password"
        type="password"
        autoComplete="new-password"
        className="boder-gray-500 rounded-md border-2 px-4 py-2"
      />
      {errors.confirmPassword && (
        <p className="self-center font-thin text-rose-500">{`${errors.confirmPassword.message}`}</p>
      )}
      <button
        disabled={isSubmitting}
        className="mt-2 rounded-md border-2 border-gray-500 p-2 text-gray-500 transition-all hover:bg-gray-500 hover:text-white disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <PulseLoader color="#9ca3af" size={10} />
        ) : (
          "Зарегистрироваться"
        )}
      </button>
    </form>
  );
}
