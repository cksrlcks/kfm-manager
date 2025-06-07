"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { updateDefaultSettingAction } from "../server/action";
import {
  QuotationDefaultSetting,
  QuotationDefaultSettingForm,
  quotationDefaultSettingsSchema,
} from "../type";
import Section from "./SettingSection";

type SettingFormProps = {
  defaultSetting?: QuotationDefaultSetting;
};

export default function SettingForm({ defaultSetting }: SettingFormProps) {
  const form = useForm<QuotationDefaultSettingForm>({
    resolver: zodResolver(quotationDefaultSettingsSchema),
    mode: "onSubmit",
    defaultValues: {
      symbols: defaultSetting?.symbols || "",
      payment_term: defaultSetting?.payment_term || "",
      delivery_term: defaultSetting?.delivery_term || 0,
      delivery_condition: defaultSetting?.delivery_condition || "",
      price_valid: defaultSetting?.price_valid || 0,
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    const result = await updateDefaultSettingAction(data);

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  });

  return (
    <Form {...form}>
      <FormMessage />
      <form onSubmit={handleSubmit} className="space-y-8">
        <Section>
          <Section.Title>기호모음</Section.Title>
          <Section.Content>
            <FormField
              control={form.control}
              name="symbols"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription>
                    쉼표로 구분하여 기호를 입력하세요. 예: &nbsp;A, B, C
                  </FormDescription>
                </FormItem>
              )}
            />
          </Section.Content>
        </Section>
        <Separator />
        <Section>
          <Section.Title>기본값 설정</Section.Title>
          <Section.Content>
            <FormField
              control={form.control}
              name="payment_term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>지불조건</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delivery_term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>제작기간</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || 0} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delivery_condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>인도조건</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price_valid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>유효기간</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} value={field.value || 0} />
                  </FormControl>
                </FormItem>
              )}
            />
          </Section.Content>
        </Section>
        <Button type="submit">저장</Button>
      </form>
    </Form>
  );
}
