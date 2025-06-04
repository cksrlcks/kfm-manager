import { Loader2Icon } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex h-12 items-center justify-center opacity-40">
      <Loader2Icon className="animate-spin" />
    </div>
  );
}
