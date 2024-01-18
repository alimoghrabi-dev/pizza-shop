import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRightCircle, MoveRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full flex flex-col md:flex-row justify-center md:justify-between px-0 md:px-4 xl:px-24 gap-x-0 gap-y-6 md:gap-y-0 md:gap-x-2 mt-24">
      <div className="flex flex-col items-start gap-y-4 w-full md:max-w-[370px] lg:max-w-md">
        <h1 className="text-2xl lg:text-4xl font-semibold text-gray-950">
          Satisfy your cravings, one slice at a time
        </h1>
        <p className="text-sm md:text-base text-gray-500 font-normal">
          Elevate your taste experience and embark on a culinary journey that
          transcends ordinary, because great moments begin with great pizza.
        </p>
        <div className="flex self-center sm:self-start gap-x-2 mt-2.5">
          <Button className="rounded-full flex items-center gap-x-2">
            Order Now
            <ChevronRightCircle className="w-5 h-5" />
          </Button>
          <Button
            variant={"ghost"}
            className="rounded-full flex items-center gap-x-2 group">
            Learn More
            <MoveRight className="w-5 h-5 group-hover:ml-1 transition-all" />
          </Button>
        </div>
      </div>
      <div className="relative w-[255px] sm:w-[355px] h-[255px] sm:h-[355px] self-center">
        <Image
          src="/pizza.png"
          alt="pizza"
          fill
          quality={100}
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
