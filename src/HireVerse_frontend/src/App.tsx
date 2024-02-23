import ManageCompany from "./pages/employers/ManageCompany";
import {
    createBrowserRouter,
    RouteObject,
    RouterProvider,
} from "react-router-dom";
import FindJobs from "./pages/employee/FindJobsPage";
import RegisterCompany from "./pages/employers/RegisterCompany";
import FindCompany from "./pages/employee/FindCompany";
import Landing from "./pages/employee/Landing";
import CompanyJobs from "./components/company/CompanyJobs";
import CompanyManagers from "./components/company/CompanyManagers";
import CompleteRegistration from "./pages/employee/CompleteRegistration";
import EmptyPage from "./pages/employers/EmptyPage";
import CompanyDetail from "./pages/employee/CompanyDetail";

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
];

const router = createBrowserRouter(
    frontRoutes.concat(backRoutes).concat(otherRoutes),
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
