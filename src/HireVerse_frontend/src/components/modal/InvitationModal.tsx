import { IoCloseSharp } from "react-icons/io5";

import { Dispatch, SetStateAction } from "react";
import InvitationItem from "../form/InvitationItem";
import WrappedModal from "../form/WrappedModal";

interface Props {
    openState: boolean;
    setOpenState: Dispatch<SetStateAction<boolean>>;
    onJobCreated?: () => void;
}

export default function InvitationModal({
<<<<<<< HEAD
                                            openState,
                                            setOpenState,
                                            onJobCreated,
                                        }: Props) {
=======
    openState,
    setOpenState,
    onJobCreated,
}: Props) {
    // const isOverflowing = 90
>>>>>>> c98af8a8c6d98a963d79da821e5752488bc922f4

    return (
        <WrappedModal
            panelClassName="!max-w-none !rounded-xl !w-[92vw] !p-10"
            isOpen={openState}
            setIsOpen={setOpenState}
            title={
                <div className="flex w-full flex-row items-center justify-between pb-10">
                    <div className="text-4xl font-bold">Invitations</div>
                    <button
                        className="h-fit w-fit rounded-full text-end text-xl"
                        type="button"
                        onClick={() => setOpenState(false)}>
                        <IoCloseSharp size="2rem" />
                    </button>
                </div>
            }>
<<<<<<< HEAD
            <div className="flex flex-row justify-evenly flex-wrap overflow-scroll gap-6 pb-2 relative scroll-box">
                <InvitationItem />
=======
            <div className="relative flex flex-row gap-6 overflow-scroll border-r-2 pb-4">
>>>>>>> c98af8a8c6d98a963d79da821e5752488bc922f4
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
<<<<<<< HEAD
=======
                <div></div>
>>>>>>> c98af8a8c6d98a963d79da821e5752488bc922f4
            </div>
        </WrappedModal>
    );
}
