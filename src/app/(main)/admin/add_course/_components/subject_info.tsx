"use client";

import { StudentCard } from "@/app/_components";
import {
  ItemSuggest,
  VnButton,
  VnInput,
  VnInputSuggest,
  VnTextArea,
} from "@/app/_components/ui";
import { addCourse, getUsersAsAdmin } from "@/helpers/admin";
import { ICourse, IExtraUser, IUserType } from "@/types";
import { formatDateTimeForInput } from "@/utils";
import { removeVietnameseTones } from "@/utils/text";
import { ChangeEvent, useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { toast } from "react-toastify";

type IViewMode = "create" | "view";

interface ISubjectInfoProps {
  courses: ICourse[];
  course: ICourse | null;
  onChange?: () => void;
}

export function CourseInfo({
  courses,
  course: outerCourse,
  onChange,
}: ISubjectInfoProps) {
  const [course, setCourse] = useState<ICourse | null>(null);
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [mode, setMode] = useState<IViewMode>("view");
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState<IExtraUser[]>([]);

  const handleSave = async () => {
    if (!course) return;
    try {
      setLoading(true);
      console.log(course, studentIds);
      await addCourse(course, studentIds);

      toast.success("Thêm khóa học thành công");
      setCourse(null);
      onChange?.();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!course) return;
    try {
      setLoading(true);
      // await removeUser(user.id);
      toast.success("Xóa người dùng thành công");
      setCourse(null);
      onChange?.();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof ICourse,
  ) => {
    const value = e.currentTarget.value;
    if (key === "start_time" || key === "end_time") {
      const time = new Date(value).toISOString();
      // @ts-ignore
      setCourse({
        ...(course || {}),
        [key]: time,
      });
    } else {
      // @ts-ignore
      setCourse({
        ...(course || {}),
        [key]: value,
      });
    }
  };

  const handleChangeValue = (value: string, key: keyof ICourse) => {
    // @ts-ignore
    setCourse({
      ...(course || {}),
      [key]: value,
    });
  };

  const handleAddStudent = (value: string) => {
    if (studentIds.includes(value)) return;
    setStudentIds([...studentIds, value]);
  };

  const preload = async () => {
    try {
      setLoading(true);
      const users = await getUsersAsAdmin();
      if (!users) return;
      setUsers(users);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const changeToCreateMode = () => {
    // @ts-ignore
    setCourse({
      end_time: new Date().toISOString(),
      start_time: new Date().toISOString(),
    });
    setStudentIds([]);
    setMode("create");
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

  useEffect(() => {
    preload();
    setCourse(outerCourse);
    setStudentIds(outerCourse?.students.map((s) => s.id) || []);
    setMode("view");
  }, [outerCourse]);

  return (
    <div className="col-span-3">
      <div className="flex justify-between items-center h-16 ">
        <h1 className="font-semibold text-2xl text-gray-700">
          Thông tin khóa học
        </h1>

        <div className="flex gap-2">
          {mode == "view" && course && (
            <VnButton
              label="Xóa"
              color={"red"}
              disabled={isLoading}
              onClick={handleDelete}
            />
          )}
          {mode == "view" && (
            <VnButton
              label="Thêm"
              onClick={changeToCreateMode}
              disabled={isLoading}
            />
          )}
          {mode == "create" && (
            <VnButton label="Lưu" onClick={handleSave} disabled={isLoading} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <VnInput
          className="col-span-3"
          id="name"
          label="Tên khóa học"
          value={course?.name || ""}
          onChange={(e) => handleChange(e, "name")}
          disabled={mode === "view"}
        />

        <VnInput
          className="col-span-1"
          id="code"
          label="Mã khóa học"
          value={course?.code || ""}
          onChange={(e) => handleChange(e, "code")}
          disabled={mode === "view"}
        />

        <VnTextArea
          className="col-span-4"
          id="description"
          label="Mô tả"
          value={course?.description || ""}
          onChange={(e) => handleChange(e, "description")}
          disabled={mode === "view"}
        />

        <VnInput
          id="start_time"
          label="Thời gian bắt đầu"
          value={formatDateTimeForInput(course?.start_time) || ""}
          onChange={(e) => handleChange(e, "start_time")}
          disabled={mode === "view"}
          type="datetime-local"
        />

        <VnInput
          id="end_time"
          label="Thời gian kết thúc"
          value={formatDateTimeForInput(course?.end_time) || ""}
          onChange={(e) => handleChange(e, "end_time")}
          disabled={mode === "view"}
          type="datetime-local"
        />

        <VnInput
          id="address"
          label="Địa điểm"
          value={course?.address || ""}
          onChange={(e) => handleChange(e, "address")}
          disabled={mode === "view"}
        />

        <VnInputSuggest
          id="teacher_id"
          label="Giáo viên"
          filterFn={renderFindUserFn("teacher")}
          value={course?.teacher_id || ""}
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
