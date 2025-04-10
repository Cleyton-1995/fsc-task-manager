import { useMutation, useQueryClient } from '@tanstack/react-query';

import { taskMutationKeys } from '../../keys/mutations';
import { taskQueryKeys } from '../../keys/query';
import { api } from '../../lib/axios';

export default function useUpdateTasks(taskId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: taskMutationKeys.updateTask(taskId),
    mutationFn: async (newTask) => {
      const { data: updateTask } = await api.patch(`/tasks/${taskId}`, {
        title: newTask.title.trim(),
        time: newTask.time.trim(),
        description: newTask.description.trim(),
      });

      queryClient.setQueryData(taskQueryKeys.getAll(), (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updateTask;
          }
          return oldTasks;
        });
      });

      queryClient.setQueryData(taskQueryKeys.getOne(taskId), updateTask);
    },
  });
}
