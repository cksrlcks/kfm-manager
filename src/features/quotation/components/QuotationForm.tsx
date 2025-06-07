"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AlignLeft, CalendarIcon, Minus, Plus } from "lucide-react";
import { numToKorean } from "num-to-korean";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ACCESSORY, COMPANY_NAME } from "@/constants/quotation";
import { formatDate, formatPriceWithComma } from "@/lib/format";
import { addQuotationAction, updateQuotationAction } from "../server/action";
import {
  Employee,
  Quotation,
  QuotationDefaultSetting,
  QuotationForm as QuotationFormType,
  quotationSchema,
} from "../type";
import CategoryItemsFieldArray from "./CategoryItemsFieldArray";
import CopyTextButton from "./CopyTextButton";
import QuotationPreview from "./Preview";

type QuotationFormProps = {
  defaultSetting: QuotationDefaultSetting | undefined;
  employees: Employee[];
  initialData?: Quotation;
};

const categoryDefault = {
  category_name: "",
  category_items: [
    {
      description: "",
      quantity: 0,
      unit_price: 0,
    },
    {
      description: "",
      quantity: 0,
      unit_price: 0,
    },
  ],
};

export default function QuotationForm({
  defaultSetting,
  employees,
  initialData,
}: QuotationFormProps) {
  const router = useRouter();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const form = useForm<QuotationFormType>({
    resolver: zodResolver(quotationSchema),
    mode: "onSubmit",
    defaultValues: initialData
      ? {
          ...initialData,
          quotation_amount: initialData.quotation_amount || 0,
          delivery_term: initialData.delivery_term || 0,
          price_valid: initialData.price_valid || 0,
        }
      : {
          quot_no: undefined,
          ins_no: undefined,
          quotation_date: new Date().toISOString(),
          company_name: "",
          quotation_amount: 0,
          payment_term: defaultSetting?.payment_term || "",
          delivery_term: defaultSetting?.delivery_term || 0,
          delivery_condition: defaultSetting?.delivery_condition || "",
          price_valid: defaultSetting?.price_valid || 0,
          prepared:
            `${COMPANY_NAME} ${employees[0]?.position} ${employees[0]?.name}` ||
            "",
          remarks: {
            tax: true,
            transportation: true,
          },
          accessory: {
            suction_silence: true,
            discharge_silencer: true,
            pulley: true,
            belt: true,
            belt_cover: false,
            bed: true,
            safety_valve: true,
            flexible_check: false,
            flexible_tube: false,
            expansion_joint: false,
            check_valve: false,
            gauge: true,
            bolt_nut: false,
          },
          category: [
            {
              category_name: "ROOTS BLOWER",
              category_items: [
                {
                  description: "",
                  quantity: 0,
                  unit_price: 0,
                },
                {
                  description: "",
                  quantity: 0,
                  unit_price: 0,
                },
              ],
            },
            {
              category_name: "MOTOR",
              category_items: [
                {
                  description: "",
                  quantity: 0,
                  unit_price: 0,
                },
                {
                  description: "",
                  quantity: 0,
                  unit_price: 0,
                },
              ],
            },
          ],
        },
  });

  const {
    fields: categoryFields,
    append: categoryAppend,
    remove: categoryRemove,
  } = useFieldArray({ control: form.control, name: "category" });

  const isEditMode = !!initialData;

  const handleSubmit = form.handleSubmit(async (data) => {
    const response = isEditMode
      ? await updateQuotationAction(initialData.id, data)
      : await addQuotationAction(data);
    if (response.success) {
      toast.success(response.message);
      router.replace("/quotation/list");
    } else {
      toast.error(response.message);
    }
  });

  let totalPrice = 0;

  form.getValues("category")?.forEach((category) => {
    category.category_items?.forEach((item) => {
      if (item.quantity && item.unit_price) {
        totalPrice += item.quantity * item.unit_price;
      }
    });
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="text-lg font-semibold">
              {isEditMode ? "견적서 수정" : "견적서 작성"}
            </h3>
            <div className="flex gap-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsPreviewOpen(true)}
              >
                미리보기
              </Button>
              <Button type="submit">저장</Button>
            </div>
          </div>
          <div className="mb-8 rounded-md border p-4">
            <div className="mb-2 text-sm font-medium">자주쓰는 기호 모음</div>
            <div className="flex flex-wrap gap-1">
              {defaultSetting &&
                defaultSetting.symbols
                  ?.split(",")
                  .map((symbol, index) => (
                    <CopyTextButton key={index}>{symbol.trim()}</CopyTextButton>
                  ))}
            </div>
          </div>
          <div className="flex flex-col gap-16 xl:flex-row">
            <div className="grid w-full gap-4 xl:w-[50%]">
              <FormField
                control={form.control}
                name="quot_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>견적번호</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="저장시 자동입력됩니다."
                        {...field}
                        value={field.value || ""}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ins_no"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ins No.</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quotation_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>견적일</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline">
                            {field.value ? (
                              formatDate(field.value, "YYYY.MM.DD")
                            ) : (
                              <span>날짜 선택</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>회사이름</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quotation_amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>견적금액</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      {numToKorean(Number(field.value)) || "-"} 원<br />
                      {formatPriceWithComma(Number(field.value)) || "-"} 원
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="payment_term"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>지불조건</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value || ""} />
                    </FormControl>
                    <FormMessage />
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
                      <Input
                        type="number"
                        {...field}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      발주후{field.value}일(국내)
                    </FormDescription>
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
                    <FormMessage />
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
                      <Input
                        type="number"
                        {...field}
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>견적후 {field.value}일</FormDescription>
                  </FormItem>
                )}
              />
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">참고사항</FormLabel>
                </div>
                <FormField
                  control={form.control}
                  name="remarks.tax"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        부가세 별도
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="remarks.transportation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-3">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        운송료 별도
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </FormItem>
              <FormField
                control={form.control}
                name="prepared"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>작성자</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="담당자를 선택해주세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={`${COMPANY_NAME} ${item.position} ${item.name}`}
                          >
                            {COMPANY_NAME} {item.position} {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">악세사리</FormLabel>
                </div>
                {ACCESSORY.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={`accessory.${item.name}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-y-0 space-x-3">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </FormItem>
            </div>
            <div className="w-full">
              <div className="mb-4 grid gap-8">
                {categoryFields.map((field, categoryIndex) => {
                  return (
                    <div className="grid gap-2" key={field.id}>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-9 w-9"
                          onClick={() => categoryRemove(categoryIndex)}
                        >
                          <Minus />
                        </Button>
                        <Input
                          {...form.register(
                            `category.${categoryIndex}.category_name`,
                          )}
                          className="w-full"
                        />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              type="button"
                              variant="outline"
                              className="h-9 w-9"
                            >
                              <AlignLeft />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom" align="end">
                            <DropdownMenuLabel>항목</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() =>
                                form.setValue(
                                  `category.${categoryIndex}.category_name`,
                                  "ROOTS BLOWER",
                                )
                              }
                            >
                              ROOTS BLOWER
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                form.setValue(
                                  `category.${categoryIndex}.category_name`,
                                  "MOTOR",
                                )
                              }
                            >
                              MOTOR
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                form.setValue(
                                  `category.${categoryIndex}.category_name`,
                                  "ACCESSORY",
                                )
                              }
                            >
                              ACCESSORY
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                form.setValue(
                                  `category.${categoryIndex}.category_name`,
                                  "ETC",
                                )
                              }
                            >
                              ETC
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <CategoryItemsFieldArray
                        control={form.control}
                        register={form.register}
                        index={categoryIndex}
                      />
                    </div>
                  );
                })}
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full"
                  onClick={() => categoryAppend(categoryDefault)}
                >
                  <Plus />
                </Button>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label>총금액</Label>
                  <Input
                    className="w-100 text-right"
                    type="number"
                    value={totalPrice}
                    disabled
                  />
                </div>

                <FormField
                  control={form.control}
                  name="quotation_amount"
                  render={({ field }) => (
                    <>
                      <div className="flex items-center justify-between">
                        <Label>네고금액(견적금액)</Label>
                        <Input
                          type="number"
                          {...field}
                          value={field.value || 0}
                          className="w-100 text-right"
                        />
                      </div>
                      <FormDescription className="text-right">
                        {numToKorean(Number(field.value)) || "-"} 원<br />
                        {formatPriceWithComma(Number(field.value)) || "-"} 원
                      </FormDescription>
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
      {isPreviewOpen && (
        <QuotationPreview
          data={form.getValues()}
          open={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </div>
  );
}
