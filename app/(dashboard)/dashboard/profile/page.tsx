"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Mail, Shield, User } from "lucide-react";

import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useUpdateProfile } from "@/hooks/auth/useUpdateProfile";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

import type { User as UserType } from "@/types/user";
import { normalizeImageUrl } from "@/utils/image";

export default function CustomerProfilePage() {
  const { data, isLoading, isError } = useCurrentUser();

  const user: UserType | undefined = data?.data;

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold">Unable to load your profile</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Please refresh the page and try again.
          </p>
        </Card>
      </div>
    );
  }

  return <CustomerProfileForm key={user.id} user={user} />;
}

interface CustomerProfileFormProps {
  user: UserType;
}

function CustomerProfileForm({ user }: CustomerProfileFormProps) {
  const { mutateAsync, isPending } = useUpdateProfile();

  const [name, setName] = useState(user.name ?? "");
  const [bio, setBio] = useState(user.profile?.bio ?? "");
  const [profilePhoto, setProfilePhoto] = useState(
    user.profile?.profilePhoto ?? "",
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await mutateAsync({
      name: name.trim(),
      bio: bio.trim(),
      profilePhoto: profilePhoto.trim(),
    });
  };

  const imageUrl = normalizeImageUrl(profilePhoto);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold">Profile</h1>

        <p className="mt-1 text-muted-foreground">
          Manage your personal information and account details.
        </p>
      </div>

      {/* Profile Card */}

      <Card className="overflow-hidden">
        {/* Profile Header */}

        <div className="border-b bg-muted/30 px-6 py-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border bg-background">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={user.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <User className="h-9 w-9 text-muted-foreground" />
              )}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-semibold">{user.name}</h2>

                <Badge variant="secondary">Customer</Badge>
              </div>

              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div>
            <h3 className="text-lg font-semibold">Personal Information</h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Update the information displayed on your GearUp account.
            </p>
          </div>

          {/* Name */}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your full name"
              disabled={isPending}
              required
            />
          </div>

          {/* Email */}

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="email"
                value={user.email}
                className="pl-9"
                disabled
                readOnly
              />
            </div>

            <p className="text-xs text-muted-foreground">
              Your email address cannot be changed.
            </p>
          </div>

          {/* Bio */}

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>

            <Textarea
              id="bio"
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              placeholder="Tell us a little about yourself..."
              className="min-h-28 resize-none"
              disabled={isPending}
            />
          </div>

          {/* Profile Photo */}

          <div className="space-y-2">
            <Label htmlFor="profilePhoto">Profile Photo URL</Label>

            <Input
              id="profilePhoto"
              type="url"
              value={profilePhoto}
              onChange={(event) => setProfilePhoto(event.target.value)}
              placeholder="https://example.com/profile-photo.jpg"
              disabled={isPending}
            />

            <p className="text-xs text-muted-foreground">
              Enter the URL of the image you want to use as your profile photo.
            </p>
          </div>

          {/* Account Information */}

          <div className="rounded-lg border bg-muted/20 p-4">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 text-muted-foreground" />

              <div>
                <p className="font-medium">Account Type</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  You are currently registered as a customer.
                </p>
              </div>
            </div>
          </div>

          {/* Submit */}

          <div className="flex justify-end border-t pt-6">
            <Button type="submit" disabled={isPending || !name.trim()}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

function ProfileLoading() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-48 animate-pulse rounded-md bg-muted" />

        <div className="mt-2 h-4 w-72 animate-pulse rounded-md bg-muted" />
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <div className="h-20 w-20 animate-pulse rounded-full bg-muted" />

          <div className="space-y-3">
            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />

            <div className="h-10 w-full animate-pulse rounded-md bg-muted" />

            <div className="h-24 w-full animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </Card>
    </div>
  );
}
