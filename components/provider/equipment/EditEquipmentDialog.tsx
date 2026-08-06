"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import type { Gear } from "@/types/gear";

import { useUpdateEquipment } from "@/hooks/useProviderEquipment";

import { toast } from "sonner";

const editEquipmentSchema = z.object({
  name: z.string().min(2),

  description: z.string().optional(),

  brand: z.string().optional(),

  image: z.string().optional(),

  dailyRentalPrice: z.number().positive(),

  stockQuantity: z.number().int().min(1),

  availableQuantity: z.number().int().min(1),

  categoryId: z.string().min(1),

  condition: z.enum(["GOOD", "FAIR", "POOR"]),
});

type EditEquipmentValues = z.infer<typeof editEquipmentSchema>;

interface EditEquipmentDialogProps {
  open: boolean;

  onOpenChange: (open: boolean) => void;

  gear: Gear | null;
}

export default function EditEquipmentDialog({
  open,

  onOpenChange,

  gear,
}: EditEquipmentDialogProps) {
  const updateEquipment = useUpdateEquipment();

  const form = useForm<EditEquipmentValues>({
    resolver: zodResolver(editEquipmentSchema),

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

  useEffect(() => {
    if (gear) {
      form.reset({
        name: gear.name,

        description: gear.description ?? "",

        brand: gear.brand ?? "",

        image: gear.image ?? "",

        dailyRentalPrice: gear.dailyRentalPrice,

        stockQuantity: gear.stockQuantity,

        availableQuantity: gear.availableQuantity,

        categoryId: gear.categoryId,

        condition: gear.condition,
      });
    }
  }, [gear, form]);

  const onSubmit = async (values: EditEquipmentValues) => {
    if (!gear) return;

    try {
      await updateEquipment.mutateAsync({
        id: gear.id,

        payload: {
          ...values,

          image: values.image || undefined,
        },
      });

      toast.success("Equipment updated successfully");

      onOpenChange(false);
    } catch {
      toast.error("Failed to update equipment");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Equipment</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>

                  <FormControl>
                    <Input {...field} />
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
                    <Input {...field} />
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
                    <Textarea {...field} />
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
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="stockQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availableQuantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available</FormLabel>

                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
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
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={updateEquipment.isPending}
            >
              {updateEquipment.isPending ? "Updating..." : "Update Equipment"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
