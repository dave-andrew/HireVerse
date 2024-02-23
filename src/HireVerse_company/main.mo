import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Iter "mo:base/Iter";
import Helper "canister:HireVerse_helper";

actor Company {

    type Company = {
        id : Principal;
        name : Text;
        founded_year : Nat;
        country : Text;
        location : Text;
        image : Blob;
        linkedin : Text;
        company_manager_ids : [Principal];
        job_posting_ids : [Principal];
    };

    let companies = TrieMap.TrieMap<Principal, Company>(Principal.equal, Principal.hash);

    public shared func createCompany(name : Text, founded_year : Nat, country : Text, location : Text, image : Blob, linkedin : Text) : async Company {

        let id = await Helper.generatePrinciple();

        let company = {
            id = id;
            name = name;
            founded_year = founded_year;
            country = country;
            location = location;
            image = image;
            linkedin = linkedin;
            company_manager_ids = [];
            job_posting_ids = [];
        };
        companies.put(company.id, company);
        return company;
    };

    public query func updateCompany(principal : Principal, company : Company) : async () {
        companies.put(principal, company);
    };

    public shared func deleteCompany(id : Principal) : async ?Company {
        companies.remove(id);
    };

    public query func getAllCompany() : async [Company] {
        return Iter.toArray(companies.vals());
    };
};
