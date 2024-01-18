import mongoose, { Schema } from "mongoose";

export interface ICategory extends mongoose.Document {
  title: string;
}

const CategorySchema = new Schema<ICategory>({
  title: {
    type: String,
    unique: true,
  },
});

const Category =
  mongoose.models?.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);

export default Category;
