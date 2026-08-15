import { HomeScreen } from "@/src/screen/HomeScreen";
import { VIDEO_CATEGORIES } from "@/src/shared/constants/categories";
import { GetAllVideosDto } from "@/src/shared/types/typesFromBackend";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const data = await params;
  const categoryId = data.categoryId;

  const foundCategory = VIDEO_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  if (!foundCategory) {
    return {
      title: "Video of unknown category",
    };
  }

  return {
    title: `Category is: ${foundCategory.title}`,
  };
}

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  let data: GetAllVideosDto["data"] | null = null;
  let categories: GetAllVideosDto["categories"] | null = null;

  const { categoryId } = await params;

  const founCategory = VIDEO_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  if (!founCategory) {
    notFound();
  }

  try {
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

  return (
    <HomeScreen
      data={data}
      categoryId={categoryId}
      categories={finalCategories}
    />
  );
}
