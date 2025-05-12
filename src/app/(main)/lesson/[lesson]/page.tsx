"use client";

import { StudentCard } from "@/app/_components";
import { VnButton, VnChip } from "@/app/_components/ui";
import { HeaderContentInfo, MainContentInfo } from "@/app/_layout";
import { getSubjectDetails } from "@/helpers/subject";
import { SessionModal } from "@/modal";
import { ISession, ISubject } from "@/types";
import { ApexOptions } from "apexcharts";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { LuPlus } from "react-icons/lu";
import { InfoBox, LessonInfo, TeacherBox } from "./_components";
import AttendanceBox from "./_components/attendance-box";
export default function LessonDetail() {
  const { lesson } = useParams<{ lesson: string }>();
  const [subjectDetail, setSubjectDetail] = useState<ISubject | null>(null);
  const [isOpenPopup, setOpenPopup] = useState<boolean>(false);
  const [isOpenEditPopup, setOpenEditPopup] = useState<boolean>(false);
  const [sessionData, setSessionData] = useState<ISession>();

  const options: ApexOptions = {
    chart: {
      type: "area",
      height: "200px",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    grid: {
      show: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 80, 100],
        gradientToColors: ["#F3F4F6"],
      },
    },
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      type: "datetime",
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleEditSession = (id: string) => {
    const data = subjectDetail?.session.find((session) => session.id === id);
    if (!data) return;
    setSessionData(data);
    setOpenEditPopup(true);
  };

  const prepare = async () => {
    const subject = await getSubjectDetails(lesson as string);
    console.log(subject);
    setSubjectDetail(subject || null);
  };

  useEffect(() => {
    prepare();
  }, []);

  if (subjectDetail === null) return null;

  return (
    <MainContentInfo>
      <HeaderContentInfo>
        <LessonInfo subject={subjectDetail} />
        <div className="flex gap-4">
          <div className="w-1/3 space-y-4 flex-none">
            <TeacherBox teacher={subjectDetail.teacher} />
            <div className="grid grid-cols-2 gap-4">
              <InfoBox
                title="Ty le diem danh"
                description="hello"
                value={69}
                color="green"
              />
              <InfoBox
                title="Ty le diem danh"
                description="hello"
                value={69}
                color="yellow"
              />
            </div>
          </div>

          <div className="w-full">
            <Chart
              type="area"
              options={options}
              series={[
                {
                  name: "series-1",
                  data: [31, 40, 28, 300, 20, 109, 10],
                  color: "#9bad74",
                },
              ]}
              height="240px"
            />
          </div>
        </div>
      </HeaderContentInfo>

      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl font-medium text-gray-700">
            Cấu hình điểm danh
          </h2>
          <VnButton label="Thêm" icon={LuPlus} onClick={handleOpenPopup} />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {subjectDetail.session.map((session) => (
            <AttendanceBox
              key={session.id}
              session={session}
              onClick={() => handleEditSession(session.id)}
            />
          ))}
        </div>

        <SessionModal
          isOpenPopup={isOpenPopup}
          setOpenPopup={setOpenPopup}
          subject={subjectDetail}
          onSuccess={prepare}
          mode="create"
        />

        <SessionModal
          isOpenPopup={isOpenEditPopup}
          setOpenPopup={setOpenEditPopup}
          subject={subjectDetail}
          onSuccess={prepare}
          mode="update"
          sessionData={sessionData}
        />
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl font-medium text-gray-700">Sinh viên</h2>
          <VnChip
            label={`${subjectDetail.students.length} sinh viên`}
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-5 gap-4">
          {subjectDetail.students.map((student) => (
            <StudentCard student={student} key={student.id} />
          ))}
        </div>
      </div>
    </MainContentInfo>
  );
}
