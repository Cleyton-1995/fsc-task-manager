import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function useUpdateTasks(taskId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (newTask) => {
      const { data: updateTask } = await axios.patch(
        `http://localhost:3000/tasks/${taskId}`,
        {
          title: newTask.title.trim(),
          time: newTask.time.trim(),
          description: newTask.description.trim(),
        }
      );

      queryClient.setQueryData('tasks', (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updateTask;
          }
          return oldTasks;
        });
      });
    },
  });
}
