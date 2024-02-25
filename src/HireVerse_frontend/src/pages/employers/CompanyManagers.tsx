import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import { useState } from "react";
import ManagerTable from "../../components/company/ManagerTable";
import Modal from "../../components/modal/Modal";

export default function CompanyManagers() {
    let [isModalShown, setIsModalShown] = useState(false);

    const toggleModal = () => {
        setIsModalShown(!isModalShown);
    };

    return (
        <>
            <div className="absolute z-0 h-96 w-full bg-[url(/backgrounds/liquid-cheese.svg)] bg-cover opacity-50"></div>
            <ManagementPageLayout>
                <div className="z-10 flex flex-col gap-16 px-14 py-8">
                    <div className="mt-8 text-4xl font-bold">Managers</div>
                    <div className="flex flex-col gap-4">
                        <div className="flex h-12 flex-row place-items-end justify-end gap-4">
                            <CardLayout className="flex h-full w-96 flex-row items-center bg-white">
                                <span className="flex flex-1 flex-row gap-2 rounded-bl-xl rounded-tl-xl p-3 transition-colors has-[:focus]:bg-gray-100">
                                    <IoIosSearch size="1.5rem" />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent outline-0"
                                        placeholder="Search Job"
                                    />
                                </span>
                            </CardLayout>
                            <button
                                className="h-full"
                                onClick={toggleModal}>
                                <CardLayout className="flex h-full place-items-center justify-center rounded-xl px-8 py-4 hover:bg-gray-100">
                                    + Add Manager
                                </CardLayout>
                            </button>
                        </div>
                        <ManagerTable />
                    </div>
                </div>

                <Modal
                    handleClose={toggleModal}
                    show={isModalShown}
                    modalTitle={"Invite Manager"}>
                    <div className="grid grid-cols-2">
                        {/* Email Field */}
                        <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                            <div className="font-bold">Email</div>
                            <div className="text-sm">
                                Input the email of your to-be manager.
                            </div>
                        </div>
                        <div className="border-b border-gray-400  border-opacity-30 py-5">
                            <div className="h-full rounded-md border border-gray-900">
                                <input
                                    type="text"
                                    className={"h-full w-full rounded-md  px-3"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center gap-4 ">
                        <input
                            type="checkbox"
                            value=""
                            checked={true}
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                        />
                        <label className="w-[80%] font-medium text-gray-900 dark:text-gray-300">
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
                        <button className="bg-signature-yellow w-fit rounded-md px-12 py-3 font-bold shadow-md">
                            Invite Manager
                        </button>
                    </div>
                </Modal>
            </ManagementPageLayout>
        </>
    );
}
