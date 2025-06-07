import { PropsWithChildren } from "react";

const Section = ({ children }: PropsWithChildren) => {
  return <div className="space-y-4">{children}</div>;
};

const Title = ({ children }: PropsWithChildren) => {
  return <h2 className="font-semibold">{children}</h2>;
};

const Content = ({ children }: PropsWithChildren) => {
  return <div className="space-y-3">{children}</div>;
};

Section.Title = Title;
Section.Content = Content;

export default Section;
