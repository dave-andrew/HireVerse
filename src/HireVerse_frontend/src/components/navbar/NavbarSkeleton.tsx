export default function NavbarSkeleton() {
    return (
        <>
            <div
                className="fixed z-[100] flex h-16 w-full flex-row place-items-center justify-between bg-white ps-6 shadow-md md:ps-12">
                <div className="animate-pulse h-10 w-32 bg-gray-300 rounded-md"></div>
                <div
                    className="absolute left-1/2 flex h-full translate-x-[-50%] transform flex-row place-items-center justify-center px-8 md:w-7/12 lg:w-5/12">
                    <div className="animate-pulse h-8 w-8 bg-gray-300 rounded-full"></div>
                    <div className="animate-pulse h-8 w-16 bg-gray-300 rounded-md mx-2"></div>
                    <div className="animate-pulse h-8 w-16 bg-gray-300 rounded-md mx-2"></div>
                    <div className="animate-pulse h-8 w-16 bg-gray-300 rounded-md mx-2"></div>
                </div>
                <div className="flex h-full flex-row place-items-center">
                    <div className="animate-pulse h-8 w-24 bg-gray-300 rounded-md mx-2"></div>
                    <div className="animate-pulse h-10 w-10 bg-gray-300 rounded-full border-2 border-gray-300"></div>
                </div>
            </div>
            <div className="flex w-[21rem]"/>
        </>
    )
}