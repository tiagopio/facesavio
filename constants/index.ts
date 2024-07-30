import { Heart, MessageSquare, Plus, Search, UserRound } from "lucide-react";

export const sidebarLinks = [
  {
    icon: MessageSquare,
    route: "/",
    label: "Página Inicial",
  },
  {
    icon: Search,
    route: "/search",
    label: "Explorar",
  },
  {
    icon: Heart,
    route: "/activity",
    label: "Notificações",
  },
  {
    icon: Plus,
    route: "/?create-post=true",
    label: "Novo Post",
  },
  {
    icon: UserRound,
    route: "/profile",
    label: "Perfil",
  },
];