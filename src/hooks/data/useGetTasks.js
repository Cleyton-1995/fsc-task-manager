import { useQuery } from '@tanstack/react-query';

import { taskQueryKeys } from '../../keys/query';
import { api } from '../../lib/axios';

export default function useGetTasks() {
  return useQuery({
    queryKey: taskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get('/tasks');
      return tasks;
    },
  });
}
