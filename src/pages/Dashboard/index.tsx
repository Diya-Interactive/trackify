import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Select from "../../components/Select";
import Table from "../../components/Table";
import { getProjectColumns } from "../../constants/columns";
import { useToast } from "../../hooks/useToast";
import useLoader from "../../hooks/useLoader";
import { getErrorMessage } from "../../utils/globalFunctions";
import { fetchRecords, fetchUsers } from "../../services/api/dashboard";
import * as XLSX from 'xlsx';

const Dashboard: React.FC = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [sortOrder, setSortOrder] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");
    const [startDate, setStartDate] = useState("2025-06-01T00:00:00Z");
    const [endDate, setEndDate] = useState("2025-06-30T23:59:59Z");
    const [report, setReport] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

    const { showToast } = useToast();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        fetchUsers()
            .then((data) => setUsers(data))
            .catch(() => setUsers([]));
    }, []);

    const fetchUserClockifyList = async () => {
        try {
            showLoader();
            const request = {
                users: {
                    ids: selectedUserIds,
                },
                dateRangeStart: startDate,
                dateRangeEnd: endDate,
                detailedFilter: {
                    page: currentPage,
                    sortColumn: "User",
                    pageSize: pageSize,
                },
            };
            const response = await fetchRecords(request);
            if (response) {
                setData(response?.timeentries);
                setTotalCount(response?.entriesCount);
            }
        } catch (error: unknown) {
            showToast(getErrorMessage(error), "error");
        } finally {
            hideLoader();
        }
    };

    const handleExportToExcel = () => {
        try {
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "TimeEntries");
            XLSX.writeFile(wb, `TimeEntries_${new Date().toISOString().split('T')[0]}.xlsx`);
        } catch (error) {
            showToast("Failed to export data", "error");
        }
    };

    const handleSortChange = (
        columnKey: string,
        order: "ASC" | "DESC" | "none"
    ) => {
        setSortOrder(order);
        setSortBy(columnKey);
        setCurrentPage(1);
    };
    return (
        <>
            <div className="m-auto">
                <div className="grid w-[96%] m-auto justify-center items-center grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <InputField
                        name="startDate"
                        label="Start Date"
                        type="datetime-local"
                        value={startDate.slice(0, 16)}
                        onChange={(val) =>
                            setStartDate(new Date(val).toISOString().slice(0, 16) + ":00Z")
                        }
                    />
                    <InputField
                        name="endDate"
                        label="End Date"
                        type="datetime-local"
                        value={endDate.slice(0, 16)}
                        onChange={(val) =>
                            setEndDate(new Date(val).toISOString().slice(0, 16) + ":59Z")
                        }
                    />
                    <div>
                        <label className="mb-1 text-sm font-medium text-[#232323] dark:text-gray-200">
                            Select Users
                        </label>
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
                        <div className="flex gap-2">
                            <button
                                className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                                onClick={fetchUserClockifyList}
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Fetch Report"}
                            </button>
                            <button
                                className="py-2 px-4 bg-green-600 text-white rounded-lg"
                                onClick={handleExportToExcel}
                                disabled={!data.length}
                            >
                                Export Excel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Table
                columns={getProjectColumns}
                dataSource={data ?? []}
                currentPage={currentPage}
                pageSize={pageSize}
                totalCount={totalCount}
                onPageChange={(page) => setCurrentPage(page)}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setCurrentPage(1);
                }}
                onSortChange={handleSortChange}
            />
        </>
    );
};

export default Dashboard;
