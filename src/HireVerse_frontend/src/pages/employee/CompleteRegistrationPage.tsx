import { useForm } from "react-hook-form";
import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import { BsPersonVcard } from "react-icons/bs";
import { MdOutlineDateRange, MdOutlineEmail } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { defaultToastOptions } from "../../layouts/ManagementPageLayout";
import { toast } from "react-toastify";
import { useState } from "react";

interface ICompleteRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    terms: boolean;
}

export default function CompleteRegistrationPage() {
    const { getPrincipal, register: registerNewUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICompleteRegisterForm>();

    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (data: ICompleteRegisterForm) => {
        setIsLoading(true);
        const principal = await getPrincipal();
        if (principal.toString() === "2vxsx-fae") return;
        const result = await registerNewUser(data.firstName, data.lastName, data.email, data.birthDate);

        setIsLoading(false);
        // @ts-ignore
        if (result.err) {
            // @ts-ignore
            toast.error(result.err, defaultToastOptions);
        } else {
            toast.success("Successfully Register", defaultToastOptions);
            window.location.reload();
        }
    };

    const currentDate = new Date();
    const minDate = new Date(currentDate.getFullYear() - 17, currentDate.getMonth(), currentDate.getDate());
    const minDateValue = minDate.toISOString().split("T")[0];

    return (
        <FrontPageLayout>
            <div className="bg-signature-blue relative flex h-[calc(100vh-4rem)] w-full place-items-center justify-center bg-gradient-to-r from-cyan-600">
                <div className="absolute bottom-0 left-0">
                    <iframe
                        className="h-96"
                        src="https://lottie.host/embed/19081eaa-1ac5-4a21-b8a6-fb0f49790d47/srpS9AML6B.json"></iframe>
                </div>
                <div className="flex w-[40vw] min-w-[500px] flex-col gap-10 rounded-lg bg-white p-12">
                    <div className="font-bebas text-5xl">Complete Registration</div>

                    <div className="flex w-full flex-col gap-4">
                        <div className="grid grid-cols-2">
                            {/* First Name Field */}
                            <div className="border-signature-gray flex flex-col border-t-[1px] pb-4 pr-4 pt-2">
                                <div className="font-bold">First Name</div>
                                <div>Input the first name of your name.</div>
                            </div>
                            <div className="border-signature-gray border-t-[1px] pt-4">
                                <CardLayout className={`rounded-md ${errors.firstName ? "border-red-500" : "border-signature-gray"}`}>
                                    <div className="flex flex-1 flex-row gap-2 rounded-md transition-colors has-[:focus]:bg-gray-100">
                                        <span
                                            className={`h-full rounded-l-md border-r-[1px] bg-gray-100 p-3 ${
                                                errors.firstName ? "border-red-500" : "border-signature-gray"
                                            }`}>
                                            <BsPersonVcard size="1.5rem" />
                                        </span>
                                        <input
                                            {...register("firstName", {
                                                required: "First Name is required.",
                                            })}
                                            type="text"
                                            className="w-full bg-transparent p-3 outline-0 "
                                            placeholder="First Name"
                                        />
                                    </div>
                                </CardLayout>
                                <div className={`text-sm ${errors.firstName ? "text-red-500" : "h-5"}`}>{errors.firstName?.message}</div>
                            </div>
                            {/* Last Name Field */}
                            <div className="border-signature-gray flex flex-col border-t-[1px] pb-4 pr-4 pt-2">
                                <div className="font-bold">Last Name</div>
                                <div>Input the last name of your name.</div>
                            </div>
                            <div className="border-signature-gray border-t-[1px] pt-4">
                                <CardLayout className={`rounded-md ${errors.lastName ? "border-red-500" : "border-signature-gray"}`}>
                                    <div className="flex flex-1 flex-row gap-2 rounded-md transition-colors has-[:focus]:bg-gray-100">
                                        <span
                                            className={`h-full rounded-l-md border-r-[1px] bg-gray-100 p-3 ${
                                                errors.lastName ? "border-red-500" : "border-signature-gray"
                                            }`}>
                                            <BsPersonVcard size="1.5rem" />
                                        </span>
                                        <input
                                            {...register("lastName", {
                                                required: "Last Name is required.",
                                            })}
                                            type="text"
                                            className="w-full bg-transparent p-3 outline-0 "
                                            placeholder="Last Name"
                                        />
                                    </div>
                                </CardLayout>
                                <div className={`text-sm ${errors.lastName ? "text-red-500" : "h-5"}`}>{errors.lastName?.message}</div>
                            </div>
                            {/* Email Field */}
                            <div className="border-signature-gray flex flex-col border-t-[1px]  pb-4 pr-4 pt-2">
                                <div className="font-bold">Email</div>
                                <div>Provide your personal email.</div>
                            </div>
                            <div className="border-signature-gray border-t-[1px] pt-4">
                                <CardLayout className={`rounded-md ${errors.email ? "border-red-500" : "border-signature-gray"}`}>
                                    <div className="flex flex-1 flex-row gap-2 rounded-md transition-colors has-[:focus]:bg-gray-100">
                                        <span
                                            className={`h-full rounded-l-md border-r-[1px] bg-gray-100 p-3 ${
                                                errors.email ? "border-red-500" : "border-signature-gray"
                                            }`}>
                                            <MdOutlineEmail size="1.5rem" />
                                        </span>
                                        <input
                                            {...register("email", {
                                                required: "Email is required.",
                                                pattern: {
                                                    value: /\S+@\S+\.\S+/,
                                                    message: "Invalid email address.",
                                                },
                                            })}
                                            type="email"
                                            className="w-full bg-transparent p-3 outline-0"
                                            placeholder="Email"
                                        />
                                    </div>
                                </CardLayout>
                                <div className={`text-sm ${errors.email ? "text-red-500" : "h-5"}`}>{errors.email?.message}</div>
                            </div>
                            {/* Birth Date Field */}
                            <div className="border-signature-gray flex flex-col border-y-[1px] pb-4 pr-4 pt-2">
                                <div className="font-bold">Birth Date</div>
                                <div>Provide the date of your birth.</div>
                            </div>
                            <div className="border-signature-gray border-y-[1px] pt-3">
                                <CardLayout className={`rounded-md ${errors.birthDate ? "border-red-500" : "border-signature-gray"}`}>
                                    <div className="flex flex-1 flex-row gap-2 rounded-md transition-colors has-[:focus]:bg-gray-100">
                                        <span
                                            className={`h-full rounded-l-md border-r-[1px] bg-gray-100 p-3 ${
                                                errors.birthDate ? "border-red-500" : "border-signature-gray"
                                            }`}>
                                            <MdOutlineDateRange size="1.5rem" />
                                        </span>
                                        <input
                                            {...register("birthDate", {
                                                required: "Birth Date is required.",
                                                max: {
                                                    value: minDateValue,
                                                    message: "You must be at least 17 years old.",
                                                },
                                            })}
                                            placeholder="Birth Date"
                                            type="date"
                                            className="max-h-12 w-full bg-transparent p-3 outline-0"
                                        />
                                    </div>
                                </CardLayout>
                                <div className={`text-sm ${errors.birthDate ? "text-red-500" : "h-5"}`}>{errors.birthDate?.message}</div>
                            </div>
                        </div>
                        <div className="flex w-full items-center justify-center gap-2">
                            <input
                                type="checkbox"
                                {...register("terms", {
                                    required: "You must accept the terms.",
                                })}
                                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                            />
                            <label className="text-lg text-black">I accept all the terms and requirements</label>
                        </div>

                        <div className="flex w-full justify-center">
                            <button
                                disabled={isLoading}
                                onClick={handleSubmit(handleFormSubmit)}
                                className="bg-signature-blue hover:bg-signature-blue-darker w-fit rounded-md px-12 py-3 font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-400">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
