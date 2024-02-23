export default function CompleteRegistration() {
    return (
        <div className={"h-screen w-screen flex justify-center place-items-center bg-signature-yellow"}>
            {/*    TODO: Set the textured background*/}
            <div className={"bg-white p-12 w-[60vw] min-w-[500px] flex flex-col rounded-lg gap-10"}>
                <div className={"font-bebas text-5xl"}>
                    Complete Registration
                </div>

                <div className={"grid grid-cols-2"}>
                    {/* First Name Field */}
                    <div className="py-5 flex flex-col border-t border-gray-600 border-opacity-30">
                        <div className={"font-bold"}>First Name</div>
                        <div>Input the first name of your name.</div>
                    </div>
                    <div className={"py-5 border-t  border-gray-600 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"}/>
                        </div>
                    </div>
                    {/* Last Name Field */}
                    <div className="py-5 flex flex-col border-t border-gray-600 border-opacity-30">
                        <div className={"font-bold"}>Last Name</div>
                        <div>Input the last name of your name.</div>
                    </div>
                    <div className={"py-5 border-t  border-gray-600 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"}/>
                        </div>
                    </div>
                    {/* Email Field */}
                    <div className="py-5 flex flex-col border-t border-gray-600 border-opacity-30">
                        <div className={"font-bold"}>Email</div>
                        <div>Provide your personal email.</div>
                    </div>
                    <div className={"py-5 border-t  border-gray-600 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"}/>
                        </div>
                    </div>
                    {/* Birth Date Field */}
                    <div className="py-5 flex flex-col border-t border-gray-600 border-opacity-30">
                        <div className={"font-bold"}>Birth Date</div>
                        <div>Provide the date of your birth.</div>
                    </div>
                    <div className={"py-5 border-t  border-gray-600 border-opacity-30"}>
                        <div className="border-gray-900 border h-full rounded-md">
                            <input type="text" className={"w-full h-full px-3  rounded-md"}/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-full gap-2 items-center">
                    <input
                        type="checkbox"
                        value=""
                        checked={true}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label className="font-medium text-gray-900 dark:text-gray-300">
                        I accept all the terms and requirements
                    </label>
                </div>

                <div className={"flex w-full justify-center"}>
                    <button className={"bg-signature-yellow w-fit px-12 py-3 font-bold rounded-md shadow-md"}>
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}