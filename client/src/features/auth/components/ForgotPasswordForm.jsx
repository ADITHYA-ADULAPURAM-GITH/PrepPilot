import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/common/FieldError";
import { forgotPasswordSchema } from "@/features/auth/schemas";
import { useForgotPassword } from "@/features/auth/hooks/useAuthMutations";
import { ROUTES } from "@/lib/constants";

export function ForgotPasswordForm() {
  const forgotPasswordMutation = useForgotPassword();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values) => {
    forgotPasswordMutation.mutate(values);
  };

  if (forgotPasswordMutation.isSuccess) {
    return (
      <div className="text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-muted">
          <MailCheck className="size-6 text-primary" />
        </div>
        <h2 className="mt-4 font-display text-xl font-semibold text-text">Check your inbox</h2>
        <p className="mt-2 text-[14px] leading-relaxed text-text-muted">
          If an account exists for <span className="text-text">{getValues("email")}</span>, we've sent a link to
          reset your password.
        </p>
        <Link
          to={ROUTES.LOGIN}
          className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-primary hover:text-primary-hover"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-text">Reset your password</h2>
      <p className="mt-1.5 text-[14px] text-text-muted">
        Enter the email on your account and we'll send you a reset link.
      </p>

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

        <Button type="submit" className="w-full" isLoading={forgotPasswordMutation.isPending}>
          Send reset link
        </Button>
      </form>

      <Link
        to={ROUTES.LOGIN}
        className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-text-muted hover:text-text"
      >
        <ArrowLeft className="size-3.5" />
        Back to sign in
      </Link>
    </div>
  );
}
