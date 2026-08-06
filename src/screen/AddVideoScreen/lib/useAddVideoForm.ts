import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  isAllowedHost,
  YOUTUBE_DOMAINS,
  parseYouTube,
} from "@/src/shared/libs";
import { useState } from "react";

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
          input: url
        });
      }
    }),
  videoCategory: z.string()
});

type Inputs = {
  videoUrl: string;
  videoCategory: string;
};

export const useAddVideoForm = () => {
  const [videoId, setVideoId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ resolver: zodResolver(schema) });
  
  const onSubmitHandler = async (data: Inputs) => {
    const url = new URL(data.videoUrl);

    const videoId = parseYouTube(url);

    if (!videoId) return;

    setVideoId(videoId);

    await fetch("/api/videos", {
      method: "POST",
      body: JSON.stringify({ videoId: videoId, categoryId: data.videoCategory }),
    });
  };

  return {
    register,
    errors,
    videoId,
    onSubmit: handleSubmit(onSubmitHandler)
  }
}