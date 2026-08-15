"use client";

import Link from "next/link";
import { GetAllVideosDto } from "@/src/shared/types/typesFromBackend";
import {
  VIDEO_CATEGORIES,
  DEFAULT_CATEGORY,
} from "@/src/shared/constants/categories";

import cn from "classnames";
import s from "./HomeScreen.module.css";
import { VideosList } from "@/src/widgets/VideosList";

type HomeScreenProps = {
  data: GetAllVideosDto["data"];
  categoryId: string;
  categories: typeof VIDEO_CATEGORIES;
};

export const HomeScreen = ({
  data,
  categoryId,
  categories,
}: HomeScreenProps) => {
  return (
    <div className={s.container}>
      <div className={s.categoriesContainer}>
        {
          <Link
            key={DEFAULT_CATEGORY.id}
            href={`/`}
            className={cn(s.categoriesLink, {
              [s.activeCategoryLink]: !categoryId,
            })}
          >
            {DEFAULT_CATEGORY.title}
          </Link>
        }
        {categories.length > 0 &&
          categories.map((category) => (
            <Link
              key={category.id}
              href={`/${category.id}`}
              className={cn(s.categoriesLink, {
                [s.activeCategoryLink]: category.id === categoryId,
              })}
            >
              {category.title}
            </Link>
          ))}
      </div>
      <VideosList data={data} />
    </div>
  );
};
