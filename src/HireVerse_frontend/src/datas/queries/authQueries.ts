import useService from "../../hooks/useService";
import { useQuery } from "@tanstack/react-query";
import { isOk } from "../../utils/resultGuarder";

export function getUserName(userId: string) {
    const { getBackendService } = useService();
    return useQuery({
        queryKey: ["username", userId],
        queryFn: async () => {
            if (!userId) {
                return "";
            }
            const response = await getBackendService().then((s) => s.getUserName(userId));
            if (isOk(response)) {
                return response.ok;
            }
            return "";
        },
    });
}
