import Category from "@/models/category.model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { category } = await request.json();

    const newCategory = await Category.create({
      title: category,
    });

    return NextResponse.json(newCategory);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
