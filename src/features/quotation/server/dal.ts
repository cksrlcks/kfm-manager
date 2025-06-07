import { unstable_cache } from "next/cache";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { count, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { quotationDefaultSettings, quotations, user } from "@/db/schema";
import { BaseFilter } from "@/types";
import { Quotation, QuotationDefaultSettingForm, QuotationForm } from "../type";

dayjs.extend(utc);
dayjs.extend(timezone);

const generateQuotNo = () => {
  return Number(dayjs().tz("Asia/Seoul").format("YYYYMMDD"));
};

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

export const getQuotations = unstable_cache(
  async (params: BaseFilter) => {
    const { page = 1, limit = 10, keyword } = params;
    const condition = keyword
      ? or(
          ilike(quotations.company_name, `%${keyword}%`),
          ilike(sql`CAST(${quotations.quot_no} AS TEXT)`, `%${keyword}%`),
        )
      : undefined;

    const data = await db.query.quotations.findMany({
      orderBy: (quotations, { desc }) => [desc(quotations.created_at)],
      where: condition,
      limit: limit,
      offset: (page - 1) * limit,
    });

    const [totalCount] = await db
      .select({ count: count() })
      .from(quotations)
      .where(condition);

    return {
      items: data as Quotation[],
      total: totalCount.count,
    };
  },
  ["quotation"],
  {
    tags: ["quotation"],
  },
);

export const getQuotation = unstable_cache(
  async (id: Quotation["id"]) => {
    return (await db.query.quotations.findFirst({
      where: eq(quotations.id, id),
    })) as Quotation;
  },
  ["quotation"],
  {
    tags: ["quotation"],
  },
);

export const removeQuotation = async (id: Quotation["id"]) => {
  return await db.delete(quotations).where(eq(quotations.id, id));
};

export const getDefaultSetting = unstable_cache(
  async () => {
    return await db.query.quotationDefaultSettings.findFirst({
      where: eq(quotationDefaultSettings.id, 1),
    });
  },
  ["default-setting"],
  {
    tags: ["default-setting"],
  },
);

export const getEmployees = unstable_cache(
  async () => {
    return await db.query.user.findMany({
      where: eq(user.display, true),
      columns: {
        id: true,
        name: true,
        position: true,
      },
    });
  },
  ["employees"],
  {
    tags: ["users"],
  },
);

export const updateDefaultSettings = async (
  data: QuotationDefaultSettingForm,
) => {
  const existing = await db.query.quotationDefaultSettings.findFirst({
    where: (fields) => eq(fields.id, 1),
  });

  if (existing) {
    return await db
      .update(quotationDefaultSettings)
      .set(data)
      .where(eq(quotationDefaultSettings.id, 1));
  } else {
    return await db.insert(quotationDefaultSettings).values({
      ...data,
      id: 1,
    });
  }
};
