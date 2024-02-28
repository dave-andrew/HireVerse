import { useForm } from "react-hook-form";
import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import { BsPersonVcard } from "react-icons/bs";
import { MdOutlineDateRange, MdOutlineEmail } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { User } from "../../../../../.dfx/local/canisters/HireVerse_backend/service.did";

interface ICompleteRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    terms: boolean;
}

export default function CompleteRegistration() {
    const { getPrincipal, register: registerNewUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICompleteRegisterForm>();


    const handleFormSubmit = async (data: ICompleteRegisterForm) => {
        const principal = await getPrincipal();
        if (principal.toString() === "2vxsx-fae") return;
        await registerNewUser(
            data.firstName,
            data.lastName,
            data.email,
            data.birthDate,
        );
    };

    return (
        <FrontPageLayout>
            <div className="bg-signature-yellow flex h-[calc(100vh-4rem)] w-full place-items-center justify-center">
                {/*    TODO: Set the textured background*/}
                <div className="flex w-[40vw] min-w-[500px] flex-col gap-10 rounded-lg bg-white p-12">
                    <div className="font-bebas text-5xl">
                        Complete Registration
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* First Name Field */}
                        <div className="border-signature-gray flex flex-col border-t-[1px] pt-4">
                            <div className="font-bold">First Name</div>
                            <div>Input the first name of your name.</div>
                        </div>
                        <div className="border-signature-gray border-t-[1px] pt-4">
                            <CardLayout
                                className={`rounded-md ${errors.firstName ? "border-red-500" : "border-signature-gray"}`}>
                                <div className="flex flex-1 flex-row gap-2 rounded-md transition-colors has-[:focus]:bg-gray-100">
                                    <span
                                        className={`h-full rounded-l-md border-r-[1px] bg-gray-100 p-3 ${errors.firstName ? "border-red-500" : "border-signature-gray"}`}>
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
                            <div
                                className={`text-sm ${errors.firstName ? "text-red-500" : "h-5"}`}>
                                {errors.firstName?.message}
                            </div>
                        </div>
                        {/* Last Name Field */}
                        <div className="border-signature-gray flex flex-col border-t-[1px] pt-4">
                            <div className="font-bold">Last Name</div>
                            <div>Input the last name of your name.</div>
                        </div>
                        <div className="border-signature-gray border-t-[1px] pt-4">
                            <CardLayout
                                className={`rounded-md ${errors.lastName ? "border-red-500" : "border-signature-gray"}`}>
                                <div className="flex flex-1 flex-row gap-2 rounded-md transition-colors has-[:focus]:bg-gray-100">
                                    <span
                                        className={`h-full rounded-l-md border-r-[1px] bg-gray-100 p-3 ${errors.lastName ? "border-red-500" : "border-signature-gray"}`}>
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
                            <div
                                className={`text-sm ${errors.lastName ? "text-red-500" : "h-5"}`}>
                                {errors.lastName?.message}
                            </div>
                        </div>
                        {/* Email Field */}
                        <div className="border-signature-gray flex flex-col border-t-[1px] pt-4">
                            <div className="font-bold">Email</div>
                            <div>Provide your personal email.</div>
                        </div>
                        <div className="border-signature-gray border-t-[1px] pt-4">
                            <CardLayout
                                className={`rounded-md ${errors.email ? "border-red-500" : "border-signature-gray"}`}>
                                <div className="flex flex-1 flex-row gap-2 rounded-md transition-colors has-[:focus]:bg-gray-100">
                                    <span
                                        className={`h-full rounded-l-md border-r-[1px] bg-gray-100 p-3 ${errors.email ? "border-red-500" : "border-signature-gray"}`}>
                                        <MdOutlineEmail size="1.5rem" />
                                    </span>
                                    <input
                                        {...register("email", {
                                            required: "Email is required.",
                                            pattern: {
                                                value: /\S+@\S+\.\S+/,
                                                message:
                                                    "Invalid email address.",
                                            },
                                        })}
                                        type="email"
                                        className="w-full bg-transparent p-3 outline-0"
                                        placeholder="Email"
                                    />
                                </div>
                            </CardLayout>
                            <div
                                className={`text-sm ${errors.email ? "text-red-500" : "h-5"}`}>
                                {errors.email?.message}
                            </div>
                        </div>
                        {/* Birth Date Field */}
                        <div className="border-signature-gray flex flex-col border-y-[1px] py-5">
                            <div className="font-bold">Birth Date</div>
                            <div>Provide the date of your birth.</div>
                        </div>
                        <div className="border-signature-gray border-y-[1px] py-5">
                            <CardLayout
                                className={`rounded-md ${errors.birthDate ? "border-red-500" : "border-signature-gray"}`}>
                                <div className="flex flex-1 flex-row gap-2 rounded-md transition-colors has-[:focus]:bg-gray-100">
                                    <span
                                        className={`h-full rounded-l-md border-r-[1px] bg-gray-100 p-3 ${errors.birthDate ? "border-red-500" : "border-signature-gray"}`}>
                                        <MdOutlineDateRange size="1.5rem" />
                                    </span>
                                    <input
                                        {...register("birthDate", {
                                            required: "Birth Date is required.",
                                        })}
                                        placeholder="Birth Date"
                                        type="date"
                                        className="max-h-12 w-full bg-transparent p-3 outline-0"
                                    />
                                </div>
                            </CardLayout>
                            <div
                                className={`text-sm ${errors.birthDate ? "text-red-500" : "h-5"}`}>
                                {errors.birthDate?.message}
                            </div>
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
                        <label className="text-lg text-black">
                            I accept all the terms and requirements
                        </label>
                    </div>

                    <div className="flex w-full justify-center">
                        <button
                            onClick={handleSubmit(handleFormSubmit)}
                            className="bg-signature-yellow w-fit rounded-md px-12 py-3 font-bold">
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
