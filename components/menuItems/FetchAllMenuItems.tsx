import { getAllMenuItems } from "@/lib/actions/product.actions";
import { formatPrice } from "@/lib/utils";
import { File } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Category from "@/models/category.model";

const FetchAllMenuItems = async () => {
  const menuItems = await getAllMenuItems();

  return (
    <>
      {menuItems.length === 0 ? (
        <h4 className="text-xl sm:text-2xl font-semibold text-gray-950 text-center mt-5">
          No Menu Items Available Yet, Create Some.
        </h4>
      ) : (
        menuItems.map(async (menuItem, index) => {
          const menuItemCategory = await Category.findById(menuItem.category);

          return (
            <Link href={`/profile/menu-items/${menuItem._id}`} key={index}>
              <div className="w-[250px] sm:w-[190px] rounded-sm bg-gray-50 border border-slate-300 hover:opacity-90 transition cursor-pointer">
                <div className="aspect-square relative">
                  {menuItem.productImage ? (
                    <Image
                      src={menuItem.productImage}
                      alt={menuItem.title}
                      fill
                      className="object-cover object-center rounded-t-sm shadow-lg shadow-gray-900/10"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center shadow-lg shadow-gray-900/10 rounded-t-sm bg-gray-500/75">
                      <File className="text-white w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="w-full flex flex-col items-start gap-y-2 p-2">
                  <span className="text-gray-900 font-medium text-lg">
                    {menuItem.title}
                  </span>
                  {menuItem.category ? (
                    <span className="text-gray-800 text-sm font-medium flex items-center gap-x-[5px]">
                      Category :
                      <p className="text-gray-900 font-semibold">
                        {menuItemCategory.title}
                      </p>
                    </span>
                  ) : (
                    <p className="text-gray-800 text-sm font-medium">
                      No Category
                    </p>
                  )}
                  <span className="w-full flex items-center justify-between">
                    <p className="text-gray-700 text-sm font-medium">
                      {formatPrice(menuItem.price)}
                    </p>
                    {menuItem.isPublished ? (
                      <Badge className="px-2 text-white hover:bg-primary">
                        Public
                      </Badge>
                    ) : (
                      <Badge className="px-2 text-white bg-gray-600 hover:bg-gray-600">
                        Private
                      </Badge>
                    )}
                  </span>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </>
  );
};

export default FetchAllMenuItems;
