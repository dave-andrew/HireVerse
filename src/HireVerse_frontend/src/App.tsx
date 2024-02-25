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
import CompleteRegistration from "./pages/employee/CompleteRegistration";
import EmptyPage from "./pages/employers/EmptyPage";
import CompanyDetail from "./pages/employee/CompanyDetail";
import CompanyManagers from "./pages/employers/CompanyManagers";
import CompanyJobs from "./pages/employers/CompanyJobs";
import { HireVerse_company } from "../../declarations/HireVerse_company";
import { HireVerse_job } from "../../declarations/HireVerse_job";
import { useLayoutEffect } from "react";
import { CreateCompanyInput } from "../../../.dfx/local/canisters/HireVerse_company/service.did";
import { CreateJobInput } from "../../../.dfx/local/canisters/HireVerse_job/service.did";
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

export const generateData = async () => {
    console.log("Generating data");
    const companyService = HireVerse_company;
    const jobService = HireVerse_job;
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
};

function App() {
    useLayoutEffect(() => {
        // generateData();
    }, []);
    return <RouterProvider router={router} />;
}

export default App;
