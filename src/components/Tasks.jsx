import AddIcon from '../assets/icons/add.svg?react';
import TrashIcon from '../assets/icons/trash.svg?react';
import SunIcon from '../assets/icons/sun.svg?react';
import MoonIcon from '../assets/icons/moon.svg?react';
import CloudIcon from '../assets/icons/cloud-sun.svg?react';
import Button from './Button';
import TasksSeparator from './TasksSeparator';
import { useState } from 'react';
import TASKS from '../constants/tasks';
import TasksItem from './TasksItem';
export default function Tasks() {
  const [tasks, seTasks] = useState(TASKS);

  const morningTasks = tasks.filter((task) => task.time === 'morning');
  const afternoonTasks = tasks.filter((task) => task.time === 'afternoon');
  const eveningTasks = tasks.filter((task) => task.time === 'evening');

  function handleTaskCheckoutClick(taskId) {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }

      if (task.status === 'not_started') {
        return { ...task, status: 'in_progress' };
      }
      if (task.status === 'in_progress') {
        return { ...task, status: 'done' };
      }
      if (task.status === 'done') {
        return { ...task, status: 'not_started' };
      }

      return task;
    });

    seTasks(newTasks);
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
          <Button>
            Adicionar Tarefa
            <AddIcon />{' '}
          </Button>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
