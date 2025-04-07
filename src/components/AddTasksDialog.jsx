import './AddTasksDialog.css';

import PropTypes from 'prop-types';
import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { CSSTransition } from 'react-transition-group';
import { v4 } from 'uuid';

import { LoaderIcon } from '../assets/icons';
import Button from './Button';
import Input from './Input';
import TimeSelect from './TimeSelect';

export default function AddTasksDialog({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  });

  const nodeRef = useRef();

  async function handleSaveClick(data) {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time.trim(),
      description: data.description.trim(),
      status: 'not_started',
    };

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      return onSubmitError();
    }

    onSubmitSuccess(task);
    handleClose();
    reset({
      title: '',
      time: 'morning',
      description: '',
    });
  }

  function handleCancelClick() {
    reset({
      title: '',
      time: 'morning',
      description: '',
    });
    handleClose();
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[366px] flex-col space-y-3"
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  {...register('title', {
                    required: 'O título é obrigatória.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título não pode ser vazio.';
                      }
                      return true;
                    },
                  })}
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
                />
                <TimeSelect
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
                  disabled={isSubmitting}
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  {...register('description', {
                    required: 'A descrição é obrigatório.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'A descrição não pode ser vazio.';
                      }
                      return true;
                    },
                  })}
                  errorMessage={errors?.description?.message}
                  disabled={isSubmitting}
                />
                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={handleCancelClick}
                    type="button"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <LoaderIcon className="mr-2 animate-spin text-brand-white" />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
}

AddTasksDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
