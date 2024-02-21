import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";

actor Database {
    //TODO: mau coba pake inter canister communication

    type User = {
        internet_identity : Principal;
        first_name : Text;
        last_name : Text;
        email : Text;
        birth_date : Text;
        company_ids : [Principal];
    };

    let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

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
};
