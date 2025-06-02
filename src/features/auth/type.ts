import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "유효한 이메일 주소를 입력해주세요.",
  }),
  password: z.string().regex(/^(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: "비밀번호는 8자 이상이며, 특수문자를 포함해야 합니다.",
  }),
});

export const BaseSignupSchema = LoginSchema.extend({
  name: z
    .string()
    .trim()
    .min(2, { message: "사용자 이름은 최소 2자 이상이어야 합니다." }),
  passwordConfirm: z.string().regex(/^(?=.*[^A-Za-z0-9]).{8,}$/, {
    message: "비밀번호는 8자 이상이며, 특수문자를 포함해야 합니다.",
  }),
  contact: z
    .string()
    .optional()
    .refine((value) => !value || /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(value), {
      message: "유효하지 않은 연락처 형식입니다.",
    }),
});

export const SignupSchema = BaseSignupSchema.extend({
  password: BaseSignupSchema.shape.password,
}).refine((data) => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다.",
});

export const FindPasswordSchema = LoginSchema.pick({
  email: true,
});

export const ResetPasswordSchema = BaseSignupSchema.pick({
  password: true,
  passwordConfirm: true,
})
  .extend({
    token: z.string({ required_error: "토큰이 필요합니다." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "비밀번호가 일치하지 않습니다.",
  });

export type LoginForm = z.infer<typeof LoginSchema>;
export type SignupForm = z.infer<typeof SignupSchema>;
export type FindPasswordForm = z.infer<typeof FindPasswordSchema>;
export type ResetPasswordForm = z.infer<typeof ResetPasswordSchema>;
