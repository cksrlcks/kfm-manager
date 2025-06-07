import { unstable_cache } from "next/cache";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { count, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "@/db";
import { quotations, user } from "@/db/schema";
import { BaseFilter } from "@/types";
import { Quotation, QuotationForm } from "../type";

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

export const getDefaultSettings = unstable_cache(
  async () => {
    //todo : db에서 가져오기
    const defaultSettings = {
      symbols: [
        "*",
        "㎥",
        "MIN",
        "KG",
        "㎠",
        "mmAq",
        "KW",
        "HZ",
        "Ø",
        "V",
        "SL*㎥/MIN*0.KG/㎠(00mmAq)",
        "WITH STANDARD ACCESSORY",
        "HIGEN*TEFC*KW*60HZ*4P*380V",
      ],
      payment_term: "현금",
      delivery_term: 30,
      delivery_condition: "지정상차도",
      price_valid: 30,
    };

    const displayedEmployees = await db.query.user.findMany({
      where: eq(user.display, true),
      columns: {
        id: true,
        name: true,
        position: true,
      },
    });

    return {
      defaultSettings,
      employees: displayedEmployees,
    };
  },
  ["default-settings"],
  {
    tags: ["users"],
  },
);

export const removeQuotation = async (id: Quotation["id"]) => {
  return await db.delete(quotations).where(eq(quotations.id, id));
};
