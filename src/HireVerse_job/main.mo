import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";

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

    public func create_job(job : Job) : async () {
        jobs.put(job.id, job);
    };

}