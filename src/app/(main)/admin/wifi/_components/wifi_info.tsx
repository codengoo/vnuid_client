import { addWifi, delWifi } from "@/actions/admin";
import { VnInputFormik } from "@/components";
import { useDataFormFormik } from "@/hooks";
import { IWifi } from "@/types";
import cn from "classnames";
import { object, string } from "yup";

interface IWifiInfoProps {
  values: IWifi[];
  value: IWifi;
  onChange?: () => void;
}

export function WifiInfo({
  values,
  onChange,
  value: outerValue,
}: IWifiInfoProps) {
  const schema = object({
    name: string().required(),
    mac: string()
      .required()
      .matches(/^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/, "Mã MAC không hợp lệ"),
  });

  const { Header, mode, formik } = useDataFormFormik<IWifi>({
    onAdd: addWifi,
    onDel: delWifi,
    onChange,
    listValues: values,
    initial: outerValue,
    schema,
    uniqueKeys: ["mac"],
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn(
        "bg-gray-50 p-4 rounded-xl border border-gray-300 col-span-2 lg:col-span-1 h-fit",
      )}
    >
      <Header title="Thông tin WiFi" />

      <div className="grid grid-cols-2 gap-4">
        <VnInputFormik
          id="name"
          label="Tên Wifi"
          disabled={mode === "view"}
          formik={formik}
        />

        <VnInputFormik
          id="mac"
          label="Mã MAC"
          disabled={mode === "view"}
          formik={formik}
        />
      </div>
    </form>
  );
}
