"use client";

import s from "./VideoScreen.module.css";
import Link from "next/link";

type VedioScreenProps = {
  videoId: string;
};

export const VideoScreen = ({ videoId }: VedioScreenProps) => {
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

      <b className={s.videoTitle}>Video name</b>

      <div className={s.videoInfoContainer}>
        <Link href={`/2`} className={s.channelImg}>
          <div className={s.hiddenText}>Chaтnel name</div>
        </Link>

        <Link href={`/4`} className={s.videoChannelLink}>
          Channel name
        </Link>
      </div>
    </div>
  );
};
