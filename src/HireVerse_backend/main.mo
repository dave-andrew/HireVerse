import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Helper "canister:HireVerse_helper";
import Company "canister:HireVerse_company";

actor Database {

    type User = {
        internet_identity : Principal;
        first_name : Text;
        last_name : Text;
        email : Text;
        birth_date : Text;
        company_ids : [Principal];
    };

    let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

    // Data Seeder

    public func seedUser() : async () {

        let id = await Helper.generatePrinciple();

        let user1 = {
            internet_identity = id;
            first_name = "John";
            last_name = "Doe";
            email = "";
            birth_date = "01/01/1990";
            company_ids = [];
        };

        let id2 = await Helper.generatePrinciple();

        let user2 = {
            internet_identity = id2;
            first_name = "Jane";
            last_name = "Doe";
            email = "JaneDoe@gmail.com";
            birth_date = "01/01/1990";
            company_ids = [];
        };

        let id3 = await Helper.generatePrinciple();

        let user3 = {
            internet_identity = id3;
            first_name = "John";
            last_name = "Smith";
            email = "JohnSmith@gmail.com";
            birth_date = "01/01/1990";
            company_ids = [];
        };

        users.put(id, user1);
        users.put(id2, user2);
        users.put(id3, user3);
    };

    public query func register(user : User) : async () {
        users.put(Principal.fromActor(Database), user);
    };

    public query func getUser(principal : Principal) : async ?User {
        return users.get(principal);
    };

    public query func updateUser(principal : Principal, user : User) : async () {
        users.put(principal, user);
    };

    public query func deleteUser(principal : Principal) : async ?User {
        return users.remove(principal);
    };

    public query (message) func greet() : async Text {
        return "Hello, " # Principal.toText(message.caller) # "!";
    };

    public shared func getUserCompanies(user_id : Principal) : async [?Company.Company] {
        let user : ?User = await getUser(user_id);
        var companies : [?Company.Company] = [];

        switch (user) {
            case (?user) {
                let company_ids : [Principal] = user.company_ids;
                for (company_id in company_ids.vals()) {
                    let fetched_company = await Company.getCompany(company_id);
                    companies := Array.append(companies, [fetched_company]);
                };
            };
            case null {};
        };
        return companies;
    };

};
