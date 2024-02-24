import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import List "mo:base/List";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Helper "canister:HireVerse_helper";
import Company "canister:HireVerse_company";
import Review "canister:HireVerse_review";
import Vector "mo:vector/Class"


actor Job {
    type Job = {
        id : Text;
        position : Text;
        location : Text;
        industry : Text;
        salary_start : Nat;
        salary_end : Nat;
        short_description : Text;
        job_description : Text;
        requirements : Text;
        company_id : Text;
        reviews : [Text];
        timestamp : Time.Time;
    };

    type CreateJobInput = {
        position : Text;
        location : Text;
        industry : Text;
        salary_start : Nat;
        salary_end : Nat;
        short_description : Text;
        job_description : Text;
        requirements : Text;
        company_id : Text;
    };

    type FullJob = {
        id : Text;
        position : Text;
        location : Text;
        industry : Text;
        salary_start : Nat;
        salary_end : Nat;
        short_description : Text;
        job_description : Text;
        requirements : Text;
        timestamp : Time.Time;
        company : ?Company.Company;
        reviews : [Text];
    };

    let jobs = TrieMap.TrieMap<Text, Job>(Text.equal, Text.hash);

    public shared func createJob(newJob : CreateJobInput) : async Job {
        let id = await Helper.generateUUID();

        let job : Job = {
            id = id;
            position = newJob.position;
            location = newJob.location;
            industry = newJob.industry;
            salary_start = newJob.salary_start;
            salary_end = newJob.salary_end;
            short_description = newJob.short_description;
            job_description = newJob.job_description;
            requirements = newJob.requirements;
            company_id = newJob.company_id;
            reviews = [];
            timestamp = Time.now();
        };

        jobs.put(id, job);
        let test = Company.addJob(newJob.company_id, id);
        return job;
    };

    public query func updateJob(id : Text, job : Job) : async () {
        jobs.put(id, job);
    };

    public shared func deleteJob(id : Text) : async ?Job {
        jobs.remove(id);
    };

    public shared query func getJob(id : Text) : async ?Job {
        return jobs.get(id);
    };

    public shared func getFullJob(id : Text) : async ?FullJob {
        let job : ?Job = await getJob(id);
        switch (job) {
            case null {
                return null;
            };
            case (?actualJob) {
                let company = await Company.getCompany(actualJob.company_id);

                var reviews = Vector.Vector<Text>();

                for (review_id in actualJob.reviews.vals()) {
                    let review = await Review.getReview(review_id);
                    switch (review) {
                        case null {
                            return null;
                        };
                        case (?actualReview) {
                            reviews.add(actualReview.id);
                        };
                    };
                };

                let fullJob : FullJob = {
                    id = actualJob.id;
                    position = actualJob.position;
                    location = actualJob.location;
                    industry = actualJob.industry;
                    salary_start = actualJob.salary_start;
                    salary_end = actualJob.salary_end;
                    short_description = actualJob.short_description;
                    job_description = actualJob.job_description;
                    requirements = actualJob.requirements;
                    timestamp = actualJob.timestamp;
                    company = company;
                    reviews = Vector.toArray<Text>(reviews);
                };
                return ?fullJob;
            };
        };
    };

    public shared func addReview(job_id : Text, review_id : Text) {
        let job = jobs.get(job_id);
        switch (job) {
            case null {
                return;
            };
            case (?actualJob) {

                let jobReviews = Vector.fromArray<Text>(actualJob.reviews);

                jobReviews.add(review_id);

                let updated_job = {
                    id = actualJob.id;
                    position = actualJob.position;
                    location = actualJob.location;
                    industry = actualJob.industry;
                    salary_start = actualJob.salary_start;
                    salary_end = actualJob.salary_end;
                    short_description = actualJob.short_description;
                    job_description = actualJob.job_description;
                    requirements = actualJob.requirements;
                    company_id = actualJob.company_id;
                    reviews = Vector.toArray<Text>(jobReviews);
                    timestamp = actualJob.timestamp;
                };
                jobs.put(job_id, updated_job);
            };
        };
    };

    public query func getAllJobs() : async [Job] {
        return Iter.toArray(jobs.vals());
    };
};
