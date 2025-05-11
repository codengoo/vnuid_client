import { VnButton, VnInput, VnPopup, VnSwitch } from "@/app/_components/ui";
import { AddSessionDefaultValue } from "@/data";
import { ISession, ISubject } from "@/types";
import { formatTime } from "@/utils";
import cn from "classnames";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconType } from "react-icons";
import { LuCalendarClock, LuHourglass, LuSchool } from "react-icons/lu";

interface ISessionModalProps {
  isOpenPopup: boolean;
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  subject: ISubject;
}

interface ItemInfo {
  label: string;
  editable?: boolean;
  icon?: IconType;
  type?: "text" | "time" | "number";
  value?: any;
  id: string;
  onChange?: (value: any) => void;
}

interface IItemSwitch {
  label: string;
}
const ItemInfo = ({
  label,
  icon: Icon,
  editable = true,
  type = "text",
  id,
  value,
  onChange,
}: ItemInfo) => {
  const [isEditMode, setEditMode] = useState(false);
  const handleKeyEsc = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "Escape") {
      setEditMode(false);
    }
  };

  const handleChangeMode = () => {
    if (!editable) return;
    setEditMode(!isEditMode);
  };

  const handleChangeValue = (e: ChangeEvent) => {
    if (!onChange) return;
    onChange((e.target as HTMLInputElement).value);
  };

  if (!isEditMode)
    return (
      <div
        onClick={handleChangeMode}
        className={cn(
          "flex items-center gap-2 rounded-lg p-1 text-gray-600 hover:bg-gray-200",
          {
            " cursor-pointer": editable,
            "cursor-not-allowed": !editable,
          },
        )}
      >
        {Icon && <Icon size={14} />}
        <p className="text-sm overflow-hidden truncate text-nowrap">{label}</p>
      </div>
    );

  if (isEditMode)
    return (
      <VnInput
        icon={Icon}
        id={id}
        onBlur={handleChangeMode}
        onKeyUp={handleKeyEsc}
        type={type}
        value={value}
        onChange={handleChangeValue}
      />
    );
};

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
}: ISessionModalProps) {
  const [newSession, setNewSession] = useState<Partial<ISession>>(
    AddSessionDefaultValue,
  );

  const handleSave = () => {
    console.log(newSession);
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

  return (
    <VnPopup
      openModal={isOpenPopup}
      setOpenModal={setOpenPopup}
      title="Cài đặt phiên điểm danh"
      leftTitleComponent={
        <VnButton label="Lưu" onClick={handleSave} size="sm" />
      }
    >
      <div className="space-y-4">
        <div className="p-4 rounded-lg border border-gray-200 bg-gray-100 space-y-2">
          <h1 className="text-xl font-medium text-gray-700">
            {newSession.name}
          </h1>
          <div className="grid grid-cols-3 gap-2">
            <ItemInfo
              label={subject.address}
              icon={LuSchool}
              editable={false}
              id="address"
            />
            {/* <ItemInfo label={subject.address} icon={LuSchool} /> */}
            <ItemInfo
              label={`Lúc ${formatTime(newSession.start)}`}
              icon={LuCalendarClock}
              type="time"
              id="start"
              value={formatTime(newSession.start)}
              onChange={handleChangeStart}
            />
            <ItemInfo
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
      </div>
    </VnPopup>
  );
}
