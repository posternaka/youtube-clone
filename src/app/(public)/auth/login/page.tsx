import { LoginScreen } from "@/src/screen/LoginScreen";

export default async function LoginPage() {
  try {
    console.log("login page");
  } catch {
    return <div>Something went wrong</div>;
  }

  return <LoginScreen />;
}
