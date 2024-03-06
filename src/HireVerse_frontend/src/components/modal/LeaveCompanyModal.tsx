import {IoCloseSharp} from "react-icons/io5";
import WrappedModal from "../form/WrappedModal";
import {Dispatch, FormEvent, SetStateAction} from "react";
import {useLeaveCompany} from "../../datas/mutations/companyMutations";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Company} from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import {toast} from "react-toastify";
import {defaultToastOptions} from "../../layouts/ManagementPageLayout";

interface Props {
    openState: boolean;
    setOpenState: Dispatch<SetStateAction<boolean>>;
    onConfirm?: () => void;
}

export default function LeaveCompanyModal({
                                              openState,
                                              setOpenState,
                                              onConfirm,
                                          }: Props) {
    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);

    const leaveMutation = useLeaveCompany()
    const leaveCompany = (e: FormEvent) => {
        e.preventDefault()
        if (selectedCompany) {
            leaveMutation.mutate(selectedCompany.id, {
                onSuccess: () => {
                    toast.success("You have left the company", defaultToastOptions)
                    setOpenState(false)
                    onConfirm && onConfirm()
                    window.location.reload()
                },
                onError: (error) => {
                    toast.error(error.message, defaultToastOptions)
                }
            })
        }
    }
    return (
        <WrappedModal
            panelClassName="!max-w-none !rounded-xl !w-[50vw] !min-w-[800px] !p-10"
            isOpen={openState}
            setIsOpen={setOpenState}
            title={
                <div>
                </div>
            }>
            <div className="flex flex-col place-items-center gap-4">
                <div className="text-2xl font-bold">Are you sure you want to leave this company?</div>
                <div className="flex flex-row gap-2">
                    <button onClick={() => setOpenState(false)}
                            className="font-semibold p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md w-48">Cancel
                    </button>
                    <button
                        onClick={leaveCompany}
                        className="font-semibold p-2 bg-red-700 hover:bg-red-800 text-white rounded-md w-48">Confirm
                    </button>
                </div>
            </div>
        </WrappedModal>
    )
}