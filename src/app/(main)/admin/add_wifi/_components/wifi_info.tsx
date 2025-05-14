import { VnInput } from "@/components";
import { addWifi, delWifi } from "@/helpers/admin";
import { IWifi } from "@/types";
import { useDataForm } from "../../_hooks";

interface IWifiInfoProps {
  values: IWifi[];
  value: IWifi | null;
  onChange?: () => void;
}

export function WifiInfo({
  values,
  onChange,
  value: outerValue,
}: IWifiInfoProps) {
  const { Header, value, handleChange, handleCheck, mode, helpTextSet } =
    useDataForm<IWifi, "mac">({
      onAdd: addWifi,
      onDel: delWifi,
      onChange,
      value: outerValue,
      values: values,
    });

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-300">
      <Header title="Thông tin WiFi" />

      <div className="grid grid-cols-2 gap-4">
        <VnInput
          id="name"
          label="Tên Wifi"
          value={value?.name || ""}
          onChange={(e) => handleChange(e, "name")}
          disabled={mode === "view"}
        />

        <VnInput
          id="name"
          label="Mã MAC"
          value={value?.mac || ""}
          onChange={(e) => handleChange(e, "mac")}
          onKeyUp={(e) => handleCheck(e, "mac")}
          disabled={mode === "view"}
          helpText={helpTextSet?.mac}
        />
      </div>
    </div>
  );
}
