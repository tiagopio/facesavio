import { HomeIcon } from "lucide-react"
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs/server";

export default async function Home() {
  return (
    <div className="text-main-text p-16 rounded-md bg-main-background">
      <div className="flex gap-2  items-center">
        <h1 className="text-heading1-bold">Finge que é um post</h1>
        
      </div>
    </div>
  );
}
