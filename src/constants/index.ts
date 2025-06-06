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
  {
    label: "블로워",
    path: "/blower",
    icon: "DraftingCompass",
  },
  {
    label: "문의 관리",
    path: "/inquiry",
    icon: "Mail",
  },
];

export const USERS_SUB_MENUS: SubNavItem[] = [
  {
    label: "회원 목록",
    path: "/users/list",
  },
];

export const INQUIRY_SUB_MENUS: SubNavItem[] = [
  {
    label: "kfmblower 문의",
    path: "/inquiry/kfmblower",
  },
  {
    label: "kfmbusan 문의",
    path: "/inquiry/kfmbusan",
  },
];

export const SITE_LISTS = [
  {
    label: "다음",
    url: "https://www.daum.net/",
  },
  {
    label: "한국유체기계 웹하드",
    url: "http://kfmblower.iptime.org:5000/#/signin",
  },
  {
    label: "한국유체기계 주문서",
    url: "https://c-portal.ecount.com/",
  },
  {
    label: "국세청",
    url: "https://hometax.go.kr/",
  },
  {
    label: "엔투비",
    url: "https://mro.entob.com/",
  },
  {
    label: "국민은행",
    url: "https://www.kbstar.com/",
  },
  {
    label: "기업은행",
    url: "https://kiup.ibk.co.kr/",
  },
  {
    label: "웹팩스",
    url: "https://webfax.uplus.co.kr/",
  },
  {
    label: "SGI서울보증",
    url: "https://www.sgic.co.kr/",
  },
  {
    label: "압력 단위",
    url: "https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=KPA&oquery=KPA&tqi=TG91pspVuE8ssbAZDSwssssstXs-057705",
  },
  {
    label: "법원경매정보",
    url: "https://www.courtauction.go.kr/pgj/index.on?w2xPath=/pgj/ui/pgj100/PGJ151F00.xml",
  },
];
