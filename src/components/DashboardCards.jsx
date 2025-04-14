import { LoaderIcon, TaskIcon, Tasks2Icon } from '../assets/icons';
import useGetTasks from '../hooks/data/useGetTasks';
import DashboardCard from './DashboardCard';

export default function DashboardCards() {
  const { data: tasks } = useGetTasks();

  const notStartedTasks = tasks?.filter(
    (task) => task.status === 'not_started'
  ).length;
  const doneTasks = tasks?.filter((task) => task.status === 'done').length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length;

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2Icon />}
        mainText={tasks?.length}
        secondaryText="Tarefas totais"
      />
      <DashboardCard
        icon={<LoaderIcon className="animate-spin" />}
        mainText={notStartedTasks}
        secondaryText="Tarefas não iniciadas"
      />
      <DashboardCard
        icon={<LoaderIcon className="animate-spin" />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />
      <DashboardCard
        icon={<TaskIcon />}
        mainText={doneTasks}
        secondaryText="Tarefas concluídas"
      />
    </div>
  );
}
