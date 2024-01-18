"use client";

import { getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface MobileUserInfoProps {
  id: string;
  name: string;
  image: string;
  isMobile?: boolean;
}

const MobileUserInfo = ({ id, name, image, isMobile }: MobileUserInfoProps) => {
  const pathname = usePathname();

  const isProfileRoute =
    pathname === `/profile/${id}` ||
    pathname === `/profile/edit/${id}` ||
    pathname === `/profile/categories` ||
    pathname === `/profile/menu-items` ||
    pathname === `/profile/community`;

  return (
    <Avatar
      className={`hover:shadow-lg shadow hover:shadow-gray-900/25 transition cursor-pointer ${
        isProfileRoute && "ring-2 ring-primary/85"
      }`}>
      {image ? (
        isMobile ? (
          <Link href={`/profile/${id}`}>
            <Image src={image} alt="profile" width={42} height={42} />
          </Link>
        ) : (
          <Link href={`/profile/${id}`}>
            <Image
              src={image}
              alt="profile"
              width={50}
              height={50}
              className="w-full h-full"
            />
          </Link>
        )
      ) : (
        <Link
          href={`/profile/${id}`}
          className="w-full h-full flex items-center justify-center">
          <AvatarFallback className="text-gray-100 text-sm font-semibold uppercase bg-gray-800/50">
            {getInitials(name)}
          </AvatarFallback>
        </Link>
      )}
    </Avatar>
  );
};

export default MobileUserInfo;
