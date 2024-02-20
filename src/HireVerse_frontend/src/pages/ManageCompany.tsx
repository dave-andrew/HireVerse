
import { TbNotebookOff } from "react-icons/tb";
import { useState } from "react";
import PageLayout from "../layouts/PageLayout";

export default function ManageCompany() {
    const [managedCompanies, setManagedCompanies] = useState([1]);
    const [invitedCompanies, setInvitedCompanies] = useState([]);

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
                <div className="flex flex-col">
                    <h1 className="main-title">MANAGED COMPANIES</h1>
                </div>
            )}
        </PageLayout>
    );
}
