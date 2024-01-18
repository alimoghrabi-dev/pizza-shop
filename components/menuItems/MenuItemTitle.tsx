"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface MenuItemTitleProps {
  title: string;
  menuItemId: string;
}

const MenuItemTitle = ({ title, menuItemId }: MenuItemTitleProps) => {
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
          title: value,
        }),
      });
      if (response.ok) {
        toast.success("Title added successfully");
        router.refresh();
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("MENUITEM", error);
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
            Add Title
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
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Menu Item Title"
              className="border-slate-300 hover:border-slate-400/85 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary/50 transition"
            />
          </div>
          {title ? (
            <span className="text-gray-800 text-sm font-normal ml-2 italic">
              {title}
            </span>
          ) : (
            <span className="text-gray-600 text-sm font-normal italic ml-2">
              Title is Empty
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

export default MenuItemTitle;
