import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { quotations } from "@/db/schema";
import { Quotation, QuotationForm } from "../type";

dayjs.extend(utc);
dayjs.extend(timezone);

function generateQuotNo() {
  return Number(dayjs().tz("Asia/Seoul").format("YYYYMMDD"));
}

export const addQuotation = async (data: QuotationForm) => {
  const quot_no = generateQuotNo();

  return await db
    .insert(quotations)
    .values({ ...data, quot_no })
    .returning({ id: quotations.id });
};

export const updateQuotation = async (
  id: Quotation["id"],
  data: QuotationForm,
) => {
  return await db
    .update(quotations)
    .set(data)
    .where(eq(quotations.id, id))
    .returning({ id: quotations.id });
};
