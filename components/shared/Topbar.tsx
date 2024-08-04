import { OrganizationSwitcher, SignOutButton, SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { dark } from "@clerk/themes";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { initials } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { UserRepository } from "@/repository/user";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

async function Topbar() {
  const clerk = await currentUser();
  if (!clerk) return notFound();

  const userRepo = new UserRepository({ clerkId: clerk.id });
  const user = await userRepo.getUser();
  if (!user) return notFound();

  return (
    <nav className="topbar md:px-10 px-7">
      <Link href="/" className="flex items-center gap-2 py-3">
        {/* <Image src={"/assets/logo.svg"} alt="logo" width={50} height={50} /> */}
        <Image src={"/assets/facesavio.png"} alt="logo" width={150} height={40} />
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/profile/${user.username}`}>
              <Avatar className="w-7 h-7 border">
                <AvatarImage src={user.imageUrl ?? ""} alt={user.name} />
                <AvatarFallback>{initials(user.name || user.username)}</AvatarFallback>
              </Avatar>
            </Link>
          </TooltipTrigger>
          <TooltipContent>{user.name}</TooltipContent>
        </Tooltip>
      </div>
    </nav>
  )
}

export default Topbar;
