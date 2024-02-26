import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Helper "canister:HireVerse_helper";

actor Database {

    type User = {
        internet_identity : Principal;
        first_name : Text;
        last_name : Text;
        email : Text;
        birth_date : Text;
        company_ids : [Text];
        selected_company_id : ?Text;
        timestamp : Time.Time;
    };

    let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

    // Data Seeder

    public func seedUser() : async () {

        let id3 = await Helper.testPrincipal();

        let user3 = {
            internet_identity = id3;
            first_name = "John";
            last_name = "Smith";
            email = "JohnSmith@gmail.com";
            birth_date = "01/01/1990";
            company_ids = [];
            selected_company_id = null;
            timestamp = Time.now();
        };

        users.put(id3, user3);
    };

    public query func register(user : User) : async ?User {
        users.put(user.internet_identity, user);

        return users.get(user.internet_identity);
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

    public query func getAllUsers() : async [User] {
        
        var allUsers : [User] = [];

        for (user in users.vals()) {
            allUsers := Array.append(allUsers, [user]);
        };

        return allUsers;
    };

    // public shared func getUserCompanies(user_id : Principal) : async [?Company.Company] {
    //     let user : ?User = await getUser(user_id);
    //     var companies : [?Company.Company] = [];

    //     switch (user) {
    //         case (?user) {
    //             let company_ids : [Principal] = user.company_ids;
    //             for (company_id in company_ids.vals()) {
    //                 let fetched_company = await Company.getCompany(company_id);
    //                 companies := Array.append(companies, [fetched_company]);
    //             };
    //         };
    //         case null {};
    //     };
    //     return companies;
    // };

};
