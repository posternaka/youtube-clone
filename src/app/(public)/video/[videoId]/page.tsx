import { VideoScreen } from "@/src/screen/VideoScreen";
import { GetOneVideoDto } from "@/src/shared/types/typesFromBackend";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const data = await params;
  const videoId = data.videoId;

  try {
    const getData = await fetch(
      `${process.env.SERVER_API_URL}/api/videos?videoId=${videoId}`,
    );

    const response = (await getData.json()) as GetOneVideoDto;

    if (!response) {
      throw new Error("Not data about video");
    }

    return {
      title: `Video: ${response.data?.title}`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Something went wrong",
    };
  }
}

type VideoPageProps = {
  params: Promise<{ videoId: string }>;
};

export default async function VideoPage({ params }: VideoPageProps) {
  let data = null;

  try {
    const { videoId } = await params;
    const getData = await fetch(
      `${process.env.SERVER_API_URL}/api/videos?videoId=${videoId}`,
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
