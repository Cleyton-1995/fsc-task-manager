import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons';
import AddTasksDialog from './AddTasksDialog';
import Button from './Button';
import TasksItem from './TasksItem';
import TasksSeparator from './TasksSeparator';
export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [addTasksDialogIsOpen, setAddTasksDialogIsOpen] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      });
      const tasks = await response.json();
      setTasks(tasks);
    }
    fetchTasks();
  }, []);

  const morningTasks = tasks.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks.filter((task) => task.time === 'evening');

  async function onDeleteTaskSuccess(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
    toast.success('Tarefa deletada com sucesso!');
  }

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

    setTasks(newTasks);
  }

  async function onTaskSubmitSuccess(task) {
    setTasks([...tasks, task]);
    toast.success('Tarefa adicionada com sucesso!');
  }

  function onTaskSubmitError() {
    toast('Erro ao adicionar a tarefa. Por favor, tente novamente.');
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
            onSubmitSuccess={onTaskSubmitSuccess}
            onSubmitError={onTaskSubmitError}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />

          {morningTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o peíodo da manhã.
            </p>
          )}

          {morningTasks.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              handleTaskCheckoutClick={handleTaskCheckoutClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudIcon />} />

          {afternoonTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o peíodo da tarde.
            </p>
          )}

          {afternoonTasks.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              handleTaskCheckoutClick={handleTaskCheckoutClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />

          {eveningTasks.length === 0 && (
            <p className="text-sm text-brand-text-gray">
              Nenhuma tarefa cadastrada para o peíodo da noite.
            </p>
          )}

          {eveningTasks.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              handleTaskCheckoutClick={handleTaskCheckoutClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
