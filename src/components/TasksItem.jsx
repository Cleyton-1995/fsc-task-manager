import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import { CkeckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons';
import Button from './Button';

export default function TasksItem({
  task,
  handleTaskCheckoutClick,
  onDeleteSuccess,
}) {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  async function handleDeleteClick() {
    setDeleteIsLoading(true);
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      setDeleteIsLoading(false);
      return toast.error(
        'Erro ao deletar a tarefa. Por favor, tente novamente'
      );
    }

    onDeleteSuccess(task.id);
    setDeleteIsLoading(false);
  }

  function getStatusClasses() {
    if (task.status === 'done') {
      return 'bg-[#00ADB5] text-[#00ADB5]';
    }
    if (task.status === 'in_progress') {
      return 'bg-[#FFAA04] text-[#FFAA04]';
    }
    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue';
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === 'done'}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => handleTaskCheckoutClick(task.id)}
          />

          {task.status === 'done' && <CkeckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
            <LoaderIcon className="animate-spin text-brand-text-gray" />
          ) : (
            <TrashIcon className="text-[#9A9C9F]" />
          )}
        </Button>

        <Link
          to={`/tasks/${task.id}`}
          href="#"
          className="transition hover:opacity-75"
        >
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
}

TasksItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
  handleTaskCheckoutClick: PropTypes.func.isRequired,
  handleTaskDeleteClick: PropTypes.func.isRequired,
};
