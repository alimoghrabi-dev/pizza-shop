import { authOptions } from "@/authoptions";
import MenuItemCategory from "@/components/menuItems/MenuItemCategory";
import MenuItemDescription from "@/components/menuItems/MenuItemDescription";
import MenuItemImage from "@/components/menuItems/MenuItemImage";
import MenuItemPrice from "@/components/menuItems/MenuItemPrice";
import MenuItemTitle from "@/components/menuItems/MenuItemTitle";
import PublishButton from "@/components/menuItems/PublishButton";
import Banner from "@/components/ui/Banner";
import { getAllCategories } from "@/lib/actions/category.actions";
import { cn } from "@/lib/utils";
import Category from "@/models/category.model";
import Product from "@/models/product.model";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { menuItemId: string } }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/");
  }

  const categories = await getAllCategories();

  const menuItem = await Product.findById(params.menuItemId);

  const requiredFields = [
    menuItem.title,
    menuItem.description,
    menuItem.productImage,
    menuItem.price,
    menuItem.category,
  ];

  const category = await Category.findById(menuItem.category);

  const totalFields = requiredFields.length;

  const completedFields = requiredFields.filter(Boolean).length;

  const completetionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6">
      {!menuItem.isPublished ? (
        <Banner label="This Item is unpublished yet, it will not be available to clients." />
      ) : null}
      <div className="w-full sm:w-[65%] md:w-1/2 flex items-center justify-between border border-slate-300 py-1.5 px-4 rounded-lg">
        <span
          className={cn(
            "text-sm sm:text-base font-semibold text-gray-900",
            isComplete && "text-emerald-700"
          )}>
          {isComplete ? (
            <>All Fields Completed</>
          ) : (
            <>Completed Fields {completetionText}</>
          )}
        </span>
        <PublishButton
          isComplete={isComplete}
          isPublished={menuItem.isPublished}
          menuItemId={params.menuItemId}
        />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-start justify-center gap-5">
        <MenuItemTitle title={menuItem?.title} menuItemId={params.menuItemId} />
        <MenuItemDescription
          description={menuItem.description}
          menuItemId={params.menuItemId}
        />
        <MenuItemPrice price={menuItem.price} menuItemId={params.menuItemId} />
        <MenuItemCategory
          categories={categories}
          category={category?.title}
          menuItemId={params.menuItemId}
        />
      </div>
      <div className="w-full flex items-center justify-center">
        <MenuItemImage
          productImage={menuItem.productImage}
          menuItemId={params.menuItemId}
        />
      </div>
    </div>
  );
};

export default Page;
