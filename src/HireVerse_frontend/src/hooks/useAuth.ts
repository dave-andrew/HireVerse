import { useContext } from "react";
import { AuthContext } from "../components/context/AuthContext";

export default function useAuth() {
    return useContext(AuthContext);
}
