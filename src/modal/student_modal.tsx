import { VnChip, VnDrawer } from "@/app/_components/ui";
import { getStudentInfo } from "@/helpers/subject/get_student_info";
import { IStudent } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { LuBook, LuGraduationCap, LuMapPinHouse } from "react-icons/lu";

interface IStudentInfoModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  studentID: string;
  subjectID: string;
}

interface IItemInfo {
  icon: IconType;
  value: string;
}

const ItemInfo = ({ icon: Icon, value }: IItemInfo) => {
  return (
    <div className="flex items-center gap-1 text-gray-600">
      <Icon size={16} className="flex-none"/>
      <span className="text-xs overflow-hidden text-nowrap truncate">
        {value}
      </span>
    </div>
  );
};

export function StudentInfoModal({
  isOpen,
  setOpen,
  studentID,
  subjectID,
}: IStudentInfoModalProps) {
  const [studentInfo, setStudentInfo] = useState<IStudent | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);

  const preload = async () => {
    try {
      setLoading(true);
      if (!studentID || !subjectID) return;
      const student = await getStudentInfo(studentID, subjectID);
      if (!student) return;
      setStudentInfo(student);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(studentID, subjectID, isOpen);
    preload();
  }, [studentID, subjectID, isOpen]);

  return (
    <VnDrawer isOpen={isOpen} setIsOpen={setOpen} title="Thông tin sinh viên">
      {isLoading || !studentInfo ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-1">
          <div className="bg-gray-100 border border-gray-300 rounded-xl p-3">
            <h1 className="text-2xl font-semibold text-gray-800">
              {studentInfo.student.name}
            </h1>
            <VnChip label={studentInfo.student.email} color="green"/>
            <div className="grid grid-cols-3 mt-3 gap-2">
              <ItemInfo
                icon={LuMapPinHouse}
                value={studentInfo.student.address}
              />
              <ItemInfo
                icon={LuGraduationCap}
                value={studentInfo.student.official_class}
              />
              <ItemInfo icon={LuBook} value={studentInfo.student.department} />
            </div>
          </div>

          <div className="mt-3">
            <h1 className="font-medium text-gray-800">LỊCH SỬ ĐIỂM DANH</h1>
          </div>
        </div>
      )}
    </VnDrawer>
  );
}
