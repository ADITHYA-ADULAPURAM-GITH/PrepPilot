import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/common/FieldError";
import { loginSchema } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/hooks/useAuthMutations";
import { ROUTES } from "@/lib/constants";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const onSubmit = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-text">Welcome back</h2>
      <p className="mt-1.5 text-[14px] text-text-muted">Sign in to pick up your prep where you left off.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4" noValidate>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@college.edu"
            autoComplete="email"
            error={!!errors.email}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to={ROUTES.FORGOT_PASSWORD} className="mb-1.5 text-[12.5px] text-primary hover:text-primary-hover">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              error={!!errors.password}
              className="pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-faint hover:text-text-muted"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          <FieldError message={errors.password?.message} />
        </div>

        <label className="flex items-center gap-2 text-[13px] text-text-muted">
          <input
            type="checkbox"
            className="size-3.5 rounded border-border bg-transparent accent-primary"
            {...register("rememberMe")}
          />
          Remember me for 30 days
        </label>

        <Button type="submit" className="w-full" isLoading={loginMutation.isPending}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-[13.5px] text-text-muted">
        Don't have an account?{" "}
        <Link to={ROUTES.REGISTER} className="font-medium text-primary hover:text-primary-hover">
          Create one
        </Link>
      </p>
    </div>
  );
}
