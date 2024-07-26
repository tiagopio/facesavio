import { Heart, Home, Plus, Search, UserRound } from "lucide-react";

export const sidebarLinks = [
  {
    icon: Home,
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
    route: "/new-post",
    label: "New Post",
  },
  {
    icon: UserRound,
    route: "/profile",
    label: "Profile",
  },
];