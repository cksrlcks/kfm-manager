"use client";

import { useFilters } from "@/components/FilterProvider";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Quotation } from "../type";
import QuotationItem from "./QuotationItem";

type QuotationListProps = {
  quotations: Quotation[];
};

export default function QuotationList({ quotations }: QuotationListProps) {
  const { isPending } = useFilters();

  if (isPending) {
    return <LoadingSpinner />;
  }

  if (quotations.length === 0) {
    return (
      <div className="text-muted-foreground px-4 py-10 text-center text-sm">
        작성된 견적서가 없습니다.
      </div>
    );
  }

  return (
    <div className="mb-8 space-y-3">
      {quotations.map((quotation) => (
        <QuotationItem key={quotation.id} quotation={quotation} />
      ))}
    </div>
  );
}
