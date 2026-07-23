"use client";

import { useState } from "react";

import { parseYouTube } from "@/src/shared/libs";

import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  videoUrl: string;
};

// https://www.youtube.com/watch?v=oHAmjGo7h58

export const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    const url = data.videoUrl;

    if (!url) return;

    let finalUrl: URL | null = null;

    try {
      finalUrl = new URL(url);
    } catch (error) {
      console.error(error);
    }

    if (!finalUrl) return;

    const videoId = parseYouTube(finalUrl);

    if (!videoId) return;

    setVideoId(videoId);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Link on Youtube video"
          {...register("videoUrl")}
        />
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
