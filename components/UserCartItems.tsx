import { formatPrice } from "@/lib/utils";
import Category from "@/models/category.model";
import { IProduct } from "@/models/product.model";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCartButton from "./RemoveFromCartButton";
import { Button } from "./ui/button";
import { Session } from "next-auth";

const UserCartItems = ({
  items,
  session,
}: {
  items: IProduct[];
  session: Session | null;
}) => {
  return (
    <div className="w-full flex flex-col lg:flex-row gap-y-5 lg:gap-x-8 justify-between">
      <div className="w-full flex items-start flex-col space-y-4 mt-2">
        {items.length === 0 && (
          <div className="text-gray-700 font-medium text-xl text-center">
            No items currently in your cart,{" "}
            <Link
              href={"/menu"}
              className="text-primary/85 hover:text-primary transition">
              add some!
            </Link>
          </div>
        )}
        {items.map(async (item) => {
          const category = await Category.findById(item.category);

          return (
            <div
              key={item._id}
              className="border border-slate-300 p-1.5 rounded-md flex flex-col space-y-2 hover:opacity-95 hover:shadow-lg hover:shadow-gray-900/10 transition-all">
              <Link
                href={`/menu/${item._id}`}
                className="w-full flex flex-col sm:flex-row items-center gap-x-2.5">
                <div className="w-full sm:w-auto flex justify-start space-x-2.5">
                  <Image
                    src={item.productImage}
                    alt={item.title}
                    width={900}
                    height={900}
                    className="w-[100px] h-[100px] object-cover object-center rounded-sm border border-slate-200 bg-white"
                  />
                  <div className="flex flex-col items-start justify-center gap-y-2.5">
                    <span className="text-gray-900 text-base font-medium">
                      {item.title}
                    </span>
                    <p className="text-gray-700 text-sm font-medium">
                      {category.title}
                    </p>
                    <p className="text-gray-700 text-sm font-normal">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </div>

                <div className="h-px sm:h-20 w-[90%] sm:w-px bg-slate-300 mt-3 sm:mt-0" />
                <p className="text-gray-700 text-sm font-normal self-start w-[325px] md:w-[375px] line-clamp-4 mt-2">
                  {item.description}
                </p>
              </Link>

              <RemoveFromCartButton
                id={String(item._id)}
                isCart
                session={session}
              />
            </div>
          );
        })}
      </div>
      <div className="w-2/3 sm:w-1/3 lg:w-[15%] h-[95px] flex items-center border border-slate-300 rounded-md p-2.5 px-3.5">
        <div className="w-full h-full justify-between flex items-start flex-col">
          <span className="flex items-center gap-x-1 text-gray-800 font-medium text-base">
            Subtotal:
            <p className="text-primary">
              {formatPrice(items.reduce((acc, item) => acc + item.price, 0))}
            </p>
          </span>
          <Button className="w-full">Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default UserCartItems;
