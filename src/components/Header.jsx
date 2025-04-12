import PropTypes from 'prop-types';
import { useState } from 'react';

import { AddIcon, TrashIcon } from '../assets/icons';
import AddTasksDialog from './AddTasksDialog';
import Button from './Button';

export default function Header({ subtitle, title }) {
  const [addTasksDialogIsOpen, setAddTasksDialogIsOpen] = useState(false);
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-xs font-semibold text-brand-primary">
          {subtitle}
        </span>
        <h1 className="text-xl font-semibold">{title}</h1>
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
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};
