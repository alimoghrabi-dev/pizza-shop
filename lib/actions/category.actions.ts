"use server";

import { connectToDatabase } from "@/database/connection";
import Category from "@/models/category.model";
import { Schema } from "mongoose";

export async function getCategoryById(id: Schema.Types.ObjectId) {
  try {
    connectToDatabase();

    const category = await Category.findById(id);

    return category;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

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
