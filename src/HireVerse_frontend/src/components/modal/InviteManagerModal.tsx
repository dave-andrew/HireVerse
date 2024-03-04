import Modal from "./Modal";
import {FormEvent, useEffect, useState} from "react";
import {IoIosSearch} from "react-icons/io";
import {useForm} from "react-hook-form";
import {useQueryGetUserObjectByEmail} from "../../datas/queries/jobQueries";
import {useCreateInvitation} from "../../datas/mutations/companyMutations";
import useLocalStorage from "../../hooks/useLocalStorage";
import {Company} from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import {toast} from "react-toastify";
import {defaultToastOptions} from "../../layouts/ManagementPageLayout";

interface ISearchEmailForm {
    email: string
}

export default function InviteManagerModal({isModalShown, toggleModal}: {
    isModalShown: boolean,
    toggleModal: () => void
}) {
    const [email, setEmail] = useState("")
    const {data: userData, refetch: getUserByEmail, error: searchError} = useQueryGetUserObjectByEmail(email)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmitEmail = async (data: ISearchEmailForm) => {
        setIsLoading(true)
        setEmail(data.email)
    }

    const {
        register: register1,
        handleSubmit: handleSubmit1,
        formState: {errors},
    } = useForm<ISearchEmailForm>();

    useEffect(() => {
        getUserByEmail().then(() => setIsLoading(false))
    }, [email])


    const mutation = useCreateInvitation()

    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);

    const [checked, setChecked] = useState(false)

    const [mutationLoading, setMutationLoading] = useState(false)
    const createInvitation = (e: FormEvent) => {
        e.preventDefault()
        if(!checked) {
            toast.warn(
                "You must agree to proceed.",
                defaultToastOptions,
            );
            return
        }
        if(!userData || !userData.internet_identity) return
        if(!selectedCompany) {
            return;
        }

        setMutationLoading(true)
        mutation.mutate({invitee: userData.internet_identity, company_id: selectedCompany.id}, {
            onError: (error) => {
                setMutationLoading(false)
                toast.error(
                    "Failed to create invitation",
                    defaultToastOptions,
                );
            },
            onSuccess: () => {
                setMutationLoading(false)
                toast.success(
                    "Invitation sent successfully",
                    defaultToastOptions,
                );
                toggleModal()
            }
        })
    }


    // @ts-ignore
    return (
        <Modal
            handleClose={toggleModal}
            show={isModalShown}
            modalTitle={"Invite Manager"}>
            <div className="grid lg:grid-cols-2">
                {/* Email Field */}
                <div className="flex flex-col lg:border-b border-gray-400 border-opacity-30 lg:py-7">
                    <div className="font-bold">Email</div>
                    <div className="text-sm">
                        Input the email of your to-be manager.
                    </div>
                </div>
                <form
                    onSubmit={handleSubmit1(handleSubmitEmail)}
                    className="border-b border-gray-400 border-opacity-30 py-7 flex flex-row gap-3 place-items-center">
                    <div className="h-full rounded-md border border-gray-400 grow">
                        <input
                            {...register1(`email`, {required: "Email is required"})}
                            type="text"
                            className={"h-full w-full rounded-md mb-1 px-3"}
                        />
                        <div
                            className={`hidden text-xs ${
                                (errors.email || searchError) ? "!block text-red-500" : "h-5"
                            }`}>
                            {errors.email?.message} {searchError?.message}
                        </div>
                    </div>
                    {isLoading ?
                        <div role="status" className="px-2">
                            <svg aria-hidden="true"
                                 className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                        </div> :
                        <button
                            type="submit"
                            className="p-2 mr-2 rounded-md hover:bg-gray-200 transition-colors">
                            <IoIosSearch size="1.5rem"/>
                        </button>
                    }
                </form>
            </div>
            {userData &&
                <div className="px-6 rounded-md bg-gray-100 p-4 gap-2">
                    <div className="font-bold mb-4">User Information</div>
                    <div className="text-lg font-bold">
                        {userData.first_name} {userData.last_name}
                    </div>
                    <div className="text-xs text-gray-600">
                        {userData.internet_identity.toText()}
                    </div>
                    <div className="text-sm">
                        {userData.email}
                    </div>
                    <div className="text-sm">
                        DOB: {(new Date(userData.birth_date)).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                    })}
                    </div>
                </div>
            }
            <div className="flex w-full items-center justify-center gap-4 ">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked((state) => !state)}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label className="w-[80%] font-medium text-gray-900">
                    <b>
                        I took all the responsibilities of introducing a
                        new manager to the company.{" "}
                    </b>
                    You <b className="inline text-red-600"> cannot </b>
                    undo this action once the user has accepted their
                    invites.
                </label>
            </div>
            <div className="flex w-full items-center justify-center gap-2">
                <button
                    onClick={createInvitation}
                    disabled={userData == null && mutationLoading}
                    className="bg-signature-yellow w-fit rounded-md px-12 py-3 font-bold shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed">
                    Invite Manager
                </button>
            </div>
        </Modal>
    )

}