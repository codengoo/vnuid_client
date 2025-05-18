import { ITableColumn, VnInput, VnTable } from "@/components";
import { Paths } from "@/utils";
import cn from "classnames";
import { LuSearch } from "react-icons/lu";

interface IDataTableProps<T extends { id: string }> {
  values: T[];
  onRowClick?: (value: T) => void;
  columns: ITableColumn<T, Paths<T>>[];
  columnRatios?: number[];
  className?: string;
}

export function DataTable<T extends { id: string }>({
  values,
  onRowClick,
  columns,
  columnRatios = [],
  className,
}: IDataTableProps<T>) {
  const handleRowClick = (id: string) => {
    const value = values.find((wifi) => wifi.id === id);
    if (value) onRowClick?.(value);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <VnTable
        columns={columns}
        values={values}
        columnRatios={columnRatios}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
