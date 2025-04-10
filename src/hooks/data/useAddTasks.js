import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskQueryKeys } from '../../keys/query';
import { api } from '../../lib/axios';

export default function useAddTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: 'add-task',
    mutationFn: async (task) => {
      const { data: createdTask } = await api.post('/tasks', task);
      return createdTask;
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) => {
        return [...currentTasks, createdTask];
      });
    },
  });
}
