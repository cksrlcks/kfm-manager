import { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return <div className="mx-auto max-w-screen-2xl px-8 py-6">{children}</div>;
};

const Header = ({ children }: PropsWithChildren) => {
  return <header className="mb-10">{children}</header>;
};

const HeaderTop = ({ children }: PropsWithChildren) => {
  return (
    <div className="mb-2 flex h-9 items-center justify-between border-b border-slate-100 pb-4">
      {children}
    </div>
  );
};

const HeaderBottom = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const Body = ({ children }: PropsWithChildren) => {
  return <main>{children}</main>;
};

RootLayout.Header = Header;
RootLayout.HeaderTop = HeaderTop;
RootLayout.HeaderBottom = HeaderBottom;
RootLayout.Body = Body;

export default RootLayout;
