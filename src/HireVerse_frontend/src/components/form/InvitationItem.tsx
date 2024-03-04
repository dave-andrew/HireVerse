import { BsLinkedin } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import {Invite} from "../../../../../.dfx/local/canisters/HireVerse_company/service.did";

export default function InvitationItem({invitation}: {invitation: Invite}) {
    return (
        <div className="relative flex h-80 w-64 flex-col justify-center gap-2 rounded-md border border-gray-200 shadow-md">
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
                    src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png"
                />
            </div>
            <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-2">
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-xl font-bold">
                        {invitation.inviter_id.toText()}
                    </div>
                    <div className="flex flex-col place-items-center">
                        <div className="flex flex-row place-items-center justify-center gap-2 text-sm font-bold">
                            <div className="text-blue-800">
                                <BsLinkedin />
                            </div>
                            in/binus-university
                        </div>
                        <div className="text-sm text-gray-600">
                            Jakarta, 2004
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-2">
                    <button className="flex grow flex-row place-items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-green-700 hover:bg-green-100 hover:text-green-900">
                        <BiCheck />
                        Accept
                    </button>
                    <button className="flex grow flex-row place-items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-red-700 hover:bg-red-100 hover:text-red-900">
                        <IoMdClose />
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}
