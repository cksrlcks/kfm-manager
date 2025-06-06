import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "@/db/schema";

export const userSchema = createInsertSchema(user)
  .pick({
    id: true,
    email: true,
    name: true,
    role: true,
    contact: true,
    confirmed: true,
  })
  .extend({
    contact: z
      .string()
      .optional()
      .refine((value) => !value || /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(value), {
        message: "유효하지 않은 연락처 형식입니다.",
      }),
  });

export type UserForm = z.infer<typeof userSchema>;
