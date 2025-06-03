import { NavItem, SubNavItem } from "@/types";

export const ROOT_MENUS: NavItem[] = [
  {
    label: "대시보드",
    path: "/dashboard",
    icon: "layout-dashboard",
  },
  {
    label: "내정보",
    path: "/mypage",
    icon: "settings",
  },
  {
    label: "견적서",
    path: "/quotation",
    icon: "scroll-text",
  },
  {
    label: "회원 관리",
    path: "/users",
    icon: "user",
  },
];

export const USERS_SUB_MENUS: SubNavItem[] = [
  {
    label: "회원 목록",
    path: "/users/list",
  },
];
