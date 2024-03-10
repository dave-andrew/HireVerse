import React, { Dispatch, SetStateAction } from "react";
import WrappedModal from "../form/WrappedModal";
import { IoCloseSharp } from "react-icons/io5";
import { useFieldArray, useForm } from "react-hook-form";
import WrappedRadioGroup from "../form/WrappedRadioGroup";
import { CONSTANTS } from "../../utils/constants";
import DynamicInputBox from "../form/DynamicInputBox";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import useToaster from "../../hooks/useToaster";
import { Company, CreateJobInput } from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useCreateNewJob } from "../../datas/mutations/jobMutation";
import WrappedAutoDropdown from "../form/WrappedAutoDropdown";
import useRichTextEditor from "../../hooks/useRichTextEditor";
import WrappedRichText from "../form/WrappedRichText";
import { Placeholder } from "@tiptap/extension-placeholder";

interface Props {
    openState: boolean;
    setOpenState: Dispatch<SetStateAction<boolean>>;
}

interface IEditCompanyForm {
    name: string;
    employmentType: string;
    currency: string;
    salaryStart: number;
    salaryEnd: number;
    industry: string;
    applyWebsite: string;
    location: string;
    applyContacts: {
        contact: string;
        placeholder?: string;
    }[];
    terms: boolean;
}

const defaultValues = {
    name: "",
    employmentType: "",
    industry: "",
    currency: "",
    salaryStart: 0,
    salaryEnd: 0,
    applyWebsite: "",
    applyContacts: [],
    terms: false,
    location: "",
};

export default function CreateJobModal({ openState, setOpenState }: Props) {
    const [selectedCompany, _] = useLocalStorage<Company | null>("selectedCompany", null);
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IEditCompanyForm, string>({ defaultValues });
    const { fields, append, remove } = useFieldArray({
        name: "applyContacts",
        control,
    });
    const shortDescriptionEditor = useRichTextEditor({
        addExtensions: [
            Placeholder.configure({
                placeholder: "e.g. We are looking for a software engineer to join our team.",
            }),
        ],
    });
    const jobDescriptionEditor = useRichTextEditor({
        addExtensions: [
            Placeholder.configure({
                placeholder: "e.g. You will be responsible for developing software applications.",
            }),
        ],
    });
    const requirementsEditor = useRichTextEditor({
        addExtensions: [
            Placeholder.configure({
                placeholder: "e.g. 5 years of experience in software engineering",
            }),
        ],
    });
    const mutation = useCreateNewJob();
    const { errorToast } = useToaster();

    const checkError = () => {
        for (const error in errors) {
            const errorMessage = errors[error as keyof IEditCompanyForm]?.message;

            if (errorMessage) {
                errorToast({
                    message: errorMessage ?? "",
                });
                break;
            }
        }
    };

    const createJob = async (data: IEditCompanyForm) => {
        console.log(data);
        // return;
        if (data.currency === "") {
            errorToast({
                message: "Please choose a currency",
            });
            return;
        }
        if (BigInt(data.salaryStart) > BigInt(data.salaryEnd)) {
            errorToast({
                message: "Salary start cannot be higher than salary end",
            });
            return;
        }
        if (data.employmentType === "") {
            errorToast({
                message: "Please select an employment type",
            });
            return;
        }
        if (data.industry === "") {
            errorToast({
                message: "Please select an industry",
            });
            return;
        }
        if (data.applyContacts.length === 0) {
            errorToast({
                message: "Please input at least one contact",
            });
            return;
        }

        if (!selectedCompany) {
            errorToast({
                message: "Error: No company selected",
            });
            return;
        }

        const shortDescription = shortDescriptionEditor?.getHTML();
        const jobDescription = jobDescriptionEditor?.getHTML();
        const requirements = requirementsEditor?.getHTML();
        if (shortDescription === "<p></p>") {
            errorToast({
                message: "Short description is required",
            });
            return;
        }
        if (jobDescription === "<p></p>") {
            errorToast({
                message: "Job description is required",
            });
            return;
        }
        if (requirements === "<p></p>") {
            errorToast({
                message: "Requirements is required",
            });
            return;
        }
        const newJob: CreateJobInput = {
            industry: data.industry,
            position: data.name,
            employType: data.employmentType,
            short_description: shortDescription ?? "",
            requirements: requirements ?? "",
            job_description: jobDescription ?? "",
            location: data.location,
            currency: data.currency.split(" ")[0],
            contacts: data.applyContacts.map((contact) => contact.contact),
            company_id: selectedCompany.id,
            salary_end: BigInt(data.salaryEnd),
            salary_start: BigInt(data.salaryStart),
        };

        mutation.mutate(newJob);
        reset();
        setOpenState(false);
    };

    const handleSubmitForm = () => {
        checkError();
        handleSubmit(createJob)();
    };

    return (
        <WrappedModal
            panelClassName="!max-w-none !rounded-xl !w-[50vw] !p-10"
            isOpen={openState}
            setIsOpen={setOpenState}
            title={
                <div className="flex w-full flex-row items-center justify-between pb-10">
                    <div className="text-4xl font-bold">Post a New Job</div>
                    <button
                        className="h-fit w-fit rounded-md p-1 text-end text-xl transition-colors hover:bg-gray-100"
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
                    <div className="text-sm">Input the position name for this job.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full rounded-md">
                        <input
                            {...register("name", {
                                required: "Position name is required",
                            })}
                            type="text"
                            placeholder="e.g. Software Engineer"
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] border-gray-200 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                {/* Employment Type Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Employment Type</div>
                    <div className="text-sm">Choose the employment type for this job.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full">
                        <WrappedRadioGroup
                            values={CONSTANTS.JOB.EXPERIENCES}
                            className="grid w-full grid-cols-2 gap-4 !p-0"
                            selectionClassName="!h-full !ps-3 transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0"
                            control={control}
                            rules={{ required: "Employment type is required" }}
                            name="employmentType"
                        />
                    </div>
                </div>
                {/* Currency Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Currency</div>
                    <div className="text-sm">Input the currency for the salary of this job.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full">
                        <WrappedAutoDropdown
                            data={CONSTANTS.JOB.CURRENCY}
                            className="w-full !p-0"
                            innerClassName="w-full flex-1 !h-full !ps-3 transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0"
                            control={control}
                            name="currency"
                            placeholder="e.g. Rp Rupiah"
                        />
                    </div>
                </div>
                {/* Salary Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Salary</div>
                    <div className="text-sm">Input the salary range for this position in your company.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="flex h-full flex-row items-center gap-2 rounded-md">
                        <input
                            {...register("salaryStart", {
                                required: "Salary start is required",
                                min: 0,
                            })}
                            type="number"
                            placeholder="e.g. 10.000"
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] border-gray-200 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
                        />
                        -
                        <input
                            {...register("salaryEnd", {
                                required: "Salary end is required",
                                min: 0,
                            })}
                            type="number"
                            placeholder="e.g. 50.000"
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] border-gray-200 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                {/* Industries Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Industry</div>
                    <div className="text-sm">Choose the industry for this job.</div>
                </div>
                <div className="border-b border-gray-400 border-opacity-30 py-5">
                    <div className="h-full ">
                        <WrappedAutoDropdown
                            data={CONSTANTS.JOB.INDUSTRIES}
                            className="w-full !p-0"
                            innerClassName="!h-full !ps-3 transition-all rounded-md !border-[1px] focus:ring-2 focus:ring-signature-primary !border-gray-200 focus:bg-gray-100 outline-0"
                            control={control}
                            name="industry"
                            placeholder="e.g. Software Development"
                        />
                    </div>
                </div>
                {/* Short Description Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Short Description</div>
                    <div className="text-sm">Input the short description of this job.</div>
                </div>
                <div className="border-b border-gray-400 border-opacity-30 py-5 ">
                    <div className="has-[:focus]:ring-signature-primary relative h-full rounded-md has-[:focus]:bg-gray-100 has-[:focus]:ring-2">
                        <WrappedRichText
                            editor={shortDescriptionEditor}
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] p-2 px-3 transition-all *:min-h-32 *:outline-0 focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                {/* Job Description Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Job Description</div>
                    <div className="text-sm">Describe what this role does in detail.</div>
                </div>
                <div className="border-b border-gray-400 border-opacity-30 py-5 ">
                    <div className="has-[:focus]:ring-signature-primary relative h-full rounded-md has-[:focus]:bg-gray-100 has-[:focus]:ring-2">
                        <WrappedRichText
                            editor={jobDescriptionEditor}
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] p-2 px-3 transition-all *:min-h-32 *:outline-0 focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                {/* Requirements Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Requirements</div>
                    <div className="text-sm">Input the requirements to get this role.</div>
                </div>
                <div className="border-b border-gray-400 border-opacity-30 py-5 ">
                    <div className="has-[:focus]:ring-signature-primary relative h-full rounded-md has-[:focus]:bg-gray-100 has-[:focus]:ring-2">
                        <WrappedRichText
                            editor={requirementsEditor}
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] p-2 px-3 transition-all *:min-h-32 *:outline-0 focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                {/* Salary Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Location</div>
                    <div className="text-sm">Input the location for this job.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="flex h-full flex-row items-center gap-2 rounded-md">
                        <input
                            {...register("location", {
                                required: "Location is required",
                            })}
                            type="text"
                            placeholder="e.g. New York, USA"
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] border-gray-200 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                {/* Apply Website Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Apply Contacts</div>
                    <div className="text-sm">Input the website, contact, or email to apply for this job.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="flex h-full flex-col gap-2 rounded-md">
                        <DynamicInputBox
                            fields={fields}
                            register={register}
                            remove={remove}
                            className="flex flex-row items-center justify-center gap-2"
                            inputClassName="w-full h-12 px-4 border border-gray-200 focus:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-signature-primary "
                            inputObject="applyContacts"
                            inputName="contact"
                            addButton={
                                <div className="flex w-full justify-end">
                                    <button
                                        className="hover:input-signature-gray flex flex-row items-center justify-end gap-2 rounded-lg p-2 font-bold"
                                        onClick={() =>
                                            append({
                                                contact: "",
                                                placeholder: "e.g. shane: sen@gmail.com",
                                            })
                                        }>
                                        <MdAdd className="bg-blue-primary rounded-full text-white" />
                                        <span>Add New Contacts</span>
                                    </button>
                                </div>
                            }
                            removeButton={
                                <button className="flex h-full w-full items-center justify-center rounded-md border-2 border-red-500 p-2 text-red-500 transition-colors hover:bg-red-500 hover:text-white">
                                    <FaRegTrashCan size="1.1rem" />
                                </button>
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="flex w-full items-center justify-center gap-2 pb-10 pt-20">
                <input
                    {...register("terms", {
                        required: "You must accept the terms and requirements",
                    })}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                />
                <label className="font-medium text-black">I accept all the terms and requirements</label>
            </div>
            <div className="flex w-full items-center justify-center gap-2">
                <button
                    onClick={handleSubmitForm}
                    className="bg-signature-yellow hover:bg-signature-yellow w-fit rounded-md px-10 py-3 text-lg font-semibold text-black transition-colors">
                    Post Job
                </button>
            </div>
        </WrappedModal>
    );
}
