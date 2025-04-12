import {
  GlassWaterIcon,
  LoaderIcon,
  TaskIcon,
  Tasks2Icon,
} from '../assets/icons';
import DashboardCard from '../components/DashboardCard';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import useGetTasks from '../hooks/data/useGetTasks';

export default function HomePage() {
  const { data: tasks } = useGetTasks();

  const doneTasks = tasks?.filter((task) => task.status === 'done').length;
  const inProgressTasks = tasks?.filter(
    (task) => task.status === 'in_progress'
  ).length;

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Dashboard" title="Dashboard" />
        <div className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<Tasks2Icon />}
            mainText={tasks?.length}
            secondaryText="Tarefas disponíveis"
          />
          <DashboardCard
            icon={<TaskIcon />}
            mainText={doneTasks}
            secondaryText="Tarefas concluídas"
          />
          <DashboardCard
            icon={<LoaderIcon className="animate-spin" />}
            mainText={inProgressTasks}
            secondaryText="Tarefas em andamento"
          />
          <DashboardCard
            icon={<GlassWaterIcon />}
            mainText="40%"
            secondaryText="Água"
          />
        </div>
      </div>
    </div>
  );
}
