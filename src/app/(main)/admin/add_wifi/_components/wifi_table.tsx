import { ITableColumn } from "@/app/_components/ui";
import { IWifi } from "@/types";
import { useMemo } from "react";
import { DataTable } from "../../_components";

interface IWifiTableProps {
  values: IWifi[];
  onRowClick?: (wifi: IWifi) => void;
}

export function WifiTable({ values, onRowClick }: IWifiTableProps) {
  const columns = useMemo(() => {
    return [
      { label: "STT", value: "index", render: (value) => value },
      { label: "Name", value: "name", render: (value) => value },
      { label: "MAC", value: "mac", render: (value) => value },
    ] as ITableColumn<IWifi>[];
  }, []);

  return (
    <DataTable
      values={values}
      columns={columns}
      onRowClick={onRowClick}
      columnRatios={[0.5, 1, 2]}
    />
  );
}
