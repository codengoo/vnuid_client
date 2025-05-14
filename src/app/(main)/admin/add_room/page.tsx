"use client";

import { getRoomsAsAdmin, getWifisAsAdmin } from "@/helpers/admin";
import { IRoom, IWifi } from "@/types";
import { useEffect, useState } from "react";
import { RoomInfo, RoomTable } from "./_components";

export default function AddRoom() {
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState<IRoom[]>([]);
  const [value, setValue] = useState<IRoom | null>(null);
  const [wifiList, setWifiList] = useState<IWifi[]>([]);

  const preload = async () => {
    try {
      setLoading(true);
      // Get All Rooms
      const rooms = await getRoomsAsAdmin();
      if (!rooms) return;
      setValues(rooms);

      // Get all Wifis
      const wifis = await getWifisAsAdmin();
      if (!wifis) return;
      setWifiList(wifis);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (value: IRoom) => {
    setValue(value);
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-12">
      <RoomTable values={values} onRowClick={handleRowClick} />
      <RoomInfo values={values} value={value} onChange={preload} />
    </div>
  );
}
