"use client";

import { VnChip, VnTable } from "@/app/_components/ui";
import { HeaderContentInfo, MainContentInfo } from "@/app/_layout";
import { getSubjectDetails } from "@/helpers/subject";
import { ICourse } from "@/types";
import { Avatar } from "flowbite-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LessonInfo } from "../_components";

export default function Live() {
  const { lesson } = useParams<{ lesson: string }>();
  const [subjectDetail, setSubjectDetail] = useState<ICourse | null>(null);
  const prepare = async () => {
    const subject = await getSubjectDetails(lesson as string);
    console.log(subject);
    setSubjectDetail(subject || null);
  };

  useEffect(() => {
    prepare();
  }, []);
  return (
    <MainContentInfo>
      <HeaderContentInfo>
        <LessonInfo subject={subjectDetail as ICourse} />
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
