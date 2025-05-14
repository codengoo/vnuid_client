import { VnChip, VnIconButton } from "@/components/ui";
import { ICourse } from "@/types";
import { formatCurrentDate } from "@/utils";
import { useRouter } from "next/navigation";
import { LuFileDown, LuQrCode } from "react-icons/lu";

interface LessonInfoProps {
  course: ICourse;
  onExport?: () => void;
}
export function LessonInfo({ course: course, onExport }: LessonInfoProps) {
  const router = useRouter();

  const handleClickChip = () => {
    router.push("/lesson/" + course.id + "/live");
  };

  if (!course) return null;
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex gap-2 items-center">
          <h1 className="text-4xl text-gray-700 font-medium">
            {course.code} - {course.name}
          </h1>
          <VnChip
            label={"Đang điểm danh"}
            color="green"
            onClick={handleClickChip}
          />
        </div>
        <h3 className="text-gray-500 font-medium">{formatCurrentDate()}</h3>
        <h3 className="text-gray-500 font-medium">{course.room.address}</h3>
      </div>
      <div>
        <VnIconButton icon={LuFileDown} onClick={onExport} />
        <VnIconButton icon={LuQrCode} />
      </div>
    </div>
  );
}
