import { FaLinkedin } from "react-icons/fa";
import FrontPageLayout from "../../layouts/FrontPageLayout";
import { IoIosSearch } from "react-icons/io";
import CardLayout from "../../layouts/CardLayout";
import { useState } from "react";
import CustomTextField from "../../components/form/CustomTextField";

export default function FindCompany() {
    const [popularCompanies, setPopularCompanies] = useState([
        {
            name: "BINUS University",
            rating: 4.05,
            reviewCount: 12,
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
        },
        {
            name: "BINUS University",
            rating: 4.05,
            reviewCount: 12,
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
        },
        {
            name: "BINUS University",
            rating: 4.05,
            reviewCount: 12,
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
        },
        {
            name: "BINUS University",
            rating: 4.05,
            reviewCount: 12,
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
        },
    ]);

    const [resultCompanies, setResultCompanies] = useState([
        {
            name: "Universitas Tarumanegara",
            location: "Jakarta",
            country: "Indonesia",
            industry: "Education",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            linkedin: "in/untar",
        },
        {
            name: "Universitas Airlangga",
            location: "Jakarta",
            country: "Indonesia",
            industry: "Education",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            linkedin: "in/untar",
        },
        {
            name: "Universitas 11 Maret",
            location: "Surabaya",
            country: "Indonesia",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            industry: "Education",
            linkedin: "in/untar",
        },
        {
            name: "Universitas 11 Maret",
            location: "Surabaya",
            country: "Indonesia",
            industry: "Education",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            linkedin: "in/untar",
        },
        {
            name: "Universitas 11 Maret",
            location: "Surabaya",
            country: "Indonesia",
            industry: "Education",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            linkedin: "in/untar",
        },
        {
            name: "Universitas 11 Maret",
            location: "Surabaya",
            country: "Indonesia",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
            industry: "Education",
            linkedin: "in/untar",
        },
    ]);

    return (
        <FrontPageLayout>
            <div className="flex flex-col">
                <div className="h-fit w-full place-items-center bg-[url(src/HireVerse_frontend/backgrounds/subtle-prism.svg)] shadow-md">
                    <div className="flex flex-col place-items-center gap-8 p-8">
                        <div className="flex flex-col items-center justify-center">
                            <div className="flex w-full flex-col gap-3 self-start">
                                <h3 className="text-4xl font-bold lg:text-5xl">
                                    Popular Companies
                                </h3>
                                <p className="text-lg leading-6 lg:text-xl">
                                    These companies have the largest visitor
                                    count this month.
                                </p>
                            </div>
                            <div className="flex w-full flex-row items-center gap-10">
                                <div className="grid h-fit grid-cols-2 gap-4 py-8">
                                    {popularCompanies
                                        .slice(0, 4)
                                        .map((company) => {
                                            return (
                                                <CardLayout className="flex h-32 w-64 p-4 xl:w-80">
                                                    <div className="flex flex-row place-items-center">
                                                        <img
                                                            width="80rem"
                                                            height="auto"
                                                            className="aspect-square"
                                                            src={company.logo}
                                                            alt="Company Image"
                                                        />
                                                        <div className="flex flex-col">
                                                            <div className="font-semibold">
                                                                {company.name}
                                                            </div>
                                                            <div>
                                                                TODO: Taroh star
                                                                disini{" "}
                                                                {company.rating}
                                                            </div>
                                                            <div className="text-xs">
                                                                {
                                                                    company.reviewCount
                                                                }{" "}
                                                                Reviews
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardLayout>
                                            );
                                        })}
                                </div>
                                <div className="hidden xl:block">
                                    <img
                                        className="w-[25rem]"
                                        src="/storyset/job-offers-bro.png"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col place-items-center gap-8 p-8">
                    <div
                        style={{
                            width: "min(1000px, 100%)",
                        }}>
                        <div className="flex w-full flex-col gap-8">
                            <div className="flex flex-col gap-2">
                                Find your dream company
                                <CardLayout className="flex w-full flex-row items-center gap-2 p-2">
                                    <IoIosSearch size="1.5rem" />
                                    <input
                                        type="text"
                                        className="outline-0"
                                        placeholder="Search Job"
                                    />
                                </CardLayout>
                            </div>
                            <div className="flex flex-row gap-4">
                                <CardLayout className="flex h-fit w-72 flex-col gap-2 p-4">
                                    <div className="p-1 text-lg font-bold">
                                        Filter Companies
                                    </div>
                                    <hr />
                                    <div className="flex flex-col gap-6 p-4">
                                        <CustomTextField
                                            label="Location"
                                            type="Location"
                                        />
                                        <CustomTextField
                                            label="Industries"
                                            type="Industries"
                                        />
                                        <CustomTextField
                                            label="Job Titles"
                                            type="Job Titles"
                                        />
                                    </div>
                                    <hr />
                                    <div className="flex flex-col gap-2 p-4">
                                        <div className="text-xs font-bold">
                                            Experience
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    defaultChecked={true}
                                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                                />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Full-Time
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                                />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Part-Time
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                                />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Internship
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value=""
                                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                                                />
                                                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    Volunteer
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </CardLayout>
                                <div className="grid grow grid-cols-2 gap-4">
                                    {resultCompanies.map((cp, index) => {
                                        return (
                                            <CardLayout className="flex flex-col gap-2 rounded-md px-6 py-5" key={index}>
                                                <div
                                                    className="flex flex-row place-items-center bg-white" >
                                                    <img
                                                        width="80rem"
                                                        height="auto"
                                                        className="aspect-square"
                                                        src={cp.logo}
                                                        alt="Company Image"
                                                    />
                                                    <div className="flex flex-col">
                                                        <div className="font-bold">
                                                            {cp.name}
                                                        </div>
                                                        <div>X X X X X 4.9</div>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-4">
                                                    <div className="grid grid-cols-3">
                                                        <div className="flex flex-col">
                                                            <div className="text-sm font-bold">
                                                                Location:
                                                            </div>
                                                            <div>
                                                                {cp.location}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="text-sm font-bold">
                                                                Country:
                                                            </div>
                                                            <div>
                                                                {cp.country}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <div className="text-sm font-bold">
                                                                Industry:
                                                            </div>
                                                            <div>
                                                                {cp.industry}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="text-sm font-bold">
                                                            Linkedin:
                                                        </div>
                                                        <div className="flex flex-row place-items-center gap-2">
                                                            <FaLinkedin />
                                                            {cp.linkedin}
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardLayout>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FrontPageLayout>
    );
}
