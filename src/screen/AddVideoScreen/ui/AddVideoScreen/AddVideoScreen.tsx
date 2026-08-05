"use client";

import { useAddVideoForm } from "../../lib/useAddVideoForm";
import s from "./AddVideoScreen.module.css";

export const AddVideoScreen = () => {
  const { videoId, errors, register, onSubmit } = useAddVideoForm();

  const hasVideoUrlInputError = !!errors.videoUrl?.message;

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={onSubmit}>
        <label className={s.label}>
          <input
            className={s.input}
            type="text"
            placeholder="Link on Youtube video"
            {...register("videoUrl")}
          />
          {hasVideoUrlInputError && (
            <p className={s.error}> {errors.videoUrl?.message} </p>
          )}
        </label>
        <button className={s.submit}>Download</button>
      </form>

      {videoId && (
        <iframe
          className={s.iframe}
          width="700"
          height="350"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}
    </div>
  );
};
