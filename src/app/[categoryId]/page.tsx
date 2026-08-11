import { HomeScreen } from "@/src/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/src/shared/constants/categories";
import { GetAllVideosDto } from "@/src/shared/types/typesFromBackend";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category is ...",
};

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  let data: GetAllVideosDto["data"] | null = null;
  let categories: GetAllVideosDto["categories"] | null = null;

  try {
    const { categoryId } = await params;
    const getData = await fetch(
      `${process.env.SERVER_API_URL}/api/videos?categoryId=${categoryId}`,
    );

    const response = (await getData.json()) as GetAllVideosDto;

    data = response.data;
    categories = response.categories;
  } catch (error) {
    console.error("Failed to load video:", error);
  }

  if (!data) {
    return <div>Video not found</div>;
  }

  const finalCategories = VIDEO_CATEGORIES.filter(({ id }) =>
    categories?.includes(id),
  );

  return <HomeScreen data={data} categories={finalCategories} />;
}
