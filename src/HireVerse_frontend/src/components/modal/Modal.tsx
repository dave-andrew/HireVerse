import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import {IoCloseSharp} from "react-icons/io5";
export default function Modal({
    handleClose,
    show,
    modalTitle,
    children,
}: {
    handleClose: () => void;
    show: boolean;
    modalTitle: string;
    children: ReactNode;
}) {
    return show ? (
        <div className="modal block">
            <div className="modal-main flex flex-col gap-5">
                <div className="flex w-full flex-row place-items-center justify-between pb-5">
                    <div className="text-4xl font-bold">{modalTitle}</div>
                    <button
                        className="h-fit w-fit rounded-md text-end text-xl p-1 hover:bg-gray-100 transition-colors"
                        type="button"
                        onClick={handleClose}>
                        <IoCloseSharp size="2rem" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    ) : null;
}
