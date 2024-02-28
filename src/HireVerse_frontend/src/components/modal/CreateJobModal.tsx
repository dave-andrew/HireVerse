import { Dispatch, SetStateAction } from "react";
import WrappedModal from "../utils/WrappedModal";
import { IoCloseSharp } from "react-icons/io5";
import TextDropdown from "../form/TextDropdown";
import { useFieldArray, useForm } from "react-hook-form";
import WrappedRadioGroup from "../utils/WrappedRadioGroup";
import { CONSTANTS } from "../../utils/constants";
import DynamicInputBox from "../form/DynamicInputBox";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";

interface Props {
    openState: boolean;
    setOpenState: Dispatch<SetStateAction<boolean>>;
}

interface ICreateJobForm {
    position: string;
    employmentType: string;
    salaryStart: number;
    salaryEnd: number;
    industry: string;
    shortDescription: string;
    requirements: string;
    jobDescription: string;
    applyWebsite: string;
    location: string;
    applyContacts: {
        contact: string;
        placeholder?: string;
    }[];
    terms: boolean;
}

export default function CreateJobModal({ openState, setOpenState }: Props) {
    const { control, register, getValues } = useForm<ICreateJobForm, string>({
        defaultValues: {
            position: "",
            employmentType: "",
            industry: "Please Select an Industry",
            salaryStart: 0,
            salaryEnd: 0,
            shortDescription: "",
            requirements: "",
            jobDescription: "",
            applyWebsite: "",
            applyContacts: [],
            terms: false,
            location: "",
        },
    });
    const { fields, append, remove } = useFieldArray({
        name: "applyContacts",
        control,
    });

    const handleSubmit = () => {
        //
    };

    return (
        <WrappedModal
            panelClassName="!max-w-none !rounded-xl !w-[50vw] !p-10"
            isOpen={openState}
            setIsOpen={setOpenState}
            title={
                <div className="flex flex-row w-full justify-between items-center pb-10">
                    <div className="text-4xl font-bold">Post a New Job</div>
                    <button
                        className="h-fit w-fit rounded-full text-end text-xl"
                        type="button"
                        onClick={() => setOpenState(false)}>
                        <IoCloseSharp size="2rem" />
                    </button>
                </div>
            }>
            <div className="grid grid-cols-2">
                {/* Position Name Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Position Name</div>
                    <div className="text-sm">
                        Input the position name for this job.
                    </div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full rounded-md">
                        <input
                            {...register("position")}
                            type="text"
                            placeholder="e.g. Software Engineer"
                            className="h-full w-full transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0 px-3"
                        />
                    </div>
                </div>
                {/* Employment Type Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Employment Type</div>
                    <div className="text-sm">
                        Choose the employment type for this job.
                    </div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full">
                        <WrappedRadioGroup
                            values={CONSTANTS.JOB.EXPERIENCES}
                            className="w-full !p-0 grid grid-cols-2 gap-4"
                            selectionClassName="!h-full !ps-3 transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0"
                            control={control}
                            name="employmentType"
                        />
                    </div>
                </div>
                {/* Salary Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Salary</div>
                    <div className="text-sm">
                        Input the salary range for this position in your
                        company.
                    </div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="flex flex-row items-center gap-2 h-full rounded-md">
                        <input
                            {...register("salaryStart")}
                            type="number"
                            placeholder="e.g. 10.000"
                            className="h-full w-full transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0 px-3"
                        />
                        -
                        <input
                            {...register("salaryEnd")}
                            type="number"
                            placeholder="e.g. 50.000"
                            className="h-full w-full transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0 px-3"
                        />
                    </div>
                </div>
                {/* Industries Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Industry</div>
                    <div className="text-sm">
                        Choose the industry for this job.
                    </div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full">
                        <TextDropdown
                            states={CONSTANTS.JOB.INDUSTRIES}
                            className="w-full !p-0"
                            innerClassName="!h-full !ps-3 transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0"
                            control={control}
                            name="industry"
                        />
                    </div>
                </div>
                {/* Requirements Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Requirements</div>
                    <div className="text-sm">
                        Input the requirements to get this role.
                    </div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full rounded-md">
                        <textarea
                            {...register("requirements")}
                            placeholder="e.g. 5 years of experience in software engineering"
                            className="p-2 h-full min-h-32 w-full transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0 px-3"
                        />
                    </div>
                </div>
                {/* Short Description Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Short Description</div>
                    <div className="text-sm">
                        Input the short description of this job.
                    </div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full rounded-md">
                        <textarea
                            {...register("shortDescription")}
                            placeholder="e.g. We are looking for a software engineer to join our team."
                            className="p-2 h-full min-h-32 w-full transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0 px-3"
                        />
                    </div>
                </div>
                {/* Job Description Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Job Description</div>
                    <div className="text-sm">
                        Describe what this role does in detail.
                    </div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full rounded-md">
                        <textarea
                            {...register("jobDescription")}
                            placeholder="e.g. You will be responsible for developing software applications."
                            className="p-2 h-full min-h-32 w-full transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0 px-3"
                        />
                    </div>
                </div>
                {/* Salary Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Location</div>
                    <div className="text-sm">
                        Input the location for this job.
                    </div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="flex flex-row items-center gap-2 h-full rounded-md">
                        <input
                            {...register("location")}
                            type="text"
                            placeholder="e.g. New York, USA"
                            className="h-full w-full transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0 px-3"
                        />
                    </div>
                </div>
                {/* Apply Website Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Apply Contacts</div>
                    <div className="text-sm">
                        Input the website, contact, or email to apply for this
                        job.
                    </div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="flex flex-col h-full rounded-md gap-2">
                        <DynamicInputBox
                            fields={fields}
                            register={register}
                            remove={remove}
                            className="flex flex-row items-center justify-center gap-2"
                            inputClassName="w-full h-12 px-4 border border-gray-200 focus:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-signature-primary "
                            addButton={
                                <div className="flex w-full justify-end">
                                    <button
                                        className="flex flex-row font-bold items-center justify-end gap-2 hover:input-signature-gray p-2 rounded-lg"
                                        onClick={() =>
                                            append({
                                                contact: "aa",
                                                placeholder:
                                                    "e.g. shane: sen@gmail.com",
                                            })
                                        }>
                                        <MdAdd className="rounded-full bg-blue-primary text-white" />
                                        <span>Add New Contacts</span>
                                    </button>
                                </div>
                            }
                            removeButton={
                                <button className="flex items-center transition-colors hover:bg-red-500 hover:text-white justify-center border-red-500 border-2 text-red-500 p-2 w-full h-full rounded-md">
                                    <FaRegTrashCan size="1.1rem" />
                                </button>
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="flex w-full items-center justify-center gap-2 pt-20 pb-10">
                <input
                    {...register("terms")}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label className="font-medium text-black">
                    I accept all the terms and requirements
                </label>
            </div>
            <div className="flex w-full items-center justify-center gap-2">
                <button className=" border-2 border-signature-yellow text-signature-yellow hover:bg-yellow-400 hover:text-black transition-colors w-fit rounded-md px-12 py-3 font-bold">
                    Post Job
                </button>
            </div>
        </WrappedModal>
    );
}
