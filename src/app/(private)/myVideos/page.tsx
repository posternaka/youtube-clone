import { MyVideosScreen } from "@/src/screen/MyVideosScreen/MyVideosScreen";
import { GetAllVideosDto } from "@/src/shared/types/typesFromBackend";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My videos",
};

export default async function MyVideosPage() {
  const userId = "123";

  let data: GetAllVideosDto["data"] | null = null;

  try {
    const getData = await fetch(
      `${process.env.SERVER_API_URL}/api/videos?userId=${userId}`,
    );

    const response = (await getData.json()) as GetAllVideosDto;

    data = response.data;
  } catch (error) {
    console.error("Failed to load video:", error);
  }

  if (!data) {
    return <div>Video not found</div>;
  }

  return <MyVideosScreen data={data} />;
}
