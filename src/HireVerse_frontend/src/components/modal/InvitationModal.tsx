import {IoCloseSharp} from "react-icons/io5";
import WrappedModal from "../utils/WrappedModal";
import {Dispatch, SetStateAction} from "react";
import InvitationItem from "../form/InvitationItem";

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
            <div className="flex flex-row justify-evenly flex-wrap overflow-scroll gap-6 pb-2 relative scroll-box">
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
            </div>
        </WrappedModal>
    )

}