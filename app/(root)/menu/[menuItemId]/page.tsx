import { authOptions } from "@/authoptions";
import AddToCartButton from "@/components/AddToCartButton";
import RemoveFromCartButton from "@/components/RemoveFromCartButton";
import MenuItemById from "@/components/menuItems/MenuItemById";
import { getMenuItemById } from "@/lib/actions/product.actions";
import { getUserByEmail } from "@/lib/actions/user.actions";
import Category from "@/models/category.model";
import { ArrowLeftCircle } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Page = async ({ params }: { params: { menuItemId: string } }) => {
  const session = await getServerSession(authOptions);

  const userInfo = await getUserByEmail(session?.user?.email!);

  const menuItem = await getMenuItemById(params.menuItemId);

  const category = await Category.findById(menuItem.category);

  const userCart = userInfo?.cart;

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-10 mt-10">
      <Link
        href="/menu"
        className="flex items-center gap-x-1.5 text-base font-medium hover:opacity-85 transition">
        <ArrowLeftCircle className="w-5 h-5" />
        Back To The Menu
      </Link>
      <div className="w-full flex items-center justify-center">
        <MenuItemById
          menuItem={menuItem}
          category={category}
          isAdmin={userInfo?.isAdmin}
        />
      </div>
      <div className="w-[270px]">
        {userCart?.includes(menuItem?._id) ? (
          <RemoveFromCartButton id={String(menuItem._id)} session={session} />
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
};

export default Page;
