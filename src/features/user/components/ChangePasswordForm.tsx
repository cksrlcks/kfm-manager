"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { changePasswordForm, changePasswordSchema } from "../type";

export default function ChangePasswordForm() {
  const router = useRouter();
  const form = useForm<changePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "all",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await authClient.changePassword({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
      fetchOptions: {
        onSuccess: () => {
          toast.success("비밀번호가 수정 되었습니다.");
          form.reset();
          router.push("/mypage");
        },
        onError: (error) => {
          console.log("Error updating user:", error);
          toast.error("비밀번호 업데이트 중 오류가 발생했습니다.");
        },
      },
    });
  });

  const isDisabledSubmit =
    !form.formState.isValid || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6 py-2">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이전 비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새 비밀번호</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>새 비밀번호 확인</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isDisabledSubmit}>
          저장
        </Button>
      </form>
    </Form>
  );
}
