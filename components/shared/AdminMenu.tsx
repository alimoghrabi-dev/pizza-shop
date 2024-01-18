"use client";

import { adminRoutes } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMenu = () => {
  const pathname = usePathname();

  return (
    <>
      {adminRoutes.map((route) => {
        const isActive = pathname === route.href;
        const isMenuItem =
          pathname.startsWith("/profile/menu-items/") &&
          route.href === "/profile/menu-items";

        return (
          <Link
            key={route.label}
            href={route.href}
            className={cn(
              "text-gray-950 font-medium bg-gray-300 rounded-full py-1.5 px-3.5 hover:bg-gray-400/60 transition-all",
              {
                "bg-primary text-white hover:bg-primary hover:text-white":
                  isActive || isMenuItem,
              }
            )}>
            {route.label}
          </Link>
        );
      })}
    </>
  );
};

export default AdminMenu;
