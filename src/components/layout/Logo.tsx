import Image from "next/image";
import logo from "@/assets/images/logo.svg";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src={logo}
      alt="KFM Blower Manager"
      className={cn("h-[18px] w-auto", className)}
    />
  );
}
