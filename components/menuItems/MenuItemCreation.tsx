"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const MenuItemCreation = () => {
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleTitleCreation = async () => {
    setIsCreating(true);

    try {
      const response = await fetch("/api/create-menuitem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value,
        }),
      });

      if (response.ok) {
        toast.success("Menu Item created successfully");
        router.refresh();
      } else {
        toast.error("Error creating menu item");
      }
    } catch (error) {
      console.log("CREATE_MENUITEM", error);
      toast.error("Error creating menu item");
    } finally {
      setIsCreating(false);
      setValue("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2" />
          Create New Menu Item
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Title</DialogTitle>
          <DialogDescription className="py-2 pt-5">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Menu Item Title"
              className="border-slate-300 transition-all text-gray-900 font-medium"
            />
          </DialogDescription>
        </DialogHeader>
        <div className="w-full flex items-center gap-x-2.5">
          <Button
            type="button"
            onClick={handleTitleCreation}
            disabled={isCreating}>
            {isCreating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Create"
            )}
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemCreation;
