import { VnInput, VnSelect } from "@/components";
import { addUser, delUser } from "@/helpers/admin";
import { IExtraUser } from "@/types";
import { useState } from "react";
import { useDataForm } from "../../_hooks";

type IViewMode = "create" | "view";
type IHelpTextSet = Record<
  keyof Pick<IExtraUser, "gid" | "email" | "sid">,
  string | undefined
>;
interface IUserInfoProps {
  values: IExtraUser[];
  value: IExtraUser | null;
  onChange?: () => void;
}

export function UserInfo({
  values,
  onChange,
  value: outerValue,
}: IUserInfoProps) {
  const [isLoading, setLoading] = useState(false);
  const onCreateMode = () => {
    // @ts-ignore
    setValue({
      type: "student",
    });
  };

  const {
    Header,
    value,
    handleChange,
    handleCheck,
    mode,
    helpTextSet,
    setValue,
  } = useDataForm<IExtraUser, "gid" | "email" | "sid">({
    onAdd: addUser,
    onDel: delUser,
    onChange,
    value: outerValue,
    values: values,
    onCreateMode: onCreateMode,
  });

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-300">
      <Header title="Thông tin sinh viên" />

      <div className="grid grid-cols-2 gap-4">
        <VnInput
          id="name"
          label="Họ và tên"
          value={value?.name || ""}
          onChange={(e) => handleChange(e, "name")}
          disabled={mode === "view"}
        />
        <VnInput
          id="email"
          label="Email"
          onChange={(e) => handleChange(e, "email")}
          onKeyUp={(e) => handleCheck(e, "email")}
          helpText={helpTextSet?.email}
          value={value?.email || ""}
          disabled={mode === "view"}
        />
        <VnInput
          id="sid"
          label="Mã số sinh viên / Giáo viên"
          value={value?.sid || ""}
          onChange={(e) => handleChange(e, "sid")}
          onKeyUp={(e) => handleCheck(e, "sid")}
          helpText={helpTextSet?.sid}
          disabled={mode === "view"}
        />
        <VnInput
          id="gid"
          label="Số tài khoản Google"
          value={value?.gid || ""}
          onChange={(e) => handleChange(e, "gid")}
          onKeyUp={(e) => handleCheck(e, "gid")}
          helpText={helpTextSet?.gid}
          disabled={mode === "view"}
        />
        <VnInput
          id="official_class"
          label="Lớp chính quy"
          value={value?.official_class || ""}
          onChange={(e) => handleChange(e, "official_class")}
          disabled={mode === "view"}
        />
        <VnSelect
          id="type"
          label="Loại tài khoản"
          value={value?.type || ""}
          onChange={(e) => handleChange(e, "type")}
          disabled={mode === "view"}
          options={[
            { label: "Sinh viên", value: "student" },
            { label: "Giáo viên", value: "teacher" },
            { label: "Quản trị", value: "admin" },
          ]}
        />
        <VnInput
          id="phone"
          label="Số điện thoại"
          value={value?.phone || ""}
          onChange={(e) => handleChange(e, "phone")}
          disabled={mode === "view"}
        />
        <VnInput
          id="address"
          label="Địa chỉ"
          value={value?.address || ""}
          onChange={(e) => handleChange(e, "address")}
          disabled={mode === "view"}
        />
        <VnInput
          id="password"
          label="Mật khẩu"
          value={value?.password || ""}
          onChange={(e) => handleChange(e, "password")}
          disabled={mode === "view"}
        />
        <VnInput
          id="department"
          label="Khoa"
          value={value?.department || ""}
          onChange={(e) => handleChange(e, "department")}
          disabled={mode === "view"}
        />
      </div>
    </div>
  );
}
