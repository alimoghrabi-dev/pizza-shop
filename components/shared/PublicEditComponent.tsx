"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PublicEditComponent = ({ id }: { id: string }) => {
  const pathname = usePathname();
  const isActiveProfile = pathname === `/profile/${id}`;

  return (
    <>
      <Link
        href={`/profile/${id}`}
        className={cn(
          "text-gray-950 font-medium bg-gray-300 rounded-full py-1.5 px-3.5 hover:bg-gray-400/60 transition-all",
          {
            "bg-primary text-white hover:bg-primary hover:text-white cursor-default":
              isActiveProfile,
          }
        )}>
        Profile
      </Link>
    </>
  );
};

export default PublicEditComponent;
