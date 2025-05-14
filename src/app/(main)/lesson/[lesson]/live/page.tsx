"use client";

import { ITableColumn, VnTable } from "@/app/_components/ui";
import { HeaderContentInfo, MainContentInfo } from "@/app/_layout";
import { getSubjectDetails } from "@/helpers/subject";
import { ICheckin, ICourse } from "@/types";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LessonInfo } from "../_components";

export default function Live() {
  const { lesson } = useParams<{ lesson: string }>();
  const [subjectDetail, setSubjectDetail] = useState<ICourse | null>(null);

  const column = useMemo(() => {
    return [
      { label: "STT", value: "index", render: (value) => value },
    ] as ITableColumn<ICheckin>[];
  }, []);

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
        <VnTable columns={column} columnRatios={[1]} values={[]} />
      </div>
    </MainContentInfo>
  );
}
