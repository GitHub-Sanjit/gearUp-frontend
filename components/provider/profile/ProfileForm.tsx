"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { User, Mail, FileText, ImageIcon, Save } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import type { User as UserType } from "@/types/user";

import { useUpdateProfile } from "@/hooks/auth/useUpdateProfile";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),

  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),

  profilePhoto: z
    .string()
    .url("Please enter a valid image URL")
    .optional()
    .or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: UserType;
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const { mutate, isPending } = useUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),

    defaultValues: {
      name: user.name || "",

      bio: user.profile?.bio || "",

      profilePhoto: user.profile?.profilePhoto || "",
    },
  });

  const watchedImage = useWatch({
    control: form.control,
    name: "profilePhoto",
  });

  const initials = user.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const onSubmit = (values: ProfileFormValues) => {
    mutate({
      name: values.name,

      bio: values.bio,

      profilePhoto: values.profilePhoto || undefined,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>

        <CardDescription>
          Update your personal information. Email cannot be changed.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-8 flex items-center gap-5">
          <Avatar className="h-24 w-24 border">
            <AvatarImage src={watchedImage || ""} alt={user.name} />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{user.name}</p>

            <p className="text-sm text-muted-foreground">
              Preview updates instantly
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Name
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </FormLabel>

              <Input value={user.email} disabled />

              <p className="text-xs text-muted-foreground">
                Email address cannot be changed.
              </p>
            </FormItem>

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Bio
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Tell customers about yourself..."
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="profilePhoto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Profile Photo URL
                  </FormLabel>

                  <FormControl>
                    <Input
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                "Saving..."
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
