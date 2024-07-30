import AccountProfile from "@/components/forms/AccountProfile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { ClipboardCheck } from "lucide-react";
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
    <Card>
      <CardHeader>
        <CardTitle>
          <ClipboardCheck />
          Onboarding
        </CardTitle>
        <CardDescription>
          Precisamos de algumas informações para completar seu perfil
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AccountProfile
          user={initialData}
          btnTitle="Continuar"
        />
      </CardContent>
    </Card>
  )
}