"use client";

import { PropsWithChildren, useState } from "react";
import { ArrowRightLeft, Equal } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const PRESSURE_TABLE = {
  atm: 1,
  Pa: 101325,
  hPa: 1013.25,
  kPa: 101.325,
  MPa: 0.101325,
  dynecm2: 1013250,
  mb: 1013.25,
  bar: 1.01325,
  kgfcm2: 1.033227,
  psi: 14.696,
  mmHg: 760,
  inHg: 29.92126,
  mmH2O: 10332.275,
  inchH2O: 406.782188,
} as const;

type Unit = keyof typeof PRESSURE_TABLE;

const unitLabels: Record<Unit, string> = {
  atm: "기압 (atm)",
  Pa: "파스칼 (Pa)",
  hPa: "헥토파스칼 (hPa)",
  kPa: "킬로파스칼 (kPa)",
  MPa: "메가파스칼 (MPa)",
  dynecm2: "dyne/cm²",
  mb: "밀리바 (mb)",
  bar: "바 (bar)",
  kgfcm2: "kgf/cm²",
  psi: "프사이 (psi)",
  mmHg: "수은주밀리미터 (mmHg)",
  inHg: "inchHg",
  mmH2O: "수주밀리미터 (mmH₂O)",
  inchH2O: "inchH₂O",
};

const MAXIMUM_FRACTION_DIGITS = 6;

function convertPressure(value: number, from: Unit, to: Unit) {
  const atmValue = value / PRESSURE_TABLE[from];
  return atmValue * PRESSURE_TABLE[to];
}

function formatFractionDigits(value: number, digit: number = 3) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: digit,
  });
}

function PressureConvertor() {
  const [value, setValue] = useState(1);
  const [from, setFrom] = useState<Unit>("atm");
  const [to, setTo] = useState<Unit>("atm");

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const converted = convertPressure(value, from, to);

  return (
    <div className="space-y-4">
      <div className="bg-muted space-y-2 rounded-md p-3">
        <div className="flex items-center gap-2">
          <Select
            value={from}
            onValueChange={(value) => setFrom(value as Unit)}
          >
            <SelectTrigger className="bg-background w-full flex-1">
              <SelectValue placeholder="단위 선택" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(PRESSURE_TABLE).map((unit) => (
                <SelectItem
                  key={unit}
                  value={unit}
                  onClick={() => setFrom(unit as Unit)}
                >
                  {unitLabels[unit as Unit]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSwap} size="icon" variant="outline">
            <ArrowRightLeft />
          </Button>
          <Select value={to} onValueChange={(value) => setTo(value as Unit)}>
            <SelectTrigger className="bg-background w-full flex-1">
              <SelectValue placeholder="단위 선택" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(PRESSURE_TABLE).map((unit) => (
                <SelectItem
                  key={unit}
                  value={unit}
                  onClick={() => setTo(unit as Unit)}
                >
                  {unitLabels[unit as Unit]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-background flex h-9 flex-1 items-center justify-end gap-2 rounded-md border px-3 py-2 text-sm">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(parseFloat(e.target.value))}
              className="text-right font-semibold"
            />
            <span>{from}</span>
          </div>
          <div className="flex items-center">
            <Equal size={14} />
          </div>
          <div className="bg-background flex h-9 flex-1 items-center gap-2 rounded-md border px-3 py-2 text-sm">
            <span className="font-semibold text-orange-500">
              {Number.isNaN(converted)
                ? "-"
                : formatFractionDigits(converted, MAXIMUM_FRACTION_DIGITS)}
            </span>
            <span>{to}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        {Object.keys(PRESSURE_TABLE).map((unit) => (
          <div
            key={unit}
            className="flex justify-between border-b py-1 last:border-none nth-last-[2]:border-none"
          >
            <span className="font-semibold text-orange-500">
              {formatFractionDigits(
                convertPressure(value, from, unit as Unit),
                MAXIMUM_FRACTION_DIGITS,
              )}
            </span>
            <span className="text-gray-600">{unitLabels[unit as Unit]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PressureConvertorDialog({
  children,
}: PropsWithChildren) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>압력 단위 변환</DialogTitle>
          <DialogDescription>
            원하는 단위를 선택하고 값을 입력하면 자동으로 변환됩니다.
          </DialogDescription>
        </DialogHeader>
        <PressureConvertor />
      </DialogContent>
    </Dialog>
  );
}
