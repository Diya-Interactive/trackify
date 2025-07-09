import type { columns, ColumnType } from "../../types/table"

export const getProjectColumns: ColumnType<columns>[] = [
    {
        key: "projectName",
        title: "Project Name",
        dataIndex: "projectName",
        sortable: true,
        className: "w-[200px]",
        render: (_: unknown, record: columns) => (
            <div className="flex items-center justify-start gap-2">
                   {record?.projectName} 
            </div>
        ),
    },
    {
        key: "projectCode",
        title: "Project Code",
        dataIndex: "projectCode",
        sortable: true,
        className: "w-[150px]",
    },
    {
        key: "taskName",
        title: "Task Name",
        dataIndex: "taskName",
        sortable: true,
        className: "w-[200px]",
    },
    {
        key: "tile",
        title: "Tile",
        dataIndex: "tile",
        sortable: false,
        className: "w-[100px]",
        render: (_: unknown, record: columns) => (
            <span>{record.tile ? "✅" : "❌"}</span>
        ),
    },
    {
        key: "sponsor",
        title: "Sponsor",
        dataIndex: "sponsor",
        sortable: false,
        className: "w-[200px]",
        render: (_: unknown, record: columns) => (
            <span>{record.sponsor ?? "N/A"}</span>
        ),
    },
    {
        key: "iterationPath",
        title: "Iteration",
        dataIndex: "iterationPath",
        sortable: true,
        className: "w-[150px]",
    },
    {
        key: "efforts",
        title: "Efforts",
        dataIndex: "efforts",
        sortable: true,
        className: "w-[100px]",
        render: (_: unknown, record: columns) => (
            <span>{record.efforts} hrs</span>
        ),
    },
    {
        key: "teamLead",
        title: "Team Lead",
        dataIndex: "teamLead",
        sortable: true,
        className: "w-[150px]",
    },
    {
        key: "date",
        title: "Date",
        dataIndex: "date",
        sortable: true,
        className: "w-[150px]",
    }
];
