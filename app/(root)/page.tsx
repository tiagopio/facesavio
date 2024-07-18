import { HomeIcon } from "lucide-react"
import { db } from "@/lib/db";

export default async function Home() {
  const users = await db.user.findMany();

  return (
    <div className="text-light-1">
      <div className="flex gap-2  items-center">
        <h1 className="text-heading1-bold">Home</h1>
      </div>
    </div>
  );
}
