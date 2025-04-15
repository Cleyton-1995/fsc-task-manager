import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskQueryKeys } from '../../keys/query';
import { api } from '../../lib/axios';

export default function useDeleteAllTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.delete('/tasks');
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueryKeys.getAll(), []);
    },
  });
}
