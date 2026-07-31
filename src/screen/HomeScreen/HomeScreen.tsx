"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AllVideoDto } from "@/src/shared/types/typesFromBackend";

import s from "./HomeScreen.module.css";

// https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=FvOpPeKSf_4&format=json

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AllVideoDto["data"] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const getData = await fetch("/api/videos");
        const response = (await getData.json()) as AllVideoDto;

        setData(response.data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={s.container}>
      {data && data?.length > 0 ? (
        data.map(({ videoId, title, authorName, authorlUrl }) => (
          <div className={s.videoBlock} key={videoId}>
            <Link href={`/video/${videoId}`} className={s.videoPreviewLink}>
              <Image
                fill
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={`video ${videoId}`}
                className={s.videoImg}
              />
            </Link>

            <div className={s.videoInfoContainer}>
              <Link href={`/profile/${authorlUrl}`} className={s.channelImg}>
                <div className={s.hiddenText}>{authorName}</div>
              </Link>

              <div className={s.videoInfo}>
                <Link href={`/video/${videoId}`} className={s.videoNameLink}>
                  <b>{title}</b>
                </Link>
                <Link
                  href={`/profile/${authorlUrl}`}
                  className={s.videoChannelLink}
                >
                  {authorName}
                </Link>
              </div>
            </div>
            <Link href={`/video/${videoId}`} className={s.link} />
          </div>
        ))
      ) : (
        <div>Not videos</div>
      )}
    </div>
  );
};
