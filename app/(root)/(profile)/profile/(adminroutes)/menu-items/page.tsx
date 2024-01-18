import FetchAllMenuItems from "@/components/menuItems/FetchAllMenuItems";
import MenuItemCreation from "@/components/menuItems/MenuItemCreation";

const Page = async () => {
  return (
    <section className="w-full flex flex-col items-center justify-center space-y-7">
      <div className="w-[320px] sm:w-[445px] flex items-center gap-x-2">
        <MenuItemCreation />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center px-0 sm:px-20 md:px-8 gap-4 mt-4">
        <FetchAllMenuItems />
      </div>
    </section>
  );
};

export default Page;
