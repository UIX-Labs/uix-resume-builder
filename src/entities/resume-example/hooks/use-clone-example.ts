'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter, usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { cloneExample } from '../api';

export function useCloneExample() {
  const router = useRouter();
  const pathname = usePathname();

  return useMutation({
    mutationFn: (exampleId: string) => cloneExample(exampleId),
    onSuccess: (data) => {
      router.push(`/resume/${data.resumeId}`);
    },
    onError: (error: any) => {
      if (error?.status === 401) {
        router.push(`/auth?callbackUrl=${encodeURIComponent(pathname)}`);
        return;
      }
      toast.error(error?.message || 'Failed to clone resume example. Please try again.');
    },
  });
}
