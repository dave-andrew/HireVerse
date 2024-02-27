import {
    _SERVICE as _SERVICE_COMPANY,
    CreateCompanyInput,
} from "../../../declarations/HireVerse_company/HireVerse_company.did";
import { CreateJobInput } from "../../../../.dfx/local/canisters/HireVerse_job/service.did";
import { isOk } from "./resultGuarder";
import { ServiceContextType } from "../components/context/ServiceContext";
import { CONSTANTS } from "./constants";

// import { _SERVICE as _SERVICE_BACKEND } from "../../../../declarations/HireVerse_backend/HireVerse_backend.did";
// import { _SERVICE as _SERVICE_REVIEW } from "../../../../declarations/HireVerse_review/HireVerse_review.did";
import { _SERVICE as _SERVICE_JOB } from "../../../declarations/HireVerse_job/HireVerse_job.did";
import { ActorSubclass } from "@dfinity/agent";

async function companySeeder(companyService: ActorSubclass<_SERVICE_COMPANY>) {
    const response = await companyService.getCompanies();

    console.log("Seeding companies...");
    if (response.length > 0) {
        console.log("Companies already seeded");
        return;
    }

    const newCompanies: CreateCompanyInput[] = [
        {
            name: `Company 1`,
            country: "Nigeria",
            linkedin: "linkedin.com",
            location: "Lagos",
            image: [1],
            founded_year: BigInt(2021),
        },
        {
            name: `Company 2`,
            country: "USA",
            linkedin: "linkedin.com",
            location: "New York",
            image: [1],
            founded_year: BigInt(2021),
        },
        {
            name: `Company 3`,
            country: "UK",
            linkedin: "linkedin.com",
            location: "London",
            image: [1],
            founded_year: BigInt(2021),
        },
        {
            name: `Company 4`,
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
    console.log("Finished seeding companies");
    return companies.map((c) => c.id);
}

const jobSeeder = async (
    jobService: ActorSubclass<_SERVICE_JOB>,
    companyIds: string[],
) => {
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

export default async function seeder({
    companyService,
    jobService,
    reviewService,
    backendService,
    loading,
}: ServiceContextType) {
    // if (loading) {
    //     console.log("Loading");
    //     return;
    // }

    if (!(companyService && jobService && reviewService && backendService)) {
        console.log("Service not available");
        return;
    }

    const greet = await backendService.greet();

    if (greet.includes(CONSTANTS.PRINCIPAL.ANONYMOUS)) {
        console.log("Not authorized");
        return;
    }

    const companyId = await companySeeder(companyService);

    if (!companyId) {
        return;
    }

    await jobSeeder(jobService, companyId);
}
