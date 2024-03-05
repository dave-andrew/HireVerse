import { TbFilterCog } from "react-icons/tb";
import CardLayout from "../../layouts/CardLayout";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import WrappedDisclosure from "./WrappedDisclosure";
import WrappedRadioGroup from "./WrappedRadioGroup";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { CONSTANTS } from "../../utils/constants";
import { getJobIndustries } from "../../datas/queries/jobQueries";
import { MdCurrencyExchange } from "react-icons/md";
import TextDropdown from "./TextDropdown";
import WrappedAutoDropdown from "./WrappedAutoDropdown";

export interface IFilterForm {
    salaryStart: number;
    salaryEnd: number;
    currency: string;
    industry: string;
    experience: string;
    datePosted: string;
}

interface Props {
    onApplyFilter: (data: IFilterForm) => void;
}

export default function JobFilter({ onApplyFilter }: Props) {
    const { data: industries, refetch: getIndustries } = getJobIndustries();
    const { register, control, handleSubmit } = useForm<IFilterForm>({
        defaultValues: {
            salaryStart: 0,
            salaryEnd: 0,
            currency: "Rp",
            industry: "",
            experience: "",
            datePosted: "",
        },
    });

    const onSubmit = (data: IFilterForm) => {
        const splitCurrency = data.currency.split(" ");
        data.currency = splitCurrency[0];
        onApplyFilter(data);
    };

    useEffect(() => {
        getIndustries();
    }, []);

    return (
        <>
            <div className="top-16 text-right">
                <Menu
                    as="div"
                    className="relative z-50 inline-block text-left">
                    {({ close }) => (
                        <>
                            <div>
                                <Menu.Button className="inline-flex h-full w-full justify-center rounded-md text-sm font-medium ">
                                    <CardLayout className="hover:bg-signature-hover-gray flex cursor-pointer flex-col items-center justify-center p-3 transition-colors">
                                        <TbFilterCog size="1.5rem" />
                                    </CardLayout>
                                </Menu.Button>
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
                                    <div className="h-fit px-1 py-1">
                                        <div className="flex w-full flex-row items-center justify-between p-4">
                                            <h3 className="m-0 p-0 text-2xl font-bold">
                                                Filter Jobs
                                            </h3>
                                            <IoMdClose
                                                className="cursor-pointer"
                                                onClick={close}
                                                size={"1.5rem"}
                                            />
                                        </div>
                                        <WrappedDisclosure
                                            className="cursor-pointer p-3 pl-5 text-lg transition-colors"
                                            text="Salary Range">
                                            <div className="flex w-full flex-col justify-center gap-3 text-black">
                                                <label className="flex flex-row text-lg">
                                                    <span className="bg-signature-gray font-normal border-signature-gray flex min-w-16 flex-col items-center justify-center rounded-l-lg border-[1px] p-2">
                                                        <MdCurrencyExchange className="w-[30px] h-auto" />
                                                    </span>
                                                    <WrappedAutoDropdown
                                                        data={CONSTANTS.JOB.CURRENCY}
                                                        // className="w-full !p-0"
                                                        // innerClassName="!h-full !ps-3 transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0"
                                                        control={control}
                                                        name="currency"
                                                    />
                                                </label>
                                                <label className="flex flex-row text-lg">
                                                    <span className="bg-signature-gray font-normal border-signature-gray flex min-w-16 flex-col items-center justify-center rounded-l-lg border-[1px] p-2">
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
                                                        className="border-signature-gray col-span-8 w-full rounded-r-lg border-[1px] p-2 outline-0"
                                                    />
                                                </label>
                                                <label className="flex flex-row text-lg">
                                                    <span className="bg-signature-gray font-normal border-signature-gray flex min-w-16 flex-col items-center justify-center rounded-l-lg border-[1px] p-2">
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
                                                        className="border-signature-gray col-span-8 w-full rounded-r-lg border-[1px] p-2 outline-0"
                                                    />
                                                </label>
                                            </div>
                                        </WrappedDisclosure>
                                        <WrappedDisclosure
                                            className="cursor-pointer p-3 pl-5 text-lg transition-colors"
                                            panelClassName="!p-0"
                                            text="Industries">
                                            {industries?.length == 0 ? (
                                                <label>Loading</label>
                                            ) : (
                                                <WrappedRadioGroup
                                                    name="industry"
                                                    control={control}
                                                    selectionClassName="hover:bg-gray-200 rounded-none"
                                                    values={industries ?? []}
                                                />
                                            )}
                                        </WrappedDisclosure>
                                        <WrappedDisclosure
                                            className="cursor-pointer p-3 pl-5 text-lg transition-colors"
                                            panelClassName="!p-0"
                                            text="Experience">
                                            <WrappedRadioGroup
                                                name="experience"
                                                control={control}
                                                selectionClassName="hover:bg-gray-200 rounded-none"
                                                values={
                                                    CONSTANTS.JOB.EXPERIENCES
                                                }
                                            />
                                        </WrappedDisclosure>
                                        <WrappedDisclosure
                                            className="cursor-pointer p-3 pl-5 text-lg transition-colors"
                                            panelClassName="!p-0"
                                            text="Date Posted">
                                            <WrappedRadioGroup
                                                name="datePosted"
                                                control={control}
                                                selectionClassName="hover:bg-gray-200 rounded-none"
                                                values={CONSTANTS.DATE.RANGE}
                                            />
                                        </WrappedDisclosure>
                                    </div>
                                    <div className="flex w-full flex-row items-center justify-end p-4">
                                        <button
                                            onClick={() => {
                                                close();
                                                handleSubmit(onSubmit)();
                                            }}
                                            className="main-button !rounded-md !shadow-none transition-colors">
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
