import LoginForm from "@/components/forms/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-6 rounded-lg border p-8 shadow">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>

          <p className="text-muted-foreground">
            Enter your credentials to access GearUp
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
