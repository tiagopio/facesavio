import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Image from "next/image";

export const metadata = {
  title: 'FaceSavio',
  description: 'Trabalho de POO'
}

export default function AuthLayout({ 
  children 
}: { children: React.ReactNode 
}) {
  if (auth().sessionClaims?.metadata.onboardingComplete === true) {
    redirect("/");
  }
  
  return (
    <main className="w-screen min-h-screen flex items-center flex-col gap-10 justify-center bg-gray-1">
      <Image src="/assets/facesavio.png" width={200} height={200} alt="facesavio-logo" />
      <ClerkProvider>
        {children}
      </ClerkProvider>
    </main>
  )
}