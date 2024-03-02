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
    openState,
    setOpenState,
    onJobCreated,
}: Props) {
    // const isOverflowing = 90

    return (
        <WrappedModal
            panelClassName="!max-w-none !rounded-xl !w-[40vw] !min-w-[600px] !p-10"
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
            <div className="relative flex flex-row gap-6 overflow-scroll border-r-2 pb-4">
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <div></div>
            </div>
        </WrappedModal>
    );
}
