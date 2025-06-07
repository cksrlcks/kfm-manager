import { ROOT_MENUS } from "@/constants/nav";
import NavLink from "./NavLink";

export default function Nav() {
  return (
    <nav className="sticky:bg-red sticky top-0 z-50 flex items-center justify-between bg-white">
      <ul className="flex items-center gap-2">
        {ROOT_MENUS.map((item) => (
          <li key={item.path}>
            <NavLink item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
