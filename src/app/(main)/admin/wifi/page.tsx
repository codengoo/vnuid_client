"use client";

import { getWifisAsAdmin } from "@/actions/admin";
import { defaultWifiValue } from "@/configs";
import { useSetup } from "@/hooks";
import { WifiInfo, WifiTable } from "./_components";

export default function AddWifi() {
  const { value, handleRowClick, values, preload } = useSetup({
    defaultValues: defaultWifiValue,
    preloadFn: getWifisAsAdmin,
  });

  return (
    <div className="grid grid-cols-2 gap-12">
      <WifiTable values={values} onRowClick={handleRowClick} />
      <WifiInfo values={values} value={value} onChange={preload} />
    </div>
  );
}
