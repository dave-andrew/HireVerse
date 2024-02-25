import { TbFilterCog } from "react-icons/tb";
import CardLayout from "../../layouts/CardLayout";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, Suspense } from "react";
import WrappedDisclosure from "../utils/WrappedDisclosure";
import WrappedRadioGroup from "../utils/WrappedRadioGroup";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { CONSTANTS } from "../../utils/constants";
import { suspend } from "suspend-react";
import { HireVerse_job } from "../../../../declarations/HireVerse_job";

export interface IFilterForm {
    salaryStart: number;
    salaryEnd: number;
    industry: string;
    experience: string;
    datePosted: string;
}

interface Props {
    onApplyFilter: (data: IFilterForm) => void;
}

const jobService = HireVerse_job;

export default function JobFilter({ onApplyFilter }: Props) {
    const { register, control, handleSubmit } = useForm<IFilterForm>({
        defaultValues: {
            salaryStart: 0,
            salaryEnd: 0,
            industry: "",
            experience: "",
            datePosted: "",
        },
    });
    const industries =
        suspend(async () => await jobService.getAllIndustry(), []) ?? [];

    const onSubmit = (data: IFilterForm) => {
        onApplyFilter(data);
    };

    return (
        <>
            <div className="top-16 text-right">
                <Menu
                    as="div"
                    className="relative inline-block text-left z-50">
                    {({ close }) => (
                        <>
                            <div>
                                <CardLayout className="flex flex-col justify-center items-center p-3 cursor-pointer hover:bg-signature-hover-gray transition-colors">
                                    <Menu.Button className="inline-flex w-full justify-center rounded-md h-full text-sm font-medium ">
                                        <TbFilterCog size="1.5rem" />
                                    </Menu.Button>
                                </CardLayout>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95">
                                <Menu.Items className="absolute left-0 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                                    <div className="px-1 py-1 h-fit">
                                        <div className="flex flex-row justify-between items-center p-4 w-full">
                                            <h3 className="text-2xl font-bold">
                                                Filter Jobs
                                            </h3>
                                            <IoMdClose
                                                className="cursor-pointer"
                                                onClick={close}
                                                size={"1.5rem"}
                                            />
                                        </div>
                                        <WrappedDisclosure
                                            className="p-3 pl-5 cursor-pointer text-lg transition-colors"
                                            text="Salary Range">
                                            <div className="flex flex-col w-full text-black justify-center gap-3">
                                                <label className="flex flex-row font-medium text-lg">
                                                    <span className="flex flex-col justify-center bg-signature-gray items-center min-w-16 p-2 border-[1px] border-signature-gray rounded-l-lg">
                                                        Start
                                                    </span>
                                                    <input
                                                        {...register(
                                                            "salaryStart",
                                                            {
                                                                pattern:
                                                                    /^[0-9]*$/,
                                                            },
                                                        )}
                                                        type="number"
                                                        className="outline-0 col-span-8 w-full p-2 border-[1px] border-signature-gray rounded-r-lg"
                                                    />
                                                </label>
                                                <label className="flex flex-row font-medium text-lg">
                                                    <span className="flex flex-col justify-center bg-signature-gray items-center min-w-16 p-2 border-[1px] border-signature-gray rounded-l-lg">
                                                        End
                                                    </span>
                                                    <input
                                                        {...register(
                                                            "salaryEnd",
                                                            {
                                                                pattern:
                                                                    /^[0-9]*$/,
                                                            },
                                                        )}
                                                        type="number"
                                                        className="outline-0 col-span-8 w-full p-2 border-[1px] border-signature-gray rounded-r-lg"
                                                    />
                                                </label>
                                            </div>
                                        </WrappedDisclosure>
                                        <WrappedDisclosure
                                            className="p-3 pl-5 cursor-pointer text-lg transition-colors"
                                            panelClassName="!p-0"
                                            text="Industries">
                                            <Suspense
                                                fallback={
                                                    <div>Loading...</div>
                                                }>
                                                <WrappedRadioGroup
                                                    name="industry"
                                                    control={control}
                                                    selectionClassName="hover:bg-signature-gray rounded-none"
                                                    values={industries}
                                                />
                                            </Suspense>
                                        </WrappedDisclosure>
                                        <WrappedDisclosure
                                            className="p-3 pl-5 cursor-pointer text-lg transition-colors"
                                            panelClassName="!p-0"
                                            text="Experience">
                                            <WrappedRadioGroup
                                                name="experience"
                                                control={control}
                                                selectionClassName="hover:bg-signature-gray rounded-none"
                                                values={
                                                    CONSTANTS.COMPANY
                                                        .EXPERIENCES
                                                }
                                            />
                                        </WrappedDisclosure>
                                        <WrappedDisclosure
                                            className="p-3 pl-5 cursor-pointer text-lg transition-colors"
                                            panelClassName="!p-0"
                                            text="Date Posted">
                                            <WrappedRadioGroup
                                                name="datePosted"
                                                control={control}
                                                selectionClassName="hover:bg-signature-gray rounded-none"
                                                values={CONSTANTS.DATE.RANGE}
                                            />
                                        </WrappedDisclosure>
                                    </div>
                                    <div className="flex flex-row justify-end items-center p-4 w-full">
                                        <button
                                            onClick={() => {
                                                close();
                                                handleSubmit(onSubmit)();
                                            }}
                                            className="main-button !shadow-none transition-colors !rounded-md">
                                            Apply Filter
                                        </button>
                                    </div>
                                </Menu.Items>
                            </Transition>
                        </>
                    )}
                </Menu>
            </div>
        </>
    );
}
