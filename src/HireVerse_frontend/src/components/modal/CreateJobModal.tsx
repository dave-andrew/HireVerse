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
import useToaster from "../../hooks/useToaster";
import {
    Company,
    CreateJobInput,
} from "../../../../declarations/HireVerse_job/HireVerse_job.did";
import useLocalStorage from "../../hooks/useLocalStorage";
import useService from "../../hooks/useService";

interface Props {
    openState: boolean;
    setOpenState: Dispatch<SetStateAction<boolean>>;
    onEditFinished?: () => void;
}

interface IEditCompanyForm {
    name: string;
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

export default function CreateJobModal({
    openState,
    setOpenState,
    onEditFinished,
}: Props) {
    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);
    const {
        control,
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isValid },
    } = useForm<IEditCompanyForm, string>({
        defaultValues: {
            name: "",
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
    const { getJobService } = useService();
    const { errorToast } = useToaster();

    const checkError = () => {
        for (const error in errors) {
            const errorMessage =
                errors[error as keyof IEditCompanyForm]?.message;

            if (errorMessage) {
                errorToast({
                    message: errorMessage ?? "",
                });
                break;
            }
        }
    };

    const createJob = async (data: IEditCompanyForm) => {
        if (data.salaryStart > data.salaryEnd) {
            setError("salaryStart", {
                type: "manual",
                message: "Salary start cannot be higher than salary end",
            });
            errorToast({
                message: "Salary start cannot be higher than salary end",
            });
            return;
        }
        if (data.employmentType === "") {
            setError("employmentType", {
                type: "manual",
                message: "Please select an employment type",
            });
            errorToast({
                message: "Please select an employment type",
            });
            return;
        }
        if (data.industry === "Please Select an Industry") {
            setError("industry", {
                type: "manual",
                message: "Please select an industry",
            });
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

        const newJob: CreateJobInput = {
            industry: data.industry,
            position: data.name,
            employType: data.employmentType,
            short_description: data.shortDescription,
            requirements: data.requirements,
            job_description: data.jobDescription,
            location: data.location,
            contacts: data.applyContacts.map((contact) => contact.contact),
            company_id: selectedCompany.id,
            salary_end: BigInt(data.salaryEnd),
            salary_start: BigInt(data.salaryStart),
        };

        await getJobService().then((s) => s.createJob(newJob));
        if (onEditFinished) {
            onEditFinished();
        }
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
                    <div className="text-sm">
                        Choose the employment type for this job.
                    </div>
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
                {/* Salary Field */}
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Salary</div>
                    <div className="text-sm">
                        Input the salary range for this position in your
                        company.
                    </div>
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
                            {...register("requirements", {
                                required: "Requirements are required",
                            })}
                            placeholder="e.g. 5 years of experience in software engineering"
                            className="focus:ring-signature-primary h-full min-h-32 w-full rounded-md border-[1px] border-gray-200 p-2 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
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
                            {...register("shortDescription", {
                                required: "Short description is required",
                            })}
                            placeholder="e.g. We are looking for a software engineer to join our team."
                            className="focus:ring-signature-primary h-full min-h-32 w-full rounded-md border-[1px] border-gray-200 p-2 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
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
                            {...register("jobDescription", {
                                required: "Job description is required",
                            })}
                            placeholder="e.g. You will be responsible for developing software applications."
                            className="focus:ring-signature-primary h-full min-h-32 w-full rounded-md border-[1px] border-gray-200 p-2 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
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
                    <div className="text-sm">
                        Input the website, contact, or email to apply for this
                        job.
                    </div>
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
                                                placeholder:
                                                    "e.g. shane: sen@gmail.com",
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
                <label className="font-medium text-black">
                    I accept all the terms and requirements
                </label>
            </div>
            <div className="flex w-full items-center justify-center gap-2">
                <button
                    onClick={handleSubmitForm}
                    className=" border-signature-yellow text-signature-yellow w-fit rounded-md border-2 px-12 py-3 font-bold transition-colors hover:bg-yellow-400 hover:text-black">
                    Post Job
                </button>
            </div>
        </WrappedModal>
    );
}
