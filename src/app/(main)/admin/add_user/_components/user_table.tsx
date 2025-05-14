import { ITableColumn, VnChip, VnInput, VnTable } from "@/app/_components/ui";
import { IExtraUser } from "@/types";
import { useMemo } from "react";
import { LuSearch } from "react-icons/lu";

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
    ] as ITableColumn<IExtraUser>[];
  }, []);

  const handleRowClick = (id: string) => {
    console.log(id);
    const user = users.find((user) => user.id === id);
    if (user) onRowClick?.(user);
  };

  return (
    <div className="flex flex-col gap-2 col-span-2">
      <div className="w-full justify-end flex">
        <VnInput
          id="search"
          icon={LuSearch}
          placeholder="Search"
          className="w-1/3"
        />
      </div>
      <VnTable
        columns={columns}
        values={users}
        columnRatios={[0.5, 3, 1, 2, 3, 1.5]}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
