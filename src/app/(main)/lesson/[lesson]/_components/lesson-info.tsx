import { VnChip, VnIconButton } from "@/components";
import { ICourse, ISession } from "@/types";
import { formatCurrentDate, isRunningNow } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LuFileDown, LuQrCode } from "react-icons/lu";

interface LessonInfoProps {
  course: ICourse;
  onExport?: () => void;
}
export function CourseInfo({ course, onExport }: LessonInfoProps) {
  const router = useRouter();
  const [sessionNow, setSessionNow] = useState<ISession | null>(null);

  const handleClickChip = () => {
    router.push("/lesson/" + course.id + "/live?session=" + sessionNow?.id);
  };

  useEffect(() => {
    if (!course) return;
    const sessions = course.session.filter((session) =>
      isRunningNow(session.start, session.duration),
    );

    setSessionNow(sessions.length > 0 ? sessions[0] : null);
  }, [course]);

  if (!course) return null;
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex gap-2 items-center">
          <h1 className="text-4xl text-gray-700 font-medium">
            {course.code} - {course.name}
          </h1>
          {sessionNow && (
            <VnChip
              label={"Đang điểm danh"}
              color="green"
              onClick={handleClickChip}
            />
          )}
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
