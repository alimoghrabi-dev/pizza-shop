"use server";

import { connectToDatabase } from "@/database/connection";
import Account from "@/models/user.model";

export async function getAllUsers() {
  try {
    connectToDatabase();

    const users = await Account.find({});

    return users;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserByEmail(email: string) {
  try {
    connectToDatabase();

    const user = await Account.findOne({ email });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(id: string | undefined) {
  try {
    connectToDatabase();

    const user = await Account.findById(id);

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
  }
}
