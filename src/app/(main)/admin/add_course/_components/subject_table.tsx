import { ITableColumn, VnInput, VnTable } from "@/components/ui";
import { ICourse } from "@/types";
import { formatDateTime } from "@/utils";
import { useMemo } from "react";
import { LuSearch } from "react-icons/lu";

interface ISubjectTableProps {
  courses: ICourse[];
  onRowClick: (subject: ICourse) => void;
}

export function CourseTable({
  onRowClick,
  courses: subjects,
}: ISubjectTableProps) {
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
    ] as ITableColumn<ICourse>[];
  }, []);

  const handleRowClick = (id: string) => {
    console.log(id);
    const subject = subjects.find((subject) => subject.id === id);
    if (subject) onRowClick?.(subject);
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
        values={subjects}
        columnRatios={[1, 4, 2, 3]}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
