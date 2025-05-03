"use client";

import { VnButton, VnChip, VnIconButton } from "@/app/components/ui";
import { ApexOptions } from "apexcharts";
import { LuFileDown, LuPlus, LuQrCode } from "react-icons/lu";
import { InfoBox, StudentBox } from "./components";
import AttendanceBox from "./components/attendance-box";
import Chart from "react-apexcharts";
export default function LessonDetail() {
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

  return (
    <div className="space-y-8 h-full overflow-y-scroll overflow-x-hidden scroll">
      <div className="bg-gray-100 border border-gray-300 p-4 rounded-xl space-y-4">
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
            <h3 className="text-gray-500">Thứ 3, ngày 20 - 01 - 2025</h3>
            <h3 className="text-gray-500">Giảng đường 3, UET</h3>
          </div>
          <div>
            <VnIconButton icon={LuFileDown} />
            <VnIconButton icon={LuQrCode} />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3 space-y-4 flex-none">
            <div className="bg-white border-dotted border-gray-300 border-2 rounded-lg p-4 space-y-1">
              <h1 className="text-2xl font-medium text-gray-600">
                Giảng viên: Trương Minh Đức
              </h1>
              <div className="flex gap-2">
                <VnChip label="ductm@vnu.edu.vn" color="green" copyable />
                <VnChip label="0123456789" color="yellow" copyable />
              </div>
              <h3 className="text-sm text-gray-700">
                Khoa Công nghệ thông tin, UET
              </h3>
            </div>
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
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl font-medium text-gray-700">
            Cấu hình điểm danh
          </h2>
          <VnButton label="Thêm" icon={LuPlus} />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <AttendanceBox />
          <AttendanceBox />
          <AttendanceBox />
          <AttendanceBox />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-4 items-center">
          <h2 className="text-2xl font-medium text-gray-700">Sinh viên</h2>
          <VnChip label="81 sinh viên" color="yellow" />
        </div>

        <div className="grid grid-cols-5 gap-4">
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
          <StudentBox />
        </div>
      </div>
    </div>
  );
}
