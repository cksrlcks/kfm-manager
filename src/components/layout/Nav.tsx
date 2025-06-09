import { ROOT_MENUS } from "@/constants/nav";
import NavLink from "./NavLink";

export default function Nav() {
  return (
    <nav className="flex items-center justify-between">
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
