import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
    <main className="w-screen min-h-screen flex items-center justify-center bg-black">
      <ClerkProvider>
        {children}
      </ClerkProvider>
    </main>
  )
}