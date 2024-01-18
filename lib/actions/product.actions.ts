"use server";

import { connectToDatabase } from "@/database/connection";
import Product from "@/models/product.model";
import Account from "@/models/user.model";

export async function getAllMenuItems() {
  try {
    connectToDatabase();

    const menuItems = await Product.find({});

    return menuItems;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllPublicMenuItemsAndLimit() {
  try {
    connectToDatabase();

    const menuItems = await Product.find({
      isPublished: true,
    }).limit(5);

    return menuItems;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllPublicMenuItems(categoryId: string) {
  try {
    connectToDatabase();

    if (!categoryId) {
      const menuItems = await Product.find({
        isPublished: true,
      });

      return menuItems;
    }

    const menuItems = await Product.find({
      $and: [{ isPublished: true }, { category: categoryId }],
    });

    return menuItems;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getMenuItemById(id: string) {
  try {
    connectToDatabase();

    const menuItem = await Product.findById(id);

    return menuItem;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getUserCartItems(id: string) {
  try {
    connectToDatabase();

    const user = await Account.findById(id);

    const userCart = await Product.find({
      _id: { $in: user?.cart },
    });

    return userCart;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
