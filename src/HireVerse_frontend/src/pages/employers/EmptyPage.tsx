import { Link } from "react-router-dom";

export default function EmptyPage() {
    return (
        <div className="flex h-full flex-row place-items-center">
            <div className="flex w-full flex-col place-items-center">
                <img
                    className="w-1/4"
                    src="/storyset/empty-bro.png"
                    alt="placeholder"
                />
                <p className="w-1/3 text-center text-[1.3rem]">
                    You are not the manager of any companies. Register a company
                    or be invited to one.
                </p>
                <Link
                    to="/employer/register"
                    className="main-button text-md mt-5 !px-8">
                    Register Company
                </Link>
            </div>
        </div>
    );
}
