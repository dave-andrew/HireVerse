import { BsLinkedin } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

export default function InvitationItem() {
    return (
        <div className="relative flex h-80 w-64 flex-col gap-2 rounded-md border border-gray-200">
            <div className="mt-36 flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-2">
                    <div className="overflow-hidden overflow-ellipsis whitespace-nowrap text-center text-xl font-bold">
                        NVIDIA Corporation asdfjsadhfg
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
                    <div className="flex grow flex-row place-items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-green-700 hover:bg-green-200 hover:text-green-900">
                        <BiCheck />
                        Accept
                    </div>
                    <div className="flex grow flex-row place-items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-red-700 hover:bg-red-200 hover:text-red-900">
                        <IoMdClose />
                        Decline
                    </div>
                </div>
            </div>
        </div>
    );
}
