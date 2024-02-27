import ManageCompany from "./pages/employers/ManageCompany";
import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import FindJobs from "./pages/employee/FindJobsPage";
import RegisterCompany from "./pages/employers/RegisterCompany";
import FindCompany from "./pages/employee/FindCompany";
import Landing from "./pages/employee/Landing";
import CompleteRegistration from "./pages/employee/CompleteRegistration";
import EmptyPage from "./pages/employers/EmptyPage";
import CompanyDetail from "./pages/employee/CompanyDetail";
import CompanyManagers from "./pages/employers/CompanyManagers";
import CompanyJobs from "./pages/employers/CompanyJobs";
import { useEffect } from "react";
import NotFoundPage from "./pages/others/NotFoundPage";
import useService from "./hooks/useService";
import Seeder from "./pages/others/Seeder";
// import "dotenv/config";
// require("dotenv").config();

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
    {
        path: "/seeder",
        Component: Seeder,
    },
];

const router = createBrowserRouter(
    frontRoutes.concat(backRoutes).concat(otherRoutes),
);

function App() {
    // const {
    //     loading,
    //     companyService,
    //     jobService,
    //     backendService,
    //     reviewService,
    // } = useService();
    //
    // useEffect(() => {
    //     // companyService.addManager
    //     // generateData();
    //     if (loading) return;
    //     const temp = async () => {
    //         console.log(await backendService.greet());
    //         console.log(await companyService.getCompanies());
    //         // console.log(
    //         //     await companyService.addManager(
    //         //         "793038bf-7522-407b-8e2c-d401432d2271",
    //         //     ),
    //         // );
    //     };
    //
    //     temp();
    // }, [backendService, companyService, jobService, reviewService, loading]);

    return <RouterProvider router={router} />;
}

export default App;
