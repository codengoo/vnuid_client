"use client";

import { VnIconButton, VnInput, VnSelect } from "@/components";
import { IRoom, IWifi } from "@/types";
import { ChangeEvent, useMemo } from "react";
import { LuWifi, LuX } from "react-icons/lu";

interface IWifiSettingItemProps {
  wifiList: IWifi[];
  value: IRoom["wifi"][0];
  onChange: (
    key: keyof IRoom["wifi"][0],
    value: IRoom["wifi"][0][keyof IRoom["wifi"][0]],
  ) => void;
  onRemove: () => void;
}
export function WifiItemSetting({
  onChange,
  onRemove,
  value,
  wifiList,
}: IWifiSettingItemProps) {
  const wifi = useMemo(() => {
    return wifiList.find((wifi) => wifi.id === value.wifi_id);
  }, [wifiList, value.wifi_id]);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof IRoom["wifi"][0],
  ) => {
    onChange(key, e.target.value);
  };

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
        <VnInput
          id="rssi"
          value={value.rssi}
          className="w-24"
          onChange={(e) => handleOnChange(e, "rssi")}
        />

        <VnSelect
          id="type"
          value={value.type}
          className="w-24"
          onChange={(e) => handleOnChange(e, "type")}
          options={[
            { value: "LARGER", label: "Lớn hơn" },
            { value: "SMALLER", label: "Nhỏ hơn" },
          ]}
        />
      </div>

      <VnIconButton icon={LuX} color="red" onClick={onRemove} />
    </div>
  );
}
