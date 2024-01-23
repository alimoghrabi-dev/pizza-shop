import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center mt-8 space-y-5">
      <div className="w-full flex flex-wrap items-center justify-start gap-x-2.5">
        <Skeleton className="w-[110px] h-[50px] rounded-full bg-gray-900/10" />
        <Skeleton className="w-[110px] h-[50px] rounded-full bg-gray-900/10" />
        <Skeleton className="w-[110px] h-[50px] rounded-full bg-gray-900/10" />
      </div>
      <div className="w-full flex flex-wrap items-center justify-center md:justify-start gap-6">
        <Skeleton className="w-[80%] sm:w-[200px] h-[250px] bg-gray-900/10" />
        <Skeleton className="w-[80%] sm:w-[200px] h-[250px] bg-gray-900/10" />
        <Skeleton className="w-[80%] sm:w-[200px] h-[250px] bg-gray-900/10" />
        <Skeleton className="w-[80%] sm:w-[200px] h-[250px] bg-gray-900/10" />
        <Skeleton className="w-[80%] sm:w-[200px] h-[250px] bg-gray-900/10" />
      </div>
    </div>
  );
};

export default Loading;
