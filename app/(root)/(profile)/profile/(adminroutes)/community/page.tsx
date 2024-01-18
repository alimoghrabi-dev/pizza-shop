import { authOptions } from "@/authoptions";
import { Badge } from "@/components/ui/badge";
import { getAllUsers, getUserByEmail } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  const userInfo = await getUserByEmail(session?.user?.email!);

  const parsedId = String(userInfo._id);

  const users = await getAllUsers();

  if (!users) {
    return null;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-2.5">
      {users.map((user) => (
        <div
          key={user._id}
          className="w-full sm:w-[75%] md:w-[65%] lg:w-1/2 flex items-center justify-between hover:shadow-lg hover:shadow-gray-900/10 transition">
          <Link
            href={`/profile/${String(user._id)}`}
            className="w-full h-full flex flex-col items-start rounded-r-none space-y-1 py-2 px-2 sm:px-4 border border-slate-300 bg-white rounded-sm">
            <div className="flex items-center gap-x-2">
              <Image
                src={user.image}
                alt="profile"
                width={42}
                height={42}
                quality={100}
                className="rounded-full ring-1 ring-slate-300"
              />
              <div className="h-8 w-px bg-slate-300" />
              <span className="flex items-center gap-x-2">
                <p className="text-base text-gray-900 font-medium">
                  {user.name}
                </p>
                {user.isAdmin && (
                  <Badge className="text-center py-0 px-[5px] text-xs">
                    Admin
                  </Badge>
                )}
              </span>
            </div>
            <p className="text-sm font-normal text-gray-600">{user.email}</p>
          </Link>
          {String(user._id) === parsedId && (
            <div className="h-[84px] border border-l-0 flex items-center justify-center rounded-sm rounded-l-none border-slate-300 py-2 px-8">
              <p className="bg-gray-600/75 text-white font-base py-1 px-2.5 rounded-xl">
                You
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Page;
