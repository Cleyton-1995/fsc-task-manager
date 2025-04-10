import { useQuery } from '@tanstack/react-query';

import { api } from '../../lib/axios';

export default function useGetTask({ taskId, onSuccess }) {
  return useQuery({
    queryKey: ['tasks', taskId],
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`);
      onSuccess(task);
      return task;
    },
  });
}
