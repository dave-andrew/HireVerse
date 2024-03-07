import { HashRouter, Route, Routes } from "react-router-dom";
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
import { useLayoutEffect } from "react";
import canisterInjector from "./utils/canisterInjector";

const guestRoutes = [
    {
        path: "/",
        element: <LandingPage />,
    },
];

const frontRoutes = [
    {
        path: "/find-job",
        element: <FindJobs />,
    },
    {
        path: "/find-company",
        element: <FindCompanyPage />,
    },
    {
        path: "/company/detail/:id",
        element: <CompanyDetailPage />,
    },
];

const backRoutes = [
    {
        path: "/employer",
        element: <EmployerHomePage />,
    },
    {
        path: "/employer/managers",
        element: <CompanyManagersPage />,
    },
    {
        path: "/employer/register",
        element: <RegisterCompanyPage />,
    },
    {
        path: "/employer/jobs",
        element: <CompanyJobsPage />,
    },
    {
        path: "/employer/invitations",
        element: <CompanyInvitation />,
    },
];

const otherRoutes = [
    {
        path: "*",
        element: <NotFoundPage />,
    },
    {
        path: "/seeder",
        element: <Seeder />,
    },
];

const unregisteredProtectedRoutes = [
    {
        path: "/complete-registration",
        element: <CompleteRegistrationPage />,
    },
];

interface RouterProtector {
    element: JSX.Element;
    children?: { path: string; element: JSX.Element }[];
}

const protector: RouterProtector[] = [
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
];

const fonts = [
    {
        fontFamily: "Bebas Neue",
        src: `url(${canisterInjector("/fonts/Bebas_Neue/BebasNeue-Regular.ttf")}) format("truetype")`,
    },
    {
        fontFamily: "Lato",
        src: `url(${canisterInjector("/fonts/Lato/Lato-Regular.ttf")}) format("truetype")`,
    },
    {
        fontFamily: "Lato",
        fontWeight: "bold",
        src: `url(${canisterInjector("/fonts/Lato/Lato-Bold.ttf")}) format("truetype")`,
    },
    {
        fontFamily: "Lato",
        fontWeight: 300,
        src: `url(${canisterInjector("/fonts/Lato/Lato-Light.ttf")}) format("truetype")`,
    },
    {
        fontFamily: "Lato",
        fontWeight: 400,
        src: `url(${canisterInjector("/fonts/Lato/Lato-Regular.ttf")}) format("truetype")`,
    },
];

const fontLoader = () => {
    for (const font of fonts) {
        const style = document.createElement("style");
        style.innerHTML = `
            @font-face {
                font-family: '${font.fontFamily}';
                src: ${font.src};
                font-weight: ${font.fontWeight || 400};
                font-style: normal;
            }
        `;
        document.head.appendChild(style);
    }
};

function App() {
    useLayoutEffect(() => {
        fontLoader();
    }, []);

    return (
        <HashRouter>
            <Routes>
                {protector.map((route, index) => (
                    <Route
                        key={index}
                        element={route.element}>
                        {route.children?.map((childRoute, childIndex) => (
                            <Route
                                key={childIndex}
                                path={childRoute.path}
                                element={childRoute.element}
                            />
                        ))}
                    </Route>
                ))}
            </Routes>
        </HashRouter>
    );
}

export default App;
