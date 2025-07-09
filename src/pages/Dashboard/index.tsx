import React, { useState, useEffect } from "react";
import InputField from "../../components/InputField";
import Select from "../../components/Select";
import Table from "../../components/Table";
import { getProjectColumns } from "../../constants/columns";
import { useToast } from "../../hooks/useToast";
import useLoader from "../../hooks/useLoader";
import { getErrorMessage } from "../../utils/globalFunctions";
import { fetchRecords, fetchUsers } from "../../services/api/dashboard";

const Dashboard: React.FC = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [sortOrder, setSortOrder] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("");
    const [startDate, setStartDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState(startDate);
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
                    ids: selectedUserIds, // raza bhau se bind karege ise
                },
                dateRangeStart: startDate, // raza bhau se bind karege ise
                dateRangeEnd: endDate, // raza bhau se bind karege ise
                detailedFilter: {
                    page: currentPage,
                    sortColumn: "User",
                    pageSize: pageSize,
                },
            };
            const response = await fetchRecords(request);
            if (response) {
                setData(response?.data?.timeentries);
                setTotalCount(response?.entriesCount);
            }
        } catch (error: unknown) {
            showToast(getErrorMessage(error), "error");
        } finally {
            hideLoader();
        }
        /* try {
                  showLoader();
                  
            
                  const response = await companyList(
                    currentPage,
                    pageSize,
                    searchQuery,
                    industryValue as string | number,
                    sortBy,
                    sortOrder
                  );
            
                  if (response?.success) {
                    setListingData(response?.data?.results);
                    setTotalCount(response?.data?.count);
                  }
                } catch (error: unknown) {
                  showToast(getErrorMessage(error), "error");
                } finally {
                  hideLoader();
                } */
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
            <div className="">
                <div className="grid justify-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <InputField
                        name="startDate"
                        label="Start Date"
                        type="date"
                        value={startDate.slice(0, 10)}
                        onChange={(val) =>
                            setStartDate(new Date(val + "T00:00:00Z").toISOString())
                        }
                    />
                    <InputField
                        name="endDate"
                        label="End Date"
                        type="date"
                        value={endDate.slice(0, 10) < startDate.slice(0, 10) ? startDate.slice(0, 10) : endDate.slice(0, 10)}
                        min={startDate.slice(0, 10)}
                        onChange={(val) =>
                            setEndDate(new Date(val + "T23:59:59Z").toISOString())
                        }
                    />
                    <div className="z-20">
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
                        <button
                            className="py-2 px-4 bg-blue-600 text-white rounded-lg"
                            onClick={fetchUserClockifyList}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Fetch Report"}
                        </button>
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
            </div>


        </>
    );
};

export default Dashboard;
