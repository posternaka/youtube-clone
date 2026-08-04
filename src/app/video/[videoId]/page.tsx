import { VideoScreen } from "@/src/screen/VideoScreen";
import { GetOneVideoDto } from "@/src/shared/types/typesFromBackend";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Video",
};

type VideoPageProps = {
  params: Promise<{ videoId: string }>;
};

export default async function VideoPage({ params }: VideoPageProps) {
  let data = null;

  try {
    const { videoId } = await params;
    const getData = await fetch(
      `http://localhost:3000/api/videos?videoId=${videoId}`,
    );

    const response = (await getData.json()) as GetOneVideoDto;

    data = response.data;
  } catch (error) {
    console.error("Failed to load video:", error);
  }

  if (!data) {
    return <div>Video not found</div>;
  }

  return <VideoScreen data={data} />;
}
