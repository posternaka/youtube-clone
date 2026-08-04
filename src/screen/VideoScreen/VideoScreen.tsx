"use client";

import s from "./VideoScreen.module.css";
import Link from "next/link";
import { VideoDto } from "@/src/shared/types/typesFromBackend";

type VedioScreenProps = {
  data: VideoDto;
};

export const VideoScreen = ({ data }: VedioScreenProps) => {
  return (
    <div className={s.container}>
      <iframe
        className={s.iframe}
        key={data.videoId}
        width="550"
        height="300"
        src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1`}
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
