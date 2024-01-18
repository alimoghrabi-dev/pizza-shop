import MenuCategories from "@/components/MenuCategories";
import MenuItem from "@/components/shared/MenuItem";
import { getAllCategories } from "@/lib/actions/category.actions";
import { getAllPublicMenuItems } from "@/lib/actions/product.actions";
import { cn } from "@/lib/utils";

interface SearchPageProps {
  searchParams: {
    categoryId: string;
  };
}

const Page = async ({ searchParams }: SearchPageProps) => {
  const menuItems = await getAllPublicMenuItems(searchParams.categoryId);

  const categories = await getAllCategories();

  return (
    <div className="w-full flex flex-col items-center justify-center mt-8 space-y-5">
      <div className="w-full flex flex-wrap items-center justify-start gap-x-2.5">
        <MenuCategories categories={categories} />
      </div>
      <div
        className={cn(
          `w-full flex flex-wrap items-center gap-6`,
          menuItems.length >= 5
            ? "justify-center"
            : "justify-center sm:justify-start"
        )}>
        <MenuItem menuItems={menuItems} />
      </div>
    </div>
  );
};

export default Page;
