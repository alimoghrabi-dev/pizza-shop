import Image from "next/image";
import MenuItem from "../shared/MenuItem";
import { getAllPublicMenuItemsAndLimit } from "@/lib/actions/product.actions";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { ArrowRight } from "lucide-react";

const HomeMenu = async () => {
  const publicProducts = await getAllPublicMenuItemsAndLimit();

  return (
    <section className="w-full flex flex-col px-0 py-20 space-y-8">
      <div className="relative w-full flex flex-col items-center justify-center">
        <Image
          src={"/sallad2.png"}
          alt="salad-2"
          width={107}
          height={195}
          quality={100}
          className="absolute -right-20"
        />
        <p className="text-base font-bold text-gray-600 uppercase">check out</p>
        <span className="text-primary text-3xl font-semibold italic">Menu</span>
        <Image
          src={"/sallad1.png"}
          alt="salad-1"
          width={109}
          height={189}
          quality={100}
          className="absolute -left-20"
        />
      </div>

      <div className="w-full flex flex-wrap items-center justify-center gap-8">
        <MenuItem menuItems={publicProducts} />
      </div>
      <div className="w-full flex items-center justify-center mt-3">
        <Link
          href="/menu"
          className={cn(
            buttonVariants({
              size: "sm",
              className: "rounded-full px-4 flex items-center",
            })
          )}>
          View More
          <ArrowRight className="w-[18px] h-[18px] ml-1.5 mt-0.5" />
        </Link>
      </div>
    </section>
  );
};

export default HomeMenu;
