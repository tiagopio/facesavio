"use client"

import { sidebarLinks } from "@/constants";
import { SignOutButton, SignedIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { UserRound } from "lucide-react";

function LeftSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const { isSignedIn, user } = useUser();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-5 pl-8 min-w-[250px]">
        {sidebarLinks.map((link) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          if (link.route === "/profile" && user?.username) link.route = `${link.route}/${user?.username}`

          const Icon = link.icon
          return (
            <Link
              href={link.route}
              key={link.label}
              data-active={isActive}
              className={"leftsidebar_link data-[active=true]:fill-white data-[active=true]:text-white data-[active=true]:bg-gradient-to-r from-main-primary to-main-secondary"}
            >
              <Icon />
              <p className="text-[inherit] font-medium max-lg:hidden">{link.label}</p>
            </Link>
          )})}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
              <SignOutButton>
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
