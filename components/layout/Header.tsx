import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/constants";
import LinkComp from "../shared/LinkComp";
import { getServerSession } from "next-auth";
import LogOutButton from "../auth/LogOutButton";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Menu, ShoppingCart } from "lucide-react";
import MobileSheetLinks from "../shared/MobileSheetLinks";
import MobileUserInfo from "../shared/MobileUserInfo";
import { authOptions } from "@/authoptions";
import { Badge } from "../ui/badge";
import { getUserByEmail } from "@/lib/actions/user.actions";

const Header = async () => {
  const session = await getServerSession(authOptions);

  const userInfo = await getUserByEmail(session?.user?.email!);

  const parsedId = String(userInfo?._id);

  return (
    <header className="flex items-center justify-between bg-transparent">
      <Link href="/" className="relative text-primary font-bold text-[27px]">
        ST PIZZA
        {userInfo?.isAdmin && (
          <Badge className="absolute -top-0.5 px-1.5">Admin</Badge>
        )}
      </Link>
      <nav className="hidden md:flex items-center gap-x-4 lg:gap-x-6">
        {navLinks.map((link) => (
          <LinkComp
            key={link.label}
            link={link}
            className="text-gray-700 text-medium text-base lg:text-lg hover:text-gray-950"
          />
        ))}
      </nav>
      <nav className="hidden md:flex items-center gap-x-1">
        {!session?.user ? (
          <>
            <Link
              href="/login"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "rounded-full pr-5 hover:text-gray-700",
                })
              )}>
              Login
            </Link>
            <Link
              href="/register"
              className={cn(
                buttonVariants({
                  size: "sm",
                  className: "rounded-full px-5",
                })
              )}>
              Register
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-2.5">
            <Link href={"/cart"} className="relative">
              <ShoppingCart className="w-6 h-6 text-primary mr-1" />
              {userInfo?.cart?.length > 0 ? (
                <span className="absolute -top-1 -right-1 px-[5px] font-sans bg-primary rounded-full text-white text-xs font-semibold">
                  {userInfo?.cart?.length}
                </span>
              ) : null}
            </Link>
            <LogOutButton />
            <div className="h-9 w-px bg-gray-400/60" />
            <MobileUserInfo
              id={parsedId}
              name={session?.user?.name!}
              image={session?.user?.image!}
            />
          </div>
        )}
      </nav>
      <nav className="md:hidden flex items-center gap-x-4 lg:gap-x-6">
        <Sheet>
          <SheetTrigger>
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-60 flex flex-col justify-between">
            <SheetHeader>
              <SheetTitle className="text-3xl text-primary font-bold text-center">
                ST PIZZA
              </SheetTitle>
            </SheetHeader>
            <SheetDescription>
              <MobileSheetLinks />
              <div className="flex flex-col items-center justify-center gap-y-2.5 mt-12">
                {!session?.user ? (
                  <>
                    <Link
                      href="/login"
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "sm",
                          className:
                            "rounded-lg w-full border-slate-400/75 text-gray-800 hover:text-gray-700",
                        })
                      )}>
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className={cn(
                        buttonVariants({
                          size: "sm",
                          className: "rounded-lg w-full",
                        })
                      )}>
                      Register
                    </Link>
                  </>
                ) : (
                  <div className="w-full flex flex-row-reverse items-center gap-x-4">
                    <MobileUserInfo
                      id={parsedId}
                      name={session?.user?.name!}
                      image={session?.user?.image!}
                      isMobile
                    />
                    <LogOutButton isMobile />
                  </div>
                )}
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
