import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isButtonDisabled?: boolean;
}

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  isButtonDisabled,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full space-y-4 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                <Dialog.Title
                  as="h3"
                  className="mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300"
                >
                  Почти готово!
                </Dialog.Title>
                {children}
                <div className="mt-4">
                  <button
                    type="button"
                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-blue-600 border border-transparent active:bg-blue-600 hover:bg-blue-700 focus:shadow-outline-blue disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={onClose}
                    disabled={isButtonDisabled}
                  >
                    Подтвердить
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
