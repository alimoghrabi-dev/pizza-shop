import { authOptions } from "@/authoptions";
import Product from "@/models/product.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { menuItemId } = await request.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const menuItem = await Product.findById(menuItemId);

    if (!menuItem) {
      return new NextResponse("Menu item not found", { status: 404 });
    }

    const published = menuItem.isPublished;

    const updatedMenuItem = await Product.findByIdAndUpdate(menuItemId, {
      isPublished: !published,
    });

    return NextResponse.json(updatedMenuItem);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
