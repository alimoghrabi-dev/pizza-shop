import { authOptions } from "@/authoptions";
import Product from "@/models/product.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { menuItemId: string } }
) {
  try {
    const { menuItemId } = params;
    const value = await request.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedMenuItem = await Product.findByIdAndUpdate(menuItemId, {
      ...value,
    });

    return NextResponse.json(updatedMenuItem);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
