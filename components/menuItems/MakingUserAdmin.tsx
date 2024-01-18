"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface MakingUserAdminProps {
  id: string;
  isAdmin: boolean;
}

const MakingUserAdmin = ({ id, isAdmin }: MakingUserAdminProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/updateUserAsAdmin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          isAdmin: !isAdmin,
        }),
      });

      if (response.ok) {
        if (isAdmin) {
          toast.error("User Removed From Admin");
        } else {
          toast.success("User Marked As Admin");
        }
      } else {
        toast.error("Something went wrong");
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Button
      size={"sm"}
      type="button"
      onClick={handleSubmit}
      disabled={isSubmitting}
      className="mt-2 w-[155px]">
      {isSubmitting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isAdmin ? (
        "Remove Admin"
      ) : (
        "Mark User as Admin"
      )}
    </Button>
  );
};

export default MakingUserAdmin;
