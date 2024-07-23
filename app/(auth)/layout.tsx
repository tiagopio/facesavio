import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: 'FaceSavio',
  description: 'Trabalho de POO'
}

export default function AuthLayout({ 
  children 
}: { children: React.ReactNode 
}) {
  return (
    <main className="w-screen min-h-screen flex items-center justify-center bg-black">
      <ClerkProvider>
        {children}
      </ClerkProvider>
    </main>
  )
}