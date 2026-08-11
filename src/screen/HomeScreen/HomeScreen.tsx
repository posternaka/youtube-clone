"use client";

import Image from "next/image";
import Link from "next/link";
import { GetAllVideosDto } from "@/src/shared/types/typesFromBackend";
import {
  VIDEO_CATEGORIES,
  DEFAULT_CATEGORY,
} from "@/src/shared/constants/categories";

import s from "./HomeScreen.module.css";

type HomeScreenProps = {
  data: GetAllVideosDto["data"];
  categories: typeof VIDEO_CATEGORIES;
};

export const HomeScreen = ({ data, categories }: HomeScreenProps) => {
  return (
    <div className={s.container}>
      <div className={s.categoriesContainer}>
        {
          <Link
            key={DEFAULT_CATEGORY.id}
            href={`/`}
            className={s.categoriesLink}
          >
            {DEFAULT_CATEGORY.title}
          </Link>
        }
        {categories.length > 0 &&
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className={s.categoriesLink}
            >
              {category.title}
            </Link>
          ))}
      </div>

      <div className={s.videoGrid}>
        {data?.length > 0 ? (
          data.map(({ videoId, title, authorName, authorUrl }) => (
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
          ))
        ) : (
          <div>Not videos</div>
        )}
      </div>
    </div>
  );
};
