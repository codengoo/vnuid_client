import { ITableColumn, VnInput, VnTable } from "@/components";
import { LuSearch } from "react-icons/lu";

interface IDataTableProps<T extends { id: string }> {
  values: T[];
  onRowClick?: (value: T) => void;
  columns: ITableColumn<T>[];
  columnRatios?: number[];
}

export function DataTable<T extends { id: string }>({
  values,
  onRowClick,
  columns,
  columnRatios = [],
}: IDataTableProps<T>) {
  const handleRowClick = (id: string) => {
    console.log(id);
    const user = values.find((wifi) => wifi.id === id);
    if (user) onRowClick?.(user);
  };

  return (
    <div className="flex flex-col gap-2">
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
        values={values}
        columnRatios={columnRatios}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
