import { authOptions } from "@/authoptions";
import EditUserForm from "@/components/EditUserForm";
import { getUserByEmail, getUserById } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { profileId: string } }) => {
  const session = await getServerSession(authOptions);

  const userIdValue = await getUserByEmail(session?.user?.email!);

  if (!session) return redirect("/");

  const parsedId = String(userIdValue._id);

  const userInfo = await getUserById(params.profileId);

  return (
    <>
      <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl font-bold">
        {session.user?.name}
        {"'s "}
        <span className="text-gray-950 font-semibold">Profile</span>
      </h1>

      <div className="flex flex-col items-center justify-between gap-6">
        <EditUserForm
          id={params.profileId}
          parsedId={parsedId}
          isAdmin={userIdValue.isAdmin}
          isCurrentUserAdmin={userInfo.isAdmin}
          name={userInfo?.name}
          email={userInfo.email!}
          image={userInfo.image!}
          phoneNumber={userInfo.phoneNumber}
          address={userInfo.address}
          postalCode={userInfo.postalCode}
          city={userInfo.city}
          country={userInfo.country}
        />
      </div>
    </>
  );
};

export default Page;
