import { ICheckin } from "@/types";
import Link from "next/link";
import { VnChip } from "../../../components/ui";

interface ICheckinCardProps {
  checkin: ICheckin;
}
export function CheckinCard({ checkin }: ICheckinCardProps) {
  return (
    <Link
      href={"/lesson/" + checkin.course.id + "/session/" + checkin.id}
      className="bg-gray-100 p-2 rounded-xl border border-gray-300 cursor-pointer space-y-2 min-w-72 hover:border-tertiary"
    >
      <div>
        <h1 className="text-xl font-medium text-gray-700">{checkin.name}</h1>
        <div>
          <p className="text-sm text-gray-500 font-medium">
            {checkin.course.name}
          </p>
          <VnChip label={checkin.course.code} color="green" />
        </div>
      </div>

      <div className="flex gap-2">
        <VnChip label={checkin.session.start} color="green" />
        <VnChip label={checkin.session.duration.toString()} color="green" />
      </div>

      <div className="">
        <span className="text-sm text-gray-500">
          {checkin._count.students} sinh viên
        </span>
      </div>
    </Link>
  );
}
