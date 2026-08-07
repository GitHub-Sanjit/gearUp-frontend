/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

import { loginSchema, LoginInput } from "@/schemas/auth.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";

const LoginForm = () => {
  const router = useRouter();





  const { refreshUser } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      console.log("LOGIN START");

      await authService.login(data);

      console.log("LOGIN API SUCCESS");

      const user = await refreshUser();

      console.log("CURRENT USER AFTER LOGIN:", user);

      toast.success("Login successful");

      if (!user) {
        router.push("/");
        return;
      }

      switch (user.role) {
        case "ADMIN":
          router.push("/admin");
          break;

        case "PROVIDER":
          router.push("/provider");
          break;

        case "CUSTOMER":
          router.push("/dashboard");
          break;

        default:
          router.push("/");
      }
    } catch (error: any) {
      console.log("LOGIN ERROR:", error);

      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="space-y-5 p-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>

                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            {form.formState.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
