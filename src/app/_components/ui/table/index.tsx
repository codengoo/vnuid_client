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
interface IVnTableProps {
  columns: string[];
  columnRatios?: number[];
  values: ReactNode[][];
}

export function VnTable({ columns, values, columnRatios = [] }: IVnTableProps) {
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
                  key={column}
                  style={{ width: `${(columnRatios[idx] / total) * 100}%` }}
                >
                  {column}
                </TableHeadCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody className="divide-y divide-gray-300">
            {values.map((value, idx) => (
              <TableRow
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={"tb_row_" + idx}
              >
                {value.map((item, idx2) => (
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
                    {item}
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
