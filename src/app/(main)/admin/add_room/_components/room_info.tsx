"use client";

import { VnInput, VnInputSuggest } from "@/app/_components/ui";
import { addRoom, delRoom, getWifisAsAdmin } from "@/helpers/admin";
import { IRoom, IWifi } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { SimpleSuggestItem } from "../../_components";
import { useDataForm } from "../../_hooks";
import { WifiItemSetting } from "./wifi_setting";

interface IRoomInfoProps {
  values: IRoom[];
  value: IRoom | null;
  onChange?: () => void;
}

export function RoomInfo({
  values,
  onChange,
  value: outerValue,
}: IRoomInfoProps) {
  const [wifiList, setWifiList] = useState<IWifi[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { Header, value, handleChange, handleCheck, mode, setValue } =
    useDataForm<IRoom, "name">({
      onAdd: addRoom,
      onDel: delRoom,
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
          <SimpleSuggestItem
            description={wifi.mac}
            title={wifi.name}
            onClick={() => handleSelect(wifi.id)}
          />
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

  const handleChangeWifiSetting = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof IRoom["wifi"][0],
    id: string,
  ) => {
    const text = e.currentTarget.value;
    console.log(text, key, id);

    // @ts-ignore
    setValue((value) => {
      return {
        ...(value || {}),
        wifi: (value?.wifi || []).map((wifi) => {
          if (wifi.wifi_id === id) {
            return {
              ...wifi,
              [key]: text,
            };
          }
          return wifi;
        }),
      };
    });
  };

  const preload = async () => {
    try {
      setLoading(true);
      // Get all Wifis
      const wifis = await getWifisAsAdmin();
      if (!wifis) return;
      setWifiList(wifis);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    preload();
  }, []);

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
        {(value?.wifi || []).map((wifi) => (
          <WifiItemSetting
            value={wifi}
            wifiList={wifiList}
            onChange={(e, key) => handleChangeWifiSetting(e, key, wifi.wifi_id)}
            key={wifi.wifi_id}
          />
        ))}
      </div>
    </div>
  );
}
