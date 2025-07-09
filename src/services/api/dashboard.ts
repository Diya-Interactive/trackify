import { http } from "../../config/httpMethod";

export const fetchRecords = async (data: {
    users: {
        ids: string[];
    };
    dateRangeStart: string; // ISO date string
    dateRangeEnd: string; // ISO date string
    detailedFilter: {
        page: number;
        sortColumn: string;
        pageSize: number;
    };
}) => {
    const response = await http.post(
        "https://reports.api.clockify.me/v1/workspaces/5c3598b1b079874ebde1c173/reports/detailed",
        data,
        {
            headers: {
                "X-Api-Key": "YzZiMjUxMzItOGVmMy00NTdmLWIzZGItZGZkODgwZmE5MzMx",
            },
        }
    );
    return response.data;
};

export const fetchUsers = async () => {
    const response = await http.get(
        "https://api.clockify.me/api/v1/workspaces/5c3598b1b079874ebde1c173/users",
        {
            headers: {
                "X-Api-Key": "YzZiMjUxMzItOGVmMy00NTdmLWIzZGItZGZkODgwZmE5MzMx",
            },
        }
    );
    return response.data;
};
