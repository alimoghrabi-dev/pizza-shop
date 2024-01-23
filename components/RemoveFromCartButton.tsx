"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";

const RemoveFromCartButton = ({
  id,
  isCart,
  session,
}: {
  id: string;
  isCart?: boolean;
  session: Session | null | undefined;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      if (response.ok) {
        toast.success("Item Removed From your cart");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong while adding to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isCart ? "outline" : "destructive"}
      disabled={isLoading || !session}
      onClick={handleAddToCart}
      size={"sm"}
      className={cn(
        isCart
          ? "w-[200px] border border-slate-300 hover:bg-gray-200/40 hover:text-gray-800"
          : "w-full rounded-full mt-1"
      )}>
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>- Remove From Cart</>
      )}
    </Button>
  );
};

export default RemoveFromCartButton;
