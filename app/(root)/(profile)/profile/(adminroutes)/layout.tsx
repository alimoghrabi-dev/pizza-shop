import { authOptions } from "@/authoptions";
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

  if (!userInfo.isAdmin) {
    return redirect("/");
  }

  return <div className="w-full mx-auto">{children}</div>;
}
