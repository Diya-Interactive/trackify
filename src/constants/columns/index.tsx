import type { columns, ColumnType } from "../../types/table";
import moment from "moment";

export const getProjectColumns: ColumnType<columns>[] = [
    {
        key: "projectName",
        title: "Title/ User Story",
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
        key: "projectId",
        title: "Project Code",
        dataIndex: "projectId",
        sortable: true,
        className: "w-[150px]",
    },
    {
        key: "description",
        title: "Task Name",
        dataIndex: "description",
        sortable: true,
        className: "w-[200px]",
    },
    {
        key: "tile",
        title: "ID/Ref",
        dataIndex: "tile",
        sortable: false,
        className: "w-[100px]",
        render: (_: unknown, record: columns) => (
            <span>{record?._id}</span>
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
        render: (_: unknown, record: columns) => {
            const duration = moment.duration(Number(record.timeInterval?.duration), "seconds");

            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();

            const formatted =
                `${hours > 0 ? `${hours}h ` : ""}` +
                `${minutes > 0 ? `${minutes}m ` : ""}` +
                `${seconds > 0 ? `${seconds}s` : ""}` ||
                "0s";

            return <span>{formatted.trim()}</span>;
        },
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
        className: "w-[200px]",
        render: (_: unknown, record: columns) => (
            <div className="flex flex-col">
                <span>{moment(record?.timeInterval?.start).format("MM-DD-YYYY hh:mm A")}</span>
                <span>{moment(record?.timeInterval?.end).format("MM-DD-YYYY hh:mm A")}</span>
            </div>
        ),
    },
];
