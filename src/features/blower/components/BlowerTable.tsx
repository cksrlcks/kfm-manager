"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BLOWER_DATA } from "@/constants/diameter";

export default function BlowerTable() {
  const [condition, setCondition] = useState<{
    type: string;
    p: string | undefined;
    q: number | undefined;
    s: number | undefined;
  }>({
    type: "P_SL",
    p: "",
    q: 0,
    s: 5,
  });

  useEffect(() => {
    setCondition((prev) => ({
      ...prev,
      p: "",
      q: 0,
      s: 5,
    }));
  }, [condition.type]);

  const HEADER_DATA = BLOWER_DATA[condition.type].pressure;
  const ROW_DATA = BLOWER_DATA[condition.type].data;

  return (
    <>
      <div className="mb-4 border-b pb-4">
        <div className="flex max-w-3xl gap-6">
          <div className="flex-1 space-y-2">
            <Label className="flex items-center gap-1">
              블로워 타입
              <span className="text-xs">(blower)</span>
            </Label>
            <Select
              value={condition.type}
              onValueChange={(value) =>
                setCondition({ ...condition, type: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="블로워 타입을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="P_SL">압송식 블로워 (SL)</SelectItem>
                <SelectItem value="V_SL">진공식 블로워 (SL)</SelectItem>
                <SelectItem value="P">압송식 블로워</SelectItem>
                <SelectItem value="V">진공식 블로워</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 space-y-2">
            <Label className="gap-1s flex items-center">
              압력
              <span className="text-xs">
                ({BLOWER_DATA[condition.type].unit.pressure})
              </span>
            </Label>
            <Select
              value={condition.p}
              onValueChange={(value) =>
                setCondition({ ...condition, p: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="압력을 선택해주세요" />
              </SelectTrigger>
              <SelectContent>
                {HEADER_DATA.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item} {BLOWER_DATA[condition.type].unit.pressure}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 space-y-2">
            <Label className="flex items-center gap-1">
              흡입풍량
              <span className="text-xs">
                ({BLOWER_DATA[condition.type].unit.suctionFlow})
              </span>
            </Label>
            <Input
              type="number"
              value={condition.q}
              onChange={(e) => {
                const value = e.target.value;
                setCondition({
                  ...condition,
                  q: value === "" ? undefined : Number(value),
                });
              }}
            />
          </div>
          <div className="flex-1 space-y-2">
            <Label className="flex items-center gap-1">
              허용치 <span className="text-xs">(+/-)</span>
            </Label>
            <Input
              type="number"
              value={condition.s ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                setCondition({
                  ...condition,
                  s: value === "" ? undefined : Number(value),
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="blower-table">
        <table>
          <colgroup>
            <col style={{ width: "50px" }} />
            <col style={{ width: "50px" }} />
            {[...Array(HEADER_DATA.length * 3)].map((_, index) => (
              <col key={index} style={{ width: "60px" }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th rowSpan={3}>
                구경
                <br />
                (mm)
              </th>
              <th rowSpan={3}>
                회전수
                <br />
                (rpm)
              </th>
              <th colSpan={HEADER_DATA.length * 3}>
                {BLOWER_DATA[condition.type].title}
              </th>
            </tr>
            <tr>
              {HEADER_DATA.map((pressure, index) => (
                <th key={index} colSpan={3}>
                  {pressure} {BLOWER_DATA[condition.type].unit.pressure}
                </th>
              ))}
            </tr>
            <tr>
              {HEADER_DATA.map((_, index) => (
                <React.Fragment key={index}>
                  <th>
                    Qs
                    <br />
                    <span className="text-[10px]">
                      ({BLOWER_DATA[condition.type].unit.suctionFlow})
                    </span>
                  </th>
                  <th>
                    La
                    <br />
                    <span className="text-[10px]">
                      ({BLOWER_DATA[condition.type].unit.shaftPower})
                    </span>
                  </th>
                  <th>
                    Motor
                    <br />
                    <span className="text-[10px]">
                      ({BLOWER_DATA[condition.type].unit.motorPower})
                    </span>
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROW_DATA.map((row, index) => (
              <tr key={index}>
                {row.map((item, itemIndex) => {
                  const targetPressure =
                    itemIndex > 1
                      ? HEADER_DATA[Math.floor((itemIndex - 2) / 3)]
                      : undefined;

                  const familyQ =
                    itemIndex > 1
                      ? row[2 + Math.floor((itemIndex - 2) / 3) * 3]
                      : undefined;

                  const selected =
                    item &&
                    targetPressure &&
                    condition.p == targetPressure &&
                    Number(familyQ) <=
                      Number(condition.q) + (condition.s ?? 0) &&
                    Number(familyQ) >= Number(condition.q) - (condition.s ?? 0);

                  return (
                    <td
                      key={itemIndex}
                      data-selected={selected}
                      data-q={familyQ}
                      data-target-pressure={
                        itemIndex > 1
                          ? HEADER_DATA[Math.floor((itemIndex - 2) / 3)]
                          : undefined
                      }
                    >
                      {item || null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
