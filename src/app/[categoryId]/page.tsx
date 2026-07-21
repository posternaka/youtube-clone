import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category is ...",
};

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const data = await params;

  const categoryId = data.categoryId;

  return <div>CategoryId: {categoryId}</div>;
}
