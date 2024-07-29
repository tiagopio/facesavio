import { Heart, MessageSquare, Plus, Search, UserRound } from "lucide-react";

export const sidebarLinks = [
  {
    icon: MessageSquare,
    route: "/",
    label: "Home",
  },
  {
    icon: Search,
    route: "/search",
    label: "Search",
  },
  {
    icon: Heart,
    route: "/activity",
    label: "Activity",
  },
  {
    icon: Plus,
    route: "/?create-post=true",
    label: "New Post",
  },
  {
    icon: UserRound,
    route: "/profile",
    label: "Profile",
  },
];