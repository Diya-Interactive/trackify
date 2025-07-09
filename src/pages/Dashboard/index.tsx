import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Select from "../../components/Select";
import { fetchClockifyUsers } from "../../utils/globalFunctions";

const Dashboard: React.FC = () => {
    const [startDate, setStartDate] = useState("2025-06-01T00:00:00Z");
    const [endDate, setEndDate] = useState("2025-06-30T23:59:59Z");
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [users, setUsers] = useState<any[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    useEffect(() => {
        fetchClockifyUsers()
            .then((data) => setUsers(data))
            .catch(() => setUsers([]));
    }, []);


    return (
        <div className="w-screen">
            <div className="m-auto">
                <div className="grid w-[96%] m-auto justify-center items-center grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <InputField
                        name="startDate"
                        label="Start Date"
                        type="datetime-local"
                        value={startDate.slice(0, 16)}
                        onChange={(val) =>
                            setStartDate(
                                new Date(val).toISOString().slice(0, 16) + ":00Z"
                            )
                        }
                    />
                    <InputField
                        name="endDate"
                        label="End Date"
                        type="datetime-local"
                        value={endDate.slice(0, 16)}
                        onChange={(val) =>
                            setEndDate(
                                new Date(val).toISOString().slice(0, 16) + ":59Z"
                            )
                        }
                    />
                    <div>
                        <label className="mb-1 text-sm font-medium text-[#232323] dark:text-gray-200">Select Users</label>
                        <Select
                            options={users.map((u) => ({
                                label: u.name,
                                value: u.id,
                            }))}
                            value={selectedUserIds}
                            onChange={(val) => setSelectedUserIds(val.map(String))}
                            isMulti
                            placeholder="Select users"
                        />
                    </div>
                    <div>
                        <div className="opacity-0">button</div>
                        <button
                            className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                            onClick={()=>{}}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Fetch Report"}
                        </button>
                    </div>
                </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            {report && (
                <pre className="bg-gray-100 p-2 rounded max-h-96 overflow-auto">
                    {JSON.stringify(report, null, 2)}
                </pre>
            )}
        </div>
    );
};

export default Dashboard;
