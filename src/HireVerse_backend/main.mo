import Principal "mo:base/Principal";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Helper "canister:HireVerse_helper";
import Vector "mo:vector/Class";
import TextX "mo:xtended-text/TextX";
import Fuzz "mo:fuzz";


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
   public query func getUser(principal : Principal) : async ?User {

      return users.get(principal);
   };


    // Function to update a user by their principal
   public shared func updateUser(principal : Principal, user : User) : async () {
      users.put(principal, user);
   };

    // Function to delete a user by their principal
   public shared (msg) func deleteUser(principal : Principal) : async ?User {

      if (principal != msg.caller) {
         return null;
      };

      return users.remove(principal);
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

   public query func getUserName(userId : Text) : async Result.Result<Text, Text> {
      let user = users.get(Principal.fromText(userId));
      switch (user) {
         case (?user) {
            return #ok(user.first_name # " " # user.last_name);
         };
         case null {
            return #err("User not found");
         };
      };
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

   public shared (msg) func seed_users() : async Result.Result<Text, Text> {
      if(Principal.isAnonymous(msg.caller)) {
         return #err("Unauthorized");
      };

      let fuzz = Fuzz.Fuzz();

      let generateAmount = fuzz.nat.randomRange(4, 11);

      for (i in Iter.range(0, generateAmount)) {
         let id = fuzz.principal.randomPrincipal(10);

         let user = {
            internet_identity = id;
            first_name = fuzz.text.randomText(fuzz.nat.randomRange(5, 25));
            last_name = fuzz.text.randomText(fuzz.nat.randomRange(5, 25));
            email = fuzz.text.randomText(fuzz.nat.randomRange(5, 25)) # "@gmail.com";
            birth_date = "01/01/1990";
            company_ids = [];
            timestamp = Time.now();
         };

         users.put(user.internet_identity, user);
         Debug.print("Seeded " # Nat.toText(i + 1) # " users out of " # Nat.toText(generateAmount + 1));
      };

      return #ok("Users seeded");
   };

   public shared (msg) func clean_users() : async Result.Result<Text, Text> {
      if(Principal.isAnonymous(msg.caller)) {
         return #err("Unauthorized");
      };

      for(user in users.vals()) {
         ignore users.remove(user.internet_identity);
      };

      return #ok("Users cleaned");
   };
};
