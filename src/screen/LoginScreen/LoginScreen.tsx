"use client";

import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import s from "./LoginScreen.module.css";

const schema = z.object({
  nickname: z.string().min(1, "Min. 1 symbol"),
  password: z.string().min(1, "Min. 1 symbol"),
});

type Inputs = {
  nickname: string;
  password: string;
};

export const LoginScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit((data: Inputs) => {
    console.log("data", data);
  });

  const hasNicknameInputError = !!errors.nickname?.message;
  const hasPasswordInputError = !!errors.password?.message;

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

        <Link href="/auth/register">Create account</Link>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
