"use client";

import { useState } from "react";

import { parseYouTube } from "@/src/shared/libs";

// https://www.youtube.com/watch?v=oHAmjGo7h58

export const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          const anyE = e as any;
          const url = anyE.target.elements[0].value;

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
        }}
      >
        <input type="text" placeholder="Link on Youtube video" />
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
