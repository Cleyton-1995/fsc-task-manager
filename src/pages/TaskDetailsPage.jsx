import { useEffect, useRef, useState } from 'react';
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
  const [errors, setErrors] = useState([]);
  const [saveIsLoading, setSaveIsLoading] = useState(false);

  const navigate = useNavigate();

  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

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

  async function handleSaveClick() {
    setSaveIsLoading(true);

    const newErrors = [];

    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório.',
      });
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório.',
      });
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória.',
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    });
    if (!response.ok) {
      return setSaveIsLoading(false);
    }
    const newTask = await response.json();
    setTask(newTask);
    setSaveIsLoading(false);
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

  const titleError = errors.find((error) => error.inputName === 'title');
  const timeError = errors.find((error) => error.inputName === 'time');
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  );

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

        <div className="space-y-6 bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título"
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>

          <div>
            <TimeSelect
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>

          <div>
            <Input
              id="description"
              label="Descrição"
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>

          <div className="flex w-full justify-end gap-3">
            <Button
              color="primary"
              size="large"
              onClick={handleSaveClick}
              disabled={saveIsLoading}
            >
              {saveIsLoading && (
                <LoaderIcon className="mr-2 animate-spin text-brand-white" />
              )}
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
