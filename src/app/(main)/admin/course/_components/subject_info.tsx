"use client";

import {
  addCourse,
  delCourse,
  getRoomsAsAdmin,
  getUsersAsAdmin,
} from "@/actions/admin";
import { StudentCard } from "@/app/_components";
import {
  ItemSuggest,
  VnInputFormik,
  VnInputSuggest,
  VnTextAreaFormik,
} from "@/components";
import { useDataFormFormik } from "@/hooks";
import { ICourse, IExtraUser, IRoom, IUserType } from "@/types";
import { removeVietnameseTones } from "@/utils/text";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { object } from "yup";
import { SimpleSuggestItem } from "../../_components";

interface ISubjectInfoProps {
  values: ICourse[];
  value: ICourse;
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

  const schema = object({});

  const { Header, mode, formik } = useDataFormFormik<ICourse>({
    onAdd: async (value) => await addCourse(value, studentIds),
    onDel: delCourse,
    onCreateMode: onCreateMode,
    initial: outerValue,
    listValues: values,
    schema: schema,
    onChange: () => {
      setStudentIds([]);
      onChange?.();
    },
  });

  const handleChangeValue = (text: string, key: keyof ICourse) => {
    formik.setFieldValue(key, text);
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
        <VnInputFormik
          className="col-span-3"
          id="name"
          label="Tên khóa học"
          formik={formik}
          disabled={mode === "view"}
        />

        <VnInputFormik
          className="col-span-1"
          id="code"
          label="Mã khóa học"
          formik={formik}
          disabled={mode === "view"}
        />

        <VnTextAreaFormik
          id="description"
          label="Mô tả"
          className="col-span-4"
          formik={formik}
          disabled={mode === "view"}
        />

        <VnInputFormik
          id="start_time"
          label="Thời gian bắt đầu"
          formik={formik}
          disabled={mode === "view"}
          type="datetime-local"
        />

        <VnInputFormik
          id="end_time"
          label="Thời gian kết thúc"
          formik={formik}
          disabled={mode === "view"}
          type="datetime-local"
        />

        <VnInputSuggest
          id="room_id"
          label="Phòng học"
          filterFn={renderFindRoom}
          onChange={(val) => handleChangeValue(val, "room_id")}
          disabled={mode === "view"}
        />

        <VnInputSuggest
          id="teacher_id"
          label="Giáo viên"
          filterFn={renderFindUserFn("teacher")}
          onChange={(val) => handleChangeValue(val, "teacher_id")}
          disabled={mode === "view"}
        />
      </div>

      <div className="mt-5">
        <VnInputSuggest
          id="student_list"
          label="Danh sách sinh viên"
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
