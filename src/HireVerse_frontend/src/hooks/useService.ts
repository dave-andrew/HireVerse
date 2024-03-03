import { useContext } from "react";
import { ServiceContext } from "../components/context/ServiceContext";

export default function useService() {
    return useContext(ServiceContext);
}
