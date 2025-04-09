import { useQuery } from '@tanstack/react-query';

export default function useGetTasks() {
  return useQuery({
    queryKey: 'tasks',
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });
      const tasks = await response.json();
      return tasks;
    },
  });
}
