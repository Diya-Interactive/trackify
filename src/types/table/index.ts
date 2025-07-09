export interface ColumnType<T> {
    title: string;
    dataIndex: keyof T;
    key: string;
    sortable?: boolean;
    width?: string | boolean;
    className?: string;
    render?: (
        value: string | number | boolean | undefined | null | unknown,
        record: T,
        index: number
    ) => React.ReactNode;
}

export interface TableProps<T> {
    columns: ColumnType<T>[];
    dataSource: T[];
    pagination?: boolean;
    pageSize?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (newSize: number) => void;
    onSelectRow?: (selectedRows: T[]) => void;
    totalCount?: number;
    onSortChange?: (columnKey: string, order: "ASC" | "DESC" | "none") => void;
    rowKey?: string | ((record: T) => string);
}



export type columns = {
    id: number;
    date:string;
    projectCode: string;
    projectName: string;
    taskName: string;
    tile: boolean;
    sponsor?: string;
    iterationPath: string;
    efforts: string | number;
    teamLead: string;
    projectId: string; 
    description: string;
    timeInterval : any;
    _id:string;
};