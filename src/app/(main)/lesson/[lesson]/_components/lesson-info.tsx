import { VnIconButton } from "@/app/_components/ui";
import { ISubject } from "@/types";
import { formatCurrentDate } from "@/utils";
import { LuFileDown, LuQrCode } from "react-icons/lu";

interface LessonInfoProps {
  subject: ISubject;
}
export function LessonInfo({ subject }: LessonInfoProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex gap-2 items-center">
          <h1 className="text-4xl text-gray-700 font-medium">
            {subject.code} - {subject.name}
          </h1>
          <span className="text-tertiary-200 bg-secondary h-fit rounded-lg px-2 py-1 font-medium text-sm">
            Đang trong quá trình điểm danh
          </span>
        </div>
        <h3 className="text-gray-500 font-medium">{formatCurrentDate()}</h3>
        <h3 className="text-gray-500 font-medium">{subject.address}</h3>
      </div>
      <div>
        <VnIconButton icon={LuFileDown} />
        <VnIconButton icon={LuQrCode} />
      </div>
    </div>
  );
}
