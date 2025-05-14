import { ITableColumn } from "@/app/_components/ui";
import { IRoom } from "@/types";
import { useMemo } from "react";
import { DataTable } from "../../_components";

interface IRoomTableProps {
  values: IRoom[];
  onRowClick?: (value: IRoom) => void;
}

export function RoomTable({ values, onRowClick }: IRoomTableProps) {
  const columns = useMemo(() => {
    return [
      { label: "STT", value: "index", render: (value) => value },
      { label: "Name", value: "name", render: (value) => value },
      { label: "Address", value: "address", render: (value) => value },
    ] as ITableColumn<IRoom>[];
  }, []);

  return (
    <DataTable
      values={values}
      columns={columns}
      onRowClick={onRowClick}
      columnRatios={[0.5, 1, 3]}
    />
  );
}
