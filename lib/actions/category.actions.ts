"use server";

import { connectToDatabase } from "@/database/connection";
import Category from "@/models/category.model";

export async function getAllCategories() {
  try {
    connectToDatabase();

    const categories = await Category.find({});

    return categories;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
