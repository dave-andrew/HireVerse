import CardLayout from "../../layouts/CardLayout";
import {
    MdOutlineLocationOn,
    MdOutlinePeopleAlt,
    MdOutlineQueryBuilder,
} from "react-icons/md";
import useService from "../../hooks/useService";
import React, { useEffect, useRef, useState } from "react";
import { Company } from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import useLocalStorage from "../../hooks/useLocalStorage";
import convertToDate from "../../utils/convertToDate";
import ProfileEditButton from "../../components/form/ProfileEditButton";
import useImageBlob from "../../hooks/useImageBlob";
import imageHandler from "../../utils/imageHandler";
import EditCompanyModal from "../../components/modal/EditCompanyModal";
import SocialMediaItem from "../../components/company/SocialMediaItem";
import purifyDOM from "../../utils/purifyDOM";
import { useQueryCompanyIndustries } from "../../datas/queries/companyQueries";
import CompanyDetailReview from "../../components/review/CompanyDetailReview";

interface IManageCompanyForm {
    image: FileList;
}

export default function ManageCompany() {
    const { getJobService, getCompanyService } = useService();
    const { convertImageToBlob } = useImageBlob();
    const [selectedCompany, setSelectedCompany] =
        useLocalStorage<Company | null>("selectedCompany", null);
    const { data: companyIndustries } = useQueryCompanyIndustries(
        selectedCompany?.id,
    );
    const [isModalShown, setIsModalShown] = useState(false);
    let imageRef = useRef<HTMLInputElement>(null);

    const updateCompanyData = async () => {
        if (!selectedCompany) {
            return;
        }

        await getCompanyService().then((s) =>
            s.updateCompany(selectedCompany?.id, selectedCompany),
        );
    };

    const handleImageEdit = async () => {
        const files = imageRef.current?.files;
        if (!files) return;

        const file = files[0];

        const blob = new Uint8Array(await convertImageToBlob(file));

        setSelectedCompany((prev) => {
            console.log("wat");
            if (prev) {
                return { ...prev, image: blob };
            }
            return prev;
        });
    };

    useEffect(() => {
        updateCompanyData();
    }, [selectedCompany]);

    return (
        <>
            <div className="bg-signature-gray flex h-fit w-full flex-row items-center justify-center">
                <div className="flex flex-col place-items-center xl:w-[calc(100%-1rem)] 2xl:w-4/5 gap-2">
                    <CardLayout className="relative flex w-full flex-row place-items-center gap-10 rounded-lg rounded-tl-none rounded-tr-none border-t-0 p-6">
                        <div className="relative">
                            <img
                                className="border-signature-gray aspect-square border-[1px] object-cover xl:w-48 2xl:w-96"
                                src={imageHandler(selectedCompany?.image)}
                                alt=""
                            />
                            <ProfileEditButton
                                className="xl:left-4 xl:top-4 2xl:left-10 2xl:top-10"
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
                            <div className="flex flex-col gap-3 px-2">
                                <h2 className="relative m-0 p-0 text-5xl font-bold">
                                    <span className="relative">
                                        {selectedCompany?.name}
                                    </span>
                                </h2>
                                <a
                                    className="px-1 text-lg"
                                    href={selectedCompany?.linkedin}>
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
                                                Number(
                                                    selectedCompany?.timestamp,
                                                ),
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                        <MdOutlineLocationOn size="2rem" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">
                                            Location
                                        </p>
                                        <p className="font-bold">
                                            {
                                                selectedCompany
                                                    ?.office_locations?.[0]
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                        <MdOutlinePeopleAlt size="2rem" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">
                                            Visitors
                                        </p>
                                        {/*//TODO ADD VISITORS*/}
                                        <p className="font-bold">
                                            {Number(selectedCompany?.seen)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ProfileEditButton
                            className="absolute xl:right-4 xl:top-4 2xl:right-10 2xl:top-10"
                            onClick={() => setIsModalShown(true)}
                        />
                    </CardLayout>
                    <div className="flex w-full flex-row gap-2">
                        <div className="flex h-auto w-[70%] flex-col gap-2">
                            <CardLayout className="flex min-h-[25rem] flex-col gap-5 rounded-lg p-10">
                                <h3 className="h-0 p-0 text-4xl font-bold">
                                    Company Profile
                                </h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: purifyDOM(
                                            selectedCompany?.profile,
                                        ),
                                    }}
                                />
                            </CardLayout>
                            <CompanyDetailReview
                                companyId={selectedCompany?.id ?? ""}
                            />
                        </div>
                        <div className="flex w-[30%] flex-col gap-2">
                            <CardLayout className="flex flex-col gap-5 rounded-lg p-10">
                                <h3 className="h-0 p-0 text-4xl font-bold">
                                    Industries
                                </h3>
                                <div className="flex flex-row flex-wrap gap-3">
                                    {companyIndustries?.map((industry, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="bg-blue-primary flex flex-row gap-2 rounded-md p-2 px-3 font-bold text-white opacity-80 transition-opacity hover:opacity-100">
                                                {industry}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardLayout>
                            <CardLayout className="flex flex-col gap-5 rounded-lg p-10">
                                <h3 className="h-0 p-0 text-4xl font-bold">
                                    Social Medias
                                </h3>
                                <div className="flex flex-col flex-wrap gap-3">
                                    {selectedCompany?.social_medias?.map(
                                        (contact, i) => {
                                            return (
                                                <SocialMediaItem
                                                    key={i}
                                                    url={contact}
                                                />
                                            );
                                        },
                                    )}
                                </div>
                            </CardLayout>
                            <CardLayout className="flex flex-col gap-5 rounded-lg p-10">
                                <h3 className="h-0 p-0 text-4xl font-bold">
                                    Locations
                                </h3>
                                <div className="flex flex-col flex-wrap gap-3">
                                    {selectedCompany?.office_locations?.map(
                                        (location, i) => {
                                            return (
                                                <div
                                                    key={i}
                                                    className="flex flex-row gap-2 rounded-md bg-white p-2 px-3 font-bold text-black opacity-80 transition-opacity hover:opacity-100">
                                                    {location}
                                                </div>
                                            );
                                        },
                                    )}
                                </div>
                            </CardLayout>
                        </div>
                    </div>
                </div>
            </div>
            <EditCompanyModal
                openState={isModalShown}
                setOpenState={setIsModalShown}
                // onEditFinished={onJobCreated}
            />
        </>
    );
}
