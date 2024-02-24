import Principal "mo:base/Principal";
import Random "mo:base/Random";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";

actor Helper {

    public shared func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    };
    
    public shared func generatePrincipal() : async Principal {
        let entropyBlob = await Random.blob();
        let principal = Principal.fromBlob(entropyBlob);
        return principal;
    };
};
