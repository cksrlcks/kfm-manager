import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <div className={cn("font-bold", className)}>
      KFM Blower <span className="text-muted-foreground pl-1">Manager</span>
    </div>
  );
}
