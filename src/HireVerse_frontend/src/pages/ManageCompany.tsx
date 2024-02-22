import CompanyPageLayout from "../layouts/CompanyPageLayout";
import { FaLinkedin } from "react-icons/fa";

export default function ManageCompany() {
    let company = {
        name: "BINUS University",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png",
        location: "Jakarta",
        country: "Indonesia",
        linkedin: "in/binus-university",
        foundedDate: "10 June 1999"
    }
    return (
        <CompanyPageLayout>
            <div className={"p-6 flex flex-col gap-8"}>
                <div className={"text-2xl font-bold pl-8"}>
                    Overview
                </div>
                <div className={"bg-white w-full h-64 rounded-xl flex flex-row place-items-center p-8"}>
                    <img
                        width="200rem"
                        height="auto"
                        className="aspect-square"
                        src={company.logo}
                        alt="Company Image"
                    />
                    <div className={"flex flex-col"}>
                        <div className={"text-4xl font-bebas"}>
                            {company.name}
                        </div>
                        <div className={"text-base text-gray-600"}>
                            {company.location}, {company.country}
                        </div>
                        <div className={"text-base text-gray-600"}>
                            {company.foundedDate}
                        </div>
                        <div className={"text-base text-gray-600 flex flex-row place-items-center gap-2"}>
                            <FaLinkedin />
                            {company.linkedin}
                        </div>
                    </div>
                    <div>
                        TODO: Taroh statistik
                    </div>
                </div>
            </div>
        </CompanyPageLayout>
    );
}
