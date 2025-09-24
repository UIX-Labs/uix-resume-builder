'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@shared/ui/sonner';

const queryClient = new QueryClient({});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {/*<AuthGuard>*/}
      {children}
      <Toaster />
      {/*</AuthGuard>*/}
    </QueryClientProvider>
  );
}
