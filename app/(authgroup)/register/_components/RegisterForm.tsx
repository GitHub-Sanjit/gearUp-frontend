"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { registerAction } from "../../_actions/authActions";
import Link from "next/link";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, null);

  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registration successful");
      router.push("/login");
    } else {
      toast.error(state.message || "Registration failed");
    }
  }, [state, router]);

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input name="name" type="text" placeholder="Enter your name" required />

        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <Input
          name="profilePhoto"
          type="url"
          placeholder="Profile photo URL (optional)"
        />

        <div className="space-y-3">
          <p className="text-sm font-medium">Account Type</p>

          <RadioGroup
            defaultValue="CUSTOMER"
            name="role"
            className="flex gap-6"
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem value="CUSTOMER" id="customer" />

              <Label htmlFor="customer">Customer</Label>
            </div>

            <div className="flex items-center gap-2">
              <RadioGroupItem value="PROVIDER" id="provider" />

              <Label htmlFor="provider">Provider</Label>
            </div>
          </RadioGroup>
        </div>

        <Button type="submit" disabled={pending}>
          {pending ? "Creating Account..." : "Register"}
        </Button>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Login here
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
