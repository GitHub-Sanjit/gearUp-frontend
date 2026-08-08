"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  User as UserIcon,
  Mail,
  FileText,
  ImageIcon,
  Save,
} from "lucide-react";

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
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

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
  onSuccess: () => void;
}

export default function ProfileForm({ user, onSuccess }: ProfileFormProps) {
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

  const initials =
    user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const onSubmit = (values: ProfileFormValues) => {
    mutate(
      {
        name: values.name.trim(),
        bio: values.bio?.trim() || undefined,
        profilePhoto: values.profilePhoto?.trim() || undefined,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>

        <CardDescription>
          Update your personal information. Your email address cannot be
          changed.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Profile Preview */}

        <div className="mb-8 flex flex-col gap-5 rounded-xl border bg-muted/20 p-5 sm:flex-row sm:items-center">
          <Avatar className="h-24 w-24 border-2">
            <AvatarImage src={watchedImage || undefined} alt={user.name} />

            <AvatarFallback className="text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{user.name}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Profile photo preview updates instantly.
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    Name
                  </FormLabel>

                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}

            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </FormLabel>

              <Input value={user.email} disabled readOnly />

              <p className="text-xs text-muted-foreground">
                Email address cannot be changed.
              </p>
            </FormItem>

            {/* Bio */}

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

            {/* Profile Photo */}

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

                  <p className="text-xs text-muted-foreground">
                    Paste a publicly accessible image URL.
                  </p>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Save */}

            <div className="flex justify-end">
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
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
