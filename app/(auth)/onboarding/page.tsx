import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await currentUser()
  if (!user)
    redirect("/sign-in")
  
  const initialData = {
    id: user.id,
    username: user.username,
    name: user.firstName || user.fullName,
    image: user.imageUrl,
    bio: "",
  }

  return (

    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-light-2">
        Complete your profile now to use the app
      </p>

      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile 
          user={initialData}
          btnTitle="Continue"
        />
      </section>
    </main>
  )
}