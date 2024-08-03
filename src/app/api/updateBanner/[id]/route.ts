import connectMongoDB from "@/lib/dbConnnect";
import Topic from "@/models/topic";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  id: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params }
) {
  const { id } = params;
  const { title, description, cta, image, background } = await request.json();
  await connectMongoDB();
  await Topic.findByIdAndUpdate(id, {
    title,
    description,
    cta,
    image,
    background,
  });
  return NextResponse.json({ message: "Topic updated" });
}
