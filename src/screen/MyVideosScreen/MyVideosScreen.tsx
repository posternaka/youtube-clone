"use client";

import { GetAllVideosDto } from "@/src/shared/types/typesFromBackend";
import s from "../HomeScreen/HomeScreen.module.css";
import { VideosList } from "@/src/widgets/VideosList";

type MyVideosScreenProps = {
  data: GetAllVideosDto["data"];
};

export const MyVideosScreen = ({ data }: MyVideosScreenProps) => {
  return (
    <div className={s.container}>
      <VideosList data={data} />
    </div>
  );
};
