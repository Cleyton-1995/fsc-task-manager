import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons';
import useGetTasks from '../hooks/data/useGetTasks';
import AddTasksDialog from './AddTasksDialog';
import Button from './Button';
import TasksItem from './TasksItem';
import TasksSeparator from './TasksSeparator';
export default function Tasks() {
  const queryClient = useQueryClient();

  const { data: tasks } = useGetTasks();

  const [addTasksDialogIsOpen, setAddTasksDialogIsOpen] = useState(false);

  const morningTasks = tasks?.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks?.filter((task) => task.time === 'evening');

  function handleTaskCheckoutClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso!');
        return { ...task, status: 'in_progress' };
      }
      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso!');
        return { ...task, status: 'done' };
      }
      if (task.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso!');
        return { ...task, status: 'not_started' };
      }

      return task;
    });

    queryClient.setQueryData('tasks', newTasks);
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-brand-primary">
            Minhas Tarefas
          </span>
          <h1 className="text-xl font-semibold">Minhas Tarefas</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar Tarefas
            <TrashIcon />
          </Button>
          <Button onClick={() => setAddTasksDialogIsOpen(true)}>
            Adicionar Tarefa
            <AddIcon />{' '}
          </Button>

          <AddTasksDialog
            isOpen={addTasksDialogIsOpen}
            handleClose={() => setAddTasksDialogIsOpen(false)}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />

          {morningTasks?.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o peíodo da manhã.
            </p>
          )}

          {morningTasks?.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              handleTaskCheckoutClick={handleTaskCheckoutClick}
            />
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
            <TasksItem
              key={task.id}
              task={task}
              handleTaskCheckoutClick={handleTaskCheckoutClick}
            />
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
            <TasksItem
              key={task.id}
              task={task}
              handleTaskCheckoutClick={handleTaskCheckoutClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
