import seeder, { seedJob } from "../../utils/seeder";
import useService from "../../hooks/useService";
import { useForm } from "react-hook-form";
import { isOk } from "../../utils/resultGuarder";

interface ISeederForm {
    companyId: string;
}

export default function Seeder() {
    const { register, handleSubmit } = useForm<ISeederForm>();
    const service = useService();
    const handleSeedCompanyJobs: any = async () => {
        seeder(service);
    };

    const handleAddSelfToCompanyManager = async (data: ISeederForm) => {
        const id = data.companyId;
        if (!id) {
            console.log("Company ID is required");
            return;
        }

        const response = await service
            .getCompanyService()
            .then((s) => s.addManager(id));

        if (isOk(response)) {
            console.log(`Added self to company ${id} manager`);
        }
    };

    const handleGetAllCompany = async () => {
        console.log("Getting all company...");
        const response = await service
            .getCompanyService()
            .then((s) => s.getCompanies());
        console.log(response);
    };
    return (
        <div className="flex w-96 flex-col gap-5">
            <h1>Seeder</h1>
            <button
                className="main-button"
                onClick={handleSeedCompanyJobs}>
                Seed Company & Jobs
            </button>
            <div>
                <h1>Get All Company</h1>
                <button
                    className="main-button"
                    onClick={handleGetAllCompany}>
                    Get All Company
                </button>
            </div>
            <div>
                <label>
                    Company ID:
                    <input
                        {...register("companyId")}
                        className="border-2 border-black"
                        type="text"
                    />
                </label>
                <button
                    className="main-button"
                    onClick={handleSubmit(handleAddSelfToCompanyManager)}>
                    Add Self To Company Manager
                </button>
            </div>
            <button
                className="main-button"
                onClick={() =>
                    service
                        .getCompanyService()
                        .then((s) => s.deleteAllCompany())
                        .then(() => console.log("All companies deleted"))
                }>
                Remove all companies
            </button>
            <button
                className="main-button"
                onClick={() =>
                    service
                        .getJobService()
                        .then((s) => s.deleteAllJobs())
                        .then(() => console.log("All jobs deleted"))
                }>
                Remove all jobs
            </button>
            <button
                className="main-button"
                onClick={() =>
                    service
                        .getReviewService()
                        .then((s) => s.removeAllReviews())
                        .then(() => console.log("All reviews deleted"))
                }>
                Remove all reviews
            </button>
            <button onClick={() => seedJob(service)}>Seed jOBS</button>
        </div>
    );
}
