"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LinkComp = ({
  link,
  className,
  isMobile,
}: {
  link: { href: string; label: string };
  className: string;
  isMobile?: boolean;
}) => {
  const pathname = usePathname();

  const isActive = pathname === link.href;
  const isMenu = pathname?.startsWith("/menu") && link.href === "/menu";

  return (
    <Link
      href={link.href}
      className={`${
        isActive || isMenu
          ? `text-primary text-base lg:text-lg font-semibold ${
              isMobile && "text-xl"
            }`
          : className
      } transition`}>
      {link.label}
    </Link>
  );
};

export default LinkComp;
