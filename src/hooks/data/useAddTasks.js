import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys } from '../../keys/mutations';
import { taskQueryKeys } from '../../keys/query';
import { api } from '../../lib/axios';

export default function useAddTasks() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.add(),
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
