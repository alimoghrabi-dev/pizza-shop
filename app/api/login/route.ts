import { connectToDatabase } from "@/database/connection";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  connectToDatabase();

  try {
    const { email, password } = await request.json();

    return new NextResponse("Logged in successfully", { status: 200 });
  } catch (error) {
    console.log("REGISTER", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
