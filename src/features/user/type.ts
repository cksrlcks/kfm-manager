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
    position: true,
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

export const changePasswordSchema = z
  .object({
    currentPassword: z.string(),
    newPassword: z.string().regex(/^(?=.*[^A-Za-z0-9]).{8,}$/, {
      message: "비밀번호는 8자 이상이며, 특수문자를 포함해야 합니다.",
    }),
    confirmNewPassword: z.string().regex(/^(?=.*[^A-Za-z0-9]).{8,}$/, {
      message: "비밀번호는 8자 이상이며, 특수문자를 포함해야 합니다.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "새 비밀번호가 일치하지 않습니다.",
  });

export type changePasswordForm = z.infer<typeof changePasswordSchema>;
