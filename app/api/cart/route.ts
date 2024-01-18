import { authOptions } from "@/authoptions";
import { getUserByEmail } from "@/lib/actions/user.actions";
import Account from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { productId } = await request.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await getUserByEmail(session?.user?.email!);

    await Account.findByIdAndUpdate(user._id, {
      $pull: {
        cart: productId,
      },
    });

    return NextResponse.json({ message: "Product Removed From cart" });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { productId } = await request.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await getUserByEmail(session?.user?.email!);

    const dbUser = await Account.findById(user._id);

    if (!dbUser.cart) {
      await Account.findByIdAndUpdate(user._id, {
        $set: {
          cart: [productId],
        },
      });
    } else {
      await Account.findByIdAndUpdate(user._id, {
        $push: {
          cart: productId,
        },
      });
    }

    return NextResponse.json({ message: "Product added to cart" });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
