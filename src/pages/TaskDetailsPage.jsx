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
import useDeleteTasks from '../hooks/data/useDeleteTasks';
import useGetTask from '../hooks/data/useGetTask';
import useUpdateTasks from '../hooks/data/useUpdateTasks';

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { mutate: updateTask, isPending: updateTaskIsLoading } =
    useUpdateTasks(taskId);

  const { mutate: deleteTask, isPending: deleteTaskIsLoading } =
    useDeleteTasks(taskId);

  const { data: task } = useGetTask({
    taskId,
    onSuccess: (task) => reset(task),
  });

  function handleBackClick() {
    navigate(-1);
  }

  async function handleSaveClick(data) {
    updateTask(data, {
      onSuccess: () => toast.success('Tarefa atualizada com sucesso!'),
      onError: () => toast.error('Erro ao atualizar a tarefa!'),
    });
  }

  async function handleDeleteClick() {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!');
        navigate(-1);
      },
      onError: () => toast.error('Erro ao deletar a tarefa!'),
    });
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
                disabled={updateTaskIsLoading || deleteTaskIsLoading}
              >
                {(updateTaskIsLoading || deleteTaskIsLoading) && (
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
