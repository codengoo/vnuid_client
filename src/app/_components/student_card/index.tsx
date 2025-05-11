import { IUser } from "@/types";
import cn from "classnames";
import { Avatar } from "flowbite-react";

interface IStudentCardProps {
  student: IUser;
  style?: "normal" | "highlight";
}
export function StudentCard({ student, style = "normal" }: IStudentCardProps) {
  return (
    <div
      className={cn(
        "flex gap-4 hover:bg-gray-100 rounded-lg p-2 border border-transparent hover:!border-gray-300 border-dashed cursor-pointer",
        { "bg-gray-50": style === "highlight" },
      )}
    >
      <Avatar img={"/images/avatar_male.png"} rounded className="flex-none" />
      <div className="overflow-hidden">
        <p className="font-medium text-nowrap text-ellipsis overflow-hidden">
          {student.name}
        </p>
        <p className="text-sm text-gray-500">{student.email}</p>
      </div>
    </div>
  );
}
