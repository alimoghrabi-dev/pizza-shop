import CategoriesComponents from "@/components/CategoriesComponents";
import CreateCategory from "@/components/shared/CreateCategory";
import { getAllCategories } from "@/lib/actions/category.actions";

const Page = async () => {
  const categories = await getAllCategories();

  return (
    <section className="w-full flex items-center justify-center">
      <div className="w-[320px] sm:w-[445px] flex flex-col items-center justify-center space-y-7">
        <div className="w-full flex items-center gap-x-2">
          <CreateCategory />
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-y-2 mt-4">
          {categories.length === 0 ? (
            <p className="text-xl font-semibold text-gray-800 text-center mt-2">
              No Categories Available Yet!
            </p>
          ) : (
            categories.map((category, index) => (
              <CategoriesComponents key={index} title={category.title} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Page;
