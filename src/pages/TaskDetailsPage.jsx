import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ArrowLeftIcon, ChevronRighthIcon, TrashIcon } from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();

  function handleBackClick() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchTask() {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      });
      const data = await response.json();
      setTask(data);
    }
    fetchTask();
  }, [taskId]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex items-center gap-1 text-xs">
              <span
                onClick={handleBackClick}
                className="cursor-pointer text-brand-text-gray"
              >
                Minhas Tarefas
              </span>
              <ChevronRighthIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button className="h-fit self-end" color="danger">
            {' '}
            <TrashIcon /> Deletar Tarefa
          </Button>
        </div>

        <div className="space-y-6 bg-brand-white p-6">
          <div>
            <Input id="title" label="Título" value={task?.title} />
          </div>

          <div>
            <TimeSelect value={task?.time} />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              value={task?.description}
            />
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button color="secondary" size="large">
              Cancelar
            </Button>
            <Button color="primary" size="large">
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
