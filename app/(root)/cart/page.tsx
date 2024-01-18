import { authOptions } from "@/authoptions";
import UserCartItems from "@/components/UserCartItems";
import { getUserCartItems } from "@/lib/actions/product.actions";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  const userInfo = await getUserByEmail(session?.user?.email!);

  const items = await getUserCartItems(userInfo?._id);

  return (
    <div className="w-full flex flex-col items-start justify-center gap-y-4 mt-16">
      <h1 className="text-gray-950 font-semibold text-3xl sm:text-4xl">
        <span className="text-primary">{`${session.user?.name}'s `}</span>
        Cart
        <div className="w-2/3 h-px bg-slate-300 mt-3.5" />
      </h1>
      <UserCartItems items={items} session={session} />
    </div>
  );
};

export default Page;
