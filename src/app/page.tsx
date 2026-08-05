import { HomeScreen } from "../screen/HomeScreen";
import { GetAllVideosDto } from "../shared/types/typesFromBackend";

export default async function HomePage() {
  let data: GetAllVideosDto["data"] | null = null;

  try {
    const getData = await fetch(`${process.env.SERVER_API_URL}/api/videos`);
    const response = (await getData.json()) as GetAllVideosDto;
    data = response.data;
  } catch {
    return <div>Something went wrong</div>;
  }

  return <HomeScreen data={data} />;
}
