import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import Helper "canister:HireVerse_helper";

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
    };

    let jobs = TrieMap.TrieMap<Principal, Job>(Principal.equal, Principal.hash);

    public func createJob(job : Job) : async () {
        jobs.put(job.id, job);
    };

    public query func updateJob(principal : Principal, job : Job) : async () {
        jobs.put(principal, job);
    };

    public shared func deleteJob(id: Principal) : async ?Job {
        jobs.remove(id);
    }

    public shared func addReview(job_id : Principal, review_id : Principal) {
        let job = jobs.get(job_id);
        switch (job) {
            case (null) {
                return;
            };
            case (?actualJob) {
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
                };
                jobs.put(job_id, updated_job);
            };
        };
    };
}