import { VnIconButton, VnInput } from "@/app/_components/ui";
import { IRoom, IWifi } from "@/types";
import { useMemo } from "react";
import { LuWifi, LuX } from "react-icons/lu";

interface IWifiSettingItemProps {
  wifiList: IWifi[];
  value: IRoom["wifi"][0];
  onChange: (value: IRoom["wifi"][0]) => void;
}
export function WifiItemSetting({
  onChange,
  value,
  wifiList,
}: IWifiSettingItemProps) {
  const wifi = useMemo(() => {
    return wifiList.find((wifi) => wifi.id === value.wifi_id);
  }, [wifiList, value.wifi_id]);

  if (!wifi) return null;
  return (
    <div
      key={wifi.id}
      className="flex items-center gap-1 text-gray-600 p-3 rounded-lg border border-gray-300 justify-between"
    >
      <div className="flex items-center gap-4">
        <LuWifi size={16} className="flex-none" />

        <p className="overflow-hidden text-nowrap truncate gap-1">
          {"("}
          <span className="font-semibold">{wifi.name}</span>
          {") "}
          <span className="text-xs">{wifi.id}</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        <VnInput id="rssi" value={value.rssi} className="w-24" />
        <VnInput id="type" value={value.type} className="w-24" />
      </div>

      <VnIconButton icon={LuX} color="red"/>
    </div>
  );
}
