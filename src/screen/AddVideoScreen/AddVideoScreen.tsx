"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  isAllowedHost,
  YOUTUBE_DOMAINS,
  parseYouTube,
} from "@/src/shared/libs";

const schema = z.object({
  videoUrl: z
    .string()
    .min(1, { message: "The field must not be empty." })
    .superRefine((url, ctx) => {
      let parsedUrl: URL;

      try {
        parsedUrl = new URL(url);
      } catch {
        ctx.addIssue({
          code: "custom",
          message: `The URL must be a link.`,
          input: url,
        });

        return;
      }

      if (!isAllowedHost(parsedUrl.host, YOUTUBE_DOMAINS)) {
        ctx.addIssue({
          code: "custom",
          message: "The URL must be on YouTube",
          input: url,
        });
      }
    }),
});

type Inputs = {
  videoUrl: string;
};

export const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: Inputs) => {
    const url = new URL(data.videoUrl);

    const videoId = parseYouTube(url);

    if (!videoId) return;

    setVideoId(videoId);

    await fetch("/api/videos", {
      method: "POST",
      body: JSON.stringify({ videoId: videoId }),
    });

    const getData = await fetch("/api/videos");

    const response = await getData.json();
    console.log("response", response);
  };

  const hasVideoUrlInputError = !!errors.videoUrl?.message;

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            type="text"
            placeholder="Link on Youtube video"
            {...register("videoUrl")}
          />
          {hasVideoUrlInputError && (
            <p style={{ color: "red" }}> {errors.videoUrl?.message} </p>
          )}
        </label>
        <button>Download</button>
      </form>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};
