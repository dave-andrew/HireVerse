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
import NotFoundPage from "./pages/others/NotFoundPage";
import Seeder from "./pages/others/Seeder";
import UnregisteredProtectedRoutes from "./components/protected/UnregisteredProtectedRoutes";
import UnauthenticatedProtectedRoutes from "./components/protected/UnauthenticatedProtectedRoutes";
import EmployerProtectedRoutes from "./components/protected/EmployerProtectedRoutes";
import AuthorizedProtectedRoutes from "./components/protected/AuthorizedProtectedRoutes";
import CompanyInvitation from "./pages/employers/CompanyInvitation";

const guestRoutes: RouteObject[] = [
    {
        path: "/",
        Component: Landing,
    },
];

const frontRoutes: RouteObject[] = [
    {
        path: "/find-job",
        Component: FindJobs,
    },
    {
        path: "/find-company",
        Component: FindCompany,
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
    {
        path: "/employer/invitations",
        Component: CompanyInvitation,
    }
];

const otherRoutes: RouteObject[] = [
    {
        path: "*",
        Component: NotFoundPage,
    },
    {
        path: "/seeder",
        Component: Seeder,
    },
];

const unregisteredProtectedRoutes: RouteObject[] = [
    {
        path: "/complete-registration",
        Component: CompleteRegistration,
    },
]

const router = createBrowserRouter([
    {
        element: <UnauthenticatedProtectedRoutes />,
        children: guestRoutes,
    },
    {
        element: <UnregisteredProtectedRoutes />,
        children: unregisteredProtectedRoutes,
    },
    {
        element: <AuthorizedProtectedRoutes />,
        children: frontRoutes,
    },
    {
        element: <EmployerProtectedRoutes />,
        children: backRoutes,
    },
    ...otherRoutes,
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
