import { NavItem, SubNav } from "@/types";

export const ROOT_MENUS: NavItem[] = [
  {
    label: "대시보드",
    path: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "내정보",
    path: "/mypage/edit-profile",
    icon: "Settings",
  },
  {
    label: "견적서",
    path: "/quotation/list",
    icon: "ScrollText",
  },
  {
    label: "회원 관리",
    path: "/users/list",
    icon: "User",
  },
  {
    label: "블로워",
    path: "/blower",
    icon: "DraftingCompass",
  },
  {
    label: "문의 관리",
    path: "/inquiry/kfmblower",
    icon: "Mail",
  },
];

export const QUOTATION_SUB_MENUS: SubNav = {
  title: "견적서 관리",
  description:
    "견적서 관리 페이지입니다. 견적서를 확인하고 관리할 수 있습니다.",
  items: [
    {
      label: "견적서 목록",
      path: "/quotation/list",
    },
    {
      label: "견적서 작성",
      path: "/quotation/add",
    },
    {
      label: "견적서 설정",
      path: "/quotation/setting",
    },
  ],
};

export const USERS_SUB_MENUS: SubNav = {
  title: "회원 관리",
  description: "회원 관리 페이지입니다. 회원을 확인하고 관리할 수 있습니다.",
  items: [
    {
      label: "회원 목록",
      path: "/users/list",
    },
  ],
};

export const INQUIRY_SUB_MENUS: SubNav = {
  title: "문의 관리",
  description: "문의 관리 페이지입니다. 문의를 확인하고 관리할 수 있습니다.",
  items: [
    {
      label: "kfmblower 문의",
      path: "/inquiry/kfmblower",
    },
    {
      label: "kfmbusan 문의",
      path: "/inquiry/kfmbusan",
    },
  ],
};

export const MYPAGE_SUB_MENUS: SubNav = {
  title: "내 정보 관리",
  description: "내 정보를 확인하고 수정할 수 있습니다.",
  items: [
    {
      label: "내 정보 수정",
      path: "/mypage/edit-profile",
    },
    {
      label: "비밀번호 변경",
      path: "/mypage/change-password",
    },
  ],
};
