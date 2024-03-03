import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import ManageCompany from "./ManageCompany";
import EmptyPage from "./EmptyPage";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function EmployerHome() {
    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);
    return (
        <ManagementPageLayout>
            {selectedCompany ? <ManageCompany /> : <EmptyPage />}
        </ManagementPageLayout>
    );
}
