"use client";

import { addRoom, delRoom, getWifisAsAdmin } from "@/actions/admin";
import { VnInputFormik, VnInputSuggest } from "@/components";
import { useDataFormFormik } from "@/hooks";
import { IRoom, IWifi } from "@/types";
import { compareText } from "@/utils";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { object, string } from "yup";
import { SimpleSuggestItem } from "../../_components";
import { WifiItemSetting } from "./wifi_setting";

interface IRoomInfoProps {
  values: IRoom[];
  value: IRoom;
  onChange?: () => void;
}

export function RoomInfo({
  values,
  onChange,
  value: outerValue,
}: IRoomInfoProps) {
  const [wifiList, setWifiList] = useState<IWifi[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const schema = object({
    name: string().required(),
    address: string().required(),
  });

  const { Header, mode, formik } = useDataFormFormik<IRoom>({
    onAdd: addRoom,
    onDel: delRoom,
    onChange,
    initial: outerValue,
    listValues: values,
    schema: schema,
    uniqueKeys: ["name"],
  });

  const findWifi = (search: string, handleSelect: (value: string) => void) => {
    const filteredWifis = wifiList
      .filter((wifi) => compareText(wifi.name, search))
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

  const handleAddWifi = (wifi_id: string) => {
    if (formik.values.wifi.some((wifi) => wifi.wifi_id === wifi_id)) return;

    formik.setFieldValue("wifi", [
      ...formik.values.wifi,
      {
        room_id: "",
        wifi_id: wifi_id,
        rssi: -65,
        type: "LARGER",
      },
    ]);
  };

  const handleRemoveWifi = (wifi_id: string) => {
    formik.setFieldValue(
      "wifi",
      formik.values.wifi.filter((wifi) => wifi.wifi_id !== wifi_id),
    );
  };

  const handleChangeWifiSetting = (
    key: keyof IRoom["wifi"][0],
    value: IRoom["wifi"][0][keyof IRoom["wifi"][0]],
    id: string,
  ) => {
    formik.setFieldValue(
      "wifi",
      formik.values.wifi.map((wifi) => {
        if (wifi.wifi_id === id) {
          return {
            ...wifi,
            [key]: value,
          };
        }
        return wifi;
      }),
    );
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
    <form
      onSubmit={formik.handleSubmit}
      className="bg-gray-50 p-4 rounded-xl border border-gray-300"
    >
      <Header title="Thông tin phòng học" />

      <div className="grid grid-cols-2 gap-4">
        <VnInputFormik
          id="name"
          label="Tên phòng"
          disabled={mode === "view"}
          formik={formik}
        />

        <VnInputFormik
          id="address"
          label="Địa chỉ"
          disabled={mode === "view"}
          formik={formik}
        />
      </div>

      <div className="mt-5">
        <VnInputSuggest
          label="Danh sách Wifi"
          id="wifi_list"
          filterFn={findWifi}
          onChange={(val) => handleAddWifi(val)}
          disabled={mode === "view"}
          icon={LuSearch}
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {formik.values.wifi.map((wifi) => (
          <WifiItemSetting
            value={wifi}
            wifiList={wifiList}
            onChange={(e, key) => handleChangeWifiSetting(e, key, wifi.wifi_id)}
            key={wifi.wifi_id}
            onRemove={() => handleRemoveWifi(wifi.wifi_id)}
          />
        ))}
      </div>
    </form>
  );
}
