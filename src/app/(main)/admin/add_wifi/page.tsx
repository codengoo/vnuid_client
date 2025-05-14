"use client";

import { getWifisAsAdmin } from "@/helpers/admin";
import { IWifi } from "@/types";
import { useEffect, useState } from "react";
import { WifiInfo, WifiTable } from "./_components";

export default function AddWifi() {
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState<IWifi[]>([]);
  const [value, setValue] = useState<IWifi | null>(null);

  const preload = async () => {
    try {
      setLoading(true);
      const wifis = await getWifisAsAdmin();
      if (!wifis) return;
      setValues(wifis);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = async (value: IWifi) => {
    setValue(value);
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-12">
      <WifiTable values={values} onRowClick={handleRowClick} />
      <WifiInfo values={values} value={value} onChange={preload} />
    </div>
  );
}
