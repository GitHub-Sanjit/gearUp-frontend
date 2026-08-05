export interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  profile?: {
    phone?: string;
    address?: string;
  };
}
