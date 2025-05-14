import { ISession } from "@/types";
import { formatTime } from "@/utils";

interface IAttendanceBox {
  session: ISession;
  onClick?: () => void;
}

export default function CheckinBox({ session, onClick }: IAttendanceBox) {
  return (
    <div
      onClick={onClick}
      className="border-gray-800 bg-highlight flex rounded-xl overflow-hidden border cursor-pointer hover:border-highlight-200 group"
    >
      <div className="border-r p-2 bg-highlight-200 border-gray-800 border-dashed flex justify-center items-center">
        <div className="w-5 h-5 rounded-full bg-gray-800"></div>
      </div>

      <div className="p-4">
        <h1 className="font-semibold text-xl text-gray-700">{session.name}</h1>
        <p className="text-gray-700 text-sm">
          Hiệu lực trong {session.duration} phút
        </p>
        <p className="text-gray-700 text-sm">
          Bắt đầu lúc {formatTime(session.start)}
        </p>
      </div>
    </div>
  );
}
