import { IoCloseSharp } from "react-icons/io5";

import {Dispatch, SetStateAction, useEffect} from "react";
import InvitationItem from "../form/InvitationItem";
import WrappedModal from "../form/WrappedModal";
import {useGetUserInvitations} from "../../datas/queries/companyQueries";

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

    const {data, refetch} = useGetUserInvitations();

    useEffect(() => {
        console.log(data)
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
                        className="h-fit w-fit rounded-full text-end text-xl"
                        type="button"
                        onClick={() => setOpenState(false)}>
                        <IoCloseSharp size="2rem" />
                    </button>
                </div>
            }>
            <div className="relative flex flex-row flex-wrap gap-6 overflow-scroll pb-4">
                {data?.map((invitation, index) => {
                    return <InvitationItem key={index} invitation={invitation} refetch={refetch} />;
                })}
            </div>
        </WrappedModal>
    );
}
