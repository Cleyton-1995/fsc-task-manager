import { CloudIcon, MoonIcon, SunIcon } from '../assets/icons';
import useGetTasks from '../hooks/data/useGetTasks';
import Header from './Header';
import TasksItem from './TasksItem';
import TasksSeparator from './TasksSeparator';
export default function Tasks() {
  const { data: tasks } = useGetTasks();

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks?.filter((task) => task.time === 'evening');

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas Tarefas" title="Minhas Tarefas" />

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />

          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o peíodo da manhã.
            </p>
          )}

          {morningTasks?.map((task) => (
            <TasksItem key={task.id} task={task} />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudIcon />} />

          {afternoonTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o peíodo da tarde.
            </p>
          )}

          {afternoonTasks?.map((task) => (
            <TasksItem key={task.id} task={task} />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />

          {eveningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o peíodo da noite.
            </p>
          )}

          {eveningTasks?.map((task) => (
            <TasksItem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
