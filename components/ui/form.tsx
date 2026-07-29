"use client";

import * as React from "react";
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  Label
} from "@/components/ui/label";

import { cn } from "@/lib/utils";

import {
  Slot
} from "@radix-ui/react-slot";


const Form = FormProvider;


const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {

  return (
    <Controller {...props} />
  );
};


const FormItemContext = React.createContext<{
  id: string;
}>({
  id: "",
});


const FormItem = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {

  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>

      <div
        className={cn(
          "space-y-2",
          className
        )}
        {...props}
      />

    </FormItemContext.Provider>
  );
};


const FormLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof Label>) => {

  const { id } = React.useContext(FormItemContext);

  return (
    <Label
      htmlFor={id}
      className={className}
      {...props}
    />
  );
};


const FormControl = (
  props: React.ComponentProps<typeof Slot>
) => {

  const { id } = React.useContext(FormItemContext);

  return (
    <Slot
      id={id}
      {...props}
    />
  );
};


const FormMessage = ({
  className,
  children,
  ...props
}: React.ComponentProps<"p">) => {

  const {
    formState,
  } = useFormContext();


  return (
    <p
      className={cn(
        "text-sm text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
};


export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
};