"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { ComboboxDemo } from "../ui/combobox";
import { ICategory } from "@/models/category.model";

interface CreateMenuItemCategoryProps {
  categories: ICategory[];
  menuItemId: string;
  category: string;
}

const CreateMenuItemCategory = ({
  categories,
  menuItemId,
  category,
}: CreateMenuItemCategoryProps) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleCreateMenuItem = async () => {
    setIsCreating(true);

    try {
      const response = await fetch(`/api/edit-menuitem/${menuItemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: value,
        }),
      });

      if (response.ok) {
        toast.success("Category added successfully");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("CREATE_PRICE", error);
      toast.error("Something went wrong");
    } finally {
      setIsCreating(false);
      setIsOpen(false);
      setValue("");
    }
  };

  return (
    <div className="flex flex-col bg-white border border-slate-300 p-1.5 rounded-sm">
      <div className="w-full flex items-center justify-between">
        <span className="bg-gray-400 p-2 rounded-full flex items-center justify-center">
          <Edit2 className="w-[22px] h-[22px] text-white" />
        </span>
        {!isOpen ? (
          <Button size={"sm"} onClick={() => setIsOpen(true)}>
            Add Category
          </Button>
        ) : (
          <Button
            onClick={() => setIsOpen(false)}
            variant={"outline"}
            className="hover:border-slate-400/85">
            Cancel
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="w-full flex flex-col gap-y-2 mt-3">
          <div className="w-full flex items-center gap-x-2">
            <ComboboxDemo
              value={value}
              onChange={(value) => setValue(value)}
              options={categories.map((category) => ({
                value: category._id,
                label: category.title,
              }))}
            />
          </div>
          {category ? (
            <span className="text-gray-800 text-sm font-normal ml-2 italic">
              {category}
            </span>
          ) : (
            <span className="text-gray-600 text-sm font-normal italic ml-2">
              No Category
            </span>
          )}

          <Button
            className="w-full"
            disabled={isCreating || value === ""}
            onClick={handleCreateMenuItem}>
            {isCreating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Add Item"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateMenuItemCategory;
