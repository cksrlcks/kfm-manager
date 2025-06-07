import {
  Control,
  useFieldArray,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QuotationForm } from "../type";

export default function CategoryItemsFieldArray({
  control,
  register,
  index,
}: {
  control: Control<QuotationForm>;
  register: UseFormRegister<QuotationForm>;
  index: number;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `category.${index}.category_items`,
  });

  const { watch } = useFormContext();
  const itemValues = watch(`category.${index}.category_items`);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="w-8">No</TableHead>
            <TableHead>품명</TableHead>
            <TableHead className="w-32">수량</TableHead>
            <TableHead className="w-32">단가</TableHead>
            <TableHead className="w-32">금액</TableHead>
            <TableHead className="w-8">삭제</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fields.map((item, itemIndex) => (
            <TableRow key={item.id}>
              <TableCell>{itemIndex + 1}</TableCell>
              <TableCell>
                <Input
                  placeholder="품명"
                  {...register(
                    `category.${index}.category_items.${itemIndex}.description`,
                  )}
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="수량"
                  type="number"
                  {...register(
                    `category.${index}.category_items.${itemIndex}.quantity`,
                  )}
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="단가"
                  type="number"
                  {...register(
                    `category.${index}.category_items.${itemIndex}.unit_price`,
                  )}
                />
              </TableCell>
              <TableCell>
                <Input
                  placeholder="금액"
                  value={
                    itemValues[itemIndex].unit_price *
                    itemValues[itemIndex].quantity
                  }
                  disabled
                />
              </TableCell>
              <TableCell>
                <Button
                  type="button"
                  variant="ghost"
                  className="h-6 w-6 p-0"
                  onClick={() => remove(itemIndex)}
                >
                  <Trash2 size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          className="h-8 w-8"
          onClick={() =>
            append({ description: "", quantity: 0, unit_price: 0 })
          }
        >
          <Plus />
        </Button>
      </div>
    </div>
  );
}
