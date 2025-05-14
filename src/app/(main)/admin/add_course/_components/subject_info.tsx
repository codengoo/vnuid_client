"use client";

import { StudentCard } from "@/app/_components";
import {
  ItemSuggest,
  VnInput,
  VnInputSuggest,
  VnTextArea,
} from "@/app/_components/ui";
import { addCourse, getRoomsAsAdmin, getUsersAsAdmin } from "@/helpers/admin";
import { ICourse, IExtraUser, IRoom, IUserType } from "@/types";
import { formatDateTimeForInput } from "@/utils";
import { removeVietnameseTones } from "@/utils/text";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { SimpleSuggestItem } from "../../_components";
import { useDataForm } from "../../_hooks";

interface ISubjectInfoProps {
  values: ICourse[];
  value: ICourse | null;
  onChange?: () => void;
}

export function CourseInfo({
  values,
  value: outerValue,
  onChange,
}: ISubjectInfoProps) {
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<IExtraUser[]>([]);
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const onCreateMode = () => {
    // @ts-ignore
    setValue({
      end_time: new Date().toISOString(),
      start_time: new Date().toISOString(),
    });
    setStudentIds([]);
  };

  const { Header, value, handleChange, mode, setValue } = useDataForm<
    ICourse,
    "name"
  >({
    onAdd: async (value) => {
      const result = await addCourse(value, studentIds);
      if (result) setStudentIds([]);
      return result;
    },
    onDel: () => Promise.resolve(false),
    onCreateMode: onCreateMode,
    value: outerValue,
    values,
  });

  const handleChangeValue = (text: string, key: keyof ICourse) => {
    // @ts-ignore
    setValue({
      ...(value || {}),
      [key]: text,
    });
  };

  const handleAddStudent = (value: string) => {
    if (studentIds.includes(value)) return;
    setStudentIds([...studentIds, value]);
  };

  const preload = async () => {
    try {
      setLoading(true);
      // Load users
      const users = await getUsersAsAdmin();
      if (!users) return;
      setUsers(users);

      // Load rooms
      const rooms = await getRoomsAsAdmin();
      if (!rooms) return;
      setRooms(rooms);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const renderFindUserFn = (type: IUserType) => {
    return (search: string, handleSelect: (value: string) => void) => {
      const filteredUsers = users.filter((user) => {
        const text = removeVietnameseTones(search.toLocaleLowerCase());
        const name = removeVietnameseTones(user.name.toLocaleLowerCase());

        return (
          user.type === type &&
          (name.includes(text) ||
            user.sid.includes(search) ||
            user.email.includes(search) ||
            user.id === search)
        );
      });

      return filteredUsers.map<ItemSuggest>((user) => ({
        value: user.id,
        components: () => (
          <StudentCard student={user} onClick={() => handleSelect(user.id)} />
        ),
      }));
    };
  };

  const renderFindRoom = (
    search: string,
    handleSelect: (value: string) => void,
  ) => {
    const filteredRooms = rooms.filter((room) => room.name.includes(search));

    return filteredRooms.map<ItemSuggest>((room) => ({
      value: room.id,
      components: () => (
        <SimpleSuggestItem
          title={room.name}
          description={room.address}
          onClick={() => handleSelect(room.id)}
        />
      ),
    }));
  };
  useEffect(() => {
    preload();
    setStudentIds(outerValue?.students.map((s) => s.id) || []);
  }, [outerValue]);

  return (
    <div className="col-span-3">
      <Header title=" Thông tin khóa học" />

      <div className="grid grid-cols-4 gap-4">
        <VnInput
          className="col-span-3"
          id="name"
          label="Tên khóa học"
          value={value?.name || ""}
          onChange={(e) => handleChange(e, "name")}
          disabled={mode === "view"}
        />

        <VnInput
          className="col-span-1"
          id="code"
          label="Mã khóa học"
          value={value?.code || ""}
          onChange={(e) => handleChange(e, "code")}
          disabled={mode === "view"}
        />

        <VnTextArea
          className="col-span-4"
          id="description"
          label="Mô tả"
          value={value?.description || ""}
          onChange={(e) => handleChange(e, "description")}
          disabled={mode === "view"}
        />

        <VnInput
          id="start_time"
          label="Thời gian bắt đầu"
          value={formatDateTimeForInput(value?.start_time) || ""}
          onChange={(e) => handleChange(e, "start_time")}
          disabled={mode === "view"}
          type="datetime-local"
        />

        <VnInput
          id="end_time"
          label="Thời gian kết thúc"
          value={formatDateTimeForInput(value?.end_time) || ""}
          onChange={(e) => handleChange(e, "end_time")}
          disabled={mode === "view"}
          type="datetime-local"
        />

        <VnInputSuggest
          id="room_id"
          label="Phòng học"
          filterFn={renderFindRoom}
          value={value?.room_id || ""}
          onChange={(val) => handleChangeValue(val, "room_id")}
          disabled={mode === "view"}
        />

        <VnInputSuggest
          id="teacher_id"
          label="Giáo viên"
          filterFn={renderFindUserFn("teacher")}
          value={value?.teacher_id || ""}
          onChange={(val) => handleChangeValue(val, "teacher_id")}
          disabled={mode === "view"}
        />
      </div>

      <div className="mt-5">
        <VnInputSuggest
          label="Danh sách sinh viên"
          id="student_list"
          filterFn={renderFindUserFn("student")}
          onChange={(val) => handleAddStudent(val)}
          disabled={mode === "view"}
          icon={LuSearch}
        />

        <div className="grid grid-cols-3 gap-4 py-4">
          {studentIds.map((studentId) => {
            const student = users.find((user) => user.id === studentId);
            if (!student) return null;

            return (
              <StudentCard
                key={studentId}
                student={student}
                // onClick={() => handleRemoveStudent(student)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
