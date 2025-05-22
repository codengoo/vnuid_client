import { ITableColumn } from "@/components";
import { IWifi } from "@/types";
import { Paths } from "@/utils";
import { useEffect, useMemo } from "react";
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
    ] as ITableColumn<IWifi, Paths<IWifi>>[];
  }, []);

  return (
    <DataTable
      values={values}
      columns={columns}
      onRowClick={onRowClick}
      columnRatios={[0.5, 1, 2]}
      className="col-span-2 lg:col-span-1"
    />
  );
}
