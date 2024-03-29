import { Fragment, ReactNode } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
    className?: string;
    panelClassName?: string;
    children: ReactNode;
    title: ReactNode;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export default function WrappedModal({
    className,
    panelClassName,
    title,
    children,
    isOpen,
    setIsOpen,
}: Props) {
    return (
        <>
            <Transition
                appear
                show={isOpen}
                as={Fragment}>
                <Dialog
                    as="div"
                    className="relative z-[500]"
                    onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-8 py-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95">
                                <Dialog.Panel
                                    className={`max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all ${panelClassName}`}>
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900">
                                        {title}
                                    </Dialog.Title>
                                    {children}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
