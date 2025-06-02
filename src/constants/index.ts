import { LayoutDashboard, ScrollText, Settings, User } from "lucide-react";
import { NavItem } from "@/types";

export const MENUS: NavItem[] = [
  {
    label: "대시보드",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "내정보",
    path: "/mypage",
    icon: Settings,
  },
  {
    label: "견적서",
    path: "/quotation",
    icon: ScrollText,
  },
  {
    label: "회원 관리",
    path: "/users",
    icon: User,
  },
];
