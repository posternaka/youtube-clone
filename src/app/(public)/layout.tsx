import { BaseLayout } from "../../widgets/BaseLayout";

export default function PublickLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BaseLayout>{children}</BaseLayout>;
}
