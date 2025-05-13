import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { default as cn } from "classnames";
import { ReactNode } from "react";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { VnDropdown } from "../dropdown";
import { VnIconButton } from "../icon_button";

export interface ITableColumn<T extends { id: string }> {
  label: string;
  value: keyof T | "index";
  render: (value: T[keyof T]) => ReactNode;
}

interface IVnTableProps<T extends { id: string }> {
  columns: ITableColumn<T>[];
  columnRatios?: number[];
  values: T[];
  onRowClick?: (id: string) => void;
}

export function VnTable<T extends { id: string }>({
  columns,
  values,
  columnRatios = [],
  onRowClick,
}: IVnTableProps<T>) {
  const total = columnRatios.reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-2">
      <div className="border border-gray-300 rounded-xl overflow-hidden">
        <Table
          striped
          hoverable
          theme={{
            head: {
              cell: {
                base: "bg-secondary group-first/head:not-first:border-r group-first/head:last:border-r-0 border-tertiary",
              },
            },
          }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column, idx) => (
                <TableHeadCell
                  key={column.value.toString()}
                  style={{ width: `${(columnRatios[idx] / total) * 100}%` }}
                >
                  {column.label}
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody className="divide-y divide-gray-300">
            {values.map((value, idx) => (
              <TableRow
                onClick={() => onRowClick?.(value.id)}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={"tb_row_" + idx}
              >
                {columns.map((column, idx2) => (
                  <TableCell
                    key={"index_" + idx2}
                    style={{ width: `${(columnRatios[idx2] / total) * 100}%` }}
                    className={cn(
                      "not-first:border-r last:border-r-0 border-tertiary",
                      {
                        "bg-gray-100": idx2 <= 1,
                      },
                    )}
                  >
                    {column.value === "index"
                      ? idx + 1
                      : column.render(value[column.value])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <VnDropdown
          values={[
            { label: "10", value: "10" },
            { label: "25", value: "25" },
          ]}
        />
        <div className="flex gap-1">
          <VnIconButton
            icon={LuArrowLeft}
            size="xs"
            className="hover:bg-gray-580"
          />
          <VnIconButton
            icon={LuArrowRight}
            size="xs"
            className="hover:bg-gray-50"
          />
          <div className="flex gap-1 items-center text-xs text-gray-700">
            <div className="bg-gray-100 border border-gray-300 px-2 py-1 rounded-md">
              Trang 01
            </div>
            <span>/</span>
            <div>10</div>
          </div>
        </div>
      </div>
    </div>
  );
}
