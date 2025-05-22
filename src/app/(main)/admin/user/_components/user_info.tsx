import { addUser, delUser } from "@/actions/admin";
import { VnInputFormik, VnSelectFormik } from "@/components";
import { useDataFormFormik } from "@/hooks";
import { IExtraUser } from "@/types";
import { object, string } from "yup";

interface IUserInfoProps {
  values: IExtraUser[];
  value: IExtraUser;
  onChange?: () => void;
}

export function UserInfo({
  values,
  onChange,
  value: outerValue,
}: IUserInfoProps) {
  const onCreateMode = () => {
    formik.setFieldValue("type", "student");
  };

  const { Header, mode, formik } = useDataFormFormik<IExtraUser>({
    onAdd: addUser,
    onDel: delUser,
    onChange,
    initial: outerValue,
    listValues: values,
    onCreateMode: onCreateMode,
    schema: object({
      name: string().required(),
      email: string().email().required(),
      sid: string().length(8).required(),
      gid: string().required(),
      type: string().required(),
      official_class: string().required(),
      phone: string().required(),
      address: string().required(),
      department: string().required(),
    }
    ),
    uniqueKeys: ["sid", "email", "gid"],
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="bg-gray-50 p-4 rounded-xl border border-gray-300"
    >
      <Header title="Thông tin sinh viên" />

      <div className="grid grid-cols-2 gap-4">
        <VnInputFormik
          id="name"
          label="Họ và tên"
          formik={formik}
          disabled={mode === "view"}
        />
        <VnInputFormik
          id="email"
          label="Email"
          formik={formik}
          disabled={mode === "view"}
        />
        <VnInputFormik
          id="sid"
          label="Mã số sinh viên / Giáo viên"
          formik={formik}
          disabled={mode === "view"}
        />
        <VnInputFormik
          id="gid"
          label="Số tài khoản Google"
          formik={formik}
          disabled={mode === "view"}
        />
        <VnInputFormik
          id="official_class"
          label="Lớp chính quy"
          formik={formik}
          disabled={mode === "view"}
        />
        <VnSelectFormik
          id="type"
          label="Loại tài khoản"
          formik={formik}
          disabled={mode === "view"}
          options={[
            { label: "Sinh viên", value: "student" },
            { label: "Giáo viên", value: "teacher" },
            { label: "Quản trị", value: "admin" },
          ]}
        />
        <VnInputFormik
          id="phone"
          label="Số điện thoại"
          formik={formik}
          disabled={mode === "view"}
        />
        <VnInputFormik
          id="address"
          label="Địa chỉ"
          formik={formik}
          disabled={mode === "view"}
        />
        <VnInputFormik
          id="password"
          label="Mật khẩu"
          formik={formik}
          disabled={mode === "view"}
        />
        <VnInputFormik
          id="department"
          label="Khoa"
          formik={formik}
          disabled={mode === "view"}
        />
      </div>
    </form>
  );
}
