import { VnIconButton } from "@/app/_components/ui";
import { LuFileDown, LuQrCode } from "react-icons/lu";

export function LessonInfo() {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="flex gap-2 items-center">
          <h1 className="text-4xl text-gray-700 font-medium">
            INT2203 - Nhập môn lập trình
          </h1>
          <span className="text-tertiary-200 bg-secondary h-fit rounded-lg px-2 py-1 font-medium text-sm">
            Đang trong quá trình điểm danh
          </span>
        </div>
        <h3 className="text-gray-500 font-medium">Thứ 3, ngày 20 - 01 - 2025</h3>
        <h3 className="text-gray-500 font-medium">Giảng đường 3, UET</h3>
      </div>
      <div>
        <VnIconButton icon={LuFileDown} />
        <VnIconButton icon={LuQrCode} />
      </div>
    </div>
  );
}
