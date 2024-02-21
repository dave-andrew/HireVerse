import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Blob "mo:base/Blob";


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
        let company = {
            id = Principal.fromActor(Company);
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

}