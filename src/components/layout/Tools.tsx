import { CircleGauge } from "lucide-react";
import PressureConvertorDialog from "../PressureConvertorDialog";

export default function Tools() {
  return (
    <ul className="flex items-center gap-2">
      <li>
        <PressureConvertorDialog>
          <button className="text-muted-foreground flex w-16 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm tracking-tight hover:border-slate-100">
            <CircleGauge size={18} className="mb-1" />
            <span className="text-xs font-medium">압력 단위</span>
          </button>
        </PressureConvertorDialog>
      </li>
    </ul>
  );
}
