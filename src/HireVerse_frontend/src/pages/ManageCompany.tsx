import { TbNotebookOff } from "react-icons/tb";
import { useState } from "react";
import PageLayout from "../layouts/PageLayout";
import ManagedCompanyItem from "../components/company/ManagedCompanyItem";
import { Link } from "react-router-dom";

export default function ManageCompany() {
    const [managedCompanies, setManagedCompanies] = useState([1]);
    const [invitedCompanies, setInvitedCompanies] = useState([1]);

    return (
        <PageLayout>
            {managedCompanies.length == 0 && invitedCompanies.length == 0 && (
                <div className="flex flex-row w-full h-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center gap-5">
                        <TbNotebookOff size="7rem" />
                        <h1 className={"w-1/2 text-2xl text-center"}>
                            You are not the manager of any companies. Register a
                            company or be invited to one.
                        </h1>
                        <button className="main-button">
                            Register Company
                        </button>
                    </div>
                </div>
            )}
            {managedCompanies.length > 0 && (
                <>
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center pr-6">
                            <h1 className="main-title">MANAGED COMPANIES</h1>
                            <Link to="/manage-company/register">
                                <button className="main-button">
                                    Register Company
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-2">
                        {Array.from({ length: 2 }).map((_) => {
                            return <ManagedCompanyItem />;
                        })}
                    </div>
                </>
            )}
            {invitedCompanies.length > 0 && (
                <>
                    <div className="flex flex-col">
                        <h1 className="main-title">PENDING INVITES</h1>
                    </div>
                    <div className="grid grid-cols-2 p-6 gap-2">
                        {Array.from({ length: 2 }).map((_) => {
                            return <ManagedCompanyItem />;
                        })}
                    </div>
                </>
            )}
        </PageLayout>
    );
}
