import { cookies } from "next/headers";

export const withUserInfo = <T extends object>(Component: React.FC<T>) => {
  return async (props: T) => {
    const cookiesStore = await cookies();
    const authToken = cookiesStore.get("x-auth-token");

    try {
      const rawData = await fetch(`${process.env.SERVER_API_URL}/api/users`, {
        method: "GET",
        headers: {
          cookie: `x-auth-token=${authToken?.value}`,
        },
      });

      const dataFromBack = await rawData.json();

      return <Component user={dataFromBack.user} {...props} />;
    } catch (error) {
      return <Component {...props} />;
    }
  };
};
