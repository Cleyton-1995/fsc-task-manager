import './AddTasksDialog.css';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Button from './Button';
import Input from './Input';
import InputLabel from './InputLabel';

export default function AddTasksDialog({ isOpen, handleClose }) {
  const nodeRef = useRef();

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
              <h2 className="text-xl font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>

              <div className="flex w-[366px] flex-col space-y-3">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                />

                <div className="flex flex-col gap-1 text-left">
                  <InputLabel htmlFor="time">Horário</InputLabel>

                  <select className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]">
                    <option value="morning">Manhã</option>
                    <option value="afternoon">Tarde</option>
                    <option value="evening">Noite</option>
                  </select>
                </div>

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button size="large" className="w-full">
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  );
}
