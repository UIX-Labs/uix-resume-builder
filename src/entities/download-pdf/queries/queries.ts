import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkIfCommunityMember } from '../api';

export const useCheckIfCommunityMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkIfCommunityMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['checkIfCommunityMember'] });
    },
  });
};
