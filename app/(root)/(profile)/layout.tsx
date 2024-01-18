import { authOptions } from "@/authoptions";
import AdminMenu from "@/components/shared/AdminMenu";
import PublicEditComponent from "@/components/shared/PublicEditComponent";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");

  const userInfo = await getUserByEmail(session?.user?.email!);

  const parsedId = String(userInfo._id);

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 sm:space-y-8 mt-5 sm:mt-10">
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {userInfo.isAdmin && (
          <>
            <PublicEditComponent id={parsedId} />
            <AdminMenu />
          </>
        )}
      </div>
      {children}
    </div>
  );
}
