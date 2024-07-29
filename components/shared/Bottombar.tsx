"use client"

import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

function Bottombar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
            const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
            const Icon = link.icon
            return (
              <Link
                href={link.route}
                key={link.label}
                data-active={isActive}
                className={`bottombar_link data-[active=true]:fill-white data-[active=true]:text-white data-[active=true]:bg-gradient-to-r from-main-primary to-main-secondary`}
              >
                <Icon />
                <p className="text-sm text-[inherit] max-sm:hidden">{link.label.split(/\s+./)[0]}</p>
              </Link>
            )})}
      </div>
    </section>
  )
}

export default Bottombar;