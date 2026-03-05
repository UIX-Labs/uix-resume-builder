'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { cloneExample } from '../api';

export function useCloneExample() {
  const router = useRouter();

  return useMutation({
    mutationFn: (exampleId: string) => cloneExample(exampleId),
    onSuccess: (data) => {
      router.push(`/resume/${data.resumeId}`);
    },
  });
}
