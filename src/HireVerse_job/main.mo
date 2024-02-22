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

}