import { createBrowserRouter, RouteObject, RouterProvider } from "react-router-dom";
import FindJobs from "./pages/employee/FindJobsPage";
import RegisterCompanyPage from "./pages/employers/RegisterCompanyPage";
import FindCompanyPage from "./pages/employee/FindCompanyPage";
import LandingPage from "./pages/employee/LandingPage";
import CompleteRegistrationPage from "./pages/employee/CompleteRegistrationPage";
import CompanyDetailPage from "./pages/employee/CompanyDetailPage";
import CompanyManagersPage from "./pages/employers/CompanyManagersPage";
import CompanyJobsPage from "./pages/employers/CompanyJobsPage";
import NotFoundPage from "./pages/others/NotFoundPage";
import Seeder from "./pages/others/Seeder";
import UnregisteredProtectedRoutes from "./components/protected/UnregisteredProtectedRoutes";
import UnauthenticatedProtectedRoutes from "./components/protected/UnauthenticatedProtectedRoutes";
import EmployerProtectedRoutes from "./components/protected/EmployerProtectedRoutes";
import AuthorizedProtectedRoutes from "./components/protected/AuthorizedProtectedRoutes";
import CompanyInvitation from "./pages/employers/CompanyInvitation";
import EmployerHomePage from "./pages/employers/EmployerHomePage";

const guestRoutes: RouteObject[] = [
    {
        path: "/",
        Component: LandingPage,
    },
];

const frontRoutes: RouteObject[] = [
    {
        path: "/find-job",
        Component: FindJobs,
    },
    {
        path: "/find-company",
        Component: FindCompanyPage,
    },
    {
        path: "/company/detail/:id",
        Component: CompanyDetailPage,
    },
];

const backRoutes: RouteObject[] = [
    {
        path: "/employer",
        Component: EmployerHomePage,
    },
    {
        path: "/employer/managers",
        Component: CompanyManagersPage,
    },
    {
        path: "/employer/register",
        Component: RegisterCompanyPage,
    },
    {
        path: "/employer/jobs",
        Component: CompanyJobsPage,
    },
    {
        path: "/employer/invitations",
        Component: CompanyInvitation,
    },
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
        Component: CompleteRegistrationPage,
    },
];

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
    // TODO: Disabling all console logs for production
    // console.log = () => {};
    return <RouterProvider router={router} />;
}

export default App;
