import { canisterId } from "../../../declarations/HireVerse_frontend";

export default function canisterInjector(url: string) {
    return `${url}?canisterId=${canisterId}`;
}
