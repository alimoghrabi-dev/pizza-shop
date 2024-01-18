import { IProduct } from "@/models/product.model";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../AddToCartButton";
import RemoveFromCartButton from "../RemoveFromCartButton";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/authoptions";
import Category from "@/models/category.model";

interface MenuItemProps {
  menuItems: IProduct[];
}

const MenuItem = async ({ menuItems }: MenuItemProps) => {
  const session = await getServerSession(authOptions);

  const userInfo = await getUserByEmail(session?.user?.email!);

  const userCart = userInfo?.cart;

  return (
    <>
      {menuItems.map(async (menuItem, index) => {
        const category = await Category.findById(menuItem?.category);

        return (
          <div
            key={index}
            className="w-[285px] sm:w-[200px] bg-white border border-slate-300 rounded-md p-1.5 pb-2 space-y-1 hover:shadow-lg hover:shadow-gray-900/[0.15] hover:opacity-90 transition">
            <Link href={`/menu/${menuItem?._id}`}>
              <div className="relative aspect-square">
                <Image
                  src={menuItem?.productImage}
                  alt={menuItem?.title}
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="w-full flex flex-col items-center justify-center gap-y-2 px-1 mt-1">
                <span className="text-gray-900 text-base font-semibold line-clamp-1">
                  {menuItem?.title}
                </span>
                <p className="text-gray-600 text-sm font-medium">
                  {category?.title}
                </p>
              </div>
            </Link>
            <div className="w-full flex items-center justify-center px-1.5">
              {userCart?.includes(menuItem?._id) ? (
                <RemoveFromCartButton
                  id={String(menuItem._id)}
                  session={session}
                />
              ) : (
                <AddToCartButton
                  id={String(menuItem._id)}
                  price={menuItem.price}
                  session={session}
                />
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MenuItem;
