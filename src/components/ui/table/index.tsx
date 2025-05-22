"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import { get, Paths, PathValue } from "@/utils";
import { default as cn } from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { LuArrowLeft, LuArrowRight, LuSearch } from "react-icons/lu";
import { VnDropdown } from "../dropdown";
import { VnInput } from "../form";
import { VnIconButton } from "../icon_button";

export interface ITableColumn<T extends { id: string }, P extends Paths<T>> {
  label: string;
  value: P;
  render: (value: PathValue<T, P>) => ReactNode;
}

interface IVnTableProps<T extends { id: string }> {
  columns: ITableColumn<T, any>[];
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
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<T[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleNextPage = () =>
    setPage((page) => (page + 1 <= totalPages ? page + 1 : page));
  const handlePrevPage = () =>
    setPage((page) => (page - 1 >= 1 ? page - 1 : page));

  useEffect(() => {
    console.log(values);

    const total = Math.ceil(values.length / limit);
    const _page = total !== 0 ? Math.min(page || 1, total) : 0;
    setTotalPages(total);
    setPage(_page);
    setRows(values.slice((_page - 1) * limit, _page * limit));
  }, [limit, page, values]);

  return (
    <div className="space-y-2">
      <div className="w-full justify-end flex">
        <VnInput
          id="search"
          icon={LuSearch}
          placeholder="Search"
          className="w-1/3"
        />
      </div>

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
            {rows.map((value, idx) => (
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
                      : column.render(get(value, column.value))}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <VnDropdown
          label={`${limit} mục`}
          setValue={setLimit}
          value={limit}
          options={[
            { label: "5", value: 5 },
            { label: "10", value: 5 },
            { label: "25", value: 25 },
            { label: "50", value: 50 },
          ]}
        />

        <div className="flex gap-1">
          <VnIconButton
            icon={LuArrowLeft}
            size="xs"
            className="hover:bg-gray-580"
            onClick={handlePrevPage}
          />
          <VnIconButton
            icon={LuArrowRight}
            size="xs"
            className="hover:bg-gray-50"
            onClick={handleNextPage}
          />
          <div className="flex gap-1 items-center text-xs text-gray-700">
            <div className="bg-gray-100 border border-gray-300 px-2 py-1 rounded-md">
              Trang {page}
            </div>
            <span>/</span>
            <div>{totalPages}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
