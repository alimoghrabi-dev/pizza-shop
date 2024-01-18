import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  image: string;
  isAdmin: boolean;
  cart: Schema.Types.ObjectId[];
  phoneNumber: string;
  country: string;
  city: string;
  postalCode: string;
  address: string;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        default: [],
      },
    ],
    phoneNumber: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const Account =
  mongoose.models?.Account || mongoose.model<IUser>("Account", UserSchema);

export default Account;
