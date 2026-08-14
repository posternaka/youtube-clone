"use client";

import Link from "next/link";
import { GetAllVideosDto } from "@/src/shared/types/typesFromBackend";
import {
  VIDEO_CATEGORIES,
  DEFAULT_CATEGORY,
} from "@/src/shared/constants/categories";

import s from "./HomeScreen.module.css";
import { VideosList } from "@/src/widgets/VideosList";

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
      <VideosList data={data} />
    </div>
  );
};
