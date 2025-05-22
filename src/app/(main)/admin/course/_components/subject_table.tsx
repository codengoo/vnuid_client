import { ITableColumn } from "@/components";
import { ICourse } from "@/types";
import { formatDateTime, Paths } from "@/utils";
import { useMemo } from "react";
import { DataTable } from "../../_components";

interface ISubjectTableProps {
  courses: ICourse[];
  onRowClick: (subject: ICourse) => void;
}

export function CourseTable({ onRowClick, courses }: ISubjectTableProps) {
  const columns = useMemo(() => {
    return [
      { label: "STT", value: "index", render: (value) => value },
      { label: "Name", value: "name", render: (value) => value },
      { label: "Mã", value: "code", render: (value) => value },
      {
        label: "Ngày bắt đầu",
        value: "start_time",
        render: (value) => formatDateTime(value as string),
      },
    ] as ITableColumn<ICourse, Paths<ICourse>>[];
  }, []);

  return (
    <div className="flex flex-col gap-2 col-span-1">
      <DataTable
        values={courses}
        columns={columns}
        onRowClick={onRowClick}
        columnRatios={[0.5, 2, 1, 1]}
      />
    </div>
  );
}
