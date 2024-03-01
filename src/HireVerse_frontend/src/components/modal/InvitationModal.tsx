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
            <div className="flex flex-row overflow-scroll gap-6 pb-4 border-r-2 relative">
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <InvitationItem />
                <div>

                </div>
            </div>
        </WrappedModal>
    )

}