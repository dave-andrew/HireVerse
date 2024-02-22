import Principal "mo:base/Principal";
import Random "mo:base/Random";

actor Helper {
    public shared func generatePrinciple() : async Principal {
        let entropyBlob = await Random.blob();
        let principal = Principal.fromBlob(entropyBlob);
        return principal;
    };
};
