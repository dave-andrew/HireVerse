import PageLayout from "../layouts/PageLayout";
import CardLayout from "../layouts/CardLayout";
import { PiLockKeyOpenBold } from "react-icons/pi";
import { TbWorldSearch } from "react-icons/tb";

export default function RegisterCompany() {
    return (
        <PageLayout>
            <div className="flex flex-col">
                <div className="flex flex-row justify-between items-center pr-6">
                    <h1 className="main-title">REGISTER COMPANY</h1>
                </div>
                <div className="flex flex-row-reverse pr-5">
                    <div className="fixed flex flex-col w-96 gap-4">
                        <CardLayout className="py-4 px-10">
                            Registering Company might take 4 - 6 business days
                            to validate the legitimacy of the business
                        </CardLayout>
                        <CardLayout className="py-4 px-10">
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
                </div>
            </div>
        </PageLayout>
    );
}
