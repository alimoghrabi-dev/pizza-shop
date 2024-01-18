"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateCategory = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const handleCreateCategory = async () => {
    setIsCreating(true);

    try {
      const response = await fetch("/api/create-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category,
        }),
      });

      if (response.ok) {
        toast.success("Category created successfully");
        router.refresh();
      } else {
        toast.error("Error creating category");
      }
    } catch (error) {
      console.log("CREATE_CATEGORY", error);
      toast.error("Error creating category");
    } finally {
      setIsCreating(false);
      setIsOpen(false);
      setCategory("");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="w-full flex flex-col gap-y-2">
          <div className="w-full flex items-center gap-x-2">
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category Name"
              className="border-slate-300 hover:border-slate-400/85 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-primary/50 transition"
            />
            <Button
              onClick={() => setIsOpen(false)}
              variant={"outline"}
              className="hover:border-slate-400/85">
              Cancel
            </Button>
          </div>
          <Button
            className="w-full"
            disabled={isCreating}
            onClick={handleCreateCategory}>
            {isCreating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Create Category"
            )}
          </Button>
        </div>
      )}
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="w-full">
          <Plus className="mr-2" /> Create New Category
        </Button>
      )}
    </>
  );
};

export default CreateCategory;
