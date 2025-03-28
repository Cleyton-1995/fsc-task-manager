import { useState } from 'react';
import { toast } from 'sonner';

import {
  AddIcon,
  CloudIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons';
import TASKS from '../constants/tasks';
import AddTasksDialog from './AddTasksDialog';
import Button from './Button';
import TasksItem from './TasksItem';
import TasksSeparator from './TasksSeparator';
export default function Tasks() {
  const [tasks, setTasks] = useState(TASKS);
  const [addTasksDialogIsOpen, setAddTasksDialogIsOpen] = useState(false);

  const morningTasks = tasks.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks.filter((task) => task.time === 'evening');

  function handleTaskDeleteClick(taskId) {
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

  function handleAddTaskSubmit(task) {
    setTasks([...tasks, task]);
    toast.success('Tarefa adicionada com sucesso!');
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h1 className="text-xl font-semibold">Minhas Tarefas</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost">
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
            handleSubmit={handleAddTaskSubmit}
          />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6">
        <div className="space-y-3">
          <TasksSeparator title="Manhã" icon={<SunIcon />} />

          {morningTasks.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              handleTaskCheckoutClick={handleTaskCheckoutClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TasksSeparator title="Tarde" icon={<CloudIcon />} />

          {afternoonTasks.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              handleTaskCheckoutClick={handleTaskCheckoutClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TasksSeparator title="Noite" icon={<MoonIcon />} />

          {eveningTasks.map((task) => (
            <TasksItem
              key={task.id}
              task={task}
              handleTaskCheckoutClick={handleTaskCheckoutClick}
              handleTaskDeleteClick={handleTaskDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
