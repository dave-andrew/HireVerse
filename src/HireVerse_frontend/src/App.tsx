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
import { useLayoutEffect } from "react";
import { CreateJobInput } from "../../../.dfx/local/canisters/HireVerse_job/service.did";
import NotFoundPage from "./pages/others/NotFoundPage";
import ServiceContextProvider from "./components/context/ServiceContext";
import useService from "./hooks/useService";
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
];

const router = createBrowserRouter(
    frontRoutes.concat(backRoutes).concat(otherRoutes),
);

function App() {
    const { loading, companyService, jobService, backendService } =
        useService();

    const generateData = async () => {
        if (loading) return;
        console.log("Generating data");

        const companyIds: string[] = [];

        for (let i = 0; i < 10; i++) {
            const companyId = await companyService.generateCompany();
            companyIds.push(companyId);
        }

        const newJobs: CreateJobInput[] = [
            {
                location: "Lagos",
                industry: "Tech",
                job_description: "Software Developer",
                position: "Software Developer",
                company_id:
                    companyIds[Math.floor(Math.random() * companyIds.length)],
                salary_end: BigInt(100000),
                requirements: "BSc",
                salary_start: BigInt(50000),
                short_description: "Software Developer",
            },
            {
                location: "New York",
                industry: "Education",
                job_description: "Math Teacher",
                position: "Math Teacher",
                company_id:
                    companyIds[Math.floor(Math.random() * companyIds.length)],
                salary_end: BigInt(100000),
                requirements: "BSc",
                salary_start: BigInt(50000),
                short_description: "Math Teacher",
            }, //generate random jobs not software developer only
            // dont generate software developers
            {
                location: "Indonesia",
                industry: "Porn",
                job_description: "Dep's Assistant",
                position: "Dep's Assistant",
                company_id:
                    companyIds[Math.floor(Math.random() * companyIds.length)],
                salary_end: BigInt(200000),
                requirements: "BSc",
                salary_start: BigInt(50000),
                short_description: "Dep's Assistant",
            },
            {
                location: "San Francisco",
                industry: "Tech",
                job_description: "Frontend Developer",
                position: "Frontend Developer",
                company_id:
                    companyIds[Math.floor(Math.random() * companyIds.length)],
                salary_end: BigInt(120000),
                requirements: "BSc in Computer Science or related field",
                salary_start: BigInt(80000),
                short_description: "Frontend Developer",
            },
            {
                location: "London",
                industry: "Finance",
                job_description: "Financial Analyst",
                position: "Financial Analyst",
                company_id:
                    companyIds[Math.floor(Math.random() * companyIds.length)],
                salary_end: BigInt(90000),
                requirements: "BSc in Finance or related field",
                salary_start: BigInt(60000),
                short_description: "Financial Analyst",
            },
            {
                location: "Tokyo",
                industry: "Tech",
                job_description: "Data Scientist",
                position: "Data Scientist",
                company_id:
                    companyIds[Math.floor(Math.random() * companyIds.length)],
                salary_end: BigInt(150000),
                requirements: "BSc in Data Science or related field",
                salary_start: BigInt(100000),
                short_description: "Data Scientist",
            },
            {
                location: "Berlin",
                industry: "Tech",
                job_description: "Software Engineer",
                position: "Software Engineer",
                company_id:
                    companyIds[Math.floor(Math.random() * companyIds.length)],
                salary_end: BigInt(110000),
                requirements: "BSc in Computer Science or related field",
                salary_start: BigInt(70000),
                short_description: "Software Engineer",
            },
            {
                location: "Paris",
                industry: "Fashion",
                job_description: "Fashion Designer",
                position: "Fashion Designer",
                company_id:
                    companyIds[Math.floor(Math.random() * companyIds.length)],
                salary_end: BigInt(90000),
                requirements: "Degree in Fashion Design or related field",
                salary_start: BigInt(60000),
                short_description: "Fashion Designer",
            },
            {
                location: "Sydney",
                industry: "Hospitality",
                job_description: "Hotel Manager",
                position: "Hotel Manager",
                company_id:
                    companyIds[Math.floor(Math.random() * companyIds.length)],
                salary_end: BigInt(120000),
                requirements: "BSc in Hospitality Management or related field",
                salary_start: BigInt(80000),
                short_description: "Hotel Manager",
            },
        ];

        newJobs.forEach((j) => jobService.createJob(j));
        console.log("finished generating data");
    };

    useLayoutEffect(() => {
        // companyService.addManager
        // generateData();
        if (loading) return;
        const temp = async () => {
            console.log(await backendService.greet());
            // console.log(await companyService.getCompanies());
            // console.log(
            //     await companyService.addManager(
            //         "fdb86206-89e5-4fc6-9161-acd9521b744d",
            //     ),
            // );
        };

        temp();
    }, [backendService, companyService, jobService]);
    return (
        <ServiceContextProvider>
            <RouterProvider router={router} />
        </ServiceContextProvider>
    );
}

export default App;
