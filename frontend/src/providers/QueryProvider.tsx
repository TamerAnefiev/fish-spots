import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const CACHE_MINUTES = 5;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: CACHE_MINUTES * 60 * 1000 },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
