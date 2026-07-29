export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface JwtPayload {
  id: string;
  email: string;
  role: UserRole;
}
