import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Helper "canister:HireVerse_helper";
import Vector "mo:vector/Class";

actor Database {

  type User = {
    internet_identity : Principal;
    first_name : Text;
    last_name : Text;
    email : Text;
    birth_date : Text;
    company_ids : [Text];
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
      timestamp = Time.now();
    };

    users.put(user3.internet_identity, user3);
  };

  public shared (msg) func register(first_name : Text, last_name : Text, email : Text, birth_date : Text) : async Result.Result<User, Text> {

    let user_id = msg.caller;

    if (users.get(user_id) != null) {
      return #err("User already exists");
    };

    let user = {
      internet_identity = user_id;
      first_name = first_name;
      last_name = last_name;
      email = email;
      birth_date = birth_date;
      company_ids = [];
      selected_company_id = null;
      timestamp = Time.now();
    };

    users.put(user.internet_identity, user);

    return #ok(user);
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

  public query func getAllUsers() : async Result.Result<[User], Text> {

    var allUsers = Vector.Vector<User>();

    for (user in users.vals()) {
      allUsers.add(user);
    };

    return #ok(Vector.toArray(allUsers));
  };
};
