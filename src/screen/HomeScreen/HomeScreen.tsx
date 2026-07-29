"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import s from "./HomeScreen.module.css";

export const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const getData = await fetch("/api/videos");
        const response = await getData.json();

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
        data.map((videoId) => (
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
              <Link href={`/2`} className={s.channelImg}>
                <div className={s.hiddenText}>Chaтnel name</div>
              </Link>

              <div className={s.videoInfo}>
                <Link href={`/video/${videoId}`} className={s.videoNameLink}>
                  <b>Video name</b>
                </Link>
                <Link href={`/4`} className={s.videoChannelLink}>
                  Channel name
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
