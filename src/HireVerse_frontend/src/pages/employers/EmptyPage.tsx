import ManagementPageLayout from "../../layouts/ManagementPageLayout";

export default function EmptyPage() {
    return (
        <ManagementPageLayout>
            <div className="flex flex-row h-full place-items-center">
                <div className="flex flex-col w-full place-items-center">
                    <img
                        className="w-1/4"
                        src="/storyset/empty-bro.png"
                        alt="placeholder"
                    />
                    <p className="w-1/3 text-center text-[1.3rem]">
                        You are not the manager of any companies. Register a
                        company or be invited to one.
                    </p>
                    <button className="!px-8 mt-5 main-button text-md">
                        Register Company
                    </button>
                </div>
            </div>
        </ManagementPageLayout>
    );
}
