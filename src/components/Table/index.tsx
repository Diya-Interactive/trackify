import Tooltip from "../Tooltip";
import { useTranslation } from "react-i18next";
import { FaArrow, NoData } from "../../assets/icons";
import type { TableProps } from "../../types/table";
import { useState, useEffect, type JSX, type ChangeEvent } from "react";

const Table = <T extends { id?: string | number }>({
    columns,
    dataSource,
    pagination = true,
    pageSize,
    currentPage,
    onPageChange,
    onPageSizeChange,
    onSelectRow,
    totalCount,
    onSortChange,
    rowKey = "id",
}: TableProps<T>): JSX.Element => {
    const { t } = useTranslation();

    const [selectedRowKeys, setSelectedRowKeys] = useState<Set<string | number>>(
        new Set()
    );

    const [sortState, setSortState] = useState<{
        columnKey: string;
        order: "ASC" | "DESC" | "none";
    }>({ columnKey: "", order: "none" });

    const totalPages = Math.ceil((totalCount ?? 0) / (pageSize ?? 10));

    const getRowKey = (record: T): string | number => {
        const key =
            typeof rowKey === "function"
                ? rowKey(record)
                : (record as Record<string, string | number>)[rowKey];
        return key ?? JSON.stringify(record); // fallback
    };

    const handleSort = (columnKey: string) => {
        setSortState((prev) => {
            const next: "ASC" | "DESC" | "none" =
                prev.columnKey !== columnKey
                    ? "ASC"
                    : prev.order === "none"
                        ? "ASC"
                        : prev.order === "ASC"
                            ? "DESC"
                            : "none";

            const newState = {
                columnKey: next === "none" ? "" : columnKey,
                order: next,
            };

            onSortChange?.(newState.columnKey, newState.order);
            return newState;
        });
    };

    const handleCheckboxChange = (record: T) => {
        const key = getRowKey(record);
        const newSet = new Set(selectedRowKeys);
        if (newSet.has(key)) {
            newSet.delete(key);
        } else {
            newSet.add(key);
        }
        setSelectedRowKeys(newSet);

        if (onSelectRow) {
            const selected = dataSource.filter((item) => newSet.has(getRowKey(item)));
            onSelectRow(selected);
        }
    };

    const isRowSelected = (record: T) => selectedRowKeys.has(getRowKey(record));

    const handleSelectAll = () => {
        const allSelected = dataSource.every(isRowSelected);
        const newSet = new Set(selectedRowKeys);

        dataSource.forEach((record) => {
            const key = getRowKey(record);
            if (allSelected) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
        });

        setSelectedRowKeys(newSet);
        if (onSelectRow) {
            const selected = dataSource.filter((item) => newSet.has(getRowKey(item)));
            onSelectRow(selected);
        }
    };

    const handlePageChange = (page: number) => {
        onPageChange?.(page);
    };

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value, 10);
        onPageSizeChange?.(newSize);
        onPageChange?.(1);
    };

    useEffect(() => {
        setSelectedRowKeys(new Set());
        onSelectRow?.([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataSource]);

    return (
        <div className="overflow-hidden w-full">
            <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow rounded-lg">
                <div
                    className="relative overflow-y-auto"
                    style={{ maxHeight: "calc(100vh - 230px)" }}
                >
                    <table className="min-w-full table-fixed text-sm text-gray-900 dark:text-gray-100">
                        <thead className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-600">
                            <tr>
                                {onSelectRow && (
                                    <th className="p-3 text-center w-[50px] bg-white dark:bg-gray-800">
                                        <input
                                            type="checkbox"
                                            checked={
                                                dataSource.length > 0 && dataSource.every(isRowSelected)
                                            }
                                            onChange={handleSelectAll}
                                            className="w-4 h-4 accent-blue-900 dark:accent-blue-400"
                                        />
                                    </th>
                                )}
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        onClick={() =>
                                            col.sortable &&
                                            dataSource.length > 0 &&
                                            handleSort(col.dataIndex as string)
                                        }
                                        className={`p-4 py-3 text-left bg-white dark:bg-gray-800 ${col.className ?? ""} ${col.sortable && dataSource.length > 0
                                                ? "cursor-pointer select-none"
                                                : ""
                                            }`}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>{t(col.title)}</span>
                                            {col.sortable && dataSource.length > 0 && (
                                                <Tooltip
                                                    content={
                                                        sortState.columnKey === col.dataIndex
                                                            ? sortState.order === "ASC"
                                                                ? t("ascending")
                                                                : sortState.order === "DESC"
                                                                    ? t("descending")
                                                                    : t("sort")
                                                            : t("sort")
                                                    }
                                                >
                                                    {sortState.columnKey === col.dataIndex ? (
                                                        sortState.order === "ASC" ? (
                                                            <FaArrow
                                                                className="rotate-90 text-black dark:text-white"
                                                                size={16}
                                                            />
                                                        ) : sortState.order === "DESC" ? (
                                                            <FaArrow
                                                                className="-rotate-90 text-black dark:text-white"
                                                                size={16}
                                                            />
                                                        ) : (
                                                            <div className="relative h-6 w-4 ml-2">
                                                                <FaArrow
                                                                    className="absolute left-1 top-2 -rotate-90 text-black dark:text-white"
                                                                    size={16}
                                                                />
                                                                <FaArrow
                                                                    className="absolute right-1 bottom-2 rotate-90 text-black dark:text-white"
                                                                    size={16}
                                                                />
                                                            </div>
                                                        )
                                                    ) : (
                                                        <div className="relative h-6 w-4 ml-2">
                                                            <FaArrow
                                                                className="absolute left-1 top-2 -rotate-90 text-black dark:text-white"
                                                                size={16}
                                                            />
                                                            <FaArrow
                                                                className="absolute right-1 bottom-2 rotate-90 text-black dark:text-white"
                                                                size={16}
                                                            />
                                                        </div>
                                                    )}
                                                </Tooltip>
                                            )}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataSource.length > 0 ? (
                                dataSource.map((record, rowIndex) => (
                                    <tr
                                        key={getRowKey(record)}
                                        className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {onSelectRow && (
                                            <td className="p-3 text-center w-[50px]">
                                                <input
                                                    type="checkbox"
                                                    checked={isRowSelected(record)}
                                                    onChange={() => handleCheckboxChange(record)}
                                                    className="w-4 h-4 accent-blue-900 dark:accent-blue-400"
                                                />
                                            </td>
                                        )}
                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                className={`px-4 py-5 text-gray-800 dark:text-gray-200 ${col.className ?? ""}`}
                                            >
                                                {col.render
                                                    ? col.render(record[col.dataIndex], record, rowIndex)
                                                    : String(record[col.dataIndex] ?? "")}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={columns.length + (onSelectRow ? 1 : 0)}
                                        className="h-[300px] text-center align-middle"
                                    >
                                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                                            <NoData />
                                            <span className="text-gray-500 dark:text-gray-400 text-sm">
                                                {t('no_data_available')}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {pagination && (
                <div className="py-3 flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm">
                    <div className="text-black dark:text-gray-300 order-1 lg:order-1">
                        {t("total")}: {totalCount}
                    </div>
                    {totalPages > 0 && (
                        <div className="flex items-center space-x-1 order-3 lg:order-2">
                            <button
                                onClick={() =>
                                    handlePageChange(Math.max((currentPage ?? 1) - 1, 1))
                                }
                                disabled={(currentPage ?? 1) === 1}
                                className={`flex justify-center items-center rounded-md w-10 h-10 border ${(currentPage ?? 1) === 1
                                        ? "bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed border-[#ccc] dark:border-gray-100"
                                        : "bg-white dark:bg-gray-700 text-black dark:text-white border-[#ccc] dark:border-gray-100"
                                    }`}
                            >
                                <FaArrow className="text-inherit" />
                            </button>

                            {(() => {
                                const pages: (number | "ellipsis")[] = [];
                                for (let page = 1; page <= totalPages; page++) {
                                    if (page === 1 || page === totalPages) {
                                        pages.push(page);
                                    } else if (currentPage && Math.abs(page - currentPage) <= 1) {
                                        pages.push(page);
                                    } else if (
                                        currentPage &&
                                        (page === currentPage - 2 || page === currentPage + 2)
                                    ) {
                                        if (pages[pages.length - 1] !== "ellipsis") {
                                            pages.push("ellipsis");
                                        }
                                    }
                                }
                                return pages.map((page, i) => {
                                    if (page === "ellipsis") {
                                        return (
                                            <span
                                                key={`ellipsis-${i}`}
                                                className="px-2 text-gray-500"
                                            >
                                                ...
                                            </span>
                                        );
                                    }
                                    const isActive = page === currentPage;
                                    return (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page as number)}
                                            className={`flex justify-center items-center rounded-md w-10 h-10 border ${isActive
                                                    ? "bg-white dark:bg-blue-600 border-[#ccc] dark:border-blue-600 text-black dark:text-white"
                                                    : "bg-transparent border-[#ccc] dark:border-gray-100 text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                });
                            })()}

                            <button
                                onClick={() =>
                                    handlePageChange(Math.min((currentPage ?? 1) + 1, totalPages))
                                }
                                disabled={(currentPage ?? 1) === totalPages}
                                className={`flex justify-center items-center rounded-md w-10 h-10 border rotate-180 ${(currentPage ?? 1) === totalPages
                                        ? "bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed border-[#ccc] dark:border-gray-100"
                                        : "bg-white dark:bg-gray-700 text-black dark:text-white border-[#ccc] dark:border-gray-100"
                                    }`}
                            >
                                <FaArrow className="text-inherit " />
                            </button>
                        </div>
                    )}

                    <div className="flex items-center space-x-2 order-2 lg:order-3">
                        <span className="text-gray-600 dark:text-gray-300">
                            {t("show_per_page")}:
                        </span>
                        <select
                            value={pageSize}
                            onChange={handlePageSizeChange}
                            className="border border-[#ccc] dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none"
                        >
                            {[10, 20, 50, 100].map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;
