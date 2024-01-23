"use client";

import { Button } from "./ui/button";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";

const AddToCartButton = ({
  id,
  price,
  session,
}: {
  id: string;
  price: number;
  session: Session | null | undefined;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      });

      if (response.ok) {
        toast.success("Added to cart");
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
      disabled={isLoading || !session}
      onClick={handleAddToCart}
      size={"sm"}
      className="rounded-full w-full mt-1">
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>+ Add to Cart {formatPrice(price)}</>
      )}
    </Button>
  );
};

export default AddToCartButton;
