import { PropsWithChildren } from "react";
import { Separator } from "@/components/ui/separator";

const AuthForm = ({ children }: PropsWithChildren) => {
  return <div className="flex w-full max-w-lg flex-col gap-6">{children}</div>;
};

const AuthHeader = ({ children }: PropsWithChildren) => {
  return <div className="space-y-2 text-center">{children}</div>;
};

const AuthTitle = ({ children }: PropsWithChildren) => {
  return <h1 className="text-xl font-bold">{children}</h1>;
};

const AuthDescription = ({ children }: PropsWithChildren) => {
  return (
    <p className="text-muted-foreground text-sm text-balance">{children}</p>
  );
};

const AuthBody = ({ children }: PropsWithChildren) => {
  return <div className="grid gap-6">{children}</div>;
};

const AuthFooter = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Separator />
      <div className="text-center text-sm">{children}</div>
    </>
  );
};

AuthForm.Header = AuthHeader;
AuthForm.Title = AuthTitle;
AuthForm.Description = AuthDescription;
AuthForm.Body = AuthBody;
AuthForm.Footer = AuthFooter;

export default AuthForm;
