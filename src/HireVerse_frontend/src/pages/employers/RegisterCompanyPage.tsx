import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import { PiLockKeyOpenBold } from "react-icons/pi";
import { TbWorldSearch } from "react-icons/tb";
import CustomTextField from "../../components/form/CustomTextField";
import { CustomCheckBox } from "../../components/form/CustomCheckBox";
import { useForm } from "react-hook-form";
import useService from "../../hooks/useService";
import { CreateCompanyInput } from "../../../../../.dfx/local/canisters/HireVerse_company/service.did";
import { useNavigate } from "react-router-dom";

interface IRegisterCompanyForm {
    companyName: string;
    foundedYear: number;
    country: string;
    location: string;
    companyLogo: FileList;
    linkedInProfile: string;
    isAgree: boolean;
}

export default function RegisterCompanyPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IRegisterCompanyForm>();

    const { getCompanyService } = useService();
    const navigate = useNavigate();

    const handleFormSubmit = async (data: IRegisterCompanyForm) => {
        const companyData: CreateCompanyInput = {
            name: data.companyName,
            founded_year: BigInt(data.foundedYear),
            profile: "", //TODO ADD PROFILE
            founded_country: data.country,
            office_locations: [data.location],
            social_medias: [], //TODO ADD SOCIAL MEDIAS

            linkedin: data.linkedInProfile,
        };
        await getCompanyService().then((s) => s.registerCompany(companyData));

        navigate("/employer", { replace: true });
    };

    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    return (
        <FrontPageLayout>
            <div className="flex h-[calc(100vh-4rem)] flex-col justify-center gap-6 pb-6 md:px-12 lg:px-24 xl:px-48 2xl:px-96">
                <div className="flex flex-row items-center justify-center">
                    <h1 className="my-2 text-3xl">Register Company</h1>
                </div>
                <div className="flex w-full flex-row-reverse items-start justify-center gap-5 px-5">
                    <div className="hidden h-full flex-col justify-center gap-4 lg:flex">
                        <CardLayout className="px-10 py-4">
                            Registering Company might take 4 - 6 business days to validate the legitimacy of the business
                        </CardLayout>
                        <CardLayout className="px-10 py-4">
                            Register Company to unlock features: <br /> - Create Hiring Notice <br /> - Manage Managers <br /> - Receive Reviews & Feedback
                        </CardLayout>
                        <CardLayout className="p-6">
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-row items-center gap-5">
                                    <div>
                                        <PiLockKeyOpenBold size="4rem" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-2xl font-bold">Save & Secure</h1>
                                        <p>Protected by Indonesian Officials with Internet Computers data Security & Protection</p>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-5">
                                    <div>
                                        <TbWorldSearch size="4rem" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-2xl font-bold">Faster Search</h1>
                                        <p>Post jobs hiring on the website and with HireVerse recommending system, match your potential employee</p>
                                    </div>
                                </div>
                            </div>
                        </CardLayout>
                    </div>
                    <div className="flex h-full flex-col justify-center gap-4">
                        <CardLayout className="flex h-fit w-[400px] flex-col gap-10 px-10 py-10">
                            <div className="flex flex-row justify-between gap-4">
                                <CustomTextField
                                    label="Company Name"
                                    type="text"
                                    className="w-full"
                                    useFormRef={register("companyName", {
                                        required: "Company Name is required",
                                    })}
                                    error={errors.companyName}
                                />
                                <CustomTextField
                                    label="Founded Year"
                                    className="w-full"
                                    type="number"
                                    min={1800}
                                    max={new Date().getFullYear()}
                                    useFormRef={register("foundedYear", {
                                        required: "Founded Year is required",
                                    })}
                                    error={errors.foundedYear}
                                />
                            </div>
                            <div className="flex flex-row">
                                <CustomTextField
                                    label="Country"
                                    type="text"
                                    className="w-full"
                                    useFormRef={register("country", {
                                        required: "Country is required",
                                    })}
                                    error={errors.country}
                                />
                            </div>
                            <div className="flex flex-row">
                                <CustomTextField
                                    label="Location"
                                    type="text"
                                    className="w-full"
                                    useFormRef={register("location", {
                                        required: "Location is required",
                                    })}
                                    error={errors.location}
                                />
                            </div>
                            <div className="flex flex-row">
                                <div className={`flex flex-col gap-[5px]`}>
                                    <div className="text-xs font-bold">Company Logo</div>
                                    <input
                                        {...register("companyLogo", {
                                            required: "Company Logo is required",
                                            validate: {
                                                checkFileSize: (fileList) => {
                                                    if (fileList[0] && fileList[0].size > MAX_FILE_SIZE) {
                                                        return `Company Logo must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB, current size: ${fileList[0].size / 1024 / 1024}MB`;
                                                    }
                                                    return true;
                                                },
                                            },
                                        })}
                                        type={"file"}
                                        accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg"
                                        className="outline-0"
                                        placeholder="Company Profile Image"
                                    />
                                    <div className={`hidden text-xs ${errors.companyLogo ? "!block text-red-500" : "h-5"}`}>{errors.companyLogo?.message}</div>
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <CustomTextField
                                    label="LinkedIn Profile Link"
                                    type="text"
                                    className="w-full"
                                    useFormRef={register("linkedInProfile", {
                                        required: "LinkedIn Profile Link is required",
                                    })}
                                    error={errors.linkedInProfile}
                                />
                            </div>
                            <div className="flex flex-row">
                                <CustomCheckBox
                                    className="w-full"
                                    useFormRef={register("isAgree", {
                                        required: "You must agree to the terms and conditions",
                                    })}
                                    error={errors.isAgree}
                                />
                            </div>
                            <div className="flex flex-row items-center justify-center">
                                <button
                                    className="main-button text-md mt-5 !h-fit !px-8"
                                    onClick={handleSubmit(handleFormSubmit)}>
                                    Register Company
                                </button>
                            </div>
                        </CardLayout>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
