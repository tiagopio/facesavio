import { HomeIcon } from "lucide-react"
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  if (user?.privateMetadata?.onboarding !== "complete") {
    return redirect("/onboarding");
  }

  return (
    <div className="text-light-1">
      <div className="flex gap-2  items-center">
        <h1 className="text-heading1-bold">Home</h1>
        
      </div>
    </div>
  );
}
