import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskQueryKeys } from '../../keys/query';
import { api } from '../../lib/axios';

export default function useDeleteAllTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data: tasks } = await api.get('/tasks');

      for (const task of tasks) {
        await api.delete(`/tasks/${task.id}`);
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueryKeys.getAll(), []);
    },
  });
}
