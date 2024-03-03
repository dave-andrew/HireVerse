import {BsLinkedin} from "react-icons/bs";
import {BiCheck} from "react-icons/bi";
import {IoMdClose} from "react-icons/io";

export default function InvitationItem() {
    return (
        <div className="flex flex-col gap-2 rounded-md border border-gray-200 w-64 h-80 relative shadow-md">
            <div className="flex flex-col gap-6 mt-36 p-4">
                <div className="flex flex-col gap-2">
                    <div className="text-xl text-center font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
                        NVIDIA Corporation asdfjsadhfg
                    </div>
                    <div className="flex flex-col place-items-center">
                        <div className="text-sm font-bold flex flex-row justify-center place-items-center gap-2">
                            <div className="text-blue-800"><BsLinkedin/></div>
                            in/binus-university
                        </div>
                        <div className="text-sm text-gray-600">Jakarta, 2004</div>
                    </div>
                </div>

                <div className="flex flex-row justify-center gap-2">
                    <div className="text-green-700 py-2 grow text-sm justify-center place-items-center gap-2 rounded-md hover:bg-green-100 hover:text-green-900 flex flex-row">
                        <BiCheck />
                        Accept
                    </div>
                    <div className="text-red-700 py-2 grow text-sm justify-center place-items-center gap-2 rounded-md hover:bg-red-100 hover:text-red-900 flex flex-row">
                        <IoMdClose />
                        Decline
                    </div>
                </div>
            </div>
        </div>
    )
}