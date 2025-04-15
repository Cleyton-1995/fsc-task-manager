import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'sonner';

import { AddIcon, TrashIcon } from '../assets/icons';
import useDeleteAllTasks from '../hooks/data/useDeleteAllTasks';
import AddTasksDialog from './AddTasksDialog';
import Button from './Button';

export default function Header({ subtitle, title }) {
  const [addTasksDialogIsOpen, setAddTasksDialogIsOpen] = useState(false);

  const { mutate: deleteAllTasks, isPending } = useDeleteAllTasks();

  function handleDeleteAllTasks() {
    deleteAllTasks(undefined, {
      onSuccess: () => toast.success('Todas as tarefas foram removidas!'),
      onError: () => toast.error('Erro ao limpar as tarefas.'),
    });
  }

  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h1 className="text-xl font-semibold">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          onClick={handleDeleteAllTasks}
          disabled={isPending}
          color="ghost"
        >
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
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
