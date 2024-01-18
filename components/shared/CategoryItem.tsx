"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

const CategoryItem = ({ id, title }: { id: string; title: string }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryId");

  const isSelected = currentCategoryId === id;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          categoryId: isSelected ? null : id,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`py-1 px-5 rounded-full font-semibold text-xl transition cursor-pointer ${
        isSelected
          ? "bg-primary text-white"
          : "border border-slate-300 hover:bg-slate-200/60 text-primary"
      }`}>
      {title}
    </button>
  );
};

export default CategoryItem;
