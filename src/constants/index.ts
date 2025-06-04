import { NavItem, SubNavItem } from "@/types";

export const ROOT_MENUS: NavItem[] = [
  {
    label: "대시보드",
    path: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "내정보",
    path: "/mypage",
    icon: "Settings",
  },
  {
    label: "견적서",
    path: "/quotation",
    icon: "ScrollText",
  },
  {
    label: "회원 관리",
    path: "/users",
    icon: "User",
  },
];

export const USERS_SUB_MENUS: SubNavItem[] = [
  {
    label: "회원 목록",
    path: "/users/list",
  },
];
