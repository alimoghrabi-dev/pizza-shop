import { ICategory } from "@/models/category.model";
import CategoryItem from "./shared/CategoryItem";

const MenuCategories = ({ categories }: { categories: ICategory[] }) => {
  return (
    <>
      {categories.map((category) => (
        <CategoryItem
          key={category?._id}
          id={String(category?._id)}
          title={category?.title}
        />
      ))}
    </>
  );
};

export default MenuCategories;
