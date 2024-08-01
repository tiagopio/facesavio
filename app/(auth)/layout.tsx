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
  return (
    <main className="w-screen min-h-screen flex items-center flex-col gap-10 justify-center bg-gray-1">
      <ClerkProvider>
        {children}
      </ClerkProvider>
    </main>
  )
}