import { useQuery } from '@tanstack/react-query';

import { taskQueryKeys } from '../../keys/query';
import { api } from '../../lib/axios';

export default function useGetTask({ taskId, onSuccess }) {
  return useQuery({
    queryKey: taskQueryKeys.getOne(taskId),
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`);
      onSuccess(task);
      return task;
    },
  });
}
