"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2Icon } from "lucide-react";
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
import { resetPasswordAction } from "../server/action";
import { ResetPasswordForm, ResetPasswordSchema } from "../type";

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "all",
    defaultValues: {
      password: "",
      passwordConfirm: "",
      token: searchParams.get("token") || "",
    },
  });
  const handleSubmit = form.handleSubmit(async (data) => {
    const response = await resetPasswordAction(data);

    if (response.success) {
      toast.success(response.message);
      router.replace("/login");
    } else {
      toast.error(response.message);
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* hidden input for prevent auto complete */}
        <input
          type="password"
          className="sr-only"
          autoComplete="new-password"
        />
        <input type="hidden" {...form.register("token")} />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호 확인</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "변경하기"
          )}
        </Button>
      </form>
    </Form>
  );
}
