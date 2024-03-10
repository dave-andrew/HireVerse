import React, { Dispatch, SetStateAction } from "react";
import WrappedModal from "../form/WrappedModal";
import { IoCloseSharp } from "react-icons/io5";
import TextDropdown from "../form/TextDropdown";
import { useFieldArray, useForm } from "react-hook-form";
import { CONSTANTS } from "../../utils/constants";
import useToaster from "../../hooks/useToaster";
import DynamicInputBox from "../form/DynamicInputBox";
import { MdAdd } from "react-icons/md";
import { FaRegTrashCan } from "react-icons/fa6";
import WrappedRichText from "../form/WrappedRichText";
import useRichTextEditor from "../../hooks/useRichTextEditor";
import { useRegisterCompany } from "../../datas/mutations/companyMutations";
import { CreateCompanyInput } from "../../../../declarations/HireVerse_company/HireVerse_company.did";

interface Props {
    openState: boolean;
    setOpenState: Dispatch<SetStateAction<boolean>>;
    onJobCreated?: () => void;
}

interface IRegisterCompanyForm {
    name: string;
    linkedin: string;
    foundedYear: number;
    foundedCountry: string;
    locations: {
        name: string;
        placeholder: string;
    }[];
    socialMedias: {
        url: string;
        placeholder: string;
    }[];
}

const defaultRegister = {
    name: "",
    linkedin: "",
    foundedYear: 0,
    foundedCountry: "Select a Country",
    locations: [],
    socialMedias: [],
};
export default function RegisterCompanyModal({ openState, setOpenState, onJobCreated }: Props) {
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm<IRegisterCompanyForm, string>({
        defaultValues: defaultRegister,
    });
    const {
        fields: fieldsLocation,
        append: appendLocation,
        remove: removeLocation,
    } = useFieldArray({
        name: "locations",
        control,
    });
    const {
        fields: fieldsSocialMedia,
        append: appendSocialMedia,
        remove: removeSocialMedia,
    } = useFieldArray({
        name: "socialMedias",
        control,
    });

    const mutation = useRegisterCompany();
    const { errorToast } = useToaster();
    const editor = useRichTextEditor();

    const checkError = () => {
        for (const error in errors) {
            const errorMessage = errors[error as keyof IRegisterCompanyForm]?.message;

            if (errorMessage) {
                errorToast({
                    message: errorMessage ?? "",
                });
                break;
            }
        }
    };

    const registerCompany = async (data: IRegisterCompanyForm) => {
        console.log("Check ");
        if (data.locations.length === 0) {
            errorToast({
                message: "Please input at least one location",
            });
            return;
        }
        for (const location of data.locations) {
            if (location.name === "") {
                errorToast({
                    message: "Location name cannot be empty",
                });
                return;
            }
        }
        for (const socialMedia of data.socialMedias) {
            if (socialMedia.url === "") {
                errorToast({
                    message: "Social media URL cannot be empty",
                });
                return;
            }
        }

        if (!editor) {
            errorToast({
                message: "An error occurred while creating the company. Please try again.",
            });
            return;
        }

        const html = editor.getHTML();
        if (html === "<p></p>") {
            errorToast({
                message: "Company profile cannot be empty",
            });
            return;
        }

        console.log("hahaha");

        const registerCompany: CreateCompanyInput = {
            profile: html,
            name: data.name,
            linkedin: data.linkedin,
            founded_year: BigInt(data.foundedYear),
            founded_country: data.foundedCountry,
            office_locations: data.locations.map((l) => l.name),
            social_medias: data.socialMedias.map((s) => s.url),
        };

        mutation.mutate(registerCompany);

        reset();
        setOpenState(false);
    };

    const handleSubmitForm = () => {
        checkError();
        console.log("hihihah");
        handleSubmit(registerCompany)();
    };

    return (
        <WrappedModal
            panelClassName="!max-w-none !rounded-xl !w-[50vw] !min-w-[800px] !p-10"
            isOpen={openState}
            setIsOpen={setOpenState}
            title={
                <div className="flex w-full flex-row items-center justify-between pb-10">
                    <div className="text-4xl font-bold">Register your company</div>
                    <button
                        className="h-fit w-fit rounded-md p-1 text-end text-xl transition-colors hover:bg-gray-100"
                        type="button"
                        onClick={() => setOpenState(false)}>
                        <IoCloseSharp size="2rem" />
                    </button>
                </div>
            }>
            <div className="grid grid-cols-2">
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Company Name</div>
                    <div className="text-sm">Input the name of the company.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full rounded-md">
                        <input
                            {...register("name", {
                                required: "Company name is required",
                            })}
                            type="text"
                            placeholder="e.g. Google Inc."
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] border-gray-200 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">LinkedIn Profile</div>
                    <div className="text-sm">Input the username of the company's LinkedIn profile.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full rounded-md">
                        <input
                            {...register("linkedin", {
                                required: "LinkedIn profile is required",
                            })}
                            type="text"
                            placeholder="e.g. linkedin.com/company/google"
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] border-gray-200 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Founded Year</div>
                    <div className="text-sm">Input the year the company was founded.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="h-full rounded-md">
                        <input
                            {...register("foundedYear", {
                                required: "Founded year is required",
                                min: 1000,
                                max: new Date().getFullYear(),
                            })}
                            min="1000"
                            max={new Date().getFullYear()}
                            type="number"
                            placeholder="e.g. 1998"
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] border-gray-200 px-3 outline-0 transition-all focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Country</div>
                    <div className="text-sm">Input the country where the company is founded.</div>
                </div>
                <div className="border-b border-gray-400 border-opacity-30 py-5">
                    <div className="h-full">
                        <TextDropdown
                            states={CONSTANTS.COMPANY.COUNTRIES}
                            className="w-full !p-0"
                            innerClassName="!h-full !ps-3 transition-all rounded-md border-[1px] focus:ring-2 focus:ring-signature-primary border-gray-200 focus:bg-gray-100 outline-0"
                            control={control}
                            name="foundedCountry"
                        />
                    </div>
                </div>
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Company Profile</div>
                    <div className="text-sm">Input the profile description of the company.</div>
                </div>
                <div className="border-b border-gray-400 border-opacity-30 py-5 ">
                    <div className="has-[:focus]:ring-signature-primary relative h-full rounded-md has-[:focus]:bg-gray-100 has-[:focus]:ring-2">
                        <WrappedRichText
                            editor={editor}
                            className="focus:ring-signature-primary h-full w-full rounded-md border-[1px] p-2 px-3 transition-all *:min-h-32 *:outline-0 focus:bg-gray-100 focus:ring-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Office Locations</div>
                    <div className="text-sm">Input the office locations of the company.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="flex h-full flex-col gap-2 rounded-md">
                        <DynamicInputBox
                            fields={fieldsLocation}
                            register={register}
                            remove={removeLocation}
                            className="flex flex-row items-center justify-center gap-2"
                            inputClassName="w-full h-12 px-4 border border-gray-200 focus:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-signature-primary "
                            inputObject="locations"
                            inputName="name"
                            addButton={
                                <div className="flex w-full justify-end">
                                    <button
                                        className="hover:input-signature-gray flex flex-row items-center justify-end gap-2 rounded-lg p-2 font-bold"
                                        onClick={() =>
                                            appendLocation({
                                                name: "",
                                                placeholder: "e.g. New York, USA",
                                            })
                                        }>
                                        <MdAdd className="bg-blue-primary rounded-full text-white" />
                                        <span>Add New Location</span>
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
                <div className="flex flex-col border-b border-gray-400 border-opacity-30 py-5">
                    <div className="font-bold">Social Media</div>
                    <div className="text-sm">Input the social media links of the company.</div>
                </div>
                <div className="border-b border-gray-400  border-opacity-30 py-5">
                    <div className="flex h-full flex-col gap-2 rounded-md">
                        <DynamicInputBox
                            fields={fieldsSocialMedia}
                            register={register}
                            remove={removeSocialMedia}
                            className="flex flex-row items-center justify-center gap-2"
                            inputClassName="w-full h-12 px-4 border border-gray-200 focus:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-signature-primary "
                            inputObject="socialMedias"
                            inputName="url"
                            addButton={
                                <div className="flex w-full justify-end">
                                    <button
                                        className="hover:input-signature-gray flex flex-row items-center justify-end gap-2 rounded-lg p-2 font-bold"
                                        onClick={() =>
                                            appendSocialMedia({
                                                url: "",
                                                placeholder: "e.g. https://www.linkedin.com/company/google",
                                            })
                                        }>
                                        <MdAdd className="bg-blue-primary rounded-full text-white" />
                                        <span>Add New Social Media</span>
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
                <button
                    onClick={handleSubmitForm}
                    className="bg-signature-yellow hover:bg-signature-yellow flex w-fit flex-row items-center justify-center gap-2 rounded-md px-7 py-3 text-lg font-semibold text-black transition-colors">
                    Register Company
                </button>
            </div>
        </WrappedModal>
    );
}
