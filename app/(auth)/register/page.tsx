import RegisterForm from "@/components/auth/RegisterForm";
import { ChevronLeftCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center">
      <div className="absolute left-5 top-5 flex items-center justify-center gap-x-2 group">
        <ChevronLeftCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900 group-hover:text-gray-700 transition" />
        <Link
          href="/"
          className="text-base sm:text-lg font-medium text-gray-900 group-hover:text-gray-700 transition">
          Back Home
        </Link>
      </div>
      <div className="w-[350px] md:w-[400px] flex items-center justify-between px-3.5 mt-9">
        <Image
          src="/pizza-icon.png"
          alt="Pizza"
          width={35}
          height={35}
          className="pizza-icon"
        />
        <h1 className="text-primary text-4xl font-semibold mb-1">Register</h1>
        <Image
          src="/pizza-icon.png"
          alt="Pizza"
          width={35}
          height={35}
          className="pizza-icon"
        />
      </div>

      <RegisterForm />
    </section>
  );
};

export default Page;
