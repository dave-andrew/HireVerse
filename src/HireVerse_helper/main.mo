import Principal "mo:base/Principal";
import Random "mo:base/Random";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Blob "mo:base/Blob";
import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";


// Special actor to provide helper functions for the application.
actor Helper {

    // Represent a pagination object in the system
   type Pagination = {
      start : Nat;
      amount : Nat;
   };

    // Generate UUID
   public shared func generateUUID() : async Text {
      let g = Source.Source();
      return UUID.toText(await g.new());
   };

   private func test() : async Text {
      return "Hello, World!";
   };

};
