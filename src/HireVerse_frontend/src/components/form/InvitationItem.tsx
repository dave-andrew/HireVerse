import { BsLinkedin } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { CompanyInvitation } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import imageHandler from "../../utils/imageHandler";
import { useRemoveInvitation, useAcceptInvitation } from "../../datas/mutations/companyMutations";
import { useState } from "react";
import { toast } from "react-toastify";
import { defaultToastOptions } from "../../layouts/ManagementPageLayout";


export default function InvitationItem({ invitation, refetch }: { invitation: CompanyInvitation, refetch: () => void }) {

    const mutation = useRemoveInvitation();
    const acceptMutation = useAcceptInvitation();
    const [isLoading, setIsLoading] = useState(false);
    const removeInvitation = () => {
        setIsLoading(true);
        mutation.mutate(invitation.invite.id, {
            onSuccess: () => {
                console.log("Success rejecting invitation");
                refetch();
                setIsLoading(false);
            },
            onError: (error) => {
                console.error(error);
                setIsLoading(false);
            },
        });
    };

    const acceptInvitation = () => {
        setIsLoading(true);
        acceptMutation.mutate(invitation.invite.id, {
            onSuccess: () => {
                setIsLoading(false);
                toast.success("You have successfully joined " + invitation.company.name, defaultToastOptions);
                refetch()
                window.location.reload()
            },
            onError: (error) => {
                setIsLoading(false);
                toast.error(error.message, defaultToastOptions)
            },
        });
    };

    return (
        <div
            className="relative flex h-80 w-64 flex-col justify-center gap-2 rounded-md border border-gray-200 shadow-md">
            <div className="absolute top-0 z-[-10] h-24 w-full bg-[url(public/backgrounds/subtle-prism.svg)]">
                {" "}
            </div>
            <div className="flex w-full place-items-center justify-center pt-6 text-center">
                {/* Company Profile Image */}
                <img
                    alt="Company Logo"
                    width="120rem"
                    height="auto"
                    className="aspect-square overflow-hidden rounded-full border border-gray-200 bg-white shadow-md"
                    src={imageHandler(invitation.company.image)}
                />
            </div>
            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-2">
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-xl font-bold">
                        {invitation.company.name}
                    </div>
                    <div className="flex flex-col place-items-center">
                        <div className="flex flex-row place-items-center justify-center gap-2 text-sm font-bold">
                            <div className="text-blue-800">
                                <BsLinkedin />
                            </div>
                            {invitation.company.linkedin}
                        </div>
                        <div className="text-sm text-gray-600">
                            {invitation.company.founded_country}, {invitation.company.founded_year.toString()}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-2">
                    <button
                        disabled={isLoading}
                        onClick={acceptInvitation}
                        className="disabled:bg-gray-100 flex grow flex-row place-items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-green-700 hover:bg-green-100 hover:text-green-900">
                        <BiCheck />
                        Accept
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={removeInvitation}
                        className="disabled:bg-gray-100 flex grow flex-row place-items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-900">
                        <IoMdClose />
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}
