import { currentUser } from "@clerk/nextjs/server";

import { fetchUser, getUserByClerkId } from "@/lib/db/server";
import AccountProfile from "@/components/forms/AccountProfile";

export async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await getUserByClerkId({ clerkId: user.id });
  if (!userInfo) return null;

  const userData = {
    id: user.id,
    objectId: userInfo.id,
    username: user.username ?? userInfo.username,
    name: userInfo.name ?? user.firstName ?? "",
    bio: userInfo.bio,
    image: userInfo.imageUrl || user.imageUrl,
  };

  return (
    <>
      <h1 className='head-text'>Edit Profile</h1>
      <p className='mt-3 text-base-regular text-light-2'>Make any changes</p>

      <section className='mt-12'>
        <AccountProfile user={userData} btnTitle='Continue' />
      </section>
    </>
  );
}

export default Page;