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

actor Job {
    type Job = {
        id : Principal;
        position : Text;
        location : Text;
        industry : Text;
        salary_start : Nat;
        salary_end : Nat;
        short_description : Text;
        job_description : Text;
        requirements : Text;
        company_id : Principal;
        reviews : [Principal];
        timestamp : Time.Time;
    };

    type FullJob = {
        id : Principal;
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
        reviews : [Review.Review];
    };

    let jobs = TrieMap.TrieMap<Principal, Job>(Principal.equal, Principal.hash);

    // Data Seeder
    

    public shared func createJob(position: Text, location: Text, industry: Text, salary_start: Nat, salary_end: Nat, short_description: Text, job_description: Text, requirements: Text, company_id: Principal) : async Job {
        let id : Principal = await Helper.generatePrinciple();

        let job : Job = {
            id = id;
            position = position;
            location = location;
            industry = industry;
            salary_start = salary_start;
            salary_end = salary_end;
            short_description = short_description;
            job_description = job_description;
            requirements = requirements;
            company_id = company_id;
            reviews = [];
            timestamp = Time.now();
        };

        jobs.put(id, job);
        let test = Company.addJob(company_id, id);
        return job;
    };

    public query func updateJob(principal : Principal, job : Job) : async () {
        jobs.put(principal, job);
    };

    public shared func deleteJob(id: Principal) : async ?Job {
        jobs.remove(id);
    };

    public shared func getJob(id : Principal) : async ?Job {
        return jobs.get(id);
    };

    public shared func getFullJob(id : Principal) : async ?FullJob {
        let job : ?Job = await getJob(id);
        switch (job) {
            case null {
                return null;
            };
            case (?actualJob) {
                let company = await Company.getCompany(actualJob.company_id);
                
                var reviews : [Review.Review] = [];

                for (review_id in actualJob.reviews.vals()) {
                    let review = await Review.getReview(review_id);
                    switch (review) {
                        case null {
                            return null;
                        };
                        case (?actualReview) {
                            reviews := Array.append<Review.Review>(reviews, [actualReview]);
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
                    reviews = reviews;
                };
                return ?fullJob;
            };
        };
    };

    public shared func addReview(job_id : Principal, review_id : Principal) {
        let job = jobs.get(job_id);
        switch (job) {
            case null {
                return;
            };
            case (?actualJob) {

                let buffer : [Principal] = actualJob.reviews;

                let updatedReviews = Array.append<Principal>(actualJob.reviews, [review_id]);

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
                    reviews = updatedReviews;
                    timestamp = actualJob.timestamp;
                };
                jobs.put(job_id, updated_job);
            };
        };
    };

    public query func getAllJobs() : async [Job] {
        return Iter.toArray(jobs.vals());
    };
}
