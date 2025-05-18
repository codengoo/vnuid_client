import { ITableColumn, VnChip } from "@/components";
import { IExtraUser } from "@/types";
import { Paths } from "@/utils";
import { useMemo } from "react";
import { DataTable } from "../../_components";

interface IUserTableProps {
  users: IExtraUser[];
  onRowClick?: (user: IExtraUser) => void;
}

export function UserTable({ users, onRowClick }: IUserTableProps) {
  const columns = useMemo(() => {
    return [
      { label: "STT", value: "index", render: (value) => value },
      { label: "Name", value: "name", render: (value) => value },
      { label: "SID", value: "sid", render: (value) => value },
      { label: "Email", value: "email", render: (value) => value },
      { label: "Khoa", value: "department", render: (value) => value },
      {
        label: "Loại",
        value: "type",
        render: (value) =>
          value === "student" ? (
            <VnChip label={"Sinh viên"} color="green" />
          ) : value === "teacher" ? (
            <VnChip label={"Giáo viên"} color="yellow" />
          ) : (
            <VnChip label={"Admin"} color="red" />
          ),
      },
    ] as ITableColumn<IExtraUser, Paths<IExtraUser>>[];
  }, []);

  return (
    <div className="flex flex-col gap-2 col-span-2">
      <DataTable
        values={users}
        columns={columns}
        onRowClick={onRowClick}
        columnRatios={[0.5, 3, 1, 2, 3, 1.5]}
      />
    </div>
  );
}
