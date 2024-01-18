import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | null | undefined) {
  const words = name?.split(" ");

  const initials = words?.map((word) => word.charAt(0).toUpperCase()).join("");

  return initials;
}

export const formatPrice = (price: number | null) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price || 0);
};
