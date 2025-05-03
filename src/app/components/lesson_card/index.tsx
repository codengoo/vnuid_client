import { LuUsers } from "react-icons/lu";
import { VnChip, VnIconButton } from "../ui";

export function LessonCard() {
  return (
    <div className="bg-gray-100 p-2 rounded-xl border border-gray-300 cursor-pointer space-y-2 min-w-72 hover:border-tertiary">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-medium text-gray-700">
            Nhập môn lập trình
          </h1>
          <p className="text-sm text-gray-500 font-medium">INT2203</p>
        </div>
        <VnIconButton icon={LuUsers} color="primary" />
      </div>
      <div className="flex gap-2">
        <VnChip label="GD3" color="green" />
        <VnChip label="1h - 3h" color="red" />
      </div>
      <div className="">
        <span className="text-sm text-gray-500">81 sinh viên</span>
      </div>
    </div>
  );
}
