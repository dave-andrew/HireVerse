import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import { PiLockKeyOpenBold } from "react-icons/pi";
import { TbWorldSearch } from "react-icons/tb";
import CustomTextField from "../../components/form/CustomTextField";
import { CustomCheckBox } from "../../components/form/CustomCheckBox";

export default function RegisterCompany() {
    return (
        <FrontPageLayout>
                <div className="flex h-[calc(100vh-4rem)] flex-col pb-6 px-96 gap-8 justify-center">
                    <div className="flex flex-row items-center justify-center">
                        <h1 className="main-title">Register Company</h1>
                    </div>
                    <div className="flex w-full flex-row-reverse  items-start gap-5 px-5">
                        <div className="h-full justify-center flex flex-col gap-4">
                            <CardLayout className="px-10 py-4">
                                Registering Company might take 4 - 6 business days
                                to validate the legitimacy of the business
                            </CardLayout>
                            <CardLayout className="px-10 py-4">
                                Register Company to unlock features: <br /> - Create
                                Hiring Notice <br /> - Manage Managers <br /> -
                                Receive Reviews & Feedback
                            </CardLayout>
                            <CardLayout className="p-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row items-center gap-5">
                                        <div>
                                            <PiLockKeyOpenBold size="4rem" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h1 className="text-2xl font-bold">
                                                Save & Secure
                                            </h1>
                                            <p>
                                                Protected by Indonesian Officials
                                                with Internet Computers data
                                                Security & Protection
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-5">
                                        <div>
                                            <TbWorldSearch size="4rem" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h1 className="text-2xl font-bold">
                                                Faster Search
                                            </h1>
                                            <p>
                                                Post jobs hiring on the website and
                                                with HireVerse recommending system,
                                                match your potential employee
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardLayout>
                        </div>
                        <div className="h-full justify-center flex flex-col gap-4">
                            <CardLayout className="flex h-fit flex-col gap-10 px-10 py-10 w-[400px]">
                                <div className="flex flex-row justify-between gap-16">
                                    <CustomTextField
                                        label="Company Name"
                                        type="text"
                                        className="w-full"
                                    />
                                    <CustomTextField
                                        label="Founded Year"
                                        className="w-full"
                                        type="number"
                                        min={1800}
                                        max={new Date().getFullYear()}
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <CustomTextField
                                        label="Country"
                                        type="text"
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <CustomTextField
                                        label="Location"
                                        type="text"
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <CustomTextField
                                        label="Upload Image"
                                        type="text"
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <CustomTextField
                                        label="LinkedIn Profile"
                                        type="text"
                                        className="w-full"
                                    />
                                </div>
                                <div className="flex flex-row">
                                    <CustomCheckBox className="w-full" />
                                </div>
                                <div className="flex flex-row items-center justify-center">
                                    <button className="main-button">
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
