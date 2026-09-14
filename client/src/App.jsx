import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MotionConfig } from "framer-motion";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { AppRoutes } from "@/routes/AppRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    },
  },
});

// Split out so it can call useTheme() — this needs to render *inside*
// ThemeProvider, which App() also sets up, so it can't share App's scope.
function ThemedToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme}
      position="top-right"
      toastOptions={{
        style: {
          background: "var(--color-surface-raised)",
          border: "1px solid var(--color-border)",
          color: "var(--color-text)",
        },
      }}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AuthProvider>
              <AppRoutes />
              <ThemedToaster />
            </AuthProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}

export default App;