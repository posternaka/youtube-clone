"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import s from "./RegisterScreen.module.css";
import { useRouter } from "next/navigation";

const schema = z.object({
  nickname: z.string().min(1, "Min. 1 symbol"),
  password: z.string().min(1, "Min. 1 symbol"),
  passwordRepeat: z.string().min(1, "Min. 1 symbol"),
});

type Inputs = {
  nickname: string;
  password: string;
  passwordRepeat: string;
};

export const RegisterScreen = () => {
  const router = useRouter();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async (data: Inputs) => {
    console.log("data", data);

    if (data.password !== data.passwordRepeat) {
      setError("passwordRepeat", {
        type: "custom",
        message: "The passwords dont's match",
      });
      return;
    }

    const { nickname, password } = data;

    try {
      await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          nickname,
          password,
        }),
      });

      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  });

  const hasNicknameInputError = !!errors.nickname?.message;
  const hasPasswordInputError = !!errors.password?.message;
  const hasPasswordRepeatInputError = !!errors.passwordRepeat?.message;

  return (
    <div className={s.container}>
      <form onSubmit={onSubmit}>
        <label>
          <input {...register("nickname")} type="text" placeholder="Nickname" />
          {hasNicknameInputError && (
            <p className={s.error}> {errors.nickname?.message} </p>
          )}
        </label>

        <label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
          {hasPasswordInputError && (
            <p className={s.error}> {errors.password?.message} </p>
          )}
        </label>

        <label>
          <input
            {...register("passwordRepeat")}
            type="password"
            placeholder="Repeat password"
          />
          {hasPasswordRepeatInputError && (
            <p className={s.error}> {errors.passwordRepeat?.message} </p>
          )}
        </label>

        <Link href="/auth/login">Sign In</Link>
        <button type="submit">Registration</button>
      </form>
    </div>
  );
};
