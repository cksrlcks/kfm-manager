import { PropsWithChildren } from "react";
import { SubNavItem } from "@/types";
import { Separator } from "../ui/separator";
import SubNavLink from "./SubNavLink";

export const SubLayout = ({ children }: PropsWithChildren) => {
  return <div className="space-y-4">{children}</div>;
};

type NavProps = {
  menus: SubNavItem[];
};

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="space-y-1">
      {children}
      <Separator className="my-4 md:my-8" />
    </header>
  );
};

const Title = ({ children }: PropsWithChildren) => {
  return (
    <h1 className="text-lg font-bold tracking-tight md:text-xl">{children}</h1>
  );
};

const Description = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-muted-foreground text-sm md:text-base">{children}</p>
  );
};

const Body = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex flex-1 flex-col space-y-2 md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12">
      {children}
    </div>
  );
};

const Nav = ({ menus }: NavProps) => {
  return (
    <aside className="mb-8 md:mb-0 lg:w-1/5">
      <nav>
        <ul className="flex w-full flex-col gap-1">
          {menus.map((item) => {
            return (
              <li key={item.path}>
                <SubNavLink item={item} />
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

const Content = ({ children }: PropsWithChildren) => {
  return <div className="w-full">{children}</div>;
};

SubLayout.Header = Header;
SubLayout.Title = Title;
SubLayout.Description = Description;
SubLayout.Body = Body;
SubLayout.Nav = Nav;
SubLayout.Content = Content;

export default SubLayout;
