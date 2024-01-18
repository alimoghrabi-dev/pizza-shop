"use client";

import { Edit, Loader2, Trash } from "lucide-react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";

interface CategoriesComponentsProps {
  title: string;
}

const CategoriesComponents = ({ title }: CategoriesComponentsProps) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>("");

  const handleDeleteCategory = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch("/api/delete-category", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      });

      if (response.ok) {
        toast.success("Category deleted successfully");
        router.refresh();
      } else {
        toast.error("Error updating category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditCategory = async () => {
    setIsEditing(true);
    try {
      const response = await fetch("/api/edit-category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          editedTitle,
        }),
      });

      if (response.ok) {
        toast.success("Category updated successfully");
      } else {
        toast.error("Error updating category");
      }

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Error updating category");
    } finally {
      setIsEditing(false);
      setEditedTitle("");
    }
  };

  return (
    <div className="w-full flex items-center justify-between bg-white border border-slate-300 shadow-md rounded-md px-3 py-1.5">
      <p className="text-gray-900 text-base font-semibold">{title}</p>
      <div className="flex items-center gap-x-1.5">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"} variant={"ghost"} className="px-2">
              <Edit className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Category</DialogTitle>
              <DialogDescription className="py-2 pt-5">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  placeholder="Category Name"
                  className="border-slate-300 transition-all text-gray-900 font-medium"
                />
              </DialogDescription>
            </DialogHeader>
            <div className="w-full flex items-center gap-x-2.5">
              <Button
                type="button"
                onClick={handleEditCategory}
                disabled={isEditing}>
                {isEditing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  "Update"
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

        <Button
          onClick={handleDeleteCategory}
          size={"sm"}
          variant={"destructive"}
          className="px-2">
          {isDeleting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Trash className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default CategoriesComponents;
