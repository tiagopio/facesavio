import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/db/server";
import { currentUser } from "@clerk/nextjs/server"

export default async function Page({ params: { username } }: { params: { username: string } }) {

  const user = await currentUser();
  const userInfo = await fetchUser(username);

  if (!user || !user.username || !userInfo) {
    return (
      <section className="text-white">
        User not found.
      </section>
    );
  }
  
  return (
    <section className="text-white">
      <ProfileHeader 
        authUserId={user.id}
        accountId={userInfo.clerkId}
        name={userInfo.username}
        username={userInfo.username}
        imageUrl={userInfo.imageUrl ?? ""}
        bio={userInfo.bio ?? ""}
      />
    </section>
  )
}
