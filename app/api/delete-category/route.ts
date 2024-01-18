import Category from "@/models/category.model";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const { title } = await request.json();

    const category = await Category.findOneAndDelete({ title });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
