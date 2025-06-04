import { PropsWithChildren } from "react";

const SubHeader = ({ children }: PropsWithChildren) => {
  return <div className="mb-10 space-y-1">{children}</div>;
};

const Title = ({ children }: PropsWithChildren) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

const Description = ({ children }: PropsWithChildren) => {
  return <p className="text-muted-foreground text-sm">{children}</p>;
};

SubHeader.Title = Title;
SubHeader.Description = Description;

export default SubHeader;
