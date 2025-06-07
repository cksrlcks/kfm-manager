"use server";

import { revalidateTag } from "next/cache";
import { auth } from "@/lib/auth";
import { ServerActionResult } from "@/types";
import {
  FindPasswordForm,
  FindPasswordSchema,
  LoginForm,
  LoginSchema,
  ResetPasswordForm,
  ResetPasswordSchema,
  SignupForm,
  SignupSchema,
} from "../type";

export const signupAction = async (
  data: SignupForm,
): Promise<ServerActionResult> => {
  const parsedData = SignupSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  try {
    await auth.api.signUpEmail({
      body: { ...parsedData.data, confirmed: false, display: false },
    });

    revalidateTag("user");

    return {
      success: true,
      message: "회원가입이 완료되었습니다.",
    };
  } catch (error) {
    console.error("회원가입 중 오류 발생:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "회원가입에 실패했습니다.",
    };
  }
};

export const signinAction = async (
  data: LoginForm,
): Promise<ServerActionResult> => {
  const parsedData = LoginSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  try {
    await auth.api.signInEmail({
      body: parsedData.data,
    });

    return {
      success: true,
      message: "로그인이 완료되었습니다.",
    };
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "로그인에 실패했습니다.",
    };
  }
};

export const forgetPasswordAction = async (
  data: FindPasswordForm,
): Promise<ServerActionResult> => {
  const parsedData = FindPasswordSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  try {
    await auth.api.forgetPassword({
      body: { ...parsedData.data, redirectTo: "/reset-password" },
    });

    return {
      success: true,
      message: "비밀번호 재설정 이메일이 전송되었습니다.",
    };
  } catch (error) {
    console.error("비밀번호 재설정 이메일 전송 중 오류 발생:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "비밀번호 재설정 이메일 전송에 실패했습니다.",
    };
  }
};

export const resetPasswordAction = async (data: ResetPasswordForm) => {
  const parsedData = ResetPasswordSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      message: "입력필드를 다시 확인해주세요",
    };
  }

  try {
    await auth.api.resetPassword({
      body: {
        newPassword: parsedData.data.password,
        token: parsedData.data.token,
      },
    });

    return {
      success: true,
      message: "비밀번호가 성공적으로 재설정되었습니다. 다시 로그인해주세요",
    };
  } catch (error) {
    console.error("비밀번호 재설정 중 오류 발생:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "비밀번호 재설정에 실패했습니다.",
    };
  }
};
