import { authOptions } from "@/authoptions";
import Account from "@/models/user.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const {
      id,
      name,
      email,
      profilePic,
      phoneNumber,
      address,
      postalCode,
      city,
      country,
    } = await request.json();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await Account.findById(id);

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    await Account.findByIdAndUpdate(user._id, {
      name: name === "" ? user.name : name,
      email: email === "" ? user.email : email,
      image: profilePic === "" ? user.image : profilePic,
      phoneNumber: phoneNumber === "" ? user.phoneNumber : phoneNumber,
      address: address === "" ? user.address : address,
      postalCode: postalCode === "" ? user.postalCode : postalCode,
      city: city === "" ? user.city : city,
      country: country === "" ? user.country : country,
    });

    return new NextResponse("User updated successfully", { status: 200 });
  } catch (error) {
    console.log("EDIT PROFILE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
