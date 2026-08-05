import type { Metadata } from "next";
import { AddVideoScreen } from "@/src/screen/AddVideoScreen/ui/AddVideoScreen";

export const metadata: Metadata = {
  title: "Add new video",
};

export default function AddVideoPage() {
  return <AddVideoScreen />;
}
