"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useCategories } from "@/hooks/useCategories";
import { useCreateEquipment } from "@/hooks/useCreateEquipment";

import { toast } from "sonner";

const equipmentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  description: z.string().optional(),

  brand: z.string().optional(),

  image: z.string().optional(),

  dailyRentalPrice: z.number().positive("Price must be greater than 0"),

  stockQuantity: z.number().int().min(1, "Stock must be at least 1"),

  availableQuantity: z
    .number()
    .int()
    .min(1, "Available quantity must be at least 1"),

  categoryId: z.string().min(1, "Category is required"),

  condition: z.enum(["GOOD", "FAIR", "POOR"]),
});

type EquipmentFormValues = z.infer<typeof equipmentSchema>;

interface EquipmentFormProps {
  onSuccess?: () => void;
}

export default function EquipmentForm({ onSuccess }: EquipmentFormProps) {
  const { data: categories = [] } = useCategories();

  const createEquipment = useCreateEquipment();

  const form = useForm<EquipmentFormValues>({
    resolver: zodResolver(equipmentSchema),

    defaultValues: {
      name: "",

      description: "",

      brand: "",

      image: "",

      dailyRentalPrice: 1,

      stockQuantity: 1,

      availableQuantity: 1,

      categoryId: "",

      condition: "GOOD",
    },
  });

  const onSubmit = async (values: EquipmentFormValues) => {
    try {
      await createEquipment.mutateAsync({
        ...values,
        image: values.image || undefined,
      });

      toast.success("Equipment added successfully");

      form.reset();

      onSuccess?.();
    } catch {
      toast.error("Failed to add equipment");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipment Name</FormLabel>

              <FormControl>
                <Input placeholder="Camping Tent" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>

              <FormControl>
                <Input placeholder="Coleman" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>

              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea placeholder="Equipment description" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dailyRentalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price / Day</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="stockQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock Quantity</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="availableQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Quantity</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  value={field.value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition</FormLabel>

              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="GOOD">Good</SelectItem>

                  <SelectItem value="FAIR">Fair</SelectItem>

                  <SelectItem value="POOR">Poor</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={createEquipment.isPending}
        >
          {createEquipment.isPending ? "Adding..." : "Add Equipment"}
        </Button>
      </form>
    </Form>
  );
}
