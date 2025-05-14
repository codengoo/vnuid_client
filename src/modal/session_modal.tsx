import { VnEditable } from "@/components";
import { VnButton, VnConfirm, VnPopup, VnSwitch } from "@/components/ui";
import { AddSessionDefaultValue } from "@/data";
import { addSession, deleteSession, updateSession } from "@/helpers/subject";
import { ISession, ICourse } from "@/types";
import { formatTime } from "@/utils";
import { useEffect, useState } from "react";
import { LuCalendarClock, LuHourglass, LuSchool } from "react-icons/lu";
import { toast } from "react-toastify";

interface ISessionModalProps {
  isOpenPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  subject: ICourse;
  onSuccess: () => {};
  mode: "create" | "view";
  sessionData?: ISession;
}

interface IItemSwitch {
  label: string;
}

const ItemSwitch = ({ label }: IItemSwitch) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-600 font-medium">{label}</p>
      <VnSwitch checked onChange={() => {}} />
    </div>
  );
};

export function SessionModal({
  isOpenPopup,
  setOpenPopup,
  subject,
  onSuccess,
  mode,
  sessionData,
}: ISessionModalProps) {
  const [isLoading, setLoading] = useState(false);
  const [isShowConfirm, setShowConfirm] = useState(false);
  const [newSession, setNewSession] = useState<Partial<ISession>>({
    ...AddSessionDefaultValue,
    subjectId: subject.id,
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      if (mode === "create") {
        await addSession(newSession);
        toast.success("Thêm phiên điểm danh thành công");
      } else {
        await updateSession(newSession);
        toast.success("Cập nhật phiên điểm danh thành công");
      }
      onSuccess?.();
      setOpenPopup(false);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    setShowConfirm(true);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteSession(newSession.id!);
      toast.success("Xóa phiên điểm danh thành công");
      onSuccess?.();
      setOpenPopup(false);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeDuration = (value: string) => {
    setNewSession({
      ...newSession,
      duration: Number(value),
    });
  };

  const handleChangeStart = (value: string) => {
    const [hours, minutes] = value.split(":").map(Number);
    const now = new Date();
    const dateWithTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes,
    );

    setNewSession({
      ...newSession,
      start: dateWithTime.toISOString(),
    });
  };

  const handleChangeName = (value: string) => {
    setNewSession({
      ...newSession,
      name: value,
    });
  };

  useEffect(() => {
    if (mode === "view" && sessionData) {
      setNewSession(sessionData);
    } else {
      setNewSession({
        ...AddSessionDefaultValue,
        subjectId: subject.id,
      });
    }
  }, [mode, sessionData, subject.id]);

  return (
    <VnPopup
      openModal={isOpenPopup}
      setOpenModal={setOpenPopup}
      title="Cài đặt phiên điểm danh"
      leftTitleComponent={
        <div className="flex gap-2">
          {mode === "view" && (
            <VnButton
              label="Xóa"
              color="red"
              onClick={handleConfirm}
              size="sm"
              disabled={isLoading}
            />
          )}

          <VnButton
            label="Lưu"
            onClick={handleSave}
            size="sm"
            disabled={isLoading}
          />
        </div>
      }
    >
      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-gray-200 bg-gray-100 space-y-2">
          <VnEditable
            label={newSession.name || "Checkin"}
            editable={true}
            id="name"
            value={newSession.name}
            type="text"
            onChange={handleChangeName}
            isTitle
          />
          <div className="grid grid-cols-3 gap-2 h-14 items-center">
            <VnEditable
              label={subject.room.address}
              icon={LuSchool}
              editable={false}
              id="address"
            />
            {/* <ItemInfo label={subject.address} icon={LuSchool} /> */}
            <VnEditable
              label={`Lúc ${formatTime(newSession.start)}`}
              icon={LuCalendarClock}
              type="time"
              id="start"
              value={formatTime(newSession.start)}
              onChange={handleChangeStart}
            />
            <VnEditable
              label={`Trong ${newSession.duration} phút`}
              icon={LuHourglass}
              type="number"
              id="duration"
              value={newSession.duration}
              onChange={handleChangeDuration}
            />
          </div>
        </div>

        <div className="space-y-2">
          <ItemSwitch label="Xác thực khuôn mặt" />
          <ItemSwitch label="Xác thực vị trí" />
        </div>

        <VnConfirm
          title="Bạn có chắc muốn xóa không"
          openModal={isShowConfirm}
          setOpenModal={setShowConfirm}
          onOK={handleDelete}
        />
      </div>
    </VnPopup>
  );
}
