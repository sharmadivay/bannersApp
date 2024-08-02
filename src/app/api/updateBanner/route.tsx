// src/app/api/updateBanner/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Banner {
  id: number;
  title: string;
  description: string;
  cta: string;
  image: string;
  background: string;
}

const getJsonFilePath = () => {
  return path.join(process.cwd(), "src", "data", "bannerData.json");
};

export async function POST(request: Request) {
  try {
    console.log("Request received");

    const { banner }: { banner: Banner } = await request.json();
    console.log("Banner received:", banner);

    const filePath = getJsonFilePath();
    console.log("File path:", filePath);

    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    console.log("JSON Data:", jsonData);

    const index = jsonData.banner.findIndex((b: Banner) => b.id === banner.id);
    console.log("Banner index:", index);

    if (index !== -1) {
      jsonData.banner[index] = banner;
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      return NextResponse.json({ message: "Banner updated successfully" });
    } else {
      return NextResponse.json(
        { message: "Banner not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
