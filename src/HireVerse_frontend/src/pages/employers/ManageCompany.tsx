import CardLayout from "../../layouts/CardLayout";
import {
    MdOutlineLocationOn,
    MdOutlinePeopleAlt,
    MdOutlineQueryBuilder,
} from "react-icons/md";
import CompanyReviewSummary from "../../components/company/CompanyReviewSummary";
import useService from "../../hooks/useService";
import { useEffect, useRef, useState } from "react";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import useLocalStorage from "../../hooks/useLocalStorage";
import { isOk } from "../../utils/resultGuarder";
import convertToDate from "../../utils/convertToDate";
import ProfileEditButton from "../../components/form/ProfileEditButton";
import { useForm } from "react-hook-form";
import useImageBlob from "../../hooks/useImageBlob";
import imageHandler from "../../utils/imageHandler";

interface IManageCompanyForm {
    image: FileList;
}

export default function ManageCompany() {
    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);
    const [industries, setIndustries] = useState<string[]>([]);
    const { register, getValues } = useForm();
    let imageRef = useRef<HTMLInputElement>(null);
    const { getJobService, getCompanyService } = useService();
    const { convertImageToBlob, convertBlobToImage } = useImageBlob();

    const getCompanyData = async () => {
        if (!selectedCompany) {
            return;
        }

        const companyId = selectedCompany?.id;
        const result = await getJobService().then((s) =>
            s.getCompanyJobIndustries(companyId),
        );

        if (isOk(result)) {
            setIndustries(result.ok);
        }
    };

    const updateCompanyData = async () => {
        if (!selectedCompany) {
            return;
        }

        const result = await getCompanyService().then((s) =>
            s.getCompany(selectedCompany?.id),
        );

        if (result.length == 0) {
            return;
        }

        const company = result[0];

        let updateCompany = {
            ...selectedCompany,
            company_manager_ids: company.company_manager_ids,
            founded_year: company.founded_year,
            timestamp: company.timestamp,
        };

        await getCompanyService().then((s) =>
            s.updateCompany(selectedCompany?.id, updateCompany),
        );
        console.log("updated");
    };

    const handleImageEdit = async () => {
        const files = imageRef.current?.files;
        if (!files) return;

        const file = files[0];
        console.log(files);
        const blob = await convertImageToBlob(file);
        console.log("hihihiha");
        setSelectedCompany((prev) => {
            if (prev) {
                return { ...prev, image: blob };
            }
            return prev;
        });
    };

    useEffect(() => {
        updateCompanyData();
    }, [selectedCompany]);

    useEffect(() => {
        getCompanyData();
        console.log(selectedCompany);
    }, []);
    return (
        <div className="bg-signature-gray flex h-fit w-full flex-row items-center justify-center">
            <div className="flex w-4/5 flex-col place-items-center">
                <CardLayout className="flex w-full flex-row place-items-center rounded-none rounded-tl-none rounded-tr-none border-t-0 p-6">
                    <div className="relative">
                        <img
                            className="w-96"
                            src={imageHandler(selectedCompany?.image)}
                            alt=""
                        />
                        <ProfileEditButton
                            className="top-10 left-10"
                            onClick={() => imageRef.current?.click()}
                        />
                        <input
                            ref={imageRef}
                            onChange={handleImageEdit}
                            type="file"
                            className="hidden"
                        />
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-3">
                            <h2 className="text-5xl font-bold">
                                {selectedCompany?.name}
                            </h2>
                            <a href={selectedCompany?.linkedin}>
                                {selectedCompany?.linkedin}
                            </a>
                        </div>
                        <div className="flex flex-row gap-28">
                            <div className="flex flex-row gap-3">
                                <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                    <MdOutlineQueryBuilder size="2rem" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-600">Founded</p>
                                    <p className="font-bold">
                                        {convertToDate(
                                            Number(selectedCompany?.timestamp),
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3">
                                <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                    <MdOutlineLocationOn size="2rem" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-600">Location</p>
                                    <p className="font-bold">
                                        {selectedCompany?.location}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-3">
                                <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                    <MdOutlinePeopleAlt size="2rem" />
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-gray-600">Visitors</p>
                                    {/*//TODO ADD VISITORS*/}
                                    <p className="font-bold">20k Visitors</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardLayout>
                <div className="flex w-full flex-row">
                    <div className="flex h-auto w-[70%] flex-col">
                        <CardLayout className="flex min-h-[25rem] flex-col gap-5 rounded-none p-10">
                            <h3 className="text-4xl font-bold">
                                Company Profile
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nunc laoreet blandit tristique.
                                Nunc ultrices, mi sed tristique ullamcorper,
                                felis mauris fermentum sem, vel pharetra dui
                                eros ut lacus. Morbi pulvinar, nulla ut pharetra
                                porttitor, magna arcu dignissim neque, id
                                scelerisque eros sapien id magna. Pellentesque
                                scelerisque a nisi eget varius. Nullam eu lacus
                                placerat quam tempor congue pretium vel massa.
                                Nulla luctus tristique augue non ullamcorper.
                                Suspendisse a iaculis lacus, at finibus nisl.
                                Donec accumsan vehicula viverra. Cras rhoncus
                                lectus id ex malesuada hendrerit. Curabitur non
                                dui massa. Sed aliquet quam velit, quis feugiat
                                tellus accumsan sed. Phasellus arcu velit,
                                molestie quis augue sit amet, fringilla feugiat
                                felis. Morbi lacinia felis eu lorem egestas, eu
                                vehicula nisi posuere.
                            </p>
                        </CardLayout>
                        <CardLayout className="flex min-h-[25rem] flex-col gap-5 rounded-none p-10">
                            <h3 className="text-4xl font-bold">Reviews</h3>
                            <div>
                                <CompanyReviewSummary />
                            </div>
                        </CardLayout>
                    </div>
                    <div className="flex w-[30%] flex-col">
                        <CardLayout className="flex flex-col gap-5 rounded-none p-10">
                            <h3 className="text-4xl font-bold">Industries</h3>
                            <div className="flex flex-row flex-wrap gap-3">
                                {industries.map((industry) => {
                                    return (
                                        <div className="bg-blue-primary hover:opacity-100 opacity-80 transition-opacity flex flex-row gap-2 rounded-md p-2 text-white font-bold px-3">
                                            {industry}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardLayout>
                        <CardLayout className="flex flex-col gap-5 rounded-none p-10">
                            <h3 className="text-4xl font-bold">Industries</h3>
                            <div className="flex flex-row flex-wrap gap-3">
                                {[
                                    "Engineering",
                                    "Technology",
                                    "Education",
                                    "Healthcare",
                                    "Finance",
                                ].map((industry) => {
                                    return (
                                        <div className="bg-signature-gray flex flex-row gap-2 rounded-md p-2">
                                            {industry}
                                        </div>
                                    );
                                })}
                            </div>
                        </CardLayout>
                    </div>
                </div>
            </div>
        </div>
    );
}
