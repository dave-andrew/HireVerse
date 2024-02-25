import FrontPageLayout from "../../layouts/FrontPageLayout";
import CardLayout from "../../layouts/CardLayout";
import {
    MdOutlineLocationOn,
    MdOutlinePeopleAlt,
    MdOutlineQueryBuilder,
} from "react-icons/md";
import CompanyReviewSummary from "../../components/company/CompanyReviewSummary";

export default function CompanyDetail() {
    return (
        <FrontPageLayout className="h-full">
            <div className="flex h-full w-full flex-row items-center justify-center">
                <div className="flex w-4/5 flex-col place-items-center">
                    <CardLayout className="flex w-full flex-row place-items-center rounded-none rounded-tl-none rounded-tr-none border-t-0 p-6">
                        <img
                            className="w-96"
                            src="https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Logo_Binus_University.svg/1200px-Logo_Binus_University.svg.png"
                            alt=""
                        />
                        <div className="flex flex-col gap-8">
                            <div className="flex flex-col gap-3">
                                <h2 className="text-5xl font-bold">
                                    BINUS University
                                </h2>
                                <p>https://www.binus.ac.id/</p>
                            </div>
                            <div className="flex flex-row gap-28">
                                <div className="flex flex-row gap-3">
                                    <div className="border-signature-gray flex aspect-square place-items-center rounded-3xl border-[1px] p-2">
                                        <MdOutlineQueryBuilder size="2rem" />
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-gray-600">Founded</p>
                                        <p className="font-bold">
                                            19 June 1999
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
                                        <p className="font-bold">Jakarta</p>
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
                                        <p className="font-bold">
                                            20k Visitors
                                        </p>
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
                                    adipiscing elit. Nunc laoreet blandit
                                    tristique. Nunc ultrices, mi sed tristique
                                    ullamcorper, felis mauris fermentum sem, vel
                                    pharetra dui eros ut lacus. Morbi pulvinar,
                                    nulla ut pharetra porttitor, magna arcu
                                    dignissim neque, id scelerisque eros sapien
                                    id magna. Pellentesque scelerisque a nisi
                                    eget varius. Nullam eu lacus placerat quam
                                    tempor congue pretium vel massa. Nulla
                                    luctus tristique augue non ullamcorper.
                                    Suspendisse a iaculis lacus, at finibus
                                    nisl. Donec accumsan vehicula viverra. Cras
                                    rhoncus lectus id ex malesuada hendrerit.
                                    Curabitur non dui massa. Sed aliquet quam
                                    velit, quis feugiat tellus accumsan sed.
                                    Phasellus arcu velit, molestie quis augue
                                    sit amet, fringilla feugiat felis. Morbi
                                    lacinia felis eu lorem egestas, eu vehicula
                                    nisi posuere.
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
                                <h3 className="text-4xl font-bold">
                                    Industries
                                </h3>
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
                            <CardLayout className="flex flex-col gap-5 rounded-none p-10">
                                <h3 className="text-4xl font-bold">
                                    Industries
                                </h3>
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
        </FrontPageLayout>
    );
}
