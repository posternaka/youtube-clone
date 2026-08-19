import { withUserInfo } from "@/src/shared/hoc/withUserInfo";
import { BaseLayout } from "../../widgets/BaseLayout";
import { AuthUserDto } from "@/src/shared/types/typesFromBackend";

function PrivateLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user?: AuthUserDto;
}) {
  return <BaseLayout userId={user?.id}>{children}</BaseLayout>;
}

export default withUserInfo(PrivateLayout);
