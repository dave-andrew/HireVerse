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
import { CreateJobInput } from "../../../.dfx/local/canisters/HireVerse_job/service.did";
import NotFoundPage from "./pages/others/NotFoundPage";
import useService from "./hooks/useService";
import { isOk } from "./utils/resultGuarder";
import { CreateCompanyInput } from "../../declarations/HireVerse_company/HireVerse_company.did";
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
    const {
        loading,
        companyService,
        jobService,
        backendService,
        reviewService,
    } = useService();

    const generateData = async () => {
        if (loading) return;
        console.log("Generating data");

        let companyIds: string[] = [];

        for (let i = 0; i < 10; i++) {
            const newCompanies: CreateCompanyInput[] = [
                {
                    name: `Company ${i}`,
                    country: "Nigeria",
                    linkedin: "linkedin.com",
                    location: "Lagos",
                    image: [1],
                    founded_year: BigInt(2021),
                },
                {
                    name: `Company ${i}`,
                    country: "USA",
                    linkedin: "linkedin.com",
                    location: "New York",
                    image: [1],
                    founded_year: BigInt(2021),
                },
                {
                    name: `Company ${i}`,
                    country: "UK",
                    linkedin: "linkedin.com",
                    location: "London",
                    image: [1],
                    founded_year: BigInt(2021),
                },
                {
                    name: `Company ${i}`,
                    country: "Canada",
                    linkedin: "linkedin.com",
                    location: "Toronto",
                    image: [1],
                    founded_year: BigInt(2021),
                },
            ];

            const promises = newCompanies.map(async (c) =>
                companyService.registerCompanies(c),
            );

            const companies = await Promise.all(promises);
            companyIds = companies.map((c) => c.id);
        }

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

        const promises = newJobs.map(async (j) => jobService.createJobForce(j));

        const responses = await Promise.all(promises);

        for (const response of responses) {
            if (isOk(response)) {
                console.log("Job created");
            }
        }

        console.log("finished generating data");
    };

    useEffect(() => {
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
    }, [backendService, companyService, jobService, reviewService, loading]);
    return <RouterProvider router={router} />;
}

export default App;
