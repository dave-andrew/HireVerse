import { _SERVICE as _SERVICE_COMPANY, CreateCompanyInput } from "../../../declarations/HireVerse_company/HireVerse_company.did";
import { CreateJobInput } from "../../../../.dfx/local/canisters/HireVerse_job/service.did";
import { isOk } from "./resultGuarder";
import { ServiceContextType } from "../components/context/ServiceContext";
import { CONSTANTS } from "./constants";
import { _SERVICE as _SERVICE_JOB } from "../../../declarations/HireVerse_job/HireVerse_job.did";
import { ActorSubclass } from "@dfinity/agent";

async function companySeeder(companyService: ActorSubclass<_SERVICE_COMPANY>) {
    console.log("test");

    const response = await companyService.getCompanies();

    console.log("Seeding companies...");
    if (response.length > 0) {
        console.log("Companies already seeded");
        return;
    }

    const newCompanies: CreateCompanyInput[] = [
        {
            name: `Company 1`,
            linkedin: "https://www.linkedin.com",
            image: [1],
            office_locations: ["Lagos", "Abuja"],
            social_medias: ["facebook.com", "twitter.com"],
            founded_country: "Nigeria",
            founded_year: BigInt(2021),
            profile: "We are a tech company",
        },
        {
            name: `Company 2`,
            linkedin: "https://www.linkedin.com",
            image: [1],
            founded_country: "USA",
            social_medias: ["facebook.com", "twitter.com"],
            office_locations: ["New York", "California"],
            founded_year: BigInt(2021),
            profile: "We are a tech company",
        },
        {
            name: `Company 3`,
            linkedin: "https://www.linkedin.com",
            image: [1],
            founded_country: "UK",
            office_locations: ["London", "Manchester"],
            social_medias: ["facebook.com", "twitter.com"],
            founded_year: BigInt(2021),
            profile: "We are a tech company",
        },
        {
            name: `Company 4`,
            linkedin: "https://www.linkedin.com",
            image: [1],
            founded_country: "Canada",
            social_medias: ["facebook.com", "twitter.com"],
            office_locations: ["Toronto", "Vancouver"],
            founded_year: BigInt(2021),
            profile: "We are a tech company",
        },
    ];

    const promises = newCompanies.map(async (c) => companyService.registerCompanies(c));

    const companies = await Promise.all(promises);
    console.log("Finished seeding companies");
    return companies.map((c) => c.id);
}

const jobSeeder = async (jobService: ActorSubclass<_SERVICE_JOB>, companyIds: string[]) => {
    const newJobs: CreateJobInput[] = [
        {
            location: "Lagos",
            industry: "Tech",
            job_description: "Software Developer",
            position: "Software Developer",
            company_id: companyIds[Math.floor(Math.random() * companyIds.length)],
            salary_end: BigInt(100000),
            currency: "$",
            requirements: "BSc",
            salary_start: BigInt(50000),
            short_description: "Software Developer",
            contacts: ["sen: 3"],
            employType: CONSTANTS.JOB.EXPERIENCES[Math.floor(Math.random() * 5)],
        },
        {
            location: "New York",
            industry: "Education",
            job_description: "Math Teacher",
            position: "Math Teacher",
            company_id: companyIds[Math.floor(Math.random() * companyIds.length)],
            salary_end: BigInt(100000),
            currency: "€",
            requirements: "BSc",
            salary_start: BigInt(50000),
            short_description: "Math Teacher",
            contacts: ["sen: 3"],
            employType: CONSTANTS.JOB.EXPERIENCES[Math.floor(Math.random() * 5)],
        }, //generate random jobs not software developer only
        // dont generate software developers
        {
            location: "Indonesia",
            industry: "Real Estate",
            job_description: "Dep's Assistant",
            position: "Dep's Assistant",
            company_id: companyIds[Math.floor(Math.random() * companyIds.length)],
            salary_end: BigInt(200000),
            currency: "£",
            requirements: "BSc",
            salary_start: BigInt(50000),
            short_description: "Dep's Assistant",
            contacts: ["sen: 3"],
            employType: CONSTANTS.JOB.EXPERIENCES[Math.floor(Math.random() * 5)],
        },
        {
            location: "San Francisco",
            industry: "Tech",
            job_description: "Frontend Developer",
            position: "Frontend Developer",
            company_id: companyIds[Math.floor(Math.random() * companyIds.length)],
            salary_end: BigInt(120000),
            requirements: "BSc in Computer Science or related field",
            salary_start: BigInt(80000),
            currency: "¥",
            short_description: "Frontend Developer",
            contacts: ["sen: 3"],
            employType: CONSTANTS.JOB.EXPERIENCES[Math.floor(Math.random() * 5)],
        },
        {
            location: "London",
            industry: "Finance",
            job_description: "Financial Analyst",
            position: "Financial Analyst",
            company_id: companyIds[Math.floor(Math.random() * companyIds.length)],
            salary_end: BigInt(90000),
            requirements: "BSc in Finance or related field",
            salary_start: BigInt(60000),
            currency: "₹",
            short_description: "Financial Analyst",
            contacts: ["sen: 3"],
            employType: CONSTANTS.JOB.EXPERIENCES[Math.floor(Math.random() * 5)],
        },
        {
            location: "Tokyo",
            industry: "Tech",
            job_description: "Data Scientist",
            position: "Data Scientist",
            company_id: companyIds[Math.floor(Math.random() * companyIds.length)],
            salary_end: BigInt(150000),
            requirements: "BSc in Data Science or related field",
            salary_start: BigInt(100000),
            currency: "₩",
            short_description: "Data Scientist",
            contacts: ["sen: 3"],
            employType: CONSTANTS.JOB.EXPERIENCES[Math.floor(Math.random() * 5)],
        },
        {
            location: "Berlin",
            industry: "Tech",
            job_description: "Software Engineer",
            position: "Software Engineer",
            company_id: companyIds[Math.floor(Math.random() * companyIds.length)],
            salary_end: BigInt(110000),
            requirements: "BSc in Computer Science or related field",
            salary_start: BigInt(70000),
            currency: "₩",
            short_description: "Software Engineer",
            contacts: ["sen: 3"],
            employType: CONSTANTS.JOB.EXPERIENCES[Math.floor(Math.random() * 5)],
        },
        {
            location: "Paris",
            industry: "Fashion",
            job_description: "Fashion Designer",
            position: "Fashion Designer",
            company_id: companyIds[Math.floor(Math.random() * companyIds.length)],
            salary_end: BigInt(90000),
            requirements: "Degree in Fashion Design or related field",
            salary_start: BigInt(60000),
            currency: "₩",
            short_description: "Fashion Designer",
            contacts: ["sen: 3"],
            employType: CONSTANTS.JOB.EXPERIENCES[Math.floor(Math.random() * 5)],
        },
        {
            location: "Sydney",
            industry: "Hospitality",
            job_description: "Hotel Manager",
            position: "Hotel Manager",
            company_id: companyIds[Math.floor(Math.random() * companyIds.length)],
            salary_end: BigInt(120000),
            requirements: "BSc in Hospitality Management or related field",
            salary_start: BigInt(80000),
            currency: "₩",
            short_description: "Hotel Manager",
            contacts: ["sen: 3"],
            employType: CONSTANTS.JOB.EXPERIENCES[Math.floor(Math.random() * 5)],
        },
    ];

    for (const job of newJobs) {
        const response = await jobService.createJobForce(job);
        if (isOk(response)) {
            console.log("Job created");
        }
    }

    console.log("finished generating data");
};

export async function seedJob({ getCompanyService, getJobService, getReviewService, getBackendService }: ServiceContextType, id: string) {
    await getJobService().then((s) => jobSeeder(s, [id]));
}

export default async function seeder({ getCompanyService, getJobService, getReviewService, getBackendService }: ServiceContextType) {
    const greet = await getBackendService().then((s) => s.greet());

    if (greet.includes(CONSTANTS.PRINCIPAL.ANONYMOUS)) {
        console.log("Not authorized");
        return;
    }

    const companyId = await getCompanyService().then((s) => companySeeder(s));

    if (!companyId) {
        return;
    }

    await getJobService().then((s) => jobSeeder(s, companyId));
}
