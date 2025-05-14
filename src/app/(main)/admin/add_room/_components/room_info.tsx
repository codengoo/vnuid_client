import { VnInput, VnInputSuggest } from "@/app/_components/ui";
import { IRoom, IWifi } from "@/types";
import { LuSearch } from "react-icons/lu";
import { useDataForm } from "../../_hooks";
import { WifiItemSetting } from "./wifi_setting";

interface IRoomInfoProps {
  values: IRoom[];
  value: IRoom | null;
  wifiList: IWifi[];
  onChange?: () => void;
}

export function RoomInfo({
  values,
  onChange,
  value: outerValue,
  wifiList,
}: IRoomInfoProps) {
  const { Header, value, handleChange, handleCheck, mode, setValue } =
    useDataForm<IRoom, "name">({
      onAdd: () => Promise.resolve(true),
      onDel: () => Promise.resolve(true),
      onChange,
      value: outerValue,
      values: values,
    });

  const findWifi = (search: string, handleSelect: (value: string) => void) => {
    const filteredWifis = wifiList
      .filter((wifi) => wifi.name.includes(search))
      .map((wifi) => ({
        value: wifi.id,
        components: () => (
          <div className="p-2 border border-transparent hover:border-gray-300 hover:bg-gray-100 cursor-pointer rounded-lg w-64">
            <div onClick={() => handleSelect(wifi.id)}>
              <h3 className="text-gray-800 font-semibold">{wifi.name}</h3>
              <p className="text-gray-500 font-medium">{wifi.mac}</p>
            </div>
          </div>
        ),
      }));

    return filteredWifis;
  };

  const handleChangeWifi = (wifi_id: string) => {
    if (value?.wifi?.some((wifi) => wifi.wifi_id === wifi_id)) return;

    // @ts-ignore
    setValue({
      ...(value || {}),
      wifi: [
        // @ts-ignore
        ...(value?.wifi || []),
        {
          room_id: "",
          wifi_id: wifi_id,
          rssi: -65,
          type: "LARGER",
        },
      ],
    });
  };

  return (
    <div className="bg-gray-50 p-4 rounded-xl border border-gray-300">
      <Header title="Thông tin phòng học" />

      <div className="grid grid-cols-2 gap-4">
        <VnInput
          id="name"
          label="Tên phòng"
          value={value?.name || ""}
          onChange={(e) => handleChange(e, "name")}
          onKeyUp={(e) => handleCheck(e, "name")}
          disabled={mode === "view"}
        />

        <VnInput
          id="address"
          label="Địa chỉ"
          value={value?.address || ""}
          onChange={(e) => handleChange(e, "address")}
          disabled={mode === "view"}
        />
      </div>

      <div className="mt-5">
        <VnInputSuggest
          label="Danh sách Wifi"
          id="wifi_list"
          filterFn={findWifi}
          onChange={(val) => handleChangeWifi(val)}
          disabled={mode === "view"}
          icon={LuSearch}
        />
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {value?.wifi.map((wifi) => (
          <WifiItemSetting
            value={wifi}
            wifiList={wifiList}
            onChange={() => {}}
            key={wifi.wifi_id}
          />
        ))}
      </div>
    </div>
  );
}
