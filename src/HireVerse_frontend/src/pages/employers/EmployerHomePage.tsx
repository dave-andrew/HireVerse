import ManagementPageLayout from "../../layouts/ManagementPageLayout";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import ManageCompanyPage from "./ManageCompanyPage";
import EmptyPage from "./EmptyPage";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function EmployerHomePage() {
    const [selectedCompany, setSelectedCompany] = useLocalStorage<Company | null>("selectedCompany", null);
    return <ManagementPageLayout>{selectedCompany ? <ManageCompanyPage /> : <EmptyPage />}</ManagementPageLayout>;
}
