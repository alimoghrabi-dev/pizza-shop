import { formatPrice } from "@/lib/utils";
import { ICategory } from "@/models/category.model";
import { IProduct } from "@/models/product.model";
import Image from "next/image";
import Link from "next/link";

const MenuItemById = ({
  menuItem,
  category,
  isAdmin,
}: {
  menuItem: IProduct;
  category: ICategory;
  isAdmin: boolean;
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center sm:items-start justify-center gap-y-12 sm:gap-x-12">
      <div className="flex flex-col items-center justify-center gap-y-2.5">
        <Image
          src={menuItem.productImage}
          alt="product-image"
          width={910}
          height={910}
          quality={100}
          className="w-[210px] h-[210px] object-cover object-center rounded-sm border border-slate-200 bg-white"
        />
        {isAdmin && (
          <Link
            href={`/profile/menu-items/${menuItem._id}`}
            className="text-gray-900 text-base font-medium border border-slate-300 py-1 px-3.5 rounded-lg hover:opacity-85 transition">
            Edit Item
          </Link>
        )}
      </div>
      <div className="w-[230px] md:w-[300px] flex flex-col items-start gap-y-4">
        <span className="flex items-center gap-x-1">
          <p className="text-base font-medium text-gray-700">- Item Name:</p>
          <p className="text-base font-semibold text-gray-900">
            {menuItem.title}
          </p>
        </span>
        <div className="w-full h-px bg-gray-300" />
        <span className="flex flex-col gap-y-1">
          <p className="text-base font-medium text-gray-700">
            - Item Description:
          </p>
          <p className="text-base font-semibold text-gray-900 ml-2.5">
            {menuItem.description}
          </p>
        </span>
        <div className="w-full h-px bg-gray-300" />
        <span className="flex items-center gap-x-1">
          <p className="text-base font-medium text-gray-700">
            - Item Category:
          </p>
          <p className="text-base font-semibold text-gray-900">
            {category.title}
          </p>
        </span>
        <div className="w-full h-px bg-gray-300" />
        <span className="flex items-center gap-x-1">
          <p className="text-base font-medium text-gray-700">- Item Price:</p>
          <p className="text-base font-semibold text-gray-900">
            {formatPrice(menuItem.price)}
          </p>
        </span>
      </div>
    </div>
  );
};

export default MenuItemById;
