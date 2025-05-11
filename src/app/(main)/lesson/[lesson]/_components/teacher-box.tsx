import { VnChip } from "@/app/_components/ui";
import { IUser } from "@/types";

interface ITeacherBox {
  teacher: IUser;
}

export function TeacherBox({ teacher }: ITeacherBox) {
  return (
    <div className="bg-white border-dotted border-gray-300 border-2 rounded-lg p-4 space-y-1">
      <h1 className="text-2xl font-medium text-gray-600">
        Giảng viên: {teacher.name}
      </h1>
      <div className="flex gap-2">
        <VnChip label={teacher.email} color="green" copyable />
        <VnChip label={teacher.phone} color="yellow" copyable />
      </div>
      <h3 className="text-sm text-gray-700">{teacher.department}</h3>
    </div>
  );
}
