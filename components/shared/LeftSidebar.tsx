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

  return (
    <section className="leftsidebar custom-scrollbar pl-10">
      <div className="flex flex-col lg:min-w-[300px] w-min">
        {sidebarLinks.map((link, idx) => {
          const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          const isFirst = idx === 0;
          const isLast = idx === sidebarLinks.length - 1;

          let href = link.route;
          const Icon = link.icon
          return (
            <Link
              href={href}
              key={link.label}
              data-active={isActive}
              data-order={isFirst ? "first" : isLast ? "last" : "middle"}
              className={"flex data-[order=middle]:border-t-0 data-[order=last]:border-t-0 data-[order=first]:rounded-t-xl data-[order=last]:rounded-b-xl gap-2 p-5 hover:bg-slate-50 text-sm items-center bg-white border data-[active=true]:fill-white data-[active=true]:text-white data-[active=true]:bg-gradient-to-r from-main-primary to-main-secondary"}
            >
              <Icon className="w-4 h-4" />
              <p className="text-[inherit] font-medium max-lg:hidden">{link.label}</p>
            </Link>
          )})}
      </div>

      <div className="lg:min-w-[300px]">
        <SignedIn>
              <SignOutButton>
                <div className="flex cursor-pointer gap-2 p-5 bg-white items-center border rounded-xl hover:bg-slate-50">
                  <Image
                    src="/assets/logout.svg"
                    alt="logout"
                    width={16}
                    height={16}
                  />

                  <p className="text-[inherit] font-medium text-sm max-lg:hidden">Sair</p>
                </div>
              </SignOutButton>
            </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar;
