import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { ACCESSORY } from "@/constants/quotation";
import { quotations } from "@/db/schema";

export const productItemSchema = z.object({
  description: z.string(),
  quantity: z.coerce.number().optional(),
  unit_price: z.coerce.number().optional(),
});

export const categorySchema = z.object({
  category_name: z.string(),
  category_items: z.array(productItemSchema).optional(),
});

export const quotation = createSelectSchema(quotations).extend({
  remarks: z
    .object({
      tax: z.boolean(),
      transportation: z.boolean(),
    })
    .optional(),
  accessory: z.object(
    Object.fromEntries(ACCESSORY.map((item) => [item.name, z.boolean()])),
  ),
  category: z.array(categorySchema),
});

export const quotationSchema = createInsertSchema(quotations).extend({
  company_name: z.string().nonempty(),
  quotation_amount: z.coerce.number().optional(),
  delivery_term: z.coerce.number().optional(),
  price_valid: z.coerce.number().optional(),
  remarks: z
    .object({
      tax: z.boolean(),
      transportation: z.boolean(),
    })
    .optional(),
  accessory: z.object(
    Object.fromEntries(ACCESSORY.map((item) => [item.name, z.boolean()])),
  ),
  category: z.array(categorySchema),
});

export type Quotation = z.infer<typeof quotation>;
export type QuotationForm = z.infer<typeof quotationSchema>;
