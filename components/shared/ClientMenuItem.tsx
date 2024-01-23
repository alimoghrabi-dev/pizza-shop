import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";
import RemoveFromCartButton from "../RemoveFromCartButton";
import { getCategoryById } from "@/lib/actions/category.actions";
import { Schema } from "mongoose";

interface ClientMenuItemProps {
  productImage: string;
  menuTitle: string;
  id: string;
  userCart: any;
  menuItemCategory: Schema.Types.ObjectId;
  session: Session | null | undefined;
  price: number;
}

const ClientMenuItem = async ({
  productImage,
  menuTitle,
  id,
  userCart,
  menuItemCategory,
  session,
  price,
}: ClientMenuItemProps) => {
  const category = await getCategoryById(menuItemCategory);

  return (
    <div className="w-[285px] sm:w-[200px] bg-white border border-slate-300 rounded-md p-1.5 pb-2 space-y-1 hover:shadow-lg hover:shadow-gray-900/[0.15] hover:opacity-90 transition">
      <Link href={`/menu/${id}`}>
        <div className="relative aspect-square">
          <Image
            src={productImage}
            alt={menuTitle}
            fill
            className="object-cover object-center"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-y-2 px-1 mt-1">
          <span className="text-gray-900 text-base font-semibold line-clamp-1">
            {menuTitle}
          </span>
          <p className="text-gray-600 text-sm font-medium">{category?.title}</p>
        </div>
      </Link>
      <div className="w-full flex items-center justify-center px-1.5">
        {userCart?.includes(id) ? (
          <RemoveFromCartButton id={String(id)} session={session} />
        ) : (
          <AddToCartButton id={String(id)} price={price} session={session} />
        )}
      </div>
    </div>
  );
};

export default ClientMenuItem;
