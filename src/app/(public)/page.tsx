import { HomeScreen } from "../../screen/HomeScreen";
import { GetAllVideosDto } from "../../shared/types/typesFromBackend";
import { VIDEO_CATEGORIES } from "@/src/shared/constants/categories";

export default async function HomePage() {
  let data: GetAllVideosDto["data"] | null = null;
  let categories: GetAllVideosDto["categories"] | null = null;

  try {
    const getData = await fetch(`${process.env.SERVER_API_URL}/api/videos`);
    const response = (await getData.json()) as GetAllVideosDto;

    data = response.data;
    categories = response.categories;
  } catch {
    return <div>Something went wrong</div>;
  }

  const finalCategories = VIDEO_CATEGORIES.filter(({ id }) =>
    categories?.includes(id),
  );

  return <HomeScreen data={data} categories={finalCategories} />;
}
