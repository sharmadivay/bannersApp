import connectMongoDB from "@/lib/dbConnnect";
import Topic from "@/models/topic";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  try {
    await connectMongoDB();
    const banners = await Topic.find();
    return NextResponse.json({ banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json({ banners: [] });
  }
}

export async function POST(request: NextRequest) {
  const { title, description, cta, image, background } = await request.json();
  await connectMongoDB();
  await Topic.create({ title, description, cta, image, background });
  return NextResponse.json({ message: "Topic created" });
}
