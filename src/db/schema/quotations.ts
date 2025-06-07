import {
  pgTable,
  serial,
  integer,
  text,
  timestamp,
  jsonb,
  bigint,
} from "drizzle-orm/pg-core";

export const quotations = pgTable("quotation", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { mode: "string", withTimezone: true })
    .defaultNow()
    .notNull(),

  quot_no: bigint("quot_no", { mode: "number" }),
  ins_no: bigint("ins_no", { mode: "number" }),
  quotation_date: timestamp("quotation_date", {
    mode: "string",
    withTimezone: true,
  }),
  company_name: text("company_name").notNull(),
  quotation_amount: bigint("quotation_amount", { mode: "number" }),
  payment_term: text("payment_term"),
  delivery_term: integer("delivery_term"),
  delivery_condition: text("delivery_condition"),
  price_valid: integer("price_valid"),
  remarks: jsonb("remarks"),
  prepared: text("prepared"),
  accessory: jsonb("accessory"),
  category: jsonb("category"),
});
