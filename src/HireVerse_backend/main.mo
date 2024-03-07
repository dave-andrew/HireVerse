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
import TextX "mo:xtended-text/TextX";


// The Database actor is responsible for managing the user data.
actor Database {

    // User type
   type User = {
      internet_identity : Principal;
      first_name : Text;
      last_name : Text;
      email : Text;
      birth_date : Text;
      company_ids : [Text];
      timestamp : Time.Time;
   };

    // TrieMap to store users, with Principal as the key and User as the value
   let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

   // Data Seeder
   public func seedUser() : async () {

        // Get a test principal
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

    // Register a new user
   public shared (msg) func register(first_name : Text, last_name : Text, email : Text, birth_date : Text) : async Result.Result<User, Text> {

      let user_id = msg.caller;

      if (users.get(user_id) != null) {
         return #err("User already exists");
      };

      for (user in users.vals()) {
         if (user.email == email) {
            return #err("Email already exists");
         };
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

    // Function to get a user by their principal
   public query (msg) func getUser(principal : Principal) : async ?User {

      return users.get(principal);
   };


    // Function to update a user by their principal
   public query (msg) func updateUser(principal : Principal, user : User) : async () {

      if (principal != msg.caller) {
         return;
      };

      users.put(principal, user);
   };

    // Function to delete a user by their principal
   public query (msg) func deleteUser(principal : Principal) : async ?User {

      if (principal != msg.caller) {
         return null;
      };

      return users.remove(principal);
   };

   public query (message) func greet() : async Text {
      return "Hello, " # Principal.toText(message.caller) # "!";
   };
   public shared (msg) func greetFunction() : async Text {
      return "Hello, " # Principal.toText(msg.caller) # "!";
   };

    // Function to get all users in the database
   public query func getAllUsers() : async Result.Result<[User], Text> {

      var allUsers = Vector.Vector<User>();

      for (user in users.vals()) {
         allUsers.add(user);
      };

      return #ok(Vector.toArray(allUsers));
   };

    // Function to get a user by their email
   public query func getUserByEmail(user_email : Text) : async Result.Result<Principal, Text> {
      for (user in users.vals()) {
         let tempEmail = TextX.toLower(user.email);
         if (tempEmail == TextX.toLower(user_email)) {
            return #ok(user.internet_identity);
         };
      };

      return #err("User not found");
   };

    // Function to get a user object by their email
   public query func getUserObjectByEmail(user_email : Text) : async Result.Result<User, Text> {
      for (user in users.vals()) {
         let tempEmail = TextX.toLower(user.email);
         if (tempEmail == TextX.toLower(user_email)) {
            return #ok(user);
         };
      };

      return #err("User not found");
   };
};
