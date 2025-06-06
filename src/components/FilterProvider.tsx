"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useOptimistic,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { BaseFilter, baseFilterSchema } from "@/types";

type FilterContextType = {
  filters: BaseFilter | undefined;
  isPending: boolean;
  updateFilters: (_value: BaseFilter) => void;
};

export const FilterContext = createContext<FilterContextType | undefined>(
  undefined,
);

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
}

export default function FilterProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const safeParsed = baseFilterSchema.safeParse(
    Object.fromEntries(searchParams.entries()),
  );

  const filters: BaseFilter | undefined = safeParsed.success
    ? safeParsed.data
    : undefined;

  const [isPending, startTransition] = useTransition();
  const [optimisticFilters, setOptimisticFilters] = useOptimistic(
    filters,
    (prevState, newFilters: BaseFilter) => {
      return {
        ...prevState,
        ...newFilters,
      };
    },
  );

  function updateFilters(updates: Partial<typeof optimisticFilters>) {
    const newState = {
      ...optimisticFilters,
      ...updates,
    };
    const newSearchParams = new URLSearchParams();

    Object.entries(newState).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          newSearchParams.append(key, v);
        });
      } else if (value !== undefined) {
        newSearchParams.set(key, String(value));
      }
    });

    startTransition(() => {
      setOptimisticFilters(updates || {});
      router.push(`${pathname}?${newSearchParams}`);
    });
  }

  return (
    <FilterContext.Provider
      value={{ filters: optimisticFilters, isPending, updateFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
}
