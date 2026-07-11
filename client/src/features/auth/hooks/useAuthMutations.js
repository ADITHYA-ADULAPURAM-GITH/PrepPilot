import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authApi } from "@/api/endpoints/auth";
import { useAuth } from "@/context/AuthContext";
import { ROUTES } from "@/lib/constants";

export function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      login(data.data.accessToken, data.data.user);
      toast.success(`Welcome back, ${data.data.user.name.split(" ")[0]}`);
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Couldn't sign you in. Check your credentials.");
    },
  });
}

export function useRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: ({ data }) => {
      login(data.data.accessToken, data.data.user);
      toast.success("Account created. Let's get you placement-ready.");
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed. Try again.");
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      toast.success("If that email exists, a reset link is on its way.");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong. Try again.");
    },
  });
}
