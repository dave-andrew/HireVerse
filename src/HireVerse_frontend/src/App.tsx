import ManageCompany from "./pages/employers/ManageCompany";
import {
    BrowserRouter,
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from "react-router-dom";
import FindJobs from "./pages/employee/FindJobsPage";
import RegisterCompany from "./pages/employers/RegisterCompany";
import FindCompany from "./pages/employee/FindCompany";
import Landing from "./pages/employee/Landing";
import CompleteRegistration from "./pages/employee/CompleteRegistration";
import EmptyPage from "./pages/employers/EmptyPage";
import CompanyDetail from "./pages/employee/CompanyDetail";
import CompanyManagers from "./pages/employers/CompanyManagers";
import CompanyJobs from "./pages/employers/CompanyJobs";
import { HireVerse_company } from "../../declarations/HireVerse_company";
import { HireVerse_job } from "../../declarations/HireVerse_job";
import { useLayoutEffect } from "react";
import NotFoundPage from "./pages/others/NotFoundPage";

const frontRoutes: RouteObject[] = [
    {
        path: "/",
        Component: Landing,
    },
    {
        path: "/find-job",
        Component: FindJobs,
    },
    {
        path: "/find-company",
        Component: FindCompany,
    },
    {
        path: "/complete-registration",
        Component: CompleteRegistration,
    },
    {
        path: "/company/detail",
        Component: CompanyDetail,
    },
];

const backRoutes: RouteObject[] = [
    {
        path: "/employer",
        Component: EmptyPage,
    },
    {
        path: "/employer/manage",
        Component: ManageCompany,
    },
    {
        path: "/employer/managers",
        Component: CompanyManagers,
    },
    {
        path: "/employer/register",
        Component: RegisterCompany,
    },
    {
        path: "/employer/jobs",
        Component: CompanyJobs,
    },
];

const otherRoutes: RouteObject[] = [
    {
        path: "/login",
        Component: Landing,
    },
    {
        path: "*",
        Component: NotFoundPage,
    },
];

const router = createBrowserRouter(
    frontRoutes.concat(backRoutes).concat(otherRoutes),
);

const generateData = async () => {
    const companyService = HireVerse_company;
    const jobService = HireVerse_job;
    const companyIds: string[] = [];

    for (let i = 0; i < 10; i++) {
        const companyId = await companyService.generateCompany();
        companyIds.push(companyId);
    }

    companyIds.forEach((id) => jobService.generateJob(id));
};

function App() {
    useLayoutEffect(() => {
        // generateData();
    }, []);
    return (
        <RouterProvider router={router} />
    );
}

export default App;
