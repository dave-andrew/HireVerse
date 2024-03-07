import RegisterCompanyModal from "../../components/modal/RegisterCompanyModal";
import { useState } from "react";

export default function EmptyPage() {
    const [isRegisterModalShown, setIsRegisterModalShown] = useState(false);
    return (
        <>
            <RegisterCompanyModal
                openState={isRegisterModalShown}
                setOpenState={setIsRegisterModalShown}
            />

            <div className="flex h-full w-full flex-row items-center justify-center">
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <img
                        className="w-1/4"
                        src="/storyset/empty-bro.png"
                        alt="placeholder"
                    />
                    <p className="w-1/3 text-center text-[1.3rem]">You are not the manager of any companies. Register a company or be invited to one.</p>
                    <button
                        onClick={() => setIsRegisterModalShown(true)}
                        className="main-button text-md mt-5 !h-fit !px-8">
                        Register Company
                    </button>
                </div>
            </div>
        </>
    );
}
