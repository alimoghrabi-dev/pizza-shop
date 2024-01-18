import { authOptions } from "@/authoptions";
import { getUserById } from "@/lib/actions/user.actions";
import Account from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    const { id, isAdmin } = await request.json();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userInfo = await getUserById(id);

    const user = await Account.findByIdAndUpdate(userInfo._id, {
      isAdmin,
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
