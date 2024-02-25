import { useForm } from "react-hook-form";
import FrontPageLayout from "../../layouts/FrontPageLayout";

interface ICompleteRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    terms: boolean;
}

export default function CompleteRegistration() {
    const { register, handleSubmit } = useForm<ICompleteRegisterForm>();

    const handleFormSubmit = (data: ICompleteRegisterForm) => {
        console.log(data);
    };

    return (
        <FrontPageLayout>
            <div className="bg-signature-yellow flex h-screen w-screen place-items-center justify-center">
                {/*    TODO: Set the textured background*/}
                <div className="flex w-[40vw] min-w-[500px] flex-col gap-10 rounded-lg bg-white p-12">
                    <div className="font-bebas text-5xl">
                        Complete Registration
                    </div>

                    <div className="grid grid-cols-2">
                        {/* First Name Field */}
                        <div className="border-signature-gray flex flex-col border-t-[1px] py-5">
                            <div className="font-bold">First Name</div>
                            <div>Input the first name of your name.</div>
                        </div>
                        <div className="border-signature-gray border-t-[1px] py-5">
                            <div className="border-form h-full rounded-md border">
                                <input
                                    {...register("firstName")}
                                    placeholder="First Name"
                                    type="text"
                                    className="h-full w-full rounded-md px-3 outline-0"
                                />
                            </div>
                        </div>
                        {/* Last Name Field */}
                        <div className="border-signature-gray flex flex-col border-t-[1px] py-5">
                            <div className="font-bold">Last Name</div>
                            <div>Input the last name of your name.</div>
                        </div>
                        <div className="border-signature-gray border-t-[1px] py-5">
                            <div className="border-form h-full rounded-md border">
                                <input
                                    {...register("lastName")}
                                    placeholder="Last Name"
                                    type="text"
                                    className="h-full w-full rounded-md px-3 outline-0"
                                />
                            </div>
                        </div>
                        {/* Email Field */}
                        <div className="border-signature-gray flex flex-col border-t-[1px] py-5">
                            <div className="font-bold">Email</div>
                            <div>Provide your personal email.</div>
                        </div>
                        <div className="border-signature-gray border-t-[1px] py-5">
                            <div className="border-form h-full rounded-md border">
                                <input
                                    {...register("email")}
                                    placeholder="Email Address"
                                    type="email"
                                    className="h-full w-full rounded-md px-3 outline-0"
                                />
                            </div>
                        </div>
                        {/* Birth Date Field */}
                        <div className="border-signature-gray flex flex-col border-t-[1px] py-5">
                            <div className="font-bold">Birth Date</div>
                            <div>Provide the date of your birth.</div>
                        </div>
                        <div className="border-signature-gray border-t-[1px] py-5">
                            <div className="border-form h-full rounded-md border">
                                <input
                                    {...register("birthDate")}
                                    placeholder="Birth Date"
                                    type="date"
                                    className="h-full w-full rounded-md px-3 outline-0"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center gap-2">
                        <input
                            type="checkbox"
                            {...register("terms")}
                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600"
                        />
                        <label className="font-medium text-black">
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
