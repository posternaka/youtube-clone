import { RegisterScreen } from "@/src/screen/RegisterScreen";

export default async function RegisterPage() {
  try {
    console.log("login page");
  } catch {
    return <div>Something went wrong</div>;
  }

  return <RegisterScreen />;
}
