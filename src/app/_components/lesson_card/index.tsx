import { ICourse } from "@/types";
import { formatTimeRange } from "@/utils";
import Link from "next/link";
import { LuUsers } from "react-icons/lu";
import { VnChip, VnIconButton } from "../ui";

interface ILessonCardProps {
  subject: ICourse;
  onShowStudents?: () => void;
}
export function LessonCard({ subject, onShowStudents }: ILessonCardProps) {
  return (
    <Link
      href={"/lesson/" + subject.id}
      className="bg-gray-100 p-2 rounded-xl border border-gray-300 cursor-pointer space-y-2 min-w-72 hover:border-tertiary"
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium text-gray-700">{subject.name}</h1>
          <p className="text-sm text-gray-500 font-medium">{subject.code}</p>
        </div>
        <VnIconButton icon={LuUsers} color="primary" onClick={onShowStudents} />
      </div>
      <div className="flex gap-2">
        <VnChip label={subject.address} color="green" />
        <VnChip
          label={formatTimeRange(subject.start_time, subject.end_time)}
          color="yellow"
        />
      </div>
      <div className="">
        <span className="text-sm text-gray-500">
          {subject._count.students} sinh viên
        </span>
      </div>
    </Link>
  );
}
