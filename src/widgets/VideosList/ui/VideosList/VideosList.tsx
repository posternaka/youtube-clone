import Link from "next/link";
import Image from "next/image";

import s from "./VideosList.module.css";
import { GetAllVideosDto } from "@/src/shared/types/typesFromBackend";

type VideosListProps = {
  data: GetAllVideosDto["data"];
};

export const VideosList = ({ data }: VideosListProps) => {
  if (data?.length <= 0) {
    return <div className={s.noVideos}>Not videos 😔</div>;
  }

  return (
    <div className={s.videoGrid}>
      {data.map(({ videoId, title, authorName, authorUrl }) => (
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
            <Link href={`/profile/${authorUrl}`} className={s.channelImg}>
              <div className={s.hiddenText}>{authorName}</div>
            </Link>

            <div className={s.videoInfo}>
              <Link href={`/video/${videoId}`} className={s.videoNameLink}>
                <b>{title}</b>
              </Link>
              <Link
                href={`/profile/${authorUrl}`}
                className={s.videoChannelLink}
              >
                {authorName}
              </Link>
            </div>
          </div>
          <Link href={`/video/${videoId}`} className={s.link} />
        </div>
      ))}
    </div>
  );
};
