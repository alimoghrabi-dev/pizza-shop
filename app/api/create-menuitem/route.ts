import { authOptions } from "@/authoptions";
import { connectToDatabase } from "@/database/connection";
import Product from "@/models/product.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { value } = await request.json();

    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    const menuItem = await Product.create({
      title: value,
    });

    return NextResponse.json(menuItem);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
