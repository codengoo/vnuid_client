"use client";

import { VnChip, VnTable } from "@/app/_components/ui";
import { HeaderContentInfo, MainContentInfo } from "@/app/_layout";
import { Avatar } from "flowbite-react";
import { LessonInfo } from "../_components";

export default function Live() {
  return (
    <MainContentInfo>
      <HeaderContentInfo>
        <LessonInfo />
      </HeaderContentInfo>

      <div>
        <VnTable
          columns={["STT", "Name", "ID", "Thời gian", "Trạng thái", "Action"]}
          columnRatios={[1, 4, 1, 2, 2, 2]}
          values={[
            [
              "1",
              <div className="flex items-center gap-2">
                <Avatar img={"/images/avatar_male.png"} rounded size="xs" />
                <span className="font-medium">Do Tuan Nghia</span>
              </div>,
              "21020365",
              "07:00:01",
              <VnChip label="Thanh cong" color="green" />,
              "Xem",
            ],
          ]}
        />
      </div>
    </MainContentInfo>
  );
}
