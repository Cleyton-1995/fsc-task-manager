import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys } from '../../keys/mutations';
import { taskQueryKeys } from '../../keys/query';
import { api } from '../../lib/axios';

export default function useDeleteTasks(taskId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.delete(),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`);
      return deletedTask;
    },
    onSuccess: () => {
      queryClient.setQueryData(taskQueryKeys.getAll(), (currentTasks) => {
        return currentTasks.filter((oldTask) => oldTask.id !== taskId);
      });
    },
  });
}
