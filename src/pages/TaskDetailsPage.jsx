import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  ArrowLeftIcon,
  ChevronRighthIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons';
import Button from '../components/Button';
import Input from '../components/Input';
import Sidebar from '../components/Sidebar';
import TimeSelect from '../components/TimeSelect';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

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
      reset(data);
    }
    fetchTask();
  }, [taskId, reset]);

  async function handleSaveClick(data) {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time.trim(),
        description: data.description.trim(),
      }),
    });
    if (!response.ok) {
      return toast.success('Ocorreu um erro ao salvar a tarefa!');
    }
    const newTask = await response.json();
    setTask(newTask);
    toast.success('Tarefa salva com sucesso!');
  }

  async function handleDeleteClick() {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return toast.error(
        'Erro ao deletar a tarefa. Por favor, tente novamente'
      );
    }

    toast.success('Tarefa deletada com sucesso!');
    navigate(-1);
  }

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
              <Link to="/" className="cursor-pointer text-brand-text-gray">
                Minhas Tarefas
              </Link>
              <ChevronRighthIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            {' '}
            <TrashIcon /> Deletar Tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 bg-brand-white p-6">
            <div>
              <Input
                id="title"
                label="Título"
                defaultValue={task?.title}
                {...register('title', {
                  required: 'O título é obrigatório.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio.';
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                defaultValue={task?.time}
                {...register('time', {
                  required: 'O horário é obrigatório.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O horário não pode ser vazio.';
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.time?.message}
              />
            </div>

            <div>
              <Input
                id="description"
                label="Descrição"
                defaultValue={task?.description}
                {...register('description', {
                  required: 'A descrição é obrigatória.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazio.';
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>

            <div className="flex w-full justify-end gap-3">
              <Button
                color="primary"
                size="large"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <LoaderIcon className="mr-2 animate-spin text-brand-white" />
                )}
                Salvar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
