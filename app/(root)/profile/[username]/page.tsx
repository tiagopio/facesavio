import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/db/server";
import { currentUser } from "@clerk/nextjs/server"

export default async function Page({ params }: { params: { username: string } }) {

  const user = await currentUser();

  if (!user || !user.username) {
    return (
      <section className="text-white">
        User not found.
      </section>
    );
  }

  const userInfo = await fetchUser(params?.username);
  
  return (
    <section className="text-white">
      <ProfileHeader 
        accountUsername={userInfo?.username}
        authUserUsername={user.username}
        name={userInfo?.username}
        username={userInfo?.username}
        imageUrl={userInfo?.imageUrl}
        bio={userInfo?.bio}
      />
    </section>
  )
}
