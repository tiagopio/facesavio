"use client"

import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { isSignedIn, user } = useUser();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-8">
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          if (link.route === "/profile" && user?.username) link.route = `${link.route}/${user?.username}`

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && 'bg-main-secondary'}`}
            >
              <Image 
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
  
              <p className="text-main-text font-medium max-lg:hidden">{link.label}</p>
            </Link>
          )})}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
              <SignOutButton signOutCallback = {() => router.push('/sign-in')}>
                <div className="flex cursor-pointer gap-4 p-4">
                  <Image
                    src="/assets/logout.svg"
                    alt="logout"
                    width={24}
                    height={24}
                  />

                  <p className="text-main-text max-lg:hidden">Logout</p>
                </div>
              </SignOutButton>
            </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar;
