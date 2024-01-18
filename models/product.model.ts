import mongoose, { Schema } from "mongoose";

export interface IProduct {
  _id: string;
  title: string;
  description: string;
  productImage: string;
  price: number;
  category: Schema.Types.ObjectId;
  isPublished: boolean;
}

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  productImage: {
    type: String,
  },
  price: {
    type: Number,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Product =
  mongoose.models?.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
