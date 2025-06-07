"use client";

import { KeyboardEvent, useRef, useTransition } from "react";
import { Loader2Icon } from "lucide-react";
import { useFilters } from "@/components/FilterProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Searchbar() {
  const [isPending, startTransition] = useTransition();
  const { filters, updateFilters } = useFilters();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;

    e.preventDefault();

    const keyword = (e.target as HTMLInputElement).value;
    const trimmedKeyword = keyword.trim();

    startTransition(() => {
      updateFilters({ keyword: trimmedKeyword });
    });
  };

  const handleSearch = () => {
    const keyword = inputRef.current?.value.trim();

    startTransition(() => {
      updateFilters({ keyword });
    });
  };

  return (
    <div className="flex w-full max-w-sm items-center gap-2">
      <Input
        placeholder="검색어를 입력해주세요 (견적번호, 회사이름)"
        ref={inputRef}
        defaultValue={filters?.keyword}
        onKeyDown={handleKeyDown}
      />
      <Button variant="outline" className="w-14" onClick={handleSearch}>
        {isPending ? <Loader2Icon className="animate-spin" /> : "검색"}
      </Button>
    </div>
  );
}
