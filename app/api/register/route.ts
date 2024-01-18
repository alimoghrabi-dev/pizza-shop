import { connectToDatabase } from "@/database/connection";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Account from "@/models/user.model";

export async function POST(request: Request) {
  connectToDatabase();

  try {
    const { name, email, password } = await request.json();

    const user = await Account.findOne({ email });

    if (user) {
      if (user.email === email) {
        return new NextResponse("User already exists", { status: 400 });
      }
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await Account.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      cart: [],
    });

    return new NextResponse("User created successfully", { status: 201 });
  } catch (error) {
    console.log("REGISTER", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
