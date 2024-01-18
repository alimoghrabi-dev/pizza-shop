"use client";

import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface PublishButtonProps {
  isComplete: boolean;
  isPublished: boolean;
  menuItemId: string;
}

const PublishButton = ({
  isComplete,
  isPublished,
  menuItemId,
}: PublishButtonProps) => {
  const router = useRouter();

  const [isPublishing, setIsPublishing] = useState<boolean>(false);

  const handleClick = async () => {
    setIsPublishing(true);

    try {
      const response = await fetch("/api/un-publish-menuitem", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuItemId }),
      });

      if (response.ok) {
        toast.success("Item Published successfully");

        router.refresh();
        router.push("/profile/menu-items");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={!isComplete || isPublishing}
      variant={"outline"}
      size={"sm"}
      className="border-slate-300 disabled:opacity-80">
      {isPublishing ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isPublished ? (
        "UnPublish"
      ) : (
        "Publish"
      )}
    </Button>
  );
};

export default PublishButton;
