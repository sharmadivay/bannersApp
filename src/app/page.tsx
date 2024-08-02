import Image from "next/image";
import HomePage from "@/components/HomePage";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-wrap w-full min-h-screen bg-black flex-col items-center justify-between p-24 ">
      <div className="w-full ml-2 mr-10">
        <HomePage />
      </div>
    </main>
  );
}
