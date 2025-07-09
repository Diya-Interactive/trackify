import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import { getProjectColumns } from "../../constants/columns";
import { useToast } from "../../hooks/useToast";
import useLoader from "../../hooks/useLoader";
import { getErrorMessage } from "../../utils/globalFunctions";
import { fetchRecords } from "../../services/api/dashboard";

const Dashboard: React.FC = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  const { showToast } = useToast();
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchAPIsOfComapanies = async () => {
      await fetchUserClockifyList();
    };
    fetchAPIsOfComapanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize, sortBy, sortOrder]);

  const fetchUserClockifyList = async () => {
    try {
      showLoader();
      const request = {
        users: {
          ids: ["6369eadd1dad531640d9f177", "63622c8ec48e1f741fb810af"], // raza bhau se bind karege ise
        },
        dateRangeStart: "2025-06-01T00:00:00Z", // raza bhau se bind karege ise
        dateRangeEnd: "2025-06-30T23:59:59Z", // raza bhau se bind karege ise
        detailedFilter: {
          page: currentPage,
          sortColumn: sortBy,
          pageSize: pageSize,
        },
      };
      const response = await fetchRecords(request);
      if(response?.success) {
        setData(response?.data?.timeentries);
        setTotalCount(response?.data?.totals?.totalTime);
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
