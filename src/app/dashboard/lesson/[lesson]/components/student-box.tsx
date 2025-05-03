import { Avatar } from "flowbite-react";

export function StudentBox() {
  return (
    <div className="flex gap-4 hover:bg-gray-100 rounded-lg p-2 border border-transparent hover:!border-gray-300 border-dashed cursor-pointer">
      <Avatar img={"/images/avatar_male.png"} rounded className="flex-none" />
      <div className="overflow-hidden">
        <p className="font-medium text-nowrap text-ellipsis overflow-hidden">
          Hoàng Trần Mai Hoa
        </p>
        <p className="text-sm text-gray-500">21020365@vnu.edu.vn</p>
      </div>
    </div>
  );
}
