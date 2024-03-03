import { BsLinkedin } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

export default function InvitationItem() {
    return (
<<<<<<< HEAD
        <div className="flex flex-col gap-2 rounded-md border border-gray-200 w-64 h-80 relative shadow-md">
            <div className="flex flex-col gap-6 mt-36 p-4">
=======
        <div className="relative flex h-80 w-64 flex-col gap-2 rounded-md border border-gray-200">
            <div className="mt-36 flex flex-col gap-6 p-4">
>>>>>>> c98af8a8c6d98a963d79da821e5752488bc922f4
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
<<<<<<< HEAD
                    <div className="text-green-700 py-2 grow text-sm justify-center place-items-center gap-2 rounded-md hover:bg-green-100 hover:text-green-900 flex flex-row">
                        <BiCheck />
                        Accept
                    </div>
                    <div className="text-red-700 py-2 grow text-sm justify-center place-items-center gap-2 rounded-md hover:bg-red-100 hover:text-red-900 flex flex-row">
=======
                    <div className="flex grow flex-row place-items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-green-700 hover:bg-green-200 hover:text-green-900">
                        <BiCheck />
                        Accept
                    </div>
                    <div className="flex grow flex-row place-items-center justify-center gap-2 rounded-md px-2 py-2 text-sm text-red-700 hover:bg-red-200 hover:text-red-900">
>>>>>>> c98af8a8c6d98a963d79da821e5752488bc922f4
                        <IoMdClose />
                        Decline
                    </div>
                </div>
            </div>
        </div>
    );
}
