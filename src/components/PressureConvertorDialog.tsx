"use client";

import { ChangeEvent, PropsWithChildren, useState } from "react";
import { ArrowRightLeft, Equal } from "lucide-react";
import { MAXIMUM_FRACTION_DIGITS, PRESSURE_TABLE } from "@/constants/pressure";
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

type Unit = keyof typeof PRESSURE_TABLE;

type ConvetorState = {
  value: number;
  from: Unit;
  to: Unit;
};

function convertPressure(value: number, from: Unit, to: Unit) {
  const atmValue = value / PRESSURE_TABLE[from].value;
  return atmValue * PRESSURE_TABLE[to].value;
}

function formatFractionDigits(value: number, digit: number = 3) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: digit,
  });
}

export default function PressureConvertorDialog({
  children,
}: PropsWithChildren) {
  const [state, setState] = useState<ConvetorState>({
    value: 1,
    from: "atm",
    to: "atm",
  });

  const handleSwap = () => {
    setState((prev) => ({
      ...prev,
      from: prev.to,
      to: prev.from,
    }));
  };

  const handleUnitSelectChange = (unit: string) => {
    setState((prev) => ({
      ...prev,
      from: unit as Unit,
    }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const parsed = parseFloat(e.target.value);

    if (!isNaN(parsed)) {
      setState((prev) => ({
        ...prev,
        value: parsed,
      }));
    }
  };

  const converted = convertPressure(state.value, state.from, state.to);

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
        <div className="space-y-4">
          <div className="bg-muted space-y-2 rounded-md p-3">
            <div className="flex items-center gap-2">
              <Select value={state.from} onValueChange={handleUnitSelectChange}>
                <SelectTrigger className="bg-background w-full flex-1">
                  <SelectValue placeholder="단위 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(PRESSURE_TABLE).map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {PRESSURE_TABLE[unit as Unit].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={handleSwap} size="icon" variant="outline">
                <ArrowRightLeft />
                <span className="sr-only">단위 전환</span>
              </Button>
              <Select value={state.to} onValueChange={handleUnitSelectChange}>
                <SelectTrigger className="bg-background w-full flex-1">
                  <SelectValue placeholder="단위 선택" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(PRESSURE_TABLE).map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {PRESSURE_TABLE[unit as Unit].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-background flex h-9 flex-1 items-center justify-end gap-2 rounded-md border px-3 py-2 text-sm">
                <input
                  type="text"
                  value={state.value}
                  onChange={handleInputChange}
                  className="text-right font-semibold"
                />
                <span>{state.from}</span>
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
                <span>{state.to}</span>
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
                    convertPressure(state.value, state.from, unit as Unit),
                    MAXIMUM_FRACTION_DIGITS,
                  )}
                </span>
                <span className="text-gray-600">
                  {PRESSURE_TABLE[unit as Unit].label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
