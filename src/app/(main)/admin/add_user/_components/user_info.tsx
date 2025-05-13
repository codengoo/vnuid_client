import { VnButton, VnInput } from "@/app/_components/ui";
import { addUser, removeUser } from "@/helpers/admin";
import { IExtraUser } from "@/types";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type IViewMode = "create" | "view";
type IHelpTextSet = Record<
  keyof Pick<IExtraUser, "gid" | "email" | "sid">,
  string | undefined
>;
interface IUserInfoProps {
  users: IExtraUser[];
  user: IExtraUser | null;
  onChange?: () => void;
}

export function UserInfo({ users, onChange, user: outerUser }: IUserInfoProps) {
  const [user, setUser] = useState<IExtraUser | null>(null);
  const [mode, setMode] = useState<IViewMode>("view");
  const [isLoading, setLoading] = useState(false);
  const [helpTextSet, setHelpTextSet] = useState<IHelpTextSet>({
    email: undefined,
    gid: undefined,
    sid: undefined,
  });

  const handleSave = async () => {
    console.log(user);

    if (!user) return;
    try {
      setLoading(true);
      await addUser(user);
      toast.success("Thêm người dùng thành công");
      setUser(null);
      onChange?.();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    try {
      setLoading(true);
      await removeUser(user.id);
      toast.success("Xóa người dùng thành công");
      setUser(null);
      onChange?.();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: keyof IExtraUser,
  ) => {
    const value = e.currentTarget.value;
    // @ts-ignore
    setUser({
      ...(user || {}),
      [key]: value,
    });
  };

  const handleCheck = (
    e: KeyboardEvent<HTMLInputElement>,
    key: keyof IExtraUser,
  ) => {
    const value = e.currentTarget.value;
    for (let i = 0; i < users.length; i++) {
      if (users[i][key] === value) {
        setHelpTextSet({ ...helpTextSet, [key]: "Đã tồn tại" });
        return;
      }
    }

    setHelpTextSet({ ...helpTextSet, [key]: void 0 });
  };

  const isCreatable = (input: IHelpTextSet) => {
    for (let key in input) {
      if (input[key as keyof IHelpTextSet] !== undefined) return false;
    }
    return true;
  };

  const changeToCreateMode = () => {
    setUser(null);
    setMode("create");
  };

  useEffect(() => {
    setUser(outerUser);
    setMode("view");
  }, [outerUser]);

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-300">
      <div className="flex justify-between items-center h-16 ">
        <h1 className="font-semibold text-2xl text-gray-700">
          Thông tin sinh viên
        </h1>
        <div className="flex gap-2">
          {mode == "view" && user && (
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
            <VnButton
              label="Lưu"
              onClick={handleSave}
              disabled={!isCreatable(helpTextSet) || isLoading}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <VnInput
          id="name"
          label="Họ và tên"
          value={user?.name || ""}
          onChange={(e) => handleChange(e, "name")}
          disabled={mode === "view"}
        />
        <VnInput
          id="email"
          label="Email"
          onChange={(e) => handleChange(e, "email")}
          onKeyUp={(e) => handleCheck(e, "email")}
          helpText={helpTextSet.email}
          value={user?.email || ""}
          disabled={mode === "view"}
        />
        <VnInput
          id="sid"
          label="Mã số sinh viên / Giáo viên"
          value={user?.sid || ""}
          onChange={(e) => handleChange(e, "sid")}
          onKeyUp={(e) => handleCheck(e, "sid")}
          helpText={helpTextSet.sid}
          disabled={mode === "view"}
        />
        <VnInput
          id="gid"
          label="Số tài khoản Google"
          value={user?.gid || ""}
          onChange={(e) => handleChange(e, "gid")}
          onKeyUp={(e) => handleCheck(e, "gid")}
          helpText={helpTextSet.gid}
          disabled={mode === "view"}
        />
        <VnInput
          id="official_class"
          label="Lớp chính quy"
          value={user?.official_class || ""}
          onChange={(e) => handleChange(e, "official_class")}
          disabled={mode === "view"}
        />
        <VnInput
          id="type"
          label="Loại tài khoản"
          value={user?.type || ""}
          onChange={(e) => handleChange(e, "type")}
          disabled={mode === "view"}
        />
        <VnInput
          id="phone"
          label="Số điện thoại"
          value={user?.phone || ""}
          onChange={(e) => handleChange(e, "phone")}
          disabled={mode === "view"}
        />
        <VnInput
          id="address"
          label="Địa chỉ"
          value={user?.address || ""}
          onChange={(e) => handleChange(e, "address")}
          disabled={mode === "view"}
        />
        <VnInput
          id="password"
          label="Mật khẩu"
          value={user?.password || ""}
          onChange={(e) => handleChange(e, "password")}
          disabled={mode === "view"}
        />
        <VnInput
          id="department"
          label="Khoa"
          value={user?.department || ""}
          onChange={(e) => handleChange(e, "department")}
          disabled={mode === "view"}
        />
      </div>
    </div>
  );
}
