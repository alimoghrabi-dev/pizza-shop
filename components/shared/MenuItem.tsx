import { IProduct } from "@/models/product.model";
import { Session } from "next-auth";
import ClientMenuItem from "./ClientMenuItem";

interface MenuItemProps {
  menuItems: IProduct[];
  userCart?: any;
  session?: Session | null;
}

const MenuItem = async ({ menuItems, userCart, session }: MenuItemProps) => {
  return (
    <>
      {menuItems.map((menuItem) => (
        <ClientMenuItem
          key={menuItem._id}
          productImage={menuItem?.productImage}
          menuTitle={menuItem?.title}
          id={menuItem?._id}
          userCart={userCart}
          menuItemCategory={menuItem?.category}
          session={session}
          price={menuItem?.price}
        />
      ))}
    </>
  );
};

export default MenuItem;
