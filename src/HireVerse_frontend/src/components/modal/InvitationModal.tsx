import { IoCloseSharp } from "react-icons/io5";

import { Dispatch, SetStateAction, useEffect } from "react";
import InvitationItem from "../form/InvitationItem";
import WrappedModal from "../form/WrappedModal";
import { useGetUserInvitations } from "../../datas/queries/companyQueries";

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

    const { data, refetch } = useGetUserInvitations();

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <WrappedModal
            panelClassName="!max-w-none !rounded-xl !w-[910px] !p-10"
            isOpen={openState}
            setIsOpen={setOpenState}
            title={
                <div className="flex w-full flex-row items-center justify-between pb-10">
                    <div className="text-4xl font-bold">Invitations</div>
                    <button
                        className="h-fit w-fit rounded-md hover:bg-gray-200 p-1 text-end text-xl"
                        type="button"
                        onClick={() => setOpenState(false)}>
                        <IoCloseSharp size="2rem" />
                    </button>
                </div>
            }>
            <div className="relative flex flex-row flex-wrap gap-6 overflow-scroll pb-4">
                {data && data.length > 0 ? data.map((invitation, index) => {
                        return <InvitationItem key={index} invitation={invitation} refetch={refetch} />;
                    }) :
                    <div className="flex flex-col gap-4 py-4 w-full place-items-center">
                        <iframe
                            src="https://lottie.host/embed/37c77554-0b5e-4c5d-b6f1-5e501f906325/rsW6V04XTa.json"></iframe>
                        <div className="flex flex-col place-items-center">
                            <div className="text-lg font-bold">
                                Your invitation is empty
                            </div>
                            <div className="text-sm text-center text-gray-600">
                                Register your new company or ask your old manager to <br /> assign you to manage their company
                            </div>
                        </div>
                    </div>
                }
            </div>
        </WrappedModal>
    );
}
