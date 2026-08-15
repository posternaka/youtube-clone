import Link from "next/link";

export default async function RegisterPage() {
  try {
    console.log("login page");
  } catch {
    return <div>Something went wrong</div>;
  }

  return <Link href="/auth/login">Login</Link>;
}
