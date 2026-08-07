// types/user.ts

export interface User {
  id: string;

  name: string;

  email: string;

  role: "CUSTOMER" | "PROVIDER" | "ADMIN";

  profile?: {
    id?: string;
    profilePhoto?: string | null;
    bio?: string | null;
  };

  createdAt?: string;

  updatedAt?: string;
}
