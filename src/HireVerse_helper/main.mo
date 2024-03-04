import Principal "mo:base/Principal";
import Random "mo:base/Random";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Nat8 "mo:base/Nat8";
import Blob "mo:base/Blob";
import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";

actor Helper {

    type Pagination = {
        start : Nat;
        amount : Nat;
    };

    public shared func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    };

    public shared func testPrincipal() : async Principal {
        let principals = Array.tabulate<Principal>(
            10,
            func(i) {
                Principal.fromBlob(Blob.fromArray([Nat8.fromNat(i)]));
            },
        );
        return principals[0];
    };

};
