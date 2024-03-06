import CardLayout from "../../layouts/CardLayout";
import {MdOutlineLocationOn, MdOutlinePeopleAlt, MdOutlineQueryBuilder} from "react-icons/md";
import React, {useEffect, useRef, useState} from "react";
import {Company} from "../../../../declarations/HireVerse_company/HireVerse_company.did";
import useLocalStorage from "../../hooks/useLocalStorage";
import convertToDate from "../../utils/convertToDate";
import ProfileEditButton from "../../components/form/ProfileEditButton";
import useImageBlob from "../../hooks/useImageBlob";
import imageHandler from "../../utils/imageHandler";
import EditCompanyModal from "../../components/modal/EditCompanyModal";
import SocialMediaItem from "../../components/company/SocialMediaItem";
import purifyDOM from "../../utils/purifyDOM";
import {getCompanyIndustries} from "../../datas/queries/companyQueries";
import CompanyDetailReview from "../../components/review/CompanyDetailReview";
import {useUpdateCompany} from "../../datas/mutations/companyMutations";
import {FaLinkedin} from "react-icons/fa";

interface IManageCompanyForm {
    image: FileList;
}

export default function ManageCompanyPage() {
    const {convertImageToBlob} = useImageBlob();
    const [selectedCompany, setSelectedCompany] = useLocalStorage<Company | null>("selectedCompany", null);
    const {data: companyIndustries} = getCompanyIndustries(selectedCompany?.id);
    const mutation = useUpdateCompany();
    const [isModalShown, setIsModalShown] = useState(false);
    let imageRef = useRef<HTMLInputElement>(null);

    const updateCompanyData = async () => {
        if (!selectedCompany) {
            return;
        }

        mutation.mutate(selectedCompany);
    };

    const handleImageEdit = async () => {
        const files = imageRef.current?.files;
        if (!files) return;

        const file = files[0];

        const blob = new Uint8Array(await convertImageToBlob(file));

        setSelectedCompany((prev) => {
            if (prev) {
                return {...prev, image: blob};
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
                <div className="flex flex-col place-items-center gap-2 xl:w-[calc(100%-1rem)] px-4 md:px-0 2xl:w-4/5">
                    <div className="flex w-full flex-col md:flex-row gap-8 mt-12">
                        <div className="md:sticky md:top-20 h-fit w-full px-32 md:px-0 md:w-[30%] flex flex-col gap-4">
                            <div className="relative">
                                <img
                                    className="border-signature-gray rounded-xl aspect-square border-[1px] object-cover w-full"
                                    src={imageHandler(selectedCompany?.image)}
                                    alt=""
                                />
                                <ProfileEditButton
                                    className="left-4 top-4 2xl:left-10 2xl:top-10"
                                    onClick={() => imageRef.current?.click()}
                                />
                                <input
                                    ref={imageRef}
                                    onChange={handleImageEdit}
                                    type="file"
                                    className="hidden"
                                />
                            </div>

                            <div className="flex flex-col gap-2 font-semibold">
                                <button
                                    className="w-full bg-gray-300 hover:bg-gray-400 p-2 rounded-md"
                                    onClick={() => setIsModalShown(true)}>
                                    Edit Profile
                                </button>
                                <button
                                    className="w-full bg-red-700 hover:bg-red-800 text-white p-2 rounded-md"
                                    onClick={() => setIsModalShown(true)}>
                                    Leave Company
                                </button>
                            </div>
                        </div>
                        <div className="flex h-auto w-full md:w-[70%] flex-col gap-12">

                            {/* Header Section */}
                            <div className="flex flex-col gap-4 px-4">
                                <h2 className="relative m-0 p-0 text-5xl font-semibold">
                                    <span className="relative">{selectedCompany?.name}</span>
                                </h2>
                                <div className="flex flex-row gap-2 place-items-center">
                                    {companyIndustries?.map((industry, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="rounded-3xl border-green-400 cursor-default text-green-700 bg-green-200 py-1 px-4 border">
                                                {industry}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex flex-row gap-2 place-items-start">
                                    <a
                                        className="hover:bg-signature-gray flex w-fit flex-row items-center gap-3 rounded-md border-[1px] border-blue-500 p-2 pe-3 font-bold text-blue-500 transition-colors *:cursor-pointer"
                                        href={selectedCompany?.linkedin}
                                        target="_blank">
                                        <FaLinkedin/>
                                        {/*<div className="text-black">*/}
                                        {selectedCompany?.linkedin}
                                        {/*</div>*/}
                                    </a>
                                    {selectedCompany?.social_medias?.map((contact, i) => {
                                        return (
                                            <SocialMediaItem
                                                key={i}
                                                url={contact}
                                            />
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row justify-evenly">
                                <div className="flex flex-row gap-3">
                                    <div
                                        className="flex aspect-square place-items-center rounded-3xl p-2">
                                        <MdOutlineQueryBuilder size="2rem"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">Founded</p>
                                        <p className="font-semibold">{convertToDate(Number(selectedCompany?.timestamp)).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div
                                        className="flex aspect-square place-items-center rounded-3xl p-2">
                                        <MdOutlineLocationOn size="2rem"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">Location</p>
                                        <div className="flex flex-row">
                                            {selectedCompany?.office_locations?.map((location, i) => {
                                                return (
                                                    <>
                                                        {i !== 0 &&
                                                            <p key={i} className="font-semibold pr-1">, </p>}
                                                        <p key={i} className="font-semibold">{location}</p>
                                                    </>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div
                                        className="flex aspect-square place-items-center rounded-3xl p-2">
                                        <MdOutlinePeopleAlt size="2rem"/>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">Visitors</p>
                                        {/*//TODO ADD VISITORS*/}
                                        <p className="font-semibold">{Number(selectedCompany?.seen)}</p>
                                    </div>
                                </div>
                            </div>

                            <CardLayout className="flex min-h-[25rem] flex-col gap-5 rounded-lg p-10">
                                <h3 className="m-0 p-0 text-4xl font-semibold">Company Profile</h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: purifyDOM(selectedCompany?.profile),
                                    }}
                                />
                            </CardLayout>
                            <CompanyDetailReview companyId={selectedCompany?.id ?? ""}/>
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
