"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { User } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { UserForm, userSchema } from "../type";

type ProfileEditFormProps = {
  user: User;
};

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const form = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user.id,
      email: user.email,
      name: user.name,
      contact: user.contact || undefined,
    },
    mode: "all",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    await authClient.updateUser({
      contact: data.contact,
      name: data.name,
      fetchOptions: {
        onSuccess: () => {
          toast.success("사용자 정보가 업데이트 되었습니다.");
        },
        onError: (error) => {
          console.error("Error updating user:", error);
          toast.error("사용자 정보 업데이트 중 오류가 발생했습니다.");
        },
      },
    });
  });

  const isDisabledSubmit =
    !form.formState.isValid ||
    form.formState.isSubmitting ||
    !form.formState.isDirty;

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6 py-2">
        <input type="hidden" {...form.register("id")} />
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input type="email" {...field} readOnly disabled />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>연락처</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="연락처를 입력해주세요"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
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
