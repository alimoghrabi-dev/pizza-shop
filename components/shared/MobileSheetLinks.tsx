"use client";

import { navLinks } from "@/constants";
import LinkComp from "./LinkComp";

const MobileSheetLinks = () => {
  return (
    <div className="flex flex-col items-end mb-36 space-y-3.5">
      <div className="h-px w-full bg-gray-400/75" />
      {navLinks.map((link) => (
        <>
          <LinkComp
            key={link.label}
            link={link}
            className="text-xl text-gray-950 hover:text-gray-700"
            isMobile
          />
          <div className="h-px w-full bg-gray-400/75" />
        </>
      ))}
    </div>
  );
};

export default MobileSheetLinks;
