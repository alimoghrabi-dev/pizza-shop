import Category from "@/models/category.model";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { title, editedTitle } = await request.json();

    const category = await Category.findOneAndUpdate(
      { title },
      { title: editedTitle }
    );

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
