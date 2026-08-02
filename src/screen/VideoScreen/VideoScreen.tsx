"use client";

import { useEffect, useState } from "react";
import s from "./VideoScreen.module.css";
import Link from "next/link";
import { GetOneVideoDto, VideoDto } from "@/src/shared/types/typesFromBackend";

type VedioScreenProps = {
  videoId: string;
};

export const VideoScreen = ({ videoId }: VedioScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<GetOneVideoDto["data"] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const getData = await fetch(`/api/videos?videoId=${videoId}`);
        const response = (await getData.json()) as GetOneVideoDto;

        console.log(response);

        if (response.data) {
          setData(response.data);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [videoId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) return null;

  return (
    <div className={s.container}>
      <iframe
        className={s.iframe}
        key={videoId}
        width="550"
        height="300"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />

      <b className={s.videoTitle}>{data.title}</b>

      <div className={s.videoInfoContainer}>
        <Link href={`/profile/${data.authorUrl}`} className={s.channelImg}>
          <div className={s.hiddenText}>{data.authorName}</div>
        </Link>

        <Link
          href={`/profile/${data.authorUrl}`}
          className={s.videoChannelLink}
        >
          {data.authorName}
        </Link>
      </div>
    </div>
  );
};
