import { ReactNode, useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
export default function Modal({ handleClose, show, modalTitle, children }: {
    handleClose: () => void,
    show: boolean,
    modalTitle: string,
    children: ReactNode
}) {

    return (
        show ? <div className="modal block">
            <div className="modal-main flex flex-col gap-5">
                <div className="w-full flex flex-row justify-between place-items-center pb-5">
                    <div className="font-bold text-4xl">
                        {modalTitle}
                    </div>
                    <button className="shadow-md rounded-full border border-black h-fit w-fit text-xl text-end" type="button" onClick={handleClose}>
                        <IoMdClose />
                    </button>
                </div>
                {children}
            </div>
        </div> : null
    );
}